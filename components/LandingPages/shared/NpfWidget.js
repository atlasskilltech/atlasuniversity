'use client';

import { useEffect } from 'react';

/**
 * A NoPaperForms enquiry widget — `<div class="npf_wgts" data-height=… data-w=…>` plus the
 * `widgets.in5.nopaperforms.com/emwgts.js` loader, which finds every `div.npf_wgts[data-w]` on the
 * page and fills it with its own iframe. This is the same integration
 * `components/Schools/ISDI/SummerSchool/EnquiryForm` reproduces: the loader is appended once when the
 * widget mounts (React does not execute a `<script>` it renders) and never twice, so client
 * navigation back to the page cannot double it. The widget key in `data-w` is public.
 *
 * Note: NoPaperForms answers 403 to its own `/register` call from localhost (a referrer check), so the
 * box stays empty in local development and is filled on the production host.
 */
const WIDGET_SCRIPT = 'https://widgets.in5.nopaperforms.com/emwgts.js';

export default function NpfWidget({ widget, height, className }) {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = WIDGET_SCRIPT;
    document.body.appendChild(s);
  }, []);
  return <div className={`npf_wgts ${className || ''}`} data-height={height} data-w={widget} />;
}
