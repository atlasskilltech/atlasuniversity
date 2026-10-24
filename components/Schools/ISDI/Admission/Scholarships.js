import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION } from '../Home/ui';
import HeadWrap from './HeadWrap';

/**
 * "ATLAS Scholarships" — `.head-wrap` over
 * `.scholarship-cards-wrapper > 3 x .scholarship-card.bgN.isdi`.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390. Note the two breakpoints differ: the
 * row stacks and the card loses its max-width at 767, but BOTH paddings turn at 479.
 *                     >=480px                              <=479px
 *   row               flex (column from 767), gap 26,      pt20
 *                     pt56
 *   card              100% wide / max 396 (none from       pt36 px20
 *                     767), h460 (the `.isdi` height —
 *                     the base class asks 564), r16,
 *                     pt56 px40
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
/*
 * `subSpacing` is the one thing that differs between the pages that share this band: the
 * B.Des and B.Tech Admissions pages author `.sub-heading.mrgbtm-0`, the M.Des page the bare
 * `.sub-heading`. Measured, they are identical down to 480 and differ only below it —
 * `padding-bottom` 0 against 20. It defaults to the undergraduate form so those pages are
 * untouched.
 */
export default function Scholarships({ data, subSpacing = 'none' }) {
  return (
    <section data-block="scholarship" id="scholarship" className={cx(SECTION, 'overflow-hidden')}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} sub={data.sub} subSpacing={subSpacing} button={data.button} />

        {/* ref .scholarship-cards-wrapper — it stacks at 767 but its 56px top padding
            holds until **479**, where it becomes 20. Dropping it at 767 cost 36px
            between 480 and 767. */}
        <div className="flex gap-[26px] pt-14 max-md:flex-col max-sm:pt-5">
          {data.cards.map((card) => (
            /* ref .scholarship-card.bgN.isdi */
            <div
              key={card.title}
              /* the `.isdi` height of 460 is not relaxed on mobile; `max-width: none`
                 lands at 767, but the 36/20/20 padding belongs to the <=479 rule — using
                 767 for it inset the copy 20px too early between 480 and 767 */
              className="h-[460px] w-full max-w-[396px] rounded-2xl bg-no-repeat px-10 pt-14 text-white max-md:max-w-none max-sm:px-5 max-sm:pt-9"
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
