import type { RNG } from '../core/rng.ts';
import { shuffleInPlace } from '../core/rng.ts';

export type Special = 'none' | 'rocketH' | 'rocketV' | 'bomb' | 'plane' | 'rainbow';

export interface Pos { r: number; c: number }

/** Visual motion. 'path' = gravity fall along waypoints, 'tween' = eased move between 2 points. Times in ms. */
export interface Motion { kind: 'path' | 'tween'; pts: { x: number; y: number }[]; t0: number; dur: number }

export interface Piece {
  id: number;
  /** 0..5 for normal pieces, -1 for (colorless) specials. */
  color: number;
  special: Special;
  r: number;
  c: number;
  mv: Motion | null;
  bornAt: number;
  /** Set by the renderer when a fall ends (landing squash). */
  landAt: number;
  /** Drop toy: colorless, never matches, can't be destroyed; collected at the bottom of its column. */
  toy: boolean;
}

/** `ice` locks the cell's piece in place (layers); `carpet` is floor that matches can spread. */
export interface Cell { playable: boolean; piece: Piece | null; dirt: number; box: number; ice: number; carpet: boolean }

export interface MatchGroup { cells: Pos[]; color: number; special: Special; at: Pos }

export interface Move { a: Pos; b: Pos; score: number }

// Fall kinematics (cells, seconds). Shared by the engine (timing) and the renderer (drawing).
const FALL_A = 60, FALL_V0 = 4, FALL_VMAX = 18;
const T_MAX = (FALL_VMAX - FALL_V0) / FALL_A;
const D_MAX = FALL_V0 * T_MAX + 0.5 * FALL_A * T_MAX * T_MAX;

export function fallDist(tSec: number): number {
  if (tSec <= 0) return 0;
  if (tSec < T_MAX) return FALL_V0 * tSec + 0.5 * FALL_A * tSec * tSec;
  return D_MAX + FALL_VMAX * (tSec - T_MAX);
}

export function fallTime(dist: number): number {
  if (dist <= D_MAX) return (-FALL_V0 + Math.sqrt(FALL_V0 * FALL_V0 + 2 * FALL_A * dist)) / FALL_A;
  return T_MAX + (dist - D_MAX) / FALL_VMAX;
}

export function pathLength(pts: { x: number; y: number }[]): number {
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return len;
}

export const isRocket = (s: Special) => s === 'rocketH' || s === 'rocketV';

export class Board {
  readonly rows: number;
  readonly cols: number;
  readonly cells: Cell[][];
  colors: number;
  /** Relative spawn weight per color (goal colors get a small boost to keep levels friendly). */
  weights: number[];
  /** How many more drop toys may spawn from the top (set by the engine before each refill). */
  toyQuota = 0;
  private rng: RNG;
  private nextId = 1;

  constructor(mask: string[], colors: number, rng: RNG) {
    this.rows = mask.length;
    this.cols = Math.max(...mask.map((m) => m.length));
    this.colors = colors;
    this.rng = rng;
    this.weights = Array.from({ length: colors }, () => 1);
    this.cells = [];
    for (let r = 0; r < this.rows; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < this.cols; c++) {
        const ch = mask[r][c] ?? ' ';
        row.push({
          playable: ch !== ' ',
          piece: null,
          box: ch === 'b' ? 1 : ch === 'B' ? 2 : ch === 'C' ? 3 : 0,
          dirt: ch === 'd' ? 1 : ch === 'D' ? 2 : 0,
          ice: ch === 'i' ? 1 : ch === 'I' ? 2 : 0,
          carpet: ch === 'k',
        });
      }
      this.cells.push(row);
    }
  }

  get(r: number, c: number): Cell | undefined {
    return this.cells[r]?.[c];
  }

  /** Cell can contain a piece. */
  canHold(r: number, c: number): boolean {
    const cell = this.get(r, c);
    return !!cell && cell.playable && cell.box === 0;
  }

  piece(r: number, c: number): Piece | null {
    return this.get(r, c)?.piece ?? null;
  }

  /** Piece can be swapped / moved by gravity (not frozen under ice). */
  canMove(r: number, c: number): boolean {
    const cell = this.get(r, c);
    return !!cell && cell.playable && cell.box === 0 && cell.ice === 0;
  }

  colorAt(r: number, c: number): number {
    const p = this.piece(r, c);
    return p && p.special === 'none' && !p.toy ? p.color : -1;
  }

  /** A plain colored piece (not a special, not a toy). */
  static isNormal(p: Piece | null): p is Piece {
    return !!p && p.special === 'none' && !p.toy;
  }

  makePiece(r: number, c: number, color: number, special: Special = 'none', bornAt = -1e9): Piece {
    return { id: this.nextId++, color: special === 'none' ? color : -1, special, r, c, mv: null, bornAt, landAt: -1e9, toy: false };
  }

  makeToy(r: number, c: number, bornAt = -1e9): Piece {
    const p = this.makePiece(r, c, -1, 'none', bornAt);
    p.toy = true;
    return p;
  }

  /** Lowest playable cell of a column: where drop toys leave the board. */
  exitRow(c: number): number {
    for (let r = this.rows - 1; r >= 0; r--) if (this.cells[r][c].playable) return r;
    return -1;
  }

  place(p: Piece | null, r: number, c: number) {
    this.cells[r][c].piece = p;
    if (p) { p.r = r; p.c = c; }
  }

  randomColor(): number {
    let total = 0;
    for (const w of this.weights) total += w;
    let x = this.rng() * total;
    for (let i = 0; i < this.weights.length; i++) {
      x -= this.weights[i];
      if (x < 0) return i;
    }
    return this.weights.length - 1;
  }

  /** Fill every empty holdable cell without creating matches, guaranteeing at least one valid move. */
  fillInitial() {
    for (let attempt = 0; attempt < 50; attempt++) {
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          if (!this.canHold(r, c)) continue;
          const cell = this.cells[r][c];
          if (cell.piece && !Board.isNormal(cell.piece)) continue;
          let color = this.randomColor();
          for (let k = 0; k < 20 && this.wouldMatchWith(r, c, color); k++) color = this.randomColor();
          cell.piece = this.makePiece(r, c, color);
        }
      }
      if (this.findMatches([]).length === 0 && this.findMoves().length > 0) return;
      // Retry: clear normal pieces.
      for (const row of this.cells) for (const cell of row) if (Board.isNormal(cell.piece)) cell.piece = null;
    }
  }

  /** Placing `color` at (r,c) would complete a line of 3 or a 2x2 square with already-placed neighbours. */
  private wouldMatchWith(r: number, c: number, color: number): boolean {
    const same = (rr: number, cc: number) => this.colorAt(rr, cc) === color;
    if (same(r, c - 1) && same(r, c - 2)) return true;
    if (same(r - 1, c) && same(r - 2, c)) return true;
    if (same(r, c - 1) && same(r - 1, c) && same(r - 1, c - 1)) return true;
    if (same(r, c + 1) && same(r - 1, c) && same(r - 1, c + 1)) return true;
    return false;
  }

  /** All match groups currently on the board. `prefer` = cells where a created special should appear (swap cells). */
  findMatches(prefer: Pos[]): MatchGroup[] {
    const R = this.rows, C = this.cols;
    const idx = (r: number, c: number) => r * C + c;
    const parent = new Int32Array(R * C).fill(-1);
    const hLen = new Int8Array(R * C);
    const vLen = new Int8Array(R * C);
    const inSquare = new Uint8Array(R * C);
    const find = (i: number): number => {
      while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; }
      return i;
    };
    const mark = (i: number) => { if (parent[i] === -1) parent[i] = i; };
    const union = (a: number, b: number) => {
      mark(a); mark(b);
      const ra = find(a), rb = find(b);
      if (ra !== rb) parent[ra] = rb;
    };

    for (let r = 0; r < R; r++) {
      let c = 0;
      while (c < C) {
        const col = this.colorAt(r, c);
        let e = c + 1;
        while (col >= 0 && e < C && this.colorAt(r, e) === col) e++;
        if (col >= 0 && e - c >= 3) {
          for (let k = c; k < e; k++) {
            hLen[idx(r, k)] = e - c;
            if (k > c) union(idx(r, k - 1), idx(r, k)); else mark(idx(r, k));
          }
        }
        c = e;
      }
    }
    for (let c = 0; c < C; c++) {
      let r = 0;
      while (r < R) {
        const col = this.colorAt(r, c);
        let e = r + 1;
        while (col >= 0 && e < R && this.colorAt(e, c) === col) e++;
        if (col >= 0 && e - r >= 3) {
          for (let k = r; k < e; k++) {
            vLen[idx(k, c)] = e - r;
            if (k > r) union(idx(k - 1, c), idx(k, c)); else mark(idx(k, c));
          }
        }
        r = e;
      }
    }
    for (let r = 0; r < R - 1; r++) {
      for (let c = 0; c < C - 1; c++) {
        const col = this.colorAt(r, c);
        if (col < 0 || this.colorAt(r, c + 1) !== col || this.colorAt(r + 1, c) !== col || this.colorAt(r + 1, c + 1) !== col) continue;
        const sq = [idx(r, c), idx(r, c + 1), idx(r + 1, c), idx(r + 1, c + 1)];
        for (const i of sq) inSquare[i] = 1;
        union(sq[0], sq[1]); union(sq[0], sq[2]); union(sq[0], sq[3]);
      }
    }

    const groups = new Map<number, number[]>();
    for (let i = 0; i < R * C; i++) {
      if (parent[i] === -1) continue;
      const root = find(i);
      let g = groups.get(root);
      if (!g) groups.set(root, (g = []));
      g.push(i);
    }

    const result: MatchGroup[] = [];
    for (const members of groups.values()) {
      let maxH = 0, maxV = 0, square = false, cross = -1;
      for (const i of members) {
        maxH = Math.max(maxH, hLen[i]);
        maxV = Math.max(maxV, vLen[i]);
        if (inSquare[i]) square = true;
        if (hLen[i] >= 3 && vLen[i] >= 3) cross = i;
      }
      let special: Special = 'none';
      if (maxH >= 5 || maxV >= 5) special = 'rainbow';
      else if (maxH >= 3 && maxV >= 3) special = 'bomb';
      else if (maxH >= 4) special = 'rocketH';
      else if (maxV >= 4) special = 'rocketV';
      else if (square) special = 'plane';

      const cells = members.map((i) => ({ r: Math.floor(i / C), c: i % C }));
      let at: Pos | undefined = prefer.find((p) => members.includes(idx(p.r, p.c)));
      if (!at && special === 'bomb' && cross >= 0) at = { r: Math.floor(cross / C), c: cross % C };
      if (!at) {
        const sorted = [...cells].sort((a, b) => b.r - a.r || a.c - b.c);
        at = sorted[Math.floor((sorted.length - 1) / 2)];
      }
      result.push({ cells, color: this.colorAt(cells[0].r, cells[0].c), special, at });
    }
    return result;
  }

  /** Match strength if the normal piece at (r,c) participates in a match (0 = none). */
  private matchScoreAt(r: number, c: number): number {
    const col = this.colorAt(r, c);
    if (col < 0) return 0;
    const same = (rr: number, cc: number) => this.colorAt(rr, cc) === col;
    let h = 1, v = 1;
    for (let k = c - 1; same(r, k); k--) h++;
    for (let k = c + 1; same(r, k); k++) h++;
    for (let k = r - 1; same(k, c); k--) v++;
    for (let k = r + 1; same(k, c); k++) v++;
    let sq = false;
    for (const [dr, dc] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
      if (same(r + dr, c) && same(r, c + dc) && same(r + dr, c + dc)) sq = true;
    }
    if (h >= 5 || v >= 5) return 60;
    if (h >= 3 && v >= 3) return 45;
    if (h >= 4 || v >= 4) return 30;
    if (sq) return 25;
    if (h >= 3 || v >= 3) return 10 + (h >= 3 ? h : 0) + (v >= 3 ? v : 0);
    return 0;
  }

  /** Every valid swap. Specials can always be swapped with any neighbour; toys can always move down. */
  findMoves(): Move[] {
    const moves: Move[] = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const p = this.piece(r, c);
        if (!p || !this.canMove(r, c)) continue;
        for (const [dr, dc] of [[0, 1], [1, 0]]) {
          const r2 = r + dr, c2 = c + dc;
          const q = this.piece(r2, c2);
          if (!q || !this.canMove(r2, c2) || (p.toy && q.toy)) continue;
          const a = { r, c }, b = { r: r2, c: c2 };
          // A toy can always be pushed one cell down (swapping with the plain piece under it).
          if (dr === 1 && p.toy && Board.isNormal(q)) { moves.push({ a, b, score: 20 }); continue; }
          if (p.special !== 'none' || q.special !== 'none') {
            moves.push({ a, b, score: p.special !== 'none' && q.special !== 'none' ? 100 : 35 });
            continue;
          }
          if (p.color === q.color) continue;
          this.place(q, r, c); this.place(p, r2, c2);
          const score = this.matchScoreAt(r, c) + this.matchScoreAt(r2, c2);
          this.place(p, r, c); this.place(q, r2, c2);
          if (score > 0) moves.push({ a, b, score });
        }
      }
    }
    return moves;
  }

  hasSpecial(): boolean {
    for (const row of this.cells) for (const cell of row) if (cell.piece && cell.piece.special !== 'none') return true;
    return false;
  }

  /**
   * Let pieces fall and spawn new ones. Sets a 'path' motion on every piece that moves.
   * Returns the time (ms) until the last piece lands, 0 if nothing moved.
   */
  applyGravity(now: number): number {
    const R = this.rows, C = this.cols;
    const moved = new Set<Piece>();
    const spawned = new Array(C).fill(0);
    const waypoints = new Map<Piece, { x: number; y: number }[]>();
    const movePiece = (p: Piece, r: number, c: number) => {
      let pts = waypoints.get(p);
      if (!pts) waypoints.set(p, (pts = [{ x: p.c, y: p.r }]));
      this.cells[p.r][p.c].piece = null;
      this.place(p, r, c);
      pts.push({ x: c, y: r });
      moved.add(p);
    };
    const isEmptyTarget = (r: number, c: number) => this.canHold(r, c) && !this.cells[r][c].piece;

    for (let guard = 0; guard < 500; guard++) {
      let changed = false;
      // Straight falls (bottom-up), spawning at the top of each column.
      for (let r = R - 1; r >= 0; r--) {
        for (let c = 0; c < C; c++) {
          if (!isEmptyTarget(r, c)) continue;
          let rr = r - 1;
          while (rr >= 0 && !this.cells[rr][c].playable) rr--;
          if (rr < 0) {
            // Only touch the RNG for toys when the level has some to give (keeps other levels' sequences intact).
            // Never in the edge columns: matches there are rare, so a toy would crawl down.
            const toy = this.toyQuota > 0 && c > 0 && c < C - 1 && this.rng() < 0.2;
            if (toy) this.toyQuota--;
            const p = toy ? this.makeToy(r, c) : this.makePiece(r, c, this.randomColor());
            this.place(p, r, c);
            waypoints.set(p, [{ x: c, y: r - 1 - spawned[c] }, { x: c, y: r }]);
            spawned[c]++;
            moved.add(p);
            changed = true;
            continue;
          }
          const src = this.cells[rr][c];
          if (src.box === 0 && src.ice === 0 && src.piece) { movePiece(src.piece, r, c); changed = true; }
        }
      }
      if (changed) continue;
      // Diagonal slides into cells blocked from above (e.g. under boxes).
      outer: for (let r = R - 1; r > 0; r--) {
        for (let c = 0; c < C; c++) {
          if (!isEmptyTarget(r, c)) continue;
          const dirs = (r + c + guard) % 2 ? [-1, 1] : [1, -1];
          for (const dc of dirs) {
            const sr = r - 1, sc = c + dc;
            if (!this.canMove(sr, sc)) continue;
            const src = this.cells[sr][sc].piece;
            if (!src) continue;
            // Only slide if that piece can't fall straight itself.
            if (this.canHold(sr + 1, sc) && !this.cells[sr + 1][sc].piece) continue;
            movePiece(src, r, c);
            changed = true;
            break outer;
          }
        }
      }
      if (!changed) break;
    }

    let maxDur = 0;
    for (const p of moved) {
      const pts = waypoints.get(p)!;
      const dur = fallTime(pathLength(pts)) * 1000;
      p.mv = { kind: 'path', pts, t0: now, dur };
      maxDur = Math.max(maxDur, dur);
    }
    return maxDur;
  }

  /** Rearrange normal pieces so there are no matches and at least one move. Sets tween motions. */
  shuffle(now: number, dur: number): boolean {
    const slots: Pos[] = [];
    const pieces: Piece[] = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const p = this.piece(r, c);
        if (Board.isNormal(p) && this.canMove(r, c)) { slots.push({ r, c }); pieces.push(p); }
      }
    }
    if (pieces.length < 3) return false;
    const from = new Map(pieces.map((p) => [p, { x: p.c, y: p.r }]));
    let ok = false;
    for (let attempt = 0; attempt < 200 && !ok; attempt++) {
      shuffleInPlace(this.rng, pieces);
      slots.forEach((s, i) => this.place(pieces[i], s.r, s.c));
      ok = this.findMatches([]).length === 0 && this.findMoves().length > 0;
      if (!ok && attempt > 100) {
        // Recolor as a last resort.
        for (const p of pieces) p.color = this.randomColor();
      }
    }
    for (const p of pieces) {
      p.mv = { kind: 'tween', pts: [from.get(p)!, { x: p.c, y: p.r }], t0: now, dur };
    }
    return ok;
  }

  forEachPiece(fn: (p: Piece, cell: Cell) => void) {
    for (const row of this.cells) for (const cell of row) if (cell.piece) fn(cell.piece, cell);
  }
}
