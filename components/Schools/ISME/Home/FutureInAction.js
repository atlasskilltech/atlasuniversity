import PhotoGallery from '@/components/Schools/ISDI/PhotoGallery';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * ISME "Your Future, In Action" — `section.section > .container > (.head-wrap.mrgbtm,
 * .instagram-wrapper.mrgtp0.mobile-vert-scroll)` in reference/schools/isme/index.php. The wall is
 * the ISDI `PhotoGallery` (the same four-column `.grid-gallery-flex`, horizontal scroller at
 * <=540) on its `isme` skin: square photographs and mint caption plates.
 */
export default function FutureInAction({ data, block = 'future' }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} sub={data.sub} button={data.button} align="base" margin="mrgbtm" />
        <PhotoGallery columns={data.columns} skin="isme" />
      </div>
    </section>
  );
}
