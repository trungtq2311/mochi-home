// Runtime access to the optional painted art in public/art (produced by `npm run art`).
// Anything missing falls back to the procedural art, so the game always works.

export interface ArtEntry { w: number; h: number }

const BASE = 'art/';
let manifest: Record<string, ArtEntry> = {};
const images = new Map<string, HTMLImageElement>();
const pending = new Map<string, Promise<HTMLImageElement | null>>();

/** Load the manifest and preload the small always-needed sets (pieces, ui, mascot). */
export async function initArt(): Promise<void> {
  try {
    const res = await fetch(`${BASE}manifest.json`, { cache: 'no-cache' });
    if (res.ok) manifest = await res.json();
  } catch { /* no painted art yet */ }
  await loadArt(Object.keys(manifest).filter((k) => /^(pieces|ui|mascot)\//.test(k)));
}

/** Keys look like "pieces/red" or "rooms/living/sofa_1" (no extension). */
export function hasArt(key: string): boolean { return key in manifest; }

export function artURL(key: string): string | null {
  return key in manifest ? `${BASE}${key}.webp` : null;
}

export function artSize(key: string): ArtEntry | null { return manifest[key] ?? null; }

/** Decoded image (only after it was loaded), for drawing on canvas. */
export function artImage(key: string): HTMLImageElement | null { return images.get(key) ?? null; }

export function artKeys(prefix: string): string[] {
  return Object.keys(manifest).filter((k) => k.startsWith(prefix));
}

export function loadArt(keys: string[]): Promise<(HTMLImageElement | null)[]> {
  return Promise.all(keys.map((key) => {
    const url = artURL(key);
    if (!url) return Promise.resolve(null);
    const done = images.get(key);
    if (done) return Promise.resolve(done);
    let p = pending.get(key);
    if (!p) {
      p = new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => { images.set(key, img); resolve(img); };
        img.onerror = () => resolve(null);
        img.src = url;
      });
      pending.set(key, p);
    }
    return p;
  }));
}
