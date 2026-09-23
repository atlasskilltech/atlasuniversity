import { cx } from '@/lib/cx';
import { isdiUtilityLinks, isdiUniversityLink } from '@/lib/schools/isdi/navigation';
import SmartLink from '@/components/SmartLink';
import * as s from './styles';

function Icon() {
  // ref .icon-link-mob — the diagonal arrow, shown on phones only
  return (
    <img
      src="/assets/icons/arrow-downward.svg"
      loading="lazy"
      alt=""
      width={24}
      height={24}
      className={s.TP_ICON}
    />
  );
}

/**
 * Pink utility bar — five links on the right, "ATLAS SkillTech University" on
 * the left.
 *
 * Desktop: `position: fixed` at the very top, retracts on scroll.
 * Mobile:  rendered inside the drawer below the nav, fading in with it.
 */
export default function TopBar({ retracted = false, isDesktop = true, drawerOpen = false }) {
  return (
    <div
      className={cx(
        s.TOPBAR,
        retracted && s.TOPBAR_RETRACTED,
        !isDesktop && (drawerOpen ? 'max-lg:opacity-100' : 'max-lg:opacity-0'),
      )}
    >
      <div className={s.TOPBAR_INNER}>
        {isdiUtilityLinks.map((link) => (
          <SmartLink key={link.label} href={link.href} className={s.TP_LINK}>
            <div>{link.label}</div>
            <Icon />
          </SmartLink>
        ))}

        <SmartLink href={isdiUniversityLink.href} className={s.LOGO_TEXT}>
          <div>{isdiUniversityLink.label}</div>
          <Icon />
        </SmartLink>
      </div>
    </div>
  );
}
