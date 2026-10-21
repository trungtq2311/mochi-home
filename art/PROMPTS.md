# Mochi Home — AI art prompts

Cách làm (khuyên dùng ChatGPT / GPT image vì xuất được nền trong suốt):

1. Mở một cuộc trò chuyện mới, dán **Style chung** bên dưới một lần và nói: "Use this exact art style for every image I ask for in this chat."
2. Với từng ảnh: copy prompt, tạo ảnh, tải về và lưu đúng **tên file** vào thư mục `art/raw/` (giữ nguyên thư mục con). PNG/JPG/WebP đều được.
3. Mỗi nhóm (ví dụ cả 4 kiểu của "sofa") nên tạo trong cùng một cuộc trò chuyện để giống nhau. Nếu ảnh không trong suốt, nền trắng phẳng là được — script tự xoá nền.
4. Chạy `npm run art` → ảnh được cắt, nén, đưa vào game. Chạy `npm run art:status` để xem còn thiếu ảnh nào.
5. Thiếu ảnh nào thì game dùng hình vẽ bằng code cho chỗ đó (phòng chỉ dùng ảnh khi đã có texture sàn `floor_0`/`tiles_0`/`lawn_0`).

Thứ tự nên làm: **Pieces** → **UI icons** → **Mascot** → **Room: Living Room** → các phòng khác.

## Style chung

```
Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

## Pieces

### `art/raw/pieces/red.png`

```
A glossy candy-like game piece for a match-3 puzzle, chunky and juicy, strong readable silhouette, bright specular highlight, subtle inner glow, thin darker outline, fills about 90% of the square frame. The piece is shaped like a plump heart, vivid ruby red. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/yellow.png`

```
A glossy candy-like game piece for a match-3 puzzle, chunky and juicy, strong readable silhouette, bright specular highlight, subtle inner glow, thin darker outline, fills about 90% of the square frame. The piece is shaped like a rounded five-pointed star, sunny golden yellow. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/blue.png`

```
A glossy candy-like game piece for a match-3 puzzle, chunky and juicy, strong readable silhouette, bright specular highlight, subtle inner glow, thin darker outline, fills about 90% of the square frame. The piece is shaped like a faceted cut diamond gem, sky blue. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/green.png`

```
A glossy candy-like game piece for a match-3 puzzle, chunky and juicy, strong readable silhouette, bright specular highlight, subtle inner glow, thin darker outline, fills about 90% of the square frame. The piece is shaped like a fresh leaf with a soft vein, lime green. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/purple.png`

```
A glossy candy-like game piece for a match-3 puzzle, chunky and juicy, strong readable silhouette, bright specular highlight, subtle inner glow, thin darker outline, fills about 90% of the square frame. The piece is shaped like a hexagonal amethyst crystal with facets, violet purple. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/orange.png`

```
A glossy candy-like game piece for a match-3 puzzle, chunky and juicy, strong readable silhouette, bright specular highlight, subtle inner glow, thin darker outline, fills about 90% of the square frame. The piece is shaped like a five-petal flower with a cream center, tangerine orange. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/rocket.png`

```
A horizontal double-headed firework rocket booster (pointed golden tips on both the left and the right end, red and white striped body, small blue fins in the middle), lying horizontally, match-3 game special piece, glossy and juicy, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/bomb.png`

```
A round cartoon bomb booster, dark navy glossy sphere with a metal cap and a short fuse with a bright spark, match-3 game special piece, glossy and juicy, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/plane.png`

```
A cute folded paper airplane booster, white and light-blue paper, pointing up-right, match-3 game special piece, glossy and juicy, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/disco.png`

```
A sparkling disco ball booster covered in rainbow mirror tiles, glowing, match-3 game special piece, glossy and juicy, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/box1.png`

```
A small square wooden crate, light honey-colored planks with a diagonal brace, seen straight from the front, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/box2.png`

```
A small square wooden crate reinforced with two vertical grey metal straps and rivets, seen straight from the front, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/box3.png`

```
A small square heavy dark-wood crate with metal straps, rivets and golden corner caps, seen straight from the front, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/dirt1.png`

```
A square tile of light dusty dirt with crumbs and small smudges, seen from straight above, rounded corners, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/pieces/dirt2.png`

```
A square tile of thick dark sticky mud with puddles and splatters, seen from straight above, rounded corners, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

## UI icons

### `art/raw/ui/coin.png`

```
Mobile game UI icon: a shiny gold coin with a paw print embossed on it, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/star.png`

```
Mobile game UI icon: a chunky glossy golden star, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/heart.png`

```
Mobile game UI icon: a glossy red heart (lives icon), bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/hammer.png`

```
Mobile game UI icon: a cartoon hammer with a wooden handle and a steel head, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/broom.png`

```
Mobile game UI icon: a cartoon straw broom with a red band, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/shuffle.png`

```
Mobile game UI icon: two curved crossing arrows, one blue and one orange (shuffle icon), bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/gift.png`

```
Mobile game UI icon: a pink gift box with a golden ribbon bow, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/quests.png`

```
Mobile game UI icon: a parchment scroll with a green check mark badge, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/race.png`

```
Mobile game UI icon: a checkered racing flag on a wooden pole, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/chest.png`

```
Mobile game UI icon: a wooden treasure chest with gold trim, slightly open with golden light, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/gear.png`

```
Mobile game UI icon: a lavender settings gear with a purple center, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/ui/lock.png`

```
Mobile game UI icon: a grey padlock, bold outline, glossy, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

## Mascot

### `art/raw/mascot/happy.png`

```
Mochi, a chubby cute cream-and-orange tabby kitten with big round sparkling eyes, pink blush cheeks, a small red collar with a golden bell, head and upper body only, friendly mascot of a cozy home decoration game, smiling happily with eyes half closed. Keep the exact same character design in all versions. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/mascot/sad.png`

```
Mochi, a chubby cute cream-and-orange tabby kitten with big round sparkling eyes, pink blush cheeks, a small red collar with a golden bell, head and upper body only, friendly mascot of a cozy home decoration game, sad with teary eyes and drooping ears. Keep the exact same character design in all versions. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/mascot/wow.png`

```
Mochi, a chubby cute cream-and-orange tabby kitten with big round sparkling eyes, pink blush cheeks, a small red collar with a golden bell, head and upper body only, friendly mascot of a cozy home decoration game, amazed with sparkling eyes and an open mouth, paws raised. Keep the exact same character design in all versions. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

## Room: Living Room

### `art/raw/rooms/living/floor_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected living room floor surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/floor_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room floor surface: oak (polish the floor), main color close to #c8955c. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/floor_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room floor surface: walnut (polish the floor), main color close to #7a4a2c. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/floor_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room floor surface: white wood (polish the floor), main color close to #e8dccb. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/wallpaper_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected living room wall surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/wallpaper_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room wall surface: cream stripes (hang wallpaper), main color close to #f3e3c3. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/wallpaper_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room wall surface: mint floral (hang wallpaper), main color close to #bfe3d0. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/wallpaper_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room wall surface: dusty rose (hang wallpaper), main color close to #e9c2c5. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/window_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/window_0.png`

```
A cozy living room window: burgundy style, main color close to #9b2f3f, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/window_1.png`

```
A cozy living room window: navy style, main color close to #2d4a7a, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/window_2.png`

```
A cozy living room window: sunny style, main color close to #e8b33c, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/sofa_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old sofa covered with a dusty white sheet, sagging. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/sofa_0.png`

```
A cozy living room sofa: teal velvet style, main color close to #2a8c8c, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/sofa_1.png`

```
A cozy living room sofa: mustard style, main color close to #d9a52b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/sofa_2.png`

```
A cozy living room sofa: soft gray style, main color close to #8e939b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/rug_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a worn dusty threadbare rug with holes, lying flat on the floor seen in perspective. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/rug_0.png`

```
A cozy living room rug: persian style, main color close to #a33b3b, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/rug_1.png`

```
A cozy living room rug: round blue style, main color close to #4f7fbf, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/rug_2.png`

```
A cozy living room rug: checkered style, main color close to #d8c08a, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/table_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a wobbly old coffee table with a broken leg and a pile of junk mail. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/table_0.png`

```
A cozy living room table: rustic style, main color close to #9a6a3f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/table_1.png`

```
A cozy living room table: glass style, main color close to #9fd4e6, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/table_2.png`

```
A cozy living room table: marble style, main color close to #ececec, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/lamp_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a bent broken floor lamp with a torn lampshade. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/lamp_0.png`

```
A cozy living room lamp: cream shade style, main color close to #f4e2b8, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/lamp_1.png`

```
A cozy living room lamp: brass style, main color close to #c9a24b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/lamp_2.png`

```
A cozy living room lamp: black style, main color close to #333333, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/plant_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dried dead houseplant in a cracked pot. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/plant_0.png`

```
A cozy living room plant: monstera style, main color close to #3f8f4f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/plant_1.png`

```
A cozy living room plant: cactus style, main color close to #6aa84f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/plant_2.png`

```
A cozy living room plant: palm style, main color close to #2e7d5b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/painting_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an empty crooked old picture frame with a torn canvas. a framed painting hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/painting_0.png`

```
A cozy living room painting: landscape style, main color close to #7fb2d9, brand new and charming. a framed painting hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/painting_1.png`

```
A cozy living room painting: sunflowers style, main color close to #f2c335, brand new and charming. a framed painting hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/painting_2.png`

```
A cozy living room painting: cat portrait style, main color close to #e59a6b, brand new and charming. a framed painting hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/bookshelf_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken empty wooden bookshelf with a missing shelf and cobwebs. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/bookshelf_0.png`

```
A cozy living room bookshelf: brown wood style, main color close to #8a5a35, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/bookshelf_1.png`

```
A cozy living room bookshelf: white style, main color close to #f0ede6, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/living/bookshelf_2.png`

```
A cozy living room bookshelf: sage style, main color close to #8fa98a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

## Room: Kitchen

### `art/raw/rooms/kitchen/tiles_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected kitchen floor surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/tiles_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen floor surface: checkered (tile the floor), main color close to #d9d9d9. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/tiles_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen floor surface: patterned (tile the floor), main color close to #5b8bb5. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/tiles_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen floor surface: terracotta (tile the floor), main color close to #c66b47. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/backsplash_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected kitchen wall surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/backsplash_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen wall surface: subway white (add a backsplash), main color close to #f4f4f0. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/backsplash_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen wall surface: glazed teal (add a backsplash), main color close to #5fb3b3. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/backsplash_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen wall surface: lemon (add a backsplash), main color close to #f1d36b. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/cabinets_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
old kitchen counter cabinets with broken doors, chipped countertop and a rusty sink. a kitchen counter with lower cabinets and a sink, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/cabinets_0.png`

```
A cozy kitchen cabinets: light wood style, main color close to #d6aa73, brand new and charming. a kitchen counter with lower cabinets and a sink, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/cabinets_1.png`

```
A cozy kitchen cabinets: navy style, main color close to #2f4868, brand new and charming. a kitchen counter with lower cabinets and a sink, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/cabinets_2.png`

```
A cozy kitchen cabinets: pastel style, main color close to #a9d3c4, brand new and charming. a kitchen counter with lower cabinets and a sink, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/stove_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old dirty rusty stove with a broken oven door. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/stove_0.png`

```
A cozy kitchen stove: retro red style, main color close to #c8423b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/stove_1.png`

```
A cozy kitchen stove: steel style, main color close to #b8bec6, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/stove_2.png`

```
A cozy kitchen stove: cream style, main color close to #efe2c2, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/fridge_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old rusty dented retro fridge. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/fridge_0.png`

```
A cozy kitchen fridge: mint style, main color close to #a8dcc8, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/fridge_1.png`

```
A cozy kitchen fridge: white style, main color close to #f5f5f5, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/fridge_2.png`

```
A cozy kitchen fridge: retro pink style, main color close to #f2a7b5, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/dining_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken dining table with one chair knocked over, dusty. a dining table with two chairs, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/dining_0.png`

```
A cozy kitchen dining: round wood style, main color close to #a87447, brand new and charming. a dining table with two chairs, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/dining_1.png`

```
A cozy kitchen dining: white square style, main color close to #f0eee8, brand new and charming. a dining table with two chairs, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/dining_2.png`

```
A cozy kitchen dining: iron style, main color close to #3a3a3a, brand new and charming. a dining table with two chairs, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/window_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/window_0.png`

```
A cozy kitchen window: red gingham style, main color close to #d24b4b, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/window_1.png`

```
A cozy kitchen window: yellow style, main color close to #f0c64a, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/window_2.png`

```
A cozy kitchen window: green style, main color close to #6fb56f, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/lights_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a bare hanging light bulb on a frayed wire with cobwebs. hanging from the top edge of the image on cords. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/lights_0.png`

```
A cozy kitchen lights: copper style, main color close to #c27a46, brand new and charming. hanging from the top edge of the image on cords. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/lights_1.png`

```
A cozy kitchen lights: industrial style, main color close to #2e2e2e, brand new and charming. hanging from the top edge of the image on cords. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/lights_2.png`

```
A cozy kitchen lights: rattan style, main color close to #d8b47a, brand new and charming. hanging from the top edge of the image on cords. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/shelf_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken crooked wall shelf with a few dusty jars. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/shelf_0.png`

```
A cozy kitchen shelf: wood style, main color close to #a5713f, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/shelf_1.png`

```
A cozy kitchen shelf: white style, main color close to #efefef, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/shelf_2.png`

```
A cozy kitchen shelf: green style, main color close to #7fa87a, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

## Room: Garden

### `art/raw/rooms/garden/backdrop_before.png`

```
Background for a home decoration game: the back of an old neglected cottage garden on a grey overcast day — a weathered house wall with a dusty window on the left, an overgrown wild hedge, grey sky. Front view, wide landscape, everything far in the background, the bottom 15% is plain dry dirt ground. No people. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/backdrop.png`

```
Background for a home decoration game: the back of a charming cottage garden on a sunny day — a cozy cream house wall with a window and flower box on the left, a neat green hedge, blue sky with fluffy clouds. Same composition as the neglected version. Front view, wide landscape, the bottom 15% is plain grass ground. No people. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lawn_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected garden floor surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lawn_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new garden floor surface: green grass (plant the lawn), main color close to #6cbf4f. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lawn_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new garden floor surface: deep green (plant the lawn), main color close to #3f9a45. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lawn_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new garden floor surface: wildflower (plant the lawn), main color close to #9ccc65. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fence_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken wooden garden fence with missing and fallen planks, horizontal strip spanning the full width. a long horizontal fence section spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fence_0.png`

```
A cozy garden fence: white picket style, main color close to #f7f7f2, brand new and charming. a long horizontal fence section spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fence_1.png`

```
A cozy garden fence: wood style, main color close to #a0703f, brand new and charming. a long horizontal fence section spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fence_2.png`

```
A cozy garden fence: blue style, main color close to #6f9fd8, brand new and charming. a long horizontal fence section spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/path_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy dirt trail with puddles and weeds, seen in perspective going into the distance. seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top). Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/path_0.png`

```
A cozy garden path: gray stone style, main color close to #a7a7a7, brand new and charming. seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top). Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/path_1.png`

```
A cozy garden path: red brick style, main color close to #b5553b, brand new and charming. seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top). Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/path_2.png`

```
A cozy garden path: pebbles style, main color close to #d8cbb0, brand new and charming. seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top). Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fountain_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dry cracked stone fountain basin full of dead leaves. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fountain_0.png`

```
A cozy garden fountain: white stone style, main color close to #e9e6df, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fountain_1.png`

```
A cozy garden fountain: blue stone style, main color close to #8fb3c9, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fountain_2.png`

```
A cozy garden fountain: bronze style, main color close to #9b7a4a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/bench_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken old garden bench with missing slats. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/bench_0.png`

```
A cozy garden bench: wood style, main color close to #a06a3c, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/bench_1.png`

```
A cozy garden bench: white iron style, main color close to #f2f2f2, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/bench_2.png`

```
A cozy garden bench: green style, main color close to #4f8f5a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/flowers_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a weedy empty flower bed with dry soil. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/flowers_0.png`

```
A cozy garden flowers: roses style, main color close to #e05a7a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/flowers_1.png`

```
A cozy garden flowers: tulips style, main color close to #f08a3c, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/flowers_2.png`

```
A cozy garden flowers: lavender style, main color close to #9b7fd1, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/tree_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dead leafless dry tree. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/tree_0.png`

```
A cozy garden tree: apple tree style, main color close to #d84b3f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/tree_1.png`

```
A cozy garden tree: cherry blossom style, main color close to #f4a6c0, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/tree_2.png`

```
A cozy garden tree: maple style, main color close to #e07b2f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/swing_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken garden swing frame with a snapped rope. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/swing_0.png`

```
A cozy garden swing: wood style, main color close to #9a6a3f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/swing_1.png`

```
A cozy garden swing: rattan style, main color close to #d9b27a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/swing_2.png`

```
A cozy garden swing: red style, main color close to #c94a4a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lanterns_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a sagging tangled string with broken lantern bulbs, horizontal, spanning wide. a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lanterns_0.png`

```
A cozy garden lanterns: warm style, main color close to #ffd27a, brand new and charming. a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lanterns_1.png`

```
A cozy garden lanterns: colorful style, main color close to #ff7fa8, brand new and charming. a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lanterns_2.png`

```
A cozy garden lanterns: white style, main color close to #fff6e0, brand new and charming. a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

## Room: Bedroom

### `art/raw/rooms/bedroom/floor_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected bedroom floor surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/floor_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom floor surface: honey wood (redo the floor), main color close to #d9a066. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/floor_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom floor surface: lilac carpet (redo the floor), main color close to #c7b3df. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/floor_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom floor surface: parquet (redo the floor), main color close to #a56f40. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wallpaper_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected bedroom wall surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wallpaper_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom wall surface: lavender dots (hang wallpaper), main color close to #c9b6e4. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wallpaper_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom wall surface: sky clouds (hang wallpaper), main color close to #bfe0f5. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wallpaper_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom wall surface: peach stripes (hang wallpaper), main color close to #f6c9a8. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/window_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/window_0.png`

```
A cozy bedroom window: lilac drapes style, main color close to #b59ad6, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/window_1.png`

```
A cozy bedroom window: mint blind style, main color close to #9fd8c4, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/window_2.png`

```
A cozy bedroom window: pom-pom coral style, main color close to #f0956b, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/bed_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a bare stained old mattress on a cracked bed frame with no headboard, a crumpled grey sheet and a spring poking out. a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/bed_0.png`

```
A cozy bedroom bed: rose patchwork style, main color close to #e88fa3, brand new and charming. a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/bed_1.png`

```
A cozy bedroom bed: navy tufted style, main color close to #2f4868, brand new and charming. a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/bed_2.png`

```
A cozy bedroom bed: sage & iron style, main color close to #8fb08a, brand new and charming. a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/nightstand_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a wobbly old grey bedside table with a missing drawer and a tipped-over broken lamp, cobwebs. a small bedside table with a little table lamp on top, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/nightstand_0.png`

```
A cozy bedroom nightstand: warm wood style, main color close to #a5713f, brand new and charming. a small bedside table with a little table lamp on top, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/nightstand_1.png`

```
A cozy bedroom nightstand: white style, main color close to #f2efe8, brand new and charming. a small bedside table with a little table lamp on top, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/nightstand_2.png`

```
A cozy bedroom nightstand: pastel blue style, main color close to #9cc3e0, brand new and charming. a small bedside table with a little table lamp on top, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wardrobe_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old grey wardrobe with one door hanging off its hinge, empty hangers inside, a pile of clothes and dusty boxes on top. a tall narrow two-door wardrobe standing on the floor, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wardrobe_0.png`

```
A cozy bedroom wardrobe: oak style, main color close to #c8955c, brand new and charming. a tall narrow two-door wardrobe standing on the floor, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wardrobe_1.png`

```
A cozy bedroom wardrobe: white mirror style, main color close to #f0ede6, brand new and charming. a tall narrow two-door wardrobe standing on the floor, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wardrobe_2.png`

```
A cozy bedroom wardrobe: mint style, main color close to #a9d3c4, brand new and charming. a tall narrow two-door wardrobe standing on the floor, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/rug_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a worn dusty threadbare rug with holes, lying flat on the floor seen in perspective. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/rug_0.png`

```
A cozy bedroom rug: fluffy pink style, main color close to #f2b8c6, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/rug_1.png`

```
A cozy bedroom rug: blue stripes style, main color close to #6f9bd3, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/rug_2.png`

```
A cozy bedroom rug: moroccan style, main color close to #e8dcc0, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/garland_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken string of fairy-light bulbs hanging from one nail, the other end fallen down, dusty dead bulbs. a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/garland_0.png`

```
A cozy bedroom garland: fairy lights style, main color close to #ffd27a, brand new and charming. a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/garland_1.png`

```
A cozy bedroom garland: bunting style, main color close to #ff8fa8, brand new and charming. a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/garland_2.png`

```
A cozy bedroom garland: paper stars style, main color close to #9ec9ef, brand new and charming. a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/armchair_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a tilted old armchair with torn fabric, stuffing coming out and a missing leg propped on books. a small cozy armchair, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/armchair_0.png`

```
A cozy bedroom armchair: pink velvet style, main color close to #e58fa0, brand new and charming. a small cozy armchair, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/armchair_1.png`

```
A cozy bedroom armchair: rattan style, main color close to #d8b47a, brand new and charming. a small cozy armchair, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/armchair_2.png`

```
A cozy bedroom armchair: forest green style, main color close to #3f7a5a, brand new and charming. a small cozy armchair, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/catbed_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a soggy torn cardboard box with crumpled newspaper inside. a cozy pet bed for a cat, small, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/catbed_0.png`

```
A cozy bedroom catbed: donut style, main color close to #f4a6c0, brand new and charming. a cozy pet bed for a cat, small, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/catbed_1.png`

```
A cozy bedroom catbed: basket style, main color close to #c9a26b, brand new and charming. a cozy pet bed for a cat, small, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/catbed_2.png`

```
A cozy bedroom catbed: teepee style, main color close to #8fb3c9, brand new and charming. a cozy pet bed for a cat, small, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

## Room: Bathroom

### `art/raw/rooms/bathroom/tiles_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected bathroom floor surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/tiles_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom floor surface: white hexagon (tile the floor), main color close to #f2f2ee. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/tiles_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom floor surface: blue mosaic (tile the floor), main color close to #5f9fc9. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/tiles_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom floor surface: terrazzo (tile the floor), main color close to #e6d8c8. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/walltiles_before.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected bathroom wall surface: dirty, stained, cracked and worn. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/walltiles_0.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom wall surface: mint subway (tile the walls), main color close to #a8dcc8. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/walltiles_1.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom wall surface: pink squares (tile the walls), main color close to #f2b8c0. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/walltiles_2.png`

```
Seamless tileable square texture, flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom wall surface: navy scales (tile the walls), main color close to #2f4868. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/window_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/window_0.png`

```
A cozy bathroom window: café curtain style, main color close to #f2d16b, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/window_1.png`

```
A cozy bathroom window: stained glass style, main color close to #7fb2d9, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/window_2.png`

```
A cozy bathroom window: shutters style, main color close to #a5713f, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathtub_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old rusty stained bathtub with a grime ring, dead leaves inside and a dripping tap, one foot replaced by bricks. a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathtub_0.png`

```
A cozy bathroom bathtub: clawfoot style, main color close to #f5f5f2, brand new and charming. a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathtub_1.png`

```
A cozy bathroom bathtub: retro pink style, main color close to #f2a7b5, brand new and charming. a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathtub_2.png`

```
A cozy bathroom bathtub: wood panel style, main color close to #b07a4a, brand new and charming. a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/sink_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a cracked old wall-hung washbasin with a rusty leaking pipe dripping into a bucket. a bathroom washbasin with a tap, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/sink_0.png`

```
A cozy bathroom sink: wood vanity style, main color close to #a87447, brand new and charming. a bathroom washbasin with a tap, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/sink_1.png`

```
A cozy bathroom sink: pedestal style, main color close to #f5f5f2, brand new and charming. a bathroom washbasin with a tap, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/sink_2.png`

```
A cozy bathroom sink: navy vanity style, main color close to #2f4868, brand new and charming. a bathroom washbasin with a tap, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/mirror_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a tilted dusty wall mirror with cracked spotted glass and a chipped corner. a bathroom mirror hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/mirror_0.png`

```
A cozy bathroom mirror: round gold style, main color close to #c9a24b, brand new and charming. a bathroom mirror hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/mirror_1.png`

```
A cozy bathroom mirror: wooden arch style, main color close to #a5713f, brand new and charming. a bathroom mirror hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/mirror_2.png`

```
A cozy bathroom mirror: vanity bulbs style, main color close to #f2efe8, brand new and charming. a bathroom mirror hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/shelf_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken crooked wall shelf with a few dusty jars. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/shelf_0.png`

```
A cozy bathroom shelf: wood style, main color close to #a5713f, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/shelf_1.png`

```
A cozy bathroom shelf: white two-tier style, main color close to #f2f2ee, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/shelf_2.png`

```
A cozy bathroom shelf: glass & brass style, main color close to #c9a24b, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/towels_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a bent towel bar with one dirty grey ragged towel with holes. bath towels hanging from a wall-mounted towel bar or hooks, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/towels_0.png`

```
A cozy bathroom towels: peach style, main color close to #f4b183, brand new and charming. bath towels hanging from a wall-mounted towel bar or hooks, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/towels_1.png`

```
A cozy bathroom towels: aqua style, main color close to #7fc8d6, brand new and charming. bath towels hanging from a wall-mounted towel bar or hooks, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/towels_2.png`

```
A cozy bathroom towels: lemon style, main color close to #f2d16b, brand new and charming. bath towels hanging from a wall-mounted towel bar or hooks, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathmat_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a soggy moldy grey-green bath mat with holes, lying flat on the floor seen in perspective. a bath mat lying flat on the floor, seen in perspective from the front and above, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathmat_0.png`

```
A cozy bathroom bathmat: cloud style, main color close to #eef4fa, brand new and charming. a bath mat lying flat on the floor, seen in perspective from the front and above, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathmat_1.png`

```
A cozy bathroom bathmat: coral stripes style, main color close to #e88a6a, brand new and charming. a bath mat lying flat on the floor, seen in perspective from the front and above, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathmat_2.png`

```
A cozy bathroom bathmat: teak slats style, main color close to #c08a56, brand new and charming. a bath mat lying flat on the floor, seen in perspective from the front and above, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/plant_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dried dead houseplant in a cracked pot. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/plant_0.png`

```
A cozy bathroom plant: fern style, main color close to #4f9a5a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/plant_1.png`

```
A cozy bathroom plant: snake plant style, main color close to #5f8f4a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/plant_2.png`

```
A cozy bathroom plant: peace lily style, main color close to #3f7a5a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Premium casual mobile game art, cozy and warm, soft stylized 3D render with hand-painted texture detail, rounded friendly shapes, rich saturated but gentle colors, soft warm key light from the upper left, subtle rim light, clean crisp edges, high detail, no text, no watermark, no logo.
```
