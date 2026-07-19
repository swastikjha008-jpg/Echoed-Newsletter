import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { PLATFORM_META, type Tone } from '../../src/lib/shared';

const MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiConfigError('GEMINI_API_KEY is not set on the server.');
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

export class GeminiConfigError extends Error {}
export class GeminiUpstreamError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}
export class GeminiParseError extends Error {}

const TONE_GUIDANCE: Record<Tone, string> = {
  casual: 'Friendly and conversational, like a smart friend texting a hot take. Contractions welcome. Light, natural use of emoji is fine but never forced.',
  professional: 'Clear, credible, and structured. Confident without being stiff. No emoji, no slang. Suitable for a business audience that skims for takeaways.',
  witty: 'Sharp, a little irreverent, quotable. Humor comes from an unexpected angle on the idea itself, never from the platform, the reader, or unrelated groups.'
};

function buildPrompt(newsletter: string, tone: Tone): string {
  return `You are Echoed, an assistant that turns one newsletter into three platform-native social posts. You never invent facts, statistics, quotes, or claims that are not present in the source newsletter — you only change how the existing ideas are delivered.

SOURCE NEWSLETTER:
"""
${newsletter}
"""

TONE: ${tone}
Tone guidance: ${TONE_GUIDANCE[tone]}

Write three separate posts derived from the newsletter above:

1. X (Twitter) post — punchy and scroll-stopping. Hard limit: ${PLATFORM_META.x.charLimit} characters. Lead with the sharpest single idea from the newsletter.
2. LinkedIn post — structured for a professional feed. Aim for roughly 400-900 characters (hard limit: ${PLATFORM_META.linkedin.charLimit}). Use short paragraphs or line breaks the way real LinkedIn posts do. Can include a brief list of takeaways if it fits the newsletter's content.
3. Instagram caption — conversational, hook-first, ends naturally (a question, a call to action, or a line-in-bio style close). Aim for roughly 150-400 characters (hard limit: ${PLATFORM_META.instagram.charLimit}). Light, natural hashtag use at the end (2-5 relevant hashtags) is appropriate here only.

Rules:
- Each post must stand alone and make sense without the reader having seen the newsletter.
- Do not repeat the exact same sentence across more than one platform — rephrase for each platform's voice.
- Do not use markdown formatting (no asterisks, no headers).
- Do not exceed the hard character limits given above.
- Respond with only the JSON object described by the response schema — no commentary before or after it.`;
}

export interface GeminiPosts {
  x: string;
  linkedin: string;
  instagram: string;
}

export async function generateSocialPosts(newsletter: string, tone: Tone): Promise<GeminiPosts> {
  const ai = getClient();
  const prompt = buildPrompt(newsletter, tone);

  let response;
  try {
    response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        temperature: 0.85,
        maxOutputTokens: 2048,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            x: { type: 'string' },
            linkedin: { type: 'string' },
            instagram: { type: 'string' }
          },
          required: ['x', 'linkedin', 'instagram']
        }
      }
    });
  } catch (err) {
    console.error('[gemini call failed]', err);
    const message = err instanceof Error ? err.message : 'Unknown error calling Gemini.';
    const status = extractStatus(err);
    throw new GeminiUpstreamError(message, status);
  }

  const rawText = response.text;
  if (!rawText) {
    console.error('[gemini empty response] full response object:', JSON.stringify(response, null, 2));
    throw new GeminiParseError('Gemini returned an empty response.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    console.error('[gemini invalid JSON] raw text was:', rawText);
    throw new GeminiParseError('Gemini returned a response that was not valid JSON.');
  }

  if (!isGeminiPosts(parsed)) {
    console.error('[gemini missing fields] parsed object was:', JSON.stringify(parsed, null, 2));
    throw new GeminiParseError('Gemini response was missing one or more expected fields.');
  }

  return parsed;
}

function isGeminiPosts(value: unknown): value is GeminiPosts {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.x === 'string' && typeof v.linkedin === 'string' && typeof v.instagram === 'string';
}

function extractStatus(err: unknown): number | undefined {
  if (err && typeof err === 'object' && 'status' in err) {
    const status = (err as { status?: unknown }).status;
    if (typeof status === 'number') return status;
  }
  return undefined;
}
