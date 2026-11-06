/* =====================================================================
   The print route.

   /pdf-studio/print/<id> shows just the sheets of one document - no interface,
   no site header or footer - for
   printing straight from the browser (Ctrl+P, margins "None") or for
   checking a design against the approved artwork. /pdf-studio/print/all shows the
   whole collection.

   The sheets are the very same components the studio previews and the
   exporter rasterises, so there is no second version of a document that
   could drift from the first.
   ===================================================================== */
import { notFound } from 'next/navigation';
import PrintSheets from '@/components/PdfStudio/studio/PrintSheets';
import { DOCUMENTS, findDocument } from '@/lib/pdf-studio/registry';

export function generateStaticParams() {
  return [{ docId: 'all' }, ...DOCUMENTS.map((d) => ({ docId: d.id }))];
}

export async function generateMetadata({ params }) {
  const { docId } = await params;
  // A working view of the sheets, not a page to be found by search.
  const robots = { index: false, follow: false };
  if (docId === 'all') return { title: 'All documents', robots };
  const entry = findDocument(docId);
  return { title: entry ? entry.file.replace(/\.pdf$/, '') : 'Not found', robots };
}

export default async function PrintPage({ params }) {
  const { docId } = await params;
  const entries = docId === 'all' ? DOCUMENTS : [findDocument(docId)];

  if (entries.some((entry) => !entry)) notFound();

  return <PrintSheets entries={entries} />;
}
