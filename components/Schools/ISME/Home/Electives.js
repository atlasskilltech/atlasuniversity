'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import MintTabStrip from '@/components/Schools/ISDI/Home/MintTabStrip';
import MinorCard from '@/components/Schools/ISDI/MinorCard';
import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * ISME "ATLAS Electives" — `section.section > .container > (h2.h2-tag.mrg16, .sub-heading,
 * .skills-electives-wrapper > .rounded-tabs-mint)` in reference/schools/isme/index.php. The same
 * widget as the ISDI Postgraduate Overview's minors (`ProgramsUg/Multidisciplinary`, grid form),
 * on ISME's skins: the `mint` pill strip and the `isme` elective card. Measured on production:
 *
 *   .skills-electives-wrapper   pt 56 (24 at <=767)
 *   .tab-content-mint.padtp32   pt 32 at every width, inside `.container`
 *   .electives-card-wrapper     flex wrap, gap 16; a two-column grid at <=767
 *
 * Tab switching reproduces Webflow's 100ms-out / 300ms-in fade.
 */
export default function Electives({ data, block = 'electives' }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(true);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const select = (i) => {
    if (i === active) return;
    setActive(i);
    setVisible(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(i);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 100);
  };

  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`${H2} mb-4 max-md:mb-2`}>{data.heading}</h2>
        <div className={SUB_INNER}>{data.sub}</div>
        <div className="pt-14 max-md:pt-6">
          <MintTabStrip
            tabs={data.tabs.map((t) => t.label)}
            active={active}
            onChange={select}
            label={data.heading}
            idPrefix="isme-electives"
            skin="mint"
          />
        </div>
        <div className="relative pt-8 text-[18px] leading-[1.5]">
          {data.tabs.map((tab, i) =>
            i === shown ? (
              <div
                key={tab.label}
                role="tabpanel"
                id={`isme-electives-panel-${i}`}
                aria-labelledby={`isme-electives-tab-${i}`}
                className={cx(
                  'transition-opacity ease-[ease]',
                  visible ? 'opacity-100 duration-300' : 'opacity-0 duration-100',
                )}
              >
                <div className="flex flex-wrap gap-4 max-md:grid max-md:grid-cols-2">
                  {tab.cards.map((card, j) => (
                    <MinorCard key={`${j}-${card.title}`} card={card} variant="isme" />
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
