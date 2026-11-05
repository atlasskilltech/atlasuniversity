'use client';

import { cx } from '@/lib/cx';
import { headerCtas } from '@/lib/navigation';
import SmartLink from '@/components/SmartLink';
import * as s from './styles';

/**
 * Logo bar — hamburger / close icon, logo, search spacer, three CTAs.
 * Fixed 80px strip on mobile; sits above the open drawer so the close button
 * is always reachable.
 */
export default function LogoBar({ applyHref, drawerOpen, onOpenDrawer, onCloseDrawer }) {
  return (
    <div className={s.LOGO_BAR}>
      {/*
        ref .hamburger-menu / .hamb-close-icon. The open/closed swap uses
        `max-lg:` variants only — `hidden` is the desktop base state for both
        icons, so toggling it directly would leak the hamburger onto desktop.
      */}
      <img
        id="hamburger-menu"
        src="/assets/icons/hamburger.svg"
        loading="lazy"
        alt="Open menu"
        role="button"
        tabIndex={0}
        aria-controls="main-menu-container"
        aria-expanded={drawerOpen}
        className={cx(s.HAMBURGER, drawerOpen && 'max-lg:hidden')}
        onClick={onOpenDrawer}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenDrawer();
          }
        }}
      />
      <img
        id="hamburger-close"
        src="/assets/icons/cross.svg"
        loading="lazy"
        alt="Close menu"
        role="button"
        tabIndex={0}
        aria-controls="main-menu-container"
        className={cx(s.CLOSE_ICON, drawerOpen && 'max-lg:block')}
        onClick={onCloseDrawer}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCloseDrawer();
          }
        }}
      />

      <div className={s.LOGO_WRAP}>
        <SmartLink href="/" aria-current="page" className={s.LOGO_LINK}>
          <img
            src="/assets/logos/atlas-logo-102x45.svg"
            srcSet="/assets/logos/atlas-logo-102x45.svg 1x, /assets/logos/atlas-logo-204x91.svg 2x"
            alt="ATLAS University Logo"
            width={102}
            height={45}
            className={s.LOGO_IMG}
          />
        </SmartLink>
      </div>

      {/*
        ref form.search-br — both of its inputs are commented out upstream, but
        the empty form's `flex:1` is what pushes the CTAs to the right edge.
        Removing it collapses the logo bar layout.
      */}
      <form action="/search" role="search" className={s.SEARCH_SPACER} />

      <div className={s.CTA_WRAP}>
        <SmartLink href={applyHref} data-id="apply-now" className={s.BTN_CYAN_RESPONSIVE}>
          Apply Now
        </SmartLink>
      </div>

      {/* ref .logo-btn-wrap.hide-btn -> hidden only below 768px */}
      <div className={s.CTA_WRAP_HIDDEN}>
        <SmartLink
          href={headerCtas.continueApplication}
          external
          data-id="apply-now"
          className={s.BTN_CYAN}
        >
          Continue Application
        </SmartLink>
      </div>

      <div className={s.CTA_WRAP_HIDDEN}>
        <SmartLink href={headerCtas.campusVisit} className={s.BTN_OUTLINE}>
          Schedule a visit
        </SmartLink>
      </div>
    </div>
  );
}
