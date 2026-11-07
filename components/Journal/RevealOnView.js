'use client';

import { useEffect } from 'react';

/*
 * The reference's `.animation-block` — inside `@media (min-width: 576px)`:
 *
 *   @keyframes appear { from { opacity: 0; transform: translateX(-100px) } to { opacity: 1; transform: none } }
 *   .animation-block { animation: appear linear; animation-timeline: view(); animation-range: entry 0% cover 40%; }
 *
 * A scroll-driven animation, so it is reproduced with the Web Animations API on a ViewTimeline (the
 * project adds no keyframes). Where the browser has no ViewTimeline the reference's CSS does nothing
 * either, so the cards simply render in place — the same fallback. Fill mode is left at the CSS
 * default (none), as authored. Renders nothing; marks are `data-journal-anim` on the cards.
 */
export default function RevealOnView() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.ViewTimeline !== 'function') return undefined;
    const mq = window.matchMedia('(min-width: 576px)');
    let anims = [];

    const stop = () => {
      anims.forEach((a) => a.cancel());
      anims = [];
    };
    const start = () => {
      stop();
      if (!mq.matches) return;
      document.querySelectorAll('[data-journal-anim]').forEach((el) => {
        try {
          anims.push(
            el.animate(
              [
                { opacity: 0, transform: 'translateX(-100px)' },
                { opacity: 1, transform: 'translateX(0px)' },
              ],
              { timeline: new window.ViewTimeline({ subject: el }), rangeStart: 'entry 0%', rangeEnd: 'cover 40%', easing: 'linear' },
            ),
          );
        } catch {
          /* a browser with ViewTimeline but no named ranges: leave the card static */
        }
      });
    };

    start();
    mq.addEventListener('change', start);
    return () => {
      mq.removeEventListener('change', start);
      stop();
    };
  }, []);

  return null;
}
