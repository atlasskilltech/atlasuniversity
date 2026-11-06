/* =====================================================================
   Section heading.

   PERMANENT RULE - every section on an ATLAS sheet is announced the
   same way: the heading in the display face over a short brand-colour
   rule. One size, one weight, one rule length, in every document.
   ===================================================================== */
import { DISPLAY, SECTION_HEADING } from './tokens';

export default function SectionHeading({ children, size = 'default' }) {
  // A policy sets its heading a shade larger and in indigo; everything
  // else about the block is identical.
  // Ported note: the standalone studio layered these three over
  // SECTION_HEADING and relied on Tailwind v4's sort order (measured: 6u,
  // 0.01em, indigo all won). Here the policy heading is its own string, so
  // no two utilities of one property ever meet in a class list.
  const heading =
    size === 'policy'
      ? `${DISPLAY} font-bold text-[calc(6*var(--u))] leading-[1.1] tracking-[0.01em] text-[var(--atlas-indigo)]`
      : SECTION_HEADING;

  return (
    <>
      <div className={heading}>{children}</div>
      <div className="mt-[calc(2.2*var(--u))] h-[0.7mm] w-[calc(13*var(--u))] rounded-[0.5mm] bg-[var(--brand)]" />
    </>
  );
}
