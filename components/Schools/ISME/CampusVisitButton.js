'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PrimaryButton from '@/components/ui/PrimaryButton';

/*
 * The ISME footer's campus-visit popup. footer.php ships `#npf-popup-overlay-campus` on every ISME
 * page and binds it to `[data-id="campus-visit"]`; Parents Corner is the one page whose button
 * carries that attribute (its banner's "Schedule a visit", authored `href="#"`), so there the popup
 * is live. A control that opens a dialog is a `<button>` (PrimaryButton renders one when given an
 * onClick), and the NoPaperForms loader is injected on first open only, as the reference does.
 *
 * Measured with it open on production at 1440 / 390:
 *   overlay   fixed inset 0, z 9999, rgba(0,0,0,.7), flex centred
 *   panel     #fff, r8, p20, 90% wide / max 800, 80% tall, overflow-y auto (800x720 at 1440, 351x720 at 390,
 *             a 900px viewport)
 *   close     absolute 10/15, #fff on #000, 18px/27, p 5/10, r4 (35x37)
 *   widget    `.npf_wgts[data-w]`, 700px tall
 */
const NPF_SCRIPT = 'https://widgets.in5.nopaperforms.com/emwgts.js';
/* footer.php's `#npf-popup-campus > .npf_wgts[data-w]` — the one widget it ships */
const CAMPUS_WIDGET = 'dbf13399d4ea438d3bb2b147f5687059';

export default function CampusVisitButton({ label, variant, icon, iconClassName, widget = CAMPUS_WIDGET }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('overflow-hidden');
    closeRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    if (!document.querySelector(`script[src="${NPF_SCRIPT}"]`)) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = NPF_SCRIPT;
      document.body.appendChild(s);
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <PrimaryButton variant={variant} icon={icon} iconClassName={iconClassName} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {label}
      </PrimaryButton>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70" onClick={(e) => e.target === e.currentTarget && close()}>
            <div role="dialog" aria-modal="true" aria-label={label} className="relative h-[80%] w-[90%] max-w-[800px] overflow-y-auto rounded-lg bg-white p-5">
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-[15px] top-[10px] z-10 cursor-pointer rounded border-0 bg-black px-2.5 py-[5px] text-[18px] leading-normal text-white"
              >
                ✕
              </button>
              <div className="npf_wgts h-[700px]" data-w={widget} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
