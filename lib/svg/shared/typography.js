/**
 * Typography styles for SVG cards
 */

export const textStyles = {
  // Title styles
  title: {
    fontFamily: `'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`,
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    lineHeight: '1.2'
  },
  
  // Subtitle styles
  subtitle: {
    fontFamily: `'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`,
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    lineHeight: '1.4'
  },
  
  // Stat value styles
  stat: {
    fontFamily: `'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`,
    fontSize: '28px',
    fontWeight: '700',
    lineHeight: '1.2'
  },
  
  // Small stat value styles
  statSmall: {
    fontFamily: `'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`,
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.2'
  },
  
  // Body text
  body: {
    fontFamily: `'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`,
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '1.5'
  },
  
  // Label styles
  label: {
    fontFamily: `'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`,
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    lineHeight: '1.4'
  },
  
  // Language list styles
  language: {
    fontFamily: `'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`,
    fontSize: '11px',
    fontWeight: '600',
    lineHeight: '1.4'
  }
};

/**
 * Applies text styles to an SVG text element
 * @param {Object} options - Style options
 * @param {string} options.type - The style type (e.g., 'title', 'subtitle', 'stat')
 * @param {Object} [options.overrides] - Style overrides
 * @returns {string} Inline styles string
 */
export function applyTextStyle({ type, overrides = {} }) {
  const style = { ...textStyles[type], ...overrides };
  return Object.entries(style)
    .map(([key, value]) => {
      if (key === 'color') {
        return `fill: ${value}`;
      }
      // Convert camelCase to kebab-case for CSS properties
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join(';');
}

/**
 * Truncates text to a maximum length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export function truncateText(text, maxLength = 30) {
  if (typeof text !== 'string') return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}
