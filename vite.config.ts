import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Runs the same logic as server/index.ts inside the Vite dev server so local
// `npm run dev` gives you a working /api/generate without running the
// Express server separately. Production builds never touch this file —
// the deployed Express server (server/index.ts, on Render) handles it there.
function localApiPlugin(): Plugin {
  return {
    name: 'local-api-generate',
    configureServer(server) {
      server.middlewares.use('/api/generate', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Allow', 'POST');
          res.end(JSON.stringify({ success: false, error: 'Method not allowed. Use POST.' }));
          return;
        }

        try {
          const { runGenerate } = await server.ssrLoadModule('/server/_lib/handleGenerate.ts');

          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const raw = Buffer.concat(chunks).toString('utf-8');

          let body: unknown = {};
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Request body must be valid JSON.' }));
            return;
          }

          const result = await runGenerate(body, req.headers, req.socket?.remoteAddress || 'unknown');

          res.statusCode = result.status;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          if (result.retryAfterSeconds) res.setHeader('Retry-After', String(result.retryAfterSeconds));
          res.end(JSON.stringify(result.payload));
        } catch (err) {
          console.error('[local-api-generate]', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Local dev API middleware crashed. Check the terminal.' }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Load .env / .env.local into process.env so GEMINI_API_KEY is visible
  // to the dev middleware above (Vite only auto-exposes VITE_-prefixed vars
  // to client code, not server-side plugin code).
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), tailwindcss(), localApiPlugin()]
  };
});
