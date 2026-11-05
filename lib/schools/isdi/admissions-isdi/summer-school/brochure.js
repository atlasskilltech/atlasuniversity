/*
* The hero's "Download Brochure" popup — the `w-embed w-script` block at the
 * foot of the page, `#npf-popup-overlay-brochure` plus the listener bound to
 * `[data-id="download-brochure"]`.
 *
 * It is the `script` kind: the panel holds a CRM widget embedded as
 * `<script src=".../6a9029a13af53723967be3fc/embed.js" data-atlas-height="650" async>`,
 * the same shape the B.Tech Design Engineering page's one popup uses. Its `.npf_wgts` half
 * is commented out, so the `emwgts.js` the reference still injects on click has nothing to
 * fill — not reproduced, as everywhere else in this rebuild.
 *
 * Measured off the page's own `<style>`: the panel is the ISDI 580px box (100% wide /
 * max 580 / height auto / max 90vh, r8, p20, scrollbar hidden) and `#npf-close-brochure`
 * declares **no** `line-height`, so it is the 35x37 button — `BrochureButton`'s default.
 * The wide `90% / max-width 800 / height 80%` shape is in the stylesheet directly above it,
 * commented out.
 */
export const isdiAdmSummerSchoolBrochure = {
  /* the dialog's accessible name; the footer's VideoModal is a `[role=dialog]`
     on every page, so the popup needs one of its own to be addressable */
  title: 'Summer School brochure request',
  kind: 'script',
  src: 'https://crm.atlasskilltech.app/widgets/6a9029a13af53723967be3fc/embed.js',
  height: 650,
  label: 'Download Brochure',
};
