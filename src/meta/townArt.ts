// Mochi Bay town map: one big 2.5D (2:1 isometric) SVG, built from strings.
// Every task element is its own <g data-item> so the view can swap just that group when it changes.
// Painted images (src/art/catalog.ts, keys town/<taskId>_<style|before>) replace the vector art when present.
import { artSize, artURL } from '../art/assets.ts';
import { AREAS, taskById, WORLD_H, WORLD_W, type Area, type TownStyle, type TownTask } from './town.ts';

export interface TownState {
  /** Task id → chosen style (absent = not done yet). */
  styles: Record<string, number>;
  /** Index of the area being restored (areas after it are locked). */
  area: number;
}

/* ---------------- small helpers ---------------- */

type Pt = [number, number];
const f = (n: number) => String(Math.round(n * 10) / 10);
const P = (a: Pt[]) => a.map(([x, y]) => `${f(x)},${f(y)}`).join(' ');
const INK = '#5b3a26';
const OL = `stroke="${INK}" stroke-width="2" stroke-linejoin="round"`;
const OLt = `stroke="${INK}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"`;

function hx(c: string): [number, number, number] {
  const n = parseInt(c.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a: string, b: string, t: number): string {
  const A = hx(a), B = hx(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
const lt = (c: string, t: number) => mix(c, '#ffffff', t);
const dn = (c: string, t: number) => mix(c, '#2a1a10', t);
const grime = (c: string) => mix(c, '#8f877e', 0.62);

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
const hash = (s: string) => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0;

const poly = (a: Pt[], fill: string, ex = OL) => `<polygon points="${P(a)}" fill="${fill}" ${ex}/>`;
const circ = (x: number, y: number, r: number, fill: string, ex = OL) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" ${ex}/>`;
const ell = (x: number, y: number, rx: number, ry: number, fill: string, ex = OL) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" ${ex}/>`;
const rect = (x: number, y: number, w: number, h: number, fill: string, ex = OL) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}" ${ex}/>`;
const line = (x1: number, y1: number, x2: number, y2: number, c: string, w = 2) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const path = (d: string, fill: string, ex = OL) => `<path d="${d}" fill="${fill}" ${ex}/>`;
const shadow = (x: number, y: number, rx: number, o = 0.2) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * 0.42)}" fill="#2a3a10" opacity="${o}"/>`;

/** Ground point (u along screen right-down, v along screen left-down, z up) → screen. */
const iso = (x: number, y: number, u: number, v: number, z = 0): Pt => [x + u - v, y + (u + v) / 2 - z];
const up = (p: Pt, z: number): Pt => [p[0], p[1] - z];
/** Iso rectangle on the ground. */
const isoRect = (x: number, y: number, a: number, b: number, z = 0): Pt[] => [iso(x, y, -a, b, z), iso(x, y, a, b, z), iso(x, y, a, -b, z), iso(x, y, -a, -b, z)];

function isoBox(x: number, y: number, a: number, b: number, z0: number, z1: number, cL: string, cR: string, cT: string, ex = OL): string {
  const L = iso(x, y, -a, b), F = iso(x, y, a, b), R = iso(x, y, a, -b);
  return poly([up(L, z0), up(F, z0), up(F, z1), up(L, z1)], cL, ex) + poly([up(F, z0), up(R, z0), up(R, z1), up(F, z1)], cR, ex) +
    poly(isoRect(x, y, a, b, z1), cT, ex);
}

/** Smooth closed/open path through points (Catmull-Rom → cubic Bézier). */
function smooth(pts: Pt[], closed = false): string {
  const n = pts.length;
  const at = (i: number) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? d + 'Z' : d;
}

function weeds(x: number, y: number, s = 1, c = '#7f9a3a'): string {
  const d = `M${f(x - 7 * s)} ${f(y)}Q${f(x - 6 * s)} ${f(y - 9 * s)} ${f(x - 9 * s)} ${f(y - 14 * s)}M${f(x - 2 * s)} ${f(y)}Q${f(x)} ${f(y - 12 * s)} ${f(x - 1 * s)} ${f(y - 18 * s)}M${f(x + 3 * s)} ${f(y)}Q${f(x + 5 * s)} ${f(y - 8 * s)} ${f(x + 9 * s)} ${f(y - 12 * s)}`;
  return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${f(2.4 * s)}" stroke-linecap="round"/>`;
}

/** Shabby pile shown where a small prop will go: planks, a crate, weeds and stones. */
function junk(x: number, y: number, seed: number, s = 1): string {
  const R = rng(seed);
  let o = shadow(x, y + 2, 26 * s, 0.18);
  o += isoBox(x - 8 * s, y - 2, 9 * s, 8 * s, 0, 15 * s, '#a08a6c', '#857055', '#b39c7c');
  o += line(x - 8 * s, y - 9 * s, x + 2 * s, y - 2 * s, '#6f5a44', 1.2);
  o += poly([[x + 2 * s, y + 3], [x + 26 * s, y - 6 * s], [x + 28 * s, y - 2 * s], [x + 4 * s, y + 7]], '#9c8466');
  o += poly([[x - 26 * s, y + 4], [x - 4 * s, y + 10], [x - 6 * s, y + 13], [x - 28 * s, y + 7]], '#8e7a60');
  o += ell(x + 16 * s, y + 8, 6 * s, 4 * s, '#a7a39b');
  o += weeds(x - 20 * s + R() * 6, y + 2, 0.8 * s) + weeds(x + 20 * s, y - 2, 0.7 * s);
  return o;
}

/* ---------------- buildings ---------------- */

interface Bld { x: number; y: number; a: number; b: number; h: number; rh: number; mir: boolean }

function bldOf(area: Area, task: TownTask): Bld {
  const p = task.p ?? {};
  return {
    x: area.x + task.at[0], y: area.y + task.at[1],
    a: Number(p.a ?? 60), b: Number(p.b ?? 45), h: Number(p.h ?? 60), rh: Number(p.rh ?? 44), mir: p.face === 'R',
  };
}
const mirrorAttr = (B: Bld) => (B.mir ? ` transform="matrix(-1 0 0 1 ${f(B.x * 2)} 0)"` : '');
/** Facade (left wall) local frame: x 0..2a along the wall, y 0 at the ground, negative = up. */
const facadeFrame = (B: Bld) => { const L = iso(B.x, B.y, -B.a, B.b); return `matrix(1 .5 0 1 ${f(L[0])} ${f(L[1])})`; };
const sideFrame = (B: Bld) => { const F = iso(B.x, B.y, B.a, B.b); return `matrix(1 -.5 0 1 ${f(F[0])} ${f(F[1])})`; };
/** Facade local point → screen (accounts for mirroring). */
function facadePt(B: Bld, s: number, t: number): Pt {
  const L = iso(B.x, B.y, -B.a, B.b);
  const x = L[0] + s, y = L[1] + s * 0.5 + t;
  return [B.mir ? 2 * B.x - x : x, y];
}

function windowAt(x: number, y: number, w: number, h: number, frame: string, shutter: string | null, broken: boolean): string {
  let o = rect(x - 2, y - 2, w + 4, h + 4, frame);
  if (broken) {
    o += rect(x, y, w, h, '#4a4550', 'stroke="none"');
    o += line(x - 2, y + h * 0.2, x + w + 2, y + h * 0.7, '#9b7d58', 4) + line(x - 2, y + h * 0.75, x + w + 2, y + h * 0.3, '#8a6e4c', 4);
    return o;
  }
  o += rect(x, y, w, h, '#a9dcf2', 'stroke="none"');
  o += poly([[x, y + h * 0.65], [x + w * 0.6, y], [x + w * 0.85, y], [x, y + h * 0.95]], '#e4f6ff', 'stroke="none" opacity=".7"');
  o += line(x + w / 2, y, x + w / 2, y + h, frame, 1.6) + line(x, y + h * 0.45, x + w, y + h * 0.45, frame, 1.6);
  if (shutter) o += rect(x - 8, y - 1, 6, h + 2, shutter, OLt) + rect(x + w + 2, y - 1, 6, h + 2, shutter, OLt);
  o += rect(x - 4, y + h + 1, w + 8, 4, lt(frame, 0.2), OLt);
  return o;
}

function building(B: Bld, wall: string, roof: string, broken: boolean, opts: { shop?: boolean; chimney?: boolean }, seed: number): string {
  const R = rng(seed);
  const { x, y, a, b, h, rh } = B;
  if (broken) { wall = grime(wall); roof = mix(roof, '#6e6a66', 0.72); }
  const facadeC = B.mir ? dn(wall, 0.14) : wall, sideC = B.mir ? wall : dn(wall, 0.14);
  const roofF = roof, roofB = dn(roof, 0.28);
  const trim = broken ? '#8f8a84' : '#fffaf0';
  const L = iso(x, y, -a, b), F = iso(x, y, a, b), Rr = iso(x, y, a, -b);
  const o2 = 8, e = 11, drop = 5;
  const W = 2 * a, D = 2 * b;
  let o = shadow(x + 6, y + 6, a + b + 10, 0.16);

  // back roof slope + chimney first (farther away)
  o += poly([iso(x, y, -a - o2, -b - e, h - drop), iso(x, y, a + o2, -b - e, h - drop), iso(x, y, a + o2, 0, h + rh), iso(x, y, -a - o2, 0, h + rh)], roofB);
  if (opts.chimney) {
    const cu = -a * 0.45, cv = -b * 0.45;
    const c = iso(x, y, cu, cv);
    o += isoBox(c[0], c[1], 7, 7, h + rh * 0.4, h + rh + 18, broken ? '#8a7d72' : '#c46b4f', broken ? '#6f645b' : '#9c4f3a', broken ? '#5a514a' : '#3d2a22');
    if (!broken) o += circ(c[0] + 4, c[1] - h - rh - 34, 7, '#ffffff', 'opacity=".75"') + circ(c[0] + 12, c[1] - h - rh - 46, 9, '#ffffff', 'opacity=".55"');
  }

  // walls
  o += poly([L, F, up(F, h), up(L, h)], facadeC);
  o += poly([F, Rr, up(Rr, h), up(F, h)], sideC);
  o += poly([L, F, up(F, 8), up(L, 8)], dn(facadeC, 0.22)) + poly([F, Rr, up(Rr, 8), up(F, 8)], dn(sideC, 0.22));

  // facade details
  let fd = '';
  const two = h >= 70;
  const doorX = opts.shop ? W * 0.2 : W * 0.5 - 10;
  const doorC = broken ? '#6d6259' : dn(roof, 0.15);
  fd += `<path d="M${f(doorX)} -8V-34Q${f(doorX + 10)} -44 ${f(doorX + 20)} -34V-8Z" fill="${doorC}" ${OL}/>`;
  if (broken) fd += line(doorX - 2, -30, doorX + 22, -18, '#9b7d58', 4) + line(doorX - 2, -16, doorX + 22, -26, '#8a6e4c', 4);
  else fd += circ(doorX + 15, -20, 1.8, '#f2c94c', 'stroke="none"') + rect(doorX - 3, -9, 26, 3, '#d9cfc0', OLt);
  if (opts.shop) {
    const sx = W * 0.38, sw = W * 0.52;
    fd += windowAt(sx, -36, sw, 24, trim, null, broken);
    if (!broken) fd += rect(sx + 4, -16, sw - 8, 4, '#e3a15a', 'stroke="none" opacity=".8"');
  } else {
    fd += windowAt(W * 0.14, -36, 18, 20, trim, broken ? null : roof, broken);
    fd += windowAt(W * 0.86 - 18, -36, 18, 20, trim, broken ? null : roof, broken);
  }
  if (two) {
    const n = Math.max(2, Math.floor(W / 40));
    for (let i = 0; i < n; i++) fd += windowAt(((i + 0.5) / n) * W - 8, -h + 14, 16, 20, trim, broken ? null : roof, broken);
    fd += rect(0, -50, W, 5, dn(facadeC, 0.12), 'stroke="none"');
  }
  if (broken) {
    fd += `<path d="M${f(W * 0.3)} ${-h + 4}l6 12-5 8 7 10M${f(W * 0.75)} -10l-4-10 5-7" fill="none" stroke="#5b4a3e" stroke-width="1.4"/>`;
    fd += `<path d="M${f(W * 0.6)} ${-h + 2}h${f(W * 0.25)}v14q-${f(W * 0.12)} 8-${f(W * 0.25)} 0z" fill="#6d665e" opacity=".35"/>`;
  }
  o += `<g transform="${facadeFrame(B)}">${fd}</g>`;

  // side wall details + gable
  let sd = poly([[0, -h], [D, -h], [D / 2, -h - rh]], sideC);
  const ns = Math.max(1, Math.floor(D / 44));
  for (let i = 0; i < ns; i++) sd += windowAt(((i + 0.5) / ns) * D - 8, two ? -h + 14 : -36, 16, 20, trim, null, broken);
  sd += circ(D / 2, -h - rh * 0.42, 6, broken ? '#4a4550' : '#a9dcf2');
  o += `<g transform="${sideFrame(B)}">${sd}</g>`;

  // front roof slope with tile rows and barge board
  const e0: Pt = iso(x, y, -a - o2, b + e, h - drop), e1: Pt = iso(x, y, a + o2, b + e, h - drop);
  const r0: Pt = iso(x, y, -a - o2, 0, h + rh), r1: Pt = iso(x, y, a + o2, 0, h + rh);
  o += poly([e0, e1, r1, r0], roofF);
  let rows = '';
  for (let k = 1; k < 5; k++) {
    const t = k / 5;
    rows += `M${f(e0[0] + (r0[0] - e0[0]) * t)} ${f(e0[1] + (r0[1] - e0[1]) * t)}L${f(e1[0] + (r1[0] - e1[0]) * t)} ${f(e1[1] + (r1[1] - e1[1]) * t)}`;
  }
  o += `<path d="${rows}" stroke="${dn(roofF, 0.25)}" stroke-width="1.6" fill="none"/>`;
  if (broken) {
    for (let k = 0; k < 3; k++) {
      const t = 0.2 + R() * 0.6, s = 0.25 + R() * 0.5;
      const px = e0[0] + (e1[0] - e0[0]) * t + (r0[0] - e0[0]) * s, py = e0[1] + (e1[1] - e0[1]) * t + (r0[1] - e0[1]) * s;
      o += poly([[px - 9, py], [px, py - 6], [px + 10, py - 1], [px + 2, py + 6]], '#3c3330', 'stroke="none"');
    }
  }
  const g1 = iso(x, y, a + o2, -b - e, h - drop);
  o += `<path d="M${f(e1[0])} ${f(e1[1])}L${f(r1[0])} ${f(r1[1])}L${f(g1[0])} ${f(g1[1])}" fill="none" stroke="${trim}" stroke-width="5" stroke-linejoin="round"/>`;
  o += `<path d="M${f(e1[0])} ${f(e1[1])}L${f(r1[0])} ${f(r1[1])}L${f(g1[0])} ${f(g1[1])}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`;
  o += line(r0[0], r0[1], r1[0], r1[1], dn(roofF, 0.35), 4);

  if (broken) o += weeds(L[0] + 14, L[1] + 7, 1) + weeds(F[0] - 6, F[1] + 2, 1.1) + weeds(Rr[0] - 12, Rr[1] + 4, 0.9);
  else o += bush(L[0] + 10, L[1] + 8, '#6fb85a') + bush(Rr[0] - 10, Rr[1] + 6, '#5fa84e');
  return B.mir ? `<g${mirrorAttr(B)}>${o}</g>` : o;
}

function bush(x: number, y: number, c: string, s = 1): string {
  return circ(x - 7 * s, y - 6 * s, 7 * s, dn(c, 0.1)) + circ(x + 6 * s, y - 6 * s, 7 * s, dn(c, 0.05)) + circ(x, y - 11 * s, 8 * s, c) + circ(x - 2 * s, y - 13 * s, 3 * s, lt(c, 0.35), 'stroke="none"');
}

/* ---------------- flat surfaces ---------------- */

function surfaceBase(x: number, y: number, a: number, b: number, c: string): string {
  return poly(isoRect(x, y + 5, a, b), dn(c, 0.3)) + poly(isoRect(x, y, a, b), c);
}

function paving(x: number, y: number, a: number, b: number, st: TownStyle | null, seed: number): string {
  const R = rng(seed);
  if (!st) {
    // muddy lot with puddles, stones and weeds
    let o = surfaceBase(x, y, a, b, '#b49a72');
    for (let i = 0; i < 6; i++) {
      const u = (R() * 2 - 1) * a * 0.8, v = (R() * 2 - 1) * b * 0.8, p = iso(x, y, u, v);
      o += i < 3 ? ell(p[0], p[1], 16 + R() * 14, 7 + R() * 5, '#8fa3ad', 'stroke="#7d6a50" stroke-width="1.4" opacity=".85"') : ell(p[0], p[1], 20 + R() * 12, 8 + R() * 4, '#a08660', 'stroke="none"');
    }
    for (let i = 0; i < 9; i++) {
      const p = iso(x, y, (R() * 2 - 1) * a * 0.9, (R() * 2 - 1) * b * 0.9);
      o += i % 3 ? weeds(p[0], p[1], 0.8 + R() * 0.4) : ell(p[0], p[1], 5, 3.4, '#a7a39b', OLt);
    }
    return o;
  }
  const c = st.swatch, pat = st.alt ?? 'cobble';
  let o = surfaceBase(x, y, a, b, c);
  let d = '';
  if (pat === 'brick' || pat === 'planks') {
    const step = pat === 'brick' ? 12 : 14, len = pat === 'brick' ? 24 : 60;
    let row = 0;
    for (let v = -b + step; v < b; v += step, row++) {
      const p0 = iso(x, y, -a, v), p1 = iso(x, y, a, v);
      d += `M${f(p0[0])} ${f(p0[1])}L${f(p1[0])} ${f(p1[1])}`;
    }
    row = 0;
    for (let v = -b; v < b - 1; v += step, row++) {
      for (let u = -a + (row % 2 ? len / 2 : len); u < a; u += len) {
        const p0 = iso(x, y, u, v), p1 = iso(x, y, u, Math.min(b, v + step));
        d += `M${f(p0[0])} ${f(p0[1])}L${f(p1[0])} ${f(p1[1])}`;
      }
    }
    o += `<path d="${d}" stroke="${dn(c, 0.3)}" stroke-width="1.5" fill="none"/>`;
  } else if (pat === 'lawn') {
    for (let k = 0; k < 2 * a / 26; k += 2) {
      const u0 = -a + k * 26, u1 = Math.min(a, u0 + 26);
      d += `M${P([iso(x, y, u0, -b), iso(x, y, u1, -b), iso(x, y, u1, b), iso(x, y, u0, b)]).replace(/ /g, 'L')}Z`;
    }
    o += `<path d="${d}" fill="${lt(c, 0.16)}"/>`;
    let tufts = '';
    for (let i = 0; i < 26; i++) {
      const p = iso(x, y, (R() * 2 - 1) * a * 0.92, (R() * 2 - 1) * b * 0.92);
      tufts += `M${f(p[0] - 3)} ${f(p[1])}l2-5 1 5 2-6 1 6`;
    }
    o += `<path d="${tufts}" stroke="${dn(c, 0.25)}" stroke-width="1.2" fill="none"/>`;
    if (st.swatch === '#a6d872') for (let i = 0; i < 30; i++) { const p = iso(x, y, (R() * 2 - 1) * a * 0.9, (R() * 2 - 1) * b * 0.9); o += circ(p[0], p[1], 2.4, ['#ffffff', '#f6d34a', '#ef8fa8', '#b99ae8'][i % 4], 'stroke="none"'); }
  } else if (pat === 'gravel') {
    for (let i = 0; i < 90; i++) {
      const p = iso(x, y, (R() * 2 - 1) * a * 0.95, (R() * 2 - 1) * b * 0.95);
      d += `M${f(p[0] - 2.5)} ${f(p[1])}l2.5-1.5 2.5 1.5-2.5 1.5z`;
    }
    o += `<path d="${d}" fill="${dn(c, 0.22)}"/>`;
  } else {
    // cobblestones: small rounded iso diamonds
    const step = 15;
    for (let u = -a + step / 2; u < a; u += step) for (let v = -b + step / 2; v < b; v += step) {
      const p = iso(x, y, u + (R() - 0.5) * 3, v + (R() - 0.5) * 3), s = 6;
      d += `M${f(p[0] - s)} ${f(p[1])}Q${f(p[0] - s)} ${f(p[1] - s / 2)} ${f(p[0])} ${f(p[1] - s / 2)}Q${f(p[0] + s)} ${f(p[1] - s / 2)} ${f(p[0] + s)} ${f(p[1])}Q${f(p[0] + s)} ${f(p[1] + s / 2)} ${f(p[0])} ${f(p[1] + s / 2)}Q${f(p[0] - s)} ${f(p[1] + s / 2)} ${f(p[0] - s)} ${f(p[1])}Z`;
    }
    o += `<path d="${d}" fill="${lt(c, 0.18)}" stroke="${dn(c, 0.22)}" stroke-width="1"/>`;
  }
  // light border
  o += `<polygon points="${P(isoRect(x, y, a - 4, b - 4))}" fill="none" stroke="${lt(c, 0.35)}" stroke-width="3" opacity=".7"/>`;
  return o;
}

function sandLot(x: number, y: number, a: number, b: number, done: boolean, seed: number): string {
  const R = rng(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < 12; i++) {
    const ang = (i / 12) * Math.PI * 2, k = 0.92 + R() * 0.16;
    pts.push(iso(x, y, Math.cos(ang) * a * 1.15 * k, Math.sin(ang) * b * 1.15 * k));
  }
  let o = path(smooth(pts, true), done ? '#f7e3a8' : '#d8c497', 'stroke="none"');
  if (!done) {
    for (let i = 0; i < 5; i++) { const p = iso(x, y, (R() * 2 - 1) * a * 0.8, (R() * 2 - 1) * b * 0.8); o += path(`M${f(p[0] - 22)} ${f(p[1])}q10-12 22-4 14-8 22 4q-20 10-44 0z`, '#5f7a3a'); }
    for (let i = 0; i < 4; i++) { const p = iso(x, y, (R() * 2 - 1) * a * 0.8, (R() * 2 - 1) * b * 0.8); o += rect(p[0] - 5, p[1] - 6, 10, 7, ['#8fa3ad', '#c96a4a', '#7fae6a', '#e4dccb'][i], OLt); }
    for (let i = 0; i < 3; i++) { const p = iso(x, y, (R() * 2 - 1) * a * 0.7, (R() * 2 - 1) * b * 0.7); o += isoBox(p[0], p[1], 7, 7, 0, 10, '#9c8a70', '#806f58', '#ab9a80'); }
    return o;
  }
  for (let i = 0; i < 10; i++) {
    const p = iso(x, y, (R() * 2 - 1) * a * 0.85, (R() * 2 - 1) * b * 0.85);
    o += i % 3 === 0 ? star5(p[0], p[1], 5, '#f08a5a') : path(`M${f(p[0] - 5)} ${f(p[1])}q5-9 10 0z`, ['#ffd6c4', '#fff3e0'][i % 2], OLt);
  }
  return o;
}

function star5(x: number, y: number, r: number, c: string): string {
  const pts: Pt[] = [];
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
  return poly(pts, c, OLt);
}

/* ---------------- props ---------------- */

function tree(x: number, y: number, canopy: string, fruit: string | null, s = 1, seed = 1): string {
  const R = rng(seed);
  let o = shadow(x, y, 26 * s);
  o += path(`M${f(x - 5 * s)} ${f(y)}L${f(x - 3 * s)} ${f(y - 34 * s)}L${f(x + 3 * s)} ${f(y - 34 * s)}L${f(x + 5 * s)} ${f(y)}Z`, '#9a6a40');
  o += circ(x - 17 * s, y - 40 * s, 17 * s, dn(canopy, 0.12)) + circ(x + 17 * s, y - 42 * s, 18 * s, dn(canopy, 0.15));
  o += circ(x, y - 56 * s, 25 * s, canopy);
  o += circ(x - 8 * s, y - 64 * s, 8 * s, lt(canopy, 0.3), 'stroke="none"');
  if (fruit) for (let i = 0; i < 7; i++) { const a = R() * Math.PI * 2, d = R() * 22 * s; o += circ(x + Math.cos(a) * d, y - 50 * s + Math.sin(a) * d * 0.7, 3.4 * s, fruit, OLt); }
  return o;
}

function deadTree(x: number, y: number, s = 1): string {
  let o = shadow(x, y, 18 * s, 0.14);
  o += path(`M${f(x - 5 * s)} ${f(y)}L${f(x - 3 * s)} ${f(y - 46 * s)}L${f(x + 3 * s)} ${f(y - 46 * s)}L${f(x + 5 * s)} ${f(y)}Z`, '#8a7a68');
  o += `<path d="M${f(x)} ${f(y - 30 * s)}l-16-16m16 6 14-18m-14 2-4-16m-8 10-8-2m22-4 8-2" stroke="#7a6a58" stroke-width="${f(3 * s)}" stroke-linecap="round" fill="none"/>`;
  return o + weeds(x + 10 * s, y + 2, 0.8);
}

function pine(x: number, y: number, c: string, s = 1, snow = false): string {
  let o = shadow(x, y, 18 * s);
  o += rect(x - 3 * s, y - 14 * s, 6 * s, 14 * s, '#8a5a35');
  for (let k = 0; k < 3; k++) {
    const by = y - 10 * s - k * 18 * s, w = (24 - k * 6) * s;
    o += poly([[x - w, by], [x + w, by], [x, by - 30 * s]], k % 2 ? dn(c, 0.08) : c);
    if (snow) o += poly([[x - w * 0.35, by - 19 * s], [x + w * 0.35, by - 19 * s], [x, by - 30 * s]], '#ffffff', OLt);
  }
  return o;
}

function palm(x: number, y: number, leaf: string, s = 1, mirror = false): string {
  const k = mirror ? -1 : 1;
  let o = shadow(x + 10 * k, y, 22 * s);
  o += path(`M${f(x - 5 * s)} ${f(y)}Q${f(x + 2 * k * s)} ${f(y - 40 * s)} ${f(x + 14 * k * s)} ${f(y - 74 * s)}L${f(x + 20 * k * s)} ${f(y - 72 * s)}Q${f(x + 10 * k * s)} ${f(y - 40 * s)} ${f(x + 5 * s)} ${f(y)}Z`, '#b98a55');
  const tx = x + 17 * k * s, ty = y - 74 * s;
  for (const [dx, dy] of [[-30, 6], [30, 8], [-22, -14], [24, -16], [0, -24]]) {
    o += path(`M${f(tx)} ${f(ty)}Q${f(tx + dx * 0.5 * s)} ${f(ty + (dy - 16) * s)} ${f(tx + dx * s)} ${f(ty + dy * s + 10 * s)}Q${f(tx + dx * 0.55 * s)} ${f(ty + (dy - 4) * s)} ${f(tx)} ${f(ty)}Z`, leaf);
  }
  o += circ(tx - 3 * s, ty + 4 * s, 4 * s, '#7a5230') + circ(tx + 4 * s, ty + 5 * s, 4 * s, '#6a4526');
  return o;
}

function bench(x: number, y: number, c: string | null): string {
  if (!c) {
    let o = shadow(x, y, 26, 0.14);
    o += poly([[x - 24, y - 4], [x + 6, y - 14], [x + 8, y - 10], [x - 22, y]], '#8e8276');
    o += line(x + 14, y, x + 18, y - 16, '#6f665e', 3) + line(x - 20, y + 2, x - 18, y - 6, '#6f665e', 3);
    return o + weeds(x + 22, y + 2, 0.7);
  }
  let o = shadow(x, y, 28);
  o += line(x - 20, y, x - 20, y - 12, dn(c, 0.4), 3) + line(x + 20, y, x + 20, y - 12, dn(c, 0.4), 3);
  o += rect(x - 26, y - 34, 52, 6, c) + rect(x - 26, y - 26, 52, 6, c);
  o += poly([[x - 28, y - 12], [x + 28, y - 12], [x + 24, y - 18], [x - 24, y - 18]], lt(c, 0.15));
  o += line(x - 22, y - 18, x - 22, y - 34, dn(c, 0.4), 3) + line(x + 22, y - 18, x + 22, y - 34, dn(c, 0.4), 3);
  return o;
}

function lampPost(x: number, y: number, c: string | null, glow = true): string {
  if (!c) {
    let o = shadow(x, y, 10, 0.14);
    o += `<path d="M${x} ${y}L${x + 2} ${y - 30}Q${x + 6} ${y - 40} ${x + 18} ${y - 38}" fill="none" stroke="#6f665e" stroke-width="4" stroke-linecap="round"/>`;
    return o + poly([[x + 14, y - 34], [x + 24, y - 34], [x + 22, y - 26], [x + 16, y - 26]], '#7f7a74') + weeds(x - 6, y + 2, 0.7);
  }
  let o = shadow(x, y, 10);
  if (glow) o += circ(x, y - 58, 20, '#ffe9a0', 'opacity=".35"');
  o += rect(x - 6, y - 8, 12, 8, dn(c, 0.15)) + rect(x - 2.5, y - 52, 5, 46, c);
  o += poly([[x - 9, y - 52], [x + 9, y - 52], [x + 7, y - 66], [x - 7, y - 66]], '#fff3b8');
  o += poly([[x - 11, y - 66], [x + 11, y - 66], [x, y - 76]], c);
  return o + rect(x - 10, y - 54, 20, 3, c);
}

function fenceRun(x: number, y: number, len: number, dir: string, c: string | null, seed: number): string {
  const R = rng(seed);
  const pt = (k: number): Pt => (dir === 'u' ? iso(x, y, k - len / 2, 0) : iso(x, y, 0, k - len / 2));
  const color = c ?? '#958a7e';
  let o = '';
  const posts = Math.round(len / 14);
  let rail = '';
  for (let i = 0; i <= posts; i++) {
    const p = pt((i / posts) * len);
    if (!c && R() < 0.35) { o += line(p[0], p[1], p[0] + 8, p[1] + 3, dn(color, 0.2), 4); continue; }
    const tilt = c ? 0 : (R() - 0.5) * 8;
    o += `<path d="M${f(p[0] - 3)} ${f(p[1] + 1)}L${f(p[0] - 3 + tilt)} ${f(p[1] - 20)}L${f(p[0] + tilt)} ${f(p[1] - 24)}L${f(p[0] + 3 + tilt)} ${f(p[1] - 20)}L${f(p[0] + 3)} ${f(p[1] + 1)}Z" fill="${color}" ${OLt}/>`;
  }
  const a0 = pt(0), a1 = pt(len);
  if (c) rail = line(a0[0], a0[1] - 8, a1[0], a1[1] - 8, dn(color, 0.12), 3) + line(a0[0], a0[1] - 16, a1[0], a1[1] - 16, dn(color, 0.12), 3);
  else rail = line(a0[0], a0[1] - 10, (a0[0] + a1[0]) / 2, (a0[1] + a1[1]) / 2 - 4, dn(color, 0.2), 3);
  return rail + o;
}

function vegPatch(x: number, y: number, a: number, b: number, crop: string | null, seed: number): string {
  const R = rng(seed);
  let o = surfaceBase(x, y, a, b, crop ? '#8a5a3a' : '#a08a6a');
  if (!crop) {
    for (let i = 0; i < 7; i++) { const p = iso(x, y, (R() * 2 - 1) * a * 0.8, (R() * 2 - 1) * b * 0.8); o += weeds(p[0], p[1], 0.9, '#9a9a4a'); }
    return o;
  }
  for (let v = -b + 10; v < b; v += 15) {
    const p0 = iso(x, y, -a + 6, v), p1 = iso(x, y, a - 6, v);
    o += line(p0[0], p0[1], p1[0], p1[1], '#6e4528', 3);
    for (let u = -a + 12; u < a - 6; u += 16) {
      const p = iso(x, y, u, v);
      o += path(`M${f(p[0])} ${f(p[1])}l-5-9 5 3 5-3z`, '#5fae4a', OLt) + circ(p[0], p[1] - 1, 3.2, crop, OLt);
    }
  }
  return o;
}

function flowerBed(x: number, y: number, c: string | null, seed: number, rx = 40): string {
  const R = rng(seed);
  let o = ell(x, y + 3, rx, rx * 0.5, '#b7aa98') + ell(x, y, rx - 4, rx * 0.5 - 4, c ? '#7a4f30' : '#9a8566', 'stroke="none"');
  if (!c) { for (let i = 0; i < 5; i++) o += weeds(x + (R() * 2 - 1) * rx * 0.6, y + (R() * 2 - 1) * rx * 0.2, 0.9, '#8f9445'); return o; }
  for (let i = 0; i < 14; i++) {
    const a = R() * Math.PI * 2, d = Math.sqrt(R()) * (rx - 10);
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * 0.45;
    o += circ(px, py - 4, 6, i % 4 === 0 ? '#5fae4a' : c, OLt) + (i % 4 ? circ(px, py - 4, 2, '#fff2a8', 'stroke="none"') : '');
  }
  return o;
}

function tables(x: number, y: number, c: string | null): string {
  if (!c) return junk(x, y, 11);
  let o = '';
  for (const [dx, dy] of [[-30, -10], [26, 14]]) {
    const tx = x + dx, ty = y + dy;
    o += shadow(tx, ty, 24);
    o += rect(tx - 20, ty - 18, 8, 16, '#c99a62', OLt) + rect(tx + 12, ty - 18, 8, 16, '#c99a62', OLt);
    o += line(tx, ty, tx, ty - 16, '#6f5a44', 3) + ell(tx, ty - 17, 14, 6, '#fffaf0');
    o += line(tx, ty - 17, tx, ty - 52, '#6f5a44', 2.4);
    o += path(`M${tx - 26} ${ty - 44}Q${tx} ${ty - 64} ${tx + 26} ${ty - 44}Z`, c);
    o += path(`M${tx - 9} ${ty - 47}Q${tx} ${ty - 60} ${tx + 9} ${ty - 47}Z`, '#fffaf0', 'stroke="none" opacity=".85"');
  }
  return o;
}

function cart(x: number, y: number, c: string | null): string {
  if (!c) return junk(x, y, 21) + circ(x + 20, y - 4, 9, 'none', `stroke="#6f665e" stroke-width="3"`);
  let o = shadow(x, y, 34);
  o += isoBox(x, y - 10, 26, 14, 0, 22, c, dn(c, 0.15), lt(c, 0.2));
  o += circ(x - 14, y + 2, 9, '#6f4a2c') + circ(x - 14, y + 2, 3, '#e8c27a') + circ(x + 20, y - 4, 8, '#6f4a2c');
  o += line(x - 22, y - 32, x - 22, y - 58, '#8a5a35', 2.4) + line(x + 26, y - 32, x + 26, y - 58, '#8a5a35', 2.4);
  o += path(`M${x - 30} ${y - 56}L${x + 34} ${y - 58}L${x + 30} ${y - 46}Q${x + 2} ${y - 40} ${x - 26} ${y - 44}Z`, lt(c, 0.5));
  for (let i = 0; i < 4; i++) o += ell(x - 14 + i * 9, y - 36 - (i % 2) * 2, 6, 4, '#e3a15a', OLt);
  return o;
}

function planters(x: number, y: number, c: string | null): string {
  let o = '';
  for (const [dx, dy] of [[-32, -6], [32, 10]]) {
    const px = x + dx, py = y + dy;
    o += isoBox(px, py, 18, 7, 0, 12, c ? '#b07a48' : '#8e8276', c ? '#8a5a35' : '#706660', c ? '#6e4528' : '#9a8f84');
    if (c) for (let i = 0; i < 5; i++) o += circ(px - 16 + i * 8, py - 16 + (i % 2) * 3, 5, i % 2 ? c : '#5fae4a', OLt);
    else o += weeds(px, py - 10, 0.7, '#8f9445');
  }
  return o;
}

function mailbox(x: number, y: number, c: string | null): string {
  if (!c) return shadow(x, y, 12, 0.14) + line(x, y, x + 6, y - 22, '#6f665e', 4) + rect(x - 14, y - 6, 18, 9, '#8a8078', OLt) + weeds(x + 8, y + 2, 0.7);
  return shadow(x, y, 12) + rect(x - 2, y - 26, 4, 26, '#8a5a35', OLt) + path(`M${x - 12} ${y - 24}V${y - 38}Q${x - 12} ${y - 46} ${x - 2} ${y - 46}H${x + 4}Q${x + 14} ${y - 46} ${x + 14} ${y - 38}V${y - 24}Z`, c) +
    line(x + 10, y - 40, x + 10, y - 54, INK, 1.6) + rect(x + 10, y - 54, 9, 6, '#f2c94c', OLt);
}

function umbrella(x: number, y: number, c: string, s = 1): string {
  let o = shadow(x + 6, y, 26 * s, 0.16);
  o += line(x, y, x + 4 * s, y - 52 * s, '#8a5a35', 2.4);
  const cx = x + 4 * s, cy = y - 50 * s;
  o += path(`M${f(cx - 30 * s)} ${f(cy + 8 * s)}Q${f(cx)} ${f(cy - 22 * s)} ${f(cx + 30 * s)} ${f(cy + 8 * s)}Z`, c);
  o += path(`M${f(cx - 10 * s)} ${f(cy + 5 * s)}Q${f(cx)} ${f(cy - 13 * s)} ${f(cx + 10 * s)} ${f(cy + 5 * s)}Z`, '#fffaf0', 'stroke="none"');
  return o;
}

function lounger(x: number, y: number, c: string): string {
  return shadow(x, y, 24, 0.14) + poly([[x - 24, y - 4], [x + 8, y - 4], [x + 24, y - 20], [x + 18, y - 22], [x + 4, y - 10], [x - 24, y - 10]], c) +
    line(x - 20, y - 4, x - 20, y + 2, '#8a5a35', 2) + line(x + 6, y - 4, x + 6, y + 2, '#8a5a35', 2) + rect(x - 18, y - 13, 18, 4, lt(c, 0.5), OLt);
}

function hut(x: number, y: number, c1: string, c2: string, broken: boolean): string {
  const B: Bld = { x, y, a: 18, b: 16, h: 34, rh: 18, mir: false };
  if (broken) { c1 = grime(c1); c2 = grime(c2); }
  let o = poly([iso(x, y, -B.a - 4, 0, B.h + B.rh), iso(x, y, B.a + 4, 0, B.h + B.rh), iso(x, y, B.a + 4, -B.b - 5, B.h - 2), iso(x, y, -B.a - 4, -B.b - 5, B.h - 2)], dn(c2, 0.25));
  const L = iso(x, y, -B.a, B.b), F = iso(x, y, B.a, B.b), R = iso(x, y, B.a, -B.b);
  o += poly([L, F, up(F, B.h), up(L, B.h)], c1) + poly([F, R, up(R, B.h), up(F, B.h)], dn(c1, 0.15));
  let fd = '';
  for (let s = 6; s < 2 * B.a; s += 12) fd += rect(s, -B.h, 5, B.h, c2, 'stroke="none" opacity=".8"');
  fd += rect(B.a - 7, -24, 14, 22, broken ? '#5b5048' : dn(c2, 0.3), OLt);
  if (broken) fd += line(B.a - 9, -20, B.a + 9, -10, '#9b7d58', 3);
  o += `<g transform="${facadeFrame(B)}">${fd}</g>`;
  o += `<g transform="${sideFrame(B)}">${poly([[0, -B.h], [2 * B.b, -B.h], [B.b, -B.h - B.rh]], dn(c1, 0.15))}</g>`;
  o += poly([iso(x, y, -B.a - 4, B.b + 5, B.h - 2), iso(x, y, B.a + 4, B.b + 5, B.h - 2), iso(x, y, B.a + 4, 0, B.h + B.rh), iso(x, y, -B.a - 4, 0, B.h + B.rh)], c2);
  if (broken) o += poly([iso(x, y, -4, 8, B.h + 6), iso(x, y, 8, 8, B.h + 6), iso(x, y, 4, 2, B.h + 12)], '#3c3330', 'stroke="none"');
  return o;
}

function lifeguard(x: number, y: number, c: string | null): string {
  const col = c ?? '#8e8276', wood = c ? '#c99a62' : '#8e8276';
  let o = shadow(x, y, 26, 0.16);
  o += line(x - 16, y, x - 10, y - 40, wood, 4) + line(x + 16, y, x + 10, y - 40, wood, 4) + line(x - 14, y - 14, x + 14, y - 26, wood, 2.4);
  o += line(x + 20, y + 2, x + 6, y - 40, wood, 2.4) + line(x + 24, y - 2, x + 10, y - 44, wood, 2.4);
  o += isoBox(x, y - 44, 16, 14, 0, 20, lt(col, 0.1), dn(col, 0.1), '#fffaf0');
  o += poly([iso(x, y - 44, -20, 18, 22), iso(x, y - 44, 20, 18, 22), iso(x, y - 44, 20, -18, 22), iso(x, y - 44, -20, -18, 22), iso(x, y - 44, 0, 0, 40)].slice(0, 4), c ? '#fffaf0' : '#a7a39b');
  o += poly([iso(x, y - 44, -20, 18, 22), iso(x, y - 44, 20, 18, 22), iso(x, y - 44, 0, 0, 38)], c ? col : '#7f7a74');
  if (c) o += line(x + 18, y - 70, x + 18, y - 100, INK, 1.6) + poly([[x + 18, y - 100], [x + 34, y - 95], [x + 18, y - 90]], c, OLt);
  else o += weeds(x - 20, y + 2, 0.8);
  return o;
}

function volley(x: number, y: number, c: string | null): string {
  const p0 = iso(x, y, -40, 0), p1 = iso(x, y, 40, 0);
  if (!c) return line(p0[0], p0[1], p0[0] + 4, p0[1] - 30, '#8e8276', 4) + line(p1[0], p1[1], p1[0] + 14, p1[1] - 8, '#8e8276', 4) + junk(x, y + 10, 31, 0.7);
  let o = line(p0[0], p0[1], p0[0], p0[1] - 44, '#8a5a35', 4) + line(p1[0], p1[1], p1[0], p1[1] - 44, '#8a5a35', 4);
  o += poly([[p0[0], p0[1] - 42], [p1[0], p1[1] - 42], [p1[0], p1[1] - 26], [p0[0], p0[1] - 26]], c, `stroke="${INK}" stroke-width="1.4" fill-opacity=".45"`);
  let d = '';
  for (let k = 1; k < 8; k++) { const t = k / 8; d += `M${f(p0[0] + (p1[0] - p0[0]) * t)} ${f(p0[1] + (p1[1] - p0[1]) * t - 42)}v16`; }
  o += `<path d="${d}" stroke="${dn(c, 0.3)}" stroke-width="1"/>` + line(p0[0], p0[1] - 42, p1[0], p1[1] - 42, '#fffaf0', 3);
  return o + circ(x + 16, y + 20, 7, '#fff6d6') + path(`M${x + 10} ${y + 18}q6 4 12 0`, 'none', `stroke="${INK}" stroke-width="1"`);
}

function castle(x: number, y: number, c: string | null): string {
  const sand = '#e9cf8e';
  if (!c) return ell(x, y, 26, 11, '#cdb57e', OLt) + ell(x - 6, y - 4, 10, 6, '#d8c08a', OLt) + rect(x + 8, y - 8, 10, 8, '#d9473b', OLt);
  let o = shadow(x, y, 30, 0.14);
  o += rect(x - 22, y - 18, 44, 18, sand) + rect(x - 28, y - 30, 14, 30, sand) + rect(x + 14, y - 30, 14, 30, sand) + rect(x - 8, y - 38, 16, 22, lt(sand, 0.15));
  o += path(`M${x - 4} ${y}v-8q4-6 8 0v8z`, '#b8955a');
  o += line(x, y - 38, x, y - 56, INK, 1.6) + poly([[x, y - 56], [x + 14, y - 51], [x, y - 46]], c, OLt);
  return o + path(`M${x - 34} ${y + 6}q10-4 20 0`, 'none', 'stroke="#ffffff" stroke-width="2"');
}

function stall(x: number, y: number, c: string | null, goods: string, seed: number): string {
  if (!c) return junk(x, y, seed) + line(x - 22, y - 2, x - 18, y - 30, '#7f7a74', 3);
  const R = rng(seed);
  let o = shadow(x, y, 34);
  o += isoBox(x, y, 26, 12, 0, 20, '#c99a62', '#a87b48', '#e8c78f');
  const gc = goods === 'fish' ? ['#9cc3dd', '#7fa9c8', '#c6dbe8'] : goods === 'flowers' ? ['#ef8fa8', '#f6d34a', '#b99ae8', '#ffffff'] : ['#e24b3f', '#f39a3a', '#f2d33c', '#8fd16a'];
  for (let i = 0; i < 9; i++) {
    const p = iso(x, y, -20 + (i % 5) * 10, -6 + Math.floor(i / 5) * 9, 22);
    o += goods === 'fish' ? ell(p[0], p[1], 6, 2.6, gc[i % 3], OLt) : circ(p[0], p[1] - 1, 4 + R(), gc[i % gc.length], OLt);
  }
  const L = iso(x, y, -26, 14), F = iso(x, y, 26, 14), Rr = iso(x, y, 26, -14);
  o += line(L[0], L[1], L[0], L[1] - 54, '#8a5a35', 3) + line(F[0], F[1], F[0], F[1] - 54, '#8a5a35', 3) + line(Rr[0], Rr[1] - 18, Rr[0], Rr[1] - 54, '#8a5a35', 3);
  const top = (u: number, v: number, z: number) => iso(x, y, u, v, z);
  o += poly([top(-30, 18, 50), top(30, 18, 50), top(30, -18, 62), top(-30, -18, 62)], c);
  let st = '';
  for (let k = 0; k < 6; k += 2) st += `M${P([top(-30 + k * 10, 18, 50), top(-20 + k * 10, 18, 50), top(-20 + k * 10, -18, 62), top(-30 + k * 10, -18, 62)]).replace(/ /g, 'L')}Z`;
  o += `<path d="${st}" fill="#fffaf0" opacity=".9"/>`;
  let val = '';
  for (let k = 0; k < 6; k++) { const a = top(-30 + k * 10, 18, 50), b = top(-20 + k * 10, 18, 50); val += `M${f(a[0])} ${f(a[1])}Q${f((a[0] + b[0]) / 2)} ${f((a[1] + b[1]) / 2 + 9)} ${f(b[0])} ${f(b[1])}`; }
  return o + `<path d="${val}" fill="${c}" ${OLt}/>`;
}

function crates(x: number, y: number, c: string | null): string {
  if (!c) return junk(x, y, 41);
  let o = shadow(x, y, 30);
  o += isoBox(x - 12, y, 11, 11, 0, 16, '#c99a62', '#a87b48', '#7a5230') + isoBox(x + 14, y + 4, 11, 11, 0, 16, '#c99a62', '#a87b48', '#7a5230') + isoBox(x, y - 4, 11, 11, 16, 32, '#c99a62', '#a87b48', '#7a5230');
  for (const [dx, dy] of [[-12, -16], [14, -12], [0, -36]]) for (let i = 0; i < 3; i++) o += circ(x + dx - 5 + i * 5, y + dy - (i % 2) * 2, 4, c, OLt);
  return o;
}

function clock(x: number, y: number, c: string | null): string {
  if (!c) return shadow(x, y, 12, 0.14) + line(x, y, x + 16, y - 50, '#6f665e', 5) + circ(x + 24, y - 4, 10, '#d9d2c4') + weeds(x - 8, y + 2, 0.8);
  let o = shadow(x, y, 14) + rect(x - 8, y - 10, 16, 10, dn(c, 0.15)) + rect(x - 3, y - 72, 6, 64, c);
  o += circ(x, y - 80, 14, c) + circ(x, y - 80, 10, '#fffaf0', OLt) + line(x, y - 80, x, y - 87, INK, 1.6) + line(x, y - 80, x + 5, y - 78, INK, 1.6);
  return o + poly([[x - 6, y - 94], [x + 6, y - 94], [x, y - 102]], c, OLt);
}

function stringLights(x: number, y: number, len: number, c: string | null, bunting: boolean): string {
  const p0: Pt = iso(x, y, -len / 2, 0), p1: Pt = iso(x, y, len / 2, 0);
  const pole = (p: Pt) => line(p[0], p[1], p[0], p[1] - 70, c ? '#8a5a35' : '#7f7a74', 3.4);
  if (!c) return pole(p0) + line(p1[0], p1[1], p1[0] + 20, p1[1] - 10, '#7f7a74', 3.4) + `<path d="M${f(p0[0])} ${f(p0[1] - 68)}Q${f(p0[0] + 20)} ${f(p0[1] - 20)} ${f(p0[0] + 40)} ${f(p0[1] - 4)}" fill="none" stroke="#5b5048" stroke-width="1.4"/>`;
  const mid: Pt = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 - 40];
  let o = pole(p0) + pole(p1);
  o += `<path d="M${f(p0[0])} ${f(p0[1] - 68)}Q${f(mid[0])} ${f(mid[1])} ${f(p1[0])} ${f(p1[1] - 68)}" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
  const cols = bunting ? (c === '#ff7fa8' ? ['#ff7fa8', '#f6d34a', '#6fcab0', '#7fb2ff', '#b99ae8'] : [c, '#fffaf0', c === '#e0533f' ? '#f0c03a' : c]) : [c];
  const n = 9;
  for (let i = 1; i < n; i++) {
    const t = i / n, bx = (1 - t) * (1 - t) * p0[0] + 2 * t * (1 - t) * mid[0] + t * t * p1[0];
    const by = (1 - t) * (1 - t) * (p0[1] - 68) + 2 * t * (1 - t) * mid[1] + t * t * (p1[1] - 68);
    const col = cols[i % cols.length];
    o += bunting ? poly([[bx - 6, by - 1], [bx + 6, by + 1], [bx, by + 12]], col, OLt) : circ(bx, by + 3, 6, col, 'opacity=".45"') + circ(bx, by + 3, 3, col, OLt);
  }
  return o;
}

function menuBoard(x: number, y: number, c: string | null): string {
  if (!c) return junk(x, y, 51, 0.7);
  return shadow(x, y, 14) + poly([[x - 12, y], [x - 6, y - 34], [x + 6, y - 34], [x + 12, y]], '#b07a48') + rect(x - 9, y - 30, 18, 24, c) +
    `<path d="M${x - 5} ${y - 24}h10M${x - 5} ${y - 18}h7M${x - 5} ${y - 12}h9" stroke="#fffaf0" stroke-width="1.6"/>`;
}

function bikes(x: number, y: number, c: string | null): string {
  if (!c) return junk(x, y, 61, 0.8) + circ(x + 14, y - 6, 9, 'none', 'stroke="#6f665e" stroke-width="2.4"');
  let o = shadow(x, y, 30, 0.16);
  for (const dx of [-14, 12]) {
    const bx = x + dx, by = y + dx * 0.3;
    o += circ(bx - 10, by - 9, 9, 'none', `stroke="${INK}" stroke-width="2.4"`) + circ(bx + 12, by - 9, 9, 'none', `stroke="${INK}" stroke-width="2.4"`);
    o += `<path d="M${bx - 10} ${by - 9}L${bx - 2} ${by - 22}L${bx + 9} ${by - 22}L${bx + 12} ${by - 9}M${bx - 2} ${by - 22}L${bx + 1} ${by - 9}L${bx + 12} ${by - 9}M${bx + 9} ${by - 22}l-1-6h5" fill="none" stroke="${c}" stroke-width="2.6" stroke-linejoin="round"/>`;
  }
  return o;
}

function fountain(x: number, y: number, c: string | null): string {
  const stone = c ?? '#a9a196';
  let o = shadow(x, y + 4, 56);
  o += ell(x, y, 50, 22, dn(stone, 0.15)) + `<path d="M${x - 50} ${y}v-10a50 22 0 0 1 100 0v10" fill="${stone}" ${OL}/>` + ell(x, y - 10, 50, 22, stone);
  o += ell(x, y - 10, 42, 17, c ? '#7fcde8' : '#9a8a6e', 'stroke="none"');
  if (!c) {
    o += path(`M${x - 22} ${y - 12}l12 4 6 9`, 'none', 'stroke="#5b4a3e" stroke-width="1.4"');
    o += rect(x - 6, y - 36, 12, 26, stone) + poly([[x - 6, y - 36], [x + 2, y - 44], [x + 6, y - 36]], stone);
    return o + ell(x + 14, y - 6, 8, 3, '#b07a48', OLt) + ell(x - 16, y - 14, 6, 3, '#c99a62', OLt);
  }
  o += ell(x - 12, y - 14, 9, 3, '#b5e6f5', 'stroke="none"');
  o += rect(x - 6, y - 44, 12, 34, stone) + ell(x, y - 44, 22, 9, stone) + ell(x, y - 46, 16, 6, '#7fcde8', 'stroke="none"');
  o += `<path d="M${x} ${y - 50}q-4-20 0-26q4 6 0 26M${x - 2} ${y - 60}q-14-4-20 12M${x + 2} ${y - 60}q14-4 20 12" fill="none" stroke="#dff6ff" stroke-width="3" stroke-linecap="round"/>`;
  return o + circ(x, y - 78, 4, '#dff6ff', 'stroke="none"');
}

function gazebo(x: number, y: number, c1: string, c2: string, broken: boolean): string {
  if (broken) { c1 = grime(c1); c2 = grime(c2); }
  let o = shadow(x, y + 4, 56);
  o += ell(x, y + 4, 52, 24, dn(c1, 0.25)) + ell(x, y, 52, 24, c1);
  const posts: Pt[] = [[-44, -6], [44, -6], [-26, 14], [26, 14]];
  for (const [dx, dy] of posts.slice(0, 2)) o += rect(x + dx - 3, y + dy - 56, 6, 56, broken ? '#8e8276' : '#fffaf0');
  if (!broken) o += path(`M${x - 40} ${y - 14}h80`, 'none', `stroke="#fffaf0" stroke-width="4"`);
  for (const [dx, dy] of posts.slice(2)) o += rect(x + dx - 3, y + dy - 56, 6, 56, broken ? '#8e8276' : '#fffaf0');
  o += path(`M${x - 58} ${y - 52}Q${x} ${y - 30} ${x + 58} ${y - 52}L${x} ${y - 96}Z`, c2);
  o += path(`M${x - 58} ${y - 52}Q${x} ${y - 30} ${x + 58} ${y - 52}`, 'none', `stroke="${lt(c2, 0.4)}" stroke-width="4"`);
  if (broken) o += poly([[x - 6, y - 70], [x + 10, y - 74], [x + 4, y - 62]], '#3c3330', 'stroke="none"') + weeds(x - 40, y + 10);
  else o += circ(x, y - 98, 4, '#f2c94c');
  return o;
}

function pier(x: number, y: number, a: number, b: number, c: string | null, seed: number): string {
  const R = rng(seed);
  const wood = c ?? '#8e8276';
  let o = '';
  // posts along both long edges, standing in the water
  for (let v = -b; v <= b; v += 30) for (const u of [-a, a]) {
    const p = iso(x, y, u, v);
    o += rect(p[0] - 3, p[1] - 4, 6, 18, dn(wood, 0.35), OLt) + ell(p[0], p[1] + 14, 7, 2.5, '#dff6ff', 'stroke="none" opacity=".7"');
  }
  o += poly(isoRect(x, y + 5, a, b), dn(wood, 0.3)) + poly(isoRect(x, y, a, b), wood);
  let d = '';
  for (let v = -b + 8; v < b; v += 8) {
    if (!c && R() < 0.22) {
      const q = [iso(x, y, -a, v - 4), iso(x, y, a, v - 4), iso(x, y, a, v + 4), iso(x, y, -a, v + 4)];
      o += poly(q, '#3d7fa8', 'stroke="none"');
      continue;
    }
    const p0 = iso(x, y, -a, v), p1 = iso(x, y, a, v);
    d += `M${f(p0[0])} ${f(p0[1])}L${f(p1[0])} ${f(p1[1])}`;
  }
  o += `<path d="${d}" stroke="${dn(wood, 0.28)}" stroke-width="1.2"/>`;
  // rails
  const r0 = iso(x, y, a, -b), r1 = iso(x, y, a, b);
  if (c) o += line(r0[0], r0[1] - 14, r1[0], r1[1] - 14, dn(wood, 0.2), 3);
  return o;
}

function boat(x: number, y: number, c: string | null, c2: string, sail: boolean): string {
  if (!c) {
    let o = ell(x, y + 6, 46, 10, '#3d7fa8', 'stroke="none" opacity=".5"');
    o += `<g transform="rotate(-12 ${x} ${y})">` + path(`M${x - 40} ${y - 10}L${x + 40} ${y - 10}L${x + 26} ${y + 6}L${x - 30} ${y + 6}Z`, '#8e8276') + poly([[x - 8, y - 4], [x + 6, y - 6], [x, y + 2]], '#3c3330', 'stroke="none"');
    if (sail) o += line(x, y - 10, x - 6, y - 60, '#7f7a74', 3) + poly([[x - 5, y - 56], [x + 20, y - 24], [x - 2, y - 22]], '#c9c2b4');
    return o + '</g>';
  }
  let o = ell(x, y + 6, 54, 12, '#dff6ff', 'stroke="none" opacity=".55"');
  o += path(`M${x - 46} ${y - 14}L${x + 48} ${y - 14}Q${x + 40} ${y + 6} ${x + 26} ${y + 6}L${x - 30} ${y + 6}Q${x - 42} ${y} ${x - 46} ${y - 14}Z`, c);
  o += path(`M${x - 44} ${y - 8}H${x + 46}`, 'none', `stroke="${c2}" stroke-width="3"`);
  o += ell(x, y - 15, 44, 6, lt(c, 0.25));
  if (sail) {
    o += line(x - 2, y - 16, x - 2, y - 104, '#8a5a35', 3);
    o += path(`M${x} ${y - 100}Q${x + 34} ${y - 60} ${x + 38} ${y - 22}H${x}Z`, c2);
    o += path(`M${x - 4} ${y - 92}Q${x - 26} ${y - 54} ${x - 34} ${y - 22}H${x - 4}Z`, lt(c2, 0.2));
    o += poly([[x - 2, y - 104], [x + 14, y - 100], [x - 2, y - 96]], '#e0533f', OLt);
  } else {
    o += isoBox(x + 10, y - 16, 12, 10, 0, 22, '#fffaf0', '#e4ddd0', c2) + rect(x + 2, y - 30, 7, 7, '#a9dcf2', OLt);
    o += line(x - 26, y - 16, x - 30, y - 56, '#8a5a35', 2.4) + `<path d="M${x - 30} ${y - 56}L${x - 50} ${y - 20}" stroke="${INK}" stroke-width="1"/>`;
  }
  return o;
}

function nets(x: number, y: number, c: string | null): string {
  if (!c) return junk(x, y, 71, 0.8);
  let o = shadow(x, y, 30) + line(x - 26, y, x - 26, y - 44, '#8a5a35', 3.4) + line(x + 26, y + 6, x + 26, y - 38, '#8a5a35', 3.4) + line(x - 30, y - 42, x + 30, y - 36, '#8a5a35', 3);
  o += path(`M${x - 24} ${y - 40}Q${x - 18} ${y - 6} ${x - 4} ${y - 4}Q${x + 6} ${y - 18} ${x + 24} ${y - 34}Z`, c, `stroke="${dn(c, 0.3)}" stroke-width="1.2" fill-opacity=".7"`);
  let d = '';
  for (let k = 0; k < 6; k++) d += `M${x - 22 + k * 8} ${y - 40 + k}l-4 30M${x - 22} ${y - 34 + k * 5}l40 4`;
  o += `<path d="${d}" stroke="${dn(c, 0.35)}" stroke-width=".9" opacity=".8"/>`;
  return o + circ(x - 10, y - 8, 4, '#f08a3c', OLt) + circ(x + 8, y - 16, 4, '#f08a3c', OLt);
}

function buoys(x: number, y: number, c: string | null): string {
  let o = '';
  for (const [dx, dy] of [[-30, -10], [8, 8], [40, -16]]) {
    const bx = x + dx, by = y + dy;
    o += ell(bx, by + 4, 14, 4, '#dff6ff', 'stroke="none" opacity=".6"');
    if (!c) { o += ell(bx, by, 9, 4, '#8a8078', OLt); continue; }
    o += path(`M${bx - 9} ${by}Q${bx - 9} ${by - 18} ${bx} ${by - 18}Q${bx + 9} ${by - 18} ${bx + 9} ${by}Z`, c) + rect(bx - 9, by - 9, 18, 4, '#fffaf0', OLt) + line(bx, by - 18, bx, by - 26, INK, 1.6);
  }
  return o;
}

function kiosk(x: number, y: number, c: string | null): string {
  if (!c) return isoBox(x, y, 16, 14, 0, 30, '#9a8f84', '#7f766c', '#8e8276') + weeds(x - 20, y + 4) + line(x - 4, y - 30, x + 10, y - 44, '#7f7a74', 3);
  let o = shadow(x, y, 26) + isoBox(x, y, 16, 14, 0, 30, c, dn(c, 0.15), '#fffaf0');
  const F = iso(x, y, -16, 14);
  o += `<g transform="matrix(1 .5 0 1 ${f(F[0])} ${f(F[1])})">${rect(6, -24, 20, 12, '#a9dcf2')}${rect(4, -12, 24, 3, '#fffaf0', OLt)}</g>`;
  o += poly([iso(x, y, -20, 18, 30), iso(x, y, 20, 18, 30), iso(x, y, 20, -18, 30), iso(x, y, -20, -18, 30)], '#fffaf0');
  // giant cone on the roof
  const t = iso(x, y, 0, 0, 34);
  o += poly([[t[0] - 9, t[1] - 10], [t[0] + 9, t[1] - 10], [t[0], t[1] + 12]], '#e3b06a') + circ(t[0], t[1] - 16, 11, c) + circ(t[0] - 3, t[1] - 20, 3, '#fffaf0', 'stroke="none"');
  return o + circ(t[0] + 2, t[1] - 28, 3.5, '#e24b3f');
}

function bookCart(x: number, y: number, c: string | null): string {
  if (!c) return junk(x, y, 81, 0.8);
  let o = shadow(x, y, 26) + isoBox(x, y - 6, 20, 10, 0, 16, c, dn(c, 0.15), dn(c, 0.3));
  for (let i = 0; i < 7; i++) {
    const p = iso(x, y - 6, -16 + i * 5, 0, 16);
    o += rect(p[0] - 2, p[1] - 12 + (i % 3) * 2, 5, 12 - (i % 3) * 2, ['#e24b3f', '#4878c0', '#f2c94c', '#5fae4a'][i % 4], OLt);
  }
  return o + circ(x - 12, y + 4, 6, '#6f4a2c') + circ(x + 16, y - 2, 6, '#6f4a2c');
}

function statue(x: number, y: number, c: string | null): string {
  if (!c) return isoBox(x, y, 16, 16, 0, 18, '#a9a196', '#8e8780', '#bcb5aa') + junk(x + 18, y + 10, 91, 0.5);
  let o = shadow(x, y, 26) + isoBox(x, y, 16, 16, 0, 18, '#e8e2d6', '#cfc8bb', '#f4efe6');
  const t = iso(x, y, 0, 0, 18);
  o += path(`M${t[0] - 12} ${t[1]}Q${t[0] - 14} ${t[1] - 24} ${t[0]} ${t[1] - 26}Q${t[0] + 14} ${t[1] - 24} ${t[0] + 12} ${t[1]}Z`, c);
  o += circ(t[0], t[1] - 32, 10, c) + poly([[t[0] - 9, t[1] - 36], [t[0] - 7, t[1] - 46], [t[0] - 2, t[1] - 40]], c, OLt) + poly([[t[0] + 9, t[1] - 36], [t[0] + 7, t[1] - 46], [t[0] + 2, t[1] - 40]], c, OLt);
  o += `<path d="M${t[0] + 12} ${t[1] - 4}q12-4 8-18" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${t[0] + 12} ${t[1] - 4}q12-4 8-18" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
  return o + circ(t[0] - 4, t[1] - 34, 1.4, INK, 'stroke="none"') + circ(t[0] + 4, t[1] - 34, 1.4, INK, 'stroke="none"');
}

function windmill(x: number, y: number, c1: string, c2: string, broken: boolean): string {
  if (broken) { c1 = grime(c1); c2 = grime(c2); }
  let o = shadow(x, y + 4, 50);
  o += path(`M${x - 34} ${y}L${x - 22} ${y - 110}H${x + 22}L${x + 34} ${y}Q${x} ${y + 14} ${x - 34} ${y}Z`, c1);
  o += path(`M${x + 6} ${y + 6}L${x + 4} ${y - 110}H${x + 22}L${x + 34} ${y}Q${x + 22} ${y + 6} ${x + 6} ${y + 6}Z`, dn(c1, 0.14), 'stroke="none"');
  o += path(`M${x - 8} ${y + 4}V${y - 18}Q${x} ${y - 28} ${x + 8} ${y - 18}V${y + 4}Z`, broken ? '#5b5048' : dn(c2, 0.2));
  o += rect(x - 6, y - 70, 12, 14, broken ? '#4a4550' : '#a9dcf2');
  o += path(`M${x - 28} ${y - 106}Q${x} ${y - 150} ${x + 28} ${y - 106}Z`, c2);
  const hx0 = x, hy0 = y - 112;
  const blades = broken ? [20, 200] : [20, 110, 200, 290];
  for (const a of blades) {
    const r = (a * Math.PI) / 180, L = broken && a === 200 ? 34 : 62;
    const ex = hx0 + Math.cos(r) * L, ey = hy0 + Math.sin(r) * L;
    const nx = -Math.sin(r) * 9, ny = Math.cos(r) * 9;
    o += line(hx0, hy0, ex, ey, '#8a5a35', 3);
    o += poly([[hx0 + Math.cos(r) * 14, hy0 + Math.sin(r) * 14], [ex, ey], [ex + nx, ey + ny], [hx0 + Math.cos(r) * 14 + nx, hy0 + Math.sin(r) * 14 + ny]], broken ? '#c9c2b4' : '#fffaf0', `stroke="${INK}" stroke-width="1.4" fill-opacity=".92"`);
  }
  o += circ(hx0, hy0, 6, c2);
  if (broken) o += weeds(x - 30, y + 4) + weeds(x + 30, y + 2, 0.9) + line(x + 30, y + 10, x + 70, y + 2, '#8e8276', 3);
  return o;
}

function picnic(x: number, y: number, c: string | null): string {
  if (!c) return junk(x, y, 101, 0.7);
  let o = poly(isoRect(x, y, 32, 22), '#fffaf0');
  let d = '';
  for (let u = -32; u < 32; u += 16) d += `M${P([iso(x, y, u, -22), iso(x, y, u + 8, -22), iso(x, y, u + 8, 22), iso(x, y, u, 22)]).replace(/ /g, 'L')}Z`;
  for (let v = -22; v < 22; v += 11) d += `M${P([iso(x, y, -32, v), iso(x, y, 32, v), iso(x, y, 32, v + 5.5), iso(x, y, -32, v + 5.5)]).replace(/ /g, 'L')}Z`;
  o += `<path d="${d}" fill="${c}" opacity=".55"/>`;
  o += isoBox(x + 8, y - 4, 10, 7, 0, 12, '#c99a62', '#a87b48', '#e8c78f') + path(`M${x - 2} ${y - 16}q10-14 20 0`, 'none', `stroke="${INK}" stroke-width="2"`);
  return o + circ(x - 16, y + 2, 5, '#e24b3f', OLt) + circ(x - 8, y + 6, 4, '#f2c94c', OLt);
}

function telescope(x: number, y: number, c: string | null): string {
  if (!c) return shadow(x, y, 12, 0.14) + line(x - 10, y, x + 2, y - 16, '#7f7a74', 3) + line(x + 10, y, x + 2, y - 16, '#7f7a74', 3) + rect(x + 8, y - 6, 24, 7, '#8a8078', OLt);
  return shadow(x, y, 14) + line(x - 10, y, x, y - 26, '#8a5a35', 3) + line(x + 10, y, x, y - 26, '#8a5a35', 3) + line(x, y + 2, x, y - 26, '#8a5a35', 3) +
    `<g transform="rotate(-24 ${x} ${y - 30})">${rect(x - 16, y - 35, 34, 10, c)}${rect(x + 16, y - 37, 8, 14, dn(c, 0.15))}${rect(x - 20, y - 33, 5, 6, INK, OLt)}</g>`;
}

function kites(x: number, y: number, c: string | null, idx: number): string {
  if (!c) return junk(x, y, 111, 0.6);
  let o = '';
  for (const [dx, dy, s] of [[0, -150, 1], [-50, -120, 0.75]] as const) {
    const kx = x + dx, ky = y + dy;
    o += `<path d="M${x + dx * 0.3} ${y}Q${kx - 30} ${(y + ky) / 2} ${kx} ${ky}" fill="none" stroke="${INK}" stroke-width="1"/>`;
    if (idx === 1) o += path(`M${kx} ${ky + 10 * s}l-12-12a7 7 0 0 1 12-6a7 7 0 0 1 12 6z`, c);
    else if (idx === 2) o += star5(kx, ky, 14 * s, c);
    else o += poly([[kx, ky - 16 * s], [kx + 11 * s, ky], [kx, ky + 18 * s], [kx - 11 * s, ky]], c) + line(kx, ky - 16 * s, kx, ky + 18 * s, INK, 1);
    o += `<path d="M${kx} ${ky + 16 * s}q-6 8 0 14q6 8 0 14" fill="none" stroke="${c}" stroke-width="2"/>`;
  }
  return o + shadow(x, y, 8);
}

function swing(x: number, y: number, c: string | null): string {
  const wood = c ? '#b07a48' : '#8e8276';
  let o = shadow(x, y, 34, 0.16);
  o += line(x - 34, y, x - 26, y - 64, wood, 4) + line(x - 18, y + 4, x - 26, y - 64, wood, 4) + line(x + 34, y - 6, x + 26, y - 70, wood, 4) + line(x + 18, y - 2, x + 26, y - 70, wood, 4);
  if (!c) return o + line(x - 26, y - 64, x + 6, y - 50, wood, 4) + weeds(x, y + 4) + line(x - 6, y - 4, x + 10, y - 10, '#7f7a74', 3);
  o += line(x - 26, y - 64, x + 26, y - 70, wood, 4);
  o += line(x - 10, y - 66, x - 10, y - 22, INK, 1.4) + line(x + 10, y - 68, x + 10, y - 24, INK, 1.4) + rect(x - 14, y - 24, 28, 5, c);
  return o;
}

function lighthouse(x: number, y: number, c1: string, c2: string, broken: boolean): string {
  if (broken) { c1 = grime(c1); c2 = mix(c2, '#8f877e', 0.75); }
  let o = shadow(x, y + 4, 40);
  o += ell(x, y + 2, 36, 14, '#a9a196') + rect(x - 36, y - 10, 72, 12, '#a9a196', 'stroke="none"') + ell(x, y - 10, 36, 14, '#c4bdb1');
  const top = y - 150, wb = 28, wt = 18;
  o += path(`M${x - wb} ${y - 10}L${x - wt} ${top}H${x + wt}L${x + wb} ${y - 10}Q${x} ${y} ${x - wb} ${y - 10}Z`, c1);
  for (let k = 0; k < 3; k++) {
    const y0 = y - 30 - k * 44, y1 = y0 - 22;
    const w0 = wb - ((y - 10 - y0) / (y - 10 - top)) * (wb - wt), w1 = wb - ((y - 10 - y1) / (y - 10 - top)) * (wb - wt);
    o += path(`M${f(x - w0)} ${y0}L${f(x - w1)} ${y1}Q${x} ${y1 + 6} ${f(x + w1)} ${y1}L${f(x + w0)} ${y0}Q${x} ${y0 + 6} ${f(x - w0)} ${y0}Z`, c2, OLt);
  }
  o += path(`M${x + 4} ${y - 4}L${x + 6} ${top}H${x + wt}L${x + wb} ${y - 10}Z`, '#000000', 'stroke="none" opacity=".1"');
  o += path(`M${x - 7} ${y - 6}V${y - 26}Q${x} ${y - 34} ${x + 7} ${y - 26}V${y - 6}Z`, broken ? '#5b5048' : '#8a5a35');
  o += rect(x - 4, y - 92, 8, 12, broken ? '#4a4550' : '#a9dcf2');
  o += ell(x, top, 28, 9, broken ? '#8e8276' : '#3d3a44');
  if (broken) o += `<path d="M${x - 10} ${y - 60}l6 10-4 8 6 8" fill="none" stroke="#5b4a3e" stroke-width="1.4"/>` + weeds(x - 30, y + 4) + weeds(x + 28, y + 2, 0.9);
  return o;
}

/** Lantern room on top of the lighthouse (separate task). */
function beacon(x: number, y: number, c: string | null): string {
  const top = y - 150;
  let o = '';
  if (c) o += `<path d="M${x} ${top - 26}L${x - 140} ${top - 60}L${x - 140} ${top + 4}Z" fill="${c}" opacity=".28"/><path d="M${x} ${top - 26}L${x + 140} ${top - 54}L${x + 140} ${top + 6}Z" fill="${c}" opacity=".22"/>` + circ(x, top - 26, 30, c, 'opacity=".35"');
  o += rect(x - 15, top - 40, 30, 32, c ?? '#5b5560');
  if (c) o += circ(x, top - 24, 9, '#ffffff', 'stroke="none"');
  else o += `<path d="M${x - 10} ${top - 36}l8 10-6 6 10 8" fill="none" stroke="#2c2830" stroke-width="1.6"/>`;
  o += line(x - 5, top - 40, x - 5, top - 8, INK, 1.6) + line(x + 5, top - 40, x + 5, top - 8, INK, 1.6);
  o += path(`M${x - 20} ${top - 40}Q${x} ${top - 72} ${x + 20} ${top - 40}Z`, c ? '#d9473b' : '#7f7a74');
  return o + circ(x, top - 58, 4, c ? '#f2c94c' : '#7f7a74');
}

function flag(x: number, y: number, c: string | null, idx: number): string {
  if (!c) return shadow(x, y, 10, 0.14) + line(x, y, x + 12, y - 40, '#7f7a74', 3) + poly([[x + 12, y - 40], [x + 22, y - 30], [x + 10, y - 28]], '#9a948c');
  let o = shadow(x, y, 10) + line(x, y, x, y - 80, '#d9d2c4', 3.4) + circ(x, y - 82, 3.5, '#f2c94c');
  o += path(`M${x} ${y - 78}Q${x + 16} ${y - 84} ${x + 34} ${y - 76}V${y - 54}Q${x + 16} ${y - 62} ${x} ${y - 56}Z`, c);
  if (idx === 0) o += path(`M${x + 8} ${y - 66}q8-6 16 0q-8 6-16 0z`, '#fffaf0', OLt);
  else if (idx === 1) o += circ(x + 17, y - 66, 5, '#fffaf0', OLt);
  else o += star5(x + 17, y - 66, 6, '#fffaf0');
  return o;
}

/* ---------------- item dispatch ---------------- */

const FLAT = new Set(['paving', 'sand', 'paths', 'pier']);
const ATTACH = new Set(['awning', 'sign', 'beacon']);
const SPAN = new Set(['lights', 'bunting', 'kites']);
const greenFor = (st: TownStyle) => (st.swatch === '#f6a7c4' ? null : st.swatch);

function awning(B: Bld, c: string | null): string {
  const W = 2 * B.a, s0 = W * 0.34, s1 = W * 0.94, t = -40, d = 16;
  if (!c) return `<g${mirrorAttr(B)}><g transform="${facadeFrame(B)}">${path(`M${f(s0)} ${t}H${f(s0 + 30)}L${f(s0 + 24 - d)} ${t + d + 14}L${f(s0 - d + 4)} ${t + d + 6}Z`, '#8e8780')}${line(s1, t, s1 - d, t + d + 12, '#6f665e', 2.4)}</g></g>`;
  let o = '';
  const n = 6, sw = (s1 - s0) / n;
  for (let i = 0; i < n; i++) {
    const a0 = s0 + i * sw, a1 = a0 + sw;
    o += poly([[a0, t], [a1, t], [a1 - d, t + d + 8], [a0 - d, t + d + 8]], i % 2 ? '#fffaf0' : c, OLt);
  }
  let val = `M${f(s0 - d)} ${t + d + 8}`;
  for (let i = 0; i < n; i++) val += `q${f(sw / 2)} 9 ${f(sw)} 0`;
  o += path(`${val}v-6H${f(s0 - d)}Z`, c, OLt);
  return `<g${mirrorAttr(B)}><g transform="${facadeFrame(B)}">${o}</g></g>`;
}

function hangingSign(B: Bld, c: string | null, icon: string): string {
  const W = 2 * B.a;
  const [ax, ay] = facadePt(B, W * 0.97, -58);
  const dir = B.mir ? 1 : -1;
  const bx = ax + dir * 16, by = ay + 6;
  let o = line(ax, ay, bx, ay + 2, INK, 2.4);
  if (!c) return o + line(bx, ay + 2, bx + 2, by + 16, INK, 1) + `<g transform="rotate(${dir * 25} ${bx} ${by})">${rect(bx - 11, by + 6, 22, 16, '#8e8780')}</g>`;
  o += line(bx - 8, ay + 2, bx - 8, by + 4, INK, 1) + line(bx + 8, ay + 2, bx + 8, by + 4, INK, 1);
  o += circ(bx, by + 16, 14, c);
  if (icon === 'bread') o += ell(bx, by + 16, 9, 6, '#e3a15a', OLt) + `<path d="M${bx - 4} ${by + 12}l-2 6M${bx} ${by + 11}l-2 7M${bx + 4} ${by + 12}l-2 6" stroke="${INK}" stroke-width="1.2"/>`;
  else if (icon === 'cup') o += path(`M${bx - 7} ${by + 11}h12v6q0 6-6 6t-6-6z`, '#fffaf0', OLt) + path(`M${bx + 5} ${by + 13}q5 0 3 5`, 'none', `stroke="${INK}" stroke-width="1.6"`);
  else o += rect(bx - 8, by + 9, 8, 13, '#fffaf0', OLt) + rect(bx, by + 9, 8, 13, '#f3e7cf', OLt);
  return o;
}

/** Inner SVG of one task element. `style` undefined = shabby "before" state. */
export function itemInner(area: Area, task: TownTask, style: number | undefined): string {
  const painted = paintedItem(area, task, style);
  if (painted) return painted;
  const done = style !== undefined;
  const st: TownStyle | null = done ? task.styles[style] ?? task.styles[0] ?? { name: { vi: '', en: '' }, swatch: '#ffffff' } : null;
  const c = st?.swatch ?? null;
  const x = area.x + task.at[0], y = area.y + task.at[1];
  const p = task.p ?? {};
  const seed = hash(task.id);
  const a = Number(p.a ?? 0), b = Number(p.b ?? 0);
  const pts = (p.pts as number[][] | undefined) ?? [[0, 0]];
  const parent = typeof p.on === 'string' ? taskById.get(p.on) : undefined;
  switch (task.kind) {
    case 'paving': return paving(x, y, a, b, st, seed);
    case 'sand': return sandLot(x, y, a, b, done, seed);
    case 'paths': {
      const col = c ?? '#a58a62', pat = st ? st.alt : null;
      const strips = [isoRect(x, y, a, 18), isoRect(x, y, 18, b)];
      let o = strips.map((q) => poly(q, dn(col, 0.25), 'stroke="none"')).join('') + strips.map((q) => poly(q.map(([px, py]) => [px, py - 3] as Pt), col, 'stroke="none"')).join('');
      o += ell(x, y + 5, 74, 34, dn(col, 0.25), 'stroke="none"') + ell(x, y + 2, 74, 34, col, 'stroke="none"');
      if (!st) return o + weeds(x - 60, y + 10) + weeds(x + 70, y - 20, 0.8) + ell(x + 40, y + 30, 14, 6, '#8fa3ad', 'opacity=".8"');
      if (pat === 'brick' || pat === 'cobble') o += ell(x, y + 2, 60, 27, 'none', `stroke="${dn(col, 0.25)}" stroke-width="1.5" stroke-dasharray="6 5"`);
      return o;
    }
    case 'pier': return pier(x, y, a, b, c, seed);
    case 'house': {
      const B = bldOf(area, task);
      return building(B, st?.swatch ?? (task.styles[0].swatch), st?.alt ?? (task.styles[0].alt ?? '#c8483a'), !done, { shop: !!p.shop, chimney: !!p.chimney }, seed);
    }
    case 'awning': return parent ? awning(bldOf(area, parent), c) : '';
    case 'sign': return parent ? hangingSign(bldOf(area, parent), c, String(p.icon ?? 'book')) : '';
    case 'beacon': return beacon(x, y, c);
    case 'vegpatch': return vegPatch(x, y, a, b, c, seed);
    case 'mailbox': return mailbox(x, y, c);
    case 'fence': return fenceRun(x, y, Number(p.len ?? 120), String(p.dir ?? 'u'), c, seed);
    case 'tree': {
      if (!st) return deadTree(x, y, p.big ? 1.3 : 1);
      if (p.big) return tree(x, y, st.swatch, null, 1.35, seed);
      return tree(x, y, greenFor(st) ? '#6cb85a' : st.swatch, greenFor(st), 1, seed);
    }
    case 'trees': return pts.map(([dx, dy], i) => {
      const tx = x + dx, ty = y + dy;
      if (!st) return i === 0 ? deadTree(tx, ty) : junk(tx, ty, seed + i, 0.6);
      return p.pine ? (style === 2 ? tree(tx, ty, st.swatch, null, 0.9, seed + i) : pine(tx, ty, st.swatch, 1, style === 1)) : tree(tx, ty, st.swatch, null, 1, seed + i);
    }).join('');
    case 'palms': return pts.map(([dx, dy], i) => {
      const tx = x + dx, ty = y + dy;
      if (!st) return i === 0 ? deadTree(tx, ty) : junk(tx, ty, seed + i, 0.6);
      let o = palm(tx, ty, st.swatch, 1, i === 1);
      if (i === 0 && st.alt && style === 1) o += `<path d="M${tx + 4} ${ty - 40}Q${tx - 26} ${ty - 14} ${tx - 56} ${ty - 2}" fill="none" stroke="${st.alt}" stroke-width="6"/>`;
      if (st.alt && style === 2) for (let k = 0; k < 4; k++) o += circ(tx + 12 - k * 6, ty - 66 + k * 6, 4, st.alt, OLt);
      return o;
    }).join('');
    case 'bench': return bench(x, y, c);
    case 'lamp': return lampPost(x, y, c);
    case 'lamps': return pts.map(([dx, dy]) => lampPost(x + dx, y + dy, c)).join('');
    case 'tables': return tables(x, y, c);
    case 'cart': return cart(x, y, c);
    case 'planters': return planters(x, y, c);
    case 'flowerbed': return pts.map(([dx, dy], i) => flowerBed(x + dx, y + dy, c, seed + i)).join('');
    case 'huts': return [-50, 0, 50].map((dx, i) => hut(x + dx, y + dx * 0.5 * -0.2 + i * 6, i % 2 ? (st?.alt ?? '#7fc8e8') : (st?.swatch ?? '#f6a7c4'), i % 2 ? (st?.swatch ?? '#f6a7c4') : (st?.alt ?? '#7fc8e8'), !done)).join('');
    case 'umbrellas': return c ? umbrella(x - 40, y - 10, c) + umbrella(x + 10, y + 12, '#4f86c6' === c ? '#f0b73a' : c) + umbrella(x + 52, y - 14, c, 0.9) : junk(x, y, seed, 0.8);
    case 'loungers': return c ? lounger(x - 26, y - 6, c) + lounger(x + 24, y + 10, c) : junk(x, y, seed, 0.7);
    case 'lifeguard': return lifeguard(x, y, c);
    case 'volley': return volley(x, y, c);
    case 'castle': return castle(x, y, c);
    case 'lights': return stringLights(x, y, Number(p.len ?? 120), c, false);
    case 'bunting': return stringLights(x, y, Number(p.len ?? 160), c, true);
    case 'menu': return menuBoard(x, y, c);
    case 'bikes': return bikes(x, y, c);
    case 'fountain': return fountain(x, y, c);
    case 'gazebo': return gazebo(x, y, st?.swatch ?? task.styles[0].swatch, st?.alt ?? task.styles[0].alt ?? '#e0533f', !done);
    case 'stall': return stall(x, y, c, String(p.goods ?? 'fruit'), seed);
    case 'crates': return crates(x, y, c);
    case 'clock': return clock(x, y, c);
    case 'boat': return boat(x, y, c, st?.alt ?? '#fffaf0', !!p.sail);
    case 'nets': return nets(x, y, c);
    case 'buoys': return buoys(x, y, c);
    case 'kiosk': return kiosk(x, y, c);
    case 'bookcart': return bookCart(x, y, c);
    case 'statue': return statue(x, y, c);
    case 'windmill': return windmill(x, y, st?.swatch ?? task.styles[0].swatch, st?.alt ?? task.styles[0].alt ?? '#c8483a', !done);
    case 'picnic': return picnic(x, y, c);
    case 'telescope': return telescope(x, y, c);
    case 'kites': return kites(x, y, c, style ?? 0);
    case 'swing': return swing(x, y, c);
    case 'lighthouse': return lighthouse(x, y, st?.swatch ?? task.styles[0].swatch, st?.alt ?? task.styles[0].alt ?? '#d9473b', !done);
    case 'flag': return flag(x, y, c, style ?? 0);
    default: return junk(x, y, seed);
  }
}

/** Painted image for a task element (when the art exists). */
function paintedItem(area: Area, task: TownTask, style: number | undefined): string | null {
  const key = `town/${task.id}_${style === undefined ? 'before' : style}`;
  const url = artURL(key), size = artSize(key);
  if (!url || !size) return null;
  const x = area.x + task.at[0], y = area.y + task.at[1];
  const w = task.w, h = (w * size.h) / size.w;
  const p = task.p ?? {};
  // Flat surfaces are centred on their footprint; everything else stands on its anchor (buildings on their front corner).
  const bottom = FLAT.has(task.kind) ? y + h / 2 : task.kind === 'house' ? y + (Number(p.a ?? 60) + Number(p.b ?? 45)) / 2 + 6 : y;
  return `<image href="${url.replace(/&/g, '&amp;')}" x="${f(x - w / 2)}" y="${f(bottom - h)}" width="${f(w)}" height="${f(h)}"/>`;
}

/** Draw order inside an area: flat ground first, then by depth, attachments right after their building, spans last. */
function order(area: Area): TownTask[] {
  const key = (t: TownTask): number => {
    if (FLAT.has(t.kind)) return -10000 + (t.kind === 'paths' ? 1 : 0);
    if (SPAN.has(t.kind)) return 10000;
    if (ATTACH.has(t.kind)) { const par = typeof t.p?.on === 'string' ? taskById.get(t.p.on) : undefined; return (par ? par.at[1] : t.at[1]) + 0.5; }
    return t.at[1] + (t.kind === 'house' ? Number(t.p?.b ?? 0) * 0.5 : 0);
  };
  return [...area.tasks].sort((p, q) => key(p) - key(q));
}

export const itemGroup = (area: Area, task: TownTask, style: number | undefined) =>
  `<g class="town-item" data-item="${task.id}">${itemInner(area, task, style)}</g>`;

/** Fog over a locked area: soft clouds that let the shabby silhouettes peek through. */
export function fogInner(area: Area): string {
  const R = rng(hash(area.id) ^ 77);
  let back = '', front = '';
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + R() * 0.3, d = (i % 2 ? 0.35 : 0.72) * area.r;
    const x = area.x + Math.cos(a) * d, y = area.y + Math.sin(a) * d * 0.55 - 30, r = 42 + R() * 34;
    back += circ(x, y + 10, r, '#c9c3dd', 'stroke="none"');
    front += circ(x, y, r - 8, '#f6f3fb', 'stroke="none"');
  }
  front += ell(area.x, area.y - 30, area.r * 0.42, area.r * 0.24, '#f6f3fb', 'stroke="none"');
  // a light veil over the whole lot + the clouds
  const veil = ell(area.x, area.y, area.r * 1.05, area.r * 0.66, '#e9e4f6', 'stroke="none" opacity=".45"');
  return `${veil}<g opacity=".8">${back}${front}</g>`;
}

function areaGroup(area: Area, idx: number, state: TownState): string {
  const items = order(area).map((t) => itemGroup(area, t, state.styles[t.id])).join('');
  const fog = idx > state.area ? `<g class="town-fog" data-fog="${area.id}">${fogInner(area)}</g>` : '';
  return `<g class="town-area" data-area="${area.id}">${items}${fog}</g>`;
}

/* ---------------- static ground ---------------- */

const COAST: Pt[] = [
  [720, -420], [660, -40], [600, 220], [420, 380], [230, 520], [180, 700], [250, 860], [430, 980], [560, 1140], [520, 1330], [470, 1480], [490, 1660],
  [560, 1820], [570, 1980], [400, 2130], [210, 2280], [200, 2460], [300, 2650],
];
function coastX(y: number): number {
  for (let i = 0; i < COAST.length - 1; i++) {
    const [x0, y0] = COAST[i], [x1, y1] = COAST[i + 1];
    if (y >= y0 && y <= y1) return x0 + ((x1 - x0) * (y - y0)) / (y1 - y0);
  }
  return 600;
}

const ROADS: Pt[][] = [
  [[1700, 2560], [1420, 2420], [1150, 2300], [940, 2200], [770, 2110], [560, 2240], [430, 2360]],
  [[770, 2110], [980, 1990], [1180, 1880], [960, 1780], [760, 1700], [960, 1560], [1170, 1440], [980, 1340], [790, 1250], [960, 1110], [1150, 960]],
  [[760, 1700], [560, 1620], [430, 1560]],
  [[790, 1250], [640, 1060], [560, 860], [440, 720]],
  [[1150, 960], [1420, 820], [1700, 760]],
];

let groundCache: string | null = null;

function ground(): string {
  if (groundCache) return groundCache;
  const R = rng(20240611);
  const W = WORLD_W, H = WORLD_H;
  let o = `<rect x="-400" y="-400" width="${W + 800}" height="${H + 800}" fill="#4fb6dc"/>`;
  // deeper water stripes and waves
  o += `<path d="M-400 -400H260Q120 1300 -60 3000H-400Z" fill="#43a6d0"/>`;
  let waves = '';
  for (let i = 0; i < 160; i++) {
    const y = R() * (H + 200) - 100, x = -300 + R() * (coastX(y) + 220);
    if (x > coastX(y) - 70) continue;
    waves += `M${f(x)} ${f(y)}q8-6 16 0q8 6 16 0`;
  }
  o += `<path d="${waves}" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>`;
  // land (grass) with shallow water + sand rim, all from one coast path
  const land = `${smooth(COAST)}L${W + 400} ${H + 400}L${W + 400} -400Z`;
  o += `<path d="${land}" fill="#bfeaf2" stroke="#8fd8ea" stroke-width="150" stroke-linejoin="round" opacity=".9"/>`;
  o += `<path d="${land}" fill="#f2dca2" stroke="#f2dca2" stroke-width="64" stroke-linejoin="round"/>`;
  o += `<path d="${smooth(COAST)}" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="18 12" opacity=".7" transform="translate(-46 0)"/>`;
  o += `<path d="${land}" fill="#9dd46e" transform="translate(26 0)"/>`;
  // beach sand bay
  o += path(smooth([[180, 2190], [420, 2120], [640, 2260], [660, 2470], [460, 2620], [200, 2600], [130, 2400]], true), '#f2dca2', 'stroke="none"');
  o += path(smooth([[300, 1500], [520, 1470], [560, 1600], [470, 1660], [330, 1640]], true), '#f2dca2', 'stroke="none"');
  // soft grass patches
  let patches = '';
  for (let i = 0; i < 70; i++) {
    const y = R() * H, x = coastX(y) + 80 + R() * (W - coastX(y));
    patches += `M${f(x - 40)} ${f(y)}a40 16 0 1 0 80 0a40 16 0 1 0-80 0`;
  }
  o += `<path d="${patches}" fill="#b0dd7e" opacity=".6"/>`;
  // hills in the north-east
  o += path('M700 -60Q860 160 1060 120Q1220 60 1340 220Q1460 380 1700 300V-60Z', '#86c35e', 'stroke="none"');
  o += path('M900 -60Q1020 60 1180 30Q1340 0 1460 120Q1560 210 1700 160V-60Z', '#74b454', 'stroke="none"');
  o += path('M820 640Q980 560 1160 600Q1360 640 1460 760Q1300 820 1120 800Q940 780 820 640Z', '#a9da78', 'stroke="none"');
  // roads
  for (const r of ROADS) o += `<path d="${smooth(r)}" fill="none" stroke="#c9a874" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (const r of ROADS) o += `<path d="${smooth(r)}" fill="none" stroke="#efdcb0" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (const r of ROADS) o += `<path d="${smooth(r)}" fill="none" stroke="#fff4d6" stroke-width="3" stroke-dasharray="10 14" stroke-linecap="round" opacity=".8"/>`;
  // scattered trees, avoiding areas, roads and the sea
  const near = (x: number, y: number) => AREAS.some((a) => Math.hypot((x - a.x) * 0.9, (y - a.y - 40) * 1.9) < a.r + 30) ||
    ROADS.some((r) => r.some(([rx, ry], i) => i > 0 && segDist(x, y, r[i - 1][0], r[i - 1][1], rx, ry) < 50));
  const trees: Pt[] = [];
  for (let i = 0; i < 520 && trees.length < 150; i++) {
    const y = 40 + R() * (H - 60), x = coastX(y) + 70 + R() * (W - coastX(y) + 40);
    if (near(x, y) || trees.some(([tx, ty]) => Math.hypot(tx - x, ty - y) < 46)) continue;
    trees.push([x, y]);
  }
  trees.sort((p, q) => p[1] - q[1]);
  for (const [x, y] of trees) {
    const k = R();
    o += y < 700 || k < 0.25 ? pine(x, y, k < 0.5 ? '#4f9a5a' : '#5fae5e', 0.8 + R() * 0.3) : k < 0.45 ? bush(x, y, '#6fb85a', 1.4) : tree(x, y, ['#6cb85a', '#5fae4e', '#7cc463'][Math.floor(R() * 3)], null, 0.75 + R() * 0.25, Math.floor(x * 7 + y));
  }
  // rocks and a far-off sailboat in the sea
  for (const [x, y, s] of [[90, 1200, 1], [150, 1900, 0.8], [60, 400, 1.2], [320, 1080, 0.7], [110, 2560, 0.9]]) {
    o += ell(x, y + 6 * s, 30 * s, 8 * s, '#dff6ff', 'stroke="none" opacity=".6"') + path(`M${x - 24 * s} ${y + 4 * s}Q${x - 18 * s} ${y - 16 * s} ${x} ${y - 18 * s}Q${x + 22 * s} ${y - 12 * s} ${x + 24 * s} ${y + 4 * s}Z`, '#a7a39b');
  }
  o += boat(110, 1720, '#fffaf0', '#e0533f', true) + boat(140, 980, '#f0b73a', '#fffaf0', false);
  groundCache = o;
  return o;
}

function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
  const t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0;
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
}

/** Clouds drifting at the map's north edge (frames the world). */
function clouds(): string {
  let o = '';
  for (const [x, y, s] of [[200, 80, 1.4], [700, 40, 1], [1200, 90, 1.2], [1500, 30, 0.9]]) {
    o += `<g opacity=".9">${ell(x, y, 90 * s, 34 * s, '#ffffff', 'stroke="none"')}${circ(x - 30 * s, y - 20 * s, 34 * s, '#ffffff', 'stroke="none"')}${circ(x + 26 * s, y - 26 * s, 40 * s, '#ffffff', 'stroke="none"')}</g>`;
  }
  return o;
}

/** The whole town. `viewBox` crops it (game background); otherwise it is the full 1600×2600 world. */
export function townSVG(state: TownState, viewBox?: string): string {
  const areas = [...AREAS.entries()].sort((p, q) => p[1].y - q[1].y).map(([i, a]) => areaGroup(a, i, state)).join('');
  const vb = viewBox ?? `0 0 ${WORLD_W} ${WORLD_H}`;
  const size = viewBox ? 'width="100%" height="100%" preserveAspectRatio="xMidYMid slice"' : `width="${WORLD_W}" height="${WORLD_H}" overflow="visible"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" ${size}>${ground()}${areas}${clouds()}</svg>`;
}

/** Static crop centred on an area (behind the match-3 board). */
export function townBackdropSVG(state: TownState): string {
  const a = AREAS[Math.min(state.area, AREAS.length - 1)];
  const w = 620, h = 1000;
  return townSVG(state, `${f(a.x - w / 2)} ${f(a.y - h * 0.55)} ${w} ${h}`);
}

/** Bounding box of a task element (world units), for icons. */
function bboxOf(area: Area, task: TownTask): [number, number, number, number] {
  const host = typeof task.p?.on === 'string' ? taskById.get(task.p.on) ?? task : task;
  const x = area.x + host.at[0], y = area.y + host.at[1];
  const p = host.p ?? {};
  if (host.kind === 'house') {
    const a = Number(p.a), b = Number(p.b), h = Number(p.h), rh = Number(p.rh);
    return [x - a - b - 14, y - (a + b) / 2 - h - rh - 24, 2 * (a + b) + 28, (a + b) + h + rh + 30];
  }
  if (FLAT.has(host.kind)) { const a = Number(p.a), b = Number(p.b); return [x - a - b, y - (a + b) / 2, 2 * (a + b), a + b + 6]; }
  if (host.kind === 'lighthouse' || host.kind === 'beacon') return [x - 60, y - 230, 120, 250];
  if (host.kind === 'windmill') return [x - 80, y - 190, 160, 210];
  if (host.kind === 'kites') return [x - 90, y - 180, 160, 190];
  if (SPAN.has(host.kind)) { const l = Number(p.len ?? 140); return [x - l / 2 - 50, y - l / 4 - 90, l + 100, l / 2 + 110]; }
  const pts = (p.pts as number[][] | undefined) ?? [[0, 0]];
  const xs = pts.map(([dx]) => x + dx), ys = pts.map(([, dy]) => y + dy);
  const w = Math.max(host.w, 50);
  const x0 = Math.min(...xs) - w / 2 - 10, x1 = Math.max(...xs) + w / 2 + 10;
  const y1 = Math.max(...ys) + 16, y0 = Math.min(...ys) - Math.max(w * 0.9, 70);
  return [x0, y0, x1 - x0, y1 - y0];
}

/** Small picture of a task (task list, style picker): the element alone, framed. Attachments show their building. */
export function townIconSVG(taskId: string, style: number | undefined, state: TownState): string {
  const task = taskById.get(taskId);
  const area = AREAS.find((a) => a.tasks.includes(task!));
  if (!task || !area) return '';
  const [x, y, w, h] = bboxOf(area, task);
  const s = Math.max(w, h);
  const vb = `${f(x + w / 2 - s / 2)} ${f(y + h / 2 - s / 2)} ${f(s)} ${f(s)}`;
  const parent = typeof task.p?.on === 'string' ? taskById.get(task.p.on) : task.kind === 'beacon' ? area.tasks.find((t) => t.kind === 'lighthouse') : undefined;
  const base = parent ? itemInner(area, parent, state.styles[parent.id]) : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="64" height="64">${base}${itemInner(area, task, style)}</svg>`;
}
