export function renderStatsSVG(stats) {
  return `
<svg width="520" height="260" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: Arial, sans-serif; fill: #c9d1d9; }
    .title { font-size: 18px; font-weight: bold; }
    .stat { font-size: 14px; }
  </style>

  <rect width="100%" height="100%" rx="12" fill="#0d1117"/>

  <text x="20" y="35" class="title">
    ${stats.username}'s GitHub Stats
  </text>

  <text x="20" y="70"  class="stat">📦 Repositories: ${stats.repoCount}</text>
  <text x="20" y="95"  class="stat">⭐ Stars: ${stats.stars}</text>
  <text x="20" y="120" class="stat">🍴 Forks: ${stats.forks}</text>

  <text x="270" y="70"  class="stat">👥 Followers: ${stats.followers}</text>
  <text x="270" y="95"  class="stat">➡️ Following: ${stats.following}</text>
  <text x="270" y="120" class="stat">⏳ GitHub Age: ${stats.accountAge} yrs</text>

  <text x="20" y="155" class="stat">
    🧮 Commits (last year): ${stats.commits}
  </text>

  <text x="20" y="180" class="stat">
    🔥 Total Contributions: ${stats.contributions}
  </text>

  <text x="20" y="210" class="stat">
    🧠 Top Languages: ${stats.topLanguages
      .map(l => l[0])
      .join(", ")}
  </text>
</svg>`;
}
