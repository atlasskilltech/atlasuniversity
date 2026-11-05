import BlogDetail, { blogMetadata } from '@/components/Schools/LawUgdx/BlogDetail';

/* /schools/ugdx/blog/[slug] — reference/ugdx/blog/index.php (the shared blog template); see
   components/Schools/LawUgdx/BlogDetail. Live: it reads the same API the listing snapshots. */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return blogMetadata('ugdx', slug);
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BlogDetail school="ugdx" slug={slug} />;
}
