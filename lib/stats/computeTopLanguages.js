import { getLanguageColor } from '../svg/shared/colors.js';

/**
 * Computes top languages from repository data with GitHub-style weighting
 * @param {Array} repos - Array of repository objects
 * @param {Object} options - Configuration options
 * @param {number} options.sizeWeight - Weight for disk usage (default: 1)
 * @param {number} options.countWeight - Weight for repository count (default: 50)
 * @param {number} options.limit - Maximum number of languages to return (default: 6)
 * @returns {Array} Array of language objects with name, percent, and color
 */
export function computeTopLanguages(repos, { sizeWeight = 1, countWeight = 50, limit = 6 } = {}) {
  // Create language map with size and count tracking
  const languageMap = {};
  
  for (const repo of repos) {
    const language = repo.primaryLanguage?.name;
    if (!language) continue;
    
    if (!languageMap[language]) {
      languageMap[language] = {
        size: 0,
        count: 0
      };
    }
    
    // Add disk usage and count for each repository
    languageMap[language].size += repo.diskUsage || 0;
    languageMap[language].count += 1;
  }
  
  // Calculate scores for each language
  const scoredLanguages = Object.entries(languageMap).map(([name, data]) => ({
    name,
    score: (data.size * sizeWeight) + (data.count * countWeight)
  }));
  
  // Calculate total score for percentage normalization
  const totalScore = scoredLanguages.reduce((sum, lang) => sum + lang.score, 0);
  
  // Sort by score, limit results, and normalize to 100%
  const topLanguages = scoredLanguages
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(lang => ({
      name: lang.name,
      percent: totalScore > 0 ? Math.round((lang.score / totalScore) * 100) : 0,
      color: getLanguageColor(lang.name)
    }));
  
  // Ensure percentages sum to 100% (handle rounding errors)
  if (topLanguages.length > 0) {
    const currentSum = topLanguages.reduce((sum, lang) => sum + lang.percent, 0);
    const difference = 100 - currentSum;
    
    // Add the difference to the language with the highest percentage
    if (difference !== 0 && topLanguages.length > 0) {
      const maxIndex = topLanguages.findIndex(lang => 
        lang.percent === Math.max(...topLanguages.map(l => l.percent))
      );
      if (maxIndex !== -1) {
        topLanguages[maxIndex].percent += difference;
      }
    }
  }
  
  return topLanguages;
}