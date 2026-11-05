import MediaCarousel from '@/components/Partnership/MediaCarousel';

/*
 * ref the partnership pages' `py-10 lg:py-20 bg-[…]` media sections (Study In India, COIL Projects,
 * International Collaborative Projects, Visiting Student Delegations …): a coloured band with an
 * `h2` (36/44px) + a lead paragraph (16/24px, pr-50, mb-42) over a `.mySwiperWorld` image carousel.
 * `bg` sets the band colour; `dark` flips the text/bullets to light on the navy bands.
 */
export default function MediaSection({ heading, lead, images, bg, dark = false }) {
  const text = dark ? 'text-white' : 'text-[#1a1a1a]';
  return (
    <section className="py-10 n1024:py-20" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className={`relative mb-[16px] mt-0 text-[36px] font-medium leading-[1.2] n1024:text-[44px] ${text}`}>
          {heading}
        </h2>
        {lead && (
          <p className={`mb-[42px] pb-0 pr-[50px] text-[16px] font-light leading-[1.4] n1024:text-[24px] ${dark ? 'text-white' : 'text-[#333]'}`}>
            {lead}
          </p>
        )}
        <MediaCarousel accent={dark ? '#ffffff' : '#342b7c'}>
          {(images || []).map((img, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={i} src={img.src} alt={img.alt || ''} className="h-auto w-full object-cover" loading="lazy" />
          ))}
        </MediaCarousel>
      </div>
    </section>
  );
}
