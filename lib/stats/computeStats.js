export function computeStatsFromGraphQL(data) {
  if (!data || !data.user) {
    throw new Error("Invalid GitHub GraphQL response");
  }

  const user = data.user;
  const repos = user.repositories?.nodes ?? [];
  const cc = user.contributionsCollection ?? {};

  let stars = 0;
  let forks = 0;

  const languageTotals = {};
  const languageColors = {};

  for (const repo of repos) {
    stars += repo.stargazerCount || 0;
    forks += repo.forkCount || 0;

    if (!repo.languages?.edges) continue;

    for (const lang of repo.languages.edges) {
      const name = lang.node.name;
      const size = lang.size || 0;

      languageTotals[name] = (languageTotals[name] || 0) + size;

      if (!languageColors[name]) {
        languageColors[name] = lang.node.color;
      }
    }
  }

  const totalLanguageBytes = Object.values(languageTotals)
    .reduce((sum, b) => sum + b, 0);

  const topLanguages = Object.entries(languageTotals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalLanguageBytes
        ? ((bytes / totalLanguageBytes) * 100).toFixed(2)
        : "0.00",
      color: languageColors[name]
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6);

  const createdAt = new Date(user.createdAt);
  const now = new Date();

  return {
    username: user.login,
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    location: user.location,
    company: user.company,
    website: user.websiteUrl,
    twitter: user.twitterUsername,
    hireable: user.isHireable,

    followers: user.followers?.totalCount ?? 0,
    following: user.following?.totalCount ?? 0,

    stars,
    forks,

    commits: cc.totalCommitContributions ?? 0,
    pullRequests: cc.totalPullRequestContributions ?? 0,
    pullRequestReviews: cc.totalPullRequestReviewContributions ?? 0,
    issues: cc.totalIssueContributions ?? 0,
    contributions:
      cc.contributionCalendar?.totalContributions ?? 0,

    contributedTo: user.repositoriesContributedTo?.totalCount ?? 0,
    repoCount: user.repositories?.totalCount ?? repos.length,

    topLanguages,

    accountAge: Math.max(
      0,
      Math.floor((now - createdAt) / (1000 * 60 * 60 * 24 * 365))
    )
  };
}
