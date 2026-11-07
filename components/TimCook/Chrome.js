/* eslint-disable @next/next/no-img-element -- the reference's own small PNG wordmark at fixed CSS
   sizes, and the lightbox image whose src is set by script; reproduced as authored. */
/*
 * /timcook page chrome — the reference's skip link, intro curtain, WebGL canvas, scroll-progress
 * bar, page-local header + mobile menu, desktop grain and the gallery lightbox (index.html:48-103,
 * 497-509; main.css "Loader", "WebGL + progress", "Header", "Grain", "Lightbox").
 *
 * State the reference keeps in classes is kept in data attributes set by lib/timcook/motion.js:
 *   root[data-ready]  (html.is-ready)     header[data-scrolled|data-hidden|data-onlight|data-menu]
 *   #mobile-menu[data-open] (.is-open)     #gl[data-on] (.is-on)       nav link[data-active]
 * `.site-header.on-light:not(.menu-open)` is the group variant `group-[[data-onlight]:not([data-menu])]/hdr`.
 *
 * Measured against production: the header wordmark renders at its natural 200x49, not the
 * `h-7 lg:h-8` the markup asks for — main.css's unlayered `img { height: auto }` beats the Tailwind
 * v4 utilities (which live in a cascade layer). The port reproduces what production paints.
 */
import { MONO, SERIF, BTN_GHOST } from './ui';

export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-[200] -translate-y-[200%] rounded-[6px] bg-[#f3f1ec] px-4 py-3 font-semibold text-[#07080a] focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}

/* Intro curtain. Hidden without scripting (the reference's `.no-js .loader { display: none }`),
   faded by root[data-ready] (`.js.is-ready .loader`). */
export function Loader({ loader }) {
  return (
    <div
      id="loader"
      aria-hidden="true"
      className="fixed inset-0 z-[150] grid place-items-center bg-[#07080a] text-[#f3f1ec] [@media(scripting:none)]:hidden group-data-[ready]/tc:invisible group-data-[ready]/tc:opacity-0 group-data-[ready]/tc:[transition:opacity_.6s,visibility_.6s]"
    >
      <div data-tc="loader-inner" className="flex items-center gap-4">
        <img
          src={loader.logo.src}
          width={loader.logo.width}
          height={loader.logo.height}
          alt=""
          className="block h-[26px] w-auto"
        />
        <span className="text-[1.1rem] text-[#f4cf4a]">{loader.x}</span>
        <span className={`${SERIF} text-[1.6rem]`}>{loader.name}</span>
      </div>
      <div className="absolute bottom-12 left-[var(--gutter)] right-[var(--gutter)] h-px bg-[rgba(243,241,236,.12)]">
        <span data-tc="loader-bar" className="absolute inset-0 origin-left scale-x-0 bg-[#f3f1ec]" />
      </div>
      <span data-tc="loader-count" className={`absolute bottom-[3.75rem] right-[var(--gutter)] ${MONO} text-[.75rem] text-[#a4a29d]`}>
        00
      </span>
    </div>
  );
}

/* WebGL layer (hero globe → finale triangle) + the scroll progress bar. Purely decorative. */
export function GlLayer() {
  return (
    <>
      <canvas
        id="gl"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 block h-full w-full opacity-0 [transition:opacity_1.2s_ease] data-[on]:opacity-100"
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px]">
        <span data-tc="progress" className="block h-full origin-left scale-x-0 bg-[#f4cf4a]" />
      </div>
    </>
  );
}

/* main.css: `body::after` static noise texture, desktop + motion allowed only. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[130] hidden opacity-[.045] n1024:motion-safe:block"
      style={{ backgroundImage: GRAIN }}
    />
  );
}

const NAV_LINK = `relative inline-block px-[.9rem] py-[.55rem] text-[.9rem] text-[rgba(243,241,236,.72)] [transition:color_.3s] hover:text-[#f3f1ec] data-[active]:text-[#f3f1ec] after:absolute after:bottom-[.3rem] after:left-[.9rem] after:right-[.9rem] after:h-px after:origin-left after:scale-x-0 after:bg-[#f4cf4a] after:content-[''] after:[transition:transform_.5s_cubic-bezier(0.22,1,0.36,1)] data-[active]:after:scale-x-100 group-data-[onlight]/hdr:after:bg-[#07080a] group-[[data-onlight]:not([data-menu])]/hdr:text-[#07080a]`;

const MENU_DELAYS = [
  '',
  'group-data-[open]/mm:delay-[50ms]',
  'group-data-[open]/mm:delay-[100ms]',
  'group-data-[open]/mm:delay-[150ms]',
  'group-data-[open]/mm:delay-[200ms]',
  'group-data-[open]/mm:delay-[250ms]',
];

export function Header({ nav, mobileNav, brandLogo, siteUrl, siteLabel }) {
  return (
    <>
      <header
        id="site-header"
        className="group/hdr fixed inset-x-0 top-0 z-[110] border-b border-transparent [transition:transform_.5s_cubic-bezier(0.22,1,0.36,1),background-color_.4s,border-color_.4s,backdrop-filter_.4s] data-[hidden]:-translate-y-full data-[scrolled]:border-[rgba(243,241,236,.12)] data-[scrolled]:bg-[rgba(7,8,10,.62)] data-[scrolled]:backdrop-blur-[16px] data-[scrolled]:backdrop-saturate-[1.4] [&[data-onlight]:not([data-menu])]:border-[rgba(7,8,10,.1)] [&[data-onlight]:not([data-menu])]:bg-[rgba(238,234,226,.72)]"
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 n640:px-8 n1024:h-20 n1024:px-12"
        >
          <a href="#top" className="inline-flex items-center" aria-label="ATLAS SkillTech University — back to top">
            <img
              src={brandLogo.src}
              width={brandLogo.width}
              height={brandLogo.height}
              alt={brandLogo.alt}
              className={`block h-auto w-auto group-[[data-onlight]:not([data-menu])]/hdr:invert`}
            />
          </a>
          <ul className="hidden items-center gap-1 n1024:flex">
            {nav.map((l) => (
              <li key={l.href}>
                <a data-tc="nav-link" className={NAV_LINK} href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener"
            className={`hidden n1024:inline-flex ${BTN_GHOST} group-[[data-onlight]:not([data-menu])]/hdr:border-[rgba(7,8,10,.22)] group-[[data-onlight]:not([data-menu])]/hdr:text-[#07080a]`}
          >
            {siteLabel} <span aria-hidden="true">↗</span>
          </a>
          <button
            id="menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="mobile-menu"
            className={`group/tog inline-flex cursor-pointer items-center gap-3 border-0 bg-transparent py-[.6rem] pl-[.8rem] pr-[.2rem] text-[.85rem] tracking-[.02em] text-[#f3f1ec] n1024:hidden group-[[data-onlight]:not([data-menu])]/hdr:text-[#07080a]`}
          >
            <span data-tc="menu-label">Menu</span>
            <span aria-hidden="true" className="relative h-[10px] w-[22px]">
              <i className={`absolute inset-x-0 top-0 h-[1.5px] bg-[#f3f1ec] [transition:transform_.5s_cubic-bezier(0.22,1,0.36,1),top_.5s_cubic-bezier(0.22,1,0.36,1)] group-aria-expanded/tog:top-[4px] group-aria-expanded/tog:rotate-45 group-[[data-onlight]:not([data-menu])]/hdr:bg-[#07080a]`} />
              <i className={`absolute inset-x-0 top-[8px] h-[1.5px] bg-[#f3f1ec] [transition:transform_.5s_cubic-bezier(0.22,1,0.36,1),top_.5s_cubic-bezier(0.22,1,0.36,1)] group-aria-expanded/tog:top-[4px] group-aria-expanded/tog:-rotate-45 group-[[data-onlight]:not([data-menu])]/hdr:bg-[#07080a]`} />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        hidden
        className="group/mm fixed inset-0 z-[105] bg-[#07080a] [clip-path:inset(0_0_100%_0)] [transition:clip-path_.7s_cubic-bezier(0.22,1,0.36,1)] data-[open]:[clip-path:inset(0_0_0_0)]"
      >
        <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-5 pb-10 pt-24 n640:px-8">
          <ol>
            {mobileNav.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-[rgba(243,241,236,.12)]">
                <a
                  href={l.href}
                  className={`flex translate-y-[110%] items-baseline gap-4 py-4 [font-size:clamp(2rem,9vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] [transition:transform_.8s_cubic-bezier(0.22,1,0.36,1)] group-data-[open]/mm:translate-y-0 ${MENU_DELAYS[i] || ''}`}
                >
                  <span className={`${MONO} text-[.75rem] font-normal tracking-[.1em] text-[#f4cf4a]`}>{l.num}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
          <a href={siteUrl} target="_blank" rel="noopener" className={`inline-flex self-start ${BTN_GHOST}`}>
            {siteLabel} <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </>
  );
}

const LB_BTN =
  'absolute grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-[rgba(243,241,236,.18)] bg-[rgba(243,241,236,.08)] text-[1.1rem] text-[#f3f1ec] [transition:background_.3s,color_.3s] hover:bg-[#f3f1ec] hover:text-[#07080a]';

export function Lightbox() {
  return (
    <dialog
      id="lightbox"
      aria-label="Photo viewer"
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden border-0 bg-[rgba(7,8,10,.96)] p-0 text-[#f3f1ec] backdrop:bg-[rgba(7,8,10,.8)] open:grid open:grid-rows-[1fr_auto]"
    >
      <div data-tc="lb-frame" className="grid min-h-0 place-items-center px-4 pb-4 pt-[4.5rem]">
        <img alt="" data-lb-img className="block max-h-full max-w-full rounded-[4px] object-contain" />
      </div>
      <div className="flex items-center justify-between gap-4 px-[var(--gutter)] pb-6 pt-4">
        <p data-lb-caption className="text-[.95rem] text-[rgba(243,241,236,.85)]" />
        <span data-lb-count className={`${MONO} text-[0.75rem] leading-[1rem] text-[#a4a29d]`} />
      </div>
      <button type="button" data-lb-close aria-label="Close viewer" className={`${LB_BTN} right-4 top-4`}>
        ✕
      </button>
      <button
        type="button"
        data-lb-prev
        aria-label="Previous photo"
        className={`${LB_BTN} left-4 top-1/2 -translate-y-1/2 max-md:bottom-[4.5rem] max-md:top-auto max-md:translate-y-0`}
      >
        ←
      </button>
      <button
        type="button"
        data-lb-next
        aria-label="Next photo"
        className={`${LB_BTN} right-4 top-1/2 -translate-y-1/2 max-md:bottom-[4.5rem] max-md:top-auto max-md:translate-y-0`}
      >
        →
      </button>
    </dialog>
  );
}

