import fetch from "node-fetch";
import { env } from "../../config/env.js";

const headers = {
  Authorization: `Bearer ${env.githubToken}`,
  "User-Agent": "github-readme-stats-api",
};

export async function getUserAndRepos(username) {
  const userRes = await fetch(
    `https://api.github.com/users/${username}`,
    { headers }
  );

  if (!userRes.ok) {
    throw new Error("User not found");
  }

  const user = await userRes.json();

  const repoRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers }
  );

  const repos = await repoRes.json();

  return { user, repos };
}
