/* Eona portfolio single (one template for all 67 items; measured on production at 1440 and 390).
 *
 * Two arrangements, chosen by the item's layout:
 *   "small" (images-small, gallery-small): media 63.09% left, the info column 31.55% right (sticky
 *     from 1025px up, like the theme's sticky holder), stacked below 1025.
 *   "big" (images-big, gallery-big, masonry-big, slider): media across the grid, then the text block
 *     (66.45%) and the info list (25.73%, 15px inner padding) side by side from 1025px up.
 * Text block: Playfair italic caption (mb 15), h2 38px/1.053 (30/37 <=768, mb 25), Lora copy.
 * Info list: Montserrat 12px/1.7 600 .07em uppercase labels in a 116px column, Lora values; the share
 * strip is a black box (17/32/13 padding) of Playfair italic white "Fb. Tw. Li. Pin." links.
 * Item navigation: 1px #f2f2f2 rule, 100px above, prev / "Project Overview" / next.
 *
 * Copy (lorem ipsum, "New York", the demo photographs) is the Eona demo content production still serves
 * for these items - transcribed, not invented. Links to WordPress pages that are not part of this port
 * (portfolio tags, "Project Overview" = /sensorium/portfolio/standard/, prev/next items outside the 67)
 * keep their production URL. */
import { GRID, H6, MONT, PLAY } from '@/lib/sensorium/ui';
import PageTitle from './PageTitle';
import SingleMedia from './SingleMedia';

const SMALL = new Set(['images-small', 'gallery-small']);
const H2 = `${MONT} m-0 text-[38px] leading-[1.053] font-extrabold uppercase text-black break-words [@media(max-width:768px)]:text-[30px] [@media(max-width:768px)]:leading-[37px]`;

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 12 20" aria-hidden className="relative top-[2px] h-[12px] w-[8px]" fill="none" stroke="currentColor" strokeWidth="1.6">
    {dir === 'left' ? <path d="M10 1 1.5 10 10 19" /> : <path d="M2 1l8.5 9L2 19" />}
  </svg>
);

function Content({ c, small }) {
  return (
    <div className={small ? 'mb-[34px]' : ''}>
      {c.caption && <h6 className={`${H6} mb-[15px]`}>{c.caption}</h6>}
      {c.title && <h2 className={`${H2} relative mb-[25px]`}>{c.title}</h2>}
      {c.text && <p className="m-0">{c.text}</p>}
    </div>
  );
}

function Info({ info, small }) {
  return (
    <div className={small ? 'mt-[9px] border-t border-[#f2f2f2] pt-[43px]' : `[@media(min-width:1025px)]:px-[15px]`}>
      {info.map((row, i) =>
        row.type === 'share' ? (
          <div key="share" className="mt-[38px] inline-block bg-black px-8 pb-[13px] pt-[17px]">
            <ul className="m-0 flex list-none p-0">
              {row.links.map((l) => (
                <li key={l.label} className="relative mr-[6px] leading-[16px] last:mr-0">
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={`${PLAY} text-[16px] italic leading-[16px] text-white`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div key={`${row.label}-${i}`} className="mb-[7px] flex">
            <h5 className={`${MONT} m-0 w-[116px] shrink-0 pr-[5px] pt-1 text-[12px] font-semibold uppercase leading-[1.7] tracking-[0.07em] text-black`}>{row.label}</h5>
            {row.links ? (
              <span>
                {row.links.map((l, k) => (
                  <span key={l.name}>
                    <a href={l.href} className="text-[#919191] transition-colors duration-200 hover:text-black">
                      {l.name}
                    </a>
                    {k < row.links.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </span>
            ) : (
              <span>{row.value}</span>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default function PortfolioItem({ item }) {
  const small = SMALL.has(item.layout);
  const { prev, overview, next } = item.nav;
  const NAVLABEL = `${PLAY} text-[16px] italic leading-[1.412] tracking-[0.01em] text-[#9c9c9c] lowercase`;
  return (
    <>
      <PageTitle title={item.pageTitle} crumbs={item.crumbs} />
      <div className={`${GRID} py-[120px]`}>
        <article>
          {small ? (
            <div className={`flex flex-col [@media(min-width:1025px)]:flex-row [@media(min-width:1025px)]:items-start`}>
              <div className={`w-full [@media(min-width:1025px)]:w-[63.09%]`}>
                <SingleMedia layout={item.layout} media={item.media} />
              </div>
              <div className={`mt-[37px] w-full [@media(min-width:1025px)]:sticky [@media(min-width:1025px)]:top-[100px] [@media(min-width:1025px)]:ml-auto [@media(min-width:1025px)]:mt-0 [@media(min-width:1025px)]:w-[31.55%]`}>
                <Content c={item.content} small />
                <Info info={item.info} small />
              </div>
            </div>
          ) : (
            <>
              <SingleMedia layout={item.layout} media={item.media} />
              <div className={`mt-10 flex flex-col [@media(min-width:1025px)]:flex-row [@media(min-width:1025px)]:items-start`}>
                <div className={`w-full [@media(min-width:1025px)]:w-[66.45%]`}>
                  <Content c={item.content} />
                </div>
                <div className={`mt-[34px] w-full [@media(min-width:1025px)]:ml-auto [@media(min-width:1025px)]:mt-0 [@media(min-width:1025px)]:w-[25.73%]`}>
                  <Info info={item.info} />
                </div>
              </div>
            </>
          )}
          <nav aria-label="Portfolio navigation" className="relative -mb-[5px] mt-[100px] border-t border-[#f2f2f2] px-[3.7%] pt-[25px]">
            <div className="relative flex items-center justify-between">
              <a href={prev?.href} className="flex items-center text-[#bababa]">
                <span className="mr-[15px]">
                  <Chevron dir="left" />
                </span>
                <span className={NAVLABEL}>{prev?.label}</span>
              </a>
              <a href={overview?.href} className={`${PLAY} text-[16px] italic leading-[1.412] tracking-[0.01em] text-[#9c9c9c]`}>
                {overview?.label}
              </a>
              <a href={next?.href} className="flex items-center text-[#bababa]">
                <span className={NAVLABEL}>{next?.label}</span>
                <span className="ml-[15px]">
                  <Chevron dir="right" />
                </span>
              </a>
            </div>
          </nav>
        </article>
      </div>
    </>
  );
}
