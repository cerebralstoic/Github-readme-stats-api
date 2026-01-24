import { fetchGitHubGraphQL } from "../lib/github/graphql.js";
import { USER_STATS_QUERY } from "../lib/github/queries.js";
import { computeStatsFromGraphQL } from "../lib/stats/computeStats.js";
import { renderStatsSVG } from "../lib/svg/renderStats.js";
import { THEMES } from "../lib/themes/themes.js";
import { fetchAllCommitCount } from "../lib/stats/allcommits.js";
import { getCache, setCache } from "../lib/cache/svgCache.js";

export default async function statsHandler(req, res) {
  const url = new URL(req.originalUrl || req.url, "http://localhost");

  const username = url.searchParams.get("username");
  const style = url.searchParams.get("style") || "gradient";
  const themeName = url.searchParams.get("theme") || "default";
  const includeAllCommits = url.searchParams.get("include_all_commits") === "true";
  const theme = THEMES[themeName] || THEMES.default;

  if (!username) {
    res.end(`<svg><text x="10" y="20">Missing username</text></svg>`);
    return;
  }

  const cacheKey = `stats:${username}:${style}:${themeName}:all=${includeAllCommits}`;
  const cachedSVG = getCache(cacheKey);

  if (cachedSVG) {
    res.end(cachedSVG);
    return;
  }

  try {
    const data = await fetchGitHubGraphQL(USER_STATS_QUERY, { username });

    const stats = computeStatsFromGraphQL(data);
    if(includeAllCommits) {
      const allCommits = await fetchAllCommitCount(
      username,
      process.env.GITHUB_TOKEN
    );
      stats.commits = allCommits;
    }
    

    const svg = renderStatsSVG(stats, style, theme);

    setCache(cacheKey, svg);
    res.end(svg);
  } catch (err) {
    res.end(`
<svg width="900" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0d1117"/>
  <text x="10" y="30" fill="#ff5555" font-size="14">
    ${err?.message}
  </text>
</svg>
`);
  }
}
