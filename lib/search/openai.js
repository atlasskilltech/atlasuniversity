import 'server-only';

import { SYSTEM_PROMPT, userMessage } from '@/lib/search/prompt';

/**
 * The one place OPENAI_API_KEY is read. Server-only: it is never imported by a
 * client component, never returned to the caller, and never put in an error
 * message (OpenAI's own error bodies are logged by status only).
 *
 * Settings carried over from reference/chat/config.php:
 *   model        OPENAI_MODEL, default gpt-4o   (legacy API_MODEL)
 *   max_tokens   1024                           (legacy MAX_TOKENS)
 *   temperature  0.7                            (legacy API_TEMPERATURE)
 *   timeout      30s                            (legacy CURLOPT_TIMEOUT)
 */

const ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const MAX_TOKENS = 1024;
const TEMPERATURE = 0.7;
const TIMEOUT_MS = 30000;

/* An answer is rendered as Markdown and kept in the visitor's history; cap it
 * so a runaway response cannot bloat either. max_tokens already bounds it to
 * roughly 4-5k characters, so this only ever trims a pathological reply. */
export const MAX_ANSWER_CHARS = 8000;

export class SearchError extends Error {
  constructor(code, status) {
    super(code);
    this.code = code; // not_configured | unavailable | busy | upstream | timeout
    this.status = status;
  }
}

/* A template value such as `sk-proj-YOUR_ACTUAL_KEY` counts as "not set": it
 * would only ever earn a 401 from OpenAI, and "not configured" is the honest
 * answer to give the visitor and the developer. */
const PLACEHOLDER = /your[_-]?(actual[_-]?|real[_-]?|openai[_-]?|api[_-]?)*key/i;

function apiKey() {
  const key = (process.env.OPENAI_API_KEY || '').trim();
  return key && !PLACEHOLDER.test(key) ? key : '';
}

export function isConfigured() {
  return Boolean(apiKey());
}

export function modelName() {
  return (process.env.OPENAI_MODEL || '').trim() || 'gpt-4o';
}

export async function askAtlas(query) {
  const key = apiKey();
  if (!key) throw new SearchError('not_configured', 503);

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: modelName(),
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage(query) },
        ],
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
      }),
    });
  } catch (error) {
    const timedOut = error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    console.error('[search] OpenAI request failed:', timedOut ? 'timeout' : error && error.name);
    throw new SearchError(timedOut ? 'timeout' : 'upstream', 502);
  }

  if (!response.ok) {
    // Status only — the body can echo request details.
    console.error('[search] OpenAI responded', response.status);
    if (response.status === 429) throw new SearchError('busy', 503);
    if (response.status === 401 || response.status === 403) {
      throw new SearchError('unavailable', 503);
    }
    throw new SearchError('upstream', 502);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new SearchError('upstream', 502);
  }

  const content = data && data.choices && data.choices[0] && data.choices[0].message
    ? data.choices[0].message.content
    : null;
  if (typeof content !== 'string' || !content.trim()) {
    throw new SearchError('upstream', 502);
  }

  return content.trim().slice(0, MAX_ANSWER_CHARS);
}
