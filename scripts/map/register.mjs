/* `node --import ./scripts/map/register.mjs …` — installs the `@/` alias hooks (see alias-hooks.mjs) */
import { register } from 'node:module';

register('./alias-hooks.mjs', import.meta.url);
