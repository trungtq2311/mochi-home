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

Game là web app, được đóng gói thành app thật bằng [Capacitor](https://capacitorjs.com) 8. Dự án native đã có sẵn trong repo:

| Thư mục / file | Nội dung |
|---|---|
| `capacitor.config.ts` | **App id, tên app**, màu splash |
| `android/` | Dự án Android Studio (đã khoá màn hình dọc, ẩn thanh trạng thái) |
| `ios/` | Dự án Xcode (Swift Package Manager — không cần CocoaPods; đã khoá dọc, ẩn thanh trạng thái) |
| `scripts/icons.ts` | `npm run icons`: vẽ lại toàn bộ icon + màn hình chờ từ `public/icon.svg` |
| `store/` | Nội dung trang store tiếng Anh/Việt: gợi ý tên, mô tả, từ khoá, thể loại, phân loại tuổi |
| `public/privacy.html` | Chính sách quyền riêng tư (store bắt buộc có link) |
| `src/core/haptics.ts` | Rung nhẹ khi tạo vật phẩm đặc biệt, rung vừa khi nổ bom/combo, rung "thành công" khi thắng (tắt âm thanh là tắt rung) |

Mỗi lần sửa code game, chép bản build mới vào dự án native:

```bash
npm run sync
```

(`npm run sync` = `npm run build && npx cap sync`.) Sửa `public/icon.svg` thì chạy `npm run icons` rồi `npm run sync`.

### Android (làm được ngay trên Windows)

1. **Cài Android Studio** từ https://developer.android.com/studio (cài mặc định, lần mở đầu tiên để nó tự tải Android SDK).
   Android Studio có sẵn Java 21 nên không cần nâng Java 8 trên máy. Nếu muốn build bằng dòng lệnh thì đặt
   `JAVA_HOME=C:\Program Files\Android\Android Studio\jbr`.
2. Build và mở dự án:
   ```bash
   npm run sync
   ```
   ```bash
   npx cap open android
   ```
   (Nếu lệnh không tìm thấy Android Studio: mở Android Studio → *Open* → chọn thư mục `android`.) Lần đầu Gradle tải thư viện mất vài phút.
3. **Chạy thử trên điện thoại**: bật *Tuỳ chọn nhà phát triển → Gỡ lỗi USB*, cắm cáp, bấm nút ▶ Run.
4. **Tạo file AAB đã ký** để nộp Google Play: *Build → Generate Signed App Bundle or APK → Android App Bundle* →
   *Create new…* để tạo keystore (`.jks`). **Cất giữ keystore và mật khẩu cẩn thận, sao lưu ra chỗ khác** — mất là
   không cập nhật app được nữa (trừ khi bật Play App Signing, Google mặc định bật). Chọn bản *release* → file ra ở
   `android/app/release/app-release.aab`. Không commit keystore lên git.
5. Vào [Google Play Console](https://play.google.com/console) (25 USD, một lần) → tạo app → tải AAB lên *Kiểm thử nội bộ* trước.
   Tài khoản cá nhân mới phải chạy *kiểm thử kín* với ít nhất 12 người trong 14 ngày rồi mới được phát hành chính thức.
6. Mỗi bản cập nhật: tăng `versionCode` (số nguyên, +1 mỗi lần nộp) và `versionName` trong `android/app/build.gradle`.

### iOS (bắt buộc có máy Mac)

Apple chỉ cho build app iOS bằng Xcode trên macOS, nên phần này không làm được trên Windows. Cần:
- Một máy Mac (hoặc thuê Mac trên mây như MacinCloud, hoặc dịch vụ build như Codemagic / GitHub Actions macOS) cài **Xcode bản mới nhất**.
- Tài khoản [Apple Developer Program](https://developer.apple.com/programs/) (99 USD/năm).

Các bước trên Mac:
1. `git clone` repo, cài Node.js, rồi chạy `npm install` và `npm run sync`.
2. `npx cap open ios` → Xcode mở dự án `ios/App` và tự tải các Swift Package (Capacitor + plugin).
3. Chọn target **App → Signing & Capabilities** → *Team* = tài khoản Apple Developer; kiểm tra *Bundle Identifier*.
4. Chạy thử: cắm iPhone, chọn máy, bấm ▶.
5. Nộp: chọn *Any iOS Device* → *Product → Archive* → *Distribute App → App Store Connect*. Sau đó vào
   [App Store Connect](https://appstoreconnect.apple.com) để thử qua TestFlight và gửi duyệt.
6. Mỗi bản cập nhật: tăng *Version* và *Build* trong tab General của target App.

Dự án đang bật cả iPhone và iPad, nên App Store sẽ đòi ảnh chụp màn hình iPad 13". Không muốn làm bản iPad thì trong
*General → Supported Destinations* xoá iPad.

### Đổi tên / app id

App id (`com.mochihome.game`) là mã định danh vĩnh viễn trên store — **chốt trước lần nộp đầu tiên, sau đó không đổi được**.
Tên hiển thị thì đổi lúc nào cũng được. Khi đổi, sửa ở các chỗ sau rồi chạy `npm run sync`:

| Muốn đổi | Sửa ở đâu |
|---|---|
| App id | `capacitor.config.ts` (`appId`); `android/app/build.gradle` (`applicationId`); `android/app/src/main/res/values/strings.xml` (`package_name`, `custom_url_scheme`); Xcode → target App → *Bundle Identifier* (iOS, làm trên Mac) |
| Tên app | `capacitor.config.ts` (`appName`); `android/app/src/main/res/values/strings.xml` (`app_name`, `title_activity_main`); `ios/App/App/Info.plist` (`CFBundleDisplayName`); bản web: `<title>` trong `index.html` và `public/manifest.webmanifest` |

Không cần đổi `namespace` và thư mục `java/com/mochihome/game` của Android — đó chỉ là tên package trong code, không phải id trên store.

### Việc còn lại trước khi phát hành

1. Kiểm tra tên game chưa bị trùng trên store và chưa bị đăng ký nhãn hiệu (gợi ý tên trong `store/`).
2. Đưa `public/privacy.html` lên một địa chỉ công khai (GitHub Pages, Netlify, Cloudflare Pages… — đưa cả thư mục `dist/` lên là có luôn bản web), thay `YOUR-EMAIL@example.com` bằng email thật, rồi dán link vào cả hai store.
3. Ảnh chụp màn hình: Google Play cần ≥ 2 ảnh điện thoại + ảnh bìa 1024×500; App Store cần ảnh iPhone 6.9" (1320×2868) và iPad 13" (2064×2752) nếu bật iPad.
4. Thêm mua hàng trong app (RevenueCat hoặc `cordova-plugin-purchase`) nếu muốn bán xu — khi đó phải cập nhật chính sách quyền riêng tư và phân loại tuổi.
