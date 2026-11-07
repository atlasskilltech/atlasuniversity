'use client';

import { useEffect, useRef } from 'react';
import { createCarousel } from './swiperLite';

/*
 * The runtime behaviour of the /lp/* 2027 landing pages — each reference page's own `main.js`
 * (and its Swiper 11 / Bootstrap-free UI) re-expressed against the generated markup.
 *
 * The page markup is server-rendered; this component renders a hidden marker, finds its page root
 * (`[data-lp]`) and wires the behaviours in an effect. State the reference expresses by toggling a
 * class (`nav-active`, Tailwind's `hidden`, `active`…) is toggled here as an `lps-<state>` marker on
 * the elements the generator tagged `data-lpt="<state>"`; the generator compiled the reference CSS for
 * each state into `[&.lps-<state>]:` / `[.lps-<state>_&]:` variants, so the marker reproduces the
 * reference's own styling of that state. Attribute-driven state (`aria-selected`, `hidden`,
 * `disabled`, `aria-current`) is set as the reference sets it.
 *
 * Keyframe animations the reference declares in CSS (`animation:` on an element, `@keyframes` in a
 * sheet) are run through the Web Animations API from `data-lpanim` + the page's KEYFRAMES.
 */

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollBehaviour = () => (reduce() ? 'auto' : 'smooth');

function listen(cleanups, el, ev, fn, opts) {
  if (!el) return;
  el.addEventListener(ev, fn, opts);
  cleanups.push(() => el.removeEventListener(ev, fn, opts));
}

function setState(root, name, on, scope) {
  (scope || root).querySelectorAll(`[data-lpt~="${name}"]`).forEach((el) => el.classList.toggle(`lps-${name}`, on));
  if (scope && scope.matches(`[data-lpt~="${name}"]`)) scope.classList.toggle(`lps-${name}`, on);
}

function ms(v) {
  if (!v) return 0;
  const s = String(v).split(',')[0].trim();
  return s.endsWith('ms') ? parseFloat(s) : parseFloat(s) * 1000;
}

/* ------------------------------------------------------------ CSS keyframe animations */
function runAnimations(root, keyframes, cleanups) {
  if (!keyframes) return;
  root.querySelectorAll('[data-lpanim]').forEach((el) => {
    let spec;
    try {
      spec = JSON.parse(el.getAttribute('data-lpanim'));
    } catch {
      return;
    }
    const name = (spec.name || '').split(',')[0].trim();
    const frames = keyframes[name];
    if (!frames || reduce()) return;
    const it = spec['iteration-count'];
    const anim = el.animate(
      frames.map((f) => ({ ...f })),
      {
        duration: ms(spec.duration),
        delay: ms(spec.delay),
        easing: spec['timing-function'] || 'ease',
        iterations: it === 'infinite' ? Infinity : parseFloat(it || '1'),
        direction: spec.direction || 'normal',
        fill: spec['fill-mode'] && spec['fill-mode'] !== 'none' ? spec['fill-mode'] : 'auto',
      },
    );
    if (spec.pauseOnHover) {
      listen(cleanups, el, 'pointerenter', () => anim.pause());
      listen(cleanups, el, 'pointerleave', () => anim.play());
    }
    cleanups.push(() => anim.cancel());
  });
}

/* ------------------------------------------------------------ Tailwind-page mobile menu */
function mobileMenu(root, cleanups, { outsideClose = false } = {}) {
  const toggle = root.querySelector('#menu-toggle');
  const menu = root.querySelector('#mobile-menu');
  if (!toggle || !menu) return;
  const set = (open) => {
    setState(root, 'open', open);
    toggle.setAttribute('aria-expanded', String(open));
    const sr = toggle.querySelector('.lpm-sr-only') || Array.from(toggle.children).find((c) => c.tagName === 'SPAN');
    if (sr && /menu/i.test(sr.textContent)) sr.textContent = open ? 'Close menu' : 'Open menu';
    else toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  listen(cleanups, toggle, 'click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  listen(cleanups, menu, 'click', (e) => {
    if (e.target.closest('a')) set(false);
  });
  if (outsideClose) {
    listen(cleanups, document, 'click', (e) => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      set(false);
    });
  }
  listen(cleanups, document, 'keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      set(false);
      toggle.focus();
    }
  });
  const mq = window.matchMedia('(min-width: 1024px)');
  const onMq = (m) => m.matches && set(false);
  mq.addEventListener('change', onMq);
  cleanups.push(() => mq.removeEventListener('change', onMq));
}

/* ------------------------------------------------------------ NoPaperForms loader (bdes / btech / isme-ug) */
const NPF = 'https://widgets.in5.nopaperforms.com/emwgts.js';
function noPaperForms(root) {
  if (!root.querySelector('.npf_wgts')) return;
  if (document.querySelector(`script[src="${NPF}"]`)) return;
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = NPF;
  document.body.appendChild(s);
}

/* ------------------------------------------------------------ PHP landing pages (bdes / btech / isme-ug) */
/* the three pages ship byte-identical `assets/images/icon/humburger-cross.svg`; one copy is kept */
const HUMBURGER_CROSS = '/assets/lp/bdes/assets/images/icon/humburger-cross.svg';
const PHP_SWIPERS = {
  bdes: {
    v2: { slidesPerView: 1, spaceBetween: 30 },
    v3: { slidesPerView: 1, spaceBetween: 30, breakpoints: { 576: { slidesPerView: 3, spaceBetween: 20 }, 768: { slidesPerView: 4, spaceBetween: 40 }, 1024: { slidesPerView: 4, spaceBetween: 50 } } },
  },
  btech: {
    v2: { slidesPerView: 1, spaceBetween: 30, breakpoints: { 576: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 2, spaceBetween: 40 }, 1024: { slidesPerView: 2, spaceBetween: 50 } } },
    v3: { slidesPerView: 1, spaceBetween: 30, breakpoints: { 576: { slidesPerView: 3, spaceBetween: 20 }, 768: { slidesPerView: 4, spaceBetween: 40 }, 1024: { slidesPerView: 4, spaceBetween: 50 } } },
  },
  isme: {
    v2: { slidesPerView: 1, spaceBetween: 30, breakpoints: { 576: { slidesPerView: 3, spaceBetween: 20 }, 768: { slidesPerView: 3, spaceBetween: 40 }, 1024: { slidesPerView: 3, spaceBetween: 50 } } },
  },
};

function phpPage(variant) {
  return (root, cleanups) => {
    // header navigation — openNavigation() in assets/js/main.js
    const burger = root.querySelector('.lpm-humburger');
    const icon = burger && burger.querySelector('img');
    if (burger) {
      burger.style.cursor = burger.style.cursor || '';
      listen(cleanups, burger, 'click', () => {
        const nav = root.querySelector('[data-lpt~="nav"]');
        if (!nav) return;
        const on = !nav.classList.contains('lps-nav');
        setState(root, 'nav', on);
        if (icon) {
          if (!icon.dataset.lpOpen) icon.dataset.lpOpen = icon.getAttribute('src');
          icon.setAttribute('src', on ? HUMBURGER_CROSS : icon.dataset.lpOpen);
        }
      });
    }
    // in-page navigation scrolls smoothly — scrollToSection()
    root.querySelectorAll('nav ul li a').forEach((a) => {
      listen(cleanups, a, 'click', (e) => {
        const href = a.getAttribute('href') || '';
        if (!href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
    // "Apply Now" go-to-top button — shown after 300px of scroll
    const top = root.querySelector('#goTopBtn');
    if (top) {
      const onScroll = () => {
        top.style.display = document.documentElement.scrollTop > 300 || document.body.scrollTop > 300 ? 'block' : 'none';
      };
      listen(cleanups, window, 'scroll', onScroll, { passive: true });
      listen(cleanups, top, 'click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    }
    // Swiper carousels
    const conf = PHP_SWIPERS[variant] || {};
    [['v2', '.lpm-mySwiperv2'], ['v3', '.lpm-mySwiperv3']].forEach(([key, sel]) => {
      if (!conf[key]) return;
      root.querySelectorAll(sel).forEach((el) => {
        const c = createCarousel(el, {
          ...conf[key],
          loop: true,
          autoplay: { delay: 2500 },
          pagination: el.querySelector('.lpm-swiper-pagination'),
          nextEl: el.querySelector('.lpm-swiper-button-next'),
          prevEl: el.querySelector('.lpm-swiper-button-prev'),
        });
        if (c) cleanups.push(() => c.destroy());
      });
    });
    // isme-ug accordion — the `accordion-itemv2` script in main.js
    const items = Array.from(root.querySelectorAll('.lpm-accordion-itemv2'));
    items.forEach((item) => {
      listen(cleanups, item, 'click', () => {
        const was = item.classList.contains('lps-acc');
        items.forEach((i) => setState(root, 'acc', false, i));
        if (!was) setState(root, 'acc', true, item);
      });
    });
    noPaperForms(root);
  };
}

/* ------------------------------------------------------------ bdes-ug-programs-2027 */
function bdes27(root, cleanups) {
  mobileMenu(root, cleanups);
  root.querySelectorAll('[data-marquee]').forEach((el) => {
    const gap = parseFloat(el.getAttribute('data-marquee-gap')) || 0;
    const gapXl = el.hasAttribute('data-marquee-gap-xl') ? parseFloat(el.getAttribute('data-marquee-gap-xl')) : gap;
    const speed = parseFloat(el.getAttribute('data-marquee-speed')) || 40;
    const c = createCarousel(el, {
      mode: 'continuous',
      slidesPerView: 'auto',
      spaceBetween: gap,
      breakpoints: { 1280: { spaceBetween: gapXl } },
      pxPerSecond: el.getAttribute('data-marquee-direction') === 'right' ? -speed : speed,
    });
    if (c) cleanups.push(() => c.destroy());
  });
  root.querySelectorAll('[data-campus-carousel]').forEach((wrap) => {
    const slider = wrap.querySelector('.lpm-swiper');
    const bars = wrap.querySelector('[data-campus-bars]');
    const count = slider ? slider.querySelectorAll('.lpm-swiper-slide').length : 0;
    const c = createCarousel(slider, {
      mode: 'fade',
      speed: 700,
      autoplay: { delay: 10000, pauseOnMouseEnter: true },
      prevEl: wrap.querySelector('[data-campus-prev]'),
      nextEl: wrap.querySelector('[data-campus-next]'),
      pagination: bars,
      bulletTag: 'button',
      bulletLabel: (i) => `Show campus photo ${i + 1} of ${count}`,
    });
    if (c) {
      listen(cleanups, wrap, 'focusin', () => c.pause());
      listen(cleanups, wrap, 'focusout', (e) => !wrap.contains(e.relatedTarget) && c.resume());
      cleanups.push(() => c.destroy());
    }
  });
}

/* ------------------------------------------------------------ ugdx-ug-programs-2027 (+v2) */
const RAIL_AUTOPLAY = { programs: 3600, industry: 3000, advisory: 3200, voices: 4800 };
function ugdx27(root, cleanups) {
  mobileMenu(root, cleanups, { outsideClose: true });
  /* the page's `html { scroll-padding-top: 64px }` (88px from 1024) keeps anchor targets clear of the
     sticky header — <html> is the root layout's, so it is set while this page is mounted */
  const html = document.documentElement;
  const prevPad = html.style.scrollPaddingTop;
  const mqPad = window.matchMedia('(min-width: 1024px)');
  const pad = () => { html.style.scrollPaddingTop = mqPad.matches ? '88px' : '64px'; };
  pad();
  mqPad.addEventListener('change', pad);
  cleanups.push(() => { mqPad.removeEventListener('change', pad); html.style.scrollPaddingTop = prevPad; });
  root.querySelectorAll('.lpm-swiper[data-swiper]').forEach((el) => {
    const key = el.getAttribute('data-swiper');
    const gap = parseInt(el.getAttribute('data-swiper-gap'), 10) || 16;
    const prevEl = root.querySelector(`[data-swiper-prev="${key}"]`);
    const nextEl = root.querySelector(`[data-swiper-next="${key}"]`);
    let c;
    if (key === 'campus') {
      const bars = root.querySelector('[data-campus-bars]');
      const count = el.querySelectorAll('.lpm-swiper-slide').length;
      c = createCarousel(el, {
        mode: 'fade',
        speed: 600,
        autoplay: { delay: 6000, pauseOnMouseEnter: true },
        prevEl,
        nextEl,
        pagination: bars,
        bulletTag: 'button',
        bulletLabel: (i) => `Show campus photo ${i + 1} of ${count}`,
      });
    } else if (key.indexOf('brands') === 0) {
      const pxs = parseInt(el.getAttribute('data-swiper-speed'), 10) || 50;
      c = createCarousel(el, {
        mode: 'continuous',
        slidesPerView: 'auto',
        spaceBetween: gap,
        pxPerSecond: el.getAttribute('data-swiper-direction') === 'right' ? -pxs : pxs,
      });
    } else {
      c = createCarousel(el, {
        slidesPerView: 'auto',
        spaceBetween: gap,
        loop: true,
        speed: 700,
        autoplay: { delay: RAIL_AUTOPLAY[key] || 3500, pauseOnMouseEnter: true },
        prevEl,
        nextEl,
      });
    }
    if (c) cleanups.push(() => c.destroy());
  });
}

/* ------------------------------------------------------------ isme-ug-programs-2027 (+v2): js/main.js */
function isme27(root, cleanups) {
  mobileMenu(root, cleanups);
  const carousels = [];
  const STEP_DELAY = 3500;
  const SCROLL_SPEED = 35;
  const TOUCH_RESUME = 3000;

  function setupAutoplay(sec, tracks, activeTrack, mode) {
    let hovered = false;
    let focused = false;
    let touching = false;
    let inView = false;
    let touchTimer = null;
    let holdUntil = 0;
    let sync = () => {};
    const canRun = () => !hovered && !focused && !touching && inView && !reduce() && !document.hidden;
    tracks.forEach((track) => {
      listen(cleanups, track, 'pointerenter', (e) => {
        if (e.pointerType === 'mouse') { hovered = true; sync(); }
      });
      listen(cleanups, track, 'pointerleave', (e) => {
        if (e.pointerType === 'mouse') { hovered = false; sync(); }
      });
      listen(cleanups, track, 'focusin', (e) => {
        let kb = true;
        try { kb = e.target.matches(':focus-visible'); } catch { /* */ }
        if (kb) { focused = true; sync(); }
      });
      listen(cleanups, track, 'focusout', () => { focused = false; sync(); });
      listen(cleanups, track, 'touchstart', () => { clearTimeout(touchTimer); touching = true; sync(); }, { passive: true });
      listen(cleanups, track, 'touchend', () => {
        clearTimeout(touchTimer);
        touchTimer = setTimeout(() => { touching = false; sync(); }, TOUCH_RESUME);
      }, { passive: true });
    });
    listen(cleanups, document, 'visibilitychange', () => sync());
    const io = new IntersectionObserver((entries) => { inView = entries[0].isIntersecting; sync(); }, { threshold: 0.25 });
    io.observe(sec);
    cleanups.push(() => io.disconnect());

    if (mode === 'step') {
      let timer = null;
      const advance = () => {
        const track = activeTrack();
        if (!track) return;
        const item = track.querySelector('li');
        if (!item) return;
        const gap = parseFloat(getComputedStyle(item.parentElement).columnGap) || 0;
        const size = item.getBoundingClientRect().width + gap;
        const max = track.scrollWidth - track.clientWidth;
        if (max <= 4) return;
        if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
        else track.scrollTo({ left: Math.min(max, (Math.round(track.scrollLeft / size) + 1) * size), behavior: 'smooth' });
      };
      sync = () => {
        clearTimeout(timer);
        timer = null;
        if (!canRun()) return;
        timer = setTimeout(function tick() {
          advance();
          timer = setTimeout(tick, STEP_DELAY);
        }, STEP_DELAY);
      };
      cleanups.push(() => clearTimeout(timer));
      sync();
      return sync;
    }
    const track = tracks[0];
    const list = track && track.querySelector('ul');
    if (!list) return null;
    const originals = Array.from(list.children);
    originals.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('data-carousel-clone', '');
      list.appendChild(clone);
    });
    cleanups.push(() => list.querySelectorAll('[data-carousel-clone]').forEach((c) => c.remove()));
    const loopWidth = () => list.children[originals.length].offsetLeft - originals[0].offsetLeft;
    let frame = null;
    let last = 0;
    let pos = 0;
    const loop = (now) => {
      frame = requestAnimationFrame(loop);
      const dt = Math.min(now - last, 100);
      last = now;
      if (now < holdUntil) { pos = track.scrollLeft; return; }
      if (Math.abs(track.scrollLeft - pos) > 2) pos = track.scrollLeft;
      pos += (SCROLL_SPEED * dt) / 1000;
      const w = loopWidth();
      if (w > 0 && pos >= w) pos -= w;
      track.scrollLeft = pos;
    };
    sync = () => {
      if (canRun()) {
        if (frame === null) {
          pos = track.scrollLeft;
          last = performance.now();
          frame = requestAnimationFrame(loop);
        }
      } else if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };
    cleanups.push(() => frame !== null && cancelAnimationFrame(frame));
    sync();
    return () => { holdUntil = performance.now() + 900; sync(); };
  }

  root.querySelectorAll('[data-carousel]').forEach((sec) => {
    const prev = sec.querySelector('[data-carousel-prev]');
    const next = sec.querySelector('[data-carousel-next]');
    const tracks = sec.querySelectorAll('[data-carousel-track]');
    const activeTrack = () => Array.from(tracks).find((t) => t.offsetParent !== null) || null;
    const step = (track) => {
      const item = track.querySelector('li');
      if (!item) return track.clientWidth;
      const gap = parseFloat(getComputedStyle(item.parentElement).columnGap) || 0;
      const size = item.getBoundingClientRect().width + gap;
      return Math.max(size, Math.floor(track.clientWidth / size) * size);
    };
    const update = () => {
      const track = activeTrack();
      if (!track || !prev || !next) return;
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
    };
    const move = (dir) => {
      const track = activeTrack();
      if (track) track.scrollBy({ left: dir * step(track), behavior: scrollBehaviour() });
    };
    listen(cleanups, prev, 'click', () => move(-1));
    listen(cleanups, next, 'click', () => move(1));
    tracks.forEach((t) => listen(cleanups, t, 'scroll', update, { passive: true }));
    const auto = sec.dataset.carouselAutoplay;
    const restart = auto ? setupAutoplay(sec, tracks, activeTrack, auto) : null;
    if (restart) {
      listen(cleanups, prev, 'click', restart);
      listen(cleanups, next, 'click', restart);
    }
    carousels.push(() => { update(); if (restart) restart(); });
    requestAnimationFrame(update);
  });
  const updateCarousels = () => carousels.forEach((u) => u());
  listen(cleanups, window, 'resize', updateCarousels);

  // tabs (program type + four-year journey tracks)
  const activateTab = (tab, focus) => {
    const list = tab.closest('[role="tablist"]');
    list.querySelectorAll('[role="tab"]').forEach((other) => {
      const sel = other === tab;
      other.setAttribute('aria-selected', String(sel));
      other.tabIndex = sel ? 0 : -1;
      const panel = document.getElementById(other.getAttribute('aria-controls'));
      if (panel) panel.hidden = !sel;
    });
    if (focus) tab.focus();
    updateCarousels();
  };
  root.querySelectorAll('[role="tablist"]').forEach((list) => {
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
    tabs.forEach((tab, index) => {
      listen(cleanups, tab, 'click', () => activateTab(tab, false));
      listen(cleanups, tab, 'keydown', (e) => {
        let t = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') t = tabs[(index + 1) % tabs.length];
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') t = tabs[(index - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') t = tabs[0];
        else if (e.key === 'End') t = tabs[tabs.length - 1];
        if (t) { e.preventDefault(); activateTab(t, true); }
      });
    });
  });
  root.querySelectorAll('[data-journey-tab]').forEach((link) => {
    listen(cleanups, link, 'click', () => {
      const tab = document.getElementById(link.dataset.journeyTab);
      if (tab) activateTab(tab, false);
    });
  });

  // campus photo slider
  root.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-slider-track]');
    const slides = track.children;
    const dotsWrap = slider.querySelector('[data-slider-dots]');
    const dots = [];
    let current = 0;
    let timer = null;
    let paused = false;
    let inView = false;
    const goTo = (i) => {
      current = (i + slides.length) % slides.length;
      track.scrollTo({ left: current * track.clientWidth, behavior: scrollBehaviour() });
    };
    const render = () => {
      dots.forEach((dot, i) => {
        const active = i === current;
        dot.setAttribute('aria-current', active ? 'true' : 'false');
        dot.firstChild.className = 'block h-[3px] w-3 n640:h-1 n640:w-5 ' + (active ? 'bg-white' : 'bg-white/40');
      });
    };
    Array.from(slides).forEach((s, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'flex h-8 items-center px-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white';
      dot.setAttribute('aria-label', `Show photo ${i + 1} of ${slides.length}`);
      dot.appendChild(document.createElement('span'));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
    cleanups.push(() => dots.forEach((d) => d.remove()));
    render();
    let st;
    listen(cleanups, track, 'scroll', () => {
      clearTimeout(st);
      st = setTimeout(() => {
        current = Math.round(track.scrollLeft / track.clientWidth);
        render();
      }, 60);
    }, { passive: true });
    listen(cleanups, slider.querySelector('[data-slider-prev]'), 'click', () => goTo(current - 1));
    listen(cleanups, slider.querySelector('[data-slider-next]'), 'click', () => goTo(current + 1));
    listen(cleanups, window, 'resize', () => track.scrollTo({ left: current * track.clientWidth, behavior: 'auto' }));
    const sync = () => {
      clearInterval(timer);
      timer = null;
      if (!paused && inView && !reduce() && !document.hidden) timer = setInterval(() => goTo(current + 1), 5000);
    };
    const pause = () => { paused = true; sync(); };
    const resume = () => { paused = false; sync(); };
    listen(cleanups, slider, 'mouseenter', pause);
    listen(cleanups, slider, 'mouseleave', resume);
    listen(cleanups, slider, 'focusin', pause);
    listen(cleanups, slider, 'focusout', resume);
    listen(cleanups, track, 'touchstart', pause, { passive: true });
    listen(cleanups, document, 'visibilitychange', sync);
    const io = new IntersectionObserver((e) => { inView = e[0].isIntersecting; sync(); }, { threshold: 0.4 });
    io.observe(slider);
    cleanups.push(() => { io.disconnect(); clearInterval(timer); });
  });

  // sticky Apply Now CTA — hidden while an enquiry form is on screen
  const cta = root.querySelector('[data-sticky-cta]');
  const forms = Array.from(root.querySelectorAll('[data-crm-slot]')).map((s) => s.parentElement);
  if (cta && forms.length) {
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
      const hide = visible.size > 0;
      setState(root, 'cta', hide, cta);
      if (hide) cta.setAttribute('tabindex', '-1');
      else cta.removeAttribute('tabindex');
      cta.setAttribute('aria-hidden', String(hide));
    }, { threshold: 0 });
    forms.forEach((f) => io.observe(f));
    cleanups.push(() => io.disconnect());
  }

  // CRM widget height: room for the validation state once the frame has focus
  listen(cleanups, window, 'blur', () => {
    const a = document.activeElement;
    if (!a || a.tagName !== 'IFRAME') return;
    const slot = a.closest('[data-crm-slot]');
    if (slot) setState(root, 'engaged', true, slot);
  });
  // CRM fallback notice if the embed renders nothing
  const fb = setTimeout(() => {
    root.querySelectorAll('[data-crm-slot]').forEach((slot) => {
      if (slot.querySelector('.atlas-embed-wrap, iframe')) return;
      setState(root, 'empty', true, slot);
      const notice = slot.querySelector('[data-crm-fallback]');
      if (notice) setState(root, 'shown', true, notice);
    });
  }, 4000);
  cleanups.push(() => clearTimeout(fb));
}

const KINDS = {
  'php-bdes': phpPage('bdes'),
  'php-btech': phpPage('btech'),
  'php-isme': phpPage('isme'),
  bdes27,
  ugdx27,
  isme27,
  btechv2: (root, cleanups) => mobileMenu(root, cleanups),
  anim: () => {},
  none: () => {},
};

export default function LpBehaviors({ kind, keyframes }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current && ref.current.closest('[data-lp]');
    if (!root) return undefined;
    const cleanups = [];
    runAnimations(root, keyframes, cleanups);
    (KINDS[kind] || KINDS.none)(root, cleanups);
    return () => cleanups.forEach((f) => f());
  }, [kind, keyframes]);
  return <span ref={ref} hidden />;
}
