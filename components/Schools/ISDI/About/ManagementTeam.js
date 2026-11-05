import { cx } from '@/lib/cx';
import Carousel from '@/components/Carousel/Carousel';
import CardTypeE from '../CardTypeE';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';

/**
 * Our Management Team — port of about-us/index.php:621-752
 * (`div#isme-faculty.section > .container > (.head-wrap.top > .tt-wrap >
 *   h2.h2-tag.mrg16.isdi, .swiper.common-swiper > 17 x .card-type-e)`).
 *
 * `.card-type-e` is the /life-at-atlas card (`components/Life/PeopleCarousel`), on
 * ISDI's `pink` variant: a #ec1376 ring, no role line, and ISDI's slider (no
 * autoplay, dot row below 569) — so it is drawn here rather than skinning that one.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390 (the card never changes):
 *   .head-wrap.top    row, space-between, top-aligned    <=767 column, gap 16,
 *                                                        mb16; `.tt-wrap` mb20
 *                                                        (+ mr20 at <=479)
 *   h2                `.h2-tag.mrg16.isdi`
 *   slider            pt56 (40 at <=767), 24px between cards
 *   card              242 x 360, r16, clipped, 300
 *   ring              242 x 242, r100%, #ec1376, line-height 1; photo cover
 *   detail            centred, black, pt24; name 20px/1.2 600, pb4
 *
 * The slider sits inside `.container` upstream with `overflow: visible`, so the
 * track starts on the container edge and bleeds right — `Carousel` as a sibling
 * of the container reproduces exactly that.
 */
export default function ManagementTeam({ data }) {
  return (
    <div id={data.id} data-block="management" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper */}
      <div className="pt-14 max-md:pt-10">
        <Carousel autoplay={false} bullets="isdi">
          {data.people.map((person) => (
            /* ref .card-type-e.swiper-slide — the card is `../CardTypeE`, shared with
               /atlas-isdi-advantage's "Meet your campus family"; this page's cards
               author no role line, so none is rendered */
            <CardTypeE key={person.name} person={person} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
