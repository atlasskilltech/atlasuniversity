'use client';

import { useState } from 'react';
import Tabs, { panelId, tabId } from '../ui/Tabs';
import CasePanel from './text/CasePanel';
import CleanerPanel from './text/CleanerPanel';
import DevPanel from './text/DevPanel';
import ExcelPanel from './text/ExcelPanel';
import FindPanel from './text/FindPanel';
import LinesPanel from './text/LinesPanel';

/*
 * ref text-converter.html: "Text case converter" — six workspaces on one tab strip. Everything runs
 * in the browser; nothing is uploaded. Inactive panels unmount, so each keeps its own fresh state
 * the way the reference's hidden panels do on a fresh page.
 */
const TABS = [
  { id: 'case', label: 'Text Case', Panel: CasePanel },
  { id: 'excel', label: 'Excel & CSV', Panel: ExcelPanel },
  { id: 'clean', label: 'Text Cleaner', Panel: CleanerPanel },
  { id: 'find', label: 'Find & Replace', Panel: FindPanel },
  { id: 'lines', label: 'Lines & Lists', Panel: LinesPanel },
  { id: 'dev', label: 'Developer Tools', Panel: DevPanel },
];

export default function TextConverter() {
  const [tab, setTab] = useState('case');
  const cur = TABS.find((t) => t.id === tab);
  return (
    <div>
      <p className="max-w-2xl leading-relaxed">
        Paste any text and convert it into twelve letter cases and programming naming conventions — plus spreadsheet, clean-up, find-and-replace, list and developer helpers. Everything runs in your
        browser. Nothing is uploaded.
      </p>
      <div className="mt-6 border-0 border-b border-solid border-brand-line">
        <Tabs items={TABS} value={tab} onChange={setTab} idPrefix="tc" label="Text tools" />
      </div>
      <div role="tabpanel" id={panelId('tc', tab)} aria-labelledby={tabId('tc', tab)} className="pt-8">
        <cur.Panel />
      </div>
    </div>
  );
}
