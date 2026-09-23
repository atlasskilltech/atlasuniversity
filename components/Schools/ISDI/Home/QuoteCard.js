import withBreaks from '@/lib/withBreaks';

/**
 * `.testimonial-card.bgc1.isdi` — the ISDI homepage's quote card: a media panel
 * beside (above, below 768) an indigo quote panel. Two sections use it:
 *
 *   "Why the industry can’t get enough of our students"   photo  (`img.student-image`)
 *   "The People Who Know Us Best"                          video  (`.testimonial-video`)
 *
 * The media is passed in as `children`; everything else is identical and was
 * measured identical on both:
 *
 *                     >=768px                 <=767px                <=479px
 *   card              620 x 440, row, r16,    column, height auto
 *                     #193e90, clipped
 *   quote panel       flex 1, p40/32          flex 1 (content height  280, flex none
 *                                             under a 280 declaration),
 *                                             p20/12
 *   quote             p24, 20px/1.5           16px/1.5
 *                     glyph at 5/5
 *   name / role       pl24; 14px/600 + pb5 (rendered even when empty, as the
 *                     reference's empty `.stname` still takes its 5px), then
 *                     14px/400, white
 *   wash              testimonial-vector.png covering the panel, z0
 *
 * Both sections' slides are `width: auto` between 568 and 767 while the card asks
 * for `width: 100%`, so the reference card blows out past 1000px there and
 * overflows the page. The container width is used instead — the width the
 * reference renders at every other mobile size.
 */
export default function QuoteCard({ card, quoteIcon, bgImage, children }) {
  return (
    <div className="flex h-[440px] w-[620px] overflow-hidden rounded-2xl bg-[#193e90] max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col">
      {children}

      {/* ref .student-text */}
      <div className="relative flex-1 px-8 py-10 text-white max-md:h-[280px] max-md:px-3 max-md:py-5 max-sm:flex-none">
        {/* ref .st-quote */}
        <div className="relative z-[1] p-6">
          <div className="text-[20px] leading-[1.5] max-md:text-base">{card.text}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={quoteIcon}
            width={16}
            height={16}
            alt=""
            loading="lazy"
            className="absolute left-[5px] top-[5px] max-w-full align-middle"
          />
        </div>

        {/* ref .st-details */}
        <div className="relative z-[1] pl-6">
          <div className="pb-[5px] text-[14px] font-semibold leading-[1.5]">{card.name}</div>
          {/* `.st-course` is authored on every card but the B.Des Animation page's, which
              omits the element rather than leaving it empty — so this one is conditional
              while `.stname` above (empty on the ISDI homepage's first card) always renders */}
          {card.role != null && <div className="text-[14px] leading-[1.5]">{withBreaks(card.role)}</div>}
        </div>

        {/* ref img.bg-image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImage}
          width={409}
          height={359}
          alt=""
          loading="lazy"
          className="absolute inset-0 z-0 box-content h-full max-h-full w-full max-w-full object-cover align-middle"
        />
      </div>
    </div>
  );
}
