const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// MySQL DB connection file
const db = require('./db');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Home route (render frontend)
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
