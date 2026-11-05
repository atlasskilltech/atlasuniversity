'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import MintTabStrip from '@/components/Schools/ISDI/Home/MintTabStrip';
import Runs from './Runs';
import { CONTAINER } from '@/components/Home/SectionHead';
import { CareerCard, LcCard } from './MajorTrack';
import { YearTabs } from './Curriculum';

/**
 * The single-programme pages (`bba-hons/bba-Hons-in-*.php`) fold the major track and the
 * curriculum into one block: `section.section.extraspace > .container > (.rounded-tabs-mint >
 * (.tabs-menu-mint, .tab-content-mint > 4 panes), .custom-tabs-wrapper)`.
 *
 * The strip is the plain `.tabs-menu-mint` here (no `.patch` band), inside the container — the
 * `MintTabStrip` `wide` spacing. The panes are the major track's (text, highlight cards, career
 * photographs) plus two shapes only these pages author:
 *   .curr-text-a        a 128px-tall #193e90 card under curr-hg-bg-1 at 100% 50%, pl38 pr125,
 *                       the career title centred in white (Digital Branding & Advertising)
 *   .career-box         the ACCA page's own career grid: 3 columns (2 at <=992, inclusive;
 *                       1 at <=767) with a 24px gap inside a 1140px / px24 container; white card,
 *                       1px #e2e2e2 border with a 4px #0b214e left edge, p24; h4 18px/1.2 700
 *                       #0b214e mb12; desc 14px/1.6 #444 mb14; meta 14px/1.5 #555 mb8, its label
 *                       600 #0b214e
 *
 * Rules, from the page's sheet:
 *   section.extraspace  pt120 pb60 (40/40 at <=767)
 *   .tab-content-mint   pt56 (40 at <=767), 18px; numbered panes 16px at <=767
 */
function TextCard({ card }) {
  return (
    /* ref .curr-text-a */
    <div className="flex h-32 items-center justify-start bg-[#193e90] bg-[url('/assets/images/schools/isme/bba/curr-hg-bg-1.png')] bg-[position:100%_50%] bg-no-repeat pl-[38px] pr-[125px]">
      <div className="whitespace-normal text-white">{withBreaks(card.title)}</div>
    </div>
  );
}

function CareerBoxes({ boxes }) {
  return (
    /* ref .career-outcomes-section > .career-container > .career-grid */
    <div className="mx-auto max-w-[1140px] px-6">
      <div className="grid grid-cols-3 gap-6 [@media(max-width:992px)]:grid-cols-2 max-md:grid-cols-1">
        {boxes.map((b) => (
          /* ref .career-box */
          <div key={b.title} className="border border-l-4 border-solid border-[#e2e2e2] border-l-[#0b214e] bg-white p-6">
            <h4 className="mb-3 mt-0 text-[18px] font-bold leading-[1.2] text-[#0b214e]">{b.title}</h4>
            <p className="mb-3.5 mt-0 text-[14px] leading-[1.6] text-[#444]">{b.text}</p>
            {b.meta.map((m, i) => (
              <p key={i} className="mb-2 mt-0 text-[14px] leading-[1.5] text-[#555]">
                {m.label && <span className="font-semibold text-[#0b214e]">{m.label}</span>} {m.text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/*
 * "Learning Outcomes" (the standalone MBA / PG Diploma pages): `.learn-out-box.bg1|bg2`, 400 x 300,
 * p32, #062e89 under lo-bg-1/-2 (cover, centred), a column ending at the bottom. bg1 goes to
 * 300 wide (250 min) and content height (min 230, 260 at <=479) at <=767; bg2 keeps 300 tall.
 * `.learn-out-text` is centred across and `flex: 1` from 1280 up and at <=991, but `0 1 auto`
 * between 992 and 1279 — so the copy sits at the top of the card there and at the bottom here.
 * `.lo-text-1` 32px/1 500 mint (28 at <=991); `.lo-text-2` pt12 24px/1.4 300 white (20 at <=991).
 */
const LO_TONE = {
  bg1: "bg-[url('/assets/images/schools/isme/mba/lo-bg-1.png')] max-md:flex-auto max-md:h-auto max-md:min-h-[230px] max-sm:min-h-[260px]",
  bg2: "gap-2 bg-[url('/assets/images/schools/isme/mba/lo-bg-2.png')]",
};

function LearnCard({ card }) {
  return (
    /* ref .learn-out-box */
    <div
      className={cx(
        'flex h-[300px] w-[400px] max-w-[400px] flex-col justify-end bg-[#062e89] bg-cover bg-center bg-no-repeat p-8 max-md:w-[300px] max-md:min-w-[250px] max-md:max-w-[300px]',
        LO_TONE[card.tone] ?? LO_TONE.bg1
      )}
    >
      {/* ref .learn-out-text */}
      <div className="flex-1 basis-0 self-center [@media(min-width:992px)_and_(max-width:1279px)]:flex-[0_1_auto]">
        <div className="text-[32px] font-medium leading-none text-atlas-mint max-lg:text-[28px]">{card.num}</div>
        <div className="pt-3 text-[24px] font-light leading-[1.4] text-white max-lg:text-[20px]">{withBreaks(card.text)}</div>
      </div>
    </div>
  );
}

export default function ProgramBlock({ data, brochure }) {
  const [active, setActive] = useState(data.current ?? 0);
  const pane = data.panes[active];
  const paneSize = pane.paneClass ? 'text-[18px] leading-[1.5] max-md:text-[16px]' : 'text-[18px] leading-[1.5]';

  return (
    /* ref section.section.extraspace */
    <section data-block="program" className="block overflow-hidden pb-[60px] pt-[120px] max-md:py-10">
      <div className={CONTAINER}>
        {/* ref .rounded-tabs-mint > .tabs-menu-mint */}
        <div className="relative">
          <MintTabStrip
            tabs={data.panes.map((p) => p.label)}
            active={active}
            onChange={setActive}
            spacing="wide"
            skin="isme"
            label="Programme"
            idPrefix="bba-program"
          />
        </div>
      </div>

      {/* ref .tab-content-mint */}
      <div role="tabpanel" id={`bba-program-panel-${active}`} aria-labelledby={`bba-program-tab-${active}`} className={cx('relative pt-14 max-md:pt-10', paneSize)}>
        {pane.kind === 'text' && (
          <div className={CONTAINER}>
            <div className="max-w-[850px] max-md:text-[16px]"><Runs runs={pane.text} /></div>
          </div>
        )}
        {(pane.kind === 'cards' || pane.kind === 'textCards') && (
          <Carousel key={active} autoplay={false} arrowStyle="isme" bullets="inline-overlay">
            {pane.cards.map((card, i) =>
              pane.kind === 'cards' ? <LcCard key={`${i}-${card.num}`} card={card} /> : <TextCard key={`${i}-${card.title}`} card={card} />
            )}
          </Carousel>
        )}
        {pane.kind === 'careers' && (
          <div className={CONTAINER}>
            <div className="flex flex-wrap items-start justify-start gap-4 max-md:items-center max-md:justify-center">
              {pane.cards.map((card, i) => (
                <CareerCard key={`${i}-${card.title}`} card={card} />
              ))}
            </div>
          </div>
        )}
        {pane.kind === 'learn' &&
          (pane.grid ? (
            <div className={CONTAINER}>
              {/* ref .learn-out-wrapper — a 3 x 400px grid that overflows into a hidden-scrollbar
                  scroller; a flex row at <=767, bleeding 41px with 30px back at <=479.
                  DEVIATION: between 480 and 767 the reference sets `justify-content: flex-end`,
                  which pushes the overflowing cards off the unscrollable left edge (measured on
                  production at 600px: the first four cards at x -1042 … -220). The row starts at
                  the left here, as it does at <=479. */}
              <div className="grid grid-cols-3 gap-6 overflow-y-scroll [scrollbar-width:none] max-md:flex max-md:items-stretch max-md:justify-start max-md:overflow-auto max-sm:-mx-[41px] max-sm:px-[30px]">
                {pane.cards.map((card, i) => (
                  <LearnCard key={`${i}-${card.num}`} card={card} />
                ))}
              </div>
            </div>
          ) : (
            /* ref .swiper.common-swiper.mrgtp0 — `.swiper-wrapper { align-items: center }`, which
               centres the content-height cards against the 300px ones at <=767 */
            <Carousel key={active} autoplay={false} arrowStyle="isme" bullets="inline" align="center">
              {pane.cards.map((card, i) => (
                <LearnCard key={`${i}-${card.num}`} card={card} />
              ))}
            </Carousel>
          ))}
        {pane.kind === 'careerBoxes' && (
          <div className={CONTAINER}>
            <CareerBoxes boxes={pane.boxes} />
          </div>
        )}
      </div>

      <div className={CONTAINER}>
        {/* `yearsWrap` — the MBA programme pages author `.quaternary-tabs-wrapper` (mt 76 at <=767, no top
            padding), the BBA ones `.custom-tabs-wrapper` */}
        <YearTabs years={data.years} download={data.download} brochure={brochure} wrap={data.yearsWrap ?? 'custom'} />
      </div>
    </section>
  );
}
