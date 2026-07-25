-- MEG IndexNow submissions — tracks which URLs have been pushed to IndexNow
-- (Bing/Yandex reindex signal). Apply with: wrangler d1 migrations apply meg-leads

CREATE TABLE IF NOT EXISTS indexnow_submissions (
  url                 TEXT PRIMARY KEY,   -- absolute URL, e.g. https://malagaeventgear.com/blog/x/
  submitted_at        TEXT NOT NULL,      -- ISO 8601 UTC, when the last successful submission happened
  content_updated_at  TEXT NOT NULL       -- the node's `updated` date at submission time (audit trail)
);
