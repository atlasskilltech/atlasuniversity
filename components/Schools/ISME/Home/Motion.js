import ZoomSlider from '@/components/Life/ZoomSlider';
import MotionCard from '@/components/Schools/ISDI/MotionCard';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * ISME "Your College Life, Captured in Motion" — `div.section > (.container > .head-wrap.mrgbtm,
 * .motion-card-wrapper > .swiper.zoom-slider)` in reference/schools/isme/index.php. The slider is
 * the shared `Life/ZoomSlider` (the ATLAS / ISDI `.zoom-slider`) and the card the ISDI
 * `MotionCard` on its `isme` variant. `.head-wrap.mrgbtm` (56 below, 20 at <=767) collapses with
 * the wrapper's own 56 / 20 top margin, so one gap shows.
 */
export default function Motion({ data, block = 'motion' }) {
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} sub={data.sub} button={data.button} align="base" margin="mrgbtm" />
      </div>
      <div className="mt-14 max-md:mt-5">
        <ZoomSlider label={data.heading}>
          {data.cards.map((card, i) => (
            <MotionCard key={i} card={card} variant="isme" />
          ))}
        </ZoomSlider>
      </div>
    </div>
  );
}
