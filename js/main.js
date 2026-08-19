// ==========================================================================
// AHUJA INFRACORE — Shared behavior (navbar, mobile menu, footer counters)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');
  const closeBtn = document.querySelector('.mobile-panel .close-btn');
  const openMenu = () => {
    mobilePanel.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (!reduceMotion && window.gsap) {
      gsap.fromTo('.mobile-panel a', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, delay: 0.15, ease: 'power3.out' });
    }
  };
  const closeMenu = () => {
    mobilePanel.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', openMenu);
    menuToggle.setAttribute('aria-expanded', 'false');
    closeBtn && closeBtn.addEventListener('click', closeMenu);
    mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------- Footer stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion || !window.gsap) { el.textContent = target + suffix; return; }
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
    });
  };
  if ('IntersectionObserver' in window && counters.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCount(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- Generic reveal-on-scroll for stub pages ---------- */
  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.utils.toArray('.reveal-up').forEach((el) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }
});
