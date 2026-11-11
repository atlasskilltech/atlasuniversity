import { CategorySection, SectionHeading, Spotlight } from './Home';
import HomeTabs from './HomeTabs';
import { StoryCard, StoryRow, StoryWide } from './StoryCard';
import { cx, NEWS_CONTAINER } from './ui';

/**
 * The homepage's configured category sections (admin: Homepage → Sections; seeded from the old WordPress
 * homepage). Built only from the publication's own pieces — SectionHeading, StoryRow, StoryCard,
 * StoryWide and the category block — so they carry the current design, never the old theme.
 *
 *   heading    a heading band; the sections after it sit directly under it
 *   headlines  story rows (two columns when full width)
 *   feature    one large story
 *   grid       story cards
 *   standard   the publication's category block (CategorySection)
 *   tabs       tabbed card grids
 * Two consecutive `half` sections share a row from 992px; on smaller screens everything stacks.
 */

const CARD_SIZES = '(min-width: 1320px) 300px, (min-width: 992px) 23vw, (min-width: 480px) 45vw, 100vw';

function Rows({ articles, columns }) {
  return (
    <ul className={cx('grid gap-x-10', columns === 2 && 'md:grid-cols-2')}>
      {articles.map((a) => (
        <li
          key={a.slug}
          className={cx(
            /* a rule ABOVE every row but the first of each column: no stray rule at the bottom, whatever the count */
            'border-t border-news-line py-6 first:border-t-0 first:pt-0',
            columns === 2 && 'md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-0',
          )}
        >
          <StoryRow article={a} />
        </li>
      ))}
    </ul>
  );
}

function Cards({ articles, half }) {
  const n = articles.length;
  /* full width: 4 across, or 3 when that fills the rows exactly (3, 6, 9 stories) */
  const cols = half ? 'sm:grid-cols-2' : n % 3 === 0 ? 'sm:grid-cols-2 lg:grid-cols-3' : n >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2';
  return (
    <ul className={cx('grid gap-x-8 gap-y-12', cols)}>
      {articles.map((a, i) => (
        <li key={a.slug} className={cx(half && n % 2 === 1 && i === 0 && 'sm:col-span-2')}>
          <StoryCard article={a} size={half && n % 2 === 1 && i === 0 ? 'l' : 's'} showExcerpt={half && n % 2 === 1 && i === 0} sizes={CARD_SIZES} />
        </li>
      ))}
    </ul>
  );
}

function Body({ section, half }) {
  const { layout, articles } = section;
  if (layout === 'headlines') return <Rows articles={articles} columns={half ? 1 : 2} />;
  if (layout === 'feature') {
    return half ? (
      <StoryCard article={articles[0]} size="l" showExcerpt sizes="(min-width: 1320px) 620px, (min-width: 992px) 47vw, 100vw" />
    ) : (
      <StoryWide article={articles[0]} as="h3" />
    );
  }
  if (layout === 'tabs') {
    return <HomeTabs labels={section.tabs.map((t) => t.label)} panels={section.tabs.map((t) => <Cards key={t.label} articles={t.articles.slice(0, 6)} half={half} />)} />;
  }
  return <Cards articles={articles} half={half} />;
}

/** One section's heading + body, without its own container (the row places it). */
function SectionBlock({ section, half }) {
  const headingId = `home-${section.id}`;
  return (
    <section aria-labelledby={section.title ? headingId : undefined} aria-label={section.title ? undefined : section.category?.name || 'Stories'}>
      {section.title ? <SectionHeading id={headingId} title={section.title} href={section.category?.url} /> : null}
      <Body section={section} half={half} />
    </section>
  );
}

/** Group the flat list into render units: a heading, a single section, or a pair of half sections. */
function units(sections) {
  const out = [];
  for (let i = 0; i < sections.length; i += 1) {
    const s = sections[i];
    if (s.layout === 'heading') out.push({ kind: 'heading', section: s });
    else if (s.width === 'half' && sections[i + 1]?.width === 'half' && sections[i + 1].layout !== 'heading') {
      out.push({ kind: 'pair', sections: [s, sections[i + 1]] });
      i += 1;
    } else out.push({ kind: 'single', section: s });
  }
  return out;
}

export default function HomeSections({ sections, spotlight }) {
  const list = units(sections);
  /* the full-bleed Spotlight band keeps its place after the first block of stories */
  const spotAt = list.findIndex((u) => u.kind !== 'heading');
  let afterHeading = false;
  const rendered = [];
  list.forEach((u, idx) => {
    const top = afterHeading ? 'mt-0' : 'mt-20 md:mt-28';
    afterHeading = u.kind === 'heading';
    if (u.kind === 'heading') {
      rendered.push(
        <div key={u.section.id} className={cx(NEWS_CONTAINER, 'mt-20 md:mt-28')}>
          <SectionHeading id={`home-${u.section.id}`} title={u.section.title} />
        </div>,
      );
    } else if (u.kind === 'pair') {
      rendered.push(
        <div key={u.sections[0].id} className={cx(NEWS_CONTAINER, top, 'grid gap-x-12 gap-y-20 lg:grid-cols-2')}>
          {u.sections.map((s) => (
            <SectionBlock key={s.id} section={s} half />
          ))}
        </div>,
      );
    } else if (u.section.layout === 'standard' && u.section.category) {
      rendered.push(<CategorySection key={u.section.id} category={{ ...u.section.category, name: u.section.title || u.section.category.name }} articles={u.section.articles} />);
    } else {
      rendered.push(
        <div key={u.section.id} className={cx(NEWS_CONTAINER, top)}>
          <SectionBlock section={u.section} half={u.section.width === 'half'} />
        </div>,
      );
    }
    if (idx === spotAt) rendered.push(<Spotlight key="spotlight" article={spotlight} />);
  });
  if (spotAt === -1) rendered.push(<Spotlight key="spotlight" article={spotlight} />);
  return <>{rendered}</>;
}
