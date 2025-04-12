// server.js (or a similar backend file)
const express = require('express');
const cors = require('cors'); // For handling cross-origin requests
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3001; // Or any other port for your backend

app.use(cors());
app.use(express.json()); // To parse request bodies as JSON

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        res.json({ response: responseText });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});