// Difficulty report: the casual bot plays each level (as tuned) many times.
// Run: node src/sim/simulate.ts [fromLevel] [toLevel] [runs]
import { getLevel } from '../match3/levels.ts';
import { playOnce } from './bot.ts';

const from = Number(process.argv[2] ?? 1);
const to = Number(process.argv[3] ?? 40);
const runs = Number(process.argv[4] ?? 40);

console.log('lvl  moves colors goals                         win%  avgLeft  avgProgressOnLoss');
let total = 0;
for (let n = from; n <= to; n++) {
  const L = getLevel(n);
  let wins = 0, leftSum = 0, lossProg = 0, losses = 0;
  for (let i = 0; i < runs; i++) {
    const res = playOnce(L, 5000 + i * 37);
    if (res.won) { wins++; leftSum += res.movesLeft; } else { losses++; lossProg += res.progress; }
  }
  total += wins / runs;
  const goals = L.goals.map((g) => (g.kind === 'color' ? `c${g.color}:${g.count}` : `${g.kind}:${g.count}`)).join(' ');
  console.log(
    `${String(n).padStart(3)}${L.hard ? '*' : ' '} ${String(L.moves).padStart(5)} ${String(L.colors).padStart(6)}  ${goals.padEnd(28)} ${String(Math.round((wins / runs) * 100)).padStart(5)}%  ${(wins ? leftSum / wins : 0).toFixed(1).padStart(7)}  ${(losses ? lossProg / losses : 1).toFixed(2).padStart(8)}`,
  );
}
console.log(`average win rate: ${Math.round((total / (to - from + 1)) * 100)}%`);
