'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';
import PrimaryButton from '@/components/ui/PrimaryButton';

/**
 * The "Download Brochure" button and the lead-capture modal it opens — port of
 * the two live popups at the foot of `programs-list-integrated.php`
 * (`:188-497`).
 *
 * The reference ships each one as a hidden overlay plus a `DOMContentLoaded`
 * listener bound to `[data-id="law"]` / `[data-id="btech"]`, which are the two
 * "Download Brochure" anchors. Both are real: verified on production, clicking
 * the Law button sets the overlay to `display: flex` and reveals a 580x667 white
 * box holding the CRM form. So this is reproduced as behaviour rather than
 * flattened into a dead button.
 *
 * ── The embed is third-party, and that is the reference's own choice ──────
 * Two different providers, one per programme:
 *
 *   iframe  an `<iframe>` to `crm.atlasskilltech.app/widgets/<id>/embed`
 *           (BBA LL.B.). The reference also appends any `utm_*` query
 *           parameters from the current URL onto the iframe `src`, which is
 *           reproduced.
 *   npf     a NoPaperForms widget — an empty `div.npf_wgts[data-w]` that
 *           `widgets.in5.nopaperforms.com/emwgts.js` fills in once loaded
 *           (B.Tech + MBA). The script is injected on first open and only once,
 *           exactly as the reference does it.
 *
 * These are the only remote URLs in the Programs port. They are **not assets**
 * — no image, font or media travels over them — they are the form provider the
 * page integrates with, and stripping them would turn a working brochure
 * request into a dead button. They load nothing until the visitor opens a modal.
 *
 * ── /programs/ug/ug-design-and-innovation reuses this, with three changes ──
 * That page authors **one** overlay shared by all seven "Download Brochure"
 * buttons (`[data-id="download-brochure"]`, seven of them, each also carrying
 * the same duplicate `id` — not reproduced). Its differences travel as data:
 *
 *   - the iframe is a different widget and `height="650"`, not 621
 *   - there is **no** `utm_*` forwarding script, hence `forwardUtm`
 *   - its `.npf_wgts` div is commented out, so the `emwgts.js` the reference
 *     still injects has nothing to fill
 *
 * That last one is the only reference behaviour this component does not
 * reproduce. Verified on production: clicking a brochure button really does
 * fetch `emwgts.js`, and the element it exists to populate is commented out of
 * the markup, so it paints nothing and changes nothing. A third-party script
 * that provably cannot have an effect is not worth the request, so `kind`
 * is `'iframe'` there and the injection never runs.
 *
 * ── A third popup exists and is dead ──────────────────────────────────────
 * `#btechint-popup-overlay` is bound to `[data-id="btech-integrated"]`, which
 * matches **no element** — confirmed on production, `querySelectorAll` returns
 * 0. It is not ported, the same call every other page's orphaned NoPaperForms
 * popup got.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *   #law-popup-overlay   fixed inset 0, z 9999, rgba(0,0,0,.7), flex centred
 *   #law-popup           #fff, width 100%, max-width 580, height auto,
 *                        max-height 90vh, radius 8, padding 20, scrollable
 *                        with the scrollbar hidden
 *   #law-close           absolute top 10 right 15, #fff on #000, 18px,
 *                        padding 5/10, radius 4, z 10
 *   iframe               width 100%, height 621, no border
 *
 * The overlay is portalled to `document.body`: `CONTAINER` carries
 * `relative z-[1]`, which is a stacking context, so a dialog rendered in place
 * would sit under the fixed header bars however high its own z-index.
 */

const OVERLAY =
  'fixed inset-0 z-[9999] flex items-center justify-center bg-black/70';

/*
 * Two panel shapes, and which one a popup gets follows what it holds. Read off
 * all five popups in the Programs port with the CSS comments stripped first —
 * every one of them ships both rules, one of them commented out, so a naive
 * grep reads the dead one:
 *
 *   iframe  #law-popup, #npf-popup-brochure, #npf-popup (x2)
 *           width 100%, max-width 580, height auto, max-height 90vh,
 *           scrollbars hidden
 *   npf     #npf-popup-btech (x2)
 *           width 90%, max-width 800, height 80%, scrollbars left alone
 *
 * The correlation is causal rather than coincidental — the NoPaperForms widget
 * renders a 700px form and needs the taller box — so the shape is derived from
 * `kind` instead of travelling as a separate field.
 */
const PANEL = {
  iframe:
    'relative h-auto max-h-[90vh] w-full max-w-[580px] overflow-y-auto rounded-lg bg-white p-5 '
    + '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
  npf: 'relative h-4/5 w-[90%] max-w-[800px] overflow-y-auto rounded-lg bg-white p-5',
};

const CLOSE =
  'absolute right-[15px] top-[10px] z-10 cursor-pointer rounded border-0 bg-black '
  + 'px-2.5 py-[5px] text-[18px] text-white';

/*
 * `line-height: 1` is declared on four of the five close buttons.
 * /programs/ug/ug-design-and-innovation's omits it, so that one alone lays out
 * at the normal line-height — measured 35x37 against the others' 35x28. It
 * travels with the data rather than being assumed.
 */
const CLOSE_LEADING = {
  none: 'leading-none',
  normal: 'leading-normal',
};

const NPF_SCRIPT = 'https://widgets.in5.nopaperforms.com/emwgts.js';

export default function BrochureModal({ brochure }) {
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

  /* ref the reference's `if (!window.npfLoaded…)` guard — the widget script is
     appended on first open and never twice */
  useEffect(() => {
    if (!open || brochure.kind !== 'npf') return;
    if (document.querySelector(`script[src="${NPF_SCRIPT}"]`)) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = NPF_SCRIPT;
    document.body.appendChild(s);
  }, [open, brochure.kind]);

  /*
   * ref the inline script that forwards `utm_*` onto the iframe src. Only
   * /programs/programs-list-integrated authors it — /programs/ug/ug-design-and-
   * innovation's popup has no such script, so the flag travels with the data
   * rather than being assumed.
   */
  const iframeSrc = () => {
    if (!brochure.forwardUtm) return brochure.src;
    if (typeof window === 'undefined') return brochure.src;
    try {
      const p = new URLSearchParams(window.location.search);
      const carried = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
        .map((k) => (p.get(k) ? `${k}=${encodeURIComponent(p.get(k))}` : null))
        .filter(Boolean);
      if (!carried.length) return brochure.src;
      return brochure.src + (brochure.src.includes('?') ? '&' : '?') + carried.join('&');
    } catch {
      return brochure.src;
    }
  };

  return (
    <>
      {/* ref a.btn-primary[data-id] — `href="#"` upstream, so it is a button
          here: it opens a dialog and never navigates */}
      <PrimaryButton
        href="#"
        variant="outline-medium"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        aria-haspopup="dialog"
      >
        {brochure.label}
      </PrimaryButton>

      {open
        && typeof document !== 'undefined'
        && createPortal(
          /* ref #law-popup-overlay / #npf-popup-overlay-btech */
          <div
            className={OVERLAY}
            role="dialog"
            aria-modal="true"
            aria-label={brochure.title}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            {/* ref #law-popup / #npf-popup-btech */}
            <div className={PANEL[brochure.kind] ?? PANEL.iframe}>
              {/* ref #law-close / #npf-close-btech */}
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className={cx(CLOSE, CLOSE_LEADING[brochure.closeLeading ?? 'none'])}
                aria-label="Close"
              >
                ✕
              </button>

              {brochure.kind === 'iframe' ? (
                /*
                 * `inline align-baseline` is deliberate. Preflight declares
                 * `iframe { display: block; vertical-align: middle }`, and
                 * BOTH have to be undone: block removes the line box, and
                 * `middle` removes the descender under it. The reference's
                 * iframe is a baseline-aligned inline replaced element, so its
                 * panel is 6px taller than the iframe plus padding — measured
                 * 696 against 650+40 here, and 667 against 621+40 on
                 * /programs/programs-list-integrated.
                 */
                <iframe
                  title={brochure.title}
                  src={iframeSrc()}
                  width="100%"
                  height={brochure.height}
                  className="inline max-w-full border-0 align-baseline"
                />
              ) : (
                /*
                 * ref #npf-container-btech > .npf_wgts[data-w] — emwgts.js
                 * fills this in once it loads.
                 *
                 * Every page that ships an `npf` popup also ships
                 * `.npf_wgts { height: 700px }` and
                 * `#npf-popup-btech iframe { height: 100% }`, so the container
                 * is pinned before the widget arrives and whatever iframe the
                 * widget injects fills it.
                 */
                <div>
                  <div className="npf_wgts h-[700px] [&_iframe]:h-full" data-w={brochure.widget} />
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
