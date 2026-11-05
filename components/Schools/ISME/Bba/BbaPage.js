import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import FAQ from '@/components/Home/FAQ';
import SearchQuestion from '@/components/About/SearchQuestion';
import StatBand from '@/components/ui/StatBand';
import PeopleVoices from '@/components/Schools/ISME/Home/PeopleVoices';
import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';
import { ismeSearch } from '@/lib/schools/isme/home/hero';
import { loadBbaPage } from '@/lib/schools/isme/bba/load';
import withBreaks from '@/lib/withBreaks';
import CourseHero from './CourseHero';
import MajorTrack from './MajorTrack';
import MinorTrack from './MinorTrack';
import Curriculum from './Curriculum';
import WhyCards from './WhyCards';
import Execution from './Execution';
import Guide from './Guide';
import Eligibility from './Eligibility';
import Banner from './Banner';
import ProgramBlock from './ProgramBlock';
import MbaTrack from './MbaTrack';
import CmsFaq from './CmsFaq';

/*
 * One ISME BBA major/minor page, rendered from the data the extractor took out of its production
 * markup (lib/schools/isme/bba). Blocks render in the page's own order; a page that lacks a block
 * (most combination pages have no "Design your degree in 2 steps") simply omits it.
 */

/* ref .head-top-card.bg6/7/8 — colour and wash are the stylesheet's, so they travel as data */
const STAT_TONE = {
  bg6: { background: '#0c1f4b', image: '/assets/images/schools/isme/bba/eligible-bg-1.png' },
  bg7: { background: '#103380', image: '/assets/images/mission/mission-bg.png' },
  bg8: { background: '#00277d', image: '/assets/images/schools/isme/bba/eligible-bg-3.png' },
};
const ISME_FAQ_ARROW = '/assets/images/schools/isme/icons/isme-down-arrow.svg';

/* the page's CRM brochure widget: the `embed.js` loader every page but one authors in its popup, or —
   on the ACCA page — the widget's iframe embed (`frames`); both render through the shared CrmWidget */
function brochureFor(page) {
  const s = page.brochure?.scripts?.[0];
  if (s) return { kind: 'script', src: s.src, height: s.height, title: 'Download Brochure', closeLeading: 'tight' };
  const f = page.brochure?.frames?.[0];
  if (f) return { kind: 'iframe', src: f.src, height: f.height, title: 'Download Brochure', closeLeading: 'tight' };
  return null;
}

function Steps({ data }) {
  return (
    /* ref section.section.extraspace — pt120 (40 at <=767) */
    <section data-block="steps" className="block overflow-hidden pb-[60px] pt-[120px] max-md:py-10">
      <div className={CONTAINER}>
        <h2 className={`${H2} mb-4 max-md:mb-2`}>{withBreaks(data.heading)}</h2>
        <div className={SUB_INNER}>{withBreaks(data.sub)}</div>
      </div>
    </section>
  );
}

export default async function BbaPage({ pageKey, ns = 'bba' }) {
  const page = await loadBbaPage(pageKey, ns);
  if (!page) notFound();
  const brochure = brochureFor(page);

  /* `blocks` is the page's data, or a copy with a repeated kind (`execution2`, `voices2` — B.Sc
     Finance authors two of each) swapped into the base key */
  const renderFor = (b) => ({
    hero: () => <CourseHero data={b.hero} brochure={brochure} />,
    stats: () => (
      <div data-block="stats">
        <StatBand
          data={b.stats.cards.map((c) => ({
            label: c.label,
            value: c.value,
            note: c.note,
            labelColor: '#07f6a0',
            imagePosition: '100% 50%',
            ...(STAT_TONE[c.tone] ?? STAT_TONE.bg7),
          }))}
        />
      </div>
    ),
    steps: () => <Steps data={b.steps} />,
    major: () => <MajorTrack data={b.major} />,
    program: () => <ProgramBlock data={b.program} brochure={brochure} />,
    mbatrack: () => <MbaTrack data={b.mbatrack} brochure={brochure} />,
    minor: () => <MinorTrack data={b.minor} />,
    curriculum: () => <Curriculum data={b.curriculum} brochure={brochure} />,
    why: () => <WhyCards data={b.why} />,
    execution: () => <Execution data={b.execution} />,
    voices: () => (
      <PeopleVoices
        block="voices"
        data={{
          heading: b.voices.heading,
          sub: b.voices.sub,
          bgImage: b.voices.cards[0]?.bgImage,
          cards: b.voices.cards.map((c) => ({ ...c, role: c.course })),
        }}
      />
    ),
    admissions: () => <Guide data={b.admissions} />,
    /* `page.eligibilitySheet` — a page whose own stylesheet restyles `.list` but whose eligibility
       block is shared with pages that do not (bba-Hons-business-psychology) */
    eligibility: () => <Eligibility data={page.eligibilitySheet ? { ...b.eligibility, sheet: page.eligibilitySheet } : b.eligibility} />,
    banner: () => <Banner data={b.banner} brochure={brochure} />,
    search: () => (
      <section data-block="search" className={SECTION}>
        <div className={CONTAINER}>
          <div className="pt-10">
            <SearchQuestion data={ismeSearch} variant="blue" />
          </div>
        </div>
      </section>
    ),
    cmsfaq: () => <CmsFaq data={b.cmsfaq} search={b.cmsfaq.search ? ismeSearch : null} />,
    faq: () => (
      <div data-block="faq">
        <FAQ data={{ heading: b.faq.heading, arrow: ISME_FAQ_ARROW, items: b.faq.items }} />
      </div>
    ),
  });

  return (
    <main>
      {page.order.map((k) => {
        const kind = k.replace(/2$/, '');
        const r = renderFor(kind === k ? page.blocks : { ...page.blocks, [kind]: page.blocks[k] })[kind];
        return r ? <Fragment key={k}>{r()}</Fragment> : null;
      })}
    </main>
  );
}
