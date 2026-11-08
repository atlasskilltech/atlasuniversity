/**
 * ATLAS News — admin password hashing (temporary password-only authentication).
 *
 * scrypt from Node's own crypto (no dependency), N = 2^15, r = 8, p = 1, 64-byte key, 16-byte random
 * salt — ~100 ms per check on the EC2 class of machine, which also slows online guessing on top of the
 * rate limit. Stored as one self-describing string:
 *
 *     scrypt$15$8$1$<salt base64url>$<key base64url>
 *
 * so the cost can be raised later without a migration (old hashes keep verifying with their own
 * parameters). Comparison is constant-time. The plaintext password is never stored, logged or returned.
 *
 * Pure Node — shared by the app (lib/news/auth/admin.js) and the CLI (scripts/news/admin.mjs).
 */
import { randomBytes, randomInt, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';

const KEYLEN = 64;
const DEFAULT = { logN: 15, r: 8, p: 1 };

function scrypt(password, salt, { logN, r, p }) {
  const N = 2 ** logN;
  return new Promise((resolve, reject) => {
    scryptCb(password, salt, KEYLEN, { N, r, p, maxmem: 256 * N * r }, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

const b64u = (buf) => Buffer.from(buf).toString('base64url');

/** Minimum length for an admin password (the generated one is 28 characters). */
export const MIN_PASSWORD_LENGTH = 16;

export async function hashPassword(password) {
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }
  const salt = randomBytes(16);
  const key = await scrypt(password.normalize('NFKC'), salt, DEFAULT);
  return `scrypt$${DEFAULT.logN}$${DEFAULT.r}$${DEFAULT.p}$${b64u(salt)}$${b64u(key)}`;
}

/** Parse a stored hash; returns null for anything malformed (never throws on bad input). */
export function parseHash(stored) {
  const m = typeof stored === 'string' && stored.match(/^scrypt\$(\d{1,2})\$(\d{1,2})\$(\d{1,2})\$([A-Za-z0-9_-]{16,})\$([A-Za-z0-9_-]{64,})$/);
  if (!m) return null;
  const params = { logN: Number(m[1]), r: Number(m[2]), p: Number(m[3]) };
  if (params.logN < 14 || params.logN > 20 || params.r < 1 || params.r > 32 || params.p < 1 || params.p > 16) return null;
  return { params, salt: Buffer.from(m[4], 'base64url'), key: Buffer.from(m[5], 'base64url') };
}

/* A fixed decoy so a missing/malformed hash costs the same time as a real check. */
const DECOY = { params: DEFAULT, salt: Buffer.alloc(16, 7), key: Buffer.alloc(KEYLEN, 0) };

/** Constant-time verification. Always performs one scrypt, even when `stored` is missing/invalid. */
export async function verifyPassword(password, stored) {
  const parsed = parseHash(stored);
  const target = parsed || DECOY;
  const input = typeof password === 'string' ? password.slice(0, 512).normalize('NFKC') : '';
  const key = await scrypt(input, target.salt, target.params);
  const same = key.length === target.key.length && timingSafeEqual(key, target.key);
  return Boolean(parsed) && same;
}

/* Unambiguous characters only (no 0/O, 1/l/I), plus a few symbols that survive copy/paste and URLs. */
const LOWER = 'abcdefghjkmnpqrstuvwxyz';
const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const DIGIT = '23456789';
const SYMBOL = '-_.!@#%+=';

/** A strong random password from the CSPRNG: `length` chars, at least one from each class
 *  (~6.1 bits per character; 28 characters ≈ 170 bits). */
export function generatePassword(length = 28) {
  const all = LOWER + UPPER + DIGIT + SYMBOL;
  const pick = (set) => set[randomInt(set.length)];
  const chars = [pick(LOWER), pick(UPPER), pick(DIGIT), pick(SYMBOL)];
  while (chars.length < length) chars.push(pick(all));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}
