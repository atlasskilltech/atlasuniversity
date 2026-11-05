'use client';

import { useRef } from 'react';
import { SECTION, H2 } from '@/components/Home/SectionHead';
import { TW_CONTAINER } from './ui';

/* ref `.container` — Webflow's, under the Tailwind Play CDN's `.container` ladder (see ./ui) */
const CONTAINER = TW_CONTAINER;

/**
 * ref global-immersions.php:1190-1303 "Global Immersions: Experiences Across
 * Continents" — `section.section > .container > .reels-section >
 * (h2.h2-tag.mrg16, .swiper.reels-swiper > .swiper-wrapper.reels-grid >
 *  12 x .swiper-slide.reel-card > (video[poster], button.play-toggle-btn))`.
 *
 * The reference renders this two ways, split at 767px (its `@media` boundary):
 *   >=768  `.reels-grid` is a CSS grid, `repeat(auto-fit, minmax(260px, 1fr))`,
 *          gap 28 — all 12 reels wrap (4 columns at 1156 => 4x3, 1485 tall).
 *          No Swiper is initialised and the prev/next arrows are display:none.
 *   <=767  a Swiper (`slidesPerView: 1.15`, `spaceBetween: 14`, nav arrows) — so each slide is
 *          (width − 14×0.15) / 1.15 (516.4px of 596 at 700) with a 14px gap;
 *          each `.reel-card` is a fixed 480px tall and the #41418E circle
 *          arrows show.
 * Reproduced as one card list that is a grid on desktop and a scroll-snap
 * carousel (~1.15 per view, with arrows) below 768.
 *
 * Each reel is a 9:16 portrait video (268x476 at a 1156 container). On desktop
 * the card has no explicit height, so `object-fit: cover; height: 100%` takes
 * the video's own 9:16 ratio; the port pins `aspect-[9/16]` for the same box.
 * The play/pause button sits bottom-right (48px, rgba(0,0,0,.65)); clicking it
 * plays this reel and pauses the rest, and it fades out while playing (returns
 * on hover) — the `.playing` behaviour the reference's inline script drives.
 */
export default function ReelsCarousel({ heading, reels }) {
  const trackRef = useRef(null);

  const toggle = (e, i) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('[data-reel]');
    const card = cards[i];
    const video = card?.querySelector('video');
    if (!video) return;
    if (video.paused) {
      cards.forEach((c) => {
        const v = c.querySelector('video');
        if (v && v !== video) { v.pause(); v.currentTime = 0; c.classList.remove('is-playing'); }
      });
      video.muted = true;
      video.play().then(() => card.classList.add('is-playing')).catch(() => {});
    } else {
      video.pause();
      card.classList.remove('is-playing');
    }
  };

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-reel]');
    const step = card ? card.getBoundingClientRect().width + 14 : 300;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .reels-section */}
        <div className="relative">
          {/* ref h2.h2-tag.mrg16 */}
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{heading}</h2>

          {/* ref .reels-grid — CSS grid at >=768, scroll carousel below */}
          <div
            ref={trackRef}
            className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-[14px] max-md:overflow-x-auto max-md:scroll-smooth max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
          >
            {reels.map((reel, i) => (
              /* ref .reel-card — radius 16, black, 9:16 portrait; fixed 480 tall below 768 */
              <div
                key={i}
                data-reel
                className="group relative aspect-[9/16] flex-none overflow-hidden rounded-2xl bg-black shadow-[0_15px_35px_rgba(0,0,0,0.12)] max-md:aspect-auto max-md:h-[480px] max-md:w-[calc((100%-2.1px)/1.15)] max-md:snap-center"
              >
                {/* ref .reel-card video */}
                <video
                  className="h-full w-full object-cover"
                  poster={reel.poster || undefined}
                  loop
                  playsInline
                  muted
                  preload="metadata"
                >
                  <source src={reel.src} type="video/mp4" />
                </video>

                {/* ref button.play-toggle-btn — bottom-right, fades out while playing */}
                <button
                  type="button"
                  aria-label="Play reel"
                  onClick={(e) => toggle(e, i)}
                  className="absolute bottom-[14px] right-[14px] z-[4] flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-black/65 text-[18px] leading-none text-white transition-opacity duration-300 group-[.is-playing]:opacity-0 group-[.is-playing]:group-hover:opacity-100"
                >
                  <span className="group-[.is-playing]:hidden">▶</span>
                  <span className="hidden group-[.is-playing]:block">❚❚</span>
                </button>
              </div>
            ))}
          </div>

          {/* ref .reels-prev / .reels-next — #41418E circles, visible only <=767 */}
          <button
            type="button"
            aria-label="Previous reels"
            onClick={() => scrollByCard(-1)}
            className="absolute left-[6px] top-1/2 z-10 hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-[#41418E] text-[20px] text-white max-md:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next reels"
            onClick={() => scrollByCard(1)}
            className="absolute right-[6px] top-1/2 z-10 hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-[#41418E] text-[20px] text-white max-md:flex"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
