'use client';

import { FIELD, LABEL, SELECT } from '../../ui/styles';

/* ref <select id="*-format"> + the quality slider + the JPEG background row, shared by all three tabs. */
export const FORMAT_OPTIONS = [
  ['image/jpeg', 'JPEG (.jpg)'],
  ['image/png', 'PNG (.png)'],
  ['image/webp', 'WebP (.webp)'],
];

export function FormatSelect({ id, label, value, onChange, keepOriginal, webp }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={SELECT}>
        {keepOriginal && <option value="original">Keep original</option>}
        {FORMAT_OPTIONS.map(([v, l]) => (
          <option key={v} value={v} disabled={v === 'image/webp' && !webp}>
            {v === 'image/webp' && !webp ? `${l} — not supported here` : l}
          </option>
        ))}
      </select>
    </div>
  );
}

export function QualityField({ id, value, onInput, onCommit, note }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-center justify-between text-xs font-semibold text-brand-ink">
        Quality <span className="font-semibold text-brand-indigo">{value}%</span>
      </label>
      <input
        id={id}
        type="range"
        min={10}
        max={100}
        value={value}
        onChange={(e) => onInput(Number(e.target.value))}
        onPointerUp={onCommit}
        onKeyUp={onCommit}
        className="mt-1.5 w-full accent-brand-teal"
      />
      {note && <p className="mt-1 text-[11px] text-brand-ink/70">{note}</p>}
    </div>
  );
}

export function BgField({ id, label, value, onChange, note }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>{label}</label>
      <div className="mt-1.5 flex items-center gap-2">
        <input id={id} type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-brand-paper p-1 ring-1 ring-inset ring-brand-line" />
        <span className="text-[11px] text-brand-ink/70">{note}</span>
      </div>
    </div>
  );
}

export function NumberField({ id, label, value, onChange, onBlur, min = 1, max, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>{label}</label>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={FIELD.replace('mt-1.5', 'mt-1')}
      />
    </div>
  );
}
