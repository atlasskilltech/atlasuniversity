import { cx } from '@/lib/cx';
import { headerCtas } from '@/lib/navigation';
import SmartLink from '@/components/SmartLink';
import * as s from './styles';

/**
 * Apply / Schedule bar.
 *
 * In the reference this is part of the drawer, not a persistent bottom bar:
 * it is invisible until the drawer opens, at which point it pins to the bottom
 * of the viewport.
 */
export default function MobileBottomBar({ applyHref, drawerOpen }) {
  return (
    <div
      id="mobile-bottom-buttons"
      className={cx(
        s.BOTTOM_BAR,
        drawerOpen ? `max-lg:opacity-100 ${s.BOTTOM_BAR_PINNED}` : 'max-lg:opacity-0',
      )}
    >
      <SmartLink href={applyHref} className={s.BTM_LINK_APPLY}>
        Apply Now
      </SmartLink>
      <SmartLink href={headerCtas.campusVisit} className={s.BTM_LINK_VISIT}>
        Schedule a visit
      </SmartLink>
    </div>
  );
}
