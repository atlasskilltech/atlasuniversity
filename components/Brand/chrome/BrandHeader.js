'use client';

import { useEffect, useState } from 'react';

/*
 * The Brand Kit's own site header — reference/brand/components/header.html, plus the behaviour
 * reference/brand/assets/js/layout.js (wireMobileMenu) and index.html (trackSections) attach to it.
 * Rendered only on /brand (app/brand/layout.js); the ATLAS header steps aside there via
 * components/Schools/MainSiteOnly.
 *
 *   desktop (>=1024, ref `lg`)  logo + one row of section links and three outlined tool pills
 *   mobile                      logo + a menu toggle opening a full-width panel under the bar;
 *                               it closes on choosing a link, on Escape and when growing to 1024
 *   scroll-spy                  the section in view is a filled Indigo pill (ref trackSections:
 *                               IntersectionObserver, rootMargin -45% 0px -50% 0px)
 *
 * The reference's three tool links pointed at separate pages; on /brand the tools are the #tools
 * section, so they are anchors (#tools-text / #tools-image / #tools-pdf) that select the tab.
 */
const SECTIONS = [
  ['family', 'Brands'],
  ['logos', 'Logos'],
  ['products', 'Products'],
  ['colors', 'Colors'],
  ['pairings', 'Pairings'],
  ['in-use', 'In use'],
];
export const TOOL_LINKS = [
  ['tools-text', 'Text Converter'],
  ['tools-image', 'Image Tools'],
  ['tools-pdf', 'PDF Tools'],
];

const TOOL_PILL = 'text-brand-indigo ring-1 ring-inset ring-brand-teal/50 transition hover:bg-brand-teal/10';

export default function BrandHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  /* ref trackSections() */
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* ref wireMobileMenu(): Escape and growing to the desktop breakpoint close the panel */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const sectionLink = (id, rounded) =>
    `${rounded} block no-underline ${active === id ? 'bg-brand-indigo text-white' : 'text-brand-indigo hover:bg-brand-indigo/5'}`;

  return (
    <header className="sticky top-0 z-40 border-0 border-b border-solid border-brand-line/80 bg-white/95 font-sans backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[84rem] items-center gap-4 px-4 n640:px-6 n1024:px-10">
        <a href="/brand" className="shrink-0" aria-label="ATLAS brand kit, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brand/logos/atlas/atlas-skilltech-full-stack-light.svg" alt="ATLAS SkillTech University" width={178} height={80} className="h-9 w-auto n640:h-10" />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden min-w-0 overflow-x-auto [scrollbar-width:none] n1024:block [&::-webkit-scrollbar]:hidden">
          <ul className="m-0 flex list-none items-center gap-1 whitespace-nowrap p-0 text-sm font-semibold text-brand-indigo">
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? 'true' : undefined} className={sectionLink(id, 'rounded-full px-3 py-2')}>
                  {label}
                </a>
              </li>
            ))}
            {TOOL_LINKS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className={`block rounded-full px-3 py-2 no-underline ${TOOL_PILL}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-controls="brand-mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="ml-auto inline-flex items-center justify-center rounded-lg border-0 bg-transparent p-2 text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo hover:text-white n1024:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <nav
        aria-label="Primary"
        id="brand-mobile-nav"
        hidden={!open}
        onClick={(e) => e.target.closest('a') && setOpen(false)}
        className="border-0 border-t border-solid border-brand-line bg-white n1024:hidden"
      >
        <ul className="m-0 mx-auto flex max-w-[84rem] list-none flex-col gap-1 px-4 py-3 text-sm font-semibold text-brand-indigo n640:px-6">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? 'true' : undefined} className={sectionLink(id, 'rounded-lg px-3 py-2.5')}>
                {label}
              </a>
            </li>
          ))}
          {TOOL_LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={`block rounded-lg px-3 py-2.5 no-underline ${TOOL_PILL}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
