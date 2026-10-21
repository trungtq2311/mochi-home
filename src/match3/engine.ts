import { mulberry32, type RNG } from '../core/rng.ts';
import { Board, isRocket, type MatchGroup, type Move, type Piece, type Pos, type Special } from './board.ts';
import type { LevelDef } from './levels.ts';

export interface GoalState { kind: 'color' | 'box' | 'dirt'; color: number; need: number; left: number }

export type Effect =
  | { type: 'rocket'; t0: number; dur: number; r: number; c: number; dir: 'h' | 'v' }
  | { type: 'bomb'; t0: number; dur: number; r: number; c: number; radius: number }
  | { type: 'beams'; t0: number; dur: number; r: number; c: number; targets: Pos[] }
  | { type: 'plane'; t0: number; dur: number; from: Pos; to: Pos; carry: Special }
  | { type: 'sweep'; t0: number; dur: number; r: number }
  | { type: 'hammer'; t0: number; dur: number; r: number; c: number }
  | { type: 'flash'; t0: number; dur: number; r: number; c: number };

export interface Dying { p: Piece; t0: number; kind: 'pop' | 'merge' | 'fire'; to?: Pos }

export type EngineEvent =
  | { type: 'swap' }
  | { type: 'badswap' }
  | { type: 'match'; size: number; cascade: number }
  | { type: 'pop'; r: number; c: number; color: number }
  | { type: 'special'; special: Special; r: number; c: number }
  | { type: 'activate'; special: Special; r: number; c: number; combo?: boolean }
  | { type: 'box'; r: number; c: number; left: number }
  | { type: 'dirt'; r: number; c: number; left: number }
  | { type: 'collect'; goal: number; r: number; c: number }
  | { type: 'cascade'; n: number }
  | { type: 'land' }
  | { type: 'shuffle' }
  | { type: 'bonus-move'; r: number; c: number }
  | { type: 'turn-end' }
  | { type: 'won' }
  | { type: 'lost' }
  | { type: 'bonus-done' };

export type EngineState = 'play' | 'won' | 'lost' | 'bonus' | 'done';

const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const SWAP_MS = 160;
const ROCKET_MS_PER_CELL = 38;

export class Engine {
  readonly board: Board;
  readonly level: LevelDef;
  readonly goals: GoalState[];
  movesLeft: number;
  now = 0;
  state: EngineState = 'play';
  busy = false;
  effects: Effect[] = [];
  dying: Dying[] = [];
  stats = { cleared: [0, 0, 0, 0, 0, 0], made: 0, rockets: 0, bombs: 0, planes: 0, rainbows: 0, boxes: 0, dirt: 0, boosters: 0, maxCascade: 0, bonusMoves: 0 };

  private timers: { t: number; fn: () => void }[] = [];
  private idle: (() => void)[] = [];
  private listeners: ((e: EngineEvent) => void)[] = [];
  private rng: RNG;
  private cascade = 0;
  private prefer: Pos[] = [];
  private planeTargets = new Set<number>();

  constructor(level: LevelDef, seed: number, startSpecials: Special[] = []) {
    this.level = level;
    this.rng = mulberry32(seed);
    this.board = new Board(level.mask, level.colors, this.rng);
    this.movesLeft = level.moves;
    this.goals = level.goals.map((g) => ({
      kind: g.kind,
      color: g.kind === 'color' ? g.color : -1,
      need: g.count,
      left: g.count,
    }));
    // Goal colors spawn a little more often: a gentle, invisible helping hand.
    for (const g of this.goals) if (g.kind === 'color') this.board.weights[g.color] = 1.18;
    this.board.fillInitial();
    this.placeSpecials(startSpecials);
  }

  on(fn: (e: EngineEvent) => void) { this.listeners.push(fn); }
  private emit(e: EngineEvent) { for (const fn of this.listeners) fn(e); }

  // ---------- clock ----------

  after(ms: number, fn: () => void) { this.timers.push({ t: this.now + ms, fn }); }
  private whenIdle(fn: () => void) { this.idle.push(fn); }

  tick(dt: number) {
    this.now += dt;
    for (let guard = 0; guard < 5000; guard++) {
      let best = -1;
      for (let i = 0; i < this.timers.length; i++) {
        if (this.timers[i].t <= this.now && (best < 0 || this.timers[i].t < this.timers[best].t)) best = i;
      }
      if (best < 0) break;
      const [tm] = this.timers.splice(best, 1);
      tm.fn();
    }
    while (this.timers.length === 0 && this.idle.length) this.idle.shift()!();
    if (this.effects.length) this.effects = this.effects.filter((e) => this.now < e.t0 + e.dur + 60);
    if (this.dying.length) this.dying = this.dying.filter((d) => this.now < d.t0 + 450);
  }

  // ---------- player actions ----------

  canAct(): boolean { return !this.busy && this.state === 'play'; }

  trySwap(a: Pos, b: Pos): boolean {
    if (!this.canAct()) return false;
    if (Math.abs(a.r - b.r) + Math.abs(a.c - b.c) !== 1) return false;
    const bd = this.board;
    if (!bd.canHold(a.r, a.c) || !bd.canHold(b.r, b.c)) return false;
    const p = bd.piece(a.r, a.c), q = bd.piece(b.r, b.c);
    if (!p || !q) return false;

    this.busy = true;
    this.tween(p, a, b, SWAP_MS);
    this.tween(q, b, a, SWAP_MS);
    bd.place(p, b.r, b.c);
    bd.place(q, a.r, a.c);
    const special = p.special !== 'none' || q.special !== 'none';
    if (!special && bd.findMatches([]).length === 0) {
      bd.place(p, a.r, a.c);
      bd.place(q, b.r, b.c);
      this.after(SWAP_MS, () => { this.tween(p, b, a, SWAP_MS); this.tween(q, a, b, SWAP_MS); });
      this.after(SWAP_MS * 2, () => { this.busy = false; });
      this.emit({ type: 'badswap' });
      return false;
    }
    this.emit({ type: 'swap' });
    this.movesLeft--;
    this.after(SWAP_MS, () => {
      if (special) this.swapSpecials(p, q);
      this.prefer = [b, a];
      this.whenIdle(() => this.step());
    });
    return true;
  }

  /** Tap a special to set it off in place (costs a move). */
  tapSpecial(pos: Pos): boolean {
    if (!this.canAct()) return false;
    const p = this.board.piece(pos.r, pos.c);
    if (!p || p.special === 'none' || !this.board.canHold(pos.r, pos.c)) return false;
    this.busy = true;
    this.movesLeft--;
    this.activate(p);
    this.whenIdle(() => this.step());
    return true;
  }

  useHammer(pos: Pos): boolean {
    if (!this.canAct()) return false;
    const cell = this.board.get(pos.r, pos.c);
    if (!cell?.playable || (!cell.piece && cell.box === 0)) return false;
    this.busy = true;
    this.stats.boosters++;
    this.effects.push({ type: 'hammer', t0: this.now, dur: 450, r: pos.r, c: pos.c });
    this.after(260, () => this.hit(pos.r, pos.c));
    this.whenIdle(() => this.step());
    return true;
  }

  useBroom(row: number): boolean {
    if (!this.canAct() || row < 0 || row >= this.board.rows) return false;
    this.busy = true;
    this.stats.boosters++;
    this.effects.push({ type: 'sweep', t0: this.now, dur: 700, r: row });
    for (let c = 0; c < this.board.cols; c++) this.after(120 + c * 55, () => this.hit(row, c));
    this.whenIdle(() => this.step());
    return true;
  }

  useShuffle(): boolean {
    if (!this.canAct()) return false;
    this.busy = true;
    this.stats.boosters++;
    this.emit({ type: 'shuffle' });
    this.board.shuffle(this.now, 450);
    this.after(480, () => this.step());
    return true;
  }

  /** Continue after running out of moves. */
  addMoves(n: number) {
    this.movesLeft += n;
    this.state = 'play';
    this.busy = false;
  }

  /** Drop specials onto the board mid-level (e.g. bought with a continue). */
  placeSpecials(list: Special[]) {
    const spots: Piece[] = [];
    this.board.forEachPiece((p) => { if (p.special === 'none') spots.push(p); });
    for (const s of list) {
      if (!spots.length) break;
      const p = spots.splice(Math.floor(this.rng() * spots.length), 1)[0];
      p.special = s;
      p.color = -1;
      p.bornAt = this.now;
    }
  }

  hint(): Move | null {
    const moves = this.board.findMoves();
    if (!moves.length) return null;
    const best = Math.max(...moves.map((m) => m.score));
    const top = moves.filter((m) => m.score === best);
    return top[Math.floor(this.rng() * top.length)];
  }

  /** Level won with moves left: turn moves into rockets and fire everything. */
  startBonus() {
    this.state = 'bonus';
    this.busy = true;
    this.stats.bonusMoves = this.movesLeft;
    let converted = 0;
    const next = () => {
      if (this.movesLeft <= 0 || converted >= 15) {
        this.movesLeft = 0;
        this.whenIdle(() => this.bonusFire());
        return;
      }
      const normals: Piece[] = [];
      this.board.forEachPiece((p) => { if (p.special === 'none') normals.push(p); });
      if (normals.length) {
        const p = normals[Math.floor(this.rng() * normals.length)];
        p.special = this.rng() < 0.5 ? 'rocketH' : 'rocketV';
        p.color = -1;
        p.bornAt = this.now;
        this.emit({ type: 'bonus-move', r: p.r, c: p.c });
      }
      this.movesLeft--;
      converted++;
      this.after(110, next);
    };
    next();
  }

  // ---------- resolution loop ----------

  private step() {
    const dur = this.board.applyGravity(this.now);
    if (dur > 0) {
      this.after(dur, () => { this.emit({ type: 'land' }); this.whenIdle(() => this.step()); });
      return;
    }
    const groups = this.board.findMatches(this.prefer);
    this.prefer = [];
    if (groups.length) {
      this.cascade++;
      this.stats.maxCascade = Math.max(this.stats.maxCascade, this.cascade);
      if (this.cascade >= 2) this.emit({ type: 'cascade', n: this.cascade });
      this.clearGroups(groups);
      this.whenIdle(() => this.step());
      return;
    }
    this.endTurn();
  }

  private endTurn() {
    this.cascade = 0;
    if (this.state === 'bonus') { this.bonusFire(); return; }
    if (this.goals.every((g) => g.left <= 0)) {
      this.state = 'won';
      this.busy = false;
      this.emit({ type: 'won' });
      return;
    }
    if (this.movesLeft <= 0) {
      this.state = 'lost';
      this.busy = false;
      this.emit({ type: 'lost' });
      return;
    }
    if (this.board.findMoves().length === 0) {
      this.emit({ type: 'shuffle' });
      // A board that can't be fixed by shuffling gets a free bomb instead (guarantees a move).
      if (!this.board.shuffle(this.now, 450)) this.placeSpecials(['bomb']);
      this.after(500, () => this.endTurn());
      return;
    }
    this.busy = false;
    this.emit({ type: 'turn-end' });
  }

  private bonusFire() {
    const specials: Piece[] = [];
    this.board.forEachPiece((p) => { if (p.special !== 'none') specials.push(p); });
    if (!specials.length) {
      this.state = 'done';
      this.busy = false;
      this.emit({ type: 'bonus-done' });
      return;
    }
    specials.forEach((p, i) => this.after(i * 130, () => { if (this.board.piece(p.r, p.c) === p) this.activate(p); }));
    this.whenIdle(() => this.step());
  }

  private clearGroups(groups: MatchGroup[]) {
    const bd = this.board;
    const boxHits = new Map<number, Pos>();
    for (const g of groups) {
      this.emit({ type: 'match', size: g.cells.length, cascade: this.cascade });
      for (const pos of g.cells) {
        const p = bd.piece(pos.r, pos.c);
        if (p) this.destroyPiece(p, g.special !== 'none' ? 'merge' : 'pop', g.at);
        if (bd.get(pos.r, pos.c)!.dirt > 0) this.damageDirt(pos.r, pos.c);
        for (const [dr, dc] of DIRS) {
          const r = pos.r + dr, c = pos.c + dc;
          const nb = bd.get(r, c);
          if (nb?.playable && nb.box > 0) boxHits.set(r * bd.cols + c, { r, c });
        }
      }
      if (g.special !== 'none') {
        const sp = bd.makePiece(g.at.r, g.at.c, -1, g.special, this.now + 130);
        bd.place(sp, g.at.r, g.at.c);
        this.countMade(g.special);
        this.emit({ type: 'special', special: g.special, r: g.at.r, c: g.at.c });
      }
    }
    for (const pos of boxHits.values()) this.damageBox(pos.r, pos.c);
    this.after(170, () => {});
  }

  private countMade(s: Special) {
    this.stats.made++;
    if (isRocket(s)) this.stats.rockets++;
    else if (s === 'bomb') this.stats.bombs++;
    else if (s === 'plane') this.stats.planes++;
    else if (s === 'rainbow') this.stats.rainbows++;
  }

  // ---------- damage ----------

  private hit(r: number, c: number) {
    const cell = this.board.get(r, c);
    if (!cell?.playable) return;
    if (cell.box > 0) { this.damageBox(r, c); return; }
    const p = cell.piece;
    if (p) {
      if (p.special !== 'none') this.activate(p);
      else this.destroyPiece(p, 'pop');
    }
    if (cell.dirt > 0) this.damageDirt(r, c);
  }

  private removeFromGrid(p: Piece, kind: Dying['kind'], to?: Pos) {
    const cell = this.board.get(p.r, p.c);
    if (cell && cell.piece === p) cell.piece = null;
    this.dying.push({ p, t0: this.now, kind, to });
  }

  private destroyPiece(p: Piece, kind: 'pop' | 'merge', to?: Pos) {
    this.removeFromGrid(p, kind, to);
    if (p.color >= 0) this.stats.cleared[p.color]++;
    this.emit({ type: 'pop', r: p.r, c: p.c, color: p.color });
    const gi = this.goals.findIndex((g) => g.kind === 'color' && g.color === p.color && g.left > 0);
    if (gi >= 0) {
      this.goals[gi].left--;
      this.emit({ type: 'collect', goal: gi, r: p.r, c: p.c });
    }
  }

  private damageBox(r: number, c: number) {
    const cell = this.board.get(r, c)!;
    if (cell.box <= 0) return;
    cell.box--;
    this.emit({ type: 'box', r, c, left: cell.box });
    if (cell.box === 0) {
      this.stats.boxes++;
      this.collectGoal('box', r, c);
    }
  }

  private damageDirt(r: number, c: number) {
    const cell = this.board.get(r, c)!;
    if (cell.dirt <= 0) return;
    cell.dirt--;
    this.emit({ type: 'dirt', r, c, left: cell.dirt });
    if (cell.dirt === 0) {
      this.stats.dirt++;
      this.collectGoal('dirt', r, c);
    }
  }

  private collectGoal(kind: 'box' | 'dirt', r: number, c: number) {
    const gi = this.goals.findIndex((g) => g.kind === kind && g.left > 0);
    if (gi >= 0) {
      this.goals[gi].left--;
      this.emit({ type: 'collect', goal: gi, r, c });
    }
  }

  // ---------- specials ----------

  private tween(p: Piece, from: Pos, to: Pos, dur: number) {
    p.mv = { kind: 'tween', pts: [{ x: from.c, y: from.r }, { x: to.c, y: to.r }], t0: this.now, dur };
  }

  private swapSpecials(p: Piece, q: Piece) {
    if (p.special !== 'none' && q.special !== 'none') { this.combo(p, q); return; }
    const s = p.special !== 'none' ? p : q;
    const n = s === p ? q : p;
    if (s.special === 'rainbow') {
      this.removeFromGrid(s, 'fire');
      this.countUse('rainbow', s.r, s.c);
      this.fireRainbow(s.r, s.c, n.color, null);
    } else {
      this.activate(s);
    }
  }

  private combo(p: Piece, q: Piece) {
    const r = p.r, c = p.c;
    const a = p.special, b = q.special;
    const has = (k: Special) => a === k || b === k;
    this.removeFromGrid(p, 'fire');
    this.removeFromGrid(q, 'merge', { r, c });
    this.emit({ type: 'activate', special: a, r, c, combo: true });

    if (has('rainbow')) {
      if (a === 'rainbow' && b === 'rainbow') { this.fireAll(r, c); return; }
      const other = a === 'rainbow' ? b : a;
      this.fireRainbow(r, c, this.bestColor(), other);
      return;
    }
    if (a === 'bomb' && b === 'bomb') { this.fireBomb(r, c, 4); return; }
    if (has('plane')) {
      const other = a === 'plane' ? b : a;
      if (other === 'plane') for (let i = 0; i < 3; i++) this.firePlane(r, c, 'none', i === 0);
      else this.firePlane(r, c, other, true);
      return;
    }
    if (has('bomb')) {
      for (const d of [-1, 0, 1]) { this.fireRocket(r + d, c, 'h'); this.fireRocket(r, c + d, 'v'); }
      return;
    }
    this.fireRocket(r, c, 'h');
    this.fireRocket(r, c, 'v');
  }

  private countUse(s: Special, r: number, c: number) {
    this.emit({ type: 'activate', special: s, r, c });
  }

  private activate(p: Piece) {
    const { r, c, special } = p;
    this.removeFromGrid(p, 'fire');
    switch (special) {
      case 'rocketH': this.fireRocket(r, c, 'h'); break;
      case 'rocketV': this.fireRocket(r, c, 'v'); break;
      case 'bomb': this.fireBomb(r, c, 2); break;
      case 'plane': this.firePlane(r, c, 'none', true); break;
      case 'rainbow': this.countUse('rainbow', r, c); this.fireRainbow(r, c, this.bestColor(), null); break;
      default: break;
    }
  }

  private fireRocket(r: number, c: number, dir: 'h' | 'v') {
    const bd = this.board;
    if (dir === 'h' && (r < 0 || r >= bd.rows)) return;
    if (dir === 'v' && (c < 0 || c >= bd.cols)) return;
    const len = dir === 'h' ? bd.cols : bd.rows;
    const origin = dir === 'h' ? c : r;
    const far = Math.max(origin, len - 1 - origin);
    this.effects.push({ type: 'rocket', t0: this.now, dur: (far + 4) * ROCKET_MS_PER_CELL, r, c, dir });
    this.emit({ type: 'activate', special: dir === 'h' ? 'rocketH' : 'rocketV', r, c });
    for (let k = 0; k < len; k++) {
      const d = Math.abs(k - origin);
      const rr = dir === 'h' ? r : k, cc = dir === 'h' ? k : c;
      if (d === 0) this.hit(rr, cc);
      else this.after(d * ROCKET_MS_PER_CELL, () => this.hit(rr, cc));
    }
  }

  private fireBomb(r: number, c: number, radius: number) {
    this.effects.push({ type: 'bomb', t0: this.now, dur: 520, r, c, radius });
    this.emit({ type: 'activate', special: 'bomb', r, c });
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        const d = Math.abs(dr) + Math.abs(dc);
        if (d > radius * 1.5) continue;
        this.after(50 + Math.max(Math.abs(dr), Math.abs(dc)) * 45, () => this.hit(r + dr, c + dc));
      }
    }
  }

  private fireAll(r: number, c: number) {
    this.effects.push({ type: 'flash', t0: this.now, dur: 900, r, c });
    this.emit({ type: 'activate', special: 'rainbow', r, c, combo: true });
    const bd = this.board;
    for (let rr = 0; rr < bd.rows; rr++) {
      for (let cc = 0; cc < bd.cols; cc++) {
        const d = Math.max(Math.abs(rr - r), Math.abs(cc - c));
        this.after(120 + d * 70, () => this.hit(rr, cc));
      }
    }
  }

  private firePlane(r: number, c: number, carry: Special, hitCross: boolean) {
    if (hitCross) for (const [dr, dc] of [[0, 0], ...DIRS]) this.hit(r + dr, c + dc);
    this.emit({ type: 'activate', special: 'plane', r, c });
    const target = this.pickTarget();
    if (!target) return;
    const key = target.r * this.board.cols + target.c;
    this.planeTargets.add(key);
    const dur = 650 + this.rng() * 150;
    this.effects.push({ type: 'plane', t0: this.now, dur, from: { r, c }, to: target, carry });
    this.after(dur, () => {
      this.planeTargets.delete(key);
      this.hit(target.r, target.c);
      if (isRocket(carry)) this.fireRocket(target.r, target.c, carry === 'rocketH' ? 'h' : 'v');
      else if (carry === 'bomb') this.fireBomb(target.r, target.c, 2);
    });
  }

  /** Plane targets: goal obstacles first, then goal colors, then anything. */
  private pickTarget(): Pos | null {
    const bd = this.board;
    const goalLeft = (k: GoalState['kind'], color = -1) => this.goals.some((g) => g.kind === k && g.left > 0 && (color < 0 || g.color === color));
    let best = 0;
    let options: Pos[] = [];
    for (let r = 0; r < bd.rows; r++) {
      for (let c = 0; c < bd.cols; c++) {
        const cell = bd.cells[r][c];
        if (!cell.playable || this.planeTargets.has(r * bd.cols + c)) continue;
        let s = 0;
        if (cell.box > 0) s = goalLeft('box') ? 40 + cell.box : 2;
        else if (cell.dirt > 0 && goalLeft('dirt')) s = 30 + cell.dirt;
        else if (cell.piece && cell.piece.special === 'none' && goalLeft('color', cell.piece.color)) s = 10;
        else if (cell.piece) s = 1;
        if (s > best) { best = s; options = []; }
        if (s === best && s > 0) options.push({ r, c });
      }
    }
    return options.length ? options[Math.floor(this.rng() * options.length)] : null;
  }

  /** Color a rainbow should take: a needed goal color if present, else the most common one. */
  private bestColor(): number {
    const counts = new Array(this.board.colors).fill(0);
    this.board.forEachPiece((p) => { if (p.special === 'none') counts[p.color]++; });
    let best = -1;
    for (const g of this.goals) {
      if (g.kind === 'color' && g.left > 0 && counts[g.color] > 0 && (best < 0 || counts[g.color] > counts[best])) best = g.color;
    }
    if (best >= 0) return best;
    return counts.indexOf(Math.max(...counts));
  }

  private fireRainbow(r: number, c: number, color: number, convert: Special | null) {
    const targets: Pos[] = [];
    this.board.forEachPiece((p) => { if (p.special === 'none' && p.color === color) targets.push({ r: p.r, c: p.c }); });
    targets.sort((a, b) => Math.hypot(a.r - r, a.c - c) - Math.hypot(b.r - r, b.c - c));
    const step = convert ? 50 : 30;
    this.effects.push({ type: 'beams', t0: this.now, dur: 300 + targets.length * step + 300, r, c, targets });
    this.hit(r, c);
    if (!convert) {
      targets.forEach((t, i) => this.after(260 + i * step, () => this.hit(t.r, t.c)));
      return;
    }
    targets.forEach((t, i) => this.after(260 + i * step, () => {
      const p = this.board.piece(t.r, t.c);
      if (!p || p.special !== 'none' || p.color !== color) return;
      p.special = isRocket(convert) ? (this.rng() < 0.5 ? 'rocketH' : 'rocketV') : convert;
      p.color = -1;
      p.bornAt = this.now;
      this.emit({ type: 'special', special: p.special, r: t.r, c: t.c });
    }));
    this.after(260 + targets.length * step + 250, () => {
      targets.forEach((t, i) => this.after(i * 110, () => {
        const p = this.board.piece(t.r, t.c);
        if (p && p.special !== 'none') this.activate(p);
      }));
    });
  }
}
