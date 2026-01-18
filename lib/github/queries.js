export const USER_STATS_QUERY = `
query ($username: String!) {
  user(login: $username) {
    login
    createdAt

    followers { totalCount }
    following { totalCount }

    contributionsCollection {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      contributionCalendar {
        totalContributions
      }
    }

    repositories(
      ownerAffiliations: OWNER
      isFork: false
      first: 100
    ) {
      nodes {
        name
        stargazerCount
        forkCount
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              name
            }
          }
        }
      }
    }
  }
}
`;
