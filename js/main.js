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
