'use client';

import { useMemo, useRef, useState } from 'react';
import { EXCEL_DEFAULTS, convertSheet } from '@/lib/brand/text';
import { downloadText } from '@/lib/brand/utils';
import { useBrandToast } from '../../BrandToast';
import { BTN_SECONDARY, CARD, FIELD, LABEL, MONO_TEXTAREA, SELECT } from '../../ui/styles';
import { Check, ClearButton, Status } from '../bits';

/*
 * ref Excel & CSV: paste cells from Excel / Google Sheets (or CSV) and convert them — choose the
 * output delimiter, keep rows, put each row on one line or join everything, trim cells, drop empty
 * rows or cells. A quoted RFC-4180 parser keeps embedded commas, quotes and newlines intact.
 */
export default function ExcelPanel() {
  const { notify, copy } = useBrandToast();
  const [text, setText] = useState('');
  const [o, setO] = useState(EXCEL_DEFAULTS);
  const inputRef = useRef(null);
  const set = (k) => (v) => setO((x) => ({ ...x, [k]: v }));
  const res = useMemo(() => convertSheet(text, o), [text, o]);

  return (
    <>
      <div className={CARD}>
        <h3 className="text-sm font-bold text-brand-indigo">Options</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 n640:grid-cols-2 n1024:grid-cols-3">
          <div>
            <label htmlFor="xl-infmt" className={LABEL}>Input format</label>
            <select id="xl-infmt" value={o.infmt} onChange={(e) => set('infmt')(e.target.value)} className={SELECT}>
              <option value="auto">Auto-detect</option>
              <option value="tsv">Tab-separated (Excel / Sheets)</option>
              <option value="csv">CSV (comma, quoted)</option>
            </select>
          </div>
          <div>
            <label htmlFor="xl-outfmt" className={LABEL}>Output format</label>
            <select id="xl-outfmt" value={o.outfmt} onChange={(e) => set('outfmt')(e.target.value)} className={SELECT}>
              <option value="csv">Comma CSV</option>
              <option value="tsv">Tab TSV</option>
              <option value="pipe">Pipe |</option>
              <option value="semicolon">Semicolon ;</option>
              <option value="custom">Custom…</option>
            </select>
          </div>
          {o.outfmt === 'custom' && (
            <div>
              <label htmlFor="xl-custom" className={LABEL}>Custom column delimiter</label>
              <input id="xl-custom" type="text" maxLength={8} value={o.custom} onChange={(e) => set('custom')(e.target.value)} className={FIELD} />
            </div>
          )}
          <div>
            <label htmlFor="xl-rowmode" className={LABEL}>Rows</label>
            <select id="xl-rowmode" value={o.rowmode} onChange={(e) => set('rowmode')(e.target.value)} className={SELECT}>
              <option value="preserve">Preserve rows &amp; columns</option>
              <option value="rowline">Each row → one line</option>
              <option value="joinall">Join everything into one line</option>
            </select>
          </div>
          {o.rowmode === 'joinall' && (
            <div>
              <label htmlFor="xl-rowsep" className={LABEL}>Row separator (join mode)</label>
              <select id="xl-rowsep" value={o.rowsep} onChange={(e) => set('rowsep')(e.target.value)} className={SELECT}>
                <option value="space">Space</option>
                <option value="comma">Comma + space</option>
                <option value="semicolon">Semicolon + space</option>
                <option value="pipe">Spaced pipe</option>
                <option value="newline">New line</option>
              </select>
            </div>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 n640:grid-cols-2 n1024:grid-cols-4">
          <Check checked={o.firstRow} onChange={set('firstRow')}>Include first row</Check>
          <Check checked={o.trim} onChange={set('trim')}>Trim cell spaces</Check>
          <Check checked={o.emptyRows} onChange={set('emptyRows')}>Remove empty rows</Check>
          <Check checked={o.emptyCells} onChange={set('emptyCells')}>
            Remove empty cells <span className="text-brand-ink/60">(shifts columns)</span>
          </Check>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 n1024:grid-cols-2">
        <div className={CARD}>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="xl-input" className="text-sm font-bold text-brand-indigo">Paste spreadsheet data</label>
            <ClearButton
              onClick={() => {
                setText('');
                inputRef.current?.focus();
                notify('Cleared');
              }}
            />
          </div>
          <textarea
            id="xl-input"
            ref={inputRef}
            rows={12}
            spellCheck={false}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={'Copy cells from Excel or Google Sheets and paste here.\nName\tCity\tRole\nFaizan\tMumbai\tDeveloper'}
            className={`mt-3 ${MONO_TEXTAREA} placeholder:text-brand-ink/50`}
          />
          <Status msg={res.detect} />
        </div>
        <div className={CARD}>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">Converted</p>
          <textarea readOnly rows={12} value={res.result} aria-label="Converted spreadsheet data" className={`mt-2 ${MONO_TEXTAREA}`} />
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => (res.result ? copy(res.result, { label: 'Converted data' }) : notify('Nothing to copy.', { error: true }))} className={BTN_SECONDARY}>Copy data</button>
            <button
              type="button"
              onClick={() => {
                if (!res.result) return notify('Nothing to download.', { error: true });
                downloadText('data.csv', res.csv || res.result, 'text/csv;charset=utf-8', true);
                notify('CSV downloaded');
              }}
              className={BTN_SECONDARY}
            >
              Download CSV
            </button>
            <button
              type="button"
              onClick={() => {
                if (!res.result) return notify('Nothing to download.', { error: true });
                downloadText('data.txt', res.result, 'text/plain;charset=utf-8');
                notify('TXT downloaded');
              }}
              className={BTN_SECONDARY}
            >
              Download TXT
            </button>
            <button
              type="button"
              onClick={() => {
                setO(EXCEL_DEFAULTS);
                notify('Options reset');
              }}
              className={BTN_SECONDARY}
            >
              Reset options
            </button>
          </div>
          <Status msg={res.status} kind={res.status ? 'ok' : ''} />
        </div>
      </div>
    </>
  );
}
