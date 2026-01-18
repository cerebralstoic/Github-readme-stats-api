function sanitizeValue(value, fallback = "N/A") {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
}

function getSafeArray(arr, defaultArr = []) {
  return Array.isArray(arr) && arr.length > 0 ? arr : defaultArr;
}

function generateLinePoints(values, startX, startY, width, height) {
  if (!Array.isArray(values) || values.length === 0) return "";
  
  const validValues = values.filter(v => typeof v === "number" && !isNaN(v));
  if (validValues.length === 0) return "";
  
  const max = Math.max(...validValues);
  if (max === 0) return "";
  
  const points = validValues.map((val, idx) => {
    const x = startX + (idx / (validValues.length - 1)) * width;
    const y = startY + height - (val / max) * height;
    return `${x},${y}`;
  });
  
  return points.join(" ");
}

function generateLanguageBarSVG(topLanguages, startX, startY, barWidth, barHeight) {
  const languages = getSafeArray(topLanguages, [["N/A", 0]]).slice(0, 4);
  const maxValue = Math.max(...languages.map(l => (typeof l[1] === "number" ? l[1] : 0)), 1);
  
  let svg = "";
  const gradientIds = ["barGrad0", "barGrad1", "barGrad2", "barGrad3"];
  const spacing = barWidth + 15;
  
  languages.forEach((lang, idx) => {
    const height = (lang[1] / maxValue) * barHeight;
    const x = startX + idx * spacing;
    const y = startY + barHeight - height;
    const label = sanitizeValue(lang[0], "N/A");
    
    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${height}" fill="url(#${gradientIds[idx]})" rx="3"/>`;
    svg += `<text x="${x + barWidth / 2}" y="${startY + barHeight + 18}" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 11px; font-weight: 600; fill: #8b949e; text-anchor: middle;">${label}</text>`;
  });
  
  return svg;
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






function generateAreaPath(values, startX, startY, width, height) {
  if (!Array.isArray(values) || values.length === 0) return "";
  
  const validValues = values.filter(v => typeof v === "number" && !isNaN(v));
  if (validValues.length === 0) return "";
  
  const max = Math.max(...validValues);
  if (max === 0) return "";
  
  const points = validValues.map((val, idx) => {
    const x = startX + (idx / (validValues.length - 1)) * width;
    const y = startY + height - (val / max) * height;
    return {x, y};
  });
  
  // Create smooth curved path using cubic bezier curves
  let path = `M ${points[0].x} ${startY + height}`;
  path += ` L ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlPointX = (current.x + next.x) / 2;
    
    path += ` C ${controlPointX} ${current.y}, ${controlPointX} ${next.y}, ${next.x} ${next.y}`;
  }
  
  path += ` L ${points[points.length - 1].x} ${startY + height} Z`;
  
  return path;
}

function renderStatsGradientGraph(stats) {
  const username = sanitizeValue(stats.username, "User");
  const repoCount = sanitizeValue(stats.repoCount, "0");
  const stars = sanitizeValue(stats.stars, "0");
  const forks = sanitizeValue(stats.forks, "0");
  const followers = sanitizeValue(stats.followers, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const contributions = sanitizeValue(stats.contributions, "0");
  const accountAge = sanitizeValue(stats.accountAge, "5");
  
  const monthlyCommits = getSafeArray(stats.monthlyCommits, [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]);
  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const primaryLang = languages.length > 0 ? sanitizeValue(languages[0][0], "N/A") : "N/A";
  
  const chartStartX = 280;
  const chartStartY = 40;
  const chartWidth = 390;
  const chartHeight = 130;
  
  const areaPath = generateAreaPath(monthlyCommits, chartStartX, chartStartY, chartWidth, chartHeight);
  
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const monthLabels = [];
  for (let i = 0; i < 6; i++) {
    const monthIndex = (currentMonth - 11 + i * 2 + 12) % 12;
    monthLabels.push(months[monthIndex]);
  }
  
  return `
<svg width="700" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 200">
  <defs>
    <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
    </filter>
  </defs>

  <rect width="100%" height="100%" rx="10" fill="#0d1117"/>
  <rect width="100%" height="3" rx="1.5" fill="url(#statGradient)"/>

  <text x="20" y="28" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 18px; font-weight: 700; fill: #ffffff; letter-spacing: -0.3px;">
    ${username}'s GitHub Stats
  </text>

  <!-- Left Panel - User Details -->
  <g>
    <!-- Repositories -->
    <g transform="translate(20, 50)">
      <svg x="0" y="0" width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
        <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
      </svg>
      <text x="21" y="12" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; fill: #c9d1d9;">${repoCount} repositories</text>
    </g>

    <!-- Stars -->
    <g transform="translate(20, 78)">
      <svg x="0" y="0" width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
      </svg>
      <text x="21" y="12" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; fill: #c9d1d9;">${stars} stars</text>
    </g>

    <!-- Forks -->
    <g transform="translate(20, 106)">
      <svg x="0" y="0" width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
      </svg>
      <text x="21" y="12" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; fill: #c9d1d9;">${forks} forks</text>
    </g>

    <!-- Followers -->
    <g transform="translate(20, 134)">
      <svg x="0" y="0" width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
        <path d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"/>
      </svg>
      <text x="21" y="12" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; fill: #c9d1d9;">${followers} followers</text>
    </g>

    <!-- Commits -->
    <g transform="translate(20, 162)">
      <svg x="0" y="0" width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
        <path d="M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 6a2 2 0 100 4 2 2 0 000-4z"/>
      </svg>
      <text x="21" y="12" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; fill: #c9d1d9;">${commits} commits</text>
    </g>
  </g>

  <!-- Right Panel - Chart -->
  <g filter="url(#shadow)">
    <!-- Grid lines -->
    <line x1="${chartStartX}" y1="${chartStartY + chartHeight * 0.25}" x2="${chartStartX + chartWidth}" y2="${chartStartY + chartHeight * 0.25}" stroke="#21262d" stroke-width="1"/>
    <line x1="${chartStartX}" y1="${chartStartY + chartHeight * 0.5}" x2="${chartStartX + chartWidth}" y2="${chartStartY + chartHeight * 0.5}" stroke="#21262d" stroke-width="1"/>
    <line x1="${chartStartX}" y1="${chartStartY + chartHeight * 0.75}" x2="${chartStartX + chartWidth}" y2="${chartStartY + chartHeight * 0.75}" stroke="#21262d" stroke-width="1"/>
    <line x1="${chartStartX}" y1="${chartStartY + chartHeight}" x2="${chartStartX + chartWidth}" y2="${chartStartY + chartHeight}" stroke="#30363d" stroke-width="1.5"/>
    
    <!-- Area chart -->
    ${areaPath ? `<path d="${areaPath}" fill="url(#chartGradient)" stroke="#3b82f6" stroke-width="2"/>` : ""}
    
    <!-- X-axis labels -->
    ${monthLabels.map((month, i) => `
      <text x="${chartStartX + (i * chartWidth / 5)}" y="${chartStartY + chartHeight + 15}" 
            style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; fill: #8b949e; text-anchor: middle;">
        ${month}
      </text>
    `).join('')}
    
    <!-- Y-axis ticks -->
    <g transform="translate(${chartStartX + chartWidth + 8}, ${chartStartY})">
      <text y="5" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; fill: #8b949e;">Max</text>
      <text y="${chartHeight * 0.5 + 3}" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; fill: #8b949e;">Mid</text>
      <text y="${chartHeight + 5}" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; fill: #8b949e;">0</text>
    </g>
    
    <!-- Chart label -->
    <text x="${chartStartX}" y="${chartStartY + chartHeight + 30}" 
          style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 10px; fill: #8b949e;">
      contributions in the last year
    </text>
  </g>
</svg>`;
}


function renderStatsNeon(stats) {
  const username = sanitizeValue(stats.username, "User").toUpperCase();
  const repoCount = sanitizeValue(stats.repoCount, "0");
  const stars = sanitizeValue(stats.stars, "0");
  const forks = sanitizeValue(stats.forks, "0");
  const followers = sanitizeValue(stats.followers, "0");
  const commits = sanitizeValue(stats.commits, "0");
  const contributions = sanitizeValue(stats.contributions, "0");
  
  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const lang1 = sanitizeValue(languages[0]?.[0], "N/A");
  const lang2 = sanitizeValue(languages[1]?.[0], "N/A");
  const lang3 = sanitizeValue(languages[2]?.[0], "N/A");
  
  return `
<svg width="750" height="400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 400">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#0a0e27"/>

  <text x="20" y="42" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 28px; font-weight: 700; fill: #00ff88; letter-spacing: 2px; filter: url(#strongGlow)">
    ${username}
  </text>
  <text x="20" y="62" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 12px; fill: #00ff88; opacity: 0.6; letter-spacing: 1px;">
    &gt; GITHUB_STATS.EXE
  </text>

  <g filter="url(#glow)">
    <rect x="20" y="85" width="140" height="75" fill="none" stroke="#00ffff" stroke-width="2" rx="8" opacity="0.7"/>
    <text x="30" y="105" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #00ffff; letter-spacing: 0.5px;">repositories</text>
    <text x="30" y="140" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 36px; font-weight: 700; fill: #00ff88;">${repoCount}</text>

    <rect x="170" y="85" width="140" height="75" fill="none" stroke="#ff00ff" stroke-width="2" rx="8" opacity="0.7"/>
    <text x="180" y="105" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #ff00ff; letter-spacing: 0.5px;">total_stars</text>
    <text x="180" y="140" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 36px; font-weight: 700; fill: #ff00ff;">${stars}</text>

    <rect x="320" y="85" width="140" height="75" fill="none" stroke="#ffff00" stroke-width="2" rx="8" opacity="0.7"/>
    <text x="330" y="105" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #ffff00; letter-spacing: 0.5px;">forks</text>
    <text x="330" y="140" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 36px; font-weight: 700; fill: #ffff00;">${forks}</text>

    <rect x="470" y="85" width="140" height="75" fill="none" stroke="#00ffff" stroke-width="2" rx="8" opacity="0.7"/>
    <text x="480" y="105" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #00ffff; letter-spacing: 0.5px;">followers</text>
    <text x="480" y="140" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 36px; font-weight: 700; fill: #00ffff;">${followers}</text>

    <rect x="620" y="85" width="110" height="75" fill="none" stroke="#ff00ff" stroke-width="2" rx="8" opacity="0.7"/>
    <text x="630" y="105" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #ff00ff; letter-spacing: 0.5px;">commits</text>
    <text x="630" y="140" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 32px; font-weight: 700; fill: #ff00ff;">${commits}</text>
  </g>

  <g filter="url(#strongGlow)" opacity="0.9">
    <text x="20" y="200" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #00ff88; letter-spacing: 1px;">activity_wave()</text>
    <path d="M 35 230 Q 60 215 85 230 T 135 230 T 185 230 T 235 230 T 285 230 T 335 230" fill="none" stroke="#00ffff" stroke-width="2.5"/>
    <path d="M 35 235 Q 60 220 85 235 T 135 235 T 185 235 T 235 235 T 285 235 T 335 235" fill="none" stroke="#ff00ff" stroke-width="2.5" opacity="0.6"/>
    <path d="M 35 240 Q 60 225 85 240 T 135 240 T 185 240 T 235 240 T 285 240 T 335 240" fill="none" stroke="#00ff88" stroke-width="2.5" opacity="0.4"/>
  </g>

  <g filter="url(#glow)">
    <text x="365" y="200" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #ffff00; letter-spacing: 1px;">languages</text>
    
    <rect x="365" y="215" width="110" height="38" fill="none" stroke="#00ffff" stroke-width="2" rx="4"/>
    <text x="378" y="240" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 16px; font-weight: 700; fill: #00ffff;">${lang1}</text>

    <rect x="485" y="215" width="110" height="38" fill="none" stroke="#ff00ff" stroke-width="2" rx="4"/>
    <text x="498" y="240" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 16px; font-weight: 700; fill: #ff00ff;">${lang2}</text>

    <rect x="605" y="215" width="110" height="38" fill="none" stroke="#ffff00" stroke-width="2" rx="4"/>
    <text x="618" y="240" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 16px; font-weight: 700; fill: #ffff00;">${lang3}</text>
  </g>

  <g filter="url(#glow)">
    <text x="20" y="300" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #00ff88; letter-spacing: 1px;">metrics::</text>
    <text x="20" y="335" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 13px; fill: #c9d1d9;">
      contributions: <tspan fill="#ff00ff">${contributions}</tspan> | commits: <tspan fill="#00ffff">${commits}</tspan> | repos: <tspan fill="#00ff88">${repoCount}</tspan>
    </text>
    <text x="20" y="370" style="font-family: 'Monaco', 'Menlo', monospace; font-size: 11px; fill: #00ff88; opacity: 0.5; letter-spacing: 0.5px;">
      $ _
    </text>
  </g>

  <line x1="0" y1="395" x2="750" y2="395" stroke="#00ff88" stroke-width="2" opacity="0.5"/>
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

export function renderStatsSVG(stats, style = "gradient") {
  if (!stats || typeof stats !== "object") {
    throw new Error("stats parameter must be a valid object");
  }

  switch (style.toLowerCase()) {
    case "gradient-graph":
      return renderStatsGradientGraph(stats);
    case "neon":
      return renderStatsNeon(stats);
    case "dark":
      return renderStatsDark(stats);
    case "vibrant":
      return renderStatsVibrant(stats);
    case "gradient":
    default:
      return renderStatsGradient(stats);
  }
}