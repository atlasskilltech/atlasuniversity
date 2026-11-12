import BlogNotFound from '@/components/Schools/ISDI/Blog/BlogNotFound';

/* Rendered with HTTP 404 when page.js calls notFound() for an unknown / unpublished / deleted blog. */
export default function NotFound() {
  return <BlogNotFound accent="#6EC1C2" listing="/thought-leaderships" />;
}
