import { fallDist, pathLength, type Piece, type Pos, type Special } from './board.ts';
import type { Dying, Effect, Engine, EngineEvent } from './engine.ts';
import { boxSprite, carpetSprite, dirtSprite, goalSprite, iceSprite, pieceSprite, PIECE_COLORS, rocketHeadSprite, specialSprite, toySprite } from './sprites.ts';
import { Particles } from './fx/particles.ts';
import { glowTex, hotTex, hueColor, puffTex, shardTex, sparkleTex, whiteOf } from './fx/textures.ts';

interface FloatText { text: string; x: number; y: number; t0: number; end: number; size: number; rot: number; yOff: number; yTo: number }
interface Flyer { img: HTMLCanvasElement; x0: number; y0: number; x1: number; y1: number; t0: number; dur: number; done: () => void }
/** Renderer-owned board effects, timed on the engine clock. */
interface LocalFx { kind: 'burst' | 'spawn' | 'boardFlash'; x: number; y: number; t0: number; dur: number; size: number; color: string }

const TAU = Math.PI * 2;
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOutBack = (t: number) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
/** Cheap deterministic hash → [0,1). Used for lightning jitter that only re-rolls every few frames. */
const hash = (a: number, b: number, c: number) => {
  let h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263) + Math.imul(c | 0, 1274126177)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

const SPECIAL_GLOW: Partial<Record<Special, string>> = { rocketH: '#ffb35c', rocketV: '#ffb35c', bomb: '#ffcf6a', plane: '#9fdcff' };
const MAX_PARTICLES = 400;

export interface RendererHooks {
  /** Screen position (CSS px) of the HUD icon for goal i. */
  goalTarget(i: number): { x: number; y: number } | null;
  goalArrived(i: number): void;
  sound(name: string, arg?: number): void;
  text(key: string): string;
}

export class Renderer {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private engine: Engine;
  private hooks: RendererHooks;
  dpr = 1;
  W = 0;
  H = 0;
  cs = 48;
  bx = 0;
  by = 0;
  private bg: HTMLCanvasElement | null = null;
  private bgMargin = 16;
  private clip = new Path2D();
  private parts = new Particles(MAX_PARTICLES);
  private texts: FloatText[] = [];
  private flyers: Flyer[] = [];
  private lfx: LocalFx[] = [];
  private sched: { t: number; fn: () => void }[] = [];
  private seen = new WeakSet<Effect>();
  /** Wall clock (performance.now) — only used for the hint, whose t0 comes from the UI. */
  private wall = 0;
  /** Visual clock in ms, advanced by draw(dt). Drives texts, flyers, shake, idle animation. */
  private clock = 0;
  private dts = 0;
  private shakeAmp = 0;
  private shakeT0 = 0;
  private zoomT0 = -1e9;
  private comboAt = -1;
  private lastCarpetSound = -1;
  private matchSize = 0;
  private matchAt = -1;
  /** Piece id → engine time when its "no!" headshake starts (invalid swap). */
  private wobble = new Map<number, number>();
  /** Cell index → engine time when carpet was laid there (unroll animation). */
  private carpetT0 = new Map<number, number>();
  /** Piece id → clock time when its idle shine started. */
  private shines = new Map<number, number>();
  private nextShine = 1500;
  private shineCv: HTMLCanvasElement | null = null;
  private shineG: CanvasRenderingContext2D | null = null;
  private shineGrad: CanvasGradient | null = null;
  private reduced = false;
  // Base transform of the board layer (shake + zoom punch), for the particle system.
  private bs = 1;
  private btx = 0;
  private bty = 0;
  hint: { a: Pos; b: Pos; t0: number } | null = null;
  selected: Pos | null = null;
  /** Booster aiming: highlight a cell or row under the finger. */
  aim: { kind: 'hammer' | 'broom'; pos: Pos | null } | null = null;

  constructor(canvas: HTMLCanvasElement, engine: Engine, hooks: RendererHooks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.engine = engine;
    this.hooks = hooks;
    const mq = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mq) {
      this.reduced = mq.matches;
      mq.addEventListener?.('change', (ev) => { this.reduced = ev.matches; });
    }
    engine.on((e) => this.onEvent(e));
  }

  resize(W: number, H: number, top: number, bottom: number) {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    this.W = W;
    this.H = H;
    this.canvas.width = Math.round(W * this.dpr);
    this.canvas.height = Math.round(H * this.dpr);
    this.canvas.style.width = `${W}px`;
    this.canvas.style.height = `${H}px`;
    const b = this.engine.board;
    const availW = W - 20, availH = H - top - bottom - 20;
    this.cs = Math.floor(Math.min(availW / b.cols, availH / b.rows, 76));
    this.bx = Math.round((W - this.cs * b.cols) / 2);
    this.by = Math.round(top + 10 + (availH - this.cs * b.rows) / 2);
    this.buildBackground();
  }

  cellCenter(r: number, c: number) {
    return { x: this.bx + (c + 0.5) * this.cs, y: this.by + (r + 0.5) * this.cs };
  }

  cellAt(x: number, y: number): Pos | null {
    const c = Math.floor((x - this.bx) / this.cs), r = Math.floor((y - this.by) / this.cs);
    const cell = this.engine.board.get(r, c);
    return cell?.playable ? { r, c } : null;
  }

  private buildBackground() {
    const b = this.engine.board, cs = this.cs, m = this.bgMargin, dpr = this.dpr;
    const w = b.cols * cs + m * 2, h = b.rows * cs + m * 2;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const g = canvas.getContext('2d')!;
    g.scale(dpr, dpr);
    g.translate(m, m);
    const each = (pad: number, radius: number, fill: string | CanvasGradient) => {
      g.fillStyle = fill;
      g.beginPath();
      for (let r = 0; r < b.rows; r++) {
        for (let c = 0; c < b.cols; c++) {
          if (b.cells[r][c].playable) g.roundRect(c * cs - pad, r * cs - pad, cs + pad * 2, cs + pad * 2, radius);
        }
      }
      g.fill();
    };
    // Light "frosted glass" board on a thick cream rim, so the room stays visible and bright behind it.
    g.save();
    g.shadowColor = 'rgba(70,40,10,0.35)';
    g.shadowBlur = 16;
    g.shadowOffsetY = 6;
    each(10, 18, '#fffaf0');
    g.restore();
    each(6, 14, '#9cc3e6');
    const grad = g.createLinearGradient(0, 0, 0, b.rows * cs);
    grad.addColorStop(0, 'rgba(232,243,255,0.94)');
    grad.addColorStop(1, 'rgba(206,226,248,0.94)');
    each(4, 12, grad);
    for (let r = 0; r < b.rows; r++) {
      for (let c = 0; c < b.cols; c++) {
        if (!b.cells[r][c].playable || (r + c) % 2) continue;
        g.fillStyle = 'rgba(255,255,255,0.55)';
        g.beginPath();
        g.roundRect(c * cs + 1.5, r * cs + 1.5, cs - 3, cs - 3, Math.max(4, cs * 0.14));
        g.fill();
      }
    }
    // Soft top sheen across the glass
    const sheen = g.createLinearGradient(0, 0, 0, b.rows * cs * 0.4);
    sheen.addColorStop(0, 'rgba(255,255,255,0.35)');
    sheen.addColorStop(1, 'rgba(255,255,255,0)');
    each(4, 12, sheen);
    this.bg = canvas;
    this.clip = new Path2D();
    for (let r = 0; r < b.rows; r++) {
      for (let c = 0; c < b.cols; c++) {
        if (b.cells[r][c].playable) this.clip.rect(this.bx + c * cs, this.by + r * cs, cs, cs);
      }
    }
  }

  // ---------- small helpers ----------

  /** Run fn when the engine clock reaches t (immediately if already past). */
  private at(t: number, fn: () => void) {
    if (t <= this.engine.now) fn();
    else this.sched.push({ t, fn });
  }

  /** Damped-sine screen shake. */
  private kick(amp: number) {
    if (this.reduced) amp *= 0.3;
    const env = this.shakeAmp * Math.exp(-(this.clock - this.shakeT0) / 140);
    this.shakeAmp = Math.min(16, Math.max(amp, env + amp * 0.35));
    this.shakeT0 = this.clock;
  }

  private stars(x: number, y: number, n: number, color: string, speed: number, size = 0.4) {
    const cs = this.cs, P = this.parts;
    n = P.budget(n);
    const img = sparkleTex(color);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, v = cs * speed * rnd(0.4, 1);
      const p = P.add('star', x + Math.cos(a) * cs * 0.15, y + Math.sin(a) * cs * 0.15, Math.cos(a) * v, Math.sin(a) * v, rnd(0.45, 0.75), cs * size * rnd(0.7, 1.3), img);
      if (p) { p.drag = 3.2; p.vr = rnd(-3, 3); }
    }
  }

  private glowPuff(x: number, y: number, color: string, size: number, life = 0.3, alpha = 0.8, hot = false) {
    const p = this.parts.add('glow', x, y, 0, 0, life, size, hot ? hotTex(color) : glowTex(color));
    if (p) { p.alpha = alpha; p.grow = 0.6; }
  }

  private ring(x: number, y: number, size: number, color: string, life = 0.35) {
    this.parts.add('ring', x, y, 0, 0, life, size, null, color);
  }

  private smoke(x: number, y: number, n: number, color: string, speed: number, size: number, life: number, alpha = 0.5) {
    const cs = this.cs, P = this.parts;
    n = P.budget(n);
    const img = puffTex(color);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, v = cs * speed * rnd(0.3, 1);
      const p = P.add('smoke', x, y, Math.cos(a) * v, Math.sin(a) * v, life * rnd(0.7, 1.2), cs * size * rnd(0.7, 1.3), img);
      if (p) { p.grow = 1.1; p.alpha = alpha; p.g = -cs * 1.2; p.drag = 2.6; p.vr = rnd(-1, 1); }
    }
  }

  private sparks(x: number, y: number, n: number, color: string, speed: number, life = 0.4, size = 0.16, gravity = 4) {
    const cs = this.cs, P = this.parts;
    n = P.budget(n);
    const img = hotTex(color);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, v = cs * speed * rnd(0.35, 1);
      const p = P.add('spark', x, y, Math.cos(a) * v, Math.sin(a) * v, life * rnd(0.6, 1.2), cs * size * rnd(0.7, 1.3), img);
      if (p) { p.g = cs * gravity; p.drag = 2.2; }
    }
  }

  // ---------- events → particles / sounds ----------

  private onEvent(e: EngineEvent) {
    const h = this.hooks, eng = this.engine;
    switch (e.type) {
      case 'swap': h.sound('swap'); break;
      case 'badswap': {
        h.sound('bad');
        // The two pieces that just started their swap tween get a headshake once they're back home.
        eng.board.forEachPiece((p) => {
          if (p.mv && p.mv.kind === 'tween' && p.mv.t0 === eng.now) this.wobble.set(p.id, eng.now + 320);
        });
        break;
      }
      case 'match':
        this.matchSize = e.size;
        this.matchAt = eng.now;
        h.sound('match', e.cascade);
        break;
      case 'pop': {
        const { x, y } = this.cellCenter(e.r, e.c);
        const col = PIECE_COLORS[e.color] ?? PIECE_COLORS[0];
        const d = eng.dying[eng.dying.length - 1];
        if (d && d.kind === 'merge' && d.p.r === e.r && d.p.c === e.c) {
          this.stars(x, y, 1, col.light, 1.5, 0.3);
          break;
        }
        const matched = this.matchAt === eng.now;
        this.popBurst(x, y, col, matched && this.matchSize >= 4, matched);
        break;
      }
      case 'special': {
        const { x, y } = this.cellCenter(e.r, e.c);
        const p = eng.board.piece(e.r, e.c);
        const t = p ? Math.max(eng.now, p.bornAt) : eng.now;
        this.at(t, () => {
          this.lfx.push({ kind: 'spawn', x, y, t0: this.engine.now, dur: 480, size: 1, color: '#ffe27a' });
          this.stars(x, y, 9, '#fff3b0', 5, 0.45);
          this.ring(x, y, this.cs * 1.3, 'rgba(255,248,210,0.95)', 0.4);
        });
        h.sound('special');
        break;
      }
      case 'activate': {
        if (e.special === 'bomb') h.sound('bomb');
        else if (e.special === 'rocketH' || e.special === 'rocketV') h.sound('rocket');
        else if (e.special === 'rainbow') h.sound('rainbow');
        else if (e.special === 'plane') h.sound('plane');
        if (e.combo) this.comboPunch();
        break;
      }
      case 'box': {
        const { x, y } = this.cellCenter(e.r, e.c);
        const cs = this.cs, P = this.parts;
        const n = P.budget(10);
        for (let i = 0; i < n; i++) {
          const a = Math.random() * TAU, v = cs * rnd(2, 5.5);
          const p = P.add('chip', x, y, Math.cos(a) * v, Math.sin(a) * v - cs * 3, rnd(0.5, 0.8), cs * rnd(0.14, 0.24), null, i % 2 ? '#d4955a' : '#9a5f2e');
          if (p) { p.g = cs * 24; p.drag = 1; p.vr = rnd(-14, 14); }
        }
        this.smoke(x, y, 3, '#efe2cc', 1.6, 0.6, 0.6, 0.55);
        if (e.left === 0) this.stars(x, y, 6, '#ffffff', 3.5);
        h.sound('box');
        break;
      }
      case 'dirt': {
        const { x, y } = this.cellCenter(e.r, e.c);
        this.smoke(x, y, 4, '#c9ab84', 1.8, 0.55, 0.6, 0.6);
        if (e.left === 0) this.stars(x, y, 6, '#ffffff', 3.5);
        h.sound('dirt');
        break;
      }
      case 'ice': {
        const { x, y } = this.cellCenter(e.r, e.c);
        const cs = this.cs, P = this.parts;
        const n = P.budget(e.left === 0 ? 12 : 8);
        for (let i = 0; i < n; i++) {
          const a = Math.random() * TAU, v = cs * rnd(2, 5.5);
          const p = P.add('chip', x + Math.cos(a) * cs * 0.3, y + Math.sin(a) * cs * 0.3, Math.cos(a) * v, Math.sin(a) * v - cs * 2.5, rnd(0.45, 0.7), cs * rnd(0.12, 0.22), null, i % 3 ? '#d8f3ff' : '#8fcff5');
          if (p) { p.g = cs * 22; p.drag = 1; p.vr = rnd(-14, 14); }
        }
        this.glowPuff(x, y, '#c8efff', cs * 1.5, 0.3, 0.7);
        if (e.left === 0) { this.stars(x, y, 6, '#ffffff', 3.5); this.ring(x, y, cs * 0.9, '#e6f8ff', 0.3); }
        h.sound('ice');
        break;
      }
      case 'carpet': {
        const b = eng.board;
        this.carpetT0.set(e.r * b.cols + e.c, eng.now);
        const { x, y } = this.cellCenter(e.r, e.c);
        this.stars(x, y, 2, '#ffd98a', 2.2, 0.35);
        if (this.lastCarpetSound !== eng.now) { this.lastCarpetSound = eng.now; h.sound('carpet'); }
        break;
      }
      case 'toy': {
        const { x, y } = this.cellCenter(e.r, e.c);
        this.glowPuff(x, y, '#fff1b8', this.cs * 1.8, 0.4, 0.8, true);
        this.stars(x, y, 8, '#fff3b0', 4, 0.45);
        this.ring(x, y, this.cs * 1.1, '#ffffff', 0.35);
        h.sound('toy');
        break;
      }
      case 'collect': this.flyToGoal(e.goal, e.r, e.c); break;
      case 'cascade': {
        const words = ['', '', 'nice', 'great', 'super', 'amazing'];
        const key = words[Math.min(e.n, words.length - 1)];
        if (key) {
          this.addText(h.text(key), this.W / 2, this.by + eng.board.rows * this.cs * 0.42, 1 + Math.min(3, e.n - 2) * 0.06);
          h.sound('praise', e.n);
        }
        break;
      }
      case 'land': h.sound('land'); break;
      case 'shuffle':
        this.addText(h.text('shuffle'), this.W / 2, this.by + eng.board.rows * this.cs * 0.42, 0.9);
        h.sound('shuffle');
        break;
      case 'bonus-move': {
        const { x, y } = this.cellCenter(e.r, e.c);
        this.stars(x, y, 6, '#fff1a6', 3);
        this.glowPuff(x, y, '#ffe38a', this.cs * 1.6, 0.35, 0.7);
        h.sound('coin');
        break;
      }
      default: break;
    }
  }

  private popBurst(x: number, y: number, col: { light: string; base: string; dark: string }, big: boolean, matched: boolean) {
    const cs = this.cs, P = this.parts;
    const n = P.budget(big ? 10 : matched ? 7 : 5);
    const k = big ? 1.25 : 1;
    const imgs = [shardTex(col.base, col.light), shardTex(col.dark, col.base), shardTex(col.light, '#ffffff')];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + rnd(-0.4, 0.4), v = cs * rnd(2.6, 6.2) * k;
      const p = P.add('shard', x + Math.cos(a) * cs * 0.18, y + Math.sin(a) * cs * 0.18, Math.cos(a) * v, Math.sin(a) * v - cs * 2.2, rnd(0.45, 0.75), cs * rnd(0.24, 0.38), imgs[i % 3]);
      if (p) { p.g = cs * 20; p.drag = 1.4; p.vr = rnd(-12, 12); }
    }
    this.stars(x, y, big ? 4 : matched ? 2 : 1, col.light, 3, big ? 0.5 : 0.4);
    this.glowPuff(x, y, col.base, cs * (big ? 1.8 : 1.3), 0.26, matched ? 0.55 : 0.35);
    if (matched) this.ring(x, y, cs * (big ? 1.05 : 0.8), col.light, big ? 0.34 : 0.26);
  }

  /** Two specials swapped together: board flash, zoom punch, shake, big text. */
  private comboPunch() {
    const eng = this.engine;
    if (this.comboAt === eng.now) return;
    this.comboAt = eng.now;
    const b = eng.board;
    this.lfx.push({ kind: 'boardFlash', x: 0, y: 0, t0: eng.now, dur: 300, size: 1, color: '#ffffff' });
    this.zoomT0 = this.clock;
    this.kick(10);
    this.addText(this.hooks.text('combo'), this.W / 2, this.by + b.rows * this.cs * 0.42, 1.35);
  }

  /** Called once for each new engine effect, to schedule its particles / shake. */
  private onEffect(fx: Effect) {
    const cs = this.cs;
    switch (fx.type) {
      case 'rocket': {
        const { x, y } = this.cellCenter(fx.r, fx.c);
        this.glowPuff(x, y, '#ff9a3a', cs * 1.7, 0.3, 0.7);
        this.sparks(x, y, 8, '#ffcf5a', 5, 0.35);
        this.smoke(x, y, 3, '#efe7f5', 1.2, 0.6, 0.7, 0.5);
        this.kick(2.5);
        break;
      }
      case 'bomb': {
        const { x, y } = this.cellCenter(fx.r, fx.c);
        const R = fx.radius;
        this.at(fx.t0 + 70, () => this.bombBlast(x, y, R));
        break;
      }
      case 'beams': {
        const { x, y } = this.cellCenter(fx.r, fx.c);
        this.glowPuff(x, y, '#ffffff', cs * 2.6, 0.4, 0.9, true);
        this.ring(x, y, cs * 1.6, '#ffffff', 0.4);
        for (let i = 0; i < 6; i++) this.stars(x, y, 1, hueColor(i * 2), 4, 0.45);
        break;
      }
      case 'plane': {
        const a = this.cellCenter(fx.from.r, fx.from.c), z = this.cellCenter(fx.to.r, fx.to.c);
        this.smoke(a.x, a.y + cs * 0.2, 4, '#eef4ff', 2, 0.5, 0.55, 0.55);
        this.at(fx.t0 + fx.dur, () => {
          this.lfx.push({ kind: 'burst', x: z.x, y: z.y, t0: this.engine.now, dur: 380, size: 1.3, color: '#bfe6ff' });
          this.stars(z.x, z.y, 7, '#d6f0ff', 4.5);
          this.sparks(z.x, z.y, 6, '#bfe6ff', 4, 0.3, 0.14, 2);
          this.kick(3);
        });
        break;
      }
      case 'hammer': {
        const { x, y } = this.cellCenter(fx.r, fx.c);
        this.at(fx.t0 + 260, () => {
          this.kick(5);
          this.stars(x, y, 6, '#fff6c0', 4.5);
          this.glowPuff(x, y, '#fff2b0', cs * 1.8, 0.3, 0.8, true);
          this.smoke(x, y + cs * 0.3, 3, '#efe2cc', 2, 0.45, 0.5, 0.5);
        });
        break;
      }
      case 'flash': {
        const b = this.engine.board;
        this.kick(14);
        this.zoomT0 = this.clock;
        for (let i = 0; i < 14; i++) {
          const p = this.cellCenter(Math.floor(Math.random() * b.rows), Math.floor(Math.random() * b.cols));
          this.stars(p.x, p.y, 1, hueColor(i), 3, 0.6);
        }
        break;
      }
      case 'sweep': break;
    }
  }

  private bombBlast(x: number, y: number, R: number) {
    const cs = this.cs, P = this.parts;
    const big = R >= 4 ? 1.6 : 1;
    this.kick(R >= 4 ? 13 : 8);
    this.sparks(x, y, Math.round(20 * big), '#ffb347', 9 * big, 0.5, 0.2, 5);
    const n = P.budget(Math.round(10 * big));
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, v = cs * rnd(3.5, 8) * big;
      const p = P.add('chip', x, y, Math.cos(a) * v, Math.sin(a) * v - cs * 3.5, rnd(0.55, 0.9), cs * rnd(0.12, 0.22), null, ['#3a2f4a', '#5a4a66', '#ff9a3c', '#ffd257'][i % 4]);
      if (p) { p.g = cs * 22; p.drag = 1.2; p.vr = rnd(-16, 16); }
    }
    this.smoke(x, y, Math.round(9 * big), '#e6ddf0', 3.2 * big, 1.0 * big, 1.1, 0.8);
    const m = P.budget(8);
    const fire = glowTex('#ff8a2a');
    for (let i = 0; i < m; i++) {
      const a = (i / m) * TAU, v = cs * 4.5 * big;
      const p = P.add('glow', x, y, Math.cos(a) * v, Math.sin(a) * v, 0.35, cs * 1.3 * big, fire);
      if (p) { p.grow = 0.8; p.drag = 4; p.alpha = 0.75; }
    }
  }

  addText(text: string, x: number, y: number, scale: number) {
    const size = 46 * scale * Math.min(1, this.W / 420);
    // Older texts slide up out of the way and fade sooner, so they never overlap.
    for (const t of this.texts) {
      t.yTo -= (size + t.size) * 0.62;
      t.end = Math.min(t.end, this.clock + 450);
    }
    this.texts.push({ text, x, y, t0: this.clock, end: this.clock + 1150, size, rot: rnd(-0.11, 0.11), yOff: 0, yTo: 0 });
    for (let i = 0; i < 7; i++) {
      const p = this.parts.add('star', x + rnd(-size * 2, size * 2), y + rnd(-size * 0.5, size * 0.5), 0, -this.cs * rnd(0.5, 1.5), rnd(0.5, 0.8), this.cs * rnd(0.35, 0.6), sparkleTex(i % 2 ? '#fff3a0' : '#ffffff'));
      if (p) p.drag = 1;
    }
  }

  private flyToGoal(goal: number, r: number, c: number) {
    const target = this.hooks.goalTarget(goal);
    const g = this.engine.goals[goal];
    if (!target) { this.hooks.goalArrived(goal); return; }
    const px = this.cs * this.dpr;
    const img = goalSprite(g.kind, g.color, px);
    const { x, y } = this.cellCenter(r, c);
    this.flyers.push({ img, x0: x, y0: y, x1: target.x, y1: target.y, t0: this.clock + Math.random() * 140, dur: 560 + Math.random() * 120, done: () => this.hooks.goalArrived(goal) });
  }

  // ---------- drawing ----------

  draw(dt: number) {
    const ctx = this.ctx, e = this.engine, now = e.now, cs = this.cs, dpr = this.dpr, b = e.board;
    this.wall = performance.now();
    this.clock += dt;
    this.dts = Math.min(0.05, dt / 1000);

    if (this.sched.length) {
      const due = this.sched.filter((s) => s.t <= now);
      if (due.length) {
        this.sched = this.sched.filter((s) => s.t > now);
        for (const s of due) s.fn();
      }
    }
    for (const fx of e.effects) if (!this.seen.has(fx)) { this.seen.add(fx); this.onEffect(fx); }
    this.updateShines();

    // Board-layer transform: damped-sine shake + combo zoom punch.
    let ox = 0, oy = 0;
    const st = this.clock - this.shakeT0;
    const env = this.shakeAmp * Math.exp(-st / 140);
    if (env > 0.15) {
      ox = env * Math.sin(st * 0.115);
      oy = env * 0.75 * Math.sin(st * 0.083 + 1.7);
    } else this.shakeAmp = 0;
    const zt = this.clock - this.zoomT0;
    const z = !this.reduced && zt < 220 ? 1 + 0.045 * (1 - easeOutCubic(zt / 220)) : 1;
    const ccx = this.bx + (b.cols * cs) / 2, ccy = this.by + (b.rows * cs) / 2;
    this.bs = dpr * z;
    this.btx = dpr * (ox + ccx - ccx * z);
    this.bty = dpr * (oy + ccy - ccy * z);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(this.bs, 0, 0, this.bs, this.btx, this.bty);
    if (this.bg) ctx.drawImage(this.bg, this.bx - this.bgMargin, this.by - this.bgMargin, this.bg.width / dpr, this.bg.height / dpr);

    const spx = cs * dpr;
    this.drawCarpet(now);
    // Dirt under pieces
    for (let r = 0; r < b.rows; r++) {
      for (let c = 0; c < b.cols; c++) {
        const cell = b.cells[r][c];
        if (cell.playable && cell.dirt > 0) ctx.drawImage(dirtSprite(cell.dirt, spx), this.bx + c * cs + 1, this.by + r * cs + 1, cs - 2, cs - 2);
      }
    }

    // Booster aim + selection highlight
    if (this.aim?.pos) {
      const pulse = 0.28 + 0.12 * Math.sin(this.clock / 140);
      ctx.fillStyle = `rgba(255,240,150,${pulse})`;
      const p = this.aim.pos;
      if (this.aim.kind === 'broom') ctx.fillRect(this.bx, this.by + p.r * cs, b.cols * cs, cs);
      else { ctx.beginPath(); ctx.roundRect(this.bx + p.c * cs, this.by + p.r * cs, cs, cs, cs * 0.18); ctx.fill(); }
    }
    if (this.selected) this.drawSelection(this.selected);

    ctx.save();
    ctx.clip(this.clip);
    if (this.hint) this.drawHintGlow();
    for (const row of b.cells) for (const cell of row) if (cell.piece) this.drawPiece(cell.piece, now);
    for (const d of e.dying) this.drawDying(d, now);
    ctx.restore();

    for (let r = 0; r < b.rows; r++) {
      for (let c = 0; c < b.cols; c++) {
        const cell = b.cells[r][c];
        if (cell.playable && cell.box > 0) ctx.drawImage(boxSprite(cell.box, spx), this.bx + c * cs, this.by + r * cs, cs, cs);
        else if (cell.playable && cell.ice > 0) ctx.drawImage(iceSprite(cell.ice, spx), this.bx + c * cs, this.by + r * cs, cs, cs);
      }
    }

    for (const fx of e.effects) this.drawEffect(fx, now - fx.t0);
    this.drawLocalFx(now);
    this.parts.update(this.dts);
    this.parts.draw(ctx, this.bs, this.btx, this.bty);

    // HUD-space layers: no shake / zoom.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.drawFlyers();
    this.drawTexts();
  }

  /** Carpet floor: seamless tiles with a gold trim on the outer edge; new cells unroll from their centre. */
  private drawCarpet(now: number) {
    const ctx = this.ctx, cs = this.cs, b = this.engine.board;
    const tile = carpetSprite(cs * this.dpr);
    const has = (r: number, c: number) => !!b.cells[r]?.[c]?.carpet;
    for (let r = 0; r < b.rows; r++) {
      for (let c = 0; c < b.cols; c++) {
        if (!has(r, c)) continue;
        const t0 = this.carpetT0.get(r * b.cols + c);
        let k = 1;
        if (t0 !== undefined) {
          k = clamp01((now - t0) / 320);
          if (k >= 1) this.carpetT0.delete(r * b.cols + c);
        }
        const x = this.bx + c * cs, y = this.by + r * cs;
        ctx.save();
        if (k < 1) {
          const s = easeOutBack(k);
          ctx.translate(x + cs / 2, y + cs / 2);
          ctx.scale(s, s);
          ctx.translate(-x - cs / 2, -y - cs / 2);
        }
        ctx.drawImage(tile, x, y, cs + 0.5, cs + 0.5);
        // Trim + fringe on sides that face bare floor.
        const w = Math.max(2, cs * 0.09);
        ctx.fillStyle = '#f6c56b';
        if (!has(r - 1, c)) ctx.fillRect(x, y, cs, w);
        if (!has(r + 1, c)) ctx.fillRect(x, y + cs - w, cs, w);
        if (!has(r, c - 1)) ctx.fillRect(x, y, w, cs);
        if (!has(r, c + 1)) ctx.fillRect(x + cs - w, y, w, cs);
        ctx.fillStyle = '#9b2440';
        const l = Math.max(1, cs * 0.025);
        if (!has(r - 1, c)) ctx.fillRect(x, y, cs, l);
        if (!has(r + 1, c)) ctx.fillRect(x, y + cs - l, cs, l);
        if (!has(r, c - 1)) ctx.fillRect(x, y, l, cs);
        if (!has(r, c + 1)) ctx.fillRect(x + cs - l, y, l, cs);
        ctx.restore();
      }
    }
  }

  private updateShines() {
    for (const [id, t] of this.shines) if (this.clock - t > 700) this.shines.delete(id);
    if (this.clock < this.nextShine) return;
    this.nextShine = this.clock + rnd(350, 900);
    const b = this.engine.board;
    for (let tries = 0; tries < 6; tries++) {
      const p = b.piece(Math.floor(Math.random() * b.rows), Math.floor(Math.random() * b.cols));
      if (p && !p.mv && p.special === 'none' && !this.shines.has(p.id)) { this.shines.set(p.id, this.clock); break; }
    }
  }

  private piecePos(p: Piece, now: number) {
    let x = p.c, y = p.r;
    const mv = p.mv;
    if (mv) {
      const t = now - mv.t0;
      if (mv.kind === 'tween') {
        const k = clamp01(t / mv.dur), k2 = easeInOut(k);
        x = lerp(mv.pts[0].x, mv.pts[1].x, k2);
        y = lerp(mv.pts[0].y, mv.pts[1].y, k2);
        if (k >= 1) p.mv = null;
      } else {
        let d = fallDist(t / 1000);
        let i = 1;
        x = mv.pts[0].x; y = mv.pts[0].y;
        for (; i < mv.pts.length; i++) {
          const a = mv.pts[i - 1], bpt = mv.pts[i];
          const seg = Math.hypot(bpt.x - a.x, bpt.y - a.y);
          if (d <= seg) { x = a.x + ((bpt.x - a.x) * d) / seg; y = a.y + ((bpt.y - a.y) * d) / seg; break; }
          d -= seg;
        }
        if (i >= mv.pts.length) {
          x = p.c; y = p.r;
          const fell = pathLength(mv.pts);
          p.mv = null;
          p.landAt = now;
          if (fell >= 0.9) this.landDust(p, now);
        }
      }
    }
    return { x, y };
  }

  /** Tiny dust puff under the first piece of a column to touch down. */
  private landDust(p: Piece, now: number) {
    const below = this.engine.board.piece(p.r + 1, p.c);
    if (below && (below.mv || now - below.landAt < 90)) return; // part of a stack landing together
    const cs = this.cs, x = this.bx + (p.c + 0.5) * cs, y = this.by + (p.r + 1) * cs - cs * 0.06;
    const img = puffTex('#f3ecff');
    for (const s of [-1, 1]) {
      const q = this.parts.add('smoke', x + s * cs * 0.25, y, s * cs * rnd(1.2, 2), -cs * rnd(0, 0.4), rnd(0.3, 0.42), cs * rnd(0.28, 0.38), img);
      if (q) { q.alpha = 0.4; q.grow = 0.9; q.drag = 5; }
    }
  }

  private drawSelection(p: Pos) {
    const ctx = this.ctx, cs = this.cs;
    const x = this.bx + p.c * cs, y = this.by + p.r * cs;
    const pulse = 0.5 + 0.5 * Math.sin(this.clock / 170);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.35 + 0.25 * pulse;
    const g = cs * (1.5 + 0.1 * pulse);
    ctx.drawImage(glowTex('#fff2c4'), x + cs / 2 - g / 2, y + cs / 2 - g / 2, g, g);
    ctx.restore();
    ctx.lineWidth = 6;
    ctx.strokeStyle = `rgba(255,236,160,${0.25 + 0.2 * pulse})`;
    ctx.beginPath(); ctx.roundRect(x + 2, y + 2, cs - 4, cs - 4, cs * 0.22); ctx.stroke();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = `rgba(255,255,255,${0.75 + 0.25 * pulse})`;
    ctx.beginPath(); ctx.roundRect(x + 3, y + 3, cs - 6, cs - 6, cs * 0.2); ctx.stroke();
  }

  private drawHintGlow() {
    const ctx = this.ctx, cs = this.cs, h = this.hint!;
    const t = (this.wall - h.t0) / 1000;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const [i, p] of [h.a, h.b].entries()) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 5 + i * 1.2);
      ctx.globalAlpha = 0.3 + 0.35 * pulse;
      const g = cs * (1.3 + 0.2 * pulse);
      const c = this.cellCenter(p.r, p.c);
      ctx.drawImage(glowTex('#fff0a0'), c.x - g / 2, c.y - g / 2, g, g);
    }
    ctx.restore();
  }

  private drawPiece(p: Piece, now: number) {
    if (now < p.bornAt) return;
    const ctx = this.ctx, cs = this.cs;
    const { x, y } = this.piecePos(p, now);
    let sx = 1, sy = 1, ox = 0, oy = 0, rot = 0;
    // Landing: squash, overshoot stretch, settle (damped spring).
    const lt = now - p.landAt;
    if (lt < 340) {
      const k = lt / 340;
      const sq = 0.17 * Math.exp(-4.2 * k) * Math.cos(3 * Math.PI * k);
      sy = 1 - sq;
      sx = 1 + sq * 0.65;
    }
    const bt = now - p.bornAt;
    if (bt < 300) { const s = easeOutBack(clamp01(bt / 300)); sx *= s; sy *= s; }
    // Invalid swap headshake.
    const wb = this.wobble.get(p.id);
    if (wb !== undefined) {
      const t = now - wb;
      if (t > 280) this.wobble.delete(p.id);
      else if (t >= 0) { const k = t / 280; ox += Math.sin(k * Math.PI * 6) * 0.09 * (1 - k); rot = Math.sin(k * Math.PI * 6) * 0.08 * (1 - k); }
    }
    if (this.hint && !p.mv) {
      const { a, b } = this.hint;
      const isA = a.r === p.r && a.c === p.c, isB = b.r === p.r && b.c === p.c;
      if (isA || isB) {
        const t = (this.wall - this.hint.t0) / 1000;
        const ph = t * Math.PI * 1.5 + (isB ? 0.9 : 0);
        const hop = Math.abs(Math.sin(ph));
        oy -= 0.11 * hop;
        const dir = isA ? 1 : -1;
        const nudge = 0.05 * Math.sin(t * 6) * dir;
        ox += (b.c - a.c) * nudge;
        oy += (b.r - a.r) * nudge;
        // squash on the "ground" part of the hop
        if (hop < 0.25) { const q = 1 - hop / 0.25; sy *= 1 - 0.08 * q; sx *= 1 + 0.06 * q; }
      }
    }
    const sel = this.selected && this.selected.r === p.r && this.selected.c === p.c && !p.mv;
    if (sel) { const s = 1.07 + 0.03 * Math.sin(this.clock / 170); sx *= s; sy *= s; oy -= 0.03; }
    const cx = this.bx + (x + 0.5 + ox) * cs;
    const bottom = this.by + (y + 1) * cs;
    const size = cs;
    const px = cs * this.dpr;
    let img: HTMLCanvasElement;
    if (p.toy) img = toySprite(px);
    else if (p.special === 'none') img = pieceSprite(p.color, px);
    else {
      // Soft pulsing glow behind specials (cached texture, no per-frame gradients).
      const pulse = 0.5 + 0.5 * Math.sin(this.clock / 260 + p.id);
      const gx = cx, gy = bottom - size / 2 + oy * cs;
      const gcol = p.special === 'rainbow' ? hueColor(Math.floor(this.clock / 120) + p.id) : SPECIAL_GLOW[p.special] ?? '#fff2c0';
      const g = size * (1.25 + 0.15 * pulse);
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.3 + 0.25 * pulse;
      ctx.drawImage(glowTex(gcol), gx - g / 2, gy - g / 2, g, g);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      img = specialSprite(p.special, px, this.clock / 1600);
      if (p.special === 'plane') oy -= 0.03 * Math.sin(this.clock / 250 + p.id);
      if (p.special === 'rainbow' && Math.random() < this.dts * 5) {
        const a = Math.random() * TAU, r = cs * rnd(0.2, 0.48);
        const q = this.parts.add('star', gx + Math.cos(a) * r, gy + Math.sin(a) * r, 0, -cs * 0.3, rnd(0.4, 0.6), cs * rnd(0.25, 0.4), sparkleTex(hueColor(Math.floor(Math.random() * 12))));
        if (q) q.drag = 1;
      }
    }
    ctx.save();
    ctx.translate(cx, bottom + oy * cs);
    if (rot) ctx.rotate(rot);
    ctx.scale(sx, sy);
    ctx.drawImage(img, -size / 2, -size, size, size);
    if (p.special !== 'none' && bt < 220) {
      ctx.globalAlpha = 0.9 * (1 - bt / 220);
      ctx.drawImage(whiteOf(img), -size / 2, -size, size, size);
      ctx.globalAlpha = 1;
    }
    if (p.special === 'bomb') this.drawFuse(size * 0.34, -size * 0.86, size);
    else if (p.special === 'none') {
      const st = this.shines.get(p.id);
      if (st !== undefined && !p.mv) this.drawShine(img, (this.clock - st) / 700, size);
    }
    ctx.restore();
  }

  /** Diagonal light sweep across a piece (offscreen: sprite ∩ band). */
  private drawShine(img: HTMLCanvasElement, k: number, size: number) {
    if (k <= 0 || k >= 1) return;
    const w = img.width;
    if (!this.shineCv || this.shineCv.width !== w) {
      this.shineCv = document.createElement('canvas');
      this.shineCv.width = this.shineCv.height = w;
      this.shineG = this.shineCv.getContext('2d')!;
      const gr = this.shineG.createLinearGradient(0, 0, w, w);
      gr.addColorStop(0.38, 'rgba(255,255,255,0)');
      gr.addColorStop(0.47, 'rgba(255,255,255,0.75)');
      gr.addColorStop(0.5, 'rgba(255,255,255,0.95)');
      gr.addColorStop(0.53, 'rgba(255,255,255,0.75)');
      gr.addColorStop(0.62, 'rgba(255,255,255,0)');
      this.shineGrad = gr;
    }
    const g = this.shineG!;
    const off = lerp(-w * 1.1, w * 1.1, easeInOut(k));
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, w, w);
    g.drawImage(img, 0, 0);
    g.globalCompositeOperation = 'source-in';
    g.setTransform(1, 0, 0, 1, off, 0);
    g.fillStyle = this.shineGrad!;
    g.fillRect(-off, 0, w, w);
    const ctx = this.ctx;
    ctx.globalAlpha = 0.7;
    ctx.drawImage(this.shineCv!, -size / 2, -size, size, size);
    ctx.globalAlpha = 1;
  }

  private drawFuse(x: number, y: number, size: number) {
    const ctx = this.ctx;
    const f = 0.75 + 0.25 * Math.sin(this.clock / 37) + 0.1 * Math.random();
    const s = size * 0.42 * f;
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(hotTex('#ff9a2a'), x - s / 2, y - s / 2, s, s);
    ctx.globalCompositeOperation = 'source-over';
    if (Math.random() < this.dts * 8) {
      // spark spits from the fuse — positions are local to the piece transform, so approximate in board space
      const m = this.ctx.getTransform();
      const wx = (m.a * x + m.c * y + m.e - this.btx) / this.bs, wy = (m.b * x + m.d * y + m.f - this.bty) / this.bs;
      const a = -Math.PI / 2 + rnd(-1, 1), v = this.cs * rnd(1, 2.4);
      const q = this.parts.add('spark', wx, wy, Math.cos(a) * v, Math.sin(a) * v, rnd(0.2, 0.35), this.cs * 0.08, hotTex('#ffc04a'));
      if (q) q.g = this.cs * 6;
    }
  }

  private drawDying(d: Dying, now: number) {
    const ctx = this.ctx, cs = this.cs, p = d.p, t = now - d.t0;
    if (t < 0) return;
    const px = cs * this.dpr;
    const img = p.toy ? toySprite(px) : p.special === 'none' ? pieceSprite(p.color, px) : specialSprite(p.special, px, this.clock / 1600);
    const cx = this.bx + (p.c + 0.5) * cs, cy = this.by + (p.r + 0.5) * cs;
    const col = PIECE_COLORS[p.color] ?? PIECE_COLORS[1];
    if (d.kind === 'exit') {
      // Toy hops up happily, then the goal flyer takes over.
      const k = clamp01(t / 260);
      if (k >= 1) return;
      const hop = Math.sin(k * Math.PI) * 0.35;
      this.blit(img, cx, cy - hop * cs, 1 + 0.25 * k, 1 - k * k, 0.5 * k);
    } else if (d.kind === 'pop') {
      // Quick swell + white flash, then shrink away.
      if (t >= 220) return;
      let s: number, a: number, wa: number;
      if (t < 60) { const k = t / 60; s = 1 + 0.18 * easeOutCubic(k); a = 1; wa = 0.5 * k; }
      else { const k = (t - 60) / 160; s = lerp(1.18, 0.25, k * k); a = 1 - k ** 1.4; wa = 0.5 * (1 - k) ** 2; }
      this.blit(img, cx, cy, s, a, wa);
    } else if (d.kind === 'merge' && d.to) {
      const dur = 150, k = clamp01(t / dur);
      if (k >= 1) return;
      const e = easeInOut(k);
      // glow trail behind the piece as it zips into the new special
      ctx.globalCompositeOperation = 'lighter';
      const gl = glowTex(p.special === 'none' ? col.base : '#fff0b0');
      for (let j = 1; j <= 3; j++) {
        const kj = Math.max(0, e - j * 0.14);
        const gx = this.bx + (lerp(p.c, d.to.c, kj) + 0.5) * cs, gy = this.by + (lerp(p.r, d.to.r, kj) + 0.5) * cs;
        const g = cs * (1.05 - j * 0.15);
        ctx.globalAlpha = 0.5 * (1 - j / 4);
        ctx.drawImage(gl, gx - g / 2, gy - g / 2, g, g);
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      const x = this.bx + (lerp(p.c, d.to.c, e) + 0.5) * cs, y = this.by + (lerp(p.r, d.to.r, e) + 0.5) * cs;
      this.blit(img, x, y, 1 - 0.35 * k, 1 - k * 0.4, 0.7 * k);
    } else {
      // 'fire': the special goes off. Bombs and planes are drawn by their own effects.
      if (p.special === 'bomb' && this.engine.effects.some((f) => f.type === 'bomb' && f.r === p.r && f.c === p.c)) return;
      if (p.special === 'plane' && this.engine.effects.some((f) => f.type === 'plane' && f.from.r === p.r && f.from.c === p.c)) return;
      const k = clamp01(t / 180);
      if (k >= 1) return;
      this.blit(img, cx, cy, 1 + 0.35 * k, 1 - k, 0.85 * (1 - k));
    }
  }

  /** Draw a sprite centered at (x, y) with scale, alpha and a white-flash overlay amount. */
  private blit(img: HTMLCanvasElement, x: number, y: number, s: number, a: number, white: number) {
    const ctx = this.ctx, z = this.cs * s;
    if (a <= 0 || z <= 0.5) return;
    ctx.globalAlpha = a;
    ctx.drawImage(img, x - z / 2, y - z / 2, z, z);
    if (white > 0.02) {
      ctx.globalAlpha = a * white;
      ctx.drawImage(whiteOf(img), x - z / 2, y - z / 2, z, z);
    }
    ctx.globalAlpha = 1;
  }

  private drawLocalFx(now: number) {
    if (!this.lfx.length) return;
    const ctx = this.ctx, cs = this.cs, b = this.engine.board;
    this.lfx = this.lfx.filter((f) => {
      const t = now - f.t0;
      const k = t / f.dur;
      if (k >= 1) return false;
      if (k < 0) return true;
      const e = easeOutCubic(k);
      ctx.save();
      if (f.kind === 'boardFlash') {
        ctx.clip(this.clip);
        ctx.fillStyle = `rgba(255,255,255,${(this.reduced ? 0.25 : 0.7) * (1 - k) ** 2})`;
        ctx.fillRect(this.bx, this.by, b.cols * cs, b.rows * cs);
      } else {
        ctx.globalCompositeOperation = 'lighter';
        // radial light burst
        let g = cs * f.size * (0.9 + 1.7 * e);
        ctx.globalAlpha = 0.7 * (1 - k) ** 1.5;
        ctx.drawImage(glowTex(f.color), f.x - g / 2, f.y - g / 2, g, g);
        g = cs * f.size * (0.5 + 0.7 * e);
        ctx.globalAlpha = 0.8 * (1 - k) ** 2;
        ctx.drawImage(hotTex(f.color), f.x - g / 2, f.y - g / 2, g, g);
        if (f.kind === 'spawn') {
          // god-rays rotating behind the new special
          const n = 10, L = cs * (0.5 + 1.25 * e), w = cs * 0.09;
          const r0 = this.clock / 700;
          ctx.globalAlpha = 0.55 * (1 - k);
          ctx.fillStyle = 'rgba(255,240,190,1)';
          ctx.beginPath();
          for (let i = 0; i < n; i++) {
            const a = r0 + (i / n) * TAU;
            const c = Math.cos(a), s = Math.sin(a);
            ctx.moveTo(f.x + -s * w, f.y + c * w);
            ctx.lineTo(f.x + c * L, f.y + s * L);
            ctx.lineTo(f.x + s * w, f.y - c * w);
          }
          ctx.fill();
        }
        ctx.globalAlpha = 1 - k;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = cs * 0.14 * (1 - k) + 0.5;
        ctx.beginPath(); ctx.arc(f.x, f.y, cs * f.size * (0.3 + 0.75 * e), 0, TAU); ctx.stroke();
      }
      ctx.restore();
      return true;
    });
  }

  private drawEffect(fx: Effect, t: number) {
    const ctx = this.ctx, cs = this.cs, b = this.engine.board;
    if (t < 0) return;
    switch (fx.type) {
      case 'rocket': this.drawRocket(fx, t); break;
      case 'bomb': this.drawBomb(fx, t); break;
      case 'beams': this.drawBeams(fx, t); break;
      case 'plane': this.drawPlane(fx, t); break;
      case 'sweep': {
        const k = clamp01((t - 80) / (fx.dur - 120));
        const y = this.by + (fx.r + 0.5) * cs;
        const x = this.bx - cs * 0.5 + k * (b.cols + 1) * cs;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createLinearGradient(this.bx, 0, x, 0);
        g.addColorStop(0, 'rgba(255,255,200,0)');
        g.addColorStop(1, 'rgba(255,255,200,0.5)');
        ctx.fillStyle = g;
        ctx.fillRect(this.bx, y - cs * 0.45, Math.max(0, x - this.bx), cs * 0.9);
        ctx.restore();
        this.drawBroom(x, y, cs, Math.sin(t / 60) * 0.25);
        if (Math.random() < this.dts * 40) this.smoke(x, y + cs * 0.3, 1, '#f2e6d0', 1, 0.5, 0.6, 0.5);
        if (Math.random() < this.dts * 20) this.stars(x, y, 1, '#fff6c0', 2, 0.35);
        break;
      }
      case 'hammer': {
        const o = this.cellCenter(fx.r, fx.c);
        const k = clamp01(t / 260);
        // wind-up then fast strike
        const ang = k < 0.55 ? lerp(-1.0, -1.45, easeOutCubic(k / 0.55)) : lerp(-1.45, 0.15, ((k - 0.55) / 0.45) ** 2);
        this.drawHammer(o.x + cs * 0.55, o.y + cs * 0.1, cs, ang);
        if (t > 260) {
          const k2 = clamp01((t - 260) / 190);
          ctx.strokeStyle = `rgba(255,255,255,${1 - k2})`;
          ctx.lineWidth = cs * 0.12 * (1 - k2) + 1;
          ctx.beginPath(); ctx.arc(o.x, o.y, cs * (0.3 + 0.7 * easeOutCubic(k2)), 0, TAU); ctx.stroke();
        }
        break;
      }
      case 'flash': {
        const k = clamp01(t / fx.dur);
        ctx.save();
        ctx.clip(this.clip);
        ctx.fillStyle = `rgba(255,255,255,${(this.reduced ? 0.3 : 0.8) * (1 - k) ** 2})`;
        ctx.fillRect(this.bx, this.by, b.cols * cs, b.rows * cs);
        ctx.restore();
        const o = this.cellCenter(fx.r, fx.c);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let j = 0; j < 3; j++) {
          const kj = clamp01((t - j * 110) / 650);
          if (kj <= 0 || kj >= 1) continue;
          ctx.lineWidth = cs * 0.4 * (1 - kj) + 1;
          ctx.strokeStyle = `hsla(${(this.clock / 3 + j * 120) % 360},100%,65%,${1 - kj})`;
          ctx.beginPath(); ctx.arc(o.x, o.y, Math.max(1, cs * 10 * easeOutCubic(kj)), 0, TAU); ctx.stroke();
        }
        const g = cs * (2 + 6 * easeOutCubic(k));
        ctx.globalAlpha = (1 - k) ** 2;
        ctx.drawImage(hotTex(hueColor(Math.floor(this.clock / 60))), o.x - g / 2, o.y - g / 2, g, g);
        ctx.restore();
        const s = cs * (1.3 + 0.8 * k);
        ctx.globalAlpha = 1 - k;
        ctx.drawImage(specialSprite('rainbow', cs * this.dpr, this.clock / 300), o.x - s / 2, o.y - s / 2, s, s);
        ctx.globalAlpha = 1;
        break;
      }
    }
  }

  private drawRocket(fx: Extract<Effect, { type: 'rocket' }>, t: number) {
    const ctx = this.ctx, cs = this.cs, b = this.engine.board;
    const dist = t / 38;
    const o = this.cellCenter(fx.r, fx.c);
    const h = fx.dir === 'h';
    const len = h ? b.cols : b.rows;
    const origin = h ? fx.c : fx.r;
    const limit = len + 2;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    // Cells light up as the rocket passes, then cool down.
    for (let k = 0; k < len; k++) {
      const tp = t - Math.abs(k - origin) * 38;
      if (tp < 0 || tp > 340) continue;
      const r = h ? fx.r : k, c = h ? k : fx.c;
      if (!b.cells[r]?.[c]?.playable) continue;
      const a = 0.3 * (1 - tp / 340) ** 1.5;
      ctx.fillStyle = `rgba(255,${Math.round(130 + 60 * (1 - tp / 340))},60,${a})`;
      ctx.beginPath();
      ctx.roundRect(this.bx + c * cs + 2, this.by + r * cs + 2, cs - 4, cs - 4, cs * 0.18);
      ctx.fill();
    }
    ctx.lineCap = 'round';
    const head = rocketHeadSprite(cs * this.dpr);
    for (const s of [1, -1]) {
      if (dist > limit) continue;
      const dx = h ? s : 0, dy = h ? 0 : s;
      const hx = o.x + dx * dist * cs, hy = o.y + dy * dist * cs;
      // hot streak behind the head
      const tail = Math.min(dist, 3.4) * cs;
      if (tail > 2) {
        const tx = hx - dx * tail, ty = hy - dy * tail;
        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, 'rgba(255,100,30,0)');
        grad.addColorStop(0.6, 'rgba(255,140,50,0.35)');
        grad.addColorStop(1, 'rgba(255,210,130,0.75)');
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = cs * 0.26;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx - dx * cs * 0.3, hy - dy * cs * 0.3); ctx.stroke();
        ctx.lineWidth = cs * 0.07;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx - dx * cs * 0.3, hy - dy * cs * 0.3); ctx.stroke();
      }
      ctx.save();
      ctx.translate(hx, hy);
      ctx.rotate(h ? (s > 0 ? 0 : Math.PI) : s > 0 ? Math.PI / 2 : -Math.PI / 2);
      // flickering flame
      const f1 = rnd(0.8, 1.2), f2 = rnd(0.85, 1.15);
      const L = cs * (0.95 + 0.35 * f1);
      ctx.drawImage(glowTex('#ff5a10'), -cs * 0.35 - L, -cs * 0.3 * f2, L * 1.2, cs * 0.6 * f2);
      ctx.drawImage(hotTex('#ffd257'), -cs * 0.35 - L * 0.55, -cs * 0.16 * f1, L * 0.7, cs * 0.32 * f1);
      ctx.globalAlpha = 0.3;
      ctx.drawImage(glowTex('#ffa94a'), -cs * 0.75, -cs * 0.7, cs * 1.4, cs * 1.4);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(head, -cs * 0.9, -cs / 2, cs, cs);
      ctx.restore();
      ctx.globalCompositeOperation = 'lighter';
      // smoke puffs + sparks left behind (rate-based so FPS doesn't change density)
      const P = this.parts;
      const bx = hx - dx * cs * 0.6, by = hy - dy * cs * 0.6;
      const busy = P.list.length > P.cap * 0.5 ? 0.35 : 1;
      let n = this.dts * 90 * busy;
      while (n > 0) {
        if (n < 1 && Math.random() > n) break;
        n--;
        const q = P.add('smoke', bx + rnd(-0.1, 0.1) * cs, by + rnd(-0.1, 0.1) * cs, -dx * cs * rnd(0.3, 1) + rnd(-0.4, 0.4) * cs, -dy * cs * rnd(0.3, 1) + rnd(-0.4, 0.4) * cs, rnd(0.55, 0.9), cs * rnd(0.42, 0.65), puffTex('#ebe4f2'));
        if (q) { q.grow = 1.6; q.alpha = 0.85; q.g = -cs * 0.6; q.drag = 2.5; q.vr = rnd(-1, 1); }
      }
      n = this.dts * 30 * busy;
      while (n > 0) {
        if (n < 1 && Math.random() > n) break;
        n--;
        const a = Math.atan2(-dy, -dx) + rnd(-0.7, 0.7), v = cs * rnd(2, 5);
        const q = P.add('spark', bx, by, Math.cos(a) * v, Math.sin(a) * v, rnd(0.2, 0.4), cs * rnd(0.1, 0.16), hotTex(Math.random() < 0.5 ? '#ffd257' : '#ff8a2a'));
        if (q) { q.g = cs * 5; q.drag = 2; }
      }
    }
    ctx.restore();
  }

  private drawBomb(fx: Extract<Effect, { type: 'bomb' }>, t: number) {
    const ctx = this.ctx, cs = this.cs, b = this.engine.board;
    const o = this.cellCenter(fx.r, fx.c);
    const R = fx.radius;
    ctx.save();
    if (t < 80) {
      // Anticipation: the bomb squashes, heats up and goes white.
      const k = t / 80, e = Math.sin((k * Math.PI) / 2);
      const img = specialSprite('bomb', cs * this.dpr);
      ctx.globalCompositeOperation = 'lighter';
      const g = cs * (1.3 + 1.0 * k);
      ctx.globalAlpha = 0.4 + 0.5 * k;
      ctx.drawImage(hotTex('#ffb347'), o.x - g / 2, o.y - g / 2, g, g);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.translate(o.x, o.y + cs / 2);
      ctx.scale(1 + 0.24 * e, 1 - 0.22 * e);
      ctx.drawImage(img, -cs / 2, -cs, cs, cs);
      ctx.globalAlpha = 0.85 * k;
      ctx.drawImage(whiteOf(img), -cs / 2, -cs, cs, cs);
      ctx.setTransform(this.bs, 0, 0, this.bs, this.btx, this.bty);
    }
    if (t >= 60) {
      const tb = t - 60;
      ctx.globalCompositeOperation = 'lighter';
      // cells inside the blast flash as the wave reaches them
      for (let dr = -R; dr <= R; dr++) {
        for (let dc = -R; dc <= R; dc++) {
          if (Math.abs(dr) + Math.abs(dc) > R * 1.5) continue;
          const r = fx.r + dr, c = fx.c + dc;
          if (!b.cells[r]?.[c]?.playable) continue;
          const tp = t - (50 + Math.max(Math.abs(dr), Math.abs(dc)) * 45);
          if (tp < 0 || tp > 300) continue;
          ctx.globalAlpha = 0.32 * (1 - tp / 300) ** 1.4;
          ctx.fillStyle = '#ff9440';
          ctx.beginPath(); ctx.roundRect(this.bx + c * cs + 2, this.by + r * cs + 2, cs - 4, cs - 4, cs * 0.18); ctx.fill();
        }
      }
      // bright core flash
      const k1 = tb / 300;
      if (k1 < 1) {
        const f = this.reduced ? 0.55 : 1;
        let g = cs * (2 + (R + 1) * 1.7 * easeOutCubic(k1));
        ctx.globalAlpha = 0.55 * (1 - k1) * f;
        ctx.drawImage(glowTex('#ff6a10'), o.x - g / 2, o.y - g / 2, g, g);
        g = cs * (1.2 + (R + 0.5) * 0.9 * easeOutCubic(k1));
        ctx.globalAlpha = (1 - k1) ** 2 * f;
        ctx.drawImage(hotTex('#ffa020'), o.x - g / 2, o.y - g / 2, g, g);
      }
      // shockwave rings
      const k2 = tb / 400;
      if (k2 < 1) {
        const rr = cs * (0.4 + (R + 0.7) * easeOutCubic(k2));
        ctx.globalAlpha = 0.95 * (1 - k2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = cs * 0.34 * (1 - k2) + 1;
        ctx.beginPath(); ctx.arc(o.x, o.y, rr, 0, TAU); ctx.stroke();
        ctx.globalAlpha = 0.6 * (1 - k2);
        ctx.strokeStyle = '#ff9a3c';
        ctx.lineWidth = cs * 0.2 * (1 - k2) + 1;
        ctx.beginPath(); ctx.arc(o.x, o.y, rr * 0.8, 0, TAU); ctx.stroke();
      }
    }
    ctx.restore();
  }

  private drawBeams(fx: Extract<Effect, { type: 'beams' }>, t: number) {
    const ctx = this.ctx, cs = this.cs, b = this.engine.board;
    const o = this.cellCenter(fx.r, fx.c);
    const n = fx.targets.length;
    const step = n ? Math.max(0, (fx.dur - 600) / n) : 0;
    const fade = clamp01((fx.dur - t) / 250);
    const frame = Math.floor(this.clock / 50);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // halo behind the ball
    const hg = cs * (2.4 + 0.3 * Math.sin(this.clock / 90)) * fade;
    if (hg > 1) {
      ctx.globalAlpha = 0.7;
      ctx.drawImage(hotTex(hueColor(Math.floor(this.clock / 70))), o.x - hg / 2, o.y - hg / 2, hg, hg);
    }
    for (let i = 0; i < n; i++) {
      const tg = fx.targets[i];
      const hitT = 260 + i * step;
      const arrive = Math.min(hitT - 20, 140 + i * step * 0.6);
      const launch = arrive - 90;
      if (t < launch) continue;
      const alpha = fade * (t > hitT ? clamp01(1 - (t - hitT) / 160) : 1);
      if (alpha <= 0.01) continue;
      const p = this.cellCenter(tg.r, tg.c);
      const ext = clamp01((t - launch) / 90);
      const hueI = i * 3 + Math.floor(this.clock / 80);
      const col = hueColor(hueI);
      // jittered lightning polyline (re-rolled every 50ms)
      const dx = p.x - o.x, dy = p.y - o.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = -dy / dist, ny = dx / dist;
      const segs = Math.max(4, Math.round(dist / (cs * 0.45)));
      const last = Math.max(1, Math.ceil(segs * ext));
      ctx.beginPath();
      ctx.moveTo(o.x, o.y);
      for (let j = 1; j <= last; j++) {
        const u = Math.min(j / segs, ext);
        const jit = j === segs ? 0 : (hash(i, j, frame) - 0.5) * cs * 0.42 * Math.sin(Math.PI * u);
        ctx.lineTo(o.x + dx * u + nx * jit, o.y + dy * u + ny * jit);
      }
      ctx.globalAlpha = 0.5 * alpha;
      ctx.strokeStyle = col;
      ctx.lineWidth = cs * 0.2;
      ctx.stroke();
      ctx.globalAlpha = 0.95 * alpha;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.max(1.2, cs * 0.05);
      ctx.stroke();
      // charged target: pulsing glow + white flicker on the piece until it pops
      if (t >= arrive && t < hitT + 60) {
        const pulse = 0.5 + 0.5 * Math.sin(this.clock / 45 + i);
        const g = cs * (1.3 + 0.3 * pulse);
        ctx.globalAlpha = (0.45 + 0.35 * pulse) * alpha;
        ctx.drawImage(glowTex(col), p.x - g / 2, p.y - g / 2, g, g);
        const pc = b.piece(tg.r, tg.c);
        if (pc && t < hitT && pc.special === 'none' && !pc.toy) {
          ctx.globalAlpha = 0.25 + 0.3 * pulse;
          ctx.drawImage(whiteOf(pieceSprite(pc.color, cs * this.dpr)), p.x - cs / 2, p.y - cs / 2, cs, cs);
        }
        if (Math.random() < this.dts * 6) this.stars(p.x, p.y, 1, col, 2, 0.35);
      }
    }
    ctx.restore();
    // the ball itself, spinning fast and wobbling
    const ball = specialSprite('rainbow', cs * this.dpr, this.clock / 300);
    const s = cs * (1.25 + 0.12 * Math.sin(this.clock / 70)) * fade;
    if (s > 1) ctx.drawImage(ball, o.x - s / 2, o.y - s / 2, s, s);
    if (Math.random() < this.dts * 20) {
      const a = Math.random() * TAU;
      this.stars(o.x + Math.cos(a) * cs * 0.5, o.y + Math.sin(a) * cs * 0.5, 1, hueColor(Math.floor(Math.random() * 12)), 3, 0.4);
    }
  }

  /** Plane position / heading / scale at progress k: spin-up takeoff, then an arc to the target. */
  private planeAt(fx: Extract<Effect, { type: 'plane' }>, k: number) {
    const cs = this.cs;
    const a = this.cellCenter(fx.from.r, fx.from.c), z = this.cellCenter(fx.to.r, fx.to.c);
    const lift = cs * 0.55;
    const Ax = a.x, Ay = a.y - lift;
    const span = Math.hypot(z.x - Ax, z.y - Ay);
    const Mx = (Ax + z.x) / 2, My = Math.min(Ay, z.y) - cs * (1.2 + span / cs * 0.18);
    const T0 = 0.2;
    const a0 = Math.atan2(My - Ay, Mx - Ax);
    if (k < T0) {
      const e = easeOutCubic(k / T0);
      return { x: Ax, y: a.y - lift * e, ang: a0 - TAU * (1 - e), s: 1 + 0.3 * e };
    }
    const q = (k - T0) / (1 - T0), e = easeInOut(q);
    const x = (1 - e) ** 2 * Ax + 2 * (1 - e) * e * Mx + e * e * z.x;
    const y = (1 - e) ** 2 * Ay + 2 * (1 - e) * e * My + e * e * z.y;
    const dx = 2 * (1 - e) * (Mx - Ax) + 2 * e * (z.x - Mx);
    const dy = 2 * (1 - e) * (My - Ay) + 2 * e * (z.y - My);
    return { x, y, ang: Math.atan2(dy, dx), s: 1.3 - 0.35 * q + 0.15 * Math.sin(Math.PI * q) };
  }

  private drawPlane(fx: Extract<Effect, { type: 'plane' }>, t: number) {
    const ctx = this.ctx, cs = this.cs;
    const k = t / fx.dur;
    if (k >= 1) return;
    const z = this.cellCenter(fx.to.r, fx.to.c);
    ctx.save();
    // target marker: rotating bracket ring that tightens as the plane closes in
    const mr = cs * (0.62 - 0.15 * k), rot = this.clock / 260;
    ctx.globalAlpha = 0.55 + 0.35 * Math.sin(this.clock / 90);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(2, cs * 0.06);
    ctx.lineCap = 'round';
    for (let q = 0; q < 4; q++) {
      ctx.beginPath(); ctx.arc(z.x, z.y, mr, rot + (q * Math.PI) / 2, rot + (q * Math.PI) / 2 + 0.85); ctx.stroke();
    }
    // ribbon of dots trailing the plane
    ctx.globalCompositeOperation = 'lighter';
    const N = 14;
    let prev = this.planeAt(fx, k);
    for (let j = 1; j <= N; j++) {
      const kj = k - j * 0.018;
      if (kj <= 0) break;
      const p = this.planeAt(fx, kj);
      const f = 1 - j / (N + 1);
      ctx.globalAlpha = 0.45 * f;
      ctx.strokeStyle = '#cfeaff';
      ctx.lineWidth = cs * 0.14 * f;
      ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      if (j % 2 === 0) {
        ctx.globalAlpha = 0.9 * f;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(p.x, p.y, cs * 0.06 * f + 0.6, 0, TAU); ctx.fill();
      }
      prev = p;
    }
    ctx.restore();
    const P = this.planeAt(fx, k);
    const s = cs * P.s;
    if (fx.carry !== 'none') {
      const carry = specialSprite(fx.carry, cs * this.dpr);
      ctx.drawImage(carry, P.x - s * 0.32, P.y + s * 0.05, s * 0.6, s * 0.6);
    }
    ctx.save();
    ctx.translate(P.x, P.y);
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.45;
    ctx.drawImage(glowTex('#bfe6ff'), -s * 0.8, -s * 0.8, s * 1.6, s * 1.6);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.rotate(P.ang + 0.59);
    ctx.drawImage(specialSprite('plane', cs * this.dpr), -s / 2, -s / 2, s, s);
    ctx.restore();
    if (Math.random() < this.dts * 18) this.stars(P.x, P.y, 1, '#e6f3ff', 0.8, 0.3);
  }

  private drawBroom(x: number, y: number, cs: number, ang: number) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang - 0.5);
    ctx.fillStyle = '#9a6435';
    ctx.fillRect(-cs * 0.05, -cs * 1.1, cs * 0.1, cs * 1.0);
    ctx.fillStyle = '#c8402f';
    ctx.fillRect(-cs * 0.16, -cs * 0.14, cs * 0.32, cs * 0.1);
    const g = ctx.createLinearGradient(0, -cs * 0.05, 0, cs * 0.5);
    g.addColorStop(0, '#f5d27a'); g.addColorStop(1, '#d19a3c');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-cs * 0.16, -cs * 0.05); ctx.lineTo(cs * 0.16, -cs * 0.05);
    ctx.lineTo(cs * 0.3, cs * 0.45); ctx.lineTo(-cs * 0.3, cs * 0.45);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(120,70,20,0.6)';
    ctx.lineWidth = 1.5;
    for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * cs * 0.05, 0); ctx.lineTo(i * cs * 0.11, cs * 0.42); ctx.stroke(); }
    ctx.restore();
  }

  private drawHammer(x: number, y: number, cs: number, ang: number) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.fillStyle = '#a0673a';
    ctx.beginPath(); ctx.roundRect(-cs * 0.06, -cs * 0.1, cs * 0.12, cs * 0.9, cs * 0.04); ctx.fill();
    const g = ctx.createLinearGradient(0, -cs * 0.35, 0, -cs * 0.05);
    g.addColorStop(0, '#e4e9f1'); g.addColorStop(1, '#7d8697');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.roundRect(-cs * 0.6, -cs * 0.36, cs * 0.55, cs * 0.32, cs * 0.06); ctx.fill();
    ctx.beginPath(); ctx.roundRect(-cs * 0.08, -cs * 0.3, cs * 0.22, cs * 0.2, cs * 0.04); ctx.fill();
    ctx.restore();
  }

  private drawFlyers() {
    const ctx = this.ctx, now = this.clock, cs = this.cs;
    this.flyers = this.flyers.filter((f) => {
      const k = (now - f.t0) / f.dur;
      if (k < 0) return true;
      if (k >= 1) {
        f.done();
        this.arrivalBurst(f.x1, f.y1);
        return false;
      }
      const e = easeInOut(k);
      const mx = lerp(f.x0, f.x1, 0.3) + (f.x0 < f.x1 ? -40 : 40), my = Math.min(f.y0, f.y1) - 60;
      const x = (1 - e) ** 2 * f.x0 + 2 * (1 - e) * e * mx + e * e * f.x1;
      const y = (1 - e) ** 2 * f.y0 + 2 * (1 - e) * e * my + e * e * f.y1;
      // pop up bigger, then shrink into the HUD slot
      const sc = k < 0.22 ? lerp(1, 1.25, easeOutCubic(k / 0.22)) : lerp(1.25, 0.6, easeInOut((k - 0.22) / 0.78));
      const s = Math.min(cs, 64) * sc;
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.5;
      ctx.drawImage(glowTex('#fff6c8'), x - s * 0.8, y - s * 0.8, s * 1.6, s * 1.6);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      const r = Math.sin(k * Math.PI) * 0.3 * (f.x0 < f.x1 ? 1 : -1);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(r);
      ctx.drawImage(f.img, -s / 2, -s / 2, s, s);
      ctx.restore();
      // sparkle trail (particles live in board space; convert from screen space)
      if (Math.random() < this.dts * 35) {
        const bx = (x * this.dpr - this.btx) / this.bs, by = (y * this.dpr - this.bty) / this.bs;
        const p = this.parts.add('star', bx + rnd(-0.2, 0.2) * s, by + rnd(-0.2, 0.2) * s, 0, cs * 0.3, rnd(0.35, 0.55), cs * rnd(0.25, 0.4), sparkleTex(Math.random() < 0.5 ? '#fff3a0' : '#ffffff'));
        if (p) p.drag = 1;
      }
      return true;
    });
  }

  private arrivalBurst(sx: number, sy: number) {
    const x = (sx * this.dpr - this.btx) / this.bs, y = (sy * this.dpr - this.bty) / this.bs;
    this.ring(x, y, 34, '#fff3a0', 0.35);
    this.glowPuff(x, y, '#fff6c8', 60, 0.3, 0.8, true);
    const P = this.parts, img = sparkleTex('#fff3a0');
    const n = P.budget(6);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + rnd(-0.3, 0.3), v = rnd(90, 160);
      const p = P.add('star', x, y, Math.cos(a) * v, Math.sin(a) * v, rnd(0.35, 0.5), rnd(14, 20), img);
      if (p) p.drag = 4;
    }
  }

  private drawTexts() {
    const ctx = this.ctx, now = this.clock;
    const follow = 1 - Math.exp(-this.dts * 14);
    this.texts = this.texts.filter((t) => {
      if (now >= t.end) return false;
      const age = now - t.t0;
      t.yOff += (t.yTo - t.yOff) * follow;
      // springy entrance: 0 → ~1.17 → ~0.97 → 1
      let s = age < 450 ? 1 - Math.exp(-age / 75) * Math.cos(age / 44) : 1;
      const left = t.end - now;
      const a = clamp01(left / 260);
      if (left < 260) s *= 1 + 0.12 * (1 - left / 260);
      const rot = t.rot * (0.35 + 0.65 * Math.exp(-age / 160));
      const size = t.size;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(t.x, t.y + t.yOff - age * 0.022);
      ctx.rotate(rot);
      ctx.scale(Math.max(0.01, s), Math.max(0.01, s));
      ctx.font = `800 ${size}px "Baloo 2", system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineJoin = 'round';
      // drop shadow (no shadowBlur): offset dark copy
      ctx.fillStyle = 'rgba(30,8,50,0.45)';
      ctx.strokeStyle = 'rgba(30,8,50,0.45)';
      ctx.lineWidth = size * 0.3;
      ctx.strokeText(t.text, 0, size * 0.1);
      // outer white sticker edge, inner purple stroke
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = size * 0.34;
      ctx.strokeText(t.text, 0, 0);
      ctx.strokeStyle = '#5b2386';
      ctx.lineWidth = size * 0.2;
      ctx.strokeText(t.text, 0, 0);
      const g = ctx.createLinearGradient(0, -size * 0.45, 0, size * 0.4);
      g.addColorStop(0, '#fffde8');
      g.addColorStop(0.42, '#ffe15a');
      g.addColorStop(0.7, '#ffb52e');
      g.addColorStop(1, '#ff7f1f');
      ctx.fillStyle = g;
      ctx.fillText(t.text, 0, 0);
      ctx.restore();
      return true;
    });
  }

  /** True while purely visual things (flyers) are still moving — the UI waits for these before popups. */
  animating(): boolean {
    return this.flyers.length > 0;
  }
}
