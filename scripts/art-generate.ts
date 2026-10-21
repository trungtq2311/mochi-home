// Generate the painted art straight from src/art/catalog.ts, either with a local ComfyUI + SDXL
// (free, uses your GPU; default when ComfyUI is running on 127.0.0.1:8188) or the OpenAI Images API.
//   node scripts/art-generate.ts --dry-run          show what would be generated and the rough cost
//   node scripts/art-generate.ts                    generate every missing required image
//   node scripts/art-generate.ts --only pieces/     only keys starting with a prefix (repeatable)
//   node scripts/art-generate.ts --all              include the optional "before" images
//   node scripts/art-generate.ts --force            regenerate even if art/raw already has the file
//   node scripts/art-generate.ts --backend comfy|openai   force a backend;  --seed N  shift seeds for new variations
// ComfyUI: ART_CKPT (default sd_xl_base_1.0.safetensors), ART_STEPS (default 28).
// OpenAI: needs OPENAI_API_KEY. Optional: ART_MODEL (default gpt-image-1), ART_QUALITY (low|medium|high).
// Afterwards run `npm run art` (done automatically at the end) to cut, flatten and outline the images.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { CATALOG, type ArtSpec } from '../src/art/catalog.ts';

const args = process.argv.slice(2);
const flag = (f: string) => args.includes(f);
const only = args.flatMap((a, i) => (a === '--only' ? [args[i + 1]] : []));
const MODEL = process.env.ART_MODEL ?? 'gpt-image-1';
const QUALITY = process.env.ART_QUALITY ?? 'medium';
const PRICE: Record<string, number> = { low: 0.011, medium: 0.042, high: 0.167 }; // ≈ USD per 1024² image
const RAW = 'art/raw';

const exists = (key: string) => ['png', 'jpg', 'jpeg', 'webp'].some((ext) => existsSync(`${RAW}/${key}.${ext}`));

const todo = CATALOG.filter((s) =>
  (flag('--all') || !s.optional) &&
  (only.length === 0 || only.some((p) => s.key.startsWith(p))) &&
  (flag('--force') || !exists(s.key)));

const sizeFor = (s: ArtSpec) => (s.kind === 'backdrop' ? '1536x1024' : '1024x1024');

const opt = (name: string) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const seedShift = Number(opt('--seed') ?? 0);
const COMFY = process.env.COMFY_URL ?? 'http://127.0.0.1:8188';
const CKPT = process.env.ART_CKPT ?? 'sd_xl_base_1.0.safetensors';
const comfyUp = await fetch(`${COMFY}/system_stats`).then((r) => r.ok).catch(() => false);
const backend = opt('--backend') ?? (comfyUp ? 'comfy' : 'openai');

if (backend === 'comfy') console.log(`${todo.length} images to generate locally with ComfyUI (${CKPT}), free`);
else console.log(`${todo.length} images to generate with ${MODEL} (${QUALITY}), about $${(todo.length * (PRICE[QUALITY] ?? 0.05)).toFixed(2)}`);
if (flag('--dry-run')) {
  for (const s of todo) console.log(`  ${s.key}  (${s.kind}, ${sizeFor(s)})`);
  process.exit(0);
}
if (backend === 'comfy' && !comfyUp) { console.error(`ComfyUI is not running at ${COMFY}. Start it first (D:\\AI\\start-comfy.bat).`); process.exit(1); }
const key = process.env.OPENAI_API_KEY;
if (backend === 'openai' && !key) {
  console.error('No image backend: start ComfyUI (free, local) or set OPENAI_API_KEY.');
  process.exit(1);
}

function save(s: ArtSpec, buf: Buffer) {
  const out = `${RAW}/${s.key}.png`;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buf);
  console.log(`  ✓ ${s.key}`);
}

// ---------- local ComfyUI + SDXL ----------

const NEGATIVE = 'photo, photorealistic, 3d render, octane, glossy plastic, shiny, gradient background, dark background, scenery, room, floor, ' +
  'ground shadow, blurry, noisy, grainy, jpeg artifacts, text, letters, watermark, signature, logo, frame, border, multiple objects, cropped, cut off, deformed';

/** SDXL can't do transparency and likes the subject first: flat white background, art.ts cuts it out. */
function sdxlPrompt(s: ArtSpec): string {
  return s.prompt
    .replace('isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background)', 'isolated on a plain flat pure white background')
    .replace(/No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo\./, '');
}

function hashSeed(k: string): number {
  let h = 2166136261;
  for (const ch of k) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return ((h >>> 0) + seedShift * 7919) % 2147483647;
}

interface ComfyImage { filename: string; subfolder: string; type: string }
interface ComfyHistory { outputs: Record<string, { images?: ComfyImage[] }>; status?: { status_str?: string } }

async function generateComfy(s: ArtSpec): Promise<void> {
  const [w, h] = s.kind === 'backdrop' ? [1344, 768] : [1024, 1024];
  const graph = {
    '4': { class_type: 'CheckpointLoaderSimple', inputs: { ckpt_name: CKPT } },
    '5': { class_type: 'EmptyLatentImage', inputs: { width: w, height: h, batch_size: 1 } },
    '6': { class_type: 'CLIPTextEncode', inputs: { text: sdxlPrompt(s), clip: ['4', 1] } },
    '7': { class_type: 'CLIPTextEncode', inputs: { text: NEGATIVE, clip: ['4', 1] } },
    '3': { class_type: 'KSampler', inputs: { seed: hashSeed(s.key), steps: Number(process.env.ART_STEPS ?? 28), cfg: 6.5, sampler_name: 'dpmpp_2m', scheduler: 'karras', denoise: 1, model: ['4', 0], positive: ['6', 0], negative: ['7', 0], latent_image: ['5', 0] } },
    '8': { class_type: 'VAEDecode', inputs: { samples: ['3', 0], vae: ['4', 2] } },
    '9': { class_type: 'SaveImage', inputs: { filename_prefix: 'mochi', images: ['8', 0] } },
  };
  const res = await fetch(`${COMFY}/prompt`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: graph }) });
  if (!res.ok) throw new Error(`ComfyUI ${res.status} ${(await res.text()).slice(0, 300)}`);
  const { prompt_id } = (await res.json()) as { prompt_id: string };
  for (;;) {
    await new Promise((r) => setTimeout(r, 1500));
    const hist = (await (await fetch(`${COMFY}/history/${prompt_id}`)).json()) as Record<string, ComfyHistory>;
    const entry = hist[prompt_id];
    if (!entry) continue;
    if (entry.status?.status_str === 'error') throw new Error('ComfyUI reported an error');
    const img = Object.values(entry.outputs).flatMap((o) => o.images ?? [])[0];
    if (!img) continue;
    const q = new URLSearchParams({ filename: img.filename, subfolder: img.subfolder, type: img.type });
    save(s, Buffer.from(await (await fetch(`${COMFY}/view?${q}`)).arrayBuffer()));
    return;
  }
}

// ---------- OpenAI Images API ----------

async function generateOpenAI(s: ArtSpec): Promise<void> {
  const body: Record<string, unknown> = { model: MODEL, prompt: s.prompt, size: sizeFor(s), quality: QUALITY, n: 1 };
  if (s.kind === 'sprite' || s.kind === 'item') body.background = 'transparent';
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const json = (await res.json()) as { data: { b64_json?: string; url?: string }[] };
      const item = json.data[0];
      save(s, item.b64_json ? Buffer.from(item.b64_json, 'base64') : Buffer.from(await (await fetch(item.url!)).arrayBuffer()));
      return;
    }
    const text = await res.text();
    if (res.status === 429 || res.status >= 500) {
      const wait = 5000 * attempt;
      console.warn(`  … ${s.key}: ${res.status}, retrying in ${wait / 1000}s`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    throw new Error(`${res.status} ${text.slice(0, 300)}`);
  }
  throw new Error('too many retries');
}

// The local GPU works one image at a time; the API takes a few in parallel.
let next = 0, failed = 0;
const generate = backend === 'comfy' ? generateComfy : generateOpenAI;
async function worker() {
  while (next < todo.length) {
    const s = todo[next++];
    try { await generate(s); } catch (e) { failed++; console.warn(`  ✗ ${s.key}: ${(e as Error).message}`); }
  }
}
await Promise.all(Array.from({ length: backend === 'comfy' ? 1 : 3 }, worker));
console.log(`done: ${todo.length - failed} generated, ${failed} failed`);
execSync('node scripts/art.ts', { stdio: 'inherit' });
