import { NextResponse } from 'next/server';
import { askAtlas, isConfigured, SearchError } from '@/lib/search/openai';
import { clientIp, takeToken } from '@/lib/search/rateLimit';
import { MAX_QUERY_LENGTH, MIN_QUERY_LENGTH, normaliseQuery } from '@/lib/search/limits';

/**
 * POST /api/search — the AI Search endpoint behind /search.
 *
 * Replaces reference/chat/search.php. Request: `{ "query": "…" }` as JSON.
 * Response: `{ "answer": "<markdown>" }`, or `{ "error": "<message>", "code": … }`
 * with a matching status. The OpenAI key, the model's raw error bodies and the
 * system prompt never appear in a response.
 *
 *   400 invalid_query      missing / too short / too long / not JSON
 *   403 forbidden_origin   cross-site browser request
 *   413 too_large          body over 4KB
 *   429 rate_limited       per-IP limit (see lib/search/rateLimit.js); Retry-After set
 *   503 not_configured     OPENAI_API_KEY is not set on the server
 *   503 unavailable        OpenAI rejected the key (invalid, revoked, out of credit)
 *   503 busy               OpenAI rate limit / quota
 *   502 upstream|timeout   OpenAI failed or took over 30s
 *
 * What the legacy endpoint did that this one does not:
 *  - search history and the "same question -> cached answer" shortcut lived in
 *    the PHP session. Both now live in the visitor's browser (the Search page
 *    answers a repeated question from its own history without calling this
 *    route), so the server keeps no per-visitor state at all.
 *  - it was gated by a lead form posting to MySQL. That form is gone; the CRM
 *    widget on the page owns lead capture, and it is a deliberately *soft*
 *    gate — this route does not, and cannot, know whether a lead was submitted.
 */

export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 4096;

const MESSAGES = {
  invalid_query: `Please enter between ${MIN_QUERY_LENGTH} and ${MAX_QUERY_LENGTH} characters.`,
  forbidden_origin: 'This request is not allowed.',
  too_large: 'This request is too large.',
  rate_limited: 'You are searching very quickly. Please wait a moment and try again.',
  not_configured: 'AI Search is not configured on this server yet (the OpenAI API key is missing).',
  unavailable: 'AI Search is not available right now. Please try again later.',
  busy: 'AI Search is busy right now. Please try again in a minute.',
  upstream: 'Sorry, we could not get an answer right now. Please try again.',
  timeout: 'The answer took too long. Please try again.',
};

function fail(code, status, headers) {
  return NextResponse.json(
    { error: MESSAGES[code], code },
    { status, headers: { 'Cache-Control': 'no-store', ...headers } },
  );
}

/* A browser always sends Origin on a cross-origin POST; when it is present it
 * must name this host. Server-to-server callers send none and are left to the
 * rate limit. */
function sameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request) {
  if (!sameOrigin(request)) return fail('forbidden_origin', 403);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail('too_large', 413);

  let query;
  try {
    query = normaliseQuery(JSON.parse(raw).query);
  } catch {
    return fail('invalid_query', 400);
  }
  if (query.length < MIN_QUERY_LENGTH || query.length > MAX_QUERY_LENGTH) {
    return fail('invalid_query', 400);
  }

  /* Checked before the rate limit so a misconfigured deployment answers
   * clearly instead of spending the visitor's quota. */
  if (!isConfigured()) return fail('not_configured', 503);

  const limit = takeToken(clientIp(request));
  if (!limit.ok) {
    return fail('rate_limited', 429, { 'Retry-After': String(limit.retryAfter) });
  }

  try {
    const answer = await askAtlas(query);
    return NextResponse.json({ answer }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof SearchError) return fail(error.code, error.status);
    console.error('[search] unexpected error:', error && error.name);
    return fail('upstream', 502);
  }
}
