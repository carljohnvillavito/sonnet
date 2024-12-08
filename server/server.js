const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to handle bot requests
app.get('/api/chat', async (req, res) => {
    const { q, uid } = req.query;

    if (!q || !uid) {
        return res.status(400).json({ error: 'Missing query parameter q or uid' });
    }

    try {
        const apiURL = `https://kaiz-apis.gleeze.com/api/gpt-4o-pro?q=${encodeURIComponent(q)}&uid=${uid}`;
        const response = await axios.get(apiURL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching response from API:', error);
        res.status(500).json({ error: 'Failed to fetch response from API' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
