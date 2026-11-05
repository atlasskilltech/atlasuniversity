import { aboutContent } from '@/lib/aboutContent';
import SecondaryButton from '@/components/ui/SecondaryButton';
import { CONTAINER, H2 } from '@/components/Home/SectionHead';

/**
 * "Chancellor's note" — port of `about-us.php:148-173`
 * (`section#our-mission.section > .atlas-blue-wrapper > .container >
 *   .common-wrapper > (h2.h2-tag.white, .people-details)`).
 *
 * A full-bleed indigo band. On the left a portrait video with a pull-quote over
 * its lower half; on the right the biography and a "Read More" pill.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .atlas-blue-wrapper      #41418e, padding-bottom 56  padding-bottom 40
 *   .common-wrapper          padding-top 56              padding-top 40
 *   .h2-tag.white            44px/1.2, 500, mb 56        36px/1.2, mb 32
 *   .people-details          row, align-start, mb 56     column
 *   .pp-cont-lt-atlas        338 x 500, radius 32px 0,   100% x 400
 *                            clipped
 *   .pp-image-atlas          fills it, cover             346 x 500 (taller
 *                                                        than its 400px frame,
 *                                                        so it is cropped)
 *   .pp-quote                bottom half, transparent    bottom half of 400
 *                            -> rgba(0,0,0,.5)
 *   .qt-text                 flex, gap 5, padding 26     same
 *   .pp-cont-rt              flex-1, padding-left 56     padding-top 20
 *   .h4-pp                   32px/1, #e5e1e1, my 10      22px/1
 *   .pp-content              18px/1.5, pt 56, pb 20      16px/1.5, pt 40
 *
 * The section keeps `id="our-mission"` — the reference gives that id to two
 * sections in a row (the mission/vision pair and this one); the duplicate is
 * not reproduced, the id stays on the mission/vision section that owns it, and
 * this one is left without.
 */
export default function ChancellorNote() {
  const { chancellor } = aboutContent;

  return (
    /* ref section.section — this one has no padding of its own; the blue
       wrapper supplies it */
    <section className="block overflow-hidden">
      {/* ref .atlas-blue-wrapper */}
      <div className="bg-atlas-footer pb-14 text-white max-md:pb-10">
        {/* ref .container */}
        <div className={CONTAINER}>
          {/* ref .common-wrapper */}
          <div className="pt-14 max-md:pt-10">
            {/* ref h2.h2-tag.white */}
            <h2 className={`relative mb-14 text-white max-md:mb-8 ${H2}`}>{chancellor.heading}</h2>

            {/* ref .people-details */}
            <div className="mb-14 flex items-start justify-start max-md:flex-col">
              {/* ref .pp-cont-lt-atlas */}
              <div className="relative h-[500px] w-[338px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:h-[400px] max-md:w-full">
                {/* ref .pp-image-atlas — Webflow background video: muted,
                    looping, no controls */}
                <video
                  className="h-full w-full object-cover max-md:h-[500px]"
                  poster={chancellor.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-label={chancellor.quote}
                >
                  {chancellor.videos.map((source) => (
                    <source
                      key={source}
                      src={source}
                      type={source.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
                    />
                  ))}
                </video>

                {/* ref .pp-quote */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 z-[1] flex flex-col items-start justify-end bg-gradient-to-t from-black/50 to-transparent">
                  {/* ref .qt-text */}
                  <div className="flex flex-none items-start justify-start gap-[5px] p-[26px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={chancellor.quoteIcon} alt="" width={16} height={16} loading="lazy" />
                    {/* ref .q-text */}
                    <div className="leading-[1.4]">{chancellor.quote}</div>
                  </div>
                </div>
              </div>

              {/* ref .pp-cont-rt */}
              <div className="flex-1 pl-14 max-md:w-full max-md:pl-0 max-md:pt-5">
                {/* ref h4.h4-pp */}
                <h3 className="my-2.5 text-[32px] font-normal leading-none text-[#e5e1e1] max-md:text-[22px]">
                  {chancellor.name}
                </h3>

                {/* ref .pp-content */}
                <div className="pb-5 pt-14 text-lg leading-[1.5] max-md:pt-10 max-md:text-base">
                  {chancellor.paragraphs.map((paragraph, i) => (
                    <p key={paragraph} className={i > 0 ? 'mt-[1.5em]' : undefined}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/*
                  ref .at-cd-ty-b-btn — `display: flex; width: 100%;
                  justify-content: flex-start; flex: none`. The wrapper is what
                  keeps the pill compact: `.secondary-btn` is a block-level
                  anchor, so without a flex parent it would stretch the full
                  904px column instead of shrink-wrapping to its label.
                */}
                <div className="flex w-full flex-none justify-start">
                  <SecondaryButton href={chancellor.button.href} variant="atlas">
                    {chancellor.button.label}
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
