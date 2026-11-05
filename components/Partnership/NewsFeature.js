import { WF_SECTION } from './ui';

/*
 * ref international-faculty.php:522-574 — `section.section > section.w-full.px-4.md:px-8.py-10
 * .bg-[#f5f5f5] > .max-w-[1200px].mx-auto.grid.md:grid-cols-2.gap-8.items-center > (image, copy)`.
 * Measured on production at 1440 / 768 / 390:
 *   inner section   padding 40 24 at every width — `px-4` is Bootstrap's 24px (!important), which
 *                   also beats the authored `md:px-8`
 *   copy            date 16/24 gray-500 + 8px; h2 700 24px/30 → 36px/40 from 768 (Play CDN's
 *                   bundled text-4xl line-height) + 24px; "Read More" a 56px #02b3c3 pill, 0 24px,
 *                   18px/1 500 black
 * The photograph (`atlas-global/wp-content/.../faculty/news.png`) 403s for every visitor, so
 * production paints a 20px broken-image box whose `overflow: hidden` clips the date badge to a 4px
 * sliver. Neither is reproduced: the image column stays (it is what puts the copy in the right half
 * from 768 up) but is empty, so the stacked layout below 768 is 20px shorter than production's.
 */
export default function NewsFeature({ news }) {
  return (
    <section className={WF_SECTION}>
      <div className="w-full bg-[#f5f5f5] px-[24px] py-[40px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-[32px] md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[30px]" aria-hidden="true" />
          <div>
            <p className="mb-[8px] text-gray-500">{news.date}</p>
            <h2 className="mb-[24px] text-[24px] font-bold leading-[30px] md:text-[36px] md:leading-[40px]">{news.title}</h2>
            <a
              href={news.href}
              className="inline-flex h-[56px] items-center justify-center rounded-[36px] bg-[#02b3c3] px-[24px] text-black no-underline"
            >
              <span className="block text-[18px] font-medium leading-none">{news.cta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
