/* eslint-disable @next/next/no-img-element -- the reference's own photograph and logo at their authored size */
import CrmWidget from '@/components/ui/CrmWidget';

/*
 * /contact-us — production's https://atlasuniversity.edu.in/contact-us/ (the nav's "Contact Us"; there is
 * no contact page under reference/, so the live page is the reference). It is a standalone document:
 * no site header or footer (components/Schools/MainSiteOnly steps the ATLAS chrome aside), a 2/5 photo
 * panel with the address over it and a 3/5 panel holding the CRM enquiry form.
 *
 * Markup transcribed from production. Its Tailwind is the Play CDN, whose `sm` / `lg` are 640 / 1024 —
 * this project's `n640` / `n1024`. Its `font-sans` is Manrope, which is this project's default too.
 *
 *  - the form is the shared components/ui/CrmWidget (widget 69ba29dc…, the iframe embed). Production
 *    sets the frame's src from a `data-src` after load, appending every `utm_*` parameter of the page
 *    URL — `forwardUtm` + `deferSrc` do the same — and shows a spinner until the frame's `load`;
 *  - the min-height reserves the form's measured height up front, as production does (no layout shift);
 *  - the photograph is production's 527KB PNG as a 47KB WebP (SSIM 0.999, opaque); the logo is
 *    byte-identical to public/assets/logos/atlas-logo-footer.png and reuses it.
 */
const TITLE = 'Contact & Enquiry – ATLAS SkillTech University';
const DESCRIPTION =
  'Contact admissions or support teams for program queries, campus visits, application help and detailed information to guide your enrollment process.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/contact-us/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ATLAS SkillTech University',
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://atlasuniversity.edu.in/contact-us/',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/* written out in full (not built by crmWidgetUrl) so the /map CRM inventory can read it from source */
const FORM = 'https://crm.atlasskilltech.app/widgets/69ba29dca82f5d7ddc539cc9/embed';

/* ref #crmLoader — removed once the frame has loaded */
const LOADER = (
  <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 bg-white">
    <div className="h-11 w-11 animate-spin rounded-full border-4 border-solid border-emerald-50 border-t-emerald-500" />
    <p className="text-[12px] font-bold uppercase leading-[16px] tracking-[0.12em] text-emerald-600">ATLAS CRM</p>
    <span className="sr-only">Loading enquiry form…</span>
  </div>
);

export default function ContactUsPage() {
  return (
    <main className="bg-white font-sans text-slate-900 antialiased">
      <div className="flex flex-col n1024:min-h-screen n1024:flex-row">
        {/* Left: contact image + overlay content. No fixed height: the section stretches to the row
            and to its own content, so the heading and address are never clipped. */}
        <section className="relative text-white n1024:w-2/5">
          <img
            src="/assets/images/contact/contact-us-banner.webp"
            alt="Faculty lecturing students in a tiered classroom hall at ATLAS SkillTech University"
            width={573}
            height={772}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="relative px-[clamp(1.25rem,4.86vw,4.375rem)] py-[clamp(2rem,6.7vh,3.75rem)]">
            <img
              src="/assets/logos/atlas-logo-footer.png"
              alt="ATLAS SkillTech University"
              width={102}
              height={46}
              className="h-10 w-[89px] n640:h-[46px] n640:w-[102px]"
            />

            <p className="mt-[clamp(1.25rem,4.7vh,2.625rem)] text-[clamp(1.125rem,1.4vw+0.75rem,1.5rem)] font-bold">
              Contact Us
            </p>

            <h1 className="mt-[clamp(1.5rem,7.4vh,4.125rem)] break-words text-[clamp(1.75rem,5.6vw,2.5rem)] font-medium leading-[1.18] n1024:text-[clamp(2.25rem,2.885vw+0.904rem,3.5rem)]">
              Have any queries?
              <br />
              We are here.
            </h1>

            <address className="mt-[clamp(1.5rem,9.9vh,5.5625rem)] text-[clamp(1rem,0.6vw+0.85rem,1.125rem)] font-medium not-italic leading-[1.5]">
              ATLAS SkillTech University
              <br />
              Tower 1, Equinox Business Park
              <br />
              Kurla West, Mumbai - 400070
            </address>
          </div>
        </section>

        {/* Right: the CRM enquiry form */}
        <section className="w-full bg-white px-[clamp(0.75rem,2.78vw,2.5rem)] py-[clamp(2rem,10.7vh,6rem)] n1024:w-3/5">
          <h2 className="sr-only">Enquiry form</h2>
          <div className="relative mx-auto min-h-[880px] w-full max-w-3xl n640:min-h-[850px] n1024:min-h-[830px]">
            <CrmWidget
              src={FORM}
              title="ATLAS SkillTech University enquiry form"
              forwardUtm
              deferSrc
              loader={LOADER}
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
