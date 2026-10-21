// Vibration feedback: Taptic/vibrator via Capacitor in the store apps, navigator.vibrate in
// browsers that have it (Android Chrome), nothing elsewhere. Follows the sound on/off setting.
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { save } from './save.ts';

export type Buzz = 'light' | 'medium' | 'success';

const NATIVE = Capacitor.isNativePlatform();
/** Dev builds stay quiet like the audio (see audio.ts); add ?sound to the URL to feel it. */
const DEV_MUTE = import.meta.env.DEV && !new URLSearchParams(location.search).has('sound');
const PATTERN: Record<Buzz, number | number[]> = { light: 12, medium: 30, success: [20, 60, 40] };

let last = 0;

export function buzz(kind: Buzz) {
  if (!save.sound || DEV_MUTE) return;
  const now = performance.now();
  if (kind !== 'success' && now - last < 80) return; // chains of specials shouldn't turn into a drone
  last = now;
  if (NATIVE) {
    const p = kind === 'success'
      ? Haptics.notification({ type: NotificationType.Success })
      : Haptics.impact({ style: kind === 'light' ? ImpactStyle.Light : ImpactStyle.Medium });
    p.catch(() => { /* no vibrator */ });
  } else {
    navigator.vibrate?.(PATTERN[kind]);
  }
}
