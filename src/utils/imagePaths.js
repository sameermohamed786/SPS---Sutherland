// Centralized image paths & fallback management for SPS '26
// Rules: Preserve real photographs 100%, no AI face changes, dynamic drop-in supported!

export const DEFAULT_IMAGES = {
  building: '/assets/images/building.jpg',
  logo: '/assets/images/logo.jpg',
  group: '/assets/images/group.jpg'
};

// Procedural visual fallbacks when local images are not yet placed in public directory
export const FALLBACK_ARTWORKS = {
  building: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="100%" height="100%" fill="%23060a14"/><g opacity="0.15"><rect x="300" y="200" width="1320" height="700" fill="none" stroke="%230066FF" stroke-width="4"/><line x1="300" y1="400" x2="1620" y2="400" stroke="%2300F0FF" stroke-width="2"/><line x1="300" y1="600" x2="1620" y2="600" stroke="%2300F0FF" stroke-width="2"/><line x1="700" y1="200" x2="700" y2="900" stroke="%230066FF" stroke-width="2"/><line x1="1200" y1="200" x2="1200" y2="900" stroke="%230066FF" stroke-width="2"/></g><text x="960" y="500" fill="%23FFFFFF" font-family="sans-serif" font-size="42" font-weight="bold" text-anchor="middle" letter-spacing="4">SUTHERLAND CHENNAI FACILITY</text><text x="960" y="560" fill="%2300F0FF" font-family="sans-serif" font-size="20" text-anchor="middle" letter-spacing="2">[ UPLOAD REAL building.jpg TO /public/assets/images/ ]</text></svg>',
  
  logo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="100%" height="100%" fill="%2303050a"/><circle cx="960" cy="540" r="350" fill="none" stroke="%230066FF" stroke-width="3" opacity="0.3"/><text x="960" y="520" fill="%23FFFFFF" font-family="sans-serif" font-size="72" font-weight="900" text-anchor="middle" letter-spacing="12">SUTHERLAND</text><text x="960" y="600" fill="%2300F0FF" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle" letter-spacing="6">SELLER PARTNER SUPPORT</text><text x="960" y="660" fill="%238899A6" font-family="sans-serif" font-size="18" text-anchor="middle" letter-spacing="2">[ UPLOAD REAL logo.jpg TO /public/assets/images/ ]</text></svg>',
  
  group: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="100%" height="100%" fill="%2304060d"/><g opacity="0.25"><line x1="0" y1="540" x2="1920" y2="540" stroke="%2300F0FF" stroke-width="2"/><circle cx="960" cy="540" r="400" fill="none" stroke="%230066FF" stroke-width="2"/></g><text x="960" y="480" fill="%23FFFFFF" font-family="sans-serif" font-size="64" font-weight="900" text-anchor="middle" letter-spacing="8">SPS BATCH OF 2026</text><text x="960" y="550" fill="%2300F0FF" font-family="sans-serif" font-size="32" font-weight="bold" text-anchor="middle" letter-spacing="4">"STARTED AS A BATCH. BECAME A TEAM."</text><text x="960" y="620" fill="%238899A6" font-family="sans-serif" font-size="20" text-anchor="middle" letter-spacing="2">[ UPLOAD REAL group.jpg TO /public/assets/images/ ]</text></svg>'
};

export function getStoredImage(key) {
  try {
    const custom = localStorage.getItem(`sps_custom_image_${key}`);
    if (custom) return custom;
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return DEFAULT_IMAGES[key] || FALLBACK_ARTWORKS[key];
}

export function saveStoredImage(key, dataUrl) {
  try {
    localStorage.setItem(`sps_custom_image_${key}`, dataUrl);
  } catch (e) {
    console.error('Failed to save image locally:', e);
  }
}

export function resetStoredImage(key) {
  try {
    localStorage.removeItem(`sps_custom_image_${key}`);
  } catch (e) {
    console.error('Failed to reset image:', e);
  }
}
