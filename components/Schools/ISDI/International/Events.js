import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import IconSection from '../About/IconSection';
import PhotoGallery from '../PhotoGallery';
import InViewVideo from '../Home/InViewVideo';
import QuoteCard from '../Home/QuoteCard';
import { CONTAINER, H2, H2_MB } from '../Home/ui';
import { BLUE_DESC_TEXT, BLUE_DESC_WRAP, COMMON_WRAPPER_LG, YouTubeFrame } from './ui';

/**
 * "World Class Design Education" / "International Expertise. ISDI Experience."
 * (`atlas-isdi-advantage/internationalisation/index.php:496-588`).
 *
 *   section#international-events.section >
 *     .icon-heading
 *     .blue-wrapper.isdi-blue-5 > .container >
 *       (.blue-desc-wrap > .blue-desc-text, .center-image-full-wrap.mrgtp.isdi)
 *     .container >
 *       (.instagram-wrapper.mobile-vert-scroll > .grid-gallery-flex > 4 x .grid-column,
 *        .common-wrapper-lg > (h2.h2-tag.mrg16.isdi, .swiper.common-swiper-full))
 *
 * The second `.container` is a sibling of the blue wrapper, not a child of it, so it
 * is `IconSection`'s `after`.
 *
 * **This section and `#global-immersion` carry the same heading and the same lead.**
 * "World Class Design Education" over the identical "Our internationalization isn't
 * limited to travel…" paragraph, and both take the same `location.svg` plate.
 * Transcribed as authored.
 *
 * ── The carousel is INSIDE `.container` ───────────────────────────────────
 * Measured 1242 wide at 1440 with 620px slides and a 24px gutter, so it does not
 * bleed: `bleed={false}`, which is the call /advantages/atlas-internationalisation's
 * "Office of International Affairs" already records. `.common-swiper-full` is pt56
 * (20 at <=767) and its bullets are the absolute row 30px under the track.
 *
 * Two of the three cards are Webflow background videos and the third a photograph —
 * the same pair of forms `Home/PeopleVoices` renders, so `QuoteCard` is reused
 * unchanged. These clips are authored `data-loop="true"` (the homepage's are not).
 */
export default function Events({ data }) {
  return (
    <IconSection
      id="international-events"
      block="events"
      icon={data.icon.image}
      title={data.icon.title}
      after={
        /* ref .container */
        <div className={CONTAINER}>
          {/* ref .instagram-wrapper.mobile-vert-scroll — mt56, 32 at <=767 */}
          <PhotoGallery columns={data.columns} className="mt-14 max-md:mt-8" />

          {/* ref .common-wrapper-lg */}
          <div className={COMMON_WRAPPER_LG}>
            <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>

            {/* ref .swiper.common-swiper-full */}
            <div className="pt-14 max-md:pt-5">
              <Carousel autoplay={false} bleed={false} bullets="isdi-overlay">
                {data.cards.map((card) => (
                  <QuoteCard
                    key={card.name}
                    card={card}
                    quoteIcon={data.quoteIcon}
                    bgImage={data.bgImage}
                  >
                    {card.video ? (
                      /* ref .testimonial-video.w-background-video */
                      <div className="relative z-10 h-[440px] w-[325px] max-w-full flex-none overflow-clip text-white max-md:w-full">
                        <InViewVideo
                          sources={card.video.sources}
                          poster={card.video.poster}
                          loop={card.video.loop}
                          className="absolute inset-0 -z-[100] h-full w-full"
                        />
                      </div>
                    ) : (
                      /* ref img.student-image — 50% x 100% cover, 100% x 320 at
                         <=767; the same box `Home/IndustryVoices` measures */
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={card.image.src}
                        alt={card.image.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-1/2 max-w-full object-cover align-middle max-md:h-[320px] max-md:w-full max-md:max-w-none"
                      />
                    )}
                  </QuoteCard>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      }
    >
      {/* ref .container inside .blue-wrapper.isdi-blue-5 */}
      <div className={CONTAINER}>
        {/* ref .blue-desc-wrap */}
        <div className={BLUE_DESC_WRAP}>
          {/* ref .blue-desc-text */}
          <div className={BLUE_DESC_TEXT}>{withBreaks(data.desc)}</div>
        </div>
        <YouTubeFrame video={data.video} />
      </div>
    </IconSection>
  );
}
