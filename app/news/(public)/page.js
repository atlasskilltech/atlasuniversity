import { BriefPanel, CategorySection, EditorsPicks, HomeHero, LatestStrip, Spotlight } from '@/components/News/Public/Home';
import JsonLd from '@/components/News/Public/JsonLd';
import { cx, KICKER, NEWS_CONTAINER } from '@/components/News/Public/ui';
import { getHomepage, getIndexingEnabled } from '@/lib/news/public/repository';
import { rememberGood } from '@/lib/news/public/health';
import { homeJsonLd, NEWS_DESCRIPTION, NEWS_NAME, newsRobots, NOINDEX } from '@/lib/news/public/seo';

/* Rendered on request from MySQL (the homepage curation lives in the admin: Homepage). */
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  let robots = NOINDEX;
  try {
    robots = newsRobots(await getIndexingEnabled());
  } catch {
    /* database unavailable: stay noindex */
  }
  return {
    title: { absolute: `${NEWS_NAME} — Stories from ATLAS SkillTech University` },
    description: NEWS_DESCRIPTION,
    alternates: { canonical: '/news' },
    robots,
    openGraph: { type: 'website', siteName: NEWS_NAME, title: NEWS_NAME, description: NEWS_DESCRIPTION, url: '/news', locale: 'en_IN' },
    twitter: { card: 'summary_large_image', title: NEWS_NAME, description: NEWS_DESCRIPTION },
  };
}

/* Before the first story is published: a plain notice in place of the hero — never sample content. */
function EmptyPublication() {
  return (
    <section className={cx(NEWS_CONTAINER, 'py-24 text-center md:py-36')}>
      <p className={cx(KICKER, 'text-news-accent')}>ATLAS News</p>
      <p className="mx-auto mt-5 max-w-[560px] font-news-serif text-[26px] leading-[1.3] text-news-ink md:text-[32px]">
        Stories from ATLAS SkillTech University will appear here soon.
      </p>
    </section>
  );
}

export default async function NewsHomePage() {
  const home = await getHomepage();
  rememberGood('/news'); /* last-known-good during a database outage (proxy.js) */
  const [firstSection, ...moreSections] = home.sections;
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <h1 className="sr-only">{NEWS_NAME}</h1>
      {home.lead ? <HomeHero lead={home.lead} companions={home.companions} /> : <EmptyPublication />}
      <LatestStrip articles={home.latest} />
      {firstSection ? <CategorySection {...firstSection} /> : null}
      <Spotlight article={home.spotlight} />
      {moreSections.map((s, i) => (
        <CategorySection key={s.category.slug} {...s} flip={i % 2 === 0} />
      ))}
      {home.picks.length ? (
        <div className={`${NEWS_CONTAINER} mt-20 grid gap-14 md:mt-28 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7">
            <EditorsPicks articles={home.picks} />
          </div>
          <div className="lg:col-span-5 lg:pt-[72px]">
            <BriefPanel />
          </div>
        </div>
      ) : (
        /* no picks: the panel alone, at the width it has beside the list, so no empty column is left */
        <div className={`${NEWS_CONTAINER} mt-20 md:mt-28`}>
          <div className="lg:max-w-[58%]">
            <BriefPanel />
          </div>
        </div>
      )}
    </>
  );
}
