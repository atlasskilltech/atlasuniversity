'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GROUPS, ToolIcon } from '@/components/Admin/AdminFrame';

/*
 * The /admin home's tool panel, cPanel-style: a "Find a tool" filter over compact tiles (grouped in the same order as the sidebar) —
 * icon, name and one line each — so every tool fits on one screen without scrolling.
 */
export default function HomeTools({ tools }) {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const shown = needle ? tools.filter((t) => `${t.label} ${t.title} ${t.description}`.toLowerCase().includes(needle)) : tools;
  const groups = GROUPS.map((g) => ({ g, items: shown.filter((t) => t.group === g) })).filter((x) => x.items.length);
  return (
    <div className="flex flex-col gap-3">
      <label className="relative block">
        <span className="sr-only">Find a tool</span>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8f9b]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a tool (e.g. news, dates, upload)"
          className="h-9 w-full rounded-md border border-[#d6d9e0] bg-white pl-9 pr-3 text-[14px] outline-none focus:border-[#14161a]"
        />
      </label>
      {!shown.length ? <p className="rounded-md bg-white px-4 py-3 text-[14px] text-[#5b6170] ring-1 ring-[#e3e5ea]">No tool matches “{q}”.</p> : null}
      {shown.length ? (
        <section className="overflow-hidden rounded-md bg-white ring-1 ring-[#e3e5ea]">
          <h2 className="border-b border-[#e3e5ea] bg-[#fafbfc] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.05em] text-[#5b6170]">Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {groups.flatMap(({ items }) => items).map((t) => (
              <Link key={t.key} href={t.href} className="group -mb-px -mr-px flex items-start gap-3 border-b border-r border-[#eef0f3] px-4 py-3 transition hover:bg-[#f4f5f7]">
                <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-md bg-[#f4f5f7] text-[#14161a] ring-1 ring-[#e3e5ea] group-hover:bg-white">
                  <ToolIcon name={t.key} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#8a8f9b]">{t.group}</span>
                  <span className="block text-[14.5px] font-semibold text-[#14161a] group-hover:underline">{t.title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-[1.45] text-[#5b6170]">{t.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
