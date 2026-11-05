'use client';

import { useEffect } from 'react';

/**
 * The hero's NoPaperForms enquiry form. reference/ugdx/ugdxsummerschool.php puts
 * `div.npf_wgts[data-w][data-height="441px"]` in the hero and appends
 * `widgets.in5.nopaperforms.com/emwgts.js` unconditionally at the foot of the page, which fills every
 * such div with its iframe — so, as on /schools/isdi/admissions/pre-university-summer-school, the
 * loader is injected once when this mounts. It is the reference's own third-party integration and the
 * only remote request the page makes on load besides the three YouTube embeds. React will not run a
 * <script> it renders, hence the manual append; the guard stops a client navigation adding a second copy.
 *
 * The box is pinned to the measured 447px (the 441px iframe on an inline line box) so the panel holds
 * its height before the widget arrives.
 */
const WIDGET_SCRIPT = 'https://widgets.in5.nopaperforms.com/emwgts.js';

export default function InlineEnquiry({ id, height }) {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = WIDGET_SCRIPT;
    document.body.appendChild(s);
  }, []);
  return <div className="npf_wgts min-h-[447px]" data-height={height} data-w={id} />;
}
