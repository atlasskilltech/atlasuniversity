import CopyLinkButton from './CopyLinkButton';
import { FacebookIcon, LinkedInIcon, MailIcon, WhatsAppIcon, XIcon } from './Icons';
import { absoluteUrl } from '@/lib/news/public/seo';
import { cx, FOCUS, KICKER } from './ui';

/**
 * Share links: plain URLs to each network's own share page, opened in a new tab. No third-party script
 * or tracking pixel is loaded. Copy-link is the only client code.
 */
export default function ShareLinks({ article, layout = 'row', className }) {
  const url = absoluteUrl(article.url);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(article.title);
  const links = [
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { name: 'X', href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: XIcon },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${url}`)}`, Icon: WhatsAppIcon },
    { name: 'email', href: `mailto:?subject=${t}&body=${encodeURIComponent(`${article.excerpt}\n\n${url}`)}`, Icon: MailIcon, self: true },
  ];
  const btn = 'relative grid h-10 w-10 place-items-center rounded-full border border-news-line text-news-ink transition-colors duration-200 hover:border-news-ink hover:bg-news-ink hover:text-news-paper';
  return (
    <div className={cx('flex items-center gap-3', layout === 'column' && 'flex-col', className)}>
      <span className={cx(KICKER, 'text-news-muted', layout === 'column' && 'mb-1 [writing-mode:vertical-rl] rotate-180')}>Share</span>
      <ul className={cx('flex gap-2', layout === 'column' && 'flex-col')}>
        {links.map(({ name, href, Icon, self }) => (
          <li key={name}>
            <a
              href={href}
              {...(self ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={`Share on ${name}${self ? '' : ' (opens in a new tab)'}`}
              title={`Share on ${name}`}
              className={cx(btn, FOCUS)}
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        ))}
        <li>
          <CopyLinkButton url={url} className={btn} />
        </li>
      </ul>
    </div>
  );
}
