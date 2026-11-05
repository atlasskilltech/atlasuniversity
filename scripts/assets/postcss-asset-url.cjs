/**
 * PostCSS plugin, run after Tailwind: points `url(/assets/…)` in the compiled CSS at
 * NEXT_PUBLIC_ASSET_BASE_URL. That covers every Tailwind arbitrary `bg-[url(/assets/…)]` class (Tailwind
 * emits those from the unrewritten source class names). Local-only folders — the `@font-face` sources
 * under /assets/fonts/ and anything under /assets/brand/ — are left on the site's origin.
 * With the variable unset it does nothing. The rules live in asset-url-rewrite.cjs.
 */
'use strict';
const { assetBase, rewriteCssValue } = require('./asset-url-rewrite.cjs');

module.exports = () => {
  const base = assetBase();
  return {
    postcssPlugin: 'atlas-asset-url',
    Declaration(decl) {
      if (base && decl.value.includes('/assets/')) decl.value = rewriteCssValue(decl.value, base);
    },
  };
};
module.exports.postcss = true;
