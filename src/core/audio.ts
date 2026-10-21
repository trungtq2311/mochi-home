// Tiny WebAudio synth: every sound effect and the background music are generated, no audio files needed.
import { save } from './save.ts';

let ac: AudioContext | null = null;
let master: GainNode;
let sfxBus: GainNode;
let musicBus: GainNode;
let noiseBuf: AudioBuffer;
let musicTimer = 0;

/** Dev builds are silent (automated testing runs in the background); add ?sound to the URL to hear it. */
const DEV_MUTE = import.meta.env.DEV && !new URLSearchParams(location.search).has('sound');

const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
const hz = (semi: number, base = 523.25) => base * Math.pow(2, semi / 12);

export function unlockAudio() {
  if (ac) { if (ac.state === 'suspended') void ac.resume(); return; }
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  ac = new Ctx();
  master = ac.createGain();
  master.gain.value = DEV_MUTE ? 0 : 0.8;
  master.connect(ac.destination);
  sfxBus = ac.createGain();
  sfxBus.connect(master);
  musicBus = ac.createGain();
  musicBus.gain.value = 0.22;
  musicBus.connect(master);
  noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  applySettings();
}

export function applySettings() {
  if (!ac) return;
  sfxBus.gain.value = save.sound ? 1 : 0;
  if (save.music && !DEV_MUTE) startMusic(); else stopMusic();
}

document.addEventListener('visibilitychange', () => {
  if (!ac) return;
  if (document.hidden) void ac.suspend(); else void ac.resume();
});

function tone(freq: number, dur: number, opts: { type?: OscillatorType; vol?: number; when?: number; slide?: number; attack?: number; bus?: GainNode } = {}) {
  if (!ac) return;
  const t = ac.currentTime + (opts.when ?? 0);
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = opts.type ?? 'sine';
  o.frequency.setValueAtTime(freq, t);
  if (opts.slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq * opts.slide), t + dur);
  const v = opts.vol ?? 0.2;
  const a = opts.attack ?? 0.005;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(v, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(opts.bus ?? sfxBus);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function noise(dur: number, opts: { freq?: number; q?: number; vol?: number; when?: number; sweep?: number; type?: BiquadFilterType } = {}) {
  if (!ac) return;
  const t = ac.currentTime + (opts.when ?? 0);
  const src = ac.createBufferSource();
  src.buffer = noiseBuf;
  const f = ac.createBiquadFilter();
  f.type = opts.type ?? 'bandpass';
  f.frequency.setValueAtTime(opts.freq ?? 1500, t);
  if (opts.sweep) f.frequency.exponentialRampToValueAtTime(opts.sweep, t + dur);
  f.Q.value = opts.q ?? 1;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(opts.vol ?? 0.2, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(sfxBus);
  src.start(t, Math.random() * 0.5);
  src.stop(t + dur + 0.05);
}

let lastLand = 0;

export function sfx(name: string, arg = 0) {
  if (!ac || !save.sound || DEV_MUTE) return;
  switch (name) {
    case 'swap': noise(0.12, { freq: 900, sweep: 2500, vol: 0.12 }); break;
    case 'bad': tone(220, 0.12, { type: 'triangle', vol: 0.15 }); tone(180, 0.15, { type: 'triangle', vol: 0.15, when: 0.08 }); break;
    case 'match': {
      const n = PENTA[Math.min(PENTA.length - 1, 2 + arg)];
      tone(hz(n), 0.25, { type: 'triangle', vol: 0.16 });
      tone(hz(n + 12), 0.15, { type: 'sine', vol: 0.06 });
      break;
    }
    case 'land': {
      const now = performance.now();
      if (now - lastLand < 120) return;
      lastLand = now;
      tone(320, 0.06, { type: 'sine', vol: 0.05, slide: 0.7 });
      break;
    }
    case 'special': [0, 4, 7, 12].forEach((s, i) => tone(hz(s + 7), 0.18, { type: 'triangle', vol: 0.1, when: i * 0.05 })); break;
    case 'rocket': noise(0.45, { freq: 600, sweep: 5000, vol: 0.18, q: 2 }); tone(500, 0.35, { type: 'sawtooth', vol: 0.03, slide: 3 }); break;
    case 'bomb':
      tone(120, 0.6, { type: 'sine', vol: 0.45, slide: 0.3 });
      noise(0.5, { freq: 400, sweep: 80, vol: 0.35, type: 'lowpass' });
      break;
    case 'rainbow': for (let i = 0; i < 8; i++) tone(hz(PENTA[i] + 12), 0.2, { type: 'sine', vol: 0.08, when: i * 0.04 }); break;
    case 'plane': noise(0.6, { freq: 1200, sweep: 3000, vol: 0.1, q: 3 }); break;
    case 'box': noise(0.08, { freq: 700, vol: 0.25, q: 4 }); tone(180, 0.08, { type: 'square', vol: 0.04 }); break;
    case 'dirt': noise(0.15, { freq: 3000, vol: 0.06 }); break;
    case 'ice': noise(0.1, { freq: 4200, vol: 0.12, q: 6 }); tone(2093, 0.12, { type: 'sine', vol: 0.05, slide: 1.3 }); break;
    case 'carpet': noise(0.18, { freq: 1500, sweep: 600, vol: 0.06 }); break;
    case 'toy': [0, 7, 12].forEach((s, i) => tone(hz(s + 12), 0.16, { type: 'sine', vol: 0.1, when: i * 0.06 })); break;
    case 'coin': tone(1318, 0.12, { type: 'square', vol: 0.04 }); tone(1760, 0.2, { type: 'square', vol: 0.04, when: 0.06 }); break;
    case 'praise': [0, 4, 7].forEach((s) => tone(hz(s), 0.5, { type: 'triangle', vol: 0.08 })); break;
    case 'shuffle': noise(0.4, { freq: 800, sweep: 2400, vol: 0.12 }); break;
    case 'click': tone(880, 0.05, { type: 'sine', vol: 0.08 }); break;
    case 'pop': tone(660, 0.1, { type: 'sine', vol: 0.12, slide: 1.6 }); break;
    case 'win': [0, 4, 7, 12, 16, 19, 24].forEach((s, i) => tone(hz(s), 0.35, { type: 'triangle', vol: 0.12, when: i * 0.09 })); break;
    case 'lose': [7, 4, 0, -5].forEach((s, i) => tone(hz(s), 0.35, { type: 'triangle', vol: 0.1, when: i * 0.14 })); break;
    case 'star': [12, 16, 19, 24].forEach((s, i) => tone(hz(s), 0.3, { type: 'sine', vol: 0.12, when: i * 0.07 })); break;
    case 'build': noise(0.1, { freq: 500, vol: 0.2, q: 3 }); noise(0.1, { freq: 500, vol: 0.2, q: 3, when: 0.15 }); break;
    default: break;
  }
}

// ---------- music: a gentle generative loop (I–vi–IV–V in C, pentatonic melody) ----------

const CHORDS = [[0, 4, 7], [-3, 0, 4], [-7, -3, 0], [-5, -1, 2]];

function startMusic() {
  if (!ac || musicTimer) return;
  let bar = 0;
  const beat = 0.42;
  const playBar = () => {
    if (!ac) return;
    const chord = CHORDS[bar % 4];
    for (const s of chord) tone(hz(s - 12, 261.63), beat * 8, { type: 'sine', vol: 0.05, attack: 0.4, bus: musicBus });
    tone(hz(chord[0] - 24, 261.63), beat * 4, { type: 'triangle', vol: 0.07, bus: musicBus });
    tone(hz(chord[0] - 24, 261.63), beat * 4, { type: 'triangle', vol: 0.06, when: beat * 4, bus: musicBus });
    for (let i = 0; i < 8; i++) {
      if (Math.random() < 0.45) continue;
      const n = PENTA[Math.floor(Math.random() * 7)];
      tone(hz(n, 261.63 * 2), beat * 1.6, { type: 'sine', vol: 0.045, when: i * beat, bus: musicBus });
    }
    bar++;
  };
  playBar();
  musicTimer = window.setInterval(playBar, beat * 8 * 1000);
}

function stopMusic() {
  if (musicTimer) { clearInterval(musicTimer); musicTimer = 0; }
}
