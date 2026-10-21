// Mochi Bay: the seaside town the player restores area by area (Homescapes-mansion style).
// Art for every task `kind` lives in townArt.ts. Positions are world units of the 1600×2600 map.
import type { L10n } from './rooms.ts';

export interface TownStyle {
  name: L10n;
  /** Main color (walls, canopy, paint…). */
  swatch: string;
  /** Second color (roof, trim, stripes…). */
  alt?: string;
}

export interface TownTask {
  id: string;
  /** Which drawer in townArt.ts renders it. */
  kind: string;
  title: L10n;
  cost: number;
  /** Empty = one look, no style picker. */
  styles: TownStyle[];
  /**
   * Layout: ground anchor relative to the area centre (bottom centre of the element; for buildings and
   * flat surfaces the centre of the footprint). Painted images are drawn `w` units wide from here.
   */
  at: [number, number];
  w: number;
  /** Kind-specific shape parameters (footprint, count, parent building…). */
  p?: Record<string, number | string | number[][]>;
}

export interface Area {
  id: string;
  name: L10n;
  /** Centre of the area in world units, and its tap / fog radius. */
  x: number;
  y: number;
  r: number;
  tasks: TownTask[];
}

export const WORLD_W = 1600;
export const WORLD_H = 2600;

const s = (vi: string, en: string, swatch: string, alt?: string): TownStyle => ({ name: { vi, en }, swatch, alt });
const T = (id: string, kind: string, cost: number, vi: string, en: string, at: [number, number], w: number, styles: TownStyle[], p?: TownTask['p']): TownTask =>
  ({ id, kind, cost, title: { vi, en }, at, w, styles, p });

// Shared style sets
const PAVE = [s('Đá cuội', 'Cobblestone', '#c9c1b2', 'cobble'), s('Gạch đỏ', 'Red brick', '#cf7a5a', 'brick'), s('Sỏi trắng', 'White gravel', '#efe6d2', 'gravel')];
const PLANKS = [s('Gỗ mật ong', 'Honey wood', '#d9a76a'), s('Gỗ xám biển', 'Driftwood', '#b9b2a6'), s('Gỗ trắng', 'White wood', '#efe8da')];
const BENCH = [s('Gỗ', 'Wood', '#b07a48'), s('Sắt trắng', 'White iron', '#f2f0ea'), s('Xanh lá', 'Green', '#5f9a5f')];
const LAMP = [s('Đồng thau', 'Brass', '#d0a447'), s('Đen cổ điển', 'Classic black', '#3d3a44'), s('Xanh bạc hà', 'Mint', '#7fcfb5')];
const AWN = [s('Sọc đỏ', 'Red stripes', '#e0533f'), s('Sọc xanh', 'Blue stripes', '#4f86c6'), s('Sọc vàng', 'Yellow stripes', '#f0b73a')];
const FLOWERS = [s('Hoa hồng', 'Roses', '#e9506f'), s('Tulip', 'Tulips', '#f39a3a'), s('Oải hương', 'Lavender', '#9b7fd6')];
const FENCE = [s('Trắng', 'White picket', '#f6f3ea'), s('Gỗ mộc', 'Rustic wood', '#b07a48'), s('Xanh biển', 'Sea blue', '#6f9fd8')];
const TREES = [s('Cây táo', 'Apple tree', '#e24b3f'), s('Anh đào', 'Cherry blossom', '#f6a7c4'), s('Cây chanh', 'Lemon tree', '#f2d33c')];
const CANOPY = [s('Đỏ trắng', 'Red & white', '#e0533f'), s('Xanh lá', 'Leaf green', '#5fb05a'), s('Tím', 'Violet', '#9b6fd0')];

export const AREAS: Area[] = [
  {
    id: 'cottage', name: { vi: 'Nhà của Mochi', en: "Mochi's Cottage" }, x: 1150, y: 2290, r: 230,
    tasks: [
      T('cottage_path', 'paving', 1, 'Lát sân trước', 'Pave the front yard', [0, 40], 420, PAVE, { a: 125, b: 85 }),
      T('cottage_house', 'house', 3, 'Sửa căn nhà nhỏ', 'Fix up the cottage', [-30, -35], 250, [
        s('Kem & ngói đỏ', 'Cream & red tiles', '#f6e7c8', '#d4553e'), s('Xanh & trắng', 'Blue & white', '#bfe0f2', '#3f6fa8'), s('Hồng đào', 'Peach & plum', '#f6c9b4', '#8d5a9e')],
      { a: 62, b: 48, h: 62, rh: 54, chimney: 1 }),
      T('cottage_garden', 'vegpatch', 1, 'Trồng luống rau', 'Plant a veggie patch', [135, -15], 150, [
        s('Cà rốt', 'Carrots', '#f08a2c'), s('Bí ngô', 'Pumpkins', '#f2a33a'), s('Dâu tây', 'Strawberries', '#e0405a')], { a: 46, b: 30 }),
      T('cottage_mailbox', 'mailbox', 1, 'Dựng hòm thư', 'Put up a mailbox', [118, 70], 40, [
        s('Đỏ', 'Red', '#d9473b'), s('Xanh dương', 'Blue', '#4878c0'), s('Vàng', 'Yellow', '#efb93a')]),
      T('cottage_fence', 'fence', 1, 'Dựng hàng rào', 'Build a fence', [-205, 60], 260, FENCE, { len: 150, dir: 'u' }),
      T('cottage_tree', 'tree', 2, 'Trồng cây ăn quả', 'Plant a fruit tree', [-150, 15], 120, TREES),
      T('cottage_bench', 'bench', 1, 'Đặt ghế dài', 'Place a bench', [45, 100], 80, BENCH),
      T('cottage_lamp', 'lamp', 1, 'Lắp đèn vườn', 'Add a garden lamp', [-80, 112], 30, LAMP),
    ],
  },
  {
    id: 'bakery', name: { vi: 'Tiệm bánh', en: 'Bakery' }, x: 770, y: 2110, r: 230,
    tasks: [
      T('bakery_square', 'paving', 1, 'Lát quảng trường', 'Pave the square', [0, 40], 440, PAVE, { a: 130, b: 90 }),
      T('bakery_shop', 'house', 3, 'Sửa tiệm bánh', 'Restore the bakery', [-10, -40], 260, [
        s('Kem bơ', 'Butter cream', '#fbe6b0', '#c9573a'), s('Bạc hà', 'Mint', '#c5ead7', '#5c7f5a'), s('Hồng dâu', 'Strawberry', '#f7c6cf', '#a8475b')],
      { a: 70, b: 50, h: 74, rh: 44, chimney: 1, shop: 1 }),
      T('bakery_awning', 'awning', 1, 'Căng mái hiên', 'Hang the awning', [0, 0], 120, AWN, { on: 'bakery_shop' }),
      T('bakery_sign', 'sign', 1, 'Treo biển ổ bánh', 'Hang a bread sign', [0, 0], 40, [
        s('Vàng kim', 'Gold', '#e8b740'), s('Gỗ', 'Wood', '#b07a48'), s('Hồng', 'Pink', '#ef8fa8')], { on: 'bakery_shop', icon: 'bread' }),
      T('bakery_tables', 'tables', 2, 'Kê bàn ngoài trời', 'Set out tables', [120, 70], 120, [
        s('Ô đỏ', 'Red parasols', '#e0533f'), s('Ô xanh', 'Blue parasols', '#4f86c6'), s('Ô vàng', 'Yellow parasols', '#f0b73a')]),
      T('bakery_cart', 'cart', 2, 'Sửa xe bánh mì', 'Fix the bread cart', [-140, 70], 100, [
        s('Xanh ngọc', 'Teal', '#3fa7a0'), s('Đỏ cherry', 'Cherry', '#d9473b'), s('Kem', 'Cream', '#f3e3c0')]),
      T('bakery_planters', 'planters', 1, 'Đặt bồn hoa', 'Add flower boxes', [40, 125], 110, FLOWERS),
      T('bakery_lamp', 'lamp', 1, 'Lắp đèn đường', 'Add a street lamp', [175, 5], 30, LAMP),
    ],
  },
  {
    id: 'beach', name: { vi: 'Bãi biển', en: 'Beach' }, x: 420, y: 2370, r: 240,
    tasks: [
      T('beach_clean', 'sand', 1, 'Dọn sạch bãi cát', 'Clean up the sand', [0, 30], 440, [], { a: 140, b: 95 }),
      T('beach_huts', 'huts', 3, 'Sơn chòi tắm biển', 'Paint the beach huts', [-40, -70], 230, [
        s('Màu kẹo', 'Candy colors', '#f6a7c4', '#7fc8e8'), s('Sọc xanh', 'Navy stripes', '#4b6ea8', '#f3efe6'), s('Nắng vàng', 'Sunshine', '#f6cf4a', '#f08a5a')]),
      T('beach_umbrellas', 'umbrellas', 1, 'Cắm ô che nắng', 'Put up parasols', [70, 25], 150, AWN),
      T('beach_loungers', 'loungers', 1, 'Đặt ghế tắm nắng', 'Add sun loungers', [95, 95], 120, [
        s('Xanh ngọc', 'Turquoise', '#46b8c4'), s('Cam san hô', 'Coral', '#f0806a'), s('Trắng', 'White', '#f3efe6')]),
      T('beach_lifeguard', 'lifeguard', 2, 'Dựng chòi cứu hộ', 'Build a lifeguard tower', [-165, 25], 90, [
        s('Đỏ', 'Red', '#d9473b'), s('Vàng', 'Yellow', '#efb93a'), s('Xanh', 'Blue', '#4878c0')]),
      T('beach_palms', 'palms', 2, 'Trồng hàng dừa', 'Plant palm trees', [160, -45], 140, [
        s('Dừa xanh', 'Green palms', '#5aa84e'), s('Dừa có võng', 'With hammock', '#5aa84e', '#f08a5a'), s('Dừa đèn lồng', 'With lanterns', '#5aa84e', '#ffd27a')], { pts: [[0, 0], [-60, 40]] }),
      T('beach_volley', 'volley', 1, 'Căng lưới bóng chuyền', 'Set up volleyball', [-40, 115], 140, [
        s('Lưới trắng', 'White net', '#f3efe6'), s('Lưới xanh', 'Blue net', '#4f86c6'), s('Lưới cam', 'Orange net', '#f08a3c')]),
      T('beach_castle', 'castle', 1, 'Xây lâu đài cát', 'Build a sandcastle', [60, 160], 70, [
        s('Cờ đỏ', 'Red flag', '#e0533f'), s('Cờ xanh', 'Blue flag', '#4f86c6'), s('Cờ hồng', 'Pink flag', '#ef8fa8')]),
    ],
  },
  {
    id: 'cafe', name: { vi: 'Quán cà phê', en: 'Café' }, x: 1180, y: 1880, r: 230,
    tasks: [
      T('cafe_terrace', 'paving', 1, 'Lót sàn hiên gỗ', 'Lay a wooden terrace', [10, 40], 420, PLANKS.map((x) => ({ ...x, alt: 'planks' })), { a: 125, b: 85 }),
      T('cafe_building', 'house', 3, 'Sửa quán cà phê', 'Restore the café', [-20, -45], 250, [
        s('Xanh ngọc', 'Turquoise', '#9fd6cf', '#3c6e8f'), s('Vàng chanh', 'Lemon', '#f9e48f', '#d0663f'), s('Trắng & đen', 'White & black', '#f3efe6', '#4b4f5a')],
      { a: 66, b: 50, h: 70, rh: 40, shop: 1 }),
      T('cafe_awning', 'awning', 1, 'Căng mái hiên', 'Hang the awning', [0, 0], 120, AWN, { on: 'cafe_building' }),
      T('cafe_sign', 'sign', 1, 'Treo biển tách cà phê', 'Hang a coffee sign', [0, 0], 40, [
        s('Nâu', 'Brown', '#8a5a35'), s('Trắng', 'White', '#f3efe6'), s('Đỏ', 'Red', '#d9473b')], { on: 'cafe_building', icon: 'cup' }),
      T('cafe_tables', 'tables', 2, 'Kê bàn cà phê', 'Set out café tables', [95, 60], 120, CANOPY),
      T('cafe_lights', 'lights', 1, 'Giăng đèn dây', 'String up lights', [80, 0], 200, [
        s('Vàng ấm', 'Warm', '#ffd27a'), s('Sắc màu', 'Colorful', '#ff7fa8'), s('Trắng', 'White', '#fff6e0')], { len: 120 }),
      T('cafe_menu', 'menu', 1, 'Đặt bảng thực đơn', 'Add a menu board', [-115, 85], 40, [
        s('Bảng đen', 'Chalkboard', '#3d4a45'), s('Bảng xanh', 'Green board', '#3e6b52'), s('Gỗ', 'Wood', '#b07a48')]),
      T('cafe_bikes', 'bikes', 1, 'Dựng giá xe đạp', 'Add a bike rack', [-175, 20], 90, [
        s('Đỏ', 'Red', '#d9473b'), s('Xanh mint', 'Mint', '#6fcab0'), s('Vàng', 'Yellow', '#efb93a')]),
    ],
  },
  {
    id: 'park', name: { vi: 'Công viên hoa', en: 'Flower Park' }, x: 760, y: 1700, r: 250,
    tasks: [
      T('park_lawn', 'paving', 1, 'Trồng thảm cỏ', 'Lay the lawn', [0, 30], 470, [
        s('Cỏ xanh', 'Green grass', '#8fd16a', 'lawn'), s('Cỏ đậm', 'Deep green', '#6cb85a', 'lawn'), s('Cỏ hoa dại', 'Wildflowers', '#a6d872', 'lawn')], { a: 145, b: 100 }),
      T('park_paths', 'paths', 1, 'Lát đường đi bộ', 'Lay the walkways', [0, 30], 400, PAVE, { a: 145, b: 100 }),
      T('park_fountain', 'fountain', 3, 'Xây đài phun nước', 'Build a fountain', [0, 38], 130, [
        s('Đá trắng', 'White stone', '#eeeae0'), s('Đá xanh', 'Blue stone', '#9cbfd6'), s('Đồng cổ', 'Bronze', '#b08850')]),
      T('park_flowers', 'flowerbed', 2, 'Trồng luống hoa', 'Plant flower beds', [-120, 0], 120, FLOWERS, { pts: [[0, 0], [235, 55]] }),
      T('park_gazebo', 'gazebo', 3, 'Dựng chòi nghỉ', 'Build a gazebo', [95, -70], 140, [
        s('Trắng', 'White', '#f6f3ea', '#e0533f'), s('Xanh lá', 'Green', '#e9f2e0', '#4f8f5a'), s('Mái đỏ', 'Red roof', '#f6e7c8', '#b8423a')]),
      T('park_trees', 'trees', 2, 'Trồng thêm cây', 'Plant trees', [-150, -60], 140, [
        s('Anh đào', 'Cherry blossom', '#f6a7c4'), s('Cây phong', 'Maple', '#e8823a'), s('Sồi xanh', 'Oak', '#5aa84e')], { pts: [[0, 0], [70, -40], [290, 130]] }),
      T('park_benches', 'bench', 1, 'Đặt ghế công viên', 'Place park benches', [-70, 110], 80, BENCH),
      T('park_lamps', 'lamp', 1, 'Lắp đèn công viên', 'Add park lamps', [80, 120], 30, LAMP),
    ],
  },
  {
    id: 'market', name: { vi: 'Phố chợ', en: 'Market Street' }, x: 1170, y: 1440, r: 250,
    tasks: [
      T('market_street', 'paving', 1, 'Lát phố chợ', 'Pave the street', [0, 40], 460, PAVE, { a: 150, b: 80 }),
      T('market_shops', 'house', 3, 'Sửa dãy cửa hàng', 'Restore the shop row', [-15, -55], 300, [
        s('Kem & cam', 'Cream & orange', '#f6e7c8', '#e07a3a'), s('Hồng & xanh', 'Pink & teal', '#f6c9cf', '#3f8f8a'), s('Xanh & đỏ', 'Blue & red', '#c3dcef', '#c8483a')],
      { a: 105, b: 42, h: 78, rh: 36, shop: 1, chimney: 1 }),
      T('market_fruit', 'stall', 2, 'Dựng sạp trái cây', 'Build a fruit stall', [-120, 25], 100, CANOPY, { goods: 'fruit' }),
      T('market_fish', 'stall', 2, 'Dựng sạp hải sản', 'Build a fish stall', [10, 70], 100, [
        s('Xanh biển', 'Sea blue', '#4f86c6'), s('Xanh ngọc', 'Teal', '#3fa7a0'), s('Trắng', 'White', '#f3efe6')], { goods: 'fish' }),
      T('market_flowers', 'stall', 2, 'Dựng sạp hoa', 'Build a flower stall', [130, 35], 100, [
        s('Hồng', 'Pink', '#ef8fa8'), s('Vàng', 'Yellow', '#f0b73a'), s('Tím', 'Violet', '#9b6fd0')], { goods: 'flowers' }),
      T('market_bunting', 'bunting', 1, 'Treo cờ dây', 'Hang bunting', [0, 10], 300, [
        s('Sắc màu', 'Rainbow', '#ff7fa8'), s('Xanh trắng', 'Blue & white', '#4f86c6'), s('Đỏ vàng', 'Red & gold', '#e0533f')], { len: 170 }),
      T('market_crates', 'crates', 1, 'Xếp thùng hàng', 'Stack the crates', [-180, 95], 80, [
        s('Táo', 'Apples', '#e24b3f'), s('Cam', 'Oranges', '#f39a3a'), s('Bắp cải', 'Cabbages', '#8fd16a')]),
      T('market_clock', 'clock', 2, 'Dựng cột đồng hồ', 'Raise the street clock', [175, 95], 40, [
        s('Xanh rêu', 'Moss green', '#4f7f5a'), s('Đen', 'Black', '#3d3a44'), s('Vàng đồng', 'Brass', '#d0a447')]),
    ],
  },
  {
    id: 'pier', name: { vi: 'Bến tàu', en: 'Pier & Boats' }, x: 360, y: 1560, r: 250,
    tasks: [
      T('pier_deck', 'pier', 2, 'Sửa cầu tàu', 'Repair the pier', [40, 0], 360, PLANKS, { a: 32, b: 150 }),
      T('pier_shed', 'house', 3, 'Sửa nhà thuyền', 'Fix the boathouse', [215, -125], 220, [
        s('Đỏ nhà kho', 'Barn red', '#c8574a', '#f3efe6'), s('Xanh biển', 'Sea blue', '#5d8fc4', '#f3efe6'), s('Vàng cát', 'Sand', '#ecd39a', '#5d6b7a')],
      { a: 50, b: 46, h: 56, rh: 44, face: 'R' }),
      T('pier_sailboat', 'boat', 2, 'Sửa thuyền buồm', 'Fix the sailboat', [-90, -60], 120, [
        s('Buồm trắng', 'White sails', '#f3efe6', '#3f6fa8'), s('Buồm đỏ', 'Red sails', '#e0533f', '#f3efe6'), s('Buồm sọc', 'Striped sails', '#f0b73a', '#4f86c6')], { sail: 1 }),
      T('pier_fishboat', 'boat', 2, 'Sửa thuyền đánh cá', 'Fix the fishing boat', [-40, 125], 120, [
        s('Xanh lá', 'Green', '#4f9a5f', '#f3efe6'), s('Cam', 'Orange', '#f08a3c', '#f3efe6'), s('Xanh navy', 'Navy', '#35507a', '#f3d36b')]),
      T('pier_lamps', 'lamps', 1, 'Lắp đèn cầu tàu', 'Light the pier', [40, 0], 260, LAMP, { pts: [[118, -34], [28, 12], [-62, 58]] }),
      T('pier_nets', 'nets', 1, 'Phơi lưới cá', 'Hang the fishing nets', [210, 25], 90, [
        s('Lưới nâu', 'Brown nets', '#9a7a52'), s('Lưới xanh', 'Green nets', '#5f9a7a'), s('Lưới cam', 'Orange nets', '#e08a4a')]),
      T('pier_buoys', 'buoys', 1, 'Thả phao', 'Float the buoys', [-170, 30], 120, [
        s('Đỏ trắng', 'Red & white', '#e0533f'), s('Vàng', 'Yellow', '#f0b73a'), s('Cam', 'Orange', '#f08a3c')]),
      T('pier_kiosk', 'kiosk', 2, 'Mở quầy kem', 'Open an ice-cream kiosk', [250, -30], 80, [
        s('Hồng dâu', 'Strawberry', '#f6a7c4'), s('Bạc hà', 'Mint', '#9fe0c8'), s('Vani', 'Vanilla', '#f8e7b0')]),
    ],
  },
  {
    id: 'books', name: { vi: 'Hiệu sách', en: 'Bookshop' }, x: 790, y: 1250, r: 230,
    tasks: [
      T('books_yard', 'paving', 1, 'Lát sân', 'Pave the yard', [0, 40], 420, PAVE, { a: 125, b: 85 }),
      T('books_shop', 'house', 3, 'Sửa hiệu sách', 'Restore the bookshop', [-10, -45], 240, [
        s('Xanh rêu', 'Sage', '#bcd3b0', '#7a4a3a'), s('Đỏ gạch', 'Brick red', '#d98c74', '#4b4f5a'), s('Tím oải hương', 'Lavender', '#d6c8ea', '#5c4a8a')],
      { a: 58, b: 52, h: 96, rh: 50, shop: 1, chimney: 1 }),
      T('books_sign', 'sign', 1, 'Treo biển cuốn sách', 'Hang a book sign', [0, 0], 40, [
        s('Đỏ', 'Red', '#d9473b'), s('Xanh', 'Blue', '#4878c0'), s('Xanh lá', 'Green', '#4f9a5f')], { on: 'books_shop', icon: 'book' }),
      T('books_cart', 'bookcart', 1, 'Đặt xe sách', 'Add a book cart', [110, 60], 80, [
        s('Gỗ', 'Wood', '#b07a48'), s('Xanh', 'Blue', '#4f86c6'), s('Đỏ', 'Red', '#d9473b')]),
      T('books_tree', 'tree', 2, 'Trồng cây sồi', 'Plant a shady oak', [-160, 10], 140, [
        s('Sồi xanh', 'Green oak', '#5aa84e'), s('Phong đỏ', 'Red maple', '#e8823a'), s('Bạch dương', 'Birch', '#a6d872')], { big: 1 }),
      T('books_bench', 'bench', 1, 'Đặt ghế đọc sách', 'Place a reading bench', [-60, 105], 80, BENCH),
      T('books_statue', 'statue', 2, 'Dựng tượng mèo', 'Raise a cat statue', [95, 125], 60, [
        s('Đá trắng', 'Marble', '#efebe2'), s('Đồng', 'Bronze', '#b08850'), s('Vàng', 'Gold', '#e8c040')]),
      T('books_lamp', 'lamp', 1, 'Lắp đèn đọc sách', 'Add a lamp post', [175, 20], 30, LAMP),
    ],
  },
  {
    id: 'hill', name: { vi: 'Đồi gió', en: 'Windy Hill' }, x: 1150, y: 960, r: 250,
    tasks: [
      T('hill_path', 'paving', 1, 'Làm lối lên đồi', 'Make a hill path', [0, 50], 380, PAVE, { a: 115, b: 75 }),
      T('hill_windmill', 'windmill', 3, 'Sửa cối xay gió', 'Fix the windmill', [-30, -55], 180, [
        s('Trắng & đỏ', 'White & red', '#f6f3ea', '#c8483a'), s('Xanh & trắng', 'Blue & white', '#c3dcef', '#3f6fa8'), s('Kem & xanh lá', 'Cream & green', '#f6e7c8', '#4f8f5a')]),
      T('hill_picnic', 'picnic', 1, 'Trải khăn dã ngoại', 'Lay a picnic blanket', [110, 60], 110, [
        s('Caro đỏ', 'Red gingham', '#e0533f'), s('Caro xanh', 'Blue gingham', '#4f86c6'), s('Caro vàng', 'Yellow gingham', '#f0b73a')]),
      T('hill_telescope', 'telescope', 1, 'Đặt kính viễn vọng', 'Set up a telescope', [-150, 70], 50, [
        s('Đồng', 'Brass', '#d0a447'), s('Trắng', 'White', '#f3efe6'), s('Xanh', 'Blue', '#4878c0')]),
      T('hill_kites', 'kites', 1, 'Thả diều', 'Fly kites', [150, -40], 120, [
        s('Diều cá', 'Fish kite', '#f08a3c'), s('Diều tim', 'Heart kite', '#e9506f'), s('Diều sao', 'Star kite', '#f0c03a')]),
      T('hill_trees', 'trees', 2, 'Trồng rừng thông', 'Plant pine trees', [170, 30], 140, [
        s('Thông xanh', 'Green pines', '#4f8f5a'), s('Thông tuyết', 'Snowy pines', '#6f9f7a'), s('Bạch dương', 'Birches', '#a6d872')], { pts: [[0, 0], [45, 30], [-345, -40]], pine: 1 }),
      T('hill_flowers', 'flowerbed', 1, 'Gieo hoa dại', 'Sow wildflowers', [-120, 0], 110, FLOWERS, { pts: [[0, 0]] }),
      T('hill_swing', 'swing', 2, 'Treo xích đu', 'Hang a swing', [20, 115], 90, [
        s('Gỗ', 'Wood', '#b07a48'), s('Đỏ', 'Red', '#d9473b'), s('Xanh', 'Blue', '#4878c0')]),
    ],
  },
  {
    id: 'lighthouse', name: { vi: 'Ngọn hải đăng', en: 'Lighthouse' }, x: 440, y: 700, r: 250,
    tasks: [
      T('light_path', 'paving', 1, 'Lát lối đi đá', 'Pave a stone path', [20, 40], 380, PAVE, { a: 115, b: 80 }),
      T('light_tower', 'lighthouse', 3, 'Sơn ngọn hải đăng', 'Paint the lighthouse', [-70, -40], 110, [
        s('Sọc đỏ', 'Red stripes', '#f6f3ea', '#d9473b'), s('Sọc xanh', 'Blue stripes', '#f6f3ea', '#3f6fa8'), s('Sọc đen', 'Black stripes', '#f6f3ea', '#3d3a44')]),
      T('light_beacon', 'beacon', 2, 'Thắp đèn hải đăng', 'Light the beacon', [-70, -40], 60, [
        s('Vàng ấm', 'Warm gold', '#ffd25a'), s('Trắng', 'White', '#fff6e0'), s('Hồng', 'Pink', '#ff9fb8')]),
      T('light_cottage', 'house', 3, 'Sửa nhà người gác', "Fix the keeper's house", [90, -35], 200, [
        s('Trắng & xanh', 'White & blue', '#f6f3ea', '#3f6fa8'), s('Vàng & đỏ', 'Yellow & red', '#f9e48f', '#c8483a'), s('Xám & xanh lá', 'Grey & green', '#d6d3cc', '#4f8f5a')],
      { a: 50, b: 42, h: 54, rh: 44, chimney: 1, face: 'R' }),
      T('light_fence', 'fence', 1, 'Dựng rào bờ vực', 'Fence the cliff edge', [-200, 40], 240, FENCE, { len: 140, dir: 'v' }),
      T('light_bench', 'bench', 1, 'Đặt ghế ngắm biển', 'Place a sea-view bench', [-50, 110], 80, BENCH),
      T('light_flag', 'flag', 1, 'Kéo cờ', 'Raise a flag', [190, 60], 50, [
        s('Cờ cá', 'Fish flag', '#4f86c6'), s('Cờ mèo', 'Cat flag', '#f08a3c'), s('Cờ sao', 'Star flag', '#e0533f')]),
      T('light_garden', 'flowerbed', 1, 'Trồng vườn hoa', 'Plant a flower garden', [70, 95], 110, FLOWERS, { pts: [[0, 0]] }),
    ],
  },
];

export const TASKS: TownTask[] = AREAS.flatMap((a) => a.tasks);
export const taskById = new Map(TASKS.map((t) => [t.id, t]));
export const areaOf = new Map(AREAS.flatMap((a) => a.tasks.map((t) => [t.id, a] as const)));

export function areaTotalCost(area: Area): number {
  return area.tasks.reduce((sum, t) => sum + t.cost, 0);
}
