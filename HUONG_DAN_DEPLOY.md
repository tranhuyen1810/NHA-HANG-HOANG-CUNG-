# 🚀 HƯỚNG DẪN DEPLOY WEBSITE LÊN INTERNET

## ⚠️ VẤN ĐỀ HIỆN TẠI:
Website của bạn **CHỈ TỒN TẠI TRÊN GITHUB** chứ chưa được deploy lên internet.
Google không thể tìm thấy vì website chưa "live" trên domain hoangcung-dalat.vn

---

## 📋 GIẢI PHÁP: 3 CÁCH DEPLOY WEBSITE

### ✅ CÁCH 1: GITHUB PAGES (MIỄN PHÍ - ĐỀ XUẤT)

**Bước 1: Enable GitHub Pages**
1. Vào repository: https://github.com/tranhuyen1810/NHA-HANG-HOANG-CUNG-
2. Click **Settings** (góc phải trên)
3. Bên trái chọn **Pages**
4. Ở phần **Source**:
   - Branch: chọn `main`
   - Folder: chọn `/ (root)`
   - Click **Save**

**Bước 2: Chờ deploy (2-5 phút)**
Website sẽ có địa chỉ tạm:
```
https://tranhuyen1810.github.io/NHA-HANG-HOANG-CUNG-/
```

**Bước 3: Kết nối domain hoangcung-dalat.vn**
1. Vào nhà cung cấp domain (nơi mua domain hoangcung-dalat.vn)
2. Thêm DNS records:
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
   
   Type: CNAME
   Name: www
   Value: tranhuyen1810.github.io
   ```

3. Quay lại GitHub Pages settings
4. Ở phần **Custom domain**, nhập: `hoangcung-dalat.vn`
5. Click **Save**
6. Chờ DNS propagate (có thể mất 24-48 giờ)

---

### 💰 CÁCH 2: HOSTING VIỆT NAM (TRẢ PHÍ)

**Các nhà cung cấp phổ biến:**
- **MATBAO** (matbao.net) - 15,000đ/tháng
- **AZDIGI** (azdigi.com) - 20,000đ/tháng  
- **INET** (inet.vn) - 25,000đ/tháng

**Các bước:**
1. Mua hosting + domain (nếu chưa có)
2. Upload files qua FTP/cPanel:
   - index.html
   - style.css
   - script.js
   - robots.txt
   - sitemap.xml
   - Các thư mục images/
3. Trỏ domain về hosting
4. Website sẽ live ngay sau vài phút

---

### ☁️ CÁCH 3: NETLIFY/VERCEL (MIỄN PHÍ)

**NETLIFY:**
1. Vào https://netlify.com
2. Đăng ký tài khoản (dùng GitHub)
3. Click "Add new site" → "Import from Git"
4. Chọn repository: NHA-HANG-HOANG-CUNG-
5. Deploy settings để mặc định
6. Click "Deploy"
7. Website sẽ có domain: `something.netlify.app`
8. Vào Site settings → Domain management → Add custom domain
9. Nhập: `hoangcung-dalat.vn`
10. Cấu hình DNS theo hướng dẫn

**VERCEL:** (Tương tự Netlify)
- https://vercel.com

---

## 🎯 ĐỀ XUẤT CỦA TÔI:

### Nếu bạn ĐÃ MUA domain hoangcung-dalat.vn:
→ Dùng **GitHub Pages** (miễn phí) + kết nối domain

### Nếu bạn CHƯA MUA domain:
→ **Option A:** Deploy GitHub Pages trước, dùng link tạm
→ **Option B:** Mua hosting + domain combo (khoảng 200k/năm)

---

## 📝 SAU KHI WEBSITE ĐÃ LIVE:

1. **Kiểm tra website hoạt động:**
   - Mở trình duyệt ẩn danh
   - Truy cập domain của bạn
   - Đảm bảo website hiển thị đúng

2. **Đăng ký Google Search Console:**
   - https://search.google.com/search-console
   - Thêm domain đã live
   - Xác thực quyền sở hữu
   - Submit sitemap

3. **Google sẽ index trong 1-4 tuần**

---

## ❓ CÂU HỎI THƯỜNG GẶP:

**Q: Tôi có domain hoangcung-dalat.vn chưa?**
A: Cần kiểm tra với người quản lý domain hoặc IT của công ty

**Q: Tôi không biết mua domain ở đâu?**  
A: Kiểm tra email/hóa đơn khi mua, hoặc dùng công cụ whois:
   https://lookup.icann.org/en/lookup → nhập hoangcung-dalat.vn

**Q: Tốn bao nhiêu tiền?**
A: 
- GitHub Pages: MIỄN PHÍ (chỉ trả tiền domain ~200k/năm)
- Hosting Việt Nam: 150k-300k/năm
- Netlify/Vercel: MIỄN PHÍ (trả tiền domain nếu cần)

**Q: Mất bao lâu để hiển thị trên Google?**
A: 1-4 tuần sau khi website live + đăng ký Search Console

---

## 🆘 CẦN TRỢ GIÚP?

Nếu cần, hãy:
1. Cho tôi biết bạn đã mua domain hoangcung-dalat.vn chưa?
2. Mua ở nhà cung cấp nào?
3. Có ngân sách cho hosting không?

Tôi sẽ hướng dẫn chi tiết từng bước! 🎉
