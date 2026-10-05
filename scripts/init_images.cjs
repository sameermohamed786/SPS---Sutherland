const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const createSvg = (title, subtitle, note, color) => `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <rect width="100%" height="100%" fill="#060810"/>
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#060810" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="960" cy="540" r="450" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="10 15" opacity="0.4"/>
  <text x="960" y="460" fill="#FFFFFF" font-family="sans-serif" font-size="64" font-weight="900" text-anchor="middle" letter-spacing="10">${title}</text>
  <text x="960" y="540" fill="${color}" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle" letter-spacing="4">${subtitle}</text>
  <rect x="610" y="600" width="700" height="60" rx="30" fill="none" stroke="${color}" stroke-width="2" opacity="0.8"/>
  <text x="960" y="638" fill="#E2E8F0" font-family="sans-serif" font-size="18" text-anchor="middle" letter-spacing="2">${note}</text>
</svg>`;

fs.writeFileSync(path.join(dir, 'building.jpg'), createSvg('SUTHERLAND FACILITY', 'CHENNAI 2026', 'DROP YOUR REAL building.jpg HERE', '#0066FF'));
fs.writeFileSync(path.join(dir, 'logo.jpg'), createSvg('SUTHERLAND', 'SELLER PARTNER SUPPORT', 'DROP YOUR REAL logo.jpg HERE', '#00F0FF'));
fs.writeFileSync(path.join(dir, 'group.jpg'), createSvg('SPS BATCH OF 2026', 'STARTED AS A BATCH. BECAME A TEAM.', 'DROP YOUR REAL group.jpg HERE', '#38BDF8'));

console.log('Successfully created initial image slots in public/assets/images/');
