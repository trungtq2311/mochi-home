// Pooled particle system. Sprites come from fx/textures.ts; nothing allocates gradients per frame.

export type PKind =
  | 'shard' // rotating textured chip, gravity
  | 'chip' // flat rotating rect (wood / debris)
  | 'smoke' // soft puff that grows and lingers
  | 'spark' // additive streak stretched along velocity
  | 'star' // additive twinkle
  | 'glow' // additive expanding glow
  | 'ring'; // additive expanding circle stroke

export interface Part {
  kind: PKind;
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number;
  rot: number; vr: number;
  g: number; drag: number; grow: number; alpha: number;
  img: HTMLCanvasElement | null;
  color: string;
}

const ADDITIVE: Record<PKind, boolean> = { shard: false, chip: false, smoke: false, spark: true, star: true, glow: true, ring: true };

export class Particles {
  readonly cap: number;
  list: Part[] = [];
  private free: Part[] = [];

  constructor(cap: number) { this.cap = cap; }

  /** Scale a wanted spawn count down as the pool fills up, so huge chains stay smooth. */
  budget(n: number): number {
    const load = this.list.length / this.cap;
    if (load < 0.5) return n;
    return Math.max(load >= 1 ? 0 : 1, Math.round(n * (1 - load) * 2));
  }

  add(kind: PKind, x: number, y: number, vx: number, vy: number, life: number, size: number, img: HTMLCanvasElement | null, color = '#ffffff'): Part | null {
    if (this.list.length >= this.cap) return null;
    const p = this.free.pop() ?? ({} as Part);
    p.kind = kind; p.x = x; p.y = y; p.vx = vx; p.vy = vy;
    p.life = life; p.max = life; p.size = size; p.img = img; p.color = color;
    p.rot = Math.random() * Math.PI * 2; p.vr = 0;
    p.g = 0; p.drag = 2; p.grow = 0; p.alpha = 1;
    this.list.push(p);
    return p;
  }

  clear() { this.free.push(...this.list); this.list = []; }

  update(dt: number) {
    const L = this.list;
    for (let i = L.length - 1; i >= 0; i--) {
      const p = L[i];
      p.life -= dt;
      if (p.life <= 0) {
        L[i] = L[L.length - 1];
        L.pop();
        this.free.push(p);
        continue;
      }
      const d = Math.exp(-p.drag * dt);
      p.vx *= d;
      p.vy = p.vy * d + p.g * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
    }
  }

  /** Draw with a base transform of uniform scale s and translation (tx, ty). */
  draw(ctx: CanvasRenderingContext2D, s: number, tx: number, ty: number) {
    for (let pass = 0; pass < 2; pass++) {
      const add = pass === 1;
      ctx.globalCompositeOperation = add ? 'lighter' : 'source-over';
      for (const p of this.list) {
        if (ADDITIVE[p.kind] !== add) continue;
        const u = 1 - p.life / p.max; // age 0..1
        const X = tx + s * p.x, Y = ty + s * p.y;
        switch (p.kind) {
          case 'smoke': {
            const a = p.alpha * Math.min(1, u * 6) * (1 - u);
            if (a < 0.01) break;
            const z = p.size * (1 + p.grow * u);
            const c = Math.cos(p.rot) * s, sn = Math.sin(p.rot) * s;
            ctx.globalAlpha = a;
            ctx.setTransform(c, sn, -sn, c, X, Y);
            ctx.drawImage(p.img!, -z / 2, -z / 2, z, z);
            break;
          }
          case 'shard':
          case 'chip': {
            const a = Math.min(1, (1 - u) * 4) * p.alpha;
            const c = Math.cos(p.rot) * s, sn = Math.sin(p.rot) * s;
            // Fake 3D tumble: squash one axis with the spin.
            const flip = 0.35 + 0.65 * Math.abs(Math.cos(p.rot * 1.7));
            ctx.globalAlpha = a;
            ctx.setTransform(c, sn, -sn * flip, c * flip, X, Y);
            const z = p.size * (u > 0.7 ? 1 - (u - 0.7) / 0.3 * 0.6 : 1);
            if (p.img) ctx.drawImage(p.img, -z / 2, -z / 2, z, z);
            else { ctx.fillStyle = p.color; ctx.fillRect(-z / 2, -z / 4, z, z / 2); }
            break;
          }
          case 'spark': {
            const a = (1 - u) * p.alpha;
            const sp = Math.hypot(p.vx, p.vy);
            const ang = Math.atan2(p.vy, p.vx);
            const w = p.size * (1 - u * 0.5);
            const len = w + sp * 0.045;
            const c = Math.cos(ang) * s, sn = Math.sin(ang) * s;
            ctx.globalAlpha = a;
            ctx.setTransform(c, sn, -sn, c, X, Y);
            ctx.drawImage(p.img!, -len * 0.75, -w / 2, len, w);
            break;
          }
          case 'star': {
            const a = (1 - u) * Math.min(1, u / 0.12) * p.alpha;
            const tw = 0.75 + 0.25 * Math.sin(p.life * 28 + p.rot * 5);
            const z = p.size * (0.55 + 0.6 * (1 - u)) * tw;
            const c = Math.cos(p.rot) * s, sn = Math.sin(p.rot) * s;
            ctx.globalAlpha = a;
            ctx.setTransform(c, sn, -sn, c, X, Y);
            ctx.drawImage(p.img!, -z / 2, -z / 2, z, z);
            break;
          }
          case 'glow': {
            const a = p.alpha * (1 - u) ** 2;
            const z = p.size * (1 + p.grow * u);
            ctx.globalAlpha = a;
            ctx.setTransform(s, 0, 0, s, X, Y);
            ctx.drawImage(p.img!, -z / 2, -z / 2, z, z);
            break;
          }
          case 'ring': {
            const e = 1 - (1 - u) ** 3;
            const r = p.size * (0.25 + 0.75 * e);
            ctx.globalAlpha = (1 - u) * p.alpha;
            ctx.setTransform(s, 0, 0, s, X, Y);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = Math.max(0.6, p.size * 0.14 * (1 - u));
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.stroke();
            break;
          }
        }
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.setTransform(s, 0, 0, s, tx, ty);
  }
}
