import PortCardM from '@/components/ui/PortCardM';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';
import { objectives } from '@/lib/centreForResearchContent';

/* ref div.section > .container > (h2.h2-tag.mrg16, .abt-text, .swiper.common-swiper.mrgtp32) —
   /centre-for-research's "Our Objectives", shared with /centre-for-research/our-mission */
export default function Objectives() {
  return (
    <div className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{objectives.heading}</h2>
        {/* ref .abt-text as a lead: 16px/24 at every width */}
        <div className="text-base leading-6">{objectives.sub}</div>
      </div>
      <Carousel className="pt-8" bullets="inline">
        {objectives.items.map((item) => (
          <PortCardM key={item.name} item={item} variant="ugdx" />
        ))}
      </Carousel>
    </div>
  );
}
