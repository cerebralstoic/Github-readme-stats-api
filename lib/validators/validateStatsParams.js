const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const ALLOWED_STYLES = new Set([
  "stats",
  "badge",
  "radar",
  "insight",
  "top-languages",
  "summary"
]);

function svgError(message) {
  return `
<svg width="700" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0d1117"/>
  <text x="14" y="38" fill="#ff6b6b" font-size="14">
    ${message}
  </text>
</svg>`;
}

export function validateStatsParams(username, style) {
  if (!username) {
    return svgError("Missing username");
  }

  if (typeof username !== "string") {
    return svgError("Invalid username");
  }

  if (username.length > 39) {
    return svgError("Username too long");
  }

  if (!USERNAME_REGEX.test(username)) {
    return svgError("Invalid GitHub username format");
  }

  if (style && !ALLOWED_STYLES.has(style)) {
    return svgError(`Invalid style: ${style}`);
  }

  return null;
}
