const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..');

const IMAGE_DIR = process.env.IMAGE_DIR
  ? path.resolve(process.env.IMAGE_DIR)
  : path.join(ROOT_DIR, 'cms', 'uploads');

module.exports = { ROOT_DIR, IMAGE_DIR };
