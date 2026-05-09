function sanitizeValue(value, fallback = "N/A") {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
}

function getSafeArray(arr, defaultArr = []) {
  return Array.isArray(arr) && arr.length > 0 ? arr : defaultArr;
}


export function renderStatsDefault(stats, theme) {
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

function renderStatsInsight(stats, theme) {
  const username = sanitizeValue(stats.username, "User");
  const stars = sanitizeValue(stats.stars, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const prs = sanitizeValue(stats.pullRequests ?? "0");
  const issues = sanitizeValue(stats.issues ?? "0");
  const contributedTo = sanitizeValue(stats.contributedTo ?? "0");

  const commitCount = Number(stats.commits) || 0;
  const commitGrades = [
    { grade: "E", min: 0, nextMin: 25 },
    { grade: "D", min: 25, nextMin: 100 },
    { grade: "C", min: 100, nextMin: 250 },
    { grade: "B", min: 250, nextMin: 500 },
    { grade: "A", min: 500, nextMin: 1000 },
    { grade: "S", min: 1000, nextMin: null }
  ];

  const currentGrade =
    [...commitGrades].reverse().find(level => commitCount >= level.min) ?? commitGrades[0];

  const getCommitMilestone = count => {
    if (count < 1000) return 1000;
    if (count < 2500) return 2500;
    if (count < 5000) return 5000;
    if (count < 10000) return 10000;
    return Math.ceil(count / 5000) * 5000;
  };

  const milestoneTarget = getCommitMilestone(commitCount);
  const progress = Math.max(
    0,
    Math.min(100, Math.round((commitCount / milestoneTarget) * 100))
  );

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;


  
  return `
<svg width="500" height="220" viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="${theme.background}"/>

  <text x="20" y="32"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:19px;font-weight:700;fill:${theme.title}">
    ${username}'s GitHub Stats
  </text>

  ${insightRow(20, 60, "star", "Stars", stars, theme)}
  ${insightRow(20, 87, "commit", "Commits", commits, theme)}
  ${insightRow(20, 114, "pull", "Pull Requests", prs, theme)}
  ${insightRow(20, 141, "issue", "Issues", issues, theme)}
  ${insightRow(20, 168, "repo", "Contributed To", contributedTo, theme)}

 <g transform="translate(400 110)">
  <circle
    r="40"
    cx="0"
    cy="0"
    fill="none"
    stroke="${theme.border}"
    stroke-width="10"
    stroke-linecap="round"
    stroke-dasharray="${circumference}"
    transform="rotate(-90)"
  />

  <circle
    r="40"
    cx="0"
    cy="0"
    fill="none"
    stroke="${theme.accent}"
    stroke-width="10"
    stroke-linecap="round"
    stroke-dasharray="${circumference}"
    stroke-dashoffset="${dashOffset}"
    transform="rotate(-90)"
  />

  <text x="0" y="9" text-anchor="middle"
    style="font-family:'Monaco','Menlo',monospace;
           font-size:25px;
           font-weight:800;
           fill:${theme.title}">
    ${currentGrade.grade}
  </text>

  <text x="0" y="58" text-anchor="middle"
    style="font-family:'Monaco','Menlo',monospace;
           font-size:12px;
           fill:${theme.muted}">
    ${commitCount} / ${milestoneTarget}
  </text>
</g>



</svg>`;
}

function getContributionSeries(calendar) {
  if (!calendar?.weeks) return [];

  const days = [];
  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      days.push(day.contributionCount);
    }
  }

  return days.slice(-365);
}

function renderContributionGraph(values, x, y, width, height, theme) {
  if (!values.length) return "";

  const smooth = smoothSeries(values, 7);
  const max = Math.max(...smooth, 1);
  const stepX = width / (smooth.length - 1);

  let strokePath = "";
  let fillPath = `M ${x} ${y + height}`;

  smooth.forEach((v, i) => {
    const px = x + i * stepX;
    const py = y + height - (v / max) * height;

    if (i === 0) {
      strokePath = `M ${px} ${py}`;
      fillPath += ` L ${px} ${py}`;
    } else {
      strokePath += ` L ${px} ${py}`;
      fillPath += ` L ${px} ${py}`;
    }
  });

  fillPath += ` L ${x + width} ${y + height} Z`;

  const ticks = 5;
  let yAxis = "";

  for (let i = 0; i <= ticks; i++) {
    const value = Math.round((max / ticks) * i);
    const ty = y + height - (height / ticks) * i;

    yAxis += `
      <text x="${x + width + 10}" y="${ty + 4}"
        style="font-family:monospace;font-size:10px;fill:${theme.text}">
        ${value}
      </text>
    `;
  }

  return `
<g>
  <path d="${fillPath}"
        fill="${theme.title}"
        opacity="0.35"/>

  <path d="${strokePath}"
        fill="none"
        stroke="${theme.accent}"
        stroke-width="3"
        stroke-linejoin="round"/>

  ${yAxis}
</g>`;
}

function renderDateLabels(x, y, width, theme) {
  const labels = ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Jan"];
  const step = width / (labels.length - 1);

  return labels.map((l, i) => `
    <text x="${x + step * i}" y="${y}"
      text-anchor="middle"
      style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
             font-size:11px;fill:${theme.text}">
      ${l}
    </text>
  `).join("");
}


function summaryRow(x, y, label, value, theme) {
  return `
<g>
  <text x="${x}" y="${y}"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:15px;fill:${theme.text}">
    ${label}
  </text>
  <text x="${x + 150}" y="${y}"
    style="font-family:'Monaco','Menlo',monospace;
           font-size:16px;font-weight:700;fill:${theme.title}">
    ${value}
  </text>
</g>`;
}

export function renderStatsSummary(stats, theme) {
  const username = sanitizeValue(stats.username);
  const email = sanitizeValue(stats.email, "Private");
  const repos = sanitizeValue(stats.repoCount, "0");
  const contributions = sanitizeValue(stats.contributions, "0");
  const joined = `${stats.accountAge} yrs ago`;

  const series = getContributionSeries(stats.contributionCalendar);

  return `
<svg width="820" height="260" viewBox="0 0 820 240"
     xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" rx="14" fill="${theme.background}"/>

  <text x="24" y="36"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:22px;font-weight:700;fill:${theme.title}">
    ${username}
  </text>

  ${summaryRow(24, 70, "Email", email, theme)}
  ${summaryRow(24, 96, "Repositories", repos, theme)}
  ${summaryRow(24, 122, "Contributions (1y)", contributions, theme)}
  ${summaryRow(24, 148, "Joined", joined, theme)}

  <line x1="310" y1="24" x2="310" y2="216" stroke="${theme.border}" opacity="0.6"/>

  ${renderContributionGraph(
  series,
  340,
  60,
  420,
  120,
  theme
)}

${renderDateLabels(340, 200, 420, theme)}


</svg>`;
}

function smoothSeries(values, window = 7) {
  const smoothed = [];

  for (let i = 0; i < values.length; i++) {
    let sum = 0;
    let count = 0;

    for (let j = i - Math.floor(window / 2); j <= i + Math.floor(window / 2); j++) {
      if (j >= 0 && j < values.length) {
        sum += values[j];
        count++;
      }
    }

    smoothed.push(sum / count);
  }

  return smoothed;
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
           font-size:15px;font-weight:600;fill:${theme.text}">
    ${lang.name}
  </text>

  <text x="${COL_X[colIndex] + 140}" y="${rowY}"
    style="font-family:'Monaco','Menlo',monospace;
           font-size:1p5x;fill:${theme.muted}">
    ${Number(lang.percentage).toFixed(1)}%
  </text>
</g>`;
    }).join("");
  }).join("");

  const height = START_Y + rows.length * ROW_GAP + 30;

  return `
<svg width="420" height="${height}" viewBox="0 0 420 ${height}"
     xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" rx="12" fill="${theme.background}"/>

  <text x="20" y="30"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:17px;font-weight:700;fill:${theme.title}">
    Top Languages
  </text>

  ${grid}
</svg>`;
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

function insightRow(x, y, icon, label, value, theme) {
  const icons = {
    star: "M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8S12.42 0 8 0Zm3.53 12.47L8 10.94 4.47 12.47 5.06 8.59 2.12 5.53l4.01-.34L8 1.5l1.87 3.69 4.01.34-2.94 3.06.59 3.88Z",
    commit: "M8 1a7 7 0 1 0 7 7A7 7 0 0 0 8 1Zm1 10H7V9h2Zm0-3H7V4h2Z",
    pull: "M6 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm6 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    issue: "M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm1 11H7V9h2Zm0-3H7V4h2Z",
    repo: "M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm3 9H9v2H7V9H5V7h2V5h2v2h2Z"
  };

  return `
<g transform="translate(${x}, ${y - 10})">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="${theme.muted}">
    <path d="${icons[icon]}"/>
  </svg>

  <text x="26" y="14"
    style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
           font-size:17px;fill:${theme.text}">
    ${label}
  </text>

  <text x="200" y="14"
    style="font-family:'Monaco','Menlo',monospace;
           font-size:17px;font-weight:700;fill:${theme.title}">
    ${value}
  </text>
</g>`;
}

export function renderStatsSVG(stats, style = "gradient", theme) {
  switch (style.toLowerCase()) {
    case "stats":
      return renderStatsDefault(stats, theme);
    case "insight":
      return renderStatsInsight(stats, theme);
    case "top-languages":
      return renderTopLanguages(stats, theme);
    case "summary":
      return renderStatsSummary(stats, theme);
    default:
      return renderStatsDefault(stats, theme);
  }
}
