'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { H2, LEAD, PAGE, SECTION_Y } from '../ui/styles';
import Tabs, { panelId, tabId } from '../ui/Tabs';

/*
 * The brand kit's three tool pages (ref text-converter.html, image-tools.html, pdf-tools.html) as
 * one section of /brand with a tab each. Each tool is code-split and only downloaded when its tab
 * is first opened; once opened it stays mounted, so switching tabs keeps your work.
 *
 * Deep links: #tools-text · #tools-image · #tools-pdf select a tab (the brand nav links to them),
 * and #pdf-<tool> opens a PDF tool directly.
 */
const Loading = () => <p className="py-10 text-center text-sm font-semibold text-brand-ink/70">Loading tool…</p>;
const TextConverter = dynamic(() => import('./TextConverter'), { ssr: false, loading: Loading });
const ImageTools = dynamic(() => import('./ImageTools'), { ssr: false, loading: Loading });
const PdfTools = dynamic(() => import('./PdfTools'), { ssr: false, loading: Loading });

const TABS = [
  { id: 'text', label: 'Text Converter', Panel: TextConverter },
  { id: 'image', label: 'Image Tools', Panel: ImageTools },
  { id: 'pdf', label: 'PDF Tools', Panel: PdfTools },
];

function tabFromHash() {
  const h = window.location.hash.slice(1);
  if (h.startsWith('pdf-')) return 'pdf';
  const m = /^tools-(text|image|pdf)$/.exec(h);
  return m ? m[1] : null;
}

export default function BrandTools() {
  const [tab, setTab] = useState('text');
  const [seen, setSeen] = useState({ text: true });

  const select = (id) => {
    setTab(id);
    setSeen((s) => (s[id] ? s : { ...s, [id]: true }));
  };

  useEffect(() => {
    const sync = () => {
      const id = tabFromHash();
      if (!id) return;
      setTab(id);
      setSeen((s) => (s[id] ? s : { ...s, [id]: true }));
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 border-0 border-t border-solid border-brand-line bg-white">
      <div className={`${PAGE} ${SECTION_Y} relative`}>
        {/* anchor targets for the brand nav's three tool links */}
        {TABS.map((t) => (
          <span key={t.id} id={`tools-${t.id}`} aria-hidden="true" className="absolute top-0 block scroll-mt-20" />
        ))}
        <p className="text-sm font-semibold text-brand-teal">ATLAS brand tools</p>
        <h2 id="tools-title" className={`mt-2 ${H2}`}>Brand tools</h2>
        <p className={`${LEAD} max-w-2xl`}>Convert text, prepare images and work with PDFs without leaving the brand kit. Everything runs in your browser — nothing is uploaded.</p>

        <div className="mt-8 border-0 border-b border-solid border-brand-line">
          <Tabs items={TABS} value={tab} onChange={select} idPrefix="tools" label="Brand tools" />
        </div>
        {TABS.map((t) => (
          <div key={t.id} role="tabpanel" id={panelId('tools', t.id)} aria-labelledby={tabId('tools', t.id)} hidden={tab !== t.id} className="pt-8">
            {seen[t.id] && <t.Panel />}
          </div>
        ))}
      </div>
    </section>
  );
}
