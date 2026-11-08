/*
 * Asset storage (docs/assets-s3.md). When NEXT_PUBLIC_ASSET_BASE_URL points at the public S3 host
 * (https://atlas-web-cdn.s3.ap-south-1.amazonaws.com — direct S3, no CDN), `next/image` must be allowed
 * to fetch from that host — limited to its `/assets/` path. Unset (local development from `public/`),
 * nothing is added and the config is exactly as before.
 */
function assetImagePatterns() {
  const raw = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || '').trim().replace(/\/+$/, '');
  if (!raw) return [];
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`NEXT_PUBLIC_ASSET_BASE_URL is not a valid absolute URL: "${raw}"`);
  }
  return [{
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    ...(url.port ? { port: url.port } : {}),
    pathname: `${url.pathname.replace(/\/+$/, '')}/assets/**`,
  }];
}

const ASSET_IMAGE_PATTERNS = assetImagePatterns();

/*
 * The code writes every asset as `/assets/…` (~20,000 literals in the JS and JSON data under app/, components/ and lib/). With a
 * base URL set, this Turbopack rule rewrites those literals at build time instead of editing the source —
 * see scripts/assets/asset-url-rewrite.cjs for exactly what is and is not rewritten. Compiled CSS (the
 * Tailwind `bg-[url(…)]` classes) is handled by the PostCSS plugin in postcss.config.js. Fonts and brand
 * files are never rewritten — they stay local (scripts/assets/local-only.cjs). Unset: no rule is
 * registered at all, and the build is byte-for-byte the local one.
 */
const ASSET_URL_RULES = ASSET_IMAGE_PATTERNS.length
  ? {
      '*.{js,jsx,mjs,json}': {
        condition: {
          all: [
            { not: 'foreign' },
            { path: /^(?:app|components|lib)\// },
            { not: { path: /(?:^|\/)lib\/asset\.js$/ } }, // inspects paths with startsWith('/assets/'); never rewrite it
            { content: /\/assets\// },
          ],
        },
        loaders: ['./scripts/assets/asset-url-loader.cjs'],
      },
    }
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(ASSET_IMAGE_PATTERNS.length ? { images: { remotePatterns: ASSET_IMAGE_PATTERNS } } : {}),
  ...(ASSET_URL_RULES ? { turbopack: { rules: ASSET_URL_RULES } } : {}),

  /*
   * ATLAS News admin (/news/admin and everything under it, pages and APIs): never framed (clickjacking),
   * never cached, never indexed, no referrer leaks, and only same-origin resources. Scoped to the admin
   * area only — no other route's headers change.
   */
  async headers() {
    const adminHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
      { key: 'Referrer-Policy', value: 'same-origin' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      { key: 'Cache-Control', value: 'no-store, max-age=0' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];
    return [
      { source: '/news/admin', headers: adminHeaders },
      { source: '/news/admin/:path*', headers: adminHeaders },
    ];
  },

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
      /*
       * /advantages/atlas-internationalisation links its Summer Schools card to
       * `/advantages/partnership/summerschool`. On production that path is the
       * catch-all soft-404 (it serves the ATLAS homepage), while the page itself is
       * `/advantages/partnership/international-summerschool` — which the same
       * reference also links elsewhere. The authored intent is the real page, so the
       * short slug is sent there (307, like the soft-404 has no canonical of its own).
       */
      {
        source: '/advantages/partnership/summerschool',
        destination: '/advantages/partnership/international-summerschool',
        permanent: false,
      },
      /*
       * Standalone sites ported from reference/new pages/ (2026-11-08).
       *
       * Aarohan: the reference is PHP, so every page had a `.php` URL; the port serves the
       * extension-less path (production itself already 301s /aarohan23/<slug>.php to it). Order
       * matters — the first match wins — so index.php and the doubled `.php.php` copy come before
       * the generic rule. library / news / speaker-single only echo the ATLAS homepage on
       * production, and registration(v2) 302s there, so all five go to `/` temporarily.
       */
      { source: '/aarohan2025/sumit-saxena.php.php', destination: '/aarohan2025/sumit-saxena', permanent: true },
      ...['library', 'news', 'speaker-single', 'registration', 'registrationv2'].map((p) => ({
        source: `/aarohan2025/${p}.php`,
        destination: '/',
        permanent: false,
      })),
      ...['aarohan23', 'aarohan2024', 'aarohan2025'].flatMap((y) => [
        { source: `/${y}/index.php`, destination: `/${y}`, permanent: true },
        { source: `/${y}/:slug([^/]+?)\\.php`, destination: `/${y}/:slug`, permanent: true },
      ]),
      /* lp23 / lp24 / lp25 / lp25/ismeug: production 301s index.php and thankyou.php to the clean paths. */
      ...['lp23', 'lp24', 'lp25', 'lp25/ismeug'].flatMap((p) => [
        { source: `/${p}/index.php`, destination: `/${p}`, permanent: true },
        { source: `/${p}/thankyou.php`, destination: `/${p}/thankyou`, permanent: true },
      ]),
      /*
       * lp2022: only five pages are live and ported. Production 302s the expired campaigns, and
       * these carry those redirects over unchanged (307 here, as with /programs above). The lead
       * CSVs, PHP mailers and admin pages under lp2022 are not ported.
       */
      ...['/lp2022', '/lp2022/DMAprogram', '/lp2022/film-animation', '/lp2022/mbaprograms', '/lp2022/MEprograms', '/lp2022/pgdiprogram', '/lp2022/ug/ba'].map(
        (source) => ({ source, destination: '/', permanent: false }),
      ),
      { source: '/lp2022/ug/bsc', destination: 'https://atlasuniversity.edu.in/admission-b_tech/', permanent: false },
      { source: '/lp2022/film-animation_26/thank-you', destination: '/lp2022/film-animation_26', permanent: false },
    ];
  },
};

export default nextConfig;
