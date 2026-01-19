export const USER_STATS_QUERY = `
query ($username: String!, $from: DateTime!, $to: DateTime!) {
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

    contributionsCollection(from: $from, to: $to) {
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
    repositoriesContributedTo(
      contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, PULL_REQUEST_REVIEW]
      includeUserRepositories: true
      first: 100
    ) {
      totalCount
    }
  }
}
`;