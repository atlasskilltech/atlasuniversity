/* =====================================================================
   The public flipbook route.

   /pdf-studio/flipbook/<id> is the page an external site embeds. It is public,
   statically generated for every document in the registry, and carries
   no studio chrome and no site header or footer (components/Schools/MainSiteOnly)
   - just the book and its controls.

   The document id is the registry slug the rest of the application
   already uses (`bdes`, `mba`, `refund-policy`, …): stable, readable,
   unique, and generated from the content rather than minted at export
   time, so an embed pasted into someone else's website keeps working.

   This site sets no X-Frame-Options or frame-ancestors header, so the route
   can be framed as it is; nothing in next.config.mjs is needed for it.
   ===================================================================== */
import { notFound } from 'next/navigation';
import FlipbookViewer from '@/components/PdfStudio/flipbook/FlipbookViewer';
import { DOCUMENTS, findDocument } from '@/lib/pdf-studio/registry';

export function generateStaticParams() {
  return DOCUMENTS.map((d) => ({ docId: d.id }));
}

export async function generateMetadata({ params }) {
  const { docId } = await params;
  const entry = findDocument(docId);
  if (!entry) return { title: 'Not found' };

  return {
    // Absolute, so the product name is not appended: this page is the
    // public viewer, and what it shows belongs to the university.
    title: { absolute: `${entry.title} — ATLAS SkillTech University` },
    description: `${entry.name} · ${entry.scope}`,
    // An embedded viewer should not be indexed apart from its host page.
    robots: { index: false, follow: false },
  };
}

export default async function FlipbookPage({ params }) {
  const { docId } = await params;
  const entry = findDocument(docId);

  if (!entry) notFound();

  return <FlipbookViewer entry={entry} />;
}
