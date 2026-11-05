/*
 * Module-resolution hooks for the map discovery scripts.
 *
 * The site's `lib/` content modules are plain data written for Next's bundler: they import each
 * other through the `@/` alias and without file extensions. These hooks let a plain Node process
 * read them unchanged — `@/x` resolves against the project root, an extensionless relative import
 * gets `.js` (or `/index.js`), and project `.js` files load as ES modules. Nothing here touches
 * the Next build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function firstExisting(base) {
  for (const c of [base, `${base}.js`, `${base}.mjs`, path.join(base, 'index.js')]) {
    try {
      if (fs.statSync(c).isFile()) return c;
    } catch {
      /* not this candidate */
    }
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  /* `server-only` exists to stop client bundles importing a module; a build script is server-side */
  if (specifier === 'server-only') return { url: 'data:text/javascript,export {}', shortCircuit: true };

  let target = null;
  if (specifier.startsWith('@/')) target = firstExisting(path.join(ROOT, specifier.slice(2)));
  else if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:')) {
    target = firstExisting(path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier));
  }
  if (target) return { url: pathToFileURL(target).href, shortCircuit: true, format: target.endsWith('.json') ? 'json' : 'module' };
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('file:') && url.endsWith('.js') && fileURLToPath(url).startsWith(ROOT)) {
    return nextLoad(url, { ...context, format: 'module' });
  }
  return nextLoad(url, context);
}
