'use client';

/* eslint-disable @next/next/no-img-element -- plain <img>: the reference's own files, byte-for-byte, at their authored box metrics */

import { Fragment, useState } from 'react';

/* ref `.searchText .button-search-div .<tab>` / `.radio-search-div .<tab>` — whole literals for the
   Tailwind scanner */
const TONE = {
  catalog: 'bg-[#7B4DD3]',
  ebsco: 'bg-[orange]',
  mason: 'bg-[#D34D56]',
  google: 'bg-[#3A97B6]',
  shodhganga: 'bg-[#35A17C]',
};

/* ref `.custom-btn-categories` — a flex item from 601 up; from 600 down an inline-block in a centred
   block, which is why the source's inter-element whitespace is restored below */
const TAB =
  'cursor-pointer rounded px-3.5 py-2.5 text-center text-[14px] font-semibold uppercase text-white no-underline shadow-[0_3px_2px_#C3C0D8] ' +
  '[@media(max-width:600px)]:mb-1.5 [@media(max-width:600px)]:inline-block [@media(max-width:600px)]:rounded-md [@media(max-width:600px)]:px-6 [@media(max-width:600px)]:text-[12px]';

/* ref `.form-controlv2` (+ its ::placeholder, :focus and the <=600 rule) */
const INPUT =
  'inline-block w-full rounded-md border border-solid border-[#C3C0D8] bg-white px-5 py-2 text-[18px] font-semibold text-black shadow-[0_3px_2px_#C3C0D8] ' +
  'placeholder:text-[14px] placeholder:font-semibold placeholder:italic placeholder:text-[#C3C0D8] ' +
  'focus:border-[#3a2e7d] focus:shadow-[0_3px_2px_#3a2e7d] focus:outline-none focus:placeholder:text-[#3a2e7d] ' +
  '[@media(max-width:600px)]:px-2.5 [@media(max-width:600px)]:py-1 [@media(max-width:600px)]:placeholder:text-[12px]';

/* ref `.search-input-btn` — Bootstrap leaves the UA's buttonface (#f0f0f0) behind the glyph; the
   page's own :hover / :focus rules clear it */
const SUBMIT =
  'absolute right-3.5 top-1 border-0 bg-[#f0f0f0] p-0 hover:bg-transparent focus:bg-transparent ' +
  '[@media(max-width:600px)]:right-[7px] [@media(max-width:600px)]:top-[5px]';

/* ref Bootstrap `.form-check-input[type=radio]` + the page's `background-size: 20px` and
   `:focus { box-shadow: none }` */
const RADIO =
  'float-left -ml-6 mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border border-solid border-[#dee2e6] bg-white bg-[length:20px] bg-center bg-no-repeat align-top ' +
  'checked:border-[#0d6efd] checked:bg-[#0d6efd] checked:bg-[url(/assets/images/library/radio-checked.svg)] focus:border-[#86b7fe] focus:shadow-none focus:outline-none';

/**
 * /library — `.searchSection > .row > .col-12.searchText`: five coloured tabs over one live search
 * form at a time (Koha catalogue, EBSCO, Mason OER, Google Scholar, Shodhganga). Each form posts to
 * its own external service in a new tab, exactly as authored.
 *
 * The reference toggles the panels with jQuery `show("slow")` / `hide("slow")` (a 600ms size +
 * opacity tween) and opens on Catalog. The port renders the selected panel only and switches
 * instantly — same end state, no tween. The tabs are `<button>`s where the reference authors
 * `<a href="javascript:void(0)">`: they never navigate. Each Show* function also copies the catalog
 * input into `#searchsubmit` / `#searchsubmitDB`, elements the page does not contain, so that part
 * does nothing and is not ported.
 */
export default function LibrarySearch({ data }) {
  const [active, setActive] = useState(data.tabs[0].id);
  const tab = data.tabs.find((t) => t.id === active);

  return (
    <>
      {/* ref .button-search-div */}
      <div className="mx-auto flex max-w-[800px] justify-between gap-0 pb-[30px] [@media(max-width:600px)]:block [@media(max-width:600px)]:pb-[18px] [@media(max-width:600px)]:text-center">
        {data.tabs.map((t, i) => (
          <Fragment key={t.id}>
            {i > 0 && ' '}
            <button type="button" aria-pressed={t.id === active} onClick={() => setActive(t.id)} className={`${TAB} ${TONE[t.color]}`}>
              {t.label}
            </button>
          </Fragment>
        ))}
      </div>

      {/* ref #catalog / #ebsco / #mason / #google / #shodhganga */}
      <div id={tab.id} className="mx-auto max-w-[710px]">
        <form key={tab.id} action={tab.form.action} method={tab.form.method} target="_blank">
          {/* ref .input-search-div */}
          <div className="relative pb-[30px] [@media(max-width:600px)]:pb-[18px]">
            <input
              type="text"
              className={INPUT}
              id={tab.id === 'catalog' ? 'catalogsearchtext' : tab.id === 'ebsco' ? 'ebscosearchtext' : tab.id === 'mason' ? 'fullRecord' : undefined}
              name={tab.input.name}
              placeholder={tab.input.placeholder}
              aria-label={tab.input.ariaLabel || tab.label}
            />
            <button type="submit" className={SUBMIT} aria-label={`Search ${tab.label}`}>
              <img src={data.icon} alt="" className="h-[38px] max-w-full [@media(max-width:600px)]:h-7" />
            </button>
          </div>

          {/* ref .radio-search-div */}
          <div className="mx-auto flex max-w-[700px] items-center justify-center gap-3 [@media(max-width:600px)]:block [@media(max-width:600px)]:max-w-full [@media(max-width:600px)]:text-center">
            {tab.radios && (
              /* ref .radioBox.<tab> */
              <div className={`rounded-md border border-solid border-[#C3C0D8] px-4 py-1.5 [@media(max-width:600px)]:mb-2 ${TONE[tab.color]}`}>
                {tab.radios.map((label, i) => (
                  <Fragment key={label}>
                    {i > 0 && ' '}
                    {/* ref .form-check.form-check-inline */}
                    <div className="mb-0.5 mr-4 inline-block min-h-6 pl-6">
                      <input className={RADIO} type="radio" name="inlineRadioOptions" id={`inlineRadio${i + 1}`} value={`option${i + 1}`} />
                      <label className="mb-[5px] inline-block cursor-pointer font-semibold text-white [@media(max-width:600px)]:text-[12px]" htmlFor={`inlineRadio${i + 1}`}>
                        {label}
                      </label>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
            {/* ref .advanced-btn.<tab> */}
            <a
              href={tab.advanced}
              target="_blank"
              rel="noopener"
              className={`rounded-md border border-solid border-[#C3C0D8] px-4 py-1.5 font-semibold text-white no-underline [@media(max-width:600px)]:text-[12px] ${TONE[tab.color]}`}
            >
              Advanced Search
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
