import { sfx, unlockAudio } from '../core/audio.ts';
import { buzz } from '../core/haptics.ts';
import { t, type StrKey } from '../core/i18n.ts';
import { canPlay, loseLife, persist, save, type BoosterId } from '../core/save.ts';
import type { Pos, Special } from '../match3/board.ts';
import { Engine } from '../match3/engine.ts';
import { CARPET_LEVEL, getLevel, ICE_LEVEL, TOY_LEVEL } from '../match3/levels.ts';
import { Renderer } from '../match3/renderer.ts';
import { festivalPointsFor, festival, recordLevel } from '../meta/events.ts';
import { mascotSVG, roomSVG } from '../meta/roomArt.ts';
import { boosterIcon, btn, closeAllModals, countUp, h, icon, mochiSay, modal } from './dom.ts';
import { confetti, currentRoom, leaveHome, placedFor } from './home.ts';
import { nav } from './nav.ts';
import { goalIcon, showBuyBooster, showLevelStart, showSettings } from './popups.ts';

const TUTORIALS: Record<number, StrKey> = {
  1: 'tutorial1', 2: 'tutorial2', 3: 'tutorialTap', 4: 'tutorialBox', 6: 'tutorialDirt',
  [ICE_LEVEL]: 'tutorialIce', [TOY_LEVEL]: 'tutorialToy', [CARPET_LEVEL]: 'tutorialCarpet',
};

let teardown: (() => void) | null = null;

export function stopGame() {
  teardown?.();
  teardown = null;
}

export function startGame(n: number, picked: BoosterId[]) {
  leaveHome();
  teardown?.();
  closeAllModals();
  const app = document.getElementById('app')!;
  app.innerHTML = '';

  const level = getLevel(n);
  const help = save.fails >= 2;
  if (help) level.moves += 3;
  const specials: Special[] = [];
  const asSpecial = (id: BoosterId): Special => (id === 'rocket' ? (Math.random() < 0.5 ? 'rocketH' : 'rocketV') : id === 'bomb' ? 'bomb' : 'rainbow');
  for (const id of picked) specials.push(asSpecial(id));
  const tier = Math.min(3, save.streak);
  (['rocket', 'bomb', 'rainbow'] as BoosterId[]).slice(0, tier).forEach((id) => specials.push(asSpecial(id)));
  if (help) specials.push(asSpecial('rocket'), 'bomb');

  const engine = new Engine(level, (Date.now() ^ (n * 2654435761)) >>> 0);
  engine.placeSpecials(specials);
  // Entrance: every piece drops in column by column; start specials pop in afterwards.
  const rows = engine.board.rows;
  engine.board.forEachPiece((p) => {
    p.mv = { kind: 'path', pts: [{ x: p.c, y: p.r - rows - 1 }, { x: p.c, y: p.r }], t0: 150 + p.c * 45 + (rows - p.r) * 12, dur: 0 };
  });
  engine.busy = true;
  engine.after(1100, () => { engine.busy = false; });
  let delay = 1200;
  engine.board.forEachPiece((p) => { if (p.special !== 'none') { p.bornAt = delay; delay += 180; } });
  const streakBefore = save.streak;

  // ----- DOM -----
  const room = currentRoom();
  const bg = h('div', { class: 'game-bg', html: roomSVG(room.id, placedFor(room)) });
  const canvas = h('canvas', { class: 'board' });
  const shown = engine.goals.map((g) => g.need);
  const goalEls = engine.goals.map((g) => {
    const count = h('b', {}, String(g.need));
    const el = h('div', { class: 'goal' }, goalIcon(g.kind, g.color), count);
    return { el, count };
  });
  const movesNum = h('b', {}, String(engine.movesLeft));
  const movesBox = h('div', { class: 'moves' }, h('small', {}, t('moves')), movesNum);
  // Mochi sits in the HUD like a co-player: reacts to big plays and low moves; tap = pause menu.
  const avatar = h('button', { class: 'hud-mochi', 'aria-label': t('paused') },
    h('span', { class: 'hud-mochi-face', html: mascotSVG('happy') }),
    h('span', { class: 'hud-mochi-pause' }, icon('pause')),
  );
  avatar.addEventListener('click', () => { sfx('click'); pause(); });
  let mood: 'happy' | 'sad' | 'wow' = 'happy';
  let moodTimer = 0;
  const setMood = (m: typeof mood, ms = 0) => {
    clearTimeout(moodTimer);
    if (m !== mood) {
      mood = m;
      avatar.firstElementChild!.innerHTML = mascotSVG(m);
      avatar.classList.remove('react');
      void avatar.offsetWidth;
      avatar.classList.add('react');
    }
    if (ms) moodTimer = window.setTimeout(() => setMood(engine.movesLeft <= 3 && engine.state === 'play' ? 'sad' : 'happy'), ms);
  };
  const hud = h('div', { class: 'hud' },
    avatar,
    h('div', { class: 'goals' }, ...goalEls.map((g) => g.el)),
    movesBox,
  );
  const levelTag = h('div', { class: `level-tag ${level.hard ? 'hard' : ''}` }, t('level', n), level.hard ? ' ☠' : '');
  const aimHint = h('div', { class: 'aim-hint hidden' });
  const bonusHint = h('div', { class: 'bonus-hint hidden' }, t('tapToSkip'));
  const boosterBar = h('div', { class: 'booster-bar' });
  const screen = h('div', { class: 'screen game' }, bg, canvas, hud, levelTag, boosterBar, aimHint, bonusHint);
  app.append(screen);

  const renderer = new Renderer(canvas, engine, {
    goalTarget: (i) => {
      const r = goalEls[i]?.el.querySelector('img')?.getBoundingClientRect();
      return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
    },
    goalArrived: (i) => {
      shown[i] = Math.max(engine.goals[i].left, shown[i] - 1);
      const g = goalEls[i];
      g.el.classList.remove('bump');
      void g.el.offsetWidth;
      g.el.classList.add('bump');
      if (shown[i] <= 0) {
        if (!g.el.classList.contains('done')) {
          g.el.classList.add('done');
          g.count.replaceWith(icon('check', 'ic goal-check'));
          sfx('star');
        }
      } else g.count.textContent = String(shown[i]);
    },
    sound: sfx,
    text: (k) => t(k as StrKey),
  });

  const layout = () => {
    const top = hud.getBoundingClientRect().bottom + 6;
    const bottom = window.innerHeight - boosterBar.getBoundingClientRect().top + 6;
    renderer.resize(window.innerWidth, window.innerHeight, top, bottom);
    const lt = levelTag.getBoundingClientRect();
    levelTag.style.top = `${Math.max(top - 2, renderer.by - lt.height - 14)}px`;
  };

  // ----- boosters -----
  let aim: 'hammer' | 'broom' | null = null;
  const setAim = (kind: 'hammer' | 'broom' | null) => {
    aim = kind;
    renderer.aim = kind ? { kind, pos: null } : null;
    aimHint.classList.toggle('hidden', !kind);
    if (kind) aimHint.textContent = t(kind === 'hammer' ? 'hammerHelp' : 'broomHelp');
    renderBoosters();
  };
  const renderBoosters = () => {
    boosterBar.innerHTML = '';
    for (const id of ['hammer', 'broom', 'shuffle'] as BoosterId[]) {
      const count = save.boosters[id];
      const b = h('button', { class: `booster ${aim === id ? 'on' : ''}` }, boosterIcon(id), h('span', { class: 'badge' }, count > 0 ? String(count) : '+'));
      b.addEventListener('click', () => {
        sfx('click');
        if (aim === id) { setAim(null); return; }
        if (!engine.canAct()) return;
        if (save.boosters[id] <= 0) { showBuyBooster(id, renderBoosters); return; }
        if (id === 'shuffle') {
          if (engine.useShuffle()) { save.boosters.shuffle--; persist(); renderBoosters(); }
          return;
        }
        setAim(id as 'hammer' | 'broom');
      });
      boosterBar.append(b);
    }
  };
  renderBoosters();

  // ----- input -----
  let drag: { pos: Pos; x: number; y: number; moved: boolean } | null = null;
  let idleSince = performance.now();
  let speed = 1;
  const adjacent = (a: Pos, b: Pos) => Math.abs(a.r - b.r) + Math.abs(a.c - b.c) === 1;

  const onDown = (ev: PointerEvent) => {
    unlockAudio();
    idleSince = performance.now();
    renderer.hint = null;
    if (engine.state === 'bonus') { speed = 4; bonusHint.classList.add('hidden'); return; }
    const pos = renderer.cellAt(ev.clientX, ev.clientY);
    if (aim) { if (renderer.aim) renderer.aim.pos = pos; return; }
    if (!pos || !engine.canAct()) { drag = null; return; }
    drag = { pos, x: ev.clientX, y: ev.clientY, moved: false };
    canvas.setPointerCapture(ev.pointerId);
  };
  const onMove = (ev: PointerEvent) => {
    if (aim && renderer.aim && ev.buttons) { renderer.aim.pos = renderer.cellAt(ev.clientX, ev.clientY); return; }
    if (!drag || drag.moved) return;
    const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < renderer.cs * 0.32) return;
    drag.moved = true;
    const to = Math.abs(dx) > Math.abs(dy) ? { r: drag.pos.r, c: drag.pos.c + Math.sign(dx) } : { r: drag.pos.r + Math.sign(dy), c: drag.pos.c };
    renderer.selected = null;
    engine.trySwap(drag.pos, to);
  };
  const onUp = () => {
    idleSince = performance.now();
    if (aim) {
      const pos = renderer.aim?.pos;
      if (pos) {
        const ok = aim === 'hammer' ? engine.useHammer(pos) : engine.useBroom(pos.r);
        if (ok) { save.boosters[aim]--; persist(); }
        setAim(null);
      }
      return;
    }
    if (drag && !drag.moved) {
      const pos = drag.pos;
      const sel = renderer.selected;
      const p = engine.board.piece(pos.r, pos.c);
      if (sel && adjacent(sel, pos)) { renderer.selected = null; engine.trySwap(sel, pos); }
      else if (p && p.special !== 'none') { renderer.selected = null; engine.tapSpecial(pos); }
      else renderer.selected = sel && sel.r === pos.r && sel.c === pos.c ? null : pos;
    }
    drag = null;
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', () => { drag = null; });

  // ----- loop -----
  let raf = 0;
  let last = performance.now();
  let movesShown = -1;
  const frame = (now: number) => {
    const dt = Math.min(50, now - last);
    last = now;
    engine.tick(dt * speed);
    renderer.draw(dt);
    if (engine.movesLeft !== movesShown) {
      movesShown = engine.movesLeft;
      movesNum.textContent = String(movesShown);
      movesBox.classList.toggle('low', movesShown <= 5 && engine.state === 'play');
    }
    if (engine.canAct() && !renderer.hint && !aim && now - idleSince > 5000) {
      const m = engine.hint();
      if (m) renderer.hint = { a: m.a, b: m.b, t0: now };
    }
    raf = requestAnimationFrame(frame);
  };

  window.addEventListener('resize', layout);
  if (import.meta.env.DEV) {
    // Debug hook: advance the simulation by hand (rAF is throttled when the tab is hidden).
    const step = (ms: number) => { for (let t = 0; t < ms; t += 16) { engine.tick(16); renderer.draw(16); } };
    (window as unknown as { __game: unknown }).__game = { engine, renderer, step };
  }
  teardown = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', layout);
  };
  const exit = (fn: () => void) => {
    teardown?.();
    teardown = null;
    closeAllModals();
    fn();
  };

  // ----- flow -----
  const waitFlyers = () => new Promise<void>((resolve) => {
    const check = () => (renderer.animating() ? setTimeout(check, 100) : resolve());
    check();
  });

  const bannerText = (text: string) => {
    const b = h('div', { class: 'banner' }, text);
    screen.append(b);
    setTimeout(() => b.remove(), 1700);
  };

  /** "Level complete" moment: Mochi in a glowing badge with rays, text underneath. */
  const heroBanner = (text: string) => {
    const b = h('div', { class: 'hero-banner' },
      h('div', { class: 'hero-rays' }),
      h('div', { class: 'hero-badge', html: mascotSVG('wow') }),
      h('div', { class: 'hero-text' }, text),
    );
    screen.append(b);
    setTimeout(() => b.classList.add('out'), 1500);
    setTimeout(() => b.remove(), 1900);
  };

  engine.on((e) => {
    if (e.type === 'cascade' && e.n >= 3) setMood('wow', 1600);
    else if (e.type === 'activate' && e.combo) setMood('wow', 1600);
    else if (e.type === 'turn-end') setMood(engine.movesLeft <= 3 ? 'sad' : mood === 'sad' ? 'happy' : mood);
    else if (e.type === 'won') setMood('wow');
  });

  engine.on((e) => {
    if (engine.state === 'bonus') return; // the end-of-level fireworks would just rattle
    if (e.type === 'special') buzz('light');
    else if (e.type === 'activate' && (e.combo || e.special === 'bomb')) buzz('medium');
  });

  engine.on(async (e) => {
    if (e.type === 'won') {
      await waitFlyers();
      sfx('win');
      buzz('success');
      heroBanner(t('levelDone'));
      setTimeout(() => {
        bannerText(t('bonusTime'));
        bonusHint.classList.remove('hidden');
        engine.startBonus();
      }, 1500);
    } else if (e.type === 'bonus-done') {
      bonusHint.classList.add('hidden');
      speed = 1;
      setTimeout(finishWin, 500);
    } else if (e.type === 'lost') {
      await waitFlyers();
      onLost();
    }
  });

  function finishWin() {
    const stars = level.hard ? 2 : 1;
    const coins = 30 + engine.stats.bonusMoves * 10 + (level.hard ? 50 : 0);
    const fest = festival();
    const pts = festivalPointsFor(streakBefore, level.hard);
    save.stars += stars;
    save.coins += coins;
    if (n === save.level) save.level++;
    save.streak++;
    save.fails = 0;
    save.wins++;
    recordLevel(engine, true, streakBefore);
    persist();
    confetti();
    // Full-screen celebration over the room (instead of a small popup).
    const coinsEl = h('b', {}, '0');
    const perfect = engine.stats.bonusMoves >= Math.max(5, level.moves * 0.25);
    const win = h('div', { class: 'win-screen' },
      h('div', { class: 'win-rays' }),
      h('div', { class: 'win-title' }, perfect ? t('perfect') : t('levelDone')),
      h('div', { class: 'win-stars big' }, ...Array.from({ length: stars }, (_, i) => h('span', { class: 'win-star', style: `animation-delay:${250 + i * 250}ms` }, icon('star')))),
      h('div', { class: 'win-rewards' },
        h('div', { class: 'chip big' }, icon('star'), `+${stars}`),
        h('div', { class: 'chip big' }, icon('coin'), '+', coinsEl),
        h('div', { class: 'chip big' }, h('span', { class: 'ic emoji' }, fest.icon), `+${pts}`),
      ),
      h('div', { class: 'win-streak' }, `${t('streak')}: ${save.streak} 🔥`),
      h('div', { class: 'win-mochi', html: mascotSVG('wow') }),
      h('div', { class: 'win-buttons' },
        btn(t('home'), 'blue', () => exit(() => nav.home({ fromWin: true }))),
        btn(t('next'), 'green big', () => exit(() => { nav.home({ fromWin: true }); showLevelStart(save.level); })),
      ),
    );
    document.getElementById('overlay')!.append(win);
    setTimeout(() => { countUp(coinsEl, 0, coins, 700); sfx('coin'); }, 600);
    setTimeout(() => sfx('star'), 350);
  }

  let continues = 0;
  function onLost() {
    sfx('lose');
    const price = continues === 0 ? 0 : continues === 1 ? 250 : 500;
    const left = engine.goals.map((g) => h('div', { class: 'goal-card' }, goalIcon(g.kind, g.color), g.left <= 0 ? icon('check') : h('b', {}, String(g.left))));
    const m = modal({
      title: t('outOfMoves'),
      closable: false,
      body: h('div', { class: 'center' },
        h('div', { class: 'mochi-mini', html: mascotSVG('sad') }),
        h('div', { class: 'goal-row' }, ...left),
        h('p', {}, price === 0 ? t('mochiHelps') : t('almost')),
      ),
      buttons: [
        {
          label: h('span', { class: 'btn-col' }, h('span', {}, t('plusMoves', 5)), h('small', {}, price === 0 ? t('free') : h('span', {}, icon('coin'), ` ${price}`))),
          cls: 'green',
          onClick: () => {
            if (save.coins < price) { showBuyHint(); return; }
            save.coins -= price;
            persist();
            continues++;
            m.close();
            engine.addMoves(5);
            sfx('coin');
          },
        },
        {
          label: t('giveUp'),
          cls: 'red',
          onClick: () => { m.close(); confirmGiveUp(() => onLost()); },
        },
      ],
    });
  }

  function showBuyHint() {
    modal({ title: t('notEnoughCoins'), body: h('p', { class: 'center' }, t('notEnoughCoins')) });
  }

  function confirmGiveUp(back: () => void) {
    const m = modal({
      title: t('giveUp'),
      closable: false,
      body: h('p', { class: 'center' }, t('giveUpWarn')),
      buttons: [
        { label: t('keepPlaying'), cls: 'green', onClick: () => { m.close(); back(); } },
        { label: t('giveUp'), cls: 'red', onClick: () => { m.close(); fail(); } },
      ],
    });
  }

  function fail() {
    loseLife();
    save.streak = 0;
    save.fails++;
    recordLevel(engine, false, streakBefore);
    persist();
    const m = modal({
      title: t('level', n),
      closable: false,
      body: h('div', { class: 'center' }, h('div', { class: 'mochi-mini', html: mascotSVG('sad') }), h('p', {}, save.fails >= 2 ? t('helpGift') : '')),
      buttons: [
        { label: t('home'), cls: 'blue', onClick: () => exit(() => nav.home()) },
        {
          label: t('retry'),
          cls: 'green',
          onClick: () => {
            m.close();
            exit(() => { nav.home(); if (canPlay()) showLevelStart(n); });
          },
        },
      ],
    });
  }

  function pause() {
    const movesMade = engine.movesLeft < level.moves || continues > 0;
    showSettings(true, () => {
      if (!movesMade) { exit(() => nav.home()); return; }
      confirmGiveUp(() => {});
    });
  }

  // Start
  requestAnimationFrame(() => {
    layout();
    raf = requestAnimationFrame(frame);
    const tut = TUTORIALS[n];
    if (tut && !save.seen[tut]) {
      save.seen[tut] = true;
      persist();
      setTimeout(() => mochiSay(t(tut)), 900);
    } else if (help) {
      setTimeout(() => mochiSay(t('helpGift')), 900);
    }
  });
}
