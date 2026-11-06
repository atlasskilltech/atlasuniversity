'use client';

/**
 * The disclosure accordion - ref `#accordionFlushExample` in reference/mandatory_disclosures/index.php.
 *
 * The reference is Bootstrap 5.3's accordion (CDN) under the page's own <style>; this restates the
 * computed result in Tailwind instead of loading Bootstrap (measured on production at 1440 and 390):
 *  - item: 1px #dee2e6 border on all four sides (the `.accordion-flush` side-border reset only reaches
 *    direct children, and the items sit one level deeper), square corners, white, 26px apart, the last
 *    flush;
 *  - button: 20px/30 700 #3a2e7d, padding 16/20; 18px/27 and padding 10/8 at <=992px (the page's
 *    `@media screen and (max-width: 992px)`, inclusive - hence the arbitrary variant, not `max-lg`);
 *    open and on hover the 14% indigo tint with #000 text, and open adds Bootstrap's inset 1px
 *    #dee2e6 rule under it;
 *  - the 40px icon disc (18% indigo) holding Font Awesome's regular "file" glyph at 18px;
 *  - the plus / cross marker: the reference's own 20px SVGs, the cross turned 180deg as Bootstrap's
 *    `.accordion-button:not(.collapsed)::after` does, over 0.2s;
 *  - body: padding 16/20 at every width.
 *
 * One section open at a time and all closed on load, as `data-bs-parent` makes it. The panel animates
 * its height like Bootstrap's `.collapsing` (0.35s ease); a closed panel is `inert`, so its links are
 * neither focusable nor read out while it is shut.
 */
import { useId, useState } from 'react';
import DisclosureEntry, { LIST } from './DisclosureEntry';


/* Font Awesome Free 7.0.1, regular "file" - https://fontawesome.com/license/free (icons CC BY 4.0).
   The reference loads the whole icon font for this one glyph; it is inlined instead. */
function FileIcon() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className="h-[18px] w-[13.5px]">
      <path
        fill="currentColor"
        d="M176 48L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-240-88 0c-39.8 0-72-32.2-72-72l0-88zM316.1 160L224 67.9 224 136c0 13.3 10.7 24 24 24l68.1 0zM0 64C0 28.7 28.7 0 64 0L197.5 0c17 0 33.3 6.7 45.3 18.7L365.3 141.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"
      />
    </svg>
  );
}

function Section({ section, open, onToggle, id }) {
  return (
    <div className="mb-[26px] border border-solid border-[#dee2e6] bg-white last:mb-0">
      <h2 className="m-0">
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className={`flex w-full items-center border-0 px-5 py-4 text-left text-[20px] font-bold leading-[30px] transition-[color,background-color,box-shadow] duration-150 ease-in-out hover:bg-[rgba(52,43,124,0.14)] hover:text-black focus:outline-none [@media(max-width:992px)]:px-2 [@media(max-width:992px)]:py-2.5 [@media(max-width:992px)]:text-[18px] [@media(max-width:992px)]:leading-[27px] ${
            open
              ? 'bg-[rgba(52,43,124,0.14)] text-black shadow-[inset_0_-1px_0_#dee2e6]'
              : 'bg-white text-[#3a2e7d]'
          }`}
        >
          <span className="mr-2.5 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[rgba(58,46,125,0.18)] text-[#3a2e7d]">
            <FileIcon />
          </span>
          {section.title}
          <span
            aria-hidden="true"
            className={`ml-auto h-5 w-5 flex-none bg-[length:20px] bg-no-repeat transition-transform duration-200 ease-in-out ${
              open
                ? '-rotate-180 bg-[url(/assets/mandatory-disclosures/cross-circle.svg)]'
                : 'bg-[url(/assets/mandatory-disclosures/plus-circle.svg)]'
            }`}
          />
        </button>
      </h2>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-[350ms] ease-in-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 py-4">
            <ul className={LIST}>
              {section.entries.map((entry, i) => (
                <DisclosureEntry key={i} entry={entry} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DisclosureAccordion({ sections }) {
  const [openIndex, setOpenIndex] = useState(null);
  const base = useId();

  return (
    <div className={`mx-auto mt-[56px] max-w-[1000px] pt-[199px] text-base leading-6 text-[#212529] [@media(max-width:992px)]:mt-10 [@media(max-width:992px)]:pt-20`}>
      {/* ref .container-fluid (12px) > .col-12.px-0.px-lg-3 (16px from 992px) */}
      <div className="px-3">
        <div className="px-0 lg:px-4">
          {sections.map((section, i) => (
            <Section
              key={section.title}
              id={`${base}-${i}`}
              section={section}
              open={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
