'use client';

import { useState } from 'react';

/*
 * "Courses at Singapore Management University" — the five `.course-accordion` cards of
 * reference/schools/isme/singapore-management-university/index.php and the page's own script: one open
 * at a time (opening a card closes the others), the chevron turning 180deg.
 *
 * Measured on production (1440): the `isdi-pink` / `isdi-blue` colour classes the markup uses are not in
 * that page's Tailwind config, so they paint NOTHING — the heading accent stays gray-900, the icons take
 * the wrapper's #1a1a1a, the bullet dots are transparent and the hover border never changes. And
 * Bootstrap's `.border` (`!important`) makes every card a 1px #dee2e6 frame. Both reproduced. Spacing
 * classes collide with Bootstrap's the same way (`.lp-bs` on the page <main>).
 */
export default function SmuCourses({ areas }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {areas.map((c, i) => {
        const isOpen = open === i;
        return (
          <div key={c.name} className="w-full self-start overflow-hidden rounded-xl border border-solid border-[#dee2e6] transition md:w-[calc(50%-0.5rem)]">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center gap-4 border-0 bg-white px-4 py-4 text-left transition md:px-5"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] bg-blue-50 transition">
                <svg className="h-[22px] w-[22px] transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d={c.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex-1 text-[15px] font-medium leading-snug text-gray-900 md:text-[16px]">{c.name}</span>
              <svg
                className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300${isOpen ? ' rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div className="border-0 border-t border-solid border-gray-100 bg-gray-50">
                <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-2.5 px-5 py-4 n640:grid-cols-2 md:px-6">
                  {c.subs.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-[14px] text-gray-700 md:text-[15px]">
                      {/* `bg-isdi-pink` is undefined on that page: the dot paints nothing */}
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
