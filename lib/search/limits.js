/**
 * Query limits shared by the Search page and /api/search, so the client
 * refuses exactly what the server would.
 *
 * MIN_QUERY_LENGTH is the legacy config.php value. MAX_QUERY_LENGTH is new:
 * the reference capped the input at `maxlength="256"` in the markup only and
 * the PHP endpoint accepted any length; 256 is kept so the field behaves as it
 * did, and the server enforces it as well.
 */
export const MIN_QUERY_LENGTH = 3;
export const MAX_QUERY_LENGTH = 256;

/** Trims and collapses runs of whitespace. */
export function normaliseQuery(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}
