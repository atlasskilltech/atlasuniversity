import { leadershipTeam } from '@/lib/homeContent';
import SmartLink from '@/components/SmartLink';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Leadership Team" — port of reference/index.php:2054-2098
 * (`div.section > .container > (h2.h2-tag.mrg42, .swiper.common-swiper-full.mrgtp0)`).
 *
 * Three `.atlas-card-type-a`: a 396x500 card, `border-radius: 32px 0`, clipped,
 * with the portrait filling it and a `.at-cd-ty-a-wrap` overlay pinned to the
 * bottom 80% carrying a `transparent 14% -> #000` gradient, the name, a
 * pull-quote and — on the first card only — a "Read more" button.
 *
 * The quote block is `position: relative` with the quote glyph absolutely
 * placed at `top: 21px; left: 3px`, i.e. tucked behind the first line of the
 * quote rather than beside it.
 *
 * ── Measured responsive cascade ───────────────────────────────────────────
 *                        >=768px              <=767px
 *   .atlas-card-type-a   396x500              width 100%
 *   .at-cd-ty-a-wrap     padding 24           8px 20px
 *   .at-cd-ty-text       32px/500             24px/600
 *   .at-st-quote         padding 24/24/12     + width 100%
 *   .at-st-text          16px                 16px, break-spaces
 */
function LeaderCard({ person, quoteIcon }) {
  return (
    /* ref .atlas-card-type-a */
    <div className="relative h-[500px] w-[396px] flex-[0_auto] overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white max-mcm:w-[calc(100vw-44px)]">
      {/* ref .at-cd-ty-a-wrap */}
      <div className="absolute inset-x-0 bottom-0 z-11 flex h-[80%] w-full flex-col items-start justify-end bg-[linear-gradient(#0000_14%,#000)] p-6 max-md:px-5 max-md:py-2">
        {/* ref .at-cd-ty-text */}
        <div className="text-4xl font-medium max-md:text-2xl max-md:font-semibold">
          {person.name}
        </div>

        {/* ref .at-st-quote */}
        <div className="relative px-6 pb-3 pt-6 max-md:w-full">
          {/* ref .at-st-text */}
          <div className="text-base max-md:[overflow-wrap:normal] max-md:[white-space:break-spaces]">
            {person.quote.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </div>

          {/* ref .at-quote — absolutely placed behind the quote's first line */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={quoteIcon}
            alt="quote icon"
            loading="lazy"
            decoding="async"
            className="absolute left-[3px] top-[21px]"
          />
        </div>

        {/* ref .at-cd-ty-a-btn — only the first card has one upstream */}
        {person.button && (
          <div className="flex w-full flex-none items-center justify-end">
            <SecondaryButton href={person.button.href} variant="atlas">
              {person.button.label}
            </SecondaryButton>
          </div>
        )}
      </div>

      {/* ref .at-cd-ty-a-image */}
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
 * `data` lets another page reuse this section with its own people — /about-us
 * renders the same three leaders without the homepage's "Read more" button.
 */
export default function LeadershipTeam({ data = leadershipTeam }) {
  const { heading, people, quoteIcon } = data;

  return (
    /* ref div.section */
    <div className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg42 */}
        <h2 className={`mb-[42px] ${H2}`}>{heading}</h2>
      </div>

      {/* Outside `.container`: the slider is `overflow: visible` upstream and
          bleeds to the viewport edge — see Carousel. */}
      <Carousel>
        {people.map((person) => (
          <LeaderCard key={person.name} person={person} quoteIcon={quoteIcon} />
        ))}
      </Carousel>
    </div>
  );
}
