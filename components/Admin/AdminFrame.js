'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/News/Admin/LogoutButton';
import { cx } from '@/components/News/Admin/ui';

/*
 * The ATLAS admin's frame, cPanel-style: a fixed left sidebar with every tool grouped and iconed, a slim
 * top bar (where you are, who is signed in, View site, Sign out) and full-width content with tight
 * spacing. Below 992px the sidebar becomes a drawer behind a menu button. Colours are the admin's own
 * (white / #f4f5f7 / #14161a / #5b6170 / #e3e5ea). The tools themselves are unchanged.
 */

export const GROUPS = ['Website content', 'Events', 'Site tools', 'Administration'];

const PATHS = {
  home: 'M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9',
  news: 'M5 4h11a2 2 0 0 1 2 2v13a1 1 0 0 0 2 0V8M5 4v15a2 2 0 0 0 2 2h12M8 8h6M8 12h6M8 16h4',
  keydates: 'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM8 12h2M14 12h2M8 16h2',
  hackathon: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3',
  s3drive: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM12 11v5M9.5 13.5 12 11l2.5 2.5',
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14',
  users: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 19v-1a4 4 0 0 0-3-3.9M15.5 4.1a3 3 0 0 1 0 5.8',
  activity: 'M3 12h4l3-8 4 16 3-8h4',
};

export function ToolIcon({ name, className = 'h-[18px] w-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" className={cx('flex-none', className)} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name] || PATHS.home} />
    </svg>
  );
}

function Sidebar({ tools, active, onNavigate }) {
  const groups = GROUPS.map((g) => ({ g, items: tools.filter((t) => t.group === g) })).filter((x) => x.items.length);
  const item = (key, href, label) => (
    <Link
      key={key}
      href={href}
      onClick={onNavigate}
      aria-current={active === key ? 'page' : undefined}
      className={cx(
        'flex items-center gap-2.5 rounded-md border-l-[3px] px-2.5 py-[7px] text-[13.5px] transition',
        active === key ? 'border-[#14161a] bg-[#f4f5f7] font-semibold text-[#14161a]' : 'border-transparent text-[#3d424d] hover:bg-[#f4f5f7] hover:text-[#14161a]',
      )}
    >
      <ToolIcon name={key} />
      <span className="truncate">{label}</span>
    </Link>
  );
  return (
    <nav aria-label="Admin tools" className="flex flex-col gap-3 px-2 py-3">
      <div>{item('home', '/admin', 'Home')}</div>
      {groups.map(({ g, items }) => (
        <div key={g}>
          <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a8f9b]">{g}</p>
          <div className="flex flex-col gap-0.5">{items.map((t) => item(t.key, t.href, t.label))}</div>
        </div>
      ))}
    </nav>
  );
}

export default function AdminFrame({ tools, active, user, viewHref = '/', title, subnav, children }) {
  /* the drawer is open only on the page it was opened on, so any navigation closes it */
  const path = usePathname();
  const [openAt, setOpenAt] = useState(null);
  const open = openAt !== null && openAt === path;
  const setOpen = (v) => setOpenAt(v ? path : null);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpenAt(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const current = active === 'home' || !active ? 'Home' : tools.find((t) => t.key === active)?.label || title || '';

  return (
    <div className="min-h-dvh lg:flex">
      {/* sidebar — fixed column on desktop, drawer below 992px */}
      <aside
        className={cx(
          'fixed inset-y-0 left-0 z-40 flex w-[232px] flex-col border-r border-[#e3e5ea] bg-white transition-transform',
          'lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0',
          open ? 'translate-x-0 shadow-[0_10px_40px_rgba(16,24,40,0.18)]' : '-translate-x-full',
        )}
      >
        <div className="flex h-12 flex-none items-center justify-between border-b border-[#e3e5ea] px-4">
          <Link href="/admin" className="text-[15px] font-semibold">
            ATLAS <span className="font-normal text-[#5b6170]">· Admin</span>
          </Link>
          <button type="button" className="rounded p-1 text-[#5b6170] hover:bg-[#f4f5f7] lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Sidebar tools={tools} active={active || 'home'} onNavigate={() => setOpen(false)} />
        </div>
        {user ? (
          <div className="flex-none border-t border-[#e3e5ea] px-4 py-3">
            <p className="truncate text-[12.5px] font-medium text-[#14161a]" title={user.email}>{user.name || user.email}</p>
            <p className="truncate text-[12px] text-[#6b7180]">{user.role === 'admin' ? 'Admin' : 'User'}{user.name ? ` · ${user.email}` : ''}</p>
          </div>
        ) : null}
      </aside>
      {open ? <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" /> : null}

      {/* content column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-[#e3e5ea] bg-white/95 backdrop-blur">
          <div className="flex h-12 items-center gap-2 px-3 sm:px-5">
            <button type="button" className="rounded-md p-1.5 text-[#3d424d] hover:bg-[#f4f5f7] lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <p className="min-w-0 flex-1 truncate text-[13.5px] text-[#5b6170]">
              <Link href="/admin" className="hover:text-[#14161a]">Admin</Link>
              {current && current !== 'Home' ? <> <span className="px-1">/</span><span className="font-semibold text-[#14161a]">{current}</span></> : null}
            </p>
            {user ? <span className="hidden max-w-[300px] truncate text-[12.5px] text-[#5b6170] xl:inline" title={user.email}>{user.email} · {user.role === 'admin' ? 'Admin' : 'User'}</span> : null}
            <a href={viewHref} target="_blank" rel="noopener noreferrer" className="hidden h-8 items-center rounded-md px-2.5 text-[13.5px] font-medium text-[#5b6170] hover:bg-[#f4f5f7] hover:text-[#14161a] sm:inline-flex">
              View site ↗
            </a>
            <LogoutButton />
          </div>
          {subnav ? <div className="px-3 sm:px-5">{subnav}</div> : null}
        </header>
        <main className="min-w-0 flex-1 px-3 py-4 sm:px-5 sm:py-5">{children}</main>
      </div>
    </div>
  );
}
