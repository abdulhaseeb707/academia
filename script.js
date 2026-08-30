/**
 * ABDUL HASEEB KHAN — PORTFOLIO JAVASCRIPT ENGINE
 * Features:
 * - Theme Switcher (Dark / Light with LocalStorage persistence)
 * - Mobile Navigation Drawer & Backdrop Handling
 * - Scroll-Spy Navigation Active State
 * - Image Lightbox / Modal for Certificates & Field Photos
 * - One-Click Email Copy with Toast Alert
 * - Dynamic Year Updater
 * - Contact Form Dispatcher
 * - Scroll-Reveal Animations with IntersectionObserver
 */

(function () {
  'use strict';

  // ==========================================
  // 1. THEME SWITCHER (DARK / LIGHT)
  // ==========================================
  var themeToggleBtn = document.getElementById('themeToggle');
  var currentTheme = localStorage.getItem('theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      themeToggleBtn.innerHTML = theme === 'dark'
        ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
        : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  }

  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      var nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  // ==========================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================
  var navToggle = document.getElementById('navToggle');
  var mobileNavDrawer = document.getElementById('mobileNavDrawer');
  var mobileNavOverlay = document.getElementById('mobileNavOverlay');

  function openMobileNav() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  var mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // ==========================================
  // 3. LIGHTBOX MODAL FOR CREDENTIALS & GALLERY
  // ==========================================
  var lightbox = document.getElementById('lightboxModal');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
      }
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      }
    }
  });

  var zoomableItems = document.querySelectorAll('.js-zoom');
  zoomableItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var src = item.getAttribute('data-src') || (item.querySelector('img') ? item.querySelector('img').getAttribute('src') : null) || item.getAttribute('src');
      var caption = item.getAttribute('data-caption') || (item.querySelector('img') ? item.querySelector('img').getAttribute('alt') : null) || '';
      if (src) {
        openLightbox(src, caption);
      }
    });
  });

  // ==========================================
  // 4. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message) {
    var toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span>' + message + '</span>';
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==========================================
  // 5. ONE-CLICK EMAIL COPY
  // ==========================================
  var copyEmailBtns = document.querySelectorAll('.js-copy-email');
  copyEmailBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var email = 'abdulhaseeb2130@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          showToast('✓ Email copied to clipboard: ' + email);
        }).catch(function () {
          showToast(email);
        });
      } else {
        showToast('abdulhaseeb2130@gmail.com');
      }
    });
  });

  // ==========================================
  // 6. SCROLL-SPY ACTIVE NAV INDICATOR
  // ==========================================
  var sections = document.querySelectorAll('section[id]');
  var desktopNavItems = document.querySelectorAll('#desktopNavMenu .nav-item a');
  var mobileNavAnchors = document.querySelectorAll('.mobile-nav-link');

  function updateActiveNav() {
    var scrollY = window.pageYOffset + 140;
    sections.forEach(function (current) {
      var sectionHeight = current.offsetHeight;
      var sectionTop = current.offsetTop;
      var sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavItems.forEach(function (link) {
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          } else if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
          }
        });

        mobileNavAnchors.forEach(function (link) {
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          } else if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ==========================================
  // 7. CONTACT FORM DISPATCHER
  // ==========================================
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value;
      var email = document.getElementById('cf-email').value;
      var message = document.getElementById('cf-msg').value;

      var subject = encodeURIComponent('Academic / Professional Inquiry from ' + name);
      var body = encodeURIComponent('Hello Abdul Haseeb,\n\n' + message + '\n\nBest regards,\n' + name + ' (' + email + ')');

      window.location.href = 'mailto:abdulhaseeb2130@gmail.com?subject=' + subject + '&body=' + body;
      showToast('✓ Opening your email client...');
    });
  }

  // ==========================================
  // 8. DYNAMIC COPYRIGHT YEAR
  // ==========================================
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 9. SCROLL-REVEAL OBSERVER
  // ==========================================
  if ('IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.profile-card, .metric-card, .news-entry, .project-card, .diploma-card, .gallery-item, .timeline-item, .skills-matrix-card, .contact-info-card, .contact-form'
    );

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el, index) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(el);
    });
  }

})();

