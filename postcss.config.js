/*
 * `atlas-asset-url` runs after Tailwind and points `url(/assets/…)` in the compiled CSS at
 * NEXT_PUBLIC_ASSET_BASE_URL (docs/assets-s3.md). With that variable unset it changes nothing.
 * Its key is an absolute path: Turbopack resolves plugin names from its own build chunk, not from here.
 */
const path = require('path');

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    [path.join(__dirname, 'scripts', 'assets', 'postcss-asset-url.cjs')]: {},
  },
};
