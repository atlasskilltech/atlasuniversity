'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * The sticky in-page menu — port of about-us/index.php:38 (`.sticky-menus.center >
 * 8 x a.anchor-link`), with its positioning from the ISDI header.php `<style>`.
 *
 * Measured on production:
 *   bar       flex, gap 12, p 18/24, white, shadow 0 2 5 #0003, horizontal scroll
 *             with the scrollbar hidden; centred, left-aligned at <=767
 *   position  >=992   sticky, top 156, z 900, `transition: top .3s ease`; top 0
 *                     while the header is retracted (`body.hide-header`)
 *             569-991 static, z 100
 *             <=568   sticky, top 80, z 9
 *   link      #2b2b2b, r16, px16, line-height 2.2, no wrap; 14px at <=767;
 *             #ec1376 with white text on hover and when current
 *
 * "Current" is Webflow's own scroll-spy (webflow.js `links`): a link to `#id` is
 * current while that section overlaps the middle of the viewport —
 * `top + height - vh/2 >= scrollY && top + vh/2 <= scrollY + vh` — so two can be
 * current at once, and `href="#"` never is. Clicking an in-page link scrolls
 * smoothly to the section's top and records the hash, as Webflow's scroll module
 * does (the header's own click listener still sees the click and holds the bars
 * back while it runs). "Faculty" is authored `.hide-link` (display: none).
 */
export default function AnchorMenu({ links }) {
  const [current, setCurrent] = useState([]);
  const frame = useRef(0);

  useEffect(() => {
    const targets = links.filter((link) => link.href.length > 1 && link.href.startsWith('#')).map((link) => link.href);

    const update = () => {
      frame.current = 0;
      const vh = window.innerHeight;
      const half = vh * 0.5;
      const active = targets.filter((href) => {
        const el = document.getElementById(href.slice(1));
        if (!el || !el.offsetParent) return false;
        const { top, height } = el.getBoundingClientRect();
        return top + height - half >= 0 && top + half <= vh;
      });
      setCurrent((prev) => (prev.join() === active.join() ? prev : active));
    };
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, [links]);

  const onClick = (event, href) => {
    if (href.length < 2 || !href.startsWith('#')) return;
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.location.hash !== href) window.history.pushState(null, '', href);
  };

  return (
    /* ref .sticky-menus.center */
    <div
      data-block="menu"
      className={cx(
        'z-[100] flex items-center justify-center gap-3 overflow-auto bg-white px-6 py-[18px] text-white shadow-[0_2px_5px_#0003] transition-all duration-300',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:justify-start',
        'lg:sticky lg:top-[156px] lg:z-[900] lg:w-full lg:transition-[top] lg:ease-[ease] lg:[body.hide-header_&]:top-0',
        'max-mcm:sticky max-mcm:top-20 max-mcm:z-[9]'
      )}
    >
      {links.map((link) => (
        /* ref a.anchor-link */
        <a
          key={link.label}
          href={link.href}
          onClick={(event) => onClick(event, link.href)}
          aria-current={current.includes(link.href) ? 'location' : undefined}
          className={cx(
            'inline-block flex-none rounded-2xl px-4 leading-[2.2] no-underline hover:bg-[#ec1376] hover:text-white max-md:text-[14px]',
            link.hidden && 'hidden',
            current.includes(link.href) ? 'bg-[#ec1376] text-white' : 'bg-transparent text-[#2b2b2b]'
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
