const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',     // your MySQL password
  database: 'task_manager'  // your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to DB:', err.message);
    return;
  }
  console.log('Connected to MySQL Database!');
});

module.exports = db;
