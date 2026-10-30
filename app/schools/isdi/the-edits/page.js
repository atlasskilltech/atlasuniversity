/*
 * /schools/isdi/the-edits — reference/schools/isdi/the-edits.php (the PLURAL "the-edits" at the ISDI
 * root, distinct from the built events/the-edit SVG schedule page). A Tailwind-Play-CDN page WITH the ISDI
 * chrome (it includes header.php + footer.php). A flat `.php`, served at the SLASHLESS url (the trailing
 * slash 500s). Mostly full-width design banners (herobanner + strip, section-1 two-col, section-2 image,
 * section-4 image) plus one hand-coded event card (time badge, title, three speaker cards, Register
 * button). Not linked from the header menu; built on the user's scope decision to finish every remaining
 * ISDI reference page.
 *
 * Breakpoints: the reference's `sm:` is Play CDN's stock 640 (not the project's 480), and the project
 * already carries an `n640` (min-width 640) screen for the LP pages — so `sm:` maps 1:1 to `n640:` here.
 * `md:` (768) and `xl:` (1280) match the project. The 6 banner/section images ship as WebP; the speakers
 * strip, the three speaker photos and the three employer logos are byte-identical to the events/the-edit
 * page's box-1 PNGs and are reused from there.
 */
const A = '/assets/images/schools/isdi/the-edits';
const B1 = '/assets/images/schools/isdi/events/the-edit/section-3/box-1';

const hero = { desktop: `${A}/herobannerdesktop.webp`, strip: `${A}/stripdesktop.webp` };

const speakers = {
  strip: '/assets/images/schools/isdi/events/the-edit/section-3/speakers.png',
  people: [
    { photo: `${B1}/person/saurabh-gupta.png`, name: 'Saurabh Gupta', roleBefore: 'Co-Founder ZEUX ', brk: 'always', roleAfter: ' Innovation & Loopify', logo: `${B1}/logo/zeux.png` },
    { photo: `${B1}/person/sangeetha.png`, name: 'Sangeetha Jayaram', roleBefore: 'MD - ', brk: 'n640', roleAfter: 'Design, Accenture', logo: `${B1}/logo/accenture.png` },
    { photo: `${B1}/person/kapil.png`, name: 'Saurabh Gupta', roleBefore: 'Head of Experience Design ', brk: 'n640', roleAfter: 'Practice - Capgemini', logo: `${B1}/logo/capgemini.png` },
  ],
};

const TITLE = 'ATLAS SkillTech University';
export const metadata = {
  title: TITLE,
  description: 'Get in touch with Atlas Skilltech.',
  keywords: 'atlas, contact',
};

export default function TheEditsPage() {
  return (
    // the-edits.php has no `.font-sans` wrapper (unlike the LP pages), so its text inherits the ISDI body
    // font — Poppins on production (verified computed `font-family: Poppins`). The port uses the self-hosted
    // `Poppins ISDI` face, the site-wide ISDI font treatment.
    <div className="lp-bs font-poppins-isdi">
      {/* HERO — banner + strip stacked */}
      <section className="relative mx-auto h-full max-w-[1920px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.desktop} className="h-full w-full object-cover" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.strip} className="h-full w-full object-cover" alt="" />
      </section>

      {/* SECTION 1 — two-column images */}
      <section className="mx-auto px-2 pt-[40px] xl:max-w-[1280px] xl:px-5 xl:pt-[60px]">
        <div className="mx-auto grid items-center gap-10 md:grid-cols-2">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/section-1/1.webp`} className="w-auto" alt="" />
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/section-1/2.webp`} className="w-full" alt="" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — image + event card + image */}
      <section className="mx-auto px-2 pt-[40px] xl:max-w-[1280px] xl:px-5 xl:pt-[60px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/section-2/1.webp`} className="mb-5 h-full w-full object-cover" alt="" />

        <div className="flex flex-col items-start gap-4 n640:flex-row n640:items-center">
          {/* left: time + title */}
          <div className="w-full n640:w-1/2">
            <div className="flex h-9 w-44 items-center justify-center rounded-[10px] bg-gradient-to-r from-violet-500 to-sky-300 py-1">
              <div className="w-36 text-center text-sm font-bold text-white">10:30am to 12:00pm</div>
            </div>
            <div className="flex w-80 flex-col items-start justify-start gap-[3px]">
              <div className="w-80 text-2xl font-medium leading-8 text-zinc-800">Designing Technology<br />for Humans in an AI World</div>
              <div className="text-xs font-medium text-zinc-800">How designers ensure technology remains<br />human-centered in the age of AI.</div>
              <div className="flex h-7 w-64 items-center justify-center rounded-[10px] bg-zinc-400 py-1">
                <div className="text-center text-[10px] text-zinc-800">Centered Design · AI Integration · UX Strategy</div>
              </div>
            </div>
          </div>

          {/* middle: speakers */}
          <div className="w-full n640:w-1/2">
            <div className="flex flex-col items-start gap-4 n640:flex-row n640:items-center">
              <div className="hidden n640:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={speakers.strip} className="w-full" alt="" />
              </div>
              {speakers.people.map((p, i) => (
                <div key={i} className="flex w-full flex-col items-center justify-center text-center n640:w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-[50%] n640:w-full" src={p.photo} alt="" />
                  <p className="text-[20px] font-semibold n640:text-xs">{p.name}</p>
                  <p className="text-[18px] leading-tight text-gray-700 n640:text-[10px]">
                    {p.roleBefore}{p.brk === 'always' ? <br /> : <br className="hidden n640:block" />}{p.roleAfter}
                  </p>
                  <div className="flex w-full items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-full w-[50%] n640:w-full" src={p.logo} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right: register */}
          <div className="flex w-full justify-start n640:w-1/4 n640:justify-center">
            <div className="flex h-9 w-28 items-center justify-center rounded-[10px] bg-gradient-to-r from-violet-500 to-sky-300 px-5 py-2.5">
              <div className="text-sm font-bold text-white">Register</div>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/section-4/1.webp`} className="mt-5 h-full w-full object-cover" alt="" />
      </section>
    </div>
  );
}
