import withBreaks from '@/lib/withBreaks';

/**
 * `.card-type-e` on ISDI's `pink` variant — a circular portrait in a #ec1376 ring
 * over a centred caption.
 *
 * Extracted from `About/ManagementTeam` when /atlas-isdi-advantage's "Meet your
 * campus family" turned out to use the same card. Measured identical on both at
 * 1440 / 768 / 390, and it never changes with width:
 *   card     242 x 360, r16, clipped, weight 300
 *   ring     242 x 242, radius 100%, #ec1376, line-height 1; photo cover
 *   detail   `.cd-tye-detail` centred, black, pt24 -> 79 tall with a role line
 *   name     `.cd-tye-text` 20px/1.2 600, pb4
 *   role     `.cd-tye-tx` 18px/1.5 300 — authored on this page and NOT on the
 *            About page, whose cards carry only a name, so it is optional
 *   logo     `.img-logo-wrap` is empty on both; an empty element is still a box,
 *            so it is rendered
 */
export default function CardTypeE({ person }) {
  return (
    /* ref .card-type-e.swiper-slide */
    <div className="relative h-[360px] w-[242px] overflow-hidden rounded-2xl font-light text-white">
      {/* ref .cd-tye-image-wrap */}
      <div className="h-[242px] w-full overflow-hidden rounded-[100%] bg-[#ec1376] leading-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={person.image.src}
          width={person.image.width}
          height={person.image.height}
          alt={person.image.alt}
          loading="lazy"
          decoding="async"
          className="inline-block h-full w-full max-w-full object-cover align-middle"
        />
      </div>
      {/* ref .cd-tye-detail */}
      <div className="w-full pt-6 text-center text-black">
        {/* ref .cd-tye-text */}
        <div className="pb-1 text-[20px] font-semibold leading-[1.2]">{withBreaks(person.name)}</div>
        {person.role && (
          /* ref .cd-tye-tx */
          <div className="text-[18px] font-light leading-[1.5]">{withBreaks(person.role)}</div>
        )}
        {/* ref .img-logo-wrap — empty in both references */}
        <div className="w-full" />
      </div>
    </div>
  );
}
