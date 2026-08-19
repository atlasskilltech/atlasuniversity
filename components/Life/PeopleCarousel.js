import Carousel from '@/components/Carousel/Carousel';
import { cx } from '@/lib/cx';

/**
 * `.card-type-e` — a circular portrait over a centred name and role, used twice
 * on /life-at-atlas inside a `.common-swiper`:
 *
 *   "The council members"              `life-at-atlas.php:499-543`  (5 people)
 *   "Your Support System, Away…"       `life-at-atlas.php:746-798`  (6 people)
 *
 * The two differ only in the Webflow variant on the card, and that variant only
 * changes two things — hence `tone`:
 *
 *                          `atlas-blue` (council)   `mint` (support)
 *   .cd-tye-image-wrap     background #5cbdca       #07f6a0
 *   .cd-tye-text           font-weight 600          700
 *
 * ── Measured cascade — the card does not change with width ────────────────
 *   .card-type-e.swiper-slide  242 x 360, radius 16, clipped, #fff, 300
 *   .cd-tye-image-wrap         100% x 242, border-radius 100%, clipped,
 *                              line-height 1
 *   .cd-tye-image              100% x 100%, cover
 *   .cd-tye-detail             100%, centred, #000, padding-top 24
 *   .cd-tye-text               20px/1.2, padding-bottom 4
 *   .cd-tye-tx                 18px/1.5, 300
 *
 * `autoplay` is off on /advantages/atlas-internationalisation, whose own
 * trailing script stops every `.common-swiper` and `.common-swiper-full` on the
 * page a second after load.
 */
const TONE = {
  'atlas-blue': { ring: 'bg-atlas-cyan', name: 'font-semibold' },
  mint: { ring: 'bg-atlas-mint', name: 'font-bold' },
};

export default function PeopleCarousel({ people, tone = 'atlas-blue', autoplay = true, bleed = true }) {
  const style = TONE[tone];

  return (
    /* ref .swiper.common-swiper */
    <Carousel className="pt-14 max-md:pt-10" autoplay={autoplay} bleed={bleed}>
      {people.map((person) => (
        /* ref .card-type-e.swiper-slide */
        <div
          key={person.name}
          className="relative h-[360px] w-[242px] overflow-hidden rounded-2xl font-light text-white"
        >
          {/* ref .cd-tye-image-wrap */}
          <div className={cx('h-[242px] w-full overflow-hidden rounded-[100%] leading-none', style.ring)}>
            {/* ref img.cd-tye-image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.image.src}
              alt={person.image.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          {/* ref .cd-tye-detail */}
          <div className="w-full pt-6 text-center text-black">
            {/* ref .cd-tye-text */}
            <div className={cx('pb-1 text-[20px] leading-[1.2]', style.name)}>{person.name}</div>
            {/* ref .cd-tye-tx */}
            <div className="text-[18px] font-light leading-[1.5]">{person.role}</div>
            {/* ref .img-logo-wrap — empty in the reference on both carousels */}
            <div className="w-full" />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
