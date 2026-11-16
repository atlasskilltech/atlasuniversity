import HackathonHeader, { HK_ROUTE } from '@/components/Hackathon/Header';
import HackathonFooter from '@/components/Hackathon/Footer';
import RegisterForm, { ClosedNotice } from '@/components/Hackathon/RegisterForm';
import { BG_GRID, CLIP_TAG } from '@/components/Hackathon/ui';
import { isRegistrationOpen } from '@/lib/hackathon/store';

/*
 * /atlas-hackathon-2026/register — register.php: the page heading and the team form. Whether the form
 * shows depends on the admin's open/closed switch (/admin/hackathon), so the page is rendered per visit.
 */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Register Your Team - ATLAS Hackathon 2026',
  description: 'Register your two-member team for ATLAS Hackathon 2026: Prompt to Product. Open to Grade 11 and Grade 12 students.',
  alternates: { canonical: '/atlas-hackathon-2026/register' },
};

const FACTS = [
  ['i-users', 'Teams of 2'],
  ['i-cap', 'Grade 11 & 12'],
  ['i-clock', '90-minute challenge'],
  ['i-star', 'Top 15 reach the Grand Finale'],
];

export default async function RegisterPage() {
  const open = await isRegistrationOpen();
  return (
    <>
      <HackathonHeader base={HK_ROUTE} />
      <main id="main">
        {/* page heading */}
        <section id="top" className="relative isolate overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${BG_GRID} [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]`} />
          <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 size-[28rem] rounded-full bg-cyan-500/20 blur-[120px]" />
          <div aria-hidden="true" className="absolute -right-32 top-10 -z-10 size-[26rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />

          <div className="mx-auto max-w-4xl px-4 pb-10 pt-8 n640:px-6 n640:pb-14 n640:pt-12 n1024:px-8">
            <p className={`${CLIP_TAG} inline-flex items-center gap-2 bg-yellow-300 py-1 pl-3 pr-7 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-wider text-hk-night`}>
              <svg className="size-4" aria-hidden="true">
                <use href="#i-rocket" />
              </svg>
              Round 1 &middot; Online
            </p>

            <h1 className="mt-4 font-hk-display text-[2.75rem] font-extrabold uppercase leading-[0.9] text-white n640:text-[60px]">
              Register your <span className="text-cyan-300">team</span>
            </h1>

            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-300 n640:text-[18px]">
              Teams of two, 90 minutes, one idea taken from prompt to product. Fill in the details below and your school will be entered into Round 1.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2 n640:gap-3">
              {FACTS.map(([icon, label]) => (
                <li key={icon} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[14px]/[20px] font-medium text-slate-300">
                  <svg className="size-4 shrink-0 text-cyan-300" aria-hidden="true">
                    <use href={`#${icon}`} />
                  </svg>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* form */}
        <section className="py-10 n640:py-14">
          <div className="mx-auto max-w-4xl px-4 n640:px-6 n1024:px-8">{open ? <RegisterForm /> : <ClosedNotice />}</div>
        </section>
      </main>
      <HackathonFooter base={HK_ROUTE} />
    </>
  );
}
