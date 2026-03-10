import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getDB } from '../db/database.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dotaroulette_dev_secret';

router.post('/login', (req, res) => {
  const { username, provider } = req.body;
  
  if (!username || username.trim().length < 2) {
    return res.status(400).json({ error: 'Username must be at least 2 characters' });
  }

  const db = getDB();
  
  let user = db.prepare('SELECT * FROM users WHERE username = ? AND auth_provider = ?')
    .get(username.trim(), provider || 'demo');

  if (!user) {
    const result = db.prepare('INSERT INTO users (username, auth_provider) VALUES (?, ?)')
      .run(username.trim(), provider || 'demo');
    user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, provider: user.auth_provider },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ user: { id: user.id, username: user.username, provider: user.auth_provider } });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

router.get('/me', (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
