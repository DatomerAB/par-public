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

  // Configure download/waitlist links from config.json
  async function configureActions() {
    let config = {};
    try {
      const response = await fetch(CONFIG_PATH, { cache: 'no-store' });
      if (response.ok) {
        config = await response.json();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load landing page config:', err);
    }

    const downloadUrl = config.downloadUrl?.trim() || '';
    const waitlistUrl = config.waitlistUrl?.trim() || '';
    const effectiveUrl = downloadUrl || waitlistUrl || '#';

    const downloadSelectors = ['#downloadBtn', '#heroDownloadBtn', '#navDownloadBtn'];
    downloadSelectors.forEach((selector) => {
      const btn = document.querySelector(selector);
      if (!btn) return;

      btn.setAttribute('href', effectiveUrl);

      if (!downloadUrl && waitlistUrl) {
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener');
        btn.textContent = btn.textContent.replace('Download for Mac', 'Join the waitlist');
      }
    });

    const waitlistBtn = document.getElementById('waitlistBtn');
    if (waitlistBtn && waitlistUrl) {
      waitlistBtn.setAttribute('href', waitlistUrl);
    }
  }

  configureActions();
})();
