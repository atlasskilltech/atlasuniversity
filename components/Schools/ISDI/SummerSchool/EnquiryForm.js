'use client';

import { useEffect, useRef } from 'react';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION } from '../Home/ui';

/**
 * The `#smr-form` block — `div#smr-form.section > .form-wrapper.isdi > .container.dflex`,
 * the last content block on
 * `reference/schools/isdi/admissions/pre-university-summer-school.php` and the target of
 * the "Dates & Registration" band's "Know more" button.
 *
 * Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   section           `.section`, 50px top and bottom
 *   panel             #173a87 under `footer-vector.png` at 100% 50%, no-repeat,
 *     (`.form-wrapper.isdi`)  padding 90 top and bottom           25 top and bottom
 *   row               flex, the page container (max 1366, 62px inset)   column
 *     (`.container.dflex`)
 *   left              width 40%                             100%
 *   title             56px/1.2 400 white (`.form-title.isdi`)   32px
 *   lead              18px/1.5 400 white, padding-top 32 (`.form-desc`)
 *   right             width 60%                             100%, margin-top 32
 *   widget            `.npf_wgts` 700px tall; the script fills it with a 500px iframe
 *
 * **The widget is live, and it is the reference's own third-party integration.** The page
 * embeds `widgets.in5.nopaperforms.com/emwgts.js` inline, which finds every
 * `div.npf_wgts[data-w]` and appends its iframe — so the script is injected once when this
 * block mounts, exactly as the reference does it, rather than on a click as the brochure
 * popups do. Nothing else on the page is remote. React will not execute a `<script>` it
 * renders, which is why the node is appended by hand.
 *
 * `.npf_wgts { height: 700px }` comes from the page's own inline `<style>` and beats the
 * sheet's `@media (min-width: 1440px) { height: 100% }`; the height is pinned here so the
 * container holds its box before the widget script arrives instead of collapsing to zero.
 */
const WIDGET_SCRIPT = 'https://widgets.in5.nopaperforms.com/emwgts.js';

export default function EnquiryForm({ data }) {
  const host = useRef(null);

  useEffect(() => {
    /* the reference appends the loader unconditionally; guard so a client navigation
       back to this page does not add a second copy */
    if (document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)) return undefined;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = WIDGET_SCRIPT;
    document.body.appendChild(s);
    return undefined;
  }, []);

  return (
    <div data-block="form" id={data.id} className={SECTION}>
      {/* ref .form-wrapper.isdi */}
      <div
        className="bg-[#173a87] bg-[position:100%_50%] bg-no-repeat py-[90px] text-white max-md:py-[25px]"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        {/* ref .container.dflex */}
        <div className={cx(CONTAINER, 'flex max-md:flex-col')}>
          {/* ref .left-fm */}
          <div className="w-2/5 max-md:w-full">
            {/* ref .form-title.isdi */}
            <div className="text-[56px] font-normal leading-[1.2] max-md:text-[32px]">
              {data.title}
            </div>
            {/* ref .form-desc */}
            <div className="pt-8 text-[18px] font-normal leading-[1.5]">{data.text}</div>
          </div>
          {/* ref .right-fm */}
          <div className="w-3/5 max-md:mt-8 max-md:w-full">
            {/* ref .npf_wgts — the widget script fills this div */}
            <div
              ref={host}
              className="npf_wgts h-[700px]"
              data-w={data.widget.id}
              data-height={data.widget.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
