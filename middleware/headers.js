export function svgHeaders(req, res, next) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "public, max-age=21600");
  next();
}
