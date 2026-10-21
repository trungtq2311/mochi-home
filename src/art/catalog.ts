// Every painted asset the game can use: file key, processing size and the AI prompt that makes it.
// Used by scripts/art.ts (processing + PROMPTS.md) and by the room renderer (layout).
import { ROOMS } from '../meta/rooms.ts';
import { AREAS } from '../meta/town.ts';

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

/**
 * Shared style so every image looks like it belongs to the same game.
 * Deliberately flat and hand-inked: glossy "3D render" looks are the most obvious AI tell,
 * and scripts/art.ts further flattens colors and adds one uniform outline to every cut-out.
 */
export const STYLE =
  'Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. ' +
  'Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, ' +
  'simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. ' +
  'No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, ' +
  'no text, no watermark, no logo.';

const ISOLATED =
  'Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background ' +
  '(if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery.';

const VIEW = 'Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game.';

const SEAMLESS = 'Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette.';

// ---------- match-3 pieces ----------

const PIECE = 'A chunky game piece for a match-3 puzzle, bold readable silhouette, flat cel shading with one simple white highlight shape, ' +
  'thick even dark outline, fills about 90% of the square frame.';

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
  ['bomb', 'A round cartoon bomb booster, dark navy round sphere with a metal cap and a short fuse with a bright spark'],
  ['plane', 'A cute folded paper airplane booster, white and light-blue paper, pointing up-right'],
  ['disco', 'A sparkling disco ball booster covered in rainbow mirror tiles, glowing'],
].map(([k, d]) => ({ key: `pieces/${k}`, kind: 'sprite', size: 256, group: 'Pieces', prompt: `${d}, match-3 game special piece, bold and readable, fills about 90% of the square frame. ${ISOLATED} ${STYLE}` }));

const obstacles: ArtSpec[] = [
  { key: 'pieces/box1', d: 'A small square wooden crate, light honey-colored planks with a diagonal brace, seen straight from the front, square' },
  { key: 'pieces/box2', d: 'A small square wooden crate reinforced with two vertical grey metal straps and rivets, seen straight from the front, square' },
  { key: 'pieces/box3', d: 'A small square heavy dark-wood crate with metal straps, rivets and golden corner caps, seen straight from the front, square' },
  { key: 'pieces/dirt1', d: 'A square tile of light dusty dirt with crumbs and small smudges, seen from straight above, rounded corners, square' },
  { key: 'pieces/dirt2', d: 'A square tile of thick dark sticky mud with puddles and splatters, seen from straight above, rounded corners, square' },
].map(({ key, d }) => ({ key, kind: 'sprite', size: 256, group: 'Pieces', prompt: `${d}, match-3 game obstacle tile filling the whole square frame. ${ISOLATED} ${STYLE}` }));

// Newer mechanics: ice lock (overlay drawn on top of a piece), drop toy, carpet floor.
obstacles.push(
  { key: 'pieces/ice1', kind: 'sprite', size: 256, group: 'Pieces', prompt: `A thin clear ice shell shaped like a rounded square, mostly see-through in the middle with pale-blue frosty edges, a few white light streaks and a crisp blue outline, seen straight from the front, square, meant to be laid over a game piece, match-3 game obstacle filling the whole square frame. ${ISOLATED} ${STYLE}` },
  { key: 'pieces/ice2', kind: 'sprite', size: 256, group: 'Pieces', prompt: `A thick frosted ice block shaped like a rounded square, translucent pale blue with white frost cracks, a little snow on the top corners and a crisp darker blue outline, seen straight from the front, square, meant to be laid over a game piece, match-3 game obstacle filling the whole square frame. ${ISOLATED} ${STYLE}` },
  { key: 'pieces/toy', kind: 'sprite', size: 256, group: 'Pieces', prompt: `A cute small teddy bear head toy, warm caramel-brown plush with round ears, a cream snout, shiny black button eyes, rosy cheeks and a red bow tie, friendly and simple, match-3 game collectible piece, fills about 90% of the square frame. ${ISOLATED} ${STYLE}` },
  { key: 'pieces/carpet', kind: 'texture', size: 256, group: 'Pieces', prompt: `${SEAMLESS} A cozy woven rug pattern seen from straight above: warm raspberry-red wool with a darker red diamond lattice and small golden diamonds at the crossings, soft fabric texture. ${STYLE}` },
);

// ---------- UI icons & mascot ----------

const ui: ArtSpec[] = [
  ['coin', 'a gold coin with a paw print embossed on it'],
  ['star', 'a chunky golden star'],
  ['heart', 'a plump red heart (lives icon)'],
  ['hammer', 'a cartoon hammer with a wooden handle and a steel head'],
  ['broom', 'a cartoon straw broom with a red band'],
  ['shuffle', 'two curved crossing arrows, one blue and one orange (shuffle icon)'],
  ['gift', 'a pink gift box with a golden ribbon bow'],
  ['quests', 'a parchment scroll with a green check mark badge'],
  ['race', 'a checkered racing flag on a wooden pole'],
  ['chest', 'a wooden treasure chest with gold trim, slightly open with golden light'],
  ['gear', 'a lavender settings gear with a purple center'],
  ['lock', 'a grey padlock'],
].map(([k, d]) => ({ key: `ui/${k}`, kind: 'sprite', size: 192, group: 'UI icons', prompt: `Mobile game UI icon: ${d}, bold outline, flat colors, readable at small size, fills about 90% of the frame. ${ISOLATED} ${STYLE}` }));

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
  bedroom: {
    horizon: 382, wall: 'wallpaper', floor: 'floor',
    items: {
      window: { cx: 88, y: 302, w: 150 },
      garland: { cx: 204, y: 230, w: 124 },
      wardrobe: { cx: 315, y: 406, w: 70, ground: true },
      nightstand: { cx: 104, y: 408, w: 52, ground: true },
      rug: { cx: 200, y: 580, w: 284, flat: true },
      bed: { cx: 200, y: 472, w: 196, ground: true },
      armchair: { cx: 92, y: 536, w: 100, ground: true },
      catbed: { cx: 312, y: 534, w: 74, ground: true },
    },
  },
  bathroom: {
    horizon: 382, wall: 'walltiles', floor: 'tiles',
    items: {
      window: { cx: 93, y: 234, w: 128 },
      shelf: { cx: 194, y: 218, w: 92 },
      towels: { cx: 184, y: 320, w: 104 },
      mirror: { cx: 288, y: 296, w: 84 },
      bathtub: { cx: 150, y: 450, w: 214, ground: true },
      sink: { cx: 296, y: 416, w: 100, ground: true },
      bathmat: { cx: 163, y: 516, w: 196, flat: true },
      plant: { cx: 314, y: 538, w: 74, ground: true },
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
  garland: 'a broken string of fairy-light bulbs hanging from one nail, the other end fallen down, dusty dead bulbs',
  nightstand: 'a wobbly old grey bedside table with a missing drawer and a tipped-over broken lamp, cobwebs',
  wardrobe: 'an old grey wardrobe with one door hanging off its hinge, empty hangers inside, a pile of clothes and dusty boxes on top',
  bed: 'a bare stained old mattress on a cracked bed frame with no headboard, a crumpled grey sheet and a spring poking out',
  armchair: 'a tilted old armchair with torn fabric, stuffing coming out and a missing leg propped on books',
  catbed: 'a soggy torn cardboard box with crumpled newspaper inside',
  towels: 'a bent towel bar with one dirty grey ragged towel with holes',
  mirror: 'a tilted dusty wall mirror with cracked spotted glass and a chipped corner',
  bathtub: 'an old rusty stained bathtub with a grime ring, dead leaves inside and a dripping tap, one foot replaced by bricks',
  sink: 'a cracked old wall-hung washbasin with a rusty leaking pipe dripping into a bucket',
  bathmat: 'a soggy moldy grey-green bath mat with holes, lying flat on the floor seen in perspective',
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
  garland: 'a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view',
  nightstand: 'a small bedside table with a little table lamp on top, front view',
  wardrobe: 'a tall narrow two-door wardrobe standing on the floor, front view',
  bed: 'a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt',
  armchair: 'a small cozy armchair, front view',
  catbed: 'a cozy pet bed for a cat, small, front view',
  towels: 'bath towels hanging from a wall-mounted towel bar or hooks, front view',
  mirror: 'a bathroom mirror hanging on a wall, front view',
  bathtub: 'a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap',
  sink: 'a bathroom washbasin with a tap, front view',
  bathmat: 'a bath mat lying flat on the floor, seen in perspective from the front and above, wide',
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

// ---------- town (Mochi Bay) ----------
// Each task element is one isolated isometric picture. Layout (anchor + width in world units) lives with the
// task data in src/meta/town.ts (`at`, `w`); townArt.ts draws `town/<taskId>_<style|before>` there when present.

const ISO_VIEW = 'Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map.';

/** What each kind of town element is (after renovation). */
const TOWN_WHAT: Record<string, string> = {
  paving: 'a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it',
  sand: 'a flat patch of clean golden beach sand with a few shells and a starfish (isometric diamond shape)',
  paths: 'two crossing park walkways with a round plaza in the middle, flat on the ground (isometric diamond shape)',
  pier: 'a long wooden pier on posts standing in shallow water, running diagonally',
  house: 'a small charming two-storey seaside town building with a gable roof',
  awning: 'a striped shop awning with a scalloped edge',
  sign: 'a small round hanging shop sign on a wrought-iron bracket',
  beacon: 'the glowing glass lantern room on top of a lighthouse, with a red dome roof',
  vegpatch: 'a small vegetable garden bed with neat rows of crops',
  mailbox: 'a cute mailbox on a wooden post',
  fence: 'a short straight garden fence section running diagonally',
  tree: 'a round leafy fruit tree',
  trees: 'a small group of trees',
  palms: 'two leaning palm trees',
  bench: 'a park bench',
  lamp: 'an old-fashioned street lamp post',
  lamps: 'a row of three old-fashioned lamp posts',
  tables: 'two small outdoor café tables with chairs and parasols',
  cart: 'a little wooden bread cart with a canopy and wheels, full of loaves',
  planters: 'two wooden flower boxes full of flowers',
  flowerbed: 'a round flower bed with a stone border',
  huts: 'a row of three small beach huts',
  umbrellas: 'three beach parasols stuck in the sand',
  loungers: 'two beach sun loungers',
  lifeguard: 'a wooden lifeguard tower on stilts with a little flag',
  volley: 'a beach volleyball net with a ball',
  castle: 'a sandcastle with a tiny flag',
  lights: 'two poles with a string of round light bulbs between them',
  bunting: 'two poles with a string of triangle bunting flags between them',
  menu: 'a café sandwich-board menu sign',
  bikes: 'a bike rack with two bicycles',
  fountain: 'a round two-tier stone fountain with water',
  gazebo: 'a round park gazebo with a conical roof',
  stall: 'a market stall with a striped canopy and goods on the counter',
  crates: 'a stack of wooden produce crates',
  clock: 'a tall street clock on a post',
  boat: 'a small boat floating on water',
  nets: 'a wooden rack with fishing nets hanging to dry',
  buoys: 'three floating buoys',
  kiosk: 'a tiny ice-cream kiosk with a giant cone on its roof',
  bookcart: 'a small wooden cart full of books',
  statue: 'a cute cat statue on a stone pedestal',
  windmill: 'a tall classic windmill with four sails',
  picnic: 'a picnic blanket with a basket and fruit',
  telescope: 'a telescope on a tripod',
  kites: 'two kites flying high on strings',
  swing: 'an A-frame wooden swing set',
  lighthouse: 'a tall striped lighthouse tower without its top lantern',
  flag: 'a flagpole with a waving flag',
};

/** The shabby "before" version of each kind. */
const TOWN_BEFORE: Record<string, string> = {
  paving: 'a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape)',
  sand: 'a dirty beach patch with seaweed piles, litter and broken crates (flat isometric diamond shape)',
  paths: 'worn muddy dirt tracks with puddles and weeds',
  pier: 'a broken old wooden pier with missing planks and crooked posts in the water',
  house: 'an abandoned shabby building with grey faded walls, boarded-up windows, holes in the roof and weeds',
  awning: 'a torn grey rag of an old awning hanging from a bent rail',
  sign: 'an old blank broken sign hanging crooked from a bracket',
  beacon: 'a dark broken lighthouse lantern room with cracked glass',
  lighthouse: 'a dirty cracked grey lighthouse tower with faded stripes and a boarded door',
  windmill: 'a broken grey windmill with two snapped sails and weeds',
  gazebo: 'a run-down grey gazebo with a holey roof',
  huts: 'three shabby grey beach huts with broken doors',
  boat: 'a wrecked grey boat half sunk and tilted in the water',
  tree: 'a dead leafless tree', trees: 'a dead tree and a pile of junk', palms: 'a dead palm stump and junk',
  fence: 'a broken fence with fallen and missing planks',
  fountain: 'a dry cracked fountain full of dead leaves',
};

function townSpecs(): ArtSpec[] {
  const out: ArtSpec[] = [];
  for (const area of AREAS) {
    const group = `Town: ${area.name.en}`;
    for (const task of area.tasks) {
      const what = TOWN_WHAT[task.kind] ?? task.title.en.toLowerCase();
      out.push({ key: `town/${task.id}_before`, kind: 'item', size: 768, group, optional: true,
        prompt: `${TOWN_BEFORE[task.kind] ?? 'a pile of old junk: broken planks, a dusty crate, stones and weeds'} (where ${what} will be built in the ${area.name.en.toLowerCase()} area of a seaside town). ${ISO_VIEW} ${ISOLATED} ${STYLE}` });
      const styles = task.styles.length ? task.styles : [{ name: { vi: '', en: 'brand new' }, swatch: '#ffffff' }];
      styles.forEach((st, i) => out.push({ key: `town/${task.id}_${i}`, kind: 'item', size: 768, group,
        prompt: `${what} for the ${area.name.en.toLowerCase()} of a sunny seaside town (${task.title.en.toLowerCase()}): ${st.name.en.toLowerCase()} style, main color close to ${st.swatch}${st.alt && st.alt.startsWith('#') ? ` with accents close to ${st.alt}` : ''}, freshly restored and charming. ${ISO_VIEW} ${ISOLATED} ${STYLE}` }));
    }
  }
  return out;
}

CATALOG.push(...townSpecs());
