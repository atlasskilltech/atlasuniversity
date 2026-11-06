import withBreaks from '@/lib/withBreaks';

/**
 * `.card-type-e` on its `atlas-blue` variant — a #5cbdca circular portrait over a centred name and
 * role. The same card `components/Life/PeopleCarousel` renders inside a carousel; here it sits in a
 * wrapping row, so it is a standalone card. Measured on /management-team at 1440 / 768 / 390, where
 * it does not change with width:
 *
 *   .card-type-e          242 x 360, radius 16, clipped, weight 300
 *   .cd-tye-image-wrap    242 x 242, border-radius 100%, #5cbdca, line-height 1
 *   .cd-tye-image         100% x 100%, cover
 *   .cd-tye-detail        centred, #000, padding-top 24
 *   .cd-tye-text          20px/1.2, 600, padding-bottom 4
 *   .cd-tye-tx            18px/1.5, 300
 *   .img-logo-wrap        empty in the reference on every card — still rendered, 0 tall
 */
export default function TeamCard({ person }) {
  return (
    /* ref .card-type-e(.swiper-slide) */
    <div id={person.id} className="relative h-[360px] w-[242px] flex-none overflow-hidden rounded-2xl font-light text-white">
      {/* ref .cd-tye-image-wrap */}
      <div className="h-[242px] w-full overflow-hidden rounded-[100%] bg-atlas-cyan leading-none">
        {/* ref img.cd-tye-image — the reference authors alt="" on every portrait */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={person.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>

      {/* ref .cd-tye-detail */}
      <div className="w-full pt-6 text-center text-black">
        {/* ref .cd-tye-text */}
        <div className="pb-1 text-[20px] font-semibold leading-[1.2]">{person.name}</div>
        {/* ref .cd-tye-tx */}
        <div className="text-[18px] font-light leading-[1.5]">{withBreaks(person.role)}</div>
        {/* ref .img-logo-wrap */}
        <div className="w-full" />
      </div>
    </div>
  );
}
