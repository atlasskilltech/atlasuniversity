import { cx } from '@/lib/cx';
import Carousel from '@/components/Carousel/Carousel';
import InViewVideo from '../Home/InViewVideo';
import QuoteCard from '../Home/QuoteCard';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';

/**
 * "Student Voices: Real Voices from the Program" —
 * b-des/accessory-design-&-craft.php:2892-3173.
 *
 *   section.section > .container > h2.h2-tag.mrg16.isdi + .sub-heading
 *                                > .swiper.common-swiper-full
 *                                  > 4 x .testimonial-card.bgc1.isdi
 *
 * The card is the ISDI homepage's `QuoteCard`, measured identical here (620 x 440,
 * a 325 x 440 media panel beside the quote, full width above it below 768), and
 * the slider is the same `.common-swiper-full`: pt56 -> pt20, overlay bullets, no
 * autoplay.
 *
 * Two controls the homepage's cards do not have, both real and both per card:
 *   a.youtubeicon   a 44 x 45 mark 16px from the video's top-right corner, linking
 *                   to that testimonial on YouTube (one watch URL, three Shorts)
 *   play/pause      Webflow's own background-video control, 44 x 44, 16px from the
 *                   bottom-right corner, which pauses the clip in place
 *
 * Both are per card and both are optional: the Strategic Design & Innovation Management
 * page authors neither, so a card with no icon renders no control rather than an empty
 * button (`controls` must be undefined there, not an object of nulls).
 *
 * The clips are `autoplay muted playsinline` without `loop`, so each plays through
 * once; here they start when scrolled into view, as every other ISDI video does.
 * Each authors an mp4 then a webm, so the mp4 is what plays.
 */
export default function Voices({ data }) {
  return (
    <section data-block="voices" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB}>{data.sub}</div>
      </div>

      {/* ref .swiper.common-swiper-full */}
      <div className="pt-14 max-md:pt-5">
        <Carousel autoplay={false} bullets="isdi-overlay">
          {data.cards.map((card) => (
            <QuoteCard
              key={card.quote}
              /* `.stname` holds the name and `.st-course` the cohort — QuoteCard's
                 two detail lines */
              card={{ text: card.quote, name: card.name, role: card.course }}
              quoteIcon={card.quoteIcon}
              bgImage={card.watermark}
            >
              {/* ref .testimonial-video.w-background-video */}
              <div className="relative z-10 h-[440px] w-[325px] max-w-full flex-none overflow-clip text-white max-md:w-full">
                <InViewVideo
                  sources={card.video.sources}
                  poster={card.video.poster}
                  loop={false}
                  controls={card.pauseIcon ? { pauseIcon: card.pauseIcon, playIcon: card.playIcon } : undefined}
                  className="absolute inset-0 -z-[100] h-full w-full"
                />

                {/* ref a.youtubeicon — absent on the Strategic Design page, so render nothing
                    there rather than an empty anchor around a source-less <img> */}
                {card.youtube && (
                  <a
                    href={card.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-4 top-4 z-[1] underline"
                    aria-label={`Watch ${card.name} on YouTube`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.youtubeIcon} width={44} height={45} alt="" loading="lazy" className="max-w-full align-middle" />
                  </a>
                )}
              </div>
            </QuoteCard>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
