'use client';

import { BRAND_PAIRS, BRAND_TEXT_PAIRS } from '@/lib/brand/data';
import { contrast, grade } from '@/lib/brand/utils';
import { PAGE, SECTION_Y } from '../ui/styles';
import ColorSwatchButton from './ColorSwatchButton';

/*
 * ref section#pairings: the four school lockups (Indigo + school colour, white on both) with the
 * contrast of white on the school colour, and six text/background pairs with their WCAG 2.1 ratio.
 */
function Badge({ ratio }) {
  return (
    <span className="whitespace-nowrap rounded bg-white/10 px-1.5 py-0.5 text-xs font-semibold">
      {ratio.toFixed(1)}:1 {grade(ratio)}
    </span>
  );
}

function HexCopy({ hex }) {
  return (
    <ColorSwatchButton value={hex} swatch={hex} label={hex} className="rounded border-0 bg-transparent px-1 font-semibold text-white hover:bg-white/10">
      {(flash) => <span>{flash ? 'Copied!' : hex}</span>}
    </ColorSwatchButton>
  );
}

export default function PairingsSection() {
  return (
    <section id="pairings" className="scroll-mt-20 bg-brand-indigo text-white">
      <div className={`${PAGE} ${SECTION_Y}`}>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight n640:text-4xl">Color pairings</h2>
          <p className="mt-4 leading-relaxed text-white/80">Combinations built only from the official colors, with the WCAG 2.1 contrast ratio worked out for each one.</p>
        </div>

        <h3 className="mt-12 text-lg font-bold">School lockups</h3>
        <p className="mt-1 text-sm text-white/70">ATLAS Indigo on the left, the school color on the right, white text on both. The same split used in every school logo.</p>
        <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 n640:grid-cols-2">
          {BRAND_PAIRS.map((p) => {
            const [left, right] = p.label.split(' | ');
            return (
              <li key={p.label}>
                <div className="flex h-24 overflow-hidden rounded-xl ring-1 ring-white/15 n640:h-28">
                  <div className="flex w-3/5 items-center px-5 text-2xl font-extrabold tracking-[0.12em] text-white n640:text-3xl" style={{ background: p.left }}>
                    {left}
                  </div>
                  <div className="flex w-2/5 items-center px-5 text-2xl font-extrabold text-white n640:text-3xl" style={{ background: p.right }}>
                    {right}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80">
                  <HexCopy hex={p.left} />
                  <span aria-hidden="true">+</span>
                  <HexCopy hex={p.right} />
                  <span className="ml-auto">
                    White on school color <Badge ratio={contrast('#FFFFFF', p.right)} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-14 text-lg font-bold">Text and background</h3>
        <p className="mt-1 text-sm text-white/70">AA needs 4.5:1 for body text and 3:1 for large text (24px, or 19px bold).</p>
        <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 n640:grid-cols-2 n1024:grid-cols-3">
          {BRAND_TEXT_PAIRS.map((p) => (
            <li key={p.fg + p.bg} className="overflow-hidden rounded-xl ring-1 ring-white/15">
              <div className="p-5" style={{ background: p.bg, color: p.fg }}>
                <p className="text-3xl font-extrabold">Aa</p>
                <p className="mt-2 text-sm font-medium">Empowering minds, transforming futures.</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 bg-white/5 px-4 py-3 text-xs text-white/80">
                <span>
                  <span className="font-semibold text-white">{p.fg}</span> on <span className="font-semibold text-white">{p.bg}</span>
                </span>
                <Badge ratio={contrast(p.fg, p.bg)} />
                <span className="w-full text-white/70">{p.use}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
