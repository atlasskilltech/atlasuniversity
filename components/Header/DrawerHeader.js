import * as s from './styles';

/**
 * Sticky title bar with a back button, shown at the top of every mobile drawer
 * panel. The reference builds this node in JavaScript (`addDrawerHeader`);
 * here it is just part of the panel's markup on mobile.
 */
export default function DrawerHeader({ title, onBack }) {
  return (
    <div data-drawer-header className={s.DRAWER_HEADER}>
      <button type="button" aria-label="Back" className={s.DRAWER_BACK} onClick={onBack}>
        <img src="/assets/icons/back-arrow.svg" alt="" width={15} height={15} />
      </button>
      <span>{title}</span>
    </div>
  );
}
