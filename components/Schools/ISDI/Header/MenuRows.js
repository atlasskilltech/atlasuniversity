'use client';

import { Fragment } from 'react';
import { cx } from '@/lib/cx';
import SmartLink from '@/components/SmartLink';
import DrawerHeader from './DrawerHeader';
import * as s from './styles';

const ARROW = '/assets/icons/arrow-downward.svg';

/** Labels carry `\n` where the reference hard-codes a <br>. */
export function Label({ text }) {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

function RowContent({ label, level }) {
  return (
    <>
      <span className={cx('block', s.TEXT_LNK)}>
        <Label text={label} />
      </span>
      <img src={ARROW} loading="lazy" alt="" width={22} height={22} className={s.ARROW_BY_LEVEL[level]} />
    </>
  );
}

/**
 * One row of a level-1 / level-2 / level-3 list.
 *
 * A row with `children` is the reference's `div.level-N-link`: it only opens
 * the next level, and that level's <ul> is nested *inside* it, exactly as
 * upstream. The nesting matters twice over — it is what keeps the parent row
 * highlighted while the pointer is in the child panel, and it is what makes the
 * mobile drawers stack (each open drawer is the containing block of the next).
 */
function Row({ item, level, rowId, menu, isDesktop }) {
  const styleLevel = item.level ?? level;

  if (!item.children) {
    return (
      <li className={s.ITEM_BY_LEVEL[styleLevel]}>
        <SmartLink
          href={item.href}
          external={item.external}
          className={s.LINK_BY_LEVEL[styleLevel]}
        >
          <RowContent label={item.label} level={styleLevel} />
        </SmartLink>
      </li>
    );
  }

  const childLevel = level + 1;
  const open = menu.isOpen(level, rowId);

  /*
   * Only a click on the row itself toggles it. Clicks that bubble up from the
   * nested panel — a link, or a deeper row — belong to that element. The
   * reference gets the same result with `stopPropagation()` on every level.
   */
  const ownEvent = (e) =>
    !e.target.closest('a') && e.target.closest('[data-menu-row]') === e.currentTarget;

  return (
    <li className={s.ITEM_BY_LEVEL[styleLevel]}>
      <div
        data-menu-row
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className={s.LINK_BY_LEVEL[styleLevel]}
        onClick={(e) => {
          if (!ownEvent(e)) return;
          e.stopPropagation();
          menu.toggle(level, rowId);
        }}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.toggle(level, rowId);
          }
        }}
      >
        <RowContent label={item.label} level={styleLevel} />

        <ul className={cx(childLevel === 2 ? s.LEVEL_2 : s.LEVEL_3, open ? s.LEVEL_OPEN : s.PANEL_CLOSED)}>
          {!isDesktop && (
            <DrawerHeader title={item.label} onBack={() => menu.close(level)} />
          )}
          <Rows items={item.children} level={childLevel} parentId={rowId} menu={menu} isDesktop={isDesktop} />
        </ul>
      </div>
    </li>
  );
}

export function Rows({ items, level, parentId, menu, isDesktop }) {
  return items.map((item, i) => (
    <Row
      key={`${i}-${item.label}`}
      item={item}
      level={level}
      rowId={`${parentId}.${i}`}
      menu={menu}
      isDesktop={isDesktop}
    />
  ));
}
