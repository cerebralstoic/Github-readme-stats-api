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
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
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
        languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
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