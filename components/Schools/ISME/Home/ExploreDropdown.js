'use client';

import { useEffect, useRef, useState } from 'react';
import SmartLink from '@/components/SmartLink';

/**
 * ISME hero "Explore Programs" — port of the Webflow dropdown
 * `.cust-dropdown-1.w-dropdown` (`data-hover="false"`, so it opens on click) in
 * reference/schools/isme/index.php. Measured on production with the list open:
 *
 *   toggle  2px white outline pill, r32, 14/44/14/24 padding, white 16/24 label and
 *           a 16px chevron 20px from the right — 10px padding and a 12/18 label at <=767
 *   list    absolute over the toggle (top -2, left/right 0), r32 (20 at <=767), #ddd,
 *           clipped; a mint header repeating the label (16/24 padding 16/24, 8/24 at
 *           <=767) above two 10/20-padded links in #222
 *
 * The glyphs are Webflow's `w-icon-dropdown-toggle` from its icon font, which this
 * project does not load, so the same chevron is drawn as an inline SVG.
 */

function Chevron({ className }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className}>
      <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function ExploreDropdown({ label, links }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative rounded-[32px] ${open ? 'z-[901]' : 'z-[900]'}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative block rounded-[32px] border-2 border-solid border-white bg-transparent py-[14px] pl-6 pr-11 text-left text-white max-md:py-2.5"
      >
        <Chevron className="absolute right-5 top-1/2 -translate-y-1/2 text-white" />
        <span className="block text-base leading-6 max-md:text-xs max-md:leading-[18px]">{label}</span>
      </button>

      {open && (
        <nav className="absolute -top-0.5 left-0 right-0 z-[100] overflow-hidden rounded-[32px] bg-[#ddd] max-md:rounded-[20px]">
          <div className="flex items-center justify-between bg-atlas-mint px-6 py-4 text-black max-md:py-2">
            <span className="text-base leading-6 max-md:text-xs max-md:leading-[18px]">{label}</span>
            <Chevron className="text-black" />
          </div>
          {links.map((l) => (
            <SmartLink
              key={l.href}
              href={l.href}
              role="menuitem"
              className="relative block px-5 py-2.5 text-base leading-6 text-[#222] no-underline max-md:text-xs max-md:leading-[18px]"
            >
              {l.label}
            </SmartLink>
          ))}
        </nav>
      )}
    </div>
  );
}
