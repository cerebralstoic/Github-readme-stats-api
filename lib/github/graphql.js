import fetch from "node-fetch";
import { env } from "../../config/env.js";

const endpoint = "https://api.github.com/graphql";

export async function fetchGitHubGraphQL(query, variables) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.githubToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, variables })
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
