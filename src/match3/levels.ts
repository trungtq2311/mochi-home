import { mulberry32, pick, randInt, type RNG } from '../core/rng.ts';
import { TUNING } from './tuning.ts';

export type Goal =
  | { kind: 'color'; color: number; count: number }
  | { kind: 'box'; count: number }
  | { kind: 'dirt'; count: number }
  | { kind: 'ice' | 'toy' | 'carpet'; count: number };

export interface LevelDef {
  n: number;
  mask: string[];
  colors: number;
  moves: number;
  goals: Goal[];
  hard: boolean;
}

// '.' cell, ' ' hole, b/B/C box with 1/2/3 layers, d/D dirt with 1/2 layers, i/I ice with 1/2 layers, k carpet.
const SHAPES: string[][] = [
  ['........', '........', '........', '........', '........', '........', '........', '........'],
  ['........', '........', '........', '........', '........', '........', '........', '........', '........'],
  [' ...... ', '........', '........', '........', '........', '........', '........', ' ...... '],
  ['  ....  ', ' ...... ', '........', '........', '........', '........', ' ...... ', '  ....  '],
  ['.. .. ..', '........', '........', '........', '........', '........', '........', '........', '........'],
  [' ..  .. ', '........', '........', '........', '........', ' ...... ', '  ....  ', '   ..   '],
  ['........', '........', '........', '...  ...', '...  ...', '........', '........', '........'],
  ['........', ' ...... ', ' ...... ', '........', '........', ' ...... ', ' ...... ', '........'],
  ['.......', '.......', '.......', '.......', '.......', '.......', '.......', '.......', '.......'],
  ['   ..   ', '  ....  ', ' ...... ', '........', '........', '........', '........', '........', '........'],
];

type Grid = string[][];

const toGrid = (shape: string[]): Grid => shape.map((row) => row.split(''));
const fromGrid = (g: Grid): string[] => g.map((row) => row.join(''));

function setSym(g: Grid, r: number, c: number, ch: string) {
  const W = g[0].length;
  for (const cc of [c, W - 1 - c]) if (g[r]?.[cc] === '.') g[r][cc] = ch;
}

function addBoxes(g: Grid, rng: RNG, strength: number): void {
  const H = g.length, W = g[0].length;
  const layer = () => (strength > 0.75 && rng() < 0.35 ? 'C' : strength > 0.35 && rng() < 0.5 ? 'B' : 'b');
  const pattern = randInt(rng, 5);
  if (pattern === 0) {
    // Bottom rows
    const rows = strength > 0.5 ? 2 : 1;
    for (let r = H - rows; r < H; r++) for (let c = 0; c < W / 2; c++) setSym(g, r, c, layer());
  } else if (pattern === 1) {
    // Center block
    const top = Math.floor(H / 2) - 1;
    for (let r = top; r < top + 2; r++) for (let c = Math.floor(W / 2) - 2; c < W / 2; c++) setSym(g, r, c, layer());
  } else if (pattern === 2) {
    // Corners
    for (const r of [H - 1, H - 2]) for (const c of [0, 1]) setSym(g, r, c, layer());
    if (strength > 0.4) for (const r of [0, 1]) for (const c of [0, 1]) setSym(g, r, c, layer());
  } else if (pattern === 3) {
    // Pillars
    for (let r = Math.floor(H / 2) - 1; r < H - 1; r++) setSym(g, r, 1, layer());
  } else {
    // Scattered pairs
    const n = 2 + Math.floor(strength * 4);
    for (let i = 0; i < n; i++) setSym(g, 2 + randInt(rng, H - 3), randInt(rng, Math.floor(W / 2)), layer());
  }
}

/**
 * Make sure every cell can be refilled by gravity (straight down or diagonally, as in Board.applyGravity).
 * Boxes that would leave permanently empty cells underneath them are removed (symmetrically).
 */
function ensureFillable(g: Grid): void {
  const H = g.length, W = g[0].length;
  const playable = (r: number, c: number) => r >= 0 && r < H && c >= 0 && c < W && g[r][c] !== ' ';
  // Ice holds its own piece but, like a box, nothing falls through it.
  const isBox = (r: number, c: number) => 'bBCiI'.includes(g[r][c]);
  for (let guard = 0; guard < 64; guard++) {
    const fill: boolean[][] = [];
    let bad: [number, number] | null = null;
    for (let r = 0; r < H && !bad; r++) {
      fill.push([]);
      for (let c = 0; c < W; c++) {
        if (!playable(r, c) || isBox(r, c)) { fill[r][c] = false; continue; }
        let rr = r - 1;
        while (rr >= 0 && !playable(rr, c)) rr--;
        let ok = rr < 0 || (!isBox(rr, c) && fill[rr][c]);
        for (const dc of [-1, 1]) {
          const sr = r - 1, sc = c + dc;
          if (!ok && playable(sr, sc) && !isBox(sr, sc) && fill[sr][sc]) ok = true;
        }
        fill[r][c] = ok;
        if (!ok && !bad) bad = [r, c];
      }
    }
    if (!bad) return;
    // The topmost unfillable cell always has a box as its nearest cell above: remove it (and its mirror).
    const [r, c] = bad;
    let rr = r - 1;
    while (rr >= 0 && !playable(rr, c)) rr--;
    if (rr < 0) return;
    for (const cc of [c, W - 1 - c]) if (isBox(rr, cc)) g[rr][cc] = '.';
  }
}

function addDirt(g: Grid, rng: RNG, strength: number): void {
  const H = g.length, W = g[0].length;
  const layer = () => (strength > 0.5 && rng() < 0.4 ? 'D' : 'd');
  const pattern = randInt(rng, 4);
  const cy = (H - 1) / 2, cx = (W - 1) / 2;
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < Math.ceil(W / 2); c++) {
      let on = false;
      if (pattern === 0) on = Math.abs(r - cy) + Math.abs(c - cx) <= 2.5 + strength * 2; // diamond
      else if (pattern === 1) on = r >= H - 2 - Math.floor(strength * 2); // bottom band
      else if (pattern === 2) on = (r + c) % 2 === 0 && r > 1 && r < H - 1; // checker
      else on = Math.abs(r - c) <= 0 || Math.abs(r - (W - 1 - c)) <= 0 || c === 0; // X + borders
      if (on) setSym(g, r, c, layer());
    }
  }
}

function addIce(g: Grid, rng: RNG, strength: number): void {
  const H = g.length, W = g[0].length;
  const layer = () => (strength > 0.45 && rng() < 0.4 ? 'I' : 'i');
  const pattern = randInt(rng, 4);
  if (pattern === 0) {
    // Checkered band across the middle
    const top = Math.floor(H / 2) - 1;
    for (let r = top; r < top + 2; r++) for (let c = 0; c < W / 2; c++) if ((r + c) % 2 === 0) setSym(g, r, c, layer());
  } else if (pattern === 1) {
    // Diagonal "V"
    for (let r = 2; r < H - 1; r++) setSym(g, r, Math.min(Math.floor(W / 2) - 1, r - 2), layer());
  } else if (pattern === 2) {
    // Blocks low on both sides (+ high ones when stronger)
    for (const r of [H - 3, H - 2]) for (const c of [1, 2]) setSym(g, r, c, layer());
    if (strength > 0.4) for (const r of [2, 3]) setSym(g, r, 0, layer());
  } else {
    // Scattered
    const n = 3 + Math.floor(strength * 4);
    for (let i = 0; i < n; i++) setSym(g, 1 + randInt(rng, H - 1), randInt(rng, Math.ceil(W / 2)), layer());
  }
}

/** A small starting patch of carpet that matches spread from. */
function addCarpet(g: Grid, rng: RNG): void {
  const H = g.length, W = g[0].length;
  const mid = Math.floor(W / 2) - 1;
  const pattern = randInt(rng, 4);
  if (pattern === 0) { setSym(g, H - 1, mid, 'k'); setSym(g, H - 2, mid, 'k'); }
  else if (pattern === 1) for (const r of [Math.floor(H / 2) - 1, Math.floor(H / 2)]) setSym(g, r, mid, 'k');
  else if (pattern === 2) { setSym(g, H - 1, 0, 'k'); setSym(g, H - 1, 1, 'k'); }
  else { setSym(g, 0, mid, 'k'); setSym(g, 1, mid, 'k'); }
  // Odd shapes may have holes there: fall back to the bottom-most free cells in the middle.
  for (let r = H - 1; r >= 0 && count(g, 'k').objects === 0; r--) setSym(g, r, mid, 'k');
}

function count(g: Grid, chars: string): { objects: number; layers: number } {
  let objects = 0, layers = 0;
  for (const row of g) {
    for (const ch of row) {
      const i = chars.indexOf(ch);
      if (i >= 0) { objects++; layers += i + 1; }
    }
  }
  return { objects, layers };
}

/** Fixed early levels that teach one idea at a time. */
function tutorial(n: number): LevelDef | null {
  const full7 = Array.from({ length: 7 }, () => '.......');
  const full8 = SHAPES[0];
  switch (n) {
    case 1: return { n, mask: full7, colors: 4, moves: 20, hard: false, goals: [{ kind: 'color', color: 0, count: 12 }] };
    case 2: return { n, mask: full7, colors: 4, moves: 20, hard: false, goals: [{ kind: 'color', color: 2, count: 15 }, { kind: 'color', color: 3, count: 15 }] };
    case 3: return { n, mask: full8, colors: 4, moves: 22, hard: false, goals: [{ kind: 'color', color: 1, count: 25 }] };
    case 4: {
      const g = toGrid(full8);
      for (let c = 0; c < 4; c++) setSym(g, 7, c, 'b');
      return { n, mask: fromGrid(g), colors: 5, moves: 22, hard: false, goals: [{ kind: 'box', count: 8 }] };
    }
    case 5: return { n, mask: SHAPES[2], colors: 5, moves: 24, hard: false, goals: [{ kind: 'color', color: 4, count: 20 }, { kind: 'color', color: 0, count: 20 }] };
    case 6: {
      const g = toGrid(SHAPES[3]);
      for (let r = 3; r < 5; r++) for (let c = 2; c < 4; c++) setSym(g, r, c, 'd');
      return { n, mask: fromGrid(g), colors: 5, moves: 22, hard: false, goals: [{ kind: 'dirt', count: 8 }] };
    }
    default: return null;
  }
}

/** Where each newer mechanic first shows up (each gets a one-time Mochi tip). */
export const ICE_LEVEL = 21, TOY_LEVEL = 35, CARPET_LEVEL = 51;

/** From level 20 on, newer mechanics join the rotation once they've been introduced. */
function laterKind(n: number, rng: RNG, base: string[]): string {
  if (n === ICE_LEVEL) return 'ice';
  if (n === TOY_LEVEL) return 'toy';
  if (n === CARPET_LEVEL) return 'carpet';
  const pool = [...base];
  if (n > ICE_LEVEL) pool.push('ice', 'ice+color');
  if (n > TOY_LEVEL) pool.push('toy', 'toy+color', 'ice+box');
  if (n > CARPET_LEVEL) pool.push('carpet', 'carpet+color', 'toy+ice', 'carpet+ice');
  // Stride 7 (coprime with every pool size) spreads the kinds out instead of running through them in order.
  return pool[(n * 7 + randInt(rng, 3)) % pool.length];
}

/** Level n as played: generated layout + move count calibrated by the bot (see src/sim/calibrate.ts). */
export function getLevel(n: number): LevelDef {
  const tuned = TUNING[n];
  const level = generateLevel(n, tuned?.[0] ?? 0);
  if (tuned) level.moves = tuned[1];
  return level;
}

export function generateLevel(n: number, variant: number): LevelDef {
  const t = tutorial(n);
  if (t) return t;

  const rng = mulberry32(n * 7919 + 17 + variant * 104729);
  const hard = n % 10 === 0;
  // Difficulty ramps slowly and resets a bit after each hard level so the game never feels like a wall.
  const ramp = Math.min(1, (n - 6) / 80);
  const wave = (n % 10) / 10;
  const strength = Math.min(1, 0.15 + ramp * 0.55 + wave * 0.25 + (hard ? 0.2 : 0));

  const colors = n < 25 ? 5 : rng() < 0.15 + ramp * 0.25 ? 6 : 5;
  const g = toGrid(pick(rng, SHAPES));

  const kinds = ['color', 'box', 'dirt', 'box+color', 'dirt+color', 'box+dirt'];
  const kind = n < 20 ? kinds[(n + randInt(rng, 2)) % kinds.length] : laterKind(n, rng, kinds);
  // The level that introduces a mechanic goes easy on it.
  const intro = n === ICE_LEVEL || n === TOY_LEVEL || n === CARPET_LEVEL;
  const s2 = intro ? Math.min(strength, 0.3) : strength;

  if (kind.includes('box')) addBoxes(g, rng, strength);
  if (kind.includes('ice')) addIce(g, rng, s2);
  if (kind.includes('box') || kind.includes('ice')) ensureFillable(g);
  if (kind.includes('dirt')) addDirt(g, rng, strength);
  if (kind.includes('carpet')) addCarpet(g, rng);

  const goals: Goal[] = [];
  let need = 0, sumNeed = 0;
  const addNeed = (x: number) => { need = Math.max(need, x); sumNeed += x; };

  const boxes = count(g, 'bBC');
  const dirt = count(g, 'dD');
  const ice = count(g, 'iI');
  if (boxes.objects > 0) { goals.push({ kind: 'box', count: boxes.objects }); addNeed(boxes.layers / 1.6); }
  if (dirt.objects > 0) { goals.push({ kind: 'dirt', count: dirt.objects }); addNeed(dirt.layers / 2.2); }
  if (ice.objects > 0) { goals.push({ kind: 'ice', count: ice.objects }); addNeed(ice.layers / 1.5); }
  if (kind.includes('toy')) {
    const toys = Math.floor(2.5 + s2 * 2);
    goals.push({ kind: 'toy', count: toys });
    addNeed(toys * 3);
  }
  if (kind.includes('carpet')) {
    const coverable = count(g, '.dDiI').objects;
    const cover = Math.round(coverable * (0.5 + 0.35 * s2));
    goals.push({ kind: 'carpet', count: cover });
    addNeed(cover / 1.8);
  }

  if (kind.includes('color') || goals.length === 0) {
    const nColors = kind === 'color' && rng() < 0.5 + ramp * 0.3 ? 2 : 1;
    const used = new Set<number>();
    for (let i = 0; i < nColors; i++) {
      let color = randInt(rng, colors);
      while (used.has(color)) color = (color + 1) % colors;
      used.add(color);
      const amount = Math.round((goals.length ? 14 : 22) + strength * (goals.length ? 14 : 22));
      goals.push({ kind: 'color', color, count: amount });
      addNeed(amount / (colors === 6 ? 1.9 : 2.3));
    }
  }

  const estimate = need + 0.45 * (sumNeed - need);
  // Generosity: lots of spare moves early, tighter (but still forgiving) later.
  const generosity = (1.7 - ramp * 0.3) * (hard ? 0.9 : 1);
  const moves = Math.max(16, Math.min(40, Math.ceil(estimate * generosity + 4)));

  return { n, mask: fromGrid(g), colors, moves, goals, hard };
}
