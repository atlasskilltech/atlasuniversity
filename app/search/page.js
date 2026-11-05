import SearchPage from '@/components/Search/SearchPage';
import { search } from '@/lib/searchContent';

/**
 * /search — ATLAS AI Search. Port of reference/search.php; see
 * components/Search/SearchPage.js for the page, app/api/search/route.js for the
 * server endpoint.
 *
 * Reached from every "More questions?" panel on the site (a GET form to
 * `/search?query=…`, components/About/SearchQuestion) — the query is read on the
 * client, so the route stays static.
 */

const { title, description, canonical } = search.meta;

export const metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title, url: canonical, type: 'website', description },
  twitter: { card: 'summary_large_image', title, description },
};

export default function Page() {
  return <SearchPage />;
}
