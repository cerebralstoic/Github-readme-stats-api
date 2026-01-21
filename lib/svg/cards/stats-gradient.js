import { applyTheme } from '../shared/themes.js';
import { applyTextStyle } from '../shared/typography.js';
import { sanitizeValue, getSafeArray } from '../shared/sanitize.js';

/**
 * Renders a gradient-styled stats card - enhanced design with theme support
 * @param {Object} stats - User statistics
 * @param {Object} theme - Theme object with background and font colors
 * @returns {string} SVG markup
 */
export function renderStatsGradient(stats, theme) {
  const { username, repoCount, stars, forks, followers, commits, contributions } = stats;
  
  // Apply theme to base design
  const colors = applyTheme({
    background: '#0d1117',
    text: { primary: '#ffffff', secondary: '#94a3b8' },
    card: { background: '#1e293b', border: '#334155' }
  }, theme);
  
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
  
  // Generate styles
  const titleStyle = applyTextStyle({ type: 'title', overrides: { fontSize: '24px', letterSpacing: '-0.8px' } });
  const labelStyle = applyTextStyle({ type: 'label', overrides: { fontSize: '11px' } });
  const statStyleLarge = applyTextStyle({ type: 'stat', overrides: { fontSize: '32px' } });
  const statStyleMedium = applyTextStyle({ type: 'stat', overrides: { fontSize: '28px' } });
  const languageStyle = applyTextStyle({ type: 'language', overrides: { fontSize: '12px' } });
  
  return `
<svg width="650" height="320" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 320">
  <defs>
    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1f36;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0d1117;stop-opacity:1" />
    </linearGradient>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-opacity="0.25"/>
    </filter>
    <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="100%" height="100%" rx="16" fill="${colors.background}"/>
  <rect width="100%" height="4" rx="2" fill="url(#mainGradient)"/>

  <text x="30" y="45" style="${titleStyle}; fill: ${colors.text.primary}; filter: url(#glowEffect);">
    ${safeUsername}'s GitHub Stats
  </text>

  <!-- Top Row Stats -->
  <g filter="url(#cardShadow)">
    <!-- Repositories -->
    <g transform="translate(30, 70)">
      <rect width="140" height="85" rx="12" fill="${colors.card.background}" stroke="${colors.card.border}" stroke-width="1" opacity="0.9"/>
      <text x="15" y="25" style="${labelStyle}; fill: ${colors.text.secondary};">Repositories</text>
      <text x="15" y="60" style="${statStyleLarge}; fill: #60a5fa;">${safeRepoCount}</text>
    </g>

    <!-- Stars -->
    <g transform="translate(185, 70)">
      <rect width="140" height="85" rx="12" fill="${colors.card.background}" stroke="${colors.card.border}" stroke-width="1" opacity="0.9"/>
      <text x="15" y="25" style="${labelStyle}; fill: ${colors.text.secondary};">Total Stars</text>
      <text x="15" y="60" style="${statStyleLarge}; fill: #fbbf24;">${safeStars}</text>
    </g>

    <!-- Forks -->
    <g transform="translate(340, 70)">
      <rect width="140" height="85" rx="12" fill="${colors.card.background}" stroke="${colors.card.border}" stroke-width="1" opacity="0.9"/>
      <text x="15" y="25" style="${labelStyle}; fill: ${colors.text.secondary};">Forks</text>
      <text x="15" y="60" style="${statStyleLarge}; fill: #34d399;">${safeForks}</text>
    </g>

    <!-- Followers -->
    <g transform="translate(495, 70)">
      <rect width="125" height="85" rx="12" fill="${colors.card.background}" stroke="${colors.card.border}" stroke-width="1" opacity="0.9"/>
      <text x="15" y="25" style="${labelStyle}; fill: ${colors.text.secondary};">Followers</text>
      <text x="15" y="60" style="${statStyleLarge}; fill: #f472b6;">${safeFollowers}</text>
    </g>
  </g>

  <!-- Bottom Row Stats -->
  <g filter="url(#cardShadow)">
    <!-- Commits -->
    <g transform="translate(30, 175)">
      <rect width="200" height="75" rx="12" fill="${colors.card.background}" stroke="${colors.card.border}" stroke-width="1" opacity="0.9"/>
      <text x="15" y="25" style="${labelStyle}; fill: ${colors.text.secondary};">Commits</text>
      <text x="15" y="55" style="${statStyleMedium}; fill: #7ee787;">${safeCommits}</text>
    </g>

    <!-- Contributions -->
    <g transform="translate(245, 175)">
      <rect width="200" height="75" rx="12" fill="${colors.card.background}" stroke="${colors.card.border}" stroke-width="1" opacity="0.9"/>
      <text x="15" y="25" style="${labelStyle}; fill: ${colors.text.secondary};">Contributions</text>
      <text x="15" y="55" style="${statStyleMedium}; fill: #f97316;">${safeContributions}</text>
    </g>

    <!-- Top Languages -->
    <g transform="translate(460, 175)">
      <rect width="160" height="75" rx="12" fill="${colors.card.background}" stroke="${colors.card.border}" stroke-width="1" opacity="0.9"/>
      <text x="15" y="25" style="${labelStyle}; fill: ${colors.text.secondary};">Top Languages</text>
      <text x="15" y="45" style="${languageStyle}; fill: ${colors.text.primary};">${langText}</text>
    </g>
  </g>

  <!-- Decorative elements -->
  <circle cx="600" cy="50" r="3" fill="#60a5fa" opacity="0.6"/>
  <circle cx="615" cy="65" r="2" fill="#f472b6" opacity="0.6"/>
  <circle cx="590" cy="70" r="2.5" fill="#34d399" opacity="0.6"/>
</svg>`;
}
