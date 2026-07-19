import { validateGenerateRequest } from './validate';
import { checkRateLimit, getClientIdentifier } from './rateLimit';
import { generateSocialPosts, GeminiConfigError, GeminiUpstreamError, GeminiParseError } from './gemini';

export interface GenerateResult {
  status: number;
  payload: { success: boolean; posts?: unknown; error?: string };
  retryAfterSeconds?: number;
}

export async function runGenerate(
  body: unknown,
  headers: Record<string, string | string[] | undefined>,
  fallbackIdentifier: string
): Promise<GenerateResult> {
  const identifier = getClientIdentifier(headers, fallbackIdentifier);
  const rateLimit = checkRateLimit(identifier);
  if (!rateLimit.allowed) {
    return {
      status: 429,
      payload: { success: false, error: 'Too many requests. Please wait a moment before generating again.' },
      retryAfterSeconds: rateLimit.retryAfterSeconds
    };
  }

  const validation = validateGenerateRequest(body);
  if (!validation.valid) {
    return { status: 400, payload: { success: false, error: validation.error } };
  }

  try {
    const posts = await generateSocialPosts(validation.data.newsletter, validation.data.tone);
    return { status: 200, payload: { success: true, posts } };
  } catch (err) {
    return { status: mapErrorStatus(err), payload: { success: false, error: mapErrorMessage(err) } };
  }
}

function mapErrorStatus(err: unknown): number {
  if (err instanceof GeminiConfigError) return 500;
  if (err instanceof GeminiParseError) return 502;
  if (err instanceof GeminiUpstreamError) {
    if (err.status === 429) return 429;
    return 502;
  }
  return 500;
}

function mapErrorMessage(err: unknown): string {
  if (err instanceof GeminiConfigError) {
    return 'The server is not configured correctly. Please try again later.';
  }
  if (err instanceof GeminiParseError) {
    return 'The AI returned an unexpected response. Please try generating again.';
  }
  if (err instanceof GeminiUpstreamError) {
    if (err.status === 429) {
      return 'The AI provider is rate-limiting requests right now. Please wait a moment and try again.';
    }
    return 'The AI provider failed to generate a response. Please try again.';
  }
  return 'Something went wrong. Please try again.';
}
