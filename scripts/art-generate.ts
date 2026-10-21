// Generate the painted art with the OpenAI Images API, straight from src/art/catalog.ts.
//   node scripts/art-generate.ts --dry-run          show what would be generated and the rough cost
//   node scripts/art-generate.ts                    generate every missing required image
//   node scripts/art-generate.ts --only pieces/     only keys starting with a prefix (repeatable)
//   node scripts/art-generate.ts --all              include the optional "before" images
//   node scripts/art-generate.ts --force            regenerate even if art/raw already has the file
// Needs OPENAI_API_KEY in the environment. Optional: ART_MODEL (default gpt-image-1), ART_QUALITY (low|medium|high).
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

console.log(`${todo.length} images to generate with ${MODEL} (${QUALITY}), about $${(todo.length * (PRICE[QUALITY] ?? 0.05)).toFixed(2)}`);
if (flag('--dry-run')) {
  for (const s of todo) console.log(`  ${s.key}  (${s.kind}, ${sizeFor(s)})`);
  process.exit(0);
}
const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error('OPENAI_API_KEY is not set. Create a key at https://platform.openai.com/api-keys and set it first.');
  process.exit(1);
}

async function generate(s: ArtSpec): Promise<void> {
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
      const buf = item.b64_json ? Buffer.from(item.b64_json, 'base64') : Buffer.from(await (await fetch(item.url!)).arrayBuffer());
      const out = `${RAW}/${s.key}.png`;
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, buf);
      console.log(`  ✓ ${s.key}`);
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

// A few requests at a time keeps us under typical rate limits.
let next = 0, failed = 0;
async function worker() {
  while (next < todo.length) {
    const s = todo[next++];
    try { await generate(s); } catch (e) { failed++; console.warn(`  ✗ ${s.key}: ${(e as Error).message}`); }
  }
}
await Promise.all([worker(), worker(), worker()]);
console.log(`done: ${todo.length - failed} generated, ${failed} failed`);
execSync('node scripts/art.ts', { stdio: 'inherit' });
