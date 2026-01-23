function sanitizeValue(value, fallback = "N/A") {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
}

function getSafeArray(arr, defaultArr = []) {
  return Array.isArray(arr) && arr.length > 0 ? arr : defaultArr;
}

function renderStatsGradient(stats, theme) {
  const username = sanitizeValue(stats.username, "User");
  const repoCount = sanitizeValue(stats.repoCount, "0");
  const stars = sanitizeValue(stats.stars, "0");
  const forks = sanitizeValue(stats.forks, "0");
  const followers = sanitizeValue(stats.followers, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const contributions = sanitizeValue(stats.contributions, "0");

  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const langText = languages.length
    ? languages.map(l => sanitizeValue(l.name)).join(", ")
    : "N/A";

  return `
<svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="${theme.background}"/>

  <text x="20" y="38"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:22px;font-weight:700;fill:${theme.title}">
    ${username}'s GitHub Stats
  </text>

  ${statBox(20, 60, "Repositories", repoCount, theme)}
  ${statBox(160, 60, "Stars", stars, theme)}
  ${statBox(300, 60, "Forks", forks, theme)}
  ${statBox(440, 60, "Followers", followers, theme)}

  ${statBox(20, 150, "Commits", commits, theme)}
  ${statBox(215, 150, "Contributions", contributions, theme)}
  ${statBox(410, 150, "Top Languages", langText, theme, true)}
</svg>`;
}

export function renderStatsDark(stats, theme) {
  const username = sanitizeValue(stats.username, "User");
  const repoCount = sanitizeValue(stats.repoCount, "0");
  const stars = sanitizeValue(stats.stars, "0");
  const forks = sanitizeValue(stats.forks, "0");
  const followers = sanitizeValue(stats.followers, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const contributions = sanitizeValue(stats.contributions, "0");

  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const langText = languages.length
    ? languages.map(l => sanitizeValue(l.name)).join(", ")
    : "N/A";

  return `
<svg width="720" height="280" viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${theme.background}"/>

  <text x="24" y="38"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:26px;font-weight:700;fill:${theme.title}">
    ${username}
  </text>

  <line x1="24" y1="48" x2="680" y2="48" stroke="${theme.border}"/>

  ${darkRow(24, 85, "Repositories", repoCount, theme)}
  ${darkRow(200, 85, "Stars", stars, theme)}
  ${darkRow(380, 85, "Forks", forks, theme)}
  ${darkRow(540, 85, "Followers", followers, theme)}

  ${darkRow(24, 165, "Commits", commits, theme)}
  ${darkRow(260, 165, "Contributions", contributions, theme)}
  ${darkRow(500, 165, "Languages", langText, theme, true)}
</svg>`;
}



function renderStatsVibrant(stats, theme) {
  const username = sanitizeValue(stats.username, "User");
  const repoCount = sanitizeValue(stats.repoCount, "0");
  const stars = sanitizeValue(stats.stars, "0");
  const forks = sanitizeValue(stats.forks, "0");
  const followers = sanitizeValue(stats.followers, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const contributions = sanitizeValue(stats.contributions, "0");

  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const langText = languages.length
    ? languages.map(l => sanitizeValue(l.name)).join(", ")
    : "N/A";

  return `
<svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${theme.background}"/>

  <text x="20" y="38"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:22px;font-weight:700;fill:${theme.title}">
    ${username}'s GitHub Stats
  </text>

  ${vibrantBox(40, 60, "Repositories", repoCount, theme)}
  ${vibrantBox(160, 60, "Stars", stars, theme)}
  ${vibrantBox(300, 60, "Forks", forks, theme)}
  ${vibrantBox(440, 60, "Followers", followers, theme)}

  ${vibrantBox(20, 150, "Commits", commits, theme)}
  ${vibrantBox(215, 150, "Contributions", contributions, theme)}
  ${vibrantBox(410, 150, "Top Languages", langText, theme, true)}
</svg>`;
}

function renderStatsInsight(stats, theme) {
  const username = sanitizeValue(stats.username, "User");
  const stars = sanitizeValue(stats.stars, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const prs = sanitizeValue(stats.pullRequests ?? "0");
  const issues = sanitizeValue(stats.issues ?? "0");
  const contributedTo = sanitizeValue(stats.contributedTo ?? "0");

  const progress = Math.min(100, Math.round((commits / 500) * 100));
  const circumference = 2 * Math.PI * 22;
  const dash = (progress / 100) * circumference;

  return `
<svg width="500" height="220" viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="${theme.background}"/>

  <text x="20" y="32"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:19px;font-weight:700;fill:${theme.title}">
    ${username}'s GitHub Stats
  </text>

  ${insightRow(20, 60, "Stars", stars, theme)}
  ${insightRow(20, 87, "Commits", commits, theme)}
  ${insightRow(20, 114, "Pull Requests", prs, theme)}
  ${insightRow(20, 141, "Issues", issues, theme)}
  ${insightRow(20, 168, "Contributed To", contributedTo, theme)}

  <g transform="translate(450 110)">
    <circle r="22" cx="0" cy="0" fill="none" stroke="${theme.border}" stroke-width="5"/>
    <circle r="22" cx="0" cy="0" fill="none"
            stroke="${theme.accent}" stroke-width="5"
            stroke-dasharray="${dash} ${circumference}"
            transform="rotate(-90)"/>
    <text x="0" y="7" text-anchor="middle"
      style="font-family:'Monaco','Menlo',monospace;
             font-size:16px;font-weight:800;fill:${theme.title}">
      ${progress}%
    </text>
  </g>
</svg>`;
}

function renderTopLanguages(stats, theme) {
  const languages = getSafeArray(stats.topLanguages, []).slice(0, 6);

  if (!languages.length) {
    return `
<svg width="420" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="${theme.background}"/>
  <text x="20" y="70" fill="${theme.text}" font-size="13">
    No language data available
  </text>
</svg>`;
  }

  const COL_X = [20, 220];
  const START_Y = 64;
  const ROW_GAP = 26;
  const DOT_RADIUS = 4;

  let y = START_Y;

  const rows = [];
  for (let i = 0; i < languages.length; i += 2) {
    rows.push([languages[i], languages[i + 1]]);
  }

  const grid = rows.map((pair, rowIndex) => {
    const rowY = y + rowIndex * ROW_GAP;

    return pair.map((lang, colIndex) => {
      if (!lang) return "";

      return `
<g>
  <circle cx="${COL_X[colIndex]}" cy="${rowY - 5}"
          r="${DOT_RADIUS}"
          fill="${lang.color || theme.accent}"/>

  <text x="${COL_X[colIndex] + 10}" y="${rowY}"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:13px;font-weight:600;fill:${theme.text}">
    ${lang.name}
  </text>

  <text x="${COL_X[colIndex] + 120}" y="${rowY}"
    style="font-family:'Monaco','Menlo',monospace;
           font-size:11px;fill:${theme.muted}">
    ${Number(lang.percentage).toFixed(1)}%
  </text>
</g>`;
    }).join("");
  }).join("");

  const height = START_Y + rows.length * ROW_GAP + 10;

  return `
<svg width="420" height="${height}" viewBox="0 0 420 ${height}"
     xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" rx="12" fill="${theme.background}"/>

  <text x="20" y="30"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:16px;font-weight:700;fill:${theme.title}">
    Top Languages
  </text>

  ${grid}
</svg>`;
}

function statBox(x, y, label, value, theme, small = false) {
  return `
<g>
  <rect x="${x}" y="${y}" width="${small ? 170 : 130}" height="75" rx="10"
        fill="${theme.card}" stroke="${theme.border}"/>
  <text x="${x + 10}" y="${y + 18}" font-size="10" fill="${theme.muted}">
    ${label.toUpperCase()}
  </text>
  <text x="${x + 10}" y="${y + 55}"
        font-size="${small ? 11 : 28}"
        fill="${theme.accent}"
        font-family="monospace">
    ${value}
  </text>
</g>`;
}

function darkRow(x, y, label, value, theme, small = false) {
  return `
<g>
  <text x="${x}" y="${y}"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:11px;
           letter-spacing:0.6px;
           text-transform:uppercase;
           fill:${theme.muted}">
    ${label}
  </text>

  <text x="${x}" y="${y + 30}"
    style="font-family:'Monaco','Menlo',monospace;
           font-size:${small ? 14 : 30};
           font-weight:700;
           fill:${theme.text}">
    ${value}
  </text>
</g>`;
}

function vibrantBox(x, y, label, value, theme, small = false) {
  return `
<g>
  <rect x="${x}" y="${y}" width="${small ? 170 : 130}" height="75" rx="10"
        fill="${theme.accent}"/>
  <text x="${x + 10}" y="${y + 18}" font-size="10" fill="${theme.title}">
    ${label.toUpperCase()}
  </text>
  <text x="${x + 10}" y="${y + 55}"
        font-size="${small ? 11 : 28}"
        fill="${theme.title}"
        font-family="monospace">
    ${value}
  </text>
</g>`;
}

function insightRow(x, y, label, value, theme) {
  return `
<g>
  <text x="${x}" y="${y}"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:14px;fill:${theme.text}">
    ${label}
  </text>
  <text x="${x + 120}" y="${y}"
    style="font-family:'Monaco','Menlo',monospace;
           font-size:14px;font-weight:700;fill:${theme.title}">
    ${value}
  </text>
</g>`;
}

export function renderStatsSVG(stats, style = "gradient", theme) {
  switch (style.toLowerCase()) {
    case "dark":
      return renderStatsDark(stats, theme);
    case "vibrant":
      return renderStatsVibrant(stats, theme);
    case "insight":
      return renderStatsInsight(stats, theme);
    case "top-languages":
      return renderTopLanguages(stats, theme);
    case "gradient":
    default:
      return renderStatsGradient(stats, theme);
  }
}
