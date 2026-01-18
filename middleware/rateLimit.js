const requests = new Map();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;

export function rateLimit(req, res, next) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  const now = Date.now();
  const entry = requests.get(ip) || { count: 0, start: now };

  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count += 1;
  requests.set(ip, entry);

  if (entry.count > MAX_REQUESTS) {
    res.setHeader("Content-Type", "image/svg+xml");
    res.end(`
<svg width="700" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0d1117"/>
  <text x="14" y="38" fill="#ff6b6b" font-size="14">
    Rate limit exceeded. Try again later.
  </text>
</svg>
    `);
    return;
  }

  next();
}
