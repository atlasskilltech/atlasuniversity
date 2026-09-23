import { cx } from '@/lib/cx';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';

/**
 * "More questions?" — port of reference/assets/include/more-questions.php as
 * about-us/index.php:1485-1496 includes it (`$chatBxVariant = ""`,
 * `$chatBxText = "More questions?"`), inside `section.section > .container >
 * .search-ques-wrap`.
 *
 * With no variant class the panel takes the ISDI sheet's base `.search-question`:
 * #de297b with `faq-vector.png` pinned right and 16px corners — not the indigo
 * `32px 0` panel `components/About/SearchQuestion` draws for the ATLAS pages, so
 * it is drawn here. Everything else about it is that component's, measured again:
 *
 *                      >=768px                         <=767px
 *   .search-ques-wrap  pt40
 *   .search-question   p 56/300/56/56, 1px white        p 40/24
 *                      bottom rule, white
 *   .label-text        flex, centred, gap 16; 32px flower
 *   .hd-label          40px/1 500                      20px/1
 *   .sr-sub-text       24px/1.5, pt10 pb55             14px/1.5
 *   input              38 tall, 24px/1.42857 (Webflow's  14px
 *                      `.w-input`), transparent,
 *                      1px white bottom rule,
 *                      p 0/40/16/0, placeholder 50%
 *   submit             absolute, top -10 / right 0, p 10/18, glyph at 60%
 *
 * A real GET form to `/search` (`$edudomain` is the site root) with a `query`
 * field; nothing else is bound to it upstream.
 *
 * `data.heading` is the `h2.h2-tag.mrg16.isdi` the B.Des Animation page puts above the
 * panel — "Questions? We can read your mind", the FAQ's heading again. The pages that
 * include the panel bare author no heading at all, so it is optional.
 */
export default function MoreQuestions({ data }) {
  return (
    <section data-block="search" className={SECTION}>
      <div className={CONTAINER}>
        {data.heading && <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>}
        {/* ref .search-ques-wrap */}
        <div className="pt-10">
          {/* ref .search-question */}
          <div
            className="rounded-2xl border-0 border-b border-solid border-white bg-[#de297b] bg-auto bg-[position:100%] bg-no-repeat py-14 pl-14 pr-[300px] text-white max-md:px-6 max-md:py-10"
            style={{ backgroundImage: `url(${data.background})` }}
          >
            {/* ref .label-text */}
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.flower}
                width={32}
                height={32}
                alt=""
                loading="lazy"
                decoding="async"
                className="max-w-full align-middle"
              />
              <div className="text-[40px] font-medium leading-none text-white max-md:text-[20px] max-md:leading-none">
                {data.label}
              </div>
            </div>
            {/* ref .sr-sub-text */}
            <div className="pb-[55px] pt-2.5 text-2xl leading-[1.5] max-md:text-[14px] max-md:leading-[1.5]">
              {data.subText}
            </div>
            {/* ref form.search-cont.w-form */}
            <form action={data.action} className="relative mb-0 block">
              <input
                type="search"
                name={data.name}
                maxLength={256}
                placeholder={data.placeholder}
                required
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="mb-0 block h-[38px] w-full appearance-none border-0 border-b border-solid border-white bg-transparent pb-4 pr-10 text-2xl leading-[1.42857] text-white placeholder:text-white placeholder:opacity-50 focus:outline-none max-md:text-[14px] max-md:leading-[1.42857]"
              />
              <input
                type="submit"
                value=""
                aria-label="Search"
                className="absolute -top-2.5 right-0 block cursor-pointer border-0 bg-transparent bg-[length:60%] bg-center bg-no-repeat px-[18px] py-2.5"
                style={{ backgroundImage: `url(${data.searchIcon})` }}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
