import { thoughtLeadership, atlasNews } from '@/lib/homeContent';
import SmartLink from '@/components/SmartLink';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Carousel from '@/components/Carousel/Carousel';
import { NewsCard } from '@/components/Home/AtlasNews';
import { CONTAINER, SECTION, H2, SUB } from '@/components/Home/SectionHead';
import { getLatestBlogs, feedOrThrow } from '@/lib/schools/isdi/blog/api';

/**
 * "Thought Leadership" — port of reference/index.php:2966-3048.
 *
 * The only data-driven section on the homepage. index.php curls
 * `https://uat-dashboard.atlasskilltech.app/api/atlas-blogs` at request time,
 * filters to `status === 'published'`, slices to 20, and renders each post
 * through the **same `.card` component as ATLAS News** — so `NewsCard` is
 * reused directly, with two differences the reference itself specifies:
 * `BG-Color="#F2F2F2"` (the card's inline background script exists for exactly
 * this) and `target="_blank"` on the link.
 *
 * The feed is read LIVE (`getLatestBlogs`: the root `atlas-blogs` endpoint,
 * published only, first 20 — exactly what index.php does), revalidated every
 * minute, so a blog created, edited, published, unpublished or deleted in the
 * dashboard reaches this carousel within about a minute. Card images are the
 * CMS's own public URLs, the one documented runtime-remote exception the blog
 * detail pages already make. `thoughtLeadership.posts` in lib/homeContent is
 * the July snapshot this section used to render; it is now only a BUILD-time
 * fallback (see `feedOrThrow`), marked `data-blog-source="snapshot"`.
 *
 * Spacing: production's `.swiper.common-swiper` sits 56px under the head-wrap
 * (40px below 768, under the stacked button) — measured on
 * atlasuniversity.edu.in at 1440 / 768 / 390. The carousel used to start flush
 * against the subtitle; `pt-14 max-md:pt-10` restores that gap.
 *
 * The heading is `.h2-tag.mrg16.isdi`: the one element on the homepage the
 * reference renders in **Poppins** rather than Manrope, at weight 400 — which,
 * with no 400 face loaded, resolves to the 500 face. See globals.css.
 *
 * The head-wrap is plain `.head-wrap` (no `mrgbtm32`), with a "View all"
 * `.secondary-btn` beside the copy.
 */
export default async function ThoughtLeadership() {
  const { heading, subheading, button, posts: snapshot, cardBackground } =
    thoughtLeadership;
  const { cards: posts, source } = feedOrThrow(
    await getLatestBlogs(),
    snapshot,
    'homepage Thought Leadership'
  );
  const { calendarIcon, arrowIcon } = atlasNews;

  return (
    /* ref section.section */
    <section className={SECTION} data-blog-source={source}>
      <div className={CONTAINER}>
        {/* ref .head-wrap — no `mrgbtm32` */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref .h2-tag.mrg16.isdi — Poppins, weight 400 -> the 500 face */}
            {/* `.h2-tag.isdi` drops to 36px at <=991px — a breakpoint earlier than
                the plain `.h2-tag`'s 767px */}
            <h2
              className={`mb-4 font-poppins font-normal max-lg:text-5xl max-lg:leading-[1.2] max-md:mb-2 ${H2}`}
            >
              {heading}
            </h2>
            <div className={SUB}>{subheading}</div>
          </div>

          {/* ref a.secondary-btn + `25d04a90…` variant */}
          <SecondaryButton href={button.href} variant="atlas">
              {button.label}
            </SecondaryButton>
        </div>
      </div>

      {posts.length > 0 && (
      <Carousel className="pt-14 max-md:pt-10">
        {posts.map((post) => (
          <NewsCard
            key={post.id ?? post.href}
            item={{ ...post, title: [post.title], newTab: true }}
            calendarIcon={calendarIcon}
            arrowIcon={arrowIcon}
            background={cardBackground}
          />
        ))}
      </Carousel>
      )}
    </section>
  );
}
