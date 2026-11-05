import { CONTAINER, SUB_H2 } from '@/components/Home/SectionHead';
import Carousel from '@/components/Carousel/Carousel';

/*
 * ref international-summerschool.php:942-947 `.summer-intro-section` — directly under the hero:
 * padding 40 20 (36 16 at <=767), white; `.summer-intro-wrap` max-width 1000, centred; title h2
 * 42px/1.2 700 #1a1a4b, 16px below (28px at <=767); subtitle 22px/1.4 #444 (17px at <=767).
 */
export function SummerIntro({ data }) {
  return (
    <div className="w-full bg-white px-5 py-10 max-md:px-4 max-md:py-9">
      <div className="mx-auto max-w-[1000px] text-center">
        <h2 className="m-0 mb-4 text-[42px] font-bold leading-[1.2] text-[#1a1a4b] max-md:text-[28px]">{data.title}</h2>
        <p className="m-0 text-[22px] leading-[1.4] text-[#444] max-md:text-[17px]">{data.subtitle}</p>
      </div>
    </div>
  );
}

/*
 * ref international-summerschool.php:1894-1979 "Global Voices, Student Stories" —
 * `h2.h2-tag.mrgbtm0` + an EMPTY `h2.sub-heading` (a real box: margin 20/10, and 20px of vertical
 * padding below 768) over a `.swiper.common-swiper-full.mrgtp0` of `.testimonial-card.bgc1.atlas`.
 * This page's <style> redefines the card, so it is local rather than `ui/TestimonialCard`:
 *   >=768  620x500 row: photo half (310) + `.student-text` (flex 1, padding 15 12) holding
 *          `.st-quote` (padding 24; 16px/24) and `.st-details` (padding-left 24): an empty
 *          `.stname.isdi` (pb 5), the name (20px, `mb-3` = Bootstrap's 16px; bold where authored
 *          in a <strong>) and the university logo (inline: white, 70px tall, 5px padding)
 *   <=767  a column the container's width: photo 550 tall, text panel `height: 350px` — but it keeps
 *          `flex: 1` (basis 0) in the column, which beats that height until the sheet's <=479 rule
 *          sets `flex: none`, so between 480 and 767 the panel is its content's height (243 at 568);
 *          padding 10, 12px/18. Bullets: Swiper's, absolute 6px under the slider, at <=568.
 * The photographs are `atlas-global/wp-content` refs that 403 for every visitor, so production paints
 * an empty broken-image box; the slot is kept at its size, empty, rather than shipping a broken image.
 */
function VoiceCard({ card }) {
  return (
    <div className="flex h-[500px] w-[620px] flex-none overflow-hidden rounded-br-[32px] rounded-tl-[32px] bg-[#41418e] max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col">
      <div className="w-1/2 flex-[0_1_auto] max-md:h-[550px] max-md:w-full" aria-hidden="true" />
      <div className="relative max-h-full flex-1 px-3 py-[15px] text-white max-md:h-[350px] max-md:p-[10px] max-sm:flex-none">
        <div className="relative z-[1] p-6 max-md:w-full">
          <div className="text-[16px] leading-[24px] max-md:whitespace-break-spaces max-md:text-[12px] max-md:leading-[18px]">{card.quote}</div>
        </div>
        <div className="relative z-[1] pl-6 max-md:w-full">
          <div className="pb-[5px]" />
          <div className="mb-[16px] text-[20px] leading-[30px] text-white">
            {card.nameStrong ? <strong className="font-bold">{card.name}</strong> : card.name}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.logo} alt="" loading="lazy" className="block bg-white p-[5px]" style={{ height: '70px' }} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/campus/stats/vector-atlas-2.png" alt="" loading="lazy" className="absolute inset-0 z-0 block h-full w-full object-cover" />
      </div>
    </div>
  );
}

export function SummerVoices({ heading, cards }) {
  return (
    <section className="block overflow-hidden py-[60px] max-md:py-10">
      <div className={CONTAINER}>
        <h2 className="relative mb-0 mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a] max-md:text-[36px]">{heading}</h2>
        <div className={SUB_H2} aria-hidden="true" />
      </div>
      <Carousel bullets="isdi-overlay">
        {cards.map((c) => <VoiceCard key={c.name} card={c} />)}
      </Carousel>
    </section>
  );
}
