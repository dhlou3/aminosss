/* ==========================================================================
   Interaction layer — nav state, reveals, magnetic hovers, tilt, count-up
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Navbar scroll state ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Hero entrance ---------- */
  const hero = document.querySelector('.hero') || document.querySelector('.hero-resume');
  if (hero) {
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add('is-ready'), 80);
    });
  }

  /* ---------- Scroll reveals (both .reveal and .reveal-cv) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-cv');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* stagger index for children inside .reveal-stagger */
  document.querySelectorAll('.reveal-stagger').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
      child.classList.add('reveal');
    });
  });

  /* ---------- Magnetic buttons ---------- */
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach((el) => {
    let bounds;
    const strength = 22;

    const moveHandler = (e) => {
      bounds = el.getBoundingClientRect();
      const relX = e.clientX - bounds.left - bounds.width / 2;
      const relY = e.clientY - bounds.top - bounds.height / 2;
      el.style.transform = `translate(${(relX / bounds.width) * strength}px, ${(relY / bounds.height) * strength}px)`;
    };
    const leaveHandler = () => {
      el.style.transform = 'translate(0,0)';
    };

    el.addEventListener('mousemove', moveHandler);
    el.addEventListener('mouseleave', leaveHandler);
  });

  /* ---------- Card tilt (cursor-follow) ---------- */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach((card) => {
    const maxTilt = 6;
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateZ(0)`;
    };
    const onLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });

  /* ---------- Count-up stats ---------- */
  const statNums = document.querySelectorAll('[data-count]');
  if (statNums.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.count.includes('.') ? 1 : 0;
      const duration = 1400;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const statIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              statIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      statNums.forEach((el) => statIo.observe(el));
    } else {
      statNums.forEach(animateCount);
    }
  }

  /* ---------- Active nav link ---------- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
