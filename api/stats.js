import { getUserAndRepos } from "../lib/github/rest.js";
import { computeStats } from "../lib/stats/computeStats.js";
import { renderStatsSVG } from "../lib/svg/renderStats.js";

export default async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const username = url.searchParams.get("username");

  try {
    const { user, repos } = await getUserAndRepos(username);
    const stats = computeStats(user, repos);
    const svg = renderStatsSVG(stats);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.end(svg);
  } catch (err) {
    res.setHeader("Content-Type", "image/svg+xml");
    res.end(`<svg><text>User not found</text></svg>`);
  }
}
