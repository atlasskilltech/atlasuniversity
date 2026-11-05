import { Fragment } from 'react';
import withBreaks from '@/lib/withBreaks';

/*
 * Text as the extractor stores it: a plain string, or an array of runs where `{ strong }` is an
 * authored <strong>. No explicit weight on the <strong>: the ISME reference loads Tailwind's
 * preflight after Webflow's normalize, so `font-weight: bolder` applies there exactly as it does
 * here (700 over a 400 parent, 900 over 600/700) — measured on production.
 */
export default function Runs({ runs }) {
  if (runs == null) return null;
  if (typeof runs === 'string') return withBreaks(runs);
  return runs.map((r, i) => {
    if (typeof r === 'string') return <Fragment key={i}>{withBreaks(r)}</Fragment>;
    /* `{ list }` — an authored <ul> inside running copy (mba-financial-planning-applied-finance's
       overview). Preflight wins on the ISME pages: no markers, no indent, no margins — each item
       is simply its own line. Its items are runs. */
    if (r.list != null)
      return (
        <ul key={i} className="m-0 list-none p-0">
          {r.list.map((li, j) => (
            <li key={j}>
              <Runs runs={li} />
            </li>
          ))}
        </ul>
      );
    /* `{ link }` — an inline <a> with its authored colour / underline (the ISME LSE pathway page) */
    if (r.link != null)
      return (
        <a
          key={i}
          href={r.href}
          {...(r.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{ color: r.color ?? undefined, textDecoration: r.underline ? 'underline' : undefined }}
        >
          {r.link}
        </a>
      );
    return <strong key={i}>{withBreaks(r.strong)}</strong>;
  });
}
