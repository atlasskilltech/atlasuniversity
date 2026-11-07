/* Inner-page blocks of the Aarohan sites: .page-banner-section (the title over a photo, a tinted
   wash - rgba(5,65,218,.7) in 2023/2024, #1fe0df82 in 2025 - and banner-shape at the bottom),
   the About page's .meeta-speakers-5 people grid and convenor quote, the speaker profile
   (.meeta-speaker-single) and the 2025 guideline articles (.blog-details-section). */
import { A, ARCHIVO, BTN_SOLID, colClass, COL_BASE, CONTAINER, Glyph, LINK, Rich, ROW, SECTION_PAD } from './ui';
import { Features } from './Sections';

/* ---------------------------------------------------------------- banner */
/* min-height 645 / 520 (<=1199) / 450 (<=991) / 350 (<=767), padding-top 100 / 70 (<=767) /
   50 (<=575). Speaker pages set the photo inline with `background-position: inherit` (= 0 0);
   the About page uses the sheet's page-banner2 centred. The 2025 guideline pages add
   `.page-banner-sectionv2 { min-height: 400px }`, which only wins from 1200 up (the sheet's
   <=1199 rules come after it). */
export function PageBanner({ title, year, image, position = 'center', v2 = false, assets }) {
  const wash = year === 2025 ? 'before:bg-[#1fe0df82]' : 'before:bg-[rgba(5,65,218,.7)]';
  const h = v2 ? 'min-h-[400px]' : 'min-h-[645px]';
  return (
    <div
      className={`relative z-[1] flex ${h} items-center bg-cover bg-no-repeat pt-[100px] [@media(min-width:992px)_and_(max-width:1199px)]:min-h-[520px] max-lg:min-h-[450px] max-md:min-h-[350px] max-md:pt-[70px] max-lp:pt-[50px] ${
        position === 'center' ? 'bg-center' : 'bg-[position:0_0]'
      } before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:content-[''] ${wash} after:absolute after:left-0 after:top-0 after:-z-[1] after:h-full after:w-full after:bg-[image:var(--aar-bs)] after:bg-[position:center_bottom] after:bg-no-repeat after:content-['']`}
      style={{ backgroundImage: `url(${image})`, '--aar-bs': `url(${assets.bannerShape})` }}
    >
      <div className={CONTAINER}>
        <div className="text-center">
          <h2 className={`${ARCHIVO} text-[60px] font-bold leading-[70px] text-white [@media(min-width:768px)_and_(max-width:1199px)]:text-[48px] [@media(min-width:768px)_and_(max-width:1199px)]:leading-[1.25] max-md:text-[30px] max-md:leading-[40px]`}>
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- people (About page) */
/* `.meeta-speakers-row [class*=col-]:nth-child(4n+k)` colours each portrait ring by its COLUMN
   index - spacer columns included - #f9d464 / #00acee / #fc097c / #554bb9.
   Each portrait and name is authored as <a href="#">; they lead nowhere, so they render as
   href-less anchors (same paint, no jump to the top of the page). */
const RING = ['bg-[#f9d464]', 'bg-[#00acee]', 'bg-[#fc097c]', 'bg-[#554bb9]'];

export function People({ data, year }) {
  return (
    <div
      className={`relative z-[1] ${SECTION_PAD[year]} before:absolute before:left-0 before:top-0 before:-z-[1] before:h-full before:w-full before:bg-[image:var(--aar-pbg)] before:bg-cover before:bg-[position:center_top] before:content-['']`}
      style={{ '--aar-pbg': `url(${data.bg})` }}
    >
      {data.groups.map((g, gi) => (
        <div key={gi} className={`mx-auto w-[70%] px-3 n576:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] [@media(min-width:1200px)]:max-w-[1170px] ${g.pt ? 'pt-[100px]' : ''}`}>
          <div className="mb-[55px] text-center">
            <h2 className={`${ARCHIVO} text-[54px] font-bold leading-[60px] text-white [@media(min-width:992px)_and_(max-width:1199px)]:text-[48px] max-lg:text-[40px] max-lg:leading-[50px] max-lp:text-[30px] max-lp:leading-[40px]`}>
              {g.title}
            </h2>
          </div>
          {g.rows.map((r, ri) => (
            <div key={ri} className={`${ROW.gy5} ${r.center ? 'justify-center' : ''}`}>
              {r.cols.map((c, ci) => (
                <div key={ci} className={`${COL_BASE.gy5} ${colClass(c.cols)}`}>
                  {c.p && <Person p={c.p} ring={RING[ci % 4]} shape={data.contentShape} />}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Person({ p, ring, shape }) {
  return (
    <div className="group text-center">
      <div>
        {p.img && (
          <a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.alt} className={`rounded-full p-[10px] transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)] group-hover:scale-105 ${ring}`} />
          </a>
        )}
      </div>
      <div
        className="relative z-[1] mt-[30px] pb-[15px] before:absolute before:left-0 before:right-0 before:top-[-10px] before:-z-[1] before:mx-auto before:h-[60px] before:w-[170px] before:bg-[image:var(--aar-s7)] before:bg-cover before:bg-center before:content-['']"
        style={{ '--aar-s7': `url(${shape})` }}
      >
        <div className="relative mx-auto max-w-[350px] bg-white py-[10px]">
          <h4 className={`${ARCHIVO} text-[18px] font-bold leading-[1.1] text-[#1a0a1e]`}>
            <a>{p.name}</a>
          </h4>
          <p className="text-[14px] leading-[1.75] text-[#666]">
            <Rich nodes={p.role} />
          </p>
          {p.mail && (
            <a href={p.mail.href} className={`${LINK} inline-block`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.mail.icon} alt="Mailt" width="17" height="17" /> {p.mail.text}
            </a>
          )}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.shape} alt="Shape" className="absolute right-[27%] top-[-12px] -z-[1] w-[29px]" />
        <div className="absolute bottom-0 left-1/4 -z-[1] h-[35px] w-[35px] rounded-full bg-[#fc097c]" />
      </div>
    </div>
  );
}

/* 2023/2024 close the About page with the convenor's note: Bootstrap 5 .blockquote (1.25rem),
   .lead (1.25rem / 300 - the markup's `font-italic` is a Bootstrap 4 class and does nothing in
   5.1), the Font Awesome quote marks in .text-primary #0d6efd at .fa-xs, and the
   .blockquote-footer "— " caption. */
export function Quote({ data }) {
  return (
    <section className="bg-white">
      <div className="h-full w-full px-3">
        <div className="-mx-3 flex h-full flex-wrap items-center justify-center">
          <div className="w-full max-w-full flex-[1_0_0%] px-3 lg:w-3/4 lg:flex-[0_0_auto] [@media(min-width:1200px)]:w-[58.333333%]">
            <div className="rounded-[15px]">
              <div className="p-12">
                <div className="mb-6 pb-2 text-center" />
                <figure className="mb-0 text-center">
                  <blockquote className="mb-4 text-[20px] leading-[1.75]">
                    <p className="pb-4">
                      <Glyph name="quoteLeft" className="text-[.75em] text-[#0d6efd]" />{' '}
                      <span className="text-[1.25rem] font-light">{data.text}</span>{' '}
                      <Glyph name="quoteRight" className="text-[.75em] text-[#0d6efd]" />
                    </p>
                  </blockquote>
                  <figcaption className="-mt-4 mb-0 text-[.875em] text-[#6c757d] before:content-['—\00a0']">
                    <strong className="text-[1.5em] font-bold"> {data.by}</strong>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- speaker profile */
export function SpeakerProfile({ sp, year, assets }) {
  return (
    <>
      <div className={SECTION_PAD[year]}>
        <div className={CONTAINER}>
          <div>
            <div className={ROW.default}>
              <div className={`${COL_BASE.default} lg:w-1/3 lg:flex-[0_0_auto]`}>
                <div
                  className="relative z-[1] bg-white px-[70px] pb-[100px] pt-10 text-center shadow-[0_6px_120px_0_rgba(0,0,0,.07)] before:absolute before:bottom-0 before:left-0 before:-z-[1] before:h-full before:w-full before:bg-[image:var(--aar-ssh)] before:bg-cover before:bg-[position:center_bottom] before:bg-no-repeat before:content-[''] [@media(max-width:1199px)]:px-[50px] [@media(max-width:1199px)]:pb-[90px]"
                  style={{ '--aar-ssh': `url(${assets.speakerShape})` }}
                >
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sp.img} alt="Speaker" className="rounded-full bg-[#f9d464] p-[10px]" />
                  </div>
                  <div className="mt-[25px]">
                    <h3 className={`${ARCHIVO} text-[24px] font-bold leading-[25px] text-[#1a0a1e]`}>{sp.name}</h3>
                    <p>
                      <Rich nodes={sp.role} />
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${COL_BASE.default} lg:w-2/3 lg:flex-[0_0_auto]`}>
                <div className="pl-10 max-lg:mt-[50px] max-lg:pl-0">
                  <div>
                    <div>
                      <h3 className={`${ARCHIVO} mb-5 text-[30px] font-bold leading-none text-[#1a0a1e] max-md:text-[28px]`}>{sp.bioTitle}</h3>
                      <Rich nodes={sp.bio} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {sp.books && (
        <Features
          year={year}
          assets={assets}
          data={{
            title: null,
            shape: sp.books.shape,
            cols: sp.books.cols.map((col) => col.map((b) => b.n)),
            items: sp.books.cols.flat().map((b) => ({ n: b.n, img: b.img })),
          }}
        />
      )}
    </>
  );
}

/* ---------------------------------------------------------------- 2025 guidelines */
/* .blog-details-section: the article column pulled 60px up (.blog-details-wrap) - which the
   .single-blog-post's own 60px top margin cancels - each block an Archivo title (.blog-content
   22px, .blog-details-text 18px), the reverted-to-browser lists (`.olCustom, .ulCustom
   { revert-layer }` = the UA's 1em margins, 40px indent, decimal / circle / square markers)
   and the .btn (Archivo 16px, 14 below 576).

   paper-submission.php links Bootstrap 5.3's stylesheet in the middle of its body, AFTER the
   template sheet, and production renders the whole page through it: system-ui 16/24 #212529
   body copy, `p { margin-bottom: 1rem }`, the 5.3 container (1320 from 1400 up), the
   .table-bordered/.table-striped/.table-dark fee table and a blue rounded .btn-primary. That is
   reproduced for the page's content (`bs53`). The same stylesheet also underlines the header
   links and turns the footer links blue on that one page only; that leak into the site chrome is
   not reproduced - the header and footer match every other page. */
const LISTS =
  '[&_li]:list-item [&_ol]:my-[1em] [&_ol]:list-decimal [&_ol]:pl-10 [&_ul]:list-[circle] [&_ul]:pl-10 [&_ul_ul]:list-[square]';
const CONTAINER_53 =
  'mx-auto w-full px-3 n576:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] [@media(min-width:1200px)_and_(max-width:1399px)]:max-w-[1140px] [@media(min-width:1400px)]:max-w-[1320px]';

export function Guideline({ data, year }) {
  const bs = data.bs53;
  const body = bs ? 'font-[system-ui,-apple-system,"Segoe_UI",Roboto,"Helvetica_Neue","Noto_Sans","Liberation_Sans",Arial,sans-serif] text-[16px] leading-[1.5] text-[#212529] [&_p]:mb-4' : '';
  const t22 = `${ARCHIVO} mb-[10px] mt-[5px] text-[22px] font-bold leading-[30px] text-[#1a0a1e]`;
  const t18 = `${ARCHIVO} mb-[10px] text-[18px] font-bold leading-[30px] text-[#1a0a1e]`;
  return (
    <div className={`${SECTION_PAD[year]} ${body}`}>
      <div className={bs ? CONTAINER_53 : CONTAINER}>
        <div className="-mt-[60px]">
          <div className={ROW.default}>
            <div className={`${COL_BASE.default} lg:w-full lg:flex-[0_0_auto]`}>
              <div>
                {data.single.length > 0 && (
                  <div className="mt-[60px]">
                    {data.single.map((b, i) => (
                      <div key={i}>
                        <h3 className={t22}>{b.title}</h3>
                        {b.type === 'table' ? <FeeTable b={b} /> : <div className={LISTS}><Rich nodes={b.c} /></div>}
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  {data.details.map((b, i) => (
                    <div key={i}>
                      <h3 className={t18}>{b.title}</h3>
                      <div className={LISTS}>
                        <Rich nodes={b.c} />
                      </div>
                    </div>
                  ))}
                  {data.button && (
                    <div>
                      <div className="mt-[35px]">
                        <div className="pt-[10px]">
                          <A
                            href={data.button.href}
                            target={data.button.target || undefined}
                            className={
                              bs
                                ? 'inline-block h-[50px] rounded-[.375rem] border border-solid border-[#0d6efd] bg-[#0d6efd] px-3 py-1.5 text-center align-middle text-[16px] leading-[1.5] text-white hover:border-[#0a58ca] hover:bg-[#0b5ed7] hover:text-white'
                                : `${ARCHIVO} ${BTN_SOLID} bg-[#fc097c] px-[35px] text-[16px] text-white hover:text-white max-lp:text-[14px]`
                            }
                          >
                            {data.button.label}
                          </A>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeeTable({ b }) {
  return (
    <div className="overflow-x-auto">
      <table className="mb-4 w-full border-collapse border border-solid border-[#dee2e6] text-center align-middle">
        <thead>
          <tr>
            {b.head.map((c, i) => (
              <th key={i} className="border border-solid border-[#373b3e] bg-[#212529] p-2 font-bold text-white">
                <Rich nodes={c.c} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className={`border border-solid border-[#dee2e6] p-2 align-middle text-[#212529] ${ri % 2 === 0 ? 'shadow-[inset_0_0_0_9999px_rgba(0,0,0,.05)]' : ''}`}
                >
                  <PayCell nodes={c.c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* The "Pay Now" links are Bootstrap 5.3 `.btn.btn-sm.mt-2.d-flex` with an inline #342b7c fill. */
function PayCell({ nodes }) {
  return nodes.map((n, i) => {
    if (typeof n === 'object' && n.t === 'a') {
      return (
        <a
          key={i}
          href={n.href}
          target={n.target}
          rel="noopener"
          className="mt-2 flex h-[50px] items-center justify-center rounded-[.25rem] border border-solid border-transparent bg-[#342b7c] px-2 py-1 text-[.875rem] leading-[1.5] text-white hover:text-white"
        >
          <Rich nodes={n.c} />
        </a>
      );
    }
    return <Rich key={i} nodes={[n]} />;
  });
}
