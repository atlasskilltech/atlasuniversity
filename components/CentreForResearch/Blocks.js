import StatBand from '@/components/ui/StatBand';
import CareerSupportCard from '@/components/ui/CareerSupportCard';
import CommitteeTable from '@/components/Statutory/CommitteeTable';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/*
 * Sections for the Centre for Research card pages, composed only from the site's own pieces: the
 * section rhythm, container and h2 from SectionHead, the `.abt-text` 16px/24 copy, StatBand,
 * CareerSupportCard and the statutory pages' CommitteeTable.
 */

const COPY = 'text-base leading-6 text-[#333]';

/* a bold run inside copy, as AboutStory renders it */
function Runs({ text }) {
  if (!Array.isArray(text)) return text;
  return text.map((r, i) => (typeof r === 'string' ? r : <b key={i} className="font-bold">{r.b}</b>));
}

/* h2 + an optional lead + paragraphs, in two columns from 768 up */
export function TextSection({ heading, lead, paragraphs, columns = 2, children }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        {heading && <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{heading}</h2>}
        {lead && <div className={SUB_INNER}>{lead}</div>}
        {paragraphs?.length > 0 && (
          <div className={`grid gap-x-10 gap-y-4 pt-6 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : ''}`}>
            {paragraphs.map((p, i) => (
              <p key={i} className={`m-0 ${COPY}`}>
                <Runs text={p} />
              </p>
            ))}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* the StatBand figures under a heading pair, as /centre-for-research's own band */
export function FigureSection({ heading, stats, paragraphs }) {
  return (
    <>
      <TextSection heading={heading} paragraphs={paragraphs} />
      <StatBand data={stats} variant="stack992" />
    </>
  );
}

/* CareerSupportCard row — the "Research and Innovation" layout */
export function CardSection({ heading, cards }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-0 ${H2}`}>{heading}</h2>
        <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14 max-md:pt-10">
          {cards.map((card) => (
            <CareerSupportCard key={card.title} card={card} titleVariant="poppins" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* the statutory pages' committee table, here a publications catalogue */
export function TableSection({ heading, columns, rows }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-0 ${H2}`}>{heading}</h2>
        <CommitteeTable head={columns} rows={rows} layout="publications" />
      </div>
    </section>
  );
}

/* a "Title: description" list under a heading and lead */
export function ListSection({ heading, lead, items }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{heading}</h2>
        {lead && <p className={`m-0 mb-3 ${COPY}`}>{lead}</p>}
        <ul className={`m-0 list-disc pl-10 ${COPY}`}>
          {items.map(([title, text]) => (
            <li key={title} className="mb-2">
              <b className="font-bold">{title}:</b> {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* a row of photographs with the site's 32px-0 corner, as AboutStory's photo */
export function PhotoRow({ photos }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-8">
      {photos.map((p) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img key={p.src} src={p.src} alt={p.alt} loading="lazy" className="block h-auto w-[calc((100%-32px)/3)] rounded-tl-[32px] rounded-br-[32px] object-cover max-md:w-full" />
      ))}
    </div>
  );
}

/* coloured project tiles in a 3-column grid (1 column below 768) — the old community page's
   project blocks; a tile with text shows it above its title */
export function TileSection({ heading, tiles }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-0 ${H2}`}>{heading}</h2>
        <div className="grid grid-cols-3 gap-4 pt-14 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:pt-10">
          {tiles.map((t) => (
            <div
              key={t.title}
              className="flex min-h-[240px] flex-col justify-end rounded-tl-[32px] rounded-br-[32px] p-6 text-white max-md:min-h-[160px]"
              style={{ backgroundColor: t.color }}
            >
              {t.text && <p className="m-0 mb-4 text-[14px] leading-[1.5]">{t.text}</p>}
              <div className="text-[20px] font-semibold leading-[1.3]">{t.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* a heading over a wrapping grid of e-mail links */
export function EmailSection({ heading, emails }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-0 ${H2}`}>{heading}</h2>
        <div className="grid grid-cols-3 gap-x-10 gap-y-4 pt-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {emails.map((e) => (
            <a key={e} href={`mailto:${e}`} className={`break-all text-[#41418e] no-underline hover:underline ${COPY}`}>{e}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
