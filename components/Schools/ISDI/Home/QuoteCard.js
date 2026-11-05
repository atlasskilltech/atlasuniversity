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
/*
 * `variant="isme"` — the ISME homepage's `.testimonial-card.bgc1` (no `.isdi`): square corners and
 * the name and course lines in #07f6a0. Measured at 1440 / 767 / 390, every box identical.
 */
/*
 * `variant="isme-student"` — the ISME programme pages' `.student-card.bgc1`, a photograph
 * (`img.student-image`, passed as children) beside the quote. Unlike `.testimonial-card` it is not
 * 440 tall: `.student-card.bgc1 { height: auto }` lets the card follow the taller of the photo (50%
 * wide, its own ratio) and the quote, and nothing clips it. At <=767 it is a block: the photo
 * 320 tall over the 280 quote panel. Name and course in #07f6a0, as on `isme`.
 */
const CARD = {
  default:
    'flex h-[440px] w-[620px] overflow-hidden rounded-2xl bg-[#193e90] max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col',
  isme: 'flex h-[440px] w-[620px] overflow-hidden bg-[#193e90] max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col',
  'isme-student': 'flex w-[620px] flex-[0_0_auto] bg-[#193e90] max-md:block max-md:w-[calc(100vw-44px)]',
  /* `.student-card.bgc1` holding a background VIDEO (ISME Parents Corner / Non-Mumbai): 620 x 440 beside
     the 325px video, and at <=767 a block — the video over the quote panel, which keeps its 280px
     (measured 440 + 280 = 720 at 700 and 390). */
  'isme-student-video': 'flex h-[440px] w-[620px] bg-[#193e90] max-md:block max-md:h-auto max-md:w-[calc(100vw-44px)]',
};

export default function QuoteCard({ card, quoteIcon, bgImage, children, variant }) {
  const isme = variant === 'isme' || variant === 'isme-student' || variant === 'isme-student-video';
  return (
    <div className={CARD[variant] ?? CARD.default}>
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
        <div className={isme ? 'relative z-[1] pl-6 text-atlas-mint' : 'relative z-[1] pl-6'}>
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
