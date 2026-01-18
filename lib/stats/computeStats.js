export function computeStats(user, repos) {
  const stars = repos.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  const forks = repos.reduce(
    (total, repo) => total + repo.forks_count,
    0
  );

  return {
    username: user.login,
    repos: user.public_repos,
    stars,
    forks,
    followers: user.followers,
  };
}
