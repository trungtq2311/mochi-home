// A "casual player" bot used to measure and calibrate level difficulty.
import { Engine } from '../match3/engine.ts';
import type { LevelDef } from '../match3/levels.ts';
import type { Move } from '../match3/board.ts';
import { mulberry32 } from '../core/rng.ts';

/** How useful a swap looks to a player who glances at the goals. */
function evalMove(e: Engine, m: Move): number {
  const bd = e.board;
  const p = bd.piece(m.a.r, m.a.c)!, q = bd.piece(m.b.r, m.b.c)!;
  if (p.special !== 'none' || q.special !== 'none') return 40 + (p.special !== 'none' && q.special !== 'none' ? 40 : 0);
  bd.place(q, m.a.r, m.a.c); bd.place(p, m.b.r, m.b.c);
  const groups = bd.findMatches([m.b, m.a]);
  bd.place(p, m.a.r, m.a.c); bd.place(q, m.b.r, m.b.c);
  const goal = (k: string, color = -1) => e.goals.some((g) => g.kind === k && g.left > 0 && (color < 0 || g.color === color));
  let s = 0;
  for (const g of groups) {
    s += g.cells.length + (g.special !== 'none' ? 10 : 0);
    if (goal('color', g.color)) s += g.cells.length * 2;
    for (const cell of g.cells) {
      if (bd.get(cell.r, cell.c)!.dirt > 0 && goal('dirt')) s += 3;
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if ((bd.get(cell.r + dr, cell.c + dc)?.box ?? 0) > 0 && goal('box')) s += 3;
    }
  }
  return s;
}

export interface PlayResult { won: boolean; movesUsed: number; movesLeft: number; progress: number }

/** Play one game. With `unlimited`, the move limit is ignored and we record how many moves a win took. */
export function playOnce(level: LevelDef, seed: number, unlimited = false): PlayResult {
  const e = new Engine(unlimited ? { ...level, moves: 150 } : level, seed);
  const rng = mulberry32(seed ^ 0x9e3779b9);
  let used = 0;
  for (let guard = 0; guard < 400 && e.state === 'play'; guard++) {
    const moves = e.board.findMoves();
    if (!moves.length) break;
    let acted = false;
    if (rng() < 0.5) {
      e.board.forEachPiece((p) => {
        if (!acted && p.special !== 'none' && rng() < 0.6) acted = e.tapSpecial({ r: p.r, c: p.c });
      });
    }
    if (!acted) {
      const scored = moves.map((m) => ({ m, s: evalMove(e, m) })).sort((a, b) => b.s - a.s);
      const x = rng();
      const m = x < 0.5 ? scored[0].m : x < 0.8 ? scored[Math.floor(rng() * Math.min(4, scored.length))].m : scored[Math.floor(rng() * scored.length)].m;
      acted = e.trySwap(m.a, m.b);
    }
    if (acted) used++;
    for (let t = 0; t < 5000 && e.busy; t++) e.tick(16);
    if (e.busy) throw new Error(`level ${level.n} stuck`);
  }
  const need = e.goals.reduce((s, g) => s + g.need, 0);
  const left = e.goals.reduce((s, g) => s + Math.max(0, g.left), 0);
  return { won: e.state === 'won', movesUsed: used, movesLeft: e.movesLeft, progress: 1 - left / need };
}
