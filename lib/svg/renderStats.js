export function renderStatsSVG(stats) {
  return `
<svg width="450" height="170" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: Arial, sans-serif; fill: #c9d1d9; }
  </style>

  <rect width="100%" height="100%" rx="12" fill="#0d1117"/>

  <text x="20" y="35" font-size="18">
    ${stats.username}'s GitHub Stats
  </text>

  <text x="20" y="70">Repos: ${stats.repos}</text>
  <text x="20" y="95">Stars: ${stats.stars}</text>
  <text x="20" y="120">Forks: ${stats.forks}</text>
  <text x="20" y="145">Followers: ${stats.followers}</text>
</svg>`;
}
