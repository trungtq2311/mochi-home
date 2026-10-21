import { setLang, type Lang } from './i18n.ts';

export type BoosterId = 'hammer' | 'broom' | 'shuffle' | 'rocket' | 'bomb' | 'rainbow';

export interface QuestState {
  type: 'win' | 'color' | 'rocket' | 'bomb' | 'plane' | 'rainbow' | 'box' | 'dirt' | 'booster';
  color: number;
  target: number;
  progress: number;
  claimed: boolean;
  coins: number;
  booster: BoosterId | null;
}

export interface SaveData {
  v: 1;
  level: number;
  stars: number;
  coins: number;
  lives: number;
  lifeTs: number;
  infiniteUntil: number;
  boosters: Record<BoosterId, number>;
  room: number;
  /** Finished task id → chosen style. */
  done: Record<string, number>;
  streak: number;
  /** Consecutive losses on the current level. */
  fails: number;
  wins: number;
  sound: boolean;
  music: boolean;
  lang: Lang;
  daily: { day: number; idx: number };
  quests: { day: number; items: QuestState[]; chest: boolean };
  collect: { id: number; points: number; claimed: number };
  race: { id: number; start: number; wins: number; claimed: boolean };
  seen: Record<string, boolean>;
  /** Mochi Pass season: points earned and number of tiers claimed. */
  pass: { id: number; points: number; claimed: number };
  /** Weekend treasure hunt (id = day number of that Friday); opened = chest indices. */
  hunt: { id: number; keys: number; opened: number[] };
  piggy: { coins: number; broken: number };
  deal: { day: number };
  /** Mochi Bay town: index of the area being restored, and finished task id → chosen style. */
  area: number;
  town: Record<string, number>;
  /** Weekend design contest (id = day number of that Friday); placed = item key → style. */
  contest: { id: number; tokens: number; placed: Record<string, number>; submitted: boolean };
}

export const MAX_LIVES = 5;
export const LIFE_MS = 15 * 60 * 1000;
const KEY = 'mochi-home-save-v1';

function fresh(): SaveData {
  return {
    v: 1,
    level: 1,
    stars: 0,
    coins: 500,
    lives: MAX_LIVES,
    lifeTs: Date.now(),
    infiniteUntil: 0,
    boosters: { hammer: 2, broom: 2, shuffle: 2, rocket: 2, bomb: 2, rainbow: 1 },
    room: 0,
    done: {},
    streak: 0,
    fails: 0,
    wins: 0,
    sound: true,
    music: false,
    lang: 'en',
    daily: { day: -1, idx: -1 },
    quests: { day: -1, items: [], chest: false },
    collect: { id: -1, points: 0, claimed: 0 },
    race: { id: -1, start: 0, wins: 0, claimed: false },
    seen: {},
    pass: { id: -1, points: 0, claimed: 0 },
    hunt: { id: -1, keys: 0, opened: [] },
    piggy: { coins: 0, broken: 0 },
    deal: { day: -1 },
    // Old saves get these defaults (load() merges); their room progress stays in `room`/`done`.
    area: 0,
    town: {},
    contest: { id: -1, tokens: 0, placed: {}, submitted: false },
  };
}

function load(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch { /* storage unavailable: play without saving */ }
  return fresh();
}

export const save: SaveData = load();
setLang(save.lang);

export function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(save)); } catch { /* ignore */ }
}

export function resetSave() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  location.reload();
}

/** Local calendar day number (changes at local midnight). */
export function today(): number {
  const d = new Date();
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
}

/** ms until next local midnight. */
export function msToMidnight(): number {
  const d = new Date();
  const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  return next.getTime() - d.getTime();
}

export function syncLives() {
  const now = Date.now();
  if (save.lives >= MAX_LIVES) { save.lifeTs = now; return; }
  const gained = Math.floor((now - save.lifeTs) / LIFE_MS);
  if (gained > 0) {
    save.lives = Math.min(MAX_LIVES, save.lives + gained);
    save.lifeTs += gained * LIFE_MS;
    if (save.lives >= MAX_LIVES) save.lifeTs = now;
    persist();
  }
}

export function hasInfiniteLives(): boolean { return Date.now() < save.infiniteUntil; }

export function canPlay(): boolean {
  syncLives();
  return hasInfiniteLives() || save.lives > 0;
}

export function loseLife() {
  if (hasInfiniteLives()) return;
  syncLives();
  if (save.lives >= MAX_LIVES) save.lifeTs = Date.now();
  save.lives = Math.max(0, save.lives - 1);
  persist();
}

export function nextLifeIn(): number {
  syncLives();
  if (save.lives >= MAX_LIVES) return 0;
  return LIFE_MS - (Date.now() - save.lifeTs);
}

export function addInfiniteLives(ms: number) {
  save.infiniteUntil = Math.max(Date.now(), save.infiniteUntil) + ms;
  persist();
}

export function fmtTime(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h >= 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
  return `${m}:${String(sec).padStart(2, '0')}`;
}
