/**
 * ATLAS News admin — shared class strings and tiny presentational pieces (server- and client-safe).
 * The admin keeps its own quiet look (grey ground, white cards); it never uses the public News theme.
 */
export const cx = (...a) => a.filter(Boolean).join(' ');

export const CARD = 'rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:p-6';
export const H1 = 'text-[22px] font-semibold leading-[1.3] sm:text-[26px]';
export const MUTED = 'text-[14px] leading-[1.5] text-[#5b6170]';
export const LABEL = 'mb-1.5 block text-[13px] font-semibold text-[#2b2f38]';
export const HINT = 'mt-1 text-[12.5px] leading-[1.45] text-[#6b7180]';
export const ERR = 'mt-1 text-[12.5px] font-medium leading-[1.45] text-[#b42318]';
export const INPUT =
  'block w-full rounded-lg border border-[#d6d9e0] bg-white px-3 py-2 text-[14px] text-[#14161a] outline-none transition placeholder:text-[#9aa0ac] focus:border-[#3b5bdb] focus:ring-2 focus:ring-[#3b5bdb]/20 disabled:bg-[#f4f5f7]';
export const INPUT_ERR = 'border-[#e5484d] focus:border-[#e5484d] focus:ring-[#e5484d]/20';

const BTN = 'inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3.5 text-[14px] font-medium transition disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b5bdb]/40';
export const BTN_PRIMARY = cx(BTN, 'bg-[#14161a] text-white hover:bg-[#2b2f38]');
export const BTN_SECONDARY = cx(BTN, 'border border-[#d6d9e0] bg-white text-[#14161a] hover:bg-[#f4f5f7]');
export const BTN_DANGER = cx(BTN, 'border border-[#f1c0bc] bg-white text-[#b42318] hover:bg-[#fdecea]');
export const BTN_GHOST = cx(BTN, 'text-[#2b2f38] hover:bg-[#eef0f3]');

const STATE = {
  live: ['Live', 'bg-[#e7f6ec] text-[#11733b]'],
  scheduled: ['Scheduled', 'bg-[#eef2ff] text-[#3b4fc4]'],
  draft: ['Draft', 'bg-[#f1f2f4] text-[#4a4f5c]'],
  trash: ['In Trash', 'bg-[#fdecea] text-[#b42318]'],
};

export function StateBadge({ state }) {
  const [label, tone] = STATE[state] || [state, 'bg-[#f1f2f4] text-[#4a4f5c]'];
  return <span className={cx('inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-semibold', tone)}>{label}</span>;
}

export function PageHeader({ title, description, children }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className={H1}>{title}</h1>
        {description ? <p className={cx(MUTED, 'mt-1')}>{description}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}

/** "9 Nov 2026, 3:30 pm" in Indian Standard Time — the newsroom's clock, on the server and the client. */
export function formatDateTime(iso) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(iso)) + ' IST';
}
