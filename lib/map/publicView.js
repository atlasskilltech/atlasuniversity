import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import bundledGraph from '@/data/map/graph.json';
import bundledFacts from '@/data/map/facts.json';
import bundledAudit from '@/data/map/audit.json';
import bundledHistory from '@/data/map/history.json';
import { asset } from '@/lib/asset';

/* The snapshot is read from disk at render time, so a scheduled `npm run map:refresh` on a
   long-running server reaches the page at its next revalidation without a rebuild. Where the
   files cannot be read (a read-only or trimmed deployment), the copy bundled at build time is used.
   Document links in the snapshot are `/assets/…` paths; they go through `asset()` below so they point
   at the public S3 host when NEXT_PUBLIC_ASSET_BASE_URL is set (the build-time rewrite never sees
   data read from disk). */
function snapshot(name, bundled) {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'map', name), 'utf8'));
  } catch {
    return bundled;
  }
}

/*
 * The /map page's view of the discovery snapshot (data/map/*.json, written by scripts/map/).
 *
 * This is the ONLY code that reads the snapshot, and it decides what a public visitor sees:
 * page URLs, titles, relationships, published facts with their source pages, and safe page-health
 * indicators. Internal details stay out — repository file paths, module names, the audit's base
 * URL, request errors beyond a one-word reason. Date status ("upcoming", "passed", …) is computed
 * here, at render time, so an expired deadline is flagged without a new snapshot.
 */

const LIVE = 'https://atlasuniversity.edu.in';

/* degree name -> the token an admissions-calendar caption uses for it */
const DEGREE_TOKEN = {
  'B.Des': /\bb\.?\s?des\b/i,
  'B.Tech': /\bb\.?\s?tech\b(?!\s*\+)/i,
  'B.Tech + MBA': /b\.?\s?tech\s*\+\s*mba/i,
  'BBA (Hons.)': /\bbba\b(?!\s*ll)/i,
  'B.Sc. (Hons.)': /\bb\.?\s?sc\b/i,
  'BBA LL.B. (Hons.)': /\bll\.?\s?b\b/i,
  MBA: /\bmba\b/i,
  'M.Des': /\bm\.?\s?des\b/i,
};

function dateStatus(date, today) {
  if (!date) return 'text';
  if (date.state) return date.state; // closed | open | tba
  const [y, m, d] = date.iso.split('-').map(Number);
  /* the whole published day / month counts as not yet passed */
  const end = date.precision === 'day' ? new Date(Date.UTC(y, m - 1, d, 23, 59, 59)) : new Date(Date.UTC(y, m, 0, 23, 59, 59));
  return end < today ? 'passed' : 'upcoming';
}

function health(audit, p) {
  const r = p ? audit.pages?.[p] : null;
  if (!r) return null;
  const status = r.error ? 'unreachable' : r.finalStatus;
  return {
    status: r.status ?? null,
    finalStatus: status,
    redirects: (r.hops || []).map((h) => ({ status: h.status, to: h.to })),
    canonical: r.canonicalPath ?? null,
    canonicalMatches: r.canonicalPath ? r.canonicalPath === (r.finalPath || p) : null,
    title: r.title || null,
    indexable: Boolean(r.indexable),
    noindex: Boolean(r.noindex),
    soft404: Boolean(r.soft404),
    brokenLinks: r.brokenLinks || [],
    completeness: r.completeness || null,
    missing: r.missing || [],
    checkedAt: r.checkedAt || null,
    reason: r.error || null, // 'timeout' | 'unreachable' | 'too-many-redirects'
  };
}

export function getMapData() {
  const graph = snapshot('graph.json', bundledGraph);
  const factsFile = snapshot('facts.json', bundledFacts);
  const audit = snapshot('audit.json', bundledAudit);
  const history = snapshot('history.json', bundledHistory);
  const healthOf = (p) => health(audit, p);
  const today = new Date();
  const checkedAt = factsFile.generatedAt;
  const auditFacts = audit.facts || {};
  const nodes = new Map(graph.nodes.map((n) => [n.id, n]));

  const verification = (f) => {
    const a = auditFacts[f.id];
    if (!a) return { state: 'unverified' };
    return a.found ? { state: 'verified', at: a.checkedAt } : { state: 'not-found', at: a.checkedAt };
  };
  const pageLabel = (route) => {
    const n = nodes.get(`p:${route}`);
    return n ? n.title || n.label : route;
  };
  const publicFact = (f) => ({
    id: f.id,
    kind: f.kind,
    key: f.key,
    label: f.label,
    value: asset(f.value),
    note: f.note || null,
    group: f.group || null,
    refundable: f.refundable ?? null,
    href: asset(f.href) || null,
    status: f.kind === 'date' ? dateStatus(f.date, today) : null,
    date: f.date?.iso || null,
    source: { path: f.route, label: pageLabel(f.route) },
    checkedAt,
    verification: verification(f),
  });

  const byRoute = new Map();
  for (const f of factsFile.facts) {
    if (!byRoute.has(f.route)) byRoute.set(f.route, []);
    byRoute.get(f.route).push(f);
  }
  const datesBySchool = factsFile.facts.filter((f) => f.kind === 'date' && f.school);
  /* which pages carry a CRM widget, key dates, fee amounts or fee documents (Explore's "Show" filter) */
  const crmPaths = new Set((factsFile.crm || []).map((c) => c.servedAt || c.route));
  const datePaths = new Set(factsFile.facts.filter((f) => f.kind === 'date').map((f) => f.route));
  const feePaths = new Set(
    factsFile.facts.filter((f) => f.kind === 'fee' || (f.kind === 'document' && f.key === 'feeStructure')).map((f) => f.route),
  );

  const out = graph.nodes.map((n) => {
    const own = n.path ? byRoute.get(n.path) || [] : [];
    let facts = [...own];
    if (n.type === 'programme') {
      if (n.related?.admissions) facts.push(...(byRoute.get(n.related.admissions) || []));
      const token = DEGREE_TOKEN[n.degree];
      facts.push(...datesBySchool.filter((f) => f.school === n.school && f.route !== n.related?.admissions && (!token || token.test(f.group || ''))));
      for (const l of n.listedOn || []) {
        for (const e of l.eligibility || []) {
          facts.push({ id: `${n.id}|${l.route}|${e.label}`, route: l.route, kind: 'eligibility', key: 'eligibility', label: e.label, value: e.value });
        }
      }
    }
    if (n.type === 'school') facts.push(...datesBySchool.filter((f) => f.school === n.school));
    const seen = new Set();
    facts = facts.filter((f) => !seen.has(f.id) && seen.add(f.id)).map(publicFact);

    const conflicts = (factsFile.conflicts || []).filter((c) => c.programme === n.id).map((c) => ({
      key: c.key,
      values: c.values.map((v) => ({ value: v.value, source: { path: v.route, label: pageLabel(v.route) } })),
    }));

    const internal = Boolean(n.path) && n.type !== 'external';
    return {
      id: n.id,
      type: n.type,
      label: n.label,
      short: n.short || null,
      parent: n.parent,
      children: n.children,
      target: n.target || null,
      path: n.path || null,
      hash: n.hash || null,
      /* where "Open page" goes: this site when the page is built here, otherwise the live site */
      href: n.url || (internal ? (n.built ? `${n.path}${n.hash ? `#${n.hash}` : ''}` : `${LIVE}${n.path}`) : null),
      opensLive: internal && !n.built,
      built: n.built ?? null,
      school: n.school || null,
      level: n.level || null,
      degree: n.degree || null,
      category: n.category || null,
      date: n.date || null,
      aliases: n.aliases || [],
      listedOn: (n.listedOn || []).map((l) => ({ path: l.route, label: pageLabel(l.route) })),
      refs: n.refs || [],
      facts,
      conflicts,
      health: healthOf(n.path),
      flags: n.path && n.type !== 'ref' ? { crm: crmPaths.has(n.path), dates: datePaths.has(n.path), fees: feePaths.has(n.path) } : null,
    };
  });

  const upcoming = factsFile.facts
    .filter((f) => f.kind === 'date' && dateStatus(f.date, today) === 'upcoming')
    .map(publicFact)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));

  /* ---- Key information: CRM widget pages, key dates, fee information, fee documents ------------- */
  const schoolOf = (p) => (p.match(/^\/schools\/(isdi|isme|ugdx|law)\b/) || [])[1] || null;
  const linkOf = (p) => (graph.routes.some((r) => r.route === p && !r.dynamic) ? p : `${LIVE}${p}`);
  const crm = (factsFile.crm || []).map((c) => {
    const p = c.servedAt || c.route;
    return {
      id: c.route, // unique per row: two reference URLs can be served by one page (a redirect)
      path: p,
      label: pageLabel(p),
      referencePath: c.servedAt ? c.route : null, // the reference URL this page now answers for
      school: schoolOf(p),
      widgets: c.widgets.length,
      forms: [...new Set(c.widgets.flatMap((w) => w.forms))],
      inReference: c.inReference,
      integrated: c.integrated,
      status: c.status,
      href: linkOf(p),
      checkedAt,
    };
  });
  const dates = factsFile.facts
    .filter((f) => f.kind === 'date')
    .map((f) => ({ ...publicFact(f), section: f.section || null, school: schoolOf(f.route), href: linkOf(f.route) }));
  const FEE_DOC = (f) => f.kind === 'document' && (f.key === 'feeStructure' || (f.key === 'pdf' && /fee/i.test(`${f.label} ${f.href}`)));
  const feePages = new Map();
  for (const f of factsFile.facts) {
    const isAmount = f.kind === 'fee';
    if (!isAmount && !FEE_DOC(f)) continue;
    if (!feePages.has(f.route)) {
      feePages.set(f.route, { path: f.route, label: pageLabel(f.route), school: schoolOf(f.route), href: linkOf(f.route), amounts: [], documents: [], checkedAt });
    }
    const e = feePages.get(f.route);
    if (isAmount) e.amounts.push({ ...publicFact(f), section: f.section || null });
    else if (!e.documents.some((d) => d.href === asset(f.href))) e.documents.push({ label: f.label, href: asset(f.href), section: f.section || null, pdf: /\.pdf(\?|#|$)/i.test(f.href) });
  }
  const fees = [...feePages.values()].map((e) => ({
    ...e,
    contains: e.amounts.length && e.documents.length ? 'both' : e.amounts.length ? 'amount' : 'document',
  }));
  /* one row per distinct fee document, with every page that links it */
  const docMap = new Map();
  for (const e of fees) {
    for (const d of e.documents) {
      if (!docMap.has(d.href)) docMap.set(d.href, { href: d.href, label: d.label, pdf: d.pdf, onLive: /^https?:\/\/(www\.)?atlasuniversity\.edu\.in/.test(d.href), pages: [] });
      docMap.get(d.href).pages.push({ path: e.path, label: e.label, href: e.href, school: e.school });
    }
  }
  const feeDocs = [...docMap.values()];

  const lastRun = history.runs?.[0] || null;
  return {
    nodes: out,
    keyInfo: { crm, dates, fees, feeDocs, checkedAt },
    upcoming,
    snapshotAt: graph.generatedAt,
    audit: { checkedAt: audit.checkedAt || null, environment: audit.environment || null, capped: Boolean(audit.capped) },
    changes: lastRun
      ? { at: lastRun.at, pagesAdded: lastRun.pagesAdded.length, pagesRemoved: lastRun.pagesRemoved.length, valuesChanged: lastRun.valuesChanged.slice(0, 20) }
      : null,
  };
}
