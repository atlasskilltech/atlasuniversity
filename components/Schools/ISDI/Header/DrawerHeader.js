import * as s from './styles';

/**
 * ref .drawer-header — the sticky title bar footer.php's `addDrawerHeader()`
 * injects at the top of each mobile drawer: a back arrow, then the title of the
 * row that opened it.
 *
 * Not `components/Header/DrawerHeader`: that one spaces the arrow and title
 * with a 10px gap *and* a 10px margin, which is right for the ATLAS header and
 * 10px too wide for this one (the title measures at x=41 here).
 */
export default function DrawerHeader({ title, onBack }) {
  return (
    <div data-drawer-header className={s.DRAWER_HEADER}>
      <button
        type="button"
        aria-label="Back"
        className={s.DRAWER_BACK}
        onClick={(e) => {
          e.stopPropagation();
          onBack();
        }}
      >
        <img src="/assets/icons/back-arrow.svg" alt="" width={15} height={15} />
      </button>
      <span>{title.replace(/\s*\n\s*/g, ' ')}</span>
    </div>
  );
}
