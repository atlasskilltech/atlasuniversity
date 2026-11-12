import BlogNotFound from '@/components/Schools/ISDI/Blog/BlogNotFound';

/* Rendered with HTTP 404 when page.js calls notFound() for an unknown / unpublished / deleted blog. */
export default function NotFound() {
  return <BlogNotFound accent="#07F6A0" listing="/schools/isme/thought-leaderships" className="bg-white font-sans [--font-manrope:'Manrope']" />;
}
