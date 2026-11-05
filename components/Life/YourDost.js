import { lifeContent } from '@/lib/lifeContent';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "YourDOST - For your wellness" — port of `life-at-atlas.php:713-741`
 * (`section.section > .container > (.about-story-wrapper.mrgbtm >
 *   (.abt-cont > (h2.h2-tag.mrg32, .abt-text), img.about-image-rect),
 *   .process-wrap > .process-card > 3x .pro-card.atlas-clr)`).
 *
 * A 30/70 split of copy and photograph, over three numbered indigo steps.
 *
 * /advantages/atlas-advantages repeats this section with byte-identical copy
 * and a different photograph, so it takes `data` and passes nothing else.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .about-story-wrapper     row, gap 32, stretch,       wrap, gap 0
 *     .mrgbtm                space-between, mb 56
 *   .abt-cont                width 30%, 18px             width 100%, 16px
 *   .h2-tag.mrg32            margin-bottom 32            same
 *   .about-image-rect        calc(70% - 40px), cover     width auto,
 *                                                        margin-top 40
 *   .process-card            row, gap 36, stretch,       column
 *                            min-height 252
 *   .pro-card.atlas-clr      390 wide, #41418e,          width 100%
 *                            radius 32/0,
 *                            padding 32 42 64 24
 *   .proc-no.isdi            24px/1, 700, #fff           same
 *   .proc-ttile              24px/1.5, mt 24, pb 16      20px <=479
 *   .proc-desc               16px/1.5                    14px <=479
 */
export default function YourDost({ data = lifeContent.yourdost }) {
  const yourdost = data;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .about-story-wrapper.mrgbtm */}
        <div className="mb-14 flex items-stretch justify-between gap-8 max-md:flex-wrap max-md:gap-0 max-md:text-[18px] max-md:leading-[1.5]">
          {/* ref .abt-cont */}
          <div className="w-[30%] flex-none text-left text-[18px] leading-[1.5] max-md:w-full max-md:text-base">
            {/* ref h2.h2-tag.mrg32 */}
            <h2 className={`mb-8 ${H2}`}>{yourdost.heading}</h2>
            {/* ref .abt-text */}
            <div>{yourdost.text}</div>
          </div>

          {/* ref img.about-image-rect */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={yourdost.image.src}
            srcSet={yourdost.image.srcSet}
            sizes={yourdost.image.sizes ?? '(max-width: 991px) 100vw, 833px'}
            alt={yourdost.image.alt}
            loading="lazy"
            className="block w-[calc(70%-40px)] flex-none overflow-hidden object-cover max-md:mt-10 max-md:w-auto"
          />
        </div>

        {/* ref .process-wrap > .process-card */}
        <div className="relative">
          <div className="flex min-h-[252px] items-stretch justify-start gap-9 max-md:flex-col max-md:min-h-0">
            {yourdost.steps.map((step) => (
              /* ref .pro-card.atlas-clr */
              <div
                key={step.no}
                className="w-[390px] rounded-tl-[32px] rounded-br-[32px] bg-atlas-footer pb-16 pl-6 pr-[42px] pt-8 text-white max-md:w-full"
              >
                {/* ref .proc-no.isdi */}
                <div className="text-[24px] font-bold leading-none text-white">{step.no}</div>
                {/* ref .proc-ttile */}
                <div className="mt-6 pb-4 text-[24px] leading-[1.5] text-white max-sm:text-[20px]">
                  {step.title.split('\n').map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </div>
                {/* ref .proc-desc */}
                <div className="text-[16px] leading-[1.5] text-white max-sm:text-[14px]">
                  {step.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
