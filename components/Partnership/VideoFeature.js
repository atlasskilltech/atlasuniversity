/*
 * ref international-faculty.php "International Faculty Week" / "International Faculty Master Classes"
 * — a Tailwind-CDN section: `section.py-20.bg-white > .max-w-7xl.mx-auto.px-6 > (h2 44px,
 * p.mb-[42px].pr-[50px].text-[24px].font-light.leading-[1.4], div.rounded-[40px].shadow-xl > iframe)`.
 * The frame is a fixed height, not an aspect ratio: 300 / 400 (>=640) / 500 (>=768) / 600 (>=1024),
 * Play CDN's stock `sm`/`md`/`lg`. Both iframes are authored `autoplay=1&mute=1`.
 */
export default function VideoFeature({ heading, text, youtubeId }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="relative mb-[16px] mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a]">{heading}</h2>
        <p className="mb-[42px] pb-0 pr-[50px] text-[24px] font-light leading-[1.4]">{text}</p>
        <div className="h-[300px] w-full overflow-hidden rounded-[40px] shadow-xl n640:h-[400px] md:h-[500px] n1024:h-[600px]">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=1&rel=0`}
            title={heading}
            loading="lazy"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  );
}
