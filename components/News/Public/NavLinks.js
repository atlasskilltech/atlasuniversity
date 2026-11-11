'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from './Icons';
import { cx, FOCUS, KICKER } from './ui';

/** True when `pathname` is the category page (any page of it). */
const isActive = (pathname, url) => pathname === url || pathname?.startsWith(`${url}/`);
/** True when the page is this category or any category below it in the menu. */
const inBranch = (pathname, item) => isActive(pathname, item.url) || (item.children || []).some((c) => inBranch(pathname, c));

const TOP = cx(
  'relative inline-flex h-12 items-center px-3 font-sans text-[13.5px] font-semibold tracking-[0.01em] transition-colors',
  'after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-news-accent after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100',
  'text-news-ink/75 hover:text-news-ink aria-[current=page]:text-news-ink',
);

/** The nested lists inside a dropdown: level 2 as headings, level 3+ indented below them. */
function Branch({ items, depth, pathname, onNavigate }) {
  return (
    <ul className={cx(depth > 1 && 'mt-2 grid gap-1.5 border-l border-news-line pl-3')}>
      {items.map((c) => (
        <li key={c.slug} className={cx(depth === 1 && 'break-inside-avoid pb-4')}>
          <Link
            href={c.url}
            onClick={onNavigate}
            aria-current={isActive(pathname, c.url) ? 'page' : undefined}
            className={cx(
              'inline-block font-sans transition-colors aria-[current=page]:text-news-accent',
              depth === 1 ? 'text-[14px] font-semibold text-news-ink hover:text-news-accent' : 'text-[13px] leading-[1.45] text-news-muted hover:text-news-ink',
              FOCUS,
            )}
          >
            {c.name}
          </Link>
          {c.children?.length ? <Branch items={c.children} depth={depth + 1} pathname={pathname} onNavigate={onNavigate} /> : null}
        </li>
      ))}
    </ul>
  );
}

/** A top-level entry with a dropdown: opens on hover, or with its toggle button (keyboard, touch). */
function DropdownItem({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const panelId = useId();
  const deep = item.children.some((c) => c.children?.length);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        ref.current?.querySelector('button')?.focus();
      }
    };
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <div className="flex items-center">
        <Link href={item.url} aria-current={inBranch(pathname, item) ? 'page' : undefined} className={cx(TOP, 'pr-1.5', FOCUS)}>
          {item.name}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${item.name}: show sections`}
          onClick={() => setOpen((v) => !v)}
          className={cx('grid h-8 w-6 place-items-center rounded text-news-ink/60 transition-colors hover:text-news-ink', FOCUS)}
        >
          <ChevronDownIcon className={cx('h-3.5 w-3.5 transition-transform duration-200 motion-reduce:transition-none', open && 'rotate-180')} />
        </button>
      </div>
      <div
        id={panelId}
        hidden={!open}
        className={cx(
          'absolute left-1/2 top-full z-50 -translate-x-1/2 pt-px',
          deep ? 'w-[min(92vw,600px)]' : 'w-[260px]',
        )}
      >
        <div className="border border-news-line bg-news-paper p-6 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35)]">
          <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-news-line pb-3">
            <p className={cx(KICKER, 'text-news-muted')}>{item.name}</p>
            <Link href={item.url} onClick={() => setOpen(false)} className={cx('font-sans text-[12.5px] font-semibold text-news-accent hover:underline', FOCUS)}>
              All stories <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={cx(deep && 'columns-2 gap-10')}>
            <Branch items={item.children} depth={1} pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </li>
  );
}

/** Desktop section navigation. `usePathname` only, so the routes stay static. */
export default function NavLinks({ items }) {
  const pathname = usePathname();
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-1 xl:gap-x-2">
      <li>
        <Link href="/news" aria-current={pathname === '/news' ? 'page' : undefined} className={cx(TOP, FOCUS)}>
          Home
        </Link>
      </li>
      {items.map((c) =>
        c.children?.length ? (
          <DropdownItem key={c.slug} item={c} pathname={pathname} />
        ) : (
          <li key={c.slug}>
            <Link href={c.url} aria-current={isActive(pathname, c.url) ? 'page' : undefined} className={cx(TOP, FOCUS)}>
              {c.name}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}
