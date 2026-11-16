/* eslint-disable @next/next/no-img-element -- plain <img>: /assets/ paths are rewritten to S3 at build time */
import MobileMenu from './MobileMenu';

/**
 * ATLAS Hackathon 2026 header — the reference index.html's sticky header. `base` is '' on the
 * landing page (in-page anchors) and '/atlas-hackathon-2026' on the register/success pages, so the
 * same links lead back to the landing page's sections.
 *
 * Breakpoints: the reference is Tailwind v4 (sm 640 / lg 1024); this project's `sm`/`lg` are 480/992,
 * so its `sm:`/`lg:` are written `n640:`/`n1024:` (see tailwind.config.js).
 */
export const HK_ROUTE = '/atlas-hackathon-2026';
export const HK_REGISTER = '/atlas-hackathon-2026/register';

const PRIMARY = [
  ['challenge', 'Challenge'],
  ['build', 'What to Build'],
  ['format', 'Format'],
  ['submission', 'Submission'],
  ['judging', 'Judging'],
  ['rules', 'Rules'],
  ['finale', 'Grand Finale'],
];

const MOBILE = [
  ['challenge', 'The Challenge'],
  ['build', 'What Can You Build?'],
  ['format', '90-Minute Format'],
  ['submission', 'Submission'],
  ['judging', 'Judging Criteria'],
  ['rules', 'Rules'],
  ['finale', 'Grand Finale'],
];

export default function HackathonHeader({ base = '' }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-hk-night/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 n640:h-20 n640:px-6 n1024:px-8">
        <a href={`${base}#top`} className="shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
          <img
            src="/assets/atlas-hackathon-2026/atlas-ugdx-logo.webp"
            width={800}
            height={250}
            alt="ATLAS SkillTech University | uGDX School of Technology — home"
            className="block h-9 w-auto n640:h-11"
          />
        </a>

        <nav aria-label="Primary" className="hidden n1024:block">
          <ul className="flex items-center whitespace-nowrap text-[0.9rem] font-medium xl:gap-1 xl:text-[0.95rem]">
            {PRIMARY.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`${base}#${id}`}
                  className="rounded-md px-2 py-2 text-slate-300 transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 xl:px-3"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={HK_REGISTER}
            className="hidden min-h-11 items-center gap-2 rounded-lg bg-yellow-300 px-4 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wide text-hk-night transition hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 n640:inline-flex"
          >
            Register
            <svg className="size-4" aria-hidden="true">
              <use href="#i-arrow" />
            </svg>
          </a>

          <MobileMenu>
            <ul className="grid text-[16px]/[24px] font-medium text-slate-200">
              {MOBILE.map(([id, label]) => (
                <li key={id}>
                  <a href={`${base}#${id}`} className="block rounded-lg px-4 py-3 hover:bg-white/5 hover:text-cyan-300">
                    {label}
                  </a>
                </li>
              ))}
              <li className="p-2">
                <a
                  href={HK_REGISTER}
                  className="flex min-h-12 items-center justify-center rounded-lg bg-yellow-300 font-hk-display text-[18px]/[28px] font-extrabold uppercase text-hk-night hover:bg-yellow-200"
                >
                  Register Your Team
                </a>
              </li>
            </ul>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
