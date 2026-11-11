'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { api } from './api';
import { indent, treeOrder } from './categoryTree';
import MediaPicker, { articleSrcOf, thumbOf } from './MediaPicker';
import RichEditor from './RichEditor';
import { BTN_DANGER, BTN_GHOST, BTN_PRIMARY, BTN_SECONDARY, CARD, cx, ERR, formatDateTime, HINT, INPUT, INPUT_ERR, LABEL, StateBadge } from './ui';

/* The newsroom's clock is IST. The date field is entered and shown in IST whatever the browser's own
   time zone, and sent to the server with an explicit +05:30 offset (stored as UTC). */
const IST_MS = 330 * 60 * 1000;
const isoToIst = (iso) => (iso ? new Date(Date.parse(iso) + IST_MS).toISOString().slice(0, 16) : '');
const istToIso = (v) => (v ? `${v}+05:30` : null);

const slugFrom = (s) =>
  String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120).replace(/-+$/, '');

const EMPTY = {
  title: '', slug: '', excerpt: '', contentHtml: '', status: 'draft', publishedAt: '', featuredMedia: null, ogMedia: null,
  categoryIds: [], primaryCategoryId: null, authorName: 'ATLAS News Desk', seoTitle: '', seoDescription: '', canonicalUrl: '',
};

function Field({ label, htmlFor, hint, error, children }) {
  return (
    <div>
      {label ? <label className={LABEL} htmlFor={htmlFor}>{label}</label> : null}
      {children}
      {error ? <p className={ERR} role="alert">{error}</p> : hint ? <p className={HINT}>{hint}</p> : null}
    </div>
  );
}

function ImageField({ label, media, onPick, onClear, hint }) {
  return (
    <div>
      <p className={LABEL}>{label}</p>
      {media ? (
        <div className="overflow-hidden rounded-lg border border-[#e3e5ea]">
          {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail */}
          <img src={thumbOf(media)} alt="" className="aspect-[16/10] w-full bg-[#eef0f3] object-cover" />
          <div className="flex gap-2 p-2">
            <button type="button" className={BTN_SECONDARY} onClick={onPick}>Change</button>
            <button type="button" className={BTN_GHOST} onClick={onClear}>Remove</button>
          </div>
        </div>
      ) : (
        <button type="button" className={cx(BTN_SECONDARY, 'w-full')} onClick={onPick}>Choose image</button>
      )}
      {hint ? <p className={HINT}>{hint}</p> : null}
    </div>
  );
}

/**
 * Props: initial (article from getArticle, or null for a new one), categories [{ id, name }].
 */
export default function ArticleForm({ initial, categories }) {
  const router = useRouter();
  const isNew = !initial;
  const start = useMemo(() => (initial ? { ...EMPTY, ...initial, publishedAt: isoToIst(initial.publishedAt) } : EMPTY), [initial]);
  const [f, setF] = useState(start);
  const [version, setVersion] = useState(initial?.updatedAt || null);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [mediaMeta, setMediaMeta] = useState({ alt: initial?.featuredMedia?.alt || '', caption: initial?.featuredMedia?.caption || '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // { tone: 'ok'|'error'|'warn', text }
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [picker, setPicker] = useState(null); // 'featured' | 'og' | { insert }

  const set = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    setDirty(true);
  };

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function toggleCategory(id) {
    setF((p) => {
      const has = p.categoryIds.includes(id);
      const categoryIds = has ? p.categoryIds.filter((c) => c !== id) : [...p.categoryIds, id];
      let primaryCategoryId = p.primaryCategoryId;
      if (has && primaryCategoryId === id) primaryCategoryId = categoryIds[0] || null;
      if (!has && !primaryCategoryId) primaryCategoryId = id;
      return { ...p, categoryIds, primaryCategoryId };
    });
    setDirty(true);
  }

  async function save(statusOverride) {
    setSaving(true);
    setErrors({});
    setMessage(null);
    const status = statusOverride || f.status;
    /* featured image alt/caption live on the media record (shared by every use of the image) */
    if (f.featuredMedia && (mediaMeta.alt !== (f.featuredMedia.alt || '') || mediaMeta.caption !== (f.featuredMedia.caption || ''))) {
      const m = await api('PATCH', `/media/${f.featuredMedia.id}`, mediaMeta);
      if (!m.ok) {
        setSaving(false);
        return setMessage({ tone: 'error', text: `The image text could not be saved: ${m.data.error || 'error'}` });
      }
      setF((p) => ({ ...p, featuredMedia: m.data.media }));
    }
    const article = {
      title: f.title,
      slug: f.slug,
      excerpt: f.excerpt,
      contentHtml: f.contentHtml,
      status,
      publishedAt: istToIso(f.publishedAt),
      featuredMediaId: f.featuredMedia?.id || null,
      ogMediaId: f.ogMedia?.id || null,
      categoryIds: f.categoryIds,
      primaryCategoryId: f.primaryCategoryId,
      authorName: f.authorName,
      seoTitle: f.seoTitle,
      seoDescription: f.seoDescription,
      canonicalUrl: f.canonicalUrl,
    };
    const r = isNew ? await api('POST', '/articles', article) : await api('PUT', `/articles/${initial.id}`, { article, updatedAt: version });
    setSaving(false);
    if (!r.ok) {
      setErrors(r.data.fields || {});
      return setMessage({ tone: r.data.code === 'edit_conflict' ? 'warn' : 'error', text: r.data.error || 'Could not save.' });
    }
    setDirty(false);
    if (isNew) {
      router.replace(`/news/admin/articles/${r.data.id}?saved=1`);
      router.refresh();
      return undefined;
    }
    setVersion(r.data.updatedAt);
    setF((p) => ({ ...p, status, slug: r.data.slug }));
    const notes = ['Saved.'];
    if (r.data.redirectFrom) notes.push(`The old address ${r.data.redirectFrom} now redirects here.`);
    if (r.data.removedFromHomepage) notes.push('As a draft it was taken off the homepage.');
    setMessage({ tone: 'ok', text: notes.join(' ') });
    router.refresh();
    return undefined;
  }

  async function action(method, path, confirmText, after) {
    if (confirmText && !window.confirm(confirmText)) return;
    const r = await api(method, path);
    if (!r.ok) return setMessage({ tone: 'error', text: r.data.error || 'Failed.' });
    after(r.data);
  }

  const live = initial?.state === 'live';
  const tone = { ok: 'border-[#b7e4c7] bg-[#e7f6ec] text-[#11733b]', error: 'border-[#f1c0bc] bg-[#fdecea] text-[#b42318]', warn: 'border-[#f5d9a8] bg-[#fff8eb] text-[#7a4b00]' };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link href="/news/admin/articles" className="text-[13px] font-medium text-[#5b6170] hover:text-[#14161a]">← Articles</Link>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h1 className="truncate text-[22px] font-semibold leading-[1.3]">{isNew ? 'New article' : 'Edit article'}</h1>
            {initial ? <StateBadge state={initial.state} /> : null}
            {dirty ? <span className="text-[12.5px] font-medium text-[#9a5b00]">Unsaved changes</span> : null}
          </div>
        </div>
        {!isNew ? (
          <div className="flex flex-wrap gap-2">
            <a href={`/news/admin/preview/${initial.id}`} target="_blank" rel="noopener noreferrer" className={BTN_SECONDARY} title={dirty ? 'Preview shows the last saved version' : undefined}>
              Preview{dirty ? ' (saved version)' : ''}
            </a>
            {live ? <a href={`/news/${f.slug}`} target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>View live ↗</a> : null}
            <button type="button" className={BTN_GHOST} onClick={() => action('POST', `/articles/${initial.id}/duplicate`, null, (d) => router.push(`/news/admin/articles/${d.id}`))}>Duplicate</button>
            <button type="button" className={BTN_DANGER} onClick={() => action('DELETE', `/articles/${initial.id}`, 'Move this article to Trash? It will be taken off the site and the homepage. You can restore it later (as a draft).', () => { setDirty(false); router.push('/news/admin/articles?filter=trash'); })}>Trash</button>
          </div>
        ) : null}
      </div>

      {message ? (
        <div role={message.tone === 'ok' ? 'status' : 'alert'} className={cx('mb-4 rounded-lg border px-4 py-3 text-[14px] font-medium', tone[message.tone])}>
          {message.text}
          {message.tone === 'warn' ? (
            <button type="button" className="ml-2 underline" onClick={() => window.location.reload()}>Reload</button>
          ) : null}
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]"
      >
        <div className="flex min-w-0 flex-col gap-5">
          <div className={cx(CARD, 'flex flex-col gap-4')}>
            <Field label="Title" htmlFor="title" error={errors.title}>
              <input
                id="title"
                value={f.title}
                maxLength={500}
                onChange={(e) => {
                  const title = e.target.value;
                  setF((p) => ({ ...p, title, slug: slugTouched ? p.slug : slugFrom(title) }));
                  setDirty(true);
                }}
                className={cx(INPUT, '!text-[18px] font-semibold', errors.title && INPUT_ERR)}
              />
            </Field>
            <Field
              label="Slug (URL)"
              htmlFor="slug"
              error={errors.slug}
              hint={live ? `atlasuniversity.edu.in/news/${f.slug || '…'} — this article is live: changing the slug adds a redirect from the old address.` : `atlasuniversity.edu.in/news/${f.slug || '…'}`}
            >
              <input
                id="slug"
                value={f.slug}
                maxLength={400}
                onChange={(e) => {
                  setSlugTouched(true);
                  set('slug', e.target.value);
                }}
                className={cx(INPUT, 'font-mono !text-[13px]', errors.slug && INPUT_ERR)}
              />
            </Field>
            <Field label="Excerpt" htmlFor="excerpt" error={errors.excerpt} hint="Shown under the headline and on story cards. One or two sentences.">
              <textarea id="excerpt" rows={3} maxLength={1000} value={f.excerpt} onChange={(e) => set('excerpt', e.target.value)} className={cx(INPUT, errors.excerpt && INPUT_ERR)} />
            </Field>
          </div>

          <div>
            <p className={LABEL}>Body</p>
            <RichEditor
              id="body"
              value={f.contentHtml}
              onChange={(html) => set('contentHtml', html)}
              invalid={Boolean(errors.contentHtml)}
              onPickImage={(insert) => setPicker({ insert })}
            />
            {errors.contentHtml ? <p className={ERR} role="alert">{errors.contentHtml}</p> : <p className={HINT}>Headings H2–H6 (the title is the page heading). Pasted H1 headings become H2.</p>}
          </div>

          <details className={CARD}>
            <summary className="cursor-pointer text-[15px] font-semibold">Search &amp; sharing</summary>
            <div className="mt-4 flex flex-col gap-4">
              <Field label="SEO title" htmlFor="seoTitle" error={errors.seoTitle} hint="Defaults to the article title. About 60 characters shows in full in search results.">
                <input id="seoTitle" maxLength={255} value={f.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} className={INPUT} />
              </Field>
              <Field label="SEO description" htmlFor="seoDescription" error={errors.seoDescription} hint="Defaults to the excerpt. About 155 characters.">
                <textarea id="seoDescription" rows={2} maxLength={500} value={f.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} className={INPUT} />
              </Field>
              <Field label="Canonical URL" htmlFor="canonicalUrl" error={errors.canonicalUrl} hint="Leave empty to use this article's own address. Only set it when the article is a copy of a page elsewhere.">
                <input id="canonicalUrl" maxLength={600} value={f.canonicalUrl} onChange={(e) => set('canonicalUrl', e.target.value)} placeholder="https://…" className={cx(INPUT, errors.canonicalUrl && INPUT_ERR)} />
              </Field>
              <ImageField label="Social sharing image" media={f.ogMedia} onPick={() => setPicker('og')} onClear={() => set('ogMedia', null)} hint="Defaults to the featured image." />
              {errors.ogMediaId ? <p className={ERR}>{errors.ogMediaId}</p> : null}
            </div>
          </details>
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-[120px] lg:self-start">
          <div className={cx(CARD, 'flex flex-col gap-4')}>
            <fieldset>
              <legend className={LABEL}>Status</legend>
              <div className="grid grid-cols-3 gap-1 rounded-lg bg-[#f1f2f4] p-1">
                {[['draft', 'Draft'], ['scheduled', 'Scheduled'], ['published', 'Published']].map(([v, l]) => (
                  <label key={v} className={cx('cursor-pointer rounded-md py-1.5 text-center text-[13px] font-semibold transition', f.status === v ? 'bg-white shadow-sm' : 'text-[#5b6170]')}>
                    <input type="radio" name="status" value={v} checked={f.status === v} onChange={() => set('status', v)} className="sr-only" />
                    {l}
                  </label>
                ))}
              </div>
              {errors.status ? <p className={ERR}>{errors.status}</p> : null}
            </fieldset>
            <Field
              label={f.status === 'scheduled' ? 'Publish on (IST)' : 'Publication date (IST)'}
              htmlFor="publishedAt"
              error={errors.publishedAt}
              hint={f.status === 'published' ? 'Leave empty to use the moment you save.' : f.status === 'scheduled' ? 'Goes live automatically at this time (within a minute).' : 'Optional for a draft.'}
            >
              <input id="publishedAt" type="datetime-local" value={f.publishedAt} onChange={(e) => set('publishedAt', e.target.value)} className={cx(INPUT, errors.publishedAt && INPUT_ERR)} />
            </Field>
            <button type="submit" disabled={saving} className={cx(BTN_PRIMARY, 'w-full')}>
              {saving ? 'Saving…' : f.status === 'draft' ? 'Save draft' : f.status === 'scheduled' ? 'Save & schedule' : live ? 'Update' : 'Publish'}
            </button>
            {initial ? (
              <p className="text-[12.5px] leading-[1.5] text-[#6b7180]">
                Last saved {formatDateTime(version)}
                {initial.legacyWpId ? ` · imported from WordPress (#${initial.legacyWpId})` : ''}
              </p>
            ) : null}
            {initial?.homepage ? (
              <p className="rounded-lg bg-[#fff4e5] px-3 py-2 text-[12.5px] font-medium text-[#9a5b00]">
                On the homepage: {initial.homepage.label}. <Link href="/news/admin/homepage" className="underline">Manage</Link>
              </p>
            ) : null}
          </div>

          <div className={cx(CARD, 'flex flex-col gap-3')}>
            <p className={LABEL}>Categories</p>
            {categories.length ? (
              <ul className="max-h-[260px] space-y-1 overflow-y-auto pr-1">
                {treeOrder(categories).map((c) => {
                  const on = f.categoryIds.includes(c.id);
                  return (
                    <li key={c.id} className="flex items-center justify-between gap-2">
                      <label data-category-depth={c.depth} className={cx('flex min-w-0 items-center gap-2 text-[14px]', indent(c.depth))}>
                        <input type="checkbox" checked={on} onChange={() => toggleCategory(c.id)} className="h-4 w-4" />
                        <span className="truncate" title={c.path.join(' › ')}>{c.label}</span>
                      </label>
                      {on ? (
                        <label className={cx('shrink-0 cursor-pointer rounded-full px-2 py-0.5 text-[11.5px] font-semibold', f.primaryCategoryId === c.id ? 'bg-[#14161a] text-white' : 'text-[#6b7180] hover:bg-[#eef0f3]')}>
                          <input type="radio" name="primary" className="sr-only" checked={f.primaryCategoryId === c.id} onChange={() => set('primaryCategoryId', c.id)} />
                          {f.primaryCategoryId === c.id ? 'Main' : 'Make main'}
                        </label>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-[13px] text-[#5b6170]">No categories yet. <Link href="/news/admin/categories" className="underline">Create one</Link>.</p>
            )}
            {errors.categoryIds ? <p className={ERR} role="alert">{errors.categoryIds}</p> : <p className={HINT}>The main category is shown on the article and in its URL breadcrumb.</p>}
          </div>

          <div className={cx(CARD, 'flex flex-col gap-3')}>
            <ImageField label="Featured image" media={f.featuredMedia} onPick={() => setPicker('featured')} onClear={() => set('featuredMedia', null)} />
            {errors.featuredMediaId ? <p className={ERR}>{errors.featuredMediaId}</p> : null}
            {f.featuredMedia ? (
              <>
                <Field label="Alt text" htmlFor="falt" hint="Saved to the media library, so it applies wherever this image is used.">
                  <input id="falt" maxLength={500} value={mediaMeta.alt} onChange={(e) => { setMediaMeta((m) => ({ ...m, alt: e.target.value })); setDirty(true); }} className={INPUT} />
                </Field>
                <Field label="Caption" htmlFor="fcap">
                  <input id="fcap" maxLength={2000} value={mediaMeta.caption} onChange={(e) => { setMediaMeta((m) => ({ ...m, caption: e.target.value })); setDirty(true); }} className={INPUT} />
                </Field>
              </>
            ) : null}
          </div>

          <div className={CARD}>
            <Field label="Author" htmlFor="authorName" error={errors.authorName} hint="Defaults to ATLAS News Desk.">
              <input id="authorName" maxLength={150} value={f.authorName} onChange={(e) => set('authorName', e.target.value)} className={INPUT} />
            </Field>
          </div>
        </aside>
      </form>

      <MediaPicker
        open={Boolean(picker)}
        title={picker === 'og' ? 'Social sharing image' : picker === 'featured' ? 'Featured image' : 'Insert an image'}
        onClose={() => setPicker(null)}
        onSelect={(m) => {
          if (picker === 'featured') {
            set('featuredMedia', m);
            setMediaMeta({ alt: m.alt || '', caption: m.caption || '' });
          } else if (picker === 'og') set('ogMedia', m);
          else if (picker?.insert) picker.insert({ src: articleSrcOf(m), alt: m.alt || '' });
        }}
      />
    </div>
  );
}
