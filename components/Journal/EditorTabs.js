'use client';

import { useEffect, useState } from 'react';
import { cx } from '@/lib/cx';

/*
 * The Editor-in-Chief profile tabs — reference `.custom-tabv2` (three `<a data-bs-toggle="list">`)
 * over `.tab-content` (three Bootstrap `.tab-pane.fade` panes), driven upstream by bootstrap.bundle.
 * Restated as a small tab widget: the triggers are `<button>`s (they never navigate), only the
 * current pane is mounted, and it fades in over Bootstrap's `.fade` timing (opacity, 150ms linear).
 *
 * Measured on production (1920 / 1440 / 768 / 390):
 *   tab        flex: 1 (`width: 100%` in a flex row) · padding 8px 12px · 1px border, none at the
 *              bottom · radius 15px 15px 0 0 · centred · #000, transparent border; current and
 *              hover #777 text + #777 border. No underline on hover (`.custom-tabv2 > a` comes after
 *              the page's `a:hover`).
 *   <=576      the strip becomes a column and the current tab gains its bottom border.
 *   content    1px #777 top + left border (plus right at <=576), padding 16px 12px.
 */
const TAB = 'w-full rounded-t-[15px] border border-b-0 bg-transparent px-3 py-2 text-center font-[inherit] text-[16px] leading-[1.5]';
const TAB_ON = `${TAB} border-[#777] text-[#777] max-lp:border-b`;
const TAB_OFF = `${TAB} border-transparent text-black hover:border-[#777] hover:text-[#777]`;

export default function EditorTabs({ tabs, initial }) {
  const [active, setActive] = useState(initial);
  const [shown, setShown] = useState(true);

  /* Bootstrap's `.fade`: the incoming pane is made active at opacity 0, then `.show` on the next frame */
  useEffect(() => {
    if (shown) return undefined;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [shown]);

  const select = (id) => {
    if (id === active) return;
    setActive(id);
    setShown(false);
  };

  const pane = tabs.find((t) => t.id === active);

  return (
    <div className="m-0 flex w-full flex-wrap">
      <div className="w-full p-0">
        <div className="flex justify-start max-lp:flex-col" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${t.id}-tab`}
              aria-selected={t.id === active}
              aria-controls={t.id}
              className={t.id === active ? TAB_ON : TAB_OFF}
              onClick={() => select(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full p-0">
        <div className="border-l border-t border-[#777] px-3 py-4 max-lp:border-r">
          <div
            key={pane.id}
            id={pane.id}
            role="tabpanel"
            aria-labelledby={`${pane.id}-tab`}
            className={cx('transition-opacity duration-150 ease-linear', shown ? 'opacity-100' : 'opacity-0')}
          >
            {pane.paras.map((p, i) => (
              <p key={i} className={pane.paras.length === 1 ? 'm-0' : 'mb-2'}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
