'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { cx } from '@/lib/cx';
import { useIsDesktop } from '@/lib/useMediaQuery';
import { megaMenu, primaryLinks, applyHrefFor } from '@/lib/navigation';
import SmartLink from '@/components/SmartLink';

import TopBar from './TopBar';
import LogoBar from './LogoBar';
import NavItem from './NavItem';
import MobileBottomBar from './MobileBottomBar';
import { useStickyHeader } from './useStickyHeader';
import * as s from './styles';

const CLOSED = { openId: null, sub2Id: null, drawer: false };

/**
 * Site header — port of reference/assets/include/header.php.
 *
 *   >= 992px  two fixed bars (48px utility + 156px logo/menu); the mega menu
 *             opens on click as a full-width dropdown panel.
 *   <= 991px  80px fixed logo bar; everything else lives in a full-screen
 *             sliding drawer with per-level panels and a back button.
 *
 * The reference achieves the mobile layout by re-parenting DOM nodes at
 * runtime. Here the placement is expressed declaratively instead: the utility
 * bar renders inside the drawer on mobile and as a sibling of the main bar on
 * desktop. (It cannot simply live inside the main bar on desktop — the main bar
 * takes a `transform` when it retracts, which would become the containing block
 * for the `position: fixed` utility bar and drag it off-screen.)
 */
export default function Header() {
  const isDesktop = useIsDesktop();
  const pathname = usePathname();
  const applyHref = applyHrefFor(pathname);

  const { topbarHidden, mainbarHidden, mainbarPinned } = useStickyHeader();

  /*
   * Open state is stamped with the breakpoint it was opened in. Reading it back
   * through `menu.mode === mode` means anything opened on one side of the
   * threshold reads as closed on the other, so neither layout can inherit the
   * other's open panels — with no reset effect and no state written during
   * render.
   */
  const mode = isDesktop ? 'desktop' : 'mobile';
  const [menu, setMenu] = useState({ mode, ...CLOSED });
  const { openId, sub2Id, drawer: drawerOpen } = menu.mode === mode ? menu : CLOSED;

  const navRef = useRef(null);

  /** Apply a patch, discarding any state left over from the other breakpoint. */
  const patchMenu = useCallback(
    (patch) => {
      setMenu((current) => {
        const base = current.mode === mode ? current : CLOSED;
        return { ...base, mode, ...(typeof patch === 'function' ? patch(base) : patch) };
      });
    },
    [mode],
  );

  const closeAllPanels = useCallback(
    () => patchMenu({ openId: null, sub2Id: null }),
    [patchMenu],
  );

  const closeDrawer = useCallback(() => patchMenu(CLOSED), [patchMenu]);

  const toggleEntry = useCallback(
    (id) => patchMenu((base) => ({ sub2Id: null, openId: base.openId === id ? null : id })),
    [patchMenu],
  );

  const toggleSub2 = useCallback(
    (id) => patchMenu((base) => ({ sub2Id: base.sub2Id === id ? null : id })),
    [patchMenu],
  );

  /* Close the mega menu when clicking outside it (desktop only). */
  useEffect(() => {
    if (!isDesktop || openId === null) return undefined;
    const onClick = (e) => {
      if (!navRef.current?.contains(e.target)) closeAllPanels();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isDesktop, openId, closeAllPanels]);

  /* Escape unwinds one level at a time. */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (sub2Id) patchMenu({ sub2Id: null });
      else if (openId) patchMenu({ openId: null });
      else if (drawerOpen) closeDrawer();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [sub2Id, openId, drawerOpen, patchMenu, closeDrawer]);

  /* Lock body scroll behind the open drawer to stop scroll-chaining. */
  useEffect(() => {
    if (!drawerOpen) return undefined;
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [drawerOpen]);

  const utilityBar = (
    <TopBar retracted={topbarHidden} isDesktop={isDesktop} drawerOpen={drawerOpen} />
  );

  return (
    <div
      data-header-root
      className="relative z-1000 w-full max-lg:h-auto max-lg:overflow-auto max-md:block"
    >
      {/* Desktop: the utility bar is a sibling of the main bar. */}
      {isDesktop && utilityBar}

      <div
        id="mainbar"
        className={cx(
          s.MAINBAR,
          mainbarPinned ? 'lg:top-0' : 'lg:top-12',
          mainbarHidden && s.MAINBAR_RETRACTED,
        )}
      >
        <LogoBar
          applyHref={applyHref}
          drawerOpen={drawerOpen}
          onOpenDrawer={() => patchMenu({ drawer: true })}
          onCloseDrawer={closeDrawer}
        />

        <div
          id="main-menu-container"
          className={cx(
            s.MENU_CONTAINER,
            drawerOpen ? s.MENU_CONTAINER_OPEN : s.MENU_CONTAINER_CLOSED,
          )}
        >
          <nav
            ref={navRef}
            aria-label="Main navigation"
            className={cx(
              s.MEGA_MENU,
              !isDesktop && (drawerOpen ? 'max-lg:opacity-100' : 'max-lg:opacity-0'),
            )}
          >
            {megaMenu.map((entry) => (
              <NavItem
                key={entry.id}
                entry={entry}
                isDesktop={isDesktop}
                open={openId === entry.id}
                sub2Open={sub2Id === entry.id}
                onToggle={() => toggleEntry(entry.id)}
                onClose={() => patchMenu({ openId: null })}
                onToggleSub2={() => toggleSub2(entry.id)}
                onCloseSub2={() => patchMenu({ sub2Id: null })}
              />
            ))}

            {primaryLinks.map((link) => (
              <div key={link.href} className={s.NAV_ITEM}>
                <SmartLink href={link.href} className={s.NAV_PLAIN_LINK}>
                  <span>{link.label}</span>
                </SmartLink>
              </div>
            ))}
          </nav>

          {/* Mobile: the utility bar lives inside the drawer, below the nav. */}
          {!isDesktop && utilityBar}

          <MobileBottomBar applyHref={applyHref} drawerOpen={drawerOpen} />
        </div>
      </div>
    </div>
  );
}
