/* =====================================================================
   ATLAS Tech PDF Studio - the shell every /pdf-studio route shares.

   Ported from the standalone studio's root layout. There it styled <html>
   and <body>; here those belong to the ATLAS University site, so the same
   things are scoped to this wrapper instead:

     - the self-hosted Montserrat (display) and Roboto (text) faces the
       documents are set in (lib/pdf-studio/fonts.js, next/font/local, so
       nothing is fetched from a font CDN);
     - the design constants the sheets inherit (lib/pdf-studio/theme.js);
     - the studio's base type and colour.

   The site header and footer are left to the root layout. The studio page
   renders inside them; the bare flipbook and print routes step them aside
   (components/Schools/MainSiteOnly).
   ===================================================================== */
import { fontClassName } from '@/lib/pdf-studio/fonts';
import { STUDIO_VARS } from '@/lib/pdf-studio/theme';

export default function PdfStudioLayout({ children }) {
  /* Two elements on purpose. next/font's classes each set a font-family of
     their own, and on one element with the studio's family utility the
     stylesheet order decides which wins - so the font classes (whose job
     here is only to load the faces) sit on the outer box, and the studio's
     type is declared on the inner one, which is what the standalone studio
     did with <html> and <body>. */
  return (
    <div style={STUDIO_VARS} className={fontClassName}>
      <div className="bg-slate-100 [font-family:var(--font-display)] text-slate-800 antialiased">
        {children}
      </div>
    </div>
  );
}
