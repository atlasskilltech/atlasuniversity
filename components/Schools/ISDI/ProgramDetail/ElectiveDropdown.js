'use client';

import { useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * `.accordion-item-common` — the elective list each semester hides behind a single
 * row ("ATLAS Elective", "Elective", "Professional Elective").
 *
 * It is a Webflow **dropdown** (`w-dropdown`, `data-hover="false"`), not a Bootstrap
 * accordion, and its animation is IX2, read off the live page
 * (`Webflow.require('ix2').store.getState().ixData`):
 *
 *   DROPDOWN_OPEN   a-20   height -> auto  over 100ms, icon -> rotateZ(180deg)
 *   DROPDOWN_CLOSE  a-21   height -> 32px  over 100ms, icon -> rotateZ(0)
 *
 * a-20's first group (`useFirstGroupAsInitialState`) is the closed state: 32px and
 * no rotation. The list itself is `position: static` and always in the DOM; the
 * item clips it with `overflow: hidden`, so the animation is the item's height.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *   item      mb12, clipped. `border-bottom: 1px #eeeeee80` has no border-style,
 *             so it paints nothing (the same trap `.port-card-m-posi-atlas` sets).
 *   toggle    h32, flex, space-between, padding-right 40 -> 60 at <=767
 *   title     18px/1.2 700 #2b2b2b, `white-space: pre-wrap`
 *   icon      an 18px Webflow-icons glyph, vertically centred and pinned 18px
 *             past the toggle's right edge, with a 20px right margin (15 at 767,
 *             20 again at 479). That font is not loaded here, so the chevron is
 *             drawn as an inline SVG at the same 18px box, as `CarouselArrow`
 *             already does for Swiper's own glyphs.
 *   list      pt12
 *   item row  `.sub-portion` pb26; `h5.h6-thin` 14px/1.2 700 #706f6e mb5;
 *             `.sub-desc-text` 14px/1.4 #706f6e
 *
 * ── One deviation, and it is a reference defect ─────────────────────────────
 * On production the item carries an inline `height: 80px` at load — not the 32px
 * the markup authors and not the 32px its own IX2 initial state declares — so a
 * closed dropdown shows the first elective's title and half a line of its
 * description, clipped mid-glyph. Open and close it once and the same element
 * settles at 32px for the rest of the session. The authored intent is
 * unambiguous, so this renders the 32px closed state at every width.
 */
export default function ElectiveDropdown({ dropdown }) {
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);
  /* the item animates its own height, and `auto` is not a transitionable value, so
     the open height is the list measured at the moment of the click */
  const [openHeight, setOpenHeight] = useState(0);
  const height = open ? 32 + openHeight : 32;

  const toggle = () => {
    setOpenHeight(listRef.current?.offsetHeight ?? 0);
    setOpen((o) => !o);
  };

  return (
    /* ref .accordion-item-common.w-dropdown */
    <div
      className="relative z-0 mb-3 overflow-hidden text-left transition-[height] duration-100 ease-linear"
      style={{ height: `${height}px` }}
    >
      {/* ref .accordion-toggle-common.w-dropdown-toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="relative flex h-8 w-full cursor-pointer items-center justify-between whitespace-nowrap bg-transparent p-0 pr-10 align-top text-[#222] max-md:pr-[60px]"
      >
        {/* ref .accord-title-wrap-common */}
        <div className="flex-1 cursor-pointer whitespace-nowrap max-md:w-full max-md:flex-none">
          {/* ref .accordion-title-common */}
          <div className="whitespace-pre-wrap text-left text-[18px] font-bold leading-[1.2] text-[#2b2b2b]">
            {dropdown.title}
          </div>
        </div>

        {/* ref .accordion-icon.black-cm — the Webflow-icons chevron, drawn inline */}
        <span
          aria-hidden
          className={cx(
            'absolute -right-[18px] top-0 my-[7px] mr-5 flex h-[18px] w-[18px] items-center justify-center text-black transition-transform duration-100 ease-linear max-md:mr-[15px] max-sm:mr-5',
            open && 'rotate-180'
          )}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </span>
      </button>

      {/* ref nav.accordion-content-common.w-dropdown-list — static, always rendered,
          clipped by the item above */}
      <nav ref={listRef} className="min-w-full pt-3">
        {dropdown.items.map((item, i) => (
          /* ref .sub-portion */
          <div key={`${i}-${item.title}`} className="pb-[26px]">
            {/* ref h5.h6-thin */}
            <div className="mb-[5px] text-[14px] font-bold leading-[1.2] text-[#706f6e]">{item.title}</div>
            {/* ref .sub-desc-text */}
            <div className="text-[14px] leading-[1.4] text-[#706f6e]">{item.text}</div>
          </div>
        ))}
      </nav>
    </div>
  );
}
