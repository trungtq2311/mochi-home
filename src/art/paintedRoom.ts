// Rooms, icons and the mascot built from painted (AI-generated) images, when they exist.
// Each function returns null when the needed images are missing, so callers fall back to vector art.
import { ROOMS } from '../meta/rooms.ts';
import { artImage, artSize, artURL, hasArt, loadArt } from './assets.ts';
import { LAYOUT } from './catalog.ts';

let uid = 0;
const warped = new Map<string, string>();

/** A room is drawn with paintings once its first floor texture exists. */
export function roomIsPainted(roomId: string): boolean {
  const L = LAYOUT[roomId];
  return !!L && hasArt(`rooms/${roomId}/${L.floor}_0`);
}

/** Load a room's images and pre-render its floors in perspective. Call before showing the room. */
export async function prepareRoom(roomId: string): Promise<void> {
  const L = LAYOUT[roomId];
  if (!L || !roomIsPainted(roomId)) return;
  const floorKeys = ['before', '0', '1', '2'].map((s) => `rooms/${roomId}/${L.floor}_${s}`).filter(hasArt);
  const imgs = await loadArt(floorKeys);
  floorKeys.forEach((key, i) => { const img = imgs[i]; if (img && !warped.has(key)) warped.set(key, warpFloor(img, 640 - L.horizon)); });
}

/** Draw a tileable texture as a floor receding to the horizon (cheap row-by-row perspective). */
function warpFloor(tex: HTMLImageElement, depth: number): string {
  const W = 800, H = Math.round(depth * 2);
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  const tw = tex.naturalWidth, th = tex.naturalHeight;
  // Tile once horizontally into a strip so each row can be sampled with one drawImage.
  const tilesAcross = 6;
  const strip = document.createElement('canvas');
  strip.width = tw * tilesAcross;
  strip.height = th;
  const sg = strip.getContext('2d')!;
  for (let i = 0; i < tilesAcross; i++) sg.drawImage(tex, i * tw, 0);
  const near = 1, far = 0.38; // horizontal scale at the bottom / at the horizon
  for (let y = 0; y < H; y++) {
    const t = y / (H - 1); // 0 at horizon, 1 at the bottom edge
    const s = far + (near - far) * t;
    const z = 1 / s; // depth
    const v = ((z * 1.6) % 1 + 1) % 1; // texture row (repeats with depth)
    // About 2 tiles across at the bottom edge, more towards the horizon.
    const srcW = Math.min(strip.width, tw * 2 * z);
    const srcX = (strip.width - srcW) / 2;
    g.drawImage(strip, srcX + 0, v * th, srcW, 1, 0, y, W, 1);
  }
  return c.toDataURL('image/webp', 0.85);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function itemImage(roomId: string, item: string, style: number | undefined) {
  const key = `rooms/${roomId}/${item}_${style === undefined ? 'before' : style}`;
  const url = artURL(key), size = artSize(key);
  return url && size ? { url, size } : null;
}

export function paintedRoomSVG(roomId: string, placed: Record<string, number>): string | null {
  if (!roomIsPainted(roomId)) return null;
  const L = LAYOUT[roomId];
  const room = ROOMS.find((r) => r.id === roomId)!;
  const id = `pr${uid++}`;
  const done = room.tasks.filter((t) => placed[t.item] !== undefined).length;
  const progress = done / room.tasks.length;
  const parts: string[] = [];
  const defs: string[] = [];

  // Wall / backdrop
  const wallStyle = L.wall ? placed[L.wall] : undefined;
  if (L.backdrop) {
    const key = progress >= 0.5 && hasArt(`rooms/${roomId}/backdrop`) ? 'backdrop' : hasArt(`rooms/${roomId}/backdrop_before`) ? 'backdrop_before' : 'backdrop';
    const url = artURL(`rooms/${roomId}/${key}`);
    if (url) parts.push(`<image href="${esc(url)}" x="0" y="0" width="400" height="${L.horizon + 30}" preserveAspectRatio="xMidYMax slice"/>`);
    else parts.push(`<rect width="400" height="${L.horizon + 30}" fill="#bcd9ef"/>`);
  } else {
    const wallUrl = artURL(`rooms/${roomId}/${L.wall}_${wallStyle ?? 'before'}`);
    if (wallUrl) {
      defs.push(`<pattern id="${id}w" patternUnits="userSpaceOnUse" width="150" height="150"><image href="${esc(wallUrl)}" width="150" height="150"/></pattern>`);
      parts.push(`<rect width="400" height="${L.horizon}" fill="url(#${id}w)"/>`);
    } else parts.push(`<rect width="400" height="${L.horizon}" fill="#d9c7a8"/>`);
    defs.push(`<linearGradient id="${id}ws" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>`);
    parts.push(`<rect width="400" height="${L.horizon}" fill="url(#${id}ws)"/>`);
    // Crown moulding and baseboard
    parts.push(`<rect y="0" width="400" height="14" fill="#fff6e6"/><rect y="14" width="400" height="4" fill="#000" opacity=".12"/>`);
  }

  // Floor
  const floorStyle = placed[L.floor];
  const floorKey = `rooms/${roomId}/${L.floor}_${floorStyle ?? 'before'}`;
  const floorUrl = warped.get(floorKey) ?? artURL(floorKey);
  if (floorUrl) parts.push(`<image href="${esc(floorUrl)}" x="0" y="${L.horizon}" width="400" height="${640 - L.horizon}" preserveAspectRatio="none"/>`);
  defs.push(`<linearGradient id="${id}fs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".18" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>`);
  parts.push(`<rect y="${L.horizon}" width="400" height="${640 - L.horizon}" fill="url(#${id}fs)"/>`);
  if (!L.backdrop) parts.push(`<rect y="${L.horizon - 12}" width="400" height="14" fill="#f3e6d2"/><rect y="${L.horizon + 2}" width="400" height="3" fill="#000" opacity=".2"/>`);

  // Items (layout order = back to front)
  defs.push(`<radialGradient id="${id}sh"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`);
  for (const [item, pl] of Object.entries(L.items)) {
    if (item === L.wall || item === L.floor) continue;
    const style = placed[item];
    const img = itemImage(roomId, item, style);
    const inner: string[] = [];
    if (img) {
      const w = pl.w, h = (w * img.size.h) / img.size.w;
      const x = pl.cx - w / 2, y = pl.top ? pl.y : pl.y - h;
      if (pl.ground) inner.push(`<ellipse cx="${pl.cx}" cy="${pl.y - 2}" rx="${w * 0.5}" ry="${Math.max(6, w * 0.09)}" fill="url(#${id}sh)"/>`);
      inner.push(`<image href="${esc(img.url)}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w}" height="${h.toFixed(1)}"/>`);
    }
    parts.push(`<g class="room-item" data-item="${item}" data-state="${style === undefined ? 'before' : 'done'}">${inner.join('')}</g>`);
  }

  // Light: warm glow from the upper left, vignette, and a dusty dim that lifts as the room is renovated.
  defs.push(`<radialGradient id="${id}lt" cx=".2" cy=".15" r=".9"><stop offset="0" stop-color="#fff4d6" stop-opacity=".35"/><stop offset=".5" stop-color="#fff4d6" stop-opacity="0"/></radialGradient>`);
  defs.push(`<radialGradient id="${id}vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#1a0f2e" stop-opacity="0"/><stop offset="1" stop-color="#1a0f2e" stop-opacity=".45"/></radialGradient>`);
  parts.push(`<rect width="400" height="640" fill="url(#${id}lt)" pointer-events="none"/>`);
  parts.push(`<rect width="400" height="640" fill="#3b3346" opacity="${(0.32 * (1 - progress)).toFixed(3)}" pointer-events="none"/>`);
  parts.push(`<rect width="400" height="640" fill="url(#${id}vg)" pointer-events="none"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 640" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"><defs>${defs.join('')}</defs>${parts.join('')}</svg>`;
}

export function paintedIconSVG(roomId: string, item: string, style: number): string | null {
  const url = artURL(`rooms/${roomId}/${item}_${style}`);
  if (!url) return null;
  const L = LAYOUT[roomId];
  if (item === L?.wall || item === L?.floor) {
    const id = `pi${uid++}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><defs><clipPath id="${id}"><rect x="4" y="4" width="56" height="56" rx="12"/></clipPath></defs><image href="${esc(url)}" x="4" y="4" width="56" height="56" clip-path="url(#${id})" preserveAspectRatio="xMidYMid slice"/><rect x="4" y="4" width="56" height="56" rx="12" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="2"/></svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><image href="${esc(url)}" x="3" y="3" width="58" height="58" preserveAspectRatio="xMidYMid meet"/></svg>`;
}

export function paintedMascotSVG(mood: string): string | null {
  const url = artURL(`mascot/${mood}`);
  if (!url) return null;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><image href="${esc(url)}" width="120" height="120" preserveAspectRatio="xMidYMid meet"/></svg>`;
}

/** Decoded painted sprite for canvas drawing (pieces), if loaded. */
export const paintedSprite = (key: string) => artImage(key);
