import { Fragment } from 'react';
import ButtonRegular from '@/components/ui/ButtonRegular';
import { CONTAINER } from '@/components/Home/SectionHead';
import Runs from '@/components/Schools/ISME/Bba/Runs';

/**
 * The ISME article template (`thought-leaderships/*.php`): `section.page-header-image`,
 * `div.breadcrumbs-wrap`, `div.container-inner` — rendered from the data the page extractor took
 * out of each article's production markup.
 *
 * Rules, from the page's sheet (measured at 1440 / 390):
 *   .page-header-image   495 tall; img cover 100% x 100%
 *   .breadcrumbs-wrap    1px rgba(20,20,20,.1) top rule, 0 2px 5px rgba(0,0,0,.06) shadow
 *     .breadcrumbs       flex, gap 5, h54, centred, its own 1px top rule; links 14px #343434
 *   .container-inner     max 1366, px62 pt56 (px22 pt40 at <=767) — NOT the Tailwind-CDN ladder
 *     h1.h1-tag-blk      56px/1.2 500 black, mb32 (32px at <=767)
 *     .article-details   flex, gap 8, centred, pb32, 20px 300 (pb22 16px at <=767); 8px mint dots
 *     .article-buttons-top  `.d-none` — never shown, not rendered
 *     .content-section   flex, start; block at <=767
 *       .jump-list-menu  flex 0 0 22%, a sticky column (top 10%), gap 24, pb75, 18px; hidden <=767
 *         h4.h4-tag      24px/1.2 400, mb56
 *       .inner-content   pl56, 18px (pl0, 16px at <=767)
 *         h3.hd-cont-title  32px/1.2 400 Manrope, mb32 (22px at <=767)
 *         p.p-tag        mb56 (40 at <=767)
 *         .rich-text-block  mb56; its p / ul carry no margins, padding or bullets (Tailwind's
 *                        preflight loads after Webflow's normalize on the ISME pages — measured)
 *         .tag-pills     flex, gap 18, mb56 (wraps at <=767); the mint-medium `.button-regular`
 *                        (#2b2b2b on mint, h48 / 44, label 18 / 14)
 */
export function ArticleHeader({ data, block = 'article-header' }) {
  return (
    /* ref section.page-header-image */
    <section data-block={block} className="block h-[495px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image.src}
        srcSet={data.image.srcSet}
        sizes={data.image.sizes}
        alt={data.image.alt}
        fetchPriority="high"
        decoding="async"
        className="block h-full w-full max-w-full overflow-clip object-cover"
      />
    </section>
  );
}

export function Breadcrumbs({ data, block = 'breadcrumbs' }) {
  return (
    /* ref .breadcrumbs-wrap */
    <div data-block={block} className="block border-0 border-t border-solid border-[rgba(20,20,20,0.1)] shadow-[0_2px_5px_rgba(0,0,0,0.06)]">
      <div className={CONTAINER}>
        {/* ref .breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex h-[54px] items-center justify-start gap-[5px] border-0 border-t border-solid border-[rgba(20,20,20,0.1)]">
          {data.links.map((l, i) => (
            <Fragment key={`${i}-${l.label}`}>
              <a href={l.href} className="block text-[14px] leading-[1.5] text-[#343434] no-underline">
                {l.label}
              </a>
              {data.arrow && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={data.arrow} alt="" className="block max-w-full overflow-clip" />
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Rich({ blocks }) {
  return blocks.map((b, i) =>
    b && typeof b === 'object' && !Array.isArray(b) && b.heading ? (
      /* a heading inside the rich text: the inherited size, 400, line-height 30px, no margin */
      <h3 key={i} className="m-0 text-[length:inherit] font-normal leading-[30px]">
        <Runs runs={b.text} />
      </h3>
    ) : b && typeof b === 'object' && !Array.isArray(b) && b.list ? (
      b.list === 'ol' ? (
        <ol key={i}>
          {b.items.map((li, j) => (
            <li key={j}>
              <Runs runs={li} />
            </li>
          ))}
        </ol>
      ) : (
        <ul key={i} className="overflow-hidden">
          {b.items.map((li, j) => (
            <li key={j}>
              <Runs runs={li} />
            </li>
          ))}
        </ul>
      )
    ) : (
      <p key={i}>
        <Runs runs={b} />
      </p>
    )
  );
}

export function Article({ data, block = 'article' }) {
  return (
    /* ref .container-inner */
    <div data-block={block} className="mx-auto max-w-[1366px] px-[62px] pt-14 max-md:px-[22px] max-md:pt-10">
      <h1 className="mb-8 mt-0 text-[56px] font-medium leading-[1.2] text-black max-md:text-[32px]">{data.title}</h1>
      {/* ref .article-details */}
      <div className="flex items-center justify-start gap-2 pb-8 text-[20px] font-light max-md:pb-[22px] max-md:text-[16px]">
        {data.details.map((d, i) => (
          <Fragment key={`${i}-${d}`}>
            {i > 0 && <div aria-hidden className="h-2 w-2 rounded bg-atlas-mint" />}
            <div>{d}</div>
          </Fragment>
        ))}
      </div>
      {/* ref .content-section */}
      <div className="relative flex items-start justify-start max-md:block">
        {data.jump && (
          /* ref .jump-list-menu */
          <div className="sticky top-[10%] flex flex-[0_0_22%] flex-col items-start gap-6 pb-[75px] text-[18px] font-normal max-md:hidden">
            <h4 className="mb-14 mt-0 flex-[0_0_10%] text-[24px] font-normal leading-[1.2]">{data.jump.heading}</h4>
            {data.jump.links.map((l, i) => (
              <a key={`${i}-${l.label}`} href={l.href} className="text-black no-underline">
                {l.label}
              </a>
            ))}
          </div>
        )}
        {/* ref .inner-content */}
        <div className="relative pl-14 text-[18px] max-md:pl-0 max-md:text-[16px]">
          {data.body.map((x, i) => {
            if (x.kind === 'h3') {
              return (
                <h3 key={i} id={x.id || undefined} className="mb-8 mt-0 text-[32px] font-normal leading-[1.2] max-md:text-[22px]">
                  {x.text}
                </h3>
              );
            }
            if (x.kind === 'p') {
              return (
                <p key={i} className={(x.mods || []).includes('p-tag') ? 'mb-14 w-auto max-md:mb-10' : undefined}>
                  <Runs runs={x.text} />
                </p>
              );
            }
            if (x.kind === 'rich') {
              return (
                /* ref .rich-text-block.w-richtext */
                <div key={i} className="mb-14">
                  <Rich blocks={x.blocks} />
                </div>
              );
            }
            if (x.kind === 'tags') {
              return (
                /* ref .tag-pills */
                <div key={i} className="mb-14 flex items-center justify-start gap-[18px] max-md:flex-wrap">
                  {x.heading && <h4 className="mb-14 mt-0 flex-[0_0_10%] text-[24px] font-normal leading-[1.2]">{x.heading}</h4>}
                  {x.items.map((t) => (
                    <ButtonRegular key={t.label} href={t.href} variant="mint-medium-18">
                      {t.label}
                    </ButtonRegular>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
