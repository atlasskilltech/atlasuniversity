/* =====================================================================
   /pdf-studio - ATLAS Tech PDF Studio.

   The fee-structure and policy document studio, ported from the standalone
   ATLAS Tech PDF Studio application (its `/` route). Like the standalone
   app it runs as its own application: the site header and footer step aside
   on every /pdf-studio route (components/Schools/MainSiteOnly), and the
   studio's own header band opens the page.

   Every document is drawn by components/PdfStudio from the verbatim
   content in lib/pdf-studio/content, previewed here and exported to PDF in
   the browser - there are no stored PDF files to serve.
   ===================================================================== */
import Studio from '@/components/PdfStudio/studio/Studio';
import { PRODUCT } from '@/lib/pdf-studio/product';

export const metadata = {
  title: `${PRODUCT.name} – ATLAS SkillTech University`,
  description:
    'Design, preview and export the ATLAS SkillTech University fee structures and policy documents as print-ready PDFs and embeddable flipbooks.',
  alternates: { canonical: 'https://atlasuniversity.edu.in/pdf-studio' },
};

export default function PdfStudioPage() {
  return <Studio />;
}
