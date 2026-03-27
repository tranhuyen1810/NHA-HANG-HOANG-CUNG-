const CANONICAL_HOST = (process.env.CANONICAL_HOST || 'lamdongcoop.vn').trim().toLowerCase();
const ENFORCE_CANONICAL_REDIRECT = process.env.ENFORCE_CANONICAL_REDIRECT !== 'false';

function shouldSkipCanonicalRedirect(hostname) {
  if (!hostname) return true;
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.github.dev')
  );
}

function enforceCanonicalDomain(req, res, next) {
  if (!ENFORCE_CANONICAL_REDIRECT || !CANONICAL_HOST) return next();

  const hostHeader = (req.headers.host || '').split(':')[0].toLowerCase();
  const forwardedProto = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  const isHttps = req.secure || forwardedProto === 'https';

  if (shouldSkipCanonicalRedirect(hostHeader)) return next();

  if (hostHeader === CANONICAL_HOST && isHttps) return next();

  return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
}

module.exports = { enforceCanonicalDomain };
