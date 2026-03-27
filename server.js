const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const ROOT_DIR = __dirname;

// Modules CMS
const { enforceCanonicalDomain } = require('./cms/middleware/canonical');
const authRouter = require('./cms/api/auth');
const imagesRouter = require('./cms/api/images');
const { router: eventsRouter } = require('./cms/api/events');
const { IMAGE_DIR } = require('./cms/database/config');

// Đảm bảo thư mục uploads tồn tại
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

app.use(express.json());
app.set('trust proxy', true);
app.use(enforceCanonicalDomain);

// API routes
app.use('/api', authRouter);
app.use('/api', imagesRouter);
app.use('/api', eventsRouter);

app.get('/healthz', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// Serve ảnh tại /image/ (tương thích với index.html)
app.use('/image', express.static(IMAGE_DIR));

// Admin CMS — truy cập tại /admin/
app.use('/admin', express.static(path.join(ROOT_DIR, 'cms', 'admin')));
app.get('/admin.html', (req, res) => res.redirect(301, '/admin/'));

// Website chính
app.use(express.static(ROOT_DIR));

app.listen(port, () => {
  console.log(`CMS server đang chạy tại http://localhost:${port}`);
  console.log(`  Admin panel : http://localhost:${port}/admin/`);
  console.log(`  Thư mục ảnh : ${IMAGE_DIR}`);
});