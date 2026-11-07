'use client';
/* eslint-disable @next/next/no-img-element -- plain <img> as the reference renders it (project convention) */

import { useEffect, useState } from 'react';
import { cx } from '@/lib/cx';
import { CONTAINER, COL, FONT_M, MD, ROW } from './ui';

const NAV = [
  ['#schoolshref', 'Schools'],
  ['#successStorieshref', 'Success Stories'],
  ['#whyAtlashref', 'Why ATLAS'],
  ['#placementshref', 'Placements'],
  ['#aboutIsmehref', 'About ATLAS'],
];

const BULLET = '/assets/lp2x/li_rect.png';

/*
 * Every `<a>` on the page is bound by the reference's `$('a').click(...)`: it animates the window to
 * the target's top minus 150px over 500ms (jQuery's default `swing`) and returns false, so the hash
 * never changes. Reproduced once, on `document`, for in-page `#…` links only (the page has no other
 * kind inside its content; the CRM / NoPaperForms widgets live in iframes).
 */
function useOffsetScroll() {
  useEffect(() => {
    let raf = 0;
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || !a.closest('[data-lp2x]')) return;
      const id = a.getAttribute('href').slice(1);
      const el = id && document.getElementById(id);
      e.preventDefault();
      if (!el) return;
      const from = window.scrollY;
      const to = Math.max(0, el.getBoundingClientRect().top + from - 150);
      const t0 = performance.now();
      cancelAnimationFrame(raf);
      const step = (t) => {
        const p = Math.min(1, (t - t0) / 500);
        window.scrollTo(0, from + (to - from) * (0.5 - Math.cos(p * Math.PI) / 2));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/**
 * `.header-fixed-desk` (>= 768, `hidden-xs`): a fixed #2D257D bar — the logo in a `col-sm-2` and, in
 * a `col-sm-8 offset-md-2`, a 2px white-bordered box (max 90%, 25px off the right) holding the five
 * section links in two centred lines and the white "Get Info" button. 768-991 shrinks the links to
 * 11px with 5px padding and the button to 10px / 5px 10px. The bullet is `li_rect.png` at `width: 1%`
 * of its line — 8px at 1920, 6px at 1440, 3px at 768.
 */
export function DesktopHeader() {
  useOffsetScroll();
  const li = 'inline px-[18px] text-[16px] leading-[1.42857] text-white md:max-lg:px-[5px]';
  const a = 'text-white hover:underline md:max-lg:text-[11px]';
  return (
    <div className="fixed inset-x-0 top-0 z-[99] w-full bg-[#2D257D] px-[15px] max-md:hidden">
      <div className={ROW}>
        {/* ref .col-sm-2.first-header-col-md-2 */}
        <div className="relative flex min-h-[1px] w-full max-w-[16.666667%] flex-[0_0_16.666667%] items-center bg-[#2D257D] p-[15px]">
          <img src="/assets/lp2x/atlasLogo.png" alt="" width={239} height={107} className="ml-auto max-w-[70%]" />
        </div>
        {/* ref .col-sm-8.offset-md-2.second-header-col-md-2.third-header */}
        <div className="relative ml-[16.666667%] flex min-h-[1px] w-full max-w-[66.666667%] flex-[0_0_66.666667%] items-center justify-end bg-[#2D257D] p-[15px]">
          <div className="-ml-[15px] mr-[25px] flex w-full max-w-[90%] items-center border-2 border-white text-center">
            <div className={cx(COL, MD[9])}>
              <ul className="my-[10px]">
                {NAV.slice(0, 3).map(([href, label]) => (
                  /* inline items: the source's newlines between them are a space each */
                  <li key={href} className={cx(li, 'after:content-["_"]')}>
                    <a href={href} className={a}>
                      <img src={BULLET} alt="" width={7} height={7} className="inline w-[1%] align-middle" /> {label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mb-[10px]">
                {NAV.slice(3).map(([href, label]) => (
                  /* inline items: the source's newlines between them are a space each */
                  <li key={href} className={cx(li, 'after:content-["_"]')}>
                    <a href={href} className={a}>
                      <img src={BULLET} alt="" width={7} height={7} className="inline w-[1%] align-middle" /> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={cx(COL, 'md:max-w-[25%] md:flex-[0_0_25%]')}>
              {/* ref `button.btn.get-info-btn > a` — one anchor here, styled as the button */}
              <a
                href="#getInfo"
                className="inline-block border border-transparent bg-white px-[30px] py-[5px] text-[20px] font-bold leading-[1.42857] text-black hover:underline md:max-lg:px-[10px] md:max-lg:text-[10px]"
              >
                {' '}
                Get Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The < 768 top of the page (`.banner-section-mobile`, `visible-xs`): the fixed logo bar, the fixed
 * #2D257D toggle 140px down the left edge, and the 75vh hero with its heading pinned to the bottom.
 *
 * The menu (`#navbarSupportedContent1`) is a 200px white panel hung from the toggle's top-left behind
 * it (`z-index: -1`, 45px top padding so the toggle sits over its corner), entering from `left: -250px`
 * at opacity 0 over 0.4s linear — the reference's `[aria-expanded="true"]` rule. It stays open after
 * a link is followed, as upstream. The icon is the three bars crossing into an X.
 */
export function MobileTop({ heading, mobileBg }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!open) return undefined;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    return () => cancelAnimationFrame(id);
  }, [open]);

  const bar = 'block h-[2px] w-[22px] rounded-[1px] bg-white transition-all duration-200';
  return (
    <section
      className="relative h-[75vh] bg-cover bg-no-repeat md:hidden"
      style={{ backgroundImage: `url(${mobileBg})` }}
    >
      {/* ref .container-fluid.header-container-fluid.visible-xs (fixed, z 999) */}
      <div className="fixed inset-x-0 top-0 z-[999] w-full bg-[#2D257D] p-0">
        <div className={CONTAINER}>
          <div className="-mx-[15px] flex flex-wrap p-[5px] text-center">
            <div className="relative min-h-[1px] w-full max-w-full flex-[0_0_100%] px-[15px]">
              <img src="/assets/lp2x/atlasLogo.png" alt="logo" width={239} height={107} className="inline w-[60%] max-w-full align-middle" />
            </div>
          </div>
        </div>
      </div>
      {/* ref .col-md-6.col-6.pl-0 > .forPosition */}
      <div className="relative min-h-[1px] w-1/2 max-w-[50%] pr-[15px]">
        <div className="fixed z-[99] mt-[140px]">
          <button
            type="button"
            aria-controls="navbarSupportedContent1"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => {
              if (open) setShown(false);
              setOpen(!open);
            }}
            className="relative m-0 rounded-none border border-transparent bg-[#2D257D] px-[10px] py-[9px]"
          >
            <span className={cx(bar, open ? 'origin-[10%_10%] rotate-45' : '')} />
            <span className={cx(bar, 'mt-[4px]', open && 'opacity-0')} />
            <span className={cx(bar, 'mt-[4px]', open ? 'origin-[10%_90%] -rotate-45' : '')} />
          </button>
          {open && (
            <div
              id="navbarSupportedContent1"
              className={cx(
                'absolute top-0 -z-[1] overflow-hidden bg-white px-[15px] pb-[15px] pt-[45px] transition-all duration-[400ms] ease-linear',
                shown ? 'left-0 w-[200px] opacity-100' : '-left-[250px] w-0 opacity-0',
              )}
            >
              <ul className={cx(FONT_M, '-mx-[15px] my-[7.5px] flex w-[200px] flex-col')}>
                {NAV.map(([href, label]) => (
                  <li key={href} className="px-[18px] py-[8px] text-[16px] leading-[1.42857]">
                    <a href={href} className="text-[17px] leading-[20px] text-[#342b7c] hover:text-black hover:no-underline">
                      <img src={BULLET} alt="" width={7} height={7} className="inline w-[1%] align-middle" /> {label}
                    </a>
                  </li>
                ))}
                <li className="px-[18px] py-[8px] text-[16px] leading-[1.42857]">
                  <a
                    href="#getInfoM"
                    className="mt-[10px] inline-block border border-transparent bg-[#342b7c] px-[30px] py-[5px] text-[17px] font-bold leading-[28.5714px] text-white"
                  >
                    Get Info
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* ref .container-fluid.p-0 > .col-md-12.banner-section-first-col1.p-0 (absolute, bottom 0) */}
      <div className="absolute bottom-0 w-full p-0">
        <h1 className="mb-[25px] ml-[15px] mt-[80px] text-[36px] font-black uppercase leading-[0.9] tracking-[-2px] text-white [-webkit-text-stroke:1.2px_#00B2BA]">
          {heading}
        </h1>
      </div>
    </section>
  );
}
