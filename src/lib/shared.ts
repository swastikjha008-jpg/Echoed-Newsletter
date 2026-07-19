export type Tone = 'casual' | 'professional' | 'witty';
export type Platform = 'x' | 'linkedin' | 'instagram';

export interface GeneratedPost {
  platform: Platform;
  label: string;
  content: string;
  charLimit: number;
}

export const TONES: Tone[] = ['casual', 'professional', 'witty'];

export const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: 'casual', label: 'Casual' },
  { value: 'professional', label: 'Professional' },
  { value: 'witty', label: 'Witty' }
];

export const PLATFORMS: Platform[] = ['x', 'linkedin', 'instagram'];

export const PLATFORM_META: Record<Platform, { label: string; charLimit: number }> = {
  x: { label: 'X', charLimit: 280 },
  linkedin: { label: 'LinkedIn', charLimit: 3000 },
  instagram: { label: 'Instagram', charLimit: 2200 }
};

export const MIN_NEWSLETTER_LENGTH = 50;
export const MAX_NEWSLETTER_LENGTH = 3000;

export function isTone(value: unknown): value is Tone {
  return typeof value === 'string' && (TONES as string[]).includes(value);
}
