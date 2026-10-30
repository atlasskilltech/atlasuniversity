/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      /*
       * ref `reference/programs/index.php`, which is not a page — it is a
       * three-line guard on the `/programs/` directory:
       *
       *     <?php
       *     header("Location: https://atlasuniversity.edu.in/");
       *     exit;
       *     ?>
       *
       * `header("Location: …")` with no status code sends a 302, and `exit`
       * stops before any output, so the directory has no markup, no stylesheet,
       * no assets and no interactions. Verified against both the local mirror
       * and production: `/programs/` answers `302 -> https://atlasuniversity.edu.in/`.
       *
       * The reference points at its own site root, so the rebuild's equivalent
       * destination is `/`, not the production hostname.
       *
       * `permanent: false` emits **307** where PHP emits **302**. Both are
       * temporary redirects and browsers follow them identically; 307 only adds
       * a guarantee that the method is preserved. Next's `redirects()` offers
       * 307/308 and nothing else, and a literal 302 would mean adding
       * middleware for a status-code nuance no visitor can observe on a GET —
       * so this is left as 307 deliberately.
       *
       * Nothing in `lib/navigation.js` links to `/programs` itself — the menu
       * goes straight to `/programs/ug-programs-atlas`,
       * `/programs/pg-programs-atlas` and `/programs/programs-list-integrated`,
       * which are separate reference files and are not built yet.
       */
      { source: '/programs', destination: '/', permanent: false },

      /*
       * The ISDI B.Tech AI programme was renamed upstream: the reference file
       * `programs/undergraduate/btech/btech-ai-integrated-design.php` became
       * `…/ai-engineering-&-intelligent-products.php` and the header menu's
       * label changed with it ("B.Tech in AI Integrated Design" ->
       * "AI Engineering & Intelligent products"). The two files differ in
       * exactly four lines — the enrolment wording and the Fee Structure href —
       * so this is a rename, not a new page.
       *
       * The old path was the live URL before the rename, so anything already
       * pointing at it (a bookmark, an external link, a search result) is kept
       * working rather than 404'd. `permanent: true` emits **308**, which is
       * what a rename warrants.
       */
      {
        source: '/schools/isdi/programs/undergraduate/btech/btech-ai-integrated-design',
        destination:
          '/schools/isdi/programs/undergraduate/btech/ai-engineering-&-intelligent-products',
        permanent: true,
      },
      /*
       * M.Des in Design Futures duplicate (2026-10-30). The reference ships this
       * programme at two live URLs: `postgraduate/mdes/design-futures-2-years.php`
       * (the header-menu link, built as the canonical page) and the older
       * `postgraduate/m-des-in-design-futures.php` (which the Postgraduate Overview
       * card links). Both are the SAME programme (identical $title/$description/$css,
       * the same sixteen-node page, the same hero slides). Verified against production:
       * the two differ only in editorial wording — the canonical's hero reads
       * "Design Futures" (the old one "Master of Design (M.Des) Design Futures"), its
       * ATLAS-Elective dropdowns are live where the old one comments them out, its
       * enrolment line reads "Nonrefundable" with a `/fee-structure/mdes/` link (the old
       * one "refundable" + a fliphtml5 link), and its "ISDI vs others" comparison table
       * carries the refreshed copy. The canonical is the fuller, current, menu-linked
       * version and is missing nothing the old page has, so the old route is redirected
       * to it (308) rather than built as a second page — which also makes the Overview
       * card resolve. The old URL's distinct comparison/hero wording is recorded in
       * MIGRATION-ISDI.md so it can be revisited if that specific copy must be preserved.
       */
      {
        source: '/schools/isdi/programs/postgraduate/m-des-in-design-futures',
        destination: '/schools/isdi/programs/postgraduate/mdes/design-futures-2-years',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
