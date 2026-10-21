// Small cached offscreen textures for effects (glows, sparkles, smoke, shards).
// Everything is drawn once and then blitted with drawImage, so particles never create gradients per frame.

const cache = new Map<string, HTMLCanvasElement>();

function tex(key: string, px: number, draw: (g: CanvasRenderingContext2D, n: number) => void): HTMLCanvasElement {
  let c = cache.get(key);
  if (!c) {
    c = document.createElement('canvas');
    c.width = c.height = px;
    draw(c.getContext('2d')!, px);
    cache.set(key, c);
  }
  return c;
}

export type RGB = [number, number, number];

export function rgb(color: string): RGB {
  let h = color.replace('#', '');
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

function hex(c: RGB) {
  return `#${c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

/** Saturated rainbow color for hue step i of 12. */
export function hueColor(i: number): string {
  const h = (((i % 12) + 12) % 12) / 12;
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return 255 * (0.62 - 0.38 * Math.max(-1, Math.min(k - 3, 9 - k, 1)));
  };
  return hex([f(0), f(8), f(4)]);
}

/** Soft colored glow, opaque in the middle, fading to nothing at the edge. */
export function glowTex(color: string): HTMLCanvasElement {
  return tex(`glow${color}`, 128, (g, n) => {
    const c = rgb(color);
    const rg = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
    rg.addColorStop(0, rgba(c, 1));
    rg.addColorStop(0.25, rgba(c, 0.6));
    rg.addColorStop(0.55, rgba(c, 0.18));
    rg.addColorStop(1, rgba(c, 0));
    g.fillStyle = rg;
    g.fillRect(0, 0, n, n);
  });
}

/** Glow with a white-hot core (explosions, rocket flames, sparks). */
export function hotTex(color: string): HTMLCanvasElement {
  return tex(`hot${color}`, 128, (g, n) => {
    const c = rgb(color);
    const rg = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
    rg.addColorStop(0, 'rgba(255,255,255,1)');
    rg.addColorStop(0.16, 'rgba(255,253,240,0.95)');
    rg.addColorStop(0.36, rgba(c, 0.62));
    rg.addColorStop(0.66, rgba(c, 0.16));
    rg.addColorStop(1, rgba(c, 0));
    g.fillStyle = rg;
    g.fillRect(0, 0, n, n);
  });
}

/** Four-pointed twinkle star. Meant to be drawn with 'lighter'. */
export function sparkleTex(color: string): HTMLCanvasElement {
  return tex(`spk${color}`, 64, (g, n) => {
    const c = rgb(color);
    const m = n / 2;
    let rg = g.createRadialGradient(m, m, 0, m, m, m);
    rg.addColorStop(0, rgba(c, 0.55));
    rg.addColorStop(1, rgba(c, 0));
    g.fillStyle = rg;
    g.fillRect(0, 0, n, n);
    g.globalCompositeOperation = 'lighter';
    // Long cross + short diagonal cross.
    for (const [w, h, rot, a] of [[0.48, 0.065, 0, 0.95], [0.065, 0.48, 0, 0.95], [0.24, 0.04, Math.PI / 4, 0.6], [0.04, 0.24, Math.PI / 4, 0.6]]) {
      g.save();
      g.translate(m, m);
      g.rotate(rot);
      g.fillStyle = `rgba(255,255,255,${a})`;
      g.beginPath();
      g.moveTo(-n * w, 0); g.lineTo(0, -n * h); g.lineTo(n * w, 0); g.lineTo(0, n * h);
      g.closePath();
      g.fill();
      g.restore();
    }
    rg = g.createRadialGradient(m, m, 0, m, m, n * 0.16);
    rg.addColorStop(0, 'rgba(255,255,255,1)');
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg;
    g.fillRect(0, 0, n, n);
  });
}

/** Soft, slightly lumpy smoke puff. */
export function puffTex(color: string): HTMLCanvasElement {
  return tex(`puff${color}`, 64, (g, n) => {
    const c = rgb(color);
    for (const [x, y, r, a] of [[0.5, 0.52, 0.46, 0.55], [0.38, 0.42, 0.3, 0.45], [0.62, 0.4, 0.28, 0.4], [0.55, 0.62, 0.26, 0.35]]) {
      const rg = g.createRadialGradient(x * n, y * n, 0, x * n, y * n, r * n);
      rg.addColorStop(0, rgba(c, a));
      rg.addColorStop(0.6, rgba(c, a * 0.5));
      rg.addColorStop(1, rgba(c, 0));
      g.fillStyle = rg;
      g.fillRect(0, 0, n, n);
    }
  });
}

/** Candy-like shard: a kite shape with a light-to-base gradient and a glint. */
export function shardTex(base: string, light: string): HTMLCanvasElement {
  return tex(`shard${base}${light}`, 32, (g, n) => {
    const s = n / 32;
    g.scale(s, s);
    const lg = g.createLinearGradient(6, 4, 24, 28);
    lg.addColorStop(0, light);
    lg.addColorStop(0.55, base);
    lg.addColorStop(1, base);
    g.fillStyle = lg;
    g.beginPath();
    g.moveTo(16, 2); g.lineTo(29, 13); g.lineTo(17, 30); g.lineTo(3, 15);
    g.closePath();
    g.fill();
    g.fillStyle = 'rgba(255,255,255,0.7)';
    g.beginPath();
    g.moveTo(15, 6); g.lineTo(20, 11); g.lineTo(10, 15);
    g.closePath();
    g.fill();
  });
}

const whites = new WeakMap<HTMLCanvasElement, HTMLCanvasElement>();

/** White silhouette of a sprite (for hit flashes). */
export function whiteOf(img: HTMLCanvasElement): HTMLCanvasElement {
  let w = whites.get(img);
  if (!w) {
    w = document.createElement('canvas');
    w.width = img.width;
    w.height = img.height;
    const g = w.getContext('2d')!;
    g.drawImage(img, 0, 0);
    g.globalCompositeOperation = 'source-in';
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, w.width, w.height);
    whites.set(img, w);
  }
  return w;
}
