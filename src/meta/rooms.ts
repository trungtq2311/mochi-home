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
  {
    id: 'bedroom',
    name: { vi: 'Phòng ngủ', en: 'Bedroom' },
    tasks: [
      { id: 'bedroom_floor', item: 'floor', cost: 1, title: { vi: 'Làm mới sàn', en: 'Redo the floor' },
        styles: [s('Gỗ mật ong', 'Honey wood', '#d9a066'), s('Thảm tím nhạt', 'Lilac carpet', '#c7b3df'), s('Gỗ ghép ô', 'Parquet', '#a56f40')] },
      { id: 'bedroom_wall', item: 'wallpaper', cost: 1, title: { vi: 'Dán giấy tường', en: 'Hang wallpaper' },
        styles: [s('Tím chấm bi', 'Lavender dots', '#c9b6e4'), s('Mây trời', 'Sky clouds', '#bfe0f5'), s('Sọc đào', 'Peach stripes', '#f6c9a8')] },
      { id: 'bedroom_window', item: 'window', cost: 1, title: { vi: 'Sửa cửa sổ & rèm', en: 'Fix window & curtains' },
        styles: [s('Rèm tím cà', 'Lilac drapes', '#b59ad6'), s('Rèm cuốn bạc hà', 'Mint blind', '#9fd8c4'), s('Rèm cam quả bông', 'Pom-pom coral', '#f0956b')] },
      { id: 'bedroom_bed', item: 'bed', cost: 2, title: { vi: 'Kê giường ngủ', en: 'Set up the bed' },
        styles: [s('Chăn hồng chắp vá', 'Rose patchwork', '#e88fa3'), s('Nệm nhung xanh', 'Navy tufted', '#2f4868'), s('Giường sắt xanh lá', 'Sage & iron', '#8fb08a')] },
      { id: 'bedroom_nightstand', item: 'nightstand', cost: 1, title: { vi: 'Đặt tủ đầu giường', en: 'Add a nightstand' },
        styles: [s('Gỗ ấm', 'Warm wood', '#a5713f'), s('Trắng', 'White', '#f2efe8'), s('Xanh pastel', 'Pastel blue', '#9cc3e0')] },
      { id: 'bedroom_wardrobe', item: 'wardrobe', cost: 2, title: { vi: 'Lắp tủ quần áo', en: 'Build a wardrobe' },
        styles: [s('Gỗ sồi', 'Oak', '#c8955c'), s('Trắng gương', 'White mirror', '#f0ede6'), s('Bạc hà', 'Mint', '#a9d3c4')] },
      { id: 'bedroom_rug', item: 'rug', cost: 1, title: { vi: 'Trải thảm', en: 'Lay a rug' },
        styles: [s('Lông hồng', 'Fluffy pink', '#f2b8c6'), s('Sọc xanh', 'Blue stripes', '#6f9bd3'), s('Thổ cẩm', 'Moroccan', '#e8dcc0')] },
      { id: 'bedroom_garland', item: 'garland', cost: 1, title: { vi: 'Treo dây trang trí', en: 'Hang a garland' },
        styles: [s('Đèn đom đóm', 'Fairy lights', '#ffd27a'), s('Cờ đuôi nheo', 'Bunting', '#ff8fa8'), s('Sao giấy', 'Paper stars', '#9ec9ef')] },
      { id: 'bedroom_armchair', item: 'armchair', cost: 2, title: { vi: 'Đặt ghế bành', en: 'Add an armchair' },
        styles: [s('Nhung hồng', 'Pink velvet', '#e58fa0'), s('Ghế mây', 'Rattan', '#d8b47a'), s('Xanh rừng', 'Forest green', '#3f7a5a')] },
      { id: 'bedroom_catbed', item: 'catbed', cost: 1, title: { vi: 'Ổ ngủ cho Mochi', en: "Mochi's bed" },
        styles: [s('Bánh donut', 'Donut', '#f4a6c0'), s('Giỏ mây', 'Basket', '#c9a26b'), s('Lều nhỏ', 'Teepee', '#8fb3c9')] },
    ],
  },
  {
    id: 'bathroom',
    name: { vi: 'Phòng tắm', en: 'Bathroom' },
    tasks: [
      { id: 'bathroom_tiles', item: 'tiles', cost: 1, title: { vi: 'Lát gạch sàn', en: 'Tile the floor' },
        styles: [s('Lục giác trắng', 'White hexagon', '#f2f2ee'), s('Mosaic xanh', 'Blue mosaic', '#5f9fc9'), s('Đá mài', 'Terrazzo', '#e6d8c8')] },
      { id: 'bathroom_wall', item: 'walltiles', cost: 1, title: { vi: 'Ốp gạch tường', en: 'Tile the walls' },
        styles: [s('Gạch thẻ bạc hà', 'Mint subway', '#a8dcc8'), s('Gạch vuông hồng', 'Pink squares', '#f2b8c0'), s('Vảy cá xanh navy', 'Navy scales', '#2f4868')] },
      { id: 'bathroom_window', item: 'window', cost: 1, title: { vi: 'Sửa cửa sổ', en: 'Fix the window' },
        styles: [s('Rèm caro vàng', 'Café curtain', '#f2d16b'), s('Kính màu', 'Stained glass', '#7fb2d9'), s('Cửa chớp gỗ', 'Shutters', '#a5713f')] },
      { id: 'bathroom_bathtub', item: 'bathtub', cost: 2, title: { vi: 'Lắp bồn tắm', en: 'Install a bathtub' },
        styles: [s('Chân sư tử', 'Clawfoot', '#f5f5f2'), s('Hồng retro', 'Retro pink', '#f2a7b5'), s('Ốp gỗ', 'Wood panel', '#b07a4a')] },
      { id: 'bathroom_sink', item: 'sink', cost: 2, title: { vi: 'Lắp bồn rửa', en: 'Install a sink' },
        styles: [s('Tủ gỗ', 'Wood vanity', '#a87447'), s('Chân đứng', 'Pedestal', '#f5f5f2'), s('Tủ navy', 'Navy vanity', '#2f4868')] },
      { id: 'bathroom_mirror', item: 'mirror', cost: 2, title: { vi: 'Treo gương', en: 'Hang a mirror' },
        styles: [s('Tròn viền vàng', 'Round gold', '#c9a24b'), s('Vòm gỗ', 'Wooden arch', '#a5713f'), s('Gương đèn', 'Vanity bulbs', '#f2efe8')] },
      { id: 'bathroom_shelf', item: 'shelf', cost: 1, title: { vi: 'Gắn kệ', en: 'Put up a shelf' },
        styles: [s('Gỗ', 'Wood', '#a5713f'), s('Trắng hai tầng', 'White two-tier', '#f2f2ee'), s('Kính & đồng', 'Glass & brass', '#c9a24b')] },
      { id: 'bathroom_towels', item: 'towels', cost: 1, title: { vi: 'Treo khăn tắm', en: 'Hang towels' },
        styles: [s('Cam đào', 'Peach', '#f4b183'), s('Xanh ngọc', 'Aqua', '#7fc8d6'), s('Vàng chanh', 'Lemon', '#f2d16b')] },
      { id: 'bathroom_bathmat', item: 'bathmat', cost: 1, title: { vi: 'Trải thảm chùi chân', en: 'Add a bath mat' },
        styles: [s('Đám mây', 'Cloud', '#eef4fa'), s('Sọc san hô', 'Coral stripes', '#e88a6a'), s('Thanh gỗ', 'Teak slats', '#c08a56')] },
      { id: 'bathroom_plant', item: 'plant', cost: 1, title: { vi: 'Thêm chậu cây', en: 'Add a plant' },
        styles: [s('Dương xỉ', 'Fern', '#4f9a5a'), s('Lưỡi hổ', 'Snake plant', '#5f8f4a'), s('Lan ý', 'Peace lily', '#3f7a5a')] },
    ],
  },
];

export function roomTotalCost(room: Room): number {
  return room.tasks.reduce((sum, t) => sum + t.cost, 0);
}
