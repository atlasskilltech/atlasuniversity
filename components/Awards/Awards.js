import Image from 'next/image';
import { awards } from '@/lib/homeContent';

/**
 * Awards / rankings marquee — port of reference/index.php:91-226
 * (`.awards.atlas` > `.swiper.mobile-swiper-cm.over-visi`).
 *
 * ── How the reference works ───────────────────────────────────────────────
 * Markup:  .awards.atlas  >  .swiper.mobile-swiper-cm.over-visi
 *                        >  .swiper-wrapper.center  >  .swiper-slide  >  .aw-card
 *          .aw-card  =  <img.aw-img> + .aw-text(abs) + <img.aw-img.flip>
 *
 * Motion (assets/include/footer.php:473-497):
 *   the wrapper's innerHTML is doubled twice (12 -> 48 slides) and handed to
 *   Swiper with `loop`, `speed: 8000`, `autoplay {delay: 0}`,
 *   `allowTouchMove: false`, `pauseOnMouseEnter: false`, `spaceBetween: 0`,
 *   plus `.mobile-swiper-cm .swiper-wrapper {transition-timing-function: linear}`
 *   (index.php:41-43).
 *
 *   delay 0 + speed 8000 + linear easing = a continuous marquee that advances
 *   exactly ONE slide pitch every 8s. Because the pitch is what changes across
 *   breakpoints — not the timing — the cycle is 12 x 8s = 96s at every width.
 *   Nothing about it is interactive (no drag, no hover pause, no pagination),
 *   so a CSS keyframe reproduces it 1:1 without shipping Swiper.
 *
 *   The track below holds the 12 cards twice and slides to -50%, i.e. exactly
 *   one set, so the loop seam is invisible. Every slide carries its own right
 *   margin (rather than the container carrying `gap`) so that one set is
 *   precisely 50% of the track — a `gap` would leave the track 40px short of
 *   two whole sets and the seam would jump.
 *
 * Slide pitch, matching the reference cascade exactly:
 *   >=768px    300px card + 40px  (.aw-card variant + .swiper-wrapper.center)
 *   569-767px  card shrinks to its content, 192px, gap 0  (max-width:767 block)
 *   <=568px    slide is 100% of the container  (header.php inline @media 568)
 *
 * A server component — the animation is pure CSS, nothing is stateful.
 */

const LAUREL = '/assets/images/award-laurel.png';

/* ref .aw-img — natural 96x120, no CSS size; `flex-none` = the ≤767 rule. */
const LAUREL_SIZE = { width: 96, height: 120 };

/*
 * ref .aw-img.flip — kept as the literal upstream transform rather than
 * `-scale-x-100` so the (functionally identical) 3d context is preserved.
 */
const FLIP =
  '[transform-style:preserve-3d] ' +
  '[transform:rotateX(0deg)_rotateY(180deg)_rotateZ(0deg)]';

/*
 * ref .swiper-slide (+ .mobile-swiper-cm .swiper-slide at ≤568).
 *
 * Upstream the ≤568 rule is `width: 100%` of the Swiper container. A flex track
 * sized `w-max` gives percentages nothing to resolve against, so the viewport
 * unit stands in for it. The two differ only by the classic-scrollbar width, on
 * a desktop window narrowed below 568px — and the band clips, so it can never
 * introduce a horizontal scrollbar.
 */
const SLIDE =
  'flex-none w-auto overflow-clip mr-10 max-md:mr-0 max-mcm:w-screen';

/* ref .aw-card / .aw-card:where(.w-variant-94d214fe…) + the ≤767 override */
const CARD =
  'relative flex items-center justify-between text-center ' +
  'w-[300px] max-md:w-auto max-mcm:w-full';

function lines(parts) {
  return parts.map((line, i) => (
    <span key={line}>
      {i > 0 && <br />}
      {line}
    </span>
  ));
}

function AwardCard({ award }) {
  return (
    <div className={CARD}>
      <Image
        src={LAUREL}
        {...LAUREL_SIZE}
        alt=""
        className="flex-none"
      />

      {/* ref .aw-text — out of flow, so it centres over both laurels */}
      <div className="absolute w-full">
        {/* ref .aw-title — 16px/600 (Manrope resolves 600 to its 700 face) */}
        <div className="text-base font-semibold text-white">
          {lines(award.title)}
        </div>

        {/* ref .aw-press */}
        <div className="pt-2 text-xs text-white">{lines(award.press)}</div>
      </div>

      <Image
        src={LAUREL}
        {...LAUREL_SIZE}
        alt=""
        className={`flex-none ${FLIP}`}
      />
    </div>
  );
}

export default function Awards() {
  return (
    /* ref .awards.atlas */
    <section
      aria-label="Awards and rankings"
      className="block overflow-hidden bg-[#41418e] py-[22px]"
    >
      {/* ref .swiper-wrapper.center, driven by the 96s keyframe */}
      <div className="flex w-max animate-awards-marquee will-change-transform motion-reduce:animate-none">
        {awards.map((award) => (
          <div key={award.title.join(' ')} className={SLIDE}>
            <AwardCard award={award} />
          </div>
        ))}

        {/*
          The seam copy. Visually identical to the set above; hidden from the
          accessibility tree so the twelve awards are announced only once.
        */}
        {awards.map((award) => (
          <div
            key={`${award.title.join(' ')}-loop`}
            aria-hidden="true"
            className={SLIDE}
          >
            <AwardCard award={award} />
          </div>
        ))}
      </div>
    </section>
  );
}
