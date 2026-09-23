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
export default function PinkBanner({ data, block }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className="relative bg-[#df287b] py-[60px] max-md:py-[26px]">
        <div className={CONTAINER}>
          <h2 className="relative m-0 text-[40px] font-medium leading-[1.2] text-white max-md:text-[18px] max-md:leading-[1.4]">
            {withBreaks(data.heading)}
          </h2>
          {/* ref .btn-wraper.padt24 > .faq-btn-slot */}
          <div className="mt-auto inline-block pt-6">
            <div>
              <PrimaryButton href={data.button.href} variant="blue">
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
