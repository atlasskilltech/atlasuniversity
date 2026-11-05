/* eslint-disable @next/next/no-img-element -- plain <img>: the reference's own files, byte-for-byte, at their authored box metrics */
import withBreaks from '@/lib/withBreaks';

/*
 * /library — the static sections of reference/library.php. The page is not Webflow markup: it is a
 * hand-written Bootstrap 5.3.3 grid styled by the page's own <style>, so every class string below
 * restates one Bootstrap utility or one rule of that <style>, measured on production at
 * 1440 / 992 / 991 / 768 / 601 / 600 / 390. The breakpoints are Bootstrap's `lg` (992 up, this
 * project's `lg`), `xxl` (1400 up) and the page's own `@media only screen and (max-width: 600px)`,
 * written as arbitrary media variants.
 *
 * Bootstrap pieces restated:
 *   .row          display:flex; flex-wrap:wrap — every one here also carries `m-0`
 *   .row > *      flex-shrink:0; width:100%; max-width:100%; padding-x 12 (cancelled by `p-0` or by
 *                 the page's own padding rule wherever one exists)
 *   .col-lg-N     flex:0 0 auto; width:N/12 from 992 · .col-xxl-4 width:33.33% from 1400
 *   h1-h4         line-height:1.2; font-weight:500 — the page's <style> sets size, weight, margin
 *   ul            padding-left:2rem; margin-bottom:1rem
 */

/* whole literal strings — the Tailwind scanner reads source text */
const SECTION = 'mb-[60px] p-0 [@media(max-width:600px)]:mb-[30px]';
const ROW = 'm-0 flex w-full flex-wrap';
const COL = 'w-full max-w-full shrink-0';
/* ref `.libraryText h2, …, .eContentText h2` — 70px bold, 28px from 600 down */
const H2 = 'm-0 text-[70px] font-bold leading-[1.2] [@media(max-width:600px)]:text-[28px]';
/* ref `.rulesRegulationsText .para` / `.eContentText .para` */
const PARA =
  'mb-5 mt-1.5 text-[22px] leading-[28px] text-black [@media(max-width:600px)]:text-[12px] [@media(max-width:600px)]:leading-[normal]';
/* ref the page's hand cursor (an inline SVG data URL in the reference, the same SVG as a file here) */
const CURSOR = 'cursor-[url(/assets/images/library/cursor-hand.svg)_14_14,auto]';
/* ref `img.img-fluid.w-100.d-none.d-lg-block` / `.d-block.d-lg-none` */
const IMG_DESKTOP = 'hidden h-auto w-full max-w-full lg:block';
const IMG_MOBILE = 'block h-auto w-full max-w-full lg:hidden';

function Banner({ desktop, mobile }) {
  return (
    <>
      <img src={desktop} className={IMG_DESKTOP} alt="..." />
      <img src={mobile} className={IMG_MOBILE} alt="..." />
    </>
  );
}

/* A rule body or a list item: a string is text, `{ strong }` is bold. `<strong>` is `bolder` in
   both Bootstrap and Preflight, which resolves to 700 over this 400 parent — stated outright. */
function Runs({ runs }) {
  return runs.map((run, i) => (typeof run === 'string' ? run : <strong key={i} className="font-bold">{run.strong}</strong>));
}

/* ref section.heroBannerSection — the photograph sets the height; the copy is an absolute
   `.col-12` that `align-self: end` pins to the row's bottom edge */
export function LibraryHero({ data }) {
  return (
    <section className="p-0">
      <div className={`relative ${ROW}`}>
        <div className={`${COL} p-0`}>
          <Banner desktop={data.desktop} mobile={data.mobile} />
        </div>
        <div className={`absolute ${COL} self-end px-[60px] pb-[60px] pt-0 [@media(max-width:600px)]:p-5`}>
          <h1 className="m-0 text-[90px] font-bold leading-[1.2] text-white [@media(max-width:600px)]:text-[40px]">{data.title}</h1>
          <p className="m-0 text-[40px] font-extralight text-white [@media(max-width:600px)]:text-[14px]">{data.sub}</p>
        </div>
      </div>
    </section>
  );
}

/* ref section.searchSection — `background-size: cover; background-position: top`, `contain` from
   600 down (where the image repeats, as `background-repeat` is left at its default) */
export function SearchShell({ data, children }) {
  return (
    <section className={`${SECTION} bg-cover bg-top [@media(max-width:600px)]:bg-contain`} style={{ backgroundImage: `url(${data.background})` }}>
      <div className={ROW}>
        {/* ref .col-12.searchText */}
        <div className={`${COL} mx-auto max-w-[1920px] px-0 py-20 [@media(max-width:600px)]:max-w-full [@media(max-width:600px)]:px-3 [@media(max-width:600px)]:py-[50px]`}>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ref section.librarySection — the copy sits at the top of the photograph below 992 and is
   vertically centred over it from 992 up */
export function LibraryAbout({ data }) {
  return (
    <section className={SECTION}>
      <div className={`relative ${ROW}`}>
        <div className={`${COL} p-0`}>
          <Banner desktop={data.desktop} mobile={data.mobile} />
        </div>
        <div className={`absolute ${COL} self-start px-[60px] lg:self-center [@media(max-width:600px)]:p-5`}>
          <div className={ROW}>
            <div className={`${COL} p-0 lg:w-5/12`}>
              <h2 className={`${H2} text-black`}>{data.heading}</h2>
              <p className="m-0 text-[20px] leading-[28px] text-black [@media(max-width:600px)]:text-[12px] [@media(max-width:600px)]:leading-[normal]">{data.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ref section#service — a dark photograph band behind the heading (`.position-absolute.z-n1`) and a
   4-up grid of square cards. On hover the title drops out of view and the description slides up
   over the photograph (`bottom: -600px` -> 0 over 0.5s). */
export function LibraryServices({ data }) {
  return (
    <section id="service" className={SECTION}>
      <div className={`relative ${ROW}`}>
        <div className={`absolute z-[-1] ${COL} p-0`}>
          <Banner desktop={data.desktop} mobile={data.mobile} />
        </div>
        <div className={`${COL} self-center px-[60px] pb-0 pt-[60px] [@media(max-width:600px)]:px-5 [@media(max-width:600px)]:pt-5`}>
          <div className={ROW}>
            <div className={`${COL} p-0`}>
              <h2 className={`${H2} text-white`}>{data.heading}</h2>
            </div>
            <div className={`${COL} grid grid-cols-[repeat(4,1fr)] gap-2.5 p-0 [@media(max-width:600px)]:grid-cols-[repeat(1,1fr)]`}>
              {data.items.map((item) => (
                <div key={item.title}>
                  <div className={`group relative overflow-hidden text-white shadow-[0_0_5px_0_#000] ${CURSOR}`}>
                    <img src={item.image} className="h-auto w-full max-w-full" alt="..." />
                    <h3 className="absolute bottom-0 m-0 w-full bg-[#0000006e] py-[15px] text-center text-[16px] font-medium leading-[1.2] group-hover:bottom-[-300px] [@media(max-width:600px)]:px-[15px] [@media(max-width:600px)]:text-[12px]">
                      {item.title}
                    </h3>
                    <p className="absolute bottom-[-600px] m-0 flex h-full w-full items-center bg-[#0000006e] px-[15px] py-[30px] text-[14px] transition-[bottom] duration-500 ease-[ease-in-out] group-hover:bottom-0">
                      {withBreaks(item.text)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const RES_BG = { 1: 'bg-[#F9EBC4]', 2: 'bg-[#F7D6C5]', 3: 'bg-[#BCD9D7]' };

/* ref section#resources — a photograph with a translucent caption bar, then three photo + text
   pairs in a 3-up row from 992 (one column below). The text box is `py-3 p-lg-4`, both
   `!important` in Bootstrap, so the page's own `padding: 0 20px` (<=600) only reaches the sides. */
export function LibraryResources({ data }) {
  return (
    <section id="resources" className={SECTION}>
      <div className={`relative ${ROW}`}>
        <div className={`${COL} p-0`}>
          <Banner desktop={data.desktop} mobile={data.mobile} />
        </div>
        <div className={`absolute ${COL} self-end bg-[#00000085] px-[60px] py-[30px] [@media(max-width:600px)]:p-5`}>
          <h2 className={`${H2} text-white`}>{data.heading}</h2>
          <p className="m-0 text-[20px] leading-[28px] text-white [@media(max-width:600px)]:text-[12px] [@media(max-width:600px)]:leading-[normal]">{data.text}</p>
        </div>
      </div>
      <div className={`relative ${ROW} pt-[60px] [@media(max-width:600px)]:pt-5`}>
        {data.boxes.map((box) => [
          <div key={`${box.bg}-img`} className={`${COL} p-0 lg:w-1/3`}>
            <img src={box.image} className="h-auto w-full max-w-full" alt="..." />
          </div>,
          <div key={`${box.bg}-txt`} className={`${COL} px-3 py-4 lg:w-1/3 lg:p-6 [@media(max-width:600px)]:px-5 ${RES_BG[box.bg]}`}>
            <h3 className="mb-5 mt-0 text-[32px] font-bold leading-[1.2] text-black [@media(max-width:600px)]:mb-2 [@media(max-width:600px)]:mt-5 [@media(max-width:600px)]:text-[26px]">
              {box.title}
            </h3>
            <p className="m-0 text-[16px] leading-[28px] text-black [@media(max-width:600px)]:mb-5 [@media(max-width:600px)]:text-[12px] [@media(max-width:600px)]:leading-[normal]">
              {box.text}
            </p>
          </div>,
        ])}
      </div>
    </section>
  );
}

/* ref section#eResources — a 4-up grid of logo tiles (2-up from 600 down), one of them two columns
   wide. Each tile is an inline `<a>` around an inline-block image, so the cell is exactly the
   image's height. */
export function LibraryEResources({ data }) {
  return (
    <section id="eResources" className={SECTION}>
      <div className={`relative ${ROW} px-[60px] [@media(max-width:600px)]:px-5`}>
        <div className={`${COL} p-0`}>
          <h2 className={`${H2} text-black`}>{data.heading}</h2>
        </div>
        <div className={`${COL} grid grid-cols-[repeat(4,1fr)] gap-[30px] p-0 [@media(max-width:600px)]:grid-cols-[repeat(2,1fr)] [@media(max-width:600px)]:gap-2.5`}>
          {data.items.map((item) => (
            <div key={item.image} className={item.wide ? 'col-span-2' : undefined}>
              <a href={item.href} target="_blank" rel="noopener" className={`text-[#0d6efd] ${CURSOR}`}>
                <img src={item.image} className="h-auto w-full max-w-full" alt="..." />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ref section#rulesRegulations — white 20px-radius cards on #F1F5FE, 4-up until 600, then 1-up.
   Two cards author a `<ul>` inside a `<p>`, which the parser splits into an empty `<p>`, the list
   and a second empty `<p>`; that child list is reproduced so the box is the same box.

   REFERENCE DEFECT, FIXED: `repeat(4, 1fr)` has no step between 601 and 991, and a `1fr` track
   cannot shrink below its longest word ("Reservations" at 24px bold), so the four tracks floor at
   161 / 204.5 / 176.4 / 209.9 = 842px with the gaps (measured). Inside the 60px side padding the
   page scrolls sideways once the viewport is under 902 — 2px at 900, 134 at 768, 202 at 700 — and
   this project's `body { overflow-x: hidden }` would clip the right-hand cards outright instead.
   From 601 to 901 the grid is therefore 2-up (two tracks fit at every width in that range). At 902
   and above, and at 600 and below, it is the authored grid, unchanged. */
export function LibraryRules({ data }) {
  return (
    <section id="rulesRegulations" className={`${SECTION} bg-[#F1F5FE]`}>
      <div className={`relative ${ROW} p-[60px] [@media(max-width:600px)]:p-5`}>
        <div className={`${COL} p-0`}>
          <h2 className={`${H2} text-black`}>{data.heading}</h2>
          <p className={PARA}>{data.lead}</p>
        </div>
        <div className={`${COL} grid grid-cols-[repeat(4,1fr)] gap-[30px] p-0 [@media(min-width:601px)_and_(max-width:901px)]:grid-cols-[repeat(2,1fr)] [@media(max-width:600px)]:grid-cols-[repeat(1,1fr)] [@media(max-width:600px)]:gap-2.5`}>
          {data.items.map((item) => (
            <div key={item.title} className="rounded-[20px] bg-white p-6">
              <h4 className="m-0 mb-2.5 text-[24px] font-bold leading-[1.2]">{item.title}</h4>
              {Array.isArray(item.body) ? (
                <p className="m-0 text-[16px]">
                  <Runs runs={item.body} />
                </p>
              ) : (
                <>
                  <p className="m-0 text-[16px]" />
                  <ul className="mb-4 mt-0 list-disc pl-8">
                    {item.body.list.map((runs, i) => (
                      <li key={i}>
                        <Runs runs={runs} />
                      </li>
                    ))}
                  </ul>
                  <p className="m-0 text-[16px]" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ref `.eContentBoxCol:nth-of-type(N) h4, p` and `.eContentBoxColbgN` */
const EC_TONE = {
  1: { bg: 'bg-[#FCD5C4]', text: 'text-[#7C3C20]' },
  2: { bg: 'bg-[#F8EBBF]', text: 'text-[#775C05]' },
  3: { bg: 'bg-[#B6DAD8]', text: 'text-[#036058]' },
};

/* ref section#eContent — three 18rem (14rem from 600 down) cards, each one link with the faculty
   portrait pinned bottom-right.

   REFERENCE DEFECT, FIXED — the same one as the Rules grid: `repeat(3, 1fr)` holds three columns
   down to 601, and the tracks floor at 227.2 / 186.9 / 189.3 = 663px with the gaps (measured: a
   `1fr` track cannot go below "Khajanchi" at 34px bold). Inside the 60px side padding the page
   scrolls sideways once the viewport is under 723. From 601 to 722 the grid is 2-up (two tracks need
   454px; the narrowest content box in that range is 481); everywhere else it is the authored grid. */
export function LibraryEContent({ data }) {
  return (
    <section id="eContent" className={SECTION}>
      <div className={`relative ${ROW} px-[60px] [@media(max-width:600px)]:px-5`}>
        <div className={`${COL} p-0`}>
          <h2 className={`${H2} text-black`}>{data.heading}</h2>
          <p className={PARA}>{data.lead}</p>
        </div>
        <div className={`${COL} grid grid-cols-[repeat(3,1fr)] gap-[30px] p-0 [@media(min-width:601px)_and_(max-width:722px)]:grid-cols-[repeat(2,1fr)] [@media(max-width:600px)]:grid-cols-[repeat(1,1fr)] [@media(max-width:600px)]:gap-2.5`}>
          {data.items.map((item) => {
            const tone = EC_TONE[item.tone];
            return (
              <div key={item.href} className={`relative h-72 p-6 [@media(max-width:600px)]:h-56 ${tone.bg}`}>
                <a href={item.href} target="_blank" rel="noopener" className={`text-[#0d6efd] no-underline ${CURSOR}`}>
                  <h4 className={`m-0 mb-2.5 text-[18px] font-medium leading-[1.2] [@media(max-width:600px)]:mb-1 [@media(max-width:600px)]:text-[12px] ${tone.text}`}>
                    {data.label}
                  </h4>
                  <p className={`m-0 text-[34px] font-bold leading-[38px] [@media(max-width:600px)]:text-[26px] [@media(max-width:600px)]:leading-[26px] ${tone.text}`}>
                    {withBreaks(item.name)}
                  </p>
                  <img src={item.image} className="absolute bottom-0 right-0 h-[280px] [@media(max-width:600px)]:h-[200px]" alt="..." />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const AWARD_BG = { 1: 'bg-[#EFF3FE]', 2: 'bg-[#E2E9FC]' };
/* ref `.awardRow1 .awardDefcol .rowYear img` */
const PORTRAIT = 'h-[70px] w-[70px] rounded-[50px] shadow-[1px_1px_3px_#000000f7]';

/* ref section#award — two half-width panels from 992 (stacked below). Each year is a `.custom-btn`
   pill over a `.rowYear` of portraits, 2-up and 3-up from 1400; from 600 down each person is a
   centred block with the name under the portrait. */
export function LibraryAwards({ data }) {
  return (
    <section id="award" className={SECTION}>
      <div className={`${ROW} px-[60px] [@media(max-width:600px)]:px-5`}>
        {data.map((award) => (
          <div key={award.title} className={`${COL} p-[30px] lg:w-1/2 [@media(max-width:600px)]:p-4 ${AWARD_BG[award.tone]}`}>
            <h4 className="m-0 mb-2.5 text-[24px] font-bold leading-[1.2] [@media(max-width:600px)]:mb-1.5 [@media(max-width:600px)]:text-[20px]">{award.title}</h4>
            <p className="m-0 text-[16px] [@media(max-width:600px)]:text-[12px]">{award.text}</p>
            <div className={ROW}>
              {award.years.map((year) => [
                <div key={`${year.year}-btn`} className={`${COL} p-0 text-center lg:text-left`}>
                  <button
                    type="button"
                    className="mb-3 mr-3 mt-[26px] inline-block border border-solid border-transparent bg-white px-3.5 py-[3px] text-black shadow-[0_0_3px_#0000008c] [@media(max-width:600px)]:mb-6"
                  >
                    {year.year}
                  </button>
                </div>,
                <div key={`${year.year}-row`} className={`${COL} p-0`}>
                  <div className={ROW}>
                    {year.people.map((person) => (
                      <div
                        key={person.name}
                        className="mb-4 flex w-1/2 max-w-full shrink-0 items-center p-0 [@media(max-width:600px)]:block [@media(max-width:600px)]:text-center [@media(min-width:1400px)]:w-1/3"
                      >
                        {person.image ? (
                          <img src={person.image} className={PORTRAIT} alt="..." />
                        ) : (
                          /* the reference's portrait is a dead third-party URL (404) — the slot is kept */
                          <span className={`inline-block align-middle ${PORTRAIT}`} aria-hidden="true" />
                        )}
                        <p className="m-0 ml-2 text-[16px] [@media(max-width:600px)]:ml-0 [@media(max-width:600px)]:mt-2.5 [@media(max-width:600px)]:text-[12px]">
                          {withBreaks(person.name)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>,
              ])}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
