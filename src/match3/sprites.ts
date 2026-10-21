// Procedurally drawn, pre-rendered sprites for pieces, specials and obstacles.
import type { Special } from './board.ts';
import { artImage } from '../art/assets.ts';

const PIECE_ART = ['red', 'yellow', 'blue', 'green', 'purple', 'orange'];

/** Draw a painted image centred in the unit square, keeping its aspect ratio. */
function drawFit(ctx: CanvasRenderingContext2D, img: HTMLImageElement, scale: number) {
  const a = img.naturalWidth / img.naturalHeight;
  const w = a >= 1 ? scale : scale * a, h = a >= 1 ? scale / a : scale;
  ctx.drawImage(img, 0.5 - w / 2, 0.5 - h / 2, w, h);
}

export const PIECE_COLORS = [
  { light: '#ffb3c0', base: '#ff3d63', dark: '#b3123c' }, // heart
  { light: '#fff6b0', base: '#ffcb2b', dark: '#d07f00' }, // star
  { light: '#b5ecff', base: '#2fa6ff', dark: '#1050c4' }, // gem
  { light: '#d6ffa8', base: '#5fd13a', dark: '#1f8a24' }, // leaf
  { light: '#ecc8ff', base: '#ad55ff', dark: '#6418b8' }, // amethyst
  { light: '#ffdcae', base: '#ff8c21', dark: '#c24d06' }, // flower
];

type Draw = (ctx: CanvasRenderingContext2D) => void;
type ShapeFn = (ctx: CanvasRenderingContext2D) => void;

const cache = new Map<string, HTMLCanvasElement>();
/** Pixel size of the sprite being drawn (shadows ignore transforms, so they need real pixels). */
let U = 1;

function shadow(ctx: CanvasRenderingContext2D, blur: number, offY: number, color: string) {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur * U;
  ctx.shadowOffsetY = offY * U;
}

function makeCanvas(px: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = c.height = Math.max(1, Math.round(px));
  return [c, c.getContext('2d')!];
}

/** Render `draw` into a cached canvas of px×px; drawing code works in a 0..1 unit square. */
function sprite(key: string, px: number, draw: Draw): HTMLCanvasElement {
  const k = `${key}@${Math.round(px)}`;
  let c = cache.get(k);
  if (!c) {
    let ctx: CanvasRenderingContext2D;
    [c, ctx] = makeCanvas(px);
    ctx.scale(px, px);
    U = px;
    draw(ctx);
    cache.set(k, c);
  }
  return c;
}

export function clearSpriteCache() { cache.clear(); }

// ---------- shape helpers (unit space) ----------

function roundedPoly(ctx: CanvasRenderingContext2D, pts: [number, number][], radius: number) {
  const n = pts.length;
  const mid = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mid(pts[n - 1], pts[0]);
  ctx.moveTo(start[0], start[1]);
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    const m = mid(p, q);
    ctx.arcTo(p[0], p[1], m[0], m[1], radius);
  }
  ctx.closePath();
}

const heart: ShapeFn = (ctx) => {
  ctx.moveTo(0.5, 0.88);
  ctx.bezierCurveTo(0.1, 0.64, 0.04, 0.4, 0.17, 0.25);
  ctx.bezierCurveTo(0.3, 0.1, 0.46, 0.15, 0.5, 0.29);
  ctx.bezierCurveTo(0.54, 0.15, 0.7, 0.1, 0.83, 0.25);
  ctx.bezierCurveTo(0.96, 0.4, 0.9, 0.64, 0.5, 0.88);
  ctx.closePath();
};

const star: ShapeFn = (ctx) => {
  const pts: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 ? 0.21 : 0.46;
    pts.push([0.5 + Math.cos(a) * r, 0.54 + Math.sin(a) * r]);
  }
  roundedPoly(ctx, pts, 0.05);
};

const gemPts: [number, number][] = [[0.24, 0.2], [0.76, 0.2], [0.92, 0.4], [0.5, 0.9], [0.08, 0.4]];
const gem: ShapeFn = (ctx) => roundedPoly(ctx, gemPts, 0.04);

const leaf: ShapeFn = (ctx) => {
  ctx.moveTo(0.16, 0.86);
  ctx.bezierCurveTo(0.06, 0.4, 0.4, 0.1, 0.88, 0.1);
  ctx.bezierCurveTo(0.9, 0.58, 0.6, 0.92, 0.16, 0.86);
  ctx.closePath();
};

const hexPts: [number, number][] = Array.from({ length: 6 }, (_, i) => {
  const a = Math.PI / 6 + (i * Math.PI) / 3;
  return [0.5 + Math.cos(a) * 0.43, 0.5 + Math.sin(a) * 0.43] as [number, number];
});
const hexagon: ShapeFn = (ctx) => roundedPoly(ctx, hexPts, 0.06);

const flower: ShapeFn = (ctx) => {
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const x = 0.5 + Math.cos(a) * 0.22, y = 0.52 + Math.sin(a) * 0.22;
    ctx.moveTo(x + 0.2, y);
    ctx.arc(x, y, 0.2, 0, Math.PI * 2);
  }
};

const SHAPES: ShapeFn[] = [heart, star, gem, leaf, hexagon, flower];

function glossyShape(ctx: CanvasRenderingContext2D, shape: ShapeFn, col: { light: string; base: string; dark: string }) {
  // Shadow + body
  ctx.save();
  shadow(ctx, 0.05, 0.035, 'rgba(0,0,0,0.35)');
  ctx.beginPath(); shape(ctx);
  ctx.fillStyle = col.dark;
  ctx.fill('nonzero');
  ctx.restore();

  const g = ctx.createLinearGradient(0, 0.1, 0, 0.9);
  g.addColorStop(0, col.light);
  g.addColorStop(0.45, col.base);
  g.addColorStop(1, col.dark);
  ctx.beginPath(); shape(ctx);
  ctx.fillStyle = g;
  ctx.fill('nonzero');

  // Inner glow & top highlight
  ctx.save();
  ctx.beginPath(); shape(ctx);
  ctx.clip('nonzero');
  const rg = ctx.createRadialGradient(0.5, 0.75, 0.05, 0.5, 0.7, 0.5);
  rg.addColorStop(0, 'rgba(255,255,255,0.25)');
  rg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, 1, 1);
  const hg = ctx.createLinearGradient(0, 0.1, 0, 0.5);
  hg.addColorStop(0, 'rgba(255,255,255,0.75)');
  hg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hg;
  ctx.beginPath();
  ctx.ellipse(0.42, 0.3, 0.26, 0.14, -0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.beginPath(); shape(ctx);
  ctx.lineWidth = 0.035;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = col.dark;
  ctx.stroke();

  // Sparkle
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.beginPath();
  ctx.arc(0.3, 0.3, 0.045, 0, Math.PI * 2);
  ctx.fill();
}

function drawDetails(ctx: CanvasRenderingContext2D, color: number) {
  const col = PIECE_COLORS[color];
  ctx.save();
  if (color === 2) {
    // Gem facets
    ctx.beginPath(); gem(ctx); ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.beginPath(); ctx.moveTo(0.24, 0.2); ctx.lineTo(0.76, 0.2); ctx.lineTo(0.66, 0.4); ctx.lineTo(0.34, 0.4); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,40,0.18)';
    ctx.beginPath(); ctx.moveTo(0.34, 0.4); ctx.lineTo(0.66, 0.4); ctx.lineTo(0.5, 0.9); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 0.015;
    ctx.beginPath(); ctx.moveTo(0.08, 0.4); ctx.lineTo(0.92, 0.4); ctx.stroke();
  } else if (color === 3) {
    // Leaf vein
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 0.03;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0.2, 0.82); ctx.quadraticCurveTo(0.45, 0.45, 0.82, 0.16); ctx.stroke();
    ctx.lineWidth = 0.02;
    for (const t of [0.35, 0.5, 0.65]) {
      const x = 0.2 + (0.82 - 0.2) * t, y = 0.82 + (0.16 - 0.82) * t;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 0.1, y + 0.08); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 0.06, y - 0.1); ctx.stroke();
    }
  } else if (color === 4) {
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.beginPath();
    roundedPoly(ctx, hexPts.map(([x, y]) => [0.5 + (x - 0.5) * 0.55, 0.5 + (y - 0.5) * 0.55] as [number, number]), 0.04);
    ctx.fill();
  } else if (color === 5) {
    const cg = ctx.createRadialGradient(0.46, 0.48, 0.02, 0.5, 0.52, 0.16);
    cg.addColorStop(0, '#fff7c2');
    cg.addColorStop(1, '#ffc23a');
    ctx.fillStyle = cg;
    ctx.strokeStyle = col.dark;
    ctx.lineWidth = 0.025;
    ctx.beginPath(); ctx.arc(0.5, 0.52, 0.14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}

export function pieceSprite(color: number, px: number): HTMLCanvasElement {
  const art = artImage(`pieces/${PIECE_ART[color]}`);
  if (art) return sprite(`pp${color}`, px, (ctx) => drawFit(ctx, art, 0.9));
  return sprite(`p${color}`, px, (ctx) => {
    ctx.translate(0.06, 0.06);
    ctx.scale(0.88, 0.88);
    glossyShape(ctx, SHAPES[color], PIECE_COLORS[color]);
    drawDetails(ctx, color);
  });
}

// ---------- specials ----------

function rocket(ctx: CanvasRenderingContext2D) {
  // Horizontal double-headed firework rocket.
  ctx.save();
  shadow(ctx, 0.05, 0.03, 'rgba(0,0,0,0.35)');
  // fins
  ctx.fillStyle = '#2f6fe0';
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(0.38, 0.5 + s * 0.1);
    ctx.lineTo(0.5, 0.5 + s * 0.27);
    ctx.lineTo(0.62, 0.5 + s * 0.1);
    ctx.closePath();
    ctx.fill();
  }
  // body
  const g = ctx.createLinearGradient(0, 0.36, 0, 0.64);
  g.addColorStop(0, '#ff8a8a');
  g.addColorStop(0.5, '#f02d3a');
  g.addColorStop(1, '#a5101c');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0.06, 0.5);
  ctx.quadraticCurveTo(0.14, 0.35, 0.3, 0.35);
  ctx.lineTo(0.7, 0.35);
  ctx.quadraticCurveTo(0.86, 0.35, 0.94, 0.5);
  ctx.quadraticCurveTo(0.86, 0.65, 0.7, 0.65);
  ctx.lineTo(0.3, 0.65);
  ctx.quadraticCurveTo(0.14, 0.65, 0.06, 0.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  // tips
  const tg = ctx.createLinearGradient(0, 0.35, 0, 0.65);
  tg.addColorStop(0, '#fff2a8');
  tg.addColorStop(1, '#f2a516');
  ctx.fillStyle = tg;
  for (const s of [0, 1]) {
    ctx.save();
    if (s) { ctx.translate(1, 0); ctx.scale(-1, 1); }
    ctx.beginPath();
    ctx.moveTo(0.06, 0.5);
    ctx.quadraticCurveTo(0.12, 0.38, 0.24, 0.36);
    ctx.lineTo(0.24, 0.64);
    ctx.quadraticCurveTo(0.12, 0.62, 0.06, 0.5);
    ctx.fill();
    ctx.restore();
  }
  // white band + stars
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0.44, 0.35, 0.12, 0.3);
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath(); ctx.ellipse(0.5, 0.41, 0.3, 0.035, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#7a0a14';
  ctx.lineWidth = 0.022;
  ctx.beginPath();
  ctx.moveTo(0.06, 0.5);
  ctx.quadraticCurveTo(0.14, 0.35, 0.3, 0.35); ctx.lineTo(0.7, 0.35);
  ctx.quadraticCurveTo(0.86, 0.35, 0.94, 0.5);
  ctx.quadraticCurveTo(0.86, 0.65, 0.7, 0.65); ctx.lineTo(0.3, 0.65);
  ctx.quadraticCurveTo(0.14, 0.65, 0.06, 0.5);
  ctx.stroke();
}

function bomb(ctx: CanvasRenderingContext2D) {
  ctx.save();
  shadow(ctx, 0.05, 0.035, 'rgba(0,0,0,0.4)');
  const g = ctx.createRadialGradient(0.38, 0.45, 0.04, 0.5, 0.58, 0.38);
  g.addColorStop(0, '#6b7a9e');
  g.addColorStop(0.5, '#2b3350');
  g.addColorStop(1, '#0d1020');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0.48, 0.58, 0.33, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  // cap
  ctx.save();
  ctx.translate(0.66, 0.3);
  ctx.rotate(0.6);
  const cg = ctx.createLinearGradient(-0.08, 0, 0.08, 0);
  cg.addColorStop(0, '#9aa3b5'); cg.addColorStop(0.5, '#e8ecf3'); cg.addColorStop(1, '#7b8396');
  ctx.fillStyle = cg;
  ctx.fillRect(-0.08, -0.07, 0.16, 0.12);
  ctx.restore();
  // fuse
  ctx.strokeStyle = '#c8955c';
  ctx.lineWidth = 0.035;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0.7, 0.26); ctx.quadraticCurveTo(0.78, 0.1, 0.86, 0.14); ctx.stroke();
  // highlight
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.beginPath(); ctx.ellipse(0.37, 0.45, 0.1, 0.06, -0.7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath(); ctx.arc(0.33, 0.43, 0.025, 0, Math.PI * 2); ctx.fill();
}

function plane(ctx: CanvasRenderingContext2D) {
  ctx.save();
  shadow(ctx, 0.05, 0.04, 'rgba(0,0,0,0.3)');
  const top = ctx.createLinearGradient(0.1, 0.3, 0.9, 0.5);
  top.addColorStop(0, '#ffffff'); top.addColorStop(1, '#d9ecff');
  ctx.fillStyle = top;
  ctx.beginPath(); ctx.moveTo(0.92, 0.22); ctx.lineTo(0.08, 0.44); ctx.lineTo(0.4, 0.56); ctx.closePath(); ctx.fill();
  ctx.restore();
  const bot = ctx.createLinearGradient(0.4, 0.4, 0.5, 0.9);
  bot.addColorStop(0, '#8fc6ff'); bot.addColorStop(1, '#2f7de0');
  ctx.fillStyle = bot;
  ctx.beginPath(); ctx.moveTo(0.92, 0.22); ctx.lineTo(0.4, 0.56); ctx.lineTo(0.3, 0.86); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#5aa2f2';
  ctx.beginPath(); ctx.moveTo(0.4, 0.56); ctx.lineTo(0.3, 0.86); ctx.lineTo(0.44, 0.64); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#1d4f9a';
  ctx.lineWidth = 0.022;
  ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(0.92, 0.22); ctx.lineTo(0.08, 0.44); ctx.lineTo(0.4, 0.56); ctx.lineTo(0.3, 0.86); ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0.92, 0.22); ctx.lineTo(0.4, 0.56); ctx.stroke();
}

function discoBall(ctx: CanvasRenderingContext2D, phase: number) {
  ctx.save();
  shadow(ctx, 0.05, 0.035, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = '#5b3d8f';
  ctx.beginPath(); ctx.arc(0.5, 0.5, 0.41, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.beginPath(); ctx.arc(0.5, 0.5, 0.41, 0, Math.PI * 2); ctx.clip();
  const N = 8;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = 0.09 + (i / N) * 0.82, y = 0.09 + (j / N) * 0.82;
      const hue = ((i * 45 + j * 25 + phase * 360) % 360 + 360) % 360;
      const dx = x + 0.05 - 0.5, dy = y + 0.05 - 0.5;
      const shade = 1 - Math.hypot(dx, dy) * 1.2;
      ctx.fillStyle = `hsl(${hue}, 90%, ${45 + shade * 30}%)`;
      ctx.fillRect(x + 0.006, y + 0.006, 0.82 / N - 0.012, 0.82 / N - 0.012);
    }
  }
  const sg = ctx.createRadialGradient(0.36, 0.33, 0.02, 0.5, 0.5, 0.45);
  sg.addColorStop(0, 'rgba(255,255,255,0.85)');
  sg.addColorStop(0.35, 'rgba(255,255,255,0.15)');
  sg.addColorStop(1, 'rgba(40,0,80,0.45)');
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, 1, 1);
  ctx.restore();
  ctx.strokeStyle = '#3a1f6b';
  ctx.lineWidth = 0.025;
  ctx.beginPath(); ctx.arc(0.5, 0.5, 0.41, 0, Math.PI * 2); ctx.stroke();
}

export function specialSprite(s: Special, px: number, phase = 0): HTMLCanvasElement {
  const artKey = s === 'rocketH' || s === 'rocketV' ? 'rocket' : s === 'rainbow' ? 'disco' : s;
  const art = artImage(`pieces/${artKey}`);
  if (art && s !== 'none') {
    if (s === 'rainbow') {
      // Painted disco ball + a moving sparkle so it still shimmers.
      const f = Math.floor((((phase % 1) + 1) % 1) * 12);
      return sprite(`prb${f}`, px, (ctx) => {
        drawFit(ctx, art, 0.92);
        const a = (f / 12) * Math.PI * 2;
        const g = ctx.createRadialGradient(0.5 + Math.cos(a) * 0.22, 0.45 + Math.sin(a) * 0.18, 0, 0.5 + Math.cos(a) * 0.22, 0.45 + Math.sin(a) * 0.18, 0.16);
        g.addColorStop(0, 'rgba(255,255,255,0.85)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 1, 1);
      });
    }
    return sprite(`p${s}`, px, (ctx) => {
      if (s === 'rocketV') { ctx.translate(0.5, 0.5); ctx.rotate(Math.PI / 2); ctx.translate(-0.5, -0.5); }
      drawFit(ctx, art, 0.94);
    });
  }
  switch (s) {
    case 'rocketH': return sprite('rH', px, rocket);
    case 'rocketV': return sprite('rV', px, (ctx) => { ctx.translate(0.5, 0.5); ctx.rotate(Math.PI / 2); ctx.translate(-0.5, -0.5); rocket(ctx); });
    case 'bomb': return sprite('bomb', px, bomb);
    case 'plane': return sprite('plane', px, plane);
    case 'rainbow': {
      const f = Math.floor((((phase % 1) + 1) % 1) * 12);
      return sprite(`rb${f}`, px, (ctx) => discoBall(ctx, f / 12));
    }
    default: return sprite('none', px, () => {});
  }
}

/** Half a rocket (one flying head) pointing right. */
export function rocketHeadSprite(px: number): HTMLCanvasElement {
  const art = artImage('pieces/rocket');
  return sprite(art ? 'prhead' : 'rhead', px, (ctx) => {
    ctx.save();
    ctx.beginPath(); ctx.rect(0.5, 0, 0.5, 1); ctx.clip();
    if (art) drawFit(ctx, art, 0.94); else rocket(ctx);
    ctx.restore();
  });
}

// ---------- obstacles ----------

export function boxSprite(layer: number, px: number): HTMLCanvasElement {
  const art = artImage(`pieces/box${layer}`);
  if (art) return sprite(`pbox${layer}`, px, (ctx) => drawFit(ctx, art, 1));
  return sprite(`box${layer}`, px, (ctx) => {
    const dark = layer === 3;
    const wood = dark ? ['#b07a4a', '#7d4f2b', '#4e2d14'] : ['#f0c48a', '#d4955a', '#9a5f2e'];
    ctx.save();
    shadow(ctx, 0.04, 0.03, 'rgba(0,0,0,0.35)');
    const g = ctx.createLinearGradient(0, 0.04, 0, 0.96);
    g.addColorStop(0, wood[0]); g.addColorStop(0.6, wood[1]); g.addColorStop(1, wood[2]);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.roundRect(0.04, 0.04, 0.92, 0.92, 0.1); ctx.fill();
    ctx.restore();
    // planks
    ctx.strokeStyle = 'rgba(70,35,10,0.45)';
    ctx.lineWidth = 0.025;
    for (const y of [0.35, 0.65]) { ctx.beginPath(); ctx.moveTo(0.12, y); ctx.lineTo(0.88, y); ctx.stroke(); }
    // frame
    ctx.strokeStyle = wood[2];
    ctx.lineWidth = 0.09;
    ctx.beginPath(); ctx.roundRect(0.1, 0.1, 0.8, 0.8, 0.06); ctx.stroke();
    ctx.lineWidth = 0.08;
    ctx.beginPath(); ctx.moveTo(0.16, 0.84); ctx.lineTo(0.84, 0.16); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 0.02;
    ctx.beginPath(); ctx.moveTo(0.1, 0.08); ctx.lineTo(0.9, 0.08); ctx.stroke();
    if (layer >= 2) {
      // metal straps
      const mg = ctx.createLinearGradient(0, 0, 1, 0);
      mg.addColorStop(0, '#8d97a8'); mg.addColorStop(0.5, '#e3e8f0'); mg.addColorStop(1, '#7c8597');
      ctx.fillStyle = mg;
      for (const x of [0.22, 0.68]) ctx.fillRect(x, 0.04, 0.1, 0.92);
      ctx.fillStyle = '#4a5160';
      for (const x of [0.27, 0.73]) for (const y of [0.16, 0.84]) { ctx.beginPath(); ctx.arc(x, y, 0.025, 0, Math.PI * 2); ctx.fill(); }
    }
    if (layer >= 3) {
      ctx.fillStyle = '#c9a227';
      for (const [x, y] of [[0.1, 0.1], [0.9, 0.1], [0.1, 0.9], [0.9, 0.9]]) {
        ctx.beginPath(); ctx.arc(x, y, 0.07, 0, Math.PI * 2); ctx.fill();
      }
    }
  });
}

export function dirtSprite(layer: number, px: number): HTMLCanvasElement {
  const art = artImage(`pieces/dirt${Math.min(2, layer)}`);
  if (art) return sprite(`pdirt${layer}`, px, (ctx) => drawFit(ctx, art, 0.98));
  return sprite(`dirt${layer}`, px, (ctx) => {
    const base = layer >= 2 ? '#6f4a2a' : '#b08a62';
    const spot = layer >= 2 ? '#4f3018' : '#8c6842';
    const crumb = layer >= 2 ? '#8f6a46' : '#d2b58e';
    ctx.fillStyle = base;
    ctx.beginPath(); ctx.roundRect(0.03, 0.03, 0.94, 0.94, 0.14); ctx.fill();
    // Fixed pseudo-random blotches so every tile looks the same (no flicker).
    let seed = layer * 97 + 13;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    ctx.fillStyle = spot;
    for (let i = 0; i < 7; i++) {
      ctx.globalAlpha = 0.5 + rnd() * 0.4;
      ctx.beginPath(); ctx.ellipse(0.15 + rnd() * 0.7, 0.15 + rnd() * 0.7, 0.05 + rnd() * 0.09, 0.04 + rnd() * 0.06, rnd() * 3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = crumb;
    for (let i = 0; i < 10; i++) {
      ctx.globalAlpha = 0.7;
      ctx.beginPath(); ctx.arc(0.1 + rnd() * 0.8, 0.1 + rnd() * 0.8, 0.015 + rnd() * 0.025, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = layer >= 2 ? '#3d2410' : '#7d5a36';
    ctx.lineWidth = 0.03;
    ctx.beginPath(); ctx.roundRect(0.03, 0.03, 0.94, 0.94, 0.14); ctx.stroke();
  });
}

/** Ice lock drawn over a frozen piece: 1 = thin clear shell, 2 = thick frosted block. */
export function iceSprite(layer: number, px: number): HTMLCanvasElement {
  const art = artImage(`pieces/ice${Math.min(2, layer)}`);
  if (art) return sprite(`pice${layer}`, px, (ctx) => drawFit(ctx, art, 1));
  return sprite(`ice${layer}`, px, (ctx) => {
    const thick = layer >= 2;
    const body = () => { ctx.beginPath(); ctx.roundRect(0.05, 0.05, 0.9, 0.9, 0.16); };
    const g = ctx.createLinearGradient(0, 0.05, 0, 0.95);
    g.addColorStop(0, thick ? 'rgba(236,250,255,0.8)' : 'rgba(225,247,255,0.62)');
    g.addColorStop(1, thick ? 'rgba(150,208,245,0.78)' : 'rgba(130,200,245,0.55)');
    ctx.fillStyle = g;
    body(); ctx.fill();
    ctx.save();
    body(); ctx.clip();
    // Diagonal light streaks
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath(); ctx.moveTo(0.05, 0.42); ctx.lineTo(0.42, 0.05); ctx.lineTo(0.56, 0.05); ctx.lineTo(0.05, 0.56); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath(); ctx.moveTo(0.05, 0.7); ctx.lineTo(0.7, 0.05); ctx.lineTo(0.76, 0.05); ctx.lineTo(0.05, 0.76); ctx.closePath(); ctx.fill();
    if (thick) {
      // Frost cracks and a snowy rim
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 0.022;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0.62, 0.95); ctx.lineTo(0.68, 0.72); ctx.lineTo(0.84, 0.62); ctx.moveTo(0.68, 0.72); ctx.lineTo(0.6, 0.6);
      ctx.moveTo(0.05, 0.86); ctx.lineTo(0.2, 0.8); ctx.lineTo(0.26, 0.9);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      for (const [x, y, r] of [[0.16, 0.12, 0.07], [0.3, 0.1, 0.06], [0.82, 0.12, 0.06], [0.9, 0.24, 0.05]]) {
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
    // Uniform outline + inner bevel line
    ctx.strokeStyle = thick ? '#2f7fc4' : '#4a9edb';
    ctx.lineWidth = 0.055;
    body(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 0.02;
    ctx.beginPath(); ctx.roundRect(0.1, 0.1, 0.8, 0.8, 0.12); ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(0.8, 0.78, 0.03, 0, Math.PI * 2); ctx.fill();
  });
}

/** Drop toy: a small teddy bear head with a bow. */
export function toySprite(px: number): HTMLCanvasElement {
  const art = artImage('pieces/toy');
  if (art) return sprite('ptoy', px, (ctx) => drawFit(ctx, art, 0.9));
  return sprite('toy', px, (ctx) => {
    const fur = '#c98a4b', furLight = '#e6b27a', line = '#6b3a17';
    const head = (c: CanvasRenderingContext2D) => { c.arc(0.5, 0.52, 0.32, 0, Math.PI * 2); };
    ctx.lineWidth = 0.035;
    ctx.strokeStyle = line;
    ctx.lineJoin = 'round';
    // Ears
    for (const s of [-1, 1]) {
      ctx.fillStyle = fur;
      ctx.beginPath(); ctx.arc(0.5 + s * 0.25, 0.25, 0.12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#f2a6a0';
      ctx.beginPath(); ctx.arc(0.5 + s * 0.25, 0.26, 0.06, 0, Math.PI * 2); ctx.fill();
    }
    // Head with a soft two-tone cel shade
    ctx.save();
    shadow(ctx, 0.04, 0.03, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = fur;
    ctx.beginPath(); head(ctx); ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.beginPath(); head(ctx); ctx.clip();
    ctx.fillStyle = furLight;
    ctx.beginPath(); ctx.ellipse(0.42, 0.38, 0.26, 0.2, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.beginPath(); head(ctx); ctx.stroke();
    // Snout, nose, mouth
    ctx.fillStyle = '#fbe3c4';
    ctx.beginPath(); ctx.ellipse(0.5, 0.63, 0.13, 0.1, 0, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = 0.025;
    ctx.stroke();
    ctx.fillStyle = '#3a1d0c';
    ctx.beginPath(); ctx.ellipse(0.5, 0.59, 0.045, 0.032, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#3a1d0c';
    ctx.lineWidth = 0.02;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0.5, 0.62); ctx.lineTo(0.5, 0.66); ctx.moveTo(0.45, 0.68); ctx.quadraticCurveTo(0.5, 0.71, 0.55, 0.68); ctx.stroke();
    // Eyes + cheeks
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#2a140a';
      ctx.beginPath(); ctx.ellipse(0.5 + s * 0.13, 0.48, 0.035, 0.045, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(0.5 + s * 0.13 - 0.012, 0.465, 0.013, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,120,130,0.45)';
      ctx.beginPath(); ctx.ellipse(0.5 + s * 0.21, 0.6, 0.05, 0.03, 0, 0, Math.PI * 2); ctx.fill();
    }
    // Bow tie
    ctx.fillStyle = '#ff4d6d';
    ctx.strokeStyle = '#9e1736';
    ctx.lineWidth = 0.025;
    ctx.beginPath();
    ctx.moveTo(0.5, 0.86); ctx.lineTo(0.36, 0.79); ctx.lineTo(0.36, 0.95); ctx.closePath();
    ctx.moveTo(0.5, 0.86); ctx.lineTo(0.64, 0.79); ctx.lineTo(0.64, 0.95); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0.5, 0.86, 0.035, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  });
}

/** Seamless carpet tile (the renderer adds the trim along the carpet's outer edges). */
export function carpetSprite(px: number): HTMLCanvasElement {
  const art = artImage('pieces/carpet');
  if (art) return sprite('pcarpet', px, (ctx) => ctx.drawImage(art, 0, 0, 1, 1));
  return sprite('carpet', px, (ctx) => {
    ctx.fillStyle = '#d9465f';
    ctx.fillRect(0, 0, 1, 1);
    // Diamond lattice that lines up across tiles
    ctx.fillStyle = '#c23552';
    ctx.beginPath(); ctx.moveTo(0.5, 0.08); ctx.lineTo(0.92, 0.5); ctx.lineTo(0.5, 0.92); ctx.lineTo(0.08, 0.5); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#f6c56b';
    ctx.lineWidth = 0.05;
    ctx.beginPath(); ctx.moveTo(0.5, 0.2); ctx.lineTo(0.8, 0.5); ctx.lineTo(0.5, 0.8); ctx.lineTo(0.2, 0.5); ctx.closePath(); ctx.stroke();
    ctx.fillStyle = '#f6c56b';
    ctx.beginPath(); ctx.arc(0.5, 0.5, 0.07, 0, Math.PI * 2); ctx.fill();
    for (const [x, y] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { ctx.beginPath(); ctx.arc(x, y, 0.1, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, 0, 1, 0.5);
  });
}

/** Carpet goal icon: a little rug with fringe. */
function rugIcon(px: number): HTMLCanvasElement {
  const tile = carpetSprite(px);
  return sprite('rugIcon', px, (ctx) => {
    ctx.strokeStyle = '#f3e3c3';
    ctx.lineWidth = 0.025;
    for (let i = 0; i < 9; i++) {
      const x = 0.2 + i * 0.075;
      ctx.beginPath(); ctx.moveTo(x, 0.06); ctx.lineTo(x, 0.16); ctx.moveTo(x, 0.84); ctx.lineTo(x, 0.94); ctx.stroke();
    }
    ctx.save();
    ctx.beginPath(); ctx.roundRect(0.12, 0.14, 0.76, 0.72, 0.06); ctx.clip();
    ctx.drawImage(tile, 0.12, 0.14, 0.38, 0.36); ctx.drawImage(tile, 0.5, 0.14, 0.38, 0.36);
    ctx.drawImage(tile, 0.12, 0.5, 0.38, 0.36); ctx.drawImage(tile, 0.5, 0.5, 0.38, 0.36);
    ctx.restore();
    ctx.strokeStyle = '#f6c56b';
    ctx.lineWidth = 0.05;
    ctx.beginPath(); ctx.roundRect(0.16, 0.18, 0.68, 0.64, 0.04); ctx.stroke();
    ctx.strokeStyle = '#7d1c33';
    ctx.lineWidth = 0.035;
    ctx.beginPath(); ctx.roundRect(0.12, 0.14, 0.76, 0.72, 0.06); ctx.stroke();
  });
}

/** Ice goal icon: a frozen gem. */
function iceIcon(px: number): HTMLCanvasElement {
  const gemImg = pieceSprite(2, px), ice = iceSprite(1, px);
  return sprite('iceIcon', px, (ctx) => { ctx.drawImage(gemImg, 0.1, 0.1, 0.8, 0.8); ctx.drawImage(ice, 0, 0, 1, 1); });
}

export type IconKind = 'color' | 'box' | 'dirt' | 'ice' | 'toy' | 'carpet' | Special;

/** Sprite for a goal / icon kind (also used for the goal flyers). */
export function goalSprite(kind: IconKind, color: number, px: number): HTMLCanvasElement {
  switch (kind) {
    case 'color': return pieceSprite(color, px);
    case 'box': return boxSprite(1, px);
    case 'dirt': return dirtSprite(2, px);
    case 'ice': return iceIcon(px);
    case 'toy': return toySprite(px);
    case 'carpet': return rugIcon(px);
    default: return specialSprite(kind, px);
  }
}

/** Data URL icon for DOM use (goals, boosters). */
export function iconURL(kind: IconKind, color = 0, px = 96): string {
  return goalSprite(kind, color, px).toDataURL();
}
