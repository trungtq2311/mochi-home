// Hand-designed vector art for the board: chunky faceted candy-gems with a same-hue rim, a bevel and a crisp highlight.
// Every function returns a self-contained SVG string on a 100×100 canvas (ids are prefixed, so many can share a page).

type Pt = [number, number];

interface Palette { light: string; base: string; deep: string; rim: string }

export const GEM_PALETTES: Palette[] = [
  { light: '#ff9db0', base: '#f22e55', deep: '#b80f32', rim: '#6e0620' }, // red heart
  { light: '#fff3a6', base: '#ffc81f', deep: '#ea8a08', rim: '#7d4204' }, // yellow star
  { light: '#a8ecff', base: '#2eaaf6', deep: '#1361cc', rim: '#0a3474' }, // blue diamond
  { light: '#d2f78a', base: '#62cd2c', deep: '#2a8b12', rim: '#144d07' }, // green leaf
  { light: '#e8bdff', base: '#a950f0', deep: '#6b21c2', rim: '#380c70' }, // purple crystal
  { light: '#ffd596', base: '#ff8c22', deep: '#e2520b', rim: '#7d2a04' }, // orange flower
];

const f = (n: number) => +n.toFixed(2);

/** Closed polygon with circular-ish rounded corners (quadratic joins). */
function roundedPoly(pts: Pt[], r: number): string {
  const n = pts.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[(i - 1 + n) % n], [cx, cy] = pts[i], [nx, ny] = pts[(i + 1) % n];
    const l1 = Math.hypot(px - cx, py - cy), l2 = Math.hypot(nx - cx, ny - cy);
    const a = Math.min(r, l1 / 2), b = Math.min(r, l2 / 2);
    const x1 = cx + ((px - cx) / l1) * a, y1 = cy + ((py - cy) / l1) * a;
    const x2 = cx + ((nx - cx) / l2) * b, y2 = cy + ((ny - cy) / l2) * b;
    d += `${i ? 'L' : 'M'}${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`;
  }
  return d + 'Z';
}

function ring(n: number, R: number, cx: number, cy: number, rot = -90, r?: number): Pt[] {
  return Array.from({ length: n * (r ? 2 : 1) }, (_, i) => {
    const rad = r && i % 2 ? r : R;
    const a = ((rot + (i * 360) / (n * (r ? 2 : 1))) * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)] as Pt;
  });
}

const poly = (pts: Pt[]) => pts.map(([x, y]) => `${f(x)},${f(y)}`).join(' ');

/**
 * Shared look: soft contact shadow, thick rim in the darkest hue, gradient body, inner bevel,
 * facet shading (clipped to the body) and a glossy highlight.
 */
function gemSVG(id: string, p: Palette, body: string, facets: string, highlight: string, bevel = 0.74, cy = 52): string {
  // bevel 0 = facets already give the shape depth, skip the inner bevel
  const t = `translate(50 ${cy}) scale(${bevel}) translate(-50 -${cy})`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<defs>
<linearGradient id="${id}b" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="${p.light}"/><stop offset=".45" stop-color="${p.base}"/><stop offset="1" stop-color="${p.deep}"/></linearGradient>
<linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".6" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<clipPath id="${id}c">${body}</clipPath>
</defs>
<ellipse cx="50" cy="93" rx="30" ry="4.5" fill="#2a1408" opacity=".22"/>
<g fill="${p.rim}" stroke="${p.rim}" stroke-width="8" stroke-linejoin="round">${body}</g>
<g fill="url(#${id}b)">${body}</g>
<g clip-path="url(#${id}c)">${facets}${bevel ? `<g fill="url(#${id}v)" transform="${t}">${body}</g>` : ''}</g>
<g fill="#fff">${highlight}</g>
</svg>`;
}

const HEART = 'M50 88C24 71 7 54 10 35C12.5 19 33 10 50 26C67 10 87.5 19 90 35C93 54 76 71 50 88Z';

function heartSVG(id: string, p: Palette): string {
  const body = `<path d="${HEART}"/>`;
  const facets = `<path d="M50 26L50 88L10 35Z" fill="#fff" opacity=".1"/><path d="M50 26L90 35L50 88Z" fill="${p.rim}" opacity=".16"/>`;
  const hl = `<path d="M20 30C24 21 33 19 39 23C33 25 27 30 24 37C22 40 18 36 20 30Z" opacity=".9"/><circle cx="72" cy="27" r="3.2" opacity=".75"/>`;
  return gemSVG(id, p, body, facets, hl, 0.7, 48);
}

function starSVG(id: string, p: Palette): string {
  const pts = ring(5, 46, 50, 54, -90, 23);
  const body = `<path d="${roundedPoly(pts, 7)}"/>`;
  // Each arm split into a lit half and a shaded half from the centre: a classic faceted star.
  let facets = '';
  for (let i = 0; i < 10; i++) {
    const a = pts[i], b = pts[(i + 1) % 10];
    facets += `<polygon points="${poly([[50, 54], a, b])}" fill="${i % 2 ? p.rim : '#fff'}" opacity="${i % 2 ? 0.14 : 0.13}"/>`;
  }
  const hl = `<path d="M33 37C35 30 41 27 44 29C42 33 39 38 37 43C35 45 32 41 33 37Z" opacity=".9"/><circle cx="62" cy="34" r="2.6" opacity=".7"/>`;
  return gemSVG(id, p, body, facets, hl, 0.6, 54);
}

function diamondSVG(id: string, p: Palette): string {
  const pts: Pt[] = [[27, 15], [73, 15], [92, 39], [50, 90], [8, 39]];
  const body = `<path d="${roundedPoly(pts, 5)}"/>`;
  const facets =
    `<polygon points="27,15 37,39 8,39" fill="#fff" opacity=".28"/>` +
    `<polygon points="27,15 50,15 37,39" fill="#fff" opacity=".12"/>` +
    `<polygon points="50,15 73,15 63,39" fill="${p.rim}" opacity=".06"/>` +
    `<polygon points="73,15 92,39 63,39" fill="${p.rim}" opacity=".18"/>` +
    `<polygon points="37,39 63,39 50,15" fill="#fff" opacity=".18"/>` +
    `<polygon points="8,39 37,39 50,90" fill="#fff" opacity=".1"/>` +
    `<polygon points="63,39 92,39 50,90" fill="${p.rim}" opacity=".26"/>` +
    `<polygon points="37,39 63,39 50,90" fill="${p.rim}" opacity=".08"/>` +
    `<path d="M8 39H92M37 39L50 90L63 39M27 15L37 39L50 15L63 39L73 15" fill="none" stroke="${p.rim}" stroke-width="1.6" stroke-opacity=".35" stroke-linejoin="round"/>`;
  const hl = `<path d="M24 22C26 19 31 19 32 21L24 34C22 36 19 33 20 30Z" opacity=".9"/><circle cx="40" cy="60" r="2.4" opacity=".55"/>`;
  return gemSVG(id, p, body, facets, hl, 0, 50);
}

function leafSVG(id: string, p: Palette): string {
  const LEAF = 'M78 10C90 34 86 62 66 79C52 91 31 92 18 84C13 66 16 44 31 28C44 15 60 10 78 10Z';
  const body = `<path d="${LEAF}"/>`;
  const facets =
    `<path d="M78 10C60 34 40 58 18 84C13 66 16 44 31 28C44 15 60 10 78 10Z" fill="#fff" opacity=".14"/>` +
    `<path d="M78 10C64 40 44 64 18 84" fill="none" stroke="${p.rim}" stroke-width="3.2" stroke-linecap="round" opacity=".45"/>` +
    `<path d="M60 36L45 34M53 49L34 50M44 61L28 65M66 40L74 50M58 54L66 66M48 66L52 78" fill="none" stroke="${p.rim}" stroke-width="2.2" stroke-linecap="round" opacity=".28"/>`;
  const hl = `<path d="M28 36C33 26 44 19 53 18C46 23 38 31 33 40C31 44 26 41 28 36Z" opacity=".9"/><circle cx="72" cy="58" r="2.4" opacity=".6"/>`;
  return gemSVG(id, p, body, facets, hl, 0.72, 50);
}

function crystalSVG(id: string, p: Palette): string {
  const outer = ring(6, 45, 50, 51, -90);
  const inner = ring(6, 24, 50, 49, -90);
  const body = `<path d="${roundedPoly(outer, 6)}"/>`;
  const shades = [0.3, 0.16, -0.12, -0.26, -0.14, 0.12]; // lit from the top-left
  let facets = '';
  for (let i = 0; i < 6; i++) {
    const s = shades[i];
    facets += `<polygon points="${poly([outer[i], outer[(i + 1) % 6], inner[(i + 1) % 6], inner[i]])}" fill="${s > 0 ? '#fff' : p.rim}" opacity="${Math.abs(s)}"/>`;
  }
  facets += `<polygon points="${poly(inner)}" fill="#fff" opacity=".2"/>` +
    `<polygon points="${poly(inner)}" fill="none" stroke="${p.rim}" stroke-width="1.6" stroke-opacity=".3" stroke-linejoin="round"/>`;
  const hl = `<path d="M31 27C35 23 41 22 43 24L33 38C31 40 27 37 28 34Z" opacity=".9"/><circle cx="62" cy="42" r="2.6" opacity=".65"/>`;
  return gemSVG(id, p, body, facets, hl, 0, 51);
}

function flowerSVG(id: string, p: Palette): string {
  const centres = ring(5, 25, 50, 52, -90);
  const petals = centres.map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="19"/>`).join('');
  const body = petals;
  let facets = '';
  centres.forEach(([x, y], i) => {
    // A soft crease from each petal toward the centre + a lit upper half on the top petals.
    facets += `<path d="M50 52L${f(50 + (x - 50) * 1.55)} ${f(52 + (y - 52) * 1.55)}" stroke="${p.rim}" stroke-width="2.2" stroke-linecap="round" opacity=".22"/>`;
    if (i === 0 || i === 4) facets += `<circle cx="${f(x - 3)}" cy="${f(y - 4)}" r="11" fill="#fff" opacity=".16"/>`;
  });
  facets += `<circle cx="50" cy="52" r="15" fill="${p.rim}" opacity=".55"/><circle cx="50" cy="52" r="12.5" fill="#fff2c4"/>` +
    `<circle cx="50" cy="54" r="12.5" fill="#f4c86a" opacity=".55"/><circle cx="50" cy="51" r="9" fill="#fff6d6"/>` +
    `<circle cx="46" cy="48" r="2" fill="#e8a43e" opacity=".55"/><circle cx="53" cy="47" r="1.6" fill="#e8a43e" opacity=".55"/><circle cx="51" cy="55" r="1.8" fill="#e8a43e" opacity=".55"/>`;
  const hl = `<path d="M34 22C37 17 44 16 46 18C42 20 39 24 37 28C35 30 32 26 34 22Z" opacity=".9"/><circle cx="76" cy="40" r="2.4" opacity=".6"/>`;
  return gemSVG(id, p, body, facets, hl, 0, 52);
}

const PIECES = [heartSVG, starSVG, diamondSVG, leafSVG, crystalSVG, flowerSVG];

export function pieceVectorSVG(color: number): string {
  return PIECES[color](`p${color}`, GEM_PALETTES[color]);
}

// ---------- boosters ----------

/** Warm glow behind every booster so it stands out from the ordinary pieces on the light board. */
const aura = (id: string, color = '#ffd84a') =>
  `<radialGradient id="${id}a"><stop offset="0" stop-color="#fff8c8" stop-opacity=".95"/><stop offset=".45" stop-color="${color}" stop-opacity=".55"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
const auraDisc = (id: string) => `<circle cx="50" cy="50" r="50" fill="url(#${id}a)"/>`;

export function rocketVectorSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<defs>${aura('rk')}
<linearGradient id="rkb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#f6efe6"/><stop offset="1" stop-color="#cdbfb2"/></linearGradient>
<linearGradient id="rkr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a78"/><stop offset=".5" stop-color="#f01c32"/><stop offset="1" stop-color="#a00c1c"/></linearGradient>
<linearGradient id="rkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3a0"/><stop offset=".5" stop-color="#ffc21a"/><stop offset="1" stop-color="#e07406"/></linearGradient>
<linearGradient id="rkf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd6ff"/><stop offset="1" stop-color="#155fd0"/></linearGradient>
<clipPath id="rkc"><rect x="20" y="32" width="60" height="36"/></clipPath>
</defs>
${auraDisc('rk')}
<g stroke="#4a140c" stroke-width="7" stroke-linejoin="round" fill="#4a140c">
<path d="M40 32L50 12L60 32Z"/><path d="M40 68L50 88L60 68Z"/>
<path d="M20 32H80V68H20Z"/><path d="M20 32L3 50L20 68Z"/><path d="M80 32L97 50L80 68Z"/></g>
<path d="M40 32L50 12L60 32Z" fill="url(#rkf)"/><path d="M40 68L50 88L60 68Z" fill="url(#rkf)"/>
<rect x="20" y="32" width="60" height="36" fill="url(#rkb)"/>
<g clip-path="url(#rkc)" fill="url(#rkr)"><rect x="27" y="28" width="10" height="44"/><rect x="45" y="28" width="10" height="44"/><rect x="63" y="28" width="10" height="44"/></g>
<path d="M20 32L3 50L20 68Z" fill="url(#rkg)"/><path d="M80 32L97 50L80 68Z" fill="url(#rkg)"/>
<path d="M20 32V68M80 32V68" stroke="#4a140c" stroke-width="2" stroke-opacity=".45"/>
<rect x="23" y="36" width="54" height="6" rx="3" fill="#fff" opacity=".9"/>
<path d="M16 39L9 46M84 39L91 46" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".9"/>
</svg>`;
}

export function bombVectorSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<defs>${aura('bm', '#ff9a3a')}<radialGradient id="bmb" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#6c84c8"/><stop offset=".45" stop-color="#2b3a78"/><stop offset="1" stop-color="#121a3e"/></radialGradient>
<linearGradient id="bmc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8edf5"/><stop offset="1" stop-color="#7d8798"/></linearGradient></defs>
${auraDisc('bm')}
<path d="M60 24C64 14 72 11 79 14" fill="none" stroke="#3a2010" stroke-width="8" stroke-linecap="round"/>
<path d="M60 24C64 14 72 11 79 14" fill="none" stroke="#d9a35c" stroke-width="3.6" stroke-linecap="round"/>
<circle cx="47" cy="59" r="33" fill="#0b1030" stroke="#0b1030" stroke-width="8"/>
<circle cx="47" cy="59" r="33" fill="url(#bmb)"/>
<rect x="50" y="20" width="18" height="14" rx="3" transform="rotate(32 59 27)" fill="url(#bmc)" stroke="#0b1030" stroke-width="5" paint-order="stroke"/>
<path d="M25 46C29 36 38 31 45 31C38 36 33 42 30 50C28 54 23 51 25 46Z" fill="#fff" opacity=".85"/>
<circle cx="64" cy="76" r="3" fill="#fff" opacity=".25"/>
<path d="M82 4L85 12L93 14L85 16.5L82 25L79 16.5L71 14L79 12Z" fill="#ffe14d" stroke="#e86a0a" stroke-width="2" stroke-linejoin="round"/>
<circle cx="82" cy="14" r="2.8" fill="#fff"/>
</svg>`;
}

/** A bright yellow-and-orange paper plane: the white one disappeared against the pale board. */
export function planeVectorSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<defs>${aura('pl', '#7fd0ff')}
<linearGradient id="plt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4a6"/><stop offset="1" stop-color="#ffc21a"/></linearGradient>
<linearGradient id="plr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffab3d"/><stop offset="1" stop-color="#e2520b"/></linearGradient></defs>
${auraDisc('pl')}
<path d="M14 74L4 80M24 84L14 92M8 62L2 64" stroke="#2a8ae0" stroke-width="3.6" stroke-linecap="round"/>
<g stroke="#5a1e04" stroke-width="7" stroke-linejoin="round" fill="#5a1e04"><path d="M4 48L96 8L64 92L46 64Z"/></g>
<path d="M4 48L96 8L46 64Z" fill="url(#plt)"/>
<path d="M46 64L96 8L64 92Z" fill="url(#plr)"/>
<path d="M46 64L96 8L56 76Z" fill="#c93a06"/>
<path d="M46 64L56 76L50 84Z" fill="#8a2604"/>
<path d="M4 48L96 8L46 64" fill="none" stroke="#5a1e04" stroke-width="1.8" stroke-opacity=".4" stroke-linejoin="round"/>
<path d="M16 46L64 25" stroke="#fff" stroke-width="3.6" stroke-linecap="round" opacity=".95"/>
<path d="M70 40L80 30" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>
</svg>`;
}

export function discoVectorSVG(phase = 0): string {
  const hues = (x: number, y: number) => Math.round((x * 9 + y * 5 + phase * 360) % 360);
  let tiles = '';
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    tiles += `<rect x="${14 + x * 9}" y="${14 + y * 9}" width="8.2" height="8.2" rx="1.6" fill="hsl(${hues(x, y)} 95% ${52 + ((x + y) % 2) * 12}%)"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<defs>${aura('ds', '#d28cff')}<clipPath id="dsc"><circle cx="50" cy="50" r="38"/></clipPath>
<radialGradient id="dss" cx=".38" cy=".34" r=".72"><stop offset="0" stop-color="#fff" stop-opacity=".32"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1a0840" stop-opacity=".6"/></radialGradient></defs>
${auraDisc('ds')}
<circle cx="50" cy="50" r="38" fill="#2a1060" stroke="#2a1060" stroke-width="8"/>
<g clip-path="url(#dsc)"><rect x="10" y="10" width="80" height="80" fill="#3a1880"/>${tiles}<circle cx="50" cy="50" r="38" fill="url(#dss)"/></g>
<path d="M25 38C29 27 37 22 46 21C39 26 34 32 31 41C29 45 23 43 25 38Z" fill="#fff" opacity=".9"/>
<path d="M80 10L82 15.5L87.5 17.5L82 19.5L80 25L78 19.5L72.5 17.5L78 15.5Z" fill="#fff"/>
</svg>`;
}

// ---------- loading into <img> for the canvas sprites ----------

const images = new Map<string, HTMLImageElement>();

/** Same keys as the painted art (pieces/red, pieces/rocket, …), so sprites.ts can use either. */
export function vectorImage(key: string): HTMLImageElement | null {
  return images.get(key) ?? null;
}

const PIECE_KEYS = ['red', 'yellow', 'blue', 'green', 'purple', 'orange'];

export function initVectorArt(): Promise<void> {
  const svgs: Record<string, string> = {
    'pieces/rocket': rocketVectorSVG(), 'pieces/bomb': bombVectorSVG(),
    'pieces/plane': planeVectorSVG(), 'pieces/disco': discoVectorSVG(),
  };
  PIECE_KEYS.forEach((k, i) => { svgs[`pieces/${k}`] = pieceVectorSVG(i); });
  return Promise.all(Object.entries(svgs).map(([key, svg]) => new Promise<void>((done) => {
    const img = new Image();
    // Rasterize at a large size so the canvas sprites stay crisp on retina screens.
    img.width = img.height = 256;
    img.onload = () => { images.set(key, img); done(); };
    img.onerror = () => done();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('viewBox="0 0 100 100"', 'viewBox="0 0 100 100" width="256" height="256"'));
  }))).then(() => {});
}
