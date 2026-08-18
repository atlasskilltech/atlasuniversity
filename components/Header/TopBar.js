import { cx } from '@/lib/cx';
import { utilityLinks } from '@/lib/navigation';
import SmartLink from '@/components/SmartLink';
import * as s from './styles';

/**
 * Top utility bar — 12 links.
 *
 * Desktop: `position: fixed` at the very top, retracts on scroll.
 * Mobile:  rendered inside the drawer, below the nav, and fades in with it.
 */
export default function TopBar({ retracted = false, isDesktop = true, drawerOpen = false }) {
  return (
    <div
      id="topbar"
      className={cx(
        s.TOPBAR,
        retracted && s.TOPBAR_RETRACTED,
        !isDesktop && (drawerOpen ? 'max-lg:opacity-100' : 'max-lg:opacity-0'),
      )}
    >
      <div className={s.TOPBAR_INNER}>
        {utilityLinks.map((link) => (
          <SmartLink
            key={link.label}
            href={link.href}
            external={link.external}
            className={s.TP_LINK}
          >
            <div>{link.label}</div>
            {/* ref .icon-link-mob — the diagonal arrow shown only on phones */}
            <img
              src="/assets/icons/arrow-downward.svg"
              loading="lazy"
              alt=""
              width={27}
              height={27}
              className={s.TP_ICON}
            />
          </SmartLink>
        ))}
      </div>
    </div>
  );
}
