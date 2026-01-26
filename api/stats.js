import { fetchGitHubGraphQL } from "../lib/github/graphql.js";
import { USER_STATS_QUERY } from "../lib/github/queries.js";
import { computeStatsFromGraphQL } from "../lib/stats/computeStats.js";
import { renderStatsSVG } from "../lib/svg/renderStats.js";
import { THEMES } from "../lib/themes/themes.js";
import { fetchAllCommitCount } from "../lib/stats/allcommits.js";
import { getCache, setCache } from "../lib/cache/svgCache.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { svgHeaders } from "../middleware/headers.js";

export default async function handler(req, res) {
  try {
    rateLimit(req, res, () => {});
    svgHeaders(req, res, () => {});
  } catch {
    return;
  }

  const username = req.query.username;
  const style = req.query.style || "stats";
  const themeName = req.query.theme || "default";
  const includeAllCommits = req.query.include_all_commits === "true";

  const theme = THEMES[themeName] || THEMES.default;

  if (!username) {
    res.end(`<svg><text x="10" y="20">Missing username</text></svg>`);
    return;
  }

  const cacheKey = `stats:${username}:${style}:${themeName}:all=${includeAllCommits}`;
  const cached = getCache(cacheKey);

  if (cached) {
    res.end(cached);
    return;
  }

  try {
    const data = await fetchGitHubGraphQL(USER_STATS_QUERY, { username });
    const stats = computeStatsFromGraphQL(data);

    if (includeAllCommits) {
      stats.commits = await fetchAllCommitCount(
        username,
        process.env.GITHUB_TOKEN
      );
    }

    const svg = renderStatsSVG(stats, style, theme);

    setCache(cacheKey, svg);
    res.end(svg);
  } catch (err) {
    res.end(`
<svg width="900" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0d1117"/>
  <text x="10" y="30" fill="#ff5555" font-size="14">
    ${err.message}
  </text>
</svg>
`);
  }
}
