// ==========================================================================
// AHUJA INFRACORE — Home page interactions
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Hero load sequence (full-bg) ---------- */
    /* ---------- Hero load sequence (full-bg) — homepage only ---------- */
  if (window.gsap && document.querySelector('.hero-bg')) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    // Fade in the hero background image with a subtle Ken Burns zoom
    tl.from('.hero-bg img', { scale: 1.08, opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)
      .from('.navbar .logo', { y: -20, opacity: 0, duration: 0.6 }, 0.3)
      .from('.navbar .nav-links a', { y: -14, opacity: 0, stagger: 0.05, duration: 0.5 }, 0.45)
      .from('.navbar .nav-actions > *', { opacity: 0, duration: 0.5 }, 0.6)
      .from('.hero-indicator', { opacity: 0, x: -18, duration: 0.6 }, 0.8)
      .from('.hero-content h1 .line span', { yPercent: 110, duration: 0.9, stagger: 0.12 }, 0.9)
      .from('.hero-content p', { y: 20, opacity: 0, duration: 0.7 }, 1.3)
      .from('.hero-content .btn', { y: 20, opacity: 0, duration: 0.7 }, 1.45);
  }

  /* ---------- Product category hover expansion ---------- */
  const catRow = document.querySelector('.cat-row');
  const catCards = document.querySelectorAll('.cat-card');
  if (catCards.length) {
    let isTransitioning = false;
    const TRANSITION_MS = 650; // matches "transition: flex 0.65s" above

    const reset = () => {
      if (isTransitioning) return;
      catCards.forEach(c => c.classList.remove('active'));
      if (catCards[0]) catCards[0].classList.add('active');
    };

    catCards.forEach(card => {
      const activate = () => {
        if (isTransitioning || card.classList.contains('active')) return;
        isTransitioning = true;
        catCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        setTimeout(() => { isTransitioning = false; }, TRANSITION_MS);
      };
      card.addEventListener('mouseenter', activate);
      card.addEventListener('focus', activate);
      card.addEventListener('touchstart', activate, { passive: true });
    });

    if (catRow) {
      catRow.addEventListener('mouseleave', reset);
      catRow.addEventListener('focusout', (e) => {
        if (!catRow.contains(e.relatedTarget)) reset();
      });
    }
  }

  /* ---------- Story thumbnail selector & Automated Carousel ---------- */
  const thumbs = document.querySelectorAll('.thumb-rail button');
  const storyImg = document.getElementById('story-carousel-img');
  let carouselIndex = 0;
  let carouselInterval;

  const changeStoryImage = (index) => {
    const btn = thumbs[index];
    if (!btn) return;
    thumbs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const newSrc = btn.dataset.image;
    if (storyImg && newSrc) {
      if (window.gsap && !reduceMotion) {
        gsap.to(storyImg, { opacity: 0, duration: 0.25, onComplete: () => {
          storyImg.src = newSrc;
          gsap.to(storyImg, { opacity: 1, duration: 0.4 });
        }});
      } else {
        storyImg.src = newSrc;
      }
    }
    carouselIndex = index;
  };

  thumbs.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      changeStoryImage(index);
      resetCarouselTimer();
    });
  });

  const startCarousel = () => {
    carouselInterval = setInterval(() => {
      let nextIndex = (carouselIndex + 1) % thumbs.length;
      changeStoryImage(nextIndex);
    }, 4500); // changes images slowly every 4.5 seconds
  };

  const resetCarouselTimer = () => {
    clearInterval(carouselInterval);
    startCarousel();
  };

  if (thumbs.length && storyImg) {
    startCarousel();
  }

  /* ---------- GSAP Card Flips for Why Choose Us ---------- */
  if (window.gsap && !reduceMotion) {
    const flipCards = gsap.utils.toArray('.flip-card');
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

  /* ---------- Scroll-triggered reveals & Parallax ---------- */
  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    // Stats reveal
    gsap.from('.stats-grid .stat-item', {
      y: 40, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.stats-banner', start: 'top 80%' }
    });

    // Categories reveal
    gsap.utils.toArray('.categories .section-head, .cat-row').forEach(el => {
      gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' } });
    });

    // Story media clip reveal
    gsap.from('.story-media', { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.story', start: 'top 70%' } });
    // Fade the whole story copy column without translating it, so we do not
    // introduce a fractional transform that can expose a seam.
    gsap.from('.story-content', { opacity: 0, duration: 0.7,
      scrollTrigger: { trigger: '.story-content', start: 'top 75%' } });

    // Brand collage reveal
    gsap.from('.brand-tile', {
      y: 30, opacity: 0, scale: 0.92, stagger: 0.06, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.brand-collage', start: 'top 85%' }
    });

    // Sector solutions reveal & Parallax
    gsap.from('.sectors-grid .sector-card', {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.sectors', start: 'top 75%' }
    });

    // Featured products reveal
    gsap.from('.fp-grid .fp-card', {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.featured-products', start: 'top 75%' }
    });

    // Why cards trigger
    gsap.from('.why-card', { y: 26, opacity: 0, stagger: 0.08, duration: 0.6,
      scrollTrigger: { trigger: '.why-grid', start: 'top 85%' } });
      
    // Commitment trigger
    gsap.from('.commitment-inner', { y: 30, opacity: 0, duration: 0.9,
      scrollTrigger: { trigger: '.commitment', start: 'top 80%' } });
      
    // MVV banner trigger
    gsap.from('.mvv-item', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6,
      scrollTrigger: { trigger: '.mvv-row', start: 'top 90%' } });

    // Parallax on story image
    // Removed to prevent gap increase on scroll
    // gsap.to('#story-carousel-img', {
    //   yPercent: 6, ease: 'none',
    //   scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: true }
    // });
        // Parallax on Commitment Image (desktop only — causes overlap on small screens)
    if (window.innerWidth > 1023) {
      gsap.to('.commitment-media img', {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '.commitment', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  }
});
