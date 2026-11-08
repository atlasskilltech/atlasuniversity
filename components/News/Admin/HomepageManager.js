'use client';

import { useEffect, useState } from 'react';
import { api } from './api';
import { BTN_GHOST, BTN_PRIMARY, BTN_SECONDARY, CARD, cx, ERR, INPUT, StateBadge } from './ui';

/**
 * Homepage curation. Each article can occupy ONE slot across the whole homepage: adding an article that
 * is already placed is refused here with the same message the server gives (the server, and the table's
 * UNIQUE key, enforce it regardless). "Latest" and the category sections fill themselves from the newest
 * stories; only the areas below are curated. Editor's Picks is curated by hand — it is not a popularity list.
 */
/* What the public homepage does with an EMPTY area. Only the hero tops itself up with the newest stories;
   Featured and Editor's Picks are curated or not shown at all — never filled automatically. */
const EMPTY_NOTE = {
  hero_centre: 'Empty — the newest story leads.',
  hero_left: 'Empty — filled with the newest stories.',
  hero_right: 'Empty — filled with the newest stories.',
  featured: 'Empty — the Featured block is not shown.',
  picks: "Empty — Editor's Picks is not shown on the homepage.",
};

export default function HomepageManager({ initial }) {
  const toState = (data) => Object.fromEntries(data.zones.map((z) => [z.zone, z.items]));
  const [zones, setZones] = useState(() => toState(initial));
  const meta = initial.zones;
  const [target, setTarget] = useState(meta[0].zone);
  const [q, setQ] = useState('');
  const [results, setResults] = useState(initial.candidates || []);
  const [searching, setSearching] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const labelOf = (zone) => meta.find((z) => z.zone === zone)?.label || zone;
  const whereIs = (id) => Object.entries(zones).find(([, items]) => items.some((a) => a.id === id))?.[0] || null;

  async function search(query) {
    setSearching(true);
    const r = await api('GET', `/homepage/candidates?q=${encodeURIComponent(query)}`);
    setSearching(false);
    if (r.ok) setResults(r.data.items);
    else setMessage({ ok: false, text: r.data.error || 'Search failed.' });
  }
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function add(article) {
    setErrors({});
    const zoneMeta = meta.find((z) => z.zone === target);
    const at = whereIs(article.id);
    if (at) {
      setErrors({ [target]: `“${article.title}” is already placed in ${labelOf(at)}. An article can occupy only one homepage slot — remove it there first.` });
      return;
    }
    if (zones[target].length >= zoneMeta.max) {
      setErrors({ [target]: `${zoneMeta.label} holds at most ${zoneMeta.max} ${zoneMeta.max === 1 ? 'article' : 'articles'}. Remove one first.` });
      return;
    }
    setZones((p) => ({ ...p, [target]: [...p[target], article] }));
    setDirty(true);
  }
  function remove(zone, id) {
    setZones((p) => ({ ...p, [zone]: p[zone].filter((a) => a.id !== id) }));
    setDirty(true);
  }
  function move(zone, i, d) {
    setZones((p) => {
      const list = [...p[zone]];
      const j = i + d;
      if (j < 0 || j >= list.length) return p;
      [list[i], list[j]] = [list[j], list[i]];
      return { ...p, [zone]: list };
    });
    setDirty(true);
  }

  async function save() {
    setSaving(true);
    setErrors({});
    setMessage(null);
    const body = { zones: Object.fromEntries(Object.entries(zones).map(([z, items]) => [z, items.map((a) => a.id)])) };
    const r = await api('PUT', '/homepage', body);
    setSaving(false);
    if (!r.ok) {
      setErrors(r.data.fields || {});
      return setMessage({ ok: false, text: r.data.error || 'Could not save.' });
    }
    setZones(toState(r.data));
    setDirty(false);
    setMessage({ ok: true, text: 'Homepage saved. The live homepage updates within a minute.' });
    search(q);
    return undefined;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="flex min-w-0 flex-col gap-4">
        {message ? (
          <div role={message.ok ? 'status' : 'alert'} className={cx('rounded-lg border px-4 py-3 text-[14px] font-medium', message.ok ? 'border-[#b7e4c7] bg-[#e7f6ec] text-[#11733b]' : 'border-[#f1c0bc] bg-[#fdecea] text-[#b42318]')}>
            {message.text}
          </div>
        ) : null}
        {meta.map((z) => (
          <section key={z.zone} className={cx(CARD, '!p-4', target === z.zone && 'ring-2 ring-[#3b5bdb]/40')} aria-labelledby={`zone-${z.zone}`}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 id={`zone-${z.zone}`} className="text-[15px] font-semibold">
                {z.label} <span className="font-normal text-[#6b7180]">({zones[z.zone].length}/{z.max})</span>
              </h2>
              <button type="button" className={target === z.zone ? BTN_PRIMARY : BTN_SECONDARY} onClick={() => setTarget(z.zone)} aria-pressed={target === z.zone}>
                {target === z.zone ? 'Adding here' : 'Add here'}
              </button>
            </div>
            {zones[z.zone].length ? (
              <ol className="divide-y divide-[#eef0f3]">
                {zones[z.zone].map((a, i) => (
                  <li key={a.id} className="flex items-center gap-3 py-2">
                    <span className="w-5 shrink-0 text-center text-[13px] font-semibold text-[#9aa0ac]">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium">{a.title}</p>
                      <div className="mt-0.5">
                        <StateBadge state={a.state} />
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-0.5">
                      <button type="button" className={BTN_GHOST} aria-label="Move up" disabled={i === 0} onClick={() => move(z.zone, i, -1)}>↑</button>
                      <button type="button" className={BTN_GHOST} aria-label="Move down" disabled={i === zones[z.zone].length - 1} onClick={() => move(z.zone, i, 1)}>↓</button>
                      <button type="button" className={BTN_GHOST} aria-label={`Remove ${a.title}`} onClick={() => remove(z.zone, a.id)}>✕</button>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-[13px] text-[#6b7180]">{EMPTY_NOTE[z.zone]}</p>
            )}
            {errors[z.zone] ? <p className={ERR} role="alert">{errors[z.zone]}</p> : null}
          </section>
        ))}
        <div className="flex items-center gap-3">
          <button type="button" className={BTN_PRIMARY} disabled={saving || !dirty} onClick={save}>{saving ? 'Saving…' : 'Save homepage'}</button>
          {dirty ? <span className="text-[13px] font-medium text-[#9a5b00]">Unsaved changes</span> : null}
        </div>
      </div>

      <aside className={cx(CARD, '!p-4 lg:sticky lg:top-[120px] lg:self-start')}>
        <h2 className="text-[15px] font-semibold">Add to: {labelOf(target)}</h2>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            search(q);
          }}
        >
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search published articles…" className={INPUT} aria-label="Search articles" />
          <button type="submit" className={BTN_SECONDARY} disabled={searching}>Search</button>
        </form>
        <ul className="mt-3 max-h-[60dvh] divide-y divide-[#eef0f3] overflow-y-auto">
          {results.map((a) => {
            const at = whereIs(a.id);
            return (
              <li key={a.id} className="flex items-center gap-2 py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium">{a.title}</p>
                  <p className="text-[12px] text-[#6b7180]">{at ? `On the homepage · ${labelOf(at)}` : a.state === 'scheduled' ? 'Scheduled' : 'Live'}</p>
                </div>
                <button type="button" className={BTN_SECONDARY} onClick={() => add(a)} disabled={Boolean(at)} title={at ? `Already in ${labelOf(at)}` : undefined}>
                  Add
                </button>
              </li>
            );
          })}
          {!results.length && !searching ? <li className="py-3 text-[13px] text-[#6b7180]">No published or scheduled articles{q ? ' match' : ''}.</li> : null}
        </ul>
        <p className="mt-3 text-[12.5px] leading-[1.5] text-[#6b7180]">Only published or scheduled articles can be placed. Each article can appear in one slot only.</p>
      </aside>
    </div>
  );
}
