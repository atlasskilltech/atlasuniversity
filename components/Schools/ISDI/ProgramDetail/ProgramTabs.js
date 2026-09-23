'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import InViewVideo from '../Home/InViewVideo';
import MintTabStrip from '../Home/MintTabStrip';
import PersonCard from '../PersonCard';
import { CONTAINER } from '../Home/ui';

/**
 * The programme tab set — b-des/accessory-design-&-craft.php:311-2013, the first
 * half of `section.section.extraspace > .container`:
 *
 *   .rounded-tabs-mint > .tabs-menu-mint (5 links)
 *                      > .tab-content-mint > 5 x .w-tab-pane
 *
 * Unlike the ISDI homepage's tab sets this strip is the **bare** `.tabs-menu-mint`
 * (gap 48, -73 bleed, 70 padding), so `MintTabStrip` is asked for `spacing="wide"`.
 * `.tab-content-mint` is 56px of top padding, 40 at <=767.
 *
 * The five panes are three shapes:
 *   Overview              `.tab-text-block`, max-width 850, the pane's own
 *                         18px/1.5 (16px/1.5 at <=767)
 *   Curriculum Highlights `.card-type-el.isdi` over a looping background video
 *   Career Pathways /     the same card over `img.cd-ty-el-img`
 *     Faculty
 *   Success Stories       `.card-type-d` — the ISDI advisory card, so `PersonCard`
 *
 * ── The card panes do NOT bleed ─────────────────────────────────────────────
 * Every other `.common-swiper` on the site is a sibling of `.container`; these
 * four are wrapped in a **second** `.container` inside the pane, so the track is
 * inset twice (62 + 62 at 1440, 22 + 22 at 390) and starts at the text's left
 * edge. Hence `bleed={false}`, and the Success Stories pane — which has no inner
 * container — is the one that bleeds.
 *
 * Card, measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *   .card-type-el.isdi   265 x 200 at every width, r16, clipped (the sheet's
 *                        later `.card-type-el.isdi` rule beats both the 270x370
 *                        base and the `<=767` `width: 100%`)
 *   .cd-ty-el-cont       the bottom half, `#fff0 -> #000`, p 0/32/32/32,
 *                        content bottom-aligned
 *   .cd-ty-el-text       24px/1.2 500 white — 20px/1.2 with `.isdi`, which only
 *                        the video cards carry
 *   media                object-cover over the whole card
 *
 * ISDI's `initCommonSwiper` sets no autoplay, so neither does the carousel.
 */

/* ref .tab-text-block */
const TEXT_PANE = 'max-w-[850px] text-[18px] leading-[1.5] max-md:text-[16px] max-md:leading-[1.5]';

function ElCard({ card }) {
  return (
    /* ref .card-type-el.isdi */
    <div className="relative h-[200px] w-[265px] flex-none overflow-hidden rounded-2xl">
      {/* ref .cd-ty-el-cont */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 z-[11] flex items-end bg-[linear-gradient(#ffffff00,#000)] px-8 pb-8">
        {/* ref .cd-ty-el-text (+ .isdi on the video cards) */}
        <div
          className={cx(
            'font-medium text-white',
            card.video ? 'text-[20px] leading-[1.2]' : 'text-[24px] leading-[1.2]'
          )}
        >
          {card.title}
        </div>
      </div>

      {card.video ? (
        /* ref .testimonial-video.testimonial-videov2.testimonial-videov3 — a Webflow
           background video: muted, looping, autoplaying. It plays once in view
           rather than on load, as every other ISDI video in this rebuild does. */
        <InViewVideo
          sources={card.video.sources}
          poster={card.video.poster}
          className="h-full w-full object-cover"
        />
      ) : (
        /* ref img.cd-ty-el-img */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={card.image.src}
          width={card.image.width}
          height={card.image.height}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full max-w-full object-cover align-middle"
        />
      )}
    </div>
  );
}

export default function ProgramTabs({ data }) {
  const [active, setActive] = useState(0);
  const pane = data.panes[active];

  return (
    /* ref .rounded-tabs-mint.w-tabs */
    <div className="relative">
      <MintTabStrip
        tabs={data.tabs}
        active={active}
        onChange={setActive}
        spacing="wide"
        label="Programme information"
        idPrefix="bdes-program"
      />

      {/* ref .tab-content-mint */}
      <div
        role="tabpanel"
        id={`bdes-program-panel-${active}`}
        aria-labelledby={`bdes-program-tab-${active}`}
        className="relative pt-14 max-md:pt-10"
      >
        {/* the Communication Design page's Overview carries an authored `<br><br>` */}
        {pane.kind === 'text' && <div className={TEXT_PANE}>{withBreaks(pane.text)}</div>}

        {pane.kind === 'cards' && (
          /* ref .w-tab-pane > .container > .swiper.common-swiper.mrgtp0 — the inner
             container is real, and it is why these four tracks start 62px (22 at
             <=767) inside the section's own container rather than at its edge */
          <div className={CONTAINER}>
            <Carousel key={active} bleed={false} autoplay={false} bullets="isdi">
              {pane.cards.map((card, i) => (
                <ElCard key={`${i}-${card.title}`} card={card} />
              ))}
            </Carousel>
          </div>
        )}

        {pane.kind === 'people' && (
          /* ref .w-tab-pane > .swiper.common-swiper.mrgtp0 — this pane has no inner
             container, so its track starts at the section container's content edge */
          <Carousel key={active} bleed={false} autoplay={false} bullets="isdi">
            {pane.people.map((person, i) => (
              <PersonCard key={`${i}-${person.name}`} person={person} />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
