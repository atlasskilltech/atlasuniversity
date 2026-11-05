'use client';

import { useRef, useState } from 'react';
import { countWords, findReplace } from '@/lib/brand/text';
import { useBrandToast } from '../../BrandToast';
import { BTN_PRIMARY, BTN_SECONDARY, CARD, LABEL, TEXTAREA } from '../../ui/styles';
import { Check, ClearButton, Counts, Status } from '../bits';

/*
 * ref Find & Replace: live preview with a match count; match case, whole word and regex mode.
 * Outside regex mode `$` in the replacement is literal. An invalid pattern keeps the last good
 * preview and reports the error.
 */
const MONO_FIELD =
  'mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 font-mono text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal';

export default function FindPanel() {
  const { notify, copy } = useBrandToast();
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [repl, setRepl] = useState('');
  const [flags, setFlags] = useState({ matchCase: false, wholeWord: false, regex: false });
  const inputRef = useRef(null);
  const r = findReplace(text, find, repl, flags);
  /* an invalid pattern keeps the last good preview (ref: the result is only written on success) */
  const [lastGood, setLastGood] = useState('');
  if (r.result != null && r.result !== lastGood) setLastGood(r.result);
  const result = r.result == null ? lastGood : r.result;
  const flag = (k) => (v) => setFlags((f) => ({ ...f, [k]: v }));

  return (
    <div className="grid grid-cols-1 gap-6 n1024:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div className={CARD}>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="fr-input" className="text-sm font-bold text-brand-indigo">Input</label>
            <ClearButton
              onClick={() => {
                setText('');
                inputRef.current?.focus();
                notify('Cleared');
              }}
            />
          </div>
          <textarea id="fr-input" ref={inputRef} rows={8} spellCheck={false} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text to search…" className={`mt-3 ${TEXTAREA} placeholder:text-brand-ink/50`} />
          <Counts items={[[text.length, 'characters'], [countWords(text), 'words']]} />
        </div>
        <div className={CARD}>
          <div className="grid grid-cols-1 gap-3 n640:grid-cols-2">
            <div>
              <label htmlFor="fr-find" className={LABEL}>Find</label>
              <input id="fr-find" type="text" value={find} onChange={(e) => setFind(e.target.value)} placeholder="search for…" className={MONO_FIELD} />
            </div>
            <div>
              <label htmlFor="fr-replace" className={LABEL}>Replace with</label>
              <input id="fr-replace" type="text" value={repl} onChange={(e) => setRepl(e.target.value)} placeholder="replace with…" className={MONO_FIELD} />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <Check checked={flags.matchCase} onChange={flag('matchCase')}>Match case</Check>
            <Check checked={flags.wholeWord} onChange={flag('wholeWord')}>Whole word</Check>
            <Check checked={flags.regex} onChange={flag('regex')}>Regex mode</Check>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => r.status && notify(r.status.replace(/ \(regex\)$/, ''), { error: r.kind === 'err' })} className={BTN_PRIMARY}>
              Replace all
            </button>
          </div>
          <Status msg={r.status} kind={r.kind} />
        </div>
      </div>
      <div className={CARD}>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">Result preview</p>
        <textarea readOnly rows={16} value={result} aria-label="Find and replace result" className={`mt-2 ${TEXTAREA}`} />
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => (result ? copy(result, { label: 'Result' }) : notify('Nothing to copy.', { error: true }))} className={BTN_PRIMARY}>Copy result</button>
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
        </div>
      </div>
    </div>
  );
}
