import { industryOnCampus } from '@/lib/homeContent';
import Carousel from '@/components/Carousel/Carousel';
import SectionHead, { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "Industry on Campus" — port of reference/index.php:2641-2835
 * (`section.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper.mrgtp0)`).
 *
 * Ten cards built on `.port-card-m-wrap-atlas` — the same class the programme
 * carousels use — but **without** the `.port-card-m-wrap-atlasv2` modifier that
 * index.php's inline <style> adds there. That single difference changes a lot:
 *
 *                        programmes (…v2)        here (base class)
 *   card height          367px                  520px
 *   image                object-contain,         object-cover, height 100%
 *                        height auto (295x295)   (fills the whole card)
 *   bar accent           school colour           `.port-card-m-txt-wrap-atlas`
 *                                                default #41418e
 *   notch fill           school colour           `currentColor` off
 *                                                `.port-card-m-arrow-atlas`'s
 *                                                own #41418e
 *
 * So the photo fills the card and the indigo bar sits over its lower edge,
 * rather than the bar sitting below a square image.
 *
 * `.pcm-tp-wrap-atlas` pins the company logo across the top — it is
 * `justify-content: flex-end`, so the logo sits top-**right**.
 */
function SpeakerCard({ item }) {
  return (
    /* ref .port-card-m-wrap-atlas (base, no v2) */
    <div className="relative block h-[520px] w-[295px] flex-none items-end justify-center overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-base text-white">
      {/* ref .pcm-tp-wrap-atlas — top strip, logo pushed right */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-end px-5 pt-5">
        {/* ref .port-card-m-comp-logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.logo}
          alt={item.logoAlt}
          loading="lazy"
          decoding="async"
          className="flex-none"
        />
      </div>

      {/* ref .port-card-m-txt-wrap-atlas — default indigo, no school accent */}
      <div className="absolute inset-x-0 bottom-0 flex w-full flex-row items-end bg-[#41418e] p-6">
        {/* ref .port-card-m-detail-atlas */}
        <div className="relative w-full flex-none">
          {/* ref .port-card-m-text-atlas */}
          <div className="mb-0 text-2xl font-semibold normal-case leading-[1.2] text-white">
            {item.name}
          </div>
          {/*
            ref .port-card-m-posi-atlas. Its `border-top: 0.5px #e8e8e8`
            declares a width and a colour but no border-*style*, so it computes
            to `none` / 0px and paints nothing — no border class here.
          */}
          <div className="pt-2.5 text-sm font-normal leading-[1.4] text-white">
            {item.position}
          </div>
        </div>

        {/* ref .port-card-m-arrow-atlas — `currentColor` resolves to its own
            #41418e, so the notch matches the bar */}
        <div className="absolute -top-[19px] left-[30px] h-[21px] w-[29px] scale-[0.8] text-[#41418e]">
          <svg
            width="29"
            height="21"
            viewBox="0 0 29 21"
            fill="none"
            aria-hidden="true"
            className="block"
          >
            <path
              d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* ref .port-card-m-image-atlas — base rule: cover, 100% x 100% */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="mx-auto block h-full w-full object-cover"
      />
    </div>
  );
}

export default function IndustryOnCampus() {
  const { heading, subheading, items } = industryOnCampus;

  return (
    /* ref section.section */
    <section className={SECTION}>
      <div className={CONTAINER}>
        <SectionHead heading={heading} subheading={subheading} />
      </div>

      <Carousel>
        {items.map((item) => (
          <SpeakerCard key={`${item.name}-${item.position}`} item={item} />
        ))}
      </Carousel>
    </section>
  );
}
