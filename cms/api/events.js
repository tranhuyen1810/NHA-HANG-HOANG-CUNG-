// Server-Sent Events: phát sóng cập nhật ảnh đến tất cả client đang mở admin
const { Router } = require('express');

const router = Router();
const sseClients = new Set();

router.get('/image-events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('retry: 1500\n\n');

  sseClients.add(res);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

function broadcastImageUpdated(relativePath, version) {
  const payload = JSON.stringify({ type: 'image-updated', path: relativePath, version });
  for (const client of sseClients) {
    client.write(`data: ${payload}\n\n`);
  }
}

module.exports = { router, broadcastImageUpdated };
