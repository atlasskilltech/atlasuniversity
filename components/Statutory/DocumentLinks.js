import { CONTAINER } from '@/components/Home/SectionHead';

/**
 * `.container > .section.extraspace > .links-wrapper.no-mar > ul.list-4 > li.big-text-links > a` —
 * the bulleted document list of /examination and /nirf (extracted from app/examination/page.js,
 * unchanged, when /nirf turned out to repeat it).
 *
 * Measured on production at 1440 / 991 / 767 / 390:
 *   .section.extraspace   padding 120 0 60 → 40 0 at <=767, clipped; it sits INSIDE `.container`
 *   ul.list-4             disc, outside, padding-left 40, margin-bottom 10
 *   li.big-text-links     28px/1.5, padding 16 0 (74px a row), #333 marker
 *   a.big-text-links      #0d6efd (Bootstrap's link colour), no underline; #5cbdca on hover
 * The `a` repeats `.big-text-links`, so its own 16px vertical padding is inline padding: it paints
 * but adds no height.
 *
 * links: [{ label, href, newTab? }] — the label is the React key, so it must be unique per list.
 */
export default function DocumentLinks({ links }) {
  return (
    <div className={CONTAINER}>
      {/* ref .section.extraspace */}
      <div className="block overflow-hidden pb-[60px] pt-[120px] max-md:py-10">
        {/* ref .links-wrapper.no-mar > ul.list-4 */}
        <ul className="mb-2.5 list-outside list-disc pl-10">
          {links.map((link) => (
            <li key={link.label} className="py-4 text-[28px] leading-[1.5] text-[#333]">
              <a
                href={link.href}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab ? 'noopener' : undefined}
                className="py-4 text-[#0d6efd] no-underline hover:text-atlas-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
