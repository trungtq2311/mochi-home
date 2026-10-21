// Dev-only preview of the room artwork (open /art-preview.html with the Vite dev server).
import { ROOMS } from './meta/rooms';
import { ROOM_H, ROOM_W, itemIconSVG, mascotSVG, roomSVG } from './meta/roomArt';

const app = document.getElementById('app') as HTMLElement;
const status = document.getElementById('status') as HTMLElement;
const errors: string[] = [];

function checked(label: string, svg: string): string {
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
  const err = doc.getElementsByTagName('parsererror')[0];
  if (err) errors.push(`${label}: ${err.textContent ?? 'parse error'}`);
  return svg;
}

const GUIDE = `<svg class="guide" viewBox="0 0 ${ROOM_W} ${ROOM_H}" preserveAspectRatio="xMidYMid slice">
  <rect x="0" y="0" width="${ROOM_W}" height="100" fill="#000" opacity="0.28"/>
  <rect x="0" y="550" width="${ROOM_W}" height="90" fill="#000" opacity="0.28"/>
  <rect x="30" y="110" width="340" height="430" fill="none" stroke="#ff2bd6" stroke-width="1.5" stroke-dasharray="6 4"/>
</svg>`;

// optional filters: ?room=kitchen  ?w=400 (frame width, height follows 5:8)  ?icons=0  ?mascot=0
const params = new URLSearchParams(location.search);
const onlyRoom = params.get('room');
const frameW = Number(params.get('w')) || 0;
if (frameW) document.documentElement.style.setProperty('--fw', `${frameW}px`);
const showIcons = params.get('icons') !== '0';
const showMascot = params.get('mascot') !== '0';
const onlyV = params.get('v')?.split(',').map(Number);

let html = '';
for (const room of ROOMS.filter((r) => !onlyRoom || r.id === onlyRoom)) {
  const all = (s: number): Record<string, number> => Object.fromEntries(room.tasks.map((t) => [t.item, s]));
  const half = Object.fromEntries(room.tasks.slice(0, Math.ceil(room.tasks.length / 2)).map((t) => [t.item, 0]));
  const variants: [string, Record<string, number>][] = [['Before', {}], ['Half done', half], ['All style 0', all(0)], ['All style 1', all(1)], ['All style 2', all(2)]];
  html += `<h2>${room.name.en} <small>(${room.id})</small></h2><div class="rooms">`;
  for (const [label, placed] of variants.filter((_, i) => !onlyV || onlyV.includes(i))) {
    html += `<figure><div class="room" data-room="${room.id}" data-variant="${label}">${checked(`${room.id}/${label}`, roomSVG(room.id, placed))}${GUIDE}</div><figcaption>${label}</figcaption></figure>`;
  }
  html += '</div>';
  if (!showIcons) continue;
  html += `<h2>${room.name.en} icons</h2><table class="icons"><tr><th>item</th><th>style 0</th><th>style 1</th><th>style 2</th></tr>`;
  for (const t of room.tasks) {
    html += `<tr><td>${t.item}<br><small>${t.title.en}</small></td>`;
    t.styles.forEach((s, i) => {
      html += `<td><div class="icon">${checked(`${room.id}/${t.item}/${i}`, itemIconSVG(room.id, t.item, i))}</div><div><span class="sw" style="background:${s.swatch}"></span>${s.name.en}</div></td>`;
    });
    html += '</tr>';
  }
  html += '</table>';
}
if (showMascot) {
  html += '<h2>Mochi</h2><div class="mascots">';
  for (const mood of ['happy', 'sad', 'wow'] as const) html += `<figure>${checked(`mascot/${mood}`, mascotSVG(mood))}<figcaption>${mood}</figcaption></figure>`;
  html += '</div>';
}
html += '<h2>Item bounding boxes (union of before + all styles, 400×640 space)</h2><pre class="bbox" id="bbox"></pre>';
app.innerHTML = html;

// duplicate id check across the whole page
const ids = new Map<string, number>();
document.querySelectorAll('[id]').forEach((el) => ids.set(el.id, (ids.get(el.id) ?? 0) + 1));
const dups = [...ids].filter(([, n]) => n > 1).map(([id]) => id);
if (dups.length) errors.push(`duplicate ids: ${dups.slice(0, 20).join(', ')}`);

status.innerHTML = errors.length
  ? `<div class="errors">${errors.length} problem(s):\n${errors.join('\n')}</div>`
  : `<div class="ok">All SVGs parse as XML, no duplicate ids (${ids.size} ids on page).</div>`;

// bounding boxes per item (union over variants), for documenting where items are
const boxes = new Map<string, [number, number, number, number]>();
document.querySelectorAll<SVGGElement>('.room .room-item').forEach((el) => {
  const roomId = (el.closest('.room') as HTMLElement).dataset.room;
  const key = `${roomId}.${el.dataset.item}`;
  const b = el.getBBox();
  const cur = boxes.get(key);
  const nb: [number, number, number, number] = [b.x, b.y, b.x + b.width, b.y + b.height];
  boxes.set(key, cur ? [Math.min(cur[0], nb[0]), Math.min(cur[1], nb[1]), Math.max(cur[2], nb[2]), Math.max(cur[3], nb[3])] : nb);
});
(document.getElementById('bbox') as HTMLElement).textContent = [...boxes]
  .map(([k, [x0, y0, x1, y1]]) => `${k.padEnd(20)} x ${Math.round(x0)}–${Math.round(x1)}  y ${Math.round(y0)}–${Math.round(y1)}`)
  .join('\n');

(document.getElementById('guides') as HTMLInputElement).addEventListener('change', (e) => document.body.classList.toggle('guides', (e.target as HTMLInputElement).checked));
(document.getElementById('phone') as HTMLInputElement).addEventListener('change', (e) => document.body.classList.toggle('phone', (e.target as HTMLInputElement).checked));
