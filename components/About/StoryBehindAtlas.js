import { aboutContent } from '@/lib/aboutContent';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "The Story Behind ATLAS" — port of `about-us.php:112-133`
 * (`section.section > .container > (h2.h2-tag.mrg32, .about-story-wrapper >
 *   (.abt-cont > .abt-text, .about-image-wrap-atlas > iframe))`).
 *
 * Copy on the left, a looping muted YouTube embed on the right. The embed's
 * frame is styled by an inline `<style>` block at the top of about-us.php:
 * `aspect-ratio: 16/9`, `border-radius: 12px`, clipped, with the iframe
 * absolutely filling it and a transparent `.video-overlay` on top that swallows
 * clicks so the player chrome never appears.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .about-story-wrapper     flex, space-between,        wrap
 *                            gap 32, stretch
 *   .abt-cont                372.6 wide (30%), 18px/1.5  100%, 16px/1.5
 *   .about-image-wrap-atlas  829 wide (rest), 16/9       100%, 1/1
 *
 * The reference's mobile rule also gives the iframe `margin-top: 40px` and
 * `bottom: -40px` inside its absolutely-positioned frame, which cancel out and
 * leave it filling the frame exactly as on desktop; it is not reproduced.
 */
export default function StoryBehindAtlas() {
  const { story } = aboutContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .w-layout-blockcontainer.container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg32 */}
        <h2 className={`mb-8 ${H2}`}>{story.heading}</h2>

        {/* ref .about-story-wrapper */}
        <div className="flex items-stretch justify-between gap-8 max-md:flex-wrap max-md:gap-0">
          {/* ref .abt-cont > .abt-text */}
          <div className="w-[30%] flex-none text-lg leading-[1.5] text-[#333] max-md:w-full max-md:text-base">
            {story.paragraphs.map((paragraph, i) => (
              <p key={paragraph} className={i > 0 ? 'mt-[1.5em]' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* ref .about-image-wrap-atlas */}
          <div className="relative aspect-video flex-1 overflow-hidden rounded-xl max-md:mt-10 max-md:aspect-square max-md:w-full max-md:flex-none">
            {/* ref .video-overlay — sits over the player so it stays chrome-less */}
            <div className="absolute inset-0 z-[2]" />
            {/* ref iframe.about-image-atlas */}
            <iframe
              className="absolute inset-0 h-full w-full"
              src={story.embed}
              title={story.heading}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
