import express from 'express';
import cors from 'cors';
import { runGenerate } from './_lib/handleGenerate';

const app = express();

app.use(express.json({ limit: '1mb' }));

// Comma-separated list of allowed origins, e.g. "https://echoed.vercel.app,http://localhost:5173"
// Falls back to "*" (any origin) if unset — lock this down once your Vercel URL is known.
const allowedOrigins = (process.env.ALLOWED_ORIGIN || '*')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.includes('*') ? true : allowedOrigins
  })
);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'echoed-api' });
});

app.post('/api/generate', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  const result = await runGenerate(req.body, req.headers, req.socket.remoteAddress || 'unknown');

  if (result.retryAfterSeconds) {
    res.setHeader('Retry-After', String(result.retryAfterSeconds));
  }

  res.status(result.status).json(result.payload);
});

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Not found.' });
});

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(`Echoed API listening on port ${port}`);
});
