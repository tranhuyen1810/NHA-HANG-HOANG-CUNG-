# ⚠️ SỬA LỖI: WEBSITE KHÔNG HOẠT ĐỘNG

## 🔴 VẤN ĐỀ PHÁT HIỆN:

Website **https://lamdongcoop.vn** đang trả về lỗi **404 Not Found**!

Nguyên nhân: **GITHUB PAGES CHƯA ĐƯỢC BẬT** hoặc cấu hình sai.

---

## ✅ GIẢI PHÁP: BẬT GITHUB PAGES NGAY

### BƯỚC 1: VÀO SETTINGS GITHUB

1. Mở trình duyệt
2. Vào: **https://github.com/tranhuyen1810/NHA-HANG-HOANG-CUNG-**
3. Click nút **Settings** (góc phải trên, có icon bánh răng ⚙️)

### BƯỚC 2: BẬT GITHUB PAGES

1. Trong Settings, kéo xuống menu bên trái
2. Click **Pages** (ở mục Code and automation)
3. Ở phần **Source**:
   - Branch: Chọn **main** (thay vì None)
   - Folder: Chọn **/ (root)**
4. Click nút **Save** màu xanh
5. Chờ 2-5 phút để GitHub deploy

### BƯỚC 3: KIỂM TRA WEBSITE HOẠT ĐỘNG

**Sau 5 phút**, website sẽ có 2 địa chỉ:

**Link GitHub Pages (tự động):**
```
https://tranhuyen1810.github.io/NHA-HANG-HOANG-CUNG-/
```

**Link domain tùy chỉnh:**
```
https://lamdongcoop.vn
```

**Thử mở cả 2 link:**
- Nếu link GitHub Pages hoạt động → OK
- Nếu lamdongcoop.vn vẫn lỗi → Cần cấu hình DNS

---

## 🔧 BƯỚC 4: CẤU HÌNH DOMAIN (Nếu lamdongcoop.vn vẫn lỗi)

### Cách 1: Kiểm tra DNS hiện tại

Mở terminal và chạy:
```bash
nslookup lamdongcoop.vn
```

Nếu không trỏ về GitHub, cần cấu hình lại DNS.

### Cách 2: Cấu hình DNS tại nhà cung cấp domain

**Bạn cần biết:**
- Mua domain lamdongcoop.vn ở đâu? (VD: Tenten, MatBao, PA, GoDaddy...)
- Có quyền truy cập DNS settings không?

**DNS Records cần thêm:**

**Nếu dùng @ (root domain):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**Hoặc dùng CNAME (subdomain www):**
```
Type: CNAME
Name: www
Value: tranhuyen1810.github.io
```

**Sau khi thêm DNS:**
- Chờ 10 phút - 24 giờ để DNS propagate
- Kiểm tra lại website

---

## 🚀 BƯỚC 5: SAU KHI WEBSITE HOẠT ĐỘNG

### 1. Kiểm tra website:
```
✅ Mở https://lamdongcoop.vn
✅ Xem tất cả trang load đúng
✅ Không có lỗi 404
```

### 2. Đăng ký Google Search Console:
- Link: https://search.google.com/search-console
- Thêm property: lamdongcoop.vn
- Verify ownership
- Submit sitemap

### 3. Request Google Index:
- Ở Search Console search: lamdongcoop.vn
- Click "Request Indexing"

---

## ⏰ TIMELINE:

| Bước | Thời gian |
|------|-----------|
| Bật GitHub Pages | 2-5 phút |
| Cấu hình DNS (nếu cần) | 10 phút - 24 giờ |
| Website live | Ngay sau khi DNS OK |
| Đăng ký Search Console | 5 phút |
| Google crawl website | 1-7 ngày |
| Xuất hiện kết quả tìm kiếm | 1-4 tuần |

---

## 🎯 LÀM NGAY:

### Ưu tiên cao nhất:
1. ✅ **BẬT GITHUB PAGES** (quan trọng nhất!)
2. ✅ Kiểm tra website hoạt động
3. ✅ Nếu cần, cấu hình DNS
4. ✅ Đăng ký Google Search Console

### Tùy chọn (làm song song):
- Tạo Google Business Profile
- Đăng ký Foody, Now
- Chia sẻ trên mạng xã hội

---

## ❓ CÂU HỎI THƯỜNG GẶP:

**Q: Tại sao không thấy trên Google?**
A: Vì website chưa live (lỗi 404). Google không thể index website lỗi.

**Q: Mất bao lâu để xuất hiện?**
A: Sau khi website live + đăng ký Search Console = 1-4 tuần.

**Q: Làm gì để nhanh hơn?**
A: 
1. Sửa lỗi 404 ngay
2. Đăng ký Search Console
3. Tạo Google Business Profile
4. Chia sẻ link trên mạng xã hội
5. Đăng ký các trang review

**Q: Tôi không biết mua domain ở đâu?**
A: 
- Kiểm tra email khi mua domain
- Dùng https://lookup.icann.org/en → nhập lamdongcoop.vn
- Hỏi người quản lý IT/web

---

## 🆘 CẦN TRỢ GIÚP?

Nếu không biết cách bật GitHub Pages hoặc cấu hình DNS, 
hãy cho tôi biết:
1. Bạn có quyền truy cập GitHub repo không?
2. Mua domain lamdongcoop.vn ở đâu?
3. Có quyền truy cập DNS settings không?

Tôi sẽ hướng dẫn chi tiết từng bước! 🎉
