// ==========================================================================
// AHUJA INFRACORE — About Us Page Interactions
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- About Hero Load Animation (full-bg) ---------- */
  if (window.gsap) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.about-hero-bg img', { scale: 1.08, opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)
      .from('.navbar .logo', { y: -20, opacity: 0, duration: 0.6 }, 0.3)
      .from('.navbar .nav-links a', { y: -14, opacity: 0, stagger: 0.05, duration: 0.5 }, 0.45)
      .from('.navbar .nav-actions > *', { opacity: 0, duration: 0.5 }, 0.6)
      .from('.about-hero-content .breadcrumb', { opacity: 0, x: -14, duration: 0.5 }, 0.8)
      .from('.about-hero-content h1', { y: 30, opacity: 0, duration: 0.9 }, 0.95)
      .from('.about-hero-content p', { y: 20, opacity: 0, duration: 0.7 }, 1.25)
      .from('.about-hero-content .btn', { y: 20, opacity: 0, duration: 0.7 }, 1.4);
  }

  /* ---------- GSAP Card Flips for Capabilities ---------- */
  if (window.gsap && !reduceMotion) {
    const flipCards = gsap.utils.toArray('.capability-card');
    flipCards.forEach(card => {
      const inner = card.querySelector('.flip-card-inner');
      const img = card.querySelector('.flip-card-back-bg');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(inner, { rotateY: 180, duration: 0.6, ease: 'power2.out' });
        if (img) gsap.to(img, { scale: 1.1, duration: 0.8, ease: 'power1.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(inner, { rotateY: 0, duration: 0.6, ease: 'power2.out' });
        if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: 'power1.out' });
      });
      
      // Accessibility focus flips
      card.addEventListener('focusin', () => {
        gsap.to(inner, { rotateY: 180, duration: 0.6, ease: 'power2.out' });
      });
      card.addEventListener('focusout', () => {
        gsap.to(inner, { rotateY: 0, duration: 0.6, ease: 'power2.out' });
      });
    });
  }

  /* ---------- GSAP ScrollTrigger Reveals & Parallax ---------- */
  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    // Process section trigger
    gsap.from('.process-section .section-head > *', {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.process-section', start: 'top 75%' }
    });
    gsap.from('.process-step', {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.process-grid', start: 'top 82%' }
    });

    // Leadership triggers
    gsap.from('.leadership-intro > *', {
      x: -30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.leadership-grid', start: 'top 75%' }
    });
    gsap.from('.member-card', {
      y: 30, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.leadership-cards', start: 'top 80%' }
    });

    // Capabilities trigger
    gsap.from('.capabilities-header', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.capabilities-section', start: 'top 75%' }
    });
    gsap.from('.capability-card', {
      y: 40, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.capabilities-grid', start: 'top 80%' }
    });

    // Footer triggers
    gsap.from('.footer-cols > *', {
      y: 24, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: 'footer', start: 'top 85%' }
    });

    // Parallax on hero bg image
    gsap.to('.about-hero-bg img', {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }
});
