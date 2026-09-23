'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { cx } from '@/lib/cx';
import { useIsDesktop } from '@/lib/useMediaQuery';
import { isdiContactLink, isdiHeaderCtas, isdiMegaMenu } from '@/lib/schools/isdi/navigation';
import SmartLink from '@/components/SmartLink';
import { useStickyHeader } from '@/components/Header/useStickyHeader';

import TopBar from './TopBar';
import LogoBar from './LogoBar';
import NavItem from './NavItem';
import * as s from './styles';

const CLOSED = { navId: null, l1Row: null, l2Row: null, drawer: false };

/**
 * ISDI school header — port of reference/schools/isdi/assets/include/header.php
 * (markup, both inline <style> blocks and the click-menu <script>) plus the
 * header half of reference/schools/isdi/assets/include/footer.php (sticky scroll
 * and the mobile drawer).
 *
 *   >= 992px  pink 48px utility bar + 156px logo/menu bar, both fixed. Panels
 *             open on click: level 1 (25%) | level 2 (330px) | level 3 (650px),
 *             or level 1 beside a 75% photograph.
 *   <= 991px  fixed 80px logo bar; the menu, the utility bar and an
 *             Apply / Schedule bar live in a full-screen drawer, one sliding
 *             panel per level, each with a back button.
 *
 * Mounted once by app/schools/isdi/layout.js, so every ISDI page gets it.
 *
 * ── What is shared with the ATLAS header, and what is not ────────────────────
 * The scroll behaviour in the ISDI footer.php is the ATLAS one verbatim
 * (whitespace-only diff), so `useStickyHeader` is reused as-is. The markup and
 * styling are not shared: this reference differs in its palette, font, a third
 * menu level, panel height and several mobile rules, and bending
 * components/Header around that would mean re-skinning a finished component.
 *
 * ── Deviations from the reference, all deliberate ────────────────────────────
 * 1. One viewport threshold at 992px. The reference decides mobile vs desktop
 *    with a User-Agent regex, and its drawer CSS stops at 768px, so on a
 *    769-991px screen the whole menu renders inline beneath the logo bar and
 *    pushes the page down (measured on production). The ATLAS header made the
 *    same call.
 * 2. The drawers sit at y=81 as in the reference but are sized to the space
 *    left below it; upstream they are 100vh tall starting 81px down, so their
 *    last rows fall off the screen.
 * 3. Menus close when the route changes. Upstream every navigation is a full
 *    page load, which resets them; a client-side navigation does not.
 * 4. Escape closes one level at a time, and the body stops scrolling behind the
 *    open drawer — both as in the ATLAS header.
 * 5. Hover styling stays desktop-only. Upstream the hover rules are scoped
 *    `min-width: 567px`, so on a 568-991px touch screen the tapped drawer row
 *    turns pink and collapses from 51px to 33px, and stays that way.
 *
 * ── Known page-level variation (for the ISDI homepage step) ─────────────────
 * On scroll, header.php slides both bars away (`translateY(-100%/-105%)`, 0.5s)
 * and that is what this component does — as 36 of the 60 ISDI pages render.
 * The other 24 (index.php and the programme pages) carry a Webflow utility
 * embed in their *body*, `.hide { display: none !important }`, which overrides
 * the slide: the bars vanish instantly instead. The end state is identical;
 * only the animation differs. That rule belongs to those pages, not to the
 * header, so it is not baked in here.
 */
export default function ISDIHeader() {
  const isDesktop = useIsDesktop();
  const pathname = usePathname();
  const { topbarHidden, mainbarHidden, mainbarPinned } = useStickyHeader();

  /*
   * Menu state is stamped with the breakpoint and the route it was opened on.
   * Read back through that stamp, anything opened on the other side of 992px or
   * on a previous page reads as closed — with no reset effect and no state
   * written during render.
   */
  const mode = isDesktop ? 'desktop' : 'mobile';
  const [state, setState] = useState({ mode, path: pathname, ...CLOSED });
  const current = state.mode === mode && state.path === pathname ? state : CLOSED;
  const { navId, l1Row, l2Row, drawer: drawerOpen } = current;

  const navRef = useRef(null);

  const patch = useCallback(
    (update) =>
      setState((prev) => {
        const base = prev.mode === mode && prev.path === pathname ? prev : CLOSED;
        return { ...base, mode, path: pathname, ...update(base) };
      }),
    [mode, pathname],
  );

  const closePanels = useCallback(() => patch(() => ({ navId: null, l1Row: null, l2Row: null })), [patch]);
  const closeDrawer = useCallback(() => patch(() => CLOSED), [patch]);

  /*
   * The reference's click script: opening anything closes everything at that
   * level and below; clicking the open row again closes it.
   */
  const menu = useMemo(
    () => ({
      navId,
      isOpen: (level, rowId) => (level === 1 ? l1Row === rowId : l2Row === rowId),
      toggleNav: (id) =>
        patch((b) => ({ navId: b.navId === id ? null : id, l1Row: null, l2Row: null })),
      closeNav: closePanels,
      toggle: (level, rowId) =>
        patch((b) =>
          level === 1
            ? { l1Row: b.l1Row === rowId ? null : rowId, l2Row: null }
            : { l2Row: b.l2Row === rowId ? null : rowId },
        ),
      close: (level) => patch(() => (level === 1 ? { l1Row: null, l2Row: null } : { l2Row: null })),
    }),
    [navId, l1Row, l2Row, patch, closePanels],
  );

  /* ref: `if (!e.target.closest('.mega-menus')) closeAllMenus()` */
  useEffect(() => {
    if (navId === null) return undefined;
    const onClick = (e) => {
      if (!navRef.current?.contains(e.target)) closePanels();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navId, closePanels]);

  /* Escape unwinds one level at a time. */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (l2Row) patch(() => ({ l2Row: null }));
      else if (l1Row) patch(() => ({ l1Row: null }));
      else if (navId) closePanels();
      else if (drawerOpen) closeDrawer();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [l2Row, l1Row, navId, drawerOpen, patch, closePanels, closeDrawer]);

  /* Lock body scroll behind the open drawer. */
  useEffect(() => {
    if (!drawerOpen) return undefined;
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [drawerOpen]);

  const utilityBar = <TopBar retracted={topbarHidden} isDesktop={isDesktop} drawerOpen={drawerOpen} />;

  return (
    <div data-header-root data-school="isdi" className={s.ROOT}>
      {/*
        Desktop: the utility bar is a sibling of the main bar. It cannot live
        inside it — the main bar takes a `transform` when it retracts, which
        would become the containing block of the fixed utility bar.
      */}
      {isDesktop && utilityBar}

      <div
        className={cx(s.MAINBAR, mainbarPinned ? 'lg:top-0' : 'lg:top-12', mainbarHidden && s.MAINBAR_RETRACTED)}
      >
        <LogoBar
          drawerOpen={drawerOpen}
          onOpenDrawer={() => patch(() => ({ drawer: true }))}
          onCloseDrawer={closeDrawer}
        />

        <div
          id="isdi-main-menu"
          className={cx(s.MENU_CONTAINER, drawerOpen ? s.MENU_CONTAINER_OPEN : s.MENU_CONTAINER_CLOSED)}
        >
          <nav
            ref={navRef}
            aria-label="ISDI navigation"
            className={cx(s.MEGA_MENU, !isDesktop && (drawerOpen ? 'max-lg:opacity-100' : 'max-lg:opacity-0'))}
          >
            {isdiMegaMenu.map((entry, i) => (
              <NavItem key={entry.id} entry={entry} index={i} isDesktop={isDesktop} menu={menu} />
            ))}

            <div className={s.NAV_ITEM}>
              <SmartLink href={isdiContactLink.href} className={s.NAV_PLAIN_LINK}>
                <span className="block">{isdiContactLink.label}</span>
                <img src={isdiContactLink.icon} loading="lazy" alt="" width={12} height={12} className={s.NAV_LINK_ICON} />
              </SmartLink>
            </div>

            {/*
              ref: the menu's inline <style> lives in an empty `.w-embed` div
              after "Contact Us". It has no size, but `justify-content:
              space-around` still gives it a share of the free space, and that
              is what sets the gaps between the nav links (measured at 1440:
              1313px of links + 10 x 12.7px = 1440). Its `<script>` sibling
              generates no box.
            */}
            <div aria-hidden="true" />
          </nav>

          {/* Mobile: the utility bar lives inside the drawer, below the nav. */}
          {!isDesktop && utilityBar}

          <div
            className={cx(
              s.BOTTOM_BAR,
              drawerOpen ? `max-lg:opacity-100 ${s.BOTTOM_BAR_PINNED}` : 'max-lg:opacity-0',
            )}
          >
            <SmartLink href={isdiHeaderCtas.apply} className={s.BTM_LINK_APPLY}>
              Apply Now
            </SmartLink>
            <SmartLink href={isdiHeaderCtas.campusVisit} className={s.BTM_LINK_VISIT}>
              Schedule a visit
            </SmartLink>
          </div>
        </div>
      </div>
    </div>
  );
}
