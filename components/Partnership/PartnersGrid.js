import SmartLink from '@/components/SmartLink';

/*
 * ref global-pathways.php "Start your Undergraduate Journey…" — a Tailwind-CDN section: a
 * `grid-cols-1 lg:grid-cols-2` grid of 12 university-partnership cards. Each card: a photo with an
 * absolute top bar (school circle logo(s) left, a "Know More" pill right) and an absolute bottom
 * bar (pathway label(s) + the partner logo on a #00000075 scrim). Play-CDN `sm:`/`lg:` are 640/1024,
 * remapped to the project's `n640:`/`n1024:` screens. Cards whose href the reference leaves empty
 * render the pill as a non-navigating span, as authored.
 */
function Lines({ html }) {
  return (html || '').split(/<br\s*\/?>/i).map((line, i, a) => (
    <span key={i}>
      {line}
      {i < a.length - 1 ? <br /> : null}
    </span>
  ));
}

export default function PartnersGrid({ heading, cards }) {
  return (
    <section className="lp-bs bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-[16px] mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a]">
          {heading}
        </h2>
        <div className="mb-5 grid grid-cols-1 items-center gap-6 bg-gray-200 p-3 n1024:grid-cols-2">
          {cards.map((card, i) => {
            const Pill = card.href
              ? (
                <SmartLink href={card.href} className="rounded-[24px] bg-[#5cbdca] px-4 py-2.5 text-black no-underline">
                  {card.btn}
                </SmartLink>
              )
              : <span className="rounded-[24px] bg-[#5cbdca] px-4 py-2.5">{card.btn}</span>;
            return (
              <div key={i} className="relative">
                <div className="absolute flex w-full items-center justify-between p-2.5">
                  <div className="flex gap-3">
                    {card.schools.map((s, j) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img key={j} src={s} alt="" className="h-[45px]" loading="lazy" />
                    ))}
                  </div>
                  <div>{Pill}</div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.photo} alt={card.alt} className="h-auto w-full object-cover" loading="lazy" />
                <div className="absolute bottom-0 flex w-full items-center justify-between gap-[50px] bg-[#00000075] px-3 py-2 n640:px-6 n640:py-3">
                  <p className="max-w-[70%] text-xs font-bold leading-tight text-white n640:text-lg md:text-xl">
                    <Lines html={card.pathway} />
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.logo} alt="logo" className="h-10 object-contain n640:h-14 md:h-[84px]" loading="lazy" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
