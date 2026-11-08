import { BriefPanel, CategorySection, HomeHero, LatestStrip, Spotlight, Trending } from '@/components/News/Public/Home';
import JsonLd from '@/components/News/Public/JsonLd';
import { NEWS_CONTAINER } from '@/components/News/Public/ui';
import { getHomepage } from '@/lib/news/public/repository';
import { homeJsonLd, NEWS_DESCRIPTION, NEWS_NAME, NEWS_ROBOTS } from '@/lib/news/public/seo';

export const metadata = {
  title: { absolute: `${NEWS_NAME} — Stories from ATLAS SkillTech University` },
  description: NEWS_DESCRIPTION,
  alternates: { canonical: '/news' },
  robots: NEWS_ROBOTS,
  openGraph: { type: 'website', siteName: NEWS_NAME, title: NEWS_NAME, description: NEWS_DESCRIPTION, url: '/news', locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title: NEWS_NAME, description: NEWS_DESCRIPTION },
};

export default async function NewsHomePage() {
  const home = await getHomepage();
  const [firstSection, ...moreSections] = home.sections;
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <h1 className="sr-only">{NEWS_NAME}</h1>
      <HomeHero lead={home.lead} companions={home.companions} />
      <LatestStrip articles={home.latest} />
      {firstSection ? <CategorySection {...firstSection} /> : null}
      <Spotlight article={home.spotlight} />
      {moreSections.map((s, i) => (
        <CategorySection key={s.category.slug} {...s} flip={i % 2 === 0} />
      ))}
      <div className={`${NEWS_CONTAINER} mt-20 grid gap-14 md:mt-28 lg:grid-cols-12 lg:gap-12`}>
        <div className="lg:col-span-7">
          <Trending articles={home.trending} />
        </div>
        <div className="lg:col-span-5 lg:pt-[72px]">
          <BriefPanel />
        </div>
      </div>
    </>
  );
}
