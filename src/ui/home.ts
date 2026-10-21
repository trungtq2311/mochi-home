import { sfx } from '../core/audio.ts';
import { t, tl } from '../core/i18n.ts';
import { fmtTime, hasInfiniteLives, MAX_LIVES, msToMidnight, nextLifeIn, persist, save, syncLives } from '../core/save.ts';
import {
  dailyAvailable, dailyDeal, dealBought, festival, festivalClaimable, festivalEndsIn, grant, HUNT_SIZE, huntActive, huntEndsIn, huntKeys,
  huntOpened, huntStartsIn, passClaimable, passEndsIn, PIGGY_CAP, piggyFull, questsClaimable, racePlace, raceEndsIn, type Reward,
} from '../meta/events.ts';
import { mascotSVG } from '../meta/roomArt.ts';
import { ROOMS, type Room } from '../meta/rooms.ts';
import { AREAS, areaTotalCost, type Area, type TownTask } from '../meta/town.ts';
import { townIconSVG, type TownState } from '../meta/townArt.ts';
import { artKeys, loadArt } from '../art/assets.ts';
import { btn, h, icon, mochiSay, modal, rewardChips, toast } from './dom.ts';
import { nav } from './nav.ts';
import {
  showDaily, showDeal, showFestival, showHunt, showLevelStart, showLives, showPass, showPiggy, showQuests, showRace, showSettings, showShop,
} from './popups.ts';
import { createTownView } from './town.ts';

let teardown: (() => void) | null = null;

export function leaveHome() {
  teardown?.();
  teardown = null;
}

/** Interior rooms are kept for the weekend design contest. */
export function currentRoom(): Room {
  return ROOMS[Math.min(save.room, ROOMS.length - 1)];
}

export function placedFor(room: Room): Record<string, number> {
  const placed: Record<string, number> = {};
  for (const task of room.tasks) if (save.done[task.id] !== undefined) placed[task.item] = save.done[task.id];
  return placed;
}

export const townState = (): TownState => ({ styles: save.town, area: save.area });
export const currentArea = (): Area | null => AREAS[save.area] ?? null;

const ROOM_REWARD: Reward = { coins: 500, boosters: { rainbow: 1, bomb: 1, rocket: 1 } };

export function showHome(opts: { fromWin?: boolean } = {}) {
  leaveHome();
  const app = document.getElementById('app')!;
  app.innerHTML = '';
  let area = currentArea();

  const town = createTownView(townState, (i) => tapArea(i));
  if (import.meta.env.DEV) (window as unknown as { __town: typeof town }).__town = town;
  // Painted town art (if any) loads lazily; swap it in once decoded.
  const painted = artKeys('town/');
  if (painted.length) void loadArt(painted).then(() => { if (town.el.isConnected) for (const a of AREAS) for (const tk of a.tasks) town.swapItem(tk.id); });

  // ----- top bar -----
  const livesVal = h('b', {});
  const livesSub = h('small', {});
  const starsVal = h('b', {});
  const coinsVal = h('b', {});
  const topbar = h('div', { class: 'topbar' },
    h('button', { class: 'pill', onclick: () => { sfx('click'); showLives(); } }, icon('heart'), h('span', { class: 'pill-text' }, livesVal, livesSub)),
    h('button', { class: 'pill', onclick: () => { sfx('click'); openTasks(); } }, icon('star'), h('span', { class: 'pill-text' }, starsVal)),
    h('button', { class: 'pill', onclick: () => { sfx('click'); showShop(); } }, icon('coin'), h('span', { class: 'pill-text' }, coinsVal), h('span', { class: 'pill-plus' }, '+')),
    btn(icon('gear'), 'round', () => showSettings(false)),
  );

  // ----- area banner -----
  const bannerName = h('div', { class: 'room-name' });
  const bannerFill = h('div', { class: 'fill' });
  const bannerPct = h('span', {});
  const banner = h('div', { class: 'room-banner' }, bannerName, h('div', { class: 'bar' }, bannerFill, bannerPct));
  banner.addEventListener('click', () => { sfx('click'); void town.focusArea(save.area); });

  // ----- events column -----
  const evt = (iconNode: Node, onClick: () => void) => {
    const label = h('span', { class: 'evt-label' });
    const badge = h('span', { class: 'badge hidden' });
    const el = h('button', { class: 'evt', onclick: () => { sfx('click'); onClick(); } }, iconNode, label, badge);
    return { el, label, badge };
  };
  const fest = festival();
  const eDaily = evt(icon('gift'), showDaily);
  const eQuests = evt(icon('scroll'), showQuests);
  const eFest = evt(h('span', { class: 'ic emoji', style: `--glow:${fest.color}` }, fest.icon), showFestival);
  const eRace = evt(icon('flag'), showRace);
  const side = h('div', { class: 'side-left' }, eDaily.el, eQuests.el, eFest.el, eRace.el);
  const ePass = evt(icon('ticket'), showPass);
  const eHunt = evt(icon('chest'), showHunt);
  const ePiggy = evt(icon('piggy'), showPiggy);
  const eDeal = evt(icon('tag'), showDeal);
  const sideRight = h('div', { class: 'side-right' }, ePass.el, eHunt.el, ePiggy.el, eDeal.el);

  // ----- bottom -----
  const tasksBadge = h('span', { class: 'badge hidden' }, '!');
  const tasksBtn = btn(h('span', { class: 'btn-inner' }, icon('star'), h('span', {}, t('tasks')), tasksBadge), 'blue tasks-btn', () => openTasks());
  const playLabel = h('small', {});
  const playBtn = btn(h('span', { class: 'btn-col' }, h('span', {}, t('play')), playLabel), 'green huge play-btn', () => showLevelStart(save.level));
  const bottom = h('div', { class: 'bottom-bar' }, tasksBtn, playBtn);

  const screen = h('div', { class: 'screen home' }, town.el, h('div', { class: 'home-shade' }), topbar, banner, side, sideRight, bottom);
  app.append(screen);

  const setBadge = (b: HTMLElement, n: number | string) => {
    b.textContent = String(n);
    b.classList.toggle('hidden', !n);
  };

  const refresh = () => {
    syncLives();
    livesVal.textContent = hasInfiniteLives() ? '∞' : String(save.lives);
    livesSub.textContent = hasInfiniteLives() ? fmtTime(save.infiniteUntil - Date.now()) : save.lives >= MAX_LIVES ? t('full') : fmtTime(nextLifeIn());
    starsVal.textContent = String(save.stars);
    coinsVal.textContent = String(save.coins);
    const shown = area ?? AREAS[AREAS.length - 1];
    const total = areaTotalCost(shown);
    const done = shown.tasks.filter((tk) => save.town[tk.id] !== undefined).reduce((s, tk) => s + tk.cost, 0);
    bannerName.textContent = `${tl(shown.name)} · ${Math.min(save.area + 1, AREAS.length)}/${AREAS.length}`;
    bannerFill.style.width = `${(done / total) * 100}%`;
    bannerPct.textContent = `${Math.round((done / total) * 100)}%`;
    playLabel.textContent = t('level', save.level);
    eDaily.label.textContent = t('dailyShort');
    setBadge(eDaily.badge, dailyAvailable() ? '!' : 0);
    eQuests.label.textContent = t('questsShort');
    setBadge(eQuests.badge, questsClaimable());
    eFest.label.textContent = fmtTime(festivalEndsIn());
    setBadge(eFest.badge, festivalClaimable());
    eRace.label.textContent = fmtTime(raceEndsIn());
    setBadge(eRace.badge, racePlace() !== null && !save.race.claimed ? '!' : 0);
    ePass.label.textContent = fmtTime(passEndsIn());
    setBadge(ePass.badge, passClaimable());
    const hunting = huntActive();
    eHunt.el.classList.toggle('off', !hunting);
    eHunt.label.textContent = fmtTime(hunting ? huntEndsIn() : huntStartsIn());
    setBadge(eHunt.badge, hunting && huntOpened().length < HUNT_SIZE ? huntKeys() : 0);
    ePiggy.label.textContent = piggyFull() ? t('fullTag') : `${Math.floor((save.piggy.coins / PIGGY_CAP) * 100)}%`;
    setBadge(ePiggy.badge, piggyFull() ? '!' : 0);
    eDeal.label.textContent = fmtTime(msToMidnight());
    setBadge(eDeal.badge, !dealBought() && save.coins >= dailyDeal().price ? '!' : 0);
    const next = area?.tasks.find((tk) => save.town[tk.id] === undefined);
    const affordable = !!next && save.stars >= next.cost;
    setBadge(tasksBadge, affordable ? '!' : save.stars);
    tasksBadge.classList.toggle('count', !affordable);
    tasksBtn.classList.toggle('pulse', affordable);
  };
  refresh();
  const iv = setInterval(refresh, 1000);
  nav.refresh = refresh;
  teardown = () => { clearInterval(iv); town.destroy(); };

  // ----- map taps -----
  function tapArea(i: number) {
    if (i === save.area) { sfx('click'); openTasks(); return; }
    const a = AREAS[i];
    void town.flyTo(a.x, a.y - 20, undefined, 700);
    if (i > save.area) { sfx('click'); toast(t('areaLocked', tl(AREAS[i - 1].name))); }
    else { sfx('pop'); toast(t('areaTap', tl(a.name))); }
  }

  // ----- tasks -----
  function openTasks() {
    if (!area) {
      modal({ title: t('tasks'), body: h('div', { class: 'center' }, h('div', { class: 'mochi-mini', html: mascotSVG('happy') }), h('p', {}, t('townAllDone'))) });
      return;
    }
    const cur = area;
    void town.focusArea(save.area, 600);
    const pending = cur.tasks.filter((tk) => save.town[tk.id] === undefined).slice(0, 3);
    const list = h('div', { class: 'task-list' },
      ...pending.map((task) => h('div', { class: 'task' },
        h('div', { class: 'task-ic', html: townIconSVG(task.id, 0, townState()) }),
        h('div', { class: 'task-title' }, tl(task.title)),
        btn(h('span', { class: 'btn-inner' }, String(task.cost), icon('star')), save.stars >= task.cost ? 'green small' : 'grey small', () => {
          if (save.stars < task.cost) {
            m.close();
            mochiSay(t('needStars')).then(() => showLevelStart(save.level));
            return;
          }
          m.close();
          void doTask(cur, task);
        }),
      )),
    );
    const m = modal({ title: tl(cur.name), cls: 'tasks-modal', body: list });
  }

  async function doTask(a: Area, task: TownTask) {
    save.stars -= task.cost;
    save.town[task.id] = 0;
    persist();
    refresh();
    bottom.classList.add('hidden');
    // Fly to the spot first, then the element pops in.
    await town.flyTo(a.x + task.at[0], a.y + task.at[1] - 40, Math.max(0.85, Math.min(1.2, window.innerWidth / 420)), 700);
    sfx('build');
    town.swapItem(task.id, 'placing');
    town.refresh();
    const r = town.itemRect(task.id);
    if (r) sparkles(r.left + r.width / 2, r.top + r.height / 2, Math.min(160, Math.max(r.width, r.height) / 2));
    setTimeout(() => sfx('star'), 350);
    if (task.styles.length > 1) stylePicker(task);
    else { bottom.classList.remove('hidden'); void afterTask(); }
  }

  function stylePicker(task: TownTask) {
    bottom.classList.add('hidden');
    side.classList.add('hidden');
    sideRight.classList.add('hidden');
    const options = h('div', { class: 'style-options' });
    const renderOptions = () => {
      options.innerHTML = '';
      task.styles.forEach((st, i) => {
        const b = h('button', { class: `style-opt ${save.town[task.id] === i ? 'on' : ''}`, style: `--sw:${st.swatch}` },
          h('div', { class: 'style-ic', html: townIconSVG(task.id, i, townState()) }),
          h('small', {}, tl(st.name)),
        );
        b.addEventListener('click', () => {
          sfx('pop');
          save.town[task.id] = i;
          persist();
          town.swapItem(task.id, 'restyle');
          renderOptions();
        });
        options.append(b);
      });
    };
    renderOptions();
    const picker = h('div', { class: 'style-picker' },
      h('div', { class: 'picker-title' }, t('chooseStyle')),
      options,
      btn(icon('check'), 'confirm', () => {
        picker.classList.add('out');
        setTimeout(() => picker.remove(), 250);
        bottom.classList.remove('hidden');
        side.classList.remove('hidden');
        sideRight.classList.remove('hidden');
        void afterTask();
      }),
    );
    screen.append(picker);
  }

  async function afterTask() {
    if (!area) return;
    const finished = area.tasks.every((tk) => save.town[tk.id] !== undefined);
    if (!finished) {
      if (Math.random() < 0.5) await mochiSay(t('wow'), 'wow');
      return;
    }
    sfx('win');
    confetti();
    const doneArea = area;
    await town.focusArea(save.area, 700);
    await new Promise<void>((resolve) => {
      const m = modal({
        title: t('roomDone', tl(doneArea.name)),
        body: h('div', { class: 'center' }, h('div', { class: 'mochi-big', html: mascotSVG('wow') }), rewardChips(ROOM_REWARD)),
        buttons: [{ label: t('claim'), onClick: () => { grant(ROOM_REWARD); m.close(); resolve(); } }],
        closable: false,
      });
    });
    save.area++;
    persist();
    area = currentArea();
    refresh();
    if (area) {
      await town.focusArea(save.area, 1400);
      town.refresh(); // fog lifts off the new area
      await mochiSay(t('newArea', tl(area.name)), 'wow');
    } else {
      town.refresh();
      await mochiSay(t('townAllDone'), 'happy');
    }
    refresh();
  }

  // ----- first-time story -----
  (async () => {
    if (!save.seen.intro) {
      save.seen.intro = true;
      save.seen.town = true;
      persist();
      await mochiSay(t('storyIntro'));
    } else if (!save.seen.town) {
      // Existing players: home became a town. Stars, coins and level are untouched.
      save.seen.town = true;
      persist();
      await mochiSay(t('townIntro'), 'wow');
    } else if (opts.fromWin && !save.seen.taskHint && save.stars >= 1) {
      save.seen.taskHint = true;
      persist();
      await mochiSay(t('storyTask'), 'wow');
    }
  })();
}

function sparkles(x: number, y: number, radius: number) {
  const layer = document.getElementById('overlay')!;
  for (let i = 0; i < 16; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = radius * (0.4 + Math.random() * 0.8);
    const s = h('div', { class: 'sparkle', style: `left:${x}px;top:${y}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;animation-delay:${Math.random() * 200}ms` });
    layer.append(s);
    setTimeout(() => s.remove(), 1200);
  }
}

export function confetti() {
  const layer = document.getElementById('overlay')!;
  const colors = ['#ff3d63', '#ffcb2b', '#2fa6ff', '#5fd13a', '#ad55ff', '#ff8c21'];
  for (let i = 0; i < 60; i++) {
    const c = h('div', {
      class: 'confetti',
      style: `left:${Math.random() * 100}vw;background:${colors[i % colors.length]};animation-delay:${Math.random() * 600}ms;animation-duration:${1800 + Math.random() * 1400}ms;--rot:${Math.random() * 720 - 360}deg;--drift:${Math.random() * 120 - 60}px`,
    });
    layer.append(c);
    setTimeout(() => c.remove(), 3600);
  }
}
