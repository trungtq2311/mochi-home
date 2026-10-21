# Mochi Home — Match & Decorate

Game ghép 3 + trang trí nhà (cùng thể loại Homescapes) chạy trên điện thoại. Mọi hình ảnh và âm thanh đều được vẽ/tổng hợp bằng code nên **không dùng tài nguyên có bản quyền của bên nào**.

## Chạy thử

```bash
npm install
npm run dev
```

- Máy tính: mở `http://localhost:5173`
- Điện thoại (cùng Wi-Fi): mở địa chỉ `Network:` mà Vite in ra, ví dụ `http://192.168.1.10:5173`.
  Trên iPhone bấm *Chia sẻ → Thêm vào MH chính* để chơi toàn màn hình như app.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `src/match3/board.ts` | Logic bàn chơi: tìm match, tạo vật phẩm đặc biệt, rơi/lấp ô, xáo trộn |
| `src/match3/engine.ts` | Luật chơi: lượt, mục tiêu, tên lửa/bom/máy bay/cầu vồng, combo, thưởng cuối màn. Chạy trên đồng hồ ảo nên bot mô phỏng được |
| `src/match3/levels.ts` | Bộ sinh màn chơi (hình bàn, thùng gỗ, vết bẩn, mục tiêu) |
| `src/match3/tuning.ts` | **Số lượt của từng màn — được tính tự động bằng bot** (xem dưới) |
| `src/match3/renderer.ts`, `sprites.ts` | Đồ họa canvas: viên ngọc, hiệu ứng, hạt |
| `src/meta/rooms.ts`, `roomArt.ts` | Dữ liệu & hình vẽ SVG các phòng |
| `src/meta/events.ts` | Sự kiện: quà hằng ngày, nhiệm vụ ngày, lễ hội 3 ngày, cuộc đua hằng ngày |
| `src/ui/*` | Màn hình nhà, màn chơi, popup |
| `src/sim/*` | Bot đo độ khó |

## Hình vẽ bằng AI

Game tự dùng ảnh trong `public/art/` nếu có, thiếu ảnh nào thì dùng hình vẽ bằng code cho chỗ đó.

1. Mở [art/PROMPTS.md](art/PROMPTS.md): có style chung + prompt cho từng ảnh (144 ảnh, trong đó ~30 ảnh "trước khi sửa" là tuỳ chọn).
2. Tạo ảnh bằng ChatGPT (khuyên dùng, xuất nền trong suốt) / Gemini / Midjourney, lưu đúng tên vào `art/raw/...` (ví dụ `art/raw/pieces/red.png`, `art/raw/rooms/living/sofa_0.png`).
3. Chạy `npm run art` (tự xoá nền trắng, cắt viền, nén WebP, tạo manifest) và `npm run art:status` để xem còn thiếu gì.
4. Một phòng chuyển sang dùng ảnh khi đã có texture sàn (`floor_0`, `tiles_0`, `lawn_0`). Vị trí từng món đồ chỉnh trong `LAYOUT` ở `src/art/catalog.ts`.

## Độ khó (dễ hơn Homescapes)

Số lượt không đoán tay mà được **hiệu chỉnh bằng bot** chơi kiểu "người chơi bình thường":

```bash
node src/sim/calibrate.ts 200 80   # tính lại số lượt cho 200 màn (80 lượt chơi/màn) → ghi tuning.ts
node src/sim/simulate.ts 1 60 60   # báo cáo tỉ lệ thắng từng màn
```

Mục tiêu tỉ lệ thắng của bot: ~96% ngay sau màn khó, giảm dần ~84%, màn khó (mỗi 10 màn) ~70%. Sửa hàm `target()` trong `src/sim/calibrate.ts` để dễ/khó hơn.

Ngoài ra game còn "nương tay" thêm:
- Thua 2 lần liên tiếp một màn → tặng tên lửa + bom + 3 lượt.
- Hết lượt lần đầu → +5 lượt miễn phí.
- Gợi ý nước đi sau 5 giây; chạm vào vật phẩm đặc biệt để kích hoạt ngay.
- Màu của mục tiêu rơi xuống nhiều hơn một chút.
- Mạng hồi sau 15 phút (Homescapes: 30 phút).

## Đưa lên App Store / Google Play

Game là web app nên đóng gói bằng [Capacitor](https://capacitorjs.com):

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init "Mochi Home" com.yourcompany.mochihome --web-dir dist
npm run build
npx cap add android   # build Android được ngay trên Windows (cần Android Studio)
npx cap add ios       # iOS bắt buộc build trên máy Mac có Xcode
npx cap sync
```

Cần chuẩn bị trước khi phát hành:
1. Tài khoản Apple Developer (99 USD/năm) và Google Play Console (25 USD một lần).
2. Kiểm tra tên game chưa bị trùng trên store và chưa bị đăng ký nhãn hiệu.
3. Thêm mua hàng trong app (RevenueCat hoặc `cordova-plugin-purchase`) nếu muốn bán xu.
4. Chính sách quyền riêng tư (game hiện không thu thập dữ liệu nào, tiến trình lưu ngay trên máy).
