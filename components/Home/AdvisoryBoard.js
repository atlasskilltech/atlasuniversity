import { advisoryBoard } from '@/lib/homeContent';
import Carousel from '@/components/Carousel/Carousel';
import SectionHead, { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "Steering Excellence, Guiding ATLAS" — port of reference/index.php:2099-2255
 * (`div.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper.mrgtp0)`).
 *
 * Fourteen `.card-type-d` cards. The card is 324px wide with **no height** —
 * `.cd-tyd-image` is `width: 100%; height: 100%` against an auto-height parent,
 * so each card is as tall as its own portrait renders at 324px.
 *
 * `.cd-tyd-txt-wrap` covers the bottom 80% with a
 * `transparent -> #002637 90%` gradient and holds the name, the role, a 40%-wide
 * 1px white rule (`.cd-tyd-posi`, an empty div used purely as a divider) and
 * the company logo at its intrinsic size.
 *
 * ── The play buttons ──────────────────────────────────────────────────────
 * Only the first three cards have one; the rest are commented out upstream and
 * are therefore absent here too. The anchor carries `data-video`, which the
 * project's existing VideoModal already picks up via a delegated listener on
 * `document` — so this section needs no JavaScript of its own.
 */
function AdvisorCard({ person, playIcon }) {
  return (
    /* ref .card-type-d, plus the two rules that only apply because the card is
       itself the swiper slide upstream:
         .card-type-d.swiper-slide            min-height = max-height = 350px
         …:where(.w-variant-a36b0748…)        width 272px, radius `32px 0`
       so the card is a fixed 272x350 regardless of its portrait's ratio. */
    <div className="relative h-[350px] w-[272px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white">
      {/* ref .play-icon — absolute, top/right 24px. `data-video` is read by
          the shared VideoModal listener. */}
      {person.video && (
        <a
          href={person.href}
          data-video={person.video}
          aria-label="Play video"
          className="absolute right-6 top-6 z-10 inline-block cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={playIcon} alt="play button" loading="lazy" decoding="async" />
        </a>
      )}

      {/* ref .cd-tyd-txt-wrap + its `a36b0748…` variant */}
      <div className="absolute inset-x-0 bottom-0 flex h-[80%] w-full flex-row items-end bg-[linear-gradient(#0000,#002637_90%,#002637)] p-6">
        {/* ref .cd-tyd-detail */}
        <div className="w-full flex-none">
          {/* ref .cd-tyd-text */}
          <div className="pb-1 text-xl font-semibold text-white">
            {person.name}
          </div>

          {/* ref .cd-tyd-tx */}
          <div className="text-sm text-white">{person.role}</div>

          {/* ref .cd-tyd-posi — an empty 40% x 1px divider */}
          <div className="my-4 flex h-px w-[40%] items-start justify-between border-t border-white bg-white" />

          {/* ref .cd-tyd-logo-img — no CSS size, so intrinsic */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={person.logo}
            alt={person.logoAlt}
            loading="lazy"
            decoding="async"
            className="block"
          />
        </div>
      </div>

      {/* ref .cd-tyd-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={person.image}
        alt={person.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/**
 * `action` renders in the head-wrap's second slot — /about-us puts a "View all"
 * button there, the homepage has none.
 */
export default function AdvisoryBoard({ data = advisoryBoard, action }) {
  const { heading, subheading, people, playIcon } = data;

  return (
    /* ref div.section */
    <div className={SECTION}>
      <div className={CONTAINER}>
        <SectionHead heading={heading} subheading={subheading}>
          {action}
        </SectionHead>
      </div>

      <Carousel>
        {people.map((person) => (
          <AdvisorCard key={person.name} person={person} playIcon={playIcon} />
        ))}
      </Carousel>
    </div>
  );
}
