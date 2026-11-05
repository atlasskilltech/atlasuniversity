import PersonCard from '@/components/Schools/ISDI/PersonCard';
import MarqueeTrack from '@/components/Schools/ISDI/Home/MarqueeTrack';
import { CONTAINER, H2, SECTION } from '@/components/Home/SectionHead';
import withBreaks from '@/lib/withBreaks';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';

/**
 * ISME "Steering Excellence, Guiding ATLAS -- Our Advisory ATLAS Board" — `div.section >
 * .testimonial-wrap > (.container > h2.h2-tag, .swiper.marquee-swiper > .card-type-d)` in
 * reference/schools/isme/index.php. The strip and the card are the ISDI homepage's
 * (`MarqueeTrack` + `PersonCard`); the ISME card variant is square-cornered. The heading is the
 * ISME `.h2-tag` (44/1.2 500, 36 at <=767) with its 56px bottom margin (32 at <=767).
 * One upstream card (Ronnie Screwvala) is commented out and is not ported.
 */
export default function AdvisoryBoard({ data, block = 'advisory' }) {
  return (
    <div data-block={block} className={SECTION}>
      {data.sub || data.button ? (
        /* the About page: `.head-wrap.top` (h2.mrg16 + lead, a "View All" pill) and the
           `.swiper.marquee-swiper.mrg-tp` inside the same `.container`, 54px below — so the
           strip is clipped to the container rather than running to the viewport edge */
        <div className={CONTAINER}>
          <HeadWrap heading={data.heading} sub={data.sub} button={data.button} align="top" />
          <MarqueeTrack className="mt-[54px]">
            {data.people.map((person, i) => (
              <PersonCard key={`${i}-${person.name}`} person={person} variant="isme" playLabel={data.playLabel} playAlt={data.playAlt} />
            ))}
          </MarqueeTrack>
        </div>
      ) : (
        <>
      <div className={CONTAINER}>
        <h2 className={`${H2} mb-14 max-md:mb-8`}>{withBreaks(data.heading)}</h2>
      </div>
      <MarqueeTrack>
        {data.people.map((person, i) => (
          <PersonCard
            key={`${i}-${person.name}`}
            person={person}
            variant="isme"
            playLabel={data.playLabel}
            playAlt={data.playAlt}
          />
        ))}
      </MarqueeTrack>
        </>
      )}
    </div>
  );
}
