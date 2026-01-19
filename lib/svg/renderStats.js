function sanitizeValue(value, fallback = "N/A") {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
}

function getSafeArray(arr, defaultArr = []) {
  return Array.isArray(arr) && arr.length > 0 ? arr : defaultArr;
}


function renderStatsGradient(stats) {
  const username = sanitizeValue(stats.username, "User");
  const repoCount = sanitizeValue(stats.repoCount, "0");
  const stars = sanitizeValue(stats.stars, "0");
  const forks = sanitizeValue(stats.forks, "0");
  const followers = sanitizeValue(stats.followers, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const contributions = sanitizeValue(stats.contributions, "0");
  
  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const langText = languages.length > 0 
    ? languages.map(l => sanitizeValue(l[0], "N/A")).join(", ")
    : "N/A";
  
  return `
<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300">
  <defs>
    <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.15"/>
    </filter>
  </defs>

  <rect width="100%" height="100%" rx="12" fill="#0d1117"/>
  <rect width="100%" height="3" rx="1.5" fill="url(#statGradient)"/>

  <text x="20" y="38" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 22px; font-weight: 700; fill: #ffffff; letter-spacing: -0.5px;">
    ${username}'s GitHub Stats
  </text>

  <g filter="url(#shadow)">
    <rect x="20" y="60" width="130" height="75" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="30" y="78" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #8b949e; text-transform: uppercase; letter-spacing: 0.5px;">Repositories</text>
    <text x="30" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #58a6ff;">${repoCount}</text>

    <rect x="160" y="60" width="130" height="75" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="170" y="78" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #8b949e; text-transform: uppercase; letter-spacing: 0.5px;">Total Stars</text>
    <text x="170" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #fbbf24;">${stars}</text>

    <rect x="300" y="60" width="130" height="75" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="310" y="78" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #8b949e; text-transform: uppercase; letter-spacing: 0.5px;">Forks</text>
    <text x="310" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #34d399;">${forks}</text>

    <rect x="440" y="60" width="140" height="75" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="450" y="78" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #8b949e; text-transform: uppercase; letter-spacing: 0.5px;">Followers</text>
    <text x="450" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #f472b6;">${followers}</text>
  </g>

  <g filter="url(#shadow)">
    <rect x="20" y="150" width="185" height="65" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="30" y="168" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #8b949e; text-transform: uppercase; letter-spacing: 0.5px;">Commits</text>
    <text x="30" y="202" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 24px; font-weight: 700; fill: #7ee787;">${commits}</text>

    <rect x="215" y="150" width="185" height="65" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="225" y="168" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #8b949e; text-transform: uppercase; letter-spacing: 0.5px;">Contributions</text>
    <text x="225" y="202" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 24px; font-weight: 700; fill: #f97316;">${contributions}</text>

    <rect x="410" y="150" width="170" height="65" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="420" y="168" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #8b949e; text-transform: uppercase; letter-spacing: 0.5px;">Top Languages</text>
    <text x="420" y="202" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; font-weight: 600; fill: #c9d1d9;">${langText}</text>
  </g>
</svg>`;
}


export function renderStatsDark(stats) {
  const username = sanitizeValue(stats.username, "User");
  const repoCount = sanitizeValue(stats.repoCount, "0");
  const stars = sanitizeValue(stats.stars, "0");
  const forks = sanitizeValue(stats.forks, "0");
  const followers = sanitizeValue(stats.followers, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const contributions = sanitizeValue(stats.contributions, "0");
  
  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const langText = languages.length > 0 
    ? languages.map(l => sanitizeValue(l[0], "N/A")).join(", ")
    : "N/A";
  
  return `
<svg width="720" height="280" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 280">
  <rect width="100%" height="100%" fill="#000000"/>

  <text x="24" y="42" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 26px; font-weight: 700; fill: #ffffff;">
    ${username}
  </text>

  <line x1="24" y1="52" x2="280" y2="52" stroke="#ffffff" stroke-width="2"/>

  <g>
    <text x="24" y="88" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; fill: #888888; letter-spacing: 0.5px; text-transform: uppercase;">Repositories</text>
    <text x="24" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 32px; font-weight: 700; fill: #ffffff;">${repoCount}</text>

    <text x="200" y="88" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; fill: #888888; letter-spacing: 0.5px; text-transform: uppercase;">Stars</text>
    <text x="200" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 32px; font-weight: 700; fill: #ffffff;">${stars}</text>

    <text x="380" y="88" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; fill: #888888; letter-spacing: 0.5px; text-transform: uppercase;">Forks</text>
    <text x="380" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 32px; font-weight: 700; fill: #ffffff;">${forks}</text>

    <text x="540" y="88" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; fill: #888888; letter-spacing: 0.5px; text-transform: uppercase;">Followers</text>
    <text x="540" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 32px; font-weight: 700; fill: #ffffff;">${followers}</text>
  </g>

  <line x1="24" y1="138" x2="680" y2="138" stroke="#333333" stroke-width="1"/>

  <g>
    <text x="24" y="172" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; fill: #888888; letter-spacing: 0.5px; text-transform: uppercase;">Commits</text>
    <text x="24" y="200" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #ffffff;">${commits}</text>

    <text x="260" y="172" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; fill: #888888; letter-spacing: 0.5px; text-transform: uppercase;">Contributions</text>
    <text x="260" y="200" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #ffffff;">${contributions}</text>

    <text x="500" y="172" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; fill: #888888; letter-spacing: 0.5px; text-transform: uppercase;">Languages</text>
    <text x="500" y="200" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 600; fill: #ffffff;">${langText}</text>
  </g>

  <line x1="24" y1="265" x2="680" y2="265" stroke="#333333" stroke-width="1"/>
</svg>`;
}

function renderStatsVibrant(stats) {
  const username = sanitizeValue(stats.username, "User");
  const repoCount = sanitizeValue(stats.repoCount, "0");
  const stars = sanitizeValue(stats.stars, "0");
  const forks = sanitizeValue(stats.forks, "0");
  const followers = sanitizeValue(stats.followers, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const contributions = sanitizeValue(stats.contributions, "0");
  
  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const langText = languages.length > 0 
    ? languages.map(l => sanitizeValue(l[0], "N/A")).join(", ")
    : "N/A";
  
  return `
<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300">
  <defs>
    <linearGradient id="vibrantGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:0.95" />
      <stop offset="100%" style="stop-color:#a855f7;stop-opacity:0.95" />
    </linearGradient>
    <linearGradient id="vibrantGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.95" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.95" />
    </linearGradient>
    <linearGradient id="vibrantGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.95" />
      <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.95" />
    </linearGradient>
    <filter id="vibrantGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#0f172a"/>

  <text x="20" y="38" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 22px; font-weight: 700; fill: #ffffff; letter-spacing: -0.5px;">
    ${username}'s GitHub Stats
  </text>

  <g filter="url(#vibrantGlow)">
    <rect x="20" y="60" width="130" height="75" rx="10" fill="url(#vibrantGrad1)"/>
    <text x="30" y="78" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #ffffff; opacity: 0.95; text-transform: uppercase;">Repositories</text>
    <text x="30" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #ffffff;">${repoCount}</text>

    <rect x="160" y="60" width="130" height="75" rx="10" fill="url(#vibrantGrad2)"/>
    <text x="170" y="78" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #ffffff; opacity: 0.95; text-transform: uppercase;">Total Stars</text>
    <text x="170" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #ffffff;">${stars}</text>

    <rect x="300" y="60" width="130" height="75" rx="10" fill="url(#vibrantGrad3)"/>
    <text x="310" y="78" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #ffffff; opacity: 0.95; text-transform: uppercase;">Forks</text>
    <text x="310" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #ffffff;">${forks}</text>

    <rect x="440" y="60" width="140" height="75" rx="10" fill="url(#vibrantGrad1)"/>
    <text x="450" y="78" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #ffffff; opacity: 0.95; text-transform: uppercase;">Followers</text>
    <text x="450" y="115" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #ffffff;">${followers}</text>
  </g>

  <g filter="url(#vibrantGlow)">
    <rect x="20" y="150" width="185" height="65" rx="10" fill="url(#vibrantGrad2)"/>
    <text x="30" y="168" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #ffffff; opacity: 0.95; text-transform: uppercase;">Commits</text>
    <text x="30" y="202" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 24px; font-weight: 700; fill: #ffffff;">${commits}</text>

    <rect x="215" y="150" width="185" height="65" rx="10" fill="url(#vibrantGrad3)"/>
    <text x="225" y="168" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #ffffff; opacity: 0.95; text-transform: uppercase;">Contributions</text>
    <text x="225" y="202" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 24px; font-weight: 700; fill: #ffffff;">${contributions}</text>

    <rect x="410" y="150" width="170" height="65" rx="10" fill="url(#vibrantGrad1)"/>
    <text x="420" y="168" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; font-weight: 600; fill: #ffffff; opacity: 0.95; text-transform: uppercase;">Top Languages</text>
    <text x="420" y="202" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; font-weight: 600; fill: #ffffff;">${langText}</text>
  </g>
</svg>`;
}

function renderStatsInsight(stats) {
  const username = sanitizeValue(stats.username, "User");
  const stars = sanitizeValue(stats.stars, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const prs = sanitizeValue(stats.pullRequests ?? "0", "0");
  const issues = sanitizeValue(stats.issues ?? "0", "0");
  const contributedTo = sanitizeValue(stats.contributedTo ?? "0", "0");

  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const totalLangSize = languages.reduce((a, b) => a + (b[1] || 0), 0);

  const BAR_START_X = 20;
  const BAR_TOTAL_WIDTH = 420;
  const BAR_Y = 180;
  const BAR_HEIGHT = 6;

  let langOffset = 0;

  const colors = ["#f1e05a", "#3572A5", "#e34c26"];

let labelY = BAR_Y + 28;
  const MIN_LABEL_WIDTH = 50;

const langBars = languages
  .map(([name, size], i) => {
    const percent = totalLangSize
      ? Math.round((size / totalLangSize) * 100)
      : 0;

    const width = totalLangSize
      ? (size / totalLangSize) * BAR_TOTAL_WIDTH
      : 0;

    const x = BAR_START_X + langOffset;
    langOffset += width;

    const bar = `
      <rect x="${x}" y="${BAR_Y}" width="${width}" height="${BAR_HEIGHT}"
            fill="${colors[i]}" rx="3"/>
    `;

    let label = "";
    if (width >= MIN_LABEL_WIDTH) {
      label = `
        <text x="${x + width / 2}" y="${BAR_Y - 6}"
              text-anchor="middle"
              style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                     font-size:10px;font-weight:600;fill:#c9d1d9;">
          ${sanitizeValue(name)} ${percent}%
        </text>
      `;
    } else {
      label = `
        <text x="${BAR_START_X}" y="${labelY}"
              style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                     font-size:10px;font-weight:500;fill:#c9d1d9;">
          ${sanitizeValue(name)} ${percent}%
        </text>
      `;
      labelY += 14;
    }

    return bar + label;
  })
  .join("");


  const progress = Math.min(100, Math.round((commits / 500) * 100));
  const circumference = 2 * Math.PI * 20;
  const dash = (progress / 100) * circumference;

  return `
<svg width="500" height="210" viewBox="0 0 500 210" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="#0d1117"/>

  <text x="20" y="28"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:17px;font-weight:700;fill:#ffffff;">
    ${username}'s GitHub Stats
  </text>

  <g font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
     font-size="12" fill="#c9d1d9">

    <g transform="translate(20,50)">
      <path fill="#8b949e" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8
        8-3.58 8-8-3.58-8-8-8Zm3.53 12.47L8 10.94 4.47 12.47
        5.06 8.59 2.12 5.53l4.01-.34L8 1.5l1.87 3.69
        4.01.34-2.94 3.06.59 3.88Z"/>
      <text x="22" y="12">Stars</text>
      <text x="140" y="12" fill="#ffffff">${stars}</text>
    </g>

    <g transform="translate(20,72)">
      <path fill="#8b949e" d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm1 8.5H4v-1h4V3h1Z"/>
      <text x="22" y="12">Commits</text>
      <text x="140" y="12" fill="#ffffff">${commits}</text>
    </g>

    <g transform="translate(20,94)">
      <path fill="#8b949e" d="M6 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm6 4
        a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
      <text x="22" y="12">Pull Requests</text>
      <text x="140" y="12" fill="#ffffff">${prs}</text>
    </g>

    <g transform="translate(20,116)">
      <path fill="#8b949e" d="M8 1a7 7 0 1 0 7 7A7 7 0 0 0 8 1Zm1
        10H7V9h2Zm0-3H7V4h2Z"/>
      <text x="22" y="12">Issues</text>
      <text x="140" y="12" fill="#ffffff">${issues}</text>
    </g>

    <g transform="translate(20,138)">
      <path fill="#8b949e" d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm3
        9H9v2H7V9H5V7h2V5h2v2h2Z"/>
      <text x="22" y="12">Contributed To</text>
      <text x="140" y="12" fill="#ffffff">${contributedTo}</text>
    </g>
  </g>

  <g transform="translate(450 90)">
    <circle r="20" cx="0" cy="0" fill="none" stroke="#30363d" stroke-width="5"/>
    <circle r="20" cx="0" cy="0" fill="none"
            stroke="#2ea043" stroke-width="5"
            stroke-dasharray="${dash} ${circumference}"
            transform="rotate(-90)"/>
    <text x="0" y="5" text-anchor="middle"
          style="font-family:'Monaco','Menlo',monospace;
                 font-size:11px;font-weight:700;fill:#ffffff;">
      ${progress}%
    </text>
  </g>

  <text x="20" y="178"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:12px;font-weight:600;fill:#ffffff;">
    Most Used Languages
  </text>

  ${langBars}
</svg>`;
}


export function renderStatsSVG(stats, style = "gradient") {
  if (!stats || typeof stats !== "object") {
    throw new Error("stats parameter must be a valid object");
  }

  switch (style.toLowerCase()) {
    case "dark":
      return renderStatsDark(stats);
    case "vibrant":
      return renderStatsVibrant(stats);
    case "gradient":
        return renderStatsGradient(stats);
    case "insight":
      return renderStatsInsight(stats);
    default:
      return renderStatsGradient(stats);
  }
}