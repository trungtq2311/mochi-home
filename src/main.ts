// Only the subsets the game needs (Latin + Vietnamese).
import '@fontsource/baloo-2/latin-500.css';
import '@fontsource/baloo-2/latin-700.css';
import '@fontsource/baloo-2/latin-800.css';
import '@fontsource/baloo-2/latin-ext-700.css';
import '@fontsource/baloo-2/latin-ext-800.css';
import '@fontsource/baloo-2/vietnamese-500.css';
import '@fontsource/baloo-2/vietnamese-700.css';
import '@fontsource/baloo-2/vietnamese-800.css';
import './styles.css';
import { initArt } from './art/assets.ts';
import { unlockAudio } from './core/audio.ts';
import { t } from './core/i18n.ts';
import { mascotSVG } from './meta/roomArt.ts';
import { h } from './ui/dom.ts';
import { startGame, stopGame } from './ui/game.ts';
import { showHome } from './ui/home.ts';
import { ICON_DEFS } from './ui/icons.ts';
import { nav } from './ui/nav.ts';

document.body.insertAdjacentHTML('afterbegin', ICON_DEFS);
nav.home = (opts) => { stopGame(); showHome(opts); };
nav.play = (n, boosters) => startGame(n, boosters);
if (import.meta.env.DEV) (window as unknown as { __nav: typeof nav }).__nav = nav;

// Block pinch-zoom / double-tap zoom on iOS Safari.
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('dblclick', (e) => e.preventDefault());

function splash() {
  const app = document.getElementById('app')!;
  const title = h('h1', { class: 'splash-title', 'aria-label': t('appName') },
    ...[...t('appName')].map((ch, i) => h('span', { class: ch === ' ' ? 'sp' : '', style: `--i:${i}`, 'aria-hidden': 'true' }, ch)),
  );
  const glints = [[12, 18, 1], [84, 14, 0.7], [8, 62, 0.6], [90, 56, 1], [20, 84, 0.8], [78, 88, 0.6], [50, 8, 0.5]]
    .map(([x, y, s], i) => h('i', { class: 'glint', style: `left:${x}%;top:${y}%;--s:${s};animation-delay:${(i * 0.37).toFixed(2)}s` }));
  const el = h('div', { class: 'screen splash' },
    h('div', { class: 'splash-rays' }),
    ...glints,
    h('div', { class: 'splash-logo' },
      h('div', { class: 'logo-halo' }),
      h('div', { class: 'logo-cat', html: mascotSVG('happy') }),
      title,
      h('p', { class: 'splash-tag' }, t('tagline')),
    ),
    h('div', { class: 'tap' }, h('span', { class: 'btn green big tap-btn' }, t('tapToStart'))),
  );
  app.replaceChildren(el);
  el.addEventListener('pointerup', () => { unlockAudio(); showHome(); }, { once: true });
}

void Promise.all([document.fonts.ready, initArt()]).then(splash);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { /* not allowed here (e.g. sandboxed embed) */ }); });
}
