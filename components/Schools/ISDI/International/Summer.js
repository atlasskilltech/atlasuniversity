import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import CardTypeF from '@/components/ui/CardTypeF';
import IconSection from '../About/IconSection';
import StatsBand from '../StatsBand';
import { CONTAINER, H2, H2_MB, SUB } from '../Home/ui';
import { COMMON_WRAPPER, Runs } from './ui';

/**
 * "Summer School Experience" / "Design Your Summer at the World's Top Campuses"
 * (`atlas-isdi-advantage/internationalisation/index.php:589-739`).
 *
 *   section#summer-school.section >
 *     .icon-heading
 *     .common-wrapper >
 *       (.container-15 > (h2#animate.h2-tag.mrg16.isdi, .sub-heading),
 *        .common-wrapper > .top-cards-wrapper > 3 x .head-top-card)
 *     .swiper.common-swiper.mrgtp-0 > 9 x .card-type-f (base variant)
 *
 * **There is no wrapper between the icon heading and the content** — the
 * `.common-wrapper` and the carousel are direct siblings of `.icon-heading`, so this
 * is `IconSection`'s `tone="none"`. `.white-wrapper` would have clipped the
 * bleeding carousel.
 *
 * The figures band is the shared `../StatsBand` on its `.sm-text-isme-2.isdi-center`
 * label: one centred 24px line per card and no `.large-text` at all. That line keeps
 * 24px at EVERY width, unlike `.sm-text-isme`, and the band is a bare
 * `.top-cards-wrapper` (`padding-bottom: 60px`) rather than the `.padbtm0` every
 * other instance carries — hence `label` and `padBottom`. It is also nested inside
 * this section rather than being a block of its own, so it carries no `data-block`.
 *
 * The carousel is `.mrgtp-0` (no top padding at any width) and is full-bleed — see the
 * comment on it: it is the one carousel on the page that does NOT align to the
 * container, because this section holds no `.container` at all.
 */
export default function Summer({ data }) {
  return (
    <IconSection
      id="summer-school"
      block="summer"
      icon={data.icon.image}
      title={data.icon.title}
      tone="none"
    >
      {/* ref .common-wrapper */}
      <div className={COMMON_WRAPPER}>
        {/* ref .container-15 */}
        <div className={CONTAINER}>
          <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
          <div className={SUB}>
            <Runs value={data.sub} />
          </div>
        </div>

        {/* ref .common-wrapper > .top-cards-wrapper */}
        <div className={COMMON_WRAPPER}>
          <StatsBand data={data.stats} block={null} label="isme-2-center" padBottom />
        </div>
      </div>

      {/*
        * ref .swiper.common-swiper.mrgtp-0 — full-bleed and **not aligned to the
        * container**: this section holds no `.container` at all, so Swiper lays the
        * track out from the viewport edge and the first card starts at x=0 (measured
        * 0 on production at 1440, against 99 for every other carousel on the page).
        * `bleed={false}` drops `Carousel`'s container inset and keeps the 24px Swiper
        * writes as `margin-right` on every slide including the last.
        */}
      <Carousel autoplay={false} bleed={false} bullets="isdi">
        {data.gallery.map((card, i) => (
          <CardTypeF key={`${i}-${card.image.src}`} card={card} variant="base" />
        ))}
      </Carousel>
    </IconSection>
  );
}
