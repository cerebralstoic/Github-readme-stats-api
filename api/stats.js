import { fetchGitHubGraphQL } from "../lib/github/graphql.js";
import { USER_STATS_QUERY } from "../lib/github/queries.js";
import { computeStatsFromGraphQL } from "../lib/stats/computeStatsFromGraphQL.js";
import { renderStatsSVG } from "../lib/svg/index.js";

export default async function statsHandler(req, res) {
  try {
    const { username, style = 'gradient', theme = 'github' } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Calculate date range for contributions (last year)
    const to = new Date();
    const from = new Date();
    from.setFullYear(to.getFullYear() - 1);

    // Fetch data from GitHub GraphQL API
    const rawData = await fetchGitHubGraphQL(USER_STATS_QUERY, {
      username,
      from: from.toISOString(),
      to: to.toISOString()
    });
    
    // Compute stats from raw data
    const stats = computeStatsFromGraphQL(rawData);
    
    // Render SVG with specified style and theme
    const svg = renderStatsSVG(stats, style, theme);
    
    // Set response headers
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes cache
    
    res.send(svg);
  } catch (error) {
    console.error('Error generating stats:', error);
    
    // Return a simple error SVG
    const errorSvg = `
<svg width="400" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100">
  <rect width="100%" height="100%" fill="#1a1a1a"/>
  <text x="200" y="50" text-anchor="middle" fill="#ff6b6b" font-family="Arial, sans-serif" font-size="14">
    Error: ${error.message}
  </text>
</svg>`;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(500).send(errorSvg);
  }
}
