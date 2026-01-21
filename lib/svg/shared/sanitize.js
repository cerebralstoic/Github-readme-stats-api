/**
 * Sanitizes a value by ensuring it's a string and providing a fallback if needed.
 * @param {any} value - The value to sanitize
 * @param {string} [fallback='N/A'] - Fallback value if value is invalid
 * @returns {string} Sanitized string value
 */
export function sanitizeValue(value, fallback = 'N/A') {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value);
}

/**
 * Safely gets an array, returning a default if the input is not a valid array
 * @param {any} arr - The array to validate
 * @param {Array} [defaultArr=[]] - Default array to return if input is invalid
 * @returns {Array} The validated array or default
 */
export function getSafeArray(arr, defaultArr = []) {
  return Array.isArray(arr) && arr.length > 0 ? arr : defaultArr;
}

/**
 * Validates the stats object against the expected shape
 * @param {Object} stats - The stats object to validate
 * @throws {Error} If stats object is invalid
 */
export function validateStats(stats) {
  if (!stats || typeof stats !== 'object') {
    throw new Error('Invalid stats: must be an object');
  }

  const required = [
    'username', 'stars', 'forks', 'commits', 'pullRequests',
    'issues', 'contributedTo', 'followers', 'repoCount', 'topLanguages'
  ];

  const missing = required.filter(field => !(field in stats));
  if (missing.length > 0) {
    throw new Error(`Missing required stats fields: ${missing.join(', ')}`);
  }

  if (!Array.isArray(stats.topLanguages)) {
    throw new Error('topLanguages must be an array');
  }
}
