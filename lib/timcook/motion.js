/*
 * Tim Cook at ATLAS — interaction & motion.
 *
 * A port of the reference's assets/js/main.js (GSAP + ScrollTrigger + SplitText, smooth scrolling
 * by Lenis, the Three.js layer from ./scene.js loaded on idle). Every timeline, tween, trigger
 * position, easing, duration, stagger and threshold is the reference's own; what changed is only
 * how it is hosted:
 *
 *  - It runs inside one client component (components/TimCook/TimCookMotion) and is scoped to that
 *    component's root element, so `$`/`$$` and every GSAP selector resolve inside the page.
 *  - CSS state classes the reference toggles (`is-ready`, `is-scrolled`, `is-hidden`, `on-light`,
 *    `menu-open`, `is-open`, `is-horizontal`, `is-active`, `is-on`) are data attributes here, read
 *    by Tailwind `data-[…]:` / `group-data-[…]:` variants in the markup — no stylesheet.
 *  - `initTimCook(root)` returns a disposer that undoes everything: gsap.context + matchMedia revert
 *    (killing every ScrollTrigger, pin spacer and SplitText), Lenis destroyed and its ticker
 *    callback removed, the WebGL scene disposed, every listener / timer / rAF cancelled, and the
 *    globals it touched (lagSmoothing, scrollRestoration, ignoreMobileResize) restored. That is what
 *    lets a client navigation leave the route without leaking anything.
 *  - The reference's `@keyframes cue` (the scroll-cue line) is a Web Animations API animation here,
 *    because the project's stylesheet takes no new keyframes.
 *
 * The reference's "no-js" safety net is kept: the loader is hidden by CSS when scripting is off
 * (`[@media(scripting:none)]:hidden` in the markup), and the 6s `is-ready` timeout is kept as is.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const setFlag = (el, key, on) => {
  if (!el) return;
  if (on) el.dataset[key] = '';
  else delete el.dataset[key];
};

export function initTimCook(root) {
  const $ = (s, c = root) => c.querySelector(s);
  const $$ = (s, c = root) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const pad = (n) => String(n).padStart(2, '0');

  let disposed = false;
  const offs = [];
  const on = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); offs.push(() => target.removeEventListener(type, fn, opts)); };
  const timers = [];
  const later = (fn, ms) => { const id = setTimeout(() => { if (!disposed) fn(); }, ms); timers.push(id); return id; };
  const rafs = [];
  const tickers = [];
  const addTicker = (fn) => { gsap.ticker.add(fn); tickers.push(fn); };

  // Safety net: never leave the intro curtain up (reference <head> script).
  later(() => setFlag(root, 'ready', true), 6000);

  const ctx = gsap.context(() => {}, root);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const prevRestoration = 'scrollRestoration' in history ? history.scrollRestoration : null;
  if (prevRestoration !== null) history.scrollRestoration = 'manual';

  /* Smooth scrolling — Lenis drives the scroll, GSAP's ticker drives Lenis,
   * and every Lenis scroll event updates ScrollTrigger. */
  let lenis = null;
  if (!reduceMotion) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    addTicker((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop(); // held until the intro curtain lifts
  }

  function scrollToTarget(target, immediate = false) {
    const el = target === '#top' ? 0 : (typeof target === 'string' ? $(target) : target);
    if (el === null) return;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.6, immediate, force: true });
    } else if (el === 0) {
      window.scrollTo({ top: 0, behavior: immediate || reduceMotion ? 'auto' : 'smooth' });
    } else {
      el.scrollIntoView({ behavior: immediate || reduceMotion ? 'auto' : 'smooth' });
    }
  }

  /* Header, mobile menu, in-page links */
  const header = $('#site-header');
  const menuToggle = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');
  const menuLabel = $('[data-tc="menu-label"]', menuToggle);
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    mobileMenu.hidden = false;
    void mobileMenu.offsetHeight; // commit the closed state so the transition runs
    setFlag(mobileMenu, 'open', true);
    menuToggle.setAttribute('aria-expanded', 'true');
    menuLabel.textContent = 'Close';
    setFlag(header, 'menu', true);
    setFlag(header, 'hidden', false);
    if (lenis) lenis.stop();
    const first = mobileMenu.querySelector('a');
    if (first) first.focus({ preventScroll: true });
  }

  function closeMenu(returnFocus = true) {
    if (!menuOpen) return;
    menuOpen = false;
    setFlag(mobileMenu, 'open', false);
    menuToggle.setAttribute('aria-expanded', 'false');
    menuLabel.textContent = 'Menu';
    setFlag(header, 'menu', false);
    if (lenis) lenis.start();
    if (returnFocus) menuToggle.focus({ preventScroll: true });
    later(() => { if (!menuOpen) mobileMenu.hidden = true; }, 700);
  }

  on(menuToggle, 'click', () => (menuOpen ? closeMenu() : openMenu()));
  on(document, 'keydown', (e) => { if (e.key === 'Escape' && menuOpen) closeMenu(); });
  const deskMq = window.matchMedia('(min-width: 1024px)');
  on(deskMq, 'change', (e) => { if (e.matches) closeMenu(false); });

  on(root, 'click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    const target = hash === '#top' ? document.body : $(hash);
    if (!target) return;
    e.preventDefault();
    closeMenu(false);
    scrollToTarget(hash === '#top' ? '#top' : target);
    history.replaceState(history.state, '', hash === '#top' ? location.pathname + location.search : hash);
    // Move keyboard focus to the destination without a second jump
    const focusEl = hash === '#top' ? $('#hero-title') : target;
    if (focusEl) {
      if (!focusEl.hasAttribute('tabindex')) focusEl.setAttribute('tabindex', '-1');
      focusEl.focus({ preventScroll: true });
    }
  });

  /* WebGL layer state (the scene module loads later, on idle) */
  const gl = { scene: null, heroProgress: 0, heroActive: true, finaleMorph: 0, finaleActive: false };

  function syncScene() {
    if (!gl.scene) return;
    const heroVis = gl.heroActive ? 1 - smooth(0.12, 0.6, gl.heroProgress) : 0;
    const finaleVis = gl.finaleActive ? smooth(0.05, 0.7, gl.finaleMorph) : 0;
    gl.scene.set({
      scatter: gl.finaleActive ? 0 : gl.heroProgress,
      morph: gl.finaleActive ? gl.finaleMorph : 0,
      opacity: Math.max(heroVis, finaleVis) * 0.9,
    });
  }

  function loadScene() {
    const canvas = $('#gl');
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (reduceMotion || saveData || (navigator.hardwareConcurrency || 4) <= 2) return;
    import('./scene')
      .then(({ createScene }) => {
        if (disposed) return;
        const scene = createScene(canvas, { mobile });
        if (!scene) return;
        gl.scene = scene;
        syncScene();
        // Render only while visible — plus one extra frame after fading out, so no stale frame lingers
        let drawn = false;
        addTicker((time, delta) => {
          if (document.hidden) return;
          const visible = scene.visible;
          if (visible || drawn) scene.render(delta);
          drawn = visible;
        });
        setFlag(canvas, 'on', true);
      })
      .catch(() => { /* decorative only — ignore */ });
  }

  /* Shared animation builders */
  function splitLines(el, opts = {}) {
    return SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.2,
        ease: 'expo.out',
        stagger: opts.stagger || 0.09,
        scrollTrigger: { trigger: el, start: opts.start || 'top 86%', containerAnimation: opts.containerAnimation },
      }),
    });
  }

  function buildTextReveals(journeyTween) {
    $$('[data-split-lines]').forEach((el) => {
      const inTrack = journeyTween && el.closest('[data-journey-track]');
      // The journey intro is visible as soon as the section pins, so reveal it on section entry.
      splitLines(el, inTrack ? { start: 'top 75%' } : { stagger: el.closest('[data-tc="quote"]') ? 0.06 : 0.09 });
    });

    $$('[data-split-words]').forEach((el) => {
      SplitText.create(el, {
        type: 'words',
        mask: 'words',
        wordsClass: 'split-word',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.words, {
          yPercent: 115,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }),
      });
    });

    $$('[data-scrub-words]').forEach((el) => {
      SplitText.create(el, {
        type: 'words',
        autoSplit: true,
        onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.14 }, {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 48%', scrub: true },
        }),
      });
    });

    $$('[data-fade]').forEach((el) => {
      gsap.from(el, {
        y: 36, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    $$('[data-stagger]').forEach((el) => {
      gsap.from(el.children, {
        y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  }

  function buildImageReveals(isDesktop) {
    $$('[data-reveal]').forEach((fig) => {
      const img = fig.querySelector('img');
      const st = { trigger: fig, start: 'top 85%' };
      gsap.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: st,
        onComplete: () => gsap.set(fig, { clearProps: 'clipPath' }),
      });
      gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: 'expo.out', scrollTrigger: st });
    });

    if (isDesktop) {
      $$('[data-parallax]').forEach((el) => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.parallax) || -10,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }
  }

  /* Hero — capsule window expands into the full arrival photograph */
  function buildHero(isDesktop, isPhone) {
    const hero = $('#top');
    const media = $('[data-hero-media]');
    const img = media.querySelector('img');
    const title = $('[data-hero-title]');
    const lines = $$('[data-tc="hero-line"]', title);
    // Must mirror --cap / --cap-x in the hero's classes
    const capsule = isPhone ? 'inset(36% 12% 36% 12% round 400px)' : 'inset(34% 36% 34% 36% round 400px)';

    const split = SplitText.create(lines, { type: 'chars', charsClass: 'hero-char' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: () => '+=' + window.innerHeight * (isDesktop ? 1.5 : 1.1),
        pin: true,
        scrub: 1,
        onUpdate: (self) => { gl.heroProgress = self.progress; syncScene(); },
        onToggle: (self) => { gl.heroActive = self.isActive || self.progress < 1; syncScene(); },
      },
      defaults: { ease: 'none' },
    });
    tl.fromTo(media, { clipPath: capsule }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 1 }, 0)
      .fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.3 }, 0)
      // The headline parts like doors as the photograph opens between its lines
      .to(lines[0], { yPercent: -140, opacity: 0, ease: 'power2.in', duration: 0.75 }, 0.02)
      .to(lines[1], { yPercent: 140, opacity: 0, ease: 'power2.in', duration: 0.75 }, 0.02)
      .to('[data-hero-fade]', { opacity: 0, y: -24, duration: 0.35 }, 0)
      .to('[data-hero-shade]', { opacity: 1, duration: 0.5 }, 0.55)
      .fromTo('[data-hero-caption]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 0.85)
      .to({}, { duration: 0.25 });

    // Intro (played once the curtain lifts). Different targets from the scroll timeline.
    return gsap.timeline({ paused: true })
      .from(media, { scale: 0.6, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0)
      .from(split.chars, { yPercent: 115, duration: 1.3, ease: 'expo.out', stagger: 0.035 }, 0.1)
      .from('[data-hero-fade] > *', { y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.5)
      // Animate the inner nav: the header itself has a CSS transform transition that would fight GSAP
      .from(header.firstElementChild, { yPercent: -100, opacity: 0, duration: 1, ease: 'expo.out' }, 0.6);
  }

  /* The Day — pinned horizontal journey (desktop) with snapping */
  function buildJourneyHorizontal() {
    const section = $('#journey');
    setFlag(section, 'h', true);
    const pinEl = $('[data-tc="journey-pin"]', section);
    const track = $('[data-journey-track]', section);
    const panels = [$('[data-tc="journey-intro"]', track), ...$$('[data-tc="moment"]', track)];
    const moments = panels.slice(1);
    const bar = $('[data-journey-bar]');
    const counter = $('[data-journey-current]');
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    let centers = [];

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: pinEl,
        start: 'top top',
        end: () => '+=' + distance(),
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          const d = distance() || 1;
          centers = panels.map((p) => clamp01((p.offsetLeft + p.offsetWidth / 2 - window.innerWidth / 2) / d));
        },
        onUpdate: (self) => {
          bar.style.transform = `scaleX(${self.progress})`;
          let current = 0;
          centers.forEach((c, i) => { if (i > 0 && self.progress >= c - 0.04) current = i; });
          counter.textContent = pad(current);
        },
      },
    });

    // Inner parallax, image wipes and caption reveals, all driven by the horizontal tween
    moments.forEach((m) => {
      const fig = $('[data-tc="moment-media"]', m);
      const img = $('img', fig);
      gsap.fromTo(img, { xPercent: -6 }, {
        xPercent: 6, ease: 'none',
        scrollTrigger: { trigger: m, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      });
      gsap.fromTo(fig, { clipPath: 'inset(0% 0% 0% 100%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
        scrollTrigger: { trigger: m, containerAnimation: tween, start: 'left 105%', end: 'left 45%', scrub: true },
      });
      gsap.from($('[data-tc="moment-copy"]', m).children, {
        y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: m, containerAnimation: tween, start: 'left 70%', toggleActions: 'play none none reverse' },
      });
    });

    // Gentle snap to the nearest panel once scrolling settles inside the pinned range
    const onScrollEnd = () => {
      const st = tween.scrollTrigger;
      if (!st || menuOpen) return;
      const y = st.scroll();
      if (y <= st.start + 4 || y >= st.end - 4) return;
      const points = centers.map((c) => st.start + c * (st.end - st.start)).concat(st.end);
      const nearest = points.reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a));
      if (Math.abs(nearest - y) < 3 || Math.abs(nearest - y) > window.innerHeight * 0.9) return;
      if (lenis) lenis.scrollTo(nearest, { duration: 0.9 });
      else window.scrollTo({ top: nearest, behavior: 'smooth' });
    };
    ScrollTrigger.addEventListener('scrollEnd', onScrollEnd);

    return {
      tween,
      cleanup: () => {
        ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd);
        setFlag(section, 'h', false);
      },
    };
  }

  function buildJourneyVertical() {
    $$('#journey [data-tc="moment"]').forEach((m) => {
      const fig = $('[data-tc="moment-media"]', m);
      const st = { trigger: m, start: 'top 82%' };
      gsap.fromTo(fig, { clipPath: 'inset(12% 12% 12% 12%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', scrollTrigger: st,
        onComplete: () => gsap.set(fig, { clearProps: 'clipPath' }),
      });
      gsap.from($('img', fig), { scale: 1.2, duration: 1.8, ease: 'expo.out', scrollTrigger: st });
      gsap.from($('[data-tc="moment-copy"]', m).children, {
        y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: m, start: 'top 70%' },
      });
    });
  }

  /* Vision, film, gallery, finale */
  function buildVision() {
    const row = $('[data-marquee]');
    gsap.fromTo(row, { xPercent: 0 }, {
      xPercent: -38, ease: 'none',
      scrollTrigger: { trigger: row.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });

    const photo = $('[data-expand]');
    gsap.fromTo(photo, { clipPath: 'inset(5% 9% 5% 9% round 24px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: photo, start: 'top 92%', end: 'top 12%', scrub: true },
    });
    gsap.fromTo($('img', photo), { scale: 1.18 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  function buildFilm() {
    const film = $('[data-film]');
    gsap.fromTo(film, { scale: 0.88 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: film, start: 'top bottom', end: 'top 25%', scrub: true },
    });
  }

  function buildGallery(isDesktop) {
    const items = $$('[data-gallery] > li');
    gsap.set(items, { opacity: 0, y: 60 });
    ScrollTrigger.batch(items, {
      start: 'top 94%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
    });
    if (isDesktop) {
      $$('[data-gallery] img').forEach((img) => {
        gsap.fromTo(img, { yPercent: -4, scale: 1.08 }, {
          yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: img.closest('li'), start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }
  }

  function buildFinale() {
    $$('[data-finale-word]').forEach((word, i) => {
      SplitText.create(word, {
        type: 'chars',
        mask: 'chars',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.chars, {
          yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.035, delay: i * 0.08,
          scrollTrigger: { trigger: word, start: 'top 88%' },
        }),
      });
    });
  }

  function buildSceneTriggers() {
    ScrollTrigger.create({
      trigger: $('#finale'),
      start: 'top bottom',
      end: 'max',
      // end is the page bottom, where isActive turns false — so track "past the start" instead
      onUpdate: (self) => {
        gl.finaleActive = self.progress > 0;
        gl.finaleMorph = clamp01((self.scroll() - self.start) / (window.innerHeight * 0.95));
        syncScene();
      },
      onLeaveBack: () => { gl.finaleActive = false; gl.finaleMorph = 0; syncScene(); },
    });
  }

  /* Chrome: progress bar, header states, active nav — built last so
   * their positions account for every pin above them. */
  function buildChrome() {
    const progress = $('[data-tc="progress"]');
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        progress.style.transform = `scaleX(${self.progress})`;
        const y = self.scroll();
        setFlag(header, 'scrolled', y > 40);
        if (!menuOpen) setFlag(header, 'hidden', self.direction === 1 && y > 500);
      },
    });

    ScrollTrigger.create({
      trigger: $('#voices'),
      start: 'top 64px',
      end: 'bottom 64px',
      onToggle: (self) => setFlag(header, 'onlight', self.isActive),
    });

    const links = $$('[data-tc="nav-link"]');
    let current = '';
    const setActive = (id) => {
      current = id;
      links.forEach((a) => {
        const active = a.getAttribute('href') === '#' + id;
        setFlag(a, 'active', active);
        if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    };
    ['visit', 'journey', 'vision', 'voices', 'film', 'gallery'].forEach((id) => {
      ScrollTrigger.create({
        trigger: $('#' + id),
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) setActive(id);
          else if (current === id) setActive('');
        },
      });
    });
  }

  /* Film facade & lightbox (motion independent) */
  function initFilm() {
    const btn = $('[data-tc="film-play"]');
    if (!btn) return;
    on(btn, 'click', () => {
      const film = btn.closest('[data-film]');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.videoId}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = 'Tim Cook visits ATLAS Campus';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      iframe.className = 'absolute inset-0 h-full w-full border-0 object-cover';
      film.appendChild(iframe);
      // Hidden rather than removed: React owns these nodes and removes them itself on unmount.
      btn.hidden = true;
      const shade = $('[data-tc="film-shade"]', film);
      if (shade) shade.hidden = true;
      iframe.focus();
    }, { once: true });
  }

  function initLightbox() {
    const dialog = $('#lightbox');
    const items = $$('[data-tc="gallery-item"]');
    if (!dialog || !items.length || typeof dialog.showModal !== 'function') return;
    const img = $('[data-lb-img]', dialog);
    const caption = $('[data-lb-caption]', dialog);
    const count = $('[data-lb-count]', dialog);
    let index = 0;

    const show = (i) => {
      index = (i + items.length) % items.length;
      const item = items[index];
      img.src = item.dataset.full;
      img.alt = item.querySelector('img').alt;
      caption.textContent = item.dataset.caption || '';
      count.textContent = `${pad(index + 1)} / ${pad(items.length)}`;
      if (!reduceMotion) ctx.add(() => gsap.fromTo(img, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }));
    };

    items.forEach((item, i) => on(item, 'click', () => {
      show(i);
      dialog.showModal();
      if (lenis) lenis.stop();
    }));
    on(dialog, 'close', () => {
      if (lenis) lenis.start();
      items[index].focus({ preventScroll: true });
    });
    on($('[data-lb-close]', dialog), 'click', () => dialog.close());
    on($('[data-lb-prev]', dialog), 'click', () => show(index - 1));
    on($('[data-lb-next]', dialog), 'click', () => show(index + 1));
    on(dialog, 'keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    });
    // Click on the empty area around the photo closes the viewer
    on($('[data-tc="lb-frame"]', dialog), 'click', (e) => { if (e.target !== img) dialog.close(); });

    let startX = 0;
    let startY = 0;
    on(dialog, 'touchstart', (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
    on(dialog, 'touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* The scroll cue's line (reference: `.scroll-cue__line::after { animation: cue 2.2s var(--ease-out) infinite }`) */
  let cue = null;
  function initCue() {
    const dash = $('[data-tc="cue-dash"]');
    if (!dash || reduceMotion || !dash.animate) return;
    cue = dash.animate([{ top: '-40%' }, { top: '110%' }], { duration: 2200, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterations: Infinity });
  }

  /* Boot */
  let heroIntro = null;
  let mm = null;

  function build() {
    mm = gsap.matchMedia(root);
    // `any` always matches — matchMedia skips the callback entirely when no condition is true
    mm.add({
      any: 'all',
      isDesktop: '(min-width: 1024px)',
      isPhone: '(max-width: 767px)',
      reduce: '(prefers-reduced-motion: reduce)',
    }, (mctx) => {
      const { isDesktop, isPhone, reduce } = mctx.conditions;
      if (reduce) {
        buildChrome();
        return undefined;
      }
      const intro = buildHero(isDesktop, isPhone);
      if (!heroIntro) heroIntro = intro; else intro.progress(1);

      let journey = null;
      if (isDesktop) journey = buildJourneyHorizontal();
      else buildJourneyVertical();

      buildTextReveals(journey && journey.tween);
      buildImageReveals(isDesktop);
      buildVision();
      buildFilm();
      buildGallery(isDesktop);
      buildFinale();
      buildSceneTriggers();
      buildChrome();

      return () => { if (journey) journey.cleanup(); };
    });
  }

  function runLoader() {
    const bar = $('[data-tc="loader-bar"]');
    const count = $('[data-tc="loader-count"]');
    const heroImg = $('[data-hero-media] img');
    const state = { p: 0 };
    let fill;
    ctx.add(() => {
      fill = gsap.to(state, {
        p: 100,
        duration: reduceMotion ? 0.2 : 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          bar.style.transform = `scaleX(${state.p / 100})`;
          count.textContent = pad(Math.round(state.p));
        },
      });
    });
    const loaded = new Promise((r) => (document.readyState === 'complete' ? r() : on(window, 'load', r, { once: true })));
    const ready = Promise.all([
      document.fonts ? document.fonts.ready : null,
      heroImg && heroImg.decode ? heroImg.decode().catch(() => null) : null,
      loaded,
    ]);
    const timeout = new Promise((r) => later(r, 4000));
    return Promise.all([Promise.race([ready, timeout]), fill.then()]);
  }

  function start() {
    if (disposed) return;
    rafs.push(requestAnimationFrame(() => rafs.push(requestAnimationFrame(() => {
      if (disposed) return;
      window.scrollTo(0, 0);
      ctx.add(build);
      ScrollTrigger.refresh();

      const done = () => {
        if (disposed) return;
        setFlag(root, 'ready', true);
        if (lenis) lenis.start();
        if (location.hash && $(location.hash)) scrollToTarget($(location.hash), true);
        const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
        idle(() => { if (!disposed) loadScene(); });
      };

      if (reduceMotion) {
        done();
        return;
      }
      ctx.add(() => {
        gsap.timeline({ onComplete: done })
          .to('[data-tc="loader-inner"], [data-tc="loader-count"]', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' })
          .to('#loader', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 0.3)
          .add(() => { if (heroIntro) heroIntro.play(); }, 0.75);
      });
    }))));
  }

  initFilm();
  initLightbox();
  initCue();
  runLoader().then(start);

  // Late-loading images or font swaps can shift layout: recalculate once everything is in.
  on(window, 'load', () => { if (!disposed) ScrollTrigger.refresh(); });

  return function dispose() {
    disposed = true;
    timers.forEach(clearTimeout);
    rafs.forEach(cancelAnimationFrame);
    offs.forEach((off) => off());
    tickers.forEach((fn) => gsap.ticker.remove(fn));
    if (cue) cue.cancel();
    if (mm) mm.revert();
    ctx.revert();
    if (gl.scene) gl.scene.dispose();
    if (lenis) lenis.destroy();
    // Leave the DOM as React rendered it, in case the same nodes are mounted again (StrictMode /
    // Fast Refresh re-run effects without recreating the DOM).
    setFlag(root, 'ready', false);
    ['scrolled', 'hidden', 'onlight', 'menu'].forEach((k) => setFlag(header, k, false));
    setFlag(mobileMenu, 'open', false);
    if (mobileMenu) mobileMenu.hidden = true;
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    if (menuLabel) menuLabel.textContent = 'Menu';
    setFlag($('#gl'), 'on', false);
    gsap.ticker.lagSmoothing(500, 33);
    ScrollTrigger.config({ ignoreMobileResize: false });
    if (prevRestoration !== null) history.scrollRestoration = prevRestoration;
  };
}
