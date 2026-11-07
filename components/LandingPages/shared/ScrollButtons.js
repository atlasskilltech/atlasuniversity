'use client';

import { useEffect, useState } from 'react';

/**
 * The legacy pages' `topFunction()`: `document.getElementById(target).scrollIntoView()` — an instant
 * jump to the lead form. Rendered as a real <button>.
 */
export function ScrollToButton({ target, className, children, ...rest }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => document.getElementById(target)?.scrollIntoView()}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * `#myBtn`: hidden until the window has scrolled more than `after` px (the reference's
 * `window.onscroll` toggling `display`), then shown; clicking it jumps to the form.
 */
export function FloatingScrollButton({ target, after = 500, className, children }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const on = () => setShown(window.scrollY > after);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [after]);
  return (
    <ScrollToButton target={target} className={`${shown ? 'block' : 'hidden'} ${className}`}>
      {children}
    </ScrollToButton>
  );
}
