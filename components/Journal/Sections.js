/* eslint-disable @next/next/no-img-element -- plain <img>/<picture>: the reference's own files at their authored box metrics */
import { Fragment } from 'react';
import EditorTabs from './EditorTabs';

/*
 * /journal — reference/new pages/journal.zip -> journal/index.php (the ATLAS header/footer come from
 * the root layout). The page is not Webflow markup: it is a Bootstrap 5.3 grid styled by the page's
 * own <style>, so every class string below restates one Bootstrap utility or one rule of that <style>,
 * measured on production (https://atlasuniversity.edu.in/journal/) at 1920 / 1440 / 768 / 390.
 *
 * Bootstrap pieces restated:
 *   .row          display:flex; flex-wrap:wrap (every one here also carries m-0 / mx-0 and w-100)
 *   .row > *      width:100%; the page zeroes the 12px gutter with p-0 / its own padding everywhere
 *   .col-lg-N     width:N/12 from 992 (this project's `lg`); offset-lg-N -> margin-left N/12
 *   h3 / h4       RFS sizes: calc(1.3rem + .6vw) / calc(1.275rem + .3vw), fixed 28px / 24px from 1200;
 *                 line-height 1.2 · h5 20px/1.2 · .fs-5 20px · body 16px/1.5 #212529
 *   mb-2/3/4/5    8 / 16 / 24 / 48px
 * The page's own `@media only screen and (max-width: 576px)` is this project's `max-lp`.
 *
 * Reference defects / production differences, recorded rather than reproduced:
 *   - The `<i class="fas fa-…">` icons before the phone / e-mail / LinkedIn lines never render on
 *     production: Font Awesome is not loaded on the page, so each <i> is an empty inline box carrying
 *     only Bootstrap's `me-2` (8px). Reproduced as exactly that — an empty 8px gap — not as glyphs.
 *   - Four Editorial Board cards link `mailto:sonia.bhavsar@…` while showing their own address (a
 *     copy-paste upstream); transcribed as authored.
 *   - The publisher name is an `<a href="#" target="_blank">`; transcribed as authored.
 */

const ROW = 'mx-0 flex w-full flex-wrap';
const COL = 'w-full p-0';
const H3 = 'mb-2 mt-0 text-[calc(1.3rem+.6vw)] font-bold leading-[1.2] text-[#342b7c] lg:mb-4 [@media(min-width:1200px)]:text-[28px]';
const H4 = 'mb-2 mt-0 text-[calc(1.275rem+.3vw)] font-bold leading-[1.2] text-[#342b7c] lg:mb-4 [@media(min-width:1200px)]:text-[24px]';
/* ref `.cardv2` / `.cardv3` / `.cardv4` (box) */
const CARD_BOX = 'rounded-[4px] border border-[#eee] bg-white p-4 shadow-[0_20px_40px_-14px_rgba(0,0,0,0.25)]';
const CARD = `w-full ${CARD_BOX}`;
/* ref the page's `a` / `a:hover` */
const LINK = 'text-[#777] no-underline hover:text-[#342b7c] hover:underline';
/* ref `<i class="fas … me-2">` — Font Awesome is not loaded, so only the margin paints */
const ICON_GAP = 'mr-2';

function Icon() {
  return <span aria-hidden="true" className={ICON_GAP} />;
}

/* `user<br class="d-block d-lg-none">@domain` — or a plain <br> where authored */
function Email({ email }) {
  return (
    <a href={email.href} target="_blank" className={LINK}>
      <Icon />
      {email.user}
      <br className={email.brAlways ? undefined : 'lg:hidden'} />
      {email.domain}
    </a>
  );
}

function Address({ address }) {
  return (
    <a href={address.href} target="_blank" className={LINK}>
      {address.text}
    </a>
  );
}

/* ref `.heroBanner` — the picture sets the height; the title is an absolute `.col-12` that
   `align-self: center` centres, the crumb one that `align-self: end` pins to the bottom */
export function JournalHero({ data }) {
  return (
    <div className="w-full p-0">
      <div className="relative m-0 flex w-full flex-wrap">
        <div className={COL}>
          <picture>
            <source srcSet={data.mobile} type="image/webp" media="(max-width: 576px)" width={480} height={660} />
            <img src={data.desktop} alt={data.alt} width={1920} height={530} className="block h-auto w-full max-w-full" />
          </picture>
        </div>
        <div className="absolute w-full self-center p-0">
          <h1 className="m-0 text-center text-[54px] font-medium leading-[1.2] text-[#f8f9fa] max-lp:text-[38px]">{data.title}</h1>
        </div>
        <div className="absolute w-full self-end p-2 text-left lg:p-6">
          <span className="text-[18px] text-[#f8f9fa] max-lp:text-[14px]">{data.crumb}</span>
        </div>
      </div>
    </div>
  );
}

/* ref `.section-one` — 1200px, 50px auto (25px and 14px side padding at <=576) */
export function JournalBody({ children }) {
  return <div className="mx-auto my-[50px] w-full max-w-[1200px] p-0 max-lp:my-[25px] max-lp:px-[14px]">{children}</div>;
}

function Block({ heading, children }) {
  return (
    <div className={`${ROW} mb-6 lg:mb-12`}>
      <div className={COL}>
        <h3 className={H3}>{heading}</h3>
      </div>
      <div className={COL}>{children}</div>
    </div>
  );
}

export function JournalDetails({ data }) {
  const last = data.details.length - 1;
  return (
    <Block heading={data.heading}>
      <div data-journal-anim className={`m-0 flex flex-wrap ${CARD}`}>
        {data.details.map(([label, value], i) => (
          <Fragment key={label}>
            <div className="w-full p-0 lg:w-1/6">
              <p className="mb-0 font-semibold lg:mb-2">{label}</p>
            </div>
            <div className="w-full p-0 lg:w-5/6">
              <p className={i === last ? 'm-0' : 'mb-2'}>{value}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </Block>
  );
}

export function JournalAim({ data }) {
  return (
    <Block heading={data.heading}>
      <div data-journal-anim className={`m-0 flex flex-wrap ${CARD}`}>
        <div className={COL}>
          {data.paras.map((p, i) => (
            <p key={i} className="mb-2">
              {p}
            </p>
          ))}
        </div>
      </div>
    </Block>
  );
}

function SubRow({ heading, last, children }) {
  return (
    <div className={`m-0 flex w-full flex-wrap ${last ? '' : 'mb-6 lg:mb-12'}`}>
      {heading ? (
        <div className={COL}>
          <h4 className={H4}>{heading}</h4>
        </div>
      ) : null}
      {children}
    </div>
  );
}

function Publisher({ items }) {
  return (
    <SubRow>
      <div className={CARD}>
        <div className={ROW}>
          {items.map((item) => (
            <div key={item.label} className="w-full p-0 lg:w-1/2">
              <p className="mb-0">
                <a href={item.href} target="_blank" className={LINK}>
                  <strong className="font-bold">{item.label}</strong>
                  {item.lines.map((l) => (
                    <Fragment key={l}>
                      <br />
                      {l}
                    </Fragment>
                  ))}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </SubRow>
  );
}

function Editor({ data }) {
  return (
    <SubRow heading={data.heading}>
      <div className={CARD}>
        <div className={`${ROW} mb-4 items-center border-b border-[#dee2e6] pb-4`}>
          <div className="w-full p-0 lg:w-1/6">
            <img
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              className="h-full w-full max-w-full rounded-full border-[5px] border-solid border-white shadow-[0_5px_10px_rgba(0,0,0,0.2)] max-lp:mb-5"
            />
          </div>
          <div className="ml-0 w-full p-0 lg:ml-4 lg:w-5/12">
            <h5 className="mb-0 mt-0 text-[20px] font-semibold leading-[1.2] text-[#009fe0]">{data.name}</h5>
            <p className="mb-2">{data.role}</p>
            <p className="mb-0">
              <Address address={data.address} />
            </p>
          </div>
        </div>
        <div className="m-0 flex w-full flex-wrap items-start">
          <div className="w-full p-0 lg:w-1/3">
            <p className="mb-2">
              <a href={data.phone.href} target="_blank" className={LINK}>
                <Icon />
                {data.phone.text}
              </a>
            </p>
            <p className="mb-2">
              <Email email={data.email} />
            </p>
            <p className="mb-2">
              <a href={data.linkedin.href} target="_blank" className={LINK}>
                <Icon />
                {data.linkedin.text}
              </a>
            </p>
          </div>
          <div className="w-full p-0 lg:w-2/3">
            <EditorTabs tabs={data.tabs} initial={data.activeTab} />
          </div>
        </div>
      </div>
    </SubRow>
  );
}

function Desk({ data }) {
  return (
    <SubRow heading={data.heading}>
      <div data-journal-anim className={CARD}>
        {data.paras.map((p, i) => (
          <p key={i} className="mb-2">
            {p}
          </p>
        ))}
      </div>
    </SubRow>
  );
}

/* ref the five `.col-lg-4` wrappers — each its own padding / offset, as authored */
const BOARD_COLS = [
  'w-full px-0 pb-6 lg:w-1/3 lg:pl-0 lg:pr-2',
  'w-full px-0 pb-6 lg:w-1/3 lg:px-2',
  'w-full px-0 pb-6 lg:w-1/3 lg:pl-2 lg:pr-0',
  'w-full px-0 pb-6 lg:ml-[16.666667%] lg:w-1/3 lg:pb-0 lg:pl-0 lg:pr-2',
  'w-full px-0 pb-0 lg:w-1/3 lg:pl-2 lg:pr-0',
];
const REVIEW_COLS = [
  'w-full px-0 pb-6 lg:w-1/3 lg:pl-0 lg:pr-2',
  'w-full px-0 pb-6 lg:w-1/3 lg:px-2',
  'w-full px-0 pb-6 lg:w-1/3 lg:pl-2 lg:pr-0',
  'w-full px-0 pb-0 lg:ml-[33.333333%] lg:w-1/3',
];
const ASSISTANT_COLS = ['w-full px-0 pb-0 lg:ml-[33.333333%] lg:w-1/3'];

function Board({ data }) {
  return (
    <SubRow heading={data.heading}>
      {data.cards.map((c, i) => (
        <div key={c.name} className={BOARD_COLS[i]}>
          {/* ref `.cardv4` — 320px tall, content height at <=576 */}
          <div data-journal-anim className={`h-[320px] max-lp:h-auto ${CARD_BOX}`}>
            <p className="mb-2 text-[20px]">{c.name}</p>
            <p className="mb-2">
              <strong className="font-bold">Institution:</strong> {c.institution}
            </p>
            <p className="mb-2">
              <Address address={c.address} />
            </p>
            <p className="mb-2">
              <strong className="font-bold">Department:</strong> {c.department}
            </p>
            <p className="mb-2">
              <strong className="font-bold">Designation:</strong> {c.designation}
            </p>
            <p className="mb-2">
              <Email email={c.email} />
            </p>
          </div>
        </div>
      ))}
    </SubRow>
  );
}

function People({ data, cols, last }) {
  return (
    <SubRow heading={data.heading} last={last}>
      {data.cards.map((c, i) => (
        <div key={c.name} className={cols[i]}>
          {/* ref `.cardv3` — 260px tall, content height at <=576 */}
          <div data-journal-anim className={`h-[260px] max-lp:h-auto ${CARD_BOX}`}>
            <p className="mb-0">{c.name}</p>
            <p className="mb-2">{c.role}</p>
            <p className="mb-2">
              <Address address={c.address} />
            </p>
            <p className="mb-2">
              <Email email={c.email} />
            </p>
          </div>
        </div>
      ))}
    </SubRow>
  );
}

export function JournalPublisher({ heading, publisher, editor, desk, board, review, assistant }) {
  return (
    <Block heading={heading}>
      <Publisher items={publisher} />
      <Editor data={editor} />
      <Desk data={desk} />
      <Board data={board} />
      <People data={review} cols={REVIEW_COLS} />
      <People data={assistant} cols={ASSISTANT_COLS} last />
    </Block>
  );
}

/* ref `.research-paper-table` — a 750px-minimum table in a horizontal scroller */
const CELL = 'border border-solid border-[#ddd] p-4 text-left align-top max-768:p-3 max-768:text-[14px]';

export function JournalPapers({ data }) {
  return (
    <Block heading={data.heading}>
      <div>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr>
                {data.columns.map((c, i) => (
                  <th key={i} className={`${CELL} bg-[#2f2f88] font-bold text-white`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r) => (
                <tr key={r.no}>
                  <td className={CELL}>{r.no}</td>
                  <td className={CELL}>
                    <strong className="font-bold">{r.title}</strong>
                    <span className="mt-2 block text-[14px] text-[#666]">{r.authors}</span>
                  </td>
                  <td className={CELL}>
                    <a
                      href={r.href}
                      target="_blank"
                      className="inline-block whitespace-nowrap rounded-[6px] bg-[#2f2f88] px-4 py-2 text-white no-underline hover:text-white hover:no-underline hover:opacity-90"
                    >
                      {r.label}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Block>
  );
}
