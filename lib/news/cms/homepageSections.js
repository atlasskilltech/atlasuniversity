/**
 * ATLAS News CMS — the homepage's category sections (setting `homepage_sections`), edited on the admin
 * Homepage screen and rendered by the public homepage BELOW the hero and Latest, in the order stored here.
 * They were seeded from the old WordPress homepage (its Elementor layout, by the import) and are the
 * source of truth from then on.
 *
 * A section: { id, layout, title, width, categoryIds, count, offset, tabs }
 *   layout    headlines  a list of story rows (title, meta, thumbnail)
 *             feature    one large story (the first after `offset`)
 *             grid       story cards in a grid
 *             standard   the publication's category block (a large story beside rows; adapts to the count)
 *             tabs       one tab per entry in `tabs` ({ label, categoryIds }), cards in a grid
 *             heading    a heading only — it titles the sections that follow it
 *   width     full | half — two consecutive half sections share a row on wide screens
 *   categoryIds  the stories come from these categories AND their sub-categories (as an archive does)
 *   count 1-12, offset 0-20 (skip the newest N in those categories)
 * Category ids are checked against the table on save; a category deleted later simply drops out.
 */
import { T } from '../config.js';
import { query } from '../db/pool.js';
import { getSetting, setSetting, SETTING } from '../db/settings.js';
import { assertValid } from './errors.js';

export const SECTION_LAYOUTS = Object.freeze([
  { value: 'headlines', label: 'Headlines list' },
  { value: 'feature', label: 'Feature story' },
  { value: 'grid', label: 'Card grid' },
  { value: 'standard', label: 'Category block' },
  { value: 'tabs', label: 'Tabs' },
  { value: 'heading', label: 'Heading only' },
]);
const LAYOUTS = SECTION_LAYOUTS.map((l) => l.value);
export const MAX_SECTIONS = 16;
const MAX_TABS = 6;

const int = (v) => (typeof v === 'number' ? v : typeof v === 'string' && /^\d+$/.test(v.trim()) ? Number(v) : NaN);
const ids = (v) => (Array.isArray(v) ? [...new Set(v.map(int).filter((n) => Number.isSafeInteger(n) && n > 0))] : []);
const text = (v, max) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');

/**
 * Validate the whole list. `known` is the Set of existing category ids.
 * Returns { ok, errors: { 'sections.N.field': message }, value: [section] }.
 */
export function validateHomepageSections(input, known) {
  const errors = {};
  const list = Array.isArray(input?.sections) ? input.sections : null;
  if (!list) return { ok: false, errors: { sections: 'Send { sections: [...] }.' }, value: [] };
  if (list.length > MAX_SECTIONS) errors.sections = `At most ${MAX_SECTIONS} sections.`;
  const value = list.slice(0, MAX_SECTIONS).map((raw, i) => {
    const at = (f, m) => {
      errors[`sections.${i}.${f}`] = m;
    };
    const layout = LAYOUTS.includes(raw?.layout) ? raw.layout : (at('layout', 'Choose a layout.'), 'standard');
    const title = text(raw?.title, 80);
    if (layout === 'heading' && !title) at('title', 'A heading needs a title.');
    const width = raw?.width === 'half' ? 'half' : 'full';
    const count = int(raw?.count);
    const offset = raw?.offset === undefined || raw?.offset === null || raw?.offset === '' ? 0 : int(raw.offset);
    if (layout !== 'heading' && !(count >= 1 && count <= 12)) at('count', 'Show 1 to 12 stories.');
    if (!(offset >= 0 && offset <= 20)) at('offset', 'Skip 0 to 20 stories.');
    const categoryIds = ids(raw?.categoryIds);
    let tabs = [];
    if (layout === 'tabs') {
      tabs = (Array.isArray(raw?.tabs) ? raw.tabs : []).slice(0, MAX_TABS).map((t, k) => {
        const label = text(t?.label, 30);
        const cids = ids(t?.categoryIds);
        if (!label) at(`tabs.${k}.label`, 'Name the tab.');
        if (!cids.length) at(`tabs.${k}.categoryIds`, 'Choose at least one category.');
        for (const c of cids) if (!known.has(c)) at(`tabs.${k}.categoryIds`, 'A chosen category no longer exists.');
        return { label, categoryIds: cids };
      });
      if (tabs.length < 2) at('tabs', 'Tabs need at least two tabs.');
    } else if (layout !== 'heading') {
      if (!categoryIds.length) at('categoryIds', 'Choose at least one category.');
      for (const c of categoryIds) if (!known.has(c)) at('categoryIds', 'A chosen category no longer exists.');
    }
    const id = typeof raw?.id === 'string' && /^[a-z0-9-]{1,40}$/i.test(raw.id) ? raw.id : `s${i + 1}`;
    return {
      id, layout, title, width,
      categoryIds: layout === 'tabs' || layout === 'heading' ? [] : categoryIds,
      count: layout === 'heading' ? 0 : count, offset: layout === 'heading' ? 0 : offset,
      tabs,
    };
  });
  const seen = new Set();
  value.forEach((s, i) => {
    if (seen.has(s.id)) s.id = `${s.id}-${i + 1}`;
    seen.add(s.id);
  });
  return { ok: !Object.keys(errors).length, errors, value };
}

async function knownCategories() {
  return new Map((await query(`SELECT id, name, slug FROM ${T.categories}`)).map((r) => [Number(r.id), { name: r.name, slug: r.slug }]));
}

/** { sections: [...], categories: [{ id, name, slug }] } — ids that no longer exist are dropped. */
export async function getHomepageSections() {
  const known = await knownCategories();
  const stored = await getSetting(SETTING.homepageSections, null);
  const sections = (stored?.sections || []).map((s) => ({
    ...s,
    categoryIds: (s.categoryIds || []).filter((id) => known.has(id)),
    tabs: (s.tabs || []).map((t) => ({ ...t, categoryIds: (t.categoryIds || []).filter((id) => known.has(id)) })),
  }));
  return { sections, configured: Boolean(stored) };
}

export async function saveHomepageSections(input) {
  const known = await knownCategories();
  const check = validateHomepageSections(input, new Set(known.keys()));
  assertValid(check);
  await setSetting(SETTING.homepageSections, { version: 1, sections: check.value });
  return getHomepageSections();
}
