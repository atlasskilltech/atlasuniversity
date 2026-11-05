import 'server-only';
import * as bba from './registry';
import * as mba from '../mba/registry';

/*
 * The ISME BBA major/minor pages (~100 production URLs) and the MBA dual / hyper-specialisation
 * pages (17) are one template family, so their content is generated from the production markup
 * into JSON: each page's own blocks in `<ns>/pages/`, and the blocks many pages share byte for
 * byte (Why Choose, execution, voices, admissions, eligibility, banner, FAQ …) once each in
 * `<ns>/blocks/`, content-addressed. `loadBbaPage` resolves the refs.
 */
const NS = {
  bba: { pages: bba.BBA_PAGES, blocks: bba.BBA_BLOCKS, level: 'undergraduate' },
  mba: { pages: mba.BBA_PAGES, blocks: mba.BBA_BLOCKS, level: 'postgraduate' },
};

export function bbaKeys(prefix, ns = 'bba') {
  return Object.keys(NS[ns].pages).filter((k) => k.startsWith(prefix + '/'));
}

/* pages that sit directly under the level (no family folder), e.g. postgraduate/program-mba-in-fintech */
export function bbaRootKeys(ns = 'bba') {
  return Object.keys(NS[ns].pages).filter((k) => !k.includes('/'));
}

export async function loadBbaPage(key, ns = 'bba') {
  const reg = NS[ns];
  const load = reg.pages[key];
  if (!load) return null;
  const page = (await load()).default;
  const blocks = { ...page.blocks };
  await Promise.all(
    Object.entries(page.refs).map(async ([name, ref]) => {
      blocks[name] = (await reg.blocks[ref]()).default;
    })
  );
  return { ...page, blocks };
}

export async function bbaMetadata(key, ns = 'bba') {
  const reg = NS[ns];
  const load = reg.pages[key];
  if (!load) return {};
  const { meta, path } = (await load()).default;
  const canonical = `/schools/isme/programs/${reg.level}/${path.replace(/\/$/, '')}`;
  return {
    title: meta.title,
    description: meta.description || undefined,
    keywords: meta.keywords || undefined,
    alternates: { canonical },
  };
}
