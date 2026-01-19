import fetch from "node-fetch";
import { env } from "../../config/env.js";

const endpoint = "https://api.github.com/graphql";

export async function fetchGitHubGraphQL(query, variables) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.githubToken}`,
      "Content-Type": "application/json",
      "User-Agent": "github-readme-stats-api"
    },
    body: JSON.stringify({ query, variables })
  });

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from GitHub: ${text}`);
  }

  if (!res.ok) {
    throw new Error(
      `GitHub API error ${res.status}: ${json?.message || text}`
    );
  }

  if (json.errors?.length) {
    throw new Error(json.errors.map(e => e.message).join(" | "));
  }

  return json.data;
}
