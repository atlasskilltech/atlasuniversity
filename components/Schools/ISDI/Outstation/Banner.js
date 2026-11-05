import withBreaks from '@/lib/withBreaks';
import SmartLink from '@/components/SmartLink';
import { CONTAINER, SECTION } from '../Home/ui';

/**
 * "Here for you, every step of the way" — the blue CTA band on
 * reference/schools/isdi/isdi-for-outstation.php:862-874.
 *
 *   .faq-banner-2.blue-9   #193e90, py60 (26 <=767), relative (min-height 350 <=767)
 *     .container-15.blue-10 > (h2.h2-tag.mrgtbm0.wht.no-bar.blue-11,
 *       .faq-sub-text.blue-5, .btn-wraper.padt24 > a.btn-primary-2 + img.btn-pr-icon-2)
 *     img.faq-image-2.blue-15  absolute right, object-fill, h100% (cover, 65% wide
 *                              bottom-right at <=767)
 *
 * Not the pink `.faq-banner` `Home/PinkBanner` draws: the background is #193e90, the
 * button is `.btn-primary-2` (#d20158, r36, h56/40, 18px/500, a 12px gap to an arrow
 * icon), and the photo stays visible below 768.
 */
export default function Banner({ data }) {
  return (
    <div data-block="banner" className={SECTION}>
      {/* ref .faq-banner-2.blue-9 */}
      <div className="relative bg-[#193e90] py-[60px] max-md:min-h-[350px] max-md:py-[26px]">
        <div className={CONTAINER}>
          {/* ref h2.h2-tag.mrgtbm0.wht.no-bar — 40px/1.2 500, white, mb0 (18px/1.4 <=767) */}
          <h2 className="relative m-0 text-[40px] font-medium leading-[1.2] text-white max-md:text-[18px] max-md:leading-[1.4]">
            {withBreaks(data.heading)}
          </h2>
          {/* ref .faq-sub-text.blue-5 — 24px/1.4 300 white, pt12 (16px <=767) */}
          <div className="relative pt-3 text-[24px] font-light leading-[1.4] text-white max-md:text-[16px]">
            {withBreaks(data.sub)}
          </div>
          {/* ref .btn-wraper.padt24 > .faq-btn-slot-2 */}
          <div className="relative pt-6">
            <div>
              {/* ref a.btn-primary-2 — #d20158, r36, h56 (40 <=767), 18px/500, gap12 + arrow */}
              <SmartLink
                href={data.button.href}
                className="inline-flex h-14 flex-none items-center gap-3 rounded-[36px] bg-[#d20158] px-6 text-[18px] font-medium leading-none text-white no-underline max-md:h-10"
              >
                <div>{data.button.label}</div>
                {/* ref img.btn-pr-icon-2 — arrow (12px wide <=767) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.button.icon}
                  alt=""
                  loading="lazy"
                  className="max-w-full align-middle max-md:w-3"
                />
              </SmartLink>
            </div>
          </div>
        </div>
        {/* ref img.faq-image-2.blue-15 — absolute right, object-fill full height; at <=767
            it stays visible as a 65%-wide cover pinned bottom-right */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.image.src}
          srcSet={data.image.srcSet}
          sizes={data.image.sizes}
          alt=""
          loading="lazy"
          className="absolute bottom-0 right-0 top-0 z-0 h-full w-auto max-w-full object-fill max-md:inset-[auto_0_0_auto] max-md:h-auto max-md:w-[65%] max-md:object-cover"
        />
      </div>
    </div>
  );
}
