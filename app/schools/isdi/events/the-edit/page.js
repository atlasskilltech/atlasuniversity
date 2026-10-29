import { Fragment } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { overlay, sessions } from '@/lib/schools/isdi/eventsTheEditContent';

/*
 * ref events/the-edit.php `$title` / `$description` — the ISDI template's unedited
 * placeholders, transcribed as authored. The canonical is the SLASHLESS url: a flat
 * `.php`, served there, 500 on the trailing slash.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/events/the-edit';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: TITLE,
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const A = '/assets/images/schools/isdi/events/the-edit';
const REG = 'https://www.atlasuniversity.edu.in/registration/program/101067';
/* the neon divider the overlay band draws between its three labels */
const NEON = 'bg-[#4AC8EF] shadow-[0_0_8px_#4AC8EF]';

/**
 * /schools/isdi/events/the-edit — the sixth and last ISDI Events page, and the only
 * one that is NOT the Events fifth-template. It is a bespoke Tailwind-authored page
 * (the reference loads the Tailwind Play CDN): autoplay hero videos under a neon
 * overlay band, two intro SVGs, an SVG section header, a schedule of eight sessions
 * rendered from data, and two closing SVG banners linking to registration.
 *
 * **The reference's `sm` is the Play CDN default (640px); this project's config
 * redefines `sm` = 480px, and its `min-[640px]:` arbitrary variant does NOT compile
 * (only `max-[Npx]:` does here). So the page is written DESKTOP-FIRST — the base
 * class is the reference's `>=640` (`sm:`) value and a `[@media(max-width:639px)]:` override
 * carries the reference's `<640` value.** `md` (768) and `xl` (1280) match the
 * config and are used as-is. Font sizes are the Play CDN's stock scale (whose
 * line-heights differ from this config's 1.5-pinned tokens), so each is an arbitrary
 * `text-[Npx] leading-[Npx]` taken from production's computed values (title 24/32,
 * time 14/20, desc 12/16, overlay 20/28 -> 18/28 below 640, speaker name 12/16 ->
 * 14/1.5 below 640). The page renders in Poppins (body.isdi-page overrides the Play
 * CDN Preflight), verified on production.
 *
 * DEVIATION (content): the reference's sessions[1] title/desc carry an en-dash that
 * production serves as the U+FFFD replacement character (a cp1252/UTF-8 encoding bug
 * upstream — "Human<FFFD>AI"); the port ships the intended en-dash ("Human-AI").
 */
export default function TheEditPage() {
  return (
    <main id="isdi-events-the-edit" className="font-poppins-isdi text-base text-[#333]">
      {/* ── hero: autoplay desktop + mobile video under a neon overlay band ── */}
      <section data-block="hero" className="relative mx-auto w-full max-w-[1920px]">
        <video
          className="block h-auto w-full object-cover [@media(max-width:639px)]:hidden"
          autoPlay
          muted
          playsInline
          preload="none"
          poster={`${A}/herobannerdesktop.svg`}
        >
          <source src={`${A}/herobanner.webm`} type="video/webm" />
          <source src={`${A}/herobanner.mp4`} type="video/mp4" />
        </video>
        <video
          className="hidden h-auto w-full object-cover [@media(max-width:639px)]:block"
          autoPlay
          muted
          playsInline
          preload="none"
          poster={`${A}/herobannermobile.svg`}
        >
          <source src={`${A}/mobile-herobanner.webm`} type="video/webm" />
          <source src={`${A}/mobile-herobanner.mp4`} type="video/mp4" />
        </video>

        {/* ref the common overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-black/70 py-4 text-white">
          <div className="flex flex-row items-center justify-around gap-0 text-center text-[20px] font-semibold leading-[28px] [@media(max-width:639px)]:flex-col [@media(max-width:639px)]:justify-center [@media(max-width:639px)]:gap-6 [@media(max-width:639px)]:text-[18px]">
            {overlay.map((label, i) => (
              <Fragment key={label}>
                {i > 0 && <div className={cx('block h-16 w-px [@media(max-width:639px)]:hidden', NEON)} />}
                <div className="w-auto [@media(max-width:639px)]:w-full">
                  <p>{label}</p>
                  {i < overlay.length - 1 && (
                    <div className={cx('mx-auto mt-2 hidden h-px w-[80%] [@media(max-width:639px)]:block', NEON)} />
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── section 1: two intro SVGs side by side ── */}
      <section data-block="section-1" className="mx-auto px-2 pt-[40px] xl:max-w-[1280px] xl:px-5 xl:pt-[60px]">
        <div className="mx-auto grid items-center gap-10 p-0 md:grid-cols-2 [@media(max-width:639px)]:px-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/section-1/1.svg`} className="w-auto" alt="" />
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/section-1/2.svg`} className="w-auto" alt="" />
          </div>
        </div>
      </section>

      {/* ── section 2: SVG header + the eight-session schedule + closing banners ── */}
      <section data-block="section-2" className="mx-auto px-2 pt-[40px] xl:max-w-[1280px] xl:px-5 xl:pt-[60px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/section-2/1d.svg`} className="mb-5 block h-full w-full object-cover [@media(max-width:639px)]:hidden" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/section-2/1m.svg`} className="mb-5 hidden h-full w-full object-cover [@media(max-width:639px)]:block" alt="" />

        {sessions.map((s, i) => (
          <Fragment key={i}>
            <div className="flex flex-row items-center gap-4 p-0 [@media(max-width:639px)]:flex-col [@media(max-width:639px)]:items-start [@media(max-width:639px)]:px-3">
              {/* LEFT */}
              <div className="w-1/2 [@media(max-width:639px)]:w-full">
                <div className="flex h-9 w-44 items-center justify-center bg-gradient-to-r from-violet-500 to-sky-300 py-1">
                  <div className="w-40 text-center text-[14px] font-bold leading-[20px] text-white">{s.time}</div>
                </div>
                <div className="mt-2 flex w-80 flex-col gap-[3px]">
                  <div className="text-[24px] font-medium leading-8 text-zinc-800">{s.title}</div>
                  <div className="text-[12px] font-medium leading-[16px] text-zinc-800">{s.desc}</div>
                  <div className="flex h-7 items-center justify-center bg-gray-300 px-2">
                    <div className="text-center text-[10px] text-zinc-800">{s.tags}</div>
                  </div>
                </div>
              </div>

              {/* RIGHT — speakers */}
              <div className="w-1/2 [@media(max-width:639px)]:w-full">
                <div className="flex flex-row items-center gap-4 [@media(max-width:639px)]:flex-col">
                  <div className="block [@media(max-width:639px)]:hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${A}/section-3/speakers.png`} alt="" />
                  </div>
                  <div
                    className={cx(
                      'grid w-full grid-cols-3 gap-6',
                      s.speakers.length === 4
                        && '[&>*:nth-child(3)]:col-start-1 [&>*:nth-child(4)]:col-start-2'
                    )}
                  >
                    {s.speakers.map((sp, j) => (
                      <div key={j} className="flex w-full flex-col items-center text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="w-full" src={sp.image} alt={sp.name} />
                        <p className="text-[12px] font-semibold leading-[16px] [@media(max-width:639px)]:text-[14px] [@media(max-width:639px)]:leading-[1.5]">
                          {sp.name}
                        </p>
                        <p className="text-[10px] leading-tight text-gray-700 [@media(max-width:639px)]:text-[12px] [@media(max-width:580px)]:mb-2">
                          {withBreaks(sp.role)}
                        </p>
                        <div className="flex w-full justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className="w-full [@media(max-width:639px)]:w-[70%]" src={sp.logo} alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex w-1/4 justify-center [@media(max-width:639px)]:w-full [@media(max-width:639px)]:justify-start">
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-32 items-center justify-center bg-gradient-to-r from-violet-500 to-sky-300 px-2 py-1.5 text-center [@media(max-width:639px)]:px-1"
                >
                  <span className="text-[14px] font-bold leading-[20px] text-white">Request an Invite</span>
                </a>
              </div>
            </div>
            <hr className="my-2" />
          </Fragment>
        ))}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/section-4/1d.svg`} className="mt-5 block h-full w-full object-cover [@media(max-width:639px)]:hidden" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/section-4/1m.svg`} className="mt-5 hidden h-full w-full object-cover [@media(max-width:639px)]:block" alt="" />

        <div className="px-0 [@media(max-width:639px)]:px-3">
          <a href={REG} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/section-5/1d.svg`} className="mt-5 block h-full w-full object-cover [@media(max-width:639px)]:hidden" alt="" />
          </a>
          <a href={REG} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/section-5/1m.svg`} className="mt-5 hidden h-full w-full object-cover [@media(max-width:639px)]:block" alt="" />
          </a>
        </div>
      </section>
    </main>
  );
}
