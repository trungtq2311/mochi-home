import { sfx } from '../core/audio.ts';
import type { BoosterId } from '../core/save.ts';
import type { Reward } from '../meta/events.ts';
import { iconURL } from '../match3/sprites.ts';
import { artURL } from '../art/assets.ts';
import { mascotSVG } from '../meta/roomArt.ts';
import { ICON } from './icons.ts';

type Child = Node | string | number | null | undefined | false;
type Attrs = Record<string, string | number | boolean | null | undefined | ((e: Event) => void)>;

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Attrs = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'class') el.className = String(v);
    else if (k === 'html') el.innerHTML = String(v);
    else el.setAttribute(k, String(v));
  }
  for (const c of children) if (c != null && c !== false) el.append(c instanceof Node ? c : String(c));
  return el;
}

/** Painted-art key for icons whose SVG name differs from the art file name. */
const ART_KEY: Partial<Record<keyof typeof ICON, string>> = { scroll: 'quests', flag: 'race' };

/** UI icon: painted art (public/art/ui/*) when available, otherwise the inline SVG. */
export function icon(name: keyof typeof ICON, cls = 'ic'): HTMLSpanElement {
  const url = artURL(`ui/${ART_KEY[name] ?? name}`);
  if (url) return h('span', { class: `${cls} art` }, h('img', { src: url, alt: '', draggable: 'false' }));
  return h('span', { class: cls, html: ICON[name] });
}

export function btn(label: Child, cls: string, onClick: () => void): HTMLButtonElement {
  return h('button', {
    class: `btn ${cls}`,
    onclick: (e: Event) => {
      e.stopPropagation();
      sfx('click');
      onClick();
    },
  }, label);
}

export function boosterIcon(id: BoosterId): HTMLElement {
  if (id === 'hammer' || id === 'broom' || id === 'shuffle') return icon(id, 'ic booster-ic');
  const special = id === 'rocket' ? 'rocketH' : id;
  return h('img', { class: 'ic booster-ic', src: iconURL(special, 0, 96), alt: '' });
}

export function rewardChips(r: Reward): HTMLElement {
  const row = h('div', { class: 'chips' });
  if (r.coins) row.append(h('span', { class: 'chip' }, icon('coin'), `${r.coins}`));
  for (const [k, v] of Object.entries(r.boosters ?? {})) if (v) row.append(h('span', { class: 'chip' }, boosterIcon(k as BoosterId), `×${v}`));
  if (r.infiniteMin) row.append(h('span', { class: 'chip' }, icon('heart'), `∞ ${r.infiniteMin}m`));
  return row;
}

// ---------- modal ----------

export interface ModalButton { label: Child; cls?: string; onClick: () => void }
export interface ModalHandle { close: () => void; el: HTMLElement; body: HTMLElement }

export function modal(opts: { title?: string; body: Child; buttons?: ModalButton[]; closable?: boolean; cls?: string; onClose?: () => void }): ModalHandle {
  const layer = document.getElementById('overlay')!;
  const body = h('div', { class: 'modal-body' }, opts.body);
  const box = h('div', { class: `modal ${opts.cls ?? ''}` });
  const back = h('div', { class: 'modal-back' }, box);
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    back.classList.add('out');
    setTimeout(() => back.remove(), 220);
    opts.onClose?.();
  };
  if (opts.title) box.append(h('div', { class: 'ribbon' }, h('span', {}, opts.title)));
  box.append(h('div', { class: 'modal-shine' }));
  if (opts.closable !== false) box.append(btn(icon('close'), 'x', close));
  box.append(body);
  if (opts.buttons?.length) {
    box.append(h('div', { class: 'modal-buttons' }, ...opts.buttons.map((b) => btn(b.label, b.cls ?? 'green', b.onClick))));
  }
  layer.append(back);
  return { close, el: box, body };
}

export function closeAllModals() {
  document.getElementById('overlay')!.innerHTML = '';
}

export function toast(text: string) {
  const el = h('div', { class: 'toast' }, text);
  document.getElementById('overlay')!.append(el);
  setTimeout(() => el.classList.add('out'), 1600);
  setTimeout(() => el.remove(), 2000);
}

/** Mochi the cat says something. Resolves when tapped away. */
export function mochiSay(text: string, mood: 'happy' | 'sad' | 'wow' = 'happy'): Promise<void> {
  return new Promise((resolve) => {
    const el = h('div', { class: 'mochi-say' },
      h('div', { class: 'mochi-face', html: mascotSVG(mood) }),
      h('div', { class: 'bubble' }, h('div', { class: 'bubble-name' }, 'Mochi'), text, h('div', { class: 'tap-hint' }, '▶')),
    );
    el.addEventListener('pointerup', () => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 250);
      resolve();
    });
    document.getElementById('overlay')!.append(el);
    sfx('pop');
  });
}

/** Count a number up in an element. */
export function countUp(el: HTMLElement, from: number, to: number, ms = 600) {
  const t0 = performance.now();
  const stepFn = (now: number) => {
    const k = Math.min(1, (now - t0) / ms);
    el.textContent = String(Math.round(from + (to - from) * k));
    if (k < 1) requestAnimationFrame(stepFn);
  };
  requestAnimationFrame(stepFn);
}
