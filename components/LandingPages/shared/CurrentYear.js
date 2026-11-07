'use client';

import { useSyncExternalStore } from 'react';

/**
 * The legacy landing pages print the copyright year with `document.write(new Date().getFullYear())`,
 * i.e. at view time. The static render carries the build year; the visitor's clock is read after
 * hydration, so a page built in December still reads right in January.
 */
const noop = () => () => {};

export default function CurrentYear({ initial = 2026 }) {
  return useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => initial,
  );
}
