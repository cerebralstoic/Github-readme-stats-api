import { fetchGitHubGraphQL } from "../lib/github/graphql.js";
import { USER_STATS_QUERY } from "../lib/github/queries.js";
import { computeStatsFromGraphQL } from "../lib/stats/computeStats.js";
import { renderStatsSVG } from "../lib/svg/renderStats.js";

export default async function statsHandler(req, res) {
  const url = new URL(req.originalUrl || req.url, "http://localhost");

  const username = url.searchParams.get("username");
  const style = url.searchParams.get("style") || "gradient";

  if (!username) {
    res.setHeader("Content-Type", "image/svg+xml");
    res.end(`<svg><text x="10" y="20">Missing username</text></svg>`);
    return;
  }

  try {

    const data = await fetchGitHubGraphQL(
      USER_STATS_QUERY,
      {
        username,
      }
    );

    const stats = computeStatsFromGraphQL(data);
    console.log(`[STATS] ${username} total commits (all-time):`, stats.commits);
    const svg = renderStatsSVG(stats, style);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=21600");
    res.end(svg);
  }  catch (err) {
  res.setHeader("Content-Type", "image/svg+xml");
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
