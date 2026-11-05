import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import PhotoGallery from '../PhotoGallery';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from './ui';

/**
 * "Your Future, In Action" — port of reference/schools/isdi/index.php:3587-3670.
 *
 *   section.section > .container > .head-wrap.mrgbtm (title block + button)
 *     > .instagram-wrapper.mrgtp0.mobile-vert-scroll > .grid-gallery-flex
 *       > 4 x .grid-column > 2 x .img-wrap (photo, badge, caption)
 *
 * The wall itself is `../PhotoGallery`, which /programs/undergraduate shares; its
 * three layouts and the card's badge / caption / logo are documented there.
 *
 * `.head-wrap.mrgbtm` stacks below 768 with the button spanning the container.
 */

export default function FutureInAction({ data }) {
  return (
    <section data-block="future" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap.mrgbtm */}
        <div className="mb-14 flex items-end justify-between max-md:mb-5 max-md:flex-col max-md:items-stretch max-md:justify-start">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
            <div className={SUB}>{data.sub}</div>
          </div>
          <ButtonRegular href={data.button.href} variant="pink-cta">
            {data.button.label}
          </ButtonRegular>
        </div>

        {/* ref .instagram-wrapper.mrgtp0.mobile-vert-scroll */}
        <PhotoGallery columns={data.columns} />
      </div>
    </section>
  );
}
