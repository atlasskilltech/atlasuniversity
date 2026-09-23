'use client';

import { cx } from '@/lib/cx';
import { isdiHeaderCtas, isdiLogo } from '@/lib/schools/isdi/navigation';
import SmartLink from '@/components/SmartLink';
import * as s from './styles';

function onActivate(handler) {
  return (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  };
}

/**
 * Logo bar — hamburger / close, ISDI x Parsons logo, search spacer, three
 * buttons. A fixed 80px strip on mobile that stays above the open drawer, so
 * the close button is always reachable.
 */
export default function LogoBar({ drawerOpen, onOpenDrawer, onCloseDrawer }) {
  return (
    <div className={s.LOGO_BAR}>
      {/* `hidden` is the desktop base for both icons, so the swap is max-lg only. */}
      <img
        src="/assets/icons/hamburger.svg"
        loading="lazy"
        alt="Open menu"
        role="button"
        tabIndex={0}
        aria-expanded={drawerOpen}
        className={cx(s.HAMBURGER, drawerOpen && 'max-lg:hidden')}
        onClick={onOpenDrawer}
        onKeyDown={onActivate(onOpenDrawer)}
      />
      <img
        src="/assets/icons/cross.svg"
        loading="lazy"
        alt="Close menu"
        role="button"
        tabIndex={0}
        className={cx(s.CLOSE_ICON, drawerOpen && 'max-lg:block')}
        onClick={onCloseDrawer}
        onKeyDown={onActivate(onCloseDrawer)}
      />

      <div className={s.LOGO_WRAP}>
        <SmartLink href={isdiLogo.href} aria-label={isdiLogo.ariaLabel} className={s.LOGO_LINK}>
          <img
            src={isdiLogo.src}
            alt={isdiLogo.alt}
            width={isdiLogo.width}
            height={isdiLogo.height}
            className={s.LOGO_IMG}
          />
        </SmartLink>
      </div>

      {/* ref form.search-br — empty upstream (inputs commented out), kept as the spacer */}
      <form action="/search" className={s.SEARCH_SPACER} />

      <div className={s.CTA_WRAP}>
        <SmartLink href={isdiHeaderCtas.apply} data-id="apply-now" className={s.BTN_PINK_RESPONSIVE}>
          Apply Now
        </SmartLink>
      </div>

      <div className={s.CTA_WRAP_HIDDEN}>
        <SmartLink
          href={isdiHeaderCtas.continueApplication}
          external
          data-id="apply-now"
          className={s.BTN_PINK}
        >
          Continue Application
        </SmartLink>
      </div>

      <div className={s.CTA_WRAP_HIDDEN}>
        <SmartLink href={isdiHeaderCtas.campusVisit} className={s.BTN_OUTLINE}>
          Schedule a visit
        </SmartLink>
      </div>
    </div>
  );
}
