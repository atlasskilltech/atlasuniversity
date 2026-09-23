import { cx } from '@/lib/cx';

/**
 * ISDI's `.card-type-d` — a portrait under a scrim carrying a name, a role, a
 * hairline rule and a company logo. Not `components/ui/AdvisorCard`, which is the
 * same class on ATLAS's `a36b0748…` variant (272 wide, `32px 0` corners).
 *
 * Three places render it, measured identical in every property:
 *   /schools/isdi                "Steering Excellence, Guiding ISDI"   marquee
 *   /schools/isdi/about-us       both advisory boards                  marquee
 *   …/b-des/accessory-design-&-craft   the Success Stories tab pane    carousel
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *   card       324 x 350 (min = max height), r16, clipped, white text
 *   scrim      from 70px down (the declared `height: 80%`): transparent ->
 *              #002637 at 90%, padding 24, content bottom-aligned
 *   name       20px/1.5, 600, pb4
 *   role       14px/1.5
 *   rule       40% x 1px white, my16 (`.cd-tyd-posi`, an empty element)
 *   logo       its intrinsic size
 *   portrait   `width/height: 100%` against a card sized by min/max-height, so
 *              in standards mode the percentage resolves to `auto` and the
 *              photograph keeps its own ratio (324 x 343 here) under the scrim
 *   play       56px, 24/24 from the top-right, on the cards that author an icon
 *              inside their `a.play-icon`; `data-video` is picked up by the
 *              footer's shared VideoModal, so no section needs JS of its own
 *
 * `variant="isdi-black"` is the About page's ISDI board (`w-variant-84b36011…`):
 * an `overlay-blk.png` scrim instead of the gradient, the name as an inline #ec1376
 * label, and a grayscale portrait at `z-index: -1` — which is why that card
 * isolates itself, so the negative z stays inside it.
 */
const BLACK_SCRIM =
  "bg-[url('/assets/images/schools/isdi/about/advisory/overlay-blk.png')] bg-cover bg-[position:50%_100%] bg-no-repeat";

export default function PersonCard({ person, variant = 'isdi', playLabel, playAlt }) {
  const black = variant === 'isdi-black';

  return (
    /* ref .card-type-d.swiper-slide (+ .swiper-slide's min/max height) */
    <div
      className={cx(
        'relative max-h-[350px] min-h-[350px] w-[324px] overflow-hidden rounded-2xl text-white',
        black && 'isolate'
      )}
    >
      {person.video && (
        /* ref a.play-icon */
        <a
          href={person.video.href}
          data-video={person.video.url}
          aria-label={playLabel ?? 'Play student video'}
          className="absolute right-6 top-6 z-[1] block cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icons/play-button.svg"
            width={56}
            height={56}
            alt={playAlt ?? 'Play button icon'}
            loading="lazy"
          />
        </a>
      )}

      {/* ref .cd-tyd-txt-wrap */}
      <div
        className={cx(
          'absolute inset-x-0 bottom-0 top-[70px] z-[1] flex items-end p-6',
          black ? BLACK_SCRIM : 'bg-[linear-gradient(#0000,#002637_90%,#002637)]'
        )}
      >
        {/* ref .cd-tyd-detail */}
        <div className="w-full flex-none">
          <div
            className={cx(
              'text-[20px] font-semibold leading-[1.5]',
              black ? 'mb-2 inline-block bg-[#ec1376] px-[5px] py-px' : 'pb-1'
            )}
          >
            {person.name}
          </div>
          <div className="text-[14px] leading-[1.5]">{person.role}</div>
          {/* ref .cd-tyd-posi — an empty 40% x 1px rule */}
          <div className="my-4 flex w-[40%] items-start justify-between border-0 border-t border-solid border-white bg-white" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={person.logo.src}
            width={person.logo.width}
            height={person.logo.height}
            alt={person.logo.alt}
            loading="lazy"
            decoding="async"
            className="block max-w-full"
          />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={person.photo.src}
        width={person.photo.width}
        height={person.photo.height}
        alt={person.photo.alt}
        loading="lazy"
        decoding="async"
        className={cx(
          'inline-block h-auto w-full max-w-full object-cover align-middle',
          black && 'relative -z-[1] grayscale'
        )}
      />
    </div>
  );
}
