'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import MintTabStrip from '@/components/Schools/ISDI/Home/MintTabStrip';
import LogoGrid from '@/components/ui/LogoGrid';
import { CONTAINER, H2, SECTION, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * ISME "Powered by Industry" — `section.section > .container > (h2.h2-tag.mrg16,
 * .sub-heading.mrgbtm, .rounded-tabs-mint)` in reference/schools/isme/index.php. The strip is the
 * bare `.tabs-menu-mint` (`spacing="wide"`) on ISME's mint pills; each pane is the shared
 * `ui/LogoGrid` (215 x 85 marks, four columns, two at <=767). `.tab-content-mint` pads 56 above
 * the grid (40 at <=767). Measured at 1440 / 767 / 390.
 */
export default function Industry({ data, block = 'industry' }) {
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
        <div className={SUB_INNER_MRGBTM}>{data.sub}</div>
        <MintTabStrip
          tabs={data.tabs.map((t) => t.label)}
          active={active}
          onChange={select}
          label={data.heading}
          idPrefix="isme-industry"
          spacing="wide"
          skin="mint"
        />
        <div className="relative pt-14 text-[18px] leading-[1.5] max-md:pt-10">
          {data.tabs.map((tab, i) =>
            i === shown ? (
              <div
                key={tab.label}
                role="tabpanel"
                id={`isme-industry-panel-${i}`}
                aria-labelledby={`isme-industry-tab-${i}`}
                className={cx(
                  'transition-opacity ease-[ease]',
                  visible ? 'opacity-100 duration-300' : 'opacity-0 duration-100',
                )}
              >
                <LogoGrid logos={tab.logos} />
              </div>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
