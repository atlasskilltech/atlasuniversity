'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';
import PrimaryButton from '@/components/ui/PrimaryButton';
import ButtonRegular from '@/components/ui/ButtonRegular';

/**
 * The B.Des pages' two lead-capture popups and the buttons that open them — port of
 * the `w-embed w-script` block at the foot of
 * b-des/accessory-design-&-craft.php (`#npf-popup-overlay-brochure` and
 * `#npf-popup-overlay-brochure-1`).
 *
 * The reference ships each as a hidden overlay plus a listener bound to
 * `[data-id="download-brochure"]` / `[data-id="download-brochure-1"]` — the hero's
 * two outline buttons (repeated on every slide) and the closing banner's second
 * button. Both are live on production, so they are reproduced as behaviour:
 *
 *   iframe  `crm.atlasskilltech.app/widgets/<id>/embed` at height 650
 *   npf     an empty `div.npf_wgts[data-w]` that
 *           `widgets.in5.nopaperforms.com/emwgts.js` fills on first open, injected
 *           once, exactly as the reference's `window.npfLoadedBrochure` guard does
 *   script  a CRM widget the reference embeds as `<script src=".../<id>/embed.js"
 *           data-atlas-width data-atlas-height async>` INSIDE the panel rather than as an
 *           iframe. B.Tech Design Engineering ships only this one, in the 580px panel, and
 *           its second popup is commented out line by line with its listener left live —
 *           an orphan, so it is not ported.
 *
 * These two URLs are the only remote ones on the page; nothing loads until a
 * visitor opens a popup. This is the same integration
 * `components/Programs/BrochureModal` reproduces for the ATLAS Programs pages, but
 * that component owns its own `outline-medium` ATLAS button and panel ids; the ISDI
 * hero button is the `.btn-primary` `outline-white` pill, so the trigger lives here.
 *
 * Measured off the page's own `<style>`:
 *   overlay   fixed inset 0, z 9999, rgba(0,0,0,.7), flex centred
 *   panel     #fff, r8, p20; the iframe popup is 100% wide / max 580 / auto tall /
 *             max 90vh with its scrollbar hidden, the widget popup 90% wide /
 *             max 800 / 80% tall with `.npf_wgts { height: 700px }`
 *   close     absolute 10/15, #fff on #000, 18px/1, p 5/10, r4
 */

const OVERLAY = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/70';
const PANEL = {
  iframe:
    'relative h-auto max-h-[90vh] w-full max-w-[580px] overflow-y-auto rounded-lg bg-white p-5 '
    + '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
  npf: 'relative h-4/5 w-[90%] max-w-[800px] overflow-y-auto rounded-lg bg-white p-5',
};
/* the script kind sits in the iframe panel — the reference's own `#npf-popup-brochure` rule */
PANEL.script = PANEL.iframe;
const CLOSE =
  'absolute right-[15px] top-[10px] z-10 cursor-pointer rounded border-0 bg-black px-2.5 py-[5px] text-[18px] leading-none text-white';
const NPF_SCRIPT = 'https://widgets.in5.nopaperforms.com/emwgts.js';

/*
 * The two shapes that open these popups: the hero's and the banner's `.btn-primary`
 * pill, and the curriculum's `.button-regular` (also `href="#"` with the same
 * `data-id`, so it is a dialog trigger too and not the plain link it looks like).
 */
const SHAPES = { 'btn-primary': PrimaryButton, 'button-regular': ButtonRegular };

export default function BrochureButton({
  brochure,
  // the BUTTON's own text; `brochure.label` is only the default. They are the same
  // wherever a popup has one trigger, which is every B.Des page — but B.Tech Design
  // Engineering points "Download Brochure" and "Talk to an Admissions Counsellor" at the
  // SAME popup, and without this both rendered the popup's label.
  label,
  variant = 'outline-white',
  shape = 'btn-primary',
  className,
}) {
  const Button = SHAPES[shape] ?? PrimaryButton;
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

  /* ref `if (!window.npfLoadedBrochure)` — injected on first open and never twice */
  useEffect(() => {
    if (!open || brochure.kind !== 'npf') return;
    if (document.querySelector(`script[src="${NPF_SCRIPT}"]`)) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = NPF_SCRIPT;
    document.body.appendChild(s);
  }, [open, brochure.kind]);

  /* the `script` kind embeds the CRM widget in the panel itself. React will not run a
     <script> it renders, so it is appended on first open — and only once, because the
     widget appends its own iframe to this node and a second run would double it. */
  const mountRef = useRef(null);
  useEffect(() => {
    if (!open || brochure.kind !== 'script') return;
    const host = mountRef.current;
    if (!host || host.childElementCount > 0) return;
    const s = document.createElement('script');
    s.src = brochure.src;
    s.async = true;
    s.setAttribute('data-atlas-width', '100%');
    s.setAttribute('data-atlas-height', String(brochure.height ?? 650));
    host.appendChild(s);
  }, [open, brochure.kind, brochure.src, brochure.height]);

  return (
    <>
      {/* ref a.btn-primary[data-id] — `href="#"` upstream, so a button here: it opens
          a dialog and never navigates */}
      <Button
        href="#"
        variant={variant}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        aria-haspopup="dialog"
      >
        {label ?? brochure.label}
      </Button>

      {open
        && typeof document !== 'undefined'
        && createPortal(
          /* ref #npf-popup-overlay-brochure(-1) — portalled to <body>, because a dialog
             rendered inside `.container` (`relative z-[1]`) would sit under the header */
          <div
            className={OVERLAY}
            role="dialog"
            aria-modal="true"
            aria-label={brochure.title}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            {/* ref #npf-popup-brochure(-1) */}
            <div className={cx(PANEL[brochure.kind] ?? PANEL.iframe)}>
              <button ref={closeRef} type="button" onClick={close} className={CLOSE} aria-label="Close">
                ✕
              </button>

              {brochure.kind === 'script' ? (
                /* ref the panel's own `<script src=".../embed.js">` */
                <div ref={mountRef} className="[&>iframe]:w-full" />
              ) : brochure.kind === 'iframe' ? (
                /* `inline align-baseline` undoes Preflight's `display: block` and
                   `vertical-align: middle`, so the panel keeps the reference's
                   baseline descender under the iframe */
                <iframe
                  src={brochure.src}
                  title={brochure.title}
                  width="100%"
                  height={brochure.height}
                  frameBorder="0"
                  className="inline max-w-full border-0 align-baseline"
                />
              ) : (
                /* ref .npf_wgts[data-w] + `.npf_wgts { height: 700px }` */
                <div className="npf_wgts h-[700px] [&>iframe]:h-full" data-w={brochure.widget} />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
