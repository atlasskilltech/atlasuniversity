/* `node --import ./scripts/news/tests/register.mjs …` — the `@/` alias hooks the Stage 2 fixtures need (test-only) */
import { register } from 'node:module';

register('./alias-hooks.mjs', import.meta.url);
