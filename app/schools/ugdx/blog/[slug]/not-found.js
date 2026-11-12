import BlogNotFound from '@/components/Schools/ISDI/Blog/BlogNotFound';

/* Rendered with HTTP 404 when page.js calls notFound() for an unknown / unpublished / deleted blog. */
export default function NotFound() {
  return <BlogNotFound accent="#EB1F3C" listing="/schools/ugdx/thought-leaderships" />;
}
