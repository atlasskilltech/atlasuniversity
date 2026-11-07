/* eslint-disable @next/next/no-img-element -- every photograph ships the reference's own WebP
   renditions and srcset/sizes; they are reproduced as authored. */
/*
 * /timcook sections 01-06 + finale — index.html:150-494, main.css "01 Visit" … "Finale".
 *
 * The `data-*` hooks (data-scrub-words, data-split-lines, data-fade, data-reveal, data-parallax, …)
 * are the reference's own and drive lib/timcook/motion.js. `data-tc="…"` hooks stand in for the
 * reference's class selectors (`.moment`, `.moment__media`, …) that motion.js reads.
 *
 * The Day (#journey) has two layouts: a vertical stack, and — from 1024px with motion allowed — a
 * pinned horizontal track. motion.js sets `data-h` on the section for the latter (the reference's
 * `.journey.is-horizontal`), and every horizontal-only rule here is a `group-data-[h]/j:` variant.
 *
 * Two values follow production's rendering rather than the markup's classes, because main.css's
 * unlayered `img { max-width: 100%; height: auto }` beats the reference's (layered) Tailwind v4
 * utilities: the Visit figure's `max-w-[420px]` never applies (it is `max-w-full` here), and the
 * footer wordmark's `h-9` never applies (natural 200x49 here). Verified box-for-box at
 * 1920/1440/768/390.
 */
import {
  BODY,
  BODY_LG,
  CONTAINER,
  DISPLAY_2,
  DISPLAY_3,
  EM,
  EYEBROW,
  EYEBROW_DARK,
  EYEBROW_FINALE,
  EYEBROW_NUM,
  EYEBROW_NUM_DARK,
  FRAME,
  FRAME_LEAF,
  LINK,
  MONO,
  Runs,
  SECTION,
  SECTION_HEAD,
  SECTION_HEAD_DARK,
  SERIF,
} from './ui';

const LINE = 'border-[rgba(243,241,236,.12)]';

function Head({ eyebrow, dark = false }) {
  return (
    <div className={dark ? SECTION_HEAD_DARK : SECTION_HEAD}>
      <p className={dark ? EYEBROW_DARK : EYEBROW}>
        <span className={dark ? EYEBROW_NUM_DARK : EYEBROW_NUM}>{eyebrow.num}</span> {eyebrow.label}
      </p>
    </div>
  );
}

/* ============ 01 THE VISIT ============ */
export function Visit({ visit }) {
  return (
    <section id="visit" aria-labelledby="visit-title" className={`relative z-[2] bg-[#07080a] ${SECTION}`}>
      <div className={CONTAINER}>
        <div className={SECTION_HEAD}>
          <p className={EYEBROW}>
            <span className={EYEBROW_NUM}>{visit.eyebrow.num}</span> {visit.eyebrow.label}
          </p>
          <h2 id="visit-title" className="sr-only">{visit.title}</h2>
        </div>

        <div className="grid items-start gap-14 n1024:grid-cols-12 n1024:gap-10">
          <div className="n1024:col-span-7">
            <p data-scrub-words className="[font-size:clamp(1.6rem,3.3vw,3.25rem)] font-medium leading-[1.15] tracking-[-0.03em]">
              {visit.lead}
            </p>
          </div>

          <figure data-parallax="-12" className="relative n1024:col-span-5 n1024:col-start-8">
            <img
              src={visit.figure.src}
              width={visit.figure.width}
              height={visit.figure.height}
              loading="lazy"
              decoding="async"
              alt={visit.figure.alt}
              className="mx-auto block w-[78%] max-w-full n640:w-[60%] n1024:w-full"
            />
            <figcaption className={`mt-5 text-center ${MONO} text-[0.7rem] uppercase tracking-[0.2em] text-[#a4a29d]`}>
              {visit.figcaption}
            </figcaption>
          </figure>
        </div>

        <dl data-stagger className={`mt-[clamp(4rem,9vw,8rem)] grid border-t ${LINE} md:grid-cols-3`}>
          {visit.facts.map((f, i) => (
            <div
              key={f.dt}
              className={
                i === 0
                  ? `grid gap-4 border-b ${LINE} py-7 md:border-b-0 md:py-8 md:pl-0 md:pr-8`
                  : `grid gap-4 border-b ${LINE} py-7 md:border-b-0 md:border-l md:py-8 md:pl-8 md:pr-8`
              }
            >
              <dt className={`${MONO} text-[.7rem] uppercase tracking-[.2em] text-[#f4cf4a]`}>{f.dt}</dt>
              <dd className="m-0 leading-[1.55] text-[#a4a29d]">
                <strong className="mb-[.35rem] block [font-size:clamp(1.25rem,1.8vw,1.6rem)] font-semibold tracking-[-0.02em] text-[#f3f1ec]">
                  {f.strong}
                </strong>
                {f.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ============ 02 THE DAY (horizontal on desktop) ============ */
export function Journey({ journey }) {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="group/j relative z-[2] bg-[#07080a] py-[clamp(4rem,10vw,8rem)] data-[h]:py-0"
    >
      <div
        data-tc="journey-pin"
        className="group-data-[h]/j:relative group-data-[h]/j:flex group-data-[h]/j:h-[100svh] group-data-[h]/j:items-center group-data-[h]/j:overflow-hidden"
      >
        <div
          data-journey-track
          className="mx-auto grid max-w-[1440px] gap-[clamp(4rem,10vw,6rem)] px-[var(--gutter)] group-data-[h]/j:m-0 group-data-[h]/j:flex group-data-[h]/j:w-max group-data-[h]/j:max-w-none group-data-[h]/j:items-center group-data-[h]/j:gap-[clamp(3rem,6vw,7rem)] group-data-[h]/j:pr-[12vw] group-data-[h]/j:will-change-transform"
        >
          <header
            data-tc="journey-intro"
            className="grid content-center gap-7 group-data-[h]/j:w-[min(36rem,40vw)] group-data-[h]/j:flex-none"
          >
            <p className={EYEBROW}>
              <span className={EYEBROW_NUM}>{journey.eyebrow.num}</span> {journey.eyebrow.label}
            </p>
            <h2 id="journey-title" data-split-lines className={DISPLAY_2}>
              <Runs runs={journey.title} />
            </h2>
            <p className={`${BODY_LG} max-w-md text-[#a4a29d]`}>{journey.intro}</p>
            <p
              aria-hidden="true"
              className={`hidden items-center gap-4 ${MONO} text-[.7rem] uppercase tracking-[.2em] text-[#a4a29d] group-data-[h]/j:flex`}
            >
              <span className="h-px w-[56px] bg-[#a4a29d]" /> {journey.hint}
            </p>
          </header>

          {journey.moments.map((m, i) => {
            const even = i % 2 === 1; // the reference's `.moment:nth-of-type(even)` (articles only)
            return (
              <article
                key={m.index}
                data-tc="moment"
                style={{ '--ar': m.ar }}
                className={
                  m.portrait
                    ? `grid gap-6 [@media(min-width:640px)_and_(max-width:1023px)]:grid-cols-[1.3fr_1fr] [@media(min-width:640px)_and_(max-width:1023px)]:items-end [@media(min-width:640px)_and_(max-width:1023px)]:gap-8 group-data-[h]/j:flex group-data-[h]/j:flex-none group-data-[h]/j:flex-row group-data-[h]/j:items-end group-data-[h]/j:gap-10`
                    : `grid gap-6 [@media(min-width:640px)_and_(max-width:1023px)]:grid-cols-[1.3fr_1fr] [@media(min-width:640px)_and_(max-width:1023px)]:items-end [@media(min-width:640px)_and_(max-width:1023px)]:gap-8 group-data-[h]/j:flex group-data-[h]/j:flex-none group-data-[h]/j:flex-col group-data-[h]/j:gap-6`
                }
              >
                <figure
                  data-tc="moment-media"
                  className={`relative m-0 overflow-hidden rounded-[4px] bg-[#0e1014] ${m.portrait ? 'aspect-[4/5]' : 'aspect-[4/3]'} ${even ? '[@media(min-width:640px)_and_(max-width:1023px)]:order-2' : ''} group-data-[h]/j:aspect-[var(--ar)] group-data-[h]/j:h-[58svh] group-data-[h]/j:w-auto group-data-[h]/j:max-w-[62vw]`}
                >
                  <img
                    src={m.image.src}
                    srcSet={m.image.srcSet}
                    sizes={m.image.sizes}
                    width={m.image.width}
                    height={m.image.height}
                    loading="lazy"
                    decoding="async"
                    alt={m.image.alt}
                    className="block h-full w-full object-cover group-data-[h]/j:-ml-[9%] group-data-[h]/j:w-[118%] group-data-[h]/j:max-w-none"
                  />
                </figure>
                <div
                  data-tc="moment-copy"
                  className={
                    m.portrait
                      ? 'grid max-w-[30rem] gap-[.6rem] group-data-[h]/j:w-[20rem] group-data-[h]/j:pb-4'
                      : 'grid max-w-[30rem] gap-[.6rem] group-data-[h]/j:w-[min(100%,30rem)]'
                  }
                >
                  <span className={`${MONO} text-[.72rem] tracking-[.15em] text-[#f4cf4a]`}>{m.index}</span>
                  <h3 className="[font-size:clamp(1.6rem,2.4vw,2.3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{m.title}</h3>
                  <p className="leading-[1.6] text-[#a4a29d]">{m.text}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className={`absolute bottom-[clamp(1.5rem,4vh,2.5rem)] left-[var(--gutter)] right-[var(--gutter)] hidden items-center gap-6 ${MONO} text-[.72rem] tracking-[.12em] text-[#a4a29d] group-data-[h]/j:flex`}
        >
          <span>
            <b data-journey-current className="font-medium text-[#f3f1ec]">00</b> / {journey.total}
          </span>
          <span className={`relative h-px flex-1 bg-[rgba(243,241,236,.12)]`}>
            <span data-journey-bar className="absolute inset-0 origin-left scale-x-0 bg-[#f3f1ec]" />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============ 03 VISION ============ */
function MarqueeSet({ words }) {
  return words.map((w) => [
    <span key={`${w.text}-t`} className={w.outline ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(243,241,236,.55)]' : undefined}>
      {w.text}
    </span>,
    <i key={`${w.text}-i`} className="h-[.22em] w-[.22em] flex-none rounded-full bg-[#f4cf4a]" />,
  ]);
}

export function Vision({ vision }) {
  const { chapterA: a, chapterB: b, classPhoto } = vision;
  return (
    <section id="vision" aria-labelledby="vision-title" className={`relative z-[2] overflow-clip bg-[#07080a] ${SECTION}`}>
      <div className={CONTAINER}>
        <div className={SECTION_HEAD}>
          <p className={EYEBROW}>
            <span className={EYEBROW_NUM}>{vision.eyebrow.num}</span> {vision.eyebrow.label}
          </p>
        </div>
        <h2 id="vision-title" data-split-lines className={`${DISPLAY_2} max-w-5xl`}>
          <Runs runs={vision.title} />
        </h2>
      </div>

      <div aria-hidden="true" className={`my-[clamp(4rem,9vw,8rem)] overflow-clip border-y ${LINE} py-[clamp(1rem,2vw,1.75rem)]`}>
        <div
          data-marquee
          className="flex w-max items-center gap-[clamp(1.5rem,3vw,3rem)] whitespace-nowrap [font-size:clamp(3rem,9vw,9rem)] font-bold leading-none tracking-[-0.05em] will-change-transform"
        >
          <MarqueeSet words={vision.marquee} />
          <MarqueeSet words={vision.marquee} />
        </div>
      </div>

      {/* Chapter A */}
      <article aria-labelledby="chapter-a" className={`${CONTAINER} pb-[clamp(6rem,12vw,10rem)]`}>
        <div className="grid gap-12 n1024:grid-cols-12 n1024:gap-10">
          <div className="n1024:col-span-5 n1024:pt-24">
            <p className={`mb-5 ${SERIF} text-[1.35rem] text-[#f4cf4a]`}>{a.kicker}</p>
            <h3 id="chapter-a" data-split-lines className={DISPLAY_3}>{a.title}</h3>
            <p data-fade className={`${BODY_LG} mt-8 text-[#f3f1ec]/80`}>{a.lead}</p>
            <p data-fade className={`${BODY} mt-6 text-[#a4a29d]`}>{a.body}</p>
          </div>
          <div className="relative n1024:col-span-7">
            <figure data-reveal className={`${FRAME_LEAF} aspect-[16/10]`}>
              <img
                src={a.main.src}
                srcSet={a.main.srcSet}
                sizes={a.main.sizes}
                width={a.main.width}
                height={a.main.height}
                loading="lazy"
                decoding="async"
                alt={a.main.alt}
                className="block h-full w-full object-cover"
              />
            </figure>
            <figure
              data-reveal
              data-parallax="-18"
              className="relative z-[2] -mr-[2%] -mt-[18%] ml-auto aspect-square w-[44%] overflow-hidden rounded-[6px] border-[6px] border-[#07080a] bg-[#0e1014] [@media(max-width:1023px)]:mr-0 [@media(max-width:1023px)]:w-[58%]"
            >
              <img
                src={a.inset.src}
                width={a.inset.width}
                height={a.inset.height}
                loading="lazy"
                decoding="async"
                alt={a.inset.alt}
                className="block h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </article>

      {/* Chapter B */}
      <article aria-labelledby="chapter-b" className={`${CONTAINER} pb-[clamp(6rem,12vw,10rem)]`}>
        <div className="grid gap-12 n1024:grid-cols-12 n1024:gap-10">
          <div className="n1024:col-span-6">
            <p className={`mb-5 ${SERIF} text-[1.35rem] text-[#f4cf4a]`}>{b.kicker}</p>
            <h3 id="chapter-b" data-split-lines className={DISPLAY_3}>{b.title}</h3>
          </div>
          <div className="n1024:col-span-5 n1024:col-start-8 n1024:pt-16">
            <p data-fade className={`${BODY_LG} text-[#f3f1ec]/80`}>{b.lead}</p>
          </div>
        </div>

        <div className={`mt-[clamp(4rem,8vw,7rem)] border-t ${LINE} pt-8`}>
          <p className={`mb-6 ${MONO} text-[.72rem] uppercase tracking-[.2em] text-[#a4a29d]`}>{b.messageLabel}</p>
          <ol>
            {b.messages.map((m) => (
              <li
                key={m.n}
                data-split-words
                className={`block border-b ${LINE} py-[clamp(.6rem,1.4vw,1.1rem)] [font-size:clamp(1.9rem,5.2vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.045em]`}
              >
                <span className={`mr-[.35em] align-[.35em] ${SERIF} text-[.55em] tracking-[0] text-[#f4cf4a]`}>{m.n}</span> {m.text}
              </li>
            ))}
          </ol>
        </div>
      </article>

      <figure
        data-expand
        className="relative m-0 [clip-path:inset(0_var(--gutter)_0_var(--gutter)_round_6px)] after:pointer-events-none after:absolute after:inset-[50%_0_0_0] after:bg-[linear-gradient(transparent,rgba(7,8,10,.75))] after:content-[''] motion-reduce:[clip-path:none]"
      >
        <img
          src={classPhoto.image.src}
          srcSet={classPhoto.image.srcSet}
          sizes={classPhoto.image.sizes}
          width={classPhoto.image.width}
          height={classPhoto.image.height}
          loading="lazy"
          decoding="async"
          alt={classPhoto.image.alt}
          className="block h-[clamp(22rem,80vh,58rem)] w-full object-cover"
        />
        <figcaption className="absolute bottom-6 left-[calc(var(--gutter)_+_1.25rem)] right-[calc(var(--gutter)_+_1.25rem)] z-[1] max-w-[30rem] [font-size:clamp(1rem,1.4vw,1.25rem)] font-medium [text-shadow:0_2px_20px_rgba(0,0,0,.6)]">
          {classPhoto.caption}
        </figcaption>
      </figure>
    </section>
  );
}

/* ============ 04 VOICES (light) ============ */
const ASPECTS = { 'aspect-[904/576]': 'aspect-[904/576]', 'aspect-[4/5]': 'aspect-[4/5]' };

export function Voices({ voices }) {
  return (
    <section
      id="voices"
      aria-labelledby="voices-title"
      className="relative z-[2] mt-[clamp(-2.5rem,-3vw,-1.5rem)] rounded-t-[clamp(1.5rem,3vw,2.5rem)] bg-[#eeeae2] pb-[clamp(4rem,8vw,7rem)] pt-[clamp(6rem,12vw,11rem)] text-[#07080a]"
    >
      <div className={CONTAINER}>
        <Head eyebrow={voices.eyebrow} dark />
        <h2 id="voices-title" data-split-lines className={`${DISPLAY_2} max-w-4xl`}>
          <Runs runs={voices.title} emClassName={`${EM} text-[#6b5200]`} />
        </h2>

        {voices.items.map((v, i) => (
          <article
            key={v.title}
            aria-labelledby={`voice-${i + 1}`}
            className={
              v.flip
                ? 'mt-[clamp(4rem,9vw,8rem)] grid items-center gap-10 n1024:grid-cols-[7fr_5fr] n1024:gap-[clamp(3rem,6vw,7rem)]'
                : 'mt-[clamp(4rem,9vw,8rem)] grid items-center gap-10 n1024:grid-cols-[5fr_7fr] n1024:gap-[clamp(3rem,6vw,7rem)]'
            }
          >
            <div data-parallax="-10" className={v.flip ? 'n1024:order-2' : undefined}>
              <figure
                data-reveal
                className={`relative overflow-hidden rounded-[17.7%_0_17.7%_0/31.4%_0_31.4%_0] bg-[#dcd7cc] ${ASPECTS[v.aspect]} ${v.flip ? 'n1024:ml-auto n1024:max-w-[30rem]' : ''}`}
              >
                <img
                  src={v.image.src}
                  width={v.image.width}
                  height={v.image.height}
                  loading="lazy"
                  decoding="async"
                  alt={v.image.alt}
                  className={`block h-full w-full object-cover ${v.focusTop ? 'object-[50%_18%]' : ''}`}
                />
              </figure>
            </div>
            <div>
              <h3
                id={`voice-${i + 1}`}
                className={`mb-5 ${SERIF} [font-size:clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.02em]`}
              >
                {v.title}
              </h3>
              <p data-fade className={`${BODY} text-[#07080a]/70`}>{v.intro}</p>
              <blockquote data-tc="quote" className="mb-0 mt-9 border-t border-[rgba(7,8,10,.14)] pt-8">
                <p data-split-lines className="[font-size:clamp(1.35rem,2.3vw,2.15rem)] font-medium leading-[1.22] tracking-[-0.025em] text-[#07080a]">
                  {v.quote}
                </p>
                <footer data-fade className="mt-7 grid gap-[.2rem] text-[.9rem]">
                  <strong className="font-semibold">{v.by}</strong>
                  <span className="text-[rgba(7,8,10,.62)]">{v.role}</span>
                </footer>
              </blockquote>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============ 05 FILM ============ */
export function Film({ film }) {
  return (
    <section id="film" aria-labelledby="film-title" className={`relative z-[2] bg-[#07080a] ${SECTION}`}>
      <div className={CONTAINER}>
        <Head eyebrow={film.eyebrow} />
        <div className="mb-12 flex flex-col gap-6 n1024:mb-16 n1024:flex-row n1024:items-end n1024:justify-between">
          <h2 id="film-title" data-split-lines className={DISPLAY_2}>
            <Runs runs={film.title} />
          </h2>
          <p data-fade className={`${BODY} max-w-sm text-[#a4a29d]`}>{film.text}</p>
        </div>

        <div data-film className="relative aspect-video origin-[50%_0] overflow-hidden rounded-[clamp(10px,1.5vw,20px)] bg-[#0e1014]">
          <img
            src={film.poster.src}
            srcSet={film.poster.srcSet}
            sizes={film.poster.sizes}
            width={film.poster.width}
            height={film.poster.height}
            loading="lazy"
            decoding="async"
            alt=""
            className="absolute inset-0 block h-full w-full border-0 object-cover"
          />
          <div
            data-tc="film-shade"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(7,8,10,.15),rgba(7,8,10,.65))]"
          />
          <button
            type="button"
            data-tc="film-play"
            data-video-id={film.videoId}
            aria-label={film.playLabel}
            className="group/play absolute inset-0 flex w-full cursor-pointer flex-col items-center justify-center gap-5 border-0 bg-transparent text-[#f3f1ec]"
          >
            <span
              aria-hidden="true"
              className="grid aspect-square w-[clamp(64px,8vw,104px)] place-items-center rounded-full border border-[rgba(243,241,236,.4)] bg-[rgba(243,241,236,.14)] backdrop-blur-[10px] [transition:transform_.6s_cubic-bezier(0.22,1,0.36,1),background_.3s,color_.3s] group-hover/play:scale-110 group-hover/play:bg-[#f3f1ec] group-hover/play:text-[#07080a] group-focus-visible/play:scale-110 group-focus-visible/play:bg-[#f3f1ec] group-focus-visible/play:text-[#07080a]"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="ml-1">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.24-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
              </svg>
            </span>
            <span className="grid text-center [font-size:clamp(1rem,1.6vw,1.35rem)] font-semibold tracking-[-0.02em] [@media(max-width:639px)]:hidden">
              {film.label}{' '}
              <small className={`mt-[.35rem] ${MONO} text-[.68rem] font-normal uppercase tracking-[.2em] text-[rgba(243,241,236,.75)]`}>
                {film.labelSmall}
              </small>
            </span>
          </button>
        </div>
        <p className={`mt-5 ${MONO} text-[0.75rem] uppercase leading-[1rem] tracking-[0.18em] text-[#a4a29d]`}>
          {film.hosted}{' '}
          <a className={LINK} href={film.youtubeUrl} target="_blank" rel="noopener">
            {film.youtubeLabel}
          </a>
        </p>
      </div>
    </section>
  );
}

/* ============ 06 GALLERY ============ */
const GALLERY_ITEM =
  "group/gi relative block w-full cursor-zoom-in overflow-hidden border-0 bg-[#0e1014] p-0 after:absolute after:bottom-3 after:rounded-full after:bg-[rgba(7,8,10,.6)] after:px-[.7rem] after:py-[.35rem] after:font-[TcMono,ui-monospace,monospace] after:text-[.62rem] after:uppercase after:tracking-[.18em] after:text-[#f3f1ec] after:opacity-0 after:backdrop-blur-[8px] after:content-['View'] after:translate-y-[6px] after:[transition:opacity_.4s,transform_.5s_cubic-bezier(0.22,1,0.36,1)] focus-visible:after:translate-y-0 focus-visible:after:opacity-100 [@media(hover:hover)]:hover:after:translate-y-0 [@media(hover:hover)]:hover:after:opacity-100";

export function Gallery({ gallery }) {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className={`relative z-[2] bg-[#07080a] ${SECTION}`}>
      <div className={CONTAINER}>
        <Head eyebrow={gallery.eyebrow} />
        <div className="mb-12 flex flex-col gap-6 n1024:mb-20 n1024:flex-row n1024:items-end n1024:justify-between">
          <h2 id="gallery-title" data-split-lines className={DISPLAY_2}>
            <Runs runs={gallery.title} />
          </h2>
          <p data-fade className={`${BODY} max-w-sm text-[#a4a29d]`}>{gallery.text}</p>
        </div>

        <ul data-gallery className="m-0 list-none columns-2 gap-x-3 p-0 md:columns-3 md:gap-x-5">
          {gallery.items.map((g) => (
            <li key={g.full} className="mb-3 break-inside-avoid md:mb-5">
              <button
                type="button"
                data-tc="gallery-item"
                data-full={g.full}
                data-caption={g.caption}
                className={
                  g.leaf
                    ? `${GALLERY_ITEM} rounded-[17.7%_0_17.7%_0/31.4%_0_31.4%_0] after:right-[18%]`
                    : `${GALLERY_ITEM} rounded-[4px] after:right-3`
                }
              >
                <img
                  src={g.thumb.src}
                  width={g.thumb.width}
                  height={g.thumb.height}
                  loading="lazy"
                  decoding="async"
                  alt={g.thumb.alt}
                  className="block w-full saturate-[.85] [transition:transform_1.1s_cubic-bezier(0.22,1,0.36,1),filter_.6s] [@media(hover:hover)]:group-hover/gi:scale-105 [@media(hover:hover)]:group-hover/gi:saturate-[1.05]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============ FINALE ============ */
export function Finale({ finale }) {
  return (
    <section id="finale" aria-labelledby="finale-title" className="relative z-[2] bg-transparent">
      <div className={`${CONTAINER} flex min-h-[80svh] flex-col items-center justify-center gap-8 pb-12 pt-28 text-center`}>
        <p className={EYEBROW_FINALE}>{finale.eyebrow}</p>
        <h2
          id="finale-title"
          className="flex flex-col items-center [font-size:clamp(3.2rem,12vw,12rem)] font-bold leading-[.9] tracking-[-0.06em]"
        >
          {finale.words.map((w) => (
            <span key={w.text} data-finale-word className="block">
              {w.em ? <em className={`${EM} text-[#f4cf4a]`}>{w.text}</em> : w.text}
            </span>
          ))}
        </h2>
        <p data-fade className="[font-size:clamp(1.1rem,2vw,1.6rem)] tracking-[-0.01em] text-[rgba(243,241,236,.8)]">
          {finale.sub}
        </p>
      </div>

      <footer className={`relative ${CONTAINER}`}>
        <div className="flex flex-col gap-10 border-t border-[#f3f1ec]/10 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <img
              src={finale.footerLogo.src}
              width={finale.footerLogo.width}
              height={finale.footerLogo.height}
              alt={finale.footerLogo.alt}
              loading="lazy"
              className="block h-auto w-auto"
            />
            <p className="mt-4 max-w-xs text-[0.875rem] leading-[1.25rem] text-[#a4a29d]">{finale.footerText}</p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.875rem] leading-[1.25rem]">
            {finale.links.map((l) => (
              <li key={l.href}>
                <a className={LINK} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className={`mt-10 pb-8 ${MONO} text-[0.68rem] uppercase tracking-[0.18em] text-[#a4a29d]/70`}>{finale.copyright}</p>
      </footer>
    </section>
  );
}
