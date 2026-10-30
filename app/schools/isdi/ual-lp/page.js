import LpCarousel from '@/components/Schools/ISDI/PartnerLP/LpCarousel';
import {
  hero, strip, intro, stackCards, learnMore, whoCanApply, why, pathwayFor, about, cta, disclaimer,
} from '@/lib/schools/isdi/ualLpContent';

const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/ual-lp';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: URL },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/* Play CDN's default `font-sans` (the LP wrapper's font) — system-ui, not the project's Manrope. */
const SANS = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';
/* section heading — reference authors `text-2xl sm:text-3xl md:text-[40px] … leading-tight`; Play CDN's
   `sm:text-3xl` bundles line-height 36px which survives the arbitrary `md:text-[40px]` and wins over
   leading-tight from 640 up, so prod renders 36px at >=640 / 1.25 below. The nyfa/scad/parsons H2 formula. */
const H2 = 'text-[24px] leading-tight n640:text-[30px] n640:leading-[36px] md:text-[40px] font-medium text-gray-900';

/* Render a run array (string | { b }) — the reference bolds a phrase mid-sentence in a few paragraphs. */
function Runs({ parts }) {
  return parts.map((r, i) => (typeof r === 'string' ? <span key={i}>{r}</span> : <b key={i}>{r.b}</b>));
}

function WhyCard({ card, i }) {
  return (
    <div className="rounded-2xl bg-isdi-blue bg-[url('/assets/images/schools/isdi/about/beliefs/vector-d.png')] bg-[length:180px_auto] bg-right-bottom bg-no-repeat p-6 min-h-[220px]">
      <span className="inline-block rounded bg-isdi-pink px-2.5 py-1 text-sm font-semibold text-white">#{i + 1}</span>
      <h3 className="mt-3 mb-3 text-[20px] leading-[28px] font-semibold text-white">{card.title}</h3>
      <p className="text-sm leading-relaxed text-white/90">{card.text}</p>
    </div>
  );
}

function PathwayCard({ card }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-isdi-blue">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image} alt={card.text} loading="lazy" className="h-72 w-full object-cover n1024:h-64" />
      <div className="flex flex-1 items-start p-6">
        <p className="text-sm leading-relaxed text-white"><span className="font-semibold">{card.text}</span></p>
      </div>
    </div>
  );
}

export default function UalLpPage() {
  return (
    <main id="isdi-ual" className="lp-bs text-[#1a1a1a]" style={{ fontFamily: SANS }}>
      {/* 1 — HERO */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="relative hidden h-[500px] w-full md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.desktop} alt={hero.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1366px] flex-col justify-end px-[62px] pb-[100px]">
            <h1 className="flex flex-wrap items-center gap-x-3 text-[36px] font-semibold leading-[1.2] text-white n1024:text-[42px]">
              <span>{hero.titleLead}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.logo} alt={hero.logoAlt} className="inline-block h-8 w-auto object-contain" />
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 mb-8 bg-[#D20158] py-2.5 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
            <div className="mx-auto max-w-[1366px] px-[62px] text-[15px] leading-snug n1024:text-[16px]">{hero.subtitle}</div>
          </div>
        </div>
        <div className="relative w-full md:hidden">
          <div className="relative h-[400px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.mobile} alt={hero.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 z-10">
              <h1 className="mb-3 gap-x-2 text-[22px] font-semibold leading-tight text-white">
                <span>{hero.titleLead}</span>{' '}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hero.logo} alt={hero.logoAlt} className="inline-block h-4 w-auto object-contain" />
              </h1>
              <div className="bg-[#D20158] px-4 py-2.5 text-[13px] leading-snug text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{hero.subtitle}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — FOUR-PANEL STRIP */}
      <section className="flex w-full flex-col bg-white md:flex-row [@media(max-width:767px)]:gap-[10px]">
        {strip.map((p, i) => (
          <div key={i} className="relative flex min-h-[180px] flex-1 flex-col justify-center overflow-hidden bg-right bg-no-repeat px-6 py-8 text-white md:h-[208px] md:px-16 md:py-0" style={{ backgroundColor: p.bg, backgroundImage: `url('${p.image}')` }}>
            <div className="relative z-10 mb-2 text-[20px] text-white md:mb-3 md:text-[16px]">{p.eyebrow}</div>
            <div className="relative z-10 text-[22px] font-medium leading-tight md:text-[23px]">{p.title}</div>
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
                {intro.paragraphs.map((parts, i) => <p key={i}><Runs parts={parts} /></p>)}
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
          {/* ref wraps the stack in font-['Manrope',sans-serif]; production does NOT load Manrope, so it
              falls back to the generic `sans-serif` — not system-ui, not the loaded Manrope. The
              `md:h-[500px]` the markup declares never takes effect on production; the cards render
              content-height (the 45% text column drives it). */}
          <div style={{ fontFamily: 'sans-serif' }}>
            {stackCards.map((card, idx) => (
              <div key={idx} className={`sticky top-0 flex h-auto origin-top flex-col overflow-hidden rounded-2xl bg-transparent mb-24 [will-change:transform] md:mb-36 md:flex-row md:rounded-none${idx === stackCards.length - 1 ? ' !mb-0' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.src} alt="" loading="lazy" className="h-[220px] w-full object-cover md:h-full md:w-[55%]" />
                <div className="flex w-full flex-col items-stretch justify-center gap-3 px-6 py-7 md:w-[45%] md:gap-7 md:px-14 md:py-10" style={{ backgroundColor: card.bg }}>
                  <div className="text-[20px] font-bold leading-tight text-white md:text-[30px] md:leading-[1.2]">{card.title}</div>
                  <p className="text-[14px] font-bold leading-snug text-white md:text-[15px] md:leading-[1.5]">{card.intro}</p>
                  <ul className="list-disc space-y-2 pl-5 text-[13px] leading-snug text-white md:text-[15px] md:leading-[1.5]">
                    {card.items.map((it, i) => <li key={i}>{it}</li>)}
                  </ul>
                  {card.outro && <p className="mt-1 text-[12px] leading-snug text-white md:mt-2 md:text-[14px] md:leading-[1.5]">{card.outro}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — LEARN MORE ABOUT BA (Hons) */}
      <section className="bg-[#011A4B] py-8 md:py-12">
        <div className="mx-auto max-w-[1366px] px-4 md:px-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-[24px] font-medium leading-[30px] text-white md:text-[36px] md:leading-[40px]">{learnMore.heading}</h2>
            <a href={learnMore.buttonHref} className="inline-flex w-fit items-center justify-center rounded-full bg-[#00F5B4] px-6 py-3 text-sm font-medium text-[#011A4B] no-underline">{learnMore.buttonLabel}</a>
          </div>
          <div className="overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={learnMore.image} alt={learnMore.imageAlt} loading="lazy" className="h-auto w-full object-cover" />
          </div>
        </div>
      </section>

      {/* 6 — WHO CAN APPLY */}
      <section className="bg-[#011A4B] py-8 md:py-12">
        <div className="mx-auto max-w-[1366px] px-4 md:px-8">
          <h2 className="mb-6 text-[24px] font-medium leading-[32px] text-white md:text-[36px] md:leading-[40px]">{whoCanApply.heading}</h2>
          <div className="rounded-2xl border border-white/20 p-6 md:p-8">
            <p className="text-base leading-relaxed text-white/90 md:text-lg"><Runs parts={whoCanApply.text} /></p>
          </div>
        </div>
      </section>

      {/* 7 — WHY CHOOSE (responsive grid, no carousel) */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className={H2}>{why.heading}</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 n1024:grid-cols-4">
            {why.cards.map((card, i) => <WhyCard key={i} card={card} i={i} />)}
          </div>
        </div>
      </section>

      {/* 8 — WHO IS THIS PATHWAY FOR (carousel: 1/2/4 at 0/768/1024, bullets always, no arrows) */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className={H2}>{pathwayFor.heading}</h2>
          </div>
          <LpCarousel
            slides={pathwayFor.cards.map((card, i) => <PathwayCard key={i} card={card} />)}
            perView={{ base: 1, sm: 2, lg: 4 }}
            smMin={768}
            gap={12}
            bullets="always"
          />
        </div>
      </section>

      {/* 9 — ABOUT LONDON COLLEGE OF COMMUNICATION */}
      <section className="py-12 md:pb-16">
        <div className="hidden md:block">
          <div className="mx-auto max-w-[1366px] px-0">
            <div className="flex items-stretch">
              <div className="flex h-[80px] w-[120px] flex-shrink-0 items-center justify-center bg-[#011136]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={about.icon} alt="" className="h-9 w-9 object-contain" loading="lazy" />
              </div>
              <div className="flex h-[80px] flex-1 items-center bg-white px-8">
                <h2 className="text-[28px] font-semibold leading-tight text-[#011136] n1024:text-[32px]">{about.heading}</h2>
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
              <h2 className="text-[18px] font-semibold leading-tight text-[#011136]">{about.heading}</h2>
            </div>
          </div>
        </div>
        <div className="bg-[#011136] text-white">
          <div className="mx-auto max-w-[1366px] px-6 py-8 md:px-[62px] md:py-12">
            <div className="flex flex-col items-stretch gap-6 md:flex-row md:gap-12">
              <div className="order-2 flex flex-col md:order-1 md:max-w-[45%] md:flex-1">
                {about.paragraphs.map((p, i) => (
                  <p key={i} className="text-[13px] leading-[1.7] text-white text-justify md:text-[18px]">{p}</p>
                ))}
                <div>
                  <a href={about.link} className="inline-flex items-center gap-2.5 rounded-full border border-white px-6 py-2.5 text-[13px] font-medium text-white no-underline md:py-3 md:text-[14px]">
                    Know More
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </div>
              <div className="md:order-2 md:max-w-[55%] md:flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={about.image} alt={about.imageAlt} loading="lazy" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — CTA */}
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

      {/* 11 — DISCLAIMER (plain) */}
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-[1366px] px-6 md:px-[62px]">
          <p className="text-justify text-[14px] leading-[1.6] text-[#1a1a1a] md:text-[16px] md:leading-[1.7]">
            <span className="text-[16px] font-semibold md:text-[18px]">Disclaimer:</span>
            <br />
            {disclaimer}
          </p>
        </div>
      </section>
    </main>
  );
}
