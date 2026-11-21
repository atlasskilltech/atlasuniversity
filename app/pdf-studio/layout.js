/* =====================================================================
   ATLAS Tech PDF Studio - the shell the PUBLIC /pdf-studio routes share:
   the embeddable flipbook viewer (/pdf-studio/flipbook/<id>) and the bare
   print view (/pdf-studio/print/<id>). Both render without the site header
   and footer (components/Schools/MainSiteOnly).

   The studio itself (designing, previewing and exporting the documents) is
   an admin tool now, at /admin/pdf-studio (admin role); the old /pdf-studio
   address redirects there (next.config.mjs). The flipbook and print routes
   stay public because embeds on other websites and the public Mandatory
   Disclosures page point at them.
   ===================================================================== */
import StudioShell from '@/components/PdfStudio/StudioShell';

export default function PdfStudioLayout({ children }) {
  return <StudioShell>{children}</StudioShell>;
}
