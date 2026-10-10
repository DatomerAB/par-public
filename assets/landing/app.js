const PLATFORM_DOWNLOADS = {
  'macos-arm64': ['macOS · Apple Silicon', /_aarch64\.dmg$/],
  'windows-x64-cpu': ['Windows · x64 CPU', /-cpu\.(exe|msi)$/],
  'windows-x64-gpu': ['Windows · x64 GPU', /-gpu\.(exe|msi)$/],
  'linux-x64-cpu': ['Linux · x64 CPU', /\.AppImage$/],
};

export function validDownloadCatalog(catalog) {
  if (catalog?.schema_version !== 1 || !catalog.platforms || typeof catalog.platforms !== 'object') return false;
  const platforms = Object.entries(catalog.platforms);
  return platforms.length > 0 && platforms.every(([platform, entries]) => (
    PLATFORM_DOWNLOADS[platform] && Array.isArray(entries) && entries.length > 0 && entries.every((entry) => {
      try {
        const url = new URL(entry.url);
        return /^v\d+\.\d+\.\d+-beta(?:[.-][0-9.]+)?$/.test(entry.tag) &&
          PLATFORM_DOWNLOADS[platform][1].test(entry.name) && url.origin === 'https://github.com' &&
          decodeURIComponent(url.pathname) === `/DatomerAB/par-releases/releases/download/${entry.tag}/${entry.name}` &&
          !url.search && !url.hash && !url.username && !url.password;
      } catch {
        return false;
      }
    })
  ));
}

(() => {
  'use strict';
  if (typeof document === 'undefined') return;

  // Cache-busted per release so GitHub Pages CDN serves the fresh config.json
  // immediately after a new version is published. The query string is rewritten
  // in place by the update-download-url workflow on every release.
  const CONFIG_PATH = 'assets/landing/config.json?v0.1.9-beta.2026100804';

  // Mobile nav toggle
  const toggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = !mobileNav.hidden;
      mobileNav.hidden = isOpen;
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Close mobile nav on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 860 && mobileNav && !mobileNav.hidden) {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Configure download buttons from config.json
  async function configureActions() {
    let config = {};
    try {
      const response = await fetch(CONFIG_PATH, { cache: 'no-store' });
      if (response.ok) {
        config = await response.json();
      }
    } catch (err) {
      console.warn('Failed to load landing page config:', err);
    }

    let catalog = config.downloadCatalog;
    if (config.downloadCatalogUrl === 'https://raw.githubusercontent.com/DatomerAB/par-releases/main/downloads.json') {
      try {
        const revision = catalog?.revision || 'initial';
        const response = await fetch(`${config.downloadCatalogUrl}?revision=${encodeURIComponent(revision)}`, { cache: 'no-store' });
        const live = response.ok ? await response.json() : null;
        if (validDownloadCatalog(live)) catalog = live;
      } catch (err) {
        console.warn('Keeping deployed beta downloads:', err);
      }
    }

    const downloadUrl = config.downloadUrl?.trim() || '';
    const options = document.getElementById('betaDownloadOptions');
    if (options && validDownloadCatalog(catalog)) {
      options.replaceChildren();
      for (const [platform, [label]] of Object.entries(PLATFORM_DOWNLOADS)) {
        const entries = catalog.platforms[platform];
        if (!entries) continue;
        const section = document.createElement('section');
        section.className = 'beta-download-platform';
        const heading = document.createElement('h3');
        heading.textContent = label;
        section.appendChild(heading);
        for (const entry of entries) {
          const row = document.createElement('div');
          row.className = 'beta-download-version';
          const version = document.createElement('div');
          const title = document.createElement('strong');
          title.textContent = entry.tag.slice(1);
          const status = document.createElement('span');
          status.textContent = entry.tag === entries[0].tag ? 'Latest' : 'Previous';
          version.append(title, status);
          const link = document.createElement('a');
          link.className = 'btn btn-secondary';
          link.href = entry.url;
          link.textContent = `Download ${entry.name.split('.').at(-1).toUpperCase()}`;
          row.append(version, link);
          section.appendChild(row);
        }
        options.appendChild(section);
      }
      const legacyButton = document.getElementById('downloadBtn');
      if (legacyButton) legacyButton.hidden = true;
    }

    const downloadSelectors = ['#downloadBtn', '#heroDownloadBtn', '#navDownloadBtn'];
    downloadSelectors.forEach((selector) => {
      const btn = document.querySelector(selector);
      if (!btn) return;

      if (selector !== '#downloadBtn') {
        btn.setAttribute('href', '#download');
      } else if (downloadUrl) {
        btn.setAttribute('href', downloadUrl);
      } else {
        // No release yet: scroll to the inline waitlist form
        btn.setAttribute('href', '#download');
      }
    });
  }

  configureActions();
})();
