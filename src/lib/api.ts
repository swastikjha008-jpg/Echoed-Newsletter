import type { Tone } from './shared';

export interface GeneratedPosts {
  x: string;
  linkedin: string;
  instagram: string;
}

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const FALLBACK_ERROR = 'Something went wrong generating your posts. Please try again.';

// In production this should point at your deployed Render backend, e.g.
// VITE_API_URL="https://echoed-api.onrender.com/api/generate"
// Left unset, it hits the local Vite dev middleware at /api/generate.
const API_URL = import.meta.env.VITE_API_URL || '/api/generate';

export async function generatePosts(newsletter: string, tone: Tone): Promise<GeneratedPosts> {
  let res: Response;
  try {
    res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newsletter, tone })
    });
  } catch {
    throw new ApiError('Network error — check your connection and try again.');
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new ApiError('The server sent back an unexpected response. Please try again.', res.status);
  }

  const body = data as { success?: boolean; posts?: GeneratedPosts; error?: string };

  if (!res.ok || !body.success || !body.posts) {
    throw new ApiError(body?.error || FALLBACK_ERROR, res.status);
  }

  return body.posts;
}
