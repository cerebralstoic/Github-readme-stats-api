import { applyTheme } from '../shared/themes.js';
import { applyTextStyle } from '../shared/typography.js';
import { sanitizeValue, getSafeArray } from '../shared/sanitize.js';

/**
 * Renders a dark-themed stats card - enhanced design with theme support
 * @param {Object} stats - User statistics
 * @param {Object} theme - Theme object with background and font colors
 * @returns {string} SVG markup
 */
export function renderStatsDark(stats, theme) {
  const { username, repoCount, stars, forks, followers, commits, contributions } = stats;
  
  // Sanitize all values
  const safeUsername = sanitizeValue(username, 'User');
  const safeRepoCount = sanitizeValue(repoCount, '0');
  const safeStars = sanitizeValue(stars, '0');
  const safeForks = sanitizeValue(forks, '0');
  const safeFollowers = sanitizeValue(followers, '0');
  const safeCommits = sanitizeValue(commits, '0');
  const safeContributions = sanitizeValue(contributions, '0');
  
  // Process top languages
  const languages = getSafeArray(stats.topLanguages, []).slice(0, 3);
  const langText = languages.length > 0 
    ? languages.map(lang => sanitizeValue(lang.name, 'N/A')).join(', ')
    : 'N/A';
  
  // Apply theme to base design
  const colors = applyTheme({
    background: '#000000',
    text: { primary: '#ffffff', secondary: '#888888' },
    card: { background: '#1a1a1a', border: '#333333' }
  }, theme);
  const titleStyle = applyTextStyle({ 
    type: 'title', 
    overrides: { 
      fontSize: '28px',
      letterSpacing: '-0.5px',
      lineHeight: '1.2'
    } 
  });
  
  const subtitleStyle = applyTextStyle({ 
    type: 'subtitle',
    overrides: { 
      fontSize: '13px',
      textTransform: 'none',
      letterSpacing: '0.3px'
    } 
  });
  
  const statStyle = applyTextStyle({ 
    type: 'stat',
    overrides: { 
      fontSize: '36px',
      letterSpacing: '-1px'
    } 
  });
  
  const smallStatStyle = applyTextStyle({ 
    type: 'stat',
    overrides: { 
      fontSize: '30px',
      letterSpacing: '-0.8px'
    } 
  });
  
  const languageStyle = applyTextStyle({ 
    type: 'body',
    overrides: { 
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '0.2px'
    } 
  });
  
  return `
<svg width="750" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 300">
  <defs>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#4ecdc4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#45b7d1;stop-opacity:1" />
    </linearGradient>
    <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="${colors.background}"/>

  <text x="30" y="50" style="${titleStyle}; fill: ${colors.text.primary}; filter: url(#textGlow);">
    ${safeUsername}
  </text>

  <line x1="30" y1="65" x2="320" y2="65" stroke="url(#accentGradient)" stroke-width="3" stroke-linecap="round"/>

  <g>
    <!-- First row -->
    <text x="30" y="105" style="${subtitleStyle}; fill: ${colors.text.secondary};">Repositories</text>
    <text x="30" y="140" style="${statStyle}; fill: ${colors.text.primary};">${safeRepoCount}</text>

    <text x="220" y="105" style="${subtitleStyle}; fill: ${colors.text.secondary};">Stars</text>
    <text x="220" y="140" style="${statStyle}; fill: ${colors.text.primary};">${safeStars}</text>

    <text x="410" y="105" style="${subtitleStyle}; fill: ${colors.text.secondary};">Forks</text>
    <text x="410" y="140" style="${statStyle}; fill: ${colors.text.primary};">${safeForks}</text>

    <text x="600" y="105" style="${subtitleStyle}; fill: ${colors.text.secondary};">Followers</text>
    <text x="600" y="140" style="${statStyle}; fill: ${colors.text.primary};">${safeFollowers}</text>
  </g>

  <line x1="30" y1="170" x2="720" y2="170" stroke="#333333" stroke-width="1" opacity="0.5"/>

  <g>
    <!-- Second row -->
    <text x="30" y="210" style="${subtitleStyle}; fill: ${colors.text.secondary};">Commits</text>
    <text x="30" y="245" style="${smallStatStyle}; fill: ${colors.text.primary};">${safeCommits}</text>

    <text x="280" y="210" style="${subtitleStyle}; fill: ${colors.text.secondary};">Contributions</text>
    <text x="280" y="245" style="${smallStatStyle}; fill: ${colors.text.primary};">${safeContributions}</text>

    <text x="530" y="210" style="${subtitleStyle}; fill: ${colors.text.secondary};">Languages</text>
    <text x="530" y="235" style="${languageStyle}; fill: ${colors.text.primary};">${langText}</text>
  </g>

  <!-- Decorative corner elements -->
  <circle cx="720" cy="30" r="2" fill="#ff6b6b" opacity="0.8"/>
  <circle cx="735" cy="45" r="1.5" fill="#4ecdc4" opacity="0.8"/>
  <circle cx="725" cy="55" r="1" fill="#45b7d1" opacity="0.8"/>
</svg>`;
}
