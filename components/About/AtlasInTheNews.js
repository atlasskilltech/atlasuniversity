import { aboutContent } from '@/lib/aboutContent';
import Carousel from '@/components/Carousel/Carousel';
import SmartLink from '@/components/SmartLink';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "ATLAS in the News" — port of `about-us.php:545-719`
 * (`section.section > .container > (h2.h2-tag.mrgbtm0, .container >
 *   .swiper.common-swiper > 6x .card-news-atlas)`).
 *
 * **Not the homepage's news card.** The homepage uses `.card` (295px, white,
 * teal "Read now" pill); this page uses `.card-news-atlas` — a 272x400 grey
 * tile with the masthead logo on top, a 156px photo, the headline, and a footer
 * rule with the date and a round arrow button linking out to the article.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .card-news-atlas         272 x 400, #f2f2f2,         identical — the card
 *                            radius 32px 0, py 8         never goes fluid
 *   .cn-logo                 80 x 32, mx 96, mb 8        same
 *   .cn-image                272 x 156, cover            same
 *   .cdnw-cont               px 12                       same
 *   .cn-title                16px/1.5, 500, padding      same
 *                            14 23, clipped
 *   .cn-date                 border-top 1px #000,        same
 *                            mx 23, mt 12, py 12
 *   .cn-dt                   12px/1.5                    same
 *   .icon-button             32 x 32 cyan circle         28 x 28
 *   .bt-icon                 25 x 25                     20 x 20
 *
 * The card also declares `border: 1px #d9d9d9` with no border-style, so nothing
 * is painted and no border class is added. The slider is a `.common-swiper`
 * nested inside a second `.container`, so unlike the homepage's carousels the
 * track starts one container-inset further in — reproduced by keeping the
 * Carousel inside `.container` here.
 */
function NewsCard({ item }) {
  return (
    /* ref .card-news-atlas.swiper-slide */
    <article className="relative flex h-[400px] w-[272px] flex-none flex-col overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-[#f2f2f2] py-2">
      {/* ref .cn-logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.logo.src}
        alt={item.logo.alt}
        loading="lazy"
        className="mx-auto mb-2 block h-8 w-auto object-contain"
      />

      {/* ref .cn-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image.src}
        alt={item.image.alt}
        loading="lazy"
        className="h-[156px] w-full flex-none object-cover"
      />

      {/* ref .cdnw-cont */}
      <div className="px-3">
        {/* ref .cn-title */}
        <div className="h-[110px] overflow-hidden px-[23px] py-3.5 font-medium leading-[1.5] text-[#333]">
          {item.title}
        </div>
      </div>

      {/* ref .cn-date */}
      <div className="mx-[23px] mt-3 flex items-center justify-between border-t border-black py-3">
        {/* ref .cn-dt */}
        <div className="text-xs leading-[1.5] text-[#333]">{item.date}</div>

        {/* ref a.icon-button */}
        <SmartLink
          href={item.href}
          newTab
          aria-label={item.title}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-[30px] bg-atlas-cyan max-md:h-7 max-md:w-7"
        >
          {/* ref img.bt-icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/atlas-news/arrow-downward.svg"
            alt=""
            className="h-[25px] w-[25px] max-md:h-5 max-md:w-5"
          />
        </SmartLink>
      </div>
    </article>
  );
}

export default function AtlasInTheNews() {
  const { news } = aboutContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrgbtm0 */}
        <h2 className={`mb-0 ${H2}`}>{news.heading}</h2>

        {/* ref the nested .container > .swiper.common-swiper */}
        <Carousel className="mt-14 max-md:mt-10">
          {news.items.map((item) => (
            <NewsCard key={item.href} item={item} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
