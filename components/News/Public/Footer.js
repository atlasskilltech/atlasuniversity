import Link from 'next/link';
import { socialLinks } from '@/lib/footerContent';
import NewsLogo from './NewsLogo';
import { InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from './Icons';
import { NEWS_DESCRIPTION } from '@/lib/news/public/seo';
import { cx, FOCUS, KICKER, NEWS_CONTAINER } from './ui';

const SOCIAL_ICON = { X: XIcon, Instagram: InstagramIcon, YouTube: YouTubeIcon, LinkedIn: LinkedInIcon };
const socialName = (label) => Object.keys(SOCIAL_ICON).find((k) => label.includes(k));

/* Routes of the university site (all built in this project). */
const UNIVERSITY = [
  { label: 'ATLAS SkillTech University', href: '/' },
  { label: 'About the university', href: '/about-us' },
  { label: 'Undergraduate programmes', href: '/programs/ug-programs-atlas' },
  { label: 'Postgraduate programmes', href: '/programs/pg-programs-atlas' },
  { label: 'Admissions', href: '/admissions/ug-admissions' },
  { label: 'Contact', href: '/contact-us' },
];

const linkCls = cx('font-sans text-[14px] text-white/70 transition-colors hover:text-white', FOCUS);

export default function Footer({ nav }) {
  return (
    <footer className="mt-24 bg-news-night text-white md:mt-32">
      <div className={cx(NEWS_CONTAINER, 'grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20')}>
        <div className="lg:col-span-5">
          <Link href="/news" aria-label="ATLAS News — home" className={cx('inline-block rounded', FOCUS)}>
            <NewsLogo tone="night" markClassName="h-[30px]" nameClassName="text-[32px]" />
          </Link>
          <p className="mt-6 max-w-[440px] font-news-serif text-[18px] leading-[1.55] text-white/75">{NEWS_DESCRIPTION}</p>
          <ul className="mt-8 flex items-center gap-2">
            {socialLinks.map((s) => {
              const name = socialName(s.label);
              const Icon = SOCIAL_ICON[name];
              if (!Icon) return null;
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ATLAS SkillTech University on ${name}`}
                    className={cx('grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white', FOCUS)}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="News sections" className="lg:col-span-3 lg:col-start-7">
          <h2 className={cx(KICKER, 'mb-5 text-white/50')}>Sections</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
            {nav.map((c) => (
              <li key={c.slug}>
                <Link href={c.url} className={linkCls}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="ATLAS SkillTech University" className="lg:col-span-3">
          <h2 className={cx(KICKER, 'mb-5 text-white/50')}>The university</h2>
          <ul className="grid gap-y-3">
            {UNIVERSITY.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className={cx(NEWS_CONTAINER, 'flex flex-col gap-2 py-6 font-sans text-[12.5px] text-white/50 sm:flex-row sm:items-center sm:justify-between')}>
          <p>© {new Date().getFullYear()} ATLAS SkillTech University, Mumbai. All rights reserved.</p>
          <p>Published by the ATLAS News Desk</p>
        </div>
      </div>
    </footer>
  );
}
