'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CloseIcon, MenuIcon } from './Icons';
import ThemeToggle from './ThemeToggle';
import { cx, FOCUS, KICKER } from './ui';

/**
 * Mobile / tablet section menu (below 992px). A full-height panel under the sticky bar: Escape or any
 * link closes it, focus moves into it on open and back to the toggle on close, and the page behind it
 * does not scroll while it is open.
 */
export default function MobileMenu({ items, universityUrl }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const link = (href, label, active) => (
    <Link
      key={href}
      href={href}
      onClick={close}
      aria-current={active ? 'page' : undefined}
      className={cx(
        'flex items-center justify-between border-b border-news-line py-4 font-news-serif text-[26px] leading-tight text-news-ink transition-colors aria-[current=page]:text-news-accent',
        FOCUS,
      )}
    >
      {label}
      <span aria-hidden="true" className="font-sans text-[18px] text-news-muted">→</span>
    </Link>
  );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="news-mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className={cx('grid h-10 w-10 place-items-center rounded-full text-news-ink transition-colors hover:bg-news-ink/5', FOCUS)}
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      <div
        id="news-mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[64px] z-40 overflow-y-auto bg-news-paper"
      >
        <nav aria-label="Sections" className="mx-auto w-full max-w-[720px] px-5 pb-12 pt-4 md:px-8">
          <p className={cx(KICKER, 'mb-2 text-news-muted')}>Sections</p>
          {link('/news', 'Home', pathname === '/news')}
          {items.map((c) => link(c.url, c.name, pathname === c.url || pathname?.startsWith(`${c.url}/`)))}
          <div className="mt-8 flex items-center justify-between gap-4">
            <span className={cx(KICKER, 'text-news-muted')}>Theme</span>
            <ThemeToggle />
          </div>
          <a
            href={universityUrl}
            className={cx('mt-8 inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-news-ink underline decoration-news-line underline-offset-4', FOCUS)}
          >
            ATLAS SkillTech University website
          </a>
        </nav>
      </div>
    </>
  );
}
