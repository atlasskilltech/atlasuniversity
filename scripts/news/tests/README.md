# ATLAS News — tests

| Command | What it covers | Needs |
| --- | --- | --- |
| `npm run news:test` | Unit + security tests: password hashing, the migration guard (every known bypass), sanitiser, image pipeline, S3 key confinement, body limits, concurrency limiter, client-IP resolution. Database tests are skipped unless `NEWS_TEST_DB_NAME` is set. | nothing |
| `NEWS_TEST_DB_NAME=atlasnews_stage1_test npm run news:test` | + database tests: migrations up/down, ownership (never drops a table it did not create), constraints, sessions, rate limiting, UTC connections. | local MySQL/MariaDB (`NEWS_TEST_DB_HOST` defaults to 127.0.0.1, `NEWS_TEST_DB_USER` root) |
| `NEWS_E2E_DB_NAME=atlasnews_e2e_test npm run news:e2e` | End-to-end over HTTP against the **production build**: headers, CSRF, rate limiting, sessions, page/API authorisation (incl. RSC requests and expired sessions), uploads, request-size and concurrency limits, S3 conditional writes, logout. | `npx next build` first; local MySQL |
| `NEWS_E2E_BROWSER=1 …news:e2e` | + browser smoke test (`browser.py`) at 390 px and 1440 px. | Python 3 + `pip install playwright` |

## Safety

- The database suites create and drop **only** a local database whose name ends in `_test`; they refuse
  any other host or name.
- The end-to-end suite never touches real S3: it starts a local S3 stand-in (`s3-stub.mjs`), runs the app
  with dummy AWS credentials pointed at it, and **aborts before any upload** unless the app reports that
  stand-in as its storage. The admin password is a random one generated per run.

## Client IP and the trusted proxy (login rate limiting)

`lib/news/http/clientIp.js` takes the client address from `X-Forwarded-For`, counting
`NEWS_TRUSTED_PROXY_HOPS` entries from the **right** (default 1). That is only trustworthy if:

- exactly that many proxies sit in front of `next start`, each **appending** the address it received the
  connection from (nginx `proxy_add_x_forwarded_for`, AWS ALB) — or overwriting the header with it;
- `next start` is not reachable directly from the internet.

With Cloudflare in front of nginx, either set `NEWS_TRUSTED_PROXY_HOPS=2` or have nginx restore the
visitor address from `CF-Connecting-IP` (the `real_ip` module); otherwise every visitor shares a
Cloudflare edge address and the per-IP limit becomes per-edge. If the proxy does not append at all, the
per-IP limit can be evaded by forging the header, but the global failed-login ceiling (50 per 15 minutes)
still applies. This code does not configure any proxy.
