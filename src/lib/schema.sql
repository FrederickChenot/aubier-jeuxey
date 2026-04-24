-- Run this once on your Neon database to initialize the schema

CREATE TABLE IF NOT EXISTS reservations (
  id               SERIAL PRIMARY KEY,
  checkin          DATE NOT NULL,
  checkout         DATE NOT NULL,
  guest_name       TEXT NOT NULL,
  guest_email      TEXT NOT NULL,
  guest_phone      TEXT NOT NULL,
  guests_count     INTEGER NOT NULL DEFAULT 1,
  total_price      NUMERIC(10,2) NOT NULL,
  deposit_amount   NUMERIC(10,2),
  status           TEXT NOT NULL DEFAULT 'pending',
  source           TEXT NOT NULL DEFAULT 'direct',
  stripe_session_id TEXT,
  message          TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blocked_dates (
  id          SERIAL PRIMARY KEY,
  date_start  DATE NOT NULL,
  date_end    DATE NOT NULL,
  reason      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_views (
  id         SERIAL PRIMARY KEY,
  page       TEXT NOT NULL,
  viewed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  referrer   TEXT
);

-- Index for fast availability checks
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON reservations (checkin, checkout);
CREATE INDEX IF NOT EXISTS idx_blocked_dates ON blocked_dates (date_start, date_end);
