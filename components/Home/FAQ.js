'use client';

import { useState } from 'react';
import { faq } from '@/lib/homeContent';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Questions? We can read your mind" — port of
 * reference/assets/include/faq/atlas/home.php (included at index.php:3553).
 *
 *   section#faq.section > .container >
 *     h2.h2-tag.mrg16
 *     .accordion.accordion-flush > 12x .accordion-item >
 *       h2.accordion-header > button.accordion-button > span.accordion-title
 *       .accordion-collapse > .accordion-body > <p>
 *
 * A real Bootstrap 5.3.8 accordion (the CDN bundle is loaded in header.php),
 * restyled by the include's own <style> block.
 *
 * ── Behaviour, verified against the reference ─────────────────────────────
 *   - every item is closed on load (no `.show`, all buttons `.collapsed`)
 *   - `data-bs-parent` is set, so opening one closes the other — measured:
 *     clicking a second question leaves exactly one panel open
 *   - the arrow rotates 180deg when open (measured matrix(-1,0,0,-1))
 *   - Bootstrap animates the panel height over .35s ease
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .accordion-item          border-bottom 1px #dee2e6, background #fff
 *   .accordion-button        h80, 24px/1.2, 400          16px/1.2, 600
 *     colour                 rgba(43,43,43,.8) closed,   same
 *                            #052c65 open,
 *                            rgba(43,43,43,.8) on hover  same
 *   .accordion-title         2-line clamp with ellipsis  same
 *   ::after                  20px arrow, .2s rotate      16px arrow
 *   .accordion-body          padding 0 24 24 0, 16px/1.5 14px/1.5
 *   .accordion-body p        margin-bottom 10            same
 *
 * The include also sets `margin-right: 50px` on the button, which does nothing:
 * Bootstrap gives the button `width: 100%`, so the declaration is dropped as
 * over-constrained. Measured, the arrow lands on the container's right edge,
 * and it is reproduced that way here.
 *
 * The panel height is animated with a `grid-template-rows` 0fr->1fr transition
 * rather than a measured pixel height — same 350ms ease, no JS measurement, and
 * it stays correct when the answer reflows at a different width.
 *
 * ── Site-wide, and deliberately not skinnable ─────────────────────────────
 * /about-us renders this same component with its own seven questions. It ships
 * the same Bootstrap markup but without the homepage include's `<style>` block,
 * so the raw reference falls through to Bootstrap's stock look — a heavier
 * question, a chevron icon and a blue-on-lilac open state. That is not
 * reproduced: one FAQ design is the source of truth for every page, and only
 * `data` may differ. There is no `variant` prop by design.
 */
/**
 * `data` is the ONLY thing a page may vary — /about-us ships a seven-question
 * set through it. Every visual and interaction state (typography, borders,
 * colours, the icon, hover, focus, open) is owned here so the accordion looks
 * and behaves identically on every page that uses it.
 */
export default function FAQ({ data = faq }) {
  const [open, setOpen] = useState(-1);
  const { heading, arrow, items } = data;

  return (
    /* ref section#faq.section */
    <section id="faq" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{heading}</h2>

        {/* ref .accordion.accordion-flush */}
        <div>
          {items.map((item, i) => {
            const isOpen = i === open;
            return (
              /* ref .accordion-item */
              <div key={item.q} className="border-b border-[#dee2e6] bg-white">
                {/* ref h2.accordion-header */}
                <h3 className="m-0">
                  {/* ref button.accordion-button */}
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className={cx(
                      'flex h-20 w-full items-center gap-0 bg-transparent p-0 text-left text-2xl font-normal leading-[1.2] transition-colors hover:text-[#2b2b2bcc] max-md:text-base max-md:font-semibold',
                      isOpen ? 'text-[#052c65]' : 'text-[#2b2b2bcc]',
                    )}
                  >
                    {/* ref span.accordion-title */}
                    <span className="line-clamp-2 overflow-hidden">{item.q}</span>
                    {/* ref .accordion-button::after */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={arrow}
                      alt=""
                      aria-hidden="true"
                      className={cx(
                        'ml-auto h-5 w-5 shrink-0 object-contain transition-transform duration-200 ease-in-out max-md:h-4 max-md:w-4',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>
                </h3>

                {/* ref .accordion-collapse */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={cx(
                    'grid transition-[grid-template-rows] duration-[350ms] ease-in-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    {/* ref .accordion-body */}
                    <div className="pb-6 pr-6 text-base leading-[1.5] text-[#212529] max-md:text-sm">
                      {item.a.map((paragraph) => (
                        <p key={paragraph} className="mb-2.5 last:mb-2.5">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
