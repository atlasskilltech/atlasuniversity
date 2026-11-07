/*
  Convocation — ATLAS SkillTech University: interaction & motion.

  A port of the reference's js/main.js (GSAP + ScrollTrigger + SplitText, Lenis smooth scrolling)
  with every timeline, tween, trigger position, easing, duration, stagger and snap setting kept as
  authored, plus the Three.js confetti layer (./heroScene, loaded on demand like the reference's
  module script). What changed is only the hosting:

  - `initConvocation(root)` runs inside one client component (components/Convocation/ConvocationMotion)
    scoped to that component's root, and returns a disposer that reverts everything — gsap.context +
    matchMedia (every ScrollTrigger, pin spacer and SplitText), Lenis destroyed and its ticker
    callback removed, the confetti scene disposed, every listener / timer / Web Animation cancelled,
    the page-level overflow lock released and the globals it touched restored — so a client
    navigation leaves nothing behind.
  - State classes the reference toggles (`is-scrolled`, `is-hidden`, `body.menu-open`,
    `html.is-loading`) are data attributes / an inline overflow lock here, read by Tailwind
    `data-[…]:` variants — no stylesheet.
  - The film rail (tabs + cards) is rendered by React (components/Convocation/Films) rather than by
    `innerHTML`; the marquee items are server-rendered from data (the second, looping copy is hidden
    under reduced motion — the reference only builds it when motion is on). The delegated
    `[data-video]` player below serves both the film cards and the dignitary buttons, as before.
  - The reference's CSS keyframes (preloader line + float + 4s failsafe, the scroll cue) are Web
    Animations here, because the project's stylesheet takes no new keyframes.
  - The preloader is hidden (display:none) rather than removed from the DOM — React owns the node.
*/
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

export function initConvocation(root) {
  const $ = (sel, ctx = root) => ctx.querySelector(sel);
  const $$ = (sel, ctx = root) => Array.from(ctx.querySelectorAll(sel));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const MOTION = !REDUCED;

  let disposed = false;
  const offs = [];
  const on = (target, type, fn, opts) => { if (!target) return; target.addEventListener(type, fn, opts); offs.push(() => target.removeEventListener(type, fn, opts)); };
  const timers = [];
  const tickers = [];
  const anims = [];
  const addTicker = (fn) => { gsap.ticker.add(fn); tickers.push(fn); };
  const debounce = (fn, ms = 150) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => { if (!disposed) fn(...args); }, ms); timers.push(t); };
  };

  const ctx = gsap.context(() => {}, root);
  const mms = [];
  // Mobile browsers resize the viewport when the URL bar shows/hides; don't refresh on that.
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: 'power3.out' });

  /** @type {Lenis|null} */
  let lenis = null;

  /* 1. Smooth scroll (Lenis ⟷ ScrollTrigger) */
  function initSmoothScroll() {
    if (!MOTION) return;
    lenis = new Lenis({
      lerp: 0.1, // gentle inertia without feeling floaty
      smoothWheel: true, // touch devices keep native momentum scrolling
      wheelMultiplier: 1,
    });
    // Keep ScrollTrigger in lock-step with Lenis' virtual scroll position,
    // and let GSAP's single RAF loop drive Lenis (one clock for everything).
    lenis.on('scroll', ScrollTrigger.update);
    addTicker((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function scrollToTarget(target) {
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    }
  }

  const lockScroll = () => lenis?.stop();
  const unlockScroll = () => lenis?.start();

  /* `html.is-loading, html.is-loading body { overflow: hidden }` */
  const html = document.documentElement;
  const prevOverflow = html.style.overflow;
  let loadingLock = true;
  html.style.overflow = 'hidden';
  const releaseLoading = () => { if (loadingLock) { loadingLock = false; html.style.overflow = prevOverflow; } };

  /* 2. Preloader — waits for fonts + hero image (capped), then lifts like a curtain */
  function runPreloader() {
    const el = $('#preloader');
    const done = () => { releaseLoading(); if (el) el.style.display = 'none'; };

    return new Promise((resolve) => {
      if (!el) { done(); resolve(); return; }

      const start = performance.now();
      const heroImg = $('[data-hero-img]');
      const ready = Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        heroImg && heroImg.decode ? heroImg.decode().catch(() => {}) : Promise.resolve(),
      ]);
      const cap = new Promise((r) => { timers.push(setTimeout(r, 3200)); });

      Promise.race([ready, cap]).then(() => {
        if (disposed) return;
        const minVisible = MOTION ? 1100 : 0;
        const wait = Math.max(0, minVisible - (performance.now() - start));

        timers.push(setTimeout(() => {
          if (disposed) return;
          if (!MOTION) { done(); resolve(); return; }
          ctx.add(() => {
            gsap.timeline({ onComplete: done })
              .to('[data-preloader-inner]', { autoAlpha: 0, y: -16, duration: 0.45, ease: 'power2.in' })
              .to(el, { yPercent: -100, duration: 1.05, ease: 'expo.inOut' }, '-=0.05')
              .add(() => { releaseLoading(); resolve(); }, '-=0.8');
          });
        }, wait));
      });
    });
  }

  /* The preloader's CSS animations: the gold line draws in, the mark floats, and a 4s failsafe
     fades the curtain out if scripts never finish (styles.css `.preloader { animation:
     preloader-failsafe 0.6s ease 4s forwards }`). */
  function preloaderAnimations() {
    const el = $('#preloader');
    if (!el || !el.animate) return;
    const line = $('[data-preloader-line]', el);
    const mark = $('[data-preloader-mark]', el);
    if (MOTION && line) anims.push(line.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 1100, easing: EXPO, fill: 'forwards' }));
    if (MOTION && mark) anims.push(mark.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }], { duration: 2400, easing: 'ease-in-out', iterations: Infinity }));
    if (!MOTION && line) line.style.transform = 'scaleX(1)';
    anims.push(el.animate([{ opacity: 1, visibility: 'visible' }, { opacity: 0, visibility: 'hidden' }], { duration: 600, delay: 4000, easing: 'ease', fill: 'forwards' }));
  }

  /* 4. Mobile menu */
  const header = $('[data-header]');
  const menu = $('[data-menu]');
  const menuBtn = $('[data-menu-toggle]');
  let menuTl = null;
  let menuOpen = false;

  function openMenu() {
    if (!menu || !menuBtn) return;
    menu.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
    menuOpen = true;
    if (header) delete header.dataset.hidden;
    lockScroll();

    if (MOTION) {
      menuTl?.kill();
      ctx.add(() => {
        menuTl = gsap.timeline()
          .fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' })
          .fromTo($$('[data-menu-link]', menu), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 }, 0.35)
          .fromTo($('[data-menu-foot]', menu), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.6);
      });
    }
    $('[data-menu-link]', menu)?.focus({ preventScroll: true });
  }

  function closeMenu(returnFocus = true) {
    if (!menu || menu.hidden) return;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    menuOpen = false;
    unlockScroll();

    const finish = () => { menu.hidden = true; if (returnFocus) menuBtn.focus({ preventScroll: true }); };
    if (MOTION) {
      menuTl?.kill();
      ctx.add(() => {
        menuTl = gsap.fromTo(menu, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: finish });
      });
    } else finish();
  }

  function initMenu() {
    if (!menu || !menuBtn) return;
    on(menuBtn, 'click', () => (menu.hidden ? openMenu() : closeMenu()));
    on(document, 'keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) closeMenu(); });
    // Close if the viewport grows into desktop layout while open
    on(window.matchMedia('(min-width: 1280px)'), 'change', (e) => { if (e.matches) closeMenu(false); });
  }

  /* 3. Header: scrolled state, hide-on-scroll-down, anchor links, active section */
  function initHeader() {
    if (!header) return;
    let lastY = window.scrollY;

    const onScroll = (y) => {
      if (y > 40) header.dataset.scrolled = ''; else delete header.dataset.scrolled;
      const goingDown = y > lastY + 2;
      const goingUp = y < lastY - 2;
      if (menuOpen) delete header.dataset.hidden;
      else if (goingDown && y > window.innerHeight * 0.7) header.dataset.hidden = '';
      else if (goingUp) delete header.dataset.hidden;
      lastY = y;
    };
    if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
    else on(window, 'scroll', () => onScroll(window.scrollY), { passive: true });
    onScroll(window.scrollY);

    // Keyboard users tabbing into a hidden header should see it.
    on(header, 'focusin', () => { delete header.dataset.hidden; });

    // In-page anchors → smooth scroll through Lenis
    on(root, 'click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash.length < 2) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      e.preventDefault();
      closeMenu(false);
      scrollToTarget(target);
      history.replaceState(history.state, '', hash);
      if (hash !== '#top') {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });

    // Active nav state follows the section in the middle of the viewport
    const links = $$('[data-nav-link]');
    const setActive = (id) => links.forEach((l) => l.setAttribute('aria-current', String(l.getAttribute('href') === `#${id}`)));
    const ids = links.map((l) => l.getAttribute('href').slice(1));

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => { if (self.isActive) setActive(id); },
      });
    });
    // Clear when back at the top
    ScrollTrigger.create({ trigger: $('#top'), start: 'top top', end: 'bottom 50%', onEnterBack: () => setActive('') });
  }

  /* 5. Hero — fit headline, entrance timeline, scroll-driven "doorway" expansion */
  // Window insets (in % of the hero). Landscape desktop uses a fixed composition where the
  // headline overlaps the photo; elsewhere (phones, portrait tablets) the window is fitted to the space
  // between the header and the text block so the photo is as large as possible.
  const DESK_MQ = window.matchMedia('(min-width: 1024px) and (orientation: landscape)');
  const insetStr = ({ t, x, b }, r = 6) => `inset(${t}% ${x}% ${b}% ${x}% round ${r}px)`;
  const heroWindow = () => {
    const w = window.innerWidth;
    if (DESK_MQ.matches) return { t: 12, x: 30, b: 40 };
    const hero = $('[data-hero]');
    const firstText = $('[data-hero-ui]');
    const x = w >= 640 ? 6 : 4;
    if (!hero || !firstText) return { t: 12, x, b: 46 };
    const h = hero.offsetHeight;
    const headerH = 72;
    const textTop = firstText.offsetTop; // offsetTop ignores the scroll-driven transforms
    const t = ((headerH + 12) / h) * 100;
    const b = ((h - textTop + 20) / h) * 100;
    // Guard: never let the window collapse on very short screens
    return { t: +t.toFixed(2), x, b: +Math.min(b, 100 - t - 18).toFixed(2) };
  };
  const applyStaticWindow = () => { const m = $('[data-hero-media]'); if (m) m.style.clipPath = insetStr(heroWindow()); };

  // Scale "Convocation" so it spans the container edge to edge at any width.
  function fitHeroTitle() {
    const title = $('[data-hero-title]');
    const word = $('[data-hero-word]');
    if (!title || !word) return;
    const container = title.parentElement;
    const cs = getComputedStyle(container);
    const available = container.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    title.style.fontSize = '100px';
    const natural = word.getBoundingClientRect().width;
    if (natural > 0) title.style.fontSize = `${Math.floor((available / natural) * 100 * 0.995 * 10) / 10}px`;
  }

  function initHero() {
    const hero = $('[data-hero]');
    if (!hero) return () => {};

    fitHeroTitle();
    on(window, 'resize', debounce(() => {
      fitHeroTitle();
      if (MOTION) ScrollTrigger.refresh(); else applyStaticWindow();
    }, 200));

    if (!MOTION) { applyStaticWindow(); return () => {}; }

    const media = $('[data-hero-media]');
    const door = $('[data-hero-door]');
    const img = $('[data-hero-img]');
    const title = $('[data-hero-title]');
    const canvas = $('[data-confetti]');
    const fades = $$('[data-hero-fade]');
    const uiRows = $$('[data-hero-ui]');

    // Characters rise out of a mask. Split once (the word never re-wraps).
    const chars = SplitText.create($('[data-hero-word]'), { type: 'chars', mask: 'chars', charsClass: 'hero-char' }).chars;

    // Pre-hide everything the intro reveals (preloader covers this instant).
    gsap.set(media, { clipPath: insetStr(heroWindow()) });
    gsap.set(img, { scale: 1.35 });
    if (chars.length) gsap.set(chars, { yPercent: 115 });
    gsap.set(fades, { autoAlpha: 0, y: 24 });
    gsap.set(header, { yPercent: -100, autoAlpha: 0 });

    // Intro: the doors of the window part, the word rises, UI settles in.
    const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      // fromTo with explicit strings: browsers normalise "inset(0% 50% 0% 50%)" to "inset(0% 50%)",
      // which would make a plain .to() interpolate mismatched values.
      .fromTo(door, { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', immediateRender: true }, 0)
      .to(img, { scale: 1.1, duration: 2.4 }, 0.1)
      .to(chars, { yPercent: 0, duration: 1.3, stagger: 0.045 }, 0.45)
      .to(fades, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }, 1.0)
      .to(header, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 1.0)
      .add(() => { root.dataset.intro = ''; window.dispatchEvent(new CustomEvent('convocation:intro')); }, 0.2);

    // Scroll: pin the hero; the window grows to full-bleed while the type lifts away.
    // (Different elements from the intro, so the two timelines never fight.)
    gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
      defaults: { ease: 'none' },
    })
      .fromTo(media, { clipPath: () => insetStr(heroWindow()) }, { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, 0)
      .fromTo(door, { scale: 1.06 }, { scale: 1 }, 0)
      .to(title, { yPercent: -35, autoAlpha: 0 }, 0)
      .to(uiRows, { autoAlpha: 0, y: -40 }, 0)
      .to(canvas, { autoAlpha: 0.35 }, 0);

    return () => intro.play();
  }

  /* 6. Headline reveals — SplitText lines rise from a mask, once, on enter */
  function initTextReveals() {
    $$('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true, // re-split on resize / font load so lines stay correct
        onSplit(self) {
          if (el.dataset.revealed) return undefined; // already shown: don't replay on re-split
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onComplete: () => { el.dataset.revealed = '1'; },
          });
        },
      });
    });
  }

  /* 7. Statement — words brighten as you read (scrubbed to scroll) */
  function initStatement() {
    const el = $('[data-statement]');
    if (!el) return;
    SplitText.create(el, {
      type: 'words',
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(self.words, { opacity: 0.14 }, {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
        });
      },
    });
  }

  /* 8. The day, in five chapters — pinned horizontal story on desktop */
  function initChapters() {
    const section = $('[data-chapters]');
    if (!section || !MOTION) return;

    const mm = gsap.matchMedia(root);
    mms.push(mm);
    mm.add('(min-width: 1024px) and (orientation: landscape)', () => {
      const track = $('[data-chapters-track]', section);
      const panels = $$('[data-chapter]', section);
      const bar = $('[data-chapter-bar]', section);
      const counter = $('[data-chapter-current]', section);
      const progress = $('[data-chapter-progress]', section);
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // Snap points: each chapter centred in the viewport
      const snapPoints = () => {
        const d = distance() || 1;
        return [0, ...panels.map((p) => gsap.utils.clamp(0, 1, (p.offsetLeft - (window.innerWidth - p.offsetWidth) / 2) / d))];
      };

      const scroll = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (v) => gsap.utils.snap(snapPoints(), v),
            duration: { min: 0.3, max: 0.8 },
            delay: 0.1,
            ease: 'power2.inOut',
          },
          // The progress line belongs to the pinned state only
          onToggle: (self) => progress && gsap.to(progress, { autoAlpha: self.isActive ? 1 : 0, duration: 0.3, overwrite: true }),
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { scaleX: self.progress });
            if (counter) {
              const i = Math.min(panels.length, Math.max(1, Math.round(self.progress * (panels.length - 1)) + 1));
              counter.textContent = String(i).padStart(2, '0');
            }
          },
        },
      });

      // Depth: main photos drift against the horizontal motion
      panels.forEach((panel) => {
        const img = $('[data-depth]', panel);
        if (!img) return;
        gsap.fromTo(img, { xPercent: -6 }, {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true },
        });
      });

      if (progress) gsap.set(progress, { autoAlpha: 0 });
      return () => gsap.set([track, progress], { clearProps: 'all' });
    });
  }

  /* 9. Marquee — conferment + cohort thumbnails, speed reacts to scroll velocity */
  function initMarquee() {
    if (!MOTION) return;
    const rows = $$('[data-marquee]');
    const tweens = [];

    rows.forEach((row) => {
      const track = $('[data-marquee-track]', row);
      const reverse = row.dataset.marquee === 'reverse';
      const tween = gsap.fromTo(track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: Number(row.dataset.duration) || 60, ease: 'none', repeat: -1 });
      tweens.push(tween);

      // Don't animate what nobody can see.
      ScrollTrigger.create({ trigger: row, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? tween.play() : tween.pause()) });
    });

    if (!tweens.length) return;
    let boost = 1;
    let current = 1;
    lenis?.on('scroll', ({ velocity }) => { boost = Math.max(boost, 1 + Math.min(Math.abs(velocity) * 0.12, 5)); });
    addTicker(() => {
      boost += (1 - boost) * 0.06; // decay back to cruising speed
      current += (boost - current) * 0.12; // ease into the new speed
      tweens.forEach((t) => t.timeScale(current));
    });
  }

  /* 10. Image reveals + parallax (subtle, only where they add depth) */
  function initImageMotion() {
    // Frames open upward; their image settles from a slight zoom.
    $$('[data-reveal]').forEach((frame) => {
      const img = $('img', frame);
      const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 85%', once: true } });
      tl.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' });
      if (img && !img.hasAttribute('data-parallax')) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0.1);
    });

    // Gallery tiles: a staggered batch reveal as rows arrive.
    const tiles = $$('[data-gallery-item]');
    gsap.set(tiles, { clipPath: 'inset(100% 0% 0% 0%)' });
    ScrollTrigger.batch(tiles, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => gsap.fromTo(batch, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', stagger: 0.08 }),
    });

    // Parallax: image drifts within its (overflow-hidden) frame.
    $$('[data-parallax]').forEach((img) => {
      const amount = Number(img.dataset.parallax) || 6;
      gsap.fromTo(img, { yPercent: -amount }, {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }

  /* 11. Dialog helpers (native <dialog>: focus trapping + Esc for free) */
  function openDialog(dialog) {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    lockScroll();
    if (MOTION) ctx.add(() => gsap.fromTo(dialog.firstElementChild, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' }));
  }

  function initDialogs() {
    $$('dialog[data-modal]').forEach((dialog) => {
      on(dialog, 'close', unlockScroll);
      $$('[data-dialog-close]', dialog).forEach((b) => on(b, 'click', () => dialog.close()));
      // Click on the empty backdrop area closes
      on(dialog, 'click', (e) => { if (e.target === dialog) dialog.close(); });
    });
  }

  /* 12. Gallery lightbox */
  function initGallery() {
    const items = $$('[data-gallery-item]');
    const dialog = $('[data-lightbox]');
    if (!items.length || !dialog) return;

    const img = $('[data-lightbox-img]', dialog);
    const caption = $('[data-lightbox-caption]', dialog);
    const count = $('[data-lightbox-count]', dialog);
    let index = 0;

    const show = (i, dir = 0) => {
      index = (i + items.length) % items.length;
      const item = items[index];
      const thumb = $('img', item);
      img.src = item.dataset.full;
      img.alt = thumb.alt;
      caption.textContent = thumb.alt;
      count.textContent = `${index + 1} of ${items.length}`;
      if (MOTION && dir) ctx.add(() => gsap.fromTo(img, { autoAlpha: 0, x: 30 * dir }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out' }));
    };

    items.forEach((item, i) => {
      item.setAttribute('aria-label', `View photo: ${$('img', item).alt}`);
      on(item, 'click', () => { show(i); openDialog(dialog); });
    });
    on($('[data-lightbox-prev]', dialog), 'click', () => show(index - 1, -1));
    on($('[data-lightbox-next]', dialog), 'click', () => show(index + 1, 1));
    on(dialog, 'keydown', (e) => {
      if (e.key === 'ArrowLeft') show(index - 1, -1);
      if (e.key === 'ArrowRight') show(index + 1, 1);
    });
    on(dialog, 'close', () => items[index].focus({ preventScroll: true }));

    // Swipe on touch screens
    let startX = null;
    on(dialog, 'touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    on(dialog, 'touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      startX = null;
    });
  }

  /* 13. YouTube player dialog (loads the iframe only on demand) */
  function initVideoPlayer() {
    const dialog = $('[data-video-dialog]');
    if (!dialog) return;
    const frame = $('[data-video-frame]', dialog);
    const heading = $('[data-video-title]', dialog);
    let opener = null;

    // One delegated listener serves film cards and dignitary buttons alike.
    on(root, 'click', (e) => {
      const btn = e.target.closest('[data-video]');
      if (!btn) return;
      opener = btn;
      const { video: id, title } = btn.dataset;
      heading.textContent = title || 'Convocation film';
      frame.title = title || 'Convocation film';
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      openDialog(dialog);
    });

    on(dialog, 'close', () => {
      frame.src = 'about:blank'; // stop playback
      opener?.focus({ preventScroll: true });
    });
  }

  /* 14. Magnetic buttons (fine pointers only) */
  function initMagnetic() {
    if (!FINE_POINTER) return;
    $$('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      on(el, 'pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      on(el, 'pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  /* The scroll cue (styles.css `.scroll-cue::after { animation: scroll-cue 2.2s var(--ease-expo) infinite }`) */
  function initCue() {
    const dash = $('[data-cue-dash]');
    if (!dash || !dash.animate || !MOTION) return;
    anims.push(dash.animate(
      [{ transform: 'translateY(-100%)', offset: 0 }, { transform: 'translateY(100%)', offset: 0.6 }, { transform: 'translateY(100%)', offset: 1 }],
      { duration: 2200, easing: EXPO, iterations: Infinity },
    ));
  }

  /* Three.js confetti — loaded on demand, independent of the boot sequence (reference: a separate
     module script). */
  let disposeConfetti = null;
  function loadConfetti() {
    import('./heroScene')
      .then(({ startConfetti }) => {
        if (disposed) return;
        disposeConfetti = startConfetti({
          canvas: $('[data-confetti]'),
          fallback: $('[data-confetti-fallback]'),
          hero: $('[data-hero]'),
          released: 'intro' in root.dataset,
        });
      })
      .catch(() => { /* decorative only */ });
  }

  /* Boot */
  async function boot() {
    initSmoothScroll();
    lockScroll();
    preloaderAnimations();
    initCue();

    // UI that must work regardless of motion
    initMenu();
    initDialogs();
    initGallery();
    initVideoPlayer();

    // Wait for fonts before measuring type (hero fit, line splits)
    if (document.fonts) await document.fonts.ready.catch(() => {});
    if (disposed) return;
    // Pinned sections first, top to bottom: triggers further down the page must be
    // measured with the pin spacers of the hero and chapters already in place.
    let playIntro = () => {};
    ctx.add(() => {
      playIntro = initHero();
      initChapters();
      initHeader();
      initMarquee();
      if (MOTION) {
        initTextReveals();
        initStatement();
        initImageMotion();
        initMagnetic();
      }
    });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    await runPreloader();
    if (disposed) return;
    unlockScroll();
    playIntro();

    // Layout can shift as lazy images decode; keep trigger positions honest.
    on(window, 'load', () => ScrollTrigger.refresh());
    // Honour a deep link like #films after pins have been measured
    if (location.hash && location.hash.length > 1) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) requestAnimationFrame(() => { if (!disposed) scrollToTarget(target); });
    }

    if (!MOTION) { root.dataset.intro = ''; window.dispatchEvent(new CustomEvent('convocation:intro')); }
  }

  loadConfetti();
  boot();

  return function dispose() {
    disposed = true;
    timers.forEach(clearTimeout);
    offs.forEach((off) => off());
    tickers.forEach((fn) => gsap.ticker.remove(fn));
    anims.forEach((a) => a.cancel());
    menuTl?.kill();
    mms.forEach((mm) => mm.revert());
    ctx.revert();
    if (disposeConfetti) disposeConfetti();
    if (lenis) lenis.destroy();
    releaseLoading();
    // Leave the DOM as React rendered it, in case the same nodes are mounted again (StrictMode /
    // Fast Refresh re-run effects without recreating the DOM).
    delete root.dataset.intro;
    if (header) { delete header.dataset.scrolled; delete header.dataset.hidden; }
    const pre = $('#preloader');
    if (pre) pre.style.display = '';
    if (menu) menu.hidden = true;
    if (menuBtn) { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Open menu'); }
    gsap.ticker.lagSmoothing(500, 33);
    gsap.defaults({ ease: 'power1.out' });
    ScrollTrigger.config({ ignoreMobileResize: false });
  };
}
