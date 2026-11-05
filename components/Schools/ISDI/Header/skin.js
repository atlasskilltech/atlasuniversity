'use client';

import { createContext, useContext } from 'react';
import * as isdiStyles from './styles';

/**
 * The school header's class strings, supplied by whichever school mounts it.
 *
 * The ISDI and ISME headers are the same Webflow chassis (45 of 56 header classes shared);
 * what differs is the palette, the font and a few measurements. Every piece of this header
 * reads its classes through `useSkin()`, which defaults to the ISDI strings — so ISDI, which
 * passes no skin, renders exactly as it did before the header was shared. A school passes a
 * skin that spreads these strings and overrides only what it measures differently
 * (see components/Schools/ISME/Header/styles.js). Every override is a whole literal class
 * string, so the Tailwind scanner still sees it.
 */
export const HeaderSkin = createContext(isdiStyles);

export function useSkin() {
  return useContext(HeaderSkin);
}
