'use client';

import { BRAND_COLORS } from '@/lib/brand/data';
import { contrast, grade, luminance, onColor, rgbString } from '@/lib/brand/utils';
import { CodeIcon, CopyIcon } from '../ui/icons';
import { H2, H3, LEAD, PAGE, SECTION_Y } from '../ui/styles';
import ColorSwatchButton from './ColorSwatchButton';

/*
 * ref section#colors: every palette group with its colour cards — a swatch that copies the HEX,
 * HEX and RGB rows that copy their value, WCAG contrast against white and Indigo, a 100%→10%
 * opacity ramp (large and medium cards) and any usage note; plus "Copy all as CSS variables".
 */
const GRID = { lg: 'n640:grid-cols-2', md: 'n640:grid-cols-2 xl:grid-cols-4', sm: 'min-[440px]:grid-cols-2 n1024:grid-cols-4' };
const SWATCH_H = { lg: 'h-48 n640:h-64', md: 'h-36 n640:h-44', sm: 'h-24' };
const NAME = { lg: 'text-2xl n640:text-3xl', md: 'text-xl', sm: 'text-base' };

function ValueRow({ label, value, c }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-xs font-semibold text-brand-ink">{label}</span>
      <ColorSwatchButton
        value={value}
        swatch={c.hex}
        label={`${c.name} ${value}`}
        ariaLabel={`Copy ${c.name} ${label} ${value}`}
        className="group/copy -mr-2 inline-flex min-w-0 items-center gap-2 rounded-md border-0 bg-transparent px-2 py-1 text-right font-bold text-brand-indigo transition hover:bg-brand-paper"
      >
        {(flash) => (
          <>
            <span className="truncate">{flash ? 'Copied!' : value}</span>
            <CopyIcon className="h-4 w-4 shrink-0 opacity-60 group-hover/copy:opacity-100" />
          </>
        )}
      </ColorSwatchButton>
    </div>
  );
}

function ContrastRow({ label, ratio }) {
  return (
    <p className="flex items-center justify-between gap-2 text-xs">
      <span>
        {label} <strong className="text-brand-indigo">{ratio.toFixed(1)}:1</strong>
      </span>
      <span className="rounded bg-brand-paper px-1.5 py-0.5 font-semibold text-brand-indigo">{grade(ratio)}</span>
    </p>
  );
}

function ColorCard({ c, size }) {
  const isLight = luminance(c.hex) > 0.8;
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-brand-line">
      <ColorSwatchButton
        value={c.hex}
        swatch={c.hex}
        label={`${c.name} ${c.hex}`}
        ariaLabel={`Copy ${c.name} HEX ${c.hex}`}
        style={{ background: c.hex, color: onColor(c.hex) }}
        className={`flex ${SWATCH_H[size]} w-full flex-col justify-end border-0 p-4 text-left n640:p-5 ${isLight ? 'border-b border-solid border-brand-line' : ''}`}
      >
        {(flash) => (
          <>
            <span className={`${NAME[size]} font-extrabold tracking-tight`}>{c.name}</span>
            <span className="mt-1 text-sm font-semibold opacity-85">{flash ? 'Copied!' : size === 'sm' ? c.hex : `Click to copy ${c.hex}`}</span>
          </>
        )}
      </ColorSwatchButton>
      <div className="flex flex-1 flex-col p-4 n640:p-5">
        <p className="text-sm leading-snug">{c.role}</p>
        <div className="mt-3 divide-x-0 divide-y divide-solid divide-brand-line border-0 border-y border-solid border-brand-line">
          <ValueRow label="HEX" value={c.hex} c={c} />
          <ValueRow label="RGB" value={rgbString(c.hex)} c={c} />
        </div>
        <div className="mt-3 space-y-1.5">
          {!isLight && <ContrastRow label="White text" ratio={contrast(c.hex, '#FFFFFF')} />}
          {!(c.hex === '#342B7C' || c.token.startsWith('edge')) && <ContrastRow label="Indigo text" ratio={contrast(c.hex, '#342B7C')} />}
        </div>
        {size !== 'sm' && (
          <div className="mt-3" aria-hidden="true">
            <div className="flex h-6 overflow-hidden rounded-md ring-1 ring-brand-line">
              {[100, 80, 60, 40, 20, 10].map((o) => (
                <span key={o} className="flex-1" style={{ background: c.hex, opacity: o / 100 }} />
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[11px]">
              <span>100%</span>
              <span>10% opacity</span>
            </div>
          </div>
        )}
        {c.note && <p className="mt-3 rounded-lg bg-brand-paper p-3 text-xs leading-relaxed">{c.note}</p>}
      </div>
    </li>
  );
}

const CSS_VARS = `:root {\n${BRAND_COLORS.map((g) => `  /* ${g.title} */\n${g.colors.map((c) => `  --${c.token}: ${c.hex};`).join('\n')}`).join('\n')}\n}`;

export default function ColorsSection() {
  return (
    <section id="colors" className={`${PAGE} ${SECTION_Y} scroll-mt-20`}>
      <div className="flex flex-col gap-6 n1024:flex-row n1024:items-end n1024:justify-between">
        <div className="max-w-2xl">
          <h2 className={H2}>Colors</h2>
          <p className={LEAD}>
            Use these values exactly. Select any HEX or RGB value to copy it. For lighter backgrounds, use a brand color at reduced opacity rather than a new color.
          </p>
        </div>
        <ColorSwatchButton
          value={CSS_VARS}
          swatch="#342B7C"
          label="CSS variables"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border-0 bg-brand-indigo px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-indigo-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal/40"
        >
          {(flash) => (
            <>
              <CodeIcon />
              <span>{flash ? 'Copied!' : 'Copy all as CSS variables'}</span>
            </>
          )}
        </ColorSwatchButton>
      </div>
      <div className="mt-12 space-y-16">
        {BRAND_COLORS.map((g) => (
          <div key={g.id}>
            <h3 className={H3}>{g.title}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed">{g.intro}</p>
            <ul className={`m-0 mt-6 grid list-none grid-cols-1 gap-5 p-0 ${GRID[g.size]}`}>
              {g.colors.map((c) => (
                <ColorCard key={c.token} c={c} size={g.size} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
