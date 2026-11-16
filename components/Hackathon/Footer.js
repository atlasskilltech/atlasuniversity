/* eslint-disable @next/next/no-img-element -- plain <img>: /assets/ paths are rewritten to S3 at build time */
/** ATLAS Hackathon 2026 footer — the reference index.html's footer. `base` as in Header. */
const LINKS = [
  ['challenge', 'Challenge'],
  ['format', 'Format'],
  ['judging', 'Judging'],
  ['rules', 'Rules'],
  ['finale', 'Grand Finale'],
  ['register', 'Register'],
];

export default function HackathonFooter({ base = '' }) {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 n640:px-6 n640:py-10 n1024:flex-row n1024:items-center n1024:justify-between n1024:px-8">
        <div className="flex items-center gap-4 n640:gap-6">
          <img
            src="/assets/atlas-hackathon-2026/atlas-ugdx-logo.webp"
            width={800}
            height={250}
            loading="lazy"
            alt="ATLAS SkillTech University | uGDX School of Technology"
            className="block h-10 w-auto n640:h-12"
          />
          <p className="font-hk-display text-[18px] font-bold uppercase leading-tight tracking-wide text-white">
            ATLAS Hackathon 2026
            <span className="block text-[16px]/[24px] text-cyan-300">Prompt to Product</span>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[16px]/[24px] n640:gap-x-6">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`${base}#${id}`}
                  className="text-slate-400 transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-7xl px-4 py-5 text-[14px]/[20px] text-slate-500 n640:px-6 n1024:px-8">
          © 2026 ATLAS SkillTech University · uGDX School of Technology
        </p>
      </div>
    </footer>
  );
}
