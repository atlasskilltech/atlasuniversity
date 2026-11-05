/**
 * Turbopack loader: points `/assets/…` literals in app/, components/ and lib/ at
 * NEXT_PUBLIC_ASSET_BASE_URL (the public S3 host). Registered in next.config.mjs ONLY when that variable
 * is set, so a build without it never runs this file. The rules live in asset-url-rewrite.cjs.
 */
'use strict';
const { assetBase, rewriteJs } = require('./asset-url-rewrite.cjs');

/* lib/asset.js compares paths with startsWith('/assets/'); rewriting that literal would turn asset()
   into a no-op. next.config.mjs excludes it by path too — this is the second guard. */
const NEVER = /(?:^|[\\/])lib[\\/]asset\.js$/;

module.exports = function assetUrlLoader(source) {
  const file = this && this.resourcePath ? String(this.resourcePath) : '';
  if (NEVER.test(file)) return source;
  return rewriteJs(String(source), assetBase());
};
