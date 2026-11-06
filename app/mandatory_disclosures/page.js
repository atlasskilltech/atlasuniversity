/**
 * /mandatory_disclosures - port of reference/mandatory_disclosures/index.php.
 *
 * Under the site header and footer (the root layout's), like every ATLAS page. The reference reserves
 * the fixed header's room itself - `#body { margin-top: 56px; padding-top: 199px }`, 40 / 80 at
 * <=992px - so no HeaderSpacer is rendered; DisclosureAccordion carries those values.
 *
 * Deviation: on production at <=992px the page's extra Bootstrap stylesheet collides with the site
 * header's own CSS and leaves the header in normal flow, 776px tall, above the list (measured at
 * 390px). That is a defect of the page's stylesheet stack, not part of the design; the shared header
 * here is unaffected, so the list starts where the page's own rules put it.
 *
 * The reference has no visible heading; the <h1> is for assistive technology only.
 */
import DisclosureAccordion from '@/components/MandatoryDisclosures/DisclosureAccordion';
import { mandatoryDisclosures as data } from '@/lib/mandatoryDisclosuresContent';

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
  keywords: data.meta.keywords,
  alternates: { canonical: data.meta.canonical },
};

export default function MandatoryDisclosuresPage() {
  return (
    <main>
      <h1 className="sr-only">Mandatory Disclosures</h1>
      <DisclosureAccordion sections={data.sections} />
    </main>
  );
}
