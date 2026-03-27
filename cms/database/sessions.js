const sessions = new Map();

function createToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

module.exports = { sessions, createToken };
