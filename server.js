const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve your HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page2.html'), (err) => {
    if (err) {
      console.error('Error serving the file:', err);
      res.status(500).send('Error serving the file');
    }
  });
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
