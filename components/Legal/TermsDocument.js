import { Fragment } from 'react';
import LegalSection from './LegalSection';

/**
 * /terms-and-conditions body — reference/new pages/terms-and-conditions.zip (index.php).
 *
 * Measured on production (identical at 1440 / 768 / 390; only the section padding and the container
 * change with width):
 *   p                            16px/24 #333, margin-bottom 10 — the page's own `<style>`; #000 on hover
 *   a.terms-and-conditionslinks  #009fe0, no underline; #000 on hover (same `<style>`)
 *   ol.list-4                    decimal, outside, padding-left 40, margin-bottom 10
 *   li.big-text-links            28px/42 #333, padding 16 0; #000 on hover (same `<style>`)
 *   li > p                       the 16px/24 paragraph above
 *
 * The clause title is a bare text node in the <li>, followed by its paragraphs.
 */
function Runs({ runs }) {
  return runs.map((run, i) =>
    typeof run === 'string' ? (
      <Fragment key={i}>{run}</Fragment>
    ) : (
      <a key={i} href={run.a} className="text-[#009fe0] no-underline hover:text-black">
        {run.text}
      </a>
    ),
  );
}

const P = 'mb-2.5 text-base hover:text-black';

export default function TermsDocument({ data }) {
  return (
    <LegalSection>
      <p className={P}>
        <Runs runs={data.intro} />
      </p>
      {/* ref ol.list-4 */}
      <ol role="list" className="mb-2.5 list-outside list-decimal pl-10">
        {data.items.map((item) => (
          /* ref li.big-text-links */
          <li key={item.title} className="py-4 text-[28px] leading-[1.5] text-[#333] hover:text-black">
            {item.title}
            {item.paragraphs.map((runs, i) => (
              <p key={i} className={P}>
                <Runs runs={runs} />
              </p>
            ))}
          </li>
        ))}
      </ol>
    </LegalSection>
  );
}
