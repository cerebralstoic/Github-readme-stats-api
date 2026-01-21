/**
 * Theme definitions for SVG cards
 * Each theme defines background and font colors that work across all card styles
 */

export const themes = {
  // Default dark blue theme (like your design)
  github: {
    background: '#0d1117',
    primaryText: '#ffffff',
    secondaryText: '#8b949e',
    accent: '#0366d6',
    card: '#161b22',
    border: '#30363d',
    muted: '#656d76'
  },

  // Light theme
  light: {
    background: '#ffffff',
    primaryText: '#24292e',
    secondaryText: '#656d76',
    accent: '#0366d6',
    card: '#f6f8fa',
    border: '#d0d7de',
    muted: '#959da5'
  },

  // Dark theme
  dark: {
    background: '#0d1117',
    primaryText: '#ffffff',
    secondaryText: '#8b949e',
    accent: '#58a6ff',
    card: '#161b22',
    border: '#30363d',
    muted: '#656d76'
  },

  // Midnight theme
  midnight: {
    background: '#010409',
    primaryText: '#c9d1d9',
    secondaryText: '#8b949e',
    accent: '#f0f6fc',
    card: '#0d1117',
    border: '#21262d',
    muted: '#484f58'
  },

  // Ocean theme
  ocean: {
    background: '#0a192f',
    primaryText: '#e6f1ff',
    secondaryText: '#94a3b8',
    accent: '#0ea5e9',
    card: '#172a45',
    border: '#1e3a5f',
    muted: '#64748b'
  },

  // Forest theme
  forest: {
    background: '#0d1117',
    primaryText: '#7ee787',
    secondaryText: '#8b949e',
    accent: '#238636',
    card: '#161b22',
    border: '#30363d',
    muted: '#656d76'
  },

  // Sunset theme
  sunset: {
    background: '#1a0f1f',
    primaryText: '#ff6b6b',
    secondaryText: '#ffa726',
    accent: '#f72585',
    card: '#2d1b3d',
    border: '#4a2c4a',
    muted: '#e76f51'
  },

  // Purple theme
  purple: {
    background: '#1a0033',
    primaryText: '#e0aaff',
    secondaryText: '#b794f6',
    accent: '#c77dff',
    card: '#2d1b69',
    border: '#402080',
    muted: '#8b5cf6'
  },

  // Monochrome theme
  monochrome: {
    background: '#000000',
    primaryText: '#ffffff',
    secondaryText: '#a0a0a0',
    accent: '#ffffff',
    card: '#1a1a1a',
    border: '#333333',
    muted: '#666666'
  }
};

/**
 * Gets a theme by name, returns default if not found
 * @param {string} themeName - Name of the theme
 * @returns {Object} Theme object
 */
export function getTheme(themeName = 'github') {
  return themes[themeName] || themes.github;
}

/**
 * Applies theme colors to a base color theme
 * @param {Object} baseTheme - Base color theme (like gradient, dark, etc)
 * @param {Object} customTheme - Custom theme with background and font colors
 * @returns {Object} Merged theme
 */
export function applyTheme(baseTheme, customTheme) {
  return {
    ...baseTheme,
    background: customTheme.background,
    text: {
      ...baseTheme.text,
      primary: customTheme.primaryText,
      secondary: customTheme.secondaryText
    },
    card: {
      ...baseTheme.card,
      background: customTheme.card,
      border: customTheme.border
    }
  };
}
