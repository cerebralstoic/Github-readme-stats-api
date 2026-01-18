export function computeStatsFromGraphQL(data) {
  const user = data.user;

  let stars = 0;
  let forks = 0;
  const languages = {};

  user.repositories.nodes.forEach(repo => {
    stars += repo.stargazerCount;
    forks += repo.forkCount;

    repo.languages.edges.forEach(lang => {
      languages[lang.node.name] =
        (languages[lang.node.name] || 0) + lang.size;
    });
  });

  const sortedLangs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1]);

  return {
    username: user.login,
    stars,
    forks,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    commits: user.contributionsCollection.totalCommitContributions,
    contributions: user.contributionsCollection.contributionCalendar.totalContributions,
    topLanguages: sortedLangs.slice(0, 5),
    repoCount: user.repositories.nodes.length,
    accountAge: Math.floor(
      (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24 * 365)
    )
  };
}
