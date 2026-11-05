'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * SSR-safe media query hook.
 *
 * `useSyncExternalStore` is used rather than useState + useEffect so React can
 * match the server snapshot during hydration (no mismatch warning) and then
 * settle on the real value before paint.
 */
export function useMediaQuery(query, serverSnapshot = false) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverSnapshot, [serverSnapshot]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * The single desktop <-> mobile threshold used across the whole header.
 *
 * The reference decides this with a User-Agent regex, so a narrow desktop
 * window never gets a working hamburger. It also mixes breakpoints — layout
 * flips at 991px but the drawer CSS is capped at 768px, leaving 769-991px with
 * a visible hamburger that does nothing. One viewport-driven threshold at 992px
 * is used instead, matching the breakpoint the Webflow layout actually flips at.
 */
export const DESKTOP_QUERY = '(min-width: 992px)';

export function useIsDesktop() {
  // Server renders the desktop tree; the client corrects it during hydration.
  return useMediaQuery(DESKTOP_QUERY, true);
}
