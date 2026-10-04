PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  service TEXT NOT NULL,
  budget_label TEXT NOT NULL,
  custom_budget_ngn INTEGER,
  project_description TEXT NOT NULL,
  preferred_deadline TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'received',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  booking_id TEXT NOT NULL UNIQUE REFERENCES bookings(id),
  service TEXT NOT NULL,
  budget_label TEXT NOT NULL,
  amount_ngn INTEGER,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status TEXT NOT NULL,
  deliverables_json TEXT NOT NULL,
  notes TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS invoices_created_at_idx ON invoices(created_at);