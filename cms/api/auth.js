const { Router } = require('express');
const { sessions, createToken } = require('../database/sessions');

const router = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hoang-cung-2026';

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu.' });
  }

  const token = createToken();
  sessions.set(token, { username, createdAt: Date.now() });

  res.json({ token, username });
});

router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

module.exports = router;
