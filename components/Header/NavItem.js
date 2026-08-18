'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { cx } from '@/lib/cx';
import SmartLink from '@/components/SmartLink';
import DrawerHeader from './DrawerHeader';
import * as s from './styles';

/**
 * The reference hard-codes <br> inside several menu labels. Labels in
 * lib/navigation.js carry a `\n` at those exact positions.
 */
function Label({ text }) {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

const ARROW = '/assets/icons/arrow-downward.svg';

/** One level-2 entry ("ISDI Summer School (Design)" etc.). */
function Level2Item({ item }) {
  return (
    <li className={s.LEVEL_2_ITEM}>
      <SmartLink
        href={item.href}
        external={item.external}
        newTab={item.newTab}
        className={s.LEVEL_2_LINK}
      >
        <span className={s.TEXT_LNK}>
          <Label text={item.label} />
        </span>
        <img src={ARROW} loading="lazy" alt="" width={22} height={22} className={s.LINK_ARROW_L2} />
      </SmartLink>
    </li>
  );
}

/** One level-1 entry — either a link, a spacer, or a level-2 opener. */
function Level1Item({ item, isDesktop, sub2Open, onToggleSub2, onCloseSub2 }) {
  if (item.spacer) {
    // ref ships an empty <li> at the top of the Schools list (8px gap)
    return <li className={s.LEVEL_1_SPACER} aria-hidden="true" />;
  }

  if (item.children) {
    // ref renders this trigger as a <div>, not an <a> — it only opens level 2
    return (
      <li className={s.LEVEL_1_ITEM}>
        <div
          data-sub2-trigger
          role="button"
          tabIndex={0}
          aria-expanded={sub2Open}
          className={s.LEVEL_1_LINK}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleSub2();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onToggleSub2();
            }
          }}
        >
          <span className={s.TEXT_LNK}>
            <Label text={item.label} />
          </span>
          <img src={ARROW} loading="lazy" alt="" width={22} height={22} className={s.LINK_ARROW} />

          <ul
            data-sub2
            id={item.panelId}
            className={cx(s.LEVEL_2, sub2Open ? s.LEVEL_2_OPEN : s.PANEL_CLOSED)}
          >
            {!isDesktop && <DrawerHeader title={item.label} onBack={onCloseSub2} />}
            {item.children.map((child) => (
              <Level2Item key={child.label} item={child} />
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li className={s.LEVEL_1_ITEM}>
      <SmartLink
        href={item.href}
        external={item.external}
        newTab={item.newTab}
        className={s.LEVEL_1_LINK}
      >
        <span className={s.TEXT_LNK}>
          <Label text={item.label} />
        </span>
        <img src={ARROW} loading="lazy" alt="" width={22} height={22} className={s.LINK_ARROW} />
      </SmartLink>
    </li>
  );
}

/**
 * A top-level nav entry with a mega-menu panel.
 *
 * Desktop: click opens an absolutely-positioned panel spanning the menu bar.
 * Mobile:  the same panel slides in from the left as a full-screen drawer.
 */
export default function NavItem({
  entry,
  isDesktop,
  open,
  sub2Open,
  onToggle,
  onClose,
  onToggleSub2,
  onCloseSub2,
}) {
  return (
    <div className={s.NAV_ITEM}>
      <button
        data-menu-trigger
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        className={s.NAV_TRIGGER}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
      >
        <span>{entry.label}</span>
        <img
          src="/assets/icons/nav-arrow-down.svg"
          loading="lazy"
          alt=""
          width={10}
          height={5}
          className={cx(s.NAV_ARROW, open && s.NAV_ARROW_OPEN)}
        />
      </button>

      <div data-submenu className={cx(s.SUBNAV, open ? s.SUBNAV_OPEN : s.PANEL_CLOSED)}>
        {!isDesktop && <DrawerHeader title={entry.label} onBack={onClose} />}

        <ul className={s.LEVEL_1}>
          {entry.items.map((item, i) => (
            <Level1Item
              key={item.spacer ? `spacer-${i}` : item.label}
              item={item}
              isDesktop={isDesktop}
              sub2Open={sub2Open}
              onToggleSub2={onToggleSub2}
              onCloseSub2={onCloseSub2}
            />
          ))}
        </ul>

        {/* ref .nav-image-container — 75% panel, hidden on mobile */}
        <div className={s.NAV_IMAGE_WRAP}>
          <Image
            src={entry.image.src}
            alt={entry.image.alt}
            width={entry.image.width}
            height={entry.image.height}
            sizes="100vw"
            loading="lazy"
            className={s.NAV_IMAGE}
          />
        </div>
      </div>
    </div>
  );
}
