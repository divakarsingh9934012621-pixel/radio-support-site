/* =========================================================================
   RadioSat Support — page behaviour
   Vanilla JS, no dependencies beyond the Bootstrap bundle already loaded.
   Works over file:// — no fetch, no modules, no server.
   ========================================================================= */
(function () {
  'use strict';

  /* ------------------------------------------- header rule on scroll
     .is-stuck thickens the header's bottom hairline from --border to
     --rule-strong. No shadow: the page has one blurred shadow and it
     lives under the mobile call bar.
     ---------------------------------------------------------------- */
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

  /* ------------------------------------------- highlight the active link
     The active nav item is signalled twice — the vermillion underline and
     the ink change — so nothing lives only in a hover state.
     ------------------------------------------------------------------- */
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

  /* --------------------------------------------------- reveal on scroll
     .sec-rule is in the list so the section rules draw themselves in from
     the left as each section arrives. No second observer, no listener.
     ------------------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal, .sec-rule');
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

  /* ------------------------------------------------- count-up the stats
     .stat-num carries font-variant-numeric: tabular-nums lining-nums in
     the stylesheet. That is load-bearing: this loop rewrites textContent
     on every frame, and proportional figures would make the band reflow
     its own width mid-count. Do not remove it.
     ------------------------------------------------------------------- */
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
     Every phone link carries data-call — twelve of them. Drop your
     ad-platform conversion call inside this handler and all CTAs are
     tracked at once.
     ------------------------------------------------------------------- */
  document.querySelectorAll('a[data-call]').forEach(function (link) {
    link.addEventListener('click', function () {
      // Google Ads example — uncomment and set your own conversion id/label:
      // if (typeof gtag === 'function') {
      //   gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/YYYYYYYYYYYY' });
      // }
      if (typeof console !== 'undefined') {
        console.debug('[call] CTA clicked:', link.getAttribute('href'));
      }
    });
  });

})();
