const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tasks
router.get('/', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Add a new task
router.post('/', (req, res) => {
  const { title, status } = req.body;
  db.query('INSERT INTO tasks (title, status) VALUES (?, ?)', [title, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, title, status });
  });
});

module.exports = router;
