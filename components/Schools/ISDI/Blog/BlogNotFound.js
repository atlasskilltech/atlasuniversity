import Link from 'next/link';

/**
 * "Blog not found" — rendered by each blog detail route's not-found.js after the page calls
 * `notFound()` for a slug the API does not return as a published blog of that school (unknown,
 * unpublished, deleted, or moved to another school). Same screen the routes rendered inline before,
 * but now served with HTTP 404 instead of 200, so search engines drop removed posts.
 */
export default function BlogNotFound({ accent, listing, className = 'bg-white' }) {
  return (
    <main className={className}>
      <section className="mx-auto max-w-[1200px] px-6 py-20 text-center">
        <h1 className="mb-4 text-[38px] font-semibold leading-tight text-gray-800 max-md:text-[28px]">
          Blog not found
        </h1>
        <div className="text-[18px] font-light text-gray-500">
          <p className="mb-6">This article doesn&apos;t exist or isn&apos;t published yet.</p>
          <Link href={listing} className="font-bold hover:underline" style={{ color: accent }}>
            Browse Thought Leadership
          </Link>
        </div>
      </section>
    </main>
  );
}
