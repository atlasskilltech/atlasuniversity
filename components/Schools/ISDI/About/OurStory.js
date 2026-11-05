import { CONTAINER } from '../Home/ui';
import IconSection from './IconSection';

/**
 * Our Story — port of about-us/index.php:61-76 (`section#our-story.section`).
 *
 *   .blue-wrapper > .container > .common-wrapper > (.sub-heading.mrgbtm32,
 *     .w-embed-youtubevideo.youtube-player.isdi > iframe)
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                        <=767px        <=479px
 *   .common-wrapper   pt50 (header.php's `.isdi-page .common-wrapper`, every width)
 *   lead              24px/1.4 400, pr50 pb32        16px/1.5,      pb16
 *                                                    py20, pr0
 *   player            r16, clipped, 1242:697.6 (`padding-top: 56.17%`); the iframe
 *                     fills it
 *
 * The film is the authored YouTube embed (`rel=1&controls=0&autoplay=1&mute=1`), a
 * genuine third-party embed, so it stays remote. Webflow's grey placeholder graphic
 * (`youtube-placeholder.svg`, cover, centred) is painted behind it while it loads,
 * from a local copy.
 */
export const LEAD_MRGBTM32 =
  'pb-8 pr-[50px] text-2xl font-normal leading-[1.4] max-md:py-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5] max-sm:pb-4';

export default function OurStory({ data }) {
  return (
    <IconSection id="our-story" block="story" icon={data.icon} title={data.title}>
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className="pt-[50px]">
          <div className={LEAD_MRGBTM32}>{data.text}</div>
          {/* ref .youtube-player.isdi */}
          <div className="relative overflow-hidden rounded-2xl bg-[url('/assets/images/schools/isdi/about/story/youtube-placeholder.svg')] bg-cover bg-center pt-[56.17021276595745%]">
            <iframe
              src={data.youtube.src}
              title={data.youtube.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </IconSection>
  );
}
