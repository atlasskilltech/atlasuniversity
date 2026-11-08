'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from './api';
import MediaPicker, { thumbOf } from './MediaPicker';
import { BTN_DANGER, BTN_GHOST, BTN_PRIMARY, BTN_SECONDARY, CARD, cx, ERR, HINT, INPUT, INPUT_ERR, LABEL } from './ui';

const BLANK = { id: null, name: '', slug: '', description: '', showInMenu: false, menuOrder: '', isFeatured: false, image: null, seoTitle: '', seoDescription: '' };
const MAX_MENU = 8;

export default function CategoryManager({ items }) {
  const router = useRouter();
  const [edit, setEdit] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [picker, setPicker] = useState(false);
  const inMenu = items.filter((c) => c.showInMenu).length;

  const open = (c) => {
    setErrors({});
    setMessage(null);
    setEdit(c ? { ...BLANK, ...c, menuOrder: c.menuOrder ?? '' } : { ...BLANK });
  };
  const set = (k, v) => setEdit((p) => ({ ...p, [k]: v }));

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    const body = {
      name: edit.name, slug: edit.slug, description: edit.description, showInMenu: edit.showInMenu, menuOrder: edit.menuOrder === '' ? null : Number(edit.menuOrder),
      isFeatured: edit.isFeatured, imageMediaId: edit.image?.id || null, seoTitle: edit.seoTitle, seoDescription: edit.seoDescription,
    };
    const r = edit.id ? await api('PUT', `/categories/${edit.id}`, body) : await api('POST', '/categories', body);
    setBusy(false);
    if (!r.ok) {
      setErrors(r.data.fields || {});
      return setMessage({ ok: false, text: r.data.error || 'Could not save.' });
    }
    setMessage({ ok: true, text: r.data.redirectFrom ? `Saved. ${r.data.redirectFrom} now redirects to the new address.` : 'Saved.' });
    setEdit(null);
    router.refresh();
    return undefined;
  }

  async function remove(c) {
    if (!window.confirm(`Delete the category “${c.name}”? This cannot be undone.`)) return;
    const r = await api('DELETE', `/categories/${c.id}`);
    if (!r.ok) return setMessage({ ok: false, text: r.data.error || 'Could not delete.' });
    setMessage({ ok: true, text: `Deleted “${c.name}”.` });
    if (edit?.id === c.id) setEdit(null);
    router.refresh();
    return undefined;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0">
        {message ? (
          <div role={message.ok ? 'status' : 'alert'} className={cx('mb-4 rounded-lg border px-4 py-3 text-[14px] font-medium', message.ok ? 'border-[#b7e4c7] bg-[#e7f6ec] text-[#11733b]' : 'border-[#f1c0bc] bg-[#fdecea] text-[#b42318]')}>
            {message.text}
          </div>
        ) : null}
        <p className="mb-3 text-[13px] text-[#5b6170]">
          {inMenu} of {MAX_MENU} navigation places used. Menu order: lower numbers first.
        </p>
        <div className={cx(CARD, '!p-0 overflow-hidden')}>
          {items.length ? (
            <ul className="divide-y divide-[#eef0f3]">
              {items.map((c) => (
                <li key={c.id} className={cx('flex flex-wrap items-center gap-3 p-4', edit?.id === c.id && 'bg-[#f7f8fa]')}>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold">
                      {c.name}
                      {c.showInMenu ? <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-[11.5px] font-semibold text-[#3b4fc4]">Menu{c.menuOrder !== null ? ` · ${c.menuOrder}` : ''}</span> : null}
                      {c.isFeatured ? <span className="rounded-full bg-[#fff4e5] px-2 py-0.5 text-[11.5px] font-semibold text-[#9a5b00]">Featured</span> : null}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-[#6b7180]">
                      /news/category/{c.slug} · {c.articleCount} {c.articleCount === 1 ? 'article' : 'articles'} ({c.liveCount} live)
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button type="button" className={BTN_SECONDARY} onClick={() => open(c)}>Edit</button>
                    <button type="button" className={BTN_DANGER} onClick={() => remove(c)} disabled={c.articleCount > 0} title={c.articleCount > 0 ? 'Move its articles to another category first' : undefined}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-6 text-[14px] text-[#5b6170]">No categories yet.</p>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-[120px] lg:self-start">
        {edit ? (
          <form onSubmit={save} className={cx(CARD, 'flex flex-col gap-4')}>
            <h2 className="text-[16px] font-semibold">{edit.id ? `Edit “${edit.name || 'category'}”` : 'New category'}</h2>
            <div>
              <label className={LABEL} htmlFor="c-name">Name</label>
              <input id="c-name" value={edit.name} maxLength={200} onChange={(e) => setEdit((p) => ({ ...p, name: e.target.value, slug: p.id || p.slugTouched ? p.slug : '' }))} className={cx(INPUT, errors.name && INPUT_ERR)} />
              {errors.name ? <p className={ERR}>{errors.name}</p> : null}
            </div>
            <div>
              <label className={LABEL} htmlFor="c-slug">Slug</label>
              <input id="c-slug" value={edit.slug} maxLength={200} placeholder="made from the name if empty" onChange={(e) => setEdit((p) => ({ ...p, slug: e.target.value, slugTouched: true }))} className={cx(INPUT, 'font-mono !text-[13px]', errors.slug && INPUT_ERR)} />
              {errors.slug ? <p className={ERR}>{errors.slug}</p> : <p className={HINT}>{edit.id ? 'Changing it adds a redirect from the old category address.' : '/news/category/…'}</p>}
            </div>
            <div>
              <label className={LABEL} htmlFor="c-desc">Description</label>
              <textarea id="c-desc" rows={3} maxLength={2000} value={edit.description} onChange={(e) => set('description', e.target.value)} className={INPUT} />
            </div>
            <div className="grid grid-cols-[1fr_110px] items-end gap-3">
              <label className="flex items-center gap-2 text-[14px] font-medium">
                <input type="checkbox" checked={edit.showInMenu} onChange={(e) => set('showInMenu', e.target.checked)} className="h-4 w-4" />
                Show in navigation
              </label>
              <div>
                <label className={LABEL} htmlFor="c-order">Menu order</label>
                <input id="c-order" type="number" min={0} max={999} value={edit.menuOrder} onChange={(e) => set('menuOrder', e.target.value)} className={cx(INPUT, errors.menuOrder && INPUT_ERR)} />
              </div>
            </div>
            {errors.showInMenu ? <p className={ERR} role="alert">{errors.showInMenu}</p> : null}
            {errors.menuOrder ? <p className={ERR}>{errors.menuOrder}</p> : null}
            <label className="flex items-center gap-2 text-[14px] font-medium">
              <input type="checkbox" checked={edit.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} className="h-4 w-4" />
              Featured category
            </label>
            <div>
              <p className={LABEL}>Image</p>
              {edit.image ? (
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail */}
                  <img src={thumbOf(edit.image)} alt="" className="h-14 w-20 rounded-md object-cover" />
                  <button type="button" className={BTN_SECONDARY} onClick={() => setPicker(true)}>Change</button>
                  <button type="button" className={BTN_GHOST} onClick={() => set('image', null)}>Remove</button>
                </div>
              ) : (
                <button type="button" className={BTN_SECONDARY} onClick={() => setPicker(true)}>Choose image</button>
              )}
              {errors.imageMediaId ? <p className={ERR}>{errors.imageMediaId}</p> : null}
            </div>
            <details>
              <summary className="cursor-pointer text-[13px] font-semibold">Search settings</summary>
              <div className="mt-3 flex flex-col gap-3">
                <input aria-label="SEO title" placeholder="SEO title" maxLength={255} value={edit.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} className={INPUT} />
                <textarea aria-label="SEO description" placeholder="SEO description" rows={2} maxLength={500} value={edit.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} className={INPUT} />
              </div>
            </details>
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className={BTN_PRIMARY}>{busy ? 'Saving…' : 'Save'}</button>
              <button type="button" className={BTN_GHOST} onClick={() => setEdit(null)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className={CARD}>
            <button type="button" className={cx(BTN_PRIMARY, 'w-full')} onClick={() => open(null)}>New category</button>
            <p className={cx(HINT, 'mt-3')}>A category with articles cannot be deleted — move its articles first. At most {MAX_MENU} categories can appear in the navigation.</p>
          </div>
        )}
      </aside>
      <MediaPicker open={picker} title="Category image" onClose={() => setPicker(false)} onSelect={(m) => set('image', m)} />
    </div>
  );
}
