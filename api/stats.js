import { fetchGitHubGraphQL } from "../lib/github/graphql.js";
import { USER_STATS_QUERY } from "../lib/github/queries.js";
import { computeStatsFromGraphQL } from "../lib/stats/computeStats.js";
import { renderStatsSVG } from "../lib/svg/renderStats.js";

export default async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const username = url.searchParams.get("username");

  try {
    const data = await fetchGitHubGraphQL(
      USER_STATS_QUERY,
      { username }
    );

    const stats = computeStatsFromGraphQL(data);
    const svg = renderStatsSVG(stats);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.end(svg);
  } catch (err) {
    res.end(`<svg><text>Error fetching stats</text></svg>`);
  }
}
