'use client';

import { useEffect, useState } from 'react';
import { api } from './api';
import { indent, treeOrder } from './categoryTree';
import { BTN_GHOST, BTN_PRIMARY, BTN_SECONDARY, CARD, cx, ERR, HINT, INPUT, INPUT_ERR, LABEL } from './ui';

/**
 * Homepage → Sections: the category sections the public homepage shows below the hero and Latest, in this
 * order (seeded from the old WordPress homepage by the import). Each section reads its categories AND their
 * sub-categories, newest first. Saving replaces the whole list; the homepage updates at once.
 */
const LAYOUTS = [
  ['headlines', 'Headlines list'],
  ['feature', 'Feature story'],
  ['grid', 'Card grid'],
  ['standard', 'Category block'],
  ['tabs', 'Tabs'],
  ['heading', 'Heading only'],
];
const HELP = {
  headlines: 'Story rows: headline, date, thumbnail.',
  feature: 'One large story — the first after “Skip”.',
  grid: 'Story cards in a grid.',
  standard: 'A large story beside rows, like the category pages.',
  tabs: 'One tab per row below; each tab shows cards from its categories.',
  heading: 'A heading that titles the sections after it.',
};
let seq = 0;
const blank = () => ({ id: `n${Date.now().toString(36)}${(seq += 1)}`, layout: 'headlines', title: '', width: 'full', categoryIds: [], count: 4, offset: 0, tabs: [] });

function CategoryPicker({ tree, value, onChange, invalid, id }) {
  return (
    <div id={id} className={cx('max-h-48 overflow-y-auto rounded-lg border bg-white p-2', invalid ? 'border-[#e5484d]' : 'border-[#d6d9e0]')}>
      {tree.map((c) => (
        <label key={c.id} title={c.path.join(' › ')} className={cx('flex items-center gap-2 py-0.5 text-[13.5px]', indent(c.depth))}>
          <input
            type="checkbox"
            className="h-4 w-4 shrink-0"
            checked={value.includes(c.id)}
            onChange={(e) => onChange(e.target.checked ? [...value, c.id] : value.filter((x) => x !== c.id))}
          />
          <span className="truncate">{c.label}</span>
        </label>
      ))}
    </div>
  );
}

export default function HomepageSectionsManager({ initial, categories }) {
  const [sections, setSections] = useState(initial.sections);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const tree = treeOrder(categories);
  const nameOf = new Map(tree.map((c) => [c.id, c.label]));

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = (i, patch) => {
    setSections((list) => list.map((s, k) => (k === i ? { ...s, ...patch } : s)));
    setDirty(true);
  };
  const move = (i, d) => {
    setSections((list) => {
      const next = [...list];
      [next[i], next[i + d]] = [next[i + d], next[i]];
      return next;
    });
    setDirty(true);
  };
  const remove = (i) => {
    setSections((list) => list.filter((_, k) => k !== i));
    setDirty(true);
  };
  const err = (i, f) => errors[`sections.${i}.${f}`];

  async function save() {
    setSaving(true);
    setMessage(null);
    setErrors({});
    const r = await api('PUT', '/homepage/sections', { sections });
    setSaving(false);
    if (r.ok) {
      setSections(r.data.sections);
      setDirty(false);
      setMessage({ ok: true, text: 'Saved. The homepage shows these sections now.' });
    } else {
      setErrors(r.data.fields || {});
      setMessage({ ok: false, text: r.data.error || 'Could not save.' });
    }
  }

  return (
    <section aria-labelledby="hs-title" className="mt-10">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="hs-title" className="text-[18px] font-semibold">Sections</h2>
          <p className={HINT}>Shown below the hero and Latest, in this order. Each section reads its categories and their sub-categories, newest first. Two “Half width” sections in a row sit side by side.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={BTN_SECONDARY} onClick={() => (setSections((l) => [...l, blank()]), setDirty(true))}>
            Add section
          </button>
          <button type="button" className={BTN_PRIMARY} onClick={save} disabled={saving || !dirty}>
            {saving ? 'Saving…' : 'Save sections'}
          </button>
        </div>
      </div>
      {message ? (
        <div role={message.ok ? 'status' : 'alert'} className={cx('mb-3 rounded-lg px-4 py-2.5 text-[14px]', message.ok ? 'bg-[#e7f6ec] text-[#11733b]' : 'bg-[#fdecea] text-[#b42318]')}>
          {message.text}
        </div>
      ) : null}
      {!sections.length ? <p className={cx(CARD, 'text-[14px] text-[#5b6170]')}>No sections: the homepage shows the first three navigation categories instead.</p> : null}
      <ol className="grid gap-3">
        {sections.map((s, i) => (
          <li key={s.id} data-section-id={s.id} className={CARD}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[14px] font-semibold">
                {i + 1}. {s.title || (s.layout === 'tabs' ? s.tabs.map((t) => t.label).join(' / ') : s.categoryIds.map((c) => nameOf.get(c)).filter(Boolean).join(', ')) || 'New section'}
              </p>
              <div className="flex gap-1">
                <button type="button" className={BTN_GHOST} onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move section ${i + 1} up`}>↑</button>
                <button type="button" className={BTN_GHOST} onClick={() => move(i, 1)} disabled={i === sections.length - 1} aria-label={`Move section ${i + 1} down`}>↓</button>
                <button type="button" className={BTN_GHOST} onClick={() => remove(i)} aria-label={`Remove section ${i + 1}`}>Remove</button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_160px]">
              <div>
                <label className={LABEL} htmlFor={`hs-${s.id}-layout`}>Layout</label>
                <select id={`hs-${s.id}-layout`} value={s.layout} onChange={(e) => update(i, { layout: e.target.value, tabs: e.target.value === 'tabs' && !s.tabs.length ? [{ label: '', categoryIds: [] }, { label: '', categoryIds: [] }] : s.tabs })} className={INPUT}>
                  {LAYOUTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <p className={HINT}>{HELP[s.layout]}</p>
              </div>
              <div>
                <label className={LABEL} htmlFor={`hs-${s.id}-title`}>Title {s.layout === 'heading' ? '' : <span className="font-normal text-[#6b7180]">(optional)</span>}</label>
                <input id={`hs-${s.id}-title`} maxLength={80} value={s.title} onChange={(e) => update(i, { title: e.target.value })} className={cx(INPUT, err(i, 'title') && INPUT_ERR)} />
                {err(i, 'title') ? <p className={ERR}>{err(i, 'title')}</p> : null}
              </div>
              {s.layout !== 'heading' ? (
                <div>
                  <label className={LABEL} htmlFor={`hs-${s.id}-width`}>Width</label>
                  <select id={`hs-${s.id}-width`} value={s.width} onChange={(e) => update(i, { width: e.target.value })} className={INPUT}>
                    <option value="full">Full width</option>
                    <option value="half">Half width</option>
                  </select>
                </div>
              ) : null}
            </div>
            {s.layout !== 'heading' ? (
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_120px_120px]">
                {s.layout === 'tabs' ? (
                  <div>
                    <p className={LABEL}>Tabs</p>
                    {err(i, 'tabs') ? <p className={ERR}>{err(i, 'tabs')}</p> : null}
                    <ol className="grid gap-3">
                      {s.tabs.map((t, k) => (
                        <li key={k} className="rounded-lg border border-[#e5e7eb] p-3">
                          <div className="mb-2 flex items-center gap-2">
                            <input
                              aria-label={`Tab ${k + 1} label`}
                              placeholder="Tab label"
                              maxLength={30}
                              value={t.label}
                              onChange={(e) => update(i, { tabs: s.tabs.map((x, j) => (j === k ? { ...x, label: e.target.value } : x)) })}
                              className={cx(INPUT, err(i, `tabs.${k}.label`) && INPUT_ERR)}
                            />
                            <button type="button" className={BTN_GHOST} onClick={() => update(i, { tabs: s.tabs.filter((_, j) => j !== k) })}>Remove</button>
                          </div>
                          <CategoryPicker tree={tree} value={t.categoryIds} invalid={err(i, `tabs.${k}.categoryIds`)} onChange={(v) => update(i, { tabs: s.tabs.map((x, j) => (j === k ? { ...x, categoryIds: v } : x)) })} />
                          {err(i, `tabs.${k}.label`) || err(i, `tabs.${k}.categoryIds`) ? <p className={ERR}>{err(i, `tabs.${k}.label`) || err(i, `tabs.${k}.categoryIds`)}</p> : null}
                        </li>
                      ))}
                    </ol>
                    {s.tabs.length < 6 ? (
                      <button type="button" className={cx(BTN_SECONDARY, 'mt-2')} onClick={() => update(i, { tabs: [...s.tabs, { label: '', categoryIds: [] }] })}>Add tab</button>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <p className={LABEL} id={`hs-${s.id}-cats-label`}>Categories</p>
                    <CategoryPicker id={`hs-${s.id}-cats`} tree={tree} value={s.categoryIds} invalid={err(i, 'categoryIds')} onChange={(v) => update(i, { categoryIds: v })} />
                    {err(i, 'categoryIds') ? <p className={ERR}>{err(i, 'categoryIds')}</p> : null}
                  </div>
                )}
                <div>
                  <label className={LABEL} htmlFor={`hs-${s.id}-count`}>Stories</label>
                  <input id={`hs-${s.id}-count`} type="number" min={1} max={12} value={s.count} onChange={(e) => update(i, { count: e.target.value === '' ? '' : Number(e.target.value) })} className={cx(INPUT, err(i, 'count') && INPUT_ERR)} />
                  {err(i, 'count') ? <p className={ERR}>{err(i, 'count')}</p> : null}
                </div>
                <div>
                  <label className={LABEL} htmlFor={`hs-${s.id}-offset`}>Skip newest</label>
                  <input id={`hs-${s.id}-offset`} type="number" min={0} max={20} value={s.offset} onChange={(e) => update(i, { offset: e.target.value === '' ? '' : Number(e.target.value) })} className={cx(INPUT, err(i, 'offset') && INPUT_ERR)} />
                  {err(i, 'offset') ? <p className={ERR}>{err(i, 'offset')}</p> : null}
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
