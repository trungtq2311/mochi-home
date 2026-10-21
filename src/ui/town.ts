// Explorable town map: one big SVG moved by a CSS transform (drag with inertia, pinch / wheel zoom, camera flights).
// The SVG is built once; afterwards only the changed task group or fog group is swapped.
import { tl, t } from '../core/i18n.ts';
import { AREAS, taskById, WORLD_H, WORLD_W, areaOf, type Area } from '../meta/town.ts';
import { fogInner, itemInner, townSVG, type TownState } from '../meta/townArt.ts';
import { h } from './dom.ts';

export interface TownView {
  el: HTMLElement;
  /** Smoothly move the camera so world point (x, y) sits at the focus point of the screen. */
  flyTo(x: number, y: number, zoom?: number, ms?: number): Promise<void>;
  focusArea(i: number, ms?: number): Promise<void>;
  /** Re-render one task element ('placing' / 'restyle' plays its animation). */
  swapItem(taskId: string, anim?: 'placing' | 'restyle'): void;
  /** Screen rect of a task element (for sparkles). */
  itemRect(taskId: string): DOMRect | null;
  /** Re-read the state: fog, markers, highlight. Fades out fog of newly unlocked areas. */
  refresh(): void;
  destroy(): void;
}

const ZMAX = 1.5;
const PAD = 260;
/** Default zoom: about 520 world units across the screen (a whole area fits on a phone). */
const zoomFor = (vw: number) => Math.min(1.1, Math.max(0.5, vw / 520));

export function createTownView(state: () => TownState, onAreaTap: (i: number) => void): TownView {
  const svgHost = h('div', { class: 'town-svg', html: townSVG(state()) });
  const ring = h('div', { class: 'town-ring' });
  const world = h('div', { class: 'town-world' }, svgHost, ring);
  const marks = h('div', { class: 'town-marks' });
  const el = h('div', { class: 'town-view' }, world, marks);
  const svg = svgHost.firstElementChild as SVGSVGElement;

  let vw = 375, vh = 812;
  let cx = 0, cy = 0, z = 0.7;
  let minZ = 0.3;
  let dirty = false;
  let flight: { cancel: () => void } | null = null;
  let inertia = 0;
  let restTimer = 0;
  let destroyed = false;

  // ---------- markers (screen space) ----------
  interface Mark { el: HTMLElement; x: number; y: number }
  let markList: Mark[] = [];
  const buildMarks = () => {
    const s = state();
    marks.innerHTML = '';
    markList = [];
    AREAS.forEach((a, i) => {
      let m: HTMLElement;
      if (i > s.area) {
        m = h('div', { class: 'town-tag locked' }, h('span', { class: 'lock' }, '🔒'), h('span', {}, t('unlocksAfter', tl(AREAS[i - 1].name))));
      } else if (i === s.area) {
        const doneCount = a.tasks.filter((tk) => s.styles[tk.id] !== undefined).length;
        m = h('div', { class: 'town-tag active' }, h('b', {}, tl(a.name)), h('small', {}, `${doneCount}/${a.tasks.length}`));
      } else {
        m = h('div', { class: 'town-tag done' }, '✓ ', tl(a.name));
      }
      marks.append(m);
      markList.push({ el: m, x: a.x, y: a.y - a.r * (i > s.area ? 0.15 : 0.62) });
    });
    const cur = AREAS[Math.min(s.area, AREAS.length - 1)];
    ring.style.cssText = `left:${cur.x - cur.r}px;top:${cur.y - cur.r * 0.6}px;width:${cur.r * 2}px;height:${cur.r * 1.2}px`;
    ring.classList.toggle('hidden', s.area >= AREAS.length);
  };

  // ---------- camera ----------
  /** Focus point on screen: a bit below the centre (the banner covers the top). */
  const fy = () => vh * 0.54;
  const clamp = () => {
    z = Math.min(ZMAX, Math.max(minZ, z));
    // The sea continues PAD units past the world edge, so edge areas can still be centred.
    const hw = vw / 2 / z, top = fy() / z, bottom = (vh - fy()) / z;
    cx = Math.min(WORLD_W + PAD - hw, Math.max(hw - PAD, cx));
    cy = Math.min(WORLD_H + PAD - bottom, Math.max(top - PAD, cy));
  };
  const apply = () => {
    dirty = false;
    clamp();
    const tx = vw / 2 - cx * z, ty = fy() - cy * z;
    world.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${z})`;
    marks.classList.toggle('far', z < 0.5);
    for (const m of markList) m.el.style.transform = `translate3d(${(tx + m.x * z).toFixed(1)}px,${(ty + m.y * z).toFixed(1)}px,0) translate(-50%,-100%)`;
  };
  const schedule = () => {
    if (!dirty) { dirty = true; requestAnimationFrame(apply); }
    // Promote the layer while moving; drop it at rest so the browser re-rasterises the SVG sharply.
    world.classList.add('moving');
    clearTimeout(restTimer);
    restTimer = window.setTimeout(() => world.classList.remove('moving'), 220);
  };
  const toWorld = (sx: number, sy: number) => ({ x: cx + (sx - vw / 2) / z, y: cy + (sy - fy()) / z });
  const zoomAt = (sx: number, sy: number, nz: number) => {
    const p = toWorld(sx, sy);
    z = Math.min(ZMAX, Math.max(minZ, nz));
    cx = p.x - (sx - vw / 2) / z;
    cy = p.y - (sy - fy()) / z;
    schedule();
  };
  const stopMotion = () => { flight?.cancel(); flight = null; cancelAnimationFrame(inertia); };

  const measure = () => {
    const r = el.getBoundingClientRect();
    vw = r.width || window.innerWidth;
    vh = r.height || window.innerHeight;
    minZ = Math.max(vw / (WORLD_W + PAD * 2), vh / (WORLD_H + PAD * 2));
    schedule();
  };
  const ro = new ResizeObserver(measure);
  ro.observe(el);

  // ---------- input ----------
  const pts = new Map<number, { x: number; y: number }>();
  let moved = false, downAt = 0, pinchD = 0;
  let samples: { t: number; x: number; y: number }[] = [];
  const local = (e: PointerEvent) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  el.addEventListener('pointerdown', (e) => {
    stopMotion();
    el.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, local(e));
    if (pts.size === 1) { moved = false; downAt = performance.now(); samples = [{ t: downAt, ...local(e) }]; }
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinchD = Math.hypot(a.x - b.x, a.y - b.y); moved = true; }
  });
  el.addEventListener('pointermove', (e) => {
    const prev = pts.get(e.pointerId);
    if (!prev) return;
    const cur = local(e);
    if (pts.size === 1) {
      const dx = cur.x - prev.x, dy = cur.y - prev.y;
      if (!moved && Math.hypot(cur.x - samples[0].x, cur.y - samples[0].y) > 8) moved = true;
      if (moved) { cx -= dx / z; cy -= dy / z; schedule(); }
      samples.push({ t: performance.now(), ...cur });
      if (samples.length > 6) samples.shift();
      pts.set(e.pointerId, cur);
    } else if (pts.size === 2) {
      const [ida, idb] = [...pts.keys()];
      const before = [pts.get(ida)!, pts.get(idb)!];
      pts.set(e.pointerId, cur);
      const after = [pts.get(ida)!, pts.get(idb)!];
      const d = Math.hypot(after[0].x - after[1].x, after[0].y - after[1].y);
      const mx = (after[0].x + after[1].x) / 2, my = (after[0].y + after[1].y) / 2;
      const pmx = (before[0].x + before[1].x) / 2, pmy = (before[0].y + before[1].y) / 2;
      cx -= (mx - pmx) / z; cy -= (my - pmy) / z;
      if (pinchD > 0) zoomAt(mx, my, z * (d / pinchD));
      pinchD = d;
      schedule();
    }
  });
  const end = (e: PointerEvent) => {
    if (!pts.has(e.pointerId)) return;
    const was = pts.size;
    pts.delete(e.pointerId);
    if (was === 2) { samples = []; const rest = [...pts.values()][0]; if (rest) samples = [{ t: performance.now(), ...rest }]; return; }
    if (was !== 1) return;
    const p = local(e);
    if (!moved && performance.now() - downAt < 500 && e.type === 'pointerup') { tap(p.x, p.y); return; }
    // inertia from the last ~100 ms of movement
    const now = performance.now();
    const first = samples.find((s) => now - s.t < 110) ?? samples[samples.length - 1];
    const dt = Math.max(16, now - first.t);
    let vx = (p.x - first.x) / dt, vy = (p.y - first.y) / dt; // px per ms
    if (Math.hypot(vx, vy) < 0.08) return;
    let last = now;
    const step = (t2: number) => {
      const k = Math.min(48, t2 - last); last = t2;
      cx -= (vx * k) / z; cy -= (vy * k) / z;
      const decay = Math.exp(-k / 320);
      vx *= decay; vy *= decay;
      schedule();
      if (Math.hypot(vx, vy) > 0.02) inertia = requestAnimationFrame(step);
    };
    inertia = requestAnimationFrame(step);
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('wheel', (e) => {
    e.preventDefault();
    stopMotion();
    const p = { x: e.offsetX, y: e.offsetY };
    zoomAt(p.x, p.y, z * Math.exp(-e.deltaY * 0.0015));
  }, { passive: false });

  const tap = (sx: number, sy: number) => {
    const p = toWorld(sx, sy);
    let best = -1, bestD = Infinity;
    AREAS.forEach((a, i) => {
      const d = Math.hypot(p.x - a.x, (p.y - a.y) * 1.5);
      if (d < a.r && d < bestD) { best = i; bestD = d; }
    });
    if (best >= 0) onAreaTap(best);
  };

  // ---------- public ----------
  const flyTo = (x: number, y: number, zoom = z, ms = 900) => new Promise<void>((resolve) => {
    stopMotion();
    const x0 = cx, y0 = cy, z0 = z, t0 = performance.now();
    let raf = 0;
    const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms), e2 = ease(k);
      // zoom out a little mid-flight for long trips (feels like a camera move, not a slide)
      const dist = Math.hypot(x - x0, y - y0) * z0;
      const dip = Math.min(0.25, dist / 4000) * Math.sin(Math.PI * k);
      z = (z0 + (zoom - z0) * e2) * (1 - dip);
      cx = x0 + (x - x0) * e2; cy = y0 + (y - y0) * e2;
      schedule();
      if (k < 1) raf = requestAnimationFrame(step);
      else { flight = null; resolve(); }
    };
    raf = requestAnimationFrame(step);
    flight = { cancel: () => { cancelAnimationFrame(raf); resolve(); } };
  });

  const view: TownView = {
    el,
    flyTo,
    focusArea: (i, ms = 900) => { const a = AREAS[Math.min(i, AREAS.length - 1)]; return flyTo(a.x, a.y - 20, Math.max(z, zoomFor(vw)), ms); },
    swapItem(taskId, anim) {
      const task = taskById.get(taskId), area = areaOf.get(taskId);
      const g = svg.querySelector<SVGGElement>(`[data-item="${taskId}"]`);
      if (!task || !area || !g) return;
      g.innerHTML = itemInner(area, task, state().styles[taskId]);
      if (anim) {
        g.classList.remove('placing', 'restyle');
        void g.getBoundingClientRect();
        g.classList.add(anim);
      }
    },
    itemRect(taskId) {
      return svg.querySelector(`[data-item="${taskId}"]`)?.getBoundingClientRect() ?? null;
    },
    refresh() {
      const s = state();
      AREAS.forEach((a: Area, i) => {
        const fog = svg.querySelector<SVGGElement>(`[data-fog="${a.id}"]`);
        if (i <= s.area && fog) { fog.classList.add('clearing'); setTimeout(() => fog.remove(), 1200); }
        if (i > s.area && !fog) {
          const g = svg.querySelector(`[data-area="${a.id}"]`);
          g?.insertAdjacentHTML('beforeend', `<g class="town-fog" data-fog="${a.id}">${fogInner(a)}</g>`);
        }
      });
      buildMarks();
      schedule();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      stopMotion();
      ro.disconnect();
      clearTimeout(restTimer);
    },
  };

  buildMarks();
  // Start centred on the current area.
  requestAnimationFrame(() => {
    measure();
    const a = AREAS[Math.min(state().area, AREAS.length - 1)];
    z = zoomFor(vw); cx = a.x; cy = a.y - 20;
    apply();
  });
  return view;
}
