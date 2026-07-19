import type { Tone } from '../lib/shared';

const OPTIONS: { value: Tone; label: string }[] = [
  { value: 'casual', label: 'Casual' },
  { value: 'professional', label: 'Professional' },
  { value: 'witty', label: 'Witty' }
];

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
}

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  const activeIndex = OPTIONS.findIndex(o => o.value === value);

  return (
    <div
      role="radiogroup"
      aria-label="Writing tone"
      className="relative inline-flex w-full rounded-xl bg-[var(--surface-2)] border border-[var(--border)] p-1"
    >
      <span
        className="absolute top-1 bottom-1 rounded-lg bg-[var(--accent-soft)] border border-[rgba(91,140,255,0.35)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: `calc(${100 / OPTIONS.length}% - 4px)`,
          left: `calc(${(100 / OPTIONS.length) * activeIndex}% + 2px)`
        }}
        aria-hidden="true"
      />
      {OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`relative z-10 flex-1 py-2.5 text-[13.5px] font-medium rounded-lg transition-colors duration-200 ${
            value === opt.value ? 'text-[var(--text)]' : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
