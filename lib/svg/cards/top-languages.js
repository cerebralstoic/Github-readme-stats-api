import { applyTheme } from '../shared/themes.js';
import { applyTextStyle } from '../shared/typography.js';
import { sanitizeValue, getSafeArray } from '../shared/sanitize.js';

/**
 * Renders a top languages card with horizontal bars - enhanced design with theme support
 * @param {Object} stats - User statistics
 * @param {Object} theme - Theme object with background and font colors
 * @returns {string} SVG markup
 */
export function renderTopLanguages(stats, theme) {
  const { username } = stats;
  
  // Apply theme to base design
  const colors = applyTheme({
    background: '#0f172a',
    text: { primary: '#f8fafc', secondary: '#94a3b8' },
    card: { background: '#1e293b', border: '#334155' }
  }, theme);
  
  // Sanitize username
  const safeUsername = sanitizeValue(username, 'User');
  
  // Process top languages
  const languages = getSafeArray(stats.topLanguages, []);
  
  // Generate styles
  const titleStyle = applyTextStyle({ 
    type: 'title', 
    overrides: { 
      fontSize: '18px',
      color: colors.text.primary
    } 
  });
  
  const languageNameStyle = applyTextStyle({
    type: 'body',
    overrides: {
      fontSize: '12px',
      fontWeight: '600',
      color: colors.text.primary
    }
  });
  
  const percentageStyle = applyTextStyle({
    type: 'body',
    overrides: {
      fontSize: '12px',
      fontWeight: '600',
      color: colors.text.secondary
    }
  });

  return `
<svg width="500" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <rect width="100%" height="100%" fill="${colors.background}" rx="16" filter="url(#cardShadow)"/>
  
  <!-- Title -->
  <text x="24" y="40" style="${titleStyle}">
    ${safeUsername}'s Top Languages
  </text>
  
  <!-- Language Bars -->
  ${languages.map((lang, index) => {
    const safeName = sanitizeValue(lang.name, 'Unknown');
    const safePercentage = sanitizeValue(lang.percentage, '0');
    const safeColor = sanitizeValue(lang.color, '#64748b');
    const barWidth = (parseFloat(safePercentage) / 100) * 460; // 460 is max bar width
    
    return `
      <!-- ${safeName} -->
      <text x="20" y="${88 + (index * 30)}" style="${languageNameStyle}">
        ${safeName}
      </text>
      <text x="490" y="${88 + (index * 30)}" text-anchor="end" style="${percentageStyle}">
        ${safePercentage}%
      </text>
      <rect 
        x="20" 
        y="${80 + (index * 30)}" 
        width="460" 
        height="12" 
        rx="6" 
        ry="6" 
        fill="${colors.card.background}"
      />
      <rect 
        x="20" 
        y="${80 + (index * 30)}" 
        width="${barWidth}" 
        height="12" 
        rx="6" 
        ry="6" 
        fill="${safeColor}"
      />
    `;
  }).join('')}
</svg>`;
}
