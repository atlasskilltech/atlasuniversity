import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION } from './ui';

/**
 * `.faq-banner` (`data-wf--single-banner--variant="pink"`) — the full-bleed pink
 * call-to-action band. index.php uses it twice with only the copy and the link
 * changing: "Class of 2025: Ready to Redefine What's Next" (index.php:2545-2556)
 * and "Everything you wanted to know about ISDI…" (index.php:3012-3023).
 *
 *                     >=768px                         <=767px
 *   band              #df287b, py60                   py26
 *   heading           `.h2-tag.mrgtbm0.wht`: 40px/1.2  18px/1.4
 *                     weight 500, white, mb0
 *   button            `.btn-wraper.padt24` (inline-block, pt24) > blue pill,
 *                     h56, 16px/600 label               h40, 12px label
 *   photo             absolute, full band height,     display: none
 *                     pinned right, stretched to its
 *                     own width (`object-fit: fill`)
 *
 * The second instance's section carries `.padtp0`, which header.php's
 * `.isdi-page .section { padding: 50px 0 }` overrides, so both measure the same.
 */
/*
 * `tone="blue"` is the same banner on its `blue` variant (`w-variant-3401ae25…`) — the ISME
 * homepage's "Everything you wanted to know about ATLAS ISME." — #193e90 behind a mint pill
 * (`button.variant`) that carries the white down-arrow, inverted to black (`.btn-pr-icon`,
 * 16px, 12 at <=767). Measured identical in every other property at 1440 / 767 / 390.
 */
const TONE = { pink: 'bg-[#df287b]', blue: 'bg-[#193e90]' };

/* `sectionClass` — the ISME sheet's `.section` is 60/40 rather than ISDI's 50 */
export default function PinkBanner({ data, block, tone = 'pink', sectionClass = SECTION }) {
  return (
    <div data-block={block} className={sectionClass}>
      <div className={`relative ${TONE[tone]} py-[60px] max-md:py-[26px]`}>
        <div className={CONTAINER}>
          <h2 className="relative m-0 text-[40px] font-medium leading-[1.2] text-white max-md:text-[18px] max-md:leading-[1.4]">
            {withBreaks(data.heading)}
          </h2>
          {data.sub && (
            /* ref .faq-sub-text — 24px/1.4 300 white, pt12 (16px <=767); the
               parents-corner banner has it, the homepage's two do not */
            <div className="relative pt-3 text-[24px] font-light leading-[1.4] text-white max-md:text-[16px]">
              {withBreaks(data.sub)}
            </div>
          )}
          {/* ref .btn-wraper.padt24 > .faq-btn-slot */}
          <div className="mt-auto inline-block pt-6">
            <div>
              <PrimaryButton
                href={data.button.href}
                variant={data.button.variant ?? 'blue'}
                icon={data.button.icon}
                iconClassName={data.button.icon ? 'invert' : undefined}
              >
                {data.button.label}
              </PrimaryButton>
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.image.src}
          srcSet={data.image.srcSet}
          sizes="(max-width: 601px) 100vw, 601px"
          width={601}
          height={305}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 right-0 top-0 z-0 h-full w-auto max-w-full object-fill max-md:hidden"
        />
      </div>
    </div>
  );
}
