const { sessions } = require('../database/sessions');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập.' });
  }

  next();
}

module.exports = { requireAuth };
