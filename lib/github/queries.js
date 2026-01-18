export const USER_STATS_QUERY = `
query ($username: String!) {
  user(login: $username) {
    login
    name
    bio
    avatarUrl
    location
    company
    websiteUrl
    twitterUsername
    createdAt
    isHireable

    followers { totalCount }
    following { totalCount }

    contributionsCollection {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
      }
    }

    repositories(
      ownerAffiliations: OWNER
      isFork: false
      first: 100
      orderBy: { field: STARGAZERS, direction: DESC }
    ) {
      totalCount
      nodes {
        name
        stargazerCount
        forkCount
        diskUsage
        primaryLanguage {
          name
          color
        }
        updatedAt
      }
    }
  }
}
`;