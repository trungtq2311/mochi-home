import { sfx } from '../core/audio.ts';
import { t, tl } from '../core/i18n.ts';
import { fmtTime, hasInfiniteLives, MAX_LIVES, nextLifeIn, persist, save, syncLives } from '../core/save.ts';
import {
  dailyAvailable, festival, festivalClaimable, festivalEndsIn, grant, questsClaimable, racePlace, raceEndsIn, type Reward,
} from '../meta/events.ts';
import { itemIconSVG, mascotSVG, roomSVG } from '../meta/roomArt.ts';
import { ROOMS, roomTotalCost, type Room, type RoomTask } from '../meta/rooms.ts';
import { prepareRoom, roomIsPainted } from '../art/paintedRoom.ts';
import { btn, h, icon, mochiSay, modal, rewardChips } from './dom.ts';
import { nav } from './nav.ts';
import { showDaily, showFestival, showLevelStart, showLives, showQuests, showRace, showSettings, showShop } from './popups.ts';

let teardown: (() => void) | null = null;

export function leaveHome() {
  teardown?.();
  teardown = null;
}

export function currentRoom(): Room {
  return ROOMS[Math.min(save.room, ROOMS.length - 1)];
}

export function placedFor(room: Room): Record<string, number> {
  const placed: Record<string, number> = {};
  for (const task of room.tasks) if (save.done[task.id] !== undefined) placed[task.item] = save.done[task.id];
  return placed;
}

const ROOM_REWARD: Reward = { coins: 500, boosters: { rainbow: 1, bomb: 1, rocket: 1 } };

export function showHome(opts: { fromWin?: boolean } = {}) {
  leaveHome();
  const app = document.getElementById('app')!;
  app.innerHTML = '';
  let room = currentRoom();

  const roomEl = h('div', { class: 'room-art', html: roomSVG(room.id, placedFor(room)) });
  const renderRoom = (animate?: string, kind: 'placing' | 'restyle' = 'placing') => {
    roomEl.innerHTML = roomSVG(room.id, placedFor(room));
    if (!animate) return;
    const g = roomEl.querySelector<SVGGElement>(`[data-item="${animate}"]`);
    if (!g) return;
    g.classList.add(kind);
    const r = g.getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top + r.height / 2, Math.max(r.width, r.height) / 2);
  };

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

  // ----- room banner -----
  const bannerName = h('div', { class: 'room-name' });
  const bannerFill = h('div', { class: 'fill' });
  const bannerPct = h('span', {});
  const banner = h('div', { class: 'room-banner' }, bannerName, h('div', { class: 'bar' }, bannerFill, bannerPct));

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

  // ----- bottom -----
  const tasksBadge = h('span', { class: 'badge hidden' }, '!');
  const tasksBtn = btn(h('span', { class: 'btn-inner' }, icon('star'), h('span', {}, t('tasks')), tasksBadge), 'blue tasks-btn', () => openTasks());
  const playLabel = h('small', {});
  const playBtn = btn(h('span', { class: 'btn-col' }, h('span', {}, t('play')), playLabel), 'green huge play-btn', () => showLevelStart(save.level));
  const bottom = h('div', { class: 'bottom-bar' }, tasksBtn, playBtn);

  const screen = h('div', { class: 'screen home' }, roomEl, h('div', { class: 'home-shade' }), topbar, banner, side, bottom);
  app.append(screen);
  // Painted rooms need their images (and perspective floors) ready; re-render once they are.
  if (roomIsPainted(room.id)) void prepareRoom(room.id).then(() => { if (roomEl.isConnected) renderRoom(); });

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
    const allDone = save.room >= ROOMS.length;
    const total = roomTotalCost(room);
    const done = room.tasks.filter((tk) => save.done[tk.id] !== undefined).reduce((s, tk) => s + tk.cost, 0);
    bannerName.textContent = tl(room.name);
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
    const next = allDone ? null : room.tasks.find((tk) => save.done[tk.id] === undefined);
    tasksBadge.classList.toggle('hidden', !next || save.stars < next.cost);
    tasksBtn.classList.toggle('pulse', !!next && save.stars >= next.cost);
  };
  refresh();
  const iv = setInterval(refresh, 1000);
  nav.refresh = refresh;
  teardown = () => clearInterval(iv);

  // ----- tasks -----
  function openTasks() {
    if (save.room >= ROOMS.length) {
      modal({ title: t('tasks'), body: h('div', { class: 'center' }, h('div', { class: 'mochi-mini', html: mascotSVG('happy') }), h('p', {}, t('comingSoon'))) });
      return;
    }
    const pending = room.tasks.filter((tk) => save.done[tk.id] === undefined).slice(0, 3);
    const list = h('div', { class: 'task-list' },
      ...pending.map((task) => h('div', { class: 'task' },
        h('div', { class: 'task-ic', html: itemIconSVG(room.id, task.item, 0) }),
        h('div', { class: 'task-title' }, tl(task.title)),
        btn(h('span', { class: 'btn-inner' }, String(task.cost), icon('star')), save.stars >= task.cost ? 'green small' : 'grey small', () => {
          if (save.stars < task.cost) {
            m.close();
            mochiSay(t('needStars')).then(() => showLevelStart(save.level));
            return;
          }
          m.close();
          doTask(task);
        }),
      )),
    );
    const m = modal({ title: `${tl(room.name)}`, cls: 'tasks-modal', body: list });
  }

  function doTask(task: RoomTask) {
    save.stars -= task.cost;
    save.done[task.id] = 0;
    persist();
    sfx('build');
    refresh();
    renderRoom(task.item);
    setTimeout(() => sfx('star'), 350);
    stylePicker(task);
  }

  function stylePicker(task: RoomTask) {
    bottom.classList.add('hidden');
    side.classList.add('hidden');
    const options = h('div', { class: 'style-options' });
    const renderOptions = () => {
      options.innerHTML = '';
      task.styles.forEach((st, i) => {
        const b = h('button', { class: `style-opt ${save.done[task.id] === i ? 'on' : ''}`, style: `--sw:${st.swatch}` },
          h('div', { class: 'style-ic', html: itemIconSVG(room.id, task.item, i) }),
          h('small', {}, tl(st.name)),
        );
        b.addEventListener('click', () => {
          sfx('pop');
          save.done[task.id] = i;
          persist();
          renderRoom(task.item, 'restyle');
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
        afterTask();
      }),
    );
    screen.append(picker);
  }

  async function afterTask() {
    const finished = room.tasks.every((tk) => save.done[tk.id] !== undefined);
    if (!finished) {
      if (Math.random() < 0.5) await mochiSay(t('wow'), 'wow');
      return;
    }
    sfx('win');
    confetti();
    await new Promise<void>((resolve) => {
      const m = modal({
        title: t('roomDone', tl(room.name)),
        body: h('div', { class: 'center' }, h('div', { class: 'mochi-big', html: mascotSVG('wow') }), rewardChips(ROOM_REWARD)),
        buttons: [{ label: t('claim'), onClick: () => { grant(ROOM_REWARD); m.close(); resolve(); } }],
        closable: false,
      });
    });
    save.room++;
    persist();
    if (save.room < ROOMS.length) {
      room = currentRoom();
      roomEl.classList.add('switching');
      const ready = prepareRoom(room.id);
      setTimeout(() => { void ready.then(() => { renderRoom(); roomEl.classList.remove('switching'); refresh(); }); }, 400);
      await mochiSay(t('newArea', tl(room.name)), 'wow');
    } else {
      await mochiSay(t('comingSoon'), 'happy');
    }
    refresh();
  }

  // ----- first-time story -----
  (async () => {
    if (!save.seen.intro) {
      save.seen.intro = true;
      persist();
      await mochiSay(t('storyIntro'));
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
