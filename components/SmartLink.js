import Link from 'next/link';

/**
 * Renders a next/link for in-app routes and a plain <a> for anything that
 * leaves the app (absolute URLs, `#`, tel:, mailto:, target=_blank).
 *
 * Prefetch is disabled: the header alone links to ~30 routes, and prefetching
 * all of them on every page view is wasted bandwidth.
 */
export default function SmartLink({ href, external, newTab, children, ...rest }) {
  const isExternal =
    external ||
    newTab ||
    !href ||
    href === '#' ||
    /^(https?:|mailto:|tel:|#)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        {...(newTab ? { target: '_blank', rel: 'noopener' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={false} {...rest}>
      {children}
    </Link>
  );
}
