/* eslint-disable @next/next/no-img-element -- plain <img>: /assets/ paths are rewritten to S3 at build time */
import HeroSlider from './HeroSlider';
import { HK_REGISTER } from './Header';

/**
 * ATLAS Hackathon 2026 — the landing page's content (reference index.html, `<main>`): hero, at a
 * glance, key dates, the challenge, what to build, the 90-minute format, submission, judging, rules,
 * the Grand Finale and the registration call to action.
 *
 * Transcribed from the reference markup by a one-off converter, with its Tailwind v4 classes mapped
 * to this project's v3 config:
 *   - `sm:` / `lg:` -> `n640:` / `n1024:` (the reference's stock 640/1024; this project's sm/lg are 480/992)
 *   - each `text-<size>` -> its v4 pixel size and line height, `text-[30px]/[36px]` (this project pins
 *     its own scale to line-height 1.5); where the element sets `leading-*`, only the size, so the
 *     leading still wins as it does in v4
 *   - `bg-linear-to-*` -> `bg-gradient-to-*`, `night`/`panel` -> `hk-night`/`hk-panel`,
 *     `font-display`/`font-sans` -> `font-hk-display`/`font-hk`, `outline-2` gains `outline`
 *   - the reference's `bg-grid` and `clip-tag` utilities are written out as arbitrary values
 *   - every <img> gets `block` (v4 Preflight; this project resets images to inline-block)
 * The hero slider is HeroSlider. `{' '}` keeps the whitespace the HTML had between siblings.
 */
export default function HackathonLanding() {
  return (
    <>
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(34_211_238/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(34_211_238/0.07)_1px,transparent_1px)] bg-[length:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]" />
      {' '}
      <div aria-hidden="true" className="absolute -left-40 -top-32 -z-10 size-[34rem] rounded-full bg-cyan-500/20 blur-[120px]" />
      {' '}
      <div aria-hidden="true" className="absolute -right-32 top-40 -z-10 size-[30rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      {' '}
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-8 n640:gap-12 n640:px-6 n640:pb-20 n640:pt-12 n1024:grid-cols-12 n1024:gap-10 n1024:px-8 n1024:pb-20 n1024:pt-14">
        <div className="n1024:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/30 bg-cyan-300/5 px-3 py-1.5 text-[0.8125rem] font-medium leading-snug text-cyan-200 n640:rounded-full n640:text-[14px]">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full rounded-full bg-cyan-300 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-300" />
            </span>
            {' '}
            <span>
              <span className="whitespace-nowrap">
                ATLAS SkillTech University ×
              </span>
              {' '}
              <span className="whitespace-nowrap">
                uGDX School of Technology
              </span>
            </span>
          </p>
          {' '}
          <h1 id="hero-title" className="mt-5 font-hk-display font-extrabold uppercase leading-[0.82] tracking-tight text-white">
            <span className="block text-[clamp(3rem,11vw,5.5rem)] n1024:text-[min(5.5rem,7vw)]">
              ATLAS
            </span>
            {' '}
            <span className="block text-[clamp(3.6rem,14.5vw,7rem)] n1024:text-[min(7rem,9vw)]">
              Hackathon{' '}
              <span className="bg-gradient-to-b from-cyan-200 to-cyan-400 bg-clip-text text-[0.66em] text-transparent">
                2026
              </span>
            </span>
          </h1>
          {' '}
          <p className="mt-5 inline-block -rotate-1 bg-gradient-to-r from-yellow-300 via-yellow-300 to-fuchsia-500 px-4 pb-1 pt-1.5 font-hk-display text-[clamp(2.25rem,9vw,4.5rem)] font-black n1024:text-[min(4.5rem,6.2vw)] uppercase leading-none text-hk-night shadow-[0_0_50px_-12px_rgb(250_204_21/0.7)] n640:px-6">
            Prompt to Product
          </p>
          {' '}
          <p className="mt-5 font-hk-display text-[30px]/[36px] font-extrabold uppercase italic tracking-wide n640:text-[36px]/[40px]">
            <span className="text-cyan-300">
              Prompt.
            </span>
            {' '}
            <span className="text-yellow-300">
              Build.
            </span>
            {' '}
            <span className="text-fuchsia-400">
              Launch.
            </span>
          </p>
          {' '}
          <p className="mt-4 max-w-xl text-[18px] leading-relaxed text-slate-200 n640:text-[20px]">
            Turn a prompt into a real-world solution.
            <br className="hidden n640:inline" />
            {' '}Compete. Create. Change the future.
          </p>
          {' '}
          <div className="mt-7 flex flex-col gap-3 n640:mt-8 n640:flex-row n640:items-center">
            <a href={HK_REGISTER} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-300 via-amber-400 to-fuchsia-500 px-7 font-hk-display text-[20px]/[28px] font-extrabold uppercase tracking-wide text-hk-night shadow-[0_10px_40px_-10px_rgb(250_204_21/0.7)] transition hover:-translate-y-0.5 n1024:px-6 n1024:text-[18px]/[28px] xl:px-7 xl:text-[20px]/[28px] hover:shadow-[0_16px_50px_-10px_rgb(217_70_239/0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
              Register Your Team Now{' '}
              <svg className="size-5 transition group-hover:translate-x-1" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>
            {' '}
            <a href="#challenge" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-7 font-hk-display text-[20px]/[28px] font-bold uppercase tracking-wide text-white transition hover:border-cyan-300/60 hover:text-cyan-200 n1024:px-6 n1024:text-[18px]/[28px] xl:px-7 xl:text-[20px]/[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
              Explore the Challenge
            </a>
          </div>
        </div>
        <div className="relative n1024:col-span-5">
          <div aria-hidden="true" className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 opacity-60 blur-md" />
          {' '}
          <HeroSlider />
          <div className="relative mx-auto -mt-10 flex max-w-sm -rotate-2 items-center gap-3 rounded-xl bg-yellow-300 px-5 py-4 text-hk-night shadow-[0_20px_50px_-15px_rgb(250_204_21/0.6)] n640:absolute n640:-bottom-8 n640:-left-4 n640:mt-0 n1024:-left-10">
            <svg className="size-9 shrink-0" aria-hidden="true">
              <use href="#i-pin" />
            </svg>
            {' '}
            <p className="font-hk-display font-bold uppercase leading-tight">
              <span className="block text-[30px]/[36px] font-black">
                Top 15 Teams
              </span>
              {' '}
              <span className="block text-[16px]/[24px]">
                Win a spot at ATLAS Mumbai Campus for the Grand Finale!
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="overview" aria-labelledby="overview-title" className="scroll-mt-24 border-y border-white/10 bg-hk-panel/60">
      <div className="mx-auto max-w-7xl px-4 py-8 n640:px-6 n640:py-10 n1024:px-8 n1024:py-12">
        <h2 id="overview-title" className="sr-only">
          Hackathon at a glance
        </h2>
        {' '}
        <dl className="grid grid-cols-2 gap-3 n640:gap-4 n1024:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/40 n640:p-5 xl:p-6">
            <svg className="size-7 n640:size-9 text-cyan-300" aria-hidden="true">
              <use href="#i-cap" />
            </svg>
            {' '}
            <dt className="mt-3 font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] n640:mt-4 n640:text-[16px]/[24px] n640:tracking-[0.14em] text-cyan-300">
              Who can join?
            </dt>
            {' '}
            <dd className="mt-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px] n1024:text-[18px] xl:text-[20px]">
              Grade 11 &amp; 12 Students
            </dd>
          </div>
          {' '}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-300/40 n640:p-5 xl:p-6">
            <svg className="size-7 n640:size-9 text-yellow-300" aria-hidden="true">
              <use href="#i-users" />
            </svg>
            {' '}
            <dt className="mt-3 font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] n640:mt-4 n640:text-[16px]/[24px] n640:tracking-[0.14em] text-yellow-300">
              Team size
            </dt>
            {' '}
            <dd className="mt-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px] n1024:text-[18px] xl:text-[20px]">
              1 to 3 Students per team
            </dd>
          </div>
          {' '}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/40 n640:p-5 xl:p-6">
            <svg className="size-7 n640:size-9 text-cyan-300" aria-hidden="true">
              <use href="#i-globe" />
            </svg>
            {' '}
            <dt className="mt-3 font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] n640:mt-4 n640:text-[16px]/[24px] n640:tracking-[0.14em] text-cyan-300">
              Round 1 · Online
            </dt>
            {' '}
            <dd className="mt-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px] n1024:text-[18px] xl:text-[20px]">
              90-Minute Challenge
            </dd>
          </div>
          {' '}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-300/40 n640:p-5 xl:p-6">
            <svg className="size-7 n640:size-9 text-yellow-300" aria-hidden="true">
              <use href="#i-trophy" />
            </svg>
            {' '}
            <dt className="mt-3 font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] n640:mt-4 n640:text-[16px]/[24px] n640:tracking-[0.14em] text-yellow-300">
              Grand Finale
            </dt>
            {' '}
            <dd className="mt-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px] n1024:text-[18px] xl:text-[20px]">
              ATLAS SkillTech University, Mumbai
            </dd>
          </div>
          {' '}
          <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 via-violet-500/10 to-cyan-400/10 p-4 col-span-2 n640:p-5 n1024:col-span-1 xl:p-6">
            <svg className="size-7 n640:size-9 text-fuchsia-300" aria-hidden="true">
              <use href="#i-gift" />
            </svg>
            {' '}
            <dt className="mt-3 font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] n640:mt-4 n640:text-[16px]/[24px] n640:tracking-[0.14em] text-fuchsia-300">
              Rewards
            </dt>
            {' '}
            <dd className="mt-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px] n1024:text-[18px] xl:text-[20px]">
              Exciting prizes &amp; special recognitions!
            </dd>
          </div>
        </dl>
      </div>
    </section>
    <section id="key-dates" aria-labelledby="key-dates-title" className="scroll-mt-24 border-b border-white/10 py-12 n640:py-14 n1024:py-18">
      <div className="mx-auto max-w-7xl px-4 n640:px-6 n1024:px-8">
        <p className="[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)] inline-block bg-yellow-300 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-hk-night">
          Mark your calendar
        </p>
        {' '}
        <h2 id="key-dates-title" className="mt-3 font-hk-display text-[2.75rem] font-extrabold uppercase leading-none text-white n640:mt-4 n640:text-[60px]">
          Key{' '}
          <span className="text-yellow-300">
            Dates
          </span>
        </h2>
        <ol className="mt-6 grid gap-2.5 n640:mt-8 n640:gap-3 n1024:grid-cols-5 n1024:gap-4">
          <li className="relative flex gap-3 n640:gap-4 n1024:flex-col n1024:items-center">
            <span aria-hidden="true" className="absolute left-6 top-12 -bottom-2.5 w-px bg-white/15 n640:left-7 n640:top-14 n640:-bottom-3 n1024:left-[calc(50%+1.75rem)] n1024:-right-[calc(50%-0.75rem)] n1024:top-7 n1024:bottom-auto n1024:h-px n1024:w-auto" />
            {' '}
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-300/10 text-cyan-300 n640:size-14">
              <svg className="size-6 n640:size-7" aria-hidden="true">
                <use href="#i-users" />
              </svg>
            </span>
            {' '}
            <div className="flex flex-1 flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/40 n640:flex-row n640:items-center n640:justify-between n640:gap-4 n640:p-5 n1024:w-full n1024:flex-col n1024:justify-between n1024:gap-3 n1024:p-4 n1024:text-center xl:p-5">
              <p className="font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] text-cyan-300 n640:text-[16px]/[24px] n640:tracking-[0.14em] n1024:text-[14px]/[20px] n1024:tracking-[0.12em] xl:text-[16px]/[24px]">
                Registrations Open
              </p>
              {' '}
              <time dateTime="2026-10-01" className="whitespace-nowrap font-hk-display text-[30px] font-extrabold uppercase leading-none text-white xl:text-[36px]">
                1 Oct{' '}
                <span className="text-[20px]/[28px] font-bold text-slate-400 n1024:mt-1 n1024:block">
                  2026
                </span>
              </time>
            </div>
          </li>
          {' '}
          <li className="relative flex gap-3 n640:gap-4 n1024:flex-col n1024:items-center">
            <span aria-hidden="true" className="absolute left-6 top-12 -bottom-2.5 w-px bg-white/15 n640:left-7 n640:top-14 n640:-bottom-3 n1024:left-[calc(50%+1.75rem)] n1024:-right-[calc(50%-0.75rem)] n1024:top-7 n1024:bottom-auto n1024:h-px n1024:w-auto" />
            {' '}
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/40 bg-yellow-300/10 text-yellow-300 n640:size-14">
              <svg className="size-6 n640:size-7" aria-hidden="true">
                <use href="#i-clock" />
              </svg>
            </span>
            {' '}
            <div className="flex flex-1 flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-300/40 n640:flex-row n640:items-center n640:justify-between n640:gap-4 n640:p-5 n1024:w-full n1024:flex-col n1024:justify-between n1024:gap-3 n1024:p-4 n1024:text-center xl:p-5">
              <p className="font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] text-yellow-300 n640:text-[16px]/[24px] n640:tracking-[0.14em] n1024:text-[14px]/[20px] n1024:tracking-[0.12em] xl:text-[16px]/[24px]">
                Registrations Close
              </p>
              {' '}
              <time dateTime="2026-12-15" className="whitespace-nowrap font-hk-display text-[30px] font-extrabold uppercase leading-none text-white xl:text-[36px]">
                15 Dec{' '}
                <span className="text-[20px]/[28px] font-bold text-slate-400 n1024:mt-1 n1024:block">
                  2026
                </span>
              </time>
            </div>
          </li>
          {' '}
          <li className="relative flex gap-3 n640:gap-4 n1024:flex-col n1024:items-center">
            <span aria-hidden="true" className="absolute left-6 top-12 -bottom-2.5 w-px bg-white/15 n640:left-7 n640:top-14 n640:-bottom-3 n1024:left-[calc(50%+1.75rem)] n1024:-right-[calc(50%-0.75rem)] n1024:top-7 n1024:bottom-auto n1024:h-px n1024:w-auto" />
            {' '}
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-300/10 text-cyan-300 n640:size-14">
              <svg className="size-6 n640:size-7" aria-hidden="true">
                <use href="#i-globe" />
              </svg>
            </span>
            {' '}
            <div className="flex flex-1 flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/40 n640:flex-row n640:items-center n640:justify-between n640:gap-4 n640:p-5 n1024:w-full n1024:flex-col n1024:justify-between n1024:gap-3 n1024:p-4 n1024:text-center xl:p-5">
              <p className="font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] text-cyan-300 n640:text-[16px]/[24px] n640:tracking-[0.14em] n1024:text-[14px]/[20px] n1024:tracking-[0.12em] xl:text-[16px]/[24px]">
                Round 1 – Online Challenge
              </p>
              {' '}
              <time dateTime="2026-12-19" className="whitespace-nowrap font-hk-display text-[30px] font-extrabold uppercase leading-none text-white xl:text-[36px]">
                19 Dec{' '}
                <span className="text-[20px]/[28px] font-bold text-slate-400 n1024:mt-1 n1024:block">
                  2026
                </span>
              </time>
            </div>
          </li>
          {' '}
          <li className="relative flex gap-3 n640:gap-4 n1024:flex-col n1024:items-center">
            <span aria-hidden="true" className="absolute left-6 top-12 -bottom-2.5 w-px bg-white/15 n640:left-7 n640:top-14 n640:-bottom-3 n1024:left-[calc(50%+1.75rem)] n1024:-right-[calc(50%-0.75rem)] n1024:top-7 n1024:bottom-auto n1024:h-px n1024:w-auto" />
            {' '}
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/40 bg-yellow-300/10 text-yellow-300 n640:size-14">
              <svg className="size-6 n640:size-7" aria-hidden="true">
                <use href="#i-star" />
              </svg>
            </span>
            {' '}
            <div className="flex flex-1 flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-300/40 n640:flex-row n640:items-center n640:justify-between n640:gap-4 n640:p-5 n1024:w-full n1024:flex-col n1024:justify-between n1024:gap-3 n1024:p-4 n1024:text-center xl:p-5">
              <p className="font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] text-yellow-300 n640:text-[16px]/[24px] n640:tracking-[0.14em] n1024:text-[14px]/[20px] n1024:tracking-[0.12em] xl:text-[16px]/[24px]">
                Top 15 Announcement
              </p>
              {' '}
              <time dateTime="2026-12-23" className="whitespace-nowrap font-hk-display text-[30px] font-extrabold uppercase leading-none text-white xl:text-[36px]">
                23 Dec{' '}
                <span className="text-[20px]/[28px] font-bold text-slate-400 n1024:mt-1 n1024:block">
                  2026
                </span>
              </time>
            </div>
          </li>
          {' '}
          <li className="relative flex gap-3 n640:gap-4 n1024:flex-col n1024:items-center">
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300 shadow-[0_0_30px_-8px_rgb(217_70_239/0.7)] n640:size-14">
              <svg className="size-6 n640:size-7" aria-hidden="true">
                <use href="#i-trophy" />
              </svg>
            </span>
            {' '}
            <div className="flex flex-1 flex-col gap-1.5 rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 via-violet-500/10 to-cyan-400/10 p-4 n640:flex-row n640:items-center n640:justify-between n640:gap-4 n640:p-5 n1024:w-full n1024:flex-col n1024:justify-between n1024:gap-3 n1024:p-4 n1024:text-center xl:p-5">
              <p className="font-hk-display text-[14px]/[20px] font-bold uppercase tracking-[0.12em] text-fuchsia-300 n640:text-[16px]/[24px] n640:tracking-[0.14em] n1024:text-[14px]/[20px] n1024:tracking-[0.12em] xl:text-[16px]/[24px]">
                Grand Finale – ATLAS Mumbai
              </p>
              {' '}
              <time dateTime="2027-01-16" className="whitespace-nowrap font-hk-display text-[30px] font-extrabold uppercase leading-none text-white xl:text-[36px]">
                16 Jan{' '}
                <span className="text-[20px]/[28px] font-bold text-slate-400 n1024:mt-1 n1024:block">
                  2027
                </span>
              </time>
            </div>
          </li>
        </ol>
      </div>
    </section>
    <section id="challenge" aria-labelledby="challenge-title" className="scroll-mt-24 py-12 n640:py-14 n1024:py-18">
      <div className="mx-auto max-w-7xl px-4 n640:px-6 n1024:px-8">
        <div className="grid items-center gap-8 n1024:grid-cols-2 n1024:gap-12">
          <div>
            <p className="[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)] inline-block bg-cyan-400 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-hk-night">
              Your mission
            </p>
            {' '}
            <h2 id="challenge-title" className="mt-3 font-hk-display text-[2.75rem] font-extrabold uppercase leading-none text-white n640:mt-4 n640:text-[60px]">
              The Challenge
            </h2>
            {' '}
            <p className="mt-4 text-[20px] leading-relaxed text-slate-200 n640:mt-5 n640:text-[24px]">
              You will receive a{' '}
              <strong className="font-semibold text-cyan-300">
                real-world problem
              </strong>
              . Use{' '}
              <strong className="font-semibold text-yellow-300">
                AI, tech and creativity
              </strong>
              {' '}to build a{' '}
              <strong className="font-semibold text-fuchsia-300">
                working solution
              </strong>
              .
            </p>
          </div>
          {' '}
          <div className="relative pb-8 n640:pb-12">
            <figure className="overflow-hidden rounded-3xl border border-white/10">
              <img src="/assets/atlas-hackathon-2026/student-coding.webp" width={583} height={206} loading="lazy" alt="Student focused on code across multiple screens in a dimly lit lab" className="block aspect-[2/1] w-full object-cover n640:aspect-[583/206]" />
            </figure>
            {' '}
            <figure className="absolute bottom-0 right-4 w-32 overflow-hidden rounded-2xl border-2 border-cyan-300/60 shadow-[0_0_40px_-8px_rgb(34_211_238/0.6)] n640:right-6 n640:w-48">
              <img src="/assets/atlas-hackathon-2026/ai-technology.webp" width={274} height={208} loading="lazy" alt="Robotic hand reaching toward a glowing AI chip, representing artificial intelligence" className="block aspect-[274/208] w-full object-cover" />
            </figure>
          </div>
        </div>
        <div className="mt-8 rounded-3xl border border-white/10 bg-hk-panel p-5 n640:mt-10 n640:p-8 n1024:mt-12">
          <h3 className="font-hk-display text-[18px]/[28px] font-bold uppercase tracking-[0.14em] text-slate-400 n640:text-[20px]/[28px]">
            How you&apos;ll get there
          </h3>
          {' '}
          <ol className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 n640:grid-cols-5">
            <li className="relative flex flex-col items-center text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl n640:size-16 border border-yellow-300/40 bg-yellow-300/10 text-yellow-300">
                <svg className="size-7 n640:size-8" aria-hidden="true">
                  <use href="#i-search" />
                </svg>
              </span>
              {' '}
              <span className="mt-2.5 font-hk-display text-[16px]/[24px] n640:mt-3 n640:text-[18px]/[28px] font-bold uppercase tracking-wider text-yellow-300">
                Research
              </span>
              {' '}
              <svg className="absolute -right-4 top-5 hidden size-6 text-slate-500 n640:block" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </li>
            {' '}
            <li className="relative flex flex-col items-center text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl n640:size-16 border border-yellow-300/40 bg-yellow-300/10 text-yellow-300">
                <svg className="size-7 n640:size-8" aria-hidden="true">
                  <use href="#i-bulb" />
                </svg>
              </span>
              {' '}
              <span className="mt-2.5 font-hk-display text-[16px]/[24px] n640:mt-3 n640:text-[18px]/[28px] font-bold uppercase tracking-wider text-yellow-300">
                Ideate
              </span>
              {' '}
              <svg className="absolute -right-4 top-5 hidden size-6 text-slate-500 n640:block" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </li>
            {' '}
            <li className="relative flex flex-col items-center text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl n640:size-16 border border-cyan-300/40 bg-cyan-300/10 text-cyan-300">
                <svg className="size-7 n640:size-8" aria-hidden="true">
                  <use href="#i-code" />
                </svg>
              </span>
              {' '}
              <span className="mt-2.5 font-hk-display text-[16px]/[24px] n640:mt-3 n640:text-[18px]/[28px] font-bold uppercase tracking-wider text-cyan-300">
                Build
              </span>
              {' '}
              <svg className="absolute -right-4 top-5 hidden size-6 text-slate-500 n640:block" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </li>
            {' '}
            <li className="relative flex flex-col items-center text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl n640:size-16 border border-emerald-300/40 bg-emerald-300/10 text-emerald-300">
                <svg className="size-7 n640:size-8" aria-hidden="true">
                  <use href="#i-check-circle" />
                </svg>
              </span>
              {' '}
              <span className="mt-2.5 font-hk-display text-[16px]/[24px] n640:mt-3 n640:text-[18px]/[28px] font-bold uppercase tracking-wider text-emerald-300">
                Test
              </span>
              {' '}
              <svg className="absolute -right-4 top-5 hidden size-6 text-slate-500 n640:block" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </li>
            {' '}
            <li className="relative col-span-2 flex flex-col items-center text-center n640:col-span-1">
              <span className="flex size-14 items-center justify-center rounded-2xl n640:size-16 border border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300">
                <svg className="size-7 n640:size-8" aria-hidden="true">
                  <use href="#i-present" />
                </svg>
              </span>
              {' '}
              <span className="mt-2.5 font-hk-display text-[16px]/[24px] n640:mt-3 n640:text-[18px]/[28px] font-bold uppercase tracking-wider text-fuchsia-300">
                Present
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
    <section id="build" aria-labelledby="build-title" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-hk-panel/40 py-12 n640:py-14 n1024:py-18">
      <div aria-hidden="true" className="absolute -right-40 top-10 -z-10 size-[30rem] rounded-full bg-violet-600/20 blur-[120px]" />
      {' '}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 n640:gap-10 n640:px-6 n1024:grid-cols-12 n1024:items-center n1024:gap-12 n1024:px-8">
        <div className="relative order-2 mx-auto w-full max-w-xl pb-10 n640:pb-12 n1024:order-1 n1024:col-span-5 n1024:max-w-none">
          <figure className="overflow-hidden rounded-3xl border border-white/10">
            <img src="/assets/atlas-hackathon-2026/immersive-tech.webp" width={683} height={480} loading="lazy" alt="Student testing an immersive virtual reality experience in a technology lab" className="block aspect-[4/3] w-full object-cover n1024:aspect-[6/5]" />
          </figure>
          {' '}
          <figure className="absolute bottom-0 right-4 w-[45%] overflow-hidden rounded-2xl border-2 border-violet-400/60 shadow-[0_0_40px_-8px_rgb(139_92_246/0.7)] n640:right-8">
            <img src="/assets/atlas-hackathon-2026/prototype-robotics.webp" width={369} height={305} loading="lazy" alt="Student assembling a robotics prototype with wires and components" className="block aspect-[369/305] w-full object-cover" />
          </figure>
        </div>
        <div className="order-1 n1024:order-2 n1024:col-span-7">
          <p className="[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)] inline-block bg-violet-500 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-white">
            Build anything
          </p>
          {' '}
          <h2 id="build-title" className="mt-3 font-hk-display text-[2.75rem] font-extrabold uppercase leading-none text-white n640:mt-4 n640:text-[60px]">
            What can you build?
          </h2>
          {' '}
          <ul className="mt-6 grid gap-3 n640:mt-8 n640:grid-cols-2 n640:gap-4">
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-violet-400/50 n640:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl n640:size-12 bg-violet-500/15 text-violet-300">
                <svg className="size-6" aria-hidden="true">
                  <use href="#i-phone" />
                </svg>
              </span>
              {' '}
              <span className="text-[18px]/[28px] font-semibold text-white">
                Web / Mobile Applications
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-violet-400/50 n640:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl n640:size-12 bg-cyan-400/15 text-cyan-300">
                <svg className="size-6" aria-hidden="true">
                  <use href="#i-cpu" />
                </svg>
              </span>
              {' '}
              <span className="text-[18px]/[28px] font-semibold text-white">
                AI-Powered Solutions
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-violet-400/50 n640:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl n640:size-12 bg-violet-500/15 text-violet-300">
                <svg className="size-6" aria-hidden="true">
                  <use href="#i-chart" />
                </svg>
              </span>
              {' '}
              <span className="text-[18px]/[28px] font-semibold text-white">
                Dashboards &amp; Tools
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-violet-400/50 n640:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl n640:size-12 bg-cyan-400/15 text-cyan-300">
                <svg className="size-6" aria-hidden="true">
                  <use href="#i-bot" />
                </svg>
              </span>
              {' '}
              <span className="text-[18px]/[28px] font-semibold text-white">
                AI Agents / Chatbots
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-violet-400/50 n640:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl n640:size-12 bg-violet-500/15 text-violet-300">
                <svg className="size-6" aria-hidden="true">
                  <use href="#i-layers" />
                </svg>
              </span>
              {' '}
              <span className="text-[18px]/[28px] font-semibold text-white">
                Platforms &amp; Digital Products
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-yellow-300/40 bg-yellow-300/[0.06] p-4 n640:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl n640:size-12 bg-yellow-300/15 text-yellow-300">
                <svg className="size-6" aria-hidden="true">
                  <use href="#i-star" />
                </svg>
              </span>
              {' '}
              <span className="leading-snug">
                <span className="block text-[18px]/[28px] font-semibold text-white">
                  …and more! Get creative.
                </span>
                {' '}
                <span className="block font-hk-display text-[18px]/[28px] font-bold uppercase tracking-wide text-yellow-300">
                  Build future-ready!
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section id="format" aria-labelledby="format-title" className="scroll-mt-24 border-t border-white/10 py-12 n640:py-14 n1024:py-18">
      <div className="mx-auto max-w-7xl px-4 n640:px-6 n1024:px-8">
        <div className="flex flex-col gap-3 n1024:flex-row n1024:items-end n1024:justify-between n1024:gap-6">
          <div>
            <p className="[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)] inline-flex items-center gap-2 bg-yellow-300 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-hk-night">
              <svg className="size-4" aria-hidden="true">
                <use href="#i-clock" />
              </svg>
              {' '}Round 1 · Online
            </p>
            {' '}
            <h2 id="format-title" className="mt-3 font-hk-display text-[2.75rem] font-extrabold uppercase leading-none text-white n640:mt-4 n640:text-[60px]">
              90-Minute{' '}
              <span className="text-yellow-300">
                Challenge Format
              </span>
            </h2>
          </div>
          {' '}
          <p className="font-hk-display text-[24px]/[32px] font-bold italic text-cyan-300 n640:text-[30px]/[36px] n1024:text-right">
            90 Minutes to Build Your Future!
          </p>
        </div>
        <div aria-hidden="true" className="mt-6 flex h-3 gap-1 overflow-hidden rounded-full n640:mt-8 n640:h-4">
          <span className="flex-[10_1_0%] bg-cyan-400" />
          {' '}
          <span className="flex-[15_1_0%] bg-sky-500" />
          {' '}
          <span className="flex-[15_1_0%] bg-yellow-300" />
          {' '}
          <span className="flex-[40_1_0%] bg-fuchsia-500" />
          {' '}
          <span className="flex-[10_1_0%] bg-emerald-400" />
        </div>
        {' '}
        <div className="mt-6 grid gap-6 n640:mt-8 n1024:grid-cols-12 n1024:gap-12">
          <ol className="grid gap-2.5 n640:gap-3 n1024:col-span-7">
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 n640:gap-6 n640:p-4 n1024:p-5">
              <span className="w-[5.25rem] shrink-0 rounded-lg n640:w-24 border border-cyan-400/50 bg-cyan-400/10 py-1.5 text-center font-hk-display text-[16px]/[24px] font-bold uppercase n640:py-2 n640:text-[18px]/[28px] text-cyan-300">
                10 mins
              </span>
              {' '}
              <span className="flex-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px]">
                Challenge Briefing
              </span>
              {' '}
              <span className="hidden font-hk-display text-[16px]/[24px] font-semibold tracking-wide text-slate-400 n640:block">
                0–10
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 n640:gap-6 n640:p-4 n1024:p-5">
              <span className="w-[5.25rem] shrink-0 rounded-lg n640:w-24 border border-sky-500/50 bg-sky-500/10 py-1.5 text-center font-hk-display text-[16px]/[24px] font-bold uppercase n640:py-2 n640:text-[18px]/[28px] text-sky-300">
                15 mins
              </span>
              {' '}
              <span className="flex-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px]">
                Research &amp; Understand
              </span>
              {' '}
              <span className="hidden font-hk-display text-[16px]/[24px] font-semibold tracking-wide text-slate-400 n640:block">
                10–25
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 n640:gap-6 n640:p-4 n1024:p-5">
              <span className="w-[5.25rem] shrink-0 rounded-lg n640:w-24 border border-yellow-300/50 bg-yellow-300/10 py-1.5 text-center font-hk-display text-[16px]/[24px] font-bold uppercase n640:py-2 n640:text-[18px]/[28px] text-yellow-300">
                15 mins
              </span>
              {' '}
              <span className="flex-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px]">
                Ideate Your Solution
              </span>
              {' '}
              <span className="hidden font-hk-display text-[16px]/[24px] font-semibold tracking-wide text-slate-400 n640:block">
                25–40
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/[0.07] p-3 n640:gap-6 n640:p-4 n1024:p-5">
              <span className="w-[5.25rem] shrink-0 rounded-lg n640:w-24 border border-fuchsia-400/60 bg-fuchsia-500/15 py-1.5 text-center font-hk-display text-[16px]/[24px] font-bold uppercase n640:py-2 n640:text-[18px]/[28px] text-fuchsia-300">
                40 mins
              </span>
              {' '}
              <span className="flex-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px]">
                Build Your Prototype
              </span>
              {' '}
              <span className="hidden font-hk-display text-[16px]/[24px] font-semibold tracking-wide text-slate-400 n640:block">
                40–80
              </span>
            </li>
            {' '}
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 n640:gap-6 n640:p-4 n1024:p-5">
              <span className="w-[5.25rem] shrink-0 rounded-lg n640:w-24 border border-emerald-400/50 bg-emerald-400/10 py-1.5 text-center font-hk-display text-[16px]/[24px] font-bold uppercase n640:py-2 n640:text-[18px]/[28px] text-emerald-300">
                10 mins
              </span>
              {' '}
              <span className="flex-1 text-[16px] font-semibold leading-snug text-white n640:text-[20px]">
                Test &amp; Prepare Submission
              </span>
              {' '}
              <span className="hidden font-hk-display text-[16px]/[24px] font-semibold tracking-wide text-slate-400 n640:block">
                80–90
              </span>
            </li>
          </ol>
          {' '}
          <figure className="relative overflow-hidden rounded-3xl border border-white/10 n1024:col-span-5">
            <img src="/assets/atlas-hackathon-2026/students-building.webp" width={683} height={480} loading="lazy" alt="Students building prototypes on laptops and devices around a shared workbench" className="block aspect-[16/10] size-full object-cover n640:aspect-[21/9] n1024:aspect-auto" />
            {' '}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-hk-night via-hk-night/30 to-transparent" />
            {' '}
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5 n640:gap-4 n640:p-6">
              <svg className="size-11 shrink-0 text-yellow-300 n640:size-14 drop-shadow-[0_0_14px_rgb(250_204_21/0.7)]" aria-hidden="true">
                <use href="#i-timer" />
              </svg>
              {' '}
              <span className="font-hk-display uppercase leading-none text-white">
                <span className="block text-[48px]/[1] font-black text-yellow-300 n640:text-[60px]/[1]">
                  90
                </span>
                {' '}
                <span className="block text-[18px]/[28px] font-bold tracking-wider n640:text-[20px]/[28px]">
                  Minutes · 5 stages
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section id="submission" aria-labelledby="submission-title" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-hk-panel/40 py-12 n640:py-14 n1024:py-18">
      <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 size-[30rem] rounded-full bg-cyan-500/15 blur-[120px]" />
      {' '}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 n640:px-6 n1024:grid-cols-2 n1024:gap-12 n1024:px-8">
        <div>
          <p className="[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)] inline-block bg-cyan-400 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-hk-night">
            What you submit
          </p>
          {' '}
          <h2 id="submission-title" className="mt-3 font-hk-display text-[2.75rem] font-extrabold uppercase leading-none text-white n640:mt-4 n640:text-[60px]">
            Submission{' '}
            <span className="whitespace-nowrap text-cyan-300">
              (Round 1)
            </span>
          </h2>
          {' '}
          <p className="mt-4 text-[18px]/[28px] text-slate-200 n640:mt-5 n640:text-[24px]/[32px]">
            Submit{' '}
            <strong className="font-hk-display text-[24px]/[32px] font-extrabold uppercase text-yellow-300 n640:text-[30px]/[36px]">
              ONE
            </strong>
            {' '}PDF + 60–90 sec Pitch Video
          </p>
          {' '}
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 n640:mt-8 n640:gap-4">
            <div className="flex flex-col gap-2 rounded-2xl border border-yellow-300/40 bg-yellow-300/[0.06] p-4 n640:flex-row n640:items-center n640:gap-4 n640:p-5">
              <svg className="size-8 shrink-0 text-yellow-300 n640:size-10" aria-hidden="true">
                <use href="#i-file" />
              </svg>
              {' '}
              <p className="font-hk-display uppercase leading-tight">
                <span className="block text-[20px]/[28px] font-extrabold text-white n640:text-[24px]/[32px]">
                  1 PDF
                </span>
                <span className="text-[14px]/[20px] font-semibold text-slate-400 n640:text-[16px]/[24px]">
                  Your full submission
                </span>
              </p>
            </div>
            {' '}
            <span aria-hidden="true" className="self-center text-center font-hk-display text-[24px]/[32px] font-black text-slate-500 n640:text-[30px]/[36px]">
              +
            </span>
            {' '}
            <div className="flex flex-col gap-2 rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/[0.07] p-4 n640:flex-row n640:items-center n640:gap-4 n640:p-5">
              <svg className="size-8 shrink-0 text-fuchsia-300 n640:size-10" aria-hidden="true">
                <use href="#i-video" />
              </svg>
              {' '}
              <p className="font-hk-display uppercase leading-tight">
                <span className="block text-[20px]/[28px] font-extrabold text-white n640:text-[24px]/[32px]">
                  Pitch Video
                </span>
                <span className="text-[14px]/[20px] font-semibold text-slate-400 n640:text-[16px]/[24px]">
                  60–90 seconds
                </span>
              </p>
            </div>
          </div>
          {' '}
          <div aria-hidden="true" className="mt-8 hidden justify-center n1024:flex">
            <svg className="size-32 text-cyan-300 drop-shadow-[0_0_30px_rgb(34_211_238/0.7)]" style={{ strokeWidth: "1.1" }}>
              <use href="#i-upload" />
            </svg>
          </div>
        </div>
        {' '}
        <div className="rounded-3xl border border-cyan-300/25 bg-hk-night/70 p-5 shadow-[0_0_60px_-20px_rgb(34_211_238/0.4)] n640:p-8">
          <h3 className="font-hk-display text-[20px]/[28px] font-bold uppercase tracking-wider text-white n640:text-[24px]/[32px]">
            Submission checklist
          </h3>
          {' '}
          <ul className="mt-3 divide-y divide-white/10 n640:mt-4">
            <li className="flex gap-3 py-3 n640:gap-4 n640:py-4">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-yellow-300/60 text-yellow-300">
                <svg className="size-4" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              </span>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                Problem Understanding
              </span>
            </li>
            {' '}
            <li className="flex gap-3 py-3 n640:gap-4 n640:py-4">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-yellow-300/60 text-yellow-300">
                <svg className="size-4" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              </span>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                Your Solution
              </span>
            </li>
            {' '}
            <li className="flex gap-3 py-3 n640:gap-4 n640:py-4">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-yellow-300/60 text-yellow-300">
                <svg className="size-4" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              </span>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                Prototype Link{' '}
                <span className="ml-1 inline-block rounded bg-yellow-300/15 px-2 py-0.5 text-[14px]/[20px] font-semibold text-yellow-200">
                  must be public
                </span>
              </span>
            </li>
            {' '}
            <li className="flex gap-3 py-3 n640:gap-4 n640:py-4">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-yellow-300/60 text-yellow-300">
                <svg className="size-4" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              </span>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                AI &amp; Development Log{' '}
                <span className="block text-[14px]/[20px] font-normal n640:text-[16px]/[24px] text-slate-400">
                  Prompts, tools, research, iterations
                </span>
              </span>
            </li>
            {' '}
            <li className="flex gap-3 py-3 n640:gap-4 n640:py-4">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-yellow-300/60 text-yellow-300">
                <svg className="size-4" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              </span>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                60–90 sec Pitch Video
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section id="judging" aria-labelledby="judging-title" className="scroll-mt-24 border-t border-white/10 py-12 n640:py-14 n1024:py-18">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 n640:gap-8 n640:px-6 n1024:grid-cols-12 n1024:items-center n1024:gap-12 n1024:px-8">
        <div className="n1024:col-span-4">
          <p className="[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)] inline-block bg-violet-500 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-white">
            How you&apos;re scored
          </p>
          {' '}
          <h2 id="judging-title" className="mt-3 font-hk-display text-[2.75rem] font-extrabold uppercase leading-none text-white n640:mt-4 n640:text-[60px]">
            Judging Criteria
          </h2>
          {' '}
          <p className="mt-4 text-[18px] leading-relaxed text-slate-300 n640:mt-5">
            Every submission is evaluated across seven weighted criteria.
          </p>
          {' '}
          <p className="mt-5 inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 n640:mt-6 n640:px-6 n640:py-4 font-hk-display uppercase text-white shadow-[0_10px_40px_-10px_rgb(192_38_211/0.7)]">
            <span className="text-[20px]/[28px] font-bold tracking-wider">
              Total:
            </span>
            {' '}
            <span className="text-[36px]/[40px] font-black n640:text-[48px]/[1]">
              100%
            </span>
          </p>
        </div>
        {' '}
        <ol className="grid gap-2.5 n640:grid-cols-2 n640:gap-3 n1024:col-span-8">
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <div className="flex items-center gap-3">
              <svg className="size-6 shrink-0 text-cyan-300" aria-hidden="true">
                <use href="#i-target" />
              </svg>
              {' '}
              <span className="flex-1 text-[16px]/[24px] font-semibold text-white n640:text-[18px]/[28px]">
                Problem Understanding
              </span>
              {' '}
              <span className="font-hk-display text-[24px]/[32px] font-extrabold text-cyan-300">
                15%
              </span>
            </div>
            {' '}
            <div aria-hidden="true" className="mt-3 h-1.5 rounded-full bg-white/10 n640:mt-4">
              <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
          </li>
          {' '}
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <div className="flex items-center gap-3">
              <svg className="size-6 shrink-0 text-cyan-300" aria-hidden="true">
                <use href="#i-bulb" />
              </svg>
              {' '}
              <span className="flex-1 text-[16px]/[24px] font-semibold text-white n640:text-[18px]/[28px]">
                Innovation &amp; Originality
              </span>
              {' '}
              <span className="font-hk-display text-[24px]/[32px] font-extrabold text-cyan-300">
                20%
              </span>
            </div>
            {' '}
            <div aria-hidden="true" className="mt-3 h-1.5 rounded-full bg-white/10 n640:mt-4">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
          </li>
          {' '}
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <div className="flex items-center gap-3">
              <svg className="size-6 shrink-0 text-cyan-300" aria-hidden="true">
                <use href="#i-cpu" />
              </svg>
              {' '}
              <span className="flex-1 text-[16px]/[24px] font-semibold text-white n640:text-[18px]/[28px]">
                Use of Technology / AI
              </span>
              {' '}
              <span className="font-hk-display text-[24px]/[32px] font-extrabold text-cyan-300">
                20%
              </span>
            </div>
            {' '}
            <div aria-hidden="true" className="mt-3 h-1.5 rounded-full bg-white/10 n640:mt-4">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
          </li>
          {' '}
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <div className="flex items-center gap-3">
              <svg className="size-6 shrink-0 text-cyan-300" aria-hidden="true">
                <use href="#i-box" />
              </svg>
              {' '}
              <span className="flex-1 text-[16px]/[24px] font-semibold text-white n640:text-[18px]/[28px]">
                Prototype Quality
              </span>
              {' '}
              <span className="font-hk-display text-[24px]/[32px] font-extrabold text-cyan-300">
                20%
              </span>
            </div>
            {' '}
            <div aria-hidden="true" className="mt-3 h-1.5 rounded-full bg-white/10 n640:mt-4">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
          </li>
          {' '}
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <div className="flex items-center gap-3">
              <svg className="size-6 shrink-0 text-cyan-300" aria-hidden="true">
                <use href="#i-layout" />
              </svg>
              {' '}
              <span className="flex-1 text-[16px]/[24px] font-semibold text-white n640:text-[18px]/[28px]">
                Design &amp; User Experience
              </span>
              {' '}
              <span className="font-hk-display text-[24px]/[32px] font-extrabold text-cyan-300">
                10%
              </span>
            </div>
            {' '}
            <div aria-hidden="true" className="mt-3 h-1.5 rounded-full bg-white/10 n640:mt-4">
              <div className="h-full w-[50%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
          </li>
          {' '}
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <div className="flex items-center gap-3">
              <svg className="size-6 shrink-0 text-cyan-300" aria-hidden="true">
                <use href="#i-book" />
              </svg>
              {' '}
              <span className="flex-1 text-[16px]/[24px] font-semibold text-white n640:text-[18px]/[28px]">
                Research &amp; Evidence
              </span>
              {' '}
              <span className="font-hk-display text-[24px]/[32px] font-extrabold text-cyan-300">
                10%
              </span>
            </div>
            {' '}
            <div aria-hidden="true" className="mt-3 h-1.5 rounded-full bg-white/10 n640:mt-4">
              <div className="h-full w-[50%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
          </li>
          {' '}
          <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:col-span-2 n640:p-5">
            <div className="flex items-center gap-3">
              <svg className="size-6 shrink-0 text-cyan-300" aria-hidden="true">
                <use href="#i-mic" />
              </svg>
              {' '}
              <span className="flex-1 text-[16px]/[24px] font-semibold text-white n640:text-[18px]/[28px]">
                Pitch &amp; Communication
              </span>
              {' '}
              <span className="font-hk-display text-[24px]/[32px] font-extrabold text-cyan-300">
                5%
              </span>
            </div>
            {' '}
            <div aria-hidden="true" className="mt-3 h-1.5 rounded-full bg-white/10 n640:mt-4">
              <div className="h-full w-[25%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
          </li>
        </ol>
      </div>
    </section>
    <section id="rules" aria-labelledby="rules-title" className="scroll-mt-24 border-t border-white/10 bg-hk-panel/40 py-12 n640:py-14 n1024:py-18">
      <div className="mx-auto max-w-7xl px-4 n640:px-6 n1024:px-8">
        <p className="[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)] inline-block bg-yellow-300 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-hk-night">
          Key points
        </p>
        {' '}
        <h2 id="rules-title" className="mt-3 font-hk-display text-[2.75rem] font-extrabold uppercase leading-none text-white n640:mt-4 n640:text-[60px]">
          Rules
        </h2>
        {' '}
        <ul className="mt-6 grid gap-2.5 n640:mt-8 n640:grid-cols-2 n640:gap-4 n1024:grid-cols-3">
          <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <svg className="size-6 shrink-0 text-yellow-300 n640:size-7" aria-hidden="true">
              <use href="#i-award" />
            </svg>
            {' '}
            <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
              Original work only
            </span>
          </li>
          {' '}
          <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <svg className="size-6 shrink-0 text-yellow-300 n640:size-7" aria-hidden="true">
              <use href="#i-file" />
            </svg>
            {' '}
            <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
              Use of AI tools allowed –{' '}
              <span className="text-yellow-200">
                must maintain log
              </span>
            </span>
          </li>
          {' '}
          <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <svg className="size-6 shrink-0 text-yellow-300 n640:size-7" aria-hidden="true">
              <use href="#i-ban" />
            </svg>
            {' '}
            <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
              No plagiarism / pre-built projects
            </span>
          </li>
          {' '}
          <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <svg className="size-6 shrink-0 text-yellow-300 n640:size-7" aria-hidden="true">
              <use href="#i-scale" />
            </svg>
            {' '}
            <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
              Follow ethical use of data and content
            </span>
          </li>
          {' '}
          <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <svg className="size-6 shrink-0 text-yellow-300 n640:size-7" aria-hidden="true">
              <use href="#i-clock" />
            </svg>
            {' '}
            <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
              Respect time limit and submission format
            </span>
          </li>
          {' '}
          <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:p-5">
            <svg className="size-6 shrink-0 text-yellow-300 n640:size-7" aria-hidden="true">
              <use href="#i-gavel" />
            </svg>
            {' '}
            <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
              Judges’ decision is final
            </span>
          </li>
        </ul>
        <div className="mt-4 flex items-center gap-4 rounded-3xl border border-yellow-300/30 bg-gradient-to-r from-yellow-300/10 via-fuchsia-500/10 to-violet-600/10 p-5 n640:mt-6 n640:gap-5 n640:p-7">
          <svg className="size-12 shrink-0 text-yellow-300 n640:size-16 drop-shadow-[0_0_18px_rgb(250_204_21/0.6)]" aria-hidden="true">
            <use href="#i-shield" />
          </svg>
          {' '}
          <p className="font-hk-display text-[24px] font-extrabold uppercase leading-tight n640:text-[36px]">
            <span className="text-yellow-300">
              Fair Play.
            </span>
            {' '}
            <span className="text-white">
              Real Impact.
            </span>
            {' '}
            <span className="text-fuchsia-400">
              Your Ideas Matter.
            </span>
          </p>
        </div>
      </div>
    </section>
    <section id="finale" aria-labelledby="finale-title" className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/10 py-12 n640:py-14 n1024:py-18">
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
      {' '}
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 n640:gap-10 n640:px-6 n1024:grid-cols-2 n1024:gap-12 n1024:px-8">
        <div className="relative mx-auto w-full max-w-xl pb-16 n640:pb-20 n1024:max-w-none">
          <figure className="relative w-[88%] overflow-hidden rounded-3xl border border-white/10">
            <img src="/assets/atlas-hackathon-2026/atlas-mumbai-campus.webp" width={369} height={305} loading="lazy" alt="The ATLAS SkillTech University campus building in Mumbai" className="block aspect-[369/305] w-full object-cover" />
            {' '}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-hk-night/70 to-transparent" />
            {' '}
            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-hk-night/75 px-3 py-1.5 text-[14px]/[20px] font-semibold text-white backdrop-blur">
              <svg className="size-4 text-yellow-300" aria-hidden="true">
                <use href="#i-pin" />
              </svg>
              {' '}ATLAS Mumbai Campus
            </figcaption>
          </figure>
          {' '}
          <figure className="absolute bottom-0 right-0 w-[55%] overflow-hidden rounded-2xl border-2 border-fuchsia-400/60 shadow-[0_0_50px_-10px_rgb(217_70_239/0.7)]">
            <img src="/assets/atlas-hackathon-2026/pitch-to-experts.webp" width={370} height={305} loading="lazy" alt="Students presenting their project to industry experts and faculty" className="block aspect-[370/305] w-full object-cover" />
          </figure>
        </div>
        <div>
          <p className="[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)] inline-block bg-yellow-300 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-hk-night">
            Top 15 teams
          </p>
          {' '}
          <h2 id="finale-title" className="mt-3 font-hk-display text-[2.75rem] font-extrabold uppercase leading-none text-white n640:mt-4 n640:text-[60px]">
            Grand Finale{' '}
            <span className="block text-yellow-300">
              – Top 15 Teams
            </span>
          </h2>
          {' '}
          <p className="mt-4 text-[18px] leading-relaxed text-slate-200 n640:mt-5 n640:text-[20px]">
            Win a spot at{' '}
            <strong className="font-semibold text-white">
              ATLAS Mumbai Campus
            </strong>
            {' '}for the Grand Finale!
          </p>
          {' '}
          <ul className="mt-6 grid grid-cols-2 gap-2.5 n640:gap-3">
            <li className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:flex-row n640:items-center n640:gap-4 n640:p-5">
              <svg className="size-7 shrink-0 text-cyan-300 n640:size-8" aria-hidden="true">
                <use href="#i-pin" />
              </svg>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                Come to ATLAS Mumbai Campus
              </span>
            </li>
            {' '}
            <li className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:flex-row n640:items-center n640:gap-4 n640:p-5">
              <svg className="size-7 shrink-0 text-cyan-300 n640:size-8" aria-hidden="true">
                <use href="#i-present" />
              </svg>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                Pitch to industry experts &amp; faculty
              </span>
            </li>
            {' '}
            <li className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:flex-row n640:items-center n640:gap-4 n640:p-5">
              <svg className="size-7 shrink-0 text-cyan-300 n640:size-8" aria-hidden="true">
                <use href="#i-trophy" />
              </svg>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                Amazing prizes &amp; special awards
              </span>
            </li>
            {' '}
            <li className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 n640:flex-row n640:items-center n640:gap-4 n640:p-5">
              <svg className="size-7 shrink-0 text-cyan-300 n640:size-8" aria-hidden="true">
                <use href="#i-users" />
              </svg>
              {' '}
              <span className="text-[16px]/[24px] font-medium text-white n640:text-[18px]/[28px]">
                Network, learn &amp; get inspired!
              </span>
            </li>
          </ul>
          <div className="mt-3 flex items-center gap-4 rounded-2xl border border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-500/15 to-violet-600/15 p-4 n640:mt-4 n640:gap-5 n640:p-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/20 n640:size-14 text-fuchsia-300">
              <svg className="size-8" aria-hidden="true">
                <use href="#i-gift" />
              </svg>
            </span>
            {' '}
            <p className="font-hk-display text-[20px] font-extrabold uppercase leading-tight text-white n640:text-[30px]">
              Exciting prizes{' '}
              <span className="text-fuchsia-300">
                &amp; special recognitions!
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="register" aria-labelledby="register-title" className="scroll-mt-24 px-4 pb-12 n640:px-6 n640:pb-14 n1024:px-8 n1024:pb-18">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-hk-panel px-5 py-9 n640:rounded-[2rem] n640:px-10 n640:py-12 n1024:px-12 n1024:py-14">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(34_211_238/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(34_211_238/0.07)_1px,transparent_1px)] bg-[length:44px_44px] [mask-image:linear-gradient(to_right,black,transparent)]" />
        {' '}
        <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 size-80 rounded-full bg-fuchsia-600/30 blur-[100px]" />
        {' '}
        <div aria-hidden="true" className="absolute -bottom-24 left-10 -z-10 size-80 rounded-full bg-cyan-500/25 blur-[100px]" />
        {' '}
        <div className="flex flex-col gap-7 n640:gap-8 n1024:flex-row n1024:items-center n1024:justify-between">
          <div className="flex items-center gap-6">
            <h2 id="register-title" className="font-hk-display text-[2.75rem] font-black uppercase leading-[0.9] text-white n640:text-[72px]">
              Ready to{' '}
              <span className="text-yellow-300">
                build
              </span>
              <br />
              {' '}what’s{' '}
              <span className="text-cyan-300">
                next?
              </span>
            </h2>
            {' '}
            <span aria-hidden="true" className="hidden font-hk-display text-[96px] font-black leading-none n640:block">
              <span className="bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                &rsaquo;&rsaquo;
              </span>
            </span>
          </div>
          {' '}
          <div className="flex flex-col gap-3 n640:items-start n1024:items-end">
            <a href={HK_REGISTER} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-fuchsia-500 px-5 font-hk-display text-[20px]/[28px] font-black n640:min-h-16 n640:px-8 uppercase tracking-wide text-hk-night shadow-[0_15px_50px_-10px_rgb(250_204_21/0.7)] ring-1 ring-white/30 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgb(217_70_239/0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 n640:text-[30px]/[36px]">
              Register Your Team Now!{' '}
              <svg className="size-6 shrink-0 transition group-hover:translate-x-1 n640:size-7" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>
            {' '}
            <p className="text-[14px]/[20px] text-slate-400 n640:text-[16px]/[24px] n1024:text-right">
              <span className="font-semibold text-slate-200">
                Contact:
              </span>
              {' '}
              <a href="tel:8976870842" className="whitespace-nowrap transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                8976870842
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
