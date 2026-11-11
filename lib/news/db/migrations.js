/**
 * ATLAS News — schema migrations, in order. Applied by lib/news/db/migrate.js.
 *
 * Rules (enforced by the runner, not just by convention):
 *   - every statement may only CREATE / ALTER / DROP a table whose name starts with `atlasnews_`;
 *   - `down` reverses `up` exactly and touches nothing else;
 *   - an applied migration is never edited — its checksum is recorded and a mismatch stops the runner.
 *     Change the schema by adding a new migration.
 *
 * Conventions: InnoDB, utf8mb4 / utf8mb4_unicode_ci (the collation the Employee Survey database already
 * uses), DATETIME(3) in UTC, BIGINT UNSIGNED ids for anything that can grow, and every legacy WordPress id
 * kept in its own UNIQUE column so the Stage 4 import is repeatable (re-running it updates, never
 * duplicates). JSON columns are declared JSON — a native type on MySQL 5.7+, an alias of LONGTEXT with a
 * JSON_VALID check on MariaDB 10.2+.
 */
import { T } from '../config.js';

const TABLE_OPTS = 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci';
const NOW3 = 'DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)';
const UPD3 = 'DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)';

export const MIGRATIONS = [
  {
    id: '0001_initial_schema',
    description: 'News foundation: media, categories, tags, posts, relations, homepage slots, redirects, settings, admin sessions, login attempts',
    up: [
      /* ---- media: S3 references and metadata only, never image bytes -------------------------- */
      `CREATE TABLE ${T.media} (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        kind ENUM('image','video','file') NOT NULL DEFAULT 'image',
        storage_key VARCHAR(512) NOT NULL COMMENT 'S3 key of the primary rendition (assets/news/...)',
        sha256 CHAR(64) NOT NULL COMMENT 'SHA-256 of the uploaded source bytes, for de-duplication',
        mime_type VARCHAR(100) NOT NULL COMMENT 'MIME type of the stored primary rendition',
        source_mime VARCHAR(100) NULL COMMENT 'MIME type of the file as uploaded',
        byte_size BIGINT UNSIGNED NOT NULL DEFAULT 0,
        width INT UNSIGNED NULL,
        height INT UNSIGNED NULL,
        variants JSON NULL COMMENT '[{name,width,height,bytes,key}] responsive renditions',
        alt_text VARCHAR(500) NULL,
        caption TEXT NULL,
        original_filename VARCHAR(255) NULL,
        legacy_wp_id BIGINT UNSIGNED NULL COMMENT 'WordPress attachment ID (Stage 4 import)',
        legacy_path VARCHAR(512) NULL COMMENT 'WordPress uploads path, e.g. 2023/07/x-1024x681.jpg',
        created_at ${NOW3},
        updated_at ${UPD3},
        PRIMARY KEY (id),
        UNIQUE KEY uq_atlasnews_media_storage_key (storage_key),
        UNIQUE KEY uq_atlasnews_media_legacy_wp_id (legacy_wp_id),
        KEY idx_atlasnews_media_sha256 (sha256),
        KEY idx_atlasnews_media_legacy_path (legacy_path(255)),
        KEY idx_atlasnews_media_created (created_at)
      ) ${TABLE_OPTS}`,

      /* ---- categories: menu flag + order live here (max 8 enforced by the app) ------------------ */
      `CREATE TABLE ${T.categories} (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        slug VARCHAR(200) NOT NULL,
        name VARCHAR(200) NOT NULL,
        description TEXT NULL,
        show_in_menu TINYINT(1) NOT NULL DEFAULT 0,
        menu_order SMALLINT UNSIGNED NULL,
        seo_title VARCHAR(255) NULL,
        seo_description VARCHAR(500) NULL,
        legacy_wp_term_id BIGINT UNSIGNED NULL,
        created_at ${NOW3},
        updated_at ${UPD3},
        PRIMARY KEY (id),
        UNIQUE KEY uq_atlasnews_categories_slug (slug),
        UNIQUE KEY uq_atlasnews_categories_legacy (legacy_wp_term_id),
        KEY idx_atlasnews_categories_menu (show_in_menu, menu_order)
      ) ${TABLE_OPTS}`,

      /* ---- tags: stored (approved), not shown publicly yet ------------------------------------- */
      `CREATE TABLE ${T.tags} (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        slug VARCHAR(200) NOT NULL,
        name VARCHAR(200) NOT NULL,
        legacy_wp_term_id BIGINT UNSIGNED NULL,
        created_at ${NOW3},
        updated_at ${UPD3},
        PRIMARY KEY (id),
        UNIQUE KEY uq_atlasnews_tags_slug (slug),
        UNIQUE KEY uq_atlasnews_tags_legacy (legacy_wp_term_id)
      ) ${TABLE_OPTS}`,

      /* ---- posts ------------------------------------------------------------------------------- */
      `CREATE TABLE ${T.posts} (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        slug VARCHAR(400) NOT NULL COMMENT 'URL segment; legacy WordPress slugs may be percent-encoded',
        title VARCHAR(500) NOT NULL,
        excerpt TEXT NULL,
        content_html MEDIUMTEXT NOT NULL COMMENT 'sanitised HTML (lib/news/content/sanitize.js)',
        status ENUM('draft','scheduled','published') NOT NULL DEFAULT 'draft',
        published_at DATETIME(3) NULL COMMENT 'UTC; a published/scheduled post is public once this has passed',
        featured_media_id BIGINT UNSIGNED NULL,
        og_media_id BIGINT UNSIGNED NULL,
        primary_category_id INT UNSIGNED NULL,
        author_name VARCHAR(150) NOT NULL DEFAULT 'ATLAS News Desk',
        seo_title VARCHAR(255) NULL,
        seo_description VARCHAR(500) NULL,
        instagram_permalink VARCHAR(500) NULL COMMENT 'optional official Instagram embed (click-to-load)',
        legacy_wp_id BIGINT UNSIGNED NULL,
        legacy_url VARCHAR(600) NULL,
        created_at ${NOW3},
        updated_at ${UPD3},
        deleted_at DATETIME(3) NULL COMMENT 'soft delete',
        PRIMARY KEY (id),
        UNIQUE KEY uq_atlasnews_posts_slug (slug),
        UNIQUE KEY uq_atlasnews_posts_legacy (legacy_wp_id),
        KEY idx_atlasnews_posts_public (status, deleted_at, published_at),
        KEY idx_atlasnews_posts_primary_cat (primary_category_id, published_at),
        KEY idx_atlasnews_posts_updated (updated_at),
        KEY idx_atlasnews_posts_featured (featured_media_id),
        KEY idx_atlasnews_posts_og (og_media_id),
        CONSTRAINT fk_atlasnews_posts_featured FOREIGN KEY (featured_media_id) REFERENCES ${T.media} (id) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT fk_atlasnews_posts_og FOREIGN KEY (og_media_id) REFERENCES ${T.media} (id) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT fk_atlasnews_posts_primary_cat FOREIGN KEY (primary_category_id) REFERENCES ${T.categories} (id) ON DELETE SET NULL ON UPDATE CASCADE
      ) ${TABLE_OPTS}`,

      `CREATE TABLE ${T.postCategories} (
        post_id BIGINT UNSIGNED NOT NULL,
        category_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (post_id, category_id),
        KEY idx_atlasnews_post_categories_cat (category_id, post_id),
        CONSTRAINT fk_atlasnews_pc_post FOREIGN KEY (post_id) REFERENCES ${T.posts} (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_atlasnews_pc_cat FOREIGN KEY (category_id) REFERENCES ${T.categories} (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ${TABLE_OPTS}`,

      `CREATE TABLE ${T.postTags} (
        post_id BIGINT UNSIGNED NOT NULL,
        tag_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (post_id, tag_id),
        KEY idx_atlasnews_post_tags_tag (tag_id, post_id),
        CONSTRAINT fk_atlasnews_pt_post FOREIGN KEY (post_id) REFERENCES ${T.posts} (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_atlasnews_pt_tag FOREIGN KEY (tag_id) REFERENCES ${T.tags} (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ${TABLE_OPTS}`,

      /* ---- the curated row right after the homepage hero -------------------------------------- */
      `CREATE TABLE ${T.homepageSlots} (
        position TINYINT UNSIGNED NOT NULL,
        post_id BIGINT UNSIGNED NOT NULL,
        updated_at ${UPD3},
        PRIMARY KEY (position),
        UNIQUE KEY uq_atlasnews_homepage_slots_post (post_id),
        CONSTRAINT fk_atlasnews_hs_post FOREIGN KEY (post_id) REFERENCES ${T.posts} (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ${TABLE_OPTS}`,

      /* ---- redirects: old WordPress slugs and renames ----------------------------------------- */
      `CREATE TABLE ${T.redirects} (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        from_path VARCHAR(600) NOT NULL,
        to_path VARCHAR(600) NOT NULL,
        status_code SMALLINT UNSIGNED NOT NULL DEFAULT 301,
        source ENUM('wp_old_slug','import','manual') NOT NULL DEFAULT 'manual',
        created_at ${NOW3},
        updated_at ${UPD3},
        PRIMARY KEY (id),
        UNIQUE KEY uq_atlasnews_redirects_from (from_path),
        CONSTRAINT chk_atlasnews_redirects_status CHECK (status_code IN (301, 302, 307, 308))
      ) ${TABLE_OPTS}`,

      /* ---- settings: small key/value store (admin password hash, menu limit, ...) -------------- */
      `CREATE TABLE ${T.settings} (
        setting_key VARCHAR(100) NOT NULL,
        setting_value MEDIUMTEXT NOT NULL,
        updated_at ${UPD3},
        PRIMARY KEY (setting_key)
      ) ${TABLE_OPTS}`,

      /* ---- admin sessions: only the SHA-256 of the token is stored --------------------------- */
      `CREATE TABLE ${T.sessions} (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        token_hash CHAR(64) NOT NULL,
        created_at ${NOW3},
        last_seen_at ${NOW3},
        expires_at DATETIME(3) NOT NULL COMMENT 'absolute expiry',
        revoked_at DATETIME(3) NULL,
        ip VARCHAR(45) NULL,
        user_agent VARCHAR(255) NULL,
        PRIMARY KEY (id),
        UNIQUE KEY uq_atlasnews_admin_sessions_token (token_hash),
        KEY idx_atlasnews_admin_sessions_expires (expires_at)
      ) ${TABLE_OPTS}`,

      /* ---- login attempts: persistent rate limiting (survives a pm2 reload) ------------------- */
      `CREATE TABLE ${T.loginAttempts} (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        ip VARCHAR(45) NOT NULL,
        succeeded TINYINT(1) NOT NULL DEFAULT 0,
        attempted_at ${NOW3},
        PRIMARY KEY (id),
        KEY idx_atlasnews_login_attempts_ip (ip, attempted_at),
        KEY idx_atlasnews_login_attempts_time (attempted_at)
      ) ${TABLE_OPTS}`,
    ],
    /* reverse order: dependants first. Only our own tables, and IF EXISTS so a half-applied `up` can
       be rolled back by the same statements. */
    down: [
      `DROP TABLE IF EXISTS ${T.loginAttempts}`,
      `DROP TABLE IF EXISTS ${T.sessions}`,
      `DROP TABLE IF EXISTS ${T.settings}`,
      `DROP TABLE IF EXISTS ${T.redirects}`,
      `DROP TABLE IF EXISTS ${T.homepageSlots}`,
      `DROP TABLE IF EXISTS ${T.postTags}`,
      `DROP TABLE IF EXISTS ${T.postCategories}`,
      `DROP TABLE IF EXISTS ${T.posts}`,
      `DROP TABLE IF EXISTS ${T.tags}`,
      `DROP TABLE IF EXISTS ${T.categories}`,
      `DROP TABLE IF EXISTS ${T.media}`,
    ],
  },

  /* ==== 0002 — Stage 3 CMS gaps (approved 2026-11-09). Additive only: five nullable/defaulted columns,
     their indexes and one foreign key. No existing column, key or row is changed.
     `pairedDown`: down[i] reverses up[up.length - 1 - i] exactly, so if one ALTER fails part-way the
     runner reverts the ALTERs that already succeeded (lib/news/db/migrate.js). One ALTER per table is
     atomic on both MySQL and MariaDB; the categories foreign key is its own step so `down` can drop the
     constraint before the column and index it depends on. */
  {
    id: '0002_cms_schema_gaps',
    description: 'CMS gaps: posts.canonical_url, categories.image_media_id + is_featured, media.deleted_at, homepage_slots.zone',
    pairedDown: true,
    up: [
      `ALTER TABLE ${T.posts}
        ADD COLUMN canonical_url VARCHAR(600) NULL COMMENT 'optional canonical override; empty means the article URL' AFTER seo_description`,

      `ALTER TABLE ${T.media}
        ADD COLUMN deleted_at DATETIME(3) NULL COMMENT 'soft delete; the S3 object is removed only once unreferenced' AFTER updated_at,
        ADD KEY idx_atlasnews_media_deleted (deleted_at)`,

      `ALTER TABLE ${T.homepageSlots}
        ADD COLUMN zone ENUM('hero_centre','hero_left','hero_right','featured','picks') NOT NULL DEFAULT 'featured' COMMENT 'homepage area; position stays globally unique' AFTER position,
        ADD KEY idx_atlasnews_homepage_slots_zone (zone, position)`,

      `ALTER TABLE ${T.categories}
        ADD COLUMN image_media_id BIGINT UNSIGNED NULL COMMENT 'optional category image' AFTER description,
        ADD COLUMN is_featured TINYINT(1) NOT NULL DEFAULT 0 AFTER menu_order,
        ADD KEY idx_atlasnews_categories_image (image_media_id),
        ADD KEY idx_atlasnews_categories_featured (is_featured)`,

      `ALTER TABLE ${T.categories}
        ADD CONSTRAINT fk_atlasnews_categories_image FOREIGN KEY (image_media_id) REFERENCES ${T.media} (id) ON DELETE SET NULL ON UPDATE CASCADE`,
    ],
    /* exact reverse, step for step. Rolling back discards only the values held in these new columns. */
    down: [
      `ALTER TABLE ${T.categories} DROP FOREIGN KEY fk_atlasnews_categories_image`,
      `ALTER TABLE ${T.categories}
        DROP KEY idx_atlasnews_categories_featured,
        DROP KEY idx_atlasnews_categories_image,
        DROP COLUMN is_featured,
        DROP COLUMN image_media_id`,
      `ALTER TABLE ${T.homepageSlots} DROP KEY idx_atlasnews_homepage_slots_zone, DROP COLUMN zone`,
      `ALTER TABLE ${T.media} DROP KEY idx_atlasnews_media_deleted, DROP COLUMN deleted_at`,
      `ALTER TABLE ${T.posts} DROP COLUMN canonical_url`,
    ],
  },

  /* ==== 0003 — category hierarchy (approved 2026-11-11, Phase G1). Additive only: one nullable
     self-referencing column, its index and its foreign key. Every existing category stays a ROOT
     (parent_id NULL) and keeps its id.
       - ON DELETE RESTRICT: a category that still has children cannot be deleted at all — never
         cascaded (descendants silently removed) and never SET NULL (descendants silently re-rooted).
         The CMS refuses first with a readable message; the key is the database-level guarantee.
       - ON UPDATE CASCADE, like every other key in this schema (ids never change in practice).
       - Cycles and the depth limit cannot be expressed as a foreign key (or portably as a CHECK on an
         AUTO_INCREMENT column), so lib/news/cms/categories.js enforces them, inside a transaction that
         locks the category rows.
     The index leads with parent_id so "children of X" (and the RESTRICT check) never scan the table. */
  {
    id: '0003_category_hierarchy',
    description: 'Category hierarchy: categories.parent_id (self-reference, ON DELETE RESTRICT)',
    pairedDown: true,
    up: [
      `ALTER TABLE ${T.categories}
        ADD COLUMN parent_id INT UNSIGNED NULL COMMENT 'parent category; NULL = root' AFTER id,
        ADD KEY idx_atlasnews_categories_parent (parent_id, menu_order)`,

      `ALTER TABLE ${T.categories}
        ADD CONSTRAINT fk_atlasnews_categories_parent FOREIGN KEY (parent_id) REFERENCES ${T.categories} (id) ON DELETE RESTRICT ON UPDATE CASCADE`,
    ],
    down: [
      `ALTER TABLE ${T.categories} DROP FOREIGN KEY fk_atlasnews_categories_parent`,
      `ALTER TABLE ${T.categories} DROP KEY idx_atlasnews_categories_parent, DROP COLUMN parent_id`,
    ],
  },
];

/** Every table the migrations create, excluding the bookkeeping table — for status output. */
export const MANAGED_TABLES = Object.values(T).filter((n) => n !== T.migrations);
