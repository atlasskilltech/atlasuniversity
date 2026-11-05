/**
 * Convert a share URL into an embeddable one.
 * Ported from `getEmbedUrl()` in reference/assets/include/footer.php, which
 * handles YouTube (watch / youtu.be / Shorts / embed) and Google Drive.
 */

const YT_PARAMS =
  'autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3';

export function toEmbedUrl(videoUrl) {
  if (!videoUrl) return '';

  let url;
  try {
    url = new URL(videoUrl, typeof window === 'undefined' ? 'https://localhost' : window.location.href);
  } catch {
    return '';
  }

  const host = url.hostname;

  // Google Drive
  if (host.includes('drive.google.com')) {
    const match = url.pathname.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    const fileId = match ? match[1] : url.searchParams.get('id');
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';
  }

  // youtu.be/<id>
  if (host === 'youtu.be') {
    return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}?${YT_PARAMS}`;
  }

  if (host.includes('youtube.com')) {
    // /shorts/<id>
    if (url.pathname.includes('/shorts/')) {
      return `https://www.youtube-nocookie.com/embed/${url.pathname.split('/shorts/')[1]}?${YT_PARAMS}`;
    }
    // already an /embed/ URL
    if (url.pathname.includes('/embed/')) {
      return `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}${YT_PARAMS}`;
    }
    // /watch?v=<id>
    const v = url.searchParams.get('v');
    if (v) return `https://www.youtube-nocookie.com/embed/${v}?${YT_PARAMS}`;
  }

  return videoUrl;
}
