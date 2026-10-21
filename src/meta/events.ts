// Live-ops style events that always have something running. All offline & deterministic from the local date.
import { mulberry32 } from '../core/rng.ts';
import { addInfiniteLives, msToMidnight, persist, save, today, type BoosterId, type QuestState } from '../core/save.ts';
import { getLang } from '../core/i18n.ts';
import type { Engine } from '../match3/engine.ts';
import { contestWin } from './contest.ts';

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
  addPassPoints(PASS_QUEST_POINTS);
  grant({ coins: q.coins, boosters: q.booster ? { [q.booster]: 1 } : {} });
}

export function claimChest(): boolean {
  if (save.quests.chest || !save.quests.items.every((q) => q.claimed)) return false;
  save.quests.chest = true;
  addPassPoints(PASS_CHEST_POINTS);
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

// ---------- Mochi Pass: 14-day season with a free reward track ----------

export interface Season { id: number; name: { vi: string; en: string }; icon: string; color: string }

const SEASONS: Omit<Season, 'id'>[] = [
  { name: { vi: 'Mùa Kẹo Ngọt', en: 'Candy Season' }, icon: '🍬', color: '#ff7eb6' },
  { name: { vi: 'Mùa Biển Xanh', en: 'Seaside Season' }, icon: '🐚', color: '#3fb6ff' },
  { name: { vi: 'Mùa Vườn Hoa', en: 'Garden Season' }, icon: '🌷', color: '#5fd13a' },
  { name: { vi: 'Mùa Trăng Rằm', en: 'Moonlight Season' }, icon: '🌙', color: '#8a6bff' },
  { name: { vi: 'Mùa Lá Vàng', en: 'Golden Leaf Season' }, icon: '🍁', color: '#ff9a2e' },
  { name: { vi: 'Mùa Bông Tuyết', en: 'Snowflake Season' }, icon: '❄️', color: '#4fc3f7' },
];

export const PASS_DAYS = 14;
export const PASS_QUEST_POINTS = 30;
export const PASS_CHEST_POINTS = 60;

const PASS_REWARDS: Reward[] = [
  { coins: 100 },
  { boosters: { hammer: 1 } },
  { coins: 150 },
  { boosters: { rocket: 1, bomb: 1 } },
  { coins: 200, infiniteMin: 15 },
  { coins: 200 },
  { boosters: { broom: 1, shuffle: 1 } },
  { coins: 250 },
  { boosters: { rainbow: 1 } },
  { coins: 300, boosters: { bomb: 1 }, infiniteMin: 30 },
  { boosters: { hammer: 2 } },
  { coins: 300 },
  { boosters: { rocket: 2, bomb: 2 } },
  { coins: 350, infiniteMin: 30 },
  { coins: 300, boosters: { rainbow: 1, broom: 1 } },
  { coins: 400 },
  { boosters: { hammer: 1, rocket: 1, bomb: 1 } },
  { coins: 500 },
  { boosters: { rainbow: 2 }, infiniteMin: 45 },
  { coins: 1500, boosters: { rainbow: 2, bomb: 2, rocket: 2 }, infiniteMin: 120 },
];

/** Cumulative points per tier: 60, 130, 210, … (3100 for all 20, roughly 9–10 casual days). */
export const PASS_TIERS: { at: number; reward: Reward; big: boolean }[] = (() => {
  let at = 0;
  return PASS_REWARDS.map((reward, i) => ({ at: (at += 60 + i * 10), reward, big: (i + 1) % 5 === 0 }));
})();

export function passSeason(): Season {
  const id = Math.floor(today() / PASS_DAYS);
  return { id, ...SEASONS[id % SEASONS.length] };
}

export function passEndsIn(): number {
  const daysLeft = (passSeason().id + 1) * PASS_DAYS - today() - 1;
  return daysLeft * 86400000 + msToMidnight();
}

function syncPass() {
  const id = passSeason().id;
  if (save.pass.id !== id) save.pass = { id, points: 0, claimed: 0 };
}

export function passPoints(): number { syncPass(); return save.pass.points; }

/** Number of tiers whose points have been reached. */
export function passTier(): number {
  const pts = passPoints();
  return PASS_TIERS.filter((tier) => pts >= tier.at).length;
}

export function passClaimable(): number { return passTier() - save.pass.claimed; }

export function claimPass(): Reward[] {
  const got: Reward[] = [];
  const reached = passTier();
  while (save.pass.claimed < reached) {
    const r = PASS_TIERS[save.pass.claimed++].reward;
    grant(r);
    got.push(r);
  }
  persist();
  return got;
}

export function passPointsFor(streak: number, hard: boolean): number {
  return 25 + Math.min(3, streak) * 5 + (hard ? 15 : 0);
}

function addPassPoints(n: number) {
  syncPass();
  save.pass.points += n;
}

// ---------- weekend treasure hunt (Fri–Sun, local time) ----------

export const HUNT_SIZE = 16;
/** Free keys handed out at the start of every weekend. */
export const HUNT_START_KEYS = 3;

export const HUNT_GRAND: Reward = { coins: 1000, boosters: { rainbow: 2, bomb: 2, rocket: 2 }, infiniteMin: 60 };
const HUNT_POOL: Reward[] = [
  { coins: 50 }, { coins: 80 }, { coins: 100 }, { coins: 100 }, { coins: 150 }, { coins: 200 },
  { boosters: { hammer: 1 } }, { boosters: { broom: 1 } }, { boosters: { shuffle: 2 } }, { boosters: { rocket: 1 } },
  { boosters: { bomb: 1 } }, { boosters: { rainbow: 1 } }, { infiniteMin: 15 }, { coins: 120, boosters: { rocket: 1 } },
  { coins: 250, infiniteMin: 15 },
];

/** 0 = Sunday … 6 = Saturday, for a local day number (day 0 was a Thursday). */
export function weekday(d = today()): number { return (d + 4) % 7; }

export function huntActive(d = today()): boolean { const w = weekday(d); return w === 5 || w === 6 || w === 0; }

/** Day number of the Friday that starts the current (or most recent) weekend. */
function huntFriday(d = today()): number { return d - ((weekday(d) + 2) % 7); }

export function huntEndsIn(): number {
  const daysLeft = huntFriday() + 3 - today() - 1;
  return daysLeft * 86400000 + msToMidnight();
}

export function huntStartsIn(): number {
  const daysLeft = (5 - weekday() + 7) % 7;
  return (daysLeft - 1) * 86400000 + msToMidnight();
}

function syncHunt() {
  if (!huntActive()) return;
  const id = huntFriday();
  if (save.hunt.id !== id) save.hunt = { id, keys: HUNT_START_KEYS, opened: [] };
}

/** Chest contents for a weekend: the pool plus the grand prize, shuffled deterministically. */
export function huntLayout(id = huntFriday()): Reward[] {
  const rng = mulberry32(id * 53 + 11);
  const cells = [...HUNT_POOL, HUNT_GRAND];
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells;
}

export function huntKeys(): number { syncHunt(); return huntActive() ? save.hunt.keys : 0; }

export function huntOpened(): number[] { syncHunt(); return huntActive() ? save.hunt.opened : []; }

export function huntKeysFor(hard: boolean): number { return hard ? 2 : 1; }

export function openHuntChest(i: number): Reward | null {
  syncHunt();
  if (!huntActive() || save.hunt.keys <= 0 || save.hunt.opened.includes(i) || i < 0 || i >= HUNT_SIZE) return null;
  save.hunt.keys--;
  save.hunt.opened.push(i);
  const r = huntLayout(save.hunt.id)[i];
  grant(r);
  return r;
}

// ---------- piggy bank ----------

export const PIGGY_CAP = 1000;

export function piggyCoinsFor(hard: boolean): number { return hard ? 100 : 60; }

export function piggyFull(): boolean { return save.piggy.coins >= PIGGY_CAP; }

/**
 * Break the piggy and keep its coins. The offline build makes this free once the piggy is full.
 * TODO(IAP): when store billing lands, gate this behind a purchase (e.g. `await purchase('piggy_bank')`)
 * and allow breaking before it is full; keep this function as the single place that pays out.
 */
export function breakPiggy(): number {
  if (!piggyFull()) return 0;
  const coins = save.piggy.coins;
  save.piggy = { coins: 0, broken: save.piggy.broken + 1 };
  grant({ coins });
  return coins;
}

// ---------- daily deal ----------

/** Rough coin value of one booster (the shop sells packs of 3). */
const BOOSTER_VALUE: Record<BoosterId, number> = { hammer: 100, broom: 135, shuffle: 70, rocket: 85, bomb: 100, rainbow: 150 };

const DEALS: { reward: Reward; off: number }[] = [
  { reward: { boosters: { rocket: 2, bomb: 2 } }, off: 60 },
  { reward: { boosters: { hammer: 2, broom: 1 } }, off: 50 },
  { reward: { boosters: { rainbow: 2, shuffle: 1 } }, off: 55 },
  { reward: { boosters: { rocket: 1, bomb: 1, rainbow: 1, hammer: 1 } }, off: 65 },
  { reward: { boosters: { broom: 2, shuffle: 2 }, infiniteMin: 30 }, off: 60 },
  { reward: { boosters: { rainbow: 1, bomb: 2 }, infiniteMin: 60 }, off: 50 },
  { reward: { boosters: { hammer: 1, broom: 1, shuffle: 1, rocket: 1, bomb: 1, rainbow: 1 } }, off: 70 },
];

export interface Deal { reward: Reward; off: number; was: number; price: number }

export function dailyDeal(d = today()): Deal {
  // ×3 is coprime with the deal count, so consecutive days never repeat a bundle.
  const deal = DEALS[(d * 3) % DEALS.length];
  const was = Object.entries(deal.reward.boosters ?? {}).reduce((s, [k, v]) => s + BOOSTER_VALUE[k as BoosterId] * (v ?? 0), 0)
    + (deal.reward.infiniteMin ?? 0) * 5;
  return { ...deal, was, price: Math.round((was * (100 - deal.off)) / 1000) * 10 };
}

export function dealBought(): boolean { return save.deal.day === today(); }

export function buyDeal(): Reward | null {
  const deal = dailyDeal();
  if (dealBought() || save.coins < deal.price) return null;
  save.coins -= deal.price;
  save.deal = { day: today() };
  grant(deal.reward);
  return deal.reward;
}

// ---------- hooks from gameplay ----------

/** Apply a finished level's stats to quests / festival / race / pass / hunt / piggy. */
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
    addPassPoints(passPointsFor(streakBefore, engine.level.hard));
    syncHunt();
    if (huntActive() && save.hunt.opened.length < HUNT_SIZE) save.hunt.keys += huntKeysFor(engine.level.hard);
    save.piggy.coins = Math.min(PIGGY_CAP, save.piggy.coins + piggyCoinsFor(engine.level.hard));
    contestWin(engine.level.hard, streakBefore);
  }
  persist();
}
