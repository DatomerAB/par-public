const PLATFORM_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LOCALE_ID = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const RELEASE_TAG = /^v\d+\.\d+\.\d+-beta(?:[.-][0-9.]+)?$/;

function validLabel(label) {
  if (typeof label === 'string') return Boolean(label.trim());
  if (!label || typeof label !== 'object' || Array.isArray(label)) return false;
  const labels = Object.entries(label);
  return labels.length > 0 && labels.every(([locale, value]) => LOCALE_ID.test(locale) && typeof value === 'string' && value.trim());
}

function localizedLabel(label, language) {
  if (typeof label === 'string') return label;
  return label?.[language] || label?.en || Object.values(label || {}).find((value) => typeof value === 'string') || '';
}

function humanizeIdentifier(identifier) {
  return identifier.split('-').filter(Boolean).map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(' ');
}

export function getPlatformPresentation(platformId, metadata) {
  const [system, ...variantParts] = platformId.split('-');
  return {
    os: localizedLabel(metadata?.os, 'en') || (system === 'macos' ? 'Mac' : humanizeIdentifier(system || platformId)),
    variant: localizedLabel(metadata?.variant, 'en') || humanizeIdentifier(variantParts.join('-')),
    order: Number.isFinite(metadata?.order) ? metadata.order : Number.MAX_SAFE_INTEGER,
    variantOrder: Number.isFinite(metadata?.variant_order) ? metadata.variant_order : Number.MAX_SAFE_INTEGER,
  };
}

export function groupDownloadPlatforms(catalog) {
  const groups = new Map();
  for (const [platform, entries] of Object.entries(catalog.platforms)) {
    const presentation = getPlatformPresentation(platform, catalog.platform_metadata?.[platform]);
    const group = groups.get(presentation.os) || { os: presentation.os, order: presentation.order, variants: [] };
    group.variants.push({ id: platform, label: presentation.variant, order: presentation.variantOrder, entries });
    groups.set(presentation.os, group);
  }
  return [...groups.values()]
    .map((group) => ({
      ...group,
      variants: group.variants.sort((left, right) => left.order - right.order || left.label.localeCompare(right.label)),
    }))
    .sort((left, right) => left.order - right.order || left.os.localeCompare(right.os));
}

export function mergeCatalogMetadata(catalog, fallback) {
  const platformMetadata = Object.fromEntries(
    Object.keys(catalog.platforms).flatMap((platform) => {
      const presentation = catalog.platform_metadata?.[platform] || fallback?.platform_metadata?.[platform];
      return presentation ? [[platform, presentation]] : [];
    }),
  );
  return { ...catalog, platform_metadata: platformMetadata };
}

export function validDownloadCatalog(catalog) {
  if (catalog?.schema_version !== 1 || !catalog.platforms || typeof catalog.platforms !== 'object') return false;
  const platforms = Object.entries(catalog.platforms);
  const metadata = catalog.platform_metadata ?? {};
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) return false;
  const validPlatforms = platforms.length > 0 && platforms.every(([platform, entries]) => (
    PLATFORM_ID.test(platform) && Array.isArray(entries) && entries.length > 0 && entries.every((entry) => {
      try {
        if (!entry || typeof entry.name !== 'string' || !entry.name.trim() || /[\\/]/.test(entry.name)) return false;
        const url = new URL(entry.url);
        return RELEASE_TAG.test(entry.tag) && url.origin === 'https://github.com' &&
          decodeURIComponent(url.pathname) === `/DatomerAB/par-releases/releases/download/${entry.tag}/${entry.name}` &&
          !url.search && !url.hash && !url.username && !url.password;
      } catch {
        return false;
      }
    })
  ));
  return validPlatforms && Object.entries(metadata).every(([platform, presentation]) => (
    Boolean(catalog.platforms[platform]) &&
    validLabel(presentation?.os) &&
    validLabel(presentation?.variant) &&
    (presentation.order === undefined || Number.isFinite(presentation.order)) &&
    (presentation.variant_order === undefined || Number.isFinite(presentation.variant_order))
  ));
}

(() => {
  'use strict';
  if (typeof document === 'undefined') return;

  // Cache-busted per release so GitHub Pages CDN serves the fresh config.json
  // immediately after a new version is published. The query string is rewritten
  // in place by the update-download-url workflow on every release.
  const CONFIG_PATH = 'assets/landing/config.json?9316741e4645f6952801e3092a9c011ebc4e81f226c3b58f0571342167d4234c';

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
        if (validDownloadCatalog(live)) catalog = mergeCatalogMetadata(live, config.downloadCatalog);
      } catch (err) {
        console.warn('Keeping deployed beta downloads:', err);
      }
    }

    const downloadUrl = config.downloadUrl?.trim() || '';
    const options = document.getElementById('betaDownloadOptions');
    if (options && validDownloadCatalog(catalog)) {
      options.replaceChildren();
      for (const group of groupDownloadPlatforms(catalog)) {
        const section = document.createElement('section');
        section.className = 'beta-download-platform';
        const headingGroup = document.createElement('div');
        headingGroup.className = 'beta-download-platform-heading';
        const heading = document.createElement('h3');
        heading.textContent = group.os;
        headingGroup.appendChild(heading);
        const entriesList = document.createElement('div');
        entriesList.className = 'beta-download-versions';
        const renderEntries = (variant) => {
          entriesList.replaceChildren();
          for (const entry of variant.entries) {
            const row = document.createElement('div');
            row.className = 'beta-download-version';
            const version = document.createElement('div');
            const title = document.createElement('strong');
            title.textContent = entry.tag.slice(1);
            const status = document.createElement('span');
            status.textContent = entry.tag === variant.entries[0].tag ? 'Latest' : 'Previous';
            version.append(title, status);
            const link = document.createElement('a');
            link.className = 'btn btn-secondary';
            link.href = entry.url;
            link.textContent = `Download ${entry.name.split('.').at(-1)?.toUpperCase() || ''}`.trim();
            row.append(version, link);
            entriesList.appendChild(row);
          }
        };
        const initialVariant = group.variants[0];
        if (group.variants.length > 1) {
          const label = document.createElement('label');
          label.className = 'beta-download-variant-control';
          label.append(document.createTextNode('Variant '));
          const select = document.createElement('select');
          select.setAttribute('aria-label', `Variant for ${group.os}`);
          for (const variant of group.variants) {
            const option = document.createElement('option');
            option.value = variant.id;
            option.textContent = variant.label;
            select.appendChild(option);
          }
          select.addEventListener('change', () => {
            const selected = group.variants.find((variant) => variant.id === select.value);
            if (selected) renderEntries(selected);
          });
          label.appendChild(select);
          headingGroup.appendChild(label);
        } else {
          const variantLabel = document.createElement('span');
          variantLabel.className = 'beta-download-variant-label';
          variantLabel.textContent = initialVariant.label;
          headingGroup.appendChild(variantLabel);
        }
        section.append(headingGroup, entriesList);
        renderEntries(initialVariant);
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
