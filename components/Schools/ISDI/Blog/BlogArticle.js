/*
 * ISDI blog article — ref reference/schools/isdi/blog/index.php (the detail template).
 *
 * The reference authors the article in Tailwind Play-CDN utilities + a small inline <style>
 * (`.title-text`, `.article-details`, the per-school `.dynamic-*` colour). The project's
 * compiled Tailwind shares the reference's `md` breakpoint (768), so the `md:`/`max-md:`
 * classes map directly; the inline-<style> rules are restated as arbitrary utilities and the
 * ISDI theme colour (#EC1376) is inlined where the reference resolves `$themeColor`.
 *
 * Block renderers mirror the PHP one-for-one: paragraph (text + optional bold + optional
 * link, link wrapping the bold exactly as the PHP nests them), heading (level 2-6),
 * list (disc), faq (question + answer). heading/list/faq text is first-party CMS HTML and
 * the reference echoes it raw, so it is rendered with dangerouslySetInnerHTML as upstream does.
 *
 * The blog's hero and inline images are the CMS's own authored images (stable, public,
 * token-free URLs on the Atlas domain). This is the one live, API-driven page in the port,
 * so — unlike the static reference sections — its dynamic content images are served from the
 * CMS at runtime exactly as the live site serves them; pre-downloading arbitrary posts'
 * images would be the "unnecessary infrastructure" the brief rules out.
 */

const THEME = '#EC1376'; // ref $schoolConfig['isdi']['color']

/*
 * ref the PHP paragraph loop: each part's `text` is echoed RAW (it can itself carry HTML —
 * some posts embed a `<ul>` inside a paragraph part), then wrapped in `<b class='text-gray-700'>`
 * if `bold` and in `<a … class='text-blue-600 underline'>` if `link` (the link wraps the bold,
 * in that order). The whole paragraph is one `<p class="mb-3">`. Built as an HTML string and set
 * as innerHTML to reproduce the raw echo exactly; the content is first-party CMS HTML.
 */
function escAttr(s) {
  return String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function Paragraph({ content }) {
  const html = (content || [])
    .map((part) => {
      let text = part.text ?? '';
      if (part.bold) text = `<b class='text-gray-700'>${text}</b>`;
      if (part.link) {
        text = `<a href="${escAttr(part.link)}" class='text-blue-600 underline'>${text}</a>`;
      }
      return text;
    })
    .join('');
  /*
   * A `<div>`, not a `<p>`: some posts embed a block `<ul>` inside a paragraph part, and a
   * `<ul>` is invalid inside a `<p>` — the browser auto-closes the `<p>` and lifts the list
   * out, which diverges from the server HTML and fails React hydration. `<div class="mb-3">`
   * renders identically (Preflight zeroes `<p>` margins; only `mb-3` styles it) and accepts the
   * embedded block, so the raw CMS HTML the reference echoes is reproduced without a mismatch.
   */
  return <div className="mb-3" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Heading({ level, text }) {
  const Tag = `h${Math.min(Math.max(parseInt(level, 10) || 3, 2), 6)}`;
  return (
    <Tag
      className="mb-2 mt-6 text-[18px] font-semibold"
      dangerouslySetInnerHTML={{ __html: text ?? '' }}
    />
  );
}

function List({ items }) {
  return (
    <ul className="mb-3 list-disc space-y-2 pl-5">
      {(items || []).map((item, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
}

function Faq({ question, answer }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold" dangerouslySetInnerHTML={{ __html: question ?? '' }} />
      {/* div (not p): the answer is raw CMS HTML that may carry block elements — see Paragraph */}
      <div className="mb-3 mt-0" dangerouslySetInnerHTML={{ __html: answer ?? '' }} />
    </div>
  );
}

function Block({ block }) {
  if (block.type === 'paragraph') return <Paragraph content={block.content || []} />;
  if (block.type === 'heading') return <Heading level={block.level} text={block.text} />;
  if (block.type === 'list' && block.items?.length) return <List items={block.items} />;
  if (block.type === 'faq') return <Faq question={block.question} answer={block.answer} />;
  return null;
}

export default function BlogArticle({ blog }) {
  const hero = blog.hero || {};
  const sections = blog.sections || [];

  return (
    <div className="bg-white text-gray-800">
      {/* ref hero: desktop + mobile swap */}
      <section className="w-full">
        {hero.desktop ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={hero.desktop}
            alt={hero.alt || ''}
            title={hero.title || ''}
            className="hidden w-full object-cover md:block"
          />
        ) : null}
        {hero.mobile ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={hero.mobile}
            alt={hero.alt || ''}
            title={hero.title || ''}
            className="block w-full object-cover md:hidden"
          />
        ) : null}
      </section>

      {/* ref main */}
      <section className="mx-auto max-w-[1200px] px-6 py-10">
        {/* breadcrumb — the reference links the school's Thought Leadership listing; local here */}
        <div className="mb-6 text-sm text-gray-500">
          Home &gt;{' '}
          <a href="/schools/isdi/thought-leaderships" className="hover:underline">
            Thought Leadership
          </a>
        </div>

        {/* title (.title-text 38px / 28px <=767) */}
        <h1 className="mb-4 text-[38px] font-semibold leading-tight max-md:text-[28px]">
          {blog.title || ''}
        </h1>

        {/* meta (.article-details) */}
        <div className="flex items-center justify-start gap-2 pb-8 text-[20px] font-light max-md:pb-[22px] max-md:text-[16px]">
          <div className="text-lg text-gray-500">{blog.author || ''}</div>
          {/* .dynamic-dot-mint — 8px square, radius 4px, theme colour */}
          <div className="h-2 w-2 rounded" style={{ backgroundColor: THEME }} />
          <div className="text-lg text-gray-500">{blog.date_label || ''}</div>
        </div>

        <div className="grid gap-12 md:grid-cols-[260px_1fr]">
          {/* sidebar — "Jump to" */}
          {sections.length ? (
            <aside className="sticky top-16 hidden h-fit md:block">
              <h3 className="mb-4 font-medium text-gray-700">Jump to</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="font-bold transition-colors [&:hover]:text-[#EC1376]"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : (
            <div className="hidden md:block" />
          )}

          {/* content */}
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="mb-2 text-[22px] font-semibold">{section.title}</h2>
                <div className="leading-7 text-gray-600">
                  {(section.blocks || []).map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
