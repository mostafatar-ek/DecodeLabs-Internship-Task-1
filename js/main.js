/* =============================================================
   DecodeLabs — Project 1: JavaScript Logic Layer
   State management, interactivity, accessibility
   ============================================================= */

(function () {
  'use strict';

  // ── 1. MOBILE NAV TOGGLE ──────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on nav link click (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ── 2. ACTIVE NAV LINK (scroll spy) ──────────────────────────
  const sections  = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === `#${current}`) {
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // ── 3. PROJECT CARD FILTER ────────────────────────────────────
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter cards with a staggered reveal
      let delay = 0;
      projectCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('is-hidden');
          card.style.animationDelay = `${delay}ms`;
          delay += 60;
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ── 4. SCROLL-REVEAL ANIMATION ────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!prefersReducedMotion.matches) {
    const animTargets = document.querySelectorAll(
      '.roadmap-step, .feature-card, .project-card'
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger children in same parent
            const siblings = [...entry.target.parentElement.children];
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 80}ms`;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animTargets.forEach(el => revealObserver.observe(el));
  }

  // ── 5. STICKY HEADER SHADOW ───────────────────────────────────
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 16px rgba(44, 40, 38, 0.1)'
        : '';
    }, { passive: true });
  }

  // ── 6. SMOOTH ANCHOR SCROLL WITH OFFSET ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '64',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      // Move focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  });

})();
