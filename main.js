/**
 * Carpentry by Lee — Main script
 * Scroll reveal, header behaviour, mobile menu, form handling
 */

(function () {
  'use strict';

  // ----- Year in footer -----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Scroll reveal -----
  var revealEls = document.querySelectorAll('.reveal');
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);
  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // ----- Header: add .scrolled on scroll -----
  var header = document.getElementById('header');
  if (header) {
    var lastY = window.scrollY;
    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastY = window.scrollY;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Mobile menu -----
  var menuToggle = document.getElementById('menuToggle');
  var navMain = document.querySelector('.nav-main');
  if (menuToggle && navMain) {
    menuToggle.addEventListener('click', function () {
      navMain.classList.toggle('is-open');
      menuToggle.setAttribute('aria-label', navMain.classList.contains('is-open') ? 'Close menu' : 'Open menu');
    });
    navMain.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMain.classList.remove('is-open');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // ----- Contact form: prefill from ?service= -----
  (function () {
    var params = new URLSearchParams(window.location.search);
    var service = params.get('service');
    var messageEl = document.getElementById('message');
    if (service && messageEl) {
      messageEl.value = 'I\'m interested in ' + service + '. Please get in touch.';
    }
  })();

  // ----- Contact form (no backend: show message, optional mailto) -----
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('name') || {}).value;
      var email = (document.getElementById('email') || {}).value;
      var message = (document.getElementById('message') || {}).value;
      var subject = encodeURIComponent('Enquiry from Carpentry by Lee website');
      var body = encodeURIComponent('Name: ' + (name || '') + '\nEmail: ' + (email || '') + '\n\nMessage:\n' + (message || ''));
      window.location.href = 'mailto:info@carpentrybylee.ie?subject=' + subject + '&body=' + body;
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = 'Opening email…';
        setTimeout(function () {
          btn.textContent = orig;
        }, 2000);
      }
    });
  }

  // ----- Sticky CTA bar -----
  var stickyCta = document.getElementById('stickyCta');
  var stickyCtaDismiss = document.getElementById('stickyCtaDismiss');
  var STICKY_CTA_KEY = 'cbl_sticky_cta_dismissed';
  function updateStickyCta() {
    if (!stickyCta) return;
    if (sessionStorage.getItem(STICKY_CTA_KEY)) {
      stickyCta.classList.add('is-dismissed');
      return;
    }
    if (window.scrollY > 350) {
      stickyCta.classList.add('is-visible');
      stickyCta.setAttribute('aria-hidden', 'false');
    } else {
      stickyCta.classList.remove('is-visible');
      stickyCta.setAttribute('aria-hidden', 'true');
    }
  }
  if (stickyCta) {
    window.addEventListener('scroll', function () { updateStickyCta(); }, { passive: true });
    updateStickyCta();
  }
  if (stickyCtaDismiss) {
    stickyCtaDismiss.addEventListener('click', function () {
      stickyCta.classList.remove('is-visible');
      stickyCta.classList.add('is-dismissed');
      stickyCta.setAttribute('aria-hidden', 'true');
      sessionStorage.setItem(STICKY_CTA_KEY, '1');
    });
  }

  // ----- Back to top -----
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    function updateBackToTop() {
      if (window.scrollY > 500) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }
    window.addEventListener('scroll', function () { updateBackToTop(); }, { passive: true });
    updateBackToTop();
  }

  // ----- FAQ accordion -----
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('is-open');
        var otherAnswer = document.getElementById(other.querySelector('.faq-question').getAttribute('aria-controls'));
        if (otherAnswer) {
          otherAnswer.hidden = true;
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      if (!isOpen) {
        item.classList.add('is-open');
        if (answer) {
          answer.hidden = false;
          btn.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  // ----- Testimonial carousel -----
  var track = document.querySelector('.testimonial-track');
  var slides = document.querySelectorAll('.testimonial-slide');
  var dotsContainer = document.querySelector('.carousel-dots');
  var prevBtn = document.querySelector('.carousel-prev');
  var nextBtn = document.querySelector('.carousel-next');
  if (track && slides.length && dotsContainer) {
    var currentIndex = 0;
    function goTo(index) {
      currentIndex = (index + slides.length) % slides.length;
      track.scrollTo({ left: currentIndex * track.offsetWidth, behavior: 'smooth' });
      dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
        dot.setAttribute('aria-selected', i === currentIndex);
      });
    }
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
      dot.setAttribute('aria-selected', i === 0);
      dot.addEventListener('click', function () { goTo(i); });
      dotsContainer.appendChild(dot);
    });
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });
    track.addEventListener('scroll', function () {
      var index = Math.round(track.scrollLeft / track.offsetWidth);
      if (index !== currentIndex) {
        currentIndex = index;
        dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
          dot.setAttribute('aria-selected', i === currentIndex);
        });
      }
    });
    var carouselInterval = setInterval(function () {
      goTo(currentIndex + 1);
    }, 6000);
    track.addEventListener('mouseenter', function () { clearInterval(carouselInterval); });
  }

  // ----- Stats count-up (when in view) -----
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target) || el.classList.contains('counted')) return;
      el.classList.add('counted');
      var duration = 1500;
      var start = 0;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(start + (target - start) * easeOut);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.3 });
  statNumbers.forEach(function (el) { statObserver.observe(el); });
})();
