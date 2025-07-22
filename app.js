const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'taskdb' // your DB name
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Show all tasks
app.get('/', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.render('index', { tasks: results });
  });
});

// Add task
app.post('/add', (req, res) => {
  const { title, status } = req.body;
  const query = 'INSERT INTO tasks (title, status) VALUES (?, ?)';
  db.query(query, [title, status], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Delete task
app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Update task status
app.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.post('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Error deleting task');
    } else {
      res.redirect('/');
    }
  });
});
