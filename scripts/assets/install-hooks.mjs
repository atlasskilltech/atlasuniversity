#!/usr/bin/env node
/**
 * Points git at the repo's tracked hooks: `git config core.hooksPath .githooks`.
 * Runs automatically from the `prepare` script on every `npm install` / `npm ci`, and on demand with
 * `npm run hooks:install`. Git does not clone hooks, so this is how every machine gets them.
 *
 * .githooks/ carries the Git LFS hooks (pre-push, post-checkout, post-commit, post-merge) as well as
 * the asset check, because setting core.hooksPath makes git stop reading .git/hooks — without them
 * LFS would silently stop working.
 *
 * Never fails an install: outside a git checkout, in CI, or when core.hooksPath already points
 * somewhere else (another tool's hooks) it prints why and exits 0. `--force` overrides the last case.
 */
import { chmodSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT } from './lib.mjs';

const force = process.argv.includes('--force');
const say = (m) => console.log(`[hooks] ${m}`);
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

try {
  if (process.env.CI && !force) {
    say('CI environment — hooks not installed (GitHub Actions runs the asset check itself).');
    process.exit(0);
  }
  try {
    git('rev-parse', '--git-dir');
  } catch {
    say('not a git checkout — skipped.');
    process.exit(0);
  }
  const dir = path.join(ROOT, '.githooks');
  if (!existsSync(dir)) {
    say('.githooks/ not found — skipped.');
    process.exit(0);
  }
  let current = '';
  try {
    current = git('config', '--get', 'core.hooksPath');
  } catch {
    current = '';
  }
  if (current && current !== '.githooks' && !force) {
    say(`core.hooksPath is already "${current}" — left unchanged. Run \`npm run hooks:install -- --force\` to use .githooks/.`);
    process.exit(0);
  }
  for (const f of readdirSync(dir)) {
    try {
      chmodSync(path.join(dir, f), 0o755);
    } catch {
      /* not needed on Windows */
    }
  }
  if (current !== '.githooks') git('config', 'core.hooksPath', '.githooks');
  say('git hooks active: core.hooksPath = .githooks (asset check + Git LFS)');
} catch (e) {
  say(`could not install hooks (${e.message}) — run \`npm run hooks:install\` manually.`);
}
process.exit(0);
