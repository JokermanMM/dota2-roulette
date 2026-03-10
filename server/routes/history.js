import { Router } from 'express';
import { getDB } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  const db = getDB();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const rows = db.prepare(
    'SELECT * FROM roll_history WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).all(req.user.id, limit, offset);

  const total = db.prepare(
    'SELECT COUNT(*) as count FROM roll_history WHERE user_id = ?'
  ).get(req.user.id);

  const parsed = rows.map(row => ({
    ...row,
    players: JSON.parse(row.players),
    roles: JSON.parse(row.roles),
    heroes: JSON.parse(row.heroes)
  }));

  res.json({ 
    rolls: parsed, 
    total: total.count, 
    page, 
    pages: Math.ceil(total.count / limit) 
  });
});

router.post('/', authMiddleware, (req, res) => {
  const { players, roles, heroes, mode } = req.body;

  if (!players || !roles || !heroes || !mode) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const db = getDB();
  const result = db.prepare(
    'INSERT INTO roll_history (user_id, players, roles, heroes, mode) VALUES (?, ?, ?, ?, ?)'
  ).run(
    req.user.id,
    JSON.stringify(players),
    JSON.stringify(roles),
    JSON.stringify(heroes),
    mode
  );

  const row = db.prepare('SELECT * FROM roll_history WHERE id = ?').get(result.lastInsertRowid);

  res.status(201).json({
    ...row,
    players: JSON.parse(row.players),
    roles: JSON.parse(row.roles),
    heroes: JSON.parse(row.heroes)
  });
});

router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDB();
  const row = db.prepare('SELECT * FROM roll_history WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user.id);

  if (!row) {
    return res.status(404).json({ error: 'Roll not found' });
  }

  db.prepare('DELETE FROM roll_history WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
