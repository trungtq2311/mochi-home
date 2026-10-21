// Original home-decoration artwork (rooms, item icons, Mochi the cat mascot).
// Pure string-building SVG: no DOM, no external images, no dependencies.
// Item keys / style indices match src/meta/rooms.ts.
import { paintedIconSVG, paintedMascotSVG, paintedRoomSVG } from '../art/paintedRoom.ts';

export const ROOM_W = 400;
export const ROOM_H = 640;

type Placed = Record<string, number>;
type ItemFn = (style: number | undefined) => string;
type LayerFn = (placed: Placed, frac: number) => string;
type Layer = string | LayerFn;
interface RoomArt { items: Record<string, ItemFn>; layers: Layer[] }
interface IconSpec { box: [number, number, number, number]; crop?: boolean; bg?: string[]; sy?: number }

/* =====================================================================
 * id / <defs> context (ids are unique per call: prefix + global counter)
 * ===================================================================== */
let callSeq = 0;
let idPrefix = 'x';
let idNext = 0;
let defs: string[] = [];
let gcache = new Map<string, string>();

function begin(tag: string): void {
  callSeq++;
  idPrefix = `${tag.replace(/[^A-Za-z0-9]/g, '') || 'x'}${callSeq}_`;
  idNext = 0;
  defs = [];
  gcache = new Map();
}
/** reuse one bounding-box-relative paint server per key within a single SVG */
function cached(key: string, make: () => string): string {
  let v = gcache.get(key);
  if (!v) { v = make(); gcache.set(key, v); }
  return v;
}
function nid(): string { return idPrefix + (idNext++).toString(36); }
function svgWrap(viewBox: string, body: string, extra = ''): string {
  const d = defs.length ? `<defs>${defs.join('')}</defs>` : '';
  defs = [];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" ${extra}>${d}${body}</svg>`;
}

/* =====================================================================
 * numbers, random, colors
 * ===================================================================== */
const r1 = (v: number): number => Math.round(v * 10) / 10;
const r3 = (v: number): number => Math.round(v * 1000) / 1000;

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hx(c: string): [number, number, number] {
  let v = c.replace('#', '');
  if (v.length === 3) v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
function mix(a: string, b: string, t: number): string {
  const A = hx(a), B = hx(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
const lt = (c: string, t: number): string => mix(c, '#ffffff', t);
const dn = (c: string, t: number): string => mix(c, '#1e140c', t);
/** warm darker outline shade of a color */
const dk = (c: string): string => mix(c, '#2a1a10', 0.42);
const pick = <T>(arr: T[], R: () => number): T => arr[Math.floor(R() * arr.length) % arr.length];

/* =====================================================================
 * gradients / patterns / clips
 * ===================================================================== */
type Stop = string | [number, string] | [number, string, number];
function stopXml(s: Stop[]): string {
  return s.map((st, i) => {
    if (typeof st === 'string') return `<stop offset="${s.length === 1 ? 0 : r3(i / (s.length - 1))}" stop-color="${st}"/>`;
    const [o, c, a] = st;
    return `<stop offset="${r3(o)}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${r3(a)}"` : ''}/>`;
  }).join('');
}
/** linear gradient in bounding-box units; default top -> bottom */
function lg(s: Stop[], x1 = 0, y1 = 0, x2 = 0, y2 = 1): string {
  const id = nid();
  defs.push(`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stopXml(s)}</linearGradient>`);
  return `url(#${id})`;
}
/** linear gradient in user space */
function lgU(s: Stop[], x1: number, y1: number, x2: number, y2: number): string {
  const id = nid();
  defs.push(`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}">${stopXml(s)}</linearGradient>`);
  return `url(#${id})`;
}
/** radial gradient in bounding-box units */
function rg(s: Stop[], cx = 0.5, cy = 0.5, r = 0.5, fx = cx, fy = cy): string {
  const id = nid();
  defs.push(`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}">${stopXml(s)}</radialGradient>`);
  return `url(#${id})`;
}
/** radial gradient in user space */
function rgU(s: Stop[], cx: number, cy: number, r: number): string {
  const id = nid();
  defs.push(`<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}">${stopXml(s)}</radialGradient>`);
  return `url(#${id})`;
}
function patt(w: number, h: number, body: string, transform = ''): string {
  const id = nid();
  defs.push(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="${w}" height="${h}"${transform ? ` patternTransform="${transform}"` : ''}>${body}</pattern>`);
  return `url(#${id})`;
}
/** returns a clip-path attribute */
function clip(body: string): string {
  const id = nid();
  defs.push(`<clipPath id="${id}">${body}</clipPath>`);
  return `clip-path="url(#${id})"`;
}
/** returns a mask attribute (content in the user space of the masked element) */
function mask(body: string): string {
  const id = nid();
  defs.push(`<mask id="${id}" maskUnits="userSpaceOnUse" x="-500" y="-500" width="1400" height="1640">${body}</mask>`);
  return `mask="url(#${id})"`;
}
/** horizontal "fabric folds" gradient */
function folds(c: string, n: number): string {
  const s: Stop[] = [];
  for (let i = 0; i <= n * 2; i++) s.push([i / (n * 2), i % 2 ? lt(c, 0.16) : dn(c, 0.2)]);
  return lg(s, 0, 0, 1, 0);
}

/* =====================================================================
 * shapes
 * ===================================================================== */
function P(a: number[]): string {
  let s = '';
  for (let i = 0; i < a.length; i += 2) s += `${r1(a[i])},${r1(a[i + 1])} `;
  return s.trim();
}
function rect(x: number, y: number, w: number, h: number, fill: string, ex = ''): string {
  return `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" fill="${fill}" ${ex}/>`;
}
function rr(x: number, y: number, w: number, h: number, r: number, fill: string, ex = ''): string {
  return `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${r1(r)}" fill="${fill}" ${ex}/>`;
}
function ell(cx: number, cy: number, rx: number, ry: number, fill: string, ex = ''): string {
  return `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${fill}" ${ex}/>`;
}
function circ(cx: number, cy: number, r: number, fill: string, ex = ''): string {
  return `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${fill}" ${ex}/>`;
}
function pth(d: string, fill: string, ex = ''): string { return `<path d="${d}" fill="${fill}" ${ex}/>`; }
function poly(a: number[], fill: string, ex = ''): string { return `<polygon points="${P(a)}" fill="${fill}" ${ex}/>`; }
function ln(x1: number, y1: number, x2: number, y2: number, c: string, w = 1.5, ex = ''): string {
  return `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
}
function pl(a: number[], c: string, w = 1.5, ex = ''): string {
  return `<polyline points="${P(a)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
}
const op = (o: number): string => ` opacity="${r3(o)}"`;
/** outline attrs in a darker shade of the base color */
const ol = (c: string, w = 1.5): string => ` stroke="${dk(c)}" stroke-width="${w}" stroke-linejoin="round"`;
/** stroke attrs */
const sk = (c: string, w = 1.5): string => ` stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const g = (body: string, ex = ''): string => `<g ${ex}>${body}</g>`;
const rot = (a: number, cx: number, cy: number): string => `transform="rotate(${a} ${r1(cx)} ${r1(cy)})"`;
/** mirror horizontally around x = cx */
const mirror = (cx: number): string => `transform="translate(${r1(cx * 2)} 0) scale(-1 1)"`;
const NOPE = 'pointer-events="none"';

function shadow(cx: number, cy: number, rx: number, ry: number, o = 0.22): string {
  return ell(cx, cy, rx, ry, cached(`sh${o}`, () => rg([[0, '#000', o], [0.55, '#000', o * 0.8], [1, '#000', 0]])));
}
function glow(cx: number, cy: number, r: number, c: string, o = 0.6): string {
  return circ(cx, cy, r, cached(`gl${c}${o}`, () => rg([[0, c, o], [0.45, c, o * 0.45], [1, c, 0]])), NOPE);
}
/** clip a polygon to the canvas (x -1..401, y <= 642) so item bounding boxes stay tidy */
function clipPoly(a: number[], x0 = -1, x1 = 401, y1 = 642): number[] {
  type V = [number, number];
  let pts: V[] = [];
  for (let i = 0; i < a.length; i += 2) pts.push([a[i], a[i + 1]]);
  const planes: [(p: V) => boolean, (p: V, q: V) => V][] = [
    [(p) => p[0] >= x0, (p, q) => [x0, p[1] + ((q[1] - p[1]) * (x0 - p[0])) / (q[0] - p[0])]],
    [(p) => p[0] <= x1, (p, q) => [x1, p[1] + ((q[1] - p[1]) * (x1 - p[0])) / (q[0] - p[0])]],
    [(p) => p[1] <= y1, (p, q) => [p[0] + ((q[0] - p[0]) * (y1 - p[1])) / (q[1] - p[1]), y1]],
  ];
  for (const [inside, cut] of planes) {
    const out: V[] = [];
    pts.forEach((cur, i) => {
      const prev = pts[(i + pts.length - 1) % pts.length];
      if (inside(cur)) { if (!inside(prev)) out.push(cut(prev, cur)); out.push(cur); }
      else if (inside(prev)) out.push(cut(prev, cur));
    });
    pts = out;
    if (!pts.length) return [];
  }
  return pts.flat();
}
const onCanvas = (x: number): boolean => x >= 0 && x <= 400;
function sparkle(x: number, y: number, s: number, c: string, ex = ''): string {
  const k = s * 0.22;
  return pth(`M${r1(x)} ${r1(y - s)} Q${r1(x + k)} ${r1(y - k)} ${r1(x + s)} ${r1(y)} Q${r1(x + k)} ${r1(y + k)} ${r1(x)} ${r1(y + s)} Q${r1(x - k)} ${r1(y + k)} ${r1(x - s)} ${r1(y)} Q${r1(x - k)} ${r1(y - k)} ${r1(x)} ${r1(y - s)} Z`, c, ex);
}
/** corner cobweb; dx=1 spreads right, -1 spreads left */
function cobweb(x: number, y: number, s: number, dx: 1 | -1): string {
  const angs = [0, 24, 46, 68, 90].map((a) => (a * Math.PI) / 180);
  let d = '';
  for (const a of angs) d += `M${r1(x)} ${r1(y)} L${r1(x + dx * Math.cos(a) * s)} ${r1(y + Math.sin(a) * s)} `;
  for (const k of [0.3, 0.55, 0.8]) {
    angs.forEach((a, i) => {
      const px = x + dx * Math.cos(a) * s * k, py = y + Math.sin(a) * s * k;
      if (i === 0) { d += `M${r1(px)} ${r1(py)} `; return; }
      const am = (a + angs[i - 1]) / 2;
      d += `Q${r1(x + dx * Math.cos(am) * s * k * 0.8)} ${r1(y + Math.sin(am) * s * k * 0.8)} ${r1(px)} ${r1(py)} `;
    });
  }
  return pth(d, 'none', `stroke="#ffffff" stroke-width="0.7" opacity="0.8"`);
}
function crack(a: number[], w = 1.2): string {
  const b = a.map((v, i) => (i % 2 ? v + 1 : v + 0.6));
  return pl(b, '#ffffff', w * 0.7, op(0.25)) + pl(a, '#3d332a', w, op(0.8));
}
/** quadratic bezier point and tangent */
function qb(x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, t: number): [number, number, number, number] {
  const u = 1 - t;
  const x = u * u * x0 + 2 * u * t * cx + t * t * x1;
  const y = u * u * y0 + 2 * u * t * cy + t * t * y1;
  const tx = 2 * u * (cx - x0) + 2 * t * (x1 - cx);
  const ty = 2 * u * (cy - y0) + 2 * t * (y1 - cy);
  const L = Math.hypot(tx, ty) || 1;
  return [x, y, tx / L, ty / L];
}
/** bilinear point inside quad [tl, tr, br, bl] */
function qp(q: number[], u: number, v: number): [number, number] {
  const tx = q[0] + (q[2] - q[0]) * u, ty = q[1] + (q[3] - q[1]) * u;
  const bx = q[6] + (q[4] - q[6]) * u, by = q[7] + (q[5] - q[7]) * u;
  return [tx + (bx - tx) * v, ty + (by - ty) * v];
}
function qpoly(q: number[], uv: number[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < uv.length; i += 2) out.push(...qp(q, uv[i], uv[i + 1]));
  return out;
}

/* =====================================================================
 * floor perspective (eye level y=120, back wall meets floor at y=380)
 * ===================================================================== */
const VPX = 200, VPY = 120, BACK = 380, FOC = 346;
const pk = (y: number): number => (y - VPY) / (BACK - VPY);
/** x on screen of a floor point that would be at x0 on the back wall line */
const fx = (x0: number, y: number): number => VPX + (x0 - VPX) * pk(y);
/** screen y of floor point at depth d (world units) in front of back wall */
const depthY = (d: number): number => VPY + ((BACK - VPY) * FOC) / (FOC - d);
/** floor quad (tl,tr,br,bl) between back-wall x positions xa..xb and screen rows ya..yb */
const fq = (xa: number, xb: number, ya: number, yb: number): number[] => [fx(xa, ya), ya, fx(xb, ya), ya, fx(xb, yb), yb, fx(xa, yb), yb];

/* =====================================================================
 * shared pieces
 * ===================================================================== */
function itemGroup(key: string, st: number | undefined, body: string): string {
  return `<g class="room-item" data-item="${key}" data-state="${st === undefined ? 'before' : 'done'}"${st === undefined ? '' : ` data-style="${st}"`}>${body}</g>`;
}

function moodLayer(frac: number, tint: string): string {
  let s = '';
  const dim = 0.22 * (1 - frac);
  if (dim > 0.002) s += rect(0, 0, 400, 640, tint, `${op(dim)} ${NOPE}`);
  s += rect(0, 0, 400, 640, rgU([[0, '#000', 0], [0.62, '#000', 0], [1, '#2a1608', 0.3]], 200, 330, 390), NOPE);
  return s;
}

function cloud(x: number, y: number, s: number, c: string): string {
  return g(ell(x, y, 30 * s, 11 * s, c) + circ(x - 13 * s, y - 5 * s, 12 * s, c) + circ(x + 6 * s, y - 10 * s, 16 * s, c) + circ(x + 22 * s, y - 3 * s, 10 * s, c), op(0.95));
}

/** sky + hills seen through a window, clipped to the glass */
function glassView(x: number, y: number, w: number, h: number): string {
  let v = rect(x, y, w, h, lg(['#7cc7f5', '#d6f0ff']));
  v += glow(x + w * 0.78, y + h * 0.18, w * 0.6, '#fffbe0', 0.85);
  v += cloud(x + w * 0.3, y + h * 0.25, w / 110, '#ffffff');
  v += cloud(x + w * 0.85, y + h * 0.42, w / 170, '#ffffff');
  v += pth(`M${x} ${r1(y + h * 0.74)} Q${r1(x + w * 0.3)} ${r1(y + h * 0.6)} ${r1(x + w * 0.6)} ${r1(y + h * 0.72)} T${x + w} ${r1(y + h * 0.66)} V${y + h} H${x} Z`, '#a6d98f');
  v += pth(`M${x} ${r1(y + h * 0.86)} Q${r1(x + w * 0.45)} ${r1(y + h * 0.74)} ${x + w} ${r1(y + h * 0.84)} V${y + h} H${x} Z`, '#7dbd69');
  v += circ(x + w * 0.2, y + h * 0.76, w * 0.08, '#5a9e55') + circ(x + w * 0.27, y + h * 0.78, w * 0.06, '#4d8f4a');
  v += circ(x + w * 0.72, y + h * 0.7, w * 0.07, '#5a9e55');
  v += poly([x + w * 0.12, y + h, x + w * 0.42, y, x + w * 0.58, y, x + w * 0.28, y + h], '#ffffff', op(0.16));
  v += poly([x + w * 0.5, y + h, x + w * 0.8, y, x + w * 0.86, y, x + w * 0.56, y + h], '#ffffff', op(0.12));
  return g(v, clip(rect(x, y, w, h, '#fff')));
}

/** window frame with glass (clean or broken) */
function windowUnit(x: number, y: number, w: number, h: number, frame: string, broken: boolean): string {
  const t = 6;
  let s = rr(x - t - 3, y - t - 3, w + 2 * t + 6, h + 2 * t + 6, 3, dn(frame, 0.12), op(0.35));
  s += rr(x - t, y - t, w + 2 * t, h + 2 * t, 2, lg([lt(frame, 0.3), frame]), ol(frame, 1.3));
  if (!broken) {
    s += glassView(x, y, w, h);
  } else {
    let v = rect(x, y, w, h, lg(['#7b8783', '#59635f']));
    v += ell(x + w * 0.3, y + h * 0.7, w * 0.4, h * 0.25, '#4a4238', op(0.35));
    v += ell(x + w * 0.75, y + h * 0.2, w * 0.3, h * 0.15, '#4a4238', op(0.25));
    // missing shard
    v += poly([x + w * 0.52, y, x + w, y, x + w, y + h * 0.3, x + w * 0.86, y + h * 0.22, x + w * 0.74, y + h * 0.34, x + w * 0.66, y + h * 0.16], '#25292c');
    v += poly([x + w * 0.52, y, x + w * 0.66, y + h * 0.16, x + w * 0.6, y + h * 0.1], '#c7d3d6', op(0.5));
    const cx = x + w * 0.3, cy = y + h * 0.62;
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + 0.3;
      const L = (0.35 + (i % 3) * 0.15) * w;
      v += pl([cx, cy, cx + Math.cos(a) * L * 0.5 + 3, cy + Math.sin(a) * L * 0.5, cx + Math.cos(a) * L, cy + Math.sin(a) * L], '#e9f0f0', 0.8, op(0.75));
    }
    v += circ(cx, cy, 4, 'none', `stroke="#e9f0f0" stroke-width="0.8" opacity="0.7"`);
    s += g(v, clip(rect(x, y, w, h, '#fff')));
  }
  const mx = x + w / 2, my = y + h * 0.48;
  s += rect(mx - 2, y, 4, h, frame, ol(frame, 0.8)) + rect(x, my - 2, w, 4, frame, ol(frame, 0.8));
  s += rect(x, y, w, 3, '#000', op(0.14)) + rect(x, y, 3, h, '#000', op(0.08));
  s += rr(x - t - 8, y + h + t - 2, w + 2 * t + 16, 8, 2, lg([lt(frame, 0.4), dn(frame, 0.08)]), ol(frame, 1.2));
  s += rect(x - t - 6, y + h + t + 6, w + 2 * t + 12, 5, lg([[0, '#000', 0.18], [1, '#000', 0]]));
  if (broken) {
    const bc = '#8a6a48', e = Math.min(12, w * 0.09), bh = Math.min(11, w * 0.11), tilt = Math.min(22, h * 0.15);
    s += g(rr(x - e, y + h * 0.42, w + 2 * e, bh, 1.5, lg([lt(bc, 0.15), bc]), ol(bc, 1.2)) + circ(x - e / 2, y + h * 0.42 + bh / 2, 1.5, '#555') + circ(x + w + e / 2, y + h * 0.42 + bh / 2, 1.5, '#555'), rot(-tilt, x + w / 2, y + h * 0.46));
    s += g(rr(x - e * 0.7, y + h * 0.7, w + 1.4 * e, bh * 0.82, 1.5, lg([lt(bc, 0.05), dn(bc, 0.1)]), ol(bc, 1.2)) + circ(x - e * 0.3, y + h * 0.7 + bh * 0.41, 1.5, '#555') + circ(x + w + e * 0.3, y + h * 0.7 + bh * 0.41, 1.5, '#555'), rot(9, x + w / 2, y + h * 0.74));
    s += cobweb(x, y, w * 0.38, 1) + cobweb(x + w, y + h * 0.52, w * 0.22, -1);
  }
  return s;
}

/** planks of a wooden floor in perspective */
function plankFloor(pal: string[], seam: string, grain: string, seed: number): string {
  const R = rng(seed);
  const rows: number[] = [];
  for (let j = 0; ; j++) { const y = depthY(21 * j); rows.push(Math.min(y, 660)); if (y > 650) break; }
  const last = rows.length - 1;
  let s = '';
  for (let i = 0; i < 17; i++) {
    const xa = -12 + 26 * i, xb = xa + 26;
    const off = [0, 2, 1, 3][i % 4];
    for (let j = off - 4; j < last; j += 4) {
      const ja = Math.max(0, j), jb = Math.min(last, j + 4);
      if (jb <= ja) continue;
      const ya = rows[ja], yb = rows[jb];
      const c = pick(pal, R);
      const t = 0.25 + R() * 0.5, r2 = R(), gx3 = xa + 26 * (0.15 + R() * 0.7), r3k = R(), ku = 0.3 + R() * 0.4, kv = 0.3 + R() * 0.4, wob = (R() - 0.5) * 8;
      const q = clipPoly(fq(xa, xb, ya, yb));
      if (q.length < 6) continue;
      s += poly(q, c, `stroke="${seam}" stroke-width="0.9"`);
      const gx = xa + 26 * t, gx2 = gx + wob, yb2 = Math.min(yb, 640);
      if (onCanvas(fx(gx, ya)) && onCanvas(fx(gx2, yb2))) s += ln(fx(gx, ya), ya + 2, fx(gx2, yb2), yb2 - 2, grain, 0.7, op(0.45));
      const ym = ya + (yb2 - ya) * 0.3;
      if (r2 < 0.5 && onCanvas(fx(gx3, ym)) && onCanvas(fx(gx3, yb2))) s += ln(fx(gx3, ym), ym, fx(gx3, yb2), yb2 - 3, grain, 0.5, op(0.35));
      const ky = ya + (yb2 - ya) * kv, kx = fx(xa + 26 * ku, ky);
      if (r3k < 0.2 && kx > 4 && kx < 396) s += ell(kx, ky, 2.4 * pk(ky), 1.3 * pk(ky), grain, op(0.55));
    }
  }
  return s;
}

/* =====================================================================
 * LIVING ROOM
 * ===================================================================== */
const LV_WIN = { x: 50, y: 132, w: 80, h: 146 };

function lvWallpaper(st?: number): string {
  const W = 400, H = 384;
  if (st === undefined) {
    let s = rect(0, 0, W, H, lg(['#c2b7a2', '#a69a84']));
    s += pth('M290 0 C 286 36 318 70 356 62 C 384 56 400 40 400 26 V0 Z', '#7d6a4c', op(0.2));
    s += ell(170, 92, 64, 30, rg([[0, '#7d6a4c', 0.04], [0.72, '#7d6a4c', 0.16], [0.88, '#6b583c', 0.3], [1, '#6b583c', 0]]));
    s += ell(330, 300, 40, 50, rg([[0, '#6e5d42', 0.12], [0.8, '#6e5d42', 0.2], [1, '#6e5d42', 0]]));
    for (const [x, y, l] of [[150, 112, 70], [168, 118, 46], [196, 110, 90], [348, 60, 120], [372, 56, 80]]) s += rect(x, y, 3, l, lg([[0, '#6e5d42', 0.35], [1, '#6e5d42', 0]]));
    const brick = patt(26, 14, rect(0, 0, 26, 14, '#a95f45') + rect(0, 6, 26, 1.5, '#d9c7a8') + rect(0, 13, 26, 1.5, '#d9c7a8') + rect(12, 0, 1.5, 6, '#d9c7a8') + rect(25, 7, 1.5, 6, '#d9c7a8'));
    const edge = 'stroke="#ece3d0" stroke-width="3" stroke-linejoin="round"';
    s += poly([182, 236, 198, 228, 214, 238, 236, 230, 252, 244, 246, 264, 256, 282, 232, 294, 212, 286, 190, 294, 178, 276, 188, 258], brick, edge);
    s += pth('M236 230 Q 266 220 274 242 Q 262 238 252 244 Z', '#d8ccb4', ol('#d8ccb4', 1));
    s += poly([264, 112, 282, 106, 292, 122, 286, 140, 292, 160, 274, 168, 262, 150, 268, 132], brick, edge);
    s += poly([14, 302, 34, 296, 52, 306, 46, 324, 56, 340, 30, 346, 12, 334, 20, 318], brick, edge);
    s += pth('M110 0 H134 L132 70 Q128 92 116 96 Q124 80 118 72 L112 40 Z', '#cfc3aa', ol('#cfc3aa', 1));
    s += crack([262, 172, 270, 196, 262, 214, 276, 236, 270, 262]);
    s += crack([160, 100, 166, 118, 158, 132, 168, 150]);
    s += crack([380, 120, 372, 150, 384, 176, 376, 210, 386, 240]);
    const R = rng(7);
    for (let i = 0; i < 40; i++) s += circ(R() * 400, 338 + R() * 24, 1 + R() * 3, '#5d6b45', op(0.15 + R() * 0.2));
    return s;
  }
  let p: string;
  if (st === 0) {
    p = patt(30, 12, rect(0, 0, 30, 12, '#f3e3c3') + rect(0, 0, 11, 12, '#ebd5ab') + rect(14, 0, 1.6, 12, '#fff5df') + rect(26, 0, 1.2, 12, '#e3cb9c'));
  } else if (st === 1) {
    const fl = (x: number, y: number, c: string): string => {
      let f = '';
      for (let a = 0; a < 360; a += 72) f += ell(x, y - 3.2, 2.2, 3.4, c, rot(a, x, y));
      return f + circ(x, y, 1.6, '#f2c14e');
    };
    const leaf = (x: number, y: number, a: number): string => ell(x, y, 1.6, 4, '#86c5a6', rot(a, x, y));
    p = patt(48, 48, rect(0, 0, 48, 48, '#bfe3d0') + leaf(18, 16, 50) + leaf(7, 18, -40) + leaf(42, 40, 50) + leaf(31, 42, -40) + fl(12, 12, '#ffffff') + fl(36, 36, '#fbe1e6') + circ(36, 10, 1.4, '#ffffff', op(0.8)) + circ(10, 36, 1.4, '#ffffff', op(0.8)));
  } else {
    p = patt(32, 40, rect(0, 0, 32, 40, '#e9c2c5') + pth('M16 0 L32 20 L16 40 L0 20 Z', 'none', `stroke="#dcabb0" stroke-width="1.2"`) + ell(16, 20, 3, 5, '#f5d9db') + circ(16, 20, 1.3, '#d99ea4') + circ(0, 0, 2, '#f5d9db') + circ(32, 0, 2, '#f5d9db') + circ(0, 40, 2, '#f5d9db') + circ(32, 40, 2, '#f5d9db'));
  }
  let s = rect(0, 0, W, H, p);
  s += rect(0, 0, W, H, lg([[0, '#000', 0.12], [0.3, '#000', 0], [0.82, '#000', 0], [1, '#000', 0.1]]));
  s += rect(0, 0, W, H, rgU([[0, '#fff8e6', 0.38], [1, '#fff8e6', 0]], 92, 210, 190));
  return s;
}

function lvFloor(st?: number): string {
  if (st === undefined) {
    let s = rect(0, 380, 400, 260, '#7f7466');
    s += plankFloor(['#8f8577', '#857a6b', '#978c7c', '#7b7062', '#8a7f70'], '#5a5045', '#5f5548', 11);
    s += rect(0, 380, 400, 260, lg([[0, '#c9c0b0', 0.35], [1, '#c9c0b0', 0.1]]));
    for (const [x, y, rx, ry] of [[90, 430, 70, 18], [300, 520, 90, 26], [220, 410, 60, 10], [74, 560, 60, 20]]) s += ell(x, y, rx, ry, rg([[0, '#e2dbcf', 0.45], [1, '#e2dbcf', 0]]));
    s += poly([300, 470, 322, 462, 344, 468, 352, 482, 336, 496, 312, 498, 296, 488], '#2e2620', ol('#6d5f4f', 1.5));
    s += poly([304, 470, 316, 452, 322, 462], '#8a7d6b', ol('#8a7d6b', 1)) + poly([344, 468, 360, 458, 352, 482], '#8a7d6b', ol('#8a7d6b', 1));
    s += crack([96, 404, 120, 412, 132, 426, 160, 432]);
    s += crack([250, 540, 272, 532, 280, 516, 300, 512]);
    s += circ(352, 424, 7, '#e8e2d4', ol('#e8e2d4', 1)) + pl([347, 421, 352, 426, 356, 420], '#9a9384', 0.8) + pl([349, 428, 354, 425], '#9a9384', 0.8);
    for (const [x, y] of [[240, 404], [130, 470], [370, 470]]) s += ell(x, y, 7, 3.5, '#bdb5a6', op(0.9)) + ell(x + 3, y - 1, 4, 2.4, '#d6cfc2');
    s += ln(214, 528, 222, 524, '#4a4a4a', 1.4) + ln(186, 536, 190, 530, '#4a4a4a', 1.4);
    return s;
  }
  const pal = [
    ['#c8955c', '#bf8a52', '#d19f66', '#c38f57', '#cc9a60'],
    ['#7a4a2c', '#6e4126', '#855333', '#73452a', '#7f4d2f'],
    ['#e8dccb', '#e0d2bf', '#efe4d5', '#e4d7c5', '#ebe0cf'],
  ][st];
  let s = rect(0, 380, 400, 260, pal[0]);
  s += plankFloor(pal, dn(pal[0], 0.3), dn(pal[0], 0.22), 21 + st);
  s += rect(0, 380, 400, 260, lg([[0, '#000', 0.1], [0.14, '#000', 0], [0.6, '#fff', 0], [1, '#fff', 0.06]]));
  s += ell(110, 432, 70, 34, rg([[0, '#fff', 0.28], [1, '#fff', 0]]));
  s += ell(230, 470, 110, 40, rg([[0, '#fff', 0.1], [1, '#fff', 0]]));
  return s;
}

function lvTrim(placed: Placed): string {
  const c = placed.wallpaper !== undefined ? '#fbf6ee' : '#c8bead';
  let s = rect(0, 0, 400, 18, lg([lt(c, 0.3), c])) + rect(0, 18, 400, 4, dn(c, 0.14)) + rect(0, 22, 400, 12, lg([[0, '#000', 0.12], [1, '#000', 0]]));
  s += rect(0, 360, 400, 4, lt(c, 0.4)) + rect(0, 364, 400, 18, lg([c, dn(c, 0.1)])) + rect(0, 360, 400, 1.2, dk(c), op(0.6)) + rect(0, 371, 400, 1, dn(c, 0.12));
  s += rect(0, 381, 400, 16, lg([[0, '#000', 0.24], [1, '#000', 0]]));
  return s;
}

function lvWindow(st?: number): string {
  const { x, y, w, h } = LV_WIN;
  if (st === undefined) {
    let s = windowUnit(x, y, w, h, '#8f8170', true);
    s += ln(26, 124, 154, 116, '#5d5248', 3) + circ(26, 124, 3.5, '#5d5248');
    s += pth('M30 124 L60 122 C58 160 62 196 56 222 L52 238 L47 226 L43 246 L37 230 L32 242 Z', lg(['#a39b8b', '#857d6e']), ol('#9a9283', 1.2));
    s += pl([40, 128, 42, 200], '#6f685c', 0.8, op(0.6)) + pl([50, 126, 51, 210], '#6f685c', 0.8, op(0.6));
    return s;
  }
  const c = ['#9b2f3f', '#2d4a7a', '#e8b33c'][st];
  let s = windowUnit(x, y, w, h, '#fbf7f0', false);
  if (st === 0) {
    const drape = pth('M24 120 H64 C60 162 52 206 50 230 C52 264 64 304 70 338 H20 C22 302 28 264 32 230 C28 200 25 160 24 120 Z', folds(c, 3), ol(c, 1.2));
    const tie = ell(41, 230, 13, 4.5, '#e2b84a', ol('#e2b84a', 1)) + pth('M41 233 L37 252 L45 252 Z', '#d9a73a', ol('#d9a73a', 0.8));
    s += g(drape + tie) + g(drape + tie, mirror(90));
    s += rect(14, 115, 152, 4, lg(['#f2d27a', '#b98d2e']), ol('#c9a24b', 0.8)) + circ(14, 117, 4.5, '#e2b84a', ol('#e2b84a', 1)) + circ(166, 117, 4.5, '#e2b84a', ol('#e2b84a', 1));
    s += pth('M18 118 H162 V134 Q142 162 112 146 Q90 136 68 146 Q38 162 18 134 Z', lg([lt(c, 0.12), dn(c, 0.25)]), ol(c, 1.2));
    s += pth('M30 140 Q50 150 68 144 M112 144 Q130 150 150 140', 'none', `stroke="${lt(c, 0.25)}" stroke-width="1.2" opacity="0.7"`);
    s += pth('M90 140 L86 156 L94 156 Z', '#e2b84a', ol('#e2b84a', 0.8)) + circ(90, 140, 2.5, '#e2b84a');
  } else if (st === 1) {
    const dots = patt(10, 12, circ(3, 3, 1, '#ffffff', op(0.35)) + circ(8, 9, 1, '#ffffff', op(0.35)));
    const panel = 'M22 121 H62 V336 Q57 340 52 336 Q47 340 42 336 Q37 340 32 336 Q27 340 22 336 Z';
    const pan = pth(panel, folds(c, 4), ol(c, 1.2)) + pth(panel, dots);
    s += g(pan) + g(pan, mirror(90));
    s += rect(12, 116, 156, 3.5, '#2b2b2b') + circ(12, 117.5, 4.5, '#2b2b2b') + circ(168, 117.5, 4.5, '#2b2b2b');
    for (const rx of [25, 34, 43, 52, 61, 119, 128, 137, 146, 155]) s += circ(rx, 119, 2.4, 'none', `stroke="#3a3a3a" stroke-width="1"`);
  } else {
    const dots = patt(9, 9, circ(2, 2, 1.1, '#ffffff', op(0.75)) + circ(6.5, 6.5, 1.1, '#ffffff', op(0.75)));
    let hem = 'M38 206 H142 V278';
    for (let i = 8; i > 0; i--) { const x1 = 38 + (104 * (i - 1)) / 8; hem += ` Q${r1(x1 + 6.5)} 290 ${r1(x1)} 278`; }
    hem += ' Z';
    s += pth(hem, folds(c, 6), ol(c, 1.2)) + pth(hem, dots);
    s += rect(34, 203, 112, 3, '#ffffff', ol('#ffffff', 0.8));
    let val = 'M32 118 H148 V136';
    for (let i = 10; i > 0; i--) { const x1 = 32 + (116 * (i - 1)) / 10; val += ` Q${r1(x1 + 5.8)} 146 ${r1(x1)} 136`; }
    val += ' Z';
    s += pth(val, lg([lt(c, 0.1), dn(c, 0.12)]), ol(c, 1.2)) + pth(val, dots);
    s += rect(28, 115, 124, 4, '#ffffff', ol('#ffffff', 0.8));
  }
  return s;
}

function lvPainting(st?: number): string {
  if (st === undefined) {
    let s = rect(186, 148, 78, 72, '#ddd3c0', op(0.45));
    s += circ(225, 136, 2.2, '#4d4136');
    let f = ln(225, 136, 200, 152, '#6b5a45', 1) + pl([250, 152, 254, 162, 251, 172], '#6b5a45', 1);
    f += rect(194, 150, 64, 52, '#6f604f', ol('#7d6d5a', 1.5)) + rect(200, 156, 52, 40, '#a49b8b');
    f += poly([214, 166, 236, 160, 240, 182, 222, 190, 210, 180], '#3f362d') + poly([236, 160, 246, 172, 240, 182], '#c3baa9', ol('#c3baa9', 0.8));
    f += poly([250, 196, 258, 202, 258, 184], '#3a3029');
    f += cobweb(194, 150, 16, 1);
    s += g(f, rot(-14, 225, 136));
    return s;
  }
  if (st === 0) {
    let s = rect(182, 151, 94, 76, '#000', op(0.16));
    s += ln(190, 148, 225, 132, '#6b5a45', 1) + ln(260, 148, 225, 132, '#6b5a45', 1) + circ(225, 132, 2.2, '#6b5a45');
    s += rect(178, 146, 94, 76, lg(['#f7de8f', '#c8952f', '#f2d277', '#a8771e'], 0, 0, 1, 1), ol('#c8952f', 1.4));
    s += rect(184, 152, 82, 64, lg(['#b9862a', '#f3d684'], 0, 0, 1, 1));
    const x = 187, y = 155, w = 76, h = 58;
    let v = rect(x, y, w, h, lg(['#8fcbf0', '#fde9c4']));
    v += glow(244, 170, 18, '#fff3c0', 0.8) + circ(244, 170, 6.5, '#ffe08a');
    v += cloud(206, 167, 0.3, '#ffffff');
    v += pth(`M${x} 192 Q205 176 226 186 T263 178 V213 H${x} Z`, '#9fd08a');
    v += ell(212, 203, 20, 3.6, '#86c3e6');
    v += pth(`M${x} 206 Q214 192 240 200 T263 196 V213 H${x} Z`, '#5ea35a');
    v += rect(237, 188, 10, 8, '#f4e7d0') + poly([235, 189, 242, 182.5, 249, 189], '#c8544a') + rect(240.5, 191, 3, 5, '#8a5a3a');
    v += rect(197.5, 195, 2, 7, '#6b4a2a') + circ(198.5, 193, 5, '#3f8a4a') + circ(256, 196, 4, '#4a944e');
    s += g(v, clip(rect(x, y, w, h, '#fff')));
    s += rect(x, y, w, 2, '#000', op(0.15));
    return s;
  }
  if (st === 1) {
    let s = rect(196, 139, 66, 98, '#000', op(0.16));
    s += ln(198, 138, 225, 124, '#6b5a45', 1) + ln(252, 138, 225, 124, '#6b5a45', 1) + circ(225, 124, 2.2, '#6b5a45');
    s += rect(192, 134, 66, 98, lg(['#8a5631', '#5e361c'], 0, 0, 1, 1), ol('#6b3e1f', 1.4));
    const x = 199, y = 141, w = 52, h = 84;
    let v = rect(x, y, w, h, lg(['#6fb2b6', '#3f7884']));
    v += rect(x, 212, w, 13, '#b08257');
    v += pth('M225 197 Q214 182 210 166 M225 197 Q232 176 238 160 M225 197 Q226 188 226 182 M222 197 Q210 190 204 188', 'none', sk('#4f7d3a', 1.6));
    v += ell(215, 186, 6, 2.4, '#5b8f45', rot(-30, 215, 186)) + ell(234, 180, 6, 2.4, '#5b8f45', rot(30, 234, 180));
    const sun = (cx: number, cy: number, r: number): string => {
      let f = '';
      for (let a = 0; a < 360; a += 26) f += ell(cx, cy - r * 0.78, r * 0.26, r * 0.55, a % 52 ? '#f2c335' : '#f7d65c', `${rot(a, cx, cy)} stroke="#c9961c" stroke-width="0.4"`);
      return f + circ(cx, cy, r * 0.46, '#6b3e1f') + circ(cx - r * 0.12, cy - r * 0.12, r * 0.2, '#8a5a2e');
    };
    v += sun(210, 165, 12) + sun(238, 158, 13) + sun(226, 181, 10) + sun(204, 188, 8);
    v += pth('M216 196 Q212 206 216 214 H234 Q238 206 234 196 Z', lg(['#f4f1ea', '#cfd8e2'], 0, 0, 1, 0), ol('#cfd8e2', 0.8)) + rect(217, 203, 16, 2, '#4f7fbf');
    s += g(v, clip(rect(x, y, w, h, '#fff')));
    return s;
  }
  let s = ell(228, 189, 40, 49, '#000', op(0.16));
  s += ln(200, 145, 225, 126, '#6b5a45', 1) + ln(250, 145, 225, 126, '#6b5a45', 1) + circ(225, 126, 2.2, '#6b5a45');
  s += ell(225, 184, 40, 49, lg(['#f0cf86', '#b07a3a', '#e8c27a'], 0, 0, 1, 1), ol('#b07a3a', 1.4));
  s += ell(225, 184, 34, 43, lg(['#a8722f', '#e9c98a'], 0, 0, 1, 1));
  let v = ell(225, 184, 31, 40, rg(['#86ad8a', '#4a6b50'], 0.5, 0.4, 0.6));
  const o = '#e59a6b';
  v += ell(225, 228, 30, 18, o, ol(o, 1));
  v += poly([216, 212, 225, 218, 234, 212, 234, 222, 225, 218, 216, 222], '#2d4a7a', ol('#2d4a7a', 0.8)) + circ(225, 218, 2.4, '#3f62a0');
  v += poly([207, 176, 209, 154, 222, 168], o, ol(o, 1)) + poly([243, 176, 241, 154, 228, 168], o, ol(o, 1));
  v += poly([210, 172, 211, 160, 218, 168], '#f2b4a8') + poly([240, 172, 239, 160, 232, 168], '#f2b4a8');
  v += ell(225, 186, 21, 18, o, ol(o, 1));
  v += pth('M219 170 L221 177 M225 169 L225 177 M231 170 L229 177', 'none', sk('#c46f3f', 1.6));
  v += ell(225, 194, 9, 6, '#fbe7d3');
  v += ell(217, 185, 3, 3.6, '#2f2420') + ell(233, 185, 3, 3.6, '#2f2420') + circ(218, 184, 1.1, '#fff') + circ(234, 184, 1.1, '#fff');
  v += pth('M223 191 H227 L225 193.5 Z', '#e0707f');
  v += ell(212, 193, 3, 1.8, '#f08f8f', op(0.5)) + ell(238, 193, 3, 1.8, '#f08f8f', op(0.5));
  s += g(v, clip(ell(225, 184, 31, 40, '#fff')));
  return s;
}

const BOOK_COLS = ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c', '#8e6bbf', '#e88fa8', '#3d6b8c', '#c8a165', '#2f8f83', '#f2d16b', '#b5523b'];

function decorPiece(cx: number, yb: number, kind: number): string {
  switch (kind % 4) {
    case 0:
      return pth(`M${cx - 5} ${yb - 9} H${cx + 5} L${cx + 4} ${yb} H${cx - 4} Z`, '#d97a50', ol('#d97a50', 0.8)) + ell(cx - 3, yb - 13, 3, 5, '#5aa05a', rot(-25, cx - 3, yb - 13)) + ell(cx + 3, yb - 14, 3, 5.5, '#4a904a', rot(25, cx + 3, yb - 14)) + ell(cx, yb - 16, 2.5, 5, '#6cb86c');
    case 1:
      return pth(`M${cx - 3} ${yb - 20} H${cx + 3} V${yb - 16} Q${cx + 7} ${yb - 10} ${cx + 5} ${yb} H${cx - 5} Q${cx - 7} ${yb - 10} ${cx - 3} ${yb - 16} Z`, lg(['#7fc8d6', '#3f8fa6'], 0, 0, 1, 0), ol('#4f9fb6', 0.8));
    case 2:
      return ln(cx, yb, cx, yb - 6, '#6b4a2a', 2) + rect(cx - 5, yb - 2, 10, 2, '#6b4a2a') + circ(cx, yb - 13, 7, '#6fb6e0', ol('#6fb6e0', 0.8)) + pth(`M${cx - 4} ${yb - 16} q3 -2 5 1 q-1 3 -4 2 Z M${cx + 1} ${yb - 10} q3 0 3 3 q-3 0 -3 -3 Z`, '#7cc36a');
    default:
      return rect(cx - 6, yb - 15, 12, 15, '#c8a165', ol('#c8a165', 0.8)) + rect(cx - 4, yb - 13, 8, 10, '#bfe3f2') + circ(cx, yb - 8, 2.4, '#f2b38a');
  }
}

function booksRow(x0: number, x1: number, yb: number, hmax: number, R: () => number, decor: number): string {
  let s = '';
  let x = x0;
  let did = false;
  while (x < x1 - 3) {
    const roll = R();
    const room = x1 - x;
    if (decor > 0 && !did && roll < 0.24 && room > 16) {
      s += decorPiece(x + 7, yb, decor + Math.floor(R() * 2));
      x += 15; did = true; continue;
    }
    if (roll > 0.84 && room > 15) {
      const w = Math.min(room - 1, 13 + R() * 4);
      let sy = yb;
      const n = 2 + Math.floor(R() * 3);
      for (let k = 0; k < n; k++) {
        const hh = 3.2 + R() * 1.6, c = pick(BOOK_COLS, R), ww = w - (k % 2) * 2;
        s += rect(x + (w - ww) / 2, sy - hh, ww, hh, c, ol(c, 0.5));
        sy -= hh;
      }
      x += w + 1; continue;
    }
    const bw = Math.min(room, 4 + R() * 4.5);
    const bh = hmax * (0.68 + R() * 0.3);
    const c = pick(BOOK_COLS, R);
    let b = rect(x, yb - bh, bw, bh, lg([lt(c, 0.15), c, dn(c, 0.15)], 0, 0, 1, 0), ol(c, 0.6));
    if (bw > 4.5) b += rect(x + 0.6, yb - bh + 3, bw - 1.2, 1.2, lt(c, 0.5)) + rect(x + 0.6, yb - 6, bw - 1.2, 1.2, lt(c, 0.5));
    s += roll > 0.76 && x > x0 + 8 ? g(b, rot(-12, x + bw, yb)) : b;
    x += bw + 0.4;
  }
  return s;
}

function lvBookshelf(st?: number): string {
  const x = 296, w = 70;
  let s = shadow(331, 398, 44, 6, 0.25) + rect(x + 4, 144, w, 252, '#000', op(0.1));
  if (st === undefined) {
    const c = '#8d8273';
    s += rect(x, 146, w, 250, lg([lt(c, 0.1), c], 0, 0, 1, 0), ol(c, 1.5));
    s += rect(x + 5, 150, w - 10, 236, '#5a5147');
    s += rect(x - 3, 140, w + 6, 8, c, ol(c, 1.2));
    s += rect(x + 5, 196, w - 10, 5, lt(c, 0.12), ol(c, 0.8));
    s += rect(304, 186, 22, 5, '#8a6f5a', ol('#8a6f5a', 0.6)) + rect(306, 181, 18, 5, '#6f7d8a', ol('#6f7d8a', 0.6));
    s += g(rect(338, 160, 6, 36, '#7a6a5a', ol('#7a6a5a', 0.6)), rot(-30, 344, 196));
    s += poly([x + 5, 248, x + 34, 254, x + 34, 259, x + 5, 253], lt(c, 0.12), ol(c, 0.8)) + poly([x + 40, 266, x + 65, 282, x + 65, 287, x + 40, 271], lt(c, 0.12), ol(c, 0.8));
    s += rect(x + 5, 300, w - 10, 5, lt(c, 0.12), ol(c, 0.8));
    s += rect(306, 294, 26, 6, '#8f6f62', ol('#8f6f62', 0.6)) + rect(336, 288, 6, 12, '#7f8a74', ol('#7f8a74', 0.6));
    s += rect(x + 5, 306, 30, 80, '#2f2a24');
    s += g(rect(x + 35, 306, 30, 80, c, ol(c, 1)) + rect(x + 40, 312, 20, 68, 'none', `stroke="${dk(c)}" stroke-width="0.8"`), rot(9, x + 65, 306));
    s += rect(x - 2, 388, w + 4, 10, dn(c, 0.2), ol(c, 1));
    s += rect(x + 5, 150, w - 10, 236, lg([[0, '#d8d0c2', 0.25], [1, '#d8d0c2', 0.05]]));
    s += cobweb(x + 5, 150, 22, 1) + cobweb(x + w - 5, 201, 16, -1);
    s += crack([x + 2, 210, x + 4, 230, x + 1, 246], 1);
    return s;
  }
  const R = rng(40 + st);
  if (st === 0) {
    const c = '#8a5a35';
    s += rect(x, 146, w, 244, lg([lt(c, 0.12), c, dn(c, 0.1)], 0, 0, 1, 0), ol(c, 1.5));
    s += rect(x + 5, 150, w - 10, 152, lg([dn(c, 0.45), dn(c, 0.3)]));
    s += booksRow(x + 6, x + w - 6, 196, 40, R, 1) + booksRow(x + 6, x + w - 6, 248, 40, R, 2) + booksRow(x + 6, x + w - 6, 300, 40, R, 0);
    for (const yy of [196, 248, 300]) s += rect(x + 5, yy, w - 10, 5, lg([lt(c, 0.25), c]), ol(c, 0.8));
    s += rr(x - 4, 136, w + 8, 10, 2, lg([lt(c, 0.2), c]), ol(c, 1.2)) + rect(x - 1, 146, w + 2, 3, dn(c, 0.2));
    s += rr(x + 6, 308, 28, 78, 2, lg([lt(c, 0.08), c]), ol(c, 1)) + rr(x + 36, 308, 28, 78, 2, lg([lt(c, 0.08), c]), ol(c, 1));
    s += rr(x + 10, 314, 20, 66, 2, 'none', `stroke="${dk(c)}" stroke-width="0.8" opacity="0.6"`) + rr(x + 40, 314, 20, 66, 2, 'none', `stroke="${dk(c)}" stroke-width="0.8" opacity="0.6"`);
    s += circ(x + 31, 346, 2, '#e2b84a') + circ(x + 39, 346, 2, '#e2b84a');
    s += rect(x - 2, 388, w + 4, 10, dn(c, 0.18), ol(c, 1));
    s += pl([x + 2, 160, x + 3, 220, x + 2, 300], lt(c, 0.2), 0.8, op(0.5));
    return s;
  }
  if (st === 1) {
    const c = '#f0ede6';
    s += ln(x + 7, 380, x + 5, 398, '#b98a5a', 3) + ln(x + w - 7, 380, x + w - 5, 398, '#b98a5a', 3);
    s += rr(x, 142, w, 240, 3, lg([lt(c, 0.3), c, dn(c, 0.06)], 0, 0, 1, 0), ol(c, 1.4));
    const rows: [number, number][] = [[148, 54], [206, 54], [264, 54], [322, 54]];
    for (const [yy, hh] of rows) s += rect(x + 5, yy, 28, hh, '#e2ddd2') + rect(x + 37, yy, 28, hh, '#e2ddd2');
    rows.forEach(([yy, hh], i) => {
      const yb = yy + hh;
      s += booksRow(x + 6, x + 32, yb, 40, R, i === 1 ? 3 : 0);
      s += i === 2 ? decorPiece(x + 57, yb, 0) + decorPiece(x + 44, yb, 1) : booksRow(x + 38, x + 64, yb, 40, R, i === 0 ? 2 : 0);
    });
    for (const yy of [202, 260, 318]) s += rect(x + 3, yy, w - 6, 4, lt(c, 0.4), ol(c, 0.6));
    s += rect(x + 33, 146, 4, 230, c, ol(c, 0.6));
    return s;
  }
  const c = '#8fa98a';
  s += pth(`M${x} 396 V172 Q${x} 134 ${x + 35} 134 Q${x + w} 134 ${x + w} 172 V396 Z`, lg([lt(c, 0.15), c, dn(c, 0.1)], 0, 0, 1, 0), ol(c, 1.5));
  s += pth(`M${x + 6} 346 V174 Q${x + 6} 141 ${x + 35} 141 Q${x + w - 6} 141 ${x + w - 6} 174 V346 Z`, lg([dn(c, 0.35), dn(c, 0.22)]));
  s += booksRow(x + 17, x + w - 17, 196, 28, R, 4) + booksRow(x + 7, x + w - 7, 246, 40, R, 1) + booksRow(x + 7, x + w - 7, 296, 40, R, 0) + booksRow(x + 7, x + w - 7, 344, 40, R, 2);
  for (const yy of [196, 246, 296, 344]) s += rect(x + 5, yy, w - 10, 5, lg([lt(c, 0.25), c]), ol(c, 0.8));
  s += rr(x + 6, 352, w - 12, 36, 3, lg([lt(c, 0.1), c]), ol(c, 1)) + rr(x + 28, 366, 14, 4, 2, '#e8d9b0', ol('#e8d9b0', 0.6));
  return s;
}

function lvRug(st?: number): string {
  if (st === undefined) {
    const q = [126, 458, 262, 452, 282, 514, 112, 520];
    let s = poly(q.map((v, i) => (i % 2 ? v + 4 : v + 2)), '#000', op(0.12));
    s += poly(q, lg(['#948573', '#7e705f']), ol('#8e8070', 1.2));
    for (const v of [0.2, 0.35, 0.65, 0.8]) s += poly(qpoly(q, [0, v, 1, v, 1, v + 0.06, 0, v + 0.06]), '#a8705a', op(0.35));
    s += ell(170, 488, 22, 8, '#5f5244', op(0.35)) + ell(236, 474, 9, 4, '#3a3029') + ell(150, 506, 6, 3, '#3a3029') + ell(214, 500, 14, 4, '#6e6152', op(0.4));
    for (let i = 0; i <= 12; i++) { const [a, b] = qp(q, i / 12, 1); s += ln(a, b, a - 1 + (i % 3), b + 5 + (i % 2) * 2, '#8e8070', 1); }
    return s;
  }
  if (st === 0) {
    const c = '#a33b3b';
    const q = fq(125, 275, 434, 530);
    let s = poly(q.map((v, i) => (i % 2 ? v + 5 : v)), '#000', op(0.14));
    for (let i = 0; i <= 24; i++) {
      const [a, b] = qp(q, i / 24, 1); s += ln(a, b, a, b + 6, '#f1e6cc', 1.1);
      const [e, f] = qp(q, i / 24, 0); s += ln(e, f, e, f - 4, '#f1e6cc', 1);
    }
    s += poly(q, c, ol(c, 1.2));
    const band = (u: number, col: string): string => poly(qpoly(q, [u, u * 2, 1 - u, u * 2, 1 - u, 1 - u * 2, u, 1 - u * 2]), col);
    s += band(0.035, '#2e3a5e') + band(0.07, '#e2b84a') + band(0.085, '#8e2f33');
    s += poly(qpoly(q, [0.09, 0.18, 0.91, 0.18, 0.91, 0.82, 0.09, 0.82]), rg([[0, '#bf4a4c'], [1, '#8a2c31']]));
    for (let i = 0; i < 20; i++) {
      const u = 0.06 + (0.88 * i) / 19;
      const [a, b] = qp(q, u, 0.105), [e, f] = qp(q, u, 0.895);
      s += circ(a, b, 1.1 * pk(b), '#e2b84a') + circ(e, f, 1.2 * pk(f), '#e2b84a');
    }
    const d = (u: number, v: number, col: string): string => poly(qpoly(q, [0.5, 0.5 - v, 0.5 + u, 0.5, 0.5, 0.5 + v, 0.5 - u, 0.5]), col);
    s += d(0.24, 0.3, '#2e3a5e') + d(0.2, 0.25, '#e2b84a') + d(0.17, 0.21, '#f1e6cc') + d(0.12, 0.15, '#2f7d78') + d(0.06, 0.075, '#e2b84a');
    const cen = qp(q, 0.5, 0.5);
    s += circ(cen[0], cen[1], 2.4, '#8e2f33');
    for (const [u, v] of [[0.09, 0.18], [0.91, 0.18], [0.91, 0.82], [0.09, 0.82]]) {
      const du = u < 0.5 ? 1 : -1, dv = v < 0.5 ? 1 : -1;
      s += poly(qpoly(q, [u, v, u + du * 0.12, v, u, v + dv * 0.2]), '#2e3a5e') + poly(qpoly(q, [u, v, u + du * 0.07, v, u, v + dv * 0.12]), '#e2b84a');
    }
    for (const [u, v] of [[0.27, 0.32], [0.73, 0.32], [0.27, 0.68], [0.73, 0.68], [0.17, 0.5], [0.83, 0.5]]) { const [a, b] = qp(q, u, v); s += ell(a, b, 3 * pk(b), 1.6 * pk(b), '#e2b84a', op(0.8)); }
    return s;
  }
  if (st === 1) {
    const c = '#4f7fbf';
    const cx = 200, cy = 484;
    let s = ell(cx, cy + 5, 128, 46, '#000', op(0.14));
    s += ell(cx, cy, 128, 46, lg([lt(c, 0.12), c]), ol(c, 1.2));
    const rings: [number, string][] = [[0.9, '#6f9bd3'], [0.8, '#f2f6fb'], [0.76, c], [0.62, '#3d6aa6'], [0.5, '#a9c6ec'], [0.4, '#f2f6fb'], [0.36, c], [0.22, '#2e5a92'], [0.1, '#f2d16b']];
    for (const [k, col] of rings) s += ell(cx, cy, 128 * k, 46 * k, col);
    for (const k of [0.95, 0.7, 0.56, 0.3]) s += ell(cx, cy, 128 * k, 46 * k, 'none', `stroke="#ffffff" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.6"`);
    return s;
  }
  const c = '#d8c08a';
  const q = fq(125, 275, 436, 530);
  let s = poly(q.map((v, i) => (i % 2 ? v + 5 : v)), '#000', op(0.14));
  for (let i = 0; i <= 8; i++) { const [a, b] = qp(q, i / 8, 1); s += ln(a, b, a - 2, b + 7, c, 2) + circ(a - 2, b + 8, 2, dn(c, 0.15)); }
  s += poly(q, '#f4ead2', ol(c, 1.4));
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0) s += poly(qpoly(q, [i / 6, j / 4, (i + 1) / 6, j / 4, (i + 1) / 6, (j + 1) / 4, i / 6, (j + 1) / 4]), c);
  s += poly(qpoly(q, [0.02, 0.04, 0.98, 0.04, 0.98, 0.96, 0.02, 0.96]), 'none', `stroke="#b89c62" stroke-width="1.2" stroke-dasharray="3 2"`);
  return s;
}

function lvSun(placed: Placed): string {
  const ok = placed.window !== undefined;
  return poly([84, 390, 176, 390, 268, 474, 148, 474], lg([[0, '#fff3c4', ok ? 0.34 : 0.08], [1, '#fff3c4', 0]]), NOPE);
}

function lvLamp(st?: number): string {
  if (st === undefined) {
    const c = '#8a8070';
    let s = shadow(138, 412, 18, 4);
    s += ell(138, 409, 13, 4, '#5d554b', ol('#5d554b', 1));
    s += pl([138, 408, 140, 330, 150, 300, 158, 262], '#6d655a', 3);
    s += g(poly([140, 240, 168, 240, 178, 278, 132, 278], lg(['#b5ab97', '#958a76']), ol(c, 1.2)) + poly([150, 278, 160, 262, 168, 278], '#4a4339') + poly([132, 278, 140, 264, 146, 278], '#d8d0c0', op(0.6)), rot(24, 158, 262));
    s += circ(160, 266, 4, '#d9d2c0', ol('#9a9384', 0.8));
    s += pl([138, 410, 120, 414, 104, 410], '#3f3a33', 1.2);
    s += cobweb(150, 300, 10, 1);
    return s;
  }
  if (st === 0) {
    const c = '#f4e2b8';
    let s = glow(142, 262, 80, '#fff1c1', 0.55);
    s += shadow(142, 412, 20, 4.5);
    s += poly([118, 274, 166, 274, 196, 410, 88, 410], lg([[0, '#fff1c1', 0.22], [1, '#fff1c1', 0]]), NOPE);
    s += pth('M130 410 Q142 398 154 410 Z', lg(['#a8763f', '#6e4a28']), ol('#8a5a35', 1)) + ell(142, 410, 12, 3, '#6e4a28');
    s += rect(140, 270, 4, 132, lg(['#c99a62', '#8a5a35'], 0, 0, 1, 0));
    s += pth('M128 228 H156 L168 272 H116 Z', lg([lt(c, 0.3), c, dn(c, 0.12)], 0, 0, 1, 0), ol(c, 1.2));
    s += rect(127.5, 226, 29, 3, '#d9bf86') + rect(115.5, 270, 53, 3, '#d9bf86');
    for (const x of [134, 142, 150]) s += ln(x, 230, x + (x - 142) * 0.9, 270, dn(c, 0.12), 0.7, op(0.6));
    s += ell(142, 273, 24, 3.5, '#fff6d8');
    s += circ(142, 224, 2.5, '#d9bf86');
    return s;
  }
  if (st === 1) {
    const c = '#c9a24b';
    let s = glow(142, 256, 70, '#fff0b8', 0.5);
    s += shadow(142, 412, 24, 5);
    s += poly([122, 264, 162, 264, 190, 410, 94, 410], lg([[0, '#fff0b8', 0.2], [1, '#fff0b8', 0]]), NOPE);
    s += ln(142, 322, 124, 410, dn(c, 0.15), 2.5) + ln(142, 322, 160, 410, dn(c, 0.15), 2.5) + ln(142, 322, 146, 404, dn(c, 0.3), 2);
    s += rect(140.5, 250, 3, 74, lg([lt(c, 0.3), c, dn(c, 0.2)], 0, 0, 1, 0));
    s += pth('M118 262 Q118 232 142 232 Q166 232 166 262 Z', lg([lt(c, 0.45), c, dn(c, 0.3)], 0, 0, 1, 0), ol(c, 1.2));
    s += ell(142, 262, 24, 4, dn(c, 0.15), ol(c, 1));
    s += ell(142, 263, 19, 2.8, '#fff4c8');
    s += circ(142, 229, 3, c, ol(c, 0.8));
    s += pth('M126 240 Q130 236 138 236', 'none', sk('#ffffff', 1.6) + op(0.6));
    return s;
  }
  const c = '#333333';
  let s = glow(206, 262, 70, '#fff2c8', 0.5);
  s += shadow(136, 412, 22, 5);
  s += poly([193, 254, 219, 254, 250, 330, 162, 330], lg([[0, '#fff2c8', 0.25], [1, '#fff2c8', 0]]), NOPE);
  s += pth('M136 404 C132 330 132 262 152 236 C166 218 196 214 206 236', 'none', sk(c, 3));
  s += rr(124, 402, 24, 9, 3, lg(['#4a4a4a', '#1e1e1e']), ol(c, 0.8));
  s += pth('M192 252 Q192 236 206 236 Q220 236 220 252 Z', lg(['#5a5a5a', '#1a1a1a'], 0, 0, 1, 0), ol(c, 1));
  s += ell(206, 252, 14, 3, '#fff4cc', ol(c, 0.8));
  s += pth('M197 241 Q200 239 204 239', 'none', sk('#ffffff', 1.2) + op(0.5));
  return s;
}

function lvSofa(st?: number): string {
  if (st === undefined) {
    let s = shadow(224, 410, 62, 7);
    const c = '#b08a5a';
    s += poly([258, 402, 300, 398, 306, 410, 262, 414], '#d9d4c7', ol('#d9d4c7', 0.8)) + pl([266, 404, 296, 401], '#9a9488', 0.8) + pl([268, 408, 298, 405], '#9a9488', 0.8);
    s += poly([190, 336, 258, 336, 264, 346, 184, 346], '#4e3a22');
    s += poly([190, 336, 222, 336, 216, 316, 194, 320], dn(c, 0.15), ol(c, 1));
    s += poly([184, 346, 190, 336, 166, 318, 160, 330], lg([lt(c, 0.1), dn(c, 0.1)]), ol(c, 1));
    s += poly([258, 336, 264, 346, 288, 334, 280, 320], lg([lt(c, 0.1), dn(c, 0.1)]), ol(c, 1));
    s += g(rr(206, 314, 8, 30, 3, '#e6e0d2', ol('#e6e0d2', 0.8)), rot(-18, 210, 340));
    s += pth('M238 342 q2 -14 10 -16 q6 0 4 8 q-4 2 -6 8 Z', '#c86b6b', ol('#c86b6b', 0.8));
    s += rect(184, 346, 80, 62, lg([lt(c, 0.08), c, dn(c, 0.12)], 0, 0, 1, 0), ol(c, 1.2));
    s += poly([184, 346, 264, 346, 260, 356, 240, 352, 226, 360, 208, 352, 190, 358], dn(c, 0.18));
    s += rect(220, 356, 9, 52, '#d8c79a', op(0.85));
    s += pl([244, 370, 250, 382, 242, 392, 252, 404], '#5e4529', 1.2);
    s += pth('M196 382 v-10 l-3 3 M196 372 l3 3 M204 382 v-10 l-3 3 M204 372 l3 3', 'none', sk('#6b4a2a', 1));
    s += cobweb(184, 346, 12, 1);
    return s;
  }
  const c = ['#2a8c8c', '#d9a52b', '#8e939b'][st];
  let s = shadow(228, 410, 86, 9, 0.28);
  if (st === 0) {
    for (const x of [168, 288]) s += ell(x, 404, 6, 5, '#4a2e1a');
    s += rr(170, 298, 116, 60, 16, lg([lt(c, 0.18), c, dn(c, 0.15)]), ol(c, 1.5));
    for (let r = 0; r < 2; r++) for (let i = 0; i < 7; i++) {
      const bx = 182 + i * 16 + (r % 2) * 8, by = 314 + r * 16;
      if (bx > 276) continue;
      s += circ(bx, by, 1.6, dn(c, 0.35)) + pl([bx - 6, by - 6, bx, by, bx + 6, by - 6], dn(c, 0.2), 0.8, op(0.6));
    }
    s += rr(162, 352, 132, 46, 6, lg([c, dn(c, 0.2)]), ol(c, 1.5));
    s += rr(172, 344, 56, 20, 6, lg([lt(c, 0.25), c]), ol(c, 1.2)) + rr(228, 344, 56, 20, 6, lg([lt(c, 0.25), c]), ol(c, 1.2));
    for (const ax of [154, 276]) {
      s += rr(ax, 330, 26, 70, 8, lg([lt(c, 0.1), dn(c, 0.12)], 0, 0, 1, 0), ol(c, 1.5));
      s += ell(ax + 13, 334, 15, 10, lg([lt(c, 0.3), c]), ol(c, 1.4));
      s += pth(`M${ax + 6} 334 q7 -6 14 0`, 'none', sk(dn(c, 0.3), 1) + op(0.6));
    }
    s += rect(162, 386, 132, 3, dn(c, 0.3), op(0.5));
    s += g(rr(178, 318, 30, 28, 8, lg(['#fbf0d6', '#e9d4a8']), ol('#e9d4a8', 1.2)) + circ(193, 332, 1.6, '#c9a46a'), rot(-12, 193, 332));
    s += g(rr(250, 318, 30, 28, 8, lg(['#f0c55a', '#d9a52b']), ol('#d9a52b', 1.2)) + pth('M255 332 h20 M265 322 v20', 'none', sk('#ffffff', 1) + op(0.5)), rot(12, 265, 332));
    return s;
  }
  if (st === 1) {
    for (const [x1, x2] of [[172, 166], [284, 290]]) s += ln(x1, 390, x2, 410, '#7a4a2a', 4);
    s += ln(188, 390, 186, 404, '#5e3a20', 3) + ln(268, 390, 270, 404, '#5e3a20', 3);
    s += rr(164, 306, 128, 58, 6, dn(c, 0.12), ol(c, 1.5));
    s += rr(170, 300, 57, 54, 9, lg([lt(c, 0.2), c]), ol(c, 1.3)) + rr(229, 300, 57, 54, 9, lg([lt(c, 0.2), c]), ol(c, 1.3));
    s += pth('M176 312 Q198 306 220 312 M235 312 Q257 306 279 312', 'none', sk(lt(c, 0.35), 1.2) + op(0.6));
    s += rr(160, 362, 136, 30, 5, lg([c, dn(c, 0.18)]), ol(c, 1.5));
    s += rr(172, 348, 56, 18, 5, lg([lt(c, 0.28), c]), ol(c, 1.2)) + rr(228, 348, 56, 18, 5, lg([lt(c, 0.28), c]), ol(c, 1.2));
    s += rr(156, 334, 18, 58, 5, lg([lt(c, 0.12), dn(c, 0.1)], 0, 0, 1, 0), ol(c, 1.4)) + rr(282, 334, 18, 58, 5, lg([lt(c, 0.12), dn(c, 0.1)], 0, 0, 1, 0), ol(c, 1.4));
    s += g(rr(180, 322, 28, 26, 5, '#2a8c8c', ol('#2a8c8c', 1.2)) + pth('M184 326 l20 18 M204 326 l-20 18', 'none', sk('#f3e3c3', 1.2)), rot(-10, 194, 335));
    s += g(rr(252, 324, 26, 24, 5, '#f7f1e3', ol('#e9dcc0', 1.2)) + circ(265, 336, 5, 'none', sk('#d9a52b', 1.4)), rot(10, 265, 336));
    return s;
  }
  s += rr(152, 342, 152, 62, 18, lg([c, dn(c, 0.2)]), ol(c, 1.5));
  s += rr(162, 302, 66, 56, 20, lg([lt(c, 0.22), c]), ol(c, 1.3)) + rr(228, 302, 66, 56, 20, lg([lt(c, 0.22), c]), ol(c, 1.3));
  s += rr(176, 346, 54, 26, 10, lg([lt(c, 0.3), c]), ol(c, 1.2)) + rr(226, 346, 54, 26, 10, lg([lt(c, 0.3), c]), ol(c, 1.2));
  s += rr(146, 326, 38, 78, 17, lg([lt(c, 0.18), dn(c, 0.08)], 0, 0, 1, 0), ol(c, 1.5)) + rr(272, 326, 38, 78, 17, lg([lt(c, 0.18), dn(c, 0.08)], 0, 0, 1, 0), ol(c, 1.5));
  const t = '#e9b8a6';
  s += pth('M262 318 Q284 312 300 322 L304 372 Q296 380 288 372 L284 336 Q272 334 262 338 Z', lg([lt(t, 0.2), t]), ol(t, 1.2));
  for (const x of [288, 294, 300]) s += pl([x, 326, x + 0.5, 368], dn(t, 0.15), 0.8, op(0.7));
  for (let i = 0; i < 4; i++) s += ln(289 + i * 4, 375, 289 + i * 4, 381, t, 1.2);
  s += g(rr(184, 320, 30, 28, 10, lg(['#f0c55a', '#d9a52b']), ol('#d9a52b', 1.2)), rot(-12, 199, 334));
  s += g(rr(212, 324, 26, 24, 9, '#fbf7ef', ol('#e3dccf', 1.2)) + pth('M216 336 h18', 'none', sk('#8e939b', 1)), rot(6, 225, 336));
  s += rect(160, 398, 136, 4, '#000', op(0.18));
  return s;
}

function lvTable(st?: number): string {
  if (st === undefined) {
    const c = '#8a7c6a';
    let s = shadow(200, 514, 64, 7);
    s += rect(240, 482, 7, 30, dn(c, 0.15), ol(c, 1)) + rect(226, 478, 6, 26, dn(c, 0.3));
    s += poly([140, 506, 248, 470, 262, 478, 152, 516], lg([lt(c, 0.12), c]), ol(c, 1.3));
    s += poly([152, 516, 262, 478, 262, 484, 153, 521], dn(c, 0.2), ol(c, 1));
    s += pl([170, 500, 230, 480], dn(c, 0.15), 0.8);
    s += g(rr(160, 522, 30, 6, 2, dn(c, 0.1), ol(c, 1)), rot(-8, 175, 525));
    s += poly([188, 521, 192, 515, 195, 522], lt(c, 0.3));
    s += ell(206, 488, 8, 2.5, '#6b5a45', op(0.4));
    s += g(rr(212, 470, 10, 8, 2, '#d9d2c4', ol('#d9d2c4', 0.8)), rot(-70, 217, 474));
    return s;
  }
  if (st === 0) {
    const c = '#9a6a3f';
    let s = shadow(200, 516, 74, 8, 0.26);
    s += rect(152, 486, 7, 24, dn(c, 0.3)) + rect(241, 486, 7, 24, dn(c, 0.3));
    s += poly([146, 500, 254, 500, 258, 506, 142, 506], dn(c, 0.15), ol(c, 1));
    s += rr(160, 494, 26, 6, 1, '#4f7fbf') + rr(164, 490, 22, 4, 1, '#f2d16b');
    s += poly([144, 464, 256, 464, 266, 478, 134, 478], lg([lt(c, 0.22), c]), ol(c, 1.3));
    for (const y of [468, 472.5, 476]) s += ln(140 + (478 - y) * 0.6, y, 260 - (478 - y) * 0.6, y, dn(c, 0.2), 0.6, op(0.5));
    s += rect(134, 478, 132, 10, lg([c, dn(c, 0.22)]), ol(c, 1.2));
    s += rect(138, 488, 10, 30, lg([c, dn(c, 0.2)], 0, 0, 1, 0), ol(c, 1)) + rect(252, 488, 10, 30, lg([c, dn(c, 0.2)], 0, 0, 1, 0), ol(c, 1));
    s += rr(164, 460, 11, 12, 2, '#f7f1e3', ol('#e9dcc0', 1)) + pth('M175 463 q5 0 5 4 q0 4 -5 4', 'none', sk('#e9dcc0', 1.5)) + ell(169.5, 460.5, 5.5, 1.5, '#7a4a2c');
    s += pth('M166 456 q-2 -4 1 -7 M171 456 q2 -4 -1 -7', 'none', sk('#ffffff', 1) + op(0.6));
    s += rr(214, 464, 30, 6, 1, '#2f8f83', ol('#2f8f83', 0.8)) + rr(217, 459, 26, 5, 1, '#d9534f', ol('#d9534f', 0.8));
    return s;
  }
  if (st === 1) {
    const c = '#9fd4e6';
    let s = shadow(200, 516, 68, 7, 0.18);
    s += pth('M150 476 L160 516 M250 476 L240 516 M156 476 L244 516 M244 476 L156 516', 'none', sk('#c3ccd4', 2.5));
    s += ell(200, 500, 44, 9, c, `${op(0.4)} ${ol(c, 1)}`);
    s += ell(200, 475, 68, 15, '#7fc0d6', op(0.7));
    s += ell(200, 471, 68, 15, c, `${op(0.6)} ${ol(c, 1.2)}`);
    s += pth('M150 466 Q170 460 196 459', 'none', sk('#ffffff', 2) + op(0.7));
    s += ln(218, 455, 214, 438, '#4f8f45', 1.2) + ln(218, 455, 223, 440, '#4f8f45', 1.2);
    s += pth('M210 438 q4 -8 8 0 q-4 4 -8 0 Z', '#f08aa8') + pth('M219 440 q4 -8 8 0 q-4 4 -8 0 Z', '#f6c23e');
    s += pth('M214 470 q-4 -8 0 -16 h8 q4 8 0 16 Z', lg(['#ffffff', '#cfe6ee'], 0, 0, 1, 0), ol('#cfe6ee', 0.8));
    s += rr(172, 464, 24, 5, 1, '#8e6bbf', ol('#8e6bbf', 0.8));
    return s;
  }
  const c = '#ececec';
  let s = shadow(200, 515, 52, 7, 0.24);
  const gold = lg(['#f3d98a', '#c9a24b', '#8f6e2a'], 0, 0, 1, 0);
  s += ell(200, 512, 26, 6, gold, ol('#c9a24b', 1));
  s += pth('M194 480 L190 510 H210 L206 480 Z', gold, ol('#c9a24b', 1));
  s += ell(200, 474, 54, 13, '#c9c9c9', ol(c, 1.2));
  s += ell(200, 470, 54, 13, rg(['#ffffff', '#e4e4e4'], 0.4, 0.3, 0.7), ol(c, 1.2));
  s += pth('M162 468 q14 -4 22 2 t20 0 M206 476 q10 -6 22 -4 M176 474 q6 -2 10 1', 'none', sk('#b9b9b9', 0.8) + op(0.8));
  s += circ(194, 462, 5, '#f39a2b', ol('#f39a2b', 0.8)) + circ(204, 461, 5, '#e2463a', ol('#e2463a', 0.8)) + circ(199, 457, 4.5, '#8bc34a', ol('#8bc34a', 0.8));
  s += ln(204, 456, 205, 452, '#6b4a2a', 1);
  s += pth('M184 464 q16 12 32 0 Z', lg(['#6f9bd3', '#3d6aa6']), ol('#4f7fbf', 1));
  return s;
}

function frond(f: number[], c: string, n = 9, len = 15): string {
  const [x0, y0, cx, cy, x1, y1] = f;
  let s = '';
  for (let i = 1; i <= n; i++) {
    const t = 0.12 + (0.86 * i) / n;
    const [x, y, tx, ty] = qb(x0, y0, cx, cy, x1, y1, t);
    const L = len * (1 - t * 0.5);
    for (const sd of [-1, 1]) s += ln(x, y, x - ty * sd * L * 0.85 + tx * L * 0.45, y + tx * sd * L * 0.85 + ty * L * 0.45, i % 2 ? c : lt(c, 0.15), 2.6);
  }
  return s + pth(`M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}`, 'none', sk(dn(c, 0.25), 1.6));
}

/** potted plant in the front-left corner (drawn 8px right of its design position) */
function lvPlant(st?: number): string {
  return g(lvPlantRaw(st), 'transform="translate(8 0)"');
}
function lvPlantRaw(st?: number): string {
  if (st === undefined) {
    let s = shadow(72, 524, 30, 5);
    const c = '#8d7f6c';
    s += pth('M68 484 Q60 450 46 452 Q38 456 42 470 M74 484 Q80 440 98 444 Q108 450 104 466 M71 484 Q72 450 66 430 Q62 422 56 428', 'none', sk('#7a6646', 2));
    s += ell(42, 472, 6, 3, '#8b6b3e', rot(60, 42, 472)) + ell(104, 468, 6, 3, '#8b6b3e', rot(-60, 104, 468)) + ell(56, 430, 5, 2.6, '#9a7a48', rot(30, 56, 430));
    s += pth('M50 486 H94 L88 522 H56 Z', lg([lt(c, 0.1), dn(c, 0.12)], 0, 0, 1, 0), ol(c, 1.3)) + rr(47, 480, 50, 8, 2, lt(c, 0.08), ol(c, 1.2));
    s += poly([84, 480, 92, 480, 90, 490], '#3a3029');
    s += crack([62, 488, 66, 500, 62, 510, 67, 520], 1);
    s += ell(110, 522, 6, 2.5, '#8b6b3e', rot(20, 110, 522)) + ell(36, 528, 5, 2, '#9a7a48', rot(-30, 36, 528));
    return s;
  }
  if (st === 0) {
    const c = '#3f8f4f';
    let s = shadow(72, 526, 36, 6, 0.25);
    const shape = 'M0 18 C-6 22 -21 14 -22 0 C-23 -14 -10 -25 0 -25 C10 -25 23 -14 22 0 C21 14 6 22 0 18 Z';
    const m = mask(pth(shape, '#fff') + pth('M-4 6 L-24 10 M-4 -2 L-25 -4 M-3 -10 L-20 -18 M4 4 L24 6 M4 -5 L25 -8 M3 -13 L19 -22', 'none', sk('#000', 2.6)) + ell(-9, 2, 2, 3, '#000') + ell(9, -6, 2, 3, '#000'));
    const fill = lg([lt(c, 0.3), c, dn(c, 0.2)], 0, 0, 1, 1);
    const leaf = (x: number, y: number, a: number, k: number): string => g(pth(shape, fill) + pth('M0 18 Q1 0 0 -24', 'none', sk(dn(c, 0.3), 1.2)), `transform="translate(${x} ${y}) rotate(${a}) scale(${k})" ${m}`);
    s += pth('M70 482 Q58 450 44 430 M72 482 Q74 440 70 410 M74 482 Q88 452 104 436 M71 482 Q64 466 50 462 M73 482 Q86 470 98 470', 'none', sk('#4f7d3a', 2));
    s += leaf(48, 458, -70, 0.8) + leaf(100, 466, 70, 0.75) + leaf(44, 424, -40, 1) + leaf(104, 430, 38, 1) + leaf(70, 400, 0, 1.1);
    s += pth('M52 482 H92 L87 524 H57 Z', lg(['#ffffff', '#e8e4dc', '#c9c3b8'], 0, 0, 1, 0), ol('#e8e4dc', 1.3)) + rr(49, 478, 46, 8, 3, '#f7f4ee', ol('#e8e4dc', 1.2));
    s += pth('M56 498 H88', 'none', sk('#c8b48a', 2));
    return s;
  }
  if (st === 1) {
    const c = '#6aa84f';
    let s = shadow(72, 526, 32, 6, 0.25);
    const body = lg([lt(c, 0.22), c, dn(c, 0.22)], 0, 0, 1, 0);
    s += rr(44, 424, 12, 34, 6, body, ol(c, 1.2)) + rr(48, 446, 18, 10, 5, body, ol(c, 1.2));
    s += rr(88, 410, 12, 32, 6, body, ol(c, 1.2)) + rr(78, 432, 18, 10, 5, body, ol(c, 1.2));
    s += rr(62, 398, 20, 88, 10, body, ol(c, 1.3));
    s += pth('M67 404 V482 M72 400 V484 M77 404 V482', 'none', sk(dn(c, 0.2), 0.8) + op(0.6));
    const R = rng(3);
    for (let i = 0; i < 26; i++) { const sx = 62 + R() * 20, sy = 404 + R() * 76; s += ln(sx, sy, sx + (R() - 0.5) * 4, sy - 2.5, '#fffbe8', 0.7); }
    for (let a = 0; a < 360; a += 60) s += ell(72, 394, 2.6, 5, '#f27aa0', rot(a, 72, 398));
    s += circ(72, 398, 2.4, '#f6d65c');
    s += circ(90, 474, 8, body, ol(c, 1.1)) + pth('M86 468 V480 M90 466 V482 M94 468 V480', 'none', sk(dn(c, 0.2), 0.7) + op(0.6));
    const t = '#c96f4a';
    s += pth('M50 484 H94 L88 524 H56 Z', lg([lt(t, 0.15), t, dn(t, 0.15)], 0, 0, 1, 0), ol(t, 1.3)) + rr(47, 478, 50, 9, 2, lt(t, 0.1), ol(t, 1.2));
    return s;
  }
  const c = '#2e7d5b';
  let s = shadow(72, 526, 38, 6, 0.25);
  const fr = [[72, 476, 34, 452, 18, 462], [72, 476, 110, 452, 126, 462], [72, 476, 42, 418, 26, 404], [72, 476, 102, 418, 120, 406], [72, 476, 58, 406, 52, 380], [72, 476, 90, 406, 96, 380], [72, 476, 72, 418, 74, 386]];
  for (const f of fr) s += frond(f, c);
  const b = '#c9a26b';
  const weave = patt(8, 6, rect(0, 0, 8, 6, b) + rect(0, 0, 4, 3, dn(b, 0.15)) + rect(4, 3, 4, 3, dn(b, 0.15)));
  s += pth('M50 480 H94 L90 524 H54 Z', weave, ol(b, 1.3)) + pth('M50 480 H94 L90 524 H54 Z', lg([[0, '#fff', 0.15], [0.5, '#fff', 0], [1, '#000', 0.15]], 0, 0, 1, 0)) + rr(47, 476, 50, 8, 3, lt(b, 0.1), ol(b, 1.2));
  return s;
}

function lvBeams(placed: Placed): string {
  const R = rng(9);
  if (placed.window === undefined) {
    let s = '';
    for (let i = 0; i < 26; i++) s += circ(60 + R() * 200, 150 + R() * 260, 0.8 + R() * 1.4, '#e8e0cf', op(0.3 + R() * 0.4));
    return g(s, NOPE);
  }
  let s = poly([52, 136, 128, 136, 268, 474, 148, 474], lg([[0, '#fffbe8', 0.18], [1, '#fffbe8', 0]]));
  s += poly([62, 136, 86, 136, 196, 474, 162, 474], lg([[0, '#fffbe8', 0.12], [1, '#fffbe8', 0]]));
  for (let i = 0; i < 12; i++) { const t = R(); const y = 160 + t * 260; s += sparkle(90 + t * 120 + (R() - 0.5) * 50, y, 1.2 + R() * 1.6, '#fffbe8', op(0.5 + R() * 0.4)); }
  return g(s, NOPE);
}

const LIVING: RoomArt = {
  items: { floor: lvFloor, wallpaper: lvWallpaper, window: lvWindow, sofa: lvSofa, rug: lvRug, table: lvTable, lamp: lvLamp, plant: lvPlant, painting: lvPainting, bookshelf: lvBookshelf },
  layers: ['wallpaper', 'floor', lvTrim, 'window', 'painting', 'bookshelf', 'rug', lvSun, 'lamp', 'sofa', 'table', 'plant', lvBeams, (_p, f) => moodLayer(f, '#3a3f55')],
};

/* =====================================================================
 * KITCHEN
 * ===================================================================== */
const KW = { x: 138, y: 146, w: 88, h: 98 };

function kWall(_p: Placed, frac: number): string {
  const c = mix('#d6c7aa', '#f6ead3', frac);
  return rect(0, 0, 400, 384, lg([lt(c, 0.08), dn(c, 0.06)]));
}

function kTrim(_p: Placed, frac: number): string {
  const c = mix('#c9bfae', '#fbf6ee', frac);
  let s = rect(0, 0, 400, 18, lg([lt(c, 0.3), c])) + rect(0, 18, 400, 4, dn(c, 0.14)) + rect(0, 22, 400, 12, lg([[0, '#000', 0.12], [1, '#000', 0]]));
  s += rect(0, 362, 400, 4, lt(c, 0.4)) + rect(0, 366, 400, 16, lg([c, dn(c, 0.1)])) + rect(0, 362, 400, 1.2, dk(c), op(0.6));
  s += rect(0, 381, 400, 16, lg([[0, '#000', 0.24], [1, '#000', 0]]));
  return s;
}

function kBacksplash(st?: number): string {
  const y0 = 200, y1 = 292;
  if (st === undefined) {
    let s = rect(0, 0, 400, 384, lg([[0, '#6b5a40', 0.16], [1, '#6b5a40', 0.06]]));
    s += ell(90, 80, 70, 40, rg([[0, '#7d6a4c', 0.05], [0.75, '#7d6a4c', 0.18], [0.9, '#6b583c', 0.3], [1, '#6b583c', 0]]));
    s += crack([240, 100, 248, 120, 242, 140, 252, 170]);
    s += crack([20, 150, 30, 170, 24, 190]);
    s += crack([118, 120, 126, 136, 120, 150]);
    const tile = patt(20, 20, rect(0, 0, 20, 20, '#cfc7b2') + rect(0, 0, 20, 1.2, '#8f8878') + rect(0, 0, 1.2, 20, '#8f8878') + rect(2, 2, 16, 2, '#fff', op(0.2)));
    s += rect(0, y0, 400, y1 - y0, tile);
    s += rect(0, y0, 400, y1 - y0, lg([[0, '#5a4a30', 0.12], [1, '#5a4a30', 0.3]]));
    for (const [x, y] of [[120, 220], [140, 220], [240, 260], [300, 200], [20, 240], [360, 260], [100, 260], [260, 220]]) s += rect(x + 0.6, y + 0.6, 19, 19, '#8a7c66') + rect(x + 0.6, y + 0.6, 19, 4, '#000', op(0.2));
    s += crack([160, 200, 170, 230, 164, 250, 178, 272]);
    s += crack([270, 230, 290, 240, 300, 270]);
    const R = rng(77);
    for (let i = 0; i < 30; i++) s += circ(290 + R() * 80, 205 + R() * 60, 0.8 + R() * 2.5, '#5a4426', op(0.25 + R() * 0.3));
    return s;
  }
  let p: string;
  if (st === 0) {
    const t = (x: number, y: number): string => rr(x + 0.8, y + 0.8, 22.4, 10.4, 2, '#fbfaf6') + rect(x + 3, y + 2.2, 16, 1.6, '#ffffff') + rect(x + 2, y + 8.6, 20, 1.2, '#e9e6dc');
    p = patt(24, 24, rect(0, 0, 24, 24, '#d3cfc3') + t(0, 0) + t(-12, 12) + t(12, 12));
  } else if (st === 1) {
    const sh = ['#5fb3b3', '#4fa3a6', '#6cc0bd', '#57abb0'];
    let b = rect(0, 0, 32, 32, '#e8f0ec');
    [[0, 0], [16, 0], [16, 16], [0, 16]].forEach(([x, y], i) => { b += rr(x + 0.8, y + 0.8, 14.4, 14.4, 2, sh[i]) + ell(x + 5, y + 5, 3.5, 2, '#ffffff', op(0.35)); });
    p = patt(32, 32, b);
  } else {
    p = patt(16, 16, rect(0, 0, 16, 16, '#fbf3d0') + rr(1, 1, 14, 14, 1.5, '#f1d36b') + rect(3, 3, 7, 1.6, '#ffffff', op(0.6)) + rect(3, 11, 10, 2, '#d9b84a', op(0.5)), 'rotate(45)');
  }
  let s = rect(0, 0, 400, y0, '#ffffff', op(0.06));
  s += rect(0, y0, 400, y1 - y0, p);
  s += rect(0, y0, 400, y1 - y0, lg([[0, '#fff', 0.1], [1, '#000', 0.08]]));
  s += rect(0, y0 - 5, 400, 5, lg(['#ffffff', '#e6e0d2']), ol('#e6e0d2', 0.6));
  return s;
}

function kTiles(st?: number): string {
  const rows: number[] = [];
  for (let j = 0; ; j++) { const y = depthY(24 * j); rows.push(Math.min(y, 690)); if (y > 650) break; }
  const R = rng(31 + (st ?? 9));
  const cell = (i: number, j: number): number[] => fq(200 + 24 * i, 224 + 24 * i, rows[j], rows[j + 1]);
  const cp = (q: number[], fill: string, ex = ''): string => { const c = clipPoly(q); return c.length >= 6 ? poly(c, fill, ex) : ''; };
  const inView = (q: number[]): boolean => Math.max(q[2], q[4]) > 0 && Math.min(q[0], q[6]) < 400;
  let s = '';
  if (st === undefined) {
    s += rect(0, 380, 400, 260, '#7d7466');
    for (let j = 0; j < rows.length - 1; j++) for (let i = -9; i < 9; i++) {
      const q = cell(i, j);
      const miss = R() < 0.08, col = pick(['#a59d8e', '#9a9283', '#aca494', '#958d7e'], R);
      if (!inView(q)) { R(); continue; }
      if (miss) {
        const [cx, cy] = qp(q, 0.5, 0.5);
        s += cp(q, '#5a5248', `stroke="#4a443c" stroke-width="0.8"`);
        if (onCanvas(cx - 6) && onCanvas(cx + 6) && cy < 636) s += circ(cx - 3, cy, 2 * pk(cy), '#8f8778') + circ(cx + 4, cy + 2, 1.4 * pk(cy), '#8f8778');
        continue;
      }
      s += cp(q, col, `stroke="#6f675a" stroke-width="0.9"`);
      if (R() < 0.25 && q[0] > 0 && q[2] < 400 && q[5] < 640) {
        const a = qp(q, 0.2 + R() * 0.6, 0), b = qp(q, 0.2 + R() * 0.6, 1);
        s += crack([a[0], a[1], (a[0] + b[0]) / 2 + 3, (a[1] + b[1]) / 2, b[0], b[1]], 0.9);
      }
    }
    s += rect(0, 380, 400, 260, lg([[0, '#4a3c2a', 0.2], [1, '#4a3c2a', 0.08]]));
    for (const [x, y, rx, ry] of [[120, 440, 50, 12], [280, 500, 60, 16], [210, 420, 40, 8], [80, 530, 50, 14]]) s += ell(x, y, rx, ry, '#5a4a32', op(0.25));
    s += ell(330, 430, 18, 5, '#7a8a90', op(0.5)) + ell(326, 428, 8, 2, '#ffffff', op(0.3));
    for (const [x, y] of [[60, 420], [250, 450], [356, 520]]) s += ell(x, y, 7, 3.5, '#bdb5a6', op(0.9)) + ell(x + 3, y - 1, 4, 2.4, '#d6cfc2');
    return s;
  }
  const grout = ['#b9b9b6', '#e6e2d6', '#e8cbb2'][st];
  s += rect(0, 380, 400, 260, grout);
  const gs = `stroke="${grout}" stroke-width="0.9"`;
  if (st === 0) {
    for (let j = 0; j < rows.length - 1; j++) for (let i = -9; i < 9; i++) s += cp(cell(i, j), (i + j) % 2 ? '#3f3f46' : '#f4f4f0', gs);
  } else if (st === 1) {
    for (let j = 0; j < rows.length - 1; j++) for (let i = -9; i < 9; i++) {
      const q = cell(i, j);
      if (!inView(q)) continue;
      s += cp(q, '#5b8bb5', gs);
      s += cp(qpoly(q, [0.5, 0.12, 0.88, 0.5, 0.5, 0.88, 0.12, 0.5]), '#f4f1e8');
      s += cp(qpoly(q, [0.5, 0.3, 0.7, 0.5, 0.5, 0.7, 0.3, 0.5]), '#3e6d97');
      for (const [u, v, du, dv] of [[0, 0, 1, 1], [1, 0, -1, 1], [1, 1, -1, -1], [0, 1, 1, -1]]) s += cp(qpoly(q, [u, v, u + du * 0.24, v, u, v + dv * 0.24]), '#f4f1e8');
      const [cx, cy] = qp(q, 0.5, 0.5);
      if (onCanvas(cx - 2) && onCanvas(cx + 2) && cy < 638) s += circ(cx, cy, 1.2 * pk(cy), '#f2d16b');
    }
  } else {
    const rows2: number[] = [];
    for (let j = 0; ; j++) { const y = depthY(12 * j); rows2.push(Math.min(y, 690)); if (y > 650) break; }
    const pal = ['#c66b47', '#bf6240', '#cc7752', '#b95d3c', '#c8704a'];
    for (let j = 0; j < rows2.length - 1; j++) {
      const off = j % 2 ? 12 : 0;
      for (let i = -10; i < 9; i++) {
        const q = fq(200 + 24 * i + off, 224 + 24 * i + off, rows2[j], rows2[j + 1]);
        const col = pick(pal, R);
        if (!inView(q)) continue;
        s += cp(q, col, gs) + cp(qpoly(q, [0.08, 0.15, 0.92, 0.15, 0.92, 0.35, 0.08, 0.35]), '#ffffff', op(0.08));
      }
    }
  }
  s += rect(0, 380, 400, 260, lg([[0, '#000', 0.12], [0.15, '#000', 0], [1, '#fff', 0.06]]));
  s += ell(186, 430, 64, 30, rg([[0, '#fff', 0.22], [1, '#fff', 0]]));
  return s;
}

function herbPot(x: number, y: number, pot: string): string {
  return ell(x, y - 13, 7, 6, '#5aa05a') + ell(x - 4, y - 10, 4, 3, '#4a904a') + ell(x + 4, y - 11, 4, 3, '#6cb86c') + circ(x - 2, y - 16, 1.6, '#ffffff') + circ(x + 3, y - 15, 1.3, '#ffffff') +
    pth(`M${x - 6} ${y - 8} H${x + 6} L${x + 5} ${y} H${x - 5} Z`, pot, ol(pot, 0.8));
}

function kWindow(st?: number): string {
  const { x, y, w, h } = KW;
  if (st === undefined) {
    let s = windowUnit(x, y, w, h, '#8f8170', true);
    s += g(rect(128, 134, 108, 14, lg(['#a39b8b', '#857d6e']), ol('#9a9283', 1)) + pth('M128 148 L134 160 L140 148 L148 162 L156 148 Z', '#8f877a'), rot(12, 128, 136));
    s += circ(128, 136, 2, '#4d4136');
    return s;
  }
  const c = ['#d24b4b', '#f0c64a', '#6fb56f'][st];
  let s = windowUnit(x, y, w, h, '#fbf7f0', false);
  if (st === 0) {
    const gin = patt(8, 8, rect(0, 0, 8, 8, '#ffffff') + rect(0, 0, 4, 8, c, op(0.55)) + rect(0, 0, 8, 4, c, op(0.55)));
    let hem = 'M132 200 H232 V240';
    for (let i = 6; i > 0; i--) { const x1 = 132 + (100 * (i - 1)) / 6; hem += ` Q${r1(x1 + 8.3)} 250 ${r1(x1)} 240`; }
    hem += ' Z';
    s += pth(hem, gin, ol(c, 1)) + pth(hem, folds('#888888', 5), op(0.22));
    s += rect(128, 198, 108, 3, '#ffffff', ol('#ffffff', 0.6));
    let val = 'M126 136 H238 V152';
    for (let i = 5; i > 0; i--) { const x1 = 126 + (112 * (i - 1)) / 5; val += ` Q${r1(x1 + 11.2)} 166 ${r1(x1)} 152`; }
    val += ' Z';
    s += pth(val, gin, ol(c, 1)) + pth(val, folds('#888888', 6), op(0.18)) + rect(122, 133, 120, 4, '#ffffff', ol('#ffffff', 0.6));
  } else if (st === 1) {
    const d = 'M130 138 H234 V176 Q217 198 199 180 Q182 198 165 180 Q148 198 130 176 Z';
    s += pth(d, lg([lt(c, 0.25), c, dn(c, 0.1)]), ol(c, 1.2));
    s += pth('M165 142 V178 M199 142 V178', 'none', sk(dn(c, 0.15), 1) + op(0.6));
    s += pth('M136 160 Q148 170 160 162 M170 162 Q182 172 194 162 M204 162 Q216 172 228 160', 'none', sk(dn(c, 0.12), 1) + op(0.5));
    s += pth('M130 176 Q148 198 165 180 Q182 198 199 180 Q217 198 234 176', 'none', sk('#ffffff', 2));
    s += rect(126, 134, 112, 5, '#ffffff', ol('#ffffff', 0.6));
  } else {
    const leafP = patt(12, 12, rect(0, 0, 12, 12, c) + ell(4, 4, 1.4, 2.6, lt(c, 0.5), rot(30, 4, 4)) + ell(10, 10, 1.4, 2.6, lt(c, 0.5), rot(-30, 10, 10)));
    const panel = 'M122 138 H150 C146 172 140 196 140 208 C142 230 150 248 154 262 H118 C120 240 126 224 130 208 C126 188 123 164 122 138 Z';
    const pp = pth(panel, leafP, ol(c, 1.2)) + pth(panel, folds('#777777', 3), op(0.25)) + ell(135, 208, 10, 3.5, '#f7f1e3', ol('#e3d6b8', 0.8));
    s += g(pp) + g(pp, mirror(182));
    s += rect(116, 132, 132, 16, leafP, ol(c, 1.2)) + rect(116, 146, 132, 2, dn(c, 0.2));
  }
  s += herbPot(158, 248, '#c96f4a') + herbPot(206, 248, '#e9e4da');
  return s;
}

function kJar(x: number, yb: number, w: number, h: number, fillc: string, lid: string): string {
  let s = rr(x, yb - h, w, h, 2.5, '#eef6f6', `${op(0.9)} ${ol('#b9c9c9', 0.8)}`);
  s += rr(x + 1.2, yb - h * 0.62, w - 2.4, h * 0.62 - 1.2, 1.5, fillc);
  s += rect(x - 0.5, yb - h - 3, w + 1, 4, lid, ol(lid, 0.6));
  s += rect(x + 1.5, yb - h * 0.5, w - 3, h * 0.22, '#ffffff', op(0.85));
  s += rect(x + 1.6, yb - h + 2, 1.4, h - 4, '#ffffff', op(0.6));
  return s;
}

function kShelf(st?: number): string {
  if (st === undefined) {
    const c = '#8a7d6b';
    let s = poly([352, 252, 362, 252, 362, 264], '#3a3a3a') + pl([270, 252, 276, 252, 274, 257], '#3a3a3a', 1.6);
    s += g(rr(262, 246, 104, 6, 1.5, c, ol(c, 1)) + kJar(330, 246, 12, 18, '#7a6a5a', '#6a5a4a') + cobweb(366, 252, 14, -1), rot(-8, 362, 249));
    s += g(kJar(0, 0, 12, 16, '#9a6a4a', '#6a5a4a'), `transform="translate(246 284) rotate(-90)"`);
    s += ell(232, 283, 12, 2.5, '#a8704a', op(0.8));
    return s;
  }
  if (st === 0) {
    const c = '#a5713f';
    let s = rect(266, 251, 104, 4, '#000', op(0.12));
    s += rr(262, 246, 104, 6, 1.5, lg([lt(c, 0.2), c]), ol(c, 1));
    s += poly([272, 252, 284, 252, 272, 264], '#3a3a3a') + poly([356, 252, 344, 252, 356, 264], '#3a3a3a');
    s += kJar(268, 246, 12, 22, '#c8452f', '#c9a06a') + kJar(283, 246, 13, 18, '#e8b92f', '#c9a06a') + kJar(299, 246, 12, 24, '#6a9a3a', '#c9a06a') + kJar(314, 246, 13, 20, '#8a5a35', '#c9a06a') + kJar(330, 246, 12, 16, '#e07b2f', '#c9a06a');
    s += herbPot(354, 246, '#c96f4a');
    return s;
  }
  if (st === 1) {
    const c = '#efefef';
    let s = rect(266, 252, 104, 4, '#000', op(0.12));
    s += rr(262, 244, 104, 8, 2, lg(['#ffffff', '#dcdcdc']), ol(c, 1));
    const can = (x: number, w: number, h: number): string => rr(x, 244 - h, w, h, 4, lg(['#ffffff', '#e6e6e6', '#cfcfcf'], 0, 0, 1, 0), ol(c, 1)) + ell(x + w / 2, 244 - h, w / 2 + 0.5, 3, '#c9a06a', ol('#c9a06a', 0.6)) + circ(x + w / 2, 241 - h, 1.6, '#a5713f') + rect(x + 3, 244 - h * 0.55, w - 6, 1.2, '#555555', op(0.7)) + rect(x + 5, 244 - h * 0.45, w - 10, 1, '#555555', op(0.5));
    s += can(268, 22, 30) + can(293, 18, 24) + can(314, 15, 18);
    s += pth('M336 244 h12 l-1 -9 h-10 Z', '#ffffff', ol(c, 0.8)) + rr(338.5, 222, 7, 13, 3.5, '#6aa84f', ol('#6aa84f', 0.8)) + circ(342, 221, 1.6, '#f27aa0');
    s += pth('M354 244 q-1 -10 6 -10 q7 0 6 10 Z', '#4f7fbf', ol('#4f7fbf', 0.8));
    return s;
  }
  const c = '#7fa87a';
  let s = rect(266, 214, 104, 42, '#000', op(0.08));
  s += pth('M262 216 Q272 206 282 214 Q292 206 302 214 Q314 204 326 214 Q336 206 346 214 Q356 206 366 216 Z', lg([lt(c, 0.2), c]), ol(c, 1));
  s += rr(262, 212, 5, 42, 1.5, c, ol(c, 0.8)) + rr(361, 212, 5, 42, 1.5, c, ol(c, 0.8));
  s += kJar(272, 226, 10, 13, '#e8b92f', '#efe2c2') + kJar(285, 226, 10, 15, '#c8452f', '#efe2c2') + kJar(298, 226, 10, 12, '#6a9a3a', '#efe2c2');
  s += pth('M326 226 q0 -12 12 -12 q12 0 12 12 Z', '#f7f1e3', ol('#e3d6b8', 0.8)) + pth('M350 220 q6 -2 6 -8', 'none', sk('#e3d6b8', 2)) + pth('M326 222 q-6 0 -6 -6', 'none', sk('#e3d6b8', 2)) + circ(338, 213, 2, '#7fa87a');
  s += rr(264, 226, 100, 4, 1, lt(c, 0.15), ol(c, 0.8));
  s += kJar(270, 246, 13, 16, '#8a5a35', '#efe2c2') + kJar(287, 246, 13, 18, '#e07b2f', '#efe2c2') + kJar(304, 246, 13, 14, '#f2d16b', '#efe2c2');
  s += herbPot(340, 246, '#e9e4da');
  s += rr(264, 246, 100, 6, 1, lt(c, 0.15), ol(c, 0.8));
  return s;
}

function cabDoor(x: number, y: number, w: number, h: number, st: number, c: string, hc: string, hx: number, hy: number): string {
  let s = rr(x, y, w, h, 2, lg([lt(c, 0.12), c]), ol(c, 1));
  if (st === 0) s += rr(x + 4, y + 4, w - 8, h - 8, 1.5, lt(c, 0.06), `stroke="${dk(c)}" stroke-width="1" stroke-opacity="0.5"`);
  if (st === 2) for (let k = x + 5; k < x + w - 3; k += 4.5) s += ln(k, y + 4, k, y + h - 4, dn(c, 0.12), 0.7, op(0.6));
  s += st === 2 ? circ(hx, hy, 2.6, hc, ol('#cfcfcf', 0.8)) : rr(hx - 1.3, hy - 7, 2.6, 14, 1.3, hc, ol(hc, 0.5));
  return s;
}
function cabDrawer(x: number, y: number, w: number, h: number, st: number, c: string, hc: string): string {
  let s = rr(x, y, w, h, 2, lg([lt(c, 0.12), c]), ol(c, 1));
  if (st === 0) s += rr(x + 3, y + 3, w - 6, h - 6, 1.5, lt(c, 0.06), `stroke="${dk(c)}" stroke-width="1" stroke-opacity="0.5"`);
  s += st === 2 ? circ(x + w / 2, y + h / 2, 2.6, hc, ol('#cfcfcf', 0.8)) : rr(x + w / 2 - 8, y + h / 2 - 1.3, 16, 2.6, 1.3, hc, ol(hc, 0.5));
  return s;
}

function kCabinets(st?: number): string {
  const x0 = 106, x1 = 290;
  if (st === undefined) {
    const c = '#9b917f';
    let s = rect(260, 118, 112, 84, '#000', op(0.1));
    s += rect(256, 114, 112, 84, lg([lt(c, 0.06), c]), ol(c, 1.3)) + rr(252, 108, 120, 8, 1.5, c, ol(c, 1.2));
    s += cabDoor(259, 118, 34, 76, 0, c, '#6b6052', 288, 186);
    s += rect(296, 118, 34, 76, '#3a3229') + cobweb(296, 118, 18, 1) + rr(304, 170, 10, 24, 2, '#8a5a3a') + rr(316, 176, 8, 18, 2, '#5f7a8a');
    s += g(cabDoor(333, 118, 32, 76, 0, c, '#6b6052', 338, 186), rot(14, 365, 118));
    s += rect(x0, 298, x1 - x0, 94, lg([lt(c, 0.06), dn(c, 0.06)]), ol(c, 1.3)) + rect(x0 + 2, 392, x1 - x0 - 4, 8, dn(c, 0.45));
    s += cabDrawer(110, 302, 36, 27, 0, c, '#6b6052') + cabDrawer(110, 362, 36, 27, 0, c, '#6b6052');
    s += g(cabDrawer(110, 332, 36, 27, 0, c, '#6b6052'), `transform="translate(-6 4) rotate(-4 128 345)"`);
    s += cabDoor(152, 302, 30, 86, 0, c, '#6b6052', 177, 316);
    s += rect(184, 302, 30, 86, '#2f2922') + g(cabDoor(184, 302, 30, 86, 0, c, '#6b6052', 189, 316), rot(18, 214, 302));
    s += cabDrawer(218, 302, 68, 20, 0, c, '#6b6052');
    s += rect(218, 325, 33, 63, '#2f2922') + rr(224, 362, 9, 24, 2, '#8a8070') + rr(236, 368, 10, 18, 2, '#7a5a3a');
    s += cabDoor(253, 325, 33, 63, 0, c, '#6b6052', 258, 334);
    for (const [px, py, rx, ry] of [[130, 310, 6, 4], [200, 350, 5, 8], [270, 360, 7, 5], [300, 150, 5, 7]]) s += ell(px, py, rx, ry, '#cbc2b0', op(0.9));
    const t = '#b3ab9b';
    s += poly([104, 284, 292, 284, 292, 292, 104, 292], t, ol(t, 1)) + rect(104, 292, 188, 6, dn(t, 0.15), ol(t, 0.8));
    s += poly([140, 292, 150, 292, 146, 297], '#6b6052') + poly([250, 292, 262, 292, 256, 296], '#6b6052');
    s += ell(182, 288, 26, 4, '#8f9690') + ell(182, 288.6, 23, 3, '#5a5f58');
    s += ell(176, 284, 12, 3, '#e6e0d2', ol('#bdb5a6', 0.8)) + ell(178, 281, 11, 2.8, '#ddd6c6', ol('#bdb5a6', 0.8)) + ell(177, 278, 10, 2.6, '#e6e0d2', ol('#bdb5a6', 0.8));
    s += rect(178, 280, 8, 5, '#8a7a6a') + pth('M182 282 V262 Q182 252 191 252 Q200 252 200 262 V266', 'none', sk('#8a7a6a', 3.5));
    s += pth('M200 270 q-2 3 0 5 q2 -2 0 -5 Z', '#7fc8f0');
    s += ell(140, 287, 14, 2.5, '#6b5a45', op(0.35)) + ell(240, 288, 18, 2.5, '#6b5a45', op(0.3));
    return s;
  }
  const c = ['#d6aa73', '#2f4868', '#a9d3c4'][st];
  const top = ['#f3efe6', '#f7f7f5', '#c99a62'][st];
  const hc = ['#4a3a2a', '#d4a64a', '#ffffff'][st];
  let s = rect(260, 118, 112, 84, '#000', op(0.12));
  s += rect(256, 114, 112, 84, lg([lt(c, 0.1), c]), ol(c, 1.3));
  s += rr(252, 108, 120, 8, 1.5, lg([lt(c, 0.25), c]), ol(c, 1.2));
  s += cabDoor(259, 118, 34, 76, st, c, hc, 288, 182) + cabDoor(296, 118, 34, 76, st, c, hc, 301, 182) + cabDoor(333, 118, 32, 76, st, c, hc, 338, 182);
  s += rect(256, 198, 112, 3, dn(c, 0.3)) + ell(312, 204, 52, 5, '#fff2c8', op(0.35));
  s += rect(x0, 298, x1 - x0, 94, lg([lt(c, 0.06), dn(c, 0.06)]), ol(c, 1.3));
  s += rect(x0 + 2, 392, x1 - x0 - 4, 8, dn(c, 0.45));
  for (let k = 0; k < 3; k++) s += cabDrawer(110, 302 + k * 30, 36, 27, st, c, hc);
  s += cabDoor(152, 302, 30, 86, st, c, hc, 177, 316) + cabDoor(184, 302, 30, 86, st, c, hc, 189, 316);
  s += cabDrawer(218, 302, 68, 20, st, c, hc) + cabDoor(218, 325, 33, 63, st, c, hc, 246, 336) + cabDoor(253, 325, 33, 63, st, c, hc, 258, 336);
  s += poly([104, 284, 292, 284, 292, 292, 104, 292], lg([lt(top, 0.3), top]), ol(top, 1));
  s += rect(104, 292, 188, 6, lg([top, dn(top, 0.12)]), ol(top, 0.8));
  if (st === 1) s += pth('M110 287 q20 -2 40 2 t40 -1 M220 289 q16 -3 30 0 t30 -2 M112 294 q30 2 60 -1', 'none', sk('#c9c9c9', 0.7) + op(0.8));
  if (st === 2) for (let k = 112; k < 292; k += 12) s += ln(k, 293, k, 297, dn(top, 0.2), 0.7, op(0.6));
  if (st === 0) { const R = rng(5); for (let i = 0; i < 30; i++) s += circ(106 + R() * 184, 285 + R() * 6, 0.5, '#b9b2a2'); }
  s += rect(x0, 298, x1 - x0, 4, '#000', op(0.18));
  s += ell(182, 288, 26, 4, '#aab4bc') + ell(182, 288.6, 23, 3, lg(['#6d7a84', '#9aa5ad']));
  s += rect(178, 280, 8, 5, '#b8c0c8') + pth('M182 282 V262 Q182 252 191 252 Q200 252 200 262 V266', 'none', sk('#aeb7c0', 3.5)) + pth('M182 282 V262 Q182 252 191 252 Q200 252 200 262 V266', 'none', sk('#eef2f5', 1.1)) + rect(168, 277, 7, 3, '#aeb7c0');
  return s;
}

function flame(x: number, y: number, k = 1): string {
  return pth(`M${r1(x)} ${r1(y)} q${-2.4 * k} ${-3 * k} 0 ${-7 * k} q${2.4 * k} ${4 * k} 0 ${7 * k} Z`, '#4f9dff') + pth(`M${r1(x)} ${r1(y)} q${-1.2 * k} ${-1.6 * k} 0 ${-3.6 * k} q${1.2 * k} ${2 * k} 0 ${3.6 * k} Z`, '#cfe9ff');
}

function kStove(st?: number): string {
  if (st === undefined) {
    const c = '#7d756a';
    let s = ell(330, 230, 46, 52, rg([[0, '#2a2018', 0.35], [1, '#2a2018', 0]]));
    s += shadow(329, 402, 46, 6);
    s += pth('M292 284 V264 L312 261 L320 266 L366 262 V284 Z', lg([lt(c, 0.1), c]), ol(c, 1.2));
    s += poly([290, 284, 368, 284, 370, 296, 288, 296], dn(c, 0.15), ol(c, 1));
    s += ell(309, 290, 13, 3.2, '#3a2a20') + ell(349, 290, 13, 3.2, '#3a2a20');
    s += rr(288, 296, 82, 100, 4, lg([lt(c, 0.08), c, dn(c, 0.2)], 0, 0, 1, 0), ol(c, 1.4));
    s += rect(290, 297, 78, 12, dn(c, 0.08));
    s += circ(300, 303, 3.5, '#4a4a4a') + circ(314, 303, 3.5, '#4a4a4a') + circ(344, 303, 2.5, '#1e1a16') + circ(358, 303, 3.5, '#4a4a4a');
    s += rect(296, 314, 66, 74, '#1e1a16');
    s += g(poly([294, 388, 364, 388, 376, 410, 282, 410], lg([c, dn(c, 0.25)]), ol(c, 1.2)) + rr(310, 394, 38, 8, 2, '#2a2420'), rot(5, 294, 388));
    for (const [px, py, rx, ry] of [[300, 330, 6, 9], [360, 360, 5, 7], [330, 300, 4, 2], [296, 270, 4, 3]]) s += ell(px, py, rx, ry, '#8a4a22', op(0.7));
    s += rr(296, 270, 28, 18, 3, '#2a2420', ol('#3a3029', 1)) + ell(310, 270, 14, 3, '#3a3029');
    s += pth('M306 264 q-6 -10 2 -18 q6 -8 -2 -16 M316 262 q6 -10 -2 -18', 'none', sk('#6a625a', 2) + op(0.5));
    return s;
  }
  const c = ['#c8423b', '#b8bec6', '#efe2c2'][st];
  const trim = ['#e6ebef', '#e9edf0', '#c9a24b'][st];
  let s = shadow(329, 401, 46, 6, 0.26);
  if (st === 0) {
    s += pth('M292 284 V266 Q292 254 304 254 H354 Q366 254 366 266 V284 Z', lg([lt(c, 0.15), c]), ol(c, 1.2));
    s += rect(292, 272, 74, 3, trim) + circ(329, 264, 7, '#fbf7ee', ol('#9aa5ad', 1.2)) + pth('M329 264 V259 M329 264 L332 266', 'none', sk('#333', 0.9));
  } else if (st === 1) {
    s += rect(290, 262, 78, 22, lg([lt(c, 0.3), c, dn(c, 0.12)], 0, 0, 1, 0), ol(c, 1.2));
    s += rr(316, 267, 26, 11, 2, '#1e2428') + pth('M321 270 v5 M324 270 h3 v2.5 h-3 v2.5 h3 M331 270 h3 v5 h-3 Z M337 270 v5', 'none', sk('#7fd4ff', 0.8));
  } else {
    s += pth('M292 284 V266 Q292 258 300 258 H358 Q366 258 366 266 V284 Z', lg([lt(c, 0.2), c]), ol(c, 1.2));
    s += rect(300, 270, 58, 2, trim) + circ(305, 264, 2.4, trim) + circ(353, 264, 2.4, trim);
  }
  s += poly([290, 284, 368, 284, 370, 296, 288, 296], st === 1 ? '#2a2f33' : lg([lt(c, 0.25), c]), ol(c, 1));
  for (const bx of [309, 349]) s += ell(bx, 290, 13, 3.2, '#2d2d2d') + ell(bx, 289.5, 9, 2.2, '#4a4a4a');
  s += rr(288, 296, 82, 100, 4, lg([lt(c, 0.15), c, dn(c, 0.12)], 0, 0, 1, 0), ol(c, 1.4));
  s += rect(290, 297, 78, 12, st === 1 ? '#2a2f33' : dn(c, 0.06));
  for (const kx of [300, 314, 344, 358]) s += circ(kx, 303, 3.6, st === 1 ? '#d9dee3' : trim, ol(trim, 0.8)) + ln(kx, 300.5, kx, 303, '#333', 1);
  if (st === 2) {
    for (const dx of [292, 330]) s += rr(dx, 314, 36, 74, 4, lt(c, 0.06), ol(c, 1)) + rr(dx + 6, 330, 24, 30, 3, lg(['#3a2a22', '#1a1410']), ol('#5a4a3a', 0.8)) + rr(dx + 6, 318, 24, 3, 1.5, trim);
    s += ell(310, 352, 8, 3, '#ff9a3c', op(0.3)) + ell(348, 352, 8, 3, '#ff9a3c', op(0.3));
  } else {
    s += rr(294, 314, 70, 74, 4, st === 1 ? lg(['#3a4046', '#1e2428']) : lt(c, 0.05), ol(c, 1));
    s += rr(304, 330, 50, 30, 3, lg(['#3a2a22', '#1a1410']), ol('#5a4a3a', 0.8)) + ell(329, 352, 18, 4, '#ff9a3c', op(0.35)) + rect(306, 332, 14, 2, '#ffffff', op(0.25));
    s += rr(300, 318, 58, 3.5, 1.7, '#e9edf0', ol('#9aa5ad', 0.6));
  }
  s += rect(292, 394, 6, 6, '#2a2a2a') + rect(360, 394, 6, 6, '#2a2a2a');
  if (st === 0) {
    for (let k = -3; k <= 3; k++) s += flame(309 + k * 3.6, 290, 0.9);
    s += rr(295, 266, 28, 20, 3, lg(['#e9edf0', '#aab4bc', '#7d8890'], 0, 0, 1, 0), ol('#9aa5ad', 1));
    s += ell(309, 266, 15, 3.4, '#cfd6dc', ol('#9aa5ad', 0.8)) + circ(309, 262.5, 2.2, '#333');
    s += rr(290, 270, 6, 3, 1.5, '#333') + rr(322, 270, 6, 3, 1.5, '#333');
    s += pth('M303 258 q-5 -8 2 -14 q6 -6 0 -12 M313 258 q5 -8 -2 -14 q-6 -6 0 -12', 'none', sk('#ffffff', 1.6) + op(0.5));
  } else if (st === 1) {
    for (let k = -3; k <= 3; k++) s += flame(349 + k * 3.6, 290, 0.9);
    s += pth('M336 286 Q334 266 349 264 Q364 266 362 286 Z', lg(['#ffffff', '#c9d1d8', '#8f9aa3'], 0, 0, 1, 0), ol('#8f9aa3', 1));
    s += pth('M337 276 L327 268 L330 266 L338 272', '#b8c0c8', ol('#8f9aa3', 0.8)) + pth('M342 266 Q349 254 356 266', 'none', sk('#2e2e2e', 2.4)) + circ(349, 263, 2, '#2e2e2e');
  } else {
    for (let k = -3; k <= 3; k++) s += flame(349 + k * 3.6, 290, 0.8);
    s += rr(360, 283, 15, 3.5, 1.7, '#2e2e2e') + ell(349, 285, 16, 4.6, '#2d2d2d') + ell(349, 284, 13, 3.4, '#4a4a4a');
    s += ell(347, 284, 7, 2.4, '#ffffff') + ell(348, 283.6, 2.6, 1.5, '#ffc93c');
  }
  return s;
}

function kFridge(st?: number): string {
  const x = 34, w = 72, top = 138, bot = 398;
  let s = shadow(70, 400, 44, 6, 0.28) + rect(x + 5, top + 4, w, bot - top - 4, '#000', op(0.12));
  if (st === undefined) {
    const c = '#cfc6a3';
    s += rr(x, top, w, bot - top, 10, lg([lt(c, 0.1), c, dn(c, 0.18)], 0, 0, 1, 0), ol(c, 1.4));
    s += rect(x, 212, w, 3, dn(c, 0.3));
    s += rect(x + w - 8, 218, 9, 172, '#2a2622');
    s += g(rr(x + 1, 216, w - 6, 174, 6, lg([lt(c, 0.05), dn(c, 0.12)], 0, 0, 1, 0), ol(c, 1.2)), rot(-2.5, x + 1, 216));
    s += rr(x + w - 13, 168, 5, 34, 2.5, '#8a7a6a');
    s += circ(x + w - 14, 236, 1.5, '#555') + circ(x + w - 14, 280, 1.5, '#555') + pth(`M${x + w - 14} 280 l-4 16`, 'none', sk('#8a7a6a', 3));
    for (const [px, py, rx, ry] of [[48, 372, 9, 5], [96, 300, 4, 10], [60, 160, 8, 4], [80, 330, 6, 4]]) s += ell(px, py, rx, ry, '#9a5b2f', op(0.55));
    s += pth('M50 250 q8 6 4 16 M86 190 q-6 4 -2 10', 'none', sk(dn(c, 0.35), 1.2) + op(0.7));
    s += g(rect(48, 238, 18, 16, '#e8dca0', ol('#c9bd84', 0.6)), rot(-14, 57, 246));
    for (const [fx0, fy0] of [[60, 120], [72, 112], [52, 108]]) s += circ(fx0, fy0, 1.4, '#2a2a2a') + ell(fx0 - 1.5, fy0 - 2, 1.4, 0.8, '#ffffff', op(0.7)) + ell(fx0 + 1.5, fy0 - 2, 1.4, 0.8, '#ffffff', op(0.7));
    return s;
  }
  const c = ['#a8dcc8', '#f5f5f5', '#f2a7b5'][st];
  const chrome = lg(['#ffffff', '#c9d1d8', '#9aa5ad'], 0, 0, 1, 0);
  if (st === 0) {
    s += pth(`M${x} ${bot} V${top + 22} Q${x} ${top} ${x + 22} ${top} H${x + w - 22} Q${x + w} ${top} ${x + w} ${top + 22} V${bot} Z`, lg([lt(c, 0.25), c, dn(c, 0.12)], 0, 0, 1, 0), ol(c, 1.4));
    s += rect(x, 210, w, 3, dn(c, 0.25)) + rr(x + w - 12, 168, 5, 34, 2.5, chrome) + rr(x + w - 12, 224, 5, 70, 2.5, chrome);
    s += rr(x + 20, 148, 30, 8, 4, '#f7f7f2', ol('#cfd8d4', 0.8));
    s += g(rect(44, 236, 20, 24, '#ffffff', ol('#dddddd', 0.6)) + circ(50, 242, 3, '#f6c23e') + poly([48, 256, 54, 248, 60, 256], '#e05a7a') + rect(52, 252, 4, 4, '#4f7fbf'), rot(-6, 54, 248)) + circ(54, 236, 2.2, '#d24b4b');
    s += pth('M80 262 q-4 -5 0 -7 q4 -2 4 3 q0 -5 4 -3 q4 2 0 7 l-4 4 Z', '#f27aa0') + circ(76, 300, 3, '#f6c23e') + circ(76, 300, 1.2, '#e07b2f');
    s += rect(x + 4, top + 12, 3, bot - top - 24, '#ffffff', op(0.4));
    s += rect(x + 6, bot - 2, 8, 4, '#555') + rect(x + w - 14, bot - 2, 8, 4, '#555');
  } else if (st === 1) {
    s += rr(x, top, w, bot - top, 4, lg([lt(c, 0.3), c, dn(c, 0.1)], 0, 0, 1, 0), ol('#d0d0d0', 1.4));
    s += rect(x + w / 2 - 0.6, top, 1.2, 178, '#c9c9c9') + rect(x, 316, w, 2.5, '#c9c9c9');
    s += rr(x + w / 2 - 7, 170, 3.5, 110, 1.7, chrome) + rr(x + w / 2 + 3.5, 170, 3.5, 110, 1.7, chrome) + rr(x + 14, 328, w - 28, 3.5, 1.7, chrome);
    s += rr(x + 8, 196, 18, 34, 3, lg(['#2a2f33', '#3e454a'])) + circ(x + 17, 203, 1.4, '#7fd4ff') + rect(x + 13, 214, 8, 8, '#1a1d20');
    s += g(rect(x + 44, 236, 16, 19, '#ffffff', ol('#dddddd', 0.6)) + rect(x + 46, 238, 12, 11, '#9fd4e6') + circ(x + 52, 245, 3, '#e59a6b'), rot(5, x + 52, 245));
    s += rect(x + 4, top + 10, 3, bot - top - 20, '#ffffff', op(0.6));
  } else {
    s += rr(x - 2, top - 4, w + 4, bot - top + 4, 20, lg([lt(c, 0.28), c, dn(c, 0.14)], 0, 0, 1, 0), ol(c, 1.4));
    s += rect(x - 2, 202, w + 4, 4, chrome);
    s += rr(x + w - 22, 170, 16, 8, 4, chrome, ol('#9aa5ad', 0.6)) + rr(x + w - 22, 224, 16, 10, 5, chrome, ol('#9aa5ad', 0.6)) + rect(x + w - 10, 216, 3, 28, '#c9d1d8');
    s += pth(`M${x + 16} 156 q4 -6 8 0 t8 0 t8 0`, 'none', sk('#ffffff', 2));
    s += pth('M54 268 q-4 -5 0 -7 q4 -2 4 3 q0 -5 4 -3 q4 2 0 7 l-4 4 Z', '#e05a7a') + circ(56, 300, 3.5, '#a8dcc8') + circ(56, 300, 1.4, '#ffffff');
    s += rect(x + 5, top + 16, 3, bot - top - 34, '#ffffff', op(0.4));
    s += ell(x + 10, bot + 1, 5, 2.5, '#c9d1d8') + ell(x + w - 10, bot + 1, 5, 2.5, '#c9d1d8');
  }
  return s;
}

function kChair(x: number, dir: number, c: string, kind: number): string {
  const bx = x - 17 * dir;
  const leg = kind === 1 ? '#c9a06a' : kind === 2 ? '#2e2e2e' : dn(c, 0.12);
  let s = ln(x + 15 * dir + 5, 484, x + 16 * dir + 5, 518, dn(leg, 0.35), 2.6) + ln(bx + 5, 484, bx + 6, 516, dn(leg, 0.35), 2.6);
  if (kind === 0) {
    s += ln(bx + 6 * dir * 0, 482, bx - 3 * dir, 420, dn(c, 0.1), 4) + ln(bx + 6, 478, bx + 4 - 3 * dir, 422, dn(c, 0.3), 3);
    for (const yy of [430, 444, 458]) s += ln(bx - 2 * dir, yy, bx + 5 - 2 * dir, yy + 1, c, 3);
    s += rr(Math.min(bx - 5 * dir, bx + 8 - 5 * dir) - 1, 416, 12, 6, 2, lt(c, 0.1), ol(c, 1));
  } else if (kind === 1) {
    s += pth(`M${bx} 482 Q${bx - 6 * dir} 452 ${bx - 4 * dir} 428 Q${bx - 2 * dir} 420 ${bx + 4 * dir} 424 Q${bx + 6 * dir} 452 ${bx + 8 * dir} 474 Z`, lg(['#ffffff', '#e2dfd6'], 0, 0, 1, 0), ol('#e2dfd6', 1.2));
  } else {
    s += pth(`M${bx} 482 V430 Q${bx} 416 ${bx + 8 * dir} 416 Q${bx + 16 * dir} 416 ${bx + 14 * dir} 432 Q${bx + 12 * dir} 446 ${bx + 2 * dir} 448`, 'none', sk(leg, 2.4)) + circ(bx + 7 * dir, 432, 5, 'none', sk(leg, 1.6));
  }
  s += ln(x + 15 * dir, 482, x + 16 * dir, 522, leg, 3) + ln(bx, 482, bx - 1 * dir, 522, leg, 3);
  const seat = kind === 2 ? '#7a4a2c' : kind === 1 ? '#ffffff' : c;
  s += poly([x - 20, 476, x + 20, 476, x + 22, 483, x - 22, 483], lg([lt(seat, 0.2), seat]), ol(seat, 1));
  s += rect(x - 22, 483, 44, 3.5, dn(seat, 0.18));
  if (kind === 1) s += rr(x - 18, 471, 36, 6, 3, '#e59a6b', ol('#e59a6b', 0.8));
  return s;
}

/** dining set, drawn 15% larger around its floor contact point */
function kDining(st?: number): string {
  return g(kDiningRaw(st), 'transform="translate(200 526) scale(1.15) translate(-200 -526)"');
}
function kDiningRaw(st?: number): string {
  if (st === undefined) {
    const c = '#9a8e7c';
    let s = shadow(200, 522, 84, 8);
    s += kChair(116, 1, c, 0);
    s += g(poly([140, 454, 260, 454, 268, 466, 132, 466], lg([lt(c, 0.1), c]), ol(c, 1.2)) + rect(132, 466, 136, 5, dn(c, 0.2), ol(c, 0.8)) + ell(170, 460, 10, 2.4, '#6b5a45', op(0.4)), rot(6, 200, 466));
    s += ln(138, 474, 142, 522, dn(c, 0.15), 3.5) + pl([258, 480, 268, 498, 256, 514], dn(c, 0.15), 3.5);
    s += g(kChair(0, 1, c, 0), `transform="translate(236 524) rotate(84) translate(0 -524)"`);
    s += poly([160, 528, 170, 524, 168, 532], '#f4f1ea', ol('#cfcabd', 0.6)) + poly([176, 532, 184, 528, 186, 535], '#f4f1ea', ol('#cfcabd', 0.6)) + poly([150, 534, 156, 531, 158, 537], '#f4f1ea', ol('#cfcabd', 0.6));
    return s;
  }
  if (st === 0) {
    const c = '#a87447';
    let s = shadow(200, 524, 94, 9, 0.26);
    s += kChair(114, 1, c, 0) + kChair(286, -1, c, 0);
    s += pth('M194 476 L192 512 H208 L206 476 Z', lg([c, dn(c, 0.3)], 0, 0, 1, 0), ol(c, 1));
    s += pth('M200 508 L170 522 M200 508 L230 522 M200 508 L200 526', 'none', sk(dn(c, 0.2), 5));
    s += ell(200, 468, 68, 16, dn(c, 0.22), ol(c, 1.2));
    s += ell(200, 463, 68, 16, lg([lt(c, 0.25), c]), ol(c, 1.2));
    s += ell(200, 463, 50, 11, 'none', sk(dn(c, 0.15), 0.7) + op(0.4)) + ell(200, 463, 30, 6.5, 'none', sk(dn(c, 0.15), 0.7) + op(0.4));
    s += ell(200, 462, 26, 6, '#f7f1e3', op(0.9));
    s += ln(200, 452, 194, 432, '#4f8f45', 1.2) + ln(200, 452, 206, 430, '#4f8f45', 1.2) + ln(200, 452, 200, 428, '#4f8f45', 1.2);
    for (const [fx0, fy0] of [[194, 432], [206, 430], [200, 427]]) { for (let a = 0; a < 360; a += 45) s += ell(fx0, fy0 - 3, 1.3, 3, '#ffffff', rot(a, fx0, fy0)); s += circ(fx0, fy0, 1.6, '#f6c23e'); }
    s += pth('M194 462 q-2 -6 2 -12 h8 q4 6 2 12 Z', lg(['#4f7fbf', '#2e5a92'], 0, 0, 1, 0), ol('#4f7fbf', 0.8));
    s += circ(176, 459, 4, '#e2463a', ol('#e2463a', 0.6)) + circ(224, 460, 4, '#f39a2b', ol('#f39a2b', 0.6));
    return s;
  }
  if (st === 1) {
    const c = '#f0eee8';
    let s = shadow(200, 524, 94, 9, 0.22);
    s += kChair(112, 1, c, 1) + kChair(288, -1, c, 1);
    s += rect(146, 470, 5, 44, dn(c, 0.2)) + rect(249, 470, 5, 44, dn(c, 0.2));
    s += poly([140, 450, 260, 450, 270, 464, 130, 464], lg([lt(c, 0.5), c]), ol('#d8d4ca', 1.2));
    s += rect(130, 464, 140, 6, lg([c, dn(c, 0.12)]), ol('#d8d4ca', 1));
    s += pth('M134 470 L138 524 H143 L144 470 Z M256 470 L257 524 H262 L266 470 Z', lg([c, dn(c, 0.1)], 0, 0, 1, 0), ol('#d8d4ca', 1));
    s += ell(166, 457, 17, 4, '#a9d3c4') + ell(234, 457, 17, 4, '#a9d3c4');
    s += ell(166, 456, 9, 2.4, '#ffffff', ol('#dddddd', 0.6)) + ell(234, 456, 9, 2.4, '#ffffff', ol('#dddddd', 0.6));
    s += circ(194, 450, 4, '#f6d65c', ol('#e8b92f', 0.6)) + circ(202, 449, 4, '#f6d65c', ol('#e8b92f', 0.6)) + circ(198, 446, 3.6, '#8bc34a', ol('#6aa84f', 0.6));
    s += pth('M186 452 q14 10 28 0 Z', '#ffffff', ol('#d8d4ca', 0.8));
    return s;
  }
  const c = '#3a3a3a';
  let s = shadow(200, 524, 86, 8, 0.24);
  s += kChair(122, 1, c, 2) + kChair(278, -1, c, 2);
  s += rect(197.5, 474, 5, 40, c);
  s += pth('M200 510 Q186 512 182 520 Q180 524 184 524 M200 510 Q214 512 218 520 Q220 524 216 524 M200 510 V524', 'none', sk(c, 2.6));
  s += ell(200, 467, 56, 13, '#2a2a2a', ol(c, 1));
  s += ell(200, 463, 56, 13, lg(['#6a6a6a', '#3e3e3e']), ol(c, 1.2));
  s += glow(200, 444, 30, '#ffd27a', 0.6);
  s += rr(192, 432, 16, 24, 2, '#fff6dc', `${op(0.5)} ${ol(c, 1.2)}`) + rect(192, 430, 16, 3, c) + pth('M196 432 L200 426 L204 432 Z', c);
  s += rect(197, 446, 6, 9, '#fbf3e0') + pth('M200 446 q-3 -4 0 -8 q3 4 0 8 Z', '#ffb547');
  s += pth('M218 460 q2 -8 12 -6 q8 2 6 8 Z', '#d9a26b', ol('#b5824a', 0.8)) + pth('M222 456 l3 2 M227 455 l3 2', 'none', sk('#b5824a', 0.8));
  return s;
}

function kLights(st?: number): string {
  const xs = K_LIGHT_X, ys = K_LIGHT_Y;
  if (st === undefined) {
    let s = pth('M200 0 V150', 'none', sk('#3a3a3a', 1.4)) + rect(196, 148, 8, 8, '#4a4a4a');
    s += ell(200, 163, 6, 8, '#d9d6c8', `${op(0.9)} ${ol('#9a9384', 0.8)}`) + pl([197, 160, 200, 164, 198, 168], '#6a6458', 0.7);
    s += pth('M140 0 V86 Q140 96 134 100 M140 86 Q142 96 148 98', 'none', sk('#3a3a3a', 1.4)) + circ(134, 100, 1.6, '#c27a46') + circ(148, 98, 1.6, '#c27a46');
    s += pth('M260 0 V70 Q257 80 263 86', 'none', sk('#3a3a3a', 1.4)) + circ(263, 86, 1.6, '#c27a46');
    s += pth('M140 40 Q170 52 200 44 M140 60 Q172 76 200 66 M150 44 L160 70 M175 50 L178 74 M190 46 L192 68', 'none', `stroke="#ffffff" stroke-width="0.6" opacity="0.6"`);
    return s;
  }
  const c = ['#c27a46', '#2e2e2e', '#d8b47a'][st];
  let s = '';
  xs.forEach((x, i) => {
    const y = ys[i];
    s += ln(x, 0, x, y + 2, '#2e2e2e', 1.4);
    if (st === 0) {
      s += rect(x - 3, y - 2, 6, 7, dn(c, 0.2));
      s += pth(`M${x - 18} ${y + 30} Q${x - 18} ${y + 4} ${x} ${y + 4} Q${x + 18} ${y + 4} ${x + 18} ${y + 30} Z`, lg([lt(c, 0.4), c, dn(c, 0.3)], 0, 0, 1, 0), ol(c, 1.2));
      s += ell(x, y + 30, 18, 3.5, dn(c, 0.35)) + ell(x, y + 31, 13, 2.4, '#fff3c4');
      s += pth(`M${x - 11} ${y + 15} Q${x - 8} ${y + 9} ${x - 3} ${y + 8}`, 'none', sk('#ffffff', 1.5) + op(0.6));
    } else if (st === 1) {
      s += glow(x, y + 34, 14, '#fff2c0', 0.9) + ell(x, y + 34, 6, 7.5, '#ffe9a8', ol('#e8c66a', 0.6));
      s += pth(`M${x - 4} ${y} H${x + 4} L${x + 16} ${y + 28} H${x - 16} Z`, lg(['#5a5a5a', '#1e1e1e'], 0, 0, 1, 0), ol(c, 1));
      s += ell(x, y + 28, 16, 3, '#111111') + ell(x, y + 28.5, 12, 2, '#ffe9a8', op(0.9));
      s += pth(`M${x - 2} ${y + 31} q2 4 0 7 q2 -3 4 0`, 'none', sk('#ff9a3c', 0.8));
    } else {
      const weave = patt(5, 5, rect(0, 0, 5, 5, c) + ln(0, 0, 5, 5, dn(c, 0.25), 0.7) + ln(5, 0, 0, 5, dn(c, 0.25), 0.7));
      const bell = `M${x - 6} ${y + 2} Q${x - 20} ${y + 12} ${x - 20} ${y + 34} H${x + 20} Q${x + 20} ${y + 12} ${x + 6} ${y + 2} Z`;
      s += pth(bell, weave, ol(c, 1.2)) + pth(bell, lg([[0, '#fff', 0.2], [0.5, '#fff', 0], [1, '#000', 0.2]], 0, 0, 1, 0));
      s += ell(x, y + 34, 20, 3.5, dn(c, 0.3)) + ell(x, y + 34.5, 15, 2.4, '#fff3c4');
    }
  });
  return s;
}

const K_LIGHT_X = [140, 200, 260], K_LIGHT_Y = [110, 122, 110];
/** warm light cones under the pendant lights (a base layer so the lights' item box stays tight) */
function kLightGlow(placed: Placed): string {
  if (placed.lights === undefined) return '';
  let s = '';
  K_LIGHT_X.forEach((x, i) => {
    const y = K_LIGHT_Y[i] + 32;
    s += poly([x - 14, y, x + 14, y, x + 64, 450, x - 64, 450], cached('kcone', () => lg([[0, '#ffe6a8', 0.16], [1, '#ffe6a8', 0]]))) + glow(x, y + 4, 48, '#ffe6a8', 0.55);
  });
  return g(s, NOPE);
}

function kSun(placed: Placed): string {
  const ok = placed.window !== undefined;
  return poly([150, 400, 238, 400, 300, 470, 190, 470], lg([[0, '#fff3c4', ok ? 0.3 : 0.06], [1, '#fff3c4', 0]]), NOPE);
}

const KITCHEN: RoomArt = {
  items: { tiles: kTiles, backsplash: kBacksplash, cabinets: kCabinets, stove: kStove, fridge: kFridge, dining: kDining, window: kWindow, lights: kLights, shelf: kShelf },
  layers: [kWall, 'backsplash', 'tiles', kTrim, 'window', 'shelf', 'cabinets', 'stove', 'fridge', kSun, 'dining', 'lights', kLightGlow, (_p, f) => moodLayer(f, '#3a3f55')],
};

/* =====================================================================
 * GARDEN
 * ===================================================================== */
const GH = 338;
/** garden ground perspective: x on screen at row y for a point at x0 on the horizon line */
const gx = (x0: number, y: number): number => 200 + ((x0 - 200) * (y - VPY)) / (GH - VPY);

function gSky(_p: Placed, frac: number): string {
  const top = mix('#9aa6b2', '#69bff2', frac), bot = mix('#d2d5d2', '#dcf2ff', frac);
  let s = rect(0, 0, 400, 360, lg([top, bot]));
  s += glow(322, 72, 90, '#fff6c8', 0.25 + 0.6 * frac) + circ(322, 72, 22, mix('#e3e1d4', '#fff3b0', frac));
  const cc = mix('#c3c8cc', '#ffffff', frac);
  s += cloud(80, 150, 1.1, cc) + cloud(250, 118, 0.8, cc) + cloud(362, 196, 0.6, cc) + cloud(150, 214, 0.5, cc);
  s += pth('M0 262 Q60 228 130 246 T260 240 T400 232 V340 H0 Z', mix('#a6ae98', '#a9dba0', frac));
  s += pth('M0 284 Q90 256 170 274 T330 266 T400 270 V340 H0 Z', mix('#949f86', '#88c680', frac));
  for (const [x, y, r] of [[40, 262, 8], [56, 266, 6], [300, 252, 9], [318, 258, 7], [180, 268, 6]]) s += circ(x, y, r, mix('#7f8a70', '#5fa35a', frac));
  return s;
}

function gHedge(_p: Placed, frac: number): string {
  const c = mix('#7b8458', '#3f8f45', frac), hl = mix('#939a6c', '#66b85c', frac);
  let s = rect(0, 298, 400, 46, dn(c, 0.1));
  for (let i = 0; i < 14; i++) s += circ(-10 + i * 32, 300 - (i % 2) * 6, 24 + (i % 3) * 4, c);
  for (let i = 0; i < 14; i++) s += circ(-16 + i * 32, 290 - (i % 2) * 6, 11 + (i % 3) * 2, hl, op(0.55));
  const R = rng(4);
  for (let i = 0; i < 90; i++) s += circ(R() * 400, 278 + R() * 58, 1.5 + R() * 2, dn(c, 0.22), op(0.35));
  s += rect(0, 326, 400, 18, lg([[0, '#000', 0], [1, '#000', 0.2]]));
  return s;
}

function tufts(R: () => number, n: number, c: string, w = 1.2, y0 = 344, y1 = 640): string {
  let d = '';
  for (let i = 0; i < n; i++) {
    const y = y0 + Math.pow(R(), 0.85) * (y1 - y0), x = R() * 400, k = 0.5 + (y - GH) / 150;
    d += `M${r1(x)} ${r1(y)} l${r1(-2 * k)} ${r1(-6 * k)} M${r1(x)} ${r1(y)} l${r1(0.4 * k)} ${r1(-8 * k)} M${r1(x)} ${r1(y)} l${r1(2.2 * k)} ${r1(-5.5 * k)} `;
  }
  return pth(d, 'none', sk(c, w));
}

function weed(x: number, y: number, k: number): string {
  let s = '';
  for (const a of [-60, -30, -8, 14, 40, 66]) s += ell(x, y - 6 * k, 1.8 * k, 7 * k, '#5f7a3a', `${rot(a, x, y)} ${ol('#5f7a3a', 0.6)}`);
  return s;
}
function dandelion(x: number, y: number, h: number): string {
  let s = ln(x, y, x + 2, y - h, '#7a8a4a', 1);
  for (let a = 0; a < 360; a += 30) { const r = (a * Math.PI) / 180; s += ln(x + 2, y - h, x + 2 + Math.cos(r) * 4, y - h + Math.sin(r) * 4, '#ffffff', 0.6, op(0.8)); }
  return s;
}

function gLawn(st?: number): string {
  const R = rng(50 + (st ?? 7));
  if (st === undefined) {
    let s = rect(0, 336, 400, 304, lg(['#bba27b', '#9e7f58']));
    for (const [x, y, rx, ry] of [[80, 380, 60, 8], [300, 420, 80, 12], [150, 500, 90, 16], [330, 560, 70, 18], [60, 600, 80, 20]]) s += ell(x, y, rx, ry, '#8a6c48', op(0.35));
    s += crack([20, 392, 50, 398, 66, 412, 104, 418, 120, 432]) + crack([66, 412, 70, 430]);
    s += crack([250, 380, 270, 392, 300, 390, 320, 404, 360, 408]) + crack([300, 390, 304, 376]);
    s += crack([220, 520, 250, 528, 262, 546, 300, 552, 330, 576], 1.4) + crack([262, 546, 258, 566]);
    s += crack([30, 530, 60, 540, 76, 560, 70, 590], 1.4);
    s += tufts(R, 70, '#c9b46a', 1.2) + tufts(R, 40, '#a8964e', 1.1);
    for (const [x, y, k] of [[44, 452, 1], [270, 466, 1.2], [356, 410, 0.9], [130, 560, 1.4], [240, 600, 1.5], [366, 530, 1.3]]) s += weed(x, y, k);
    s += dandelion(270, 466, 22) + dandelion(130, 560, 26) + dandelion(366, 530, 24);
    for (let i = 0; i < 18; i++) { const x = R() * 400, y = 360 + R() * 260, k = 0.6 + (y - GH) / 200; s += ell(x, y, 4 * k, 2.6 * k, pick(['#9a948a', '#8a847a', '#aaa49a'], R), ol('#8a847a', 0.6)) + ell(x - k, y - k, 1.6 * k, 0.8 * k, '#ffffff', op(0.4)); }
    for (let i = 0; i < 22; i++) { const x = R() * 400, y = 350 + R() * 280; s += ell(x, y, 3.5, 1.6, pick(['#8b5a2b', '#a0703f', '#7a4a2a'], R), rot(R() * 180, x, y)); }
    return s;
  }
  const c = ['#6cbf4f', '#3f9a45', '#9ccc65'][st];
  let s = rect(0, 336, 400, 304, lg([lt(c, 0.15), c, dn(c, 0.12)]));
  if (st === 0) for (let i = -10; i < 10; i += 2) { const q = clipPoly([gx(200 + i * 36, 336), 336, gx(236 + i * 36, 336), 336, gx(236 + i * 36, 640), 640, gx(200 + i * 36, 640), 640]); if (q.length >= 6) s += poly(q, '#ffffff', op(0.08)); }
  s += tufts(R, 150, dn(c, 0.18), 1.2) + tufts(R, 90, lt(c, 0.22), 1.1);
  if (st === 1) {
    for (let i = 0; i < 40; i++) {
      const x = R() * 400, y = 350 + R() * 280, k = 0.6 + (y - GH) / 160;
      for (const a of [0, 120, 240]) { const r = (a * Math.PI) / 180; s += circ(x + Math.cos(r) * 2 * k, y + Math.sin(r) * 1.4 * k, 1.8 * k, dn(c, 0.15)); }
    }
  }
  if (st === 2) {
    const fc = ['#ffffff', '#ffe066', '#ff9ec4', '#c3a6ff', '#ffffff', '#ffb3a1'];
    for (let i = 0; i < 90; i++) {
      const x = R() * 400, y = 346 + Math.pow(R(), 0.8) * 290, k = 0.5 + (y - GH) / 160, col = pick(fc, R);
      for (let a = 0; a < 360; a += 72) { const r = (a * Math.PI) / 180; s += circ(x + Math.cos(r) * 1.8 * k, y + Math.sin(r) * 1.3 * k, 1.3 * k, col); }
      s += circ(x, y, 0.9 * k, '#f2b43c');
    }
  }
  s += rect(0, 336, 400, 30, lg([[0, '#000', 0.12], [1, '#000', 0]]));
  return s;
}

function gFence(st?: number): string {
  const posts = [0, 67, 133, 200, 267, 333, 400];
  let s = rect(0, 344, 400, 10, lg([[0, '#000', 0.2], [1, '#000', 0]]));
  if (st === undefined) {
    const c = '#8f8778';
    const R = rng(12);
    s += rect(0, 300, 133, 5, c, ol(c, 0.8)) + g(rect(133, 300, 62, 5, c, ol(c, 0.8)), rot(16, 133, 302)) + rect(220, 300, 180, 5, c, ol(c, 0.8));
    s += rect(0, 328, 400, 5, c, ol(c, 0.8));
    for (let x = 4; x < 400; x += 16) {
      const r = R();
      if (r < 0.3) continue;
      const top = r < 0.45 ? 318 : 288;
      const p = r < 0.45
        ? poly([x, top + 4, x + 4, top, x + 7, top + 5, x + 10, top + 2, x + 10, 346, x, 346], lg([lt(c, 0.1), dn(c, 0.1)], 0, 0, 1, 0), ol(c, 0.9))
        : poly([x, top + 8, x + 5, top, x + 10, top + 8, x + 10, 346, x, 346], lg([lt(c, 0.1), dn(c, 0.1)], 0, 0, 1, 0), ol(c, 0.9));
      s += r > 0.86 ? g(p, rot((R() - 0.5) * 36, x + 5, 346)) : p;
    }
    posts.forEach((px, i) => { s += g(rect(px - 5, 280, 10, 68, dn(c, 0.08), ol(c, 1)), i === 2 ? rot(-9, px, 348) : i === 5 ? rot(6, px, 348) : ''); });
    for (const [x, y] of [[40, 340], [150, 338], [290, 342], [360, 336]]) s += ell(x, y, 8, 3, '#6f7f45', op(0.6));
    return s;
  }
  const c = ['#f7f7f2', '#a0703f', '#6f9fd8'][st];
  const shade = lg([lt(c, 0.25), c, dn(c, 0.12)], 0, 0, 1, 0);
  if (st === 1) {
    posts.forEach((px) => { s += rect(px - 6, 282, 12, 66, shade, ol(c, 1)) + rect(px - 7, 280, 14, 4, lt(c, 0.15), ol(c, 0.8)); });
    for (const y of [292, 311, 330]) {
      s += rr(-4, y, 408, 11, 2, lg([lt(c, 0.2), c, dn(c, 0.15)]), ol(c, 1));
      s += pth(`M10 ${y + 4} q30 2 60 0 t60 1 M150 ${y + 7} q40 -2 80 0 t60 -1 M300 ${y + 4} q30 2 90 0`, 'none', sk(dn(c, 0.22), 0.7) + op(0.6));
      for (const px of posts) s += circ(px - 3, y + 5.5, 1, '#3a3a3a') + circ(px + 3, y + 5.5, 1, '#3a3a3a');
    }
    return s;
  }
  s += rect(0, 300, 400, 6, dn(c, 0.12), ol(c, 0.8)) + rect(0, 330, 400, 6, dn(c, 0.12), ol(c, 0.8));
  for (let x = 3; x < 400; x += 15) {
    if (posts.some((p) => Math.abs(x + 5 - p) < 9)) continue;
    if (st === 0) s += poly([x, 294, x + 5, 285, x + 10, 294, x + 10, 346, x, 346], shade, ol(c, 0.9));
    else {
      const seg = posts.find((p) => p > x + 5) ?? 400;
      const t = (seg - (x + 5)) / 66.7;
      const top = 294 - Math.sin(t * Math.PI) * 9;
      s += pth(`M${x} 346 V${r1(top + 5)} A5 5 0 0 1 ${x + 10} ${r1(top + 5)} V346 Z`, shade, ol(c, 0.9));
    }
  }
  posts.forEach((px) => {
    s += rect(px - 6, 284, 12, 64, shade, ol(c, 1));
    s += st === 0 ? poly([px - 7, 286, px, 276, px + 7, 286], lt(c, 0.1), ol(c, 0.9)) : circ(px, 280, 6, lt(c, 0.15), ol(c, 0.9));
  });
  return s;
}

const PATH_D = 'M176 418 C168 462 148 522 116 640 L284 640 C252 522 232 462 224 418 Z';
function pathRows(step: number): number[] {
  const out: number[] = [];
  for (let j = 0; ; j++) { const y = VPY + ((418 - VPY) * FOC) / (FOC - step * j); out.push(Math.min(y, 641)); if (y >= 641) break; }
  return out;
}
const phw = (y: number): number => 24 + (y - 418) * 0.28 + Math.max(0, y - 520) * 0.12;
const pk2 = (y: number): number => (y - VPY) / (418 - VPY);

function gPath(st?: number): string {
  const cl = clip(pth(PATH_D, '#fff'));
  const R = rng(60 + (st ?? 5));
  if (st === undefined) {
    let s = pth(PATH_D, lg(['#8f6f4c', '#76573a']));
    let v = '';
    for (const [x, y, rx, ry] of [[190, 450, 20, 5], [220, 560, 40, 12], [160, 610, 40, 14]]) v += ell(x, y, rx, ry, '#5e4329', op(0.45));
    v += ell(188, 520, 26, 7, lg(['#8fa3ab', '#6f848c'])) + ell(182, 518, 10, 2, '#ffffff', op(0.4));
    v += ell(222, 602, 32, 9, lg(['#8fa3ab', '#6f848c'])) + ell(214, 600, 12, 2.4, '#ffffff', op(0.4));
    v += poly([180, 440, 204, 436, 208, 448, 184, 452], '#9a958a', ol('#9a958a', 1)) + crack([192, 437, 196, 450], 0.9);
    v += poly([206, 474, 236, 470, 240, 486, 212, 490], '#9a958a', ol('#9a958a', 1)) + poly([150, 548, 176, 544, 172, 566, 146, 568], '#8f8a80', ol('#8f8a80', 1));
    for (let i = 0; i < 6; i++) { const y = 430 + R() * 200, x = 200 + (R() - 0.5) * phw(y) * 1.6; v += ell(x, y, 3 * pk2(y), 1.8 * pk2(y), '#3e2c1c', op(0.5)); }
    s += g(v, cl);
    s += weed(172, 470, 0.8) + weed(236, 540, 1);
    return s;
  }
  const base = ['#77746c', '#d8c0a8', '#d8cbb0'][st];
  let s = pth(PATH_D, base);
  let v = '';
  if (st === 0) {
    const rows = pathRows(20);
    for (let j = 0; j < rows.length - 1; j++) {
      const ya = rows[j], yb = rows[j + 1], ym = (ya + yb) / 2, hw = phw(ym), k = pk2(ym), gap = 2.2 * k;
      const split = j % 2 ? [-1, 0, 1] : [-1, -0.2, 1];
      for (let q = 0; q < split.length - 1; q++) {
        const xa = 200 + split[q] * hw + gap, xb = 200 + split[q + 1] * hw - gap;
        const col = pick(['#a7a7a7', '#9e9e9a', '#b3b3ae', '#a2a39c', '#adaaa2'], R);
        v += rr(xa, ya + gap, xb - xa, yb - ya - gap * 2, 5 * k, lg([lt(col, 0.15), col]), ol(col, 1));
        v += rr(xa + 2 * k, ya + gap + 1.5 * k, (xb - xa) * 0.5, 1.4 * k, 0.7 * k, '#ffffff', op(0.35));
      }
    }
  } else if (st === 1) {
    const rows = pathRows(9);
    for (let j = 0; j < rows.length - 1; j++) {
      const ya = rows[j], yb = rows[j + 1], k = pk2((ya + yb) / 2), bw = 16 * k, off = j % 2 ? bw / 2 : 0;
      for (let x = 200 - 110 - off; x < 310; x += bw) {
        const col = pick(['#b5553b', '#a94c34', '#c0613f', '#9e4630', '#b85a40'], R);
        v += rect(x + 0.7 * k, ya + 0.7 * k, bw - 1.4 * k, yb - ya - 1.4 * k, col);
        v += rect(x + 0.7 * k, ya + 0.7 * k, bw - 1.4 * k, (yb - ya) * 0.25, '#ffffff', op(0.12));
      }
    }
  } else {
    const pc = ['#cfc2a6', '#bfb39a', '#e6dcc6', '#a99f8a', '#d9cdb5', '#c4b89e'];
    for (let i = 0; i < 300; i++) {
      const y = 418 + Math.pow(R(), 0.75) * 224, x = 200 + (R() * 2 - 1) * phw(y), k = pk2(y), rx = (1.6 + R() * 1.6) * k;
      const col = pick(pc, R);
      v += ell(x, y, rx, rx * 0.66, col, ol(col, 0.5)) + ell(x - rx * 0.3, y - rx * 0.25, rx * 0.35, rx * 0.2, '#ffffff', op(0.45));
    }
  }
  s += g(v, cl);
  if (st === 1) s += pth(PATH_D, 'none', sk('#8a3a26', 3));
  if (st === 2) for (const sd of [-1, 1]) for (const y of pathRows(10)) { if (y > 640) continue; const k = pk2(y); s += ell(200 + sd * (phw(y) + 1), y, 4.5 * k, 3 * k, '#9a958a', ol('#9a958a', 0.8)); }
  if (st === 0) s += pth(PATH_D, 'none', sk(dn(base, 0.2), 1.2));
  return s;
}

const CANOPY: [number, number, number][] = [[0, 0, 50], [-40, 14, 32], [40, 12, 34], [-26, -30, 34], [24, -34, 36], [-44, -10, 26], [46, -12, 26], [0, -46, 30], [-16, 36, 30], [20, 38, 30]];
function star5(x: number, y: number, r: number, c: string, a: number): string {
  const p: number[] = [];
  for (let i = 0; i < 10; i++) { const rr0 = i % 2 ? r * 0.45 : r, t = ((i * 36 + a - 90) * Math.PI) / 180; p.push(x + Math.cos(t) * rr0, y + Math.sin(t) * rr0); }
  return poly(p, c, ol(c, 0.6));
}

function gTree(st?: number): string {
  const cx = 300, cy = 196;
  const trunkC = st === undefined ? '#7d6e5e' : st === 1 ? '#6b4a4a' : '#7a5232';
  let s = shadow(318, 408, 54, 9, 0.25);
  s += pth('M302 408 C308 366 310 326 304 270 L330 270 C324 326 326 366 336 408 Q319 414 302 408 Z', lg([lt(trunkC, 0.15), trunkC, dn(trunkC, 0.25)], 0, 0, 1, 0), ol(trunkC, 1.4));
  s += pth('M296 410 Q304 400 306 390 M340 410 Q330 402 330 392', 'none', sk(trunkC, 4));
  s += pth('M312 300 q2 20 -1 40 M322 330 q-2 20 1 40 M316 360 q2 14 0 26', 'none', sk(dn(trunkC, 0.3), 1) + op(0.6));
  const br = 'M312 282 Q296 250 270 228 M320 278 Q336 246 352 226 M316 276 Q318 240 306 200 M306 250 Q290 236 282 206 M326 256 Q344 240 340 200';
  s += pth(br, 'none', sk(trunkC, 6));
  const R = rng(70 + (st ?? 4));
  if (st === undefined) {
    s += pth('M270 228 Q256 216 250 196 M270 228 Q252 230 240 222 M352 226 Q366 214 370 196 M352 226 Q364 230 372 228 M306 200 Q300 180 304 160 M306 200 Q316 180 322 170 M282 206 Q274 190 262 182 M340 200 Q350 186 348 168', 'none', sk(trunkC, 2.6));
    s += pth('M250 196 l-6 -8 M250 196 l2 -10 M304 160 l-5 -8 M304 160 l4 -9 M322 170 l6 -6 M262 182 l-8 -2 M348 168 l-4 -8 M370 196 l2 -9 M240 222 l-8 2', 'none', sk(trunkC, 1.2));
    s += ell(306, 204, 10, 4.5, '#8a6a48', ol('#8a6a48', 0.8)) + pth('M297 203 q9 4 18 0 M299 206 q7 3 14 0', 'none', sk('#6b4a2a', 0.8));
    for (let i = 0; i < 6; i++) { const x = 290 + R() * 60, y = 406 + R() * 10; s += ell(x, y, 3.5, 1.6, pick(['#8b5a2b', '#a0703f'], R), rot(R() * 180, x, y)); }
    s += g(ln(0, 0, 40, 0, trunkC, 4) + ln(24, 0, 34, -8, trunkC, 2), `transform="translate(252 410) rotate(-6)"`);
    s += g(ell(347, 166, 3.5, 1.8, '#8b5a2b', rot(30, 347, 166)) + ell(258, 186, 3, 1.6, '#a0703f', rot(-20, 258, 186)), '');
    return s;
  }
  const pal = [['#3f8a3c', '#5aaa48', '#8ad06a'], ['#e07a9c', '#f4a6c0', '#ffd6e4'], ['#c4521c', '#e07b2f', '#f7ac50']][st];
  for (const [dx, dy, r] of CANOPY) s += circ(cx + dx + 3, cy + dy + 6, r, pal[0]);
  for (const [dx, dy, r] of CANOPY) s += circ(cx + dx, cy + dy, r * 0.9, pal[1]);
  const hl = rg([[0, pal[2], 0.85], [0.6, pal[2], 0.35], [1, pal[2], 0]]);
  for (const [dx, dy, r] of CANOPY) s += circ(cx + dx - r * 0.22, cy + dy - r * 0.28, r * 0.6, hl);
  for (let i = 0; i < 40; i++) { const [dx, dy, r] = pick(CANOPY, R), a = R() * Math.PI * 2, d = R() * r * 0.8; s += ell(cx + dx + Math.cos(a) * d, cy + dy + Math.sin(a) * d, 3, 1.8, pal[0], `${op(0.45)} ${rot(R() * 180, cx + dx, cy + dy)}`); }
  if (st === 0) {
    const ap = [[-30, -10], [10, -24], [34, 6], [-12, 20], [22, 34], [-42, 18], [44, -20], [0, -50], [-20, -40], [30, -46], [-50, -4], [8, 6], [-28, 40], [48, 26]];
    for (const [dx, dy] of ap) { const x = cx + dx, y = cy + dy; s += circ(x, y, 5, '#d84b3f', ol('#d84b3f', 0.8)) + circ(x - 1.6, y - 1.8, 1.5, '#ffffff', op(0.7)) + ln(x, y - 5, x + 1, y - 7.5, '#5a3a20', 1); }
    s += circ(276, 412, 5, '#d84b3f', ol('#d84b3f', 0.8)) + circ(350, 416, 5, '#c8423b', ol('#c8423b', 0.8));
  } else if (st === 1) {
    for (let i = 0; i < 70; i++) { const [dx, dy, r] = pick(CANOPY, R), a = R() * Math.PI * 2, d = R() * r * 0.85; const x = cx + dx + Math.cos(a) * d, y = cy + dy + Math.sin(a) * d; for (let k = 0; k < 360; k += 72) s += ell(x, y - 1.6, 1, 1.8, '#fff3f7', rot(k, x, y)); s += circ(x, y, 0.8, '#e05a7a'); }
    for (let i = 0; i < 16; i++) { const x = 230 + R() * 150, y = 260 + R() * 160; s += ell(x, y, 2.4, 1.4, '#f8b8cd', rot(R() * 180, x, y)); }
  } else {
    for (let i = 0; i < 12; i++) { const x = 232 + R() * 140, y = 270 + R() * 150; s += star5(x, y, 4 + R() * 2, pick(['#e0562a', '#f39a2b', '#c8421e', '#f6c23e'], R), R() * 70); }
  }
  return s;
}

function gSwing(st?: number): string {
  if (st === undefined) {
    const c = '#8b7f6e';
    let s = shadow(98, 428, 68, 7);
    s += ln(58, 204, 64, 424, dn(c, 0.35), 4.5) + ln(54, 204, 34, 428, dn(c, 0.15), 6);
    s += ln(142, 212, 156, 330, dn(c, 0.15), 6) + poly([152, 326, 160, 328, 157, 336], dn(c, 0.3));
    s += g(rr(150, 414, 40, 7, 2, c, ol(c, 1)), rot(10, 170, 418));
    s += g(rr(42, 196, 112, 10, 2, lg([lt(c, 0.1), c]), ol(c, 1.2)), rot(6, 48, 200));
    s += ln(78, 206, 80, 352, '#a8987a', 1.8) + g(rr(74, 352, 12, 58, 2, c, ol(c, 1)), rot(-4, 80, 352));
    s += pl([124, 212, 126, 252, 121, 272], '#a8987a', 1.8) + pl([121, 272, 118, 276, 124, 277], '#a8987a', 1);
    s += cobweb(58, 206, 18, 1);
    return s;
  }
  if (st === 0) {
    const c = '#9a6a3f';
    let s = shadow(98, 428, 72, 8, 0.24);
    s += ln(58, 202, 66, 422, dn(c, 0.35), 5) + ln(138, 202, 130, 422, dn(c, 0.35), 5);
    s += ln(54, 202, 34, 428, dn(c, 0.05), 6.5) + ln(142, 202, 162, 428, dn(c, 0.05), 6.5);
    s += ln(42, 350, 63, 350, dn(c, 0.2), 3) + ln(154, 350, 133, 350, dn(c, 0.2), 3);
    s += rr(40, 194, 116, 11, 3, lg([lt(c, 0.2), c, dn(c, 0.15)]), ol(c, 1.2));
    s += ln(74, 204, 76, 366, '#d9c59a', 2.2) + ln(122, 204, 120, 366, '#d9c59a', 2.2);
    s += pth('M74 220 v120 M122 220 v120', 'none', `stroke="#b09a6a" stroke-width="1" stroke-dasharray="2 4"`);
    for (const [x, y] of [[75, 240], [75, 280], [76, 320], [121, 260], [121, 300]]) s += ell(x - 3, y, 3, 1.6, '#5aa05a', rot(-30, x - 3, y)) + ell(x + 3, y + 6, 3, 1.6, '#4a904a', rot(30, x + 3, y + 6)) + circ(x, y + 3, 1.6, '#f27aa0');
    s += poly([68, 364, 128, 364, 132, 372, 64, 372], lg([lt(c, 0.25), c]), ol(c, 1)) + rect(64, 372, 68, 5, dn(c, 0.2), ol(c, 0.8));
    return s;
  }
  if (st === 1) {
    const c = '#d9b27a', frame = '#5a4632';
    let s = shadow(100, 426, 54, 7, 0.24);
    s += ell(102, 422, 30, 6, lg([lt(frame, 0.2), frame]), ol(frame, 1));
    s += pth('M122 420 C140 380 150 300 142 252 C136 214 116 202 100 204', 'none', sk(frame, 5)) + pth('M122 420 C140 380 150 300 142 252 C136 214 116 202 100 204', 'none', sk(lt(frame, 0.35), 1.4) + op(0.6));
    s += ln(100, 204, 100, 248, '#8a8a8a', 1.6);
    for (let y = 212; y < 246; y += 7) s += ell(100, y, 1.6, 3, 'none', sk('#8a8a8a', 1));
    const weave = patt(8, 8, rect(0, 0, 8, 8, c) + ln(0, 0, 8, 8, dn(c, 0.22), 1.1) + ln(8, 0, 0, 8, dn(c, 0.22), 1.1) + circ(4, 4, 1, lt(c, 0.3)));
    const egg = 'M100 246 C132 246 142 300 136 340 C132 372 118 394 100 394 C82 394 68 372 64 340 C58 300 68 246 100 246 Z';
    s += pth(egg, weave, ol(c, 1.4)) + pth(egg, lg([[0, '#fff', 0.2], [0.5, '#fff', 0], [1, '#000', 0.2]], 0, 0, 1, 0));
    s += pth('M100 278 C122 278 128 312 124 344 C121 366 112 378 100 378 C88 378 79 366 76 344 C72 312 78 278 100 278 Z', dn(c, 0.5));
    s += pth('M78 348 Q100 336 122 348 Q124 372 100 376 Q76 372 78 348 Z', '#f7f1e3', ol('#e3d6b8', 1));
    s += g(rr(88, 316, 24, 24, 8, lg(['#f27a9a', '#e05a7a']), ol('#e05a7a', 1)), rot(-8, 100, 328)) + circ(100, 328, 1.6, '#ffffff', op(0.8));
    return s;
  }
  const c = '#c94a4a';
  let s = shadow(98, 428, 72, 8, 0.24);
  s += ln(58, 204, 66, 422, dn(c, 0.35), 4) + ln(138, 204, 130, 422, dn(c, 0.35), 4);
  s += ln(54, 204, 34, 428, c, 4.5) + ln(142, 204, 162, 428, c, 4.5);
  s += rect(44, 200, 108, 6, lg([lt(c, 0.2), c]), ol(c, 1));
  const stripes = patt(12, 10, rect(0, 0, 6, 10, '#ffffff') + rect(6, 0, 6, 10, c));
  let awn = 'M36 188 L52 176 H144 L160 188 V196';
  for (let i = 6; i > 0; i--) { const x1 = 36 + (124 * (i - 1)) / 6; awn += ` Q${r1(x1 + 10.3)} 206 ${r1(x1)} 196`; }
  s += pth(awn + ' Z', stripes, ol(c, 1.1)) + pth('M36 188 L52 176 H144 L160 188 Z', '#000', op(0.08));
  s += ln(66, 206, 66, 334, '#9aa5ad', 1.4) + ln(130, 206, 130, 334, '#9aa5ad', 1.4);
  s += rr(60, 330, 76, 26, 3, lg([lt(c, 0.2), c]), ol(c, 1.2));
  for (let x = 68; x < 134; x += 9) s += ln(x, 333, x, 353, dn(c, 0.2), 1, op(0.6));
  s += rr(64, 346, 68, 12, 4, '#f7f1e3', ol('#e3d6b8', 0.8)) + pth('M70 352 h56', 'none', `stroke="${c}" stroke-width="1.2" stroke-dasharray="3 3"`);
  s += poly([56, 356, 140, 356, 144, 364, 52, 364], lg([lt(c, 0.3), c]), ol(c, 1)) + rect(52, 364, 92, 5, dn(c, 0.25));
  s += rr(52, 340, 6, 22, 2, c, ol(c, 0.8)) + rr(138, 340, 6, 22, 2, c, ol(c, 0.8));
  return s;
}

function waterArc(d: string, w = 2.4, o = 0.8): string {
  return pth(d, 'none', sk('#cdeeff', w) + op(o)) + pth(d, 'none', sk('#ffffff', w * 0.35) + op(o));
}
function basin(c: string, body: string): string {
  let s = pth('M134 396 L140 420 Q200 434 260 420 L266 396 Z', body, ol(c, 1.3));
  s += pth('M137 408 Q200 422 263 408', 'none', sk(dn(c, 0.15), 1) + op(0.6));
  s += ell(200, 396, 66, 13, lt(c, 0.3), ol(c, 1.3));
  return s;
}
function pool(cx: number, cy: number, rx: number, ry: number): string {
  return ell(cx, cy, rx, ry, lg(['#6fbfe6', '#b9e6fa'])) + ell(cx, cy + ry * 0.15, rx * 0.66, ry * 0.55, 'none', sk('#ffffff', 1) + op(0.55)) + ell(cx, cy + ry * 0.2, rx * 0.36, ry * 0.3, 'none', sk('#ffffff', 0.8) + op(0.5));
}

function gFountain(st?: number): string {
  if (st === undefined) {
    const c = '#a59c8c';
    const body = lg([dn(c, 0.15), lt(c, 0.1), dn(c, 0.2)], 0, 0, 1, 0);
    let s = shadow(200, 428, 78, 10);
    s += basin(c, body);
    s += ell(200, 397, 58, 10, lg(['#5e4e3a', '#7a6a55']));
    for (const [x, y, a] of [[176, 398, 20], [214, 396, -30], [232, 400, 60], [190, 402, 100]]) s += ell(x, y, 5, 2, '#8b5a2b', rot(a, x, y));
    s += ell(160, 394, 10, 3, '#6f8a45', op(0.7)) + ell(244, 392, 8, 2.5, '#6f8a45', op(0.7));
    s += crack([168, 402, 174, 412, 170, 424], 1.2) + crack([236, 388, 242, 398, 238, 406], 1.1);
    s += pth('M192 396 V368 L196 362 L200 368 L204 360 L208 366 V396 Z', body, ol(c, 1.2));
    s += g(pth('M0 0 Q4 14 26 16 Q44 14 48 0 Z', lg([lt(c, 0.1), dn(c, 0.15)]), ol(c, 1.2)) + ell(24, 0, 24, 5, lt(c, 0.15), ol(c, 1)) + pth('M30 -4 L36 6 L40 -3', '#3a3029'), `transform="translate(252 400) rotate(-26)"`);
    s += weed(144, 424, 0.8) + weed(262, 426, 0.7);
    return s;
  }
  const c = ['#e9e6df', '#8fb3c9', '#9b7a4a'][st];
  const body = lg([dn(c, 0.2), lt(c, 0.3), dn(c, 0.25)], 0, 0, 1, 0);
  let s = shadow(200, 428, 82, 10, 0.25);
  s += basin(c, body);
  if (st === 2) s += pth('M150 404 v10 M170 410 v12 M232 410 v10 M250 404 v9', 'none', sk('#6fa89a', 2.4) + op(0.6));
  s += pool(200, 397, 58, 10);
  if (st === 0) {
    s += pth('M190 398 Q186 380 192 372 H208 Q214 380 210 398 Z', body, ol(c, 1.2));
    s += rect(193, 352, 14, 22, body, ol(c, 1.1)) + rr(188, 368, 24, 5, 2, lt(c, 0.2), ol(c, 1));
    s += pth('M166 350 Q172 368 200 370 Q228 368 234 350 Z', body, ol(c, 1.2));
    s += ell(200, 350, 34, 7, lt(c, 0.3), ol(c, 1.2)) + pool(200, 350.5, 28, 5);
    s += rect(196, 326, 8, 24, body, ol(c, 1)) + circ(200, 322, 6, lt(c, 0.2), ol(c, 1));
    s += waterArc('M200 316 Q186 292 172 346') + waterArc('M200 316 Q214 292 228 346') + waterArc('M200 315 V300', 2, 0.7);
    s += waterArc('M168 352 Q158 364 156 392', 3, 0.6) + waterArc('M232 352 Q242 364 244 392', 3, 0.6) + waterArc('M184 362 Q178 378 176 394', 2, 0.5) + waterArc('M216 362 Q222 378 224 394', 2, 0.5);
  } else if (st === 1) {
    s += rect(194, 336, 12, 62, body, ol(c, 1.1));
    s += pth('M160 364 Q168 380 200 382 Q232 380 240 364 Z', body, ol(c, 1.2)) + ell(200, 364, 40, 8, lt(c, 0.3), ol(c, 1.2)) + pool(200, 364.5, 34, 5.5);
    s += pth('M178 336 Q184 348 200 349 Q216 348 222 336 Z', body, ol(c, 1.2)) + ell(200, 336, 22, 5, lt(c, 0.3), ol(c, 1.1)) + pool(200, 336.4, 17, 3.4);
    s += circ(200, 326, 5, lt(c, 0.2), ol(c, 1)) + waterArc('M200 321 Q194 312 190 318', 1.8) + waterArc('M200 321 Q206 312 210 318', 1.8);
    s += waterArc('M178 338 Q172 348 170 362', 2.6, 0.6) + waterArc('M222 338 Q228 348 230 362', 2.6, 0.6);
    s += waterArc('M160 366 Q152 378 152 394', 3, 0.6) + waterArc('M240 366 Q248 378 248 394', 3, 0.6) + waterArc('M176 376 Q172 386 172 396', 2, 0.5) + waterArc('M224 376 Q228 386 228 396', 2, 0.5);
  } else {
    s += ell(200, 394, 16, 5, '#9a958a', ol('#9a958a', 1));
    s += pth('M200 388 L186 398 Q200 392 214 398 Z', body, ol(c, 1));
    s += pth('M200 390 C188 376 186 352 196 336 C204 324 218 322 222 332 C224 342 214 346 212 356 C210 370 212 380 200 390 Z', body, ol(c, 1.3));
    s += pth('M212 352 L226 346 L218 362 Z M196 360 L186 364 L194 370 Z', body, ol(c, 1));
    s += pth('M200 350 q4 3 8 0 M198 360 q4 3 8 0 M199 370 q4 3 8 0', 'none', sk(dn(c, 0.3), 0.8) + op(0.7));
    s += circ(212, 331, 3, '#f7f1e3') + circ(212.5, 331, 1.6, '#2a2a2a');
    s += ell(199, 333, 3.5, 2.4, '#3a2a1a');
    s += pth('M204 324 q6 4 14 2', 'none', sk('#6fa89a', 1.6) + op(0.7));
    s += waterArc('M197 331 Q168 296 150 392', 2.6, 0.8) + waterArc('M150 392 q-4 -6 -8 -2', 1.6, 0.6);
  }
  s += ell(156, 394, 7, 1.6, '#ffffff', op(0.7)) + ell(244, 394, 7, 1.6, '#ffffff', op(0.7));
  for (const [x, y] of [[150, 386], [160, 384], [240, 385], [250, 388], [196, 304], [205, 300]]) s += circ(x, y, 1.1, '#ffffff', op(0.8));
  return s;
}

function gBench(st?: number): string {
  if (st === undefined) {
    const c = '#8b8172';
    let s = shadow(315, 502, 60, 7);
    let b = rect(272, 458, 6, 38, dn(c, 0.35)) + rect(354, 458, 6, 38, dn(c, 0.35));
    b += rr(268, 412, 9, 50, 2, dn(c, 0.1), ol(c, 1)) + rr(355, 412, 9, 50, 2, dn(c, 0.1), ol(c, 1));
    b += rr(264, 418, 104, 8, 2, c, ol(c, 1)) + g(rr(268, 430, 60, 8, 2, c, ol(c, 1)), rot(24, 268, 434));
    b += poly([264, 458, 300, 458, 296, 470, 258, 470], c, ol(c, 1)) + poly([330, 458, 368, 458, 374, 470, 334, 470], c, ol(c, 1));
    b += rect(258, 470, 116, 5, dn(c, 0.2), ol(c, 0.8));
    b += rect(264, 475, 8, 26, dn(c, 0.1), ol(c, 1)) + rect(360, 475, 8, 12, dn(c, 0.1), ol(c, 1)) + poly([360, 487, 364, 484, 368, 488], dn(c, 0.3));
    for (const [x, y] of [[290, 420], [340, 422], [280, 462], [350, 464]]) b += ell(x, y, 6, 2.4, '#6f8a45', op(0.7));
    s += g(b, rot(4, 266, 500));
    s += g(rr(0, 0, 26, 7, 2, c, ol(c, 1)), `transform="translate(334 502) rotate(-8)"`);
    return s;
  }
  const c = ['#a06a3c', '#f2f2f2', '#4f8f5a'][st];
  const line = st === 1 ? '#9aa0a6' : dk(c);
  let s = shadow(316, 504, 64, 8, 0.26);
  if (st === 1) {
    const iron = `stroke="${c}" stroke-width="3" stroke-linecap="round"`;
    const ironO = `stroke="${line}" stroke-width="5" stroke-linecap="round"`;
    const back = 'M268 460 V420 Q268 412 276 412 H356 Q364 412 364 420 V460 M268 436 H364';
    const scrolls = 'M282 434 q0 -14 12 -14 q8 0 8 8 q0 6 -6 6 M350 434 q0 -14 -12 -14 q-8 0 -8 8 q0 6 6 6 M316 434 q-8 -6 0 -18 q8 12 0 18 M276 458 q6 -16 18 -18 M356 458 q-6 -16 -18 -18';
    const legs = 'M266 470 Q262 490 270 502 q4 2 4 -3 M366 470 Q370 490 362 502 q-4 2 -4 -3 M276 470 Q276 486 280 498 M356 470 Q356 486 352 498';
    s += pth(back + ' ' + scrolls + ' ' + legs, 'none', ironO) + pth(back + ' ' + scrolls + ' ' + legs, 'none', iron);
    s += poly([262, 458, 370, 458, 376, 470, 256, 470], '#f7f7f7', `stroke="${line}" stroke-width="1"`);
    for (const y of [462, 466]) s += ln(260, y, 372, y, line, 0.6, op(0.6));
    s += rect(256, 470, 120, 4, '#e6e6e6', `stroke="${line}" stroke-width="0.8"`);
    s += ell(300, 453, 9, 4, '#f6c23e', ol('#f6c23e', 0.8)) + pth('M296 449 q4 -5 8 0', 'none', sk('#4f8f45', 1));
    return s;
  }
  s += rect(272, 458, 6, 40, dn(c, 0.35)) + rect(354, 458, 6, 40, dn(c, 0.35));
  if (st === 0) {
    s += rr(268, 412, 9, 50, 2, dn(c, 0.1), ol(c, 1)) + rr(355, 412, 9, 50, 2, dn(c, 0.1), ol(c, 1));
    for (let k = 0; k < 3; k++) s += rr(264, 418 + k * 12, 104, 8, 2, lg([lt(c, 0.2), c]), ol(c, 1));
  } else {
    s += pth('M266 460 V426 Q316 404 366 426 V460 Z', lg([lt(c, 0.2), c]), ol(c, 1.2));
    for (let x = 278; x < 360; x += 10) s += ln(x, 424 - Math.sin(((x - 266) / 100) * Math.PI) * 8, x, 458, dn(c, 0.2), 1, op(0.6));
  }
  s += poly([264, 458, 368, 458, 374, 470, 258, 470], lg([lt(c, 0.25), c]), ol(c, 1.1));
  s += ln(262, 462, 370, 462, dn(c, 0.2), 0.7, op(0.6)) + ln(260, 466, 372, 466, dn(c, 0.2), 0.7, op(0.6));
  s += rect(258, 470, 116, 6, dn(c, 0.2), ol(c, 0.9));
  s += rect(264, 476, 8, 26, lg([c, dn(c, 0.2)], 0, 0, 1, 0), ol(c, 1)) + rect(360, 476, 8, 26, lg([c, dn(c, 0.2)], 0, 0, 1, 0), ol(c, 1));
  s += rr(254, 440, 20, 5, 2, lt(c, 0.1), ol(c, 1)) + rect(261, 444, 5, 16, c, ol(c, 0.8)) + rr(358, 440, 20, 5, 2, lt(c, 0.1), ol(c, 1)) + rect(366, 444, 5, 16, c, ol(c, 0.8));
  if (st === 2) s += rr(282, 450, 68, 10, 4, '#f7f1e3', ol('#e3d6b8', 0.9)) + circ(296, 455, 1.2, '#e05a7a') + circ(316, 455, 1.2, '#e05a7a') + circ(336, 455, 1.2, '#e05a7a');
  return s;
}

function rose(x: number, y: number, r: number, c: string): string {
  return circ(x, y, r, lg([lt(c, 0.2), c, dn(c, 0.15)]), ol(c, 0.7)) + pth(`M${r1(x - r * 0.5)} ${r1(y)} Q${r1(x)} ${r1(y - r * 0.9)} ${r1(x + r * 0.5)} ${r1(y)} Q${r1(x)} ${r1(y + r * 0.6)} ${r1(x - r * 0.15)} ${r1(y - r * 0.1)}`, 'none', sk(dn(c, 0.3), 0.8)) + circ(x - r * 0.35, y - r * 0.4, r * 0.25, '#ffffff', op(0.35));
}
function tulip(x: number, y: number, h: number, c: string): string {
  const t = y - h;
  return ln(x, y, x, t + 4, '#4f8f45', 1.6) + ell(x - 3, y - h * 0.3, 2, 8, '#5aa05a', rot(-20, x - 3, y - h * 0.3)) +
    pth(`M${x - 5} ${t} Q${x - 6} ${t - 9} ${x - 3} ${t - 11} L${x} ${t - 7} L${x + 3} ${t - 11} Q${x + 6} ${t - 9} ${x + 5} ${t} Q${x} ${t + 4} ${x - 5} ${t} Z`, lg([lt(c, 0.2), c, dn(c, 0.15)], 0, 0, 1, 0), ol(c, 0.8));
}

function gFlowers(st?: number): string {
  const cx = 92, cy = 498;
  const R = rng(80 + (st ?? 3));
  const stones = (front: boolean, skip: number): string => {
    let s = '';
    for (let a = 0; a < 360; a += 14) {
      const t = (a * Math.PI) / 180, isFront = Math.sin(t) > 0;
      if (isFront !== front || R() < skip) continue;
      const x = cx + Math.cos(t) * 61, y = cy + Math.sin(t) * 23, col = pick(['#b9b4a8', '#a7a196', '#c9c3b6'], R);
      s += ell(x, y, 7, 4, col, ol(col, 0.8)) + ell(x - 2, y - 1.4, 3, 1.4, '#ffffff', op(0.35));
    }
    return s;
  };
  let s = shadow(cx, cy + 6, 66, 12, 0.18);
  if (st === undefined) {
    s += stones(false, 0.35);
    s += ell(cx, cy, 58, 21, lg(['#b0906a', '#977652']));
    s += crack([50, 494, 70, 500, 80, 492, 100, 498]) + crack([100, 498, 120, 506, 134, 500]) + crack([80, 492, 84, 484]);
    s += weed(60, 494, 1) + weed(122, 500, 0.9) + dandelion(70, 500, 26);
    s += pth('M100 500 Q98 470 104 456 Q110 450 114 458', 'none', sk('#8a7a4a', 1.6)) + ell(114, 460, 4, 2.4, '#7a5a3a', rot(60, 114, 460));
    s += poly([134, 490, 146, 486, 144, 496], '#b5603e', ol('#b5603e', 0.8));
    s += stones(true, 0.35);
    return s;
  }
  s += stones(false, 0);
  s += ell(cx, cy, 58, 21, rg(['#6b4a32', '#4a3020']));
  for (let i = 0; i < 26; i++) s += circ(cx + (R() - 0.5) * 100, cy + (R() - 0.5) * 30, 0.9, '#7d5a3e');
  if (st === 0) {
    for (const [bx, by, br] of [[62, 486, 18], [94, 478, 21], [124, 488, 17]]) {
      for (const [dx, dy, r] of [[0, 0, 1], [-0.6, 0.2, 0.7], [0.6, 0.25, 0.7], [0, -0.5, 0.65]]) s += circ(bx + dx * br, by + dy * br, br * r, '#3f7d3a');
      for (let i = 0; i < 12; i++) { const a = R() * Math.PI * 2, d = R() * br; s += ell(bx + Math.cos(a) * d, by + Math.sin(a) * d * 0.8, 3, 1.8, '#5aa05a', rot(R() * 180, bx, by)); }
    }
    for (const [x, y, r, c] of [[54, 476, 6, '#e05a7a'], [70, 482, 5.5, '#f07a95'], [62, 492, 5, '#c93c5f'], [86, 466, 6.5, '#e05a7a'], [102, 472, 6, '#c93c5f'], [94, 486, 5.5, '#f07a95'], [118, 480, 6, '#e05a7a'], [132, 488, 5, '#f07a95'], [124, 494, 4.5, '#c93c5f'], [80, 492, 4.5, '#e05a7a']] as [number, number, number, string][]) s += rose(x, y, r, c);
  } else if (st === 1) {
    const cols = ['#f08a3c', '#e8503c', '#f6c23e', '#f08a3c', '#ff7aa2'];
    const pos: [number, number, number][] = [[56, 500, 30], [68, 494, 38], [80, 502, 32], [92, 490, 42], [104, 500, 34], [116, 492, 40], [128, 502, 30], [74, 486, 44], [110, 484, 46], [44, 498, 26], [140, 498, 28]];
    for (const [x, y, h] of pos.sort((a, b) => a[1] - b[1])) s += tulip(x, y, h, pick(cols, R));
  } else {
    for (const bx of [52, 72, 92, 112, 132]) {
      for (let k = -3; k <= 3; k++) {
        const x0 = bx + k * 1.6, y0 = 500 - Math.abs(bx - 92) * 0.1, h = 34 + R() * 14, tx = x0 + k * 3.2, ty = y0 - h;
        s += ln(x0, y0, tx, ty, '#8aa07a', 1);
        for (let q = 0; q < 6; q++) { const t = q / 6; const px = tx + (x0 - tx) * t * 0.45, py = ty + (y0 - ty) * t * 0.45; s += ell(px + (q % 2 ? 1.4 : -1.4), py, 1.6, 2.4, pick(['#9b7fd1', '#8a6cc4', '#b39be0'], R)); }
      }
    }
    for (const [x, y, c] of [[70, 444, '#ffffff'], [120, 452, '#ffe066']] as [number, number, string][]) s += ell(x - 3, y, 3.4, 2.4, c, `${rot(-30, x - 3, y)} ${ol(c, 0.6)}`) + ell(x + 3, y, 3.4, 2.4, c, `${rot(30, x + 3, y)} ${ol(c, 0.6)}`) + ln(x, y - 2, x, y + 3, '#3a3a3a', 1);
  }
  s += stones(true, 0);
  return s;
}

function gLanterns(st?: number): string {
  const post = (x: number, tilt: number, c: string): string => g(rect(x - 3, 116, 6, 232, lg([lt(c, 0.15), c, dn(c, 0.2)], 0, 0, 1, 0), ol(c, 1)) + rect(x - 4.5, 112, 9, 6, dn(c, 0.15), ol(c, 0.8)) + ell(x, 348, 9, 3, '#000', op(0.2)), tilt ? rot(tilt, x, 348) : '');
  if (st === undefined) {
    const c = '#6b5a4a';
    let s = post(28, -5, c) + post(372, 6, c);
    s += pth('M38 122 Q66 190 94 258', 'none', sk('#3a3a3a', 1.2)) + pth('M362 126 Q338 186 302 246', 'none', sk('#3a3a3a', 1.2));
    const bulbs: [number, number, boolean][] = [[48, 150, true], [62, 186, false], [78, 220, true], [92, 252, false], [350, 156, true], [336, 186, false], [318, 218, true], [304, 244, false]];
    for (const [x, y, ok] of bulbs) {
      s += rect(x - 2, y, 4, 4, '#3a3a3a');
      if (ok) s += ell(x, y + 8, 3.6, 4.8, '#8f8f8f', ol('#6a6a6a', 0.6)) + pl([x - 2, y + 6, x, y + 9, x - 1, y + 12], '#4a4a4a', 0.6);
    }
    s += ell(110, 360, 3.6, 2.2, '#8f8f8f', ol('#6a6a6a', 0.6)) + ell(286, 356, 3.6, 2.2, '#8f8f8f', ol('#6a6a6a', 0.6));
    return s;
  }
  const c = '#5a4632';
  let s = post(28, 0, c) + post(372, 0, c);
  const x0 = 30, y0 = 122, qx = 200, qy = 214, x1 = 370, y1 = 122;
  s += pth(`M${x0} ${y0} Q${qx} ${qy} ${x1} ${y1}`, 'none', sk('#3a3a3a', 1.2));
  if (st === 0) {
    for (let i = 0; i < 15; i++) {
      const [x, y] = qb(x0, y0, qx, qy, x1, y1, (i + 0.5) / 15);
      s += glow(x, y + 8, 13, '#ffe6a0', 0.7) + rect(x - 2, y, 4, 4, '#3a3a3a') + ell(x, y + 8, 3.8, 5, '#ffd27a', ol('#e8b04a', 0.6)) + circ(x - 1, y + 6.5, 1.2, '#ffffff', op(0.8));
    }
  } else if (st === 1) {
    const cols = ['#ff7fa8', '#7fc8ff', '#ffd56b', '#8be08a', '#c49bff', '#ff9f5a'];
    for (let i = 0; i < 9; i++) {
      const [x, y] = qb(x0, y0, qx, qy, x1, y1, (i + 0.5) / 9);
      const col = cols[i % cols.length], cy0 = y + 14;
      s += glow(x, cy0, 16, col, 0.35) + ln(x, y, x, cy0 - 8, '#3a3a3a', 0.8);
      s += ell(x, cy0, 9, 8, rg([lt(col, 0.5), col], 0.5, 0.45, 0.6), ol(col, 0.8));
      s += ell(x, cy0, 5, 8, 'none', sk(dn(col, 0.2), 0.7) + op(0.7)) + ell(x, cy0, 1.6, 8, 'none', sk(dn(col, 0.2), 0.7) + op(0.7));
      s += rect(x - 3.5, cy0 - 9.5, 7, 2.5, '#3a3a3a') + rect(x - 3.5, cy0 + 7, 7, 2.5, '#3a3a3a') + ln(x, cy0 + 9.5, x, cy0 + 14, col, 1);
    }
  } else {
    for (let i = 0; i < 11; i++) {
      const [x, y] = qb(x0, y0, qx, qy, x1, y1, (i + 0.5) / 11);
      const r = i % 2 ? 6 : 8, cy0 = y + 4 + r + 2;
      s += glow(x, cy0, r * 2.4, '#fff3d0', 0.6) + ln(x, y, x, cy0 - r, '#3a3a3a', 0.8) + rect(x - 2, cy0 - r - 2, 4, 3, '#c9a24b');
      s += circ(x, cy0, r, rg(['#ffffff', '#fff6e0', '#f3dfb0'], 0.4, 0.35, 0.65), ol('#f3dfb0', 0.6)) + circ(x - r * 0.35, cy0 - r * 0.35, r * 0.25, '#ffffff', op(0.9));
    }
  }
  return s;
}

function gRays(_p: Placed, frac: number): string {
  if (frac < 0.01) return '';
  let s = '';
  for (const [ax, ay, bx, by] of [[-20, 280, 10, 380], [70, 520, 140, 560], [230, 640, 290, 640]]) {
    s += poly([322, 72, ax, ay, bx, by], lgU([[0, '#fff8d8', 0.22 * frac], [1, '#fff8d8', 0]], 322, 72, (ax + bx) / 2, (ay + by) / 2));
  }
  return g(s, NOPE);
}

const GARDEN: RoomArt = {
  items: { lawn: gLawn, fence: gFence, path: gPath, fountain: gFountain, bench: gBench, flowers: gFlowers, tree: gTree, swing: gSwing, lanterns: gLanterns },
  layers: [gSky, gHedge, 'lawn', 'fence', 'path', 'tree', 'lanterns', 'swing', 'fountain', 'bench', 'flowers', gRays, (_p, f) => moodLayer(f, '#46506a')],
};

/* =====================================================================
 * public API
 * ===================================================================== */
const ART: Record<string, RoomArt> = { living: LIVING, kitchen: KITCHEN, garden: GARDEN };

/** icon framing per item: `box` is the region of the room drawing to show (x, y, w, h).
 *  crop = square swatch tile (for surfaces), otherwise the item is fitted into the icon. */
const ICONS: Record<string, Record<string, IconSpec>> = {
  living: {
    floor: { box: [140, 430, 110, 110], crop: true },
    wallpaper: { box: [150, 110, 90, 90], crop: true },
    window: { box: [8, 108, 166, 236] },
    sofa: { box: [144, 290, 166, 126] },
    rug: { box: [56, 426, 288, 112], sy: 1.7 },
    table: { box: [126, 426, 148, 98] },
    lamp: { box: [84, 214, 156, 202] },
    plant: { box: [14, 376, 118, 154] },
    painting: { box: [172, 120, 106, 120] },
    bookshelf: { box: [280, 132, 102, 270] },
  },
  kitchen: {
    tiles: { box: [140, 430, 110, 110], crop: true },
    backsplash: { box: [150, 204, 84, 84], crop: true },
    cabinets: { box: [100, 246, 196, 156] },
    stove: { box: [280, 236, 98, 176] },
    fridge: { box: [26, 132, 88, 272] },
    dining: { box: [86, 414, 228, 124] },
    window: { box: [112, 128, 140, 136] },
    lights: { box: [110, 64, 180, 112] },
    shelf: { box: [258, 200, 112, 60] },
  },
  garden: {
    lawn: { box: [40, 380, 110, 110], crop: true },
    fence: { box: [148, 262, 90, 90], crop: true, bg: ['#bfe6ff', '#bfe6ff', '#8fcf6a'] },
    path: { box: [130, 480, 140, 140], crop: true, bg: ['#8fcf6a', '#6cbf4f'] },
    fountain: { box: [126, 294, 148, 140] },
    bench: { box: [250, 404, 128, 104] },
    flowers: { box: [26, 420, 132, 108] },
    tree: { box: [222, 106, 160, 308] },
    swing: { box: [28, 172, 140, 262] },
    lanterns: { box: [140, 116, 120, 120], crop: true, bg: ['#2f3d66', '#4a5a8a'] },
  },
};

function normStyle(v: unknown): number | undefined {
  if (typeof v !== 'number' || !Number.isFinite(v)) return undefined;
  return Math.max(0, Math.min(2, Math.floor(v)));
}

/** Full room illustration as an SVG string (viewBox `0 0 400 640`, preserveAspectRatio="xMidYMid slice").
 *  placed: item key -> chosen style index (0..2) for items that are DONE. Items not in `placed` are drawn in their
 *  "before" state: old / broken / dusty / missing. */
export function roomSVG(roomId: string, placed: Record<string, number>): string {
  const painted = paintedRoomSVG(roomId, placed);
  if (painted) return painted;
  const art = ART[roomId] ?? LIVING;
  begin(`r${roomId}`);
  const keys = Object.keys(art.items);
  const done = keys.filter((k) => normStyle(placed[k]) !== undefined).length;
  const frac = keys.length ? done / keys.length : 0;
  let body = '';
  for (const layer of art.layers) {
    if (typeof layer === 'string') {
      const st = normStyle(placed[layer]);
      body += itemGroup(layer, st, art.items[layer](st));
    } else {
      body += layer(placed, frac);
    }
  }
  return svgWrap(`0 0 ${ROOM_W} ${ROOM_H}`, body, 'preserveAspectRatio="xMidYMid slice" width="100%" height="100%"');
}

/** Small square icon of one item in a given style, viewBox `0 0 64 64`, transparent background. */
export function itemIconSVG(roomId: string, item: string, style: number): string {
  const painted = paintedIconSVG(roomId, item, style);
  if (painted) return painted;
  begin(`i${roomId}${item}`);
  const fn = ART[roomId]?.items[item];
  if (!fn) return svgWrap('0 0 64 64', '', 'width="64" height="64"');
  const st = normStyle(style) ?? 0;
  const spec = ICONS[roomId]?.[item] ?? { box: [0, 0, 400, 640] };
  const [bx, by, bw, bh] = spec.box;
  let body: string;
  if (spec.crop) {
    const sc = 56 / Math.max(bw, bh);
    const tx = 4 - bx * sc + (56 - bw * sc) / 2, ty = 4 - by * sc + (56 - bh * sc) / 2;
    const bg = spec.bg ? rect(0, 0, 64, 64, lg(spec.bg)) : '';
    const inner = bg + `<g transform="translate(${r3(tx)} ${r3(ty)}) scale(${r3(sc)})">${fn(st)}</g>` + rect(0, 0, 64, 64, lg([[0, '#fff', 0.22], [0.5, '#fff', 0], [1, '#000', 0.12]]));
    body = rr(4, 7, 56, 56, 12, '#000', op(0.16)) + g(inner, clip(rr(4, 4, 56, 56, 12, '#fff'))) + rr(4, 4, 56, 56, 12, 'none', 'stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.9"');
  } else {
    const sy = spec.sy ?? 1;
    const sc = 58 / Math.max(bw, bh * sy);
    const tx = 32 - (bx + bw / 2) * sc, ty = 32 - (by + bh / 2) * sc * sy;
    body = g(`<g transform="translate(${r3(tx)} ${r3(ty)}) scale(${r3(sc)} ${r3(sc * sy)})">${fn(st)}</g>`, clip(rect(0, 0, 64, 64, '#fff')));
  }
  return svgWrap('0 0 64 64', body, 'width="64" height="64"');
}

/** Cute original mascot: a chubby cream/orange cat named Mochi (head + shoulders, big eyes, blush), viewBox `0 0 120 120`. */
export function mascotSVG(mood: 'happy' | 'sad' | 'wow'): string {
  const painted = paintedMascotSVG(mood);
  if (painted) return painted;
  begin('mochi');
  return svgWrap('0 0 120 120', mochiBody(mood), 'width="120" height="120"');
}

function mochiBody(mood: 'happy' | 'sad' | 'wow'): string {
  const fur = '#fff5e4', fur2 = '#f6dcb8', org = '#f5a35a', orgD = '#e0843a', line = '#7a4a2e', pink = '#f7aab4', eye = '#3b2622';
  let s = '';
  s += pth('M14 122 C16 100 34 89 60 89 C86 89 104 100 106 122 Z', lg([fur, fur2]), sk(line, 2.2));
  s += pth('M20 122 C22 108 30 99 42 95 C40 106 40 114 44 122 Z', org, op(0.95));
  s += pth('M92 97 C98 102 102 110 103 122 H90 C92 112 92 104 92 97 Z', org, op(0.95));
  s += pth('M32 97 Q60 111 88 97 L86 104 Q60 118 34 104 Z', '#e0566e', sk('#a93a50', 1.2));
  s += circ(60, 111, 5.5, lg(['#ffe27a', '#e0a92a']), sk('#a8771e', 1.2)) + ln(60, 112, 60, 116, '#a8771e', 1.2) + circ(58.3, 109.3, 1.5, '#ffffff', op(0.85));
  const earTilt = mood === 'sad' ? 24 : mood === 'wow' ? -6 : 0;
  const earL = pth('M21 52 L16 13 Q17 7 23 10 L54 31 Z', org, sk(line, 2.2)) + pth('M25 43 L22 19 L45 33 Z', pink);
  s += g(earL, rot(-earTilt, 30, 42)) + g(earL, `transform="translate(120 0) scale(-1 1) rotate(${-earTilt} 30 42)"`);
  s += ell(60, 59, 46, 38, rg([fur, fur2], 0.45, 0.35, 0.72), sk(line, 2.4));
  s += g(pth('M8 56 Q12 18 60 18 Q108 18 112 56 Q98 45 84 49 Q72 35 60 45 Q48 35 36 49 Q22 45 8 56 Z', org) + pth('M50 24 L54 37 M60 22 V37 M70 24 L66 37', 'none', sk(orgD, 3.2)) + pth('M8 70 l14 -4 M8 78 l14 -6 M112 70 l-14 -4 M112 78 l-14 -6', 'none', sk(org, 3) + op(0.9)), clip(ell(60, 59, 45, 37, '#fff')));
  s += ell(60, 59, 46, 38, 'none', sk(line, 2.4));
  s += pth('M14 66 l-6 3 l6 3 M106 66 l6 3 l-6 3', 'none', sk(line, 1.8));
  const eyePair = (rx: number, ry: number, y: number, hl: number): string => {
    let e = '';
    for (const x of [42, 78]) {
      e += ell(x, y, rx, ry, rg(['#5a3a32', eye], 0.5, 0.35, 0.6));
      e += circ(x + rx * 0.35, y - ry * 0.4, rx * 0.42 * hl, '#ffffff') + circ(x - rx * 0.35, y + ry * 0.38, rx * 0.2 * hl, '#ffffff', op(0.9));
    }
    return e;
  };
  if (mood === 'happy') {
    s += eyePair(8.5, 10, 62, 1);
    s += pth('M51 75 Q60 92 69 75 Q60 80 51 75 Z', '#b8404f', sk(line, 1.6)) + ell(60, 84, 4, 2.4, '#ff8fa3');
    s += pth('M33 49 Q41 45 49 49 M71 49 Q79 45 87 49', 'none', sk(line, 1.8) + op(0.7));
  } else if (mood === 'sad') {
    s += g(eyePair(7.5, 8.8, 64, 0.8), clip(pth('M30 61.5 L54 55 V80 H30 Z M90 61.5 L66 55 V80 H90 Z', '#fff')));
    s += pth('M33.5 61 L50.5 56.4 M86.5 61 L69.5 56.4', 'none', sk(line, 1.8));
    s += pth('M33 52 L49 46 M87 52 L71 46', 'none', sk(line, 2));
    s += pth('M86 72 Q81 80 86 84 Q91 80 86 72 Z', '#8fd3ff', sk('#4f9fd6', 1)) + circ(85, 79, 1, '#ffffff');
    s += pth('M52 82 Q60 75 68 82', 'none', sk(line, 2.2));
  } else {
    s += eyePair(10, 12, 61, 1.1);
    for (const x of [42, 78]) s += sparkle(x + 3.4, 56, 3.8, '#ffffff');
    s += ell(60, 80, 4.5, 5.5, '#b8404f', sk(line, 1.6)) + ell(60, 82.5, 2.6, 1.6, '#ff8fa3');
    s += pth('M33 44 Q41 38 49 43 M71 43 Q79 38 87 44', 'none', sk(line, 1.8));
    s += sparkle(12, 22, 7, '#ffd34d') + sparkle(108, 18, 6, '#ffd34d') + sparkle(110, 92, 4.5, '#ffe9a0') + sparkle(8, 96, 4, '#ffe9a0');
  }
  s += pth('M55.5 70.5 Q60 67.5 64.5 70.5 Q60 76 55.5 70.5 Z', '#ef8695', sk('#c4485a', 1));
  if (mood !== 'happy') s += pth('M60 75 V77', 'none', sk(line, 1.2));
  s += ell(29, 77, 8, 4.5, '#ff8fa3', op(0.55)) + ell(91, 77, 8, 4.5, '#ff8fa3', op(0.55));
  s += pth('M24 72 L7 68 M24 77 L6 79 M96 72 L113 68 M96 77 L114 79', 'none', sk(line, 1.2) + op(0.6));
  return s;
}
