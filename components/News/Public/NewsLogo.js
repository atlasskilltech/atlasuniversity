import { cx } from './ui';

/**
 * The ATLAS News masthead: the ATLAS brand mark (paths from the official
 * public/assets/brand/logos/atlas/atlas-skilltech-brand-mark.svg — the same wordmark the WordPress News
 * site used as a white PNG) with the wordmark in `currentColor` so it reads on both themes, beside the
 * publication name set in the editorial serif.
 */
export default function NewsLogo({ className, tone = 'default', markClassName = 'h-[26px] md:h-[30px]', nameClassName = 'text-[26px] md:text-[30px]' }) {
  const night = tone === 'night';
  return (
    <span className={cx('inline-flex items-center gap-3', night ? 'text-white' : 'text-news-ink', className)}>
      <svg viewBox="100 100 1425 506" className={cx('w-auto shrink-0', markClassName)} role="img" aria-label="ATLAS">
        <polyline fill="#67639f" points="448.02 504.25 275.38 404.58 102.75 504.25 275.38 604.24 448.02 504.25" />
        <polygon fill="#21678b" points="102.75 202.19 102.75 401.53 275.39 501.2 448.02 401.53 448.02 202.19 275.39 102.52 102.75 202.19" />
        <polygon fill="#3ca7b6" points="448.01 202.2 448.01 401.53 275.4 501.2 275.4 302.19 102.75 202.2 275.4 102.53 448.01 202.2" />
        <path fill="#fff" d="M361.79,252.13l-86.41,249.07,172.63-99.67-86.22-149.4Zm7.85,82.62l31.25,54.14-62.57,36.12,31.32-90.26Z" />
        <g fill="currentColor">
          <path d="M1236.38,196.56l-102.5,205.01h205.02l-102.51-205.01Zm0,95.65l33.29,66.58h-66.58l33.29-66.58Z" />
          <path d="M653.07,196.56l-102.51,205.01h205.02l-102.51-205.01Zm0,95.65l33.29,66.58h-66.59l33.29-66.58Z" />
          <path d="M853,242.61v158.97h-43.87V242.61h-60.68v-40.45h165.23v40.45h-60.68Z" />
          <path d="M959.74,401.58V202.16h43.87v159.54h99.43v39.88h-143.3Z" />
          <path d="M1445.07,404.27c-30.19,0-60.68-10.54-84.61-31.91l25.93-31.05c17.95,14.81,36.75,24.21,59.54,24.21,17.94,0,28.77-7.12,28.77-18.8v-.57c0-11.11-6.84-16.81-40.17-25.35-40.17-10.26-66.09-21.37-66.09-60.97v-.57c0-36.18,29.06-60.1,69.79-60.1,29.06,0,53.85,9.11,74.07,25.35l-22.79,33.05c-17.66-12.25-35.04-19.66-51.85-19.66s-25.64,7.69-25.64,17.38v.56c0,13.11,8.55,17.38,43.02,26.21,40.46,10.54,63.25,25.07,63.25,59.83v.57c0,39.59-30.2,61.82-73.22,61.82Z" />
        </g>
      </svg>
      <span aria-hidden="true" className={cx('h-[22px] w-px shrink-0 md:h-[26px]', night ? 'bg-white/30' : 'bg-news-ink/25')} />
      <span className={cx('font-news-serif font-medium italic leading-none tracking-[-0.01em]', nameClassName)}>News</span>
    </span>
  );
}
