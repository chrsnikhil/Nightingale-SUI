const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Serve the publish page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publish.html'));
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 