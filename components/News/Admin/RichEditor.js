'use client';

/**
 * ATLAS News article editor — TipTap 3 (MIT; @tiptap/react + starter-kit + extension-image, nothing else).
 *
 * WHY TIPTAP: a schema-based editor, so its output is a fixed, predictable vocabulary — paragraphs, H2–H6,
 * bold/italic/underline/strike, links, lists, blockquote, code, rule, images — every element of which the
 * sanitiser (lib/news/content/sanitize.js) already allows. The server sanitises again on save regardless.
 *
 * HEADINGS: levels 2–6 only; the article title is the page's single <h1>. Pasted or dropped HTML has its
 * <h1> turned into <h2> before TipTap parses it (and the server does the same on save).
 *
 * NOTHING IS SILENTLY LOST. Imported WordPress articles can contain things the visual editor's schema
 * cannot hold — galleries (figure.news-gallery), captions, YouTube embeds, tables, video. Loading those
 * into TipTap would drop them on the next save. So if the body contains any such element, the editor
 * opens in HTML MODE (a plain source field, still sanitised on save) and says why; switching to the
 * visual editor then is an explicit choice behind a warning that names what would be removed.
 */
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useEffect, useState } from 'react';
import { BTN_SECONDARY, cx, INPUT } from './ui';

/** Elements the visual editor cannot keep → the body opens in HTML mode. */
const UNSUPPORTED = [
  [/<figure\b/i, 'figures/galleries'],
  [/<figcaption\b/i, 'image captions'],
  [/<iframe\b/i, 'video embeds'],
  [/<table\b/i, 'tables'],
  [/<video\b/i, 'videos'],
  [/<div\b/i, 'layout blocks'],
  [/<(sub|sup)\b/i, 'sub/superscript'],
  [/<cite\b/i, 'citations'],
  [/<img\b[^>]*\bsrcset=/i, 'responsive images'],
  [/<blockquote\b[^>]*\bclass=/i, 'pull quotes'],
  [/<ol\b[^>]*\b(start|reversed)\b/i, 'numbered-list settings'],
];
export function unsupportedIn(html) {
  return UNSUPPORTED.filter(([re]) => re.test(html || '')).map(([, label]) => label);
}


/* editing typography (Preflight resets headings, lists and quotes); close to the public article body */
const EDITOR_PROSE = cx(
  'min-h-[420px] px-5 py-4 outline-none text-[16px] leading-[1.7] text-[#14161a]',
  '[&_p]:my-3 [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:leading-[1.25]',
  '[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-[20px] [&_h3]:font-semibold [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:text-[18px] [&_h4]:font-semibold',
  '[&_h5]:mb-2 [&_h5]:mt-5 [&_h5]:text-[16px] [&_h5]:font-semibold [&_h6]:mb-2 [&_h6]:mt-5 [&_h6]:text-[13px] [&_h6]:font-semibold [&_h6]:uppercase [&_h6]:tracking-[0.06em]',
  '[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1',
  '[&_blockquote]:my-4 [&_blockquote]:border-l-[3px] [&_blockquote]:border-[#c9ccd4] [&_blockquote]:pl-4 [&_blockquote]:italic',
  '[&_a]:text-[#3b5bdb] [&_a]:underline [&_strong]:font-semibold [&_em]:italic [&_s]:line-through [&_u]:underline',
  '[&_code]:rounded [&_code]:bg-[#f1f2f4] [&_code]:px-1 [&_code]:font-mono [&_code]:text-[14px] [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-[#14161a] [&_pre]:p-4 [&_pre]:text-white [&_pre_code]:bg-transparent',
  '[&_hr]:my-6 [&_hr]:border-[#d6d9e0] [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-md [&_img.ProseMirror-selectednode]:ring-2 [&_img.ProseMirror-selectednode]:ring-[#3b5bdb]',
  '[&_p.is-editor-empty:first-child]:before:pointer-events-none',
);

const h1ToH2 = (html) => html.replace(/<(\/?)h1(\s[^>]*)?>/gi, (_m, close) => `<${close}h2>`);

const HEADINGS = [
  ['p', 'Paragraph'],
  [2, 'Heading 2'],
  [3, 'Heading 3'],
  [4, 'Heading 4'],
  [5, 'Heading 5'],
  [6, 'Heading 6'],
];

function Tool({ onClick, active, disabled, label, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active ? 'true' : undefined}
      title={label}
      className={cx(
        'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-[13.5px] font-semibold transition disabled:opacity-40',
        active ? 'bg-[#14161a] text-white' : 'text-[#2b2f38] hover:bg-[#e9ebef]',
      )}
    >
      {children}
    </button>
  );
}

/**
 * Props: value (HTML), onChange(html), onPickImage(insert) — opens the media picker and calls
 * insert({ src, alt }) with the chosen image; invalid (field error).
 */
export default function RichEditor({ value, onChange, onPickImage, invalid, id }) {
  const [mode, setMode] = useState(() => (unsupportedIn(value).length ? 'html' : 'visual'));
  const [, force] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4, 5, 6] },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https', 'mailto', 'tel'],
          HTMLAttributes: { target: null, rel: null },
        },
      }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: mode === 'visual' ? value || '' : '',
    editorProps: {
      attributes: {
        id: id || undefined,
        'aria-label': 'Article body',
        class: EDITOR_PROSE,
      },
      transformPastedHTML: h1ToH2,
    },
    onUpdate: ({ editor: ed }) => onChange(ed.isEmpty ? '' : ed.getHTML()),
    onSelectionUpdate: () => force((n) => n + 1),
  });

  /* keep toolbar state fresh */
  useEffect(() => {
    if (!editor) return undefined;
    const f = () => force((n) => n + 1);
    editor.on('transaction', f);
    return () => editor.off('transaction', f);
  }, [editor]);

  function toVisual() {
    const lost = unsupportedIn(value);
    if (lost.length && !window.confirm(`The visual editor cannot keep: ${lost.join(', ')}.\n\nSwitching will REMOVE them from this article when you save. Continue?`)) return;
    editor?.commands.setContent(h1ToH2(value || ''), { emitUpdate: true });
    setMode('visual');
  }
  function toHtml() {
    if (editor) onChange(editor.isEmpty ? '' : editor.getHTML());
    setMode('html');
  }

  function setLink() {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('Link address (https://…, /news/…, mailto:…). Leave empty to remove the link.', prev);
    if (url === null) return;
    if (!url.trim()) return editor.chain().focus().extendMarkRange('link').unsetLink().run();
    const ok = /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i.test(url.trim());
    if (!ok) return window.alert('Use an address starting with https://, http://, mailto:, tel: or /');
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  }

  const level = editor ? (HEADINGS.find(([l]) => l !== 'p' && editor.isActive('heading', { level: l }))?.[0] ?? 'p') : 'p';
  const frame = cx('rounded-lg border bg-white', invalid ? 'border-[#e5484d]' : 'border-[#d6d9e0]');

  if (mode === 'html') {
    const lost = unsupportedIn(value);
    return (
      <div>
        <div className="mb-2 rounded-lg border border-[#f5d9a8] bg-[#fff8eb] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[#7a4b00]">
          {lost.length ? (
            <>
              <strong>HTML mode</strong> — this article contains {lost.join(', ')}, which the visual editor cannot keep. Editing the HTML here
              preserves them. It is sanitised when you save (scripts, styles and unsafe links are always removed).
            </>
          ) : (
            <>
              <strong>HTML mode</strong> — the body is sanitised when you save.
            </>
          )}
        </div>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          aria-label="Article body (HTML)"
          className={cx(INPUT, 'min-h-[460px] font-mono text-[13px] leading-[1.55]', invalid && 'border-[#e5484d]')}
        />
        <button type="button" className={cx(BTN_SECONDARY, 'mt-2')} onClick={toVisual}>
          Switch to visual editor
        </button>
      </div>
    );
  }

  return (
    <div className={frame}>
      <div className="sticky top-[98px] z-10 flex flex-wrap items-center gap-0.5 rounded-t-lg border-b border-[#e3e5ea] bg-[#fafbfc] px-2 py-1.5">
        <label className="sr-only" htmlFor={`${id}-block`}>Text style</label>
        <select
          id={`${id}-block`}
          value={level}
          disabled={!editor}
          onChange={(e) => {
            const v = e.target.value;
            if (v === 'p') editor.chain().focus().setParagraph().run();
            else editor.chain().focus().setHeading({ level: Number(v) }).run();
          }}
          className="mr-1 h-8 rounded-md border border-[#d6d9e0] bg-white px-2 text-[13px]"
        >
          {HEADINGS.map(([l, label]) => (
            <option key={l} value={l}>
              {label}
            </option>
          ))}
        </select>
        <Tool label="Bold" active={editor?.isActive('bold')} disabled={!editor} onClick={() => editor.chain().focus().toggleBold().run()}>B</Tool>
        <Tool label="Italic" active={editor?.isActive('italic')} disabled={!editor} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </Tool>
        <Tool label="Underline" active={editor?.isActive('underline')} disabled={!editor} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <span className="underline">U</span>
        </Tool>
        <Tool label="Strikethrough" active={editor?.isActive('strike')} disabled={!editor} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <span className="line-through">S</span>
        </Tool>
        <span className="mx-1 h-5 w-px bg-[#d6d9e0]" aria-hidden="true" />
        <Tool label="Link" active={editor?.isActive('link')} disabled={!editor} onClick={setLink}>Link</Tool>
        <Tool label="Bulleted list" active={editor?.isActive('bulletList')} disabled={!editor} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Tool>
        <Tool label="Numbered list" active={editor?.isActive('orderedList')} disabled={!editor} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Tool>
        <Tool label="Quote" active={editor?.isActive('blockquote')} disabled={!editor} onClick={() => editor.chain().focus().toggleBlockquote().run()}>“ ”</Tool>
        <Tool label="Code block" active={editor?.isActive('codeBlock')} disabled={!editor} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{'</>'}</Tool>
        <Tool label="Horizontal rule" disabled={!editor} onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</Tool>
        <Tool
          label="Insert image from the media library"
          disabled={!editor || !onPickImage}
          onClick={() => onPickImage((img) => editor.chain().focus().setImage({ src: img.src, alt: img.alt || '' }).run())}
        >
          Image
        </Tool>
        <span className="mx-1 h-5 w-px bg-[#d6d9e0]" aria-hidden="true" />
        <Tool label="Clear formatting" disabled={!editor} onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>Clear</Tool>
        <Tool label="Undo" disabled={!editor?.can().undo()} onClick={() => editor.chain().focus().undo().run()}>↶</Tool>
        <Tool label="Redo" disabled={!editor?.can().redo()} onClick={() => editor.chain().focus().redo().run()}>↷</Tool>
        <button type="button" onClick={toHtml} className="ml-auto h-8 rounded-md px-2 text-[12.5px] font-medium text-[#5b6170] hover:bg-[#e9ebef]">
          HTML
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
