'use client';

import { useRef, useState } from 'react';

/*
 * A NoPaperForms popup trigger — `button.npfWidgetButton.npfWidget-<id>` plus the page's
 * `npfwpopup.js` + `new NpfWidgetsInit({...})` (9 Core Advantages' "Download ISME Masterclass
 * Brochure"). Upstream loads the vendor script on every page view; here nothing is requested until a
 * visitor clicks, the property every popup in this port holds. The script binds the widget to the
 * button's `npfWidget-<id>` class when it is initialised, so the first click loads it, initialises it
 * and replays the click.
 *
 * `.outComesButton`: #07f6a0 / black 16px/24, p 10/14, r40 (wraps to two lines in a narrow column).
 */
const SRC = 'https://in5cdn.npfs.co/js/widget/npfwpopup.js';

export default function NpfPopupButton({ widget }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const open = () => {
    if (ready) return;
    const init = () => {
      if (typeof window.NpfWidgetsInit === 'function') {
        new window.NpfWidgetsInit(widget.config);
        setReady(true);
        setTimeout(() => ref.current?.click(), 0);
      }
    };
    if (typeof window.NpfWidgetsInit === 'function') {
      init();
      return;
    }
    const s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    s.onload = init;
    document.body.appendChild(s);
  };
  return (
    <button
      ref={ref}
      type="button"
      onClick={open}
      className={`npfWidgetButton npfWidget-${widget.id} flex-none rounded-[40px] bg-atlas-mint px-3.5 py-2.5 text-base text-black`}
    >
      {widget.label}
    </button>
  );
}
