const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

const testGroq = async () => {
    const apiKey = process.env.GROQ_API_KEY;
    console.log('Using API Key:', apiKey ? 'Key found (hidden)' : 'Key NOT found');

    if (!apiKey) return;

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'mixtral-8x7b-32768',
                messages: [{ role: 'user', content: 'Say hello' }],
                max_tokens: 10
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('API Response:', response.data.choices[0].message.content);
        console.log('Status: API Key is WORKING');
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        console.log('Status: API Key is INVALID or EXPIRED');
    }
};

testGroq();
