/*
 * /map design tokens — whole Tailwind class literals (the scanner reads source text), built from the
 * project's own palette: ATLAS indigo (atlas.footer) for the university, the existing ISDI pink,
 * atlas.deep and atlas.teal, and the Law calendar's own #CC5500 for the schools.
 */

export const SCHOOL = {
  isdi: { short: 'ISDI', band: 'bg-[#d20158]', text: 'text-[#b0004a]', border: 'border-[#d20158]', soft: 'bg-[#fdeaf2]' },
  isme: { short: 'ISME', band: 'bg-atlas-deep', text: 'text-atlas-deep', border: 'border-atlas-deep', soft: 'bg-[#e8eef9]' },
  ugdx: { short: 'uGDX', band: 'bg-[#017c87]', text: 'text-[#016570]', border: 'border-[#017c87]', soft: 'bg-[#e3f6f8]' },
  law: { short: 'Law', band: 'bg-[#cc5500]', text: 'text-[#a04300]', border: 'border-[#cc5500]', soft: 'bg-[#fbeee4]' },
};

export const TYPE_LABEL = {
  university: 'University',
  school: 'School',
  group: 'Section',
  programme: 'Programme',
  page: 'Page',
  post: 'Article',
  section: 'Page section',
  ref: 'Shortcut',
  external: 'External site',
  document: 'Document',
};

/* the node box per type */
export const NODE = {
  university: 'border-2 border-atlas-footer bg-atlas-footer text-white',
  school: 'border-2 bg-white text-atlas-ink',
  group: 'border-2 border-[#e9c46a] bg-[#fff6d6] text-atlas-ink',
  programme: 'border border-[#c9cbe3] bg-white text-atlas-ink',
  page: 'border border-[#cfd0d8] bg-white text-atlas-ink',
  post: 'border border-[#e2e2ee] bg-[#f7f7fb] text-[#3c3c4a]',
  section: 'border border-dashed border-[#c4c4cc] bg-white text-[#3c3c4a]',
  ref: 'border border-dashed border-[#9a9ab8] bg-[#f4f4fa] text-atlas-footer',
  external: 'border border-[#cfd0d8] bg-white text-atlas-ink',
  document: 'border border-[#cfd0d8] bg-white text-atlas-ink',
};

export const DATE_STATUS = {
  upcoming: { label: 'Upcoming', cls: 'bg-[#e6f6ec] text-[#14632f]' },
  passed: { label: 'Date passed', cls: 'bg-[#f1f1f4] text-[#5a5a66]' },
  closed: { label: 'Closed', cls: 'bg-[#fdecec] text-[#9b1c1c]' },
  open: { label: 'Open', cls: 'bg-[#e6f6ec] text-[#14632f]' },
  tba: { label: 'To be announced', cls: 'bg-[#fff6d6] text-[#7a5a00]' },
  text: { label: 'See source', cls: 'bg-[#f1f1f4] text-[#5a5a66]' },
};

export const VERIFY = {
  verified: { label: 'Verified on page', cls: 'bg-[#e6f6ec] text-[#14632f]' },
  'not-found': { label: 'Needs verification', cls: 'bg-[#fff6d6] text-[#7a5a00]' },
  unverified: { label: 'Not yet verified', cls: 'bg-[#f1f1f4] text-[#5a5a66]' },
};

export const LEVEL_LABEL = {
  ug: 'Undergraduate',
  pg: 'Postgraduate',
  integrated: 'Integrated',
  diploma: 'Postgraduate Diploma',
  summer: 'Summer School',
};

export function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
}
