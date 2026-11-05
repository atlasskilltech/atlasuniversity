'use client';

import { useState } from 'react';
import { escapeHtml, sqlIn, toArray, unescapeHtml } from '@/lib/brand/text';
import { useBrandToast } from '../../BrandToast';
import { BTN_PRIMARY, BTN_SECONDARY, CARD, LABEL, MONO_TEXTAREA, SELECT } from '../../ui/styles';
import Tabs, { panelId, tabId } from '../../ui/Tabs';
import { Check, ClearButton, Status } from '../bits';

/*
 * ref Developer Tools: five sub-tools, each an input card and an output card — JSON
 * pretty-print / minify / validate, URL encode / decode, HTML escape / unescape (decoded as text
 * through a detached <textarea>, never executed), a SQL IN clause and a JS / JSON array builder.
 */
const SUBS = [
  { id: 'json', label: 'JSON Formatter' },
  { id: 'url', label: 'URL Encode/Decode' },
  { id: 'html', label: 'HTML Escape' },
  { id: 'sql', label: 'SQL IN Clause' },
  { id: 'arr', label: 'JS Array' },
];

function Pane({ id, label, value, onChange, placeholder, rows = 14, children, out, outRows = 16 }) {
  const { notify, copy } = useBrandToast();
  return (
    <div className="grid grid-cols-1 gap-6 n1024:grid-cols-2">
      <div className={CARD}>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={id} className="text-sm font-bold text-brand-indigo">{label}</label>
          <ClearButton onClick={() => onChange('')} />
        </div>
        <textarea id={id} rows={rows} spellCheck={false} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`mt-3 ${MONO_TEXTAREA}`} />
        {children}
      </div>
      <div className={CARD}>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">Output</p>
        <textarea readOnly rows={outRows} value={out} aria-label={`${label} output`} className={`mt-2 ${MONO_TEXTAREA}`} />
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => (out ? copy(out, { label: 'Result' }) : notify('Nothing to copy.', { error: true }))} className={BTN_PRIMARY}>Copy result</button>
        </div>
      </div>
    </div>
  );
}

export default function DevPanel() {
  const { notify } = useBrandToast();
  const [sub, setSub] = useState('json');
  const [json, setJson] = useState({ in: '', out: '', st: '', kind: '' });
  const [url, setUrl] = useState({ in: '', out: '', st: '', kind: '' });
  const [html, setHtml] = useState({ in: '', out: '' });
  const [sql, setSql] = useState({ in: '', out: '', quote: 'quoted' });
  const [arr, setArr] = useState({ in: '', out: '', mode: 'lines', fmt: 'js', drop: true, st: '', kind: '' });

  const jsonDo = (pretty, validateOnly) => {
    if (!json.in.trim()) return setJson((j) => ({ ...j, st: 'Enter some JSON.', kind: 'err' }));
    try {
      const parsed = JSON.parse(json.in);
      if (validateOnly) return setJson((j) => ({ ...j, st: 'Valid JSON.', kind: 'ok' }));
      setJson((j) => ({ ...j, out: pretty ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed), st: `Valid JSON · ${pretty ? 'formatted' : 'minified'}.`, kind: 'ok' }));
    } catch (e) {
      setJson((j) => ({ ...j, st: `Invalid JSON: ${e.message}`, kind: 'err' }));
    }
  };

  return (
    <div>
      <Tabs items={SUBS} value={sub} onChange={setSub} idPrefix="dev" label="Developer utilities" look="pill" className="mb-6 flex-wrap" />
      <div role="tabpanel" id={panelId('dev', sub)} aria-labelledby={tabId('dev', sub)}>
        {sub === 'json' && (
          <Pane id="dev-json-input" label="JSON input" value={json.in} onChange={(v) => setJson((j) => ({ ...j, in: v }))} placeholder='{"name":"ATLAS","tools":["case","csv"]}' out={json.out}>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => jsonDo(true, false)} className={BTN_PRIMARY}>Pretty-print</button>
              <button type="button" onClick={() => jsonDo(false, false)} className={BTN_SECONDARY}>Minify</button>
              <button type="button" onClick={() => jsonDo(true, true)} className={BTN_SECONDARY}>Validate</button>
            </div>
            <Status msg={json.st} kind={json.kind} />
          </Pane>
        )}
        {sub === 'url' && (
          <Pane id="dev-url-input" label="Text / URL" value={url.in} onChange={(v) => setUrl((u) => ({ ...u, in: v }))} placeholder="https://example.com/?q=hello world & more" out={url.out}>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  try {
                    setUrl((u) => ({ ...u, out: encodeURIComponent(u.in), st: 'Encoded.', kind: 'ok' }));
                  } catch (e) {
                    setUrl((u) => ({ ...u, st: `Could not encode: ${e.message}`, kind: 'err' }));
                  }
                }}
                className={BTN_PRIMARY}
              >
                Encode
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    const out = decodeURIComponent(url.in.replace(/\+/g, ' '));
                    setUrl((u) => ({ ...u, out, st: 'Decoded.', kind: 'ok' }));
                  } catch {
                    setUrl((u) => ({ ...u, st: 'Invalid URL-encoded input (bad % sequence).', kind: 'err' }));
                  }
                }}
                className={BTN_SECONDARY}
              >
                Decode
              </button>
            </div>
            <Status msg={url.st} kind={url.kind} />
          </Pane>
        )}
        {sub === 'html' && (
          <Pane id="dev-html-input" label="HTML" value={html.in} onChange={(v) => setHtml((h) => ({ ...h, in: v }))} placeholder="<p>Hello &amp; welcome</p>" out={html.out}>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => setHtml((h) => ({ ...h, out: escapeHtml(h.in) }))} className={BTN_PRIMARY}>Escape</button>
              <button type="button" onClick={() => setHtml((h) => ({ ...h, out: unescapeHtml(h.in) }))} className={BTN_SECONDARY}>Unescape</button>
            </div>
            <Status msg="Pasted HTML is never executed — it is only decoded as text." />
          </Pane>
        )}
        {sub === 'sql' && (
          <Pane id="dev-sql-input" label="Values (one per line)" rows={12} outRows={12} value={sql.in} onChange={(v) => setSql((q) => ({ ...q, in: v }))} placeholder={"Mumbai\nPune\nO'Brien"} out={sql.out}>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label htmlFor="dev-sql-quote" className={LABEL}>Values</label>
              <select id="dev-sql-quote" value={sql.quote} onChange={(e) => setSql((q) => ({ ...q, quote: e.target.value }))} className={`${SELECT} mt-0 w-auto`}>
                <option value="quoted">Quoted (strings)</option>
                <option value="unquoted">Unquoted (numbers)</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  const out = sqlIn(sql.in, sql.quote === 'quoted');
                  if (out == null) {
                    setSql((q) => ({ ...q, out: '' }));
                    notify('Add some values first.', { error: true });
                  } else setSql((q) => ({ ...q, out }));
                }}
                className={BTN_PRIMARY}
              >
                Build IN clause
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-brand-ink/70">
              Formatting convenience only. In application code, use <span className="font-semibold text-brand-indigo">parameterized queries</span> rather than concatenating values into SQL.
            </p>
          </Pane>
        )}
        {sub === 'arr' && (
          <Pane id="dev-arr-input" label="Values" rows={12} value={arr.in} onChange={(v) => setArr((a) => ({ ...a, in: v }))} placeholder={'apple\nbanana\nC:\\path\\to\nsay "hi"'} out={arr.out} outRows={14}>
            <div className="mt-4 grid grid-cols-1 gap-3 n640:grid-cols-3">
              <div>
                <label htmlFor="dev-arr-mode" className={LABEL}>Split input by</label>
                <select id="dev-arr-mode" value={arr.mode} onChange={(e) => setArr((a) => ({ ...a, mode: e.target.value }))} className={SELECT}>
                  <option value="lines">New lines</option>
                  <option value="comma">Commas</option>
                </select>
              </div>
              <div>
                <label htmlFor="dev-arr-fmt" className={LABEL}>Output</label>
                <select id="dev-arr-fmt" value={arr.fmt} onChange={(e) => setArr((a) => ({ ...a, fmt: e.target.value }))} className={SELECT}>
                  <option value="js">JS array</option>
                  <option value="json">JSON array</option>
                </select>
              </div>
              <div className="flex items-end pb-2">
                <Check checked={arr.drop} onChange={(v) => setArr((a) => ({ ...a, drop: v }))}>Drop empty values</Check>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const r = toArray(arr.in, arr.mode, arr.fmt, arr.drop);
                  if (!r) setArr((a) => ({ ...a, out: '', st: 'No values to convert.', kind: 'err' }));
                  else setArr((a) => ({ ...a, out: r.out, st: `${r.n} value(s) converted.`, kind: 'ok' }));
                }}
                className={BTN_PRIMARY}
              >
                Build array
              </button>
            </div>
            <Status msg={arr.st} kind={arr.kind} />
          </Pane>
        )}
      </div>
    </div>
  );
}
