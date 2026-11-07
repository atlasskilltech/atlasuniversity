'use client';

/* eslint-disable @next/next/no-img-element -- local copies of each film's YouTube hqdefault
   thumbnail (480x360), shown in a 16:9 frame exactly as the reference's rail cards. */
/*
 * Films from the day — index.html:501-531 + js/main.js `initFilms` (tabs + rail + arrows).
 *
 * The reference renders the rail with `innerHTML` from its FILMS list; here the cards are React
 * state, so the first tab is server-rendered (the reference shows it only after its script runs,
 * with a <noscript> playlist link — kept). Switching tabs replays the reference's entrance
 * (`autoAlpha 0, x 40 → 1, 0`, 0.8s expo.out, stagger 0.06), and arrow keys move between tabs.
 * Each card is a `[data-video]` button; the YouTube player dialog is opened by the delegated
 * listener in lib/convocation/motion.js, as in the reference.
 *
 * Thumbnails: the reference hot-links `https://i.ytimg.com/vi/<id>/hqdefault.jpg`; those 16 files
 * are copied under public/assets/convocation/films/ so nothing is fetched from a third party until
 * a film is played.
 */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowOut, BTN, BTN_LINE, DISPLAY, DISPLAY_LG, ICON_BTN, LEAD, PLAY_BADGE, PlayGlyph, WRAP } from './ui';

export default function Films({ films, playlistUrl }) {
  const [tab, setTab] = useState(films.tabs[0].key);
  const railRef = useRef(null);
  const tabRefs = useRef([]);
  const animate = useRef(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    rail.scrollLeft = 0;
    if (!animate.current) return undefined;
    animate.current = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const tween = gsap.fromTo(rail.children, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06 });
    return () => tween.kill();
  }, [tab]);

  const select = (i, focus) => {
    animate.current = true;
    setTab(films.tabs[i].key);
    if (focus) tabRefs.current[i]?.focus();
  };

  // Rail arrows scroll by roughly one screen of cards
  const step = (dir) => {
    const rail = railRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail?.scrollBy({ left: dir * rail.clientWidth * 0.9, behavior: reduced ? 'auto' : 'smooth' });
  };

  const current = films.tabs.find((t) => t.key === tab);

  return (
    <section id="films" aria-labelledby="films-title" className="bg-[#0e0e33] py-24 text-[#f5f6fc] n640:py-32 n1024:py-40">
      <div className={WRAP}>
        <div className="flex flex-col gap-6 n1024:flex-row n1024:items-end n1024:justify-between">
          <div>
            <h2 id="films-title" data-split className={DISPLAY_LG}>{films.title}</h2>
            <p className={`mt-5 max-w-[46ch] ${LEAD} text-[#f5f6fc]/70`}>{films.text}</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous films" onClick={() => step(-1)} className={`grid ${ICON_BTN}`}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M10 3 5 8l5 5" />
              </svg>
            </button>
            <button type="button" aria-label="Next films" onClick={() => step(1)} className={`grid ${ICON_BTN}`}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="-mx-4 mt-10 overflow-x-auto px-4 [scrollbar-width:none] n640:mx-0 n640:px-0">
          <div role="tablist" aria-label="Film categories" className="flex gap-2">
            {films.tabs.map((t, i) => (
              <button
                key={t.key}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={t.id}
                aria-selected={t.key === tab}
                aria-controls="film-panel"
                tabIndex={t.key === tab ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
                  if (dir) {
                    e.preventDefault();
                    select((i + dir + films.tabs.length) % films.tabs.length, true);
                  }
                }}
                className="min-h-[2.75rem] whitespace-nowrap rounded-full border border-[rgb(245_246_252/0.2)] px-5 text-[0.9375rem] font-medium text-[rgb(245_246_252/0.72)] [transition:all_.35s_cubic-bezier(0.16,1,0.3,1)] hover:border-[rgb(245_246_252/0.5)] hover:text-[#f5f6fc] aria-selected:border-[#f5f6fc] aria-selected:bg-[#f5f6fc] aria-selected:text-[#0e0e33]"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div id="film-panel" role="tabpanel" aria-labelledby={current.id} tabIndex={0} className="mt-10">
          <ul
            ref={railRef}
            className="flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {films.lists[tab].map((f) => (
              <li
                key={`${tab}-${f.id}`}
                className="w-[min(82%,22rem)] flex-none snap-start n640:w-[calc((100%_-_1.25rem)/2)] n1024:w-[calc((100%_-_2.5rem)/3)]"
              >
                <button type="button" data-video={f.id} data-title={f.title} className="group/fc block w-full text-left">
                  <span className="relative block aspect-video overflow-hidden rounded-[0.375rem] bg-[#17174a]">
                    <img
                      src={f.thumb}
                      alt=""
                      width="480"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full scale-[1.02] object-cover opacity-[.85] [transition:transform_.9s_cubic-bezier(0.16,1,0.3,1),opacity_.4s_ease] group-hover/fc:scale-[1.07] group-hover/fc:opacity-100 group-focus-visible/fc:scale-[1.07] group-focus-visible/fc:opacity-100"
                    />
                    <span aria-hidden="true" className={`${PLAY_BADGE} bottom-4 left-4 h-12 w-12 group-hover/fc:scale-[1.12] group-hover/fc:bg-[#d6ae55]`}>
                      <PlayGlyph />
                    </span>
                  </span>
                  <span className={`mt-4 block ${DISPLAY} text-[1.3125rem] leading-[1.2] text-[#f5f6fc] [text-wrap:balance]`}>{f.title}</span>
                </button>
              </li>
            ))}
          </ul>
          <noscript>
            <p className="text-[#f5f6fc]/70">
              Watch every film on the{' '}
              <a className="underline" href={playlistUrl}>
                ATLAS convocation playlist
              </a>
              .
            </p>
          </noscript>
        </div>

        <a className={`mt-12 inline-flex ${BTN} ${BTN_LINE}`} href={playlistUrl} target="_blank" rel="noopener">
          {films.playlistLabel}
          <ArrowOut />
        </a>
      </div>
    </section>
  );
}
