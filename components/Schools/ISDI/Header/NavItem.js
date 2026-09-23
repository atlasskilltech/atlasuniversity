'use client';

import { cx } from '@/lib/cx';
import DrawerHeader from './DrawerHeader';
import { Rows } from './MenuRows';
import * as s from './styles';

/**
 * A top-level entry with a panel (`.nav-link > .text-link + .sub-nav`).
 *
 * Desktop: click opens a 600px panel across the whole menu bar; level 2 opens
 *          beside level 1 and level 3 beside level 2.
 * Mobile:  each level is a full-screen drawer with a back button.
 */
export default function NavItem({ entry, index, isDesktop, menu }) {
  const open = menu.navId === entry.id;

  return (
    <div className={s.NAV_ITEM}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        className={s.NAV_TRIGGER}
        onClick={(e) => {
          e.stopPropagation();
          menu.toggleNav(entry.id);
        }}
      >
        <span className="block">{entry.label}</span>
        {/* eslint-disable-next-line @next/next/no-img-element -- a 326-byte SVG chevron */}
        <img
          src="/assets/icons/nav-arrow-down.svg"
          loading="lazy"
          alt=""
          width={10}
          height={5}
          className={cx(s.NAV_ARROW, open && s.NAV_ARROW_OPEN)}
        />
      </button>

      <div className={cx(s.SUBNAV, open ? s.SUBNAV_OPEN : s.PANEL_CLOSED)}>
        {!isDesktop && <DrawerHeader title={entry.label} onBack={() => menu.closeNav()} />}

        <ul className={s.LEVEL_1}>
          <Rows items={entry.items} level={1} parentId={String(index)} menu={menu} isDesktop={isDesktop} />
        </ul>

        {entry.image && (
          <div className={s.NAV_IMAGE_WRAP}>
            {/*
              A plain <img>: the file is already a pre-encoded 1023w WebP (the
              only candidate the reference's srcset ever selects here), and
              next/image would re-encode it at q75 for no size win. It is lazy,
              so nothing downloads until a panel is opened.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.image.src}
              alt={entry.image.alt}
              width={entry.image.width}
              height={entry.image.height}
              loading="lazy"
              decoding="async"
              className={s.NAV_IMAGE}
            />
          </div>
        )}
      </div>
    </div>
  );
}
