'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * "Download ISDI Outcomes Book" — the hero's lead-capture button and its dialog.
 *
 * The reference authors neither: it drops a `<script>` between the `h1` and
 * `.inner-cover-text` —
 *
 *   <script src="https://crm.atlasskilltech.app/widgets/<id>/embed.js"
 *           data-atlas-mode="popup" data-atlas-button="Download ISDI Outcomes Book"
 *           data-atlas-width="100%" data-atlas-height="620" async>
 *
 * — and `embed.js` injects a `button.atlas-embed-launch` in its place and builds its
 * own `.atlas-embed-overlay` on click. (The page ALSO ships an `.atlas-popup` dialog
 * of its own, commented out line by line, which makes its trailing `<script>` inert:
 * `if (!popup) return`. Dead markup, not ported.)
 *
 * Both halves are reproduced as markup rather than by loading the widget, so nothing
 * off this origin is requested until a visitor opens the dialog — the property every
 * ISDI page in this port holds, and the same call `ProgramDetail/BrochureButton`
 * makes for the programme pages' popups. Measured with the real dialog open on
 * production at 1440 and 390:
 *
 *   button.atlas-embed-launch  248.7 x 42.5, white on #ec1376, r40, p 10/14,
 *                              system-ui 15px/700, no border, pointer. The pink and
 *                              the pill come from the page's own `<style>`; the
 *                              font and the reset are the widget's.
 *   .atlas-embed-overlay       fixed inset 0, flex centred, p20, rgba(15,23,42,.55)
 *   .atlas-embed-card          300 x 620 at BOTH widths, white, r14,
 *                              `0 24px 60px rgba(2,6,23,.35)`, clipped,
 *                              max-width 100%, max-height calc(100vh - 80px)
 *   .atlas-embed-close         32 x 32 round at 8/8, #334155 on rgba(15,23,42,.06),
 *                              22px/1, p 1px 6px, z4
 *   iframe                     100% x 100%, no border
 *
 * The widget's own src carries three first-touch analytics parameters
 * (`atlas_ft_landing`, `atlas_ft_at`, `atlas_visits`) that it keeps in storage.
 * Those are the widget's, not the page's, so the port requests the plain `/embed`
 * URL rather than fabricating a timestamp and a visit count.
 *
 * `z-2000` is the project's overlay tier, above the fixed header bars at 1090/1100
 * (the widget's own is 2147483000, which is the same place in the stack).
 */
export default function OutcomesBook({ label, src }) {
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
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      {/* ref button.atlas-embed-launch */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block cursor-pointer rounded-[40px] border-0 bg-[#ec1376] px-[14px] py-2.5 text-[15px]
                   font-bold leading-[1.5] text-white
                   [font-family:system-ui,-apple-system,'Segoe_UI',Roboto,sans-serif]"
      >
        {label}
      </button>

      {open
        && typeof document !== 'undefined'
        && createPortal(
          /* ref .atlas-embed-overlay */
          <div
            className="fixed inset-0 z-2000 flex items-center justify-center bg-[rgba(15,23,42,0.55)] p-5"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            role="presentation"
          >
            {/* ref .atlas-embed-card */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className="relative h-[620px] max-h-[calc(100vh-80px)] w-[300px] max-w-full overflow-hidden
                         rounded-[14px] bg-white shadow-[0_24px_60px_rgba(2,6,23,0.35)]"
            >
              {/* ref button.atlas-embed-close */}
              <button
                type="button"
                ref={closeRef}
                onClick={close}
                aria-label="Close form"
                className="absolute right-2 top-2 z-[4] h-8 w-8 cursor-pointer rounded-full border-0
                           bg-[rgba(15,23,42,0.06)] px-1.5 py-px text-[22px] leading-none text-[#334155]"
              >
                &times;
              </button>
              <iframe
                src={src}
                title={label}
                className="block h-full w-full max-w-full border-0"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
