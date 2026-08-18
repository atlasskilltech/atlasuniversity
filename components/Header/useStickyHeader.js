'use client';

import { useEffect, useRef, useState } from 'react';
import { DESKTOP_QUERY } from '@/lib/useMediaQuery';

/**
 * Sticky-header scroll behaviour.
 *
 * Ported from the scroll handler in reference/assets/include/footer.php:
 *   scrollY === 0        -> both bars visible, main bar resting at top:48px
 *   scrolling down > 150 -> both bars retract
 *   scrolling up         -> top bar stays hidden, main bar pins to top:0
 *
 * While an in-page anchor scroll is running the reference keeps both bars out
 * of the way so they never cover the anchor target; that guard is reproduced.
 *
 * Returns render state rather than mutating the DOM, so React owns the markup.
 */
export function useStickyHeader() {
  const [topbarHidden, setTopbarHidden] = useState(false);
  const [mainbarHidden, setMainbarHidden] = useState(false);
  const [mainbarPinned, setMainbarPinned] = useState(false);

  const lastY = useRef(0);
  const anchorScrolling = useRef(false);
  const anchorTimer = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);

    const rest = () => {
      setTopbarHidden(false);
      setMainbarHidden(false);
      setMainbarPinned(false);
      document.body.classList.remove('hide-header', 'scrolled-head');
    };

    const update = () => {
      ticking.current = false;
      const y = window.scrollY;

      if (anchorScrolling.current) {
        if (y < lastY.current && y > 0) {
          setTopbarHidden(true);
          setMainbarHidden(true);
          setMainbarPinned(true);
          document.body.classList.add('hide-header', 'scrolled-head');
        }
        lastY.current = y;
        return;
      }

      if (y === 0) {
        rest();
      } else if (y > lastY.current && y > 150) {
        // scrolling down past the threshold -> retract everything
        setTopbarHidden(true);
        setMainbarHidden(true);
        setMainbarPinned(true);
        document.body.classList.add('hide-header', 'scrolled-head');
      } else if (y < lastY.current) {
        // scrolling up -> reveal the main bar only, pinned to the very top
        setTopbarHidden(true);
        setMainbarHidden(false);
        setMainbarPinned(true);
        document.body.classList.remove('hide-header');
        document.body.classList.add('scrolled-head');
      }

      lastY.current = y;
    };

    const onScroll = () => {
      if (!mql.matches || ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    const armAnchorGuard = (ms) => {
      anchorScrolling.current = true;
      clearTimeout(anchorTimer.current);
      anchorTimer.current = setTimeout(() => {
        anchorScrolling.current = false;
        lastY.current = window.scrollY;
      }, ms);
    };

    const onDocumentClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (document.querySelector(href)) armAnchorGuard(3000);
    };

    const onHashChange = () => armAnchorGuard(1000);

    const syncToBreakpoint = () => {
      if (mql.matches) {
        lastY.current = window.scrollY;
        update();
      } else {
        // never let the mobile layout inherit a retracted bar
        rest();
      }
    };

    lastY.current = window.scrollY;
    syncToBreakpoint();

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onDocumentClick);
    window.addEventListener('hashchange', onHashChange);
    mql.addEventListener('change', syncToBreakpoint);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onDocumentClick);
      window.removeEventListener('hashchange', onHashChange);
      mql.removeEventListener('change', syncToBreakpoint);
      clearTimeout(anchorTimer.current);
      document.body.classList.remove('hide-header', 'scrolled-head');
    };
  }, []);

  return { topbarHidden, mainbarHidden, mainbarPinned };
}
