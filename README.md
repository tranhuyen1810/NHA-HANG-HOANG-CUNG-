# 🏮 Landing Page - Nhà hàng Hoàng Cung

## 📋 Thông tin dự án

Landing page cho **Nhà hàng Hoàng Cung** - Kiến trúc Huế độc đáo tại Osaka Village Đà Lạt

**Địa chỉ:** 62 Đống Đa, Phường 3, Đà Lạt  
**Hotline:** 0366 650 897

---

## 🎨 Cấu trúc Landing Page

### 1. **Warning Banner (Tùy chọn)**
   - Thông báo quan trọng
   - Có thể đóng và lưu trạng thái

### 2. **Header (Navigation)**
   - Logo nhà hàng
   - Menu điều hướng
   - Nút đặt bàn
   - Responsive mobile menu

### 3. **Hero Section**
   - Hình ảnh banner lớn
   - Tiêu đề chính
   - Mô tả ngắn gọn
   - Call-to-action buttons (Đặt bàn, Chỉ đường)
   - Scroll indicator

### 4. **About Section**
   - Giới thiệu về nhà hàng
   - Hình ảnh không gian
   - Các điểm nổi bật
   - Link xem thực đơn

### 5. **Gallery Section**
   - Thư viện hình ảnh (6 ảnh)
   - Hiệu ứng hover
   - Popup xem ảnh phóng to

### 6. **Menu Section**
   - Danh sách món ăn đặc trưng (6 món)
   - Hình ảnh món ăn
   - Mô tả ngắn gọn
   - Nút xem thực đơn đầy đủ

### 7. **Location Section**
   - Thông tin địa chỉ chi tiết
   - Số điện thoại hotline
   - Giờ mở cửa
   - Google Maps iframe
   - Nút chỉ đường và gọi đặt bàn

### 8. **Footer**
   - Thông tin liên hệ
   - Link mạng xã hội
   - Menu footer
   - Copyright

### 9. **Back to Top Button**
   - Nút cuộn lên đầu trang
   - Hiển thị khi scroll xuống

---

## 🚀 Cách chạy Landing Page

### Phương pháp 1: Mở trực tiếp (Đơn giản nhất)

1. **Mở File Explorer** và điều hướng đến thư mục dự án
2. **Double-click** vào file `index.html`
3. Website sẽ tự động mở trên trình duyệt mặc định

### Phương pháp 2: Sử dụng VS Code + Live Server

1. **Mở VS Code**
2. Mở thư mục dự án: `File > Open Folder`
3. **Cài đặt extension "Live Server"**:
   - Click vào biểu tượng Extensions (Ctrl+Shift+X)
   - Tìm kiếm "Live Server"
   - Click Install
4. **Click chuột phải vào file** `index.html`
5. Chọn **"Open with Live Server"**
6. Website sẽ mở tại: `http://127.0.0.1:5500`

### Phương pháp 3: Sử dụng Python HTTP Server

```bash
# Mở Terminal/Command Prompt tại thư mục dự án

# Python 3
python -m http.server 8000

# Hoặc Python 2
python -m SimpleHTTPServer 8000

# Mở trình duyệt và truy cập:
# http://localhost:8000
```

### Phương pháp 4: Sử dụng Node.js + http-server

```bash
# Cài đặt http-server (chỉ cần làm 1 lần)
npm install -g http-server

# Chạy server tại thư mục dự án
http-server

# Mở trình duyệt và truy cập:
# http://localhost:8080
```

---

## 📁 Cấu trúc Files

```
NHA HANG HOANG CUNG/
│
├── index.html          # File HTML chính
├── style.css           # File CSS styling
├── script.js           # File JavaScript
└── README.md          # File hướng dẫn này
```

---

## 🎯 Tính năng chính

### ✅ Responsive Design
- Tự động điều chỉnh trên mọi thiết bị
- Mobile, Tablet, Desktop

### ✅ Smooth Animations
- Hiệu ứng cuộn mượt mà
- Animation khi scroll
- Hover effects

### ✅ SEO Optimized
- Meta tags đầy đủ
- Semantic HTML
- Alt text cho images

### ✅ Performance
- Fast loading
- Lazy loading images
- Optimized code

### ✅ Interactive Features
- Mobile menu
- Image popup gallery
- Smooth scroll navigation
- Back to top button

---

## 🔧 Tùy chỉnh

### Thay đổi màu sắc

Mở file `style.css` và chỉnh sửa các biến CSS:

```css
:root {
    --primary-color: #c8a97e;      /* Màu chủ đạo */
    --secondary-color: #8b4513;    /* Màu phụ */
    --dark-color: #1a1a1a;         /* Màu tối */
    --light-color: #f8f8f8;        /* Màu sáng */
}
```

### Thay đổi hình ảnh

Trong file `index.html`, tìm và thay thế các URL hình ảnh:

```html
<!-- Ví dụ thay đổi Hero background -->
<section class="hero" style="background-image: url('đường-dẫn-ảnh-mới.jpg')">
```

Hoặc trong `style.css`:

```css
.hero {
    background: url('đường-dẫn-ảnh-mới.jpg');
}
```

### Thay đổi nội dung

Mở file `index.html` và chỉnh sửa text trực tiếp trong các thẻ HTML.

---

## 📱 Liên kết mạng xã hội

Để kích hoạt các link mạng xã hội, mở `index.html` và thay thế `#` bằng link thực:

```html
<a href="https://facebook.com/your-page">
    <i class="fab fa-facebook"></i>
</a>
```

---

## 🗺️ Google Maps

Để cập nhật bản đồ chính xác:

1. Truy cập [Google Maps](https://www.google.com/maps)
2. Tìm địa chỉ: **62 Đống Đa, Phường 3, Đà Lạt**
3. Click **Share** > **Embed a map**
4. Copy mã iframe
5. Thay thế trong file `index.html` tại section Location

---

## 🌐 Đưa website lên Online

### Option 1: GitHub Pages (Miễn phí)

1. Tạo repository trên GitHub
2. Upload các files
3. Vào Settings > Pages
4. Chọn branch main
5. Website sẽ có địa chỉ: `username.github.io/repository-name`

### Option 2: Netlify (Miễn phí)

1. Truy cập [netlify.com](https://www.netlify.com)
2. Drag & drop thư mục dự án
3. Website sẽ được deploy tự động
4. Có domain miễn phí: `your-site.netlify.app`

### Option 3: Vercel (Miễn phí)

1. Truy cập [vercel.com](https://vercel.com)
2. Import project
3. Deploy tự động
4. Domain miễn phí: `your-site.vercel.app`

### Option 4: Hosting trả phí

- Hostinger
- SiteGround
- Bluehost
- VPS (DigitalOcean, AWS, Google Cloud)

---

## 📞 Hỗ trợ & Liên hệ

Nếu cần hỗ trợ kỹ thuật hoặc tùy chỉnh thêm, vui lòng liên hệ:

**Nhà hàng Hoàng Cung**  
📍 62 Đống Đa, Phường 3, Đà Lạt  
📞 0366 650 897

---

## 📝 License

© 2026 Nhà hàng Hoàng Cung. All rights reserved.

---

## 🎉 Chúc bạn thành công!

Landing page đã sẵn sàng để sử dụng. Hãy mở file `index.html` để xem kết quả!