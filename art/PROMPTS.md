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
Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Pieces

### `art/raw/pieces/red.png`

```
A chunky game piece for a match-3 puzzle, bold readable silhouette, flat cel shading with one simple white highlight shape, thick even dark outline, fills about 90% of the square frame. The piece is shaped like a plump heart, vivid ruby red. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/yellow.png`

```
A chunky game piece for a match-3 puzzle, bold readable silhouette, flat cel shading with one simple white highlight shape, thick even dark outline, fills about 90% of the square frame. The piece is shaped like a rounded five-pointed star, sunny golden yellow. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/blue.png`

```
A chunky game piece for a match-3 puzzle, bold readable silhouette, flat cel shading with one simple white highlight shape, thick even dark outline, fills about 90% of the square frame. The piece is shaped like a faceted cut diamond gem, sky blue. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/green.png`

```
A chunky game piece for a match-3 puzzle, bold readable silhouette, flat cel shading with one simple white highlight shape, thick even dark outline, fills about 90% of the square frame. The piece is shaped like a fresh leaf with a soft vein, lime green. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/purple.png`

```
A chunky game piece for a match-3 puzzle, bold readable silhouette, flat cel shading with one simple white highlight shape, thick even dark outline, fills about 90% of the square frame. The piece is shaped like a hexagonal amethyst crystal with facets, violet purple. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/orange.png`

```
A chunky game piece for a match-3 puzzle, bold readable silhouette, flat cel shading with one simple white highlight shape, thick even dark outline, fills about 90% of the square frame. The piece is shaped like a five-petal flower with a cream center, tangerine orange. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/rocket.png`

```
A horizontal double-headed firework rocket booster (pointed golden tips on both the left and the right end, red and white striped body, small blue fins in the middle), lying horizontally, match-3 game special piece, bold and readable, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/bomb.png`

```
A round cartoon bomb booster, dark navy round sphere with a metal cap and a short fuse with a bright spark, match-3 game special piece, bold and readable, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/plane.png`

```
A cute folded paper airplane booster, white and light-blue paper, pointing up-right, match-3 game special piece, bold and readable, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/disco.png`

```
A sparkling disco ball booster covered in rainbow mirror tiles, glowing, match-3 game special piece, bold and readable, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/box1.png`

```
A small square wooden crate, light honey-colored planks with a diagonal brace, seen straight from the front, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/box2.png`

```
A small square wooden crate reinforced with two vertical grey metal straps and rivets, seen straight from the front, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/box3.png`

```
A small square heavy dark-wood crate with metal straps, rivets and golden corner caps, seen straight from the front, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/dirt1.png`

```
A square tile of light dusty dirt with crumbs and small smudges, seen from straight above, rounded corners, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/dirt2.png`

```
A square tile of thick dark sticky mud with puddles and splatters, seen from straight above, rounded corners, square, match-3 game obstacle tile filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/ice1.png`

```
A thin clear ice shell shaped like a rounded square, mostly see-through in the middle with pale-blue frosty edges, a few white light streaks and a crisp blue outline, seen straight from the front, square, meant to be laid over a game piece, match-3 game obstacle filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/ice2.png`

```
A thick frosted ice block shaped like a rounded square, translucent pale blue with white frost cracks, a little snow on the top corners and a crisp darker blue outline, seen straight from the front, square, meant to be laid over a game piece, match-3 game obstacle filling the whole square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/toy.png`

```
A cute small teddy bear head toy, warm caramel-brown plush with round ears, a cream snout, shiny black button eyes, rosy cheeks and a red bow tie, friendly and simple, match-3 game collectible piece, fills about 90% of the square frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/pieces/carpet.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A cozy woven rug pattern seen from straight above: warm raspberry-red wool with a darker red diamond lattice and small golden diamonds at the crossings, soft fabric texture. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## UI icons

### `art/raw/ui/coin.png`

```
Mobile game UI icon: a gold coin with a paw print embossed on it, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/star.png`

```
Mobile game UI icon: a chunky golden star, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/heart.png`

```
Mobile game UI icon: a plump red heart (lives icon), bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/hammer.png`

```
Mobile game UI icon: a cartoon hammer with a wooden handle and a steel head, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/broom.png`

```
Mobile game UI icon: a cartoon straw broom with a red band, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/shuffle.png`

```
Mobile game UI icon: two curved crossing arrows, one blue and one orange (shuffle icon), bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/gift.png`

```
Mobile game UI icon: a pink gift box with a golden ribbon bow, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/quests.png`

```
Mobile game UI icon: a parchment scroll with a green check mark badge, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/race.png`

```
Mobile game UI icon: a checkered racing flag on a wooden pole, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/chest.png`

```
Mobile game UI icon: a wooden treasure chest with gold trim, slightly open with golden light, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/gear.png`

```
Mobile game UI icon: a lavender settings gear with a purple center, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/ui/lock.png`

```
Mobile game UI icon: a grey padlock, bold outline, flat colors, readable at small size, fills about 90% of the frame. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Mascot

### `art/raw/mascot/happy.png`

```
Mochi, a chubby cute cream-and-orange tabby kitten with big round sparkling eyes, pink blush cheeks, a small red collar with a golden bell, head and upper body only, friendly mascot of a cozy home decoration game, smiling happily with eyes half closed. Keep the exact same character design in all versions. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/mascot/sad.png`

```
Mochi, a chubby cute cream-and-orange tabby kitten with big round sparkling eyes, pink blush cheeks, a small red collar with a golden bell, head and upper body only, friendly mascot of a cozy home decoration game, sad with teary eyes and drooping ears. Keep the exact same character design in all versions. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/mascot/wow.png`

```
Mochi, a chubby cute cream-and-orange tabby kitten with big round sparkling eyes, pink blush cheeks, a small red collar with a golden bell, head and upper body only, friendly mascot of a cozy home decoration game, amazed with sparkling eyes and an open mouth, paws raised. Keep the exact same character design in all versions. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Room: Living Room

### `art/raw/rooms/living/floor_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected living room floor surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/floor_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room floor surface: oak (polish the floor), main color close to #c8955c. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/floor_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room floor surface: walnut (polish the floor), main color close to #7a4a2c. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/floor_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room floor surface: white wood (polish the floor), main color close to #e8dccb. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/wallpaper_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected living room wall surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/wallpaper_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room wall surface: cream stripes (hang wallpaper), main color close to #f3e3c3. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/wallpaper_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room wall surface: mint floral (hang wallpaper), main color close to #bfe3d0. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/wallpaper_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new living room wall surface: dusty rose (hang wallpaper), main color close to #e9c2c5. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/window_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/window_0.png`

```
A cozy living room window: burgundy style, main color close to #9b2f3f, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/window_1.png`

```
A cozy living room window: navy style, main color close to #2d4a7a, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/window_2.png`

```
A cozy living room window: sunny style, main color close to #e8b33c, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/sofa_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old sofa covered with a dusty white sheet, sagging. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/sofa_0.png`

```
A cozy living room sofa: teal velvet style, main color close to #2a8c8c, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/sofa_1.png`

```
A cozy living room sofa: mustard style, main color close to #d9a52b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/sofa_2.png`

```
A cozy living room sofa: soft gray style, main color close to #8e939b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/rug_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a worn dusty threadbare rug with holes, lying flat on the floor seen in perspective. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/rug_0.png`

```
A cozy living room rug: persian style, main color close to #a33b3b, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/rug_1.png`

```
A cozy living room rug: round blue style, main color close to #4f7fbf, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/rug_2.png`

```
A cozy living room rug: checkered style, main color close to #d8c08a, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/table_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a wobbly old coffee table with a broken leg and a pile of junk mail. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/table_0.png`

```
A cozy living room table: rustic style, main color close to #9a6a3f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/table_1.png`

```
A cozy living room table: glass style, main color close to #9fd4e6, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/table_2.png`

```
A cozy living room table: marble style, main color close to #ececec, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/lamp_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a bent broken floor lamp with a torn lampshade. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/lamp_0.png`

```
A cozy living room lamp: cream shade style, main color close to #f4e2b8, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/lamp_1.png`

```
A cozy living room lamp: brass style, main color close to #c9a24b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/lamp_2.png`

```
A cozy living room lamp: black style, main color close to #333333, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/plant_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dried dead houseplant in a cracked pot. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/plant_0.png`

```
A cozy living room plant: monstera style, main color close to #3f8f4f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/plant_1.png`

```
A cozy living room plant: cactus style, main color close to #6aa84f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/plant_2.png`

```
A cozy living room plant: palm style, main color close to #2e7d5b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/painting_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an empty crooked old picture frame with a torn canvas. a framed painting hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/painting_0.png`

```
A cozy living room painting: landscape style, main color close to #7fb2d9, brand new and charming. a framed painting hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/painting_1.png`

```
A cozy living room painting: sunflowers style, main color close to #f2c335, brand new and charming. a framed painting hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/painting_2.png`

```
A cozy living room painting: cat portrait style, main color close to #e59a6b, brand new and charming. a framed painting hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/bookshelf_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken empty wooden bookshelf with a missing shelf and cobwebs. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/bookshelf_0.png`

```
A cozy living room bookshelf: brown wood style, main color close to #8a5a35, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/bookshelf_1.png`

```
A cozy living room bookshelf: white style, main color close to #f0ede6, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/living/bookshelf_2.png`

```
A cozy living room bookshelf: sage style, main color close to #8fa98a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Room: Kitchen

### `art/raw/rooms/kitchen/tiles_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected kitchen floor surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/tiles_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen floor surface: checkered (tile the floor), main color close to #d9d9d9. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/tiles_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen floor surface: patterned (tile the floor), main color close to #5b8bb5. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/tiles_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen floor surface: terracotta (tile the floor), main color close to #c66b47. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/backsplash_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected kitchen wall surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/backsplash_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen wall surface: subway white (add a backsplash), main color close to #f4f4f0. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/backsplash_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen wall surface: glazed teal (add a backsplash), main color close to #5fb3b3. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/backsplash_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new kitchen wall surface: lemon (add a backsplash), main color close to #f1d36b. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/cabinets_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
old kitchen counter cabinets with broken doors, chipped countertop and a rusty sink. a kitchen counter with lower cabinets and a sink, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/cabinets_0.png`

```
A cozy kitchen cabinets: light wood style, main color close to #d6aa73, brand new and charming. a kitchen counter with lower cabinets and a sink, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/cabinets_1.png`

```
A cozy kitchen cabinets: navy style, main color close to #2f4868, brand new and charming. a kitchen counter with lower cabinets and a sink, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/cabinets_2.png`

```
A cozy kitchen cabinets: pastel style, main color close to #a9d3c4, brand new and charming. a kitchen counter with lower cabinets and a sink, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/stove_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old dirty rusty stove with a broken oven door. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/stove_0.png`

```
A cozy kitchen stove: retro red style, main color close to #c8423b, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/stove_1.png`

```
A cozy kitchen stove: steel style, main color close to #b8bec6, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/stove_2.png`

```
A cozy kitchen stove: cream style, main color close to #efe2c2, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/fridge_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old rusty dented retro fridge. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/fridge_0.png`

```
A cozy kitchen fridge: mint style, main color close to #a8dcc8, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/fridge_1.png`

```
A cozy kitchen fridge: white style, main color close to #f5f5f5, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/fridge_2.png`

```
A cozy kitchen fridge: retro pink style, main color close to #f2a7b5, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/dining_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken dining table with one chair knocked over, dusty. a dining table with two chairs, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/dining_0.png`

```
A cozy kitchen dining: round wood style, main color close to #a87447, brand new and charming. a dining table with two chairs, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/dining_1.png`

```
A cozy kitchen dining: white square style, main color close to #f0eee8, brand new and charming. a dining table with two chairs, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/dining_2.png`

```
A cozy kitchen dining: iron style, main color close to #3a3a3a, brand new and charming. a dining table with two chairs, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/window_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/window_0.png`

```
A cozy kitchen window: red gingham style, main color close to #d24b4b, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/window_1.png`

```
A cozy kitchen window: yellow style, main color close to #f0c64a, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/window_2.png`

```
A cozy kitchen window: green style, main color close to #6fb56f, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/lights_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a bare hanging light bulb on a frayed wire with cobwebs. hanging from the top edge of the image on cords. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/lights_0.png`

```
A cozy kitchen lights: copper style, main color close to #c27a46, brand new and charming. hanging from the top edge of the image on cords. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/lights_1.png`

```
A cozy kitchen lights: industrial style, main color close to #2e2e2e, brand new and charming. hanging from the top edge of the image on cords. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/lights_2.png`

```
A cozy kitchen lights: rattan style, main color close to #d8b47a, brand new and charming. hanging from the top edge of the image on cords. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/shelf_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken crooked wall shelf with a few dusty jars. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/shelf_0.png`

```
A cozy kitchen shelf: wood style, main color close to #a5713f, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/shelf_1.png`

```
A cozy kitchen shelf: white style, main color close to #efefef, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/kitchen/shelf_2.png`

```
A cozy kitchen shelf: green style, main color close to #7fa87a, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Room: Garden

### `art/raw/rooms/garden/backdrop_before.png`

```
Background for a home decoration game: the back of an old neglected cottage garden on a grey overcast day — a weathered house wall with a dusty window on the left, an overgrown wild hedge, grey sky. Front view, wide landscape, everything far in the background, the bottom 15% is plain dry dirt ground. No people. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/backdrop.png`

```
Background for a home decoration game: the back of a charming cottage garden on a sunny day — a cozy cream house wall with a window and flower box on the left, a neat green hedge, blue sky with fluffy clouds. Same composition as the neglected version. Front view, wide landscape, the bottom 15% is plain grass ground. No people. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lawn_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected garden floor surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lawn_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new garden floor surface: green grass (plant the lawn), main color close to #6cbf4f. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lawn_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new garden floor surface: deep green (plant the lawn), main color close to #3f9a45. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lawn_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new garden floor surface: wildflower (plant the lawn), main color close to #9ccc65. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fence_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken wooden garden fence with missing and fallen planks, horizontal strip spanning the full width. a long horizontal fence section spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fence_0.png`

```
A cozy garden fence: white picket style, main color close to #f7f7f2, brand new and charming. a long horizontal fence section spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fence_1.png`

```
A cozy garden fence: wood style, main color close to #a0703f, brand new and charming. a long horizontal fence section spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fence_2.png`

```
A cozy garden fence: blue style, main color close to #6f9fd8, brand new and charming. a long horizontal fence section spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/path_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy dirt trail with puddles and weeds, seen in perspective going into the distance. seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top). Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/path_0.png`

```
A cozy garden path: gray stone style, main color close to #a7a7a7, brand new and charming. seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top). Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/path_1.png`

```
A cozy garden path: red brick style, main color close to #b5553b, brand new and charming. seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top). Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/path_2.png`

```
A cozy garden path: pebbles style, main color close to #d8cbb0, brand new and charming. seen in perspective going from the bottom of the image into the distance (wide at the bottom, narrow at the top). Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fountain_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dry cracked stone fountain basin full of dead leaves. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fountain_0.png`

```
A cozy garden fountain: white stone style, main color close to #e9e6df, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fountain_1.png`

```
A cozy garden fountain: blue stone style, main color close to #8fb3c9, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/fountain_2.png`

```
A cozy garden fountain: bronze style, main color close to #9b7a4a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/bench_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken old garden bench with missing slats. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/bench_0.png`

```
A cozy garden bench: wood style, main color close to #a06a3c, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/bench_1.png`

```
A cozy garden bench: white iron style, main color close to #f2f2f2, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/bench_2.png`

```
A cozy garden bench: green style, main color close to #4f8f5a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/flowers_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a weedy empty flower bed with dry soil. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/flowers_0.png`

```
A cozy garden flowers: roses style, main color close to #e05a7a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/flowers_1.png`

```
A cozy garden flowers: tulips style, main color close to #f08a3c, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/flowers_2.png`

```
A cozy garden flowers: lavender style, main color close to #9b7fd1, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/tree_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dead leafless dry tree. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/tree_0.png`

```
A cozy garden tree: apple tree style, main color close to #d84b3f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/tree_1.png`

```
A cozy garden tree: cherry blossom style, main color close to #f4a6c0, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/tree_2.png`

```
A cozy garden tree: maple style, main color close to #e07b2f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/swing_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken garden swing frame with a snapped rope. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/swing_0.png`

```
A cozy garden swing: wood style, main color close to #9a6a3f, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/swing_1.png`

```
A cozy garden swing: rattan style, main color close to #d9b27a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/swing_2.png`

```
A cozy garden swing: red style, main color close to #c94a4a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lanterns_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a sagging tangled string with broken lantern bulbs, horizontal, spanning wide. a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lanterns_0.png`

```
A cozy garden lanterns: warm style, main color close to #ffd27a, brand new and charming. a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lanterns_1.png`

```
A cozy garden lanterns: colorful style, main color close to #ff7fa8, brand new and charming. a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/garden/lanterns_2.png`

```
A cozy garden lanterns: white style, main color close to #fff6e0, brand new and charming. a long horizontal string of hanging lanterns spanning the full width of the image, very wide and short. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Room: Bedroom

### `art/raw/rooms/bedroom/floor_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected bedroom floor surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/floor_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom floor surface: honey wood (redo the floor), main color close to #d9a066. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/floor_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom floor surface: lilac carpet (redo the floor), main color close to #c7b3df. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/floor_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom floor surface: parquet (redo the floor), main color close to #a56f40. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wallpaper_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected bedroom wall surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wallpaper_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom wall surface: lavender dots (hang wallpaper), main color close to #c9b6e4. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wallpaper_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom wall surface: sky clouds (hang wallpaper), main color close to #bfe0f5. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wallpaper_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bedroom wall surface: peach stripes (hang wallpaper), main color close to #f6c9a8. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/window_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/window_0.png`

```
A cozy bedroom window: lilac drapes style, main color close to #b59ad6, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/window_1.png`

```
A cozy bedroom window: mint blind style, main color close to #9fd8c4, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/window_2.png`

```
A cozy bedroom window: pom-pom coral style, main color close to #f0956b, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/bed_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a bare stained old mattress on a cracked bed frame with no headboard, a crumpled grey sheet and a spring poking out. a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/bed_0.png`

```
A cozy bedroom bed: rose patchwork style, main color close to #e88fa3, brand new and charming. a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/bed_1.png`

```
A cozy bedroom bed: navy tufted style, main color close to #2f4868, brand new and charming. a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/bed_2.png`

```
A cozy bedroom bed: sage & iron style, main color close to #8fb08a, brand new and charming. a single bed seen from its foot end, the headboard against the back wall, the mattress top seen in perspective, pillows and a quilt. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/nightstand_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a wobbly old grey bedside table with a missing drawer and a tipped-over broken lamp, cobwebs. a small bedside table with a little table lamp on top, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/nightstand_0.png`

```
A cozy bedroom nightstand: warm wood style, main color close to #a5713f, brand new and charming. a small bedside table with a little table lamp on top, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/nightstand_1.png`

```
A cozy bedroom nightstand: white style, main color close to #f2efe8, brand new and charming. a small bedside table with a little table lamp on top, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/nightstand_2.png`

```
A cozy bedroom nightstand: pastel blue style, main color close to #9cc3e0, brand new and charming. a small bedside table with a little table lamp on top, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wardrobe_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old grey wardrobe with one door hanging off its hinge, empty hangers inside, a pile of clothes and dusty boxes on top. a tall narrow two-door wardrobe standing on the floor, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wardrobe_0.png`

```
A cozy bedroom wardrobe: oak style, main color close to #c8955c, brand new and charming. a tall narrow two-door wardrobe standing on the floor, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wardrobe_1.png`

```
A cozy bedroom wardrobe: white mirror style, main color close to #f0ede6, brand new and charming. a tall narrow two-door wardrobe standing on the floor, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/wardrobe_2.png`

```
A cozy bedroom wardrobe: mint style, main color close to #a9d3c4, brand new and charming. a tall narrow two-door wardrobe standing on the floor, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/rug_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a worn dusty threadbare rug with holes, lying flat on the floor seen in perspective. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/rug_0.png`

```
A cozy bedroom rug: fluffy pink style, main color close to #f2b8c6, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/rug_1.png`

```
A cozy bedroom rug: blue stripes style, main color close to #6f9bd3, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/rug_2.png`

```
A cozy bedroom rug: moroccan style, main color close to #e8dcc0, brand new and charming. lying flat on the floor, seen in perspective from the front and above, wide oval/rectangular shape. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/garland_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken string of fairy-light bulbs hanging from one nail, the other end fallen down, dusty dead bulbs. a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/garland_0.png`

```
A cozy bedroom garland: fairy lights style, main color close to #ffd27a, brand new and charming. a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/garland_1.png`

```
A cozy bedroom garland: bunting style, main color close to #ff8fa8, brand new and charming. a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/garland_2.png`

```
A cozy bedroom garland: paper stars style, main color close to #9ec9ef, brand new and charming. a decorative garland hanging on a wall in a gentle curve between two nails, wide and short, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/armchair_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a tilted old armchair with torn fabric, stuffing coming out and a missing leg propped on books. a small cozy armchair, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/armchair_0.png`

```
A cozy bedroom armchair: pink velvet style, main color close to #e58fa0, brand new and charming. a small cozy armchair, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/armchair_1.png`

```
A cozy bedroom armchair: rattan style, main color close to #d8b47a, brand new and charming. a small cozy armchair, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/armchair_2.png`

```
A cozy bedroom armchair: forest green style, main color close to #3f7a5a, brand new and charming. a small cozy armchair, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/catbed_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a soggy torn cardboard box with crumpled newspaper inside. a cozy pet bed for a cat, small, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/catbed_0.png`

```
A cozy bedroom catbed: donut style, main color close to #f4a6c0, brand new and charming. a cozy pet bed for a cat, small, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/catbed_1.png`

```
A cozy bedroom catbed: basket style, main color close to #c9a26b, brand new and charming. a cozy pet bed for a cat, small, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bedroom/catbed_2.png`

```
A cozy bedroom catbed: teepee style, main color close to #8fb3c9, brand new and charming. a cozy pet bed for a cat, small, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Room: Bathroom

### `art/raw/rooms/bathroom/tiles_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected bathroom floor surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/tiles_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom floor surface: white hexagon (tile the floor), main color close to #f2f2ee. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/tiles_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom floor surface: blue mosaic (tile the floor), main color close to #5f9fc9. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/tiles_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom floor surface: terrazzo (tile the floor), main color close to #e6d8c8. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/walltiles_before.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. An old neglected bathroom wall surface: dirty, stained, cracked and worn. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/walltiles_0.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom wall surface: mint subway (tile the walls), main color close to #a8dcc8. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/walltiles_1.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom wall surface: pink squares (tile the walls), main color close to #f2b8c0. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/walltiles_2.png`

```
Seamless tileable square texture in a flat hand-painted style with simple shapes and clean lines (no outline needed), flat front-facing, evenly lit, no perspective, no objects, no shadows, no vignette. A beautiful new bathroom wall surface: navy scales (tile the walls), main color close to #2f4868. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/window_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old window with a cracked dirty glass pane, peeling paint frame, a cobweb, no curtains. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/window_0.png`

```
A cozy bathroom window: café curtain style, main color close to #f2d16b, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/window_1.png`

```
A cozy bathroom window: stained glass style, main color close to #7fb2d9, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/window_2.png`

```
A cozy bathroom window: shutters style, main color close to #a5713f, brand new and charming. a wall window with curtains, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathtub_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old rusty stained bathtub with a grime ring, dead leaves inside and a dripping tap, one foot replaced by bricks. a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathtub_0.png`

```
A cozy bathroom bathtub: clawfoot style, main color close to #f5f5f2, brand new and charming. a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathtub_1.png`

```
A cozy bathroom bathtub: retro pink style, main color close to #f2a7b5, brand new and charming. a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathtub_2.png`

```
A cozy bathroom bathtub: wood panel style, main color close to #b07a4a, brand new and charming. a bathtub against the back wall seen from the front and slightly above, wide, with a wall tap. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/sink_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a cracked old wall-hung washbasin with a rusty leaking pipe dripping into a bucket. a bathroom washbasin with a tap, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/sink_0.png`

```
A cozy bathroom sink: wood vanity style, main color close to #a87447, brand new and charming. a bathroom washbasin with a tap, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/sink_1.png`

```
A cozy bathroom sink: pedestal style, main color close to #f5f5f2, brand new and charming. a bathroom washbasin with a tap, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/sink_2.png`

```
A cozy bathroom sink: navy vanity style, main color close to #2f4868, brand new and charming. a bathroom washbasin with a tap, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/mirror_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a tilted dusty wall mirror with cracked spotted glass and a chipped corner. a bathroom mirror hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/mirror_0.png`

```
A cozy bathroom mirror: round gold style, main color close to #c9a24b, brand new and charming. a bathroom mirror hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/mirror_1.png`

```
A cozy bathroom mirror: wooden arch style, main color close to #a5713f, brand new and charming. a bathroom mirror hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/mirror_2.png`

```
A cozy bathroom mirror: vanity bulbs style, main color close to #f2efe8, brand new and charming. a bathroom mirror hanging on a wall, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/shelf_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken crooked wall shelf with a few dusty jars. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/shelf_0.png`

```
A cozy bathroom shelf: wood style, main color close to #a5713f, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/shelf_1.png`

```
A cozy bathroom shelf: white two-tier style, main color close to #f2f2ee, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/shelf_2.png`

```
A cozy bathroom shelf: glass & brass style, main color close to #c9a24b, brand new and charming. a small wall shelf, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/towels_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a bent towel bar with one dirty grey ragged towel with holes. bath towels hanging from a wall-mounted towel bar or hooks, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/towels_0.png`

```
A cozy bathroom towels: peach style, main color close to #f4b183, brand new and charming. bath towels hanging from a wall-mounted towel bar or hooks, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/towels_1.png`

```
A cozy bathroom towels: aqua style, main color close to #7fc8d6, brand new and charming. bath towels hanging from a wall-mounted towel bar or hooks, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/towels_2.png`

```
A cozy bathroom towels: lemon style, main color close to #f2d16b, brand new and charming. bath towels hanging from a wall-mounted towel bar or hooks, front view. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathmat_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a soggy moldy grey-green bath mat with holes, lying flat on the floor seen in perspective. a bath mat lying flat on the floor, seen in perspective from the front and above, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathmat_0.png`

```
A cozy bathroom bathmat: cloud style, main color close to #eef4fa, brand new and charming. a bath mat lying flat on the floor, seen in perspective from the front and above, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathmat_1.png`

```
A cozy bathroom bathmat: coral stripes style, main color close to #e88a6a, brand new and charming. a bath mat lying flat on the floor, seen in perspective from the front and above, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/bathmat_2.png`

```
A cozy bathroom bathmat: teak slats style, main color close to #c08a56, brand new and charming. a bath mat lying flat on the floor, seen in perspective from the front and above, wide. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/plant_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dried dead houseplant in a cracked pot. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/plant_0.png`

```
A cozy bathroom plant: fern style, main color close to #4f9a5a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/plant_1.png`

```
A cozy bathroom plant: snake plant style, main color close to #5f8f4a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/rooms/bathroom/plant_2.png`

```
A cozy bathroom plant: peace lily style, main color close to #3f7a5a, brand new and charming. Viewed from the front and slightly above (about 15 degrees down), like furniture in a cozy home decoration game. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Mochi's Cottage

### `art/raw/town/cottage_path_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape) (where a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it will be built in the mochi's cottage area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_path_0.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the mochi's cottage of a sunny seaside town (pave the front yard): cobblestone style, main color close to #c9c1b2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_path_1.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the mochi's cottage of a sunny seaside town (pave the front yard): red brick style, main color close to #cf7a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_path_2.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the mochi's cottage of a sunny seaside town (pave the front yard): white gravel style, main color close to #efe6d2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_house_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an abandoned shabby building with grey faded walls, boarded-up windows, holes in the roof and weeds (where a small charming two-storey seaside town building with a gable roof will be built in the mochi's cottage area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_house_0.png`

```
a small charming two-storey seaside town building with a gable roof for the mochi's cottage of a sunny seaside town (fix up the cottage): cream & red tiles style, main color close to #f6e7c8 with accents close to #d4553e, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_house_1.png`

```
a small charming two-storey seaside town building with a gable roof for the mochi's cottage of a sunny seaside town (fix up the cottage): blue & white style, main color close to #bfe0f2 with accents close to #3f6fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_house_2.png`

```
a small charming two-storey seaside town building with a gable roof for the mochi's cottage of a sunny seaside town (fix up the cottage): peach & plum style, main color close to #f6c9b4 with accents close to #8d5a9e, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_garden_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a small vegetable garden bed with neat rows of crops will be built in the mochi's cottage area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_garden_0.png`

```
a small vegetable garden bed with neat rows of crops for the mochi's cottage of a sunny seaside town (plant a veggie patch): carrots style, main color close to #f08a2c, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_garden_1.png`

```
a small vegetable garden bed with neat rows of crops for the mochi's cottage of a sunny seaside town (plant a veggie patch): pumpkins style, main color close to #f2a33a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_garden_2.png`

```
a small vegetable garden bed with neat rows of crops for the mochi's cottage of a sunny seaside town (plant a veggie patch): strawberries style, main color close to #e0405a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_mailbox_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a cute mailbox on a wooden post will be built in the mochi's cottage area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_mailbox_0.png`

```
a cute mailbox on a wooden post for the mochi's cottage of a sunny seaside town (put up a mailbox): red style, main color close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_mailbox_1.png`

```
a cute mailbox on a wooden post for the mochi's cottage of a sunny seaside town (put up a mailbox): blue style, main color close to #4878c0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_mailbox_2.png`

```
a cute mailbox on a wooden post for the mochi's cottage of a sunny seaside town (put up a mailbox): yellow style, main color close to #efb93a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_fence_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken fence with fallen and missing planks (where a short straight garden fence section running diagonally will be built in the mochi's cottage area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_fence_0.png`

```
a short straight garden fence section running diagonally for the mochi's cottage of a sunny seaside town (build a fence): white picket style, main color close to #f6f3ea, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_fence_1.png`

```
a short straight garden fence section running diagonally for the mochi's cottage of a sunny seaside town (build a fence): rustic wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_fence_2.png`

```
a short straight garden fence section running diagonally for the mochi's cottage of a sunny seaside town (build a fence): sea blue style, main color close to #6f9fd8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_tree_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dead leafless tree (where a round leafy fruit tree will be built in the mochi's cottage area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_tree_0.png`

```
a round leafy fruit tree for the mochi's cottage of a sunny seaside town (plant a fruit tree): apple tree style, main color close to #e24b3f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_tree_1.png`

```
a round leafy fruit tree for the mochi's cottage of a sunny seaside town (plant a fruit tree): cherry blossom style, main color close to #f6a7c4, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_tree_2.png`

```
a round leafy fruit tree for the mochi's cottage of a sunny seaside town (plant a fruit tree): lemon tree style, main color close to #f2d33c, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_bench_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a park bench will be built in the mochi's cottage area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_bench_0.png`

```
a park bench for the mochi's cottage of a sunny seaside town (place a bench): wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_bench_1.png`

```
a park bench for the mochi's cottage of a sunny seaside town (place a bench): white iron style, main color close to #f2f0ea, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_bench_2.png`

```
a park bench for the mochi's cottage of a sunny seaside town (place a bench): green style, main color close to #5f9a5f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_lamp_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where an old-fashioned street lamp post will be built in the mochi's cottage area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_lamp_0.png`

```
an old-fashioned street lamp post for the mochi's cottage of a sunny seaside town (add a garden lamp): brass style, main color close to #d0a447, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_lamp_1.png`

```
an old-fashioned street lamp post for the mochi's cottage of a sunny seaside town (add a garden lamp): classic black style, main color close to #3d3a44, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cottage_lamp_2.png`

```
an old-fashioned street lamp post for the mochi's cottage of a sunny seaside town (add a garden lamp): mint style, main color close to #7fcfb5, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Bakery

### `art/raw/town/bakery_square_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape) (where a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it will be built in the bakery area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_square_0.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the bakery of a sunny seaside town (pave the square): cobblestone style, main color close to #c9c1b2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_square_1.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the bakery of a sunny seaside town (pave the square): red brick style, main color close to #cf7a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_square_2.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the bakery of a sunny seaside town (pave the square): white gravel style, main color close to #efe6d2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_shop_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an abandoned shabby building with grey faded walls, boarded-up windows, holes in the roof and weeds (where a small charming two-storey seaside town building with a gable roof will be built in the bakery area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_shop_0.png`

```
a small charming two-storey seaside town building with a gable roof for the bakery of a sunny seaside town (restore the bakery): butter cream style, main color close to #fbe6b0 with accents close to #c9573a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_shop_1.png`

```
a small charming two-storey seaside town building with a gable roof for the bakery of a sunny seaside town (restore the bakery): mint style, main color close to #c5ead7 with accents close to #5c7f5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_shop_2.png`

```
a small charming two-storey seaside town building with a gable roof for the bakery of a sunny seaside town (restore the bakery): strawberry style, main color close to #f7c6cf with accents close to #a8475b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_awning_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a torn grey rag of an old awning hanging from a bent rail (where a striped shop awning with a scalloped edge will be built in the bakery area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_awning_0.png`

```
a striped shop awning with a scalloped edge for the bakery of a sunny seaside town (hang the awning): red stripes style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_awning_1.png`

```
a striped shop awning with a scalloped edge for the bakery of a sunny seaside town (hang the awning): blue stripes style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_awning_2.png`

```
a striped shop awning with a scalloped edge for the bakery of a sunny seaside town (hang the awning): yellow stripes style, main color close to #f0b73a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_sign_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old blank broken sign hanging crooked from a bracket (where a small round hanging shop sign on a wrought-iron bracket will be built in the bakery area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_sign_0.png`

```
a small round hanging shop sign on a wrought-iron bracket for the bakery of a sunny seaside town (hang a bread sign): gold style, main color close to #e8b740, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_sign_1.png`

```
a small round hanging shop sign on a wrought-iron bracket for the bakery of a sunny seaside town (hang a bread sign): wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_sign_2.png`

```
a small round hanging shop sign on a wrought-iron bracket for the bakery of a sunny seaside town (hang a bread sign): pink style, main color close to #ef8fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_tables_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where two small outdoor café tables with chairs and parasols will be built in the bakery area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_tables_0.png`

```
two small outdoor café tables with chairs and parasols for the bakery of a sunny seaside town (set out tables): red parasols style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_tables_1.png`

```
two small outdoor café tables with chairs and parasols for the bakery of a sunny seaside town (set out tables): blue parasols style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_tables_2.png`

```
two small outdoor café tables with chairs and parasols for the bakery of a sunny seaside town (set out tables): yellow parasols style, main color close to #f0b73a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_cart_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a little wooden bread cart with a canopy and wheels, full of loaves will be built in the bakery area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_cart_0.png`

```
a little wooden bread cart with a canopy and wheels, full of loaves for the bakery of a sunny seaside town (fix the bread cart): teal style, main color close to #3fa7a0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_cart_1.png`

```
a little wooden bread cart with a canopy and wheels, full of loaves for the bakery of a sunny seaside town (fix the bread cart): cherry style, main color close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_cart_2.png`

```
a little wooden bread cart with a canopy and wheels, full of loaves for the bakery of a sunny seaside town (fix the bread cart): cream style, main color close to #f3e3c0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_planters_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where two wooden flower boxes full of flowers will be built in the bakery area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_planters_0.png`

```
two wooden flower boxes full of flowers for the bakery of a sunny seaside town (add flower boxes): roses style, main color close to #e9506f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_planters_1.png`

```
two wooden flower boxes full of flowers for the bakery of a sunny seaside town (add flower boxes): tulips style, main color close to #f39a3a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_planters_2.png`

```
two wooden flower boxes full of flowers for the bakery of a sunny seaside town (add flower boxes): lavender style, main color close to #9b7fd6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_lamp_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where an old-fashioned street lamp post will be built in the bakery area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_lamp_0.png`

```
an old-fashioned street lamp post for the bakery of a sunny seaside town (add a street lamp): brass style, main color close to #d0a447, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_lamp_1.png`

```
an old-fashioned street lamp post for the bakery of a sunny seaside town (add a street lamp): classic black style, main color close to #3d3a44, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/bakery_lamp_2.png`

```
an old-fashioned street lamp post for the bakery of a sunny seaside town (add a street lamp): mint style, main color close to #7fcfb5, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Beach

### `art/raw/town/beach_clean_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dirty beach patch with seaweed piles, litter and broken crates (flat isometric diamond shape) (where a flat patch of clean golden beach sand with a few shells and a starfish (isometric diamond shape) will be built in the beach area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_clean_0.png`

```
a flat patch of clean golden beach sand with a few shells and a starfish (isometric diamond shape) for the beach of a sunny seaside town (clean up the sand): brand new style, main color close to #ffffff, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_huts_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
three shabby grey beach huts with broken doors (where a row of three small beach huts will be built in the beach area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_huts_0.png`

```
a row of three small beach huts for the beach of a sunny seaside town (paint the beach huts): candy colors style, main color close to #f6a7c4 with accents close to #7fc8e8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_huts_1.png`

```
a row of three small beach huts for the beach of a sunny seaside town (paint the beach huts): navy stripes style, main color close to #4b6ea8 with accents close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_huts_2.png`

```
a row of three small beach huts for the beach of a sunny seaside town (paint the beach huts): sunshine style, main color close to #f6cf4a with accents close to #f08a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_umbrellas_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where three beach parasols stuck in the sand will be built in the beach area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_umbrellas_0.png`

```
three beach parasols stuck in the sand for the beach of a sunny seaside town (put up parasols): red stripes style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_umbrellas_1.png`

```
three beach parasols stuck in the sand for the beach of a sunny seaside town (put up parasols): blue stripes style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_umbrellas_2.png`

```
three beach parasols stuck in the sand for the beach of a sunny seaside town (put up parasols): yellow stripes style, main color close to #f0b73a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_loungers_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where two beach sun loungers will be built in the beach area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_loungers_0.png`

```
two beach sun loungers for the beach of a sunny seaside town (add sun loungers): turquoise style, main color close to #46b8c4, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_loungers_1.png`

```
two beach sun loungers for the beach of a sunny seaside town (add sun loungers): coral style, main color close to #f0806a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_loungers_2.png`

```
two beach sun loungers for the beach of a sunny seaside town (add sun loungers): white style, main color close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_lifeguard_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a wooden lifeguard tower on stilts with a little flag will be built in the beach area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_lifeguard_0.png`

```
a wooden lifeguard tower on stilts with a little flag for the beach of a sunny seaside town (build a lifeguard tower): red style, main color close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_lifeguard_1.png`

```
a wooden lifeguard tower on stilts with a little flag for the beach of a sunny seaside town (build a lifeguard tower): yellow style, main color close to #efb93a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_lifeguard_2.png`

```
a wooden lifeguard tower on stilts with a little flag for the beach of a sunny seaside town (build a lifeguard tower): blue style, main color close to #4878c0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_palms_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dead palm stump and junk (where two leaning palm trees will be built in the beach area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_palms_0.png`

```
two leaning palm trees for the beach of a sunny seaside town (plant palm trees): green palms style, main color close to #5aa84e, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_palms_1.png`

```
two leaning palm trees for the beach of a sunny seaside town (plant palm trees): with hammock style, main color close to #5aa84e with accents close to #f08a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_palms_2.png`

```
two leaning palm trees for the beach of a sunny seaside town (plant palm trees): with lanterns style, main color close to #5aa84e with accents close to #ffd27a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_volley_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a beach volleyball net with a ball will be built in the beach area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_volley_0.png`

```
a beach volleyball net with a ball for the beach of a sunny seaside town (set up volleyball): white net style, main color close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_volley_1.png`

```
a beach volleyball net with a ball for the beach of a sunny seaside town (set up volleyball): blue net style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_volley_2.png`

```
a beach volleyball net with a ball for the beach of a sunny seaside town (set up volleyball): orange net style, main color close to #f08a3c, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_castle_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a sandcastle with a tiny flag will be built in the beach area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_castle_0.png`

```
a sandcastle with a tiny flag for the beach of a sunny seaside town (build a sandcastle): red flag style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_castle_1.png`

```
a sandcastle with a tiny flag for the beach of a sunny seaside town (build a sandcastle): blue flag style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/beach_castle_2.png`

```
a sandcastle with a tiny flag for the beach of a sunny seaside town (build a sandcastle): pink flag style, main color close to #ef8fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Café

### `art/raw/town/cafe_terrace_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape) (where a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it will be built in the café area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_terrace_0.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the café of a sunny seaside town (lay a wooden terrace): honey wood style, main color close to #d9a76a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_terrace_1.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the café of a sunny seaside town (lay a wooden terrace): driftwood style, main color close to #b9b2a6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_terrace_2.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the café of a sunny seaside town (lay a wooden terrace): white wood style, main color close to #efe8da, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_building_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an abandoned shabby building with grey faded walls, boarded-up windows, holes in the roof and weeds (where a small charming two-storey seaside town building with a gable roof will be built in the café area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_building_0.png`

```
a small charming two-storey seaside town building with a gable roof for the café of a sunny seaside town (restore the café): turquoise style, main color close to #9fd6cf with accents close to #3c6e8f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_building_1.png`

```
a small charming two-storey seaside town building with a gable roof for the café of a sunny seaside town (restore the café): lemon style, main color close to #f9e48f with accents close to #d0663f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_building_2.png`

```
a small charming two-storey seaside town building with a gable roof for the café of a sunny seaside town (restore the café): white & black style, main color close to #f3efe6 with accents close to #4b4f5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_awning_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a torn grey rag of an old awning hanging from a bent rail (where a striped shop awning with a scalloped edge will be built in the café area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_awning_0.png`

```
a striped shop awning with a scalloped edge for the café of a sunny seaside town (hang the awning): red stripes style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_awning_1.png`

```
a striped shop awning with a scalloped edge for the café of a sunny seaside town (hang the awning): blue stripes style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_awning_2.png`

```
a striped shop awning with a scalloped edge for the café of a sunny seaside town (hang the awning): yellow stripes style, main color close to #f0b73a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_sign_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old blank broken sign hanging crooked from a bracket (where a small round hanging shop sign on a wrought-iron bracket will be built in the café area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_sign_0.png`

```
a small round hanging shop sign on a wrought-iron bracket for the café of a sunny seaside town (hang a coffee sign): brown style, main color close to #8a5a35, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_sign_1.png`

```
a small round hanging shop sign on a wrought-iron bracket for the café of a sunny seaside town (hang a coffee sign): white style, main color close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_sign_2.png`

```
a small round hanging shop sign on a wrought-iron bracket for the café of a sunny seaside town (hang a coffee sign): red style, main color close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_tables_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where two small outdoor café tables with chairs and parasols will be built in the café area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_tables_0.png`

```
two small outdoor café tables with chairs and parasols for the café of a sunny seaside town (set out café tables): red & white style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_tables_1.png`

```
two small outdoor café tables with chairs and parasols for the café of a sunny seaside town (set out café tables): leaf green style, main color close to #5fb05a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_tables_2.png`

```
two small outdoor café tables with chairs and parasols for the café of a sunny seaside town (set out café tables): violet style, main color close to #9b6fd0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_lights_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where two poles with a string of round light bulbs between them will be built in the café area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_lights_0.png`

```
two poles with a string of round light bulbs between them for the café of a sunny seaside town (string up lights): warm style, main color close to #ffd27a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_lights_1.png`

```
two poles with a string of round light bulbs between them for the café of a sunny seaside town (string up lights): colorful style, main color close to #ff7fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_lights_2.png`

```
two poles with a string of round light bulbs between them for the café of a sunny seaside town (string up lights): white style, main color close to #fff6e0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_menu_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a café sandwich-board menu sign will be built in the café area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_menu_0.png`

```
a café sandwich-board menu sign for the café of a sunny seaside town (add a menu board): chalkboard style, main color close to #3d4a45, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_menu_1.png`

```
a café sandwich-board menu sign for the café of a sunny seaside town (add a menu board): green board style, main color close to #3e6b52, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_menu_2.png`

```
a café sandwich-board menu sign for the café of a sunny seaside town (add a menu board): wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_bikes_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a bike rack with two bicycles will be built in the café area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_bikes_0.png`

```
a bike rack with two bicycles for the café of a sunny seaside town (add a bike rack): red style, main color close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_bikes_1.png`

```
a bike rack with two bicycles for the café of a sunny seaside town (add a bike rack): mint style, main color close to #6fcab0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/cafe_bikes_2.png`

```
a bike rack with two bicycles for the café of a sunny seaside town (add a bike rack): yellow style, main color close to #efb93a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Flower Park

### `art/raw/town/park_lawn_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape) (where a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it will be built in the flower park area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_lawn_0.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the flower park of a sunny seaside town (lay the lawn): green grass style, main color close to #8fd16a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_lawn_1.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the flower park of a sunny seaside town (lay the lawn): deep green style, main color close to #6cb85a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_lawn_2.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the flower park of a sunny seaside town (lay the lawn): wildflowers style, main color close to #a6d872, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_paths_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
worn muddy dirt tracks with puddles and weeds (where two crossing park walkways with a round plaza in the middle, flat on the ground (isometric diamond shape) will be built in the flower park area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_paths_0.png`

```
two crossing park walkways with a round plaza in the middle, flat on the ground (isometric diamond shape) for the flower park of a sunny seaside town (lay the walkways): cobblestone style, main color close to #c9c1b2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_paths_1.png`

```
two crossing park walkways with a round plaza in the middle, flat on the ground (isometric diamond shape) for the flower park of a sunny seaside town (lay the walkways): red brick style, main color close to #cf7a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_paths_2.png`

```
two crossing park walkways with a round plaza in the middle, flat on the ground (isometric diamond shape) for the flower park of a sunny seaside town (lay the walkways): white gravel style, main color close to #efe6d2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_fountain_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dry cracked fountain full of dead leaves (where a round two-tier stone fountain with water will be built in the flower park area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_fountain_0.png`

```
a round two-tier stone fountain with water for the flower park of a sunny seaside town (build a fountain): white stone style, main color close to #eeeae0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_fountain_1.png`

```
a round two-tier stone fountain with water for the flower park of a sunny seaside town (build a fountain): blue stone style, main color close to #9cbfd6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_fountain_2.png`

```
a round two-tier stone fountain with water for the flower park of a sunny seaside town (build a fountain): bronze style, main color close to #b08850, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_flowers_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a round flower bed with a stone border will be built in the flower park area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_flowers_0.png`

```
a round flower bed with a stone border for the flower park of a sunny seaside town (plant flower beds): roses style, main color close to #e9506f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_flowers_1.png`

```
a round flower bed with a stone border for the flower park of a sunny seaside town (plant flower beds): tulips style, main color close to #f39a3a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_flowers_2.png`

```
a round flower bed with a stone border for the flower park of a sunny seaside town (plant flower beds): lavender style, main color close to #9b7fd6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_gazebo_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a run-down grey gazebo with a holey roof (where a round park gazebo with a conical roof will be built in the flower park area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_gazebo_0.png`

```
a round park gazebo with a conical roof for the flower park of a sunny seaside town (build a gazebo): white style, main color close to #f6f3ea with accents close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_gazebo_1.png`

```
a round park gazebo with a conical roof for the flower park of a sunny seaside town (build a gazebo): green style, main color close to #e9f2e0 with accents close to #4f8f5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_gazebo_2.png`

```
a round park gazebo with a conical roof for the flower park of a sunny seaside town (build a gazebo): red roof style, main color close to #f6e7c8 with accents close to #b8423a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_trees_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dead tree and a pile of junk (where a small group of trees will be built in the flower park area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_trees_0.png`

```
a small group of trees for the flower park of a sunny seaside town (plant trees): cherry blossom style, main color close to #f6a7c4, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_trees_1.png`

```
a small group of trees for the flower park of a sunny seaside town (plant trees): maple style, main color close to #e8823a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_trees_2.png`

```
a small group of trees for the flower park of a sunny seaside town (plant trees): oak style, main color close to #5aa84e, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_benches_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a park bench will be built in the flower park area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_benches_0.png`

```
a park bench for the flower park of a sunny seaside town (place park benches): wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_benches_1.png`

```
a park bench for the flower park of a sunny seaside town (place park benches): white iron style, main color close to #f2f0ea, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_benches_2.png`

```
a park bench for the flower park of a sunny seaside town (place park benches): green style, main color close to #5f9a5f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_lamps_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where an old-fashioned street lamp post will be built in the flower park area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_lamps_0.png`

```
an old-fashioned street lamp post for the flower park of a sunny seaside town (add park lamps): brass style, main color close to #d0a447, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_lamps_1.png`

```
an old-fashioned street lamp post for the flower park of a sunny seaside town (add park lamps): classic black style, main color close to #3d3a44, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/park_lamps_2.png`

```
an old-fashioned street lamp post for the flower park of a sunny seaside town (add park lamps): mint style, main color close to #7fcfb5, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Market Street

### `art/raw/town/market_street_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape) (where a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it will be built in the market street area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_street_0.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the market street of a sunny seaside town (pave the street): cobblestone style, main color close to #c9c1b2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_street_1.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the market street of a sunny seaside town (pave the street): red brick style, main color close to #cf7a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_street_2.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the market street of a sunny seaside town (pave the street): white gravel style, main color close to #efe6d2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_shops_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an abandoned shabby building with grey faded walls, boarded-up windows, holes in the roof and weeds (where a small charming two-storey seaside town building with a gable roof will be built in the market street area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_shops_0.png`

```
a small charming two-storey seaside town building with a gable roof for the market street of a sunny seaside town (restore the shop row): cream & orange style, main color close to #f6e7c8 with accents close to #e07a3a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_shops_1.png`

```
a small charming two-storey seaside town building with a gable roof for the market street of a sunny seaside town (restore the shop row): pink & teal style, main color close to #f6c9cf with accents close to #3f8f8a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_shops_2.png`

```
a small charming two-storey seaside town building with a gable roof for the market street of a sunny seaside town (restore the shop row): blue & red style, main color close to #c3dcef with accents close to #c8483a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_fruit_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a market stall with a striped canopy and goods on the counter will be built in the market street area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_fruit_0.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a fruit stall): red & white style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_fruit_1.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a fruit stall): leaf green style, main color close to #5fb05a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_fruit_2.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a fruit stall): violet style, main color close to #9b6fd0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_fish_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a market stall with a striped canopy and goods on the counter will be built in the market street area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_fish_0.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a fish stall): sea blue style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_fish_1.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a fish stall): teal style, main color close to #3fa7a0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_fish_2.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a fish stall): white style, main color close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_flowers_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a market stall with a striped canopy and goods on the counter will be built in the market street area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_flowers_0.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a flower stall): pink style, main color close to #ef8fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_flowers_1.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a flower stall): yellow style, main color close to #f0b73a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_flowers_2.png`

```
a market stall with a striped canopy and goods on the counter for the market street of a sunny seaside town (build a flower stall): violet style, main color close to #9b6fd0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_bunting_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where two poles with a string of triangle bunting flags between them will be built in the market street area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_bunting_0.png`

```
two poles with a string of triangle bunting flags between them for the market street of a sunny seaside town (hang bunting): rainbow style, main color close to #ff7fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_bunting_1.png`

```
two poles with a string of triangle bunting flags between them for the market street of a sunny seaside town (hang bunting): blue & white style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_bunting_2.png`

```
two poles with a string of triangle bunting flags between them for the market street of a sunny seaside town (hang bunting): red & gold style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_crates_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a stack of wooden produce crates will be built in the market street area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_crates_0.png`

```
a stack of wooden produce crates for the market street of a sunny seaside town (stack the crates): apples style, main color close to #e24b3f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_crates_1.png`

```
a stack of wooden produce crates for the market street of a sunny seaside town (stack the crates): oranges style, main color close to #f39a3a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_crates_2.png`

```
a stack of wooden produce crates for the market street of a sunny seaside town (stack the crates): cabbages style, main color close to #8fd16a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_clock_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a tall street clock on a post will be built in the market street area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_clock_0.png`

```
a tall street clock on a post for the market street of a sunny seaside town (raise the street clock): moss green style, main color close to #4f7f5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_clock_1.png`

```
a tall street clock on a post for the market street of a sunny seaside town (raise the street clock): black style, main color close to #3d3a44, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/market_clock_2.png`

```
a tall street clock on a post for the market street of a sunny seaside town (raise the street clock): brass style, main color close to #d0a447, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Pier & Boats

### `art/raw/town/pier_deck_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken old wooden pier with missing planks and crooked posts in the water (where a long wooden pier on posts standing in shallow water, running diagonally will be built in the pier & boats area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_deck_0.png`

```
a long wooden pier on posts standing in shallow water, running diagonally for the pier & boats of a sunny seaside town (repair the pier): honey wood style, main color close to #d9a76a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_deck_1.png`

```
a long wooden pier on posts standing in shallow water, running diagonally for the pier & boats of a sunny seaside town (repair the pier): driftwood style, main color close to #b9b2a6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_deck_2.png`

```
a long wooden pier on posts standing in shallow water, running diagonally for the pier & boats of a sunny seaside town (repair the pier): white wood style, main color close to #efe8da, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_shed_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an abandoned shabby building with grey faded walls, boarded-up windows, holes in the roof and weeds (where a small charming two-storey seaside town building with a gable roof will be built in the pier & boats area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_shed_0.png`

```
a small charming two-storey seaside town building with a gable roof for the pier & boats of a sunny seaside town (fix the boathouse): barn red style, main color close to #c8574a with accents close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_shed_1.png`

```
a small charming two-storey seaside town building with a gable roof for the pier & boats of a sunny seaside town (fix the boathouse): sea blue style, main color close to #5d8fc4 with accents close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_shed_2.png`

```
a small charming two-storey seaside town building with a gable roof for the pier & boats of a sunny seaside town (fix the boathouse): sand style, main color close to #ecd39a with accents close to #5d6b7a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_sailboat_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a wrecked grey boat half sunk and tilted in the water (where a small boat floating on water will be built in the pier & boats area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_sailboat_0.png`

```
a small boat floating on water for the pier & boats of a sunny seaside town (fix the sailboat): white sails style, main color close to #f3efe6 with accents close to #3f6fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_sailboat_1.png`

```
a small boat floating on water for the pier & boats of a sunny seaside town (fix the sailboat): red sails style, main color close to #e0533f with accents close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_sailboat_2.png`

```
a small boat floating on water for the pier & boats of a sunny seaside town (fix the sailboat): striped sails style, main color close to #f0b73a with accents close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_fishboat_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a wrecked grey boat half sunk and tilted in the water (where a small boat floating on water will be built in the pier & boats area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_fishboat_0.png`

```
a small boat floating on water for the pier & boats of a sunny seaside town (fix the fishing boat): green style, main color close to #4f9a5f with accents close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_fishboat_1.png`

```
a small boat floating on water for the pier & boats of a sunny seaside town (fix the fishing boat): orange style, main color close to #f08a3c with accents close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_fishboat_2.png`

```
a small boat floating on water for the pier & boats of a sunny seaside town (fix the fishing boat): navy style, main color close to #35507a with accents close to #f3d36b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_lamps_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a row of three old-fashioned lamp posts will be built in the pier & boats area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_lamps_0.png`

```
a row of three old-fashioned lamp posts for the pier & boats of a sunny seaside town (light the pier): brass style, main color close to #d0a447, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_lamps_1.png`

```
a row of three old-fashioned lamp posts for the pier & boats of a sunny seaside town (light the pier): classic black style, main color close to #3d3a44, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_lamps_2.png`

```
a row of three old-fashioned lamp posts for the pier & boats of a sunny seaside town (light the pier): mint style, main color close to #7fcfb5, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_nets_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a wooden rack with fishing nets hanging to dry will be built in the pier & boats area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_nets_0.png`

```
a wooden rack with fishing nets hanging to dry for the pier & boats of a sunny seaside town (hang the fishing nets): brown nets style, main color close to #9a7a52, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_nets_1.png`

```
a wooden rack with fishing nets hanging to dry for the pier & boats of a sunny seaside town (hang the fishing nets): green nets style, main color close to #5f9a7a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_nets_2.png`

```
a wooden rack with fishing nets hanging to dry for the pier & boats of a sunny seaside town (hang the fishing nets): orange nets style, main color close to #e08a4a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_buoys_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where three floating buoys will be built in the pier & boats area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_buoys_0.png`

```
three floating buoys for the pier & boats of a sunny seaside town (float the buoys): red & white style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_buoys_1.png`

```
three floating buoys for the pier & boats of a sunny seaside town (float the buoys): yellow style, main color close to #f0b73a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_buoys_2.png`

```
three floating buoys for the pier & boats of a sunny seaside town (float the buoys): orange style, main color close to #f08a3c, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_kiosk_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a tiny ice-cream kiosk with a giant cone on its roof will be built in the pier & boats area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_kiosk_0.png`

```
a tiny ice-cream kiosk with a giant cone on its roof for the pier & boats of a sunny seaside town (open an ice-cream kiosk): strawberry style, main color close to #f6a7c4, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_kiosk_1.png`

```
a tiny ice-cream kiosk with a giant cone on its roof for the pier & boats of a sunny seaside town (open an ice-cream kiosk): mint style, main color close to #9fe0c8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/pier_kiosk_2.png`

```
a tiny ice-cream kiosk with a giant cone on its roof for the pier & boats of a sunny seaside town (open an ice-cream kiosk): vanilla style, main color close to #f8e7b0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Bookshop

### `art/raw/town/books_yard_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape) (where a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it will be built in the bookshop area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_yard_0.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the bookshop of a sunny seaside town (pave the yard): cobblestone style, main color close to #c9c1b2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_yard_1.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the bookshop of a sunny seaside town (pave the yard): red brick style, main color close to #cf7a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_yard_2.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the bookshop of a sunny seaside town (pave the yard): white gravel style, main color close to #efe6d2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_shop_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an abandoned shabby building with grey faded walls, boarded-up windows, holes in the roof and weeds (where a small charming two-storey seaside town building with a gable roof will be built in the bookshop area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_shop_0.png`

```
a small charming two-storey seaside town building with a gable roof for the bookshop of a sunny seaside town (restore the bookshop): sage style, main color close to #bcd3b0 with accents close to #7a4a3a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_shop_1.png`

```
a small charming two-storey seaside town building with a gable roof for the bookshop of a sunny seaside town (restore the bookshop): brick red style, main color close to #d98c74 with accents close to #4b4f5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_shop_2.png`

```
a small charming two-storey seaside town building with a gable roof for the bookshop of a sunny seaside town (restore the bookshop): lavender style, main color close to #d6c8ea with accents close to #5c4a8a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_sign_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an old blank broken sign hanging crooked from a bracket (where a small round hanging shop sign on a wrought-iron bracket will be built in the bookshop area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_sign_0.png`

```
a small round hanging shop sign on a wrought-iron bracket for the bookshop of a sunny seaside town (hang a book sign): red style, main color close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_sign_1.png`

```
a small round hanging shop sign on a wrought-iron bracket for the bookshop of a sunny seaside town (hang a book sign): blue style, main color close to #4878c0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_sign_2.png`

```
a small round hanging shop sign on a wrought-iron bracket for the bookshop of a sunny seaside town (hang a book sign): green style, main color close to #4f9a5f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_cart_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a small wooden cart full of books will be built in the bookshop area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_cart_0.png`

```
a small wooden cart full of books for the bookshop of a sunny seaside town (add a book cart): wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_cart_1.png`

```
a small wooden cart full of books for the bookshop of a sunny seaside town (add a book cart): blue style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_cart_2.png`

```
a small wooden cart full of books for the bookshop of a sunny seaside town (add a book cart): red style, main color close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_tree_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dead leafless tree (where a round leafy fruit tree will be built in the bookshop area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_tree_0.png`

```
a round leafy fruit tree for the bookshop of a sunny seaside town (plant a shady oak): green oak style, main color close to #5aa84e, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_tree_1.png`

```
a round leafy fruit tree for the bookshop of a sunny seaside town (plant a shady oak): red maple style, main color close to #e8823a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_tree_2.png`

```
a round leafy fruit tree for the bookshop of a sunny seaside town (plant a shady oak): birch style, main color close to #a6d872, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_bench_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a park bench will be built in the bookshop area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_bench_0.png`

```
a park bench for the bookshop of a sunny seaside town (place a reading bench): wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_bench_1.png`

```
a park bench for the bookshop of a sunny seaside town (place a reading bench): white iron style, main color close to #f2f0ea, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_bench_2.png`

```
a park bench for the bookshop of a sunny seaside town (place a reading bench): green style, main color close to #5f9a5f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_statue_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a cute cat statue on a stone pedestal will be built in the bookshop area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_statue_0.png`

```
a cute cat statue on a stone pedestal for the bookshop of a sunny seaside town (raise a cat statue): marble style, main color close to #efebe2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_statue_1.png`

```
a cute cat statue on a stone pedestal for the bookshop of a sunny seaside town (raise a cat statue): bronze style, main color close to #b08850, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_statue_2.png`

```
a cute cat statue on a stone pedestal for the bookshop of a sunny seaside town (raise a cat statue): gold style, main color close to #e8c040, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_lamp_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where an old-fashioned street lamp post will be built in the bookshop area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_lamp_0.png`

```
an old-fashioned street lamp post for the bookshop of a sunny seaside town (add a lamp post): brass style, main color close to #d0a447, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_lamp_1.png`

```
an old-fashioned street lamp post for the bookshop of a sunny seaside town (add a lamp post): classic black style, main color close to #3d3a44, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/books_lamp_2.png`

```
an old-fashioned street lamp post for the bookshop of a sunny seaside town (add a lamp post): mint style, main color close to #7fcfb5, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Windy Hill

### `art/raw/town/hill_path_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape) (where a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it will be built in the windy hill area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_path_0.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the windy hill of a sunny seaside town (make a hill path): cobblestone style, main color close to #c9c1b2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_path_1.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the windy hill of a sunny seaside town (make a hill path): red brick style, main color close to #cf7a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_path_2.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the windy hill of a sunny seaside town (make a hill path): white gravel style, main color close to #efe6d2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_windmill_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken grey windmill with two snapped sails and weeds (where a tall classic windmill with four sails will be built in the windy hill area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_windmill_0.png`

```
a tall classic windmill with four sails for the windy hill of a sunny seaside town (fix the windmill): white & red style, main color close to #f6f3ea with accents close to #c8483a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_windmill_1.png`

```
a tall classic windmill with four sails for the windy hill of a sunny seaside town (fix the windmill): blue & white style, main color close to #c3dcef with accents close to #3f6fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_windmill_2.png`

```
a tall classic windmill with four sails for the windy hill of a sunny seaside town (fix the windmill): cream & green style, main color close to #f6e7c8 with accents close to #4f8f5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_picnic_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a picnic blanket with a basket and fruit will be built in the windy hill area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_picnic_0.png`

```
a picnic blanket with a basket and fruit for the windy hill of a sunny seaside town (lay a picnic blanket): red gingham style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_picnic_1.png`

```
a picnic blanket with a basket and fruit for the windy hill of a sunny seaside town (lay a picnic blanket): blue gingham style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_picnic_2.png`

```
a picnic blanket with a basket and fruit for the windy hill of a sunny seaside town (lay a picnic blanket): yellow gingham style, main color close to #f0b73a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_telescope_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a telescope on a tripod will be built in the windy hill area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_telescope_0.png`

```
a telescope on a tripod for the windy hill of a sunny seaside town (set up a telescope): brass style, main color close to #d0a447, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_telescope_1.png`

```
a telescope on a tripod for the windy hill of a sunny seaside town (set up a telescope): white style, main color close to #f3efe6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_telescope_2.png`

```
a telescope on a tripod for the windy hill of a sunny seaside town (set up a telescope): blue style, main color close to #4878c0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_kites_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where two kites flying high on strings will be built in the windy hill area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_kites_0.png`

```
two kites flying high on strings for the windy hill of a sunny seaside town (fly kites): fish kite style, main color close to #f08a3c, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_kites_1.png`

```
two kites flying high on strings for the windy hill of a sunny seaside town (fly kites): heart kite style, main color close to #e9506f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_kites_2.png`

```
two kites flying high on strings for the windy hill of a sunny seaside town (fly kites): star kite style, main color close to #f0c03a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_trees_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dead tree and a pile of junk (where a small group of trees will be built in the windy hill area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_trees_0.png`

```
a small group of trees for the windy hill of a sunny seaside town (plant pine trees): green pines style, main color close to #4f8f5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_trees_1.png`

```
a small group of trees for the windy hill of a sunny seaside town (plant pine trees): snowy pines style, main color close to #6f9f7a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_trees_2.png`

```
a small group of trees for the windy hill of a sunny seaside town (plant pine trees): birches style, main color close to #a6d872, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_flowers_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a round flower bed with a stone border will be built in the windy hill area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_flowers_0.png`

```
a round flower bed with a stone border for the windy hill of a sunny seaside town (sow wildflowers): roses style, main color close to #e9506f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_flowers_1.png`

```
a round flower bed with a stone border for the windy hill of a sunny seaside town (sow wildflowers): tulips style, main color close to #f39a3a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_flowers_2.png`

```
a round flower bed with a stone border for the windy hill of a sunny seaside town (sow wildflowers): lavender style, main color close to #9b7fd6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_swing_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where an A-frame wooden swing set will be built in the windy hill area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_swing_0.png`

```
an A-frame wooden swing set for the windy hill of a sunny seaside town (hang a swing): wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_swing_1.png`

```
an A-frame wooden swing set for the windy hill of a sunny seaside town (hang a swing): red style, main color close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/hill_swing_2.png`

```
an A-frame wooden swing set for the windy hill of a sunny seaside town (hang a swing): blue style, main color close to #4878c0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

## Town: Lighthouse

### `art/raw/town/light_path_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a muddy empty lot with puddles, stones and weeds (flat isometric diamond shape) (where a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it will be built in the lighthouse area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_path_0.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the lighthouse of a sunny seaside town (pave a stone path): cobblestone style, main color close to #c9c1b2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_path_1.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the lighthouse of a sunny seaside town (pave a stone path): red brick style, main color close to #cf7a5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_path_2.png`

```
a flat paved ground tile (seen from above in isometric perspective, diamond shape), no objects on it for the lighthouse of a sunny seaside town (pave a stone path): white gravel style, main color close to #efe6d2, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_tower_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dirty cracked grey lighthouse tower with faded stripes and a boarded door (where a tall striped lighthouse tower without its top lantern will be built in the lighthouse area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_tower_0.png`

```
a tall striped lighthouse tower without its top lantern for the lighthouse of a sunny seaside town (paint the lighthouse): red stripes style, main color close to #f6f3ea with accents close to #d9473b, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_tower_1.png`

```
a tall striped lighthouse tower without its top lantern for the lighthouse of a sunny seaside town (paint the lighthouse): blue stripes style, main color close to #f6f3ea with accents close to #3f6fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_tower_2.png`

```
a tall striped lighthouse tower without its top lantern for the lighthouse of a sunny seaside town (paint the lighthouse): black stripes style, main color close to #f6f3ea with accents close to #3d3a44, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_beacon_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a dark broken lighthouse lantern room with cracked glass (where the glowing glass lantern room on top of a lighthouse, with a red dome roof will be built in the lighthouse area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_beacon_0.png`

```
the glowing glass lantern room on top of a lighthouse, with a red dome roof for the lighthouse of a sunny seaside town (light the beacon): warm gold style, main color close to #ffd25a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_beacon_1.png`

```
the glowing glass lantern room on top of a lighthouse, with a red dome roof for the lighthouse of a sunny seaside town (light the beacon): white style, main color close to #fff6e0, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_beacon_2.png`

```
the glowing glass lantern room on top of a lighthouse, with a red dome roof for the lighthouse of a sunny seaside town (light the beacon): pink style, main color close to #ff9fb8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_cottage_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
an abandoned shabby building with grey faded walls, boarded-up windows, holes in the roof and weeds (where a small charming two-storey seaside town building with a gable roof will be built in the lighthouse area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_cottage_0.png`

```
a small charming two-storey seaside town building with a gable roof for the lighthouse of a sunny seaside town (fix the keeper's house): white & blue style, main color close to #f6f3ea with accents close to #3f6fa8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_cottage_1.png`

```
a small charming two-storey seaside town building with a gable roof for the lighthouse of a sunny seaside town (fix the keeper's house): yellow & red style, main color close to #f9e48f with accents close to #c8483a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_cottage_2.png`

```
a small charming two-storey seaside town building with a gable roof for the lighthouse of a sunny seaside town (fix the keeper's house): grey & green style, main color close to #d6d3cc with accents close to #4f8f5a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_fence_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a broken fence with fallen and missing planks (where a short straight garden fence section running diagonally will be built in the lighthouse area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_fence_0.png`

```
a short straight garden fence section running diagonally for the lighthouse of a sunny seaside town (fence the cliff edge): white picket style, main color close to #f6f3ea, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_fence_1.png`

```
a short straight garden fence section running diagonally for the lighthouse of a sunny seaside town (fence the cliff edge): rustic wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_fence_2.png`

```
a short straight garden fence section running diagonally for the lighthouse of a sunny seaside town (fence the cliff edge): sea blue style, main color close to #6f9fd8, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_bench_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a park bench will be built in the lighthouse area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_bench_0.png`

```
a park bench for the lighthouse of a sunny seaside town (place a sea-view bench): wood style, main color close to #b07a48, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_bench_1.png`

```
a park bench for the lighthouse of a sunny seaside town (place a sea-view bench): white iron style, main color close to #f2f0ea, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_bench_2.png`

```
a park bench for the lighthouse of a sunny seaside town (place a sea-view bench): green style, main color close to #5f9a5f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_flag_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a flagpole with a waving flag will be built in the lighthouse area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_flag_0.png`

```
a flagpole with a waving flag for the lighthouse of a sunny seaside town (raise a flag): fish flag style, main color close to #4f86c6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_flag_1.png`

```
a flagpole with a waving flag for the lighthouse of a sunny seaside town (raise a flag): cat flag style, main color close to #f08a3c, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_flag_2.png`

```
a flagpole with a waving flag for the lighthouse of a sunny seaside town (raise a flag): star flag style, main color close to #e0533f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_garden_before.png` _(tuỳ chọn — trạng thái "trước khi sửa")_

```
a pile of old junk: broken planks, a dusty crate, stones and weeds (where a round flower bed with a stone border will be built in the lighthouse area of a seaside town). Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_garden_0.png`

```
a round flower bed with a stone border for the lighthouse of a sunny seaside town (plant a flower garden): roses style, main color close to #e9506f, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_garden_1.png`

```
a round flower bed with a stone border for the lighthouse of a sunny seaside town (plant a flower garden): tulips style, main color close to #f39a3a, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```

### `art/raw/town/light_garden_2.png`

```
a round flower bed with a stone border for the lighthouse of a sunny seaside town (plant a flower garden): lavender style, main color close to #9b7fd6, freshly restored and charming. Isometric 2.5D view from above at about 30 degrees (2:1 isometric), like a building or prop in a cozy town-builder mobile game map. Single object, centered, fully visible with a little empty margin, isolated on a fully transparent background (if transparency is impossible: a flat pure white #FFFFFF background), no ground shadow, no floor, no scenery. Hand-drawn 2D illustration for a cozy casual mobile game, like a modern picture book for kids. Flat cel shading with only 2-3 tones per color, one bold dark-brown outline of even thickness around every shape, simple confident shapes with few details, limited warm palette, matte colors, slightly imperfect hand-inked lines. No 3D render, no photorealism, no glossy plastic shine, no gradients, no bokeh, no glow effects, no tiny noisy details, no text, no watermark, no logo.
```
