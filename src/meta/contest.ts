// Weekend Design Contest (Fri–Sun, local time): decorate a rotating room with contest tokens earned by winning
// levels, submit once, get scored by 4 judges and ranked against 9 bot entries. Offline & deterministic.
import { mulberry32 } from '../core/rng.ts';
import { getLang } from '../core/i18n.ts';
import { msToMidnight, persist, save, today } from '../core/save.ts';
import { grant, huntActive, weekday, type Reward } from './events.ts';
import { ROOMS, roomTotalCost, type Room } from './rooms.ts';

/** Free tokens handed out when a contest starts. */
export const CONTEST_START_TOKENS = 3;
/** Fewest items a design needs before it can be submitted. */
export const CONTEST_MIN_ITEMS = 3;

export type Placed = Record<string, number>;

// ---------- schedule ----------

/** Same weekend window as the treasure hunt. */
export const contestActive = (d = today()) => huntActive(d);

/** Day number of the Friday that starts the current (or most recent) weekend. */
export function contestFriday(d = today()): number { return d - ((weekday(d) + 2) % 7); }

/** Id of the contest running now, or of the next one on weekdays. */
export function upcomingContestId(): number { return contestActive() ? contestFriday() : contestFriday() + 7; }

/** ms until the next contest starts (next Friday, local midnight). */
export function nextContestIn(): number { return (contestFriday() + 7 - today() - 1) * 86400000 + msToMidnight(); }

export function contestRoom(id = upcomingContestId()): Room {
  return ROOMS[Math.floor(id / 7) % ROOMS.length];
}

// ---------- state ----------

function syncContest() {
  if (!contestActive()) return;
  const id = contestFriday();
  if (save.contest.id !== id) save.contest = { id, tokens: CONTEST_START_TOKENS, placed: {}, submitted: false };
}

export function contestState() { syncContest(); return save.contest; }

/** Results of the latest contest stay visible until the next one starts. */
export function hasContestResult(): boolean {
  syncContest();
  return save.contest.submitted && save.contest.id === contestFriday();
}

export function contestTokensFor(hard: boolean, streakBefore: number): number {
  return 1 + (hard ? 1 : 0) + (streakBefore >= 3 ? 1 : 0);
}

/** Called from recordLevel() after a win. */
export function contestWin(hard: boolean, streakBefore: number) {
  syncContest();
  if (contestActive() && !save.contest.submitted) save.contest.tokens += contestTokensFor(hard, streakBefore);
}

/** Place an item (paying its token cost) or restyle a placed one (free). */
export function contestPlace(item: string, style: number): boolean {
  const c = contestState();
  const task = contestRoom(c.id).tasks.find((tk) => tk.item === item);
  if (!contestActive() || c.submitted || !task) return false;
  if (c.placed[item] === undefined) {
    if (c.tokens < task.cost) return false;
    c.tokens -= task.cost;
  }
  c.placed[item] = style;
  persist();
  return true;
}

/** Take an item back out and refund its tokens. */
export function contestRemove(item: string) {
  const c = contestState();
  const task = contestRoom(c.id).tasks.find((tk) => tk.item === item);
  if (!contestActive() || c.submitted || !task || c.placed[item] === undefined) return;
  delete c.placed[item];
  c.tokens += task.cost;
  persist();
}

// ---------- scoring ----------

export type Family = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'neutral';
export const FAMILY_COLOR: Record<Family, string> = {
  red: '#e0566e', orange: '#f08a3c', yellow: '#f2c335', green: '#5cb85c', blue: '#4f8fd8', purple: '#9b7fd1', neutral: '#d8cbb0',
};
const HUES: Family[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

/** Colour family of a style swatch: low-saturation, very light or very dark colours count as neutral. */
export function swatchFamily(hex: string): Family {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (s < 0.25 || l > 0.88 || l < 0.16) return 'neutral';
  let hue = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  hue = (hue * 60 + 360) % 360;
  return hue < 15 || hue >= 330 ? 'red' : hue < 45 ? 'orange' : hue < 70 ? 'yellow' : hue < 170 ? 'green' : hue < 260 ? 'blue' : 'purple';
}

/** Mochi's favourite colour this weekend (judge 4 rewards it). */
export function mochiFavourite(id = upcomingContestId()): Family { return HUES[Math.floor(id / 7) * 5 % HUES.length]; }

export interface DesignStats { complete: number; harmony: number; variety: number; fav: number; count: number }

export function designStats(room: Room, placed: Placed, fav: Family): DesignStats {
  const used = room.tasks.filter((tk) => placed[tk.item] !== undefined);
  const k = used.length;
  if (!k) return { complete: 0, harmony: 0, variety: 0, fav: 0, count: 0 };
  const complete = used.reduce((s, tk) => s + tk.cost, 0) / roomTotalCost(room);
  const fams = used.map((tk) => swatchFamily(tk.styles[placed[tk.item]].swatch));
  const counts = new Map<Family, number>();
  for (const f of fams) if (f !== 'neutral') counts.set(f, (counts.get(f) ?? 0) + 1);
  const neutral = fams.filter((f) => f === 'neutral').length;
  const [top1 = 0, top2 = 0] = [...counts.values()].sort((a, b) => b - a);
  const styleIdx = used.map((tk) => placed[tk.item]);
  const sameSet = Math.max(...[0, 1, 2].map((i) => styleIdx.filter((s) => s === i).length)) / k;
  // Harmony: a couple of dominant colour families (neutrals go with anything), plus a bonus for a matching set.
  const harmony = Math.min(1, (top1 + 0.4 * top2 + 0.5 * neutral) / k + (sameSet >= 0.8 ? 0.2 : 0));
  // Variety: several families and all three style lines in play.
  const variety = Math.min(1, new Set(fams).size / 4) * 0.6 + (new Set(styleIdx).size / 3) * 0.4;
  return { complete, harmony, variety, fav: fams.filter((f) => f === fav).length / k, count: k };
}

export interface Judge { name: { vi: string; en: string }; avatar: string; color: string }

export const JUDGES: Judge[] = [
  { name: { vi: 'Bà Hồng', en: 'Grandma Rose' }, avatar: '👵', color: '#ff8fb8' },
  { name: { vi: 'Kiến trúc sư Cáo', en: 'Architect Fox' }, avatar: '🦊', color: '#ff9a2e' },
  { name: { vi: 'Gấu trúc Pixel', en: 'Pixel the Panda' }, avatar: '🐼', color: '#6a7cff' },
  { name: { vi: 'Mochi', en: 'Mochi' }, avatar: 'mochi', color: '#ffc94a' },
];

/** Comment keys (i18n) a judge picks from, by what they liked or missed most. */
export type CommentKey =
  | 'cjEmpty' | 'cjCompleteHi' | 'cjCompleteLo' | 'cjHarmonyHi' | 'cjHarmonyLo' | 'cjVarietyHi' | 'cjVarietyLo' | 'cjFavHi' | 'cjFavLo';

export interface Verdict { score: number; comment: CommentKey }

/** Each judge's score (1–10, half points) and comment for a design. */
export function judge(st: DesignStats): Verdict[] {
  const fit = 0.3 + 0.7 * st.complete; // taste only counts once the room is mostly furnished
  const bases = [
    0.55 * st.complete + (0.3 * st.harmony + 0.15 * st.variety) * fit,
    0.25 * st.complete + (0.6 * st.harmony + 0.15 * st.variety) * fit,
    0.25 * st.complete + (0.2 * st.harmony + 0.55 * st.variety) * fit,
    0.3 * st.complete + (0.25 * st.harmony + 0.45 * Math.min(1, st.fav * 2)) * fit,
  ];
  const comments: CommentKey[] = [
    st.complete >= 0.99 ? 'cjCompleteHi' : 'cjCompleteLo',
    st.harmony >= 0.75 ? 'cjHarmonyHi' : 'cjHarmonyLo',
    st.variety >= 0.7 ? 'cjVarietyHi' : 'cjVarietyLo',
    st.fav >= 0.25 ? 'cjFavHi' : 'cjFavLo',
  ];
  return bases.map((b, i) => ({
    score: st.count ? Math.round((1 + 9 * Math.min(1, b) ** 1.6) * 2) / 2 : 1,
    comment: st.count && st.complete >= 0.4 ? comments[i] : 'cjEmpty',
  }));
}

export const totalScore = (v: Verdict[]) => v.reduce((s, x) => s + x.score, 0);

// ---------- bot entries ----------

const BOT_NAMES_VI = ['Linh', 'Minh', 'Hà', 'Tuấn', 'Thảo', 'Khoa', 'Vy', 'Phúc', 'An', 'Ngọc', 'Bảo', 'Trang'];
const BOT_NAMES_EN = ['Emma', 'Liam', 'Mia', 'Noah', 'Ava', 'Leo', 'Zoe', 'Max', 'Lily', 'Sam', 'Ella', 'Finn'];
const BOT_AVATARS = ['🐰', '🐻', '🦊', '🐼', '🐨', '🐸', '🐯', '🐹', '🦁', '🐷'];
export const CONTEST_BOTS = 9;

export interface Entry { name: string; avatar: string; placed: Placed; total: number; you?: boolean }

/** Nine bot designs for a contest, built and scored with the same rules as the player's. */
export function botEntries(id: number): Entry[] {
  const room = contestRoom(id);
  const fav = mochiFavourite(id);
  const rng = mulberry32(id * 131 + 17);
  const names = [...(getLang() === 'vi' ? BOT_NAMES_VI : BOT_NAMES_EN)];
  const bots: Entry[] = [];
  for (let b = 0; b < CONTEST_BOTS; b++) {
    const fill = 0.5 + rng() * 0.5;
    const theme = Math.floor(rng() * 3), loyal = rng();
    const placed: Placed = {};
    for (const tk of room.tasks) {
      if (rng() > fill) continue;
      placed[tk.item] = rng() < loyal ? theme : Math.floor(rng() * 3);
    }
    const name = names.splice(Math.floor(rng() * names.length), 1)[0];
    bots.push({ name, avatar: BOT_AVATARS[Math.floor(rng() * BOT_AVATARS.length)], placed, total: totalScore(judge(designStats(room, placed, fav))) });
  }
  return bots;
}

export interface ContestResult { verdicts: Verdict[]; total: number; rank: number; board: Entry[]; prize: Reward; fav: Family }

export const CONTEST_PRIZES: { upTo: number; reward: Reward }[] = [
  { upTo: 1, reward: { coins: 1000, boosters: { rainbow: 2, bomb: 1 }, infiniteMin: 60 } },
  { upTo: 2, reward: { coins: 600, boosters: { rainbow: 1, rocket: 1 }, infiniteMin: 30 } },
  { upTo: 3, reward: { coins: 400, boosters: { bomb: 1, rocket: 1 }, infiniteMin: 15 } },
  { upTo: 6, reward: { coins: 250, boosters: { hammer: 1 } } },
  { upTo: 10, reward: { coins: 120 } },
];

export const prizeFor = (rank: number): Reward => (CONTEST_PRIZES.find((p) => rank <= p.upTo) ?? CONTEST_PRIZES[CONTEST_PRIZES.length - 1]).reward;

/** Score a design against this contest's bots (ties go to the player). */
export function contestResult(id: number, placed: Placed): ContestResult {
  const room = contestRoom(id);
  const fav = mochiFavourite(id);
  const verdicts = judge(designStats(room, placed, fav));
  const total = totalScore(verdicts);
  const board = [...botEntries(id), { name: '', avatar: '🐱', placed, total, you: true }]
    .sort((a, b) => b.total - a.total || (a.you ? -1 : b.you ? 1 : 0));
  const rank = board.findIndex((e) => e.you) + 1;
  return { verdicts, total, rank, board, prize: prizeFor(rank), fav };
}

/** Lock in this weekend's design and pay out its prize (once). */
export function submitContest(): ContestResult | null {
  const c = contestState();
  if (!contestActive() || c.submitted || Object.keys(c.placed).length < CONTEST_MIN_ITEMS) return null;
  const res = contestResult(c.id, c.placed);
  c.submitted = true;
  grant(res.prize); // persists
  return res;
}
