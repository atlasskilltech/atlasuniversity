import InnerPageHero from '@/components/ui/InnerPageHero';
import { CONTAINER, SECTION, SUB_INNER, SUB_INNER_MRGBTM, SUB_INNER_MRGBTM32 } from '@/components/Home/SectionHead';
import CommitteeTable from './CommitteeTable';
import RichText from './RichText';

/**
 * The /ombudsperson, /anti-ragging-committee, /internal-complaint-committee and
 * /women-development-cell shell: the /examination cover over `.container > .section`, holding
 * committee tables and a run of leads. Data: lib/statutoryContent.js.
 *
 *   .common-wrapper               padding-top 56 → 40 at <=767 (wraps the leads after a table)
 *   .h3-tag.black.mrgbm-16        32px/1.2 500 #2b2b2b, mb 16; 22px at <=767
 *   .sub-heading(.mrgbtm|32)      SectionHead's SUB_INNER / SUB_INNER_MRGBTM / SUB_INNER_MRGBTM32,
 *                                 whose values these pages' sheets share (measured)
 */
const TEXT = {
  h3: 'mb-4 text-[32px] font-medium leading-[1.2] text-[#2b2b2b] max-md:text-[22px]',
  mrgbtm32: SUB_INNER_MRGBTM32,
  mrgbtm: SUB_INNER_MRGBTM,
  plain: SUB_INNER,
};

function TextBlock({ block }) {
  const items = block.items.map((item, i) => (
    <div key={i} className={TEXT[item.kind]}>
      <RichText runs={item.runs} />
    </div>
  ));
  return block.wrapper ? <div className="pt-14 max-md:pt-10">{items}</div> : items;
}

export default function StatutoryPage({ data }) {
  return (
    <>
      <InnerPageHero hero={data.hero} />
      {/* ref .container > .section */}
      <div className={CONTAINER}>
        <div className={SECTION}>
          {data.blocks.map((block, i) => (block.type === 'table' ? <CommitteeTable key={i} {...block} /> : <TextBlock key={i} block={block} />))}
        </div>
      </div>
    </>
  );
}
