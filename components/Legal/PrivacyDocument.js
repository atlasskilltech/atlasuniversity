import { Fragment } from 'react';
import LegalSection from './LegalSection';

/**
 * /privacy-policy body — reference/new pages/privacy-policy.zip (index.php).
 *
 * The policy is a Google Docs HTML export pasted into an Elementor text widget, styled by the
 * export's own `<style>` block (classes c0…c24). Each class token is mapped to the values that block
 * declares, checked against production's computed styles at 1440 / 768 / 390 (identical at every
 * width — only the section padding and the container change):
 *
 *   p, li           11pt (14.67px); `p { margin: 0 }` beats the page's own `p { margin-bottom: 10px }`,
 *                   whose `p:hover { color: #000 }` still applies
 *   c0 / c5 / c6    line-height 1.0791666…; c0 / c6 justify, c5 left; c6 padding-bottom 15pt
 *   c7              line-height 1, left        c18  padding-bottom 8pt, left
 *   c13             height 11pt (the empty spacer paragraphs)
 *   c4 / c15        margin-left 30pt           c16  margin-left 36pt, padding-bottom 8pt, left
 *   ul.c8           no margin, no padding, no marker: the bullet is `li.li-bullet-0::before`,
 *                   "●  " inline-block, margin-left -18pt, min-width 18pt, nowrap
 *   span c1         700 #363636   c2 / c9  #4a4a4a   c20  #0000ff underlined, skip-ink none
 *   table.c24       collapsed, margin-right auto; cells padding 7.5pt, 1pt #ccc solid, top-aligned,
 *                   widths 102.8 / 114.1 / 161.4 / 72.2pt (c11 / c14 / c21 / c10)
 *   h1 (the title)  the export's `h1` — 24pt/1.0791666 700, padding 24pt 0 6pt — inside Webflow's
 *                   margin 20 0 10
 *
 * ── Two reference defects, not reproduced ─────────────────────────────────
 * - The export's `<style>` is unscoped, so on production its `p`, `li`, `h1` and `h2` rules restyle the
 *   whole page — the cover's own `.h1-tag` gains the export's 24pt/6pt padding and sits 8px higher
 *   than on every other page with this cover. Here the rules apply to the policy only.
 * - A second, older copy of the policy, authored hidden on every device, renders on production
 *   because Elementor's CSS is not loaded there. See lib/privacyPolicyContent.js.
 */
const LH = 'leading-[1.0791666666666666]';
const TOKEN = {
  c0: `${LH} text-justify`,
  c5: `${LH} text-left`,
  c6: `${LH} pb-[15pt] text-justify`,
  c7: 'leading-none text-left',
  c18: `${LH} pb-[8pt] text-left`,
  c16: `${LH} ml-[36pt] pb-[8pt] text-left`,
  c13: 'h-[11pt]',
  c15: 'ml-[30pt]',
  c4: 'ml-[30pt] pl-0',
  'li-bullet-0':
    "before:-ml-[18pt] before:inline-block before:min-w-[18pt] before:whitespace-nowrap before:content-['●__']",
};
const SPAN = {
  c1: 'font-bold text-[#363636]',
  c2: 'text-[11pt] font-normal text-[#4a4a4a]',
  c3: 'text-[11pt] font-normal',
  c9: 'font-normal text-[#4a4a4a]',
  c20: 'font-normal text-[#0000ff] underline [text-decoration-skip-ink:none]',
  c23: 'text-[11pt]',
};
const CELL = {
  c10: 'w-[72.2pt]',
  c11: 'w-[102.8pt]',
  c14: 'w-[114.1pt]',
  c21: 'w-[161.4pt]',
};

const tokens = (c, map) =>
  c
    .split(' ')
    .map((t) => map[t])
    .filter(Boolean)
    .join(' ');

/* "\n" is the source's <br> */
function Text({ text }) {
  const parts = text.split('\n');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
}

function Runs({ runs }) {
  return runs.map((run, i) => {
    if (typeof run === 'string') return <Text key={i} text={run} />;
    const [cls, text, href] = run;
    return (
      <span key={i} className={tokens(cls, SPAN)}>
        {href ? (
          <a href={href} className="text-inherit [text-decoration:inherit]">
            <Text text={text} />
          </a>
        ) : (
          <Text text={text} />
        )}
      </span>
    );
  });
}

function Block({ block }) {
  if (block.t === 'p')
    return (
      <p className={`m-0 text-[11pt] hover:text-black ${tokens(block.c, TOKEN)}`}>
        <Runs runs={block.r} />
      </p>
    );
  if (block.t === 'ul')
    return (
      <ul className="m-0 list-none p-0">
        {block.items.map((item, i) => (
          <li key={i} className={`text-[11pt] ${tokens(item.c, TOKEN)}`}>
            <Runs runs={item.r} />
          </li>
        ))}
      </ul>
    );
  return (
    <table className="mr-auto border-collapse border-spacing-0">
      <tbody>
        {block.rows.map((row, r) => (
          <tr key={r}>
            {row.map((cell, c) => (
              <td key={c} className={`border-[1pt] border-solid border-[#cccccc] p-[7.5pt] align-top ${CELL[cell.c]}`}>
                {cell.b.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PrivacyDocument({ data }) {
  return (
    <LegalSection>
      {/* ref .elementor-widget-heading h1.elementor-heading-title */}
      <h1 className={`mb-2.5 mt-5 pb-[6pt] pt-[24pt] text-left text-[24pt] font-bold ${LH}`}>{data.title}</h1>
      {/* ref .elementor-element-9591170 .elementor-widget-container */}
      <div>
        {data.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </LegalSection>
  );
}
