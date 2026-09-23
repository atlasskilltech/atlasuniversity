import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import ProgramTabs from './ProgramTabs';
import ProgramCard from './ProgramCard';
import PathFinder from './PathFinder';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from './ui';

/**
 * "Our Programs" — port of reference/schools/isdi/index.php:1664-1784, whose
 * Undergraduate tab is assets/include/pathfinder.php.
 *
 *   section#explore-program > .container > h2.h2-tag.mrg32.isdi
 *     > .primary-tabs (ProgramTabs)
 *       Tab 1  .head-wrap (h2 + sub + "Check out ISDI's Pathfinder")
 *              .program-cards-isdi-wrap > .left-programs (4 cards)
 *                                       > .right-programs (3 cards + .pathfinder-card)
 *              .program-tags (PathFinder)
 *       Tab 2  .pg-program-wrapper (2 cards)
 *
 * Measured layout:
 *                        >=768px                          <=767px
 *   head-wrap            row, bottom-aligned              stretched column (button
 *                                                         spans the container)
 *   cards wrap           row, gap 16, pt60                column, gap 0, pt20
 *   left / right         calc(50% - 12px) each, wrapping  100%; right gets mt24
 *                        columns with gap 24
 *   pg wrapper           row, gap 24, mt52                column (wrap at <=479)
 *
 * The two columns are rows of full-width cards that wrap, so each column is
 * stretched to the taller one and the free space is shared between its lines —
 * which is why the right column's cards (and the PathFinder card) are taller than
 * their content. That falls out of the same flex properties; nothing is sized by
 * hand. The PathFinder scribble is `height: 40%` of that stretched card, and is
 * clamped to `max-width: 50%` below 768 without its height following — the
 * reference paints it squeezed there too.
 *
 * `.pathfinder-card::before` is the curved pink corner that joins the card's
 * left border to the quiz panel's top border (removed at <=580).
 */

/* ref .pathfinder-card */
const PATHFINDER_CARD = cx(
  'relative w-full rounded-t-3xl border-[3px] border-b-0 border-solid border-[#df287b] px-[35px] pt-[45px] max-md:pl-6 max-md:pt-6',
  "before:absolute before:-bottom-[27px] before:-left-[35px] before:z-[3] before:h-[28px] before:w-[32px] before:rounded-[24px_0] before:border-0 before:border-b-[3px] before:border-r-[3px] before:border-solid before:border-[#df287b] before:bg-white before:content-['']",
  '[@media(max-width:580px)]:before:content-none'
);
/* ref .h2-path */
const H2_PATH = 'm-0 text-[48px] font-normal leading-[1.2] max-md:text-[32px] max-md:leading-[1.2]';

function PathFinderCard({ data }) {
  return (
    <div id="path-finder" className={PATHFINDER_CARD}>
      <h2 className={cx(H2_PATH, 'text-[#df287b]')}>{data.heading}</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.scribble.src}
        width={data.scribble.width}
        height={data.scribble.height}
        alt={data.scribble.alt}
        loading="lazy"
        decoding="async"
        className="mx-auto mb-2.5 block h-[40%] w-auto max-w-full max-md:max-w-[50%]"
      />
      <h2 className={cx(H2_PATH, 'pb-2.5 text-black')}>{data.title}</h2>
      <div className={SUB}>{data.sub}</div>
    </div>
  );
}

/* `assets/include/pathfinder.php` — the homepage renders it as the Undergraduate tab
   of `.primary-tabs`; /programs/undergraduate includes the same file bare, inside a
   plain `section.section > .container`, so it is exported rather than duplicated. */
export function UndergraduatePane({ data, pathfinder }) {
  return (
    <>
      {/* ref .head-wrap */}
      <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
        <div>
          <h2 className={cx(H2, 'mb-6')}>{withBreaks(data.heading)}</h2>
          <div className={SUB}>{data.sub}</div>
        </div>
        <PrimaryButton href={data.button.href} variant="pink">
          {data.button.label}
        </PrimaryButton>
      </div>

      {/* ref .program-cards-isdi-wrap */}
      <div className="flex flex-wrap items-stretch justify-between gap-4 pt-[60px] max-md:flex-col max-md:flex-nowrap max-md:gap-0 max-md:pt-5">
        {/* ref .left-programs */}
        <div className="flex min-h-[50px] w-[calc(50%-12px)] flex-wrap items-stretch justify-start gap-6 max-md:w-full">
          {data.left.map((card) => (
            <ProgramCard key={card.title} card={card} />
          ))}
        </div>
        {/* ref .right-programs */}
        <div className="flex min-h-[50px] w-[calc(50%-12px)] flex-wrap gap-6 max-md:mt-6 max-md:w-full">
          {data.right.map((card) => (
            <ProgramCard key={card.title} card={card} />
          ))}
          <PathFinderCard data={data.pathfinder} />
        </div>
      </div>

      <PathFinder data={pathfinder} />
    </>
  );
}

function PostgraduatePane({ cards }) {
  return (
    /* ref .pg-program-wrapper */
    <div className="mt-[52px] flex gap-6 max-md:flex-col max-sm:flex-row max-sm:flex-wrap">
      {cards.map((card) => (
        <ProgramCard key={card.title} card={card} />
      ))}
    </div>
  );
}

export default function Programs({ data, pathfinder }) {
  return (
    <section id="explore-program" data-block="programs" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg32)}>{data.heading}</h2>
        <ProgramTabs
          labels={data.tabs}
          panes={[
            <UndergraduatePane key="ug" data={data.ug} pathfinder={pathfinder} />,
            <PostgraduatePane key="pg" cards={data.pg} />,
          ]}
        />
      </div>
    </section>
  );
}
