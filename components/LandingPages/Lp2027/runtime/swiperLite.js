/*
 * A small DOM carousel engine standing in for Swiper 11 on the /lp/* 2027 landing pages.
 *
 * The reference pages run Swiper over server-rendered `.swiper > .swiper-wrapper > .swiper-slide`
 * markup; the generated components render that same markup (with `lpm-swiper*` marker classes), so this
 * engine drives it the way Swiper does — inline `width` / `margin-right` on the slides, an inline
 * `transform` on the wrapper, bullets built from the reference's own bullet classes (handed over on the
 * pagination element as `data-lp-bullet` / `data-lp-bullet-active`), arrows, autoplay, loop and drag.
 *
 * Modes:
 *   'slide'      Swiper's default effect (numeric or 'auto' slidesPerView, breakpoints, loop)
 *   'fade'       Swiper's fade effect with crossFade
 *   'continuous' an even, endless glide at `pxPerSecond` (Swiper's delay-0 autoplay tickers / marquees)
 */

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function bp(opts) {
  let o = { slidesPerView: opts.slidesPerView ?? 1, spaceBetween: opts.spaceBetween ?? 0 };
  const w = window.innerWidth;
  Object.keys(opts.breakpoints || {})
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((min) => {
      if (w >= min) o = { ...o, ...opts.breakpoints[min] };
    });
  return o;
}

export function createCarousel(root, opts = {}) {
  const wrapper = opts.wrapper || root.querySelector(':scope > .lpm-swiper-wrapper') || root.querySelector('.lpm-swiper-wrapper');
  if (!wrapper) return null;
  const mode = opts.mode || 'slide';
  const speed = opts.speed ?? 300;
  const originals = Array.from(wrapper.children);
  const n = originals.length;
  if (!n) return null;
  let slides = originals.slice();
  let index = 0; // index into `slides`
  let timer = null;
  let raf = null;
  let hovered = false;
  let offscreen = false;
  let destroyed = false;
  let offset = 0; // continuous mode
  let setWidth = 0;
  let bullets = [];
  const cleanups = [];
  const on = (el, ev, fn, o) => {
    if (!el) return;
    el.addEventListener(ev, fn, o);
    cleanups.push(() => el.removeEventListener(ev, fn, o));
  };

  /* ---------------- clones for loop / continuous ---------------- */
  const loop = mode !== 'fade' && (opts.loop || mode === 'continuous') && n > 1;
  let before = 0;
  function cloneSet() {
    return originals.map((s) => {
      const c = s.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.setAttribute('data-lp-clone', '');
      c.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((x) => x.setAttribute('tabindex', '-1'));
      return c;
    });
  }
  if (loop && mode !== 'continuous') {
    const sets = Math.max(1, opts.loopSets || 1);
    for (let k = 0; k < sets; k++) {
      const pre = cloneSet();
      pre.reverse().forEach((c) => wrapper.insertBefore(c, wrapper.firstChild));
      cloneSet().forEach((c) => wrapper.appendChild(c));
    }
    slides = Array.from(wrapper.children);
    before = n * sets;
    index = before;
  }
  /* continuous: copies only after the originals, as many as the strip needs to stay filled */
  function fillContinuous() {
    if (mode !== 'continuous' || n < 1) return;
    let guard = 0;
    const need = () => {
      const last = slides[slides.length - 1];
      return last.offsetLeft + last.offsetWidth - slides[0].offsetLeft < setWidth + root.clientWidth + 50;
    };
    while (setWidth > 0 && need() && guard < 12) {
      cloneSet().forEach((c) => wrapper.appendChild(c));
      slides = Array.from(wrapper.children);
      guard++;
    }
  }

  /* ---------------- layout ---------------- */
  let cur = bp(opts);
  function layout() {
    cur = bp(opts);
    const space = Number(cur.spaceBetween) || 0;
    const spv = cur.slidesPerView;
    const cs = getComputedStyle(root);
    const w = root.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    slides.forEach((s) => {
      if (mode === 'fade') {
        s.style.width = w + 'px';
        return;
      }
      if (spv !== 'auto') s.style.width = (w - space * (spv - 1)) / spv + 'px';
      if (opts.rtl) s.style.marginLeft = space + 'px';
      else s.style.marginRight = space + 'px';
    });
    if (mode === 'fade') {
      slides.forEach((s, i) => {
        s.style.transform = `translate3d(${-i * w}px, 0px, 0px)`;
        s.style.transitionDuration = speed + 'ms';
      });
    }
    if (mode === 'continuous') {
      setWidth = 0;
      for (let i = before; i < before + n; i++) setWidth += slides[i].offsetWidth + space;
    }
  }

  function pos(i) {
    return slides[i] ? slides[i].offsetLeft - slides[0].offsetLeft : 0;
  }
  function maxTranslate() {
    const last = slides[slides.length - 1];
    const total = last.offsetLeft - slides[0].offsetLeft + last.offsetWidth;
    const cs = getComputedStyle(root);
    return Math.max(0, total - (root.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)));
  }
  function setTranslate(x, dur) {
    wrapper.style.transitionDuration = (dur || 0) + 'ms';
    wrapper.style.transform = `translate3d(${opts.rtl ? x : -x}px, 0px, 0px)`;
  }
  function realIndex() {
    return loop ? (((index - before) % n) + n) % n : index;
  }

  /* ---------------- slide / fade ---------------- */
  function snaps() {
    if (loop || mode === 'fade') return n;
    const m = maxTranslate();
    let c = 0;
    for (let i = 0; i < slides.length; i++) {
      c = i + 1;
      if (pos(i) >= m) break;
    }
    return c;
  }
  function render(dur) {
    if (mode === 'fade') {
      slides.forEach((s, i) => {
        s.style.opacity = i === index ? '1' : '0';
        s.style.pointerEvents = i === index ? 'auto' : 'none';
      });
    } else {
      const x = loop ? pos(index) : Math.min(pos(index), maxTranslate());
      setTranslate(x, dur);
    }
    const r = realIndex();
    bullets.forEach((b, i) => {
      b.className = i === r ? b.dataset.active : b.dataset.idle;
    });
    if (opts.onChange) opts.onChange(r);
  }
  function fixLoop() {
    if (!loop) return;
    if (index < before) index += n;
    else if (index >= before + n) index -= n;
    render(0);
  }
  function slideTo(i, dur = speed) {
    if (mode === 'fade') {
      index = ((i % n) + n) % n;
    } else if (loop) {
      index = i;
    } else {
      index = Math.max(0, Math.min(i, snaps() - 1));
    }
    render(dur);
    if (loop) {
      clearTimeout(slideTo.t);
      slideTo.t = setTimeout(fixLoop, dur + 20);
    }
    schedule();
  }
  const next = () => {
    if (mode === 'fade' || loop) slideTo(index + 1);
    else slideTo(index + 1 >= snaps() ? 0 : index + 1);
  };
  const prev = () => {
    if (mode === 'fade' || loop) slideTo(index - 1);
    else slideTo(index - 1 < 0 ? snaps() - 1 : index - 1);
  };
  const goReal = (r) => slideTo(loop ? before + r : r);

  /* ---------------- autoplay ---------------- */
  function schedule() {
    clearTimeout(timer);
    timer = null;
    if (mode === 'continuous' || !opts.autoplay || reduceMotion()) return;
    if ((opts.autoplay.pauseOnMouseEnter && hovered) || offscreen || document.hidden) return;
    timer = setTimeout(() => {
      if (opts.autoplay.reverse) prev();
      else next();
    }, opts.autoplay.delay ?? 3000);
  }

  /* ---------------- continuous ---------------- */
  let last = 0;
  function tick(t) {
    if (destroyed) return;
    const dt = last ? Math.min(64, t - last) : 0;
    last = t;
    if (!hovered && !dragging && !offscreen && !reduceMotion() && setWidth > 0) {
      offset += ((opts.pxPerSecond || 40) * dt) / 1000;
    }
    if (setWidth > 0) {
      while (offset >= setWidth) offset -= setWidth;
      while (offset < 0) offset += setWidth;
      setTranslate(pos(before) + offset, 0);
    }
    raf = requestAnimationFrame(tick);
  }

  /* ---------------- pagination / navigation ---------------- */
  function buildBullets() {
    const p = opts.pagination;
    if (!p) return;
    p.querySelectorAll('[data-lp-bullet-el]').forEach((b) => b.remove());
    bullets = [];
    const count = snaps();
    const idle = p.getAttribute('data-lp-bullet') || '';
    const active = p.getAttribute('data-lp-bullet-active') || idle;
    for (let i = 0; i < count; i++) {
      const b = document.createElement(opts.bulletTag || 'span');
      if (b.tagName === 'BUTTON') b.type = 'button';
      b.setAttribute('data-lp-bullet-el', '');
      b.dataset.idle = idle;
      b.dataset.active = active;
      b.className = idle;
      b.setAttribute('role', 'button');
      b.setAttribute('tabindex', '0');
      b.setAttribute('aria-label', opts.bulletLabel ? opts.bulletLabel(i, count) : `Go to slide ${i + 1}`);
      b.addEventListener('click', () => goReal(i));
      p.appendChild(b);
      bullets.push(b);
    }
  }
  if (opts.prevEl) on(opts.prevEl, 'click', (e) => { e.preventDefault(); prev(); });
  if (opts.nextEl) on(opts.nextEl, 'click', (e) => { e.preventDefault(); next(); });

  /* ---------------- hover / drag / visibility ---------------- */
  on(root, 'pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    hovered = true;
    if (mode !== 'continuous' && opts.autoplay && opts.autoplay.pauseOnMouseEnter) schedule();
  });
  on(root, 'pointerleave', (e) => {
    if (e.pointerType !== 'mouse') return;
    hovered = false;
    schedule();
  });
  let dragging = false;
  let startX = 0;
  let startT = 0;
  let moved = 0;
  if (opts.drag !== false && mode !== 'fade') {
    on(root, 'pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = 0;
      startX = e.clientX;
      const m = /translate3d\((-?[\d.]+)px/.exec(wrapper.style.transform || '');
      startT = m ? (opts.rtl ? 1 : -1) * parseFloat(m[1]) : 0;
      clearTimeout(timer);
    });
    on(window, 'pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved < 5) return;
      if (mode === 'continuous') {
        offset -= opts.rtl ? -dx : dx;
        startX = e.clientX;
        return;
      }
      setTranslate(startT - (opts.rtl ? -dx : dx), 0);
    });
    on(window, 'pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      if (mode === 'continuous' || moved < 5) {
        schedule();
        return;
      }
      const dx = (e.clientX - startX) * (opts.rtl ? -1 : 1);
      if (dx < -40) next();
      else if (dx > 40) prev();
      else render(speed);
    });
    on(root, 'click', (e) => {
      if (moved >= 5) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
    on(root, 'dragstart', (e) => e.preventDefault());
  }
  if (opts.fadeEl === undefined && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        offscreen = !entries[0].isIntersecting;
        schedule();
      },
      { rootMargin: '120px' },
    );
    io.observe(root);
    cleanups.push(() => io.disconnect());
  }
  const onVis = () => schedule();
  on(document, 'visibilitychange', onVis);
  const onResize = () => {
    layout();
    fillContinuous();
    layout();
    buildBullets();
    render(0);
  };
  on(window, 'resize', onResize);

  /* ---------------- start ---------------- */
  wrapper.style.transitionProperty = 'transform';
  if (opts.linear) wrapper.style.transitionTimingFunction = 'linear';
  layout();
  fillContinuous();
  layout();
  buildBullets();
  render(0);
  if (mode === 'continuous') raf = requestAnimationFrame(tick);
  else schedule();
  /* images may change auto widths once loaded */
  root.querySelectorAll('img').forEach((img) => {
    if (!img.complete) on(img, 'load', onResize, { once: true });
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => !destroyed && onResize());

  return {
    next,
    prev,
    goReal,
    get realIndex() {
      return realIndex();
    },
    pause() {
      hovered = true;
      schedule();
    },
    resume() {
      hovered = false;
      schedule();
    },
    destroy() {
      destroyed = true;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      cleanups.forEach((f) => f());
      wrapper.querySelectorAll('[data-lp-clone]').forEach((c) => c.remove());
    },
  };
}
