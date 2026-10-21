// App icons + splash screens, all rendered from public/icon.svg.
//   node scripts/icons.ts   (npm run icons)
// Writes the PWA icons into public/, and — when the native projects exist — the Android
// launcher icons / splash and the iOS AppIcon / Splash images. Run again after changing icon.svg.
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import sharp from 'sharp';

const SPLASH_BG = '#5a3fb8'; // same as theme_color / capacitor.config.ts backgroundColor

// icon.svg = <defs> + background (rounded rect, glow, sparkles) + foreground (Mochi + heart).
// The foreground starts at the nested <svg>; split there so each layer can be rendered alone.
const src = readFileSync('public/icon.svg', 'utf8');
const open = src.slice(0, src.indexOf('>') + 1);
const defsEnd = src.indexOf('</defs>') + '</defs>'.length;
const defs = src.slice(open.length, defsEnd);
const fgStart = src.indexOf('<svg', open.length);
const bgRounded = src.slice(defsEnd, fgStart);
const bgSquare = bgRounded.replaceAll('rx="112"', 'rx="0"'); // stores and launchers apply their own mask
const fg = src.slice(fgStart, src.lastIndexOf('</svg>'));

/** Foreground scaled around its visual centre (256, 270), e.g. to fit a mask's safe zone. */
const fgScaled = (k: number) => `<g transform="translate(256 256) scale(${k}) translate(-256 -270)">${fg}</g>`;
const svg = (...layers: string[]) => Buffer.from(`${open}${defs}${layers.join('')}</svg>`);

const ROUNDED = svg(bgRounded, fg); // the original icon
const SQUARE = svg(bgSquare, fg); // full bleed, no transparent corners
const BG_ONLY = svg(bgSquare);
const FG_ONLY = svg(fgScaled(0.62)); // Android adaptive: keep inside the 66/108 safe circle
const MASKABLE = svg(bgSquare, fgScaled(0.8)); // PWA maskable: keep inside the 80% safe circle
const ROUND = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><circle cx="256" cy="256" r="256"/></svg>`);

let count = 0;
async function out(file: string, img: sharp.Sharp) {
  mkdirSync(dirname(file), { recursive: true });
  await img.png({ compressionLevel: 9 }).toFile(file);
  count++;
}
const icon = (svgBuf: Buffer, size: number) => sharp(svgBuf, { density: Math.max(72, (72 * size) / 512) }).resize(size, size);
const opaque = (svgBuf: Buffer, size: number) => icon(svgBuf, size).flatten({ background: SPLASH_BG }).removeAlpha();

async function circle(size: number) {
  const mask = await sharp(ROUND).resize(size, size).png().toBuffer();
  return icon(SQUARE, size).composite([{ input: mask, blend: 'dest-in' }]);
}

/** Splash: icon centred on the brand colour, sized from the shorter side. */
async function splash(w: number, h: number, frac: number) {
  const s = Math.round(Math.min(w, h) * frac);
  const logo = await icon(ROUNDED, s).png().toBuffer();
  return sharp({ create: { width: w, height: h, channels: 3, background: SPLASH_BG } }).composite([{ input: logo, gravity: 'centre' }]);
}

// ---- PWA / web ----
await out('public/icons/icon-192.png', icon(ROUNDED, 192));
await out('public/icons/icon-512.png', icon(ROUNDED, 512));
await out('public/icons/maskable-512.png', opaque(MASKABLE, 512));
await out('public/apple-touch-icon.png', opaque(SQUARE, 180));

// ---- Android ----
const RES = 'android/app/src/main/res';
if (existsSync(RES)) {
  const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
  for (const [d, k] of Object.entries(DENSITIES)) {
    await out(`${RES}/mipmap-${d}/ic_launcher.png`, icon(ROUNDED, 48 * k));
    await out(`${RES}/mipmap-${d}/ic_launcher_round.png`, await circle(48 * k));
    await out(`${RES}/mipmap-${d}/ic_launcher_foreground.png`, icon(FG_ONLY, 108 * k));
    await out(`${RES}/mipmap-${d}/ic_launcher_background.png`, opaque(BG_ONLY, 108 * k));
    // Portrait-only game, but Capacitor's template ships landscape splashes too: keep them valid.
    const [pw, ph] = [320 * k, 480 * k].map(Math.round);
    await out(`${RES}/drawable-port-${d}/splash.png`, await splash(pw, ph, 0.45));
    await out(`${RES}/drawable-land-${d}/splash.png`, await splash(ph, pw, 0.45));
  }
  await out(`${RES}/drawable/splash.png`, await splash(480, 320, 0.45));
}

// ---- iOS ----
const XC = 'ios/App/App/Assets.xcassets';
if (existsSync(XC)) {
  // Single-size app icon (Xcode 14+ derives every other size). App Store rejects alpha.
  await out(`${XC}/AppIcon.appiconset/AppIcon-512@2x.png`, opaque(SQUARE, 1024));
  for (const f of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
    await out(`${XC}/Splash.imageset/${f}`, await splash(2732, 2732, 0.2));
  }
}

console.log(`icons: wrote ${count} images`);
