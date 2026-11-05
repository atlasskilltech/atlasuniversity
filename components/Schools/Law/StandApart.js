import { CONTAINER } from '@/components/Home/SectionHead';
import withBreaks from '@/lib/withBreaks';

/**
 * "What Makes ATLAS School of Law Stand Apart" — `section.section.padtp0 > .container > .stand-apart`
 * (reference/law/program-page-law.php). Values from the page's sheet, measured on production at
 * 1440 / 991 / 767 / 479 / 390:
 *
 *   section.padtp0     padding 0 0 60 at every width (the compound beats the `.section` <=767 rule)
 *   .stand-apart       flex, gap 36
 *   .sa-lt-cont        35%; `h3.sa-text-hd` 32px/1.2 #1a1a1a, mt 0 mb 32, bold (Webflow's base h3)
 *   .sa-rt-cont        65%, flex, radius 32px 0, clipped
 *   .law-sm-card-b     #f6f6f6 (`.bg2` #ededed) under its own wash at 50% 100%, 382 tall, padding
 *                      28 40, black; `.law-sm-text-b` 20px 700 mb 24 (#cb5827 on the ATLAS card),
 *                      `-md` 16px mb 8, `-sm` 14px
 */
export default function StandApart({ data, block = 'stand-apart' }) {
  return (
    <section data-block={block} className="block overflow-hidden pb-[60px]">
      <div className={CONTAINER}>
        <div className="flex gap-9">
          <div className="w-[35%]">
            <h3 className="mb-8 mt-0 text-[32px] font-bold leading-[1.2] text-[#1a1a1a]">{withBreaks(data.heading)}</h3>
          </div>
          <div className="flex w-[65%] overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
            {data.cards.map((c, i) => (
              <div
                key={c.title}
                className={`h-[382px] bg-[position:50%_100%] bg-no-repeat px-10 py-7 text-black ${i ? 'bg-[#ededed]' : 'bg-[#f6f6f6]'}`}
                style={{ backgroundImage: `url(${c.wash})` }}
              >
                <div className={`mb-6 text-[20px] font-bold ${c.accent ? 'text-[#cb5827]' : ''}`}>{c.title}</div>
                <div className="mb-2 text-base font-normal">{c.lead}</div>
                <div className="text-[14px] font-normal">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
