/* =====================================================================
   A statutory document (ACT, ENFACT, OPEACT, UMBRELLA ACT, AIU).

   An issued document, not one designed here: each page is the document's
   own page image, laid on the same 210 x 297 mm sheet every other
   document uses, so the studio preview and the print route treat it like
   any other sheet. The image is fitted whole (`object-contain`) - the AIU
   letter is not A4-shaped and keeps its proportions on white.

   No header, footer or page chrome is added: the pages carry their own.
   The sheets declare their own scale set, which lib/fit does not know,
   so the fit pass leaves them - and every designed document - alone.

   These sheets are only ever rendered for a document that is OPEN (the
   studio's preview, a flipbook, a print view), so their images load
   then and never with the studio itself.
   ===================================================================== */

export default function statutoryDocumentSheets(doc) {
  return doc.pages.map((page, i) => (
    <section
      key={page.src}
      data-sheet=""
      data-scale-set="statutory"
      className="relative h-[297mm] w-[210mm] overflow-hidden bg-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={page.src}
        width={page.width}
        height={page.height}
        alt={`${doc.docTitle} - page ${i + 1} of ${doc.pages.length}`}
        decoding="async"
        className="absolute inset-0 block h-full w-full object-contain"
      />
    </section>
  ));
}
