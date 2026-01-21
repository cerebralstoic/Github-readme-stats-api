import { renderStatsGradient } from './cards/stats-gradient.js';
import { renderStatsDark } from './cards/stats-dark.js';
import { renderStatsInsight } from './cards/stats-insight.js';
import { renderTopLanguages } from './cards/top-languages.js';
import { getTheme } from './shared/themes.js';

/**
 * Renders stats SVG based on style and theme
 * @param {Object} stats - User statistics
 * @param {string} style - Card style ('gradient', 'dark', 'insight', 'top-languages')
 * @param {string} theme - Theme name (optional, defaults to 'github')
 * @returns {string} SVG markup
 */
export function renderStatsSVG(stats, style = 'gradient', theme = 'github') {
  // Get the theme
  const selectedTheme = getTheme(theme);
  
  switch (style) {
    case 'gradient':
      return renderStatsGradient(stats, selectedTheme);
    case 'dark':
      return renderStatsDark(stats, selectedTheme);
    case 'insight':
      return renderStatsInsight(stats, selectedTheme);
    case 'top-languages':
      return renderTopLanguages(stats, selectedTheme);
    default:
      // Default to gradient style if style is not recognized
      return renderStatsGradient(stats, selectedTheme);
  }
}

/**
 * Gets available styles
 * @returns {string[]} Array of available style names
 */
export function getAvailableStyles() {
  return ['gradient', 'dark', 'insight', 'top-languages'];
}

/**
 * Gets available themes
 * @returns {string[]} Array of available theme names
 */
export function getAvailableThemes() {
  return [
    'github',
    'light', 
    'dark',
    'midnight',
    'ocean',
    'forest',
    'sunset',
    'purple',
    'monochrome'
  ];
}

/**
 * Renders a top languages SVG card
 * @param {Object} stats - User statistics
 * @returns {string} Rendered SVG string
 */
export function renderTopLanguagesSVG(stats) {
  return renderStatsSVG(stats, 'top-languages');
}

export default {
  renderStatsSVG,
  renderTopLanguages: renderTopLanguagesSVG
};
