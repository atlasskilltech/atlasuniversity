/* eslint-disable @next/next/no-img-element -- every photograph ships the reference's own WebP
   renditions and srcset/sizes; they are reproduced as authored. */
/*
 * /convocation sections — index.html:204-583 (statement, the day in five chapters, the marquee,
 * gallery, venue, dignitaries, fellow success, in the spotlight, relive). The films section is the
 * client component ./Films. `data-*` hooks are the reference's own and drive
 * lib/convocation/motion.js.
 *
 * `desk:` in the reference is `(min-width:1024px) and (orientation:landscape)`; it is written out
 * as `[@media(min-width:1024px)_and_(orientation:landscape)]:` below. Under reduced motion the
 * chapters stack vertically at every size (styles.css's `!important` overrides) — `motion-reduce:!…`.
 */
import {
  ArrowOut,
  BTN,
  BTN_GOLD,
  BTN_INK,
  BTN_LINE,
  BTN_LINE_INK,
  DISPLAY,
  DISPLAY_LG,
  DISPLAY_MD,
  DISPLAY_SM,
  DISPLAY_XL,
  LEAD,
  MEDIA_RADIUS,
  PLAY_BADGE,
  PlayGlyph,
  TEXT_SM,
  WRAP,
} from './ui';

function Img({ img, className, ...rest }) {
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={img.sizes}
      width={img.width}
      height={img.height}
      alt={img.alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...rest}
    />
  );
}

/* ============================== STATEMENT ============================== */
export function Ceremony({ ceremony }) {
  return (
    <section id="ceremony" aria-labelledby="ceremony-title" className="relative bg-[#f5f6fc] py-24 text-[#0e0e33] n640:py-32 n1024:py-40">
      <div className={WRAP}>
        <h2 id="ceremony-title" className="sr-only">{ceremony.title}</h2>
        <p data-statement className={`max-w-[22ch] ${DISPLAY_LG} [text-wrap:balance] n1024:max-w-[20ch]`}>
          {ceremony.statement}
        </p>

        <div className="mt-16 grid gap-12 n640:mt-24 n1024:grid-cols-12 n1024:items-end n1024:gap-10">
          <figure data-reveal className={`overflow-hidden ${MEDIA_RADIUS} n1024:col-span-4`}>
            <Img
              img={ceremony.figure}
              className="block aspect-[4/5] h-full w-full object-cover object-[55%_50%] n640:aspect-[3/2] n1024:aspect-[4/5]"
            />
          </figure>

          <div className="n1024:col-span-6 n1024:col-start-7">
            <p className={`${LEAD} text-[#0e0e33]/70`}>{ceremony.glanceLabel}</p>
            <dl className="mt-6 border-t border-[#0e0e33]/15">
              {ceremony.facts.map((f, i) => (
                <div key={f.dt} className="grid gap-1 border-b border-[#0e0e33]/15 py-5 n640:grid-cols-[9rem_1fr] n640:gap-6">
                  <dt className={`${TEXT_SM} text-[#0e0e33]/60 n640:pt-1.5`}>{f.dt}</dt>
                  <dd className={i === 2 ? `${DISPLAY_SM} [text-wrap:balance]` : DISPLAY_SM}>{f.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== THE DAY, IN FIVE CHAPTERS ============================== */
/* Desktop (landscape >=1024): pinned, horizontal, snaps to each chapter. Elsewhere: a vertical sequence. */
export function TheDay({ day }) {
  const last = day.chapters.length - 1;
  return (
    <section id="the-day" data-chapters aria-labelledby="the-day-title" className="relative overflow-hidden bg-[#0e0e33] text-[#f5f6fc]">
      <div
        data-chapters-track
        className="flex flex-col gap-24 py-24 n640:py-32 [@media(min-width:1024px)_and_(orientation:landscape)]:h-[100svh] [@media(min-width:1024px)_and_(orientation:landscape)]:w-max [@media(min-width:1024px)_and_(orientation:landscape)]:flex-row [@media(min-width:1024px)_and_(orientation:landscape)]:gap-0 [@media(min-width:1024px)_and_(orientation:landscape)]:py-0 motion-reduce:!h-auto motion-reduce:!w-auto motion-reduce:!flex-col"
      >
        <div className="mx-auto w-full max-w-[90rem] px-4 n640:px-6 n1024:px-10 [@media(min-width:1024px)_and_(orientation:landscape)]:flex [@media(min-width:1024px)_and_(orientation:landscape)]:h-[100svh] [@media(min-width:1024px)_and_(orientation:landscape)]:w-[44vw] [@media(min-width:1024px)_and_(orientation:landscape)]:max-w-none [@media(min-width:1024px)_and_(orientation:landscape)]:flex-col [@media(min-width:1024px)_and_(orientation:landscape)]:justify-center [@media(min-width:1024px)_and_(orientation:landscape)]:!pr-20 motion-reduce:!h-auto motion-reduce:!w-full">
          <h2 id="the-day-title" data-split className={`${DISPLAY_LG} [text-wrap:balance]`}>{day.title}</h2>
          <p className={`mt-6 max-w-[40ch] ${LEAD} text-[#f5f6fc]/70`}>{day.intro}</p>
          <p
            data-chapter-hint
            className={`mt-10 hidden items-center gap-3 ${TEXT_SM} text-[#f5f6fc]/60 [@media(min-width:1024px)_and_(orientation:landscape)]:flex motion-reduce:!hidden`}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" />
            </svg>
            {day.hint}
          </p>
        </div>

        {day.chapters.map((ch, i) => (
          <article
            key={ch.num}
            data-chapter
            aria-labelledby={`ch${i + 1}`}
            className={
              i === last
                ? '[@media(min-width:1024px)_and_(orientation:landscape)]:flex [@media(min-width:1024px)_and_(orientation:landscape)]:h-[100svh] [@media(min-width:1024px)_and_(orientation:landscape)]:w-[76vw] [@media(min-width:1024px)_and_(orientation:landscape)]:items-center [@media(min-width:1024px)_and_(orientation:landscape)]:pr-[8vw] motion-reduce:!h-auto motion-reduce:!w-full'
                : '[@media(min-width:1024px)_and_(orientation:landscape)]:flex [@media(min-width:1024px)_and_(orientation:landscape)]:h-[100svh] [@media(min-width:1024px)_and_(orientation:landscape)]:w-[76vw] [@media(min-width:1024px)_and_(orientation:landscape)]:items-center [@media(min-width:1024px)_and_(orientation:landscape)]:pr-[6vw] motion-reduce:!h-auto motion-reduce:!w-full'
            }
          >
            <div className="mx-auto grid w-full max-w-[90rem] gap-10 px-4 n640:px-6 n1024:px-10 [@media(min-width:1024px)_and_(orientation:landscape)]:max-w-none [@media(min-width:1024px)_and_(orientation:landscape)]:grid-cols-12 [@media(min-width:1024px)_and_(orientation:landscape)]:items-center [@media(min-width:1024px)_and_(orientation:landscape)]:!px-0">
              <div className="[@media(min-width:1024px)_and_(orientation:landscape)]:col-span-4">
                <p
                  aria-hidden="true"
                  className={`${DISPLAY} [font-size:clamp(5rem,9vw,9.5rem)] font-medium leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(214_174_85/0.7)]`}
                >
                  {ch.num}
                </p>
                <h3 id={`ch${i + 1}`} className={`mt-4 ${DISPLAY_MD}`}>
                  <span className="sr-only">{ch.srLabel} </span>
                  {ch.title}
                </h3>
                <p className="mt-4 max-w-[36ch] text-[#f5f6fc]/70">{ch.text}</p>
              </div>
              <div className="relative pb-12 [@media(min-width:1024px)_and_(orientation:landscape)]:col-span-8 [@media(min-width:1024px)_and_(orientation:landscape)]:pb-0">
                <figure
                  className={`aspect-[4/3] overflow-hidden ${MEDIA_RADIUS} [@media(min-width:1024px)_and_(orientation:landscape)]:aspect-auto [@media(min-width:1024px)_and_(orientation:landscape)]:h-[62svh]`}
                >
                  <Img
                    img={ch.main}
                    data-depth
                    className={i === 3 ? 'block h-full w-full scale-[1.15] object-cover object-[50%_35%]' : 'block h-full w-full scale-[1.15] object-cover'}
                  />
                </figure>
                <figure
                  className={`absolute -bottom-2 right-4 w-[42%] overflow-hidden ${MEDIA_RADIUS} border-4 border-[#0e0e33] [@media(min-width:1024px)_and_(orientation:landscape)]:-bottom-10 [@media(min-width:1024px)_and_(orientation:landscape)]:-left-12 [@media(min-width:1024px)_and_(orientation:landscape)]:right-auto [@media(min-width:1024px)_and_(orientation:landscape)]:w-[34%]`}
                >
                  <Img img={ch.inset} className="block aspect-[3/2] w-full object-cover" />
                </figure>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Chapter progress (desktop horizontal mode only) */}
      <div
        data-chapter-progress
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden [@media(min-width:1024px)_and_(orientation:landscape)]:block"
      >
        <div className={`${WRAP} flex items-center gap-6 ${TEXT_SM} text-[#f5f6fc]/60`}>
          <span className="tabular-nums">
            <span data-chapter-current>01</span> / 05
          </span>
          <span className="relative h-px flex-1 bg-[#f5f6fc]/15">
            <span data-chapter-bar className="absolute inset-0 origin-left scale-x-0 bg-[#d6ae55]" />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================== EVERY HANDSHAKE (marquee) ============================== */
function MarqueeItems({ images, dup }) {
  return images.map((src) => (
    <div
      key={`${dup ? 'b' : 'a'}-${src}`}
      className={`aspect-[3/2] w-[clamp(9.5rem,17vw,14.5rem)] flex-none overflow-hidden ${MEDIA_RADIUS} bg-[#17174a] ${dup ? 'motion-reduce:hidden' : ''}`}
    >
      <img src={src} alt="" width="350" height="233" loading="lazy" decoding="async" className="block h-full w-full object-cover" />
    </div>
  ));
}

export function Moments({ moments }) {
  return (
    <section aria-labelledby="moments-title" className="overflow-hidden bg-[#0e0e33] pb-24 text-[#f5f6fc] n640:pb-32">
      <div className={`${WRAP} mb-10 flex flex-col gap-4 n640:mb-14 n1024:flex-row n1024:items-end n1024:justify-between`}>
        <h2 id="moments-title" data-split className={`max-w-[16ch] ${DISPLAY_MD} [text-wrap:balance]`}>{moments.title}</h2>
        <p className="max-w-[42ch] text-[#f5f6fc]/70">{moments.text}</p>
      </div>
      <div className="flex flex-col gap-3" aria-hidden="true">
        {moments.rows.map((row) => (
          <div key={row.src} data-marquee={row.dir} data-duration={row.duration} className="overflow-hidden motion-reduce:overflow-x-auto">
            {/* Each row holds its items twice for a seamless -50% loop; the copy is only built when
                motion is allowed (reference: `items + (MOTION ? items : '')`). */}
            <div data-marquee-track className="flex w-max gap-3">
              <MarqueeItems images={row.images} />
              <MarqueeItems images={row.images} dup />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================== GRADUATION GALLERY ============================== */
/* Editorial grid: 2 columns on phones, 12-column asymmetric composition from 1024 — the reference's
   per-tile layout classes, in order. */
const TILE = [
  'col-span-2 aspect-[3/2] n1024:col-span-7 n1024:row-span-2 n1024:aspect-auto',
  'aspect-square n1024:col-span-5 n1024:aspect-auto',
  'aspect-square n1024:col-span-5 n1024:aspect-auto',
  'col-span-2 aspect-[3/2] n1024:col-span-4 n1024:row-span-2 n1024:aspect-auto',
  'aspect-[4/5] n1024:col-span-4 n1024:row-span-2 n1024:aspect-auto',
  'aspect-[4/5] n1024:col-span-4 n1024:row-span-2 n1024:aspect-auto',
  'aspect-square n1024:col-span-5 n1024:aspect-auto',
  'col-span-2 aspect-[3/2] n1024:col-span-7 n1024:row-span-2 n1024:aspect-auto',
  'aspect-square n1024:col-span-5 n1024:aspect-auto',
  'aspect-square n1024:col-span-4 n1024:aspect-auto',
  'aspect-square n1024:col-span-4 n1024:aspect-auto',
  'col-span-2 aspect-[3/2] n1024:col-span-4 n1024:aspect-auto',
];
const TILE_IMG =
  'absolute inset-0 block h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105';

export function Gallery({ gallery, photosUrl, playlistUrl }) {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-[#f5f6fc] py-24 text-[#0e0e33] n640:py-32 n1024:py-40">
      <div className={WRAP}>
        <div className="mb-12 flex flex-col gap-6 n640:mb-16 n1024:flex-row n1024:items-end n1024:justify-between">
          <div>
            <h2 id="gallery-title" data-split className={DISPLAY_LG}>{gallery.title}</h2>
            <p className={`mt-5 max-w-[46ch] ${LEAD} text-[#0e0e33]/70`}>{gallery.text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className={`inline-flex ${BTN} ${BTN_INK}`} href={photosUrl} target="_blank" rel="noopener">
              {gallery.albumLabel}
              <ArrowOut />
            </a>
            <a className={`inline-flex ${BTN} ${BTN_LINE_INK}`} href={playlistUrl} target="_blank" rel="noopener">
              {gallery.videosLabel}
              <ArrowOut />
            </a>
          </div>
        </div>

        <div
          data-gallery
          className="grid grid-flow-row-dense grid-cols-2 gap-3 n640:gap-4 n1024:auto-rows-[clamp(9rem,15vw,15.5rem)] n1024:grid-cols-12"
        >
          {gallery.items.map((g, i) => (
            <button
              key={g.full + i}
              type="button"
              data-gallery-item
              data-full={g.full}
              className={`group relative block w-full overflow-hidden ${MEDIA_RADIUS} bg-[#0e0e33]/10 ${TILE[i]}`}
            >
              <Img img={g.image} className={i === 5 ? `${TILE_IMG} object-[30%_50%]` : TILE_IMG} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== VENUE ============================== */
export function Venue({ venue }) {
  return (
    <section id="venue" aria-labelledby="venue-title" className="relative overflow-hidden bg-[#0e0e33] py-24 text-[#f5f6fc] n640:py-32 n1024:py-40">
      <div className={WRAP}>
        <h2 id="venue-title" data-split className={`${DISPLAY_XL} [text-wrap:balance]`}>{venue.title}</h2>

        <div className="mt-14 grid gap-12 n1024:mt-20 n1024:grid-cols-12 n1024:gap-10">
          <figure data-reveal className={`overflow-hidden ${MEDIA_RADIUS} n1024:col-span-7`}>
            <Img img={venue.hall} data-parallax="6" className="block aspect-[4/3] w-full scale-[1.12] object-cover" />
          </figure>

          <div className="flex flex-col justify-between gap-12 n1024:col-span-4 n1024:col-start-9">
            <div>
              <p className={`${DISPLAY_SM} [text-wrap:balance]`}>{venue.text}</p>
              <a className={`mt-8 inline-flex ${BTN} ${BTN_LINE}`} href={venue.mapsUrl} target="_blank" rel="noopener">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M8 14.5s4.5-4.2 4.5-7.8a4.5 4.5 0 1 0-9 0c0 3.6 4.5 7.8 4.5 7.8z" />
                  <circle cx="8" cy="6.6" r="1.6" />
                </svg>
                {venue.mapsLabel}
              </a>
            </div>
            <figure data-reveal className={`overflow-hidden ${MEDIA_RADIUS}`}>
              <Img img={venue.foyer} className="block aspect-[4/3] w-full object-cover" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== DIGNITARIES ============================== */
export function Dignitaries({ dignitaries }) {
  return (
    <section id="dignitaries" aria-labelledby="dignitaries-title" className="bg-[#3434d1] py-24 text-[#f5f6fc] n640:py-32 n1024:py-40">
      <div className={WRAP}>
        <div className="grid gap-6 n1024:grid-cols-12 n1024:items-end">
          <h2 id="dignitaries-title" data-split className={`${DISPLAY_LG} n1024:col-span-6`}>{dignitaries.title}</h2>
          <p className={`max-w-[44ch] ${LEAD} text-[#f5f6fc]/80 n1024:col-span-5 n1024:col-start-8`}>{dignitaries.text}</p>
        </div>

        <div className="mt-14 grid gap-16 n640:mt-20 md:grid-cols-2 md:gap-8 n1024:gap-16">
          {dignitaries.people.map((p, i) => (
            <article key={p.name} aria-labelledby={`dig-${i + 1}`} className={i === 1 ? 'group md:mt-32' : 'group'}>
              <button
                type="button"
                data-video={p.video}
                data-title={p.videoTitle}
                data-reveal
                className={`relative block aspect-[4/3] w-full overflow-hidden ${MEDIA_RADIUS}`}
              >
                <Img img={p.image} className={TILE_IMG.replace('absolute inset-0 ', '')} />
                <span aria-hidden="true" className={`${PLAY_BADGE} bottom-5 left-5 h-16 w-16 group-hover:scale-[1.12] group-hover:bg-[#d6ae55]`}>
                  <PlayGlyph />
                </span>
                <span className="sr-only">{p.playLabel}</span>
              </button>
              <h3 id={`dig-${i + 1}`} className={`mt-7 ${DISPLAY_MD}`}>{p.name}</h3>
              <ul className="mt-6 border-t border-[#f5f6fc]/20">
                {p.talks.map((tk) => (
                  <li key={tk.id} className="border-b border-[#f5f6fc]/20">
                    <button
                      type="button"
                      data-video={tk.id}
                      data-title={tk.title}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-[#efd592]"
                    >
                      {tk.label}
                      <PlayGlyph className="h-3 w-3 shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== FELLOW SUCCESS + IN THE SPOTLIGHT ============================== */
function Head({ id, title, text }) {
  return (
    <div className="grid gap-6 n1024:grid-cols-12 n1024:items-end">
      <h2 id={id} data-split className={`${DISPLAY_LG} n1024:col-span-6`}>{title}</h2>
      <p className={`max-w-[44ch] ${LEAD} text-[#0e0e33]/70 n1024:col-span-5 n1024:col-start-8`}>{text}</p>
    </div>
  );
}

const LOGO_IMG_MONO =
  'block h-auto w-full max-w-[12rem] opacity-75 grayscale [transition:filter_.5s_ease,opacity_.5s_ease,transform_.6s_cubic-bezier(0.16,1,0.3,1)] group-hover/lt:scale-[1.04] group-hover/lt:opacity-100 group-hover/lt:grayscale-0';

export function Fellows({ fellows }) {
  const last = fellows.logos.length - 1;
  return (
    <section id="fellows" aria-labelledby="fellows-title" className="bg-[#f5f6fc] pt-24 text-[#0e0e33] n640:pt-32 n1024:pt-40">
      <div className={WRAP}>
        <Head id="fellows-title" title={fellows.title} text={fellows.text} />
        <ul className={`mt-12 grid grid-cols-2 gap-px overflow-hidden ${MEDIA_RADIUS} border border-[#0e0e33]/10 bg-[#0e0e33]/10 n640:mt-16 n640:grid-cols-3 n1024:grid-cols-5`}>
          {fellows.logos.map((l, i) => (
            <li
              key={l.src}
              className={
                i === last
                  ? 'group/lt col-span-2 grid aspect-[32/10] place-items-center bg-white p-6 n640:col-span-2 n640:aspect-auto n1024:col-span-1 n1024:aspect-[16/10]'
                  : 'group/lt grid aspect-[16/10] place-items-center bg-white p-6'
              }
            >
              <img src={l.src} alt={l.alt} width={l.width} height={l.height} loading="lazy" className={LOGO_IMG_MONO} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Spotlight({ spotlight }) {
  return (
    <section id="spotlight" aria-labelledby="spotlight-title" className="bg-[#f5f6fc] py-24 text-[#0e0e33] n640:py-32 n1024:py-40">
      <div className={WRAP}>
        <Head id="spotlight-title" title={spotlight.title} text={spotlight.text} />
        <ul className="mt-12 grid grid-cols-2 gap-3 n640:mt-16 n640:grid-cols-3 n1024:grid-cols-6">
          {spotlight.logos.map((l, i) => (
            <li
              key={l.src}
              className={`grid aspect-[10/7] place-items-center overflow-hidden ${MEDIA_RADIUS} bg-[#0e0e33] ${i >= 3 ? 'p-5' : ''}`}
            >
              <img
                src={l.src}
                alt={l.alt}
                width={l.width}
                height={l.height}
                loading="lazy"
                className="block h-full w-full object-contain [transition:filter_.5s_ease,opacity_.5s_ease,transform_.6s_cubic-bezier(0.16,1,0.3,1)]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================== FINAL CTA ============================== */
export function Relive({ relive, photosUrl, playlistUrl }) {
  return (
    <section id="relive" aria-labelledby="relive-title" className="relative isolate overflow-hidden bg-[#0e0e33] text-[#f5f6fc]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Img img={{ ...relive.image, alt: '' }} data-parallax="8" className="block h-full w-full scale-[1.15] object-cover opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_in_oklab,#0e0e33_0%,rgb(14_14_51/0.4)_50%,#0e0e33_100%)]" />
      </div>
      <div className={`${WRAP} py-32 text-center n640:py-40 n1024:py-52`}>
        <h2 id="relive-title" data-split className={`mx-auto max-w-[14ch] ${DISPLAY_XL} [text-wrap:balance]`}>{relive.title}</h2>
        <p className={`mx-auto mt-6 max-w-[44ch] ${LEAD} text-[#f5f6fc]/75`}>{relive.text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a className={`inline-flex ${BTN} ${BTN_GOLD}`} data-magnetic href={photosUrl} target="_blank" rel="noopener">
            {relive.albumLabel}
            <ArrowOut />
          </a>
          <a className={`inline-flex ${BTN} ${BTN_LINE}`} data-magnetic href={playlistUrl} target="_blank" rel="noopener">
            {relive.videosLabel}
            <ArrowOut />
          </a>
        </div>
      </div>
    </section>
  );
}
