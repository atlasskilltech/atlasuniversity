import LpCarousel from '@/components/Schools/ISDI/PartnerLP/LpCarousel';
import {
  hero, strip, intro, stackCards, scadPro, ecosystem, influencers,
  why, pathway, pricing, visa, about, cta, disclaimer,
} from '@/lib/schools/isdi/scadContent';

const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/scad';

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
/* the big section heading — arbitrary sizes so the project's 1.5 line-height pin stays off, with the
   Play-CDN `sm:text-3xl` line-height (36px) reproduced from n640 up (see the nyfa CLAUDE.md note). */
const H2 = 'text-[24px] leading-tight n640:text-[30px] n640:leading-[36px] md:text-[40px] font-medium text-gray-900';

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
    <div className="flex flex-col overflow-hidden rounded-2xl bg-isdi-blue">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image} alt={`Card ${i + 1}`} loading="lazy" className="h-72 w-full object-cover n1024:h-64" />
      <div className="flex flex-1 items-start p-6">
        <p className="text-[14px] leading-relaxed text-white"><span className="font-semibold">{card.text}</span></p>
      </div>
    </div>
  );
}

export default function ScadPage() {
  return (
    <main id="isdi-scad" className="lp-bs text-[#1a1a1a]" style={{ fontFamily: SANS }}>
      {/* 1 — HERO */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="relative hidden h-[500px] w-full md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.desktop} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1366px] flex-col justify-end px-[62px] pb-[100px]">
            <h1 className="flex flex-wrap items-center gap-x-3 text-[36px] font-semibold leading-[1.2] text-white n1024:text-[42px]">
              <span>{hero.title}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.logo} alt="SCAD" className="inline-block h-8 w-auto object-contain" />
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 mb-8 bg-[#D20158] py-2.5 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
            <div className="mx-auto max-w-[1366px] px-[62px] text-[15px] leading-snug n1024:text-[16px]">{hero.subtitle}</div>
          </div>
        </div>
        <div className="relative w-full md:hidden">
          <div className="relative h-[400px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.mobile} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 z-10">
              <h1 className="mb-3 gap-x-2 text-[22px] font-semibold leading-tight text-white">
                <span>{hero.title}</span>{' '}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hero.logo} alt="SCAD" className="inline-block h-4 w-auto object-contain" />
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
                {intro.blocks.map((b, i) => b.list
                  ? <ul key={i} className="list-disc pl-6">{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>
                  : b.empty ? <p key={i} /> : <p key={i}>{b.p}</p>)}
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
          <h2 className="mb-8 text-[20px] font-medium leading-[1.2] text-[#1a1a1a] md:mb-10 md:text-[36px]">How This Global Experiential Pathway Works</h2>
          {/* ref wraps in font-['Manrope'], which production does not load → system sans (as the rest of the LP) */}
          <div>
            {stackCards.map((card, idx) => (
              <div key={idx} className={`sticky top-0 origin-top [will-change:transform] flex h-auto flex-col overflow-hidden rounded-2xl bg-transparent mb-24 md:mb-36 md:min-h-[500px] md:flex-row md:rounded-none${idx === stackCards.length - 1 ? ' !mb-0' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img sizes="(max-width: 759px) 100vw, 759px" srcSet={`${card.base}/500.webp 500w, ${card.base}/759.webp 759w`} src={`${card.base}/759.webp`} alt="" loading="lazy" className="h-[220px] w-full object-cover md:h-full md:w-[55%]" />
                <div className="flex w-full flex-col items-stretch justify-center gap-3 px-6 py-7 md:w-[45%] md:gap-7 md:px-14 md:py-10" style={{ backgroundColor: card.bg }}>
                  <div className="text-[20px] font-bold leading-tight text-white md:text-[30px] md:leading-[1.2]">{card.title}</div>
                  <p className="text-[14px] font-bold leading-snug text-white md:text-[15px] md:leading-[1.5]">
                    {card.intro}{card.introBreak && (<><br />{card.introBreak}</>)}
                  </p>
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

      {/* 5 — SCAD PRO */}
      <section className="pt-12 md:pt-16 n1024:pt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-8 n1024:grid-cols-12 n1024:gap-14">
            <div className="n1024:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl n1024:aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={scadPro.image} alt="SCAD Pro Studio" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
            <div className="n1024:col-span-7">
              <h2 className="mb-5 text-[24px] font-semibold leading-tight text-gray-900 md:text-[30px] md:leading-[36px] n1024:text-[36px] n1024:leading-[40px]">
                SCAD Pro <span className="text-isdi-pink">|</span> Industry Innovation Studio
              </h2>
              <p className="mb-7 text-[16px] leading-relaxed text-gray-700 md:text-[18px]">{scadPro.lead}</p>
              <div className="mb-7 border-b border-gray-200 pb-7">
                <p className="mb-4 text-[14px] text-gray-600 md:text-[16px]">{scadPro.pastLabel}</p>
                <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                  {scadPro.pastLogos.map((l, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={i} src={l.src} alt={l.alt} className={`${l.cls} w-auto object-contain`} />
                  ))}
                </div>
              </div>
              {scadPro.body.map((p, i) => (
                <p key={i} className={`text-[14px] leading-relaxed text-gray-700 md:text-[16px]${i < scadPro.body.length - 1 ? ' mb-4' : ''}`}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — SCAD CREATIVE ECOSYSTEM */}
      <section className="py-10 md:py-16 n1024:py-20">
        <div className="mx-auto max-w-[1366px] px-6 md:px-[62px]">
          <div className="mt-9 flex flex-col md:mt-[75px] md:flex-row md:px-0">
            <div className="order-0 mb-6 flex-auto md:mb-0 md:mr-8">
              <div className="text-[28px] font-medium leading-tight n640:text-[32px] md:text-[40px] md:leading-[56px]">Experience the SCAD Creative Ecosystem</div>
            </div>
            <div className="flex w-full max-w-full flex-col md:max-w-[855px] md:min-h-[382px] md:flex-row md:flex-[3_1_auto]">
              {ecosystem.panels.map((panel, i) => (
                <div key={i} className={`h-full w-full ${panel.corners} ${panel.bgClass} bg-center bg-no-repeat px-6 py-7 md:max-w-[414px] md:px-10`} style={{ backgroundImage: `url('${panel.bg}')` }}>
                  <div>
                    <h3 className="mb-4 text-[20px] leading-[1.4] font-semibold" style={{ color: panel.titleColor }}>{panel.title}</h3>
                    <ul className="space-y-3">
                      {panel.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: panel.dot }} />
                          <span className="text-[14px] text-gray-700 md:text-[16px]">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7 — INFLUENCER GRID + LOGO MARQUEE */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className={H2}>{influencers.heading}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {influencers.cards.map((c, i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.name} className="h-56 w-full object-cover md:h-64" />
                <div className={`flex-1 ${c.bg} bg-right-bottom bg-no-repeat p-6 text-white md:p-7`} style={{ backgroundImage: `url('${c.watermark}')`, backgroundSize: '200px auto' }}>
                  <h3 className="mb-1 text-[20px] font-semibold leading-tight md:text-[24px]">{c.name}</h3>
                  <p className="mb-3 text-[14px] font-medium text-white/95">{c.role}</p>
                  <p className="text-[14px] leading-relaxed text-white/85">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 md:mt-8">
            <div className="rounded-2xl bg-isdi-blue px-6 py-8 md:px-10 md:py-10">
              <div className="flex flex-col gap-8 n1024:flex-row n1024:items-center n1024:gap-12">
                <div className="flex-shrink-0 n1024:w-2/5 xl:w-1/2">
                  <p className="text-[16px] leading-relaxed text-white md:text-[18px]"><span className="font-semibold">SCAD alumni</span> have also contributed to leading global companies and studios, including:</p>
                </div>
                <div className="w-full flex-1 overflow-hidden">
                  <div className="flex w-max animate-awards-marquee items-center">
                    {[...influencers.logos, ...influencers.logos].map((l, i) => (
                      <div key={i} className="flex items-center px-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={l.src} alt={l.alt} className="h-7 w-auto object-contain md:h-9" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — WHY CHOOSE (grid / mobile carousel) */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className={H2}>{why.heading}</h2>
            <p className="mt-2 text-[14px] text-gray-600 md:text-[16px]">{why.sub}</p>
          </div>
          <div className="hidden grid-cols-2 gap-5 md:grid n1024:grid-cols-5">
            {why.cards.map((card, i) => <WhyCard key={i} card={card} i={i} />)}
          </div>
          <div className="md:hidden">
            <LpCarousel slides={why.cards.map((card, i) => <WhyCard key={i} card={card} i={i} />)} perView={{ base: 1, sm: 1, lg: 1 }} bullets="always" />
          </div>
        </div>
      </section>

      {/* 9 — WHO IS THIS PATHWAY FOR (grid / mobile carousel) */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className={H2}>{pathway.heading}</h2>
          </div>
          <div className="hidden grid-cols-2 gap-3 md:grid n1024:grid-cols-4">
            {pathway.cards.map((card, i) => <PathwayCard key={i} card={card} i={i} />)}
          </div>
          <div className="md:hidden">
            <LpCarousel slides={pathway.cards.map((card, i) => <PathwayCard key={i} card={card} i={i} />)} perView={{ base: 1, sm: 1, lg: 1 }} bullets="always" />
          </div>
        </div>
      </section>

      {/* 10 — PRICING */}
      <section className="bg-isdi-blue py-12 md:py-16 n1024:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10 md:mb-12">
            <h2 className="text-[24px] font-semibold leading-tight text-white md:text-[30px] md:leading-[36px] n1024:text-[36px]">{pricing.heading}</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/90 md:text-[16px]">{pricing.sub}</p>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 md:gap-6">
            {pricing.costs.map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
                <p className="mb-3 text-[12px] uppercase tracking-wider text-white/70 md:text-[14px]">{c.label}</p>
                <p className="text-[24px] font-semibold text-white">{c.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {[['Included Within the Program', pricing.included], ['Not Included', pricing.notIncluded]].map(([title, items], i) => (
              <div key={i} className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
                <h3 className="mb-4 text-[16px] font-semibold text-white md:text-[18px]">{title}</h3>
                <ul className="ml-5 list-outside list-disc space-y-2 text-[14px] text-white/90 md:text-[16px]">
                  {items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — U.S. VISA ADVANTAGE */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-isdi-pink p-6 md:p-10 n1024:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-10 md:h-96 md:w-96">
              <svg viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,38 95,38 67,57 78,90 50,71 22,90 33,57 5,38 39,38" /></svg>
            </div>
            <div className="relative grid items-start gap-6 md:grid-cols-12 md:gap-10">
              <div className="flex items-center gap-4 md:col-span-4 md:block">
                <h2 className="text-[20px] font-semibold leading-tight text-white md:text-[30px] md:leading-[36px]">
                  Additional U.S.<br className="hidden md:block" /> Visa Advantage
                </h2>
              </div>
              <div className="space-y-4 md:col-span-8 md:space-y-5">
                {visa.points.map((pts, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-isdi-blue">
                      <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-[14px] leading-relaxed text-white/95 md:text-[16px]">
                      {pts.map((r, j) => r.strong ? <span key={j} className="font-semibold">{r.strong}</span> : r.t)}
                    </p>
                  </div>
                ))}
                <div className="mt-2 border-t border-white/20 pt-3">
                  <p className="text-[12px] italic leading-relaxed text-white/70 md:text-[14px]">
                    <svg className="-mt-0.5 mr-1 inline h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {visa.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 — ABOUT */}
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
                <p className="mb-6 text-justify text-[13px] leading-[1.7] text-white md:mb-8 md:text-[18px]">{about.paragraph}</p>
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

      {/* 13 — CTA */}
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

      {/* 14 — DISCLAIMER */}
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
