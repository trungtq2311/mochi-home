// Inline SVG UI icons (consistent across devices, unlike emoji).
// One style for all: chunky dark outline, gradient body, glossy highlight, soft bottom shade.
// Gradients live in ICON_DEFS (injected once into <body>) and are referenced by id.
const svg = (body: string, vb = '0 0 64 64') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;

const OL = '#3b2147'; // shared outline colour
const o = (w = 3.5) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const shine = (d: string, w = 3.5, op = 0.85) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;
const twinkle = (x: number, y: number, r: number) =>
  `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}z" fill="#fff"/>`;

const STAR = 'M32 6L39.9 23.1L58.6 25.4L44.8 38.2L48.5 56.7L32 47.5L15.5 56.7L19.2 38.2L5.4 25.4L24.1 23.1Z';
const STAR_IN = 'M32 15L36.5 26.3L48.6 27.4L39.5 35.6L42.1 47.4L32 41.3L21.9 47.4L24.5 35.6L15.4 27.4L27.5 26.3Z';
const HEART = 'M32 57C9 43 3 29 9 17.5c6-10.5 19-10 23 0.5 4-10.5 17-11 23-0.5 6 11.5 0 25.5-23 39.5z';

export const ICON = {
  coin: svg(`<ellipse cx="32" cy="35.5" rx="26" ry="25" fill="#b8650a" ${o()}/>
    <circle cx="32" cy="31" r="25" fill="url(#ic-coin)" ${o()}/>
    <circle cx="32" cy="31" r="18" fill="url(#ic-coin-in)" stroke="#d98a0c" stroke-width="2.5"/>
    <path d="M32 19.5l3.4 7.2 7.8.9-5.8 5.4 1.5 7.7-6.9-3.9-6.9 3.9 1.5-7.7-5.8-5.4 7.8-.9z" fill="#fff4b8" stroke="#d98a0c" stroke-width="2" stroke-linejoin="round"/>
    ${shine('M13.5 26a19 19 0 0 1 12-12.5', 4)}${twinkle(50, 12, 6)}`),
  star: svg(`<path d="${STAR}" transform="translate(0 2.5)" fill="#c25d00" ${o(4)}/>
    <path d="${STAR}" fill="url(#ic-star)" ${o(4)}/>
    <path d="${STAR_IN}" fill="url(#ic-star-in)" opacity=".9"/>
    ${shine('M15 27.5l8.5-1.3 3.6-7.8', 3.5)}${twinkle(51, 11, 5.5)}`),
  heart: svg(`<path d="${HEART}" transform="translate(0 2.5)" fill="#8f0c35" ${o(4)}/>
    <path d="${HEART}" fill="url(#ic-heart)" ${o(4)}/>
    <path d="M32 50C16 39.5 12 30 15.5 22.5" fill="none" stroke="#ff9fb6" stroke-width="3" stroke-linecap="round" opacity=".5"/>
    <ellipse cx="20" cy="21" rx="6.5" ry="4.2" fill="#fff" opacity=".85" transform="rotate(-35 20 21)"/>
    <circle cx="27.5" cy="16.5" r="2" fill="#fff" opacity=".85"/>`),
  hammer: svg(`<rect x="28" y="22" width="9" height="37" rx="4" fill="url(#ic-wood)" ${o(3)}/>
    <path d="M31 27v27" stroke="#ffd9a6" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    <rect x="8" y="7" width="48" height="20" rx="6" fill="url(#ic-steel)" ${o(3.5)}/>
    <rect x="8" y="7" width="9" height="20" rx="4" fill="#ff6a7f" ${o(3.5)}/>
    <rect x="47" y="7" width="9" height="20" rx="4" fill="#ff6a7f" ${o(3.5)}/>
    ${shine('M21 12.5h21', 3.5, 0.9)}<path d="M12 12v5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>`),
  broom: svg(`<g transform="rotate(22 32 32)">
    <rect x="28.5" y="2" width="8" height="36" rx="4" fill="url(#ic-wood)" ${o(3)}/>
    <path d="M20 38h25l7 20H13z" fill="url(#ic-straw)" ${o(3.5)}/>
    <rect x="20" y="33" width="25" height="8" rx="3" fill="#ff5a6e" ${o(3)}/>
    <path d="M26 44l-3 11M32.5 44v11M39 44l3 11" stroke="#c98a2a" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M23 35.5h9" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>
    ${twinkle(10, 50, 5)}${twinkle(17, 58, 3)}`),
  shuffle: svg(`<path d="M8 22h11c11 0 15 20 25 20h4" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/>
    <path d="M8 22h11c11 0 15 20 25 20h4" fill="none" stroke="#38a6ff" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M46 32l12 10-12 10z" fill="#38a6ff" ${o(3.5)}/>
    <path d="M8 42h11c11 0 15-20 25-20h4" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/>
    <path d="M8 42h11c11 0 15-20 25-20h4" fill="none" stroke="#ff9a2e" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M46 12l12 10-12 10z" fill="#ff9a2e" ${o(3.5)}/>
    <path d="M10 40.5h8" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>`),
  gear: svg(`<path d="M27.5 5h9l1.6 7.2 4.7 2 6.2-4 6.4 6.4-4 6.2 2 4.7 7.1 1.6v9l-7.1 1.6-2 4.7 4 6.2-6.4 6.4-6.2-4-4.7 2-1.6 7.1h-9l-1.6-7.1-4.7-2-6.2 4-6.4-6.4 4-6.2-2-4.7L5 36.5v-9l7.2-1.6 2-4.7-4-6.2 6.4-6.4 6.2 4 4.7-2z" fill="url(#ic-silver)" ${o(3.5)}/>
    <circle cx="32" cy="32" r="12" fill="url(#ic-purple)" ${o(3.5)}/>
    <circle cx="32" cy="32" r="4.5" fill="${OL}"/>
    ${shine('M15 19.5a20 20 0 0 1 9.5-7', 3, 0.9)}<path d="M26 29a7 7 0 0 1 4-4" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity=".75"/>`),
  pause: svg(`<rect x="15" y="12" width="12" height="40" rx="5" fill="#fff" ${o(3)}/>
    <rect x="37" y="12" width="12" height="40" rx="5" fill="#fff" ${o(3)}/>
    <path d="M19.5 18v12M41.5 18v12" stroke="#e5dcff" stroke-width="3" stroke-linecap="round"/>`),
  gift: svg(`<rect x="10" y="27" width="44" height="31" rx="5" fill="url(#ic-pink)" ${o()}/>
    <rect x="10" y="27" width="44" height="7" fill="#c2184b" opacity=".35"/>
    <rect x="6.5" y="18" width="51" height="12" rx="4" fill="url(#ic-pink)" ${o()}/>
    <rect x="27.5" y="18" width="9" height="40" fill="url(#ic-gold)" ${o(3)}/>
    <path d="M32 18c-6-13-21-11-15-1.5 2.5 2 9 2 15 1.5zM32 18c6-13 21-11 15-1.5-2.5 2-9 2-15 1.5z" fill="url(#ic-gold)" ${o(3)}/>
    ${shine('M11.5 23.5h12', 3, 0.9)}<path d="M15 36v15" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>${twinkle(53, 9, 5)}`),
  scroll: svg(`<path d="M14 12h32a5 5 0 0 1 5 5v36a5 5 0 0 1-5 5H18a5 5 0 0 1-5-5z" fill="url(#ic-paper)" ${o()}/>
    <rect x="9" y="7" width="38" height="10" rx="5" fill="#e9b872" ${o(3)}/>
    <path d="M14 10.5h26" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
    <path d="M20 26h22M20 34h22M20 42h12" stroke="#c99756" stroke-width="4" stroke-linecap="round"/>
    <circle cx="46" cy="47" r="11" fill="url(#ic-green)" ${o(3.5)}/>
    <path d="M40.5 47l4 4 6.5-7.5" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  flag: svg(`<rect x="10" y="5" width="7" height="55" rx="3.5" fill="url(#ic-wood)" ${o(3)}/>
    <circle cx="13.5" cy="6.5" r="4.5" fill="url(#ic-gold)" ${o(2.5)}/>
    <path d="M17 11c10-4 16 4 26 0s12-1 14 0v24c-2-1-6-4-14 0s-16-4-26 0z" fill="#fff" ${o()}/>
    <clipPath id="ic-flag-clip"><path d="M17 11c10-4 16 4 26 0s12-1 14 0v24c-2-1-6-4-14 0s-16-4-26 0z"/></clipPath>
    <g clip-path="url(#ic-flag-clip)" fill="${OL}"><rect x="17" y="6" width="8" height="9"/><rect x="33" y="6" width="8" height="9"/><rect x="49" y="6" width="8" height="9"/>
    <rect x="25" y="15" width="8" height="9"/><rect x="41" y="15" width="8" height="9"/><rect x="17" y="24" width="8" height="9"/><rect x="33" y="24" width="8" height="9"/><rect x="49" y="24" width="8" height="9"/>
    <rect x="25" y="33" width="8" height="9"/><rect x="41" y="33" width="8" height="9"/></g>
    <path d="M17 11c10-4 16 4 26 0s12-1 14 0v24c-2-1-6-4-14 0s-16-4-26 0z" fill="none" ${o()}/>`),
  check: svg(`<circle cx="32" cy="34" r="26" fill="#1c7a14" ${o(3.5)}/>
    <circle cx="32" cy="31" r="26" fill="url(#ic-green)" ${o(3.5)}/>
    <path d="M19 32l9 9 17-18" fill="none" stroke="${OL}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 32l9 9 17-18" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    ${shine('M12 24a21 21 0 0 1 11-12', 3.5)}`),
  lock: svg(`<path d="M21 29v-8a11 11 0 0 1 22 0v8" fill="none" stroke="${OL}" stroke-width="10"/>
    <path d="M21 29v-8a11 11 0 0 1 22 0v8" fill="none" stroke="url(#ic-silver)" stroke-width="5"/>
    <rect x="12" y="27" width="40" height="31" rx="7" fill="url(#ic-gold)" ${o()}/>
    <path d="M32 37a4 4 0 0 1 2 7.5V50h-4v-5.5a4 4 0 0 1 2-7.5z" fill="${OL}"/>
    ${shine('M17 33h14', 3, 0.85)}`),
  close: svg(`<path d="M19 19l26 26M45 19L19 45" stroke="${OL}" stroke-width="13" stroke-linecap="round"/>
    <path d="M19 19l26 26M45 19L19 45" stroke="#fff" stroke-width="7.5" stroke-linecap="round"/>`),
  infinity: svg(`<path d="M20 22c-8 0-12 5-12 10s4 10 12 10c10 0 14-20 24-20 8 0 12 5 12 10s-4 10-12 10c-10 0-14-20-24-20z" fill="none" stroke="${OL}" stroke-width="10"/>
    <path d="M20 22c-8 0-12 5-12 10s4 10 12 10c10 0 14-20 24-20 8 0 12 5 12 10s-4 10-12 10c-10 0-14-20-24-20z" fill="none" stroke="#fff" stroke-width="5"/>`),
  plus: svg(`<path d="M32 14v36M14 32h36" stroke="${OL}" stroke-width="14" stroke-linecap="round"/>
    <path d="M32 14v36M14 32h36" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`),
  chest: svg(`<path d="M8 28c0-13 10-19 24-19s24 6 24 19z" fill="url(#ic-wood-lid)" ${o()}/>
    <path d="M17 13.5v14.5M47 13.5v14.5" stroke="url(#ic-gold)" stroke-width="5"/>
    <path d="M17 13.5v14.5M47 13.5v14.5" stroke="${OL}" stroke-width="1.5" opacity=".5"/>
    <rect x="8" y="28" width="48" height="28" rx="4" fill="url(#ic-wood)" ${o()}/>
    <path d="M17 31v22M47 31v22" stroke="#e7a94c" stroke-width="5"/>
    <rect x="5.5" y="25" width="53" height="7" rx="2.5" fill="url(#ic-gold)" ${o(3)}/>
    <rect x="26" y="25" width="12" height="16" rx="3" fill="url(#ic-gold)" ${o(3)}/>
    <circle cx="32" cy="34" r="2.2" fill="${OL}"/>
    ${shine('M14 22a15 9 0 0 1 12-8', 3, 0.8)}${twinkle(54, 10, 5.5)}`),
  clock: svg(`<circle cx="32" cy="34" r="24" fill="url(#ic-silver)" ${o()}/>
    <circle cx="32" cy="34" r="18" fill="#fff" stroke="#c9bce8" stroke-width="2"/>
    <path d="M32 22v12l8 5" fill="none" stroke="${OL}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="27" y="4" width="10" height="7" rx="2.5" fill="url(#ic-pink)" ${o(3)}/>
    ${shine('M15 28a18 18 0 0 1 8-9', 3)}`),
  ticket: svg(`<g transform="rotate(-14 32 32)">
    <path d="M6 18h52v9a5 5 0 0 0 0 10v9H6v-9a5 5 0 0 0 0-10z" transform="translate(0 2.5)" fill="#40289e" ${o()}/>
    <path d="M6 18h52v9a5 5 0 0 0 0 10v9H6v-9a5 5 0 0 0 0-10z" fill="url(#ic-purple)" ${o()}/>
    <path d="M44 20v24" stroke="#fff" stroke-width="2.5" stroke-dasharray="3 3.5" opacity=".7"/>
    <path d="M25 22.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8-5.3-2.9-5.3 2.9 1.1-5.8-4.3-4.1 5.9-.7z" fill="url(#ic-gold)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
    ${shine('M10 22.5h12', 3, 0.8)}</g>${twinkle(53, 12, 5.5)}`),
  piggy: svg(`<path d="M17 47l-1 9h8l1-6M39 50l1 6h8l-1-9" fill="#e0567f" ${o(3)}/>
    <ellipse cx="32" cy="36" rx="25" ry="20" fill="url(#ic-pink)" ${o()}/>
    <path d="M14 22l-2-11 11 6z" fill="#ff7a9a" ${o(3)}/>
    <ellipse cx="53" cy="37" rx="6" ry="7.5" fill="#ff9ab2" ${o(3)}/>
    <circle cx="51.5" cy="35" r="1.5" fill="${OL}"/><circle cx="54.5" cy="39" r="1.5" fill="${OL}"/>
    <circle cx="40" cy="29" r="2.8" fill="${OL}"/>
    <rect x="23" y="16" width="14" height="4.5" rx="2.2" fill="${OL}"/>
    ${shine('M15 32a17 13 0 0 1 9-11', 3.5, 0.75)}${twinkle(52, 12, 5)}`),
  key: svg(`<circle cx="21" cy="24" r="14" fill="url(#ic-gold)" ${o()}/>
    <circle cx="21" cy="24" r="5.5" fill="#fff8e0" ${o(3)}/>
    <path d="M30 33l22 22M44 47l-6 6M50 53l-5 5" fill="none" stroke="${OL}" stroke-width="11" stroke-linecap="round"/>
    <path d="M30 33l22 22M44 47l-6 6M50 53l-5 5" fill="none" stroke="#ffcc2e" stroke-width="5.5" stroke-linecap="round"/>
    ${shine('M11 20a10 10 0 0 1 6-6', 3)}${twinkle(52, 14, 6)}`),
  tag: svg(`<path d="M30 6h22a6 6 0 0 1 6 6v22L32 60 4 32z" transform="translate(0 2.5)" fill="#a8541c" ${o()}/>
    <path d="M30 6h22a6 6 0 0 1 6 6v22L32 60 4 32z" fill="url(#ic-gold)" ${o()}/>
    <circle cx="47" cy="17" r="4.5" fill="#fff8e0" ${o(3)}/>
    <path d="M23 41l14-14" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="24" cy="30" r="3.5" fill="none" stroke="${OL}" stroke-width="3.5"/><circle cx="36" cy="40" r="3.5" fill="none" stroke="${OL}" stroke-width="3.5"/>
    ${shine('M28 10.5h12', 3, 0.85)}`),
};

/** Shared gradients, injected once (icons reference them by id). */
const lg = (id: string, stops: [number, string][], x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o2, c]) => `<stop offset="${o2}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const rg = (id: string, stops: [number, string][], cx = '38%', cy = '30%', r = '75%') =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o2, c]) => `<stop offset="${o2}" stop-color="${c}"/>`).join('')}</radialGradient>`;

export const ICON_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
${rg('ic-coin', [[0, '#fff8c4'], [0.45, '#ffd23f'], [1, '#e48e00']])}
${rg('ic-coin-in', [[0, '#ffe46a'], [1, '#f5a70f']], '40%', '35%', '80%')}
${lg('ic-star', [[0, '#fff6a0'], [0.45, '#ffd21f'], [1, '#ff9800']])}
${lg('ic-star-in', [[0, '#fffbd6'], [1, '#ffd84a']])}
${lg('ic-heart', [[0, '#ff9cb3'], [0.45, '#ff3f66'], [1, '#d4134a']])}
${lg('ic-steel', [[0, '#ffffff'], [0.5, '#c9d0de'], [1, '#7f8aa3']])}
${lg('ic-silver', [[0, '#ffffff'], [0.55, '#dcd5f3'], [1, '#a597d6']])}
${lg('ic-wood', [[0, '#d99654'], [1, '#9a5a24']], 1, 0)}
${lg('ic-wood-lid', [[0, '#e8a660'], [1, '#a5602a']])}
${lg('ic-straw', [[0, '#ffe38c'], [1, '#e9a93a']])}
${lg('ic-gold', [[0, '#fff2a6'], [0.5, '#ffcc2e'], [1, '#e99400']])}
${lg('ic-pink', [[0, '#ff9ab2'], [0.5, '#ff4f78'], [1, '#d81f55']])}
${lg('ic-green', [[0, '#a6f57a'], [0.5, '#52cc34'], [1, '#2c9a1c']])}
${lg('ic-purple', [[0, '#c4b2ff'], [0.5, '#8a6bff'], [1, '#5b3dd6']])}
${lg('ic-paper', [[0, '#fffaf0'], [1, '#f6deb4']])}
</defs></svg>`;
