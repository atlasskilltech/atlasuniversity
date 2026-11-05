'use client';

import { useRef, useState } from 'react';
import { useBrandToast } from '../BrandToast';

/*
 * A button that copies a colour value (ref `[data-copy]` + flash()): announces it, shows the
 * colour chip in the toast and swaps its own visible value to "Copied!" for a moment.
 */
export default function ColorSwatchButton({ value, swatch, label, ariaLabel, className, style, children, flashText = true }) {
  const { copy } = useBrandToast();
  const [flash, setFlash] = useState(false);
  const t = useRef(null);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      style={style}
      onClick={async () => {
        const ok = await copy(value, { label, swatch });
        if (ok && flashText) {
          setFlash(true);
          clearTimeout(t.current);
          t.current = setTimeout(() => setFlash(false), 1400);
        }
      }}
    >
      {typeof children === 'function' ? children(flash) : children}
    </button>
  );
}
