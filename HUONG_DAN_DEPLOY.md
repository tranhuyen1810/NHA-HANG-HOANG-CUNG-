# 🚀 HƯỚNG DẪN DEPLOY CMS (ADMIN DÙNG ĐƯỢC THẬT)

## ✅ Kết luận nhanh
- `lamdongcoop.vn` hiện đang chạy trên GitHub Pages (hosting tĩnh).
- Hosting tĩnh **không chạy được** API `/api/login`, upload ảnh, SSE.
- Vì vậy muốn vào admin (`/admin`) và thay ảnh realtime thì phải deploy backend Node.js.

---

## 🎯 Mục tiêu
1. Khách truy cập đúng domain chính `https://lamdongcoop.vn/`
2. Nhân viên truy cập admin tại `https://lamdongcoop.vn/admin`
3. Đăng nhập: `admin / hoang-cung-2026`
4. Thay ảnh và website cập nhật ngay

---

## 🛠 Phương án đề xuất: Render (nhanh nhất)

Repository đã có sẵn file `render.yaml` để deploy tự động.

### Bước 1: Đẩy code mới lên GitHub

```bash
git add .
git commit -m "Add CMS admin + Render deployment config"
git push origin main
```

### Bước 2: Tạo service trên Render
1. Vào https://dashboard.render.com
2. Chọn **New +** → **Blueprint**
3. Chọn repository: `tranhuyen1810/NHA-HANG-HOANG-CUNG-`
4. Render sẽ tự đọc file `render.yaml` và tạo web service
5. Chờ deploy xong (trạng thái **Live**)

### Bước 3: Kiểm tra URL Render
- Mở URL Render cấp (ví dụ `https://xxx.onrender.com/admin`)
- Đăng nhập thử:
  - Tài khoản: `admin`
  - Mật khẩu: `hoang-cung-2026`

> Lưu ý: Trong `render.yaml`, biến `ENFORCE_CANONICAL_REDIRECT` đang để `false` để test trên domain Render trước.

### Bước 4: Gắn domain `lamdongcoop.vn`
1. Vào service trên Render → **Settings** → **Custom Domains**
2. Add:
   - `lamdongcoop.vn`
   - `www.lamdongcoop.vn`
3. Render cung cấp bản ghi DNS, thêm tại nhà cung cấp domain
4. Chờ DNS propagate

### Bước 5: Bật ép domain chuẩn
Sau khi domain chạy ổn, vào Render → **Environment**:
- đổi `ENFORCE_CANONICAL_REDIRECT=false` thành `true`
- Redeploy service

Kết quả: mọi URL phụ sẽ 301 về `https://lamdongcoop.vn/`

---

## 📁 Biến môi trường đang dùng
- `CANONICAL_HOST=lamdongcoop.vn`
- `ENFORCE_CANONICAL_REDIRECT=false` (đổi `true` sau khi gắn domain)
- `ADMIN_USERNAME=admin`
- `ADMIN_PASSWORD=hoang-cung-2026`
- `IMAGE_DIR=/var/data/image`

---

## 🧪 Checklist kiểm tra sau deploy

```bash
curl -I https://lamdongcoop.vn/
curl -I https://lamdongcoop.vn/admin
curl -i -X POST https://lamdongcoop.vn/api/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"hoang-cung-2026"}'
```

Kỳ vọng:
- `/admin` trả `200`
- `/api/login` trả `200` và có `token`

---

## 👩‍💼 Luồng sử dụng cho nhân viên
1. Mở `https://lamdongcoop.vn/admin`
2. Đăng nhập `admin / hoang-cung-2026`
3. Vào **Quản lý Hình ảnh**
4. Bấm **Thay thế** → chọn ảnh mới → bấm **Upload**
5. Ảnh website cập nhật ngay
