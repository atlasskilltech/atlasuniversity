import Carousel from '@/components/Carousel/Carousel';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import ProgramCard from '@/components/Schools/ISME/ProgramCard';
import ProgramTabs from './ProgramTabs';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * ISME "Build Your Degree. Design Your Future." — `section.section > .container > (.head-wrap.mrgbtm,
 * .primary-tabs)` in reference/schools/isme/index.php. `.head-wrap.mrgbtm` sets 56px below the
 * heading row (20 at <=767). Each pane is a `.swiper.common-swiper.mrgtp0` of `ProgramCard`s:
 * no top padding, and Swiper's default dots in flow 20px below at <=568 (`bullets="inline"`).
 */
export default function Programs({ data, block = 'programs' }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} sub={data.sub} align="base" margin="mrgbtm" />
      </div>
      <ProgramTabs
        labels={data.labels}
        contentPadFixed={!!data.contentPadFixed}
        panes={data.panes.map((cards, i) => (
          <Carousel key={i} autoplay={false} arrowStyle="isme" bullets="inline">
            {cards.map((card) => (
              <ProgramCard key={card.title} card={card} />
            ))}
          </Carousel>
        ))}
      />
    </section>
  );
}
