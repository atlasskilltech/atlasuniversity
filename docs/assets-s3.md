# Asset storage on S3 (direct public HTTPS — no CloudFront)

The files under `public/assets/` — images, logos, icons, SVGs, videos, PDFs and documents — are stored
in the S3 bucket `atlas-web-cdn` (`ap-south-1`) under `assets/` and served to visitors **straight from
S3** over its public HTTPS endpoint. There is no CloudFront distribution and no Origin Access Control.
GitHub keeps the application code and one small file, `assets.manifest.json`, which records exactly
which S3 asset files (path, size, SHA-256) each commit needs.

**What stays local.** Two folders are not moved to S3: they stay in `public/assets/`, stay tracked in
git, ship with the Next.js app and are served from the site's own origin in every build.

| folder | files | why |
| --- | --- | --- |
| `public/assets/fonts/` | 16 WOFF2 | same-origin fonts need no CORS; `app/globals.css` `@font-face` and the `app/layout.js` preload keep their paths |
| `public/assets/brand/` | 358 | the brand page's `<a download="…">` buttons only work same-origin (browsers ignore `download` on cross-origin links); its PDF tools load their libraries and the pdf.js worker from `brand/vendor/` |

The list lives in `scripts/assets/local-only.cjs`; the URL rewrite, `assets:status` / `sync` /
`download` / `verify` and the code-reference check all read it (`lib/asset.js` mirrors it for runtime
paths). A reference to a local-only file is checked against `public/` instead of the manifest.

**Status (2026-11-04):** 8,629 objects were uploaded on 2026-11-03, before fonts and brand became
local-only; the manifest now lists the **8,255** S3 assets. The 374 font/brand objects remain in the
bucket unused (nothing is deleted).

**What git tracks.** Under `public/assets/`, git tracks **only** `fonts/` (16 files) and `brand/` (358
files) — 374 files. The 8,255 migrated assets were removed from git tracking (`git rm --cached`, no history
rewrite) and are ignored by `.gitignore`:

```
/public/assets/*
!/public/assets/fonts/
!/public/assets/brand/
```

They are served straight from S3, and `assets.manifest.json` is the committed record of them. A local
copy is optional: existing copies on disk were kept, and any checkout can restore them with
`npm run assets:download -- --from-public` (§5). Because they are ignored, a new or changed migrated asset
never shows up in `git status` — it reaches other people through `assets:sync` and the manifest (§4).

---

## 1. How a URL is built

The format is the bucket's virtual-hosted-style HTTPS endpoint followed by the unchanged local path:

    https://atlas-web-cdn.s3.ap-south-1.amazonaws.com/assets/<path under public/assets>

    public/assets/images/campus.webp  ->  https://atlas-web-cdn.s3.ap-south-1.amazonaws.com/assets/images/campus.webp

Folder structure and file names are kept exactly; S3 keys are `assets/…`. One variable decides:

| `NEXT_PUBLIC_ASSET_BASE_URL` | result |
| --- | --- |
| empty / unset (default, local development) | `/assets/…`, served by Next.js from `public/` — also the rollback |
| `https://atlas-web-cdn.s3.ap-south-1.amazonaws.com` | `https://atlas-web-cdn.s3.ap-south-1.amazonaws.com/assets/…` |

**The source is not edited.** The code keeps writing `/assets/…` (~20,000 literals in JS/JSON under
`app/`, `components/`, `lib/`). When the variable is set for `next build` / `next dev`, two build-time
hooks rewrite them:

- `scripts/assets/asset-url-loader.cjs` — a Turbopack loader registered in `next.config.mjs` **only when
  the variable is set**. It rewrites string/template literals that start with `/assets/`, further
  `srcSet` candidates (`, /assets/…`) and inline-style `url(/assets/…)`. It skips Tailwind arbitrary
  classes such as `bg-[url(/assets/…)]` and external URLs. `lib/asset.js` is excluded.
- `scripts/assets/postcss-asset-url.cjs` — a PostCSS plugin after Tailwind, rewriting `url(/assets/…)`
  in the compiled CSS: every Tailwind `bg-[url(…)]` class (the `@font-face` sources stay local).

Both use the rules in `scripts/assets/asset-url-rewrite.cjs`. `next.config.mjs` also adds the host to
`images.remotePatterns` (limited to `/assets/**`) for `next/image`.

`lib/asset.js` remains for paths assembled at runtime that no literal covers (the `/map` page's document
links, read from `data/map/*.json`, go through it):

| function | input | output (base set) |
| --- | --- | --- |
| `asset(path)` | `/assets/images/x.png` | `https://atlas-web-cdn.s3.ap-south-1.amazonaws.com/assets/images/x.png` |
| `assetSrcSet(str)` | `/assets/a-500.png 500w, /assets/a.png 1366w` | each candidate prefixed, descriptors kept |
| `assetCss(path)` | `/assets/images/bg.png` | `url("https://…/assets/images/bg.png")` |

Absolute URLs, `data:` URLs and non-`/assets/` paths always pass through untouched.

Verified (2026-11-03): a build with the variable set had 0 bare `src`/`href`/`poster`/`srcSet` asset
attributes in 304 prerendered pages and 0 bare `url(/assets/…)` in CSS; in the browser, 0 requests to
local `/assets/` and no hydration warnings. A build without it contained 0 S3 URLs.

Rendering never needs AWS credentials: visitors read the public objects anonymously. Credentials are used only
by the developer scripts below, and only from the developer's own AWS profile or CI's OIDC role.

## 2. Environment variables

**Local developer setup and production configuration are separate.** Developers configure only what
their machine needs; DevOps owns every production/staging environment variable and the server
configuration. The application only *reads* `NEXT_PUBLIC_ASSET_BASE_URL` — whatever value the build
environment supplies.

### Local (developer machine, `.env.local` — gitignored)

| variable | value | needed for |
| --- | --- | --- |
| `ASSETS_S3_BUCKET` | `atlas-web-cdn` | `assets:sync` / `assets:verify` / `assets:download` (S3 mode) |
| `ASSETS_S3_REGION` | from DevOps (e.g. `ap-south-1`) | the same scripts |
| `ASSETS_S3_PREFIX` | optional, normally empty (keys = `assets/…`) | the same scripts |
| `ASSETS_CACHE_CONTROL` | optional (default `public, max-age=604800`) | uploads |
| `NEXT_PUBLIC_ASSET_BASE_URL` | `https://atlas-web-cdn.s3.ap-south-1.amazonaws.com` to serve the migrated assets from S3 — **required on a fresh clone** unless you have run `assets:download`, because the 8,255 migrated files are no longer in git. Leave it empty only with a full local copy of `public/assets/` (site then served from local `public/`). Restart `next dev` after changing it — it is read at build time. The public-URL checks (`assets:verify --public`, `assets:download --from-public`) do not need it: they default to the bucket's direct S3 URL | serving migrated assets |
| `AWS_PROFILE` (your shell, not the file) | the name of your local AWS profile / SSO session | authorised uploads |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | alternative to a profile: an access key DevOps issued to you, typed into `.env.local` by you | authorised uploads |

`AWS_S3_BUCKET` / `AWS_S3_REGION` (the names DevOps uses) are accepted as fallbacks for
`ASSETS_S3_BUCKET` / `ASSETS_S3_REGION`. The scripts load `.env.local` into their own process and the AWS
SDK's default chain reads the key pair from there; it is never printed or logged. Credentials never go
into `.env.example` or anything committed — only into the git-ignored `.env.local` or your AWS profile.
A short-lived SSO/role session is preferable to a long-lived access key where DevOps can provide one.

### Production / staging (DevOps)

`NEXT_PUBLIC_ASSET_BASE_URL=https://atlas-web-cdn.s3.ap-south-1.amazonaws.com` is supplied by DevOps in
the environment that runs `next build` (Next.js inlines `NEXT_PUBLIC_*` at build time, and the URL
rewrite runs during the build — setting it only for `next start` has no effect). Nothing else in the application needs production values; the
deployed site never needs AWS credentials. CI's read-only check uses repository variables + OIDC
(§6.4), also managed by DevOps / repository admins.

## 3. Commands

| command | network | writes |
| --- | --- | --- |
| `npm run assets:status` | none | local hash cache only — shows what a sync would upload |
| `npm run assets:sync:dry` | read (list/head) | nothing |
| `npm run assets:sync` | read + write | S3 objects (never deletes); `assets.manifest.json` **only if every upload succeeded** |
| `npm run assets:verify` | read | nothing (`--full`, `--headers`, `--public`, `--origin=`, `--base=`, `--head=`, `--no-refs`) |
| `npm run assets:download` | read (S3, or `--from-public` with no AWS account) | `public/assets/` files, each checked against the manifest SHA-256 before it replaces anything |
| `npm run hooks:install` | none | `git config core.hooksPath .githooks` (also runs on every `npm install`) |

How the scripts decide what to upload and how they prove an object is correct:

- each local file is hashed (SHA-256); a gitignored cache (`.assets-cache.json`) skips re-hashing files
  whose size and modified time have not changed
- only files that are new or differ from the committed manifest are candidates (`--full` checks all)
- `ListObjectsV2` runs once, **only** to know which keys do not exist yet; it returns no user metadata
  and is never treated as checksum evidence
- existing keys are checked with `HeadObject`: the object's `x-amz-meta-sha256` (the full-file SHA-256
  written at upload) and its size must equal the local file — the ETag is not used (it is not a
  SHA-256, and for multipart uploads not even an MD5)
- files under 64 MB go up in one `PutObject` carrying `ChecksumSHA256`, which S3 recomputes and rejects
  on mismatch; larger files (the summer-school reels are up to 210 MB) use a multipart upload in 16 MB
  parts with per-part SHA-256 checks, aborted on failure so no orphaned parts remain
- every upload is retried (3 attempts, exponential back-off) and then confirmed with `HeadObject`
- no ACL is ever sent (`ACL`, `PutObjectAcl` and public-read appear nowhere in the scripts); objects are
  readable by visitors only because of the bucket policy on `assets/*` (§6.1). No script deletes objects
- any failure: exit code 1, a list of failed files, and the manifest is **not** written

## 4. The workflow for adding or changing an asset

```
# 1. put the file(s) under public/assets/… and refer to them in code as '/assets/…'
npm run assets:status          # optional: see what changed
npm run assets:sync            # uploads, verifies with HeadObject, then updates assets.manifest.json

# 2. stage the manifest with your code — only specific paths, never `git add .`
#    the asset file itself is not staged: everything under public/assets/ except fonts/ and brand/ is
#    git-ignored, and the manifest is what records it. Fonts and brand ARE tracked — `git add` those files.
git add assets.manifest.json app/… components/… lib/…
git commit -m "…"

# 3. push — the pre-push hook only VERIFIES (see below); it never edits or commits anything
git push
```

The manifest is changed **before** the commit, by `assets:sync`, and committed by the developer. After
a commit exists nothing rewrites it.

### What the pre-push hook does (`.githooks/pre-push` -> `scripts/assets/pre-push.mjs`)

For every commit being pushed it reads the manifest **as committed in that commit** and:

1. checks that every `/assets/` path written in that commit's `app/`, `components/` and `lib/` is listed
   in the manifest (offline);
2. checks, with `HeadObject`, that every manifest entry changed by the push exists in S3 with the same
   size and SHA-256. A push that changes no manifest entry needs no AWS access.

If either check fails the push is blocked with the reason and the fix (run `assets:sync`, commit the
manifest, push again). It never runs a sync, never modifies files, never stages or commits. It also
prints a non-blocking note when `public/assets/` has local changes not yet synced. It then runs Git LFS's
own pre-push, because setting `core.hooksPath` stops git reading `.git/hooks`; `.githooks/` therefore
also carries the LFS `post-checkout`, `post-commit` and `post-merge` hooks.

### How the hooks get installed — and why GitHub Actions is the real gate

Git does not clone hooks. `npm install` / `npm ci` run the `prepare` script, which sets
`core.hooksPath=.githooks` (`npm run hooks:install` does the same by hand). It leaves an existing,
different `core.hooksPath` alone unless run with `--force`, and does nothing in CI.

A local hook can still be skipped (`git push --no-verify`, or never running `npm install`). So
`.github/workflows/assets-verify.yml` runs the same two checks on every pull request and every push to
`main`, using a **read-only** AWS role through GitHub OIDC (no stored keys). Made a required status check
under branch protection, it is the authoritative gate; the hook just catches problems before they reach
GitHub.

## 5. Onboarding a developer — fresh clone

A fresh clone contains `public/assets/fonts/` and `public/assets/brand/` only. The 8,255 migrated assets are
not in it, so a clone must either point at S3 (Option A) or download them (Option B) before images,
videos and documents appear. Fonts and the brand page work either way.

```
git clone <repo-url> atlas-website
cd atlas-website
npm install                          # dependencies + git hooks (asset check + Git LFS)
cp .env.example .env.local           # then set ASSETS_S3_BUCKET=atlas-web-cdn and ASSETS_S3_REGION (from DevOps); no secrets

# Option A — no local copy: NEXT_PUBLIC_ASSET_BASE_URL=https://atlas-web-cdn.s3.ap-south-1.amazonaws.com in .env.local
npm run dev

# Option B — full local copy of public/assets
aws sso login --profile atlas-assets # or `aws configure --profile atlas-assets`, typed by the developer
export AWS_PROFILE=atlas-assets      # PowerShell: $env:AWS_PROFILE = "atlas-assets"
npm run assets:download              # or, without an AWS account: npm run assets:download -- --from-public
npm run dev
```

`assets:download` checks every file's size and SHA-256 against the manifest before writing it, skips
files that are already correct, and never deletes a local file. Re-running it is always safe.

Pulling a commit that changed assets: run `npm run assets:download` again; it fetches only files whose
SHA-256 differs from the manifest. Developers who add assets need the uploader role; everyone else needs
only read access (or none, with `--from-public` / the public S3 base URL).

**Existing working copies.** The commit that stopped tracking the migrated assets deletes those files
from a working copy when it is pulled, because git removes files that stop being tracked. To keep a local
copy, run `npm run assets:download -- --from-public` after pulling (or set `NEXT_PUBLIC_ASSET_BASE_URL`
instead). After that the files are ignored, and later pulls leave them alone.

## 6. Requirements for DevOps (reference for the DevOps team — not part of the developer setup)

Model: **anonymous read of `assets/*` only**, straight from S3. No CloudFront, no OAC, no public
write/delete/list. Uploads use separate IAM credentials. Nothing in this repository changes AWS
settings — every item below is applied by DevOps.

State read on 2026-11-03 (read-only): bucket `atlas-web-cdn` in `ap-south-1`, empty; Object Ownership
`BucketOwnerEnforced` (ACLs disabled); SSE-S3 (AES256); versioning never enabled; bucket-level Block
Public Access all four `false`; **no account-level Block Public Access configuration**; no bucket
policy; no CORS configuration. An anonymous `GET` of an `assets/` key answers `403 AccessDenied`.

### 6.1 Bucket policy — the one change that makes assets public

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadAssetsOnly",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::atlas-web-cdn/assets/*"
    }
  ]
}
```

`s3:GetObject` covers `GET` and `HEAD` (including range requests, so video seeking works). It grants no
`ListBucket` (no directory listing; a missing key answers 403, not 404), no `PutObject`, no
`DeleteObject`, nothing outside `assets/`. Optionally add a `Deny` for `s3:*` when
`aws:SecureTransport` is `false` if HTTPS-only access is wanted.

### 6.2 Block Public Access

| setting | bucket level | account level | why |
| --- | --- | --- | --- |
| `BlockPublicAcls` | **true** (recommended) | either | ACLs are disabled (BucketOwnerEnforced) and the scripts never send one |
| `IgnorePublicAcls` | **true** (recommended) | either | same |
| `BlockPublicPolicy` | **false** (required) | **false** (required) | otherwise S3 refuses to save the policy above |
| `RestrictPublicBuckets` | **false** (required) | **false** (required) | otherwise S3 ignores the policy's anonymous grant |

The account level overrides the bucket: a setting that is `true` at either level applies. The account
has no configuration today, so nothing is blocked there. If one is added later, it must keep
`BlockPublicPolicy` and `RestrictPublicBuckets` off.

### 6.3 CORS — not required

Fonts were the only assets that needed CORS (browsers refuse a cross-origin `@font-face` without
`Access-Control-Allow-Origin`), and fonts now stay on the site's origin. Nothing else on the site reads
S3 assets in a CORS mode: images, video, CSS backgrounds, links and classic `<script>`s load cross-origin
without it, there is no `fetch()` of an asset, no CSS mask, and the brand page's canvas tools only draw
files the visitor uploads. Verified 2026-11-04 with the S3 build: 0 CORS errors on 38 routes.

A CORS rule does no harm if one is ever wanted (e.g. a future `fetch()` of an S3 asset):

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Type", "ETag"],
    "MaxAgeSeconds": 86400
  }
]
```

`"*"` is enough because every object under `assets/` is public anyway. To restrict it, replace with the
production and staging origins plus `http://localhost:3000`. CORS grants no access by itself — the
bucket policy decides what is readable.

### 6.4 Versioning (recommended)

Enable versioning so an overwritten or mistakenly uploaded object can be recovered. The scripts never
delete, but an upload can replace an existing key.

### 6.5 Headers

S3 returns each object's stored metadata as response headers, set per object by `assets:sync`:
`Content-Type` (correct for `.woff2`, `.webm`, `.avif`, `.ai`, `.svg`, `.js` …), `Cache-Control`
(`public, max-age=604800` by default), `Content-Disposition: attachment; filename=…` on download
formats (`.ai`, `.eps`, `.xlsx`, `.zip` — since brand stayed local, only
`assets/documents/nirf/format-patent-details.xlsx` in S3), and `x-amz-meta-sha256`. There is no CDN in
front, so there is nothing to invalidate: a replaced object is served immediately to new visitors, and
browsers that cached the old bytes keep them until `max-age` expires (7 days).

### 6.6 IAM (uploader)

- **uploader** (the `s3teamuser` key in use today; preferably SSO later):
  `s3:ListBucket` and `s3:ListBucketMultipartUploads` on `arn:aws:s3:::atlas-web-cdn` (optionally with
  condition `s3:prefix` = `assets/*`); `s3:PutObject`, `s3:GetObject`, `s3:AbortMultipartUpload` and
  `s3:ListMultipartUploadParts` on `arn:aws:s3:::atlas-web-cdn/assets/*`. If the bucket ever uses
  SSE-KMS, add `kms:GenerateDataKey` + `kms:Decrypt` on that key.
  **No** `s3:DeleteObject`, `s3:PutObjectAcl`, `s3:PutBucketPolicy` or `s3:PutBucketPublicAccessBlock`.
  Multipart upload (the five summer-school reels, 85–210 MB) needs nothing beyond `s3:PutObject` plus the
  abort/list-parts actions above.
- **reader** (downloads, CI): `s3:ListBucket` + `s3:GetObject` on `assets/*` — or nothing at all, since
  `--from-public` reads anonymously.
- **CI**: a read role trusted by GitHub OIDC (`sub` limited to this repository), passed as the repository
  variable `ASSETS_READ_ROLE_ARN` with `ASSETS_S3_BUCKET` / `ASSETS_S3_REGION`.

### 6.7 Build / deploy

`NEXT_PUBLIC_ASSET_BASE_URL=https://atlas-web-cdn.s3.ap-south-1.amazonaws.com` in the environment that
runs `next build` (and in any staging build). Set it only after the first full `assets:sync` has
succeeded and the bucket policy is in place, or the deployed site will show 403s.

**`next start` needs it too.** `next.config.mjs` is evaluated again when the server boots, and it adds the
S3 host to `images.remotePatterns` only when the variable is set. Without it at runtime every
`next/image` of an S3 asset answers `400 "url" parameter is not allowed` from `/_next/image`
(verified 2026-11-04). Set it for the pm2 process as well as for `npm run build`.

**The deployed checkout does not contain the migrated assets.** Git tracks only fonts and brand, so a
production or staging checkout has no local copy of the 8,255 S3 assets, and a build without
`NEXT_PUBLIC_ASSET_BASE_URL` would ship pages pointing at local files that do not exist. Requirements for
every deployment:

- `NEXT_PUBLIC_ASSET_BASE_URL` set for both `next build` and `next start`, as above. A project `.env`
  in the deployed directory is read by both; an `export` in `~/.bashrc` is not seen by a non-interactive
  SSH deploy.
- No AWS credentials and no `assets:download` are needed to serve the site.
- On a server that already had a checkout, the first deploy after this change (`git reset --hard`)
  deletes the migrated files from that checkout. Serving is unaffected. A local copy is only needed to
  roll back to local serving (§7): restore it with `npm run assets:download -- --from-public` (about
  2.1 GB) before emptying the variable.
- Never run `git clean` in the deployed directory: a plain `git clean -f` deletes the untracked `.env`,
  and `-x` / `-X` also delete ignored files such as downloaded assets.

### 6.8 How we verify end to end

```
npm run assets:verify -- --full --headers     # S3 (signed): every object's size, SHA-256 and metadata
npm run assets:verify -- --full --public      # anonymous HTTPS: what a visitor receives
curl -sI https://atlas-web-cdn.s3.ap-south-1.amazonaws.com/assets/brand/form-headers/atlas.jpg
#   expect: 200, content-type: image/jpeg, cache-control: public, max-age=604800
curl -sI https://atlas-web-cdn.s3.ap-south-1.amazonaws.com/assets/documents/nirf/format-patent-details.xlsx
#   expect: content-disposition: attachment; filename="…"
```

`--public --full` HEADs **every** manifest entry **without credentials** (16 at a time); without `--full`
it checks up to ten download files and a spread sample. Each must answer 200 with the manifest's
`Content-Length` and the `Content-Type`, `Cache-Control` and `Content-Disposition` the upload rules
set. It defaults to the direct S3 URL and uses `NEXT_PUBLIC_ASSET_BASE_URL` instead when that is set.
Fonts and brand files are local-only and not part of it.

## 7. Reversibility
- `NEXT_PUBLIC_ASSET_BASE_URL` empty -> everything is served from local `public/` again. Since the
  migrated assets left git tracking, that needs a local copy first: run
  `npm run assets:download -- --from-public`, then rebuild with the variable empty
- nothing deletes remote objects; bucket versioning (once DevOps enables it) protects overwrites
- making the bucket private again is one change: delete the `PublicReadAssetsOnly` policy statement
- local `public/assets/` is never deleted by any script
- the migrated assets were removed from git tracking with `git rm --cached` (files kept on disk, no history
  rewrite), without touching the two local-only folders. Every removed file is still in git history and
  in S3. To track them again, delete the three `public/assets` lines from `.gitignore` and `git add` the
  folder. This does not shrink git history: the removed files' past versions stay in the repository.
