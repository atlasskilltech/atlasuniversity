/**
 * Builders for the sample article bodies.
 *
 * They emit exactly the HTML vocabulary lib/news/content/sanitize.js allows — the vocabulary the Stage 3
 * editor and the Stage 4 WordPress conversion will store in `atlasnews_posts.content_html` — so the
 * public article renderer is written once against stored HTML and never needs a fixture-only code path.
 * Classes used: news-pullquote, news-gallery, news-gallery-item, is-cols-2/3, align-wide.
 */
import { optimizedImageUrl, optimizedSrcSet, resolveMedia } from '../../../../lib/news/public/images.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const p = (html) => `<p>${html}</p>`;
export const h2 = (text) => `<h2>${esc(text)}</h2>`;
export const h3 = (text) => `<h3>${esc(text)}</h3>`;
export const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
export const ol = (items) => `<ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>`;

/** A pull quote; `cite` names a role, never an invented named person. */
export const quote = (text, cite) =>
  `<blockquote class="news-pullquote"><p>${esc(text)}</p>${cite ? `<cite>${esc(cite)}</cite>` : ''}</blockquote>`;

function img(media, sizes) {
  const r = resolveMedia(media);
  return `<img src="${esc(optimizedImageUrl(r.src, 1200))}" srcset="${esc(optimizedSrcSet(r.src, r.width))}" sizes="${esc(sizes)}" alt="${esc(r.alt)}" width="${r.width}" height="${r.height}" loading="lazy" decoding="async">`;
}

/** A single figure. `wide` lets it break out of the text column on large screens. */
export const figure = (media, caption, { wide = false } = {}) =>
  `<figure${wide ? ' class="align-wide"' : ''}>${img(media, wide ? '(min-width: 1100px) 1040px, 100vw' : '(min-width: 760px) 720px, 100vw')}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}</figure>`;

/** A gallery of 2 or 3 columns, each item with an optional caption, plus an optional gallery caption. */
export const gallery = (items, { cols = 3, caption } = {}) => {
  const sizes = cols === 2 ? '(min-width: 1100px) 520px, 50vw' : '(min-width: 1100px) 345px, 33vw';
  const cells = items
    .map(([media, cap]) => `<figure class="news-gallery-item">${img(media, sizes)}${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`)
    .join('');
  return `<div class="news-gallery is-cols-${cols}">${cells}${caption ? `<p>${esc(caption)}</p>` : ''}</div>`;
};

export const body = (...parts) => parts.join('\n');
