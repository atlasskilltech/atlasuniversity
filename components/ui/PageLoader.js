'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cx } from '@/lib/cx';

/**
 * The ATLAS route-transition loader — one shared overlay for the whole site,
 * mounted once in `app/layout.js`.
 *
 * ── When it shows ─────────────────────────────────────────────────────────
 * A single capture-phase `click` listener on `document` decides whether a click
 * is going to become an in-app route change. It never touches the link itself,
 * so `SmartLink`, every `<a>` in the header, the footer and the page bodies all
 * behave exactly as they did before — the listener only observes.
 *
 * A click starts the loader **only** when all of these hold:
 *   - it is a plain left-click (no ctrl/meta/shift/alt, no middle button)
 *   - nothing has already called `preventDefault()` on it
 *   - the closest `<a>` has an `href`, no `target`, no `download`,
 *     no `rel="external"`
 *   - the href resolves to this origin and to `http(s)` — so `mailto:`,
 *     `tel:`, and every off-site link (Instagram, YouTube, LinkedIn, the CRM
 *     brochure embeds…) are ignored
 *   - the target is not the current page and not a bare hash on it, so
 *     `href="#"` and in-page anchors never raise it
 *
 * It hides when `usePathname()` reports the new route has committed.
 *
 * `usePathname` alone is deliberate: `useSearchParams` would opt every route
 * into dynamic rendering unless wrapped in Suspense, and this project has
 * already been bitten by a client hook flipping the homepage from static to
 * dynamic. No route here is driven by a query string. `Header` reads
 * `usePathname` the same way and every page still builds static.
 *
 * ── Why it does not flicker ───────────────────────────────────────────────
 * Two thresholds, both measured in the browser rather than guessed:
 *   SHOW_DELAY   nothing is rendered at all until a navigation has been
 *                pending this long, so a route that resolves instantly never
 *                paints a loader
 *   MIN_VISIBLE  once it *is* on screen it stays for at least this long, so a
 *                navigation that lands 20ms later cannot produce a one-frame
 *                flash
 * `SAFETY_MS` is the backstop: if a navigation is abandoned (a route that
 * throws, a click the router ends up ignoring) the overlay takes itself down
 * rather than stranding the page.
 *
 * ── Why it does not fight the mobile drawer ───────────────────────────────
 * `Header` holds `overflow-hidden` on `<body>` while its drawer is open, and
 * the drawer does not close on navigation. So this component only removes the
 * class **if it was the one that added it** — otherwise navigating from an open
 * drawer would unlock scrolling behind it.
 */

const GIF = '/assets/images/loader/atlas-logo-animation.gif';

/*
 * The warmed image is held at module scope on purpose. `public/` is served with
 * `cache-control: public, max-age=0, must-revalidate`, so letting the Image go
 * out of scope would leave the overlay waiting on a revalidation round-trip on
 * exactly the slow connections it exists for. A retained decoder keeps the
 * frames in the memory cache for the life of the tab.
 */
let warmed = null;

/* ms a navigation must be pending before anything is rendered */
const SHOW_DELAY = 140;
/* ms the overlay stays up once it has been rendered */
const MIN_VISIBLE = 500;
/* ms after which an abandoned navigation stops holding the overlay */
const SAFETY_MS = 8000;

/* ref the animation's own 130x130 logical screen — never scaled up, so the
   frames stay crisp; one notch smaller below 480 where the viewport is tight */
const MARK = 'h-[130px] w-[130px] max-sm:h-[104px] max-sm:w-[104px]';

/*
 * The overlay veils the outgoing page rather than replacing it: `bg-white/95`
 * over a 3px backdrop blur keeps the page faintly readable underneath, which is
 * the same restraint the rest of the site uses, and the mark is a transparent
 * GIF in teal + indigo so it needs a light ground to read against.
 *
 * The halo is `atlas.teal` at 10% — the brand colour the mega menu already uses
 * for its hover underline — so the mark sits in something intentional rather
 * than on flat white. No new colour, radius or type is introduced.
 */
const OVERLAY =
  'fixed inset-0 z-2000 flex items-center justify-center overflow-hidden '
  + 'bg-white/95 backdrop-blur-[3px] transition-opacity duration-200 ease-wf';

const HALO =
  'pointer-events-none absolute h-[420px] w-[420px] rounded-full max-sm:h-[280px] max-sm:w-[280px] '
  + 'bg-[radial-gradient(circle,rgba(2,179,195,0.10)_0%,rgba(2,179,195,0)_70%)]';

export default function PageLoader() {
  const pathname = usePathname();

  /* `rendered` puts the overlay in the DOM; `shown` fades it in on the next
     frame so the transition actually runs */
  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);

  const showTimer = useRef(null);
  const hideTimer = useRef(null);
  const safetyTimer = useRef(null);
  const shownAt = useRef(0);
  /* the pathname the pending navigation started from */
  const startedFrom = useRef(null);

  const clearTimers = useCallback(() => {
    [showTimer, hideTimer, safetyTimer].forEach((t) => {
      if (t.current) clearTimeout(t.current);
      t.current = null;
    });
  }, []);

  const stop = useCallback(() => {
    clearTimers();
    startedFrom.current = null;
    setShown(false);
    setRendered(false);
  }, [clearTimers]);

  /* ── start: a click that is going to become a route change ─────────────── */
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!a) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download')) return;
      if ((a.getAttribute('rel') || '').split(/\s+/).includes('external')) return;

      let url;
      try {
        url = new URL(a.getAttribute('href'), window.location.href);
      } catch {
        return;
      }
      /* off-site, mailto:, tel:, and any other scheme */
      if (url.origin !== window.location.origin) return;
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
      /* `href="#"`, in-page anchors, and re-clicking the current page */
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      clearTimers();
      startedFrom.current = window.location.pathname;

      showTimer.current = setTimeout(() => {
        setRendered(true);
        shownAt.current = Date.now();
      }, SHOW_DELAY);

      safetyTimer.current = setTimeout(stop, SAFETY_MS);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [clearTimers, stop]);

  /* ── fade in on the frame after the overlay mounts ─────────────────────── */
  useEffect(() => {
    if (!rendered) return undefined;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [rendered]);

  /* ── stop: the new route has committed ─────────────────────────────────── */
  useEffect(() => {
    if (startedFrom.current === null) return undefined;
    if (pathname === startedFrom.current) return undefined;

    /*
     * Nothing was ever painted, so there is no state to unwind — just drop the
     * pending navigation. Deliberately not `stop()`: that would setState
     * synchronously in an effect body for no benefit.
     */
    if (!rendered) {
      clearTimers();
      startedFrom.current = null;
      return undefined;
    }

    const held = Date.now() - shownAt.current;
    const wait = Math.max(0, MIN_VISIBLE - held);
    hideTimer.current = setTimeout(stop, wait);
    return undefined;
    /* `rendered` is read, not depended on: this must run on a pathname change */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* ── scroll lock, without clobbering the drawer's ──────────────────────── */
  useEffect(() => {
    if (!rendered) return undefined;
    const body = document.body;
    const heldByOther = body.classList.contains('overflow-hidden');
    if (!heldByOther) body.classList.add('overflow-hidden');
    return () => {
      if (!heldByOther) body.classList.remove('overflow-hidden');
    };
  }, [rendered]);

  /*
   * ── warm the animation while the browser is idle ──────────────────────────
   * The overlay only mounts once a navigation is already underway, so an
   * un-cached GIF starts downloading at the exact moment the connection is
   * busiest — measured under a 1500ms-latency profile, the veil painted with no
   * mark in it at all. Fetching it on idle costs nothing at first paint (it is
   * 49KB, requested after the page has settled) and guarantees the animation is
   * decoded before the visitor can click anything.
   */
  useEffect(() => {
    let cancelled = false;
    const warm = () => {
      if (cancelled || warmed) return;
      warmed = new Image();
      warmed.src = GIF;
    };
    const ric = window.requestIdleCallback;
    const id = ric ? ric(warm, { timeout: 3000 }) : setTimeout(warm, 1500);
    return () => {
      cancelled = true;
      if (ric && window.cancelIdleCallback) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  /* ── tidy up on unmount ────────────────────────────────────────────────── */
  useEffect(() => clearTimers, [clearTimers]);

  if (!rendered) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      aria-busy="true"
      className={cx(OVERLAY, shown ? 'opacity-100' : 'opacity-0')}
    >
      <span className={HALO} aria-hidden="true" />

      {/*
        A plain <img>: this is an animated GIF, and next/image would either
        pass it through unoptimised or drop the animation. 130x130 is its own
        logical screen size, stated so the box never reflows.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={GIF}
        width={130}
        height={130}
        alt=""
        aria-hidden="true"
        className={cx('relative object-contain', MARK)}
      />
    </div>
  );
}
