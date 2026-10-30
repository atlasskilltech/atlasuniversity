/*
 * Loading state for /schools/isdi/blog/[slug] — Next shows this while the detail server
 * component fetches the live API and streams. A quiet skeleton of the article shell (hero
 * band, title, meta, body lines) so the "loading" state the brief calls for is real rather
 * than a blank frame.
 */
export default function BlogLoading() {
  return (
    <main className="bg-white" aria-busy="true" aria-label="Loading article">
      <div className="h-[320px] w-full animate-pulse bg-gray-200 max-md:h-[220px]" />
      <section className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="mb-6 h-4 w-40 animate-pulse rounded bg-gray-100" />
        <div className="mb-4 h-9 w-3/4 animate-pulse rounded bg-gray-200 max-md:h-7" />
        <div className="mb-8 h-5 w-52 animate-pulse rounded bg-gray-100" />
        <div className="grid gap-12 md:grid-cols-[260px_1fr]">
          <div className="hidden md:block">
            <div className="mb-4 h-4 w-24 animate-pulse rounded bg-gray-100" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 w-40 animate-pulse rounded bg-gray-100" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-gray-100"
                style={{ width: `${90 - (i % 4) * 12}%` }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
