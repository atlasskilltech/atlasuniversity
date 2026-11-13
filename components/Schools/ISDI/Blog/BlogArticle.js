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

const DEFAULT_ACCENT = '#EC1376'; // ref $schoolConfig['isdi']['color']; ATLAS passes #6EC1C2

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

/* ---- Targeted HTML neutralization (Option 1, approved) ----------------------
 * The blog body is first-party CMS HTML rendered raw via dangerouslySetInnerHTML.
 * This removes the few genuinely unsafe constructs while PRESERVING everything
 * existing published blogs rely on — all valid tags, `href`, `class`, `data-label`,
 * inline `style`, and embedded table `<style>` blocks. It runs server-side (this is
 * a server component), so there is no client-bundle cost. It is deliberately NOT a
 * full allowlist sanitizer, which would strip those styles and break current posts.
 */
const ATLAS_HOST = 'atlasuniversity.edu.in';

/* collapse entity/whitespace obfuscation so "java&#115;cript:" etc. is still caught */
function normalizeScheme(value) {
  return String(value)
    .replace(/&#x([0-9a-f]+);?/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);?/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
    .replace(/[\s\u0000-\u001f]+/g, '');
}
function isUnsafeUrl(value) {
  return /^(?:javascript|vbscript):/i.test(normalizeScheme(value));
}
/* external = absolute http(s) to a host other than the Atlas site (relative / hash /
   mailto / tel are internal and left untouched) */
function isExternalUrl(value) {
  const v = String(value).trim();
  if (!/^https?:\/\//i.test(v)) return false;
  try {
    return new URL(v).hostname.replace(/^www\./, '') !== ATLAS_HOST;
  } catch {
    return false;
  }
}
function readAttr(attrs, name) {
  const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? (m[2] ?? m[3] ?? m[4] ?? '') : null;
}

function neutralizeHtml(input) {
  let html = String(input ?? '');
  // 1. remove <script> elements entirely
  html = html.replace(/<script\b[\s\S]*?<\/script\s*>/gi, '').replace(/<script\b[^>]*>/gi, '');
  // 2. remove inline event-handler attributes (onclick, onerror, onload, ...)
  html = html.replace(/\son[a-z][a-z0-9_-]*\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  // 3. block javascript:/vbscript: URLs in href/src
  html = html.replace(
    /\b(href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
    (m, attr, dq, sq, uq) => (isUnsafeUrl(dq ?? sq ?? uq ?? '') ? `${attr}="#"` : m)
  );
  // 4. external anchors open in a new tab with rel="noopener noreferrer"
  html = html.replace(/<a\b([^>]*)>/gi, (m, attrs) => {
    const href = readAttr(attrs, 'href');
    if (href == null || !isExternalUrl(href)) return m;
    let a = attrs;
    if (!/\btarget\s*=/i.test(a)) a += ' target="_blank"';
    a = /\brel\s*=/i.test(a)
      ? a.replace(/\brel\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i, 'rel="noopener noreferrer"')
      : a + ' rel="noopener noreferrer"';
    return `<a${a}>`;
  });
  // 5. wrap tables so a wide / label-less table scrolls instead of overflowing mobile
  html = html.replace(/<table\b[\s\S]*?<\/table\s*>/gi, (m) => `<div class="blog-table-scroll">${m}</div>`);
  return html;
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
  return <div className="mb-3" dangerouslySetInnerHTML={{ __html: neutralizeHtml(html) }} />;
}

/*
 * Webflow's base heading rules (h2 32/36, h3 24/30, h4 18/24, h5 14/20, h6 12/18) load with the
 * template's header, so a heading that only sets an arbitrary SIZE keeps Webflow's LINE-HEIGHT — measured
 * on production (ISDI and ISME): the section titles are 22px/36 and the in-body / "Jump to" h3s 30px.
 * Preflight resets headings here, so the line-height is restated per level.
 */
const HEADING_LH = { 2: 'leading-[36px]', 3: 'leading-[30px]', 4: 'leading-[24px]', 5: 'leading-[20px]', 6: 'leading-[18px]' };

function Heading({ level, text }) {
  const n = Math.min(Math.max(parseInt(level, 10) || 3, 2), 6);
  const Tag = `h${n}`;
  return (
    <Tag
      className={`mb-2 mt-6 text-[18px] font-semibold ${HEADING_LH[n]}`}
      dangerouslySetInnerHTML={{ __html: neutralizeHtml(text ?? '') }}
    />
  );
}

/* `list` block — unordered by default; renders <ol> when the block flags it ordered.
   (In practice the CMS authors lists as raw HTML inside paragraphs, which the
   Paragraph renderer and the central .blog-content CSS already handle; this keeps
   the structured block type correct for both kinds.) */
function List({ items, ordered }) {
  const Tag = ordered ? 'ol' : 'ul';
  const cls = ordered ? 'mb-3 list-decimal space-y-2 pl-5' : 'mb-3 list-disc space-y-2 pl-5';
  return (
    <Tag className={cls}>
      {(items || []).map((item, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: neutralizeHtml(item) }} />
      ))}
    </Tag>
  );
}

function Faq({ question, answer }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold leading-[30px]" dangerouslySetInnerHTML={{ __html: neutralizeHtml(question ?? '') }} />
      {/* div (not p): the answer is raw CMS HTML that may carry block elements — see Paragraph */}
      <div className="mb-3 mt-0" dangerouslySetInnerHTML={{ __html: neutralizeHtml(answer ?? '') }} />
    </div>
  );
}

function Block({ block }) {
  if (block.type === 'paragraph') return <Paragraph content={block.content || []} />;
  if (block.type === 'heading') return <Heading level={block.level} text={block.text} />;
  if (block.type === 'list' && block.items?.length)
    return (
      <List
        items={block.items}
        ordered={
          block.ordered === true ||
          block.ordered === 'ol' ||
          block.style === 'ordered' ||
          block.listType === 'ol' ||
          block.tag === 'ol'
        }
      />
    );
  if (block.type === 'faq') return <Faq question={block.question} answer={block.answer} />;
  return null;
}

export default function BlogArticle({
  blog,
  accent = DEFAULT_ACCENT,
  breadcrumbHref = '/schools/isdi/thought-leaderships',
}) {
  const hero = blog.hero || {};
  const sections = blog.sections || [];

  return (
    /* `lp-bs`: the template's page loads Bootstrap (through the root header) after the Tailwind CDN, and its
       `!important` spacing utilities win — `mb-4` paints 24px, `mb-3` 16px (measured on the ISDI and ISME
       posts). The scoped block in globals.css that reproduces this for the ISDI partner pages does it here. */
    <div className="lp-bs bg-white text-gray-800" style={{ '--blog-accent': accent }}>
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
          <a href={breadcrumbHref} className="hover:underline">
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
          <div className="h-2 w-2 rounded bg-[var(--blog-accent)]" />
          <div className="text-lg text-gray-500">{blog.date_label || ''}</div>
        </div>

        <div className="grid gap-12 md:grid-cols-[260px_1fr]">
          {/* sidebar — "Jump to" */}
          {sections.length ? (
            <aside className="sticky top-16 hidden h-fit md:block">
              <h3 className="mb-4 font-medium leading-[30px] text-gray-700">Jump to</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="font-bold transition-colors [&:hover]:text-[var(--blog-accent)]"
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
                <h2 className="mb-2 text-[22px] font-semibold leading-[36px]">{section.title}</h2>
                {/* `blog-content` scopes the central list/anchor/table CSS (app/globals.css)
                    to the article body only — hero, title, breadcrumb and sidebar are outside it. */}
                <div className="blog-content leading-7 text-gray-600">
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
