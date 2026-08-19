// ==========================================================================
// AHUJA INFRACORE — Product detail page interactions
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  if (window.gsap) {
    gsap.from('.page-hero .breadcrumb, .page-hero .eyebrow, .page-hero h1, .page-hero p, .page-hero .btn', {
      y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out'
    });
  }

  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.utils.toArray('.cat-detail').forEach((el) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });
    gsap.from('.spec-grid > div', {
      y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: '.spec-grid', start: 'top 85%' }
    });
  }
});
