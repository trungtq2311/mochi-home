// Weekend Design Contest: the decorating studio, the judging show and the leaderboard.
import { sfx } from '../core/audio.ts';
import { t, tl, type StrKey } from '../core/i18n.ts';
import { fmtTime, save } from '../core/save.ts';
import {
  CONTEST_BOTS, CONTEST_MIN_ITEMS, CONTEST_PRIZES, CONTEST_START_TOKENS, contestActive, contestPlace, contestRemove, contestResult,
  contestRoom, contestState, FAMILY_COLOR, hasContestResult, JUDGES, mochiFavourite, nextContestIn, submitContest, swatchFamily, upcomingContestId,
  type ContestResult, type Family, type Placed,
} from '../meta/contest.ts';
import { huntEndsIn } from '../meta/events.ts';
import { itemIconSVG, mascotSVG, roomSVG } from '../meta/roomArt.ts';
import { roomTotalCost } from '../meta/rooms.ts';
import { prepareRoom, roomIsPainted } from '../art/paintedRoom.ts';
import { btn, closeAllModals, h, icon, modal, rewardChips, toast } from './dom.ts';
import { confetti, leaveHome } from './home.ts';
import { nav } from './nav.ts';

const OL = 'stroke="#3b2147" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"';
const TROPHY = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M15 17H7c0 9 4 15 11 15M49 17h8c0 9-4 15-11 15" fill="none" stroke="#3b2147" stroke-width="9" stroke-linecap="round"/>
  <path d="M15 17H7c0 9 4 15 11 15M49 17h8c0 9-4 15-11 15" fill="none" stroke="#ffcc2e" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M14 8h36v12c0 12-8 20-18 20S14 32 14 20z" fill="url(#ic-gold)" ${OL}/>
  <rect x="27" y="39" width="10" height="9" fill="url(#ic-gold)" ${OL}/>
  <rect x="16" y="47" width="32" height="11" rx="3.5" fill="url(#ic-purple)" ${OL}/>
  <path d="M32 15l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6-5.1-2.8-5.1 2.8 1.1-5.6-4.2-3.9 5.7-.7z" fill="#fff8d0" stroke="#d98a0c" stroke-width="2" stroke-linejoin="round"/>
  <path d="M19 14v7a12 12 0 0 0 4 9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
</svg>`;
const TOKEN = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M32 7C17 7 6 17 6 31c0 14 11 25 25 25 5 0 7-3 7-6 0-4-3-5-3-8 0-3 3-5 7-5h6c8 0 12-5 12-12C60 15 48 7 32 7z" fill="url(#ic-paper)" ${OL}/>
  <circle cx="20" cy="26" r="5.5" fill="#ff4f78" stroke="#3b2147" stroke-width="2.5"/>
  <circle cx="32" cy="18" r="5.5" fill="#ffcc2e" stroke="#3b2147" stroke-width="2.5"/>
  <circle cx="45" cy="22" r="5.5" fill="#3aa6f7" stroke="#3b2147" stroke-width="2.5"/>
  <circle cx="19" cy="40" r="5.5" fill="#52cc34" stroke="#3b2147" stroke-width="2.5"/>
  <path d="M14 20a20 16 0 0 1 10-8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
</svg>`;
const svgIcon = (svg: string, cls = 'ic') => h('span', { class: cls, html: svg });

const FAMILY_KEY: Record<Family, StrKey> = {
  red: 'famRed', orange: 'famOrange', yellow: 'famYellow', green: 'famGreen', blue: 'famBlue', purple: 'famPurple', neutral: 'famNeutral',
};
const favChip = (fav: Family) =>
  h('span', { class: 'ct-chip' }, h('i', { class: 'ct-dot', style: `--c:${FAMILY_COLOR[fav]}` }), t('contestFav', t(FAMILY_KEY[fav])));

// ---------- home event button ----------

/** Self-updating event button for the home screen's right column. */
export function contestButton(): HTMLElement {
  const label = h('span', { class: 'evt-label' });
  const badge = h('span', { class: 'badge hidden' });
  const el = h('button', { class: 'evt', onclick: () => { sfx('click'); showContest(); } }, svgIcon(TROPHY), label, badge);
  const refresh = () => {
    const live = contestActive();
    el.classList.toggle('off', !live);
    label.textContent = fmtTime(live ? huntEndsIn() : nextContestIn());
    const c = live ? contestState() : null;
    const affordable = !!c && !c.submitted && contestRoom(c.id).tasks.some((tk) => c.placed[tk.item] === undefined && tk.cost <= c.tokens);
    badge.textContent = c && c.submitted ? '' : String(c?.tokens ?? '');
    badge.classList.toggle('hidden', !affordable);
  };
  refresh();
  const iv = setInterval(() => { if (!el.isConnected) clearInterval(iv); else refresh(); }, 1000);
  return el;
}

// ---------- entry ----------

export function showContest() {
  if (contestActive()) { openStudio('live'); return; }
  const id = upcomingContestId();
  const room = contestRoom(id);
  const m = modal({
    title: t('contest'),
    cls: 'contest-modal',
    body: h('div', { class: 'center' },
      h('div', { class: 'ct-hero', html: roomSVG(room.id, {}) }, svgIcon(TROPHY, 'ic ct-hero-ic')),
      h('div', { class: 'timer center' }, icon('clock'), t('huntStartsIn', fmtTime(nextContestIn()))),
      h('p', {}, t('contestSoon')),
      h('div', { class: 'ct-next' }, h('b', {}, t('contestNextRoom', tl(room.name))), favChip(mochiFavourite(id))),
      prizeTable(),
      h('p', { class: 'muted' }, t('contestFreeTokens', CONTEST_START_TOKENS)),
    ),
    buttons: [
      ...(hasContestResult() ? [{ label: t('contestLastResult'), cls: 'yellow', onClick: () => { m.close(); showBoard(contestResult(save.contest.id, save.contest.placed)); } }] : []),
      { label: t('contestPractice'), cls: 'blue', onClick: () => { m.close(); openStudio('practice'); } },
    ],
  });
}

function prizeTable(): HTMLElement {
  let from = 1;
  return h('div', { class: 'race-prizes' },
    h('div', { class: 'section-title' }, t('contestPrizes')),
    ...CONTEST_PRIZES.map((p) => {
      const label = p.upTo === from ? t('place', from) : t('contestRankRange', from, p.upTo);
      const rank = p.upTo <= 3 ? `r${p.upTo}` : '';
      from = p.upTo + 1;
      return h('div', { class: 'prize' }, h('span', { class: `rank ${rank} ct-rank-wide` }, label), rewardChips(p.reward));
    }),
  );
}

// ---------- studio ----------

type Mode = 'live' | 'practice';

function openStudio(mode: Mode) {
  leaveHome();
  closeAllModals();
  const app = document.getElementById('app')!;
  const id = mode === 'live' ? contestState().id : upcomingContestId();
  const room = contestRoom(id);
  const fav = mochiFavourite(id);
  const practice: Placed = {};
  const placed = (): Placed => (mode === 'live' ? contestState().placed : practice);
  const locked = () => mode === 'live' && contestState().submitted;
  let sel = room.tasks[0].item;

  const roomEl = h('div', { class: 'room-art', html: roomSVG(room.id, placed()) });
  const renderRoom = (animate?: string, kind: 'placing' | 'restyle' = 'placing') => {
    roomEl.innerHTML = roomSVG(room.id, placed());
    if (animate) roomEl.querySelector(`[data-item="${animate}"]`)?.classList.add(kind);
  };
  if (roomIsPainted(room.id)) void prepareRoom(room.id).then(() => { if (roomEl.isConnected) renderRoom(); });

  // ----- top -----
  const timer = h('span', {});
  const tokensVal = h('b', {});
  const tokenPill = h('div', { class: 'pill ct-tokens' }, svgIcon(TOKEN), h('span', { class: 'pill-text' }, tokensVal));
  const top = h('div', { class: 'ct-top' },
    btn(icon('close'), 'round red', () => nav.home()),
    h('div', { class: 'ct-plaque' },
      h('div', { class: 'ct-title' }, t('contest')),
      h('div', { class: 'room-name' }, tl(room.name)),
      h('div', { class: 'timer' }, icon('clock'), timer),
    ),
    tokenPill,
  );
  const tags = h('div', { class: 'ct-tags' },
    favChip(fav),
    mode === 'practice' ? h('span', { class: 'ct-chip practice' }, t('contestPracticeTag')) : null,
  );

  // ----- bottom panel -----
  const styles = h('div', { class: 'ct-styles' });
  const palette = h('div', { class: 'ct-palette' });
  const action = h('div', { class: 'ct-action' });
  const panel = h('div', { class: 'ct-panel' }, h('div', { class: 'picker-title' }, t('chooseStyle')), styles, palette, action);

  const screen = h('div', { class: 'screen contest' }, roomEl, h('div', { class: 'home-shade' }), top, tags, panel);
  app.replaceChildren(screen);

  const tokens = () => (mode === 'live' ? contestState().tokens : Infinity);

  function choose(item: string, style: number) {
    if (locked()) { sfx('bad'); toast(t('contestSubmitted')); return; }
    const task = room.tasks.find((tk) => tk.item === item)!;
    const isNew = placed()[item] === undefined;
    if (placed()[item] === style) return;
    if (mode === 'live') {
      if (!contestPlace(item, style)) {
        sfx('bad');
        toast(t('contestNeedTokens'));
        tokenPill.classList.remove('shake');
        void tokenPill.offsetWidth;
        tokenPill.classList.add('shake');
        return;
      }
    } else practice[item] = style;
    sfx(isNew ? 'build' : 'pop');
    if (isNew && task.cost) setTimeout(() => sfx('star'), 300);
    renderRoom(item, isNew ? 'placing' : 'restyle');
    render();
  }

  function remove(item: string) {
    if (locked() || placed()[item] === undefined) return;
    if (mode === 'live') contestRemove(item);
    else delete practice[item];
    sfx('pop');
    renderRoom();
    render();
  }

  function render() {
    const p = placed();
    const task = room.tasks.find((tk) => tk.item === sel)!;
    const cur = p[sel];
    styles.replaceChildren(
      ...task.styles.map((st, i) => {
        const fam = swatchFamily(st.swatch);
        return h('button', { class: `style-opt ${cur === i ? 'on' : ''}`, style: `--sw:${st.swatch}`, onclick: () => choose(sel, i) },
          h('i', { class: 'ct-dot', style: `--c:${FAMILY_COLOR[fam]}`, title: t(FAMILY_KEY[fam]) }),
          h('div', { class: 'style-ic', html: itemIconSVG(room.id, task.item, i) }),
          h('small', {}, tl(st.name)),
        );
      }),
      h('button', { class: `ct-remove ${cur === undefined || locked() ? 'dim' : ''}`, onclick: () => remove(sel), 'aria-label': t('contestRemove') },
        icon('close'), h('small', {}, t('contestRemove'))),
    );
    palette.replaceChildren(...room.tasks.map((tk) => {
      const on = p[tk.item] !== undefined;
      return h('button', {
        class: `ct-item ${on ? 'on' : ''} ${tk.item === sel ? 'sel' : ''}`,
        onclick: () => { sfx('click'); sel = tk.item; render(); },
      },
        h('div', { class: 'ct-item-ic', html: itemIconSVG(room.id, tk.item, p[tk.item] ?? 0) }),
        on ? icon('check', 'ic ct-check') : h('span', { class: `ct-cost ${tk.cost > tokens() ? 'no' : ''}` }, svgIcon(TOKEN), String(tk.cost)),
      );
    }));
    palette.querySelector('.sel')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });

    const doneCost = room.tasks.filter((tk) => p[tk.item] !== undefined).reduce((s, tk) => s + tk.cost, 0);
    const pct = Math.round((doneCost / roomTotalCost(room)) * 100);
    const fill = h('div', { class: 'fill', style: `width:${pct}%` });
    const meter = h('div', { class: 'ct-meter' }, h('small', {}, t('contestDesign')), h('div', { class: 'bar' }, fill, h('span', {}, `${pct}%`)));
    let main: HTMLElement;
    if (mode === 'practice') {
      main = btn(h('span', { class: 'btn-col' }, h('span', {}, t('contestSubmit')), h('small', {}, t('contestOpensIn', fmtTime(nextContestIn())))), 'grey ct-submit', () => toast(t('contestSoon')));
    } else if (locked()) {
      main = btn(h('span', { class: 'btn-inner' }, svgIcon(TROPHY), t('contestResults')), 'yellow ct-submit', () => showBoard(contestResult(id, placed())));
    } else {
      main = btn(t('contestSubmit'), `green ct-submit ${Object.keys(p).length >= CONTEST_MIN_ITEMS ? 'pulse' : ''}`, askSubmit);
    }
    action.replaceChildren(meter, main);
    tokensVal.textContent = mode === 'live' ? String(tokens()) : '∞';
  }

  function askSubmit() {
    if (Object.keys(placed()).length < CONTEST_MIN_ITEMS) { sfx('bad'); toast(t('contestMinItems', CONTEST_MIN_ITEMS)); return; }
    const m = modal({
      title: t('contestSubmit'),
      cls: 'contest-modal',
      body: h('div', { class: 'center' }, h('div', { class: 'mochi-mini', html: mascotSVG('wow') }), h('p', {}, t('contestSubmitAsk'))),
      buttons: [
        { label: t('cancel'), cls: 'grey', onClick: () => m.close() },
        { label: t('contestSubmit'), cls: 'green', onClick: () => {
          m.close();
          const res = submitContest();
          if (!res) return;
          render();
          void judging(res).then(() => showBoard(res, true));
        } },
      ],
    });
  }

  const tick = () => { timer.textContent = mode === 'live' ? t('endsIn', fmtTime(huntEndsIn())) : t('contestOpensIn', fmtTime(nextContestIn())); };
  tick();
  render();
  const iv = setInterval(() => { if (!screen.isConnected) clearInterval(iv); else tick(); }, 1000);
}

// ---------- judging show ----------

const fmtScore = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function judgeAvatar(avatar: string): HTMLElement {
  return avatar === 'mochi' ? h('div', { class: 'ct-avatar mochi', html: mascotSVG('wow') }) : h('div', { class: 'ct-avatar' }, avatar);
}

/** Full-screen reveal of the four judges' scores. Tap to speed it up. */
async function judging(res: ContestResult): Promise<void> {
  let fast = false;
  const pause = (ms: number) => wait(fast ? 60 : ms);
  const cards = JUDGES.map((j, i) => {
    const score = h('b', { class: 'ct-score' }, '?');
    const comment = h('p', { class: 'ct-comment' }, t(res.verdicts[i].comment, t(FAMILY_KEY[res.fav])));
    const card = h('div', { class: 'ct-judge', style: `--jc:${j.color}` }, judgeAvatar(j.avatar), h('div', { class: 'ct-jname' }, tl(j.name)), score, comment);
    return { card, score };
  });
  const total = h('b', {}, '0');
  const totalRow = h('div', { class: 'ct-total' }, h('span', {}, t('contestTotal')), total, h('small', {}, `/ ${JUDGES.length * 10}`));
  const next = h('div', { class: 'win-buttons ct-next-btn hidden' });
  const el = h('div', { class: 'win-screen ct-judging' },
    h('div', { class: 'win-rays' }),
    h('div', { class: 'ct-judging-title' }, t('contestJudging')),
    h('div', { class: 'ct-judges' }, ...cards.map((c) => c.card)),
    totalRow,
    next,
  );
  el.addEventListener('pointerup', () => { fast = true; });
  document.getElementById('overlay')!.append(el);
  sfx('praise');
  await pause(700);
  let sum = 0;
  for (let i = 0; i < cards.length; i++) {
    const v = res.verdicts[i];
    cards[i].card.classList.add('show');
    sfx('pop');
    await pause(450);
    cards[i].score.textContent = fmtScore(v.score);
    cards[i].score.classList.add('in', v.score >= 8 ? 'hi' : v.score >= 5 ? 'mid' : 'lo');
    sfx(v.score >= 8 ? 'star' : 'coin');
    sum += v.score;
    total.textContent = fmtScore(sum);
    await pause(750);
  }
  totalRow.classList.add('in');
  sfx('win');
  if (res.rank <= 3) confetti();
  await new Promise<void>((resolve) => {
    next.append(btn(t('contestBoard'), 'green big', () => { el.classList.add('out'); setTimeout(() => el.remove(), 300); resolve(); }));
    next.classList.remove('hidden');
  });
}

// ---------- leaderboard ----------

function showBoard(res: ContestResult, fresh = false) {
  const room = contestRoom(save.contest.id);
  const rows = res.board.map((e, i) => h('div', { class: `racer ${e.you ? 'you' : ''}` },
    h('span', { class: `rank ${i < 3 ? `r${i + 1}` : ''}` }, String(i + 1)),
    h('div', { class: 'ct-thumb', html: roomSVG(room.id, e.placed) }),
    h('span', { class: 'avatar' }, e.avatar),
    h('div', { class: 'racer-main' }, h('div', { class: 'racer-name' }, e.you ? t('you') : e.name)),
    h('b', { class: 'ct-pts' }, fmtScore(e.total)),
  ));
  const list = h('div', { class: 'race-list ct-board' }, ...rows);
  const m = modal({
    title: t('contestBoard'),
    cls: 'contest-modal',
    body: h('div', {},
      h('div', { class: 'ct-rank-head' },
        h('div', { class: 'fest-points' }, t('contestYourRank', res.rank, CONTEST_BOTS + 1)),
        h('div', { class: 'ct-verdicts' }, ...JUDGES.map((j, i) => h('span', { class: 'ct-chip' }, j.avatar === 'mochi' ? '🐱' : j.avatar, fmtScore(res.verdicts[i].score)))),
        rewardChips(res.prize),
        h('p', { class: 'muted' }, fresh ? t('contestDone') : t('contestNextIn', fmtTime(nextContestIn()))),
      ),
      list,
    ),
    buttons: [{ label: fresh ? t('claim') : t('ok'), cls: 'green', onClick: () => {
      if (fresh) { sfx('coin'); confetti(); }
      m.close();
      nav.refresh();
    } }],
  });
  const you = list.querySelector<HTMLElement>('.racer.you');
  requestAnimationFrame(() => { if (you) list.scrollTop = you.offsetTop - list.offsetTop - (list.clientHeight - you.offsetHeight) / 2; });
}
