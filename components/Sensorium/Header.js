'use client';
/* eslint-disable @next/next/no-img-element -- static WebP exports with their own srcSet; next/image is not used for this standalone port */

/* Sensorium header - the Eona "standard" header, its sticky twin and the mobile header.
 *
 * Measured on production (atlasuniversity.edu.in/sensorium):
 *  >=1025  #qodef-page-header: 100px, white, padding 0 24px, logo (Artboard-1-copy-4.png) at max-height
 *          100%, menu right: li padding 0 24px (last 0), a = Montserrat 12px/20 500 .1em uppercase #000,
 *          1px currentColor underline (scaleX 0 -> 1 from the left) on hover and on the active anchor.
 *          The sticky header is a separate fixed 70px black bar (logo Group.png, white links) that slides
 *          in (.5s) once scrollY >= qodefStickyHeaderScrollAmount (1150 on the homepage, 350 elsewhere).
 *  <=1024  #qodef-page-mobile-header: 70px white, padding 0 24px, logo Group.png 30px tall, a three-line
 *          opener (27x19) that turns into an X; the menu drops below it (white, 34px 0 padding, items
 *          10px 0, border-bottom 1px #f2f2f2). It becomes fixed past 140px (2x its height) and slides
 *          back in only while scrolling up beyond 210px - eona-core.js showHideMobileHeader.
 *  Anchors: >1024 a click scrolls to the section minus the 100px header height (1000ms), 0 offset
 *          below; an item is active while its section is >=20% in view (main.js qodefAnchor).
 *
 * Deviations (recorded in the report):
 *  - The search opener and side-area opener widgets exist in the markup but production hides their
 *    holder (display:none at every width), so neither is ported; the side area itself is unreachable.
 *  - Production's "#starlight" hrefs are page-relative, so on item/category pages they lead nowhere;
 *    here they point at /sensorium#starlight etc. off the homepage.
 *  - Production marks an anchor active on first paint even at the top of the page (an in-view check
 *    that counts a section below the fold); here only a section actually in view is active.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { MONT } from '@/lib/sensorium/ui';

const LINK = `${MONT} text-[12px] leading-[20px] font-medium tracking-[0.1em] uppercase`;
const UNDER =
  "relative inline-block after:absolute after:left-0 after:bottom-[2px] after:h-px after:w-[calc(100%-1px)] after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-[cubic-bezier(.59,.02,.17,.95)] group-hover:after:scale-x-100";

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return y;
}

export default function Header({ nav, logos, isHome, stickyAmount }) {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const prevY = useRef(0);
  const [mobileShown, setMobileShown] = useState(false);

  /* mobile sticky logic, eona-core.js showHideMobileHeader (displayAmount = 70) */
  useEffect(() => {
    const down = y > prevY.current;
    setMobileShown(!((down && y > 70) || y < 210));
    prevY.current = y;
  }, [y]);

  /* active anchor while its section is >= 20% in view (desktop only, as production) */
  useEffect(() => {
    if (!isHome) return undefined;
    const check = () => {
      if (window.innerWidth <= 1024) return setActive(null);
      const vh = window.innerHeight;
      let found = null;
      for (const item of nav) {
        const el = document.getElementById(item.href.slice(1));
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const topPct = 100 - ((r.top >= 0 ? 0 : r.top) / -r.height) * 100;
        const botPct = 100 - ((r.bottom - vh) / r.height) * 100;
        if (Math.floor(topPct) >= 20 && Math.floor(botPct) >= 20) found = item.href;
      }
      setActive(found);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [isHome, nav]);

  const go = useCallback(
    (e, href) => {
      setOpen(false);
      if (!isHome) return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      const off = window.innerWidth > 1024 ? 100 : 0;
      const to = Math.round(el.getBoundingClientRect().top + window.scrollY - off);
      const from = window.scrollY;
      const t0 = performance.now();
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const step = (now) => {
        const t = Math.min(1, (now - t0) / 1000);
        window.scrollTo(0, from + (to - from) * ease(t));
        if (t < 1) requestAnimationFrame(step);
        else history.pushState(null, '', href);
      };
      requestAnimationFrame(step);
    },
    [isHome]
  );

  const hrefOf = (h) => (isHome ? h : `/sensorium${h}`);
  const items = (light) =>
    nav.map((n) => (
      <li key={n.href} className="h-full px-6 last:pr-0">
        <a
          href={hrefOf(n.href)}
          onClick={(e) => go(e, n.href)}
          className={`group flex h-full items-center ${LINK} ${light ? 'text-white' : 'text-black'}`}
        >
          <span className={`${UNDER} ${active === n.href ? 'after:scale-x-100' : ''}`}>{n.label}</span>
        </a>
      </li>
    ));

  const mobileFixed = y > 140;

  return (
    <>
      {/* desktop */}
      <header className="relative z-[100] hidden h-[100px] w-full [@media(min-width:1025px)]:block">
        <div className="flex h-full items-center justify-between bg-white px-6">
          <a href="/sensorium" rel="home" className="relative flex h-full items-center">
            <img src={logos.main.src} width={logos.main.w} height={logos.main.h} alt="logo main" className="block h-auto max-h-full w-auto" />
          </a>
          <nav aria-label="Top Menu" className="h-full pr-6">
            <ul className="m-0 flex h-full list-none items-center p-0">{items(false)}</ul>
          </nav>
        </div>
      </header>
      <div
        className={`fixed left-0 top-0 z-[100] hidden h-[70px] w-full bg-black transition-transform duration-500 ease-[ease] [@media(min-width:1025px)]:block ${
          y >= stickyAmount ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex h-full items-center justify-between px-6">
          <a href="/sensorium" rel="home" className="relative flex h-full items-center" tabIndex={y >= stickyAmount ? 0 : -1}>
            <img src={logos.sticky.src} width={logos.sticky.w} height={logos.sticky.h} alt="logo sticky" className="block h-auto max-h-full w-auto" />
          </a>
          <nav aria-label="Top Menu" className="h-full pr-6">
            <ul className="m-0 flex h-full list-none items-center p-0">{items(true)}</ul>
          </nav>
        </div>
      </div>

      {/* mobile + tablet */}
      {mobileFixed && <div aria-hidden className="h-[70px] [@media(min-width:1025px)]:hidden" />}
      <header
        className={`z-[100] h-[70px] w-full [@media(min-width:1025px)]:hidden ${
          mobileFixed
            ? `fixed left-0 top-0 transition-transform duration-300 ease-[ease] ${mobileShown || open ? 'translate-y-0' : '-translate-y-full'}`
            : 'relative'
        }`}
      >
        <div className="relative flex h-full items-center justify-between bg-white px-6">
          <a href="/sensorium" rel="home" className="relative flex h-[70px] max-h-full items-center">
            <img src={logos.mobile.src} width={logos.mobile.w} height={logos.mobile.h} alt="logo main" className="block h-[30px] w-auto" />
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative ml-5 block h-[19px] w-[27px] text-black"
          >
            <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-200 ${open ? 'top-[9px] rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-[9px] h-px w-full bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-200 ${open ? 'top-[9px] -rotate-45' : 'top-[18px]'}`} />
          </button>
          <nav
            aria-label="Mobile Menu"
            className={`absolute left-0 top-full z-10 max-h-[calc(100vh-70px)] w-full overflow-y-auto border-b border-[#f2f2f2] bg-white ${open ? 'block' : 'hidden'}`}
          >
            <ul className="mx-auto w-[768px] list-none py-[34px] [@media(max-width:800px)]:w-[86%] [@media(max-width:480px)]:w-[82%]">
              {nav.map((n) => (
                <li key={n.href} className="py-[10px]">
                  <a href={hrefOf(n.href)} onClick={(e) => go(e, n.href)} className={`${LINK} text-black`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
