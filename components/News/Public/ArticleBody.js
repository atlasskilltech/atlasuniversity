import { sanitizeArticleHtml } from '@/lib/news/content/sanitize';
import { cx } from './ui';

/**
 * Renders an article body from stored HTML — `atlasnews_posts.content_html`, or the fixture HTML built in
 * the same vocabulary. The HTML is sanitised AGAIN here (it is also sanitised on save), as the Stage 1
 * sanitiser intends, so a row edited outside the app can never ship a script.
 *
 * Styling is applied to the allowed elements and classes from this one container:
 *   p h2 h3 ul ol blockquote.news-pullquote figure(.align-wide) .news-gallery(.is-cols-2|3) table
 * Images carry width/height, so their space is reserved before they load.
 */
const PROSE = cx(
  'font-news-serif text-[19px] leading-[1.72] text-news-ink md:text-[20.5px]',
  '[&>*:first-child]:mt-0',
  '[&>p]:mb-7',
  /* drop cap on the opening paragraph */
  '[&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-[7px] [&>p:first-of-type]:first-letter:font-news-serif [&>p:first-of-type]:first-letter:text-[78px] [&>p:first-of-type]:first-letter:font-semibold [&>p:first-of-type]:first-letter:leading-[0.8] [&>p:first-of-type]:first-letter:text-news-accent',
  '[&>h2]:mb-5 [&>h2]:mt-14 [&>h2]:text-[27px] [&>h2]:font-semibold [&>h2]:leading-[1.2] [&>h2]:tracking-[-0.01em] md:[&>h2]:text-[31px]',
  '[&>h3]:mb-4 [&>h3]:mt-10 [&>h3]:text-[22px] [&>h3]:font-semibold [&>h3]:leading-[1.25]',
  '[&_a]:text-news-accent [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4 hover:[&_a]:decoration-2',
  '[&_strong]:font-semibold [&_em]:italic',
  '[&>ul]:mb-7 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:mb-7 [&>ol]:list-decimal [&>ol]:pl-6 [&_li]:mb-3 [&_li]:pl-1.5 [&_li::marker]:font-sans [&_li::marker]:font-semibold [&_li::marker]:text-news-accent',
  '[&>hr]:my-12 [&>hr]:border-news-line',
  /* figures */
  '[&_img]:block [&_img]:h-auto [&_img]:w-full',
  '[&>figure]:my-12 [&_figcaption]:mt-3 [&_figcaption]:font-sans [&_figcaption]:text-[13px] [&_figcaption]:leading-[1.55] [&_figcaption]:text-news-muted',
  'xl:[&>figure.align-wide]:-mx-[150px]',
  /* pull quote */
  '[&_.news-pullquote]:my-14 [&_.news-pullquote]:border-l-[3px] [&_.news-pullquote]:border-news-accent [&_.news-pullquote]:pl-6 md:[&_.news-pullquote]:pl-9',
  '[&_.news-pullquote>p]:mb-0 [&_.news-pullquote>p]:text-[26px] [&_.news-pullquote>p]:font-normal [&_.news-pullquote>p]:italic [&_.news-pullquote>p]:leading-[1.3] [&_.news-pullquote>p]:tracking-[-0.01em] md:[&_.news-pullquote>p]:text-[33px]',
  '[&_.news-pullquote>cite]:mt-5 [&_.news-pullquote>cite]:block [&_.news-pullquote>cite]:font-sans [&_.news-pullquote>cite]:text-[11.5px] [&_.news-pullquote>cite]:font-bold [&_.news-pullquote>cite]:not-italic [&_.news-pullquote>cite]:uppercase [&_.news-pullquote>cite]:tracking-[0.16em] [&_.news-pullquote>cite]:text-news-muted',
  /* galleries */
  '[&_.news-gallery]:my-12 [&_.news-gallery]:grid [&_.news-gallery]:grid-cols-2 [&_.news-gallery]:gap-3 md:[&_.news-gallery]:gap-4 md:[&_.news-gallery.is-cols-3]:grid-cols-3 xl:[&_.news-gallery]:-mx-[150px]',
  '[&_.news-gallery-item]:m-0 [&_.news-gallery-item>img]:aspect-[4/3] [&_.news-gallery-item>img]:object-cover',
  '[&_.news-gallery>p]:col-span-full [&_.news-gallery>p]:mb-0 [&_.news-gallery>p]:font-sans [&_.news-gallery>p]:text-[13px] [&_.news-gallery>p]:text-news-muted',
  /* tables */
  '[&_table]:my-10 [&_table]:w-full [&_table]:border-collapse [&_table]:font-sans [&_table]:text-[15px] [&_th]:border-b-2 [&_th]:border-news-ink [&_th]:py-2 [&_th]:text-left [&_td]:border-b [&_td]:border-news-line [&_td]:py-2',
);

export default function ArticleBody({ html, className }) {
  return <div className={cx(PROSE, className)} dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(html) }} />;
}
