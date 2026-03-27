const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAuth } = require('../middleware/auth');
const { IMAGE_DIR } = require('../database/config');
const { broadcastImageUpdated } = require('./events');

const router = Router();
const imageVersions = new Map();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }
});

function isImageFile(fileName) {
  return /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(fileName);
}

function toWebPath(fileName) {
  return `image/${fileName}`;
}

function loadInitialVersions() {
  if (!fs.existsSync(IMAGE_DIR)) return;
  fs.readdirSync(IMAGE_DIR, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isFile() || !isImageFile(entry.name)) return;
    const stat = fs.statSync(path.join(IMAGE_DIR, entry.name));
    imageVersions.set(toWebPath(entry.name), stat.mtimeMs || Date.now());
  });
}

router.get('/images', requireAuth, (req, res) => {
  if (!fs.existsSync(IMAGE_DIR)) return res.json({ images: [] });

  const files = fs.readdirSync(IMAGE_DIR, { withFileTypes: true });
  const images = files
    .filter((e) => e.isFile() && isImageFile(e.name))
    .map((e) => ({
      fileName: e.name,
      path: toWebPath(e.name),
      version: imageVersions.get(toWebPath(e.name)) || Date.now()
    }))
    .sort((a, b) => a.fileName.localeCompare(b.fileName, 'vi'));

  res.json({ images });
});

router.post('/images/replace', requireAuth, upload.single('file'), (req, res) => {
  const target = (req.body?.target || '').trim();
  const file = req.file;

  if (!target) return res.status(400).json({ message: 'Thiếu tên ảnh cần thay thế.' });
  if (!file) return res.status(400).json({ message: 'Bạn chưa chọn ảnh mới.' });

  const targetFileName = path.basename(target);
  if (!isImageFile(targetFileName)) return res.status(400).json({ message: 'Tệp đích không hợp lệ.' });

  const destination = path.join(IMAGE_DIR, targetFileName);
  if (!fs.existsSync(destination)) return res.status(404).json({ message: 'Không tìm thấy ảnh cần thay thế.' });

  fs.writeFileSync(destination, file.buffer);

  const version = Date.now();
  const relativePath = toWebPath(targetFileName);
  imageVersions.set(relativePath, version);
  broadcastImageUpdated(relativePath, version);

  res.json({ message: 'Thay thế ảnh thành công.', path: relativePath, version });
});

router.get('/image-versions', (req, res) => {
  res.json({ versions: Object.fromEntries(imageVersions.entries()) });
});

loadInitialVersions();

module.exports = router;
