import TeamCard from './TeamCard';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * The /management-team body — `section.section > .container > (h2.h2-tag.mrg16#pro-vice-chancellor,
 * .sub-heading.mrgbtm, .common-flex-26-wrap > 16 x .card-type-e)`.
 *
 *   .common-flex-26-wrap   flex, wrap, centred, align start, gap 24 — at every width, so the row
 *                          count falls out of the 242px card: 4 per row at 1440, 2 at 768, 1 at 390
 *
 * The heading and lead travel as data; the card is `TeamCard`.
 */
export default function TeamGrid({ team }) {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 id={team.id} className={`mb-4 max-md:mb-2 ${H2}`}>
          {team.heading}
        </h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{team.subheading}</div>

        {/* ref .common-flex-26-wrap */}
        <div className="flex flex-wrap items-start justify-center gap-6">
          {team.people.map((person) => (
            <TeamCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
