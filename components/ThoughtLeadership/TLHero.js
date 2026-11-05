/*
 * ref reference/thought-leaderships/thought-leaderships/index.php hero — the ATLAS Thought
 * Leadership hero. `.inner-header-wrapper.mrgbtm` (measured 658px tall on production, margin-bottom
 * 56 / 40 at <=767) holds a full-cover `.header-image-inner` behind an `.inner-header-cover`
 * gradient scrim. The scrim is `linear-gradient(transparent, #000000e6)` and covers the bottom
 * HALF at desktop (top: 329px of 658) and the FULL hero at <=767. Inside it, `.container.btm-flext`
 * (max-w 1366, px 62 -> 22, pb 0, align-end, a column at <=767) holds the single `h1.h1-tag`
 * (56px/1.2/400 white; 28px/1.5/600 at <=767).
 */
export default function TLHero({ hero }) {
  return (
    <section className="relative mb-14 h-[658px] w-full overflow-hidden max-md:mb-10">
      {/* ref img.header-image-inner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.image.src}
        srcSet={hero.image.srcSet}
        sizes={hero.image.sizes}
        alt={hero.image.alt || ''}
        className="absolute inset-0 block h-full w-full object-cover"
      />
      {/* ref .inner-header-cover — gradient scrim, bottom half (full at <=767) */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end bg-[linear-gradient(#00000000,#000000e6)] max-md:h-full">
        {/* ref .container.btm-flext */}
        <div className="mx-auto flex w-full max-w-[1366px] items-end justify-between gap-[100px] px-[62px] pb-0 max-md:flex-col max-md:items-start max-md:gap-[22px] max-md:px-[22px]">
          {/* ref h1.h1-tag */}
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {hero.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
