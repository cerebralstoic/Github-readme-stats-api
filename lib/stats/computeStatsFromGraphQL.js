import { computeTopLanguages } from './computeTopLanguages.js';

/**
 * Computes normalized stats from raw GitHub GraphQL data
 * @param {Object} data - Raw GraphQL response from GitHub API
 * @returns {Object} Normalized stats object with final UI-ready data
 * @throws {Error} If data is invalid or malformed
 */
export function computeStatsFromGraphQL(data) {
  if (!data || !data.user) {
    throw new Error('Invalid GitHub GraphQL response: missing user data');
  }

  const user = data.user;
  const repos = user.repositories?.nodes ?? [];
  const contributionsCollection = user.contributionsCollection ?? {};

  // Calculate aggregate statistics
  let totalStars = 0;
  let totalForks = 0;

  for (const repo of repos) {
    totalStars += repo.stargazerCount || 0;
    totalForks += repo.forkCount || 0;
  }

  // Compute top languages with proper weighting
  const topLanguages = computeTopLanguages(repos, {
    sizeWeight: 1,
    countWeight: 50,
    limit: 6
  });

  // Extract and normalize all required fields
  const stats = {
    // Basic user info
    username: user.login || 'Unknown',
    
    // Repository statistics
    stars: totalStars,
    forks: totalForks,
    repoCount: user.repositories?.totalCount ?? repos.length,
    
    // Contribution statistics
    commits: contributionsCollection.totalCommitContributions ?? 0,
    pullRequests: contributionsCollection.totalPullRequestContributions ?? 0,
    issues: contributionsCollection.totalIssueContributions ?? 0,
    contributedTo: user.repositoriesContributedTo?.totalCount ?? 0,
    
    // Social statistics
    followers: user.followers?.totalCount ?? 0,
    
    // Top languages (already computed and normalized)
    topLanguages
  };

  // Validate the final stats object
  validateStats(stats);

  return stats;
}

/**
 * Validates that the stats object has the required shape
 * @param {Object} stats - Stats object to validate
 * @throws {Error} If validation fails
 */
function validateStats(stats) {
  const requiredFields = [
    'username', 'stars', 'forks', 'commits', 'pullRequests',
    'issues', 'contributedTo', 'followers', 'repoCount', 'topLanguages'
  ];

  for (const field of requiredFields) {
    if (!(field in stats)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!Array.isArray(stats.topLanguages)) {
    throw new Error('topLanguages must be an array');
  }

  // Validate topLanguages structure
  for (const lang of stats.topLanguages) {
    if (!lang.name || typeof lang.name !== 'string') {
      throw new Error('Each language must have a valid name');
    }
    if (typeof lang.percent !== 'number' || lang.percent < 0) {
      throw new Error('Each language must have a valid percentage');
    }
    if (!lang.color || typeof lang.color !== 'string') {
      throw new Error('Each language must have a valid color');
    }
  }
}
