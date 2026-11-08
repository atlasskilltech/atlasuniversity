'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cx, FOCUS } from './ui';

/** True when `pathname` is the category page (any page of it). */
const isActive = (pathname, url) => pathname === url || pathname?.startsWith(`${url}/`);

/** Desktop section navigation. `usePathname` only, so the routes stay static. */
export default function NavLinks({ items }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1 xl:gap-2">
      <li>
        <Link
          href="/news"
          aria-current={pathname === '/news' ? 'page' : undefined}
          className={cx(
            'relative inline-flex h-12 items-center px-3 font-sans text-[13.5px] font-semibold tracking-[0.01em] transition-colors',
            'after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-news-accent after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100',
            'text-news-ink/75 hover:text-news-ink aria-[current=page]:text-news-ink',
            FOCUS,
          )}
        >
          Home
        </Link>
      </li>
      {items.map((c) => (
        <li key={c.slug}>
          <Link
            href={c.url}
            aria-current={isActive(pathname, c.url) ? 'page' : undefined}
            className={cx(
              'relative inline-flex h-12 items-center px-3 font-sans text-[13.5px] font-semibold tracking-[0.01em] transition-colors',
              'after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-news-accent after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100',
              'text-news-ink/75 hover:text-news-ink aria-[current=page]:text-news-ink',
              FOCUS,
            )}
          >
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
