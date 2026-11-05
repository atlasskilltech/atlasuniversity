'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The ATLAS CRM enquiry / brochure widget — `crm.atlasskilltech.app/widgets/<id>/…` — in the two forms
 * the reference embeds it. This is the ONE place the widget is rendered: the page shells that host it
 * (the /contact-us panel, the ATLAS programme brochure popups, the ISDI / ISME programme brochure
 * popups and the ISDI / ISME outcomes-book dialog) own only their own chrome and hand the embed to this.
 *
 *   mode="iframe"  `<iframe src=".../<id>/embed">`. Optionally forwards the visitor's `utm_*` query
 *                  parameters onto the src, as the reference's inline scripts do — `forwardUtm` is
 *                  `true` (every `utm_*`, /contact-us) or an explicit key list (the ATLAS programme
 *                  popups carry four). Forwarding needs `location`, so a server-rendered frame gets its
 *                  src after hydration, exactly like the reference's `data-src` -> `src` swap; a frame
 *                  that only exists inside an opened dialog resolves it at once. `loader` reproduces
 *                  /contact-us's spinner, removed on the frame's `load`.
 *   mode="script"  `<script src=".../<id>/embed.js" data-atlas-*>` dropped into a host element; the
 *                  script appends its own iframe beside itself. React does not run a <script> it
 *                  renders, so it is appended once per host on mount — and never twice: a host that
 *                  already holds a node is left alone, so re-renders, Strict Mode's double effect and
 *                  client navigation back to the page cannot double the form.
 *
 * Only public widget ids are involved; the embed carries no key or token. Nothing loads from the CRM
 * host until this component mounts, and the dialogs that use it mount it only when opened.
 */
export const CRM_ORIGIN = 'https://crm.atlasskilltech.app';

/** `<id>` -> the iframe embed URL (`kind` 'embed') or the script loader (`kind` 'embed.js') */
export function crmWidgetUrl(id, kind = 'embed') {
  return `${CRM_ORIGIN}/widgets/${id}/${kind}`;
}

function withUtm(src, forwardUtm) {
  if (!forwardUtm || typeof window === 'undefined') return src;
  try {
    const q = new URLSearchParams(window.location.search);
    const out = new URLSearchParams();
    if (Array.isArray(forwardUtm)) {
      forwardUtm.forEach((k) => {
        if (q.get(k)) out.append(k, q.get(k));
      });
    } else {
      q.forEach((v, k) => {
        if (/^utm_/i.test(k)) out.append(k, v);
      });
    }
    const s = out.toString();
    return s ? src + (src.includes('?') ? '&' : '?') + s : src;
  } catch {
    return src;
  }
}

export default function CrmWidget({
  src,
  mode = 'iframe',
  title,
  width,
  height,
  className,
  frameBorder,
  forwardUtm = false,
  /* render the frame's src only after hydration (the frame is in server-rendered markup) */
  deferSrc = false,
  loader = null,
  scriptAttrs,
  hostClassName,
}) {
  /* a frame inside an opened dialog resolves its src at once; a server-rendered one (deferSrc) is
     given it after mount, written straight onto the element — production's `frame.src = …` */
  const [initialSrc] = useState(() => (deferSrc ? undefined : withUtm(src, forwardUtm)));
  const [loading, setLoading] = useState(Boolean(loader));
  const hostRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (mode !== 'iframe' || !deferSrc || !frameRef.current) return;
    frameRef.current.src = withUtm(src, forwardUtm);
  }, [mode, deferSrc, src, forwardUtm]);

  useEffect(() => {
    if (mode !== 'script') return;
    const host = hostRef.current;
    if (!host || host.childElementCount > 0) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    Object.entries(scriptAttrs || {}).forEach(([k, v]) => s.setAttribute(k, String(v)));
    host.appendChild(s);
  }, [mode, src, scriptAttrs]);

  if (mode === 'script') return <div ref={hostRef} className={hostClassName} />;

  return (
    <>
      {loading && loader}
      <iframe
        ref={frameRef}
        title={title}
        src={initialSrc}
        width={width}
        height={height}
        frameBorder={frameBorder}
        className={className}
        onLoad={(e) => {
          /* the empty frame's about:blank load does not count */
          if (e.currentTarget.getAttribute('src')) setLoading(false);
        }}
      />
    </>
  );
}
