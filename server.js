const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const ROOT_DIR = __dirname;
const IMAGE_DIR = process.env.IMAGE_DIR
  ? path.resolve(process.env.IMAGE_DIR)
  : path.join(ROOT_DIR, 'image');
const CANONICAL_HOST = (process.env.CANONICAL_HOST || 'lamdongcoop.vn').trim().toLowerCase();
const ENFORCE_CANONICAL_REDIRECT = process.env.ENFORCE_CANONICAL_REDIRECT !== 'false';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hoang-cung-2026';

const sessions = new Map();
const imageVersions = new Map();
const sseClients = new Set();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }
});

app.use(express.json());
app.set('trust proxy', true);

function shouldSkipCanonicalRedirect(hostname) {
  if (!hostname) {
    return true;
  }

  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.github.dev')
  );
}

function enforceCanonicalDomain(req, res, next) {
  if (!ENFORCE_CANONICAL_REDIRECT || !CANONICAL_HOST) {
    return next();
  }

  const hostHeader = (req.headers.host || '').split(':')[0].toLowerCase();
  const forwardedProto = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  const isHttps = req.secure || forwardedProto === 'https';

  if (shouldSkipCanonicalRedirect(hostHeader)) {
    return next();
  }

  const isCanonicalHost = hostHeader === CANONICAL_HOST;
  if (isCanonicalHost && isHttps) {
    return next();
  }

  const targetUrl = `https://${CANONICAL_HOST}${req.originalUrl}`;
  return res.redirect(301, targetUrl);
}

app.use(enforceCanonicalDomain);

if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

function createToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isImageFile(fileName) {
  return /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(fileName);
}

function toWebPath(fileName) {
  return `image/${fileName}`;
}

function setVersionFor(fileName, version) {
  const relativePath = toWebPath(fileName);
  imageVersions.set(relativePath, version || Date.now());
}

function loadInitialVersions() {
  if (!fs.existsSync(IMAGE_DIR)) {
    return;
  }

  const files = fs.readdirSync(IMAGE_DIR, { withFileTypes: true });
  files.forEach((entry) => {
    if (!entry.isFile() || !isImageFile(entry.name)) {
      return;
    }
    const fullPath = path.join(IMAGE_DIR, entry.name);
    const stat = fs.statSync(fullPath);
    setVersionFor(entry.name, stat.mtimeMs || Date.now());
  });
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập.' });
  }

  next();
}

function broadcastImageUpdated(relativePath, version) {
  const payload = JSON.stringify({
    type: 'image-updated',
    path: relativePath,
    version
  });

  for (const client of sseClients) {
    client.write(`data: ${payload}\n\n`);
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu.' });
  }

  const token = createToken();
  sessions.set(token, { username, createdAt: Date.now() });

  res.json({ token, username });
});

app.get('/api/images', requireAuth, (req, res) => {
  if (!fs.existsSync(IMAGE_DIR)) {
    return res.json({ images: [] });
  }

  const files = fs.readdirSync(IMAGE_DIR, { withFileTypes: true });
  const images = files
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => ({
      fileName: entry.name,
      path: toWebPath(entry.name),
      version: imageVersions.get(toWebPath(entry.name)) || Date.now()
    }))
    .sort((a, b) => a.fileName.localeCompare(b.fileName, 'vi'));

  res.json({ images });
});

app.post('/api/images/replace', requireAuth, upload.single('file'), (req, res) => {
  const target = (req.body?.target || '').trim();
  const file = req.file;

  if (!target) {
    return res.status(400).json({ message: 'Thiếu tên ảnh cần thay thế.' });
  }

  if (!file) {
    return res.status(400).json({ message: 'Bạn chưa chọn ảnh mới.' });
  }

  const targetFileName = path.basename(target);
  if (!isImageFile(targetFileName)) {
    return res.status(400).json({ message: 'Tệp đích không hợp lệ.' });
  }

  const destination = path.join(IMAGE_DIR, targetFileName);
  if (!fs.existsSync(destination)) {
    return res.status(404).json({ message: 'Không tìm thấy ảnh cần thay thế.' });
  }

  fs.writeFileSync(destination, file.buffer);

  const version = Date.now();
  const relativePath = toWebPath(targetFileName);
  imageVersions.set(relativePath, version);
  broadcastImageUpdated(relativePath, version);

  res.json({
    message: 'Thay thế ảnh thành công.',
    path: relativePath,
    version
  });
});

app.get('/api/image-versions', (req, res) => {
  const versionsObject = Object.fromEntries(imageVersions.entries());
  res.json({ versions: versionsObject });
});

app.get('/api/image-events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('retry: 1500\n\n');

  sseClients.add(res);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

app.get('/healthz', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use('/image', express.static(IMAGE_DIR));

app.use(express.static(ROOT_DIR));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'admin.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'admin.html'));
});

loadInitialVersions();

app.listen(port, () => {
  console.log(`CMS server đang chạy tại http://localhost:${port}`);
});