import { applySettings, sfx } from '../core/audio.ts';
import { getLang, setLang, t, tl } from '../core/i18n.ts';
import {
  canPlay, fmtTime, hasInfiniteLives, MAX_LIVES, nextLifeIn, persist, resetSave, save, syncLives, type BoosterId,
} from '../core/save.ts';
import { getLevel } from '../match3/levels.ts';
import { iconURL } from '../match3/sprites.ts';
import {
  claimChest, claimDaily, claimFestival, claimQuest, claimRace, DAILY, dailyAvailable, dailyIndex, ensureQuests, festival,
  festivalEndsIn, festivalPoints, MILESTONES, QUEST_CHEST, RACE_GOAL, RACE_PRIZES, raceEndsIn, racePlace, racers, questsResetIn,
} from '../meta/events.ts';
import { boosterIcon, btn, h, icon, modal, rewardChips, toast } from './dom.ts';
import { nav } from './nav.ts';

const BOOSTER_NAME: Record<BoosterId, () => string> = {
  hammer: () => t('boosterHammer'),
  broom: () => t('boosterBroom'),
  shuffle: () => t('boosterShuffle'),
  rocket: () => t('boosterRocket'),
  bomb: () => t('boosterBomb'),
  rainbow: () => t('boosterRainbow'),
};

const BOOSTER_PRICE: Record<BoosterId, number> = { hammer: 300, broom: 400, shuffle: 200, rocket: 250, bomb: 300, rainbow: 450 };

export function goalIcon(kind: Parameters<typeof iconURL>[0], color: number): HTMLElement {
  return h('img', { class: 'goal-ic', src: iconURL(kind, color, 96), alt: '' });
}

export function showBuyBooster(id: BoosterId, onBought?: () => void) {
  const price = BOOSTER_PRICE[id];
  const m = modal({
    title: BOOSTER_NAME[id](),
    body: h('div', { class: 'center' }, h('div', { class: 'big-booster' }, boosterIcon(id), h('b', {}, '×3')), h('p', {}, t('buyBooster', BOOSTER_NAME[id]()))),
    buttons: [{
      label: h('span', {}, icon('coin'), ` ${price}`),
      cls: 'green',
      onClick: () => {
        if (save.coins < price) { toast(t('notEnoughCoins')); return; }
        save.coins -= price;
        save.boosters[id] += 3;
        persist();
        sfx('coin');
        m.close();
        nav.refresh();
        onBought?.();
      },
    }],
  });
}

export function showLevelStart(n: number) {
  const level = getLevel(n);
  const picked = new Set<BoosterId>();
  const goals = h('div', { class: 'goal-row' },
    ...level.goals.map((g) => h('div', { class: 'goal-card' }, goalIcon(g.kind, g.kind === 'color' ? g.color : 0), h('b', {}, String(g.count)))),
  );
  const streakTier = Math.min(3, save.streak);
  const streak = h('div', { class: 'streak' },
    h('div', { class: 'streak-label' }, t('streak')),
    h('div', { class: 'streak-bar' }, ...[1, 2, 3].map((i) => h('div', { class: `seg ${i <= streakTier ? 'on' : ''}` },
      boosterIcon((['rocket', 'bomb', 'rainbow'] as BoosterId[])[i - 1])))),
    h('div', { class: 'streak-info' }, t('streakInfo')),
  );
  const boosterRow = h('div', { class: 'pre-boosters' });
  const renderBoosters = () => {
    boosterRow.innerHTML = '';
    for (const id of ['rocket', 'bomb', 'rainbow'] as BoosterId[]) {
      const count = save.boosters[id];
      const el = h('button', { class: `pre-b ${picked.has(id) ? 'on' : ''}` },
        boosterIcon(id),
        h('span', { class: 'badge' }, picked.has(id) ? '✓' : count > 0 ? String(count) : '+'),
      );
      el.addEventListener('click', () => {
        sfx('click');
        if (count <= 0 && !picked.has(id)) { showBuyBooster(id, renderBoosters); return; }
        if (picked.has(id)) picked.delete(id); else picked.add(id);
        renderBoosters();
      });
      boosterRow.append(el);
    }
  };
  renderBoosters();

  const m = modal({
    title: t('level', n),
    cls: level.hard ? 'hard' : '',
    body: h('div', {},
      level.hard ? h('div', { class: 'hard-badge' }, '☠ ', t('hard')) : null,
      h('div', { class: 'section-title' }, t('goals')),
      goals,
      h('div', { class: 'section-title' }, t('startBoosters')),
      boosterRow,
      streak,
      save.fails >= 2 ? h('div', { class: 'help-note' }, t('helpGift')) : null,
    ),
    buttons: [{
      label: t('play'),
      cls: 'green big',
      onClick: () => {
        if (!canPlay()) { showLives(); return; }
        for (const id of picked) save.boosters[id]--;
        persist();
        m.close();
        nav.play(n, [...picked]);
      },
    }],
  });
}

export function showLives() {
  syncLives();
  const timer = h('div', { class: 'muted' });
  const update = () => {
    syncLives();
    if (hasInfiniteLives()) timer.textContent = t('infiniteLives', fmtTime(save.infiniteUntil - Date.now()));
    else timer.textContent = save.lives >= MAX_LIVES ? t('full') : t('nextLife', fmtTime(nextLifeIn()));
  };
  update();
  const iv = setInterval(update, 1000);
  const m = modal({
    title: t('lives'),
    onClose: () => clearInterval(iv),
    body: h('div', { class: 'center' },
      h('div', { class: 'lives-big' }, icon('heart'), h('b', {}, hasInfiniteLives() ? '∞' : String(save.lives))),
      h('div', { class: 'lives-timer' }, icon('clock'), timer),
    ),
    buttons: save.lives < MAX_LIVES && !hasInfiniteLives() ? [{
      label: h('span', {}, t('refill'), ' ', icon('coin'), ' 300'),
      onClick: () => {
        if (save.coins < 300) { toast(t('notEnoughCoins')); return; }
        save.coins -= 300;
        save.lives = MAX_LIVES;
        persist();
        sfx('coin');
        m.close();
        nav.refresh();
      },
    }] : [],
  });
}

export function showShop() {
  const list = h('div', { class: 'shop-list' });
  for (const id of ['hammer', 'broom', 'shuffle', 'rocket', 'bomb', 'rainbow'] as BoosterId[]) {
    list.append(h('div', { class: 'shop-item' },
      boosterIcon(id),
      h('div', { class: 'shop-name' }, BOOSTER_NAME[id](), h('small', {}, ` ×3 · ${t('coinsLabel')}: ${BOOSTER_PRICE[id]}`)),
      btn(h('span', {}, icon('coin'), ` ${BOOSTER_PRICE[id]}`), 'yellow small', () => {
        if (save.coins < BOOSTER_PRICE[id]) { toast(t('notEnoughCoins')); return; }
        save.coins -= BOOSTER_PRICE[id];
        save.boosters[id] += 3;
        persist();
        sfx('coin');
        toast(`+3 ${BOOSTER_NAME[id]()}`);
        nav.refresh();
      }),
    ));
  }
  modal({ title: t('shop'), body: list });
}

export function showSettings(inGame = false, onQuit?: () => void) {
  const toggle = (label: string, get: () => boolean, set: (v: boolean) => void) => {
    const b = h('button', { class: `toggle ${get() ? 'on' : ''}` }, h('span', {}));
    b.addEventListener('click', () => { set(!get()); b.classList.toggle('on', get()); persist(); applySettings(); sfx('click'); });
    return h('div', { class: 'setting' }, h('span', {}, label), b);
  };
  const langRow = h('div', { class: 'setting' }, h('span', {}, t('language')),
    h('div', { class: 'seg-btns' },
      ...(['en', 'vi'] as const).map((l) => btn(l === 'en' ? 'English' : 'Tiếng Việt', getLang() === l ? 'on' : '', () => {
        save.lang = l;
        setLang(l);
        persist();
        m.close();
        nav.home();
        showSettings(inGame, onQuit);
      })),
    ),
  );
  const m = modal({
    title: inGame ? t('paused') : t('settings'),
    body: h('div', {},
      toggle(t('sound'), () => save.sound, (v) => { save.sound = v; }),
      toggle(t('music'), () => save.music, (v) => { save.music = v; }),
      inGame ? null : langRow,
      inGame ? null : h('div', { class: 'setting' }, btn(t('resetProgress'), 'red small', () => {
        modal({ title: t('resetProgress'), body: h('p', {}, t('resetConfirm')), buttons: [{ label: t('resetProgress'), cls: 'red', onClick: resetSave }] });
      })),
      h('div', { class: 'version' }, `${t('appName')} v0.1`),
    ),
    buttons: inGame ? [
      { label: t('continue'), cls: 'green', onClick: () => m.close() },
      { label: t('quit'), cls: 'red', onClick: () => { m.close(); onQuit?.(); } },
    ] : [],
  });
}

// ---------- events ----------

export function showDaily() {
  const idx = dailyIndex();
  const avail = dailyAvailable();
  const grid = h('div', { class: 'daily-grid' },
    ...DAILY.map((r, i) => h('div', { class: `daily-card ${i < idx || (i === idx && !avail) ? 'got' : ''} ${i === idx && avail ? 'today' : ''} ${i === 6 ? 'wide' : ''}` },
      h('div', { class: 'day' }, t('day', i + 1)),
      rewardChips(r),
      i < idx || (i === idx && !avail) ? h('div', { class: 'stamp' }, icon('check')) : null,
    )),
  );
  const m = modal({
    title: t('dailyReward'),
    body: h('div', {}, grid, avail ? null : h('p', { class: 'muted center' }, t('comeBack'))),
    buttons: avail ? [{
      label: t('claim'),
      onClick: () => {
        claimDaily();
        sfx('coin');
        m.close();
        nav.refresh();
        showDaily();
      },
    }] : [],
  });
}

function questText(q: (typeof save.quests.items)[number]): HTMLElement {
  const map = { win: 'questWin', color: 'questColor', rocket: 'questRocket', bomb: 'questBomb', plane: 'questPlane', rainbow: 'questRainbow', box: 'questBox', dirt: 'questDirt', booster: 'questBooster' } as const;
  if (q.type === 'color') return h('span', {}, t('questColor', q.target), ' ', goalIcon('color', q.color));
  return h('span', {}, t(map[q.type], q.target));
}

export function showQuests() {
  ensureQuests();
  const render = (): HTMLElement => {
    const allClaimed = save.quests.items.every((q) => q.claimed);
    return h('div', {},
      ...save.quests.items.map((q, i) => h('div', { class: `quest ${q.claimed ? 'done' : ''}` },
        h('div', { class: 'quest-main' },
          h('div', { class: 'quest-title' }, questText(q)),
          h('div', { class: 'bar' }, h('div', { class: 'fill', style: `width:${(q.progress / q.target) * 100}%` }), h('span', {}, `${q.progress}/${q.target}`)),
        ),
        h('div', { class: 'quest-side' },
          rewardChips({ coins: q.coins, boosters: q.booster ? { [q.booster]: 1 } : {} }),
          q.claimed ? icon('check') : q.progress >= q.target ? btn(t('claim'), 'green small', () => { claimQuest(i); sfx('coin'); m.body.replaceChildren(render()); nav.refresh(); }) : null,
        ),
      )),
      h('div', { class: `quest-chest ${save.quests.chest ? 'done' : ''}` },
        icon('chest', 'ic chest-ic'),
        h('div', {}, h('div', { class: 'muted' }, t('allQuests')), rewardChips(QUEST_CHEST)),
        allClaimed && !save.quests.chest ? btn(t('claim'), 'yellow small', () => { claimChest(); sfx('win'); m.body.replaceChildren(render()); nav.refresh(); }) : save.quests.chest ? icon('check') : null,
      ),
      h('p', { class: 'muted center' }, t('newQuestsIn', fmtTime(questsResetIn()))),
    );
  };
  const m = modal({ title: t('quests'), body: render() });
}

export function showFestival() {
  const f = festival();
  const pts = festivalPoints();
  const max = MILESTONES[MILESTONES.length - 1].at;
  const track = h('div', { class: 'milestones' },
    ...MILESTONES.map((ms, i) => h('div', { class: `milestone ${i < save.collect.claimed ? 'got' : pts >= ms.at ? 'ready' : ''}` },
      h('div', { class: 'ms-at' }, `${f.icon} ${ms.at}`),
      rewardChips(ms.reward),
      i < save.collect.claimed ? icon('check') : null,
    )),
  );
  const ready = MILESTONES.some((ms, i) => i >= save.collect.claimed && pts >= ms.at);
  const m = modal({
    title: tl(f.name),
    cls: 'festival',
    body: h('div', {},
      h('div', { class: 'fest-head', style: `--fest:${f.color}` },
        h('div', { class: 'fest-icon' }, f.icon),
        h('div', {},
          h('div', { class: 'fest-points' }, `${pts} ${f.icon}`),
          h('div', { class: 'muted' }, t('eventPoints', f.icon)),
          h('div', { class: 'timer' }, icon('clock'), t('endsIn', fmtTime(festivalEndsIn()))),
        ),
      ),
      h('div', { class: 'bar big' }, h('div', { class: 'fill', style: `width:${Math.min(100, (pts / max) * 100)}%;background:${f.color}` })),
      track,
    ),
    buttons: ready ? [{
      label: t('claim'),
      onClick: () => { claimFestival(); sfx('win'); m.close(); nav.refresh(); showFestival(); },
    }] : [],
  });
}

export function showRace() {
  const list = racers();
  const place = racePlace();
  const rows = h('div', { class: 'race-list' },
    ...list.map((r, i) => h('div', { class: `racer ${r.you ? 'you' : ''}` },
      h('div', { class: `rank r${i + 1}` }, String(i + 1)),
      h('div', { class: 'avatar' }, r.avatar),
      h('div', { class: 'racer-main' },
        h('div', { class: 'racer-name' }, r.you ? t('you') : r.name),
        h('div', { class: 'bar' }, h('div', { class: 'fill', style: `width:${(r.wins / RACE_GOAL) * 100}%` }), h('span', {}, `${r.wins}/${RACE_GOAL}`)),
      ),
    )),
  );
  const prizes = h('div', { class: 'race-prizes' }, ...RACE_PRIZES.map((p, i) => h('div', { class: 'prize' }, h('span', { class: `rank r${i + 1}` }, String(i + 1)), rewardChips(p))));
  const m = modal({
    title: t('race'),
    body: h('div', {},
      h('p', { class: 'center' }, t('raceInfo', RACE_GOAL)),
      rows,
      prizes,
      h('div', { class: 'timer center' }, icon('clock'), place ? t('newRaceIn', fmtTime(raceEndsIn())) : t('endsIn', fmtTime(raceEndsIn()))),
    ),
    buttons: place && !save.race.claimed ? [{
      label: h('span', {}, t('claim'), ' · ', t('place', place)),
      onClick: () => { claimRace(); sfx('win'); m.close(); nav.refresh(); },
    }] : [],
  });
}
