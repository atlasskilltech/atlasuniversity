/**
 * Render a transcribed string that carries the reference's `<br>`s as newlines.
 *
 * `lib/*Content.js` stores a `<br />` as `\n`, so the text can be diffed and
 * read as prose. This turns it back into markup without wrapping anything: the
 * result is text nodes separated by `<br>`, exactly the reference's own child
 * list, so a single-line string produces no extra element at all.
 */
export default function withBreaks(text) {
  if (!text) return text;
  return text
    .split('\n')
    .flatMap((line, i) => (i ? [<br key={`br-${i}`} />, line] : [line]));
}
