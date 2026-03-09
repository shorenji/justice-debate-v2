const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + '/'));

app.post('/chat', async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        // 最新の Gemini 1.5 Flash を指定（最も安定して動くモデルです）
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await axios.post(apiUrl, {
            contents: [{ parts: [{ text: req.body.prompt }] }]
        });
        res.json(response.data);
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: '通信エラー' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
