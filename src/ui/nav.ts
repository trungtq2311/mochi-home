import type { BoosterId } from '../core/save.ts';

/** Screen navigation, wired up in main.ts (avoids import cycles between screens). */
export const nav = {
  home: (_opts?: { fromWin?: boolean }) => {},
  play: (_level: number, _boosters: BoosterId[]) => {},
  /** Re-render counters on the current screen (coins, lives, badges). */
  refresh: () => {},
};
