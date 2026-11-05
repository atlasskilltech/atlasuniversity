'use client';

import { useRef, useState } from 'react';
import { CLEAN_OPTIONS, cleanText, countLines, countWords } from '@/lib/brand/text';
import { useBrandToast } from '../../BrandToast';
import { BTN_PRIMARY, BTN_SECONDARY, CARD, LABEL, SELECT, TEXTAREA } from '../../ui/styles';
import { Check, ClearButton, Counts, Status } from '../bits';

/* ref Text Cleaner: a live preview of the input with the ticked clean-up actions applied. */
const NONE = Object.fromEntries(CLEAN_OPTIONS.map(([k]) => [k, false]));

export default function CleanerPanel() {
  const { notify, copy } = useBrandToast();
  const [text, setText] = useState('');
  const [ops, setOps] = useState(NONE);
  const [sort, setSort] = useState('none');
  const [keep, setKeep] = useState('first');
  const [ci, setCi] = useState(false);
  const inputRef = useRef(null);
  const result = cleanText(text, ops, sort, keep, ci);

  return (
    <div className="grid grid-cols-1 gap-6 n1024:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div className={CARD}>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="cl-input" className="text-sm font-bold text-brand-indigo">Input</label>
            <ClearButton
              onClick={() => {
                setText('');
                inputRef.current?.focus();
                notify('Cleared');
              }}
            />
          </div>
          <textarea id="cl-input" ref={inputRef} rows={9} spellCheck={false} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste messy text here…" className={`mt-3 ${TEXTAREA} placeholder:text-brand-ink/50`} />
          <Counts items={[[text.length, 'characters'], [countWords(text), 'words'], [countLines(text), 'lines']]} />
        </div>
        <div className={CARD}>
          <h3 className="text-sm font-bold text-brand-indigo">Clean-up actions</h3>
          <div className="mt-4 grid grid-cols-1 gap-2 n640:grid-cols-2">
            {CLEAN_OPTIONS.map(([k, label, note]) => (
              <Check key={k} checked={ops[k]} onChange={(v) => setOps((o) => ({ ...o, [k]: v }))}>
                {label}
                {note && <span className="text-brand-ink/60"> {note}</span>}
              </Check>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 n640:grid-cols-2">
            <div>
              <label htmlFor="cl-sort" className={LABEL}>Sort lines</label>
              <select id="cl-sort" value={sort} onChange={(e) => setSort(e.target.value)} className={SELECT}>
                <option value="none">Keep order</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
            <div>
              <label htmlFor="cl-dupekeep" className={LABEL}>Duplicates: keep</label>
              <select id="cl-dupekeep" value={keep} onChange={(e) => setKeep(e.target.value)} className={SELECT}>
                <option value="first">First occurrence</option>
                <option value="last">Last occurrence</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <Check checked={ci} onChange={setCi}>Case-insensitive duplicate match</Check>
          </div>
        </div>
      </div>
      <div className={CARD}>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">Result preview</p>
        <textarea readOnly rows={16} value={result} aria-label="Cleaned text" className={`mt-2 ${TEXTAREA}`} />
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => (result ? copy(result, { label: 'Cleaned text' }) : notify('Nothing to copy.', { error: true }))} className={BTN_PRIMARY}>Copy result</button>
          <button
            type="button"
            onClick={() => {
              if (!result && !text) return notify('Nothing to apply.', { error: true });
              setText(result);
              notify('Input replaced');
            }}
            className={BTN_SECONDARY}
          >
            Replace input
          </button>
          <button
            type="button"
            onClick={() => {
              setOps(NONE);
              setSort('none');
              setKeep('first');
              setCi(false);
              notify('Options reset');
            }}
            className={BTN_SECONDARY}
          >
            Reset options
          </button>
        </div>
        <Status msg={text ? 'Previewing cleaned text.' : ''} />
      </div>
    </div>
  );
}
