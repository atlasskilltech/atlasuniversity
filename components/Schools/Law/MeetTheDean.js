import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import withBreaks from '@/lib/withBreaks';

/**
 * "Meet Your Dean" — `reference/law/index.php:85-104`: `div.section > .purple-law-wrapper > .container >
 * .common-wrapper > (h2.h2-tag.white, .people-details)`. Measured on production at
 * 1440 / 991 / 767 / 479 / 390:
 *
 *   .purple-law-wrapper   full bleed, #271f30 under two vectors (law-vector-2 at 100% 100%,
 *                         law-vector-1 at 0 0, both no-repeat), white text, padding-bottom 56 (40 <=767)
 *   .common-wrapper       padding-top 56 (40 at <=767)
 *   h2.h2-tag.white       44px/1.2 500 white, mb 56 (36px, mb 32 at <=767)
 *   .people-details       flex, start; mb 56; a column at <=767
 *   .pp-cont-lt-law       flex none, 338px wide — 430 from 1440 — (100% at <=767), line-height 1.4
 *   img.pp-law-image      its own size (max 100%), radius 32px 0
 *   .pp-name-title        inline-block, 32px 600, line-height .7 (22.4px), mt 18 mb 8, an 8px #cb5827
 *                         bottom border (11px from 1440)
 *   .pp-achievements      16px, line-height 1.8
 *   .pp-cont-rt           flex 1 0 0, padding-left 56; at <=767 padding 20 0 0
 *   .pp-dsc-law           18px/1.5 (16px at <=767), padding-bottom 20
 */
export default function MeetTheDean({ data, block = 'dean' }) {
  return (
    <div data-block={block} className={SECTION}>
      <div
        className="bg-[#271f30] bg-no-repeat pb-14 text-white max-md:pb-10"
        style={{
          backgroundImage: `url(${data.vectors[0]}), url(${data.vectors[1]})`,
          backgroundPosition: '100% 100%, 0 0',
        }}
      >
        <div className={CONTAINER}>
          <div className="pt-14 max-md:pt-10">
            {/* ref h2.h2-tag.white — SectionHead's H2 type ladder, white */}
            <h2 className="relative mb-14 text-6xl font-medium text-white max-md:mb-8 max-md:text-5xl max-md:leading-[1.2]">{data.heading}</h2>
            <div className="mb-14 flex items-start justify-start max-md:flex-col">
              <div className="relative w-[338px] flex-none overflow-hidden leading-[1.4] 2xl:w-[430px] max-md:w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.image.src} alt="" loading="lazy" className="inline-block max-w-full rounded-tl-[32px] rounded-br-[32px]" />
                <div>
                  <div className="mb-2 mt-[18px] inline-block border-0 border-b-8 border-solid border-[#cb5827] text-[32px] font-semibold leading-[0.7] 2xl:border-b-[11px]">
                    {data.name}
                  </div>
                  <div className="leading-[1.8]">{withBreaks(data.role)}</div>
                </div>
              </div>
              <div className="flex-[1_0_0] pl-14 max-md:pl-0 max-md:pt-5">
                <div className="pb-5 text-lg max-md:text-base">{withBreaks(data.text)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
