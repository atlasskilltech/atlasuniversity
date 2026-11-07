/* Elementor video widget (video_type youtube, controls yes, aspect 16:9, "open inline"): production
 * builds an <iframe> to youtube.com/embed/<id> on load with these exact parameters; here it is in the
 * markup with loading="lazy". */
export default function YouTube({ id, title }) {
  return (
    <div className="relative w-full overflow-hidden pb-[56.25%]">
      <iframe
        className="absolute left-0 top-0 h-full w-full border-0"
        src={`https://www.youtube.com/embed/${id}?controls=1&rel=0&playsinline=0&modestbranding=0&autoplay=0&enablejsapi=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
