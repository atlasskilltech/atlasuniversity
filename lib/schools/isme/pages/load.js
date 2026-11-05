import 'server-only';
import { ISME_PAGES } from './registry';

/* The ISME one-off pages' data, generated from their production markup (see registry.js). */
export function ismePagePaths(prefix) {
  return Object.keys(ISME_PAGES).filter((p) => p.startsWith(prefix));
}

export async function loadIsmePage(path) {
  const load = ISME_PAGES[path];
  return load ? (await load()).default : null;
}

export async function ismePageMetadata(path) {
  const page = await loadIsmePage(path);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description || undefined,
    alternates: { canonical: path },
  };
}
