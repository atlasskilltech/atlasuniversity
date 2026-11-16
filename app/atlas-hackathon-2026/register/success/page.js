import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HackathonHeader, { HK_ROUTE } from '@/components/Hackathon/Header';
import HackathonFooter from '@/components/Hackathon/Footer';
import { BG_GRID, BTN_GHOST, BTN_PRIMARY } from '@/components/Hackathon/ui';
import { CONFIRM_COOKIE, getConfirmation } from '@/lib/hackathon/store';
import { formatIst } from '@/lib/hackathon/mail';
import { rowMembers } from '@/lib/hackathon/validate';

/*
 * /atlas-hackathon-2026/register/success — success.php. The registration comes from the httpOnly
 * cookie the form's action set (id + private token, valid 2 hours); without it — someone opening this
 * URL directly — the visitor is sent to the form, as upstream. The old page cleared its session value
 * on first view; a cookie cannot be cleared while a page renders, so this one simply expires.
 */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Registration Successful - ATLAS Hackathon 2026',
  description: 'Your team is registered for ATLAS Hackathon 2026.',
  robots: { index: false, follow: false },
};

const STEPS = [
  ['Watch your inbox', 'Round 1 joining details go to every team member’s email.'],
  ['Prep together', 'Read the judging criteria and rules before the day.'],
  ['Build in 90 minutes', 'Prompt to product, live and online.'],
];

export default async function SuccessPage() {
  const raw = (await cookies()).get(CONFIRM_COOKIE)?.value || '';
  const [idPart, token] = raw.split('.');
  let reg = null;
  try {
    reg = await getConfirmation(Number.parseInt(idPart, 10), token);
  } catch {
    reg = null;
  }
  if (!reg) redirect('/atlas-hackathon-2026/register');

  const members = rowMembers(reg);
  const schools = [...new Set(members.map((m) => m.school).filter(Boolean))];
  const summary = [
    ['i-users', 'Team', `${reg.team_name}\n${members.length} ${members.length === 1 ? 'student' : 'students'}`],
    ['i-cap', members.length === 1 ? 'Team member' : 'Team members', members.map((m) => m.name).join('\n')],
    ['i-building', schools.length > 1 ? 'Schools / Colleges' : 'School / College', schools.join('\n')],
    ['i-mail', 'Confirmation sent to', members.map((m) => m.email).join('\n')],
  ];
  const mailFailed = reg.mail_status === 'failed';

  return (
    <>
      <HackathonHeader base={HK_ROUTE} />
      <main id="main">
        <section id="top" className="relative isolate overflow-hidden">
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${BG_GRID} [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]`} />
          <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 size-[30rem] rounded-full bg-emerald-400/15 blur-[120px]" />
          <div aria-hidden="true" className="absolute -right-32 top-20 -z-10 size-[28rem] rounded-full bg-cyan-500/20 blur-[120px]" />

          <div className="mx-auto max-w-3xl px-4 py-12 n640:px-6 n640:py-16 n1024:px-8 n1024:py-20">
            <div className="rounded-3xl border border-emerald-300/25 bg-hk-panel p-6 text-center n640:rounded-[2rem] n640:p-10 n1024:p-12">
              <span className="mx-auto flex size-20 items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-300/10 text-emerald-300 n640:size-24">
                <svg className="size-11 n640:size-13" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              </span>

              <p className="mt-6 font-hk-display text-[16px]/[24px] font-extrabold uppercase tracking-[0.22em] text-emerald-300">Registration successful</p>

              <h1 className="mt-3 font-hk-display text-[2.5rem] font-black uppercase leading-[0.9] text-white n640:text-[60px]">
                You&rsquo;re in,
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">{reg.team_name}</span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-slate-300 n640:text-[18px]">
                Your team has been registered for <span className="font-semibold text-white">ATLAS Hackathon 2026 &mdash; Prompt to Product</span>. Round&nbsp;1
                joining instructions will be sent to {members.length > 1 ? 'every team member' : 'your email address'}.
              </p>

              <dl className="mt-8 grid gap-3 text-left n640:grid-cols-2">
                {summary
                  .filter(([, , v]) => v)
                  .map(([icon, label, value]) => (
                    <div key={label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
                        <svg className="size-5" aria-hidden="true">
                          <use href={`#${icon}`} />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <dt className="font-hk-display text-[12px]/[16px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</dt>
                        <dd className="mt-0.5 whitespace-pre-line break-words text-[0.9375rem] font-semibold text-white">{value}</dd>
                      </div>
                    </div>
                  ))}
              </dl>

              <p className="mt-5 inline-flex items-center gap-2 text-[14px]/[20px] text-slate-400">
                <svg className="size-4" aria-hidden="true">
                  <use href="#i-clock" />
                </svg>
                Registered on {formatIst(reg.created_at)}
              </p>

              {mailFailed ? (
                <p className="mx-auto mt-5 max-w-xl rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-[14px] leading-relaxed text-amber-200">
                  Your registration is saved, but we could not send the confirmation email just now. Nothing is lost &mdash; keep this page for your
                  records and write to{' '}
                  <a href="mailto:btech@atlasuniversity.edu.in" className="font-semibold underline">
                    btech@atlasuniversity.edu.in
                  </a>{' '}
                  if you would like it re-sent.
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 n640:flex-row n640:justify-center">
                <a href="/atlas-hackathon-2026" className={BTN_PRIMARY}>
                  Back to the hackathon site
                  <svg className="size-5 shrink-0" aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </a>
                <a href="/atlas-hackathon-2026#format" className={BTN_GHOST}>
                  <svg className="size-4" aria-hidden="true">
                    <use href="#i-clock" />
                  </svg>
                  Read the 90-minute format
                </a>
              </div>
            </div>

            {/* what happens next */}
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 n640:p-7">
              <h2 className="font-hk-display text-[18px]/[28px] font-bold uppercase tracking-[0.14em] text-slate-400">What happens next</h2>
              <ol className="mt-4 grid gap-4 n640:grid-cols-3">
                {STEPS.map(([title, text], i) => (
                  <li key={title} className="flex gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 font-hk-display text-[16px]/[24px] font-black text-cyan-300">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-hk-display text-[16px]/[24px] font-bold uppercase tracking-wide text-white">{title}</span>
                      <span className="mt-0.5 block text-[14px] leading-snug text-slate-400">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <HackathonFooter base={HK_ROUTE} />
    </>
  );
}
