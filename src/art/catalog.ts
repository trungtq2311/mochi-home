// Every painted asset the game can use: file key, processing size and the AI prompt that makes it.
// Used by scripts/art.ts (processing + PROMPTS.md) and by the room renderer (layout).
import { ROOMS } from '../meta/rooms.ts';

export type ArtKind = 'sprite' | 'item' | 'texture' | 'backdrop';

export interface ArtSpec {
  key: string;
  kind: ArtKind;
  /** Longest side in px after processing. */
  size: number;
  prompt: string;
  optional?: boolean;
  group: string;
}

/** Shared style so every image looks like it belongs to the same game. */
export const STYLE =
  'Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, ' +
  'rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, ' +
  'clean crisp edges, high detail, no text, no watermark, no logo.';

const ISOLATED =
  'Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background ' +
  '(if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery.';

const VIEW = 'Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game.';

const SEAMLESS = 'Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette.';

// ---------- match-3 pieces ----------

const PIECE = 'A glossy candy-like game piece for a match-3 puzzle, chunky and juicy, strong readable silhouette, bright specular highlight, ' +
  'subtle inner glow, thin darker outline, fills about 90% of the square frame.';

const pieces: ArtSpec[] = [
  ['red', 'shaped like a plump heart, vivid ruby red'],
  ['yellow', 'shaped like a rounded five-pointed star, sunny golden yellow'],
  ['blue', 'shaped like a faceted cut diamond gem, sky blue'],
  ['green', 'shaped like a fresh leaf with a soft vein, lime green'],
  ['purple', 'shaped like a hexagonal amethyst crystal with facets, violet purple'],
  ['orange', 'shaped like a five-petal flower with a cream center, tangerine orange'],
].map(([k, d]) => ({ key: `pieces/${k}`, kind: 'sprite', size: 256, group: 'Pieces', prompt: `${PIECE} The piece is ${d}. ${ISOLATED} ${STYLE}` }));

const specials: ArtSpec[] = [
  ['rocket', 'A horizontal double-headed firework rocket booster (pointed golden tips on both the left and the right end, red and white striped body, small blue fins in the middle), lying horizontally'],
  ['bomb', 'A round cartoon bomb booster, dark navy glossy sphere with a metal cap and a short fuse with a bright spark'],
  ['plane', 'A cute folded paper airplane booster, white and light-blue paper, pointing up-right'],
  ['disco', 'A sparkling disco ball booster covered in rainbow mirror tiles, glowing'],
].map(([k, d]) => ({ key: `pieces/${k}`, kind: 'sprite', size: 256, group: 'Pieces', prompt: `${d}, match-3 game special piece, glossy and juicy, fills about 90% of the square frame. ${ISOLATED} ${STYLE}` }));

const obstacles: ArtSpec[] = [
  { key: 'pieces/box1', d: 'A small square wooden crate, light honey-colored planks with a diagonal brace, seen straight from the front, square' },
  { key: 'pieces/box2', d: 'A small square wooden crate reinforced with two vertical grey metal straps and rivets, seen straight from the front, square' },
  { key: 'pieces/box3', d: 'A small square heavy dark-wood crate with metal straps, rivets and golden corner caps, seen straight from the front, square' },
  { key: 'pieces/dirt1', d: 'A square tile of light dusty dirt with crumbs and small smudges, seen from straight above, rounded corners, square' },
  { key: 'pieces/dirt2', d: 'A square tile of thick dark sticky mud with puddles and splatters, seen from straight above, rounded corners, square' },
].map(({ key, d }) => ({ key, kind: 'sprite', size: 256, group: 'Pieces', prompt: `${d}, match-3 game obstacle tile filling the whole square frame. ${ISOLATED} ${STYLE}` }));

// ---------- UI icons & mascot ----------

const ui: ArtSpec[] = [
  ['coin', 'a shiny gold coin with a paw print embossed on it'],
  ['star', 'a chunky glossy golden star'],
  ['heart', 'a glossy red heart (lives icon)'],
  ['hammer', 'a cartoon hammer with a wooden handle and a steel head'],
  ['broom', 'a cartoon straw broom with a red band'],
  ['shuffle', 'two curved crossing arrows, one blue and one orange (shuffle icon)'],
  ['gift', 'a pink gift box with a golden ribbon bow'],
  ['quests', 'a parchment scroll with a green check mark badge'],
  ['race', 'a checkered racing flag on a wooden pole'],
  ['chest', 'a wooden treasure chest with gold trim, slightly open with golden light'],
  ['gear', 'a lavender settings gear with a purple center'],
  ['lock', 'a grey padlock'],
].map(([k, d]) => ({ key: `ui/${k}`, kind: 'sprite', size: 192, group: 'UI icons', prompt: `Mobile game UI icon: ${d}, bold outline, glossy, readable at small size, fills about 90% of the frame. ${ISOLATED} ${STYLE}` }));

const MOCHI = 'Mochi, a chubby cute cream-and-orange tabby kitten with big round sparkling eyes, pink blush cheeks, a small red collar with a golden bell, ' +
  'head and upper body only, friendly mascot of a cozy home decoration game';
const mascot: ArtSpec[] = [
  ['happy', 'smiling happily with eyes half closed'],
  ['sad', 'sad with teary eyes and drooping ears'],
  ['wow', 'amazed with sparkling eyes and an open mouth, paws raised'],
].map(([k, d]) => ({ key: `mascot/${k}`, kind: 'sprite', size: 512, group: 'Mascot', prompt: `${MOCHI}, ${d}. Keep the exact same character design in all versions. ${ISOLATED} ${STYLE}` }));

// ---------- rooms ----------

/** Where an item sits in the 400×640 room. Anchor = bottom centre, or top centre when `top` is set. */
export interface ItemPlacement { cx: number; y: number; w: number; top?: boolean; ground?: boolean; flat?: boolean }

export interface RoomLayout {
  /** Height of the wall (y where the floor starts) in the 400×640 space. */
  horizon: number;
  /** Item key that provides the wall texture / floor texture. */
  wall: string | null;
  floor: string;
  /** Uses a painted backdrop instead of a wall texture (garden sky). */
  backdrop?: boolean;
  /** Draw order: earlier = further back. */
  items: Record<string, ItemPlacement>;
}

export const LAYOUT: Record<string, RoomLayout> = {
  living: {
    horizon: 382, wall: 'wallpaper', floor: 'floor',
    items: {
      window: { cx: 102, y: 338, w: 150 },
      painting: { cx: 225, y: 232, w: 94 },
      rug: { cx: 200, y: 540, w: 270, flat: true },
      bookshelf: { cx: 318, y: 402, w: 82, ground: true },
      lamp: { cx: 140, y: 414, w: 60, ground: true },
      sofa: { cx: 228, y: 414, w: 176, ground: true },
      table: { cx: 200, y: 522, w: 136, ground: true },
      plant: { cx: 92, y: 536, w: 112, ground: true },
    },
  },
  kitchen: {
    horizon: 382, wall: 'backsplash', floor: 'tiles',
    items: {
      lights: { cx: 200, y: 0, w: 170, top: true },
      window: { cx: 186, y: 250, w: 126 },
      shelf: { cx: 300, y: 236, w: 100 },
      fridge: { cx: 86, y: 406, w: 80, ground: true },
      cabinets: { cx: 200, y: 404, w: 196, ground: true },
      stove: { cx: 318, y: 406, w: 86, ground: true },
      dining: { cx: 200, y: 548, w: 244, ground: true },
    },
  },
  garden: {
    horizon: 340, wall: null, floor: 'lawn', backdrop: true,
    items: {
      fence: { cx: 200, y: 354, w: 400 },
      tree: { cx: 300, y: 416, w: 150, ground: true },
      swing: { cx: 102, y: 434, w: 136, ground: true },
      path: { cx: 200, y: 640, w: 176, flat: true },
      fountain: { cx: 200, y: 440, w: 150, ground: true },
      flowers: { cx: 96, y: 528, w: 132, ground: true },
      bench: { cx: 306, y: 508, w: 126, ground: true },
      lanterns: { cx: 200, y: 108, w: 350, top: true },
    },
  },
};

/** What an item looks like when not yet renovated (optional images). */
const BEFORE: Record<string, string> = {
  window: 'an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains',
  painting: 'an empty crooked old picture frame with a torn canvas',
  rug: 'a worn dusty threadbare rug with holes, lying flat on the floor seen in perspective',
  bookshelf: 'a broken empty wooden bookshelf with a missing shelf and cobwebs',
  lamp: 'a bent broken floor lamp with a torn lampshade',
  sofa: 'an old sofa covered with a dusty white sheet, sagging',
  table: 'a wobbly old coffee table with a broken leg and a pile of junk mail',
  plant: 'a dried dead houseplant in a cracked pot',
  lights: 'a bare hanging light bulb on a frayed wire with cobwebs',
  shelf: 'a broken crooked wall shelf with a few dusty jars',
  fridge: 'an old rusty dented retro fridge',
  cabinets: 'old kitchen counter cabinets with broken doors, chipped countertop and a rusty sink',
  stove: 'an old dirty rusty stove with a broken oven door',
  dining: 'a broken dining table with one chair knocked over, dusty',
  fence: 'a broken wooden garden fence with missing and fallen planks, horizontal strip spanning the full width',
  tree: 'a dead leafless dry tree',
  swing: 'a broken garden swing frame with a snapped rope',
  path: 'a muddy dirt trail with puddles and weeds, seen in perspective going into the distance',
  fountain: 'a dry cracked stone fountain basin full of dead leaves',
  flowers: 'a weedy empty flower bed with dry soil',
  bench: 'a broken old garden bench with missing slats',
  lanterns: 'a sagging tangled string with broken lantern bulbs, horizontal, spanning wide',
};

/** Shape hints per item so the image fits its slot. */
const SHAPE: Record<string, string> = {
  rug: 'lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape',
  path: 'seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top)',
  fence: 'a long horizontal fence section spanning the full width of the image, very wide and short',
  lanterns: 'a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short',
  lights: 'hanging from the top edge of the image on cords',
  window: 'a wall window with curtains, front view',
  painting: 'a framed painting hanging on a wall, front view',
  shelf: 'a small wall shelf, front view',
  cabinets: 'a kitchen counter with lower cabinets and a sink, wide',
  dining: 'a dining table with two chairs, wide',
};

function roomSpecs(): ArtSpec[] {
  const out: ArtSpec[] = [];
  for (const room of ROOMS) {
    const L = LAYOUT[room.id];
    const group = `Room: ${room.name.en}`;
    if (L.backdrop) {
      out.push({ key: `rooms/${room.id}/backdrop_before`, kind: 'backdrop', size: 1024, group,
        prompt: `Background for a home decoration game: the back of an old neglected cottage garden on a grey overcast day — a weathered house wall with a dusty window on the left, an overgrown wild hedge, grey sky. Front view, wide landscape, everything far in the background, the bottom 15% is plain dry dirt ground. No people. ${STYLE}` });
      out.push({ key: `rooms/${room.id}/backdrop`, kind: 'backdrop', size: 1024, group,
        prompt: `Background for a home decoration game: the back of a charming cottage garden on a sunny day — a cozy cream house wall with a window and flower box on the left, a neat green hedge, blue sky with fluffy clouds. Same composition as the neglected version. Front view, wide landscape, the bottom 15% is plain grass ground. No people. ${STYLE}` });
    }
    for (const task of room.tasks) {
      const isWall = task.item === L.wall, isFloor = task.item === L.floor;
      if (isWall || isFloor) {
        const what = isWall ? `${room.name.en.toLowerCase()} wall surface` : `${room.name.en.toLowerCase()} floor surface`;
        out.push({ key: `rooms/${room.id}/${task.item}_before`, kind: 'texture', size: 512, group,
          prompt: `${SEAMLESS} An old neglected ${what}: dirty, stained, cracked and worn. ${STYLE}` });
        task.styles.forEach((st, i) => out.push({ key: `rooms/${room.id}/${task.item}_${i}`, kind: 'texture', size: 512, group,
          prompt: `${SEAMLESS} A beautiful new ${what}: ${st.name.en.toLowerCase()} (${task.title.en.toLowerCase()}), main color close to ${st.swatch}. ${STYLE}` }));
        continue;
      }
      const shape = SHAPE[task.item] ? ` ${SHAPE[task.item]}.` : '';
      out.push({ key: `rooms/${room.id}/${task.item}_before`, kind: 'item', size: 768, group, optional: true,
        prompt: `${BEFORE[task.item] ?? `an old broken ${task.item}`}.${shape} ${VIEW} ${ISOLATED} ${STYLE}` });
      task.styles.forEach((st, i) => out.push({ key: `rooms/${room.id}/${task.item}_${i}`, kind: 'item', size: 768, group,
        prompt: `A cozy ${room.name.en.toLowerCase()} ${task.item}: ${st.name.en.toLowerCase()} style, main color close to ${st.swatch}, brand new and charming.${shape} ${VIEW} ${ISOLATED} ${STYLE}` }));
    }
  }
  return out;
}

export const CATALOG: ArtSpec[] = [...pieces, ...specials, ...obstacles, ...ui, ...mascot, ...roomSpecs()];
