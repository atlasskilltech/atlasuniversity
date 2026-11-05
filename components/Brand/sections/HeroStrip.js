'use client';

import { onColor } from '@/lib/brand/utils';
import ColorSwatchButton from './ColorSwatchButton';

/* ref #hero-strip: the palette at a glance — select a band to copy its HEX */
export default function HeroStrip({ colors }) {
  return (
    <ul className="m-0 grid list-none grid-cols-2 p-0 n640:grid-cols-3 n1024:flex n1024:h-44" aria-label="Brand colors. Select a color to copy its HEX code.">
      {colors.map((c) => (
        <li key={c.hex} className="n1024:flex-1 n1024:transition-[flex-grow] n1024:duration-300 n1024:hover:flex-[1.6] n1024:focus-within:flex-[1.6]">
          <ColorSwatchButton
            value={c.hex}
            swatch={c.hex}
            label={`${c.name} ${c.hex}`}
            ariaLabel={`Copy ${c.name} HEX ${c.hex}`}
            style={{ background: c.hex, color: onColor(c.hex) }}
            className="flex h-28 w-full flex-col justify-end border-0 p-4 text-left shadow-[inset_1px_1px_0_rgb(255_255_255/0.14)] n640:h-32 n1024:h-full n1024:p-5"
          >
            {(flash) => (
              <>
                <span className="text-sm font-bold">{c.name}</span>
                <span className="mt-0.5 text-sm font-medium">{flash ? 'Copied!' : c.hex}</span>
              </>
            )}
          </ColorSwatchButton>
        </li>
      ))}
    </ul>
  );
}
