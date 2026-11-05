'use client';

import { useMemo, useRef, useState } from 'react';
import { CONVERSIONS, countWords } from '@/lib/brand/text';
import { useBrandToast } from '../../BrandToast';
import { CopyIcon } from '../../ui/icons';
import { BTN_OUTLINE, BTN_PRIMARY, BTN_SECONDARY, TEXTAREA } from '../../ui/styles';
import { ClearButton, Counts } from '../bits';

/*
 * ref Text Case: input on the left with counts, the selected conversion's result below it (copy,
 * copy all twelve, swap into input), and the twelve conversions as a radio group on the right —
 * each card previews its live result, or its example while the input is empty. Starts with the
 * reference's own sample, "ATLAS SkillTech University".
 */
export default function CasePanel() {
  const { notify, copy } = useBrandToast();
  const [text, setText] = useState('ATLAS SkillTech University');
  const [selected, setSelected] = useState('upper');
  const inputRef = useRef(null);
  const groupRef = useRef(null);

  const outputs = useMemo(() => Object.fromEntries(CONVERSIONS.map((c) => [c.id, c.fn(text)])), [text]);
  const cur = CONVERSIONS.find((c) => c.id === selected);
  const out = outputs[selected] || '';

  const onKeyDown = (e) => {
    const i = CONVERSIONS.findIndex((c) => c.id === selected);
    const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: CONVERSIONS.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const c = CONVERSIONS[(next + CONVERSIONS.length) % CONVERSIONS.length];
    setSelected(c.id);
    groupRef.current?.querySelector(`[data-conv="${c.id}"]`)?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-8 n1024:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-brand-line n640:p-6">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="tc-input" className="text-sm font-bold text-brand-indigo">
              Your text
            </label>
            <ClearButton
              icon
              onClick={() => {
                setText('');
                inputRef.current?.focus();
                notify('Cleared');
              }}
            />
          </div>
          <textarea
            id="tc-input"
            ref={inputRef}
            rows={8}
            spellCheck={false}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type text here, for example: ATLAS SkillTech University"
            className={`mt-3 ${TEXTAREA}`}
          />
          <Counts items={[[text.length, 'characters'], [countWords(text), 'words']]} />
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-brand-line n640:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">Result</p>
              <p className="truncate text-sm font-bold text-brand-indigo">{cur.name}</p>
            </div>
          </div>
          <textarea readOnly rows={5} value={out} aria-label={`Converted text, ${cur.name}`} className={`mt-3 ${TEXTAREA}`} />
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" disabled={!out} onClick={() => copy(out, { label: cur.name })} className={BTN_PRIMARY}>
              <CopyIcon />
              Copy result
            </button>
            <button
              type="button"
              disabled={!text}
              onClick={() => copy(CONVERSIONS.map((c) => `${c.name}:\n${outputs[c.id] || ''}`).join('\n\n'), { label: 'All 12 results' })}
              className={BTN_SECONDARY}
            >
              Copy all results
            </button>
            <button
              type="button"
              disabled={!out}
              onClick={() => {
                setText(out);
                inputRef.current?.focus();
                notify('Result moved to input');
              }}
              className={BTN_OUTLINE}
            >
              Swap into input
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-lg font-bold text-brand-indigo">Choose a conversion</h3>
          <p className="text-xs text-brand-ink">Select one to update the result.</p>
        </div>
        <div ref={groupRef} role="radiogroup" aria-label="Text conversions" onKeyDown={onKeyDown} className="mt-4 grid grid-cols-1 gap-3 min-[560px]:grid-cols-2">
          {CONVERSIONS.map((c) => {
            const on = c.id === selected;
            const preview = text.length ? outputs[c.id] || '—' : c.hint;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                data-conv={c.id}
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setSelected(c.id)}
                className="group flex flex-col rounded-xl border-0 bg-white p-3.5 text-left ring-1 ring-brand-line transition hover:ring-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal aria-checked:bg-brand-indigo aria-checked:ring-brand-indigo n640:p-4"
              >
                <span className="text-sm font-bold text-brand-indigo group-aria-checked:text-white">{c.name}</span>
                <span className={`mt-1 line-clamp-2 break-words font-mono text-xs leading-snug text-brand-ink group-aria-checked:text-white/80 ${text.length ? '' : 'italic opacity-70'}`}>{preview}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
