/**
 * The ATLAS CRM "Enquire Now" popup — loader and overlay watcher.
 *
 * The widget is the CRM's own script:
 *
 *   https://crm.atlasskilltech.app/widgets/<id>/embed.js
 *     data-atlas-mode="popup" data-atlas-button="Enquire Now"
 *     data-atlas-width="400"  data-atlas-height="600"
 *
 * What embed.js does (read from the served file, 2026-11-05):
 *  - In popup mode it builds `.atlas-embed-overlay > .atlas-embed-card` (a ×
 *    `.atlas-embed-close` button and the form iframe) in <body>, lazily, on the
 *    first open. Close = ×, Escape, or a click on the backdrop. Opening and
 *    closing only toggle the overlay's inline `opacity` / `display`.
 *  - With `data-atlas-trigger="<selector>"` it renders NO launcher button of its
 *    own; any click on an element matching the selector opens the popup (a
 *    document-level delegate). That is how this page owns its "Enquire Now"
 *    buttons and opens the popup on first visit. `data-atlas-button` is still
 *    set as specified; with a trigger present the script does not use it.
 *  - It reads its attributes from `document.currentScript`, so they must be on
 *    the <script> before it is inserted.
 *  - After a successful submit the CRM form itself navigates the TOP window to
 *    https://www.atlasuniversity.edu.in after 3 seconds (its default redirect;
 *    none is configured for this widget). That is the CRM's behaviour, not this
 *    page's.
 *
 * The script registers global listeners (message, keydown, click delegate) and
 * keeps its overlay in <body> for the life of the document, so it is inserted
 * ONCE per page load: a module-level promise plus an id check survive client
 * navigation away from /search and back. It is never removed.
 *
 * This is a deliberately SOFT gate. Nothing here knows whether a lead was
 * submitted — the CRM gives the host page no verifiable signal — and nothing
 * here claims it was.
 */

const SCRIPT_ID = 'atlas-crm-enquire-widget';
export const TRIGGER_ATTR = 'data-atlas-enquire';
/* The supplied "AI Chat Bot" webform. NEXT_PUBLIC_ATLAS_CRM_WIDGET_ID overrides
 * it (inlined at build time); the literal `off` disables the popup entirely. */
const DEFAULT_WIDGET_ID = '6aec6b7adb3e850ab12780bc';
const configured = (process.env.NEXT_PUBLIC_ATLAS_CRM_WIDGET_ID || '').trim();
export const WIDGET_ID = configured === 'off' ? '' : configured || DEFAULT_WIDGET_ID;
const ORIGIN = 'https://crm.atlasskilltech.app';

export const widgetScriptUrl = () =>
  `${ORIGIN}/widgets/${encodeURIComponent(WIDGET_ID)}/embed.js`;

/* The plain form page the popup frames — used only as a fallback link when the
 * script cannot load (blocked by an extension, offline, …). */
export const widgetFormUrl = () =>
  `${ORIGIN}/widgets/${encodeURIComponent(WIDGET_ID)}/embed`;

let loading = null;

export function loadCrmWidget() {
  if (!WIDGET_ID) return Promise.reject(new Error('crm-widget-not-configured'));
  if (loading) return loading;

  const existing = document.getElementById(SCRIPT_ID);
  if (existing && existing.dataset.loaded === 'true') {
    loading = Promise.resolve();
    return loading;
  }

  loading = new Promise((resolve, reject) => {
    const script = existing || document.createElement('script');
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    });
    script.addEventListener('error', () => {
      loading = null;
      script.remove();
      reject(new Error('crm-widget-failed'));
    });
    if (!existing) {
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = widgetScriptUrl();
      script.setAttribute('data-atlas-mode', 'popup');
      script.setAttribute('data-atlas-button', 'Enquire Now');
      script.setAttribute('data-atlas-width', '400');
      script.setAttribute('data-atlas-height', '600');
      script.setAttribute('data-atlas-trigger', `[${TRIGGER_ATTR}]`);
      document.body.appendChild(script);
    }
  });
  return loading;
}

export function isWidgetLoaded() {
  const s = typeof document !== 'undefined' && document.getElementById(SCRIPT_ID);
  return Boolean(s && s.dataset.loaded === 'true');
}

export const findOverlay = () => document.querySelector('.atlas-embed-overlay');

/** Closes the popup the way its own × button does. */
export function closeCrmPopup() {
  const overlay = findOverlay();
  const close = overlay && overlay.querySelector('.atlas-embed-close');
  if (close && overlay.style.display !== 'none') close.click();
}

/*
 * Two small adjustments to the widget's own overlay, made once when it is
 * built (it is the CRM's DOM, so they are made here rather than by React):
 *  - the centred flex box becomes a column, so the page's "Continue to AI
 *    Search" bar (rendered into the overlay) sits UNDER the form card; the card
 *    is `overflow: hidden`, so its flex minimum is 0 and on a short screen it
 *    shrinks to leave room for the bar rather than being covered by it;
 *  - the card gets dialog semantics, which the widget does not set.
 */
const POPUP_LABEL = 'Enquire with ATLAS SkillTech University';
function prepareOverlay(overlay) {
  overlay.style.flexDirection = 'column';
  overlay.style.gap = '12px';
  const card = overlay.querySelector('.atlas-embed-card');
  if (card) {
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');
    card.setAttribute('aria-label', POPUP_LABEL);
  }
}

/**
 * Calls `onChange(overlayElement | null)` whenever the popup opens or closes.
 * The overlay is created lazily by the widget, so <body> is watched for it and
 * then its inline style is watched: the widget fades it in by setting opacity
 * '1', and on close sets opacity '0' and later `display: none`.
 * Returns a disposer.
 */
export function watchCrmPopup(onChange) {
  let open = false;
  let styleObserver = null;

  const check = (overlay) => {
    const nowOpen = overlay.style.display !== 'none' && overlay.style.opacity === '1';
    if (nowOpen !== open) {
      open = nowOpen;
      onChange(nowOpen ? overlay : null);
    }
  };

  const attach = (overlay) => {
    if (styleObserver) return;
    prepareOverlay(overlay);
    styleObserver = new MutationObserver(() => check(overlay));
    styleObserver.observe(overlay, { attributes: true, attributeFilter: ['style'] });
    check(overlay);
  };

  const existing = findOverlay();
  if (existing) attach(existing);

  const bodyObserver = new MutationObserver(() => {
    const overlay = findOverlay();
    if (overlay) {
      attach(overlay);
      bodyObserver.disconnect();
    }
  });
  if (!existing) bodyObserver.observe(document.body, { childList: true });

  return () => {
    bodyObserver.disconnect();
    if (styleObserver) styleObserver.disconnect();
  };
}
