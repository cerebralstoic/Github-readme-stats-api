/**
 * Utility functions for normalizing and validating stats data
 */

/**
 * Ensures a value is a number, providing a fallback if invalid
 * @param {any} value - Value to normalize
 * @param {number} [fallback=0] - Fallback value if invalid
 * @returns {number} Normalized number
 */
export function normalizeNumber(value, fallback = 0) {
  const num = Number(value);
  return isNaN(num) || !isFinite(num) ? fallback : num;
}

/**
 * Ensures a value is a string, providing a fallback if invalid
 * @param {any} value - Value to normalize
 * @param {string} [fallback=''] - Fallback value if invalid
 * @returns {string} Normalized string
 */
export function normalizeString(value, fallback = '') {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

/**
 * Normalizes an array, ensuring it's a valid array
 * @param {any} value - Value to normalize
 * @param {Array} [fallback=[]] - Fallback array if invalid
 * @returns {Array} Normalized array
 */
export function normalizeArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

/**
 * Validates and normalizes a stats object to ensure it matches the expected shape
 * @param {Object} stats - Stats object to validate and normalize
 * @returns {Object} Normalized stats object
 * @throws {Error} If the stats object is fundamentally invalid
 */
export function validateAndNormalizeStats(stats) {
  if (!stats || typeof stats !== 'object') {
    throw new Error('Stats must be an object');
  }

  // Normalize all numeric fields
  const normalized = {
    username: normalizeString(stats.username, 'Unknown'),
    stars: normalizeNumber(stats.stars),
    forks: normalizeNumber(stats.forks),
    commits: normalizeNumber(stats.commits),
    pullRequests: normalizeNumber(stats.pullRequests),
    issues: normalizeNumber(stats.issues),
    contributedTo: normalizeNumber(stats.contributedTo),
    followers: normalizeNumber(stats.followers),
    repoCount: normalizeNumber(stats.repoCount),
    topLanguages: normalizeArray(stats.topLanguages)
  };

  // Validate topLanguages structure
  normalized.topLanguages = normalized.topLanguages.map(lang => ({
    name: normalizeString(lang.name, 'Unknown'),
    percent: Math.max(0, normalizeNumber(lang.percent, 0)),
    color: normalizeString(lang.color, '#cccccc')
  }));

  return normalized;
}
