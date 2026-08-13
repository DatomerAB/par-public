(() => {
  'use strict';

  const CONFIG_PATH = 'assets/landing/config.json';

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

    const downloadUrl = config.downloadUrl?.trim() || '';

    const downloadSelectors = ['#downloadBtn', '#heroDownloadBtn', '#navDownloadBtn'];
    downloadSelectors.forEach((selector) => {
      const btn = document.querySelector(selector);
      if (!btn) return;

      if (downloadUrl) {
        btn.setAttribute('href', downloadUrl);
      } else {
        // No release yet: scroll to the inline waitlist form
        btn.setAttribute('href', '#download');
      }
    });
  }

  configureActions();
})();
