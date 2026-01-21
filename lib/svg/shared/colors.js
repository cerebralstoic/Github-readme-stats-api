/**
 * Color schemes for different card styles
 */

export const colorThemes = {
  gradient: {
    primary: {
      start: '#3b82f6',
      end: '#1e40af'
    },
    text: {
      primary: '#ffffff',
      secondary: '#8b949e',
      accent: '#58a6ff'
    },
    card: {
      background: '#161b22',
      border: '#30363d'
    }
  },
  dark: {
    background: '#000000',
    text: {
      primary: '#ffffff',
      secondary: '#888888'
    },
    divider: '#333333'
  },
  vibrant: {
    gradients: [
      { start: '#ec4899', end: '#a855f7' },
      { start: '#06b6d4', end: '#3b82f6' },
      { start: '#f59e0b', end: '#ef4444' }
    ],
    background: '#0f172a',
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.95)'
    }
  },
  insight: {
    background: '#ffffff',
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#3b82f6'
    },
    card: {
      background: '#f9fafb',
      border: '#e5e7eb',
      shadow: 'rgba(0, 0, 0, 0.05)'
    }
  },
  topLanguages: {
    background: '#0f172a',
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      accent: '#60a5fa'
    },
    bar: {
      background: '#1e293b',
      fill: '#3b82f6'
    }
  }
};

/**
 * Language color fallbacks for when GitHub's API doesn't provide a color
 */
export const languageColors = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  'PHP': '#4F5D95',
  'Ruby': '#701516',
  'CSS': '#563d7c',
  'HTML': '#e34c26',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Swift': '#F05138',
  'Kotlin': '#A97BFF',
  'Dart': '#00B4AB',
  'Scala': '#c22d40',
  'Shell': '#89e051',
  'PowerShell': '#012456',
  'Vue': '#41b883',
  'Dockerfile': '#384d54',
  'Makefile': '#427819',
  'Batchfile': '#C1F12E',
  'TSQL': '#e38c00',
  'PLSQL': '#dad8d8',
  'PLpgSQL': '#336790',
  'Objective-C': '#438eff',
  'Objective-C++': '#6866fb',
  'Jupyter Notebook': '#DA5B0B',
  'R': '#198CE7',
  'Matlab': '#e16737',
  'TeX': '#3D6117',
  'Vim script': '#199f4b',
  'Lua': '#000080',
  'Pascal': '#E3F171',
  'Perl': '#0298c3',
  'Haskell': '#5e5086',
  'Elixir': '#6e4a7e',
  'Clojure': '#db5855',
  'Erlang': '#B83998',
  'OCaml': '#3be133',
  'F#': '#b845fc',
  'D': '#ba595e',
  'Common Lisp': '#3fb68b',
  'Assembly': '#6E4C13',
  'Rust': '#000000',
  'Swift': '#F05138',
  'Kotlin': '#A97BFF',
  'Dart': '#00B4AB',
  'default': '#cccccc' // Fallback color
};

/**
 * Gets a color for a programming language
 * @param {string} language - The programming language name
 * @returns {string} Hex color code
 */
export function getLanguageColor(language) {
  if (!language) return languageColors.default;
  return languageColors[language] || languageColors.default;
}
