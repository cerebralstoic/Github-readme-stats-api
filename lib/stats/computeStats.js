export function computeStatsFromGraphQL(data) {
  if (!data || !data.user) {
    throw new Error("Invalid GitHub GraphQL response");
  }

  const user = data.user;
  const repos = user.repositories?.nodes ?? [];
  const cc = user.contributionsCollection ?? {};

  let stars = 0;
  let forks = 0;
  const languages = {};

  for (const repo of repos) {
    stars += repo.stargazerCount || 0;
    forks += repo.forkCount || 0;

    if (repo.primaryLanguage?.name) {
      const lang = repo.primaryLanguage.name;
      languages[lang] = (languages[lang] || 0) + (repo.diskUsage || 1);
    }
  }

  const sortedLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
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
    contributions: cc.contributionCalendar?.
    totalContributions ?? 0,

    contributedTo: user.repositoriesContributedTo?.totalCount,
    repoCount: user.repositories?.totalCount ?? repos.length,
    topLanguages: sortedLanguages,

    accountAge: Math.max(
      0,
      Math.floor((now - createdAt) / (1000 * 60 * 60 * 24 * 365))
    )
  };
}
