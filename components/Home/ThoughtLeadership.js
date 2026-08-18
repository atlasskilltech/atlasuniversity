import { thoughtLeadership, atlasNews } from '@/lib/homeContent';
import SmartLink from '@/components/SmartLink';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Carousel from '@/components/Carousel/Carousel';
import { NewsCard } from '@/components/Home/AtlasNews';
import { CONTAINER, SECTION, H2, SUB } from '@/components/Home/SectionHead';

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
 * The feed is snapshotted into lib/homeContent rather than fetched at runtime:
 * the endpoint is a UAT host, and every post's image lives on
 * atlasuniversity.edu.in, which this project's asset rule forbids referencing
 * remotely — all 20 are downloaded into public/assets/images/thought-leadership.
 *
 * The heading is `.h2-tag.mrg16.isdi`: the one element on the homepage the
 * reference renders in **Poppins** rather than Manrope, at weight 400 — which,
 * with no 400 face loaded, resolves to the 500 face. See globals.css.
 *
 * The head-wrap is plain `.head-wrap` (no `mrgbtm32`), with a "View all"
 * `.secondary-btn` beside the copy.
 */
export default function ThoughtLeadership() {
  const { heading, subheading, button, posts, cardBackground } =
    thoughtLeadership;
  const { calendarIcon, arrowIcon } = atlasNews;

  return (
    /* ref section.section */
    <section className={SECTION}>
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

      <Carousel>
        {posts.map((post) => (
          <NewsCard
            key={post.href}
            item={{ ...post, title: [post.title], newTab: true }}
            calendarIcon={calendarIcon}
            arrowIcon={arrowIcon}
            background={cardBackground}
          />
        ))}
      </Carousel>
    </section>
  );
}
