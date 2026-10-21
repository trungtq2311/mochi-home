// Painted-art pipeline.
//   node scripts/art.ts           process art/raw/** → public/art/**.webp + manifest.json
//   node scripts/art.ts prompts   (re)write art/PROMPTS.md from src/art/catalog.ts
//   node scripts/art.ts status    list which catalog images are still missing
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, sep } from 'node:path';
import sharp from 'sharp';
import { CATALOG, STYLE, type ArtSpec } from '../src/art/catalog.ts';

const RAW = 'art/raw';
const OUT = 'public/art';
const specs = new Map(CATALOG.map((s) => [s.key, s]));

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const keyOf = (file: string, root: string) => relative(root, file).split(sep).join('/').replace(/\.[^.]+$/, '');

/** Remove a flat background (white or any uniform color) by flood-filling from the borders. */
function removeBackground(data: Buffer, w: number, h: number): boolean {
  const px = (x: number, y: number) => (y * w + x) * 4;
  // Already transparent around the edges? Nothing to do.
  let transparentEdge = 0, samples = 0;
  for (let x = 0; x < w; x += 8) for (const y of [0, h - 1]) { samples++; if (data[px(x, y) + 3] < 30) transparentEdge++; }
  if (transparentEdge / samples > 0.5) return false;
  // Background color = average of the four corners (must be similar to each other).
  const corners = [px(1, 1), px(w - 2, 1), px(1, h - 2), px(w - 2, h - 2)];
  const bg = [0, 1, 2].map((c) => corners.reduce((s, i) => s + data[i + c], 0) / 4);
  const dist = (i: number) => Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
  if (corners.some((i) => dist(i) > 60)) return false;
  const HARD = 45, SOFT = 110;
  const seen = new Uint8Array(w * h);
  const stack: number[] = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop()!;
    if (seen[p]) continue;
    seen[p] = 1;
    const i = p * 4, d = dist(i);
    if (d >= SOFT) continue;
    data[i + 3] = d < HARD ? 0 : Math.min(data[i + 3], Math.round(((d - HARD) / (SOFT - HARD)) * 255));
    if (d >= HARD) continue; // edge pixel: soften but don't spread through it
    const x = p % w, y = (p - x) / w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }
  return true;
}

function alphaBox(data: Buffer, w: number, h: number) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (data[(y * w + x) * 4 + 3] > 12) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  return x1 < 0 ? null : { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

async function processOne(file: string, spec: ArtSpec) {
  const out = join(OUT, `${spec.key}.webp`);
  mkdirSync(dirname(out), { recursive: true });
  if (spec.kind === 'texture') {
    await sharp(file).resize(spec.size, spec.size, { fit: 'cover' }).webp({ quality: 85 }).toFile(out);
    return 'texture';
  }
  if (spec.kind === 'backdrop') {
    await sharp(file).resize({ width: spec.size, withoutEnlargement: true }).webp({ quality: 85 }).toFile(out);
    return 'backdrop';
  }
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const removed = removeBackground(data, info.width, info.height);
  const box = alphaBox(data, info.width, info.height);
  let img = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  if (box) img = img.extract(box);
  await img.resize(spec.size, spec.size, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 95 }).toFile(out);
  return removed ? 'background removed' : 'ok';
}

async function writeManifest() {
  const manifest: Record<string, { w: number; h: number }> = {};
  for (const f of walk(OUT).filter((f) => extname(f) === '.webp')) {
    const meta = await sharp(f).metadata();
    manifest[keyOf(f, OUT)] = { w: meta.width ?? 0, h: meta.height ?? 0 };
  }
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 0));
  return Object.keys(manifest).length;
}

function prompts() {
  const lines: string[] = [];
  lines.push('# Mochi Home — AI art prompts', '');
  lines.push('Cách làm (khuyên dùng ChatGPT / GPT image vì xuất được nền trong suốt):', '');
  lines.push('1. Mở một cuộc trò chuyện mới, dán **Style chung** bên dưới một lần và nói: "Use this exact art style for every image I ask for in this chat."');
  lines.push('2. Với từng ảnh: copy prompt, tạo ảnh, tải về và lưu đúng **tên file** vào thư mục `art/raw/` (giữ nguyên thư mục con). PNG/JPG/WebP đều được.');
  lines.push('3. Mỗi nhóm (ví dụ cả 4 kiểu của "sofa") nên tạo trong cùng một cuộc trò chuyện để giống nhau. Nếu ảnh không trong suốt, nền trắng phẳng là được — script tự xoá nền.');
  lines.push('4. Chạy `npm run art` → ảnh được cắt, nén, đưa vào game. Chạy `npm run art:status` để xem còn thiếu ảnh nào.');
  lines.push('5. Thiếu ảnh nào thì game dùng hình vẽ bằng code cho chỗ đó (phòng chỉ dùng ảnh khi đã có texture sàn `floor_0`/`tiles_0`/`lawn_0`).', '');
  lines.push('Thứ tự nên làm: **Pieces** → **UI icons** → **Mascot** → **Room: Living Room** → các phòng khác.', '');
  lines.push('## Style chung', '', '```', STYLE, '```', '');
  let group = '';
  for (const s of CATALOG) {
    if (s.group !== group) { group = s.group; lines.push(`## ${group}`, ''); }
    lines.push(`### \`art/raw/${s.key}.png\`${s.optional ? ' _(tuỳ chọn — trạng thái "trước khi sửa")_' : ''}`, '', '```', s.prompt, '```', '');
  }
  mkdirSync('art', { recursive: true });
  writeFileSync('art/PROMPTS.md', lines.join('\n'));
  console.log(`art/PROMPTS.md: ${CATALOG.length} prompts`);
}

function status() {
  const have = new Set(walk(OUT).map((f) => keyOf(f, OUT)));
  const groups = new Map<string, { done: number; total: number; extra: number; missing: string[] }>();
  for (const s of CATALOG) {
    const g = groups.get(s.group) ?? { done: 0, total: 0, extra: 0, missing: [] };
    if (s.optional) { if (have.has(s.key)) g.extra++; }
    else { g.total++; if (have.has(s.key)) g.done++; else g.missing.push(s.key); }
    groups.set(s.group, g);
  }
  for (const [name, g] of groups) {
    const opt = g.extra ? ` (+${g.extra} optional)` : '';
    console.log(`${g.missing.length ? '…' : '✓'} ${name}: ${g.done}/${g.total}${opt}${g.missing.length ? '  missing: ' + g.missing.map((k) => k.split('/').pop()).join(', ') : ''}`);
  }
}

async function main() {
  const cmd = process.argv[2];
  if (cmd === 'prompts') return prompts();
  if (cmd === 'status') return status();
  const files = walk(RAW).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  for (const f of files) {
    const key = keyOf(f, RAW);
    const spec = specs.get(key);
    if (!spec) { console.warn(`? unknown file ${f} (name must match a key in art/PROMPTS.md)`); continue; }
    try { console.log(`  ${key}: ${await processOne(f, spec)}`); } catch (e) { console.warn(`! ${key}: ${(e as Error).message}`); }
  }
  console.log(`manifest: ${await writeManifest()} images`);
  status();
}

void main();
