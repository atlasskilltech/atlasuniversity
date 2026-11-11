'use client';

import { useId, useRef, useState } from 'react';
import { cx, FOCUS } from './ui';

/**
 * Tabs for a homepage section. The panels are rendered on the server and passed in; this island only
 * switches between them (WAI-ARIA tabs: arrow keys, Home / End, one tab stop). Every panel stays in the
 * HTML, so the stories are readable without JavaScript.
 */
export default function HomeTabs({ labels, panels }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef([]);
  const go = (i) => {
    const n = (i + labels.length) % labels.length;
    setActive(n);
    refs.current[n]?.focus();
  };
  const onKey = (e) => {
    const map = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: labels.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key]);
    }
  };
  return (
    <div>
      <div role="tablist" aria-orientation="horizontal" className="-mx-1 mb-8 flex flex-wrap gap-x-1 gap-y-2 border-b border-news-line md:mb-10">
        {labels.map((label, i) => (
          <button
            key={label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${base}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
            className={cx(
              'relative -mb-px inline-flex h-11 items-center px-3 font-sans text-[13.5px] font-semibold tracking-[0.01em] transition-colors',
              'after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-news-accent after:transition-transform after:duration-300 hover:after:scale-x-100 aria-selected:after:scale-x-100',
              'text-news-ink/70 hover:text-news-ink aria-selected:text-news-ink',
              FOCUS,
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div key={labels[i]} id={`${base}-panel-${i}`} role="tabpanel" aria-labelledby={`${base}-tab-${i}`} hidden={active !== i}>
          {panel}
        </div>
      ))}
    </div>
  );
}
