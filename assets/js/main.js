/* ------------------------------------------------------------------
   Google Ads call-conversion label.
   The Google tag (AW-18441096809) is installed in the <head> of every
   page. To count call-button taps as a Google Ads CONVERSION, paste the
   label here — it is the part after the slash in the "send_to" value
   shown at Google Ads > Goals > Conversions > (your call conversion) >
   Tag setup, e.g. 'AbC-dEfGhIjKlMnOp'. Leave empty to only log the
   engagement event.
   ------------------------------------------------------------------ */
var RADIOSATS_CONVERSION_LABEL = '';

/* =========================================================================
   RadioSat Support — page behaviour
   Vanilla JS, no dependencies beyond the Bootstrap bundle already loaded.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------- header shadow on scroll */
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------- close mobile nav after a tap */
  var navCollapse = document.getElementById('mainNav');
  if (navCollapse) {
    navCollapse.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (!navCollapse.classList.contains('show')) return;
        var inst = bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });
        inst.hide();
      });
    });
  }

  /* ------------------------------------------- highlight the active link */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.navbar .nav-link[href^="#"]')
  );

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --------------------------------------------------- reveal on scroll */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealables.forEach(function (el) { revealer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ------------------------------------------------- count-up the stats */
  var counters = document.querySelectorAll('.stat-num[data-count]');
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null;
    var duration = 1100;

    var tick = function (ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    var countObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  /* ------------------------------------------------------- current year */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ----------------------------------------------- call conversion hook
     Every phone link carries data-call. Drop your ad-platform conversion
     call inside this handler and all CTAs are tracked at once.
     ------------------------------------------------------------------- */
  document.querySelectorAll('a[data-call]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        // Always record the tap as an engagement event on the Google tag.
        gtag('event', 'click_to_call', { event_category: 'engagement', event_label: link.getAttribute('href') });
        // Count it as a Google Ads conversion once the conversion label is set (top of file).
        if (RADIOSATS_CONVERSION_LABEL) {
          gtag('event', 'conversion', { send_to: 'AW-18441096809/' + RADIOSATS_CONVERSION_LABEL });
        }
      }
      if (typeof console !== 'undefined') {
        console.debug('[call] CTA clicked:', link.getAttribute('href'));
      }
    });
  });

})();
