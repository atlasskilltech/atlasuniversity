import ScopeCards from '@/components/Hei/ScopeCards';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import { scope } from '@/lib/industryPartnershipContent';

/* /atlas-industry-partnership's "Scope of Partnerships". Also /centre-for-research/corporate-collaborations-and-mou. */
export default function Scope() {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{scope.heading}</h2>
        <div className={SUB_INNER_MRGBTM}>{scope.subheading}</div>
        <ScopeCards cards={scope.cards} />
      </div>
    </section>
  );
}
