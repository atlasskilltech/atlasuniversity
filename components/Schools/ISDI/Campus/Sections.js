'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ContentCardB, { SHAPING_WRAPPER } from '@/components/ui/ContentCardB';
import PhotoColumns from '@/components/ui/PhotoColumns';
import PhotoGallery from '../PhotoGallery';
import IconSection from '../About/IconSection';
import MintTabStrip from '../Home/MintTabStrip';
import { BLUE_DESC, BLUE_DESC_WRAP, BLACK_DESC, WHITE_DESC_WRAP } from '../Life/ui';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';

/* a Webflow content-card-b variant -> ContentCardB's only layout switch */
const cardItem = (c) => ({ ...c, variant: c.variant && c.variant.includes('switch') ? 'switch' : 'default' });

/* ref `.isdi-page .common-wrapper` — header.php pins it to `padding-top: 50px`
   at every width (0,2,0, so it beats both the sheet's 56 and its <=767 40). The
   shared `COMMON_WRAPPER` const is the ATLAS 56, so ISDI uses this 50 instead. */
const ISDI_COMMON = 'pt-[50px]';

/* ---- #campus-location: "Beyond campus, within reach" (blue-wrapper + map tabs) --- */
export function Location({ data }) {
  const [active, setActive] = useState(0);
  return (
    <IconSection id="campus-location" block="location" icon={data.icon} title={data.title} tone="blue">
      <div className={CONTAINER}>
        {/* ref .blue-desc-wrap.mrgbtm.isdi > .white-desc-text — the lead→tabs gap
            measures 42px on production (not the white wrap's 56) */}
        <div className={cx(BLUE_DESC_WRAP, 'mb-[42px]')}>
          <div className={BLUE_DESC}>{withBreaks(data.lead)}</div>
        </div>
        {/* ref .rounded-tabs-mint */}
        <div className="relative">
          <MintTabStrip
            tabs={data.tabs.map((t) => t.label)}
            active={active}
            onChange={setActive}
            skin="white"
            label={data.title}
            idPrefix="campus-location"
          />
          {/* ref .tab-content-mint.padtp32 — pt 32 (16 at <=479) */}
          <div className="relative pt-8">
            {data.tabs.map((tab, i) => (
              <div
                key={tab.label}
                role="tabpanel"
                id={`campus-location-panel-${i}`}
                aria-labelledby={`campus-location-tab-${i}`}
                hidden={i !== active}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tab.image.src}
                  srcSet={tab.image.srcSet}
                  sizes={tab.image.sizes}
                  alt={tab.image.alt}
                  loading="lazy"
                  className="inline-block w-full max-w-full align-middle"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </IconSection>
  );
}

/* ---- #campus-learn: "A campus built to learn, live & thrive" (.sm.isdi grid) ---- */
export function Learn({ data }) {
  return (
    <section id="campus-learn" data-block="learn" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{withBreaks(data.heading)}</h2>
        <PhotoColumns
          rounded="isdi"
          columns={data.columns.map((col) => col.map((c) => ({ image: c.image, label: c.caption })))}
        />
      </div>
    </section>
  );
}

/* ---- #campus-spaces / #campus-green: icon-heading + ContentCardB stack ---------- */
export function Spaces({ data }) {
  return (
    <IconSection id="campus-spaces" block="spaces" icon={data.icon} title={data.title} tone="white">
      <div className={CONTAINER}>
        <div className={ISDI_COMMON}>
          {/* ref .sub-heading */}
          <div className={SUB}>{withBreaks(data.sub)}</div>
          {/* ref .shaping-wrapper — the page's own <style> sets `.cd-cont-b-imgwrap
              { height: 220px }` at <=767, so the media is a fixed 220 below the copy */}
          <div className={SHAPING_WRAPPER}>
            {data.cards.map((c, i) => (
              <ContentCardB key={`${i}-${c.title}`} item={cardItem(c)} mediaClassName="max-md:h-[220px]" />
            ))}
          </div>
        </div>
      </div>
    </IconSection>
  );
}

export function Green({ data }) {
  return (
    <IconSection id="campus-green" block="green" icon={data.icon} title={data.title} tone="white">
      <div className={CONTAINER}>
        {/* ref .white-desc-wrap > .black-desc-text — NO `.mrgbtm` here (mb 0);
            the lead->cards gap is the .common-wrapper's own 50px top padding */}
        <div className={WHITE_DESC_WRAP}>
          <div className={BLACK_DESC}>{withBreaks(data.lead)}</div>
        </div>
        {/* ref .common-wrapper (isdi pt 50) — `.cd-cont-b-imgwrap { height: 220px }` at <=767 */}
        <div className={ISDI_COMMON}>
          {data.cards.map((c, i) => (
            <ContentCardB key={`${i}-${c.title}`} item={cardItem(c)} mediaClassName="max-md:h-[220px]" />
          ))}
        </div>
      </div>
    </IconSection>
  );
}

/* ---- "Hangout zones": head-wrap + the instagram-wrapper photo wall -------------- */
export function Hangout({ data }) {
  return (
    <section data-block="hangout" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap > .tt-wrap */}
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB}>{withBreaks(data.sub)}</div>
        {/* ref .instagram-wrapper.mobile-vert-scroll (no `.mar-0`, so the wrapper keeps
            its own 56px top margin at every width) > .grid-gallery-flex (no `.mrgtp`) */}
        <PhotoGallery columns={data.columns} className="mt-14" />
      </div>
    </section>
  );
}
