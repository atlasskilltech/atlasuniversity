import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "Explore by Experience" — `assets/include/explore-by-experience.php`, closing every ISME events
 * page: `section.section > .container > (h3.h3-tag.black, .common-flex.gap14 > N x .card-type-k(-2))`.
 * `-k` and `-k-2` measure identical; the second only names its caption wrapper differently.
 *
 * Rules, from the page's sheet:
 *   h3.h3-tag.black     32px/1.2 500 #2b2b2b, mb32 (22px at <=767)
 *   .common-flex.gap14  wrap, centred rows, gap 14
 *   .card-type-k        300 wide (full width at <=767), clipped; the photo fills it at its own ratio
 *   .cd-ty-k-wrap       bottom half, #00263700 -> #002637e6, p24 (p8 at <=767), z11
 *     .cd-tk-text       22px 700 white (12 at <=767, 20 at <=479)
 *   .overlay            bottom 55% (90% at <=767), #00263700 6% -> #000000e6 86%
 *   .cd-tk-btn          24 / 24 from the top-right: a 32px mint circle holding the inverted 25px arrow
 */
export default function Explore({ data, block = 'explore' }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h3 className="mb-8 mt-0 text-[32px] font-medium leading-[1.2] text-[#2b2b2b] max-md:text-[22px]">{data.heading}</h3>
        {/* ref .common-flex.gap14 */}
        <div className="flex w-full flex-wrap items-center justify-start gap-3.5 text-white">
          {data.cards.map((c, i) => (
            /* ref .card-type-k(-2) */
            <div key={`${i}-${c.text}`} className="relative w-[300px] flex-[0_1_auto] overflow-hidden text-white max-md:w-full">
              {/* ref .cd-ty-k-wrap(-2) */}
              <div className="absolute inset-x-0 bottom-0 z-[11] flex h-1/2 w-full items-end bg-[linear-gradient(rgba(0,38,55,0),rgba(0,38,55,0.9))] p-6 max-md:p-2">
                <div className="text-[22px] font-bold max-md:text-[12px] max-sm:text-[20px]">{withBreaks(c.text)}</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image.src} alt={c.image.alt} loading="lazy" decoding="async" className="block h-full w-full max-w-full object-cover align-middle" />
              {c.href && (
                /* ref .cd-tk-btn > a.icon-button-2.mint-small-10 */
                <div className="absolute right-6 top-6 z-[12]">
                  <a href={c.href} aria-label={c.text.replace(/\n/g, ' ')} className="flex h-8 w-8 items-center justify-center rounded-[30px] bg-atlas-mint">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.icon} alt="" className="block w-[25px] max-w-full leading-none invert" />
                  </a>
                </div>
              )}
              {/* ref .overlay */}
              <div aria-hidden className="absolute inset-x-0 bottom-0 z-0 h-[55%] bg-[linear-gradient(rgba(0,38,55,0),rgba(0,38,55,0)_6%,rgba(0,0,0,0.9)_86%)] max-md:h-[90%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
