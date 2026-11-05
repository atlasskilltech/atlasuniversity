/*
 * The Brand Kit's own site footer — reference/brand/components/footer.html. Rendered only on /brand
 * (app/brand/layout.js). "Brand Kit" is the current page, so it carries the reference's active
 * treatment (layout.js markActive: white + underline, aria-current="page"); the three tool links
 * are anchors to the #tools section rather than separate pages.
 *
 * The fine print is the reference's, with two facts brought up to date for this site: the web
 * typeface is Manrope (the ATLAS site font) and the files live under /assets/brand/logos.
 */
const LINK = 'text-white/80 no-underline underline-offset-4 transition hover:text-white hover:underline';
const LINKS = [
  ['#tools-text', 'Text Converter'],
  ['#tools-image', 'Image Tools'],
  ['#tools-pdf', 'PDF Tools'],
];

export default function BrandFooter() {
  return (
    <footer className="bg-brand-indigo font-sans text-white/80">
      <div className="mx-auto flex max-w-[84rem] flex-col gap-8 px-4 py-12 n640:px-6 md:flex-row md:items-center md:justify-between n1024:px-10">
        <div className="flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brand/logos/atlas/atlas-skilltech-circle.svg" alt="" width={56} height={56} className="h-14 w-14" />
          <div>
            <p className="m-0 font-bold text-white">ATLAS SkillTech University</p>
            <p className="m-0 text-sm">Brand kit &middot; logos, colors and browser-based tools</p>
          </div>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm font-semibold n640:grid-cols-4 md:flex md:gap-7">
          <a href="/brand" aria-current="page" className="text-white underline underline-offset-4 transition hover:text-white">
            Brand Kit
          </a>
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className={LINK}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-0 border-t border-solid border-white/10">
        <p className="m-0 mx-auto max-w-[84rem] px-4 py-5 text-xs leading-relaxed text-white/60 n640:px-6 n1024:px-10">
          Logo artwork is set in Gotham; this site uses Manrope as a free web stand-in. All files are in the{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">assets/brand/logos</code> folder.
        </p>
      </div>
    </footer>
  );
}
