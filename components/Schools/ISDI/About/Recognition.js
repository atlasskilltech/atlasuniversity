import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';
import RecognitionTabs from './RecognitionTabs';

/**
 * "Recognition that reflects our commitment" — port of about-us/index.php:161-208.
 *
 *   section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading.mrgbtm.isdi,
 *     .primary-tabs > (menu, 4 panes))
 *
 * The widget opens on "NAAC Accreditation" (`data-current="Tab 4"`, its first
 * link). Each pane is a 575px frame with 16px corners, clipped, over a photograph
 * mirrored with `rotateY(180deg)`; the four panes are three layouts, measured with
 * each tab clicked open at 1440 / 991 / 767 / 479 / 390:
 *
 * NAAC  `.naac-text-wrap-isdi` fills the frame: row, space-between, bottom-aligned,
 *       gap 49, p 0/40/60/40, painted with the NAAC overlay artwork; award mark
 *       354x139 (40% wide at <=767, 50% at <=479); caption 24px/1.5 600 white.
 *       <=767: a column at the bottom, gap 20, px20, a 14deg black->clear gradient
 *       instead of the artwork, caption 18px with px20. (The artwork travels as a
 *       custom property so that breakpoint class can replace it — an inline
 *       `background-image` would beat it.)
 * MoU   `.mou-text-wrap` fills the frame: column at the bottom, gap 56, pb60, the
 *       14deg #000b 31% gradient; copy 494 wide, px60, 18px/1.5 300 (full width,
 *       px22, 16px at <=767); then `.slide-wrap`, a 5000px row of twelve logos
 *       (mr50, p 40/40/20/40) moved by IX2 `a-22` — the `animate-slide-wrap` keyframe.
 * UGC / AIU  logo (154 wide, ml60 -> ml20 at <=479) beside the copy: a row,
 *       space-between, bottom-aligned, gap 56, pb60, over the overlay artwork (AIU
 *       adds a #0006 wash and its own 16px corners). <=479: a column spaced
 *       `space-around` (AIU: gap 0, pb30).
 */
const TEXT = 'w-[494px] px-[60px] font-light max-md:w-full max-md:px-[22px] max-md:text-base max-md:leading-[1.5]';
const PHOTO = 'inline-block h-[575px] w-full max-w-full object-cover align-middle [transform:rotateY(180deg)]';

function Photo({ image }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading="lazy"
      decoding="async"
      className={PHOTO}
    />
  );
}

function Logo({ image, className }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading="lazy"
      decoding="async"
      className={cx('max-w-full align-middle', className)}
    />
  );
}

function Pane({ pane, overlay }) {
  const overlayStyle = { backgroundImage: `url(${overlay})` };

  return (
    /* ref .naac-wrap.isdi / .mou-wrapper.isdi */
    <div className="relative block overflow-hidden rounded-2xl text-[18px] leading-[1.5]">
      {pane.kind === 'naac' && (
        <>
          {/* ref .naac-text-wrap-isdi */}
          <div
            className="absolute inset-0 z-[1] flex items-end justify-between gap-[49px] bg-[image:var(--naac-overlay)] bg-[position:0_0] px-10 pb-[60px] text-white max-md:flex-col max-md:items-start max-md:justify-end max-md:gap-5 max-md:bg-[image:linear-gradient(14deg,#000000b3_8%,#fff0)] max-md:px-5"
            style={{ '--naac-overlay': `url(${overlay})` }}
          >
            <Logo image={pane.award} className="max-md:w-[40%] max-sm:w-1/2" />
            <div className="text-[24px] font-semibold leading-[1.5] max-md:px-5 max-md:text-[18px]">
              {withBreaks(pane.text)}
            </div>
          </div>
          <Photo image={pane.image} />
        </>
      )}

      {pane.kind === 'mou' && (
        <>
          {/* ref .mou-text-wrap */}
          <div className="absolute inset-0 z-[1] flex flex-col items-start justify-end gap-14 bg-[linear-gradient(14deg,#000000b3_31%,#fff0)] pb-[60px] text-white">
            <div className={TEXT}>{pane.text}</div>
            {/* ref .slide-wrap */}
            <div className="flex w-[5000px] items-center px-10 pb-5 pt-10 motion-safe:animate-slide-wrap">
              {pane.logos.map((logo) => (
                <Logo key={logo.src} image={logo} className="mr-[50px]" />
              ))}
            </div>
          </div>
          <Photo image={pane.image} />
        </>
      )}

      {pane.kind === 'ugc' && (
        <>
          <Photo image={pane.image} />
          {/* ref .mou-text-wrap-isdi */}
          <div
            className="absolute inset-0 z-[1] flex items-end justify-between gap-14 bg-[position:0_0] pb-[60px] text-white max-sm:flex-col max-sm:items-start max-sm:justify-around"
            style={overlayStyle}
          >
            <Logo image={pane.logo} className="ml-[60px] w-[154px] max-sm:ml-5" />
            <div className={TEXT}>{pane.text}</div>
          </div>
        </>
      )}

      {pane.kind === 'aiu' && (
        <>
          {/* ref .mou-text-wrap.isdi */}
          <div
            className="absolute inset-0 z-[1] flex items-end justify-between gap-14 rounded-2xl pb-[60px] text-white max-sm:flex-col max-sm:items-start max-sm:justify-around max-sm:gap-0 max-sm:pb-[30px]"
            style={{ backgroundImage: `url(${overlay}), linear-gradient(#0006, #0006)` }}
          >
            <Logo image={pane.logo} className="ml-[60px] w-[154px] max-sm:ml-5" />
            <div className={TEXT}>{pane.text}</div>
          </div>
          <Photo image={pane.image} />
        </>
      )}
    </div>
  );
}

export default function Recognition({ data }) {
  return (
    <section data-block="recognition" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        {/* ref .sub-heading.mrgbtm.isdi */}
        <div className="pb-14 pr-[50px] text-2xl font-light leading-[1.4] max-lg:pb-5 max-md:mb-5 max-md:p-0 max-md:text-base max-md:leading-[1.5] max-sm:pb-5">
          {data.sub}
        </div>
        <RecognitionTabs
          tabs={data.tabs.map(({ label, currentWeight, smallText }) => ({ label, currentWeight, smallText }))}
          panes={data.tabs.map((tab) => (
            <Pane key={tab.label} pane={tab.pane} overlay={data.overlay} />
          ))}
          initial={data.current}
        />
      </div>
    </section>
  );
}
