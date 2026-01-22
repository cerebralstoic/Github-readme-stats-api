import { sanitizeValue, getSafeArray } from '../shared/sanitize.js';

/**
 * Renders an insight-style stats card with user's design
 * @param {Object} stats - User statistics
 * @returns {string} SVG markup
 */
export function renderStatsInsight(stats) {
  const username = sanitizeValue(stats.username, "User");
  const stars = sanitizeValue(stats.stars, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const prs = sanitizeValue(stats.pullRequests ?? "0", "0");
  const issues = sanitizeValue(stats.issues ?? "0", "0");
  const contributedTo = sanitizeValue(stats.contributedTo ?? "0", "0");

  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const totalLangSize = languages.reduce((a, b) => a + (b.percent || 0), 0);

  const BAR_START_X = 20;
  const BAR_TOTAL_WIDTH = 420;
  const BAR_Y = 180;
  const BAR_HEIGHT = 6;

  let langOffset = 0;

  const colors = ["#f1e05a", "#3572A5", "#e34c26"];

let labelY = BAR_Y + 28;
  const MIN_LABEL_WIDTH = 50;

const langBars = languages
  .map((lang, i) => {
    const name = lang.name;
    const percent = lang.percent || 0;
    const width = totalLangSize > 0 ? (percent / 100) * BAR_TOTAL_WIDTH : 0;

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
