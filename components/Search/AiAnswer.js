import { Fragment } from 'react';

/**
 * Renders an AI Search answer (Markdown from the model) as React elements.
 *
 * Replaces the reference's `parseMarkdown()` (search.php:904-961), which built
 * an HTML string with regexes and assigned it to `innerHTML`. Nothing here
 * produces HTML from text: every node is a React element, so markup the model
 * might emit is shown as literal text, never parsed.
 *
 * Supported, matching what the legacy parser handled and what the prompt asks
 * the model to use: `#`/`##`/`###` headings, paragraphs (single newlines become
 * <br>), `-`/`*`/`+` and `1.` lists (one level of nesting), `>` quotes, `---`
 * rules, and inline **bold**, __bold__, *italic*, _italic_, `code` and
 * [text](url) links.
 *
 * Links: the prompt allows only atlasuniversity.edu.in, and that is enforced
 * here rather than trusted — an http(s) link to any other host, a
 * `javascript:`/`data:` URL or anything unparsable is rendered as its plain
 * text. `mailto:` and `tel:` are kept (the prompt asks for contact details).
 * ATLAS links open in a new tab, as the reference's did.
 *
 * Styling is the reference's own `.ai-response-text` rules (search.php:289-417).
 */

const ALLOWED_HOSTS = new Set(['atlasuniversity.edu.in', 'www.atlasuniversity.edu.in']);

export function safeHref(raw) {
  let url;
  try {
    url = new URL(String(raw).trim(), 'https://atlasuniversity.edu.in');
  } catch {
    return null;
  }
  if (url.protocol === 'mailto:' || url.protocol === 'tel:') {
    return { href: url.href, newTab: false };
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  if (!ALLOWED_HOSTS.has(url.hostname.toLowerCase())) return null;
  url.protocol = 'https:';
  return { href: url.href, newTab: true };
}

/* ── inline ─────────────────────────────────────────────────────────────── */

const INLINE = [
  { type: 'code', re: /`([^`\n]+)`/ },
  { type: 'link', re: /\[([^\]\n]+)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/ },
  { type: 'strong', re: /\*\*(?!\s)([^\n]+?)\*\*/ },
  { type: 'strong', re: /__(?!\s)([^\n]+?)__/ },
  { type: 'em', re: /\*(?![\s*])([^*\n]+?)\*/ },
  { type: 'em', re: /(?<![\w])_(?![\s_])([^_\n]+?)_(?![\w])/ },
];

function renderInline(text, keyBase = 'i') {
  const out = [];
  let rest = text;
  let n = 0;

  while (rest) {
    let best = null;
    for (const pattern of INLINE) {
      const m = pattern.re.exec(rest);
      if (m && (!best || m.index < best.m.index)) best = { pattern, m };
    }
    if (!best) {
      out.push(rest);
      break;
    }

    const { pattern, m } = best;
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const key = `${keyBase}-${n++}`;

    if (pattern.type === 'code') {
      out.push(
        <code key={key} className="rounded bg-[#f1f5f9] px-2 py-[3px] font-mono text-sm text-[#e53e3e]">
          {m[1]}
        </code>,
      );
    } else if (pattern.type === 'link') {
      const safe = safeHref(m[2]);
      const label = renderInline(m[1], key);
      out.push(
        safe ? (
          <a
            key={key}
            href={safe.href}
            {...(safe.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="rounded border-b-2 border-transparent px-1 py-0.5 font-semibold text-[#667eea] no-underline transition-all duration-300 hover:border-[#667eea] hover:bg-[#e0e7ff]"
          >
            {label}
          </a>
        ) : (
          <Fragment key={key}>{label}</Fragment>
        ),
      );
    } else if (pattern.type === 'strong') {
      out.push(
        <strong key={key} className="font-bold text-[#1a202c]">
          {renderInline(m[1], key)}
        </strong>,
      );
    } else {
      out.push(
        <em key={key} className="italic text-[#4a5568]">
          {renderInline(m[1], key)}
        </em>,
      );
    }

    rest = rest.slice(m.index + m[0].length);
  }

  return out;
}

/* ── blocks ─────────────────────────────────────────────────────────────── */

const RE = {
  heading: /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/,
  hr: /^\s{0,3}([-*_])(\s*\1){2,}\s*$/,
  ul: /^(\s*)[-*+]\s+(.*)$/,
  ol: /^(\s*)\d{1,3}[.)]\s+(.*)$/,
  quote: /^\s{0,3}>\s?(.*)$/,
};

export function parseBlocks(markdown) {
  const lines = String(markdown || '').replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  let para = null;
  let list = null;

  const closePara = () => {
    if (para) blocks.push({ type: 'p', lines: para });
    para = null;
  };
  const closeList = () => {
    if (list) blocks.push(list);
    list = null;
  };

  for (const line of lines) {
    if (!line.trim()) {
      closePara();
      closeList();
      continue;
    }

    let m;
    if ((m = RE.hr.exec(line))) {
      closePara();
      closeList();
      blocks.push({ type: 'hr' });
    } else if ((m = RE.heading.exec(line))) {
      closePara();
      closeList();
      blocks.push({ type: 'h', level: Math.min(m[1].length, 3), text: m[2] });
    } else if ((m = RE.ul.exec(line)) || (m = RE.ol.exec(line))) {
      closePara();
      const kind = RE.ul.test(line) ? 'ul' : 'ol';
      const indent = m[1].replace(/\t/g, '  ').length;
      const item = { text: m[2], children: null };

      if (list && indent >= 2 && list.items.length) {
        const parent = list.items[list.items.length - 1];
        if (!parent.children) parent.children = { type: kind, items: [] };
        parent.children.items.push(item);
      } else if (list && list.type === kind) {
        list.items.push(item);
      } else {
        closeList();
        list = { type: kind, items: [item] };
      }
    } else if ((m = RE.quote.exec(line))) {
      closePara();
      closeList();
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'quote') last.lines.push(m[1]);
      else blocks.push({ type: 'quote', lines: [m[1]] });
    } else if (list && /^\s{2,}\S/.test(line) && list.items.length) {
      // a wrapped continuation of the previous list item
      const items = list.items;
      const target = items[items.length - 1];
      target.text += ` ${line.trim()}`;
    } else {
      closeList();
      if (!para) para = [];
      para.push(line.trim());
    }
  }
  closePara();
  closeList();
  return blocks;
}

const H = {
  1: 'mb-3 mt-6 border-b-[3px] border-[#667eea] pb-2 text-2xl font-bold text-[#1a202c]',
  2: 'mb-3 mt-6 text-xl font-bold text-[#667eea]',
  3: 'mb-3 mt-6 text-lg font-bold text-[#4a5568]',
};

/* ul: no markers, a ✓ before each item (ref `.ai-response-text ul li:before`). */
const UL = 'my-4 list-none pl-[30px]';
const UL_LI =
  "relative my-3 pl-[25px] leading-[1.6] before:absolute before:left-0 before:text-base before:font-bold before:text-[#667eea] before:content-['✓']";
const OL = 'my-4 list-decimal pl-[30px] marker:font-bold marker:text-[#667eea]';
const OL_LI = 'my-3 pl-2.5 leading-[1.6]';

function List({ list, keyBase }) {
  const Tag = list.type;
  return (
    <Tag className={Tag === 'ul' ? UL : OL}>
      {list.items.map((item, i) => (
        <li key={`${keyBase}-${i}`} className={Tag === 'ul' ? UL_LI : OL_LI}>
          {renderInline(item.text, `${keyBase}-${i}`)}
          {item.children && <List list={item.children} keyBase={`${keyBase}-${i}-c`} />}
        </li>
      ))}
    </Tag>
  );
}

export default function AiAnswer({ markdown }) {
  const blocks = parseBlocks(markdown);

  return (
    /* ref .ai-response-text */
    <div className="text-base leading-[1.8] text-[#2d3748] [overflow-wrap:anywhere]">
      {blocks.map((block, i) => {
        const key = `b${i}`;
        switch (block.type) {
          case 'h': {
            const Tag = `h${block.level}`;
            return (
              <Tag key={key} className={H[block.level]}>
                {renderInline(block.text, key)}
              </Tag>
            );
          }
          case 'hr':
            return <hr key={key} className="my-6 border-0 border-t-2 border-[#e2e8f0]" />;
          case 'quote':
            return (
              <blockquote
                key={key}
                className="my-5 rounded-r-lg border-l-4 border-[#667eea] bg-[#f7fafc] px-5 py-[15px] italic text-[#4a5568]"
              >
                {block.lines.map((l, j) => (
                  <Fragment key={j}>
                    {j > 0 && <br />}
                    {renderInline(l, `${key}-${j}`)}
                  </Fragment>
                ))}
              </blockquote>
            );
          case 'ul':
          case 'ol':
            return <List key={key} list={block} keyBase={key} />;
          default:
            return (
              <p key={key} className="my-3 leading-[1.8]">
                {block.lines.map((l, j) => (
                  <Fragment key={j}>
                    {j > 0 && <br />}
                    {renderInline(l, `${key}-${j}`)}
                  </Fragment>
                ))}
              </p>
            );
        }
      })}
    </div>
  );
}

/** Plain-text preview for the history list (ref `.history-response`, which
 * showed the escaped raw answer clamped to two lines). */
export function plainPreview(markdown) {
  return String(markdown || '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
