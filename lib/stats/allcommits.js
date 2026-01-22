export async function fetchAllCommitCount(username, token) {
  const res = await fetch(
    `https://api.github.com/search/commits?q=author:${username}`,
    {
      headers: {
        "Accept": "application/vnd.github.cloak-preview+json",
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch commit count");
  }

  const data = await res.json();
  return data.total_count || 0;
}
