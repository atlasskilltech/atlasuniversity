/**
 * One row of a disclosure list - ref `.accordion-body ul > li` in reference/mandatory_disclosures.
 *
 * Every value below is the reference's own rule, measured on production:
 *  - the bold row (`li > a`, `p.noHover`): display block, 16px/24 600 #000, margin-bottom 22px; a link
 *    turns #0d6efd on hover, a `.noHover` row does not;
 *  - the regular links under a row (`li > p > a`, and the nested list's links): the reference sets
 *    `color:#212529; font-weight:400` INLINE, which beats its `li a:hover` rule, so they never change
 *    colour; under a `<p>` (margin-bottom 16px) they carry no margin, in the nested list they keep 22px;
 *  - the Prospectus runs: inline links, weight 400 but no inline colour - so #000 with the blue hover -
 *    separated by `|`, a bold label first, a Bootstrap `<hr>` (1rem margins, 25% opacity) between runs.
 *
 * The bullet is the reference's own left-arrow.svg as `list-style-image` (outside, 2rem of list
 * padding); the nested list is `circle` with the same image.
 */
import { Fragment } from 'react';
import SmartLink from '@/components/SmartLink';

const ROW = 'block mb-[22px] font-semibold text-black';
const ROW_LINK = `${ROW} no-underline transition-colors hover:text-[#0d6efd]`;
const SUB_LINK = 'block m-0 font-normal text-[#212529] no-underline';
const NESTED_LINK = 'block mb-[22px] font-normal text-[#212529] no-underline';
const RUN_LINK = 'm-0 inline font-normal text-black no-underline transition-colors hover:text-[#0d6efd]';
const P = 'mb-4';

export const LIST = 'm-0 list-disc pl-8 [list-style-image:url(/assets/mandatory-disclosures/left-arrow.svg)]';
const NESTED_LIST = 'm-0 list-[circle] pl-8 [list-style-image:url(/assets/mandatory-disclosures/left-arrow.svg)]';

function Item({ item, className }) {
  return (
    <SmartLink href={item.href} newTab={item.newTab} className={className}>
      {item.label}
    </SmartLink>
  );
}

export default function DisclosureEntry({ entry }) {
  return (
    <li>
      {entry.link ? (
        <Item item={entry.link} className={ROW_LINK} />
      ) : (
        <p className={ROW}>
          {entry.text}
          {/* The sponsoring-body row. The reference's `li a` rule makes this link a block, so it sits
              on its own line under the text, and its 22px margin collapses into the row's own. */}
          {entry.textLink ? <Item item={entry.textLink} className={ROW_LINK} /> : null}
        </p>
      )}

      {entry.subs?.map((sub) => (
        <p key={sub.href} className={P}>
          <Item item={sub} className={SUB_LINK} />
        </p>
      ))}

      {entry.lines?.map((line) => (
        <p key={line} className={P}>
          {line}
        </p>
      ))}

      {entry.groups?.map((group, i) => (
        <Fragment key={group.label}>
          {i > 0 ? <hr className="my-4 border-0 border-t border-solid border-[#212529] opacity-25" /> : null}
          <p className={P}>
            <b className="font-bold">{group.label}</b>{' '}
            {group.links.map((link, j) => (
              <span key={link.href}>
                <Item item={{ ...link, label: `${link.label} ` }} className={RUN_LINK} />
                {j < group.links.length - 1 ? '| ' : null}
              </span>
            ))}
          </p>
        </Fragment>
      ))}

      {entry.nested ? (
        <ul className={NESTED_LIST}>
          {entry.nested.map((item) => (
            <li key={item.href}>
              <Item item={item} className={NESTED_LINK} />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
