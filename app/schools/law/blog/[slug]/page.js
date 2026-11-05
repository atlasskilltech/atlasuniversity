import BlogDetail, { blogMetadata } from '@/components/Schools/LawUgdx/BlogDetail';

/* /schools/law/blog/[slug] — reference/law/blog/index.php (the shared blog template); see
   components/Schools/LawUgdx/BlogDetail. Live: it reads the same API the listing snapshots. */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return blogMetadata('law', slug);
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BlogDetail school="law" slug={slug} />;
}
