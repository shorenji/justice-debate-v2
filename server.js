const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// UptimeRobot用（スリープ防止）
app.get('/health', (req, res) => res.status(200).send('OK'));

app.post('/api/chat', async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        // 最新の Gemini 3.1 Flash-Lite を指定
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`;
        
        const response = await axios.post(apiUrl, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: '通信エラーが発生しました' });
    }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

