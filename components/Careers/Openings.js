import { Fragment } from 'react';
import { CONTAINER, H2, SECTION } from '@/components/Home/SectionHead';
import SmartLink from '@/components/SmartLink';

/**
 * `#opening.section` — the vacancy list of /job-openings (`job-openings.php:272-…`). The reference
 * renders one `.opening-card` per row of an HR database table; this port renders the snapshot in
 * `lib/jobOpeningsContent.js`. Measured on production at 1440 / 991 / 767 / 479 / 390:
 *
 *   .opening-wrapper        padding-bottom 53
 *   .opening-head           flex, space-between, centred — the `div.h2-tag.mrgtbm0` "Openings" and
 *                           a search form that is `display: none` on production (not rendered)
 *   .opening-card           padding 32 0, border-top 1px rgba(0,0,0,.3)
 *   .position               24px/32 700 #333
 *   .opening-info           flex, gap 8, centred, mb 16, 14px/1.5 #2b2b2b; the `|` separators are
 *                           18px/1.5. An empty location (one vacancy has none) is still a flex item,
 *                           so its two gaps stay — rendered empty, as authored.
 *   .opening-jd             14px/1.5 #706f6e, max-width 775, mb 9 (22 at <=767). Holds the role's
 *                           own HTML: <p> mb 10, <ul> padding-left 40 / mb 10, disc, <strong> 700.
 *                           Preflight zeroes all of it, so all of it is restated. An EMPTY
 *                           description is still the box: its 9px margin collapses through it into
 *                           `.opening-info`'s 16, which is why those cards are 184px tall.
 *   .open-btn-wrap          flex, gap 20, centred
 *   a.button-tertiary(atlas) 44px, #5cbdca, black 14px/1.2 text, padding 0 24, radius 24, gap 5.
 *                           Its `img.icon-t` measures 0 x 0 on production (the variant hides the
 *                           arrow) but is still a flex item, so it keeps the 5px gap: an empty span.
 *
 * The description is the CMS's own HTML, copied from the live page and checked to contain only
 * p / strong / ul / li (no scripts, attributes or links) — so it is rendered as HTML rather than
 * re-modelled. The Know-more links point at the HR system's JD documents and "Apply Now" at the
 * careers portal, both external, exactly as production authors them.
 */
const JD =
  'mb-[9px] max-w-[775px] text-[14px] leading-[1.5] text-[#706f6e] max-md:mb-[22px] ' +
  '[&_p]:mb-2.5 [&_ul]:mb-2.5 [&_ul]:list-disc [&_ul]:pl-10 [&_ol]:mb-2.5 [&_ol]:list-decimal [&_ol]:pl-10 [&_strong]:font-bold [&_b]:font-bold';

function OpeningCard({ job }) {
  return (
    <div className="border-0 border-t border-solid border-black/30 py-8">
      <div className="text-[24px] font-bold leading-[32px] text-[#333]">{job.position}</div>
      <div className="mb-4 flex items-center justify-start gap-2 text-[14px] leading-[1.5] text-[#2b2b2b]">
        {job.info.map((text, i) => (
          <Fragment key={i}>
            {i > 0 && <div className="text-[18px] leading-[1.5]">|</div>}
            <div>{text}</div>
          </Fragment>
        ))}
      </div>
      <div className={JD} dangerouslySetInnerHTML={{ __html: job.description }} />
      <div className="flex items-center gap-5">
        {job.buttons.map((button) => (
          <SmartLink
            key={button.label}
            href={button.href}
            className="flex h-11 max-w-full items-center justify-center gap-[5px] rounded-3xl bg-[#5cbdca] px-6 text-left text-[14px] leading-[1.5] text-black no-underline"
          >
            <div className="leading-[1.2]">{button.label}</div>
            <span aria-hidden="true" className="h-0 w-0" />
          </SmartLink>
        ))}
      </div>
    </div>
  );
}

export default function Openings({ data }) {
  return (
    <section id="opening" className={SECTION}>
      <div className={CONTAINER}>
        <div className="pb-[53px]">
          <div className="flex items-center justify-between">
            <h2 className={H2}>{data.heading}</h2>
          </div>
        </div>
        {data.jobs.map((job, i) => (
          <OpeningCard key={`${i}-${job.position}`} job={job} />
        ))}
      </div>
    </section>
  );
}
