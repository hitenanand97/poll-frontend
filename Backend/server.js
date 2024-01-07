// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Add this line

const app = express();
const port = 3001;
app.use(cors()); // Add this line

app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.post('/submit-poll', async (req, res) => {
  const { name, choice, date } = req.body;

  try {
    await pool.query(
      'INSERT INTO poll (name, choice, date) VALUES ($1, $2, $3)',
      [name, choice, date]
    );

    res.status(201).json({ message: 'Poll submitted successfully' });
  } catch (error) {
    console.error('Error submitting poll:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-poll-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM poll');
    const pollData = result.rows;
    res.json(pollData);
  } catch (error) {
    console.error('Error fetching poll data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
