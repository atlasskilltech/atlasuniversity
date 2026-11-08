import Image from 'next/image';
import { cx } from './ui';

/**
 * A featured / card image in a fixed-ratio frame: the frame reserves its space before the image loads
 * (no layout shift), `next/image` serves a responsive srcset and lazy-loads unless `priority`.
 * Inside a `group` the photograph eases in slightly on hover.
 */
export default function NewsImage({ image, sizes, priority = false, ratio = 'aspect-[3/2]', className, zoom = true }) {
  return (
    <div className={cx('relative overflow-hidden bg-news-ink/[0.06]', ratio, className)}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt || ''}
          fill
          sizes={sizes}
          priority={priority}
          className={cx(
            'object-cover',
            zoom && 'transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
          )}
        />
      ) : null}
    </div>
  );
}
