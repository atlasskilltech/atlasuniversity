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
 *                            (the 1.2 has to be restated at the breakpoint —
 *                             the project's type scale pins every size to 1.5)
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
 * The open state is the other place the references disagree. Every Programs
 * page's own Webflow sheet declares `.accordion-title { color: rgba(43,43,43,.8) }`,
 * so there the question text stays grey when its panel opens and only the
 * button — whose text is entirely inside that span — turns `#052c65`, making
 * the open state invisible. The homepage sheet has no such rule, so the title
 * really does turn blue. Measured on all three. The homepage behaviour is what
 * every page here renders, by the same rule that governs the skin.
 *
 * /about-us renders this same component with its own seven questions. It ships
 * the same Bootstrap markup but without the homepage include's `<style>` block,
 * so the raw reference falls through to Bootstrap's stock look — a heavier
 * question, a chevron icon and a blue-on-lilac open state. That is not
 * reproduced: one FAQ design is the source of truth for every page, and only
 * `data` may differ. There is no `variant` prop by design.
 */
/**
 * An answer is an array of blocks. A plain string is a paragraph — which is
 * every answer on every page built before /programs/ug/ug-design-and-innovation.
 * That page's answers come out of the FAQ database rather than a hand-authored
 * include, and they carry the CMS's own richer tree:
 *
 *   'text'                      ->  <p>text</p>
 *   {strong}                    ->  <p><strong>…</strong></p>
 *   {list: 'ul'|'ol', items[]}  ->  <ul|ol><li><p>…</p></li>…</ul|ol>
 *
 * Measured on the live reference with an item open (1440 / 768 / 390):
 *   .accordion-body p       margin-bottom 10
 *   .accordion-body ul/ol   padding-left 40, margin-bottom 10,
 *                           list-style disc / decimal, outside
 *   .accordion-body li      display list-item, no margin or padding of its own
 *   .accordion-body li > p  margin-bottom 10
 *
 * Tailwind's Preflight zeroes list margins, padding and markers and zeroes `p`
 * margins, so every one of those has to be restated. The last item's bottom
 * margin collapses out through the list's open bottom edge and merges with the
 * list's own 10 — which is why the reference's 7-item list measures 228 and not
 * 238, and it falls out of the same markup rather than needing a `last:` rule.
 *
 * Every text node in this page's answers is authored inside a `<strong>`. The
 * body is 400, so Preflight's relative `bolder` would land on 700 anyway, but
 * the weight is stated explicitly — a `<strong>` in a 600 or 700 parent
 * resolves to 900, which has bitten this project before.
 */
function Answer({ blocks }) {
  return blocks.map((block, i) => {
    if (typeof block === 'string') {
      /* ref .accordion-body > p */
      return <p key={`${i}-p`} className="mb-2.5">{block}</p>;
    }

    if (block.list) {
      const List = block.list === 'ol' ? 'ol' : 'ul';
      return (
        /* ref .accordion-body ul / ol */
        <List
          key={`${i}-${block.list}`}
          className={cx(
            'mb-2.5 list-outside pl-10',
            block.list === 'ol' ? 'list-decimal' : 'list-disc',
          )}
        >
          {block.items.map((item, j) => (
            /* ref li > p */
            <li key={`${j}-li`}>
              <p className="mb-2.5">
                {typeof item === 'string' ? item : <strong className="font-bold">{item.strong}</strong>}
              </p>
            </li>
          ))}
        </List>
      );
    }

    /* ref .accordion-body > p > strong */
    return (
      <p key={`${i}-strong`} className="mb-2.5">
        <strong className="font-bold">{block.strong}</strong>
      </p>
    );
  });
}

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
              <div key={`${i}-${item.q}`} className="border-b border-[#dee2e6] bg-white">
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
                      'flex h-20 w-full items-center gap-0 bg-transparent p-0 text-left text-2xl font-normal leading-[1.2] transition-colors hover:text-[#2b2b2bcc] max-md:text-base max-md:font-semibold max-md:leading-[1.2]',
                      isOpen ? 'text-[#052c65]' : 'text-[#2b2b2bcc]',
                    )}
                  >
                    {/* ref span.accordion-title */}
                    <span className="line-clamp-2 overflow-hidden text-ellipsis">{item.q}</span>
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
                      <Answer blocks={item.a} />
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
