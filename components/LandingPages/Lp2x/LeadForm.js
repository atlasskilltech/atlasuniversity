'use client';

import CrmWidget, { crmWidgetUrl } from '@/components/ui/CrmWidget';
import NpfWidget from '../shared/NpfWidget';

/**
 * The hero form slot, by kind (see lib/landing/lp2x/variants.js for what each page renders and why):
 *   crm-script   the ATLAS CRM loader dropped into the slot; it appends its own 720px iframe
 *   crm-iframe   `.atlas-embed-wrap` — a relative, full-width box of fixed height holding the CRM frame
 *                (`border: none; width/height 100%`), the visitor's utm_* forwarded onto its src after
 *                hydration exactly as the reference's inline script does
 *   npf          a NoPaperForms widget
 *   placeholder  nothing is published (the reference's form was UAT-only) — a box of the same height
 */
export default function LeadForm({ form }) {
  if (form.kind === 'crm-script') {
    return <CrmWidget mode="script" src={crmWidgetUrl(form.id, 'embed.js')} scriptAttrs={form.attrs} />;
  }
  if (form.kind === 'crm-iframe') {
    return (
      <div className="relative h-[600px] w-full max-w-full">
        <CrmWidget
          src={crmWidgetUrl(form.id)}
          title="Admissions enquiry form"
          width={400}
          height={form.height}
          frameBorder={0}
          forwardUtm
          deferSrc
          className="h-full w-full max-w-full border-none"
        />
      </div>
    );
  }
  if (form.kind === 'npf') {
    return <NpfWidget widget={form.widget} height={form.height} className={form.box} />;
  }
  /* placeholder: upstream form is on a UAT host and is intentionally not published */
  return <div className="relative h-[600px] w-full" />;
}
