// Engine invariant check: plays many random games (incl. ice / toy / carpet levels) and asserts that the
// engine never gets stuck, cells never stay empty unless blocked by a box or ice above, goals never go
// negative, and the bonus round always finishes.
// Run: node src/sim/invariants.ts [games]   (exit code 1 on failure)
import { Engine, type EngineState } from '../match3/engine.ts';
import { getLevel } from '../match3/levels.ts';
import { mulberry32 } from '../core/rng.ts';

const games = Number(process.argv[2] ?? 300);
const fail = (msg: string): never => { throw new Error(msg); };
/** Read the state fresh (TS would otherwise keep the narrowing from before the engine ran). */
const stateOf = (e: Engine): EngineState => e.state;

function settle(e: Engine, what: string) {
  for (let t = 0; t < 8000 && e.busy; t++) e.tick(16);
  if (e.busy) fail(`${what}: engine stuck (busy)`);
}

function check(e: Engine, where: string) {
  const bd = e.board;
  for (const g of e.goals) if (g.left < 0) fail(`${where}: goal ${g.kind} negative (${g.left})`);
  for (let r = 0; r < bd.rows; r++) {
    for (let c = 0; c < bd.cols; c++) {
      const cell = bd.cells[r][c];
      if (!cell.playable) continue;
      if (cell.ice > 0 && !cell.piece) fail(`${where}: frozen cell ${r},${c} has no piece`);
      if (cell.box > 0 && cell.piece) fail(`${where}: box cell ${r},${c} holds a piece`);
      if (bd.canHold(r, c) && !cell.piece) {
        let blocked = false;
        for (let rr = r - 1; rr >= 0 && !blocked; rr--) {
          const up = bd.cells[rr][c];
          if (up.playable && (up.box > 0 || up.ice > 0)) blocked = true;
        }
        if (!blocked) fail(`${where}: cell ${r},${c} empty with nothing blocking it`);
      }
    }
  }
  if (e.state === 'play') {
    if (bd.findMatches([]).length) fail(`${where}: idle board still has matches`);
    if (!bd.findMoves().length) fail(`${where}: idle board has no moves`);
  }
}

const kinds = new Map<string, number>();
let wins = 0;
const t0 = Date.now();
for (let i = 0; i < games; i++) {
  const rng = mulberry32(i * 7717 + 3);
  // Half the games on levels with the new mechanics (20+), half anywhere.
  const n = i % 2 ? 20 + Math.floor(rng() * 120) : 1 + Math.floor(rng() * 160);
  const level = getLevel(n);
  for (const g of level.goals) kinds.set(g.kind, (kinds.get(g.kind) ?? 0) + 1);
  const e = new Engine(level, i * 31 + 1, rng() < 0.3 ? ['bomb', 'rocketH'] : []);
  const tag = `game ${i} (level ${n})`;
  check(e, `${tag} start`);
  for (let turn = 0; turn < 300 && e.state === 'play'; turn++) {
    const x = rng();
    const bd = e.board;
    if (x < 0.04) e.useHammer({ r: Math.floor(rng() * bd.rows), c: Math.floor(rng() * bd.cols) });
    else if (x < 0.06) e.useBroom(Math.floor(rng() * bd.rows));
    else if (x < 0.08) e.useShuffle();
    else {
      const moves = bd.findMoves();
      const specials: { r: number; c: number }[] = [];
      bd.forEachPiece((p) => { if (p.special !== 'none') specials.push({ r: p.r, c: p.c }); });
      if (specials.length && x < 0.3) e.tapSpecial(specials[Math.floor(rng() * specials.length)]);
      else {
        if (!moves.length) fail(`${tag}: no moves at turn ${turn}`);
        const m = moves[Math.floor(rng() * moves.length)];
        if (!e.trySwap(m.a, m.b)) { if (process.env.DBG) dump(e, m); fail(`${tag}: listed move was rejected`); }
      }
    }
    settle(e, `${tag} turn ${turn}`);
    check(e, `${tag} turn ${turn}`);
    if (stateOf(e) === 'lost' && turn < 60) { e.addMoves(5); settle(e, `${tag} continue`); check(e, `${tag} continue`); }
  }
  if (stateOf(e) === 'won') {
    wins++;
    e.startBonus();
    for (let t = 0; t < 20000 && stateOf(e) === 'bonus'; t++) e.tick(16);
    if (stateOf(e) !== 'done') fail(`${tag}: bonus round never finished`);
    if (e.busy) fail(`${tag}: busy after bonus`);
    check(e, `${tag} after bonus`);
  }
}
console.log(`ok: ${games} games, ${wins} won, goal kinds seen ${JSON.stringify(Object.fromEntries(kinds))}, ${((Date.now() - t0) / 1000).toFixed(1)}s`);
function dump(e: Engine, m: { a: { r: number; c: number }; b: { r: number; c: number } }) {
  const bd = e.board;
  console.log('move', JSON.stringify(m), 'state', e.state, 'busy', e.busy);
  for (let r = 0; r < bd.rows; r++) {
    console.log(bd.cells[r].map((cell) => !cell.playable ? '  ' : cell.box ? 'BB' : !cell.piece ? '..' : cell.piece.toy ? 'TT' : cell.piece.special !== 'none' ? 'SS' : `${cell.piece.color}${cell.ice ? '*' : ' '}`).join(' '));
  }
}
