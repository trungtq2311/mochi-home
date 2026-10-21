// Live-ops style events that always have something running. All offline & deterministic from the local date.
import { mulberry32 } from '../core/rng.ts';
import { addInfiniteLives, msToMidnight, persist, save, today, type BoosterId, type QuestState } from '../core/save.ts';
import { getLang } from '../core/i18n.ts';
import type { Engine } from '../match3/engine.ts';

export interface Reward { coins?: number; boosters?: Partial<Record<BoosterId, number>>; infiniteMin?: number }

export function grant(r: Reward) {
  save.coins += r.coins ?? 0;
  for (const [k, v] of Object.entries(r.boosters ?? {})) save.boosters[k as BoosterId] += v ?? 0;
  if (r.infiniteMin) addInfiniteLives(r.infiniteMin * 60000);
  persist();
}

// ---------- daily login calendar ----------

export const DAILY: Reward[] = [
  { coins: 100 },
  { boosters: { hammer: 1 }, coins: 50 },
  { coins: 200 },
  { boosters: { rocket: 1, bomb: 1 } },
  { boosters: { broom: 1 }, coins: 150 },
  { coins: 300, infiniteMin: 30 },
  { boosters: { rainbow: 1, hammer: 1 }, coins: 500, infiniteMin: 60 },
];

export function dailyAvailable(): boolean { return save.daily.day < today(); }

/** Index of the reward that would be claimed today (calendar resets if a day was skipped). */
export function dailyIndex(): number {
  const d = today();
  if (save.daily.day === d) return save.daily.idx;
  return save.daily.day === d - 1 ? (save.daily.idx + 1) % DAILY.length : 0;
}

export function claimDaily(): Reward | null {
  if (!dailyAvailable()) return null;
  const idx = dailyIndex();
  save.daily = { day: today(), idx };
  grant(DAILY[idx]);
  return DAILY[idx];
}

// ---------- daily quests ----------

const QUEST_POOL: { type: QuestState['type']; target: number; coins: number; booster: BoosterId | null }[] = [
  { type: 'win', target: 3, coins: 150, booster: null },
  { type: 'color', target: 60, coins: 100, booster: null },
  { type: 'rocket', target: 5, coins: 100, booster: 'rocket' },
  { type: 'bomb', target: 3, coins: 100, booster: 'bomb' },
  { type: 'plane', target: 4, coins: 120, booster: null },
  { type: 'rainbow', target: 1, coins: 100, booster: 'hammer' },
  { type: 'box', target: 15, coins: 120, booster: null },
  { type: 'dirt', target: 20, coins: 120, booster: null },
  { type: 'booster', target: 2, coins: 80, booster: 'shuffle' },
];

export const QUEST_CHEST: Reward = { coins: 250, boosters: { rainbow: 1, broom: 1 } };

export function ensureQuests() {
  const d = today();
  if (save.quests.day === d) return;
  const rng = mulberry32(d * 31 + 7);
  const pool = [...QUEST_POOL];
  const items: QuestState[] = [];
  // Always one "win" quest, plus two others.
  items.push({ ...pool.splice(0, 1)[0], color: 0, progress: 0, claimed: false });
  for (let i = 0; i < 2; i++) {
    const q = pool.splice(Math.floor(rng() * pool.length), 1)[0];
    items.push({ ...q, color: Math.floor(rng() * 5), progress: 0, claimed: false });
  }
  save.quests = { day: d, items, chest: false };
  persist();
}

export function questsClaimable(): number {
  ensureQuests();
  let n = save.quests.items.filter((q) => !q.claimed && q.progress >= q.target).length;
  if (!save.quests.chest && save.quests.items.every((q) => q.claimed)) n++;
  return n;
}

export function claimQuest(i: number) {
  const q = save.quests.items[i];
  if (!q || q.claimed || q.progress < q.target) return;
  q.claimed = true;
  grant({ coins: q.coins, boosters: q.booster ? { [q.booster]: 1 } : {} });
}

export function claimChest(): boolean {
  if (save.quests.chest || !save.quests.items.every((q) => q.claimed)) return false;
  save.quests.chest = true;
  grant(QUEST_CHEST);
  return true;
}

export function questsResetIn(): number { return msToMidnight(); }

// ---------- rotating collection festival (3 days each) ----------

export interface Festival { id: number; name: { vi: string; en: string }; icon: string; color: string }

const FESTIVALS: Omit<Festival, 'id'>[] = [
  { name: { vi: 'Lễ hội Hoa Anh Đào', en: 'Cherry Blossom Festival' }, icon: '🌸', color: '#ff8fb8' },
  { name: { vi: 'Tiệc Bánh Quy', en: 'Cookie Party' }, icon: '🍪', color: '#d9934a' },
  { name: { vi: 'Đêm Sao Băng', en: 'Shooting Star Night' }, icon: '⭐', color: '#6a7cff' },
  { name: { vi: 'Mùa Dâu Tây', en: 'Strawberry Season' }, icon: '🍓', color: '#ff5a6e' },
  { name: { vi: 'Lễ hội Đèn Lồng', en: 'Lantern Festival' }, icon: '🏮', color: '#ff7a2f' },
  { name: { vi: 'Ngày Hội Bóng Bay', en: 'Balloon Day' }, icon: '🎈', color: '#3fb6ff' },
];

export const FESTIVAL_DAYS = 3;
export const MILESTONES: { at: number; reward: Reward }[] = [
  { at: 20, reward: { coins: 100 } },
  { at: 50, reward: { boosters: { hammer: 1 } } },
  { at: 90, reward: { coins: 200 } },
  { at: 140, reward: { boosters: { rocket: 1, bomb: 1 } } },
  { at: 200, reward: { coins: 300, infiniteMin: 15 } },
  { at: 270, reward: { boosters: { broom: 1, shuffle: 1 } } },
  { at: 350, reward: { coins: 400 } },
  { at: 440, reward: { boosters: { rainbow: 1 }, infiniteMin: 30 } },
  { at: 540, reward: { coins: 600 } },
  { at: 650, reward: { coins: 1000, boosters: { rainbow: 2, bomb: 2, rocket: 2 }, infiniteMin: 60 } },
];

export function festival(): Festival {
  const id = Math.floor(today() / FESTIVAL_DAYS);
  return { id, ...FESTIVALS[id % FESTIVALS.length] };
}

export function festivalEndsIn(): number {
  const f = festival();
  const daysLeft = (f.id + 1) * FESTIVAL_DAYS - today() - 1;
  return daysLeft * 86400000 + msToMidnight();
}

function syncFestival() {
  const f = festival();
  if (save.collect.id !== f.id) save.collect = { id: f.id, points: 0, claimed: 0 };
}

export function festivalPoints(): number { syncFestival(); return save.collect.points; }

export function festivalClaimable(): number {
  syncFestival();
  return MILESTONES.filter((m, i) => i >= save.collect.claimed && save.collect.points >= m.at).length;
}

export function claimFestival(): Reward[] {
  syncFestival();
  const got: Reward[] = [];
  while (save.collect.claimed < MILESTONES.length && save.collect.points >= MILESTONES[save.collect.claimed].at) {
    const m = MILESTONES[save.collect.claimed++];
    grant(m.reward);
    got.push(m.reward);
  }
  persist();
  return got;
}

export function festivalPointsFor(streak: number, hard: boolean): number {
  return 10 + Math.min(3, streak) * 5 + (hard ? 10 : 0);
}

// ---------- daily race vs. bots ----------

export const RACE_GOAL = 10;
const BOT_NAMES_VI = ['Linh', 'Minh', 'Hà', 'Tuấn', 'Thảo', 'Khoa', 'Vy', 'Phúc', 'An', 'Ngọc', 'Bảo', 'Trang'];
const BOT_NAMES_EN = ['Emma', 'Liam', 'Mia', 'Noah', 'Ava', 'Leo', 'Zoe', 'Max', 'Lily', 'Sam', 'Ella', 'Finn'];
const BOT_AVATARS = ['🐰', '🐻', '🦊', '🐼', '🐨', '🐸', '🐯', '🐹'];

export interface Racer { name: string; avatar: string; wins: number; you?: boolean }

function syncRace() {
  const d = today();
  if (save.race.id !== d) save.race = { id: d, start: Date.now(), wins: 0, claimed: false };
}

export function raceEndsIn(): number { return msToMidnight(); }

export function racers(): Racer[] {
  syncRace();
  const rng = mulberry32(save.race.id * 97 + 3);
  const names = getLang() === 'vi' ? BOT_NAMES_VI : BOT_NAMES_EN;
  const elapsedMin = (Date.now() - save.race.start) / 60000;
  const bots: Racer[] = [];
  const intervals = [24, 32, 45, 70];
  for (let i = 0; i < 4; i++) {
    const interval = intervals[i] * (0.85 + rng() * 0.3);
    const offset = rng() * interval;
    bots.push({
      name: names[Math.floor(rng() * names.length)],
      avatar: BOT_AVATARS[Math.floor(rng() * BOT_AVATARS.length)],
      wins: Math.min(RACE_GOAL, Math.max(0, Math.floor((elapsedMin + offset - interval) / interval))),
    });
  }
  const all = [...bots, { name: '', avatar: '🐱', wins: save.race.wins, you: true }];
  return all.sort((a, b) => b.wins - a.wins || (a.you ? -1 : 1));
}

/** Your finishing place (1-based) once you reach the goal, else null. */
export function racePlace(): number | null {
  syncRace();
  if (save.race.wins < RACE_GOAL) return null;
  return racers().findIndex((r) => r.you) + 1;
}

export const RACE_PRIZES: Reward[] = [
  { coins: 500, boosters: { rainbow: 1, bomb: 1 } },
  { coins: 250, boosters: { rocket: 1 } },
  { coins: 100 },
];

export function claimRace(): Reward | null {
  const place = racePlace();
  if (place === null || save.race.claimed) return null;
  save.race.claimed = true;
  const prize = RACE_PRIZES[place - 1] ?? { coins: 50 };
  grant(prize);
  return prize;
}

// ---------- hooks from gameplay ----------

/** Apply a finished level's stats to quests / festival / race. */
export function recordLevel(engine: Engine, won: boolean, streakBefore: number) {
  ensureQuests();
  const s = engine.stats;
  for (const q of save.quests.items) {
    if (q.claimed) continue;
    const add =
      q.type === 'win' ? (won ? 1 : 0)
      : q.type === 'color' ? s.cleared[q.color]
      : q.type === 'rocket' ? s.rockets
      : q.type === 'bomb' ? s.bombs
      : q.type === 'plane' ? s.planes
      : q.type === 'rainbow' ? s.rainbows
      : q.type === 'box' ? s.boxes
      : q.type === 'dirt' ? s.dirt
      : s.boosters;
    q.progress = Math.min(q.target, q.progress + add);
  }
  if (won) {
    syncFestival();
    save.collect.points += festivalPointsFor(streakBefore, engine.level.hard);
    syncRace();
    if (save.race.wins < RACE_GOAL) save.race.wins++;
  }
  persist();
}
