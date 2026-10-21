// Room renovation data. Art for each `item` lives in roomArt.ts.

export interface L10n { vi: string; en: string }

export interface StyleOption { name: L10n; swatch: string }

export interface RoomTask {
  id: string;
  item: string;
  title: L10n;
  cost: number;
  styles: StyleOption[];
}

export interface Room {
  id: string;
  name: L10n;
  tasks: RoomTask[];
}

const s = (vi: string, en: string, swatch: string): StyleOption => ({ name: { vi, en }, swatch });

export const ROOMS: Room[] = [
  {
    id: 'living',
    name: { vi: 'Phòng khách', en: 'Living Room' },
    tasks: [
      { id: 'living_floor', item: 'floor', cost: 1, title: { vi: 'Lau sàn gỗ', en: 'Polish the floor' },
        styles: [s('Gỗ sồi', 'Oak', '#c8955c'), s('Gỗ óc chó', 'Walnut', '#7a4a2c'), s('Gỗ trắng', 'White wood', '#e8dccb')] },
      { id: 'living_wall', item: 'wallpaper', cost: 1, title: { vi: 'Dán giấy tường', en: 'Hang wallpaper' },
        styles: [s('Kem sọc', 'Cream stripes', '#f3e3c3'), s('Bạc hà hoa', 'Mint floral', '#bfe3d0'), s('Hồng phấn', 'Dusty rose', '#e9c2c5')] },
      { id: 'living_window', item: 'window', cost: 1, title: { vi: 'Sửa cửa sổ & rèm', en: 'Fix window & curtains' },
        styles: [s('Rèm đỏ rượu', 'Burgundy', '#9b2f3f'), s('Rèm xanh biển', 'Navy', '#2d4a7a'), s('Rèm vàng nắng', 'Sunny', '#e8b33c')] },
      { id: 'living_sofa', item: 'sofa', cost: 2, title: { vi: 'Đặt ghế sofa', en: 'Place a sofa' },
        styles: [s('Nhung xanh ngọc', 'Teal velvet', '#2a8c8c'), s('Vàng mù tạt', 'Mustard', '#d9a52b'), s('Xám êm', 'Soft gray', '#8e939b')] },
      { id: 'living_rug', item: 'rug', cost: 1, title: { vi: 'Trải thảm', en: 'Lay a rug' },
        styles: [s('Ba Tư', 'Persian', '#a33b3b'), s('Tròn xanh', 'Round blue', '#4f7fbf'), s('Kẻ caro', 'Checkered', '#d8c08a')] },
      { id: 'living_table', item: 'table', cost: 2, title: { vi: 'Kê bàn trà', en: 'Add a coffee table' },
        styles: [s('Gỗ mộc', 'Rustic', '#9a6a3f'), s('Kính hiện đại', 'Glass', '#9fd4e6'), s('Đá cẩm thạch', 'Marble', '#ececec')] },
      { id: 'living_lamp', item: 'lamp', cost: 1, title: { vi: 'Đặt đèn cây', en: 'Add a floor lamp' },
        styles: [s('Chụp kem', 'Cream shade', '#f4e2b8'), s('Đồng thau', 'Brass', '#c9a24b'), s('Đen tối giản', 'Black', '#333333')] },
      { id: 'living_plant', item: 'plant', cost: 1, title: { vi: 'Thêm chậu cây', en: 'Add a plant' },
        styles: [s('Trầu bà', 'Monstera', '#3f8f4f'), s('Xương rồng', 'Cactus', '#6aa84f'), s('Cây cọ', 'Palm', '#2e7d5b')] },
      { id: 'living_painting', item: 'painting', cost: 2, title: { vi: 'Treo tranh', en: 'Hang a painting' },
        styles: [s('Phong cảnh', 'Landscape', '#7fb2d9'), s('Hoa hướng dương', 'Sunflowers', '#f2c335'), s('Chân dung mèo', 'Cat portrait', '#e59a6b')] },
      { id: 'living_shelf', item: 'bookshelf', cost: 2, title: { vi: 'Đóng kệ sách', en: 'Build a bookshelf' },
        styles: [s('Gỗ nâu', 'Brown wood', '#8a5a35'), s('Trắng', 'White', '#f0ede6'), s('Xanh rêu', 'Sage', '#8fa98a')] },
    ],
  },
  {
    id: 'kitchen',
    name: { vi: 'Nhà bếp', en: 'Kitchen' },
    tasks: [
      { id: 'kitchen_tiles', item: 'tiles', cost: 1, title: { vi: 'Lát gạch sàn', en: 'Tile the floor' },
        styles: [s('Caro đen trắng', 'Checkered', '#d9d9d9'), s('Gạch bông', 'Patterned', '#5b8bb5'), s('Đất nung', 'Terracotta', '#c66b47')] },
      { id: 'kitchen_wall', item: 'backsplash', cost: 1, title: { vi: 'Ốp tường bếp', en: 'Add a backsplash' },
        styles: [s('Trắng metro', 'Subway white', '#f4f4f0'), s('Xanh men', 'Glazed teal', '#5fb3b3'), s('Vàng chanh', 'Lemon', '#f1d36b')] },
      { id: 'kitchen_cabinets', item: 'cabinets', cost: 2, title: { vi: 'Lắp tủ bếp', en: 'Install cabinets' },
        styles: [s('Gỗ sáng', 'Light wood', '#d6aa73'), s('Xanh navy', 'Navy', '#2f4868'), s('Xanh pastel', 'Pastel', '#a9d3c4')] },
      { id: 'kitchen_stove', item: 'stove', cost: 2, title: { vi: 'Đặt bếp nấu', en: 'Place the stove' },
        styles: [s('Cổ điển đỏ', 'Retro red', '#c8423b'), s('Inox', 'Steel', '#b8bec6'), s('Kem', 'Cream', '#efe2c2')] },
      { id: 'kitchen_fridge', item: 'fridge', cost: 2, title: { vi: 'Mua tủ lạnh', en: 'Get a fridge' },
        styles: [s('Xanh bạc hà', 'Mint', '#a8dcc8'), s('Trắng', 'White', '#f5f5f5'), s('Hồng retro', 'Retro pink', '#f2a7b5')] },
      { id: 'kitchen_table', item: 'dining', cost: 2, title: { vi: 'Bàn ăn', en: 'Dining table' },
        styles: [s('Gỗ tròn', 'Round wood', '#a87447'), s('Trắng vuông', 'White square', '#f0eee8'), s('Đen sắt', 'Iron', '#3a3a3a')] },
      { id: 'kitchen_window', item: 'window', cost: 1, title: { vi: 'Sửa cửa sổ', en: 'Fix the window' },
        styles: [s('Rèm caro đỏ', 'Red gingham', '#d24b4b'), s('Rèm vàng', 'Yellow', '#f0c64a'), s('Rèm xanh lá', 'Green', '#6fb56f')] },
      { id: 'kitchen_lights', item: 'lights', cost: 1, title: { vi: 'Treo đèn', en: 'Hang lights' },
        styles: [s('Đồng', 'Copper', '#c27a46'), s('Đen công nghiệp', 'Industrial', '#2e2e2e'), s('Mây tre', 'Rattan', '#d8b47a')] },
      { id: 'kitchen_shelf', item: 'shelf', cost: 1, title: { vi: 'Kệ gia vị', en: 'Spice shelf' },
        styles: [s('Gỗ', 'Wood', '#a5713f'), s('Trắng', 'White', '#efefef'), s('Xanh', 'Green', '#7fa87a')] },
    ],
  },
  {
    id: 'garden',
    name: { vi: 'Khu vườn', en: 'Garden' },
    tasks: [
      { id: 'garden_lawn', item: 'lawn', cost: 1, title: { vi: 'Trồng cỏ', en: 'Plant the lawn' },
        styles: [s('Cỏ xanh', 'Green grass', '#6cbf4f'), s('Cỏ đậm', 'Deep green', '#3f9a45'), s('Cỏ hoa dại', 'Wildflower', '#9ccc65')] },
      { id: 'garden_fence', item: 'fence', cost: 1, title: { vi: 'Dựng hàng rào', en: 'Build a fence' },
        styles: [s('Trắng', 'White picket', '#f7f7f2'), s('Gỗ mộc', 'Wood', '#a0703f'), s('Xanh dương', 'Blue', '#6f9fd8')] },
      { id: 'garden_path', item: 'path', cost: 1, title: { vi: 'Lát lối đi', en: 'Lay a path' },
        styles: [s('Đá xám', 'Gray stone', '#a7a7a7'), s('Gạch đỏ', 'Red brick', '#b5553b'), s('Sỏi', 'Pebbles', '#d8cbb0')] },
      { id: 'garden_fountain', item: 'fountain', cost: 2, title: { vi: 'Xây đài phun nước', en: 'Build a fountain' },
        styles: [s('Đá trắng', 'White stone', '#e9e6df'), s('Đá xanh', 'Blue stone', '#8fb3c9'), s('Đồng cổ', 'Bronze', '#9b7a4a')] },
      { id: 'garden_bench', item: 'bench', cost: 2, title: { vi: 'Đặt ghế dài', en: 'Place a bench' },
        styles: [s('Gỗ', 'Wood', '#a06a3c'), s('Sắt trắng', 'White iron', '#f2f2f2'), s('Xanh lá', 'Green', '#4f8f5a')] },
      { id: 'garden_flowers', item: 'flowers', cost: 1, title: { vi: 'Trồng hoa', en: 'Plant flowers' },
        styles: [s('Hồng', 'Roses', '#e05a7a'), s('Tulip', 'Tulips', '#f08a3c'), s('Oải hương', 'Lavender', '#9b7fd1')] },
      { id: 'garden_tree', item: 'tree', cost: 2, title: { vi: 'Trồng cây', en: 'Plant a tree' },
        styles: [s('Cây táo', 'Apple tree', '#d84b3f'), s('Anh đào', 'Cherry blossom', '#f4a6c0'), s('Cây phong', 'Maple', '#e07b2f')] },
      { id: 'garden_swing', item: 'swing', cost: 2, title: { vi: 'Làm xích đu', en: 'Hang a swing' },
        styles: [s('Gỗ', 'Wood', '#9a6a3f'), s('Mây', 'Rattan', '#d9b27a'), s('Đỏ', 'Red', '#c94a4a')] },
      { id: 'garden_lanterns', item: 'lanterns', cost: 1, title: { vi: 'Treo đèn lồng', en: 'String lanterns' },
        styles: [s('Vàng ấm', 'Warm', '#ffd27a'), s('Sắc màu', 'Colorful', '#ff7fa8'), s('Trắng', 'White', '#fff6e0')] },
    ],
  },
];

export function roomTotalCost(room: Room): number {
  return room.tasks.reduce((sum, t) => sum + t.cost, 0);
}
