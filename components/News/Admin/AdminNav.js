'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cx } from './ui';

const ITEMS = [
  { href: '/news/admin', label: 'Dashboard', exact: true },
  { href: '/news/admin/articles', label: 'Articles' },
  { href: '/news/admin/categories', label: 'Categories' },
  { href: '/news/admin/homepage', label: 'Homepage' },
  { href: '/news/admin/media', label: 'Media' },
  { href: '/news/admin/system', label: 'System' },
];

export default function AdminNav() {
  const path = usePathname() || '';
  return (
    <nav aria-label="Admin" className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none]">
      {ITEMS.map((it) => {
        const active = it.exact ? path === it.href : path === it.href || path.startsWith(`${it.href}/`);
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? 'page' : undefined}
            className={cx(
              'whitespace-nowrap border-b-2 px-3 py-2.5 text-[14px] font-medium transition',
              active ? 'border-[#14161a] text-[#14161a]' : 'border-transparent text-[#5b6170] hover:text-[#14161a]',
            )}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
