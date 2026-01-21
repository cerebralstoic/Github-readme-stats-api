import { applyTheme } from '../shared/themes.js';
import { applyTextStyle } from '../shared/typography.js';
import { sanitizeValue, getSafeArray } from '../shared/sanitize.js';

/**
 * Renders an insight-style stats card - redesigned to match user's design
 * @param {Object} stats - User statistics
 * @param {Object} theme - Theme object with background and font colors
 * @returns {string} SVG markup
 */
export function renderStatsInsight(stats, theme) {
  const { 
    username, 
    stars, 
    commits, 
    pullRequests,
    issues,
    contributedTo
  } = stats;
  
  // Apply theme to base design
  const colors = applyTheme({
    background: '#0d1117',
    text: { primary: '#ffffff', secondary: '#8b949e' },
    card: { background: '#161b22', border: '#30363d' }
  }, theme);
  
  // Sanitize all values
  const safeUsername = sanitizeValue(username, 'User');
  const safeStars = sanitizeValue(stars, '0');
  const safeCommits = sanitizeValue(commits, '0');
  const safePullRequests = sanitizeValue(pullRequests, '0');
  const safeIssues = sanitizeValue(issues, '0');
  const safeContributedTo = sanitizeValue(contributedTo, '0');
  
  // Generate styles
  const titleStyle = applyTextStyle({ 
    type: 'title', 
    overrides: { 
      fontSize: '24px',
      color: colors.text.primary
    } 
  });
  
  const statLabelStyle = applyTextStyle({
    type: 'body',
    overrides: {
      fontSize: '14px',
      color: colors.text.secondary
    }
  });
  
  const statValueStyle = applyTextStyle({
    type: 'stat',
    overrides: {
      fontSize: '20px',
      color: colors.text.primary
    }
  });

  return `
<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200">
  <defs>
    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0366d6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="${colors.background}" rx="12"/>
  
  <!-- Title -->
  <text x="30" y="35" style="${titleStyle}">
    My GitHub Statistics
  </text>
  
  <!-- Stats with Icons -->
  <g transform="translate(30, 70)">
    <!-- Total Stars -->
    <g>
      <text x="0" y="0" style="${statLabelStyle}">Total Stars:</text>
      <text x="120" y="0" style="${statValueStyle}">${safeStars}</text>
    </g>
    
    <!-- Total Commits -->
    <g transform="translate(0, 30)">
      <text x="0" y="0" style="${statLabelStyle}">Total Commits:</text>
      <text x="120" y="0" style="${statValueStyle}">${safeCommits}</text>
    </g>
    
    <!-- Total PRs -->
    <g transform="translate(0, 60)">
      <text x="0" y="0" style="${statLabelStyle}">Total PRs:</text>
      <text x="120" y="0" style="${statValueStyle}">${safePullRequests}</text>
    </g>
    
    <!-- Total Issues -->
    <g transform="translate(0, 90)">
      <text x="0" y="0" style="${statLabelStyle}">Total Issues:</text>
      <text x="120" y="0" style="${statValueStyle}">${safeIssues}</text>
    </g>
    
    <!-- Contributed to -->
    <g transform="translate(0, 120)">
      <text x="0" y="0" style="${statLabelStyle}">Contributed to:</text>
      <text x="120" y="0" style="${statValueStyle}">${safeContributedTo}</text>
    </g>
  </g>
  
  <!-- Circular Progress -->
  <g transform="translate(650, 80)">
    <circle cx="40" cy="40" r="35" fill="none" stroke="${colors.card.border}" stroke-width="3"/>
    <circle cx="40" cy="40" r="35" fill="none" stroke="url(#progressGradient)" stroke-width="3" 
            stroke-dasharray="220" stroke-dashoffset="55" stroke-linecap="round" transform="rotate(-90 40 40)"/>
    <text x="40" y="45" text-anchor="middle" style="${statValueStyle}">A+</text>
  </g>
</svg>`;
}
