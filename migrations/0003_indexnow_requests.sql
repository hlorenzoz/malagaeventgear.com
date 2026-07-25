-- MEG IndexNow rate-limit log — one row per POST /api/indexnow attempt that passed
-- validation, used to throttle by CF-Connecting-IP (mirrors lead_events' role for leads).
-- Apply with: wrangler d1 migrations apply meg-leads

CREATE TABLE IF NOT EXISTS indexnow_requests (
  id         TEXT PRIMARY KEY,
  ip         TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_indexnow_requests_ip ON indexnow_requests(ip);
CREATE INDEX IF NOT EXISTS idx_indexnow_requests_created_at ON indexnow_requests(created_at);
