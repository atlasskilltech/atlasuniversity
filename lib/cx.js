/**
 * Join conditional class names. Falsy entries are dropped.
 *   cx('a', cond && 'b', 'c')  ->  'a c'
 */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
