import { Fragment } from 'react';

/**
 * Renders a run list from lib/statutoryContent.js: a string is text, `{ b }` is <strong>,
 * `{ br }` a line break and `{ a, runs }` a link.
 *
 * <strong> carries an explicit `font-bold`: Webflow's normalize gives `strong` a flat `bold` (700),
 * Preflight a relative `bolder`, which would resolve a 400 parent to 700 but a 500+ one to 900.
 * Links are Bootstrap's: #0d6efd, underlined (header.php loads Bootstrap 5).
 */
export default function RichText({ runs }) {
  return runs.map((run, i) => {
    if (typeof run === 'string') return <Fragment key={i}>{run}</Fragment>;
    if (run.br) return <br key={i} />;
    if (run.b)
      return (
        <strong key={i} className="font-bold">
          <RichText runs={run.b} />
        </strong>
      );
    if (run.a) {
      const external = /^https?:/.test(run.a);
      return (
        <a key={i} href={run.a} rel={external ? 'noopener' : undefined} className="text-[#0d6efd] underline">
          <RichText runs={run.runs} />
        </a>
      );
    }
    return null;
  });
}
