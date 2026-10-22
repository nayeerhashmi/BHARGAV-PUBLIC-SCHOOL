CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 2 AND 80),
  phone TEXT NOT NULL CHECK(length(phone) = 13),
  category TEXT NOT NULL CHECK(category IN ('Appreciation','Suggestion','Concern','General feedback')),
  message TEXT NOT NULL CHECK(length(message) BETWEEN 5 AND 2000),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);