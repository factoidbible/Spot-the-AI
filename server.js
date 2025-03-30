// Import the express module
const express = require('express');
const app = express();

// Set the port for the app
const port = process.env.PORT || 3000;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Welcome to Spot the AI!');
});

// Your routes for game logic, leaderboard, etc.
app.get('/leaderboard', (req, res) => {
  res.json({ message: 'Leaderboard data will go here.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

