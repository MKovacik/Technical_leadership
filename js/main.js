/**
 * Technical Leadership Page - Interactive Elements
 * Handles scroll reveal animations and drill-down decision trees
 */

// =========================================
// Scroll Reveal Animation
// =========================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { 
  threshold: 0.1, 
  rootMargin: '0px 0px -50px 0px' 
});

// Observe all elements with reveal class
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// =========================================
// Drill-down Decision Tree Toggle
// =========================================

/**
 * Toggles the visibility of drill-down levels in interactive decision trees
 * @param {string} levelId - The ID of the drill-down level to toggle
 */
function toggleDrilldown(levelId) {
  const level = document.getElementById(levelId);

  if (level.classList.contains('open')) {
    // Collapse the level
    level.classList.remove('open');
    level.querySelectorAll('.drilldown-level').forEach(nested => nested.classList.remove('open'));
    level.querySelectorAll('.drilldown-trigger').forEach(t => t.classList.remove('expanded'));
    
    // Update trigger button state
    document.querySelectorAll('.drilldown-trigger').forEach(t => {
      if (t.getAttribute('onclick') && t.getAttribute('onclick').includes(levelId)) {
        t.classList.remove('expanded');
      }
    });
  } else {
    // Expand the level
    level.classList.add('open');
    
    // Mark trigger as expanded
    document.querySelectorAll('.drilldown-trigger').forEach(t => {
      if (t.getAttribute('onclick') && t.getAttribute('onclick').includes(levelId)) {
        t.classList.add('expanded');
      }
    });
    
    // Smooth scroll to the expanded content
    setTimeout(() => {
      level.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

// =========================================
// Progressive Disclosure — Insight Cards
// =========================================

document.addEventListener('click', (e) => {
  const card = e.target.closest('.insight-card[data-expandable]');
  if (!card) return;
  // Don't intercept clicks on links inside cards
  if (e.target.closest('a')) return;

  const expanded = card.getAttribute('aria-expanded') === 'true';
  card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.insight-card[data-expandable]');
  if (!card) return;
  if (e.target.closest('a')) return;
  e.preventDefault();

  const expanded = card.getAttribute('aria-expanded') === 'true';
  card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
});

// =========================================
// Sticky Section Navigation + Back-to-Top
// =========================================

(() => {
  const hero = document.getElementById('hero');
  const sectionNav = document.querySelector('.section-nav');
  const backToTop = document.querySelector('.back-to-top');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sections = document.querySelectorAll('section[id^="section-"]');
  const hamburger = document.querySelector('.nav-hamburger');
  const navList = document.querySelector('.nav-list');

  // Show/hide nav and back-to-top when hero leaves viewport
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const pastHero = !entry.isIntersecting;
      if (sectionNav) sectionNav.classList.toggle('visible', pastHero);
      if (backToTop) backToTop.classList.toggle('visible', pastHero);
    });
  }, { threshold: 0 });

  if (hero) heroObserver.observe(hero);

  // Highlight active section link
  // rootMargin creates a 1px trigger line 15% below the viewport top.
  // threshold: 0 fires as soon as any part of the section crosses that line.
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0, rootMargin: '-15% 0px -84% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // Nav link click — smooth scroll + close mobile menu
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu
      if (navList) navList.classList.remove('open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Mobile hamburger toggle
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!sectionNav.contains(e.target)) {
        navList.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Back-to-top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
