/* =====================================================================
   The PDF Studio's inherited design constants.

   The standalone studio declared these once on <html>. Inside the ATLAS
   University site they must not reach any other page, so they are set on
   the studio's own root element instead (app/pdf-studio/layout.js) - and
   on the off-screen host the PDF exporter renders into, which is appended
   to <body> and so sits outside that root (lib/pdf-studio/pdf/export.js).
   ===================================================================== */
import { ATLAS, INK } from '@/lib/pdf-studio/brand';
import { fontVars } from '@/lib/pdf-studio/fonts';

export const STUDIO_VARS = {
  ...fontVars,
  '--atlas-indigo': ATLAS.indigo,
  '--atlas-teal': ATLAS.teal,
  '--atlas-teal-deep': '#2E7F8A',
  '--ink': INK.base,
  '--ink-soft': INK.soft,
  '--muted': INK.muted,
  '--line': INK.line,
  '--line-soft': INK.lineSoft,
};
