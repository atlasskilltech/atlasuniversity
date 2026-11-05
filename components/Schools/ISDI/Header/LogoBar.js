'use client';

import { cx } from '@/lib/cx';
import SmartLink from '@/components/SmartLink';
import { useSkin } from './skin';

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
/* `logo` / `ctas` / `applyHref` come from the school's navigation model (see ISDIHeader's `site`) */
export default function LogoBar({ logo, ctas, applyHref, drawerOpen, onOpenDrawer, onCloseDrawer }) {
  const s = useSkin();
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
        <SmartLink href={logo.href} aria-label={logo.ariaLabel} className={s.LOGO_LINK}>
          <img
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={s.LOGO_IMG}
          />
        </SmartLink>
      </div>

      {/* ref form.search-br — empty upstream (inputs commented out), kept as the spacer */}
      <form action="/search" className={s.SEARCH_SPACER} />

      <div className={s.CTA_WRAP}>
        <SmartLink href={applyHref} data-id="apply-now" className={s.BTN_PINK_RESPONSIVE}>
          Apply Now
        </SmartLink>
      </div>

      <div className={s.CTA_WRAP_HIDDEN}>
        <SmartLink
          href={ctas.continueApplication}
          external
          data-id="apply-now"
          className={s.BTN_PINK}
        >
          Continue Application
        </SmartLink>
      </div>

      <div className={s.CTA_WRAP_HIDDEN}>
        <SmartLink href={ctas.campusVisit} className={s.BTN_OUTLINE}>
          {ctas.campusVisitLabel || 'Schedule a visit'}
        </SmartLink>
      </div>
    </div>
  );
}
