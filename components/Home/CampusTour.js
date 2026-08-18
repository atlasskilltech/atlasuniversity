import { campusTour } from '@/lib/homeContent';
import SmartLink from '@/components/SmartLink';
import SecondaryButton from '@/components/ui/SecondaryButton';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "A campus built to learn, live & thrive" — port of
 * reference/index.php:2548-2640
 * (`div.section > .container > (.head-wrap.mrgbtm32, .testimonial-video)`).
 *
 * The head-wrap puts the heading (`.h2-tag.mrgbtm0`, so no bottom margin)
 * beside a "Schedule a Visit" button. That button's href is `#` upstream and is
 * left as `#` here rather than pointed somewhere invented.
 *
 * The body is a Webflow background video — `autoplay muted loop playsinline`
 * over a poster — wrapped in an `<a target="_blank">` to YouTube, so the whole
 * frame is a single link. All four `<iframe>` variants in this block are
 * commented out upstream, so there is no embed to port.
 *
 * ── Sizing ────────────────────────────────────────────────────────────────
 * `.testimonial-video` is styled twice: the page stylesheet says 325x440, but
 * index.php's own inline <style> loads afterwards and wins with
 * `width: 100%; height: 700px; border-radius: 56px 0px 56px 0px`, dropping to
 * `height: 156px` at <=991px. The measured values are 700px / 156px, so the
 * inline block is what is reproduced.
 *
 * The reference also lists a `.webm` source, but that file is a byte-identical
 * copy of the `.mp4` — declaring `type="video/webm"` over MP4 bytes would make
 * browsers pick a source they then cannot decode, so only the mp4 is offered.
 */
export default function CampusTour() {
  const { heading, button, poster, video, link, linkLabel } = campusTour;

  return (
    /* ref div.section */
    <div className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap.mrgbtm32 */}
        <div className="mb-8 flex items-end justify-between max-md:flex-col max-md:justify-start max-md:items-stretch max-sm:mb-0">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref .h2-tag.mrgbtm0 */}
            <h2 className={H2}>{heading}</h2>
          </div>

          {/* ref a.secondary-btn + `25d04a90…` variant */}
          <SecondaryButton href={button.href} variant="atlas">
              {button.label}
            </SecondaryButton>
        </div>

        {/* ref .testimonial-video.w-background-video.w-background-video-atom */}
        <div className="relative z-10 h-[700px] w-full max-w-full flex-none self-auto overflow-clip rounded-tl-[56px] rounded-br-[56px] object-cover max-lg:h-[156px]">
          {/* ref a.video-full-link */}
          <a
            href={link}
            target="_blank"
            rel="noopener"
            aria-label={linkLabel}
            className="block h-full w-full"
          >
            {/*
              ref the Webflow background <video>: autoplay/loop/muted/playsinline
              with the poster painted behind it, filling the frame.
            */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={poster}
              className="h-full w-full object-cover"
              style={{ backgroundImage: `url(${poster})` }}
            >
              <source src={video} type="video/mp4" />
            </video>
          </a>
        </div>
      </div>
    </div>
  );
}
