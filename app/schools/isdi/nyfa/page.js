import LpCarousel from '@/components/Schools/ISDI/PartnerLP/LpCarousel';
import {
  hero,
  strip,
  intro,
  stackCards,
  eligibility,
  skillsIntro,
  courses,
  whoCanApply,
  whyCards,
  pathwayCards,
  about,
  cta,
  disclaimer,
} from '@/lib/schools/isdi/nyfaContent';

/*
 * ref nyfa/index.php `$title`/`$description` — the ISDI template's unedited placeholders,
 * the same pair the other LP and advantage pages carry. Transcribed as authored. Served
 * at the trailing-slash url (301 from slashless).
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/nyfa';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: URL },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/* Play CDN's default `font-sans` stack — the reference wraps its content in `font-sans`,
   which on the Tailwind Play CDN is the OS system-ui stack, not the project's Manrope. */
const SANS = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

/* why-choose card (shared between the desktop grid and the mobile carousel) */
function WhyCard({ card, i }) {
  return (
    <div className="h-full min-h-[220px] rounded-2xl bg-isdi-blue bg-[url('/assets/images/schools/isdi/about/beliefs/vector-d.png')] bg-[length:180px_auto] bg-right-bottom bg-no-repeat p-6">
      <span className="inline-block rounded bg-isdi-pink px-2.5 py-1 text-[14px] font-semibold text-white">#{i + 1}</span>
      <h3 className="mt-3 mb-3 text-[20px] leading-[1.4] font-semibold text-white">{card.title}</h3>
      <p className="text-[14px] leading-relaxed text-white/90">{card.text}</p>
    </div>
  );
}

function PathwayCard({ card, i }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-isdi-blue md:h-[420px] n1024:h-[400px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image} alt={`Card ${i + 1}`} loading="lazy" className="h-72 w-full flex-shrink-0 object-cover n1024:h-64" />
      <div className="flex flex-1 items-start overflow-hidden p-6">
        <p className="text-[14px] leading-relaxed text-white">
          <span className="font-semibold">{card.text}</span>
        </p>
      </div>
    </div>
  );
}

export default function NyfaPage() {
  return (
    <main id="isdi-nyfa" className="lp-bs text-[#1a1a1a]" style={{ fontFamily: SANS }}>
      {/* 1 — HERO */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="relative hidden h-[600px] w-full md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.desktop} alt={hero.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1366px] flex-col justify-end px-[62px] pb-[100px]">
            <h1 className="flex flex-wrap items-center gap-x-3 text-[36px] font-semibold leading-[1.2] text-white n1024:text-[42px]">{hero.heading}</h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 mb-8 bg-[#D20158] py-2.5 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
            <div className="mx-auto max-w-[1366px] px-[62px] text-[15px] leading-snug n1024:text-[16px]">{hero.subtitle}</div>
          </div>
        </div>
        <div className="relative w-full md:hidden">
          <div className="relative h-[480px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.mobile} alt={hero.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 z-10">
              <h1 className="mb-3 gap-x-2 text-[22px] font-semibold leading-tight text-white">{hero.heading}</h1>
              <div className="bg-[#D20158] px-4 py-2.5 text-[13px] leading-snug text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{hero.subtitle}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — FOUR-PANEL STRIP */}
      <section className="flex w-full flex-col bg-white md:flex-row [@media(max-width:767px)]:gap-[10px]">
        {strip.map((p, i) => (
          <div
            key={i}
            className="relative flex min-h-[180px] flex-1 flex-col justify-center overflow-hidden bg-right bg-no-repeat px-6 py-8 text-white md:h-[208px] md:px-16 md:py-0"
            style={{ backgroundColor: p.bg, backgroundImage: `url('${p.image}')` }}
          >
            <div className="relative z-10 mb-2 text-[20px] text-white md:mb-3 md:text-[16px]">{p.eyebrow}</div>
            <div className="relative z-10 text-[22px] font-medium leading-tight md:text-[21px]">{p.title}</div>
          </div>
        ))}
      </section>

      {/* 3 — INTRO */}
      <section className="overflow-hidden py-12 md:py-20">
        <div className="mx-auto max-w-[1366px] px-6 md:px-[62px]">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:gap-10">
            <div className="w-full md:w-[45%] md:flex-none">
              <h2 className="mt-4 mb-6 text-[20px] font-medium leading-[1.2] text-[#1a1a1a] md:mt-0 md:mb-8 md:text-[34px]">{intro.heading}</h2>
              <div className="space-y-4 text-[12px] leading-[1.65] text-[#333] md:space-y-5 md:text-[15px]">
                {intro.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="w-full md:flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={intro.image} loading="lazy" alt={intro.imageAlt} className="h-auto w-full rounded-tl-[60px] rounded-br-[60px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — HOW THIS PATHWAY WORKS (sticky stack cards) */}
      <section className="overflow-visible py-10 md:py-16">
        <div className="mx-auto max-w-[1366px] px-6 md:px-[62px]">
          <h2 className="mb-8 text-[20px] font-medium leading-[1.2] text-[#1a1a1a] md:mb-10 md:text-[36px]">How This Pathway Works</h2>
          {/* ref wraps these cards in `font-['Manrope']`, but production does NOT load
             Manrope, so it falls back to the same system sans the rest of the LP uses —
             reproduced by inheriting the wrapper's system stack (matches prod to the pixel). */}
          <div>
            {stackCards.map((card, idx) => (
              <div
                key={idx}
                className={`sticky top-0 origin-top [will-change:transform] flex h-auto flex-col overflow-hidden rounded-2xl bg-transparent mb-24 md:mb-36 md:min-h-[500px] md:flex-row md:rounded-none${idx === stackCards.length - 1 ? ' !mb-0' : ''}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img sizes="(max-width: 759px) 100vw, 759px" srcSet={card.srcSet} src={card.src} alt="" loading="lazy" className="h-[220px] w-full object-cover md:h-full md:w-[55%]" />
                <div className="flex w-full flex-col items-stretch justify-center gap-3 px-6 py-7 md:w-[45%] md:gap-7 md:px-14 md:py-10" style={{ backgroundColor: card.bg }}>
                  <div className="text-[20px] font-bold leading-tight text-white md:text-[30px] md:leading-[1.2]">{card.title}</div>
                  <p className="text-[14px] font-bold leading-snug text-white md:text-[15px] md:leading-[1.5]">
                    {card.intro}
                    {card.introBreak && (<><br /><br />{card.introEnd}</>)}
                  </p>
                  <ul className="list-disc space-y-2 pl-5 text-[13px] leading-snug text-white md:text-[15px] md:leading-[1.5]">
                    {card.items.map((it, i) => <li key={i}>{it}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — ELIGIBILITY */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm md:flex-row">
            <div className="flex flex-col justify-center bg-isdi-blue px-7 py-8 text-white md:w-[38%] md:px-9 md:py-12">
              <h2 className="mb-3 text-[22px] font-semibold leading-tight md:mb-4 md:text-[30px]">Eligibility Requirements</h2>
              <p className="mb-5 text-[13px] leading-[1.6] text-white/80 md:mb-6 md:text-[15px]">{eligibility.intro}</p>
              <span className="inline-flex w-fit items-center rounded-full bg-[#D20158] px-4 py-1.5 text-[12px] font-semibold text-white md:text-[13px]">{eligibility.items.length} Criteria</span>
            </div>
            <div className="flex flex-col justify-center bg-white px-6 py-5 md:w-[62%] md:px-9 md:py-8">
              {eligibility.items.map((req, i) => (
                <div key={i} className={`flex items-start gap-3 py-3.5 md:gap-4${i < eligibility.items.length - 1 ? ' border-b border-gray-100' : ''}`}>
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-isdi-pink md:h-7 md:w-7">
                    <svg className="h-3.5 w-3.5 text-white md:h-4 md:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="pt-0.5 text-[14px] leading-[1.5] text-gray-800 md:text-[15px]">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — SKILLS DEVELOPED (course grid) */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-8 md:mb-10">
            <h2 className="text-[24px] font-medium leading-tight text-gray-900 n640:text-[30px] n640:leading-[36px] md:text-[40px]">Skills Developed at <span className="text-isdi-pink">New York Film Academy</span></h2>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-600 md:text-[16px]">{skillsIntro}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 n640:grid-cols-2 n1024:grid-cols-3 md:gap-4">
            {courses.map((c, i) => (
              <div key={i} className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 transition hover:border-isdi-pink hover:shadow-md md:px-5">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] bg-blue-50 transition group-hover:bg-isdi-pink/10">
                  <svg className="h-[22px] w-[22px] text-isdi-blue transition group-hover:text-isdi-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={c.icon} strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="text-[15px] font-medium leading-snug text-gray-900 md:text-[16px]">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — WHO CAN APPLY */}
      <section className="bg-[#1E3A8A] py-10 md:py-14 n1024:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-8 flex flex-col gap-6 md:mb-10 n1024:flex-row n1024:items-start n1024:justify-between n1024:gap-10">
            <div className="n1024:max-w-3xl">
              <h2 className="mb-4 text-[24px] font-semibold leading-tight text-white n640:text-[30px] n640:leading-[36px] md:mb-5 md:text-[40px]">Who Can Apply</h2>
              <p className="text-[14px] leading-relaxed text-white/85 md:text-[16px]">{whoCanApply.text}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl md:rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={whoCanApply.image} alt={whoCanApply.imageAlt} loading="lazy" className="w-full object-cover md:aspect-auto md:h-[420px] n1024:h-[100vh]" />
          </div>
        </div>
      </section>

      {/* 8 — WHY CHOOSE THIS PATHWAY (desktop grid / mobile carousel) */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className="text-[24px] font-medium leading-tight text-gray-900 n640:text-[30px] n640:leading-[36px] md:text-[40px]">Why Choose This Pathway?</h2>
          </div>
          <div className="hidden grid-cols-2 gap-4 md:grid n1024:grid-cols-4">
            {whyCards.map((card, i) => <WhyCard key={i} card={card} i={i} />)}
          </div>
          <div className="md:hidden">
            <LpCarousel slides={whyCards.map((card, i) => <WhyCard key={i} card={card} i={i} />)} perView={{ base: 1, sm: 1, lg: 1 }} bullets="always" />
          </div>
        </div>
      </section>

      {/* 9 — WHO IS THIS PROGRAM FOR (carousel, 1/2/4 per view + arrows) */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className="text-[24px] font-medium leading-tight text-gray-900 n640:text-[30px] n640:leading-[36px] md:text-[40px]">Who Is This Program For</h2>
          </div>
          <LpCarousel
            slides={pathwayCards.map((card, i) => <PathwayCard key={i} card={card} i={i} />)}
            perView={{ base: 1, sm: 2, lg: 4 }}
            arrows
            bullets="mobile"
          />
        </div>
      </section>

      {/* 10 — ABOUT NYFA */}
      <section className="py-12 md:pb-16">
        <div className="hidden md:block">
          <div className="mx-auto max-w-[1366px] px-0">
            <div className="flex items-stretch">
              <div className="flex h-[80px] w-[120px] flex-shrink-0 items-center justify-center bg-[#011136]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={about.icon} alt="" className="h-9 w-9 object-contain" loading="lazy" />
              </div>
              <div className="flex h-[80px] flex-1 items-center bg-white px-8">
                <h2 className="text-[28px] font-semibold leading-tight text-[#011136] n1024:text-[32px]">About New York Film Academy</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <div className="flex items-stretch">
            <div className="flex w-[64px] flex-shrink-0 items-center justify-center bg-[#011136]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={about.icon} alt="" className="h-7 w-7 object-contain" loading="lazy" />
            </div>
            <div className="flex flex-1 items-center bg-white px-4 py-4">
              <h2 className="text-[18px] font-semibold leading-tight text-[#011136]">About New York Film Academy</h2>
            </div>
          </div>
        </div>
        <div className="bg-[#011136] text-white">
          <div className="mx-auto max-w-[1366px] px-6 py-8 md:px-[62px] md:py-12">
            <div className="flex flex-col items-stretch gap-6 md:flex-row md:gap-12">
              <div className="order-2 flex flex-col md:order-1 md:max-w-[45%] md:flex-1">
                {about.paragraphs.map((p, i) => <p key={i} className="mb-2 text-[13px] leading-[1.7] text-white md:mb-4 md:text-[18px]">{p}</p>)}
                <div>
                  <a href={about.link} className="inline-flex items-center gap-2.5 rounded-full border border-white px-6 py-2.5 text-[13px] font-medium text-white no-underline md:py-3 md:text-[14px]">
                    Know More
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </div>
              <div className="order-2 md:max-w-[55%] md:flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={about.image} alt={about.imageAlt} loading="lazy" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — CTA */}
      <section className="relative overflow-hidden bg-[#173A87] py-10 text-white md:py-14">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cta.bg} alt="" loading="lazy" className="absolute inset-y-0 right-0 hidden h-full w-1/3 object-cover opacity-90 md:block" />
        <div className="relative mx-auto max-w-[1366px] px-6 md:px-[62px]">
          <h2 className="mb-3 max-w-2xl text-[22px] font-semibold leading-tight md:mb-4 md:text-[34px]">
            {cta.heading.split('\n').map((line, i, a) => <span key={i}>{line}{i < a.length - 1 && <br />}</span>)}
          </h2>
          <p className="mb-6 max-w-2xl text-[14px] text-white/90 md:mb-8 md:text-[16px]">{cta.text}</p>
          <div className="flex flex-col gap-3 n640:flex-row md:gap-4">
            <a href={cta.apply} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D20158] px-6 py-3 text-[14px] font-medium text-white no-underline transition hover:opacity-90 md:text-[15px]">
              Apply now
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
            <a href={cta.visit} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 text-[14px] font-medium text-white no-underline md:text-[15px]">
              Schedule a visit
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* 12 — DISCLAIMER */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="relative rounded-2xl border border-l-4 border-gray-200 border-l-isdi-pink bg-gray-50 p-6 md:p-8 n1024:p-10">
            <div className="mb-4 flex items-center gap-3 md:mb-5">
              <h3 className="text-[18px] leading-[1.556] font-semibold text-gray-900 md:text-[20px] md:leading-[1.4]">Disclaimer</h3>
            </div>
            <div className="space-y-3 text-justify text-[13px] leading-[1.7] text-gray-600 md:space-y-4 md:text-[15px]">
              <p>{disclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
