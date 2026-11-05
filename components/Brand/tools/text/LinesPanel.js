'use client';

import { useRef, useState } from 'react';
import { LINE_ACTIONS, countLines, lineAction } from '@/lib/brand/text';
import { useBrandToast } from '../../BrandToast';
import { BTN_PRIMARY, BTN_SECONDARY, CARD, FIELD, LABEL, MONO_TEXTAREA, TEXTAREA } from '../../ui/styles';
import { Check, ClearButton, Counts, Status } from '../bits';

/* ref Lines & Lists: thirteen one-click line actions with a delimiter and prefix/suffix text. */
export default function LinesPanel() {
  const { notify, copy } = useBrandToast();
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [delim, setDelim] = useState(', ');
  const [affix, setAffix] = useState('');
  const [ignoreBlank, setIgnoreBlank] = useState(true);
  const inputRef = useRef(null);

  const run = (action) => {
    if (!text.trim()) return notify('Add some lines first.', { error: true });
    setResult(lineAction(action, text, { delim, affix, ignoreBlank }));
    setStatus('Done.');
  };

  return (
    <div className="grid grid-cols-1 gap-6 n1024:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div className={CARD}>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="ln-input" className="text-sm font-bold text-brand-indigo">Input</label>
            <ClearButton
              onClick={() => {
                setText('');
                setResult('');
                setStatus('');
                inputRef.current?.focus();
                notify('Cleared');
              }}
            />
          </div>
          <textarea id="ln-input" ref={inputRef} rows={8} spellCheck={false} value={text} onChange={(e) => setText(e.target.value)} placeholder="One item per line…" className={`mt-3 ${TEXTAREA} placeholder:text-brand-ink/50`} />
          <Counts items={[[countLines(text), 'lines']]} />
        </div>
        <div className={CARD}>
          <h3 className="text-sm font-bold text-brand-indigo">Actions</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 n640:grid-cols-3">
            {LINE_ACTIONS.map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => run(k)}
                className="rounded-lg border-0 bg-transparent px-3 py-2 text-left text-xs font-bold text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 n640:grid-cols-3">
            <div>
              <label htmlFor="ln-delim" className={LABEL}>List delimiter</label>
              <input id="ln-delim" type="text" maxLength={8} value={delim} onChange={(e) => setDelim(e.target.value)} className={FIELD} />
            </div>
            <div>
              <label htmlFor="ln-affix" className={LABEL}>Prefix / suffix text</label>
              <input id="ln-affix" type="text" value={affix} onChange={(e) => setAffix(e.target.value)} placeholder="e.g. > " className={FIELD} />
            </div>
            <div className="flex items-end pb-2">
              <Check checked={ignoreBlank} onChange={setIgnoreBlank}>Ignore blank lines</Check>
            </div>
          </div>
        </div>
      </div>
      <div className={CARD}>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">Result</p>
        <textarea readOnly rows={16} value={result} aria-label="Lines and lists result" className={`mt-2 ${MONO_TEXTAREA}`} />
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => (result ? copy(result, { label: 'Result' }) : notify('Nothing to copy.', { error: true }))} className={BTN_PRIMARY}>Copy result</button>
          <button
            type="button"
            onClick={() => {
              if (!result) return notify('Nothing to apply.', { error: true });
              setText(result);
              notify('Input replaced');
            }}
            className={BTN_SECONDARY}
          >
            Replace input
          </button>
        </div>
        <Status msg={status} kind={status ? 'ok' : ''} />
      </div>
    </div>
  );
}
