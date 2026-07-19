import { MIN_NEWSLETTER_LENGTH, MAX_NEWSLETTER_LENGTH, isTone, type Tone } from '../../src/lib/shared';

export interface ValidatedInput {
  newsletter: string;
  tone: Tone;
}

export type ValidationResult = { valid: true; data: ValidatedInput } | { valid: false; error: string };

export function validateGenerateRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object.' };
  }

  const { newsletter, tone } = body as Record<string, unknown>;

  if (typeof newsletter !== 'string' || newsletter.trim().length === 0) {
    return { valid: false, error: 'Newsletter text is required.' };
  }

  const trimmed = newsletter.trim();

  if (trimmed.length < MIN_NEWSLETTER_LENGTH) {
    return {
      valid: false,
      error: `Newsletter must be at least ${MIN_NEWSLETTER_LENGTH} characters (got ${trimmed.length}).`
    };
  }

  if (trimmed.length > MAX_NEWSLETTER_LENGTH) {
    return {
      valid: false,
      error: `Newsletter must be ${MAX_NEWSLETTER_LENGTH} characters or fewer (got ${trimmed.length}).`
    };
  }

  if (!isTone(tone)) {
    return { valid: false, error: 'Tone must be one of: casual, professional, witty.' };
  }

  return { valid: true, data: { newsletter: trimmed, tone } };
}
