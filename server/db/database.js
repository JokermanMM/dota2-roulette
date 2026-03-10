import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export function initDB() {
  const dbPath = path.join(__dirname, '..', '..', 'dotaroulette.db');
  db = new Database(dbPath);

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      auth_provider TEXT NOT NULL DEFAULT 'demo',
      avatar_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS roll_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      players TEXT NOT NULL,
      roles TEXT NOT NULL,
      heroes TEXT NOT NULL,
      mode TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_history_user ON roll_history(user_id);
    CREATE INDEX IF NOT EXISTS idx_history_date ON roll_history(created_at DESC);
  `);

  return db;
}

export function getDB() {
  if (!db) throw new Error('Database not initialized');
  return db;
}
