import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION } from '../Home/ui';
import HeadWrap from './HeadWrap';

/**
 * "ATLAS Scholarships" — `.head-wrap` over
 * `.scholarship-cards-wrapper > 3 x .scholarship-card.bgN.isdi`.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   row               flex, gap 26, pt56                   column, pt20
 *   card              100% wide / max 396, h460 (the       max-width none,
 *                     `.isdi` height — the base class      pt36 px20
 *                     asks 564), r16, pt56 px40
 *   number            32px/1.5 500 Manrope, mb16
 *   title             24px/1.5 600 white Manrope, mb15
 *   description       14px/1.4, mb10
 *
 * The colour and wash come from the card's own `.bgN.isdi` modifier — #df287b under
 * `Vector--d.png` at 100% 100% on cards 1 and 3, #103380 under `Vector.png` at 50% 100% on
 * card 2 — so both travel as data rather than by position.
 *
 * Deviation: the number and title are Manrope, and production declares Manrope without
 * loading it. This port uses the self-hosted face, as every other Manrope run on
 * /schools/isdi does.
 */
export default function Scholarships({ data }) {
  return (
    <section data-block="scholarship" id="scholarship" className={cx(SECTION, 'overflow-hidden')}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} sub={data.sub} subSpacing="none" button={data.button} />

        {/* ref .scholarship-cards-wrapper */}
        <div className="flex gap-[26px] pt-14 max-md:flex-col max-md:pt-5">
          {data.cards.map((card) => (
            /* ref .scholarship-card.bgN.isdi */
            <div
              key={card.title}
              /* the `.isdi` height of 460 is NOT relaxed on mobile — only the max-width and
                 the padding are */
              className="h-[460px] w-full max-w-[396px] rounded-2xl bg-no-repeat px-10 pt-14 text-white max-md:max-w-none max-md:px-5 max-md:pt-9"
              style={{
                backgroundColor: card.background,
                backgroundImage: `url(${card.image})`,
                backgroundPosition: card.position,
              }}
            >
              {/* ref .scholarship-number */}
              <div className="mb-4 font-sans text-[32px] font-medium leading-[1.5]">{card.number}</div>
              {/* ref .scholarship-title.isdi */}
              <div className="mb-[15px] font-sans text-[24px] font-semibold leading-[1.5] text-white">
                {withBreaks(card.title)}
              </div>
              {/* ref p.scholarship-description */}
              <p className="mb-2.5 text-[14px] leading-[1.4]">{withBreaks(card.text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
