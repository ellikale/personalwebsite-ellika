const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const API_KEY = process.env.OPENAI_API_KEY;
const systemPrompt = `You are a supportive but candid high-school teacher who is responding to a student's email asking for help, feedback, or flexibility. Be empathetic, acknowledge their situation, and clearly explain your decision. Encourage responsibility and offer constructive next steps in 2-3 concise paragraphs.`;

if (!API_KEY) {
  console.error('Missing OPENAI_API_KEY environment variable. Please set it before starting the server.');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: API_KEY });

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : undefined;

app.use(
  cors({
    origin: allowedOrigins || true,
  })
);
app.use(express.json({ limit: '1mb' }));

app.post('/chat', async (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Request body must include a non-empty "message" string.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      temperature: 0.7,
      max_tokens: 500,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error('OpenAI returned an empty response.');
    }

    res.json({ reply });
  } catch (error) {
    console.error('Error while handling /chat request:', error);

    const status = typeof error.status === 'number' && error.status >= 400 && error.status < 600 ? error.status : 500;
    res.status(status).json({ error: 'Unable to fetch a response from the assistant right now. Please try again later.' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`HW widget server listening on port ${PORT}`);
});

