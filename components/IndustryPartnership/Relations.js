import CardTypeF from '@/components/ui/CardTypeF';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';
import { relations } from '@/lib/industryPartnershipContent';

/* ref section.section > .container > (h2.h2-tag.mrg16, .sub-heading, .swiper.common-swiper) —
   /atlas-industry-partnership's "Strengthening Global Industry Relations" (Industry Partnerships and
   MoU's). Also /centre-for-research/corporate-collaborations-and-mou. */
export default function Relations() {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{relations.heading}</h2>
        <div className={SUB_INNER}>{relations.subheading}</div>
      </div>
      <Carousel className="pt-14 max-md:pt-10" bullets="inline">
        {relations.cards.map((card) => (
          <CardTypeF key={card.image.src} card={card} />
        ))}
      </Carousel>
    </section>
  );
}
