import { Sparkles, Loader2, FileText, AlertCircle } from 'lucide-react';
import ToneSelector from '../components/ToneSelector';
import { MIN_NEWSLETTER_LENGTH, MAX_NEWSLETTER_LENGTH, type Tone } from '../lib/shared';
import { SAMPLE_NEWSLETTER } from '../lib/sampleData';

interface GeneratorProps {
  text: string;
  onTextChange: (v: string) => void;
  tone: Tone;
  onToneChange: (t: Tone) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  error: string | null;
}

export default function Generator({
  text,
  onTextChange,
  tone,
  onToneChange,
  isGenerating,
  onGenerate,
  error
}: GeneratorProps) {
  const count = text.trim().length;
  const tooShort = count > 0 && count < MIN_NEWSLETTER_LENGTH;
  const tooLong = count > MAX_NEWSLETTER_LENGTH;
  const canGenerate = count >= MIN_NEWSLETTER_LENGTH && count <= MAX_NEWSLETTER_LENGTH && !isGenerating;

  return (
    <section id="generator" className="relative py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="text-[12.5px] tracking-wide text-[var(--accent-2)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            01 · GENERATE
          </span>
          <h2
            className="mt-3 text-[30px] md:text-[38px] font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Paste. Choose a tone. Generate.
          </h2>
          <p className="mt-3 text-[var(--text-secondary)] text-[15px] max-w-md mx-auto">
            Your newsletter, echoed across every platform your audience actually scrolls.
          </p>
        </div>

        <div className="glass rounded-3xl p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          <div className="rounded-[20px] bg-[var(--surface)]/40 p-6 md:p-7">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="newsletter-input"
                className="text-[13px] font-medium text-[var(--text-secondary)] flex items-center gap-1.5"
              >
                <FileText size={14} />
                Your newsletter
              </label>
              <button
                type="button"
                onClick={() => onTextChange(SAMPLE_NEWSLETTER)}
                className="text-[12.5px] text-[var(--accent-2)] hover:text-[var(--accent)] transition-colors"
              >
                Use a sample
              </button>
            </div>

            <textarea
              id="newsletter-input"
              value={text}
              onChange={e => onTextChange(e.target.value.slice(0, MAX_NEWSLETTER_LENGTH))}
              placeholder="Paste your latest newsletter here. Echoed reads the whole thing — hooks, structure, and voice — before it writes a single post."
              rows={9}
              aria-invalid={tooShort || tooLong}
              className="w-full resize-none rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] focus:border-[var(--accent)] px-5 py-4 text-[15px] leading-relaxed text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors"
            />

            <div className="flex items-center justify-between mt-2 mb-6">
              <span
                className={`text-[12px] ${tooLong ? 'text-[#ff8080]' : 'text-[var(--text-tertiary)]'}`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {count.toLocaleString()} / {MAX_NEWSLETTER_LENGTH.toLocaleString()}
              </span>
              {count === 0 && (
                <span className="text-[12px] text-[var(--text-tertiary)]">Nothing to echo yet</span>
              )}
              {tooShort && (
                <span className="text-[12px] text-[var(--text-tertiary)]">
                  {MIN_NEWSLETTER_LENGTH - count} more characters needed
                </span>
              )}
            </div>

            <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-end">
              <div>
                <span className="block text-[13px] font-medium text-[var(--text-secondary)] mb-2">
                  Writing tone
                </span>
                <ToneSelector value={tone} onChange={onToneChange} />
              </div>

              <button
                type="button"
                onClick={onGenerate}
                disabled={!canGenerate}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14.5px] font-semibold text-[#08090c] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:scale-[1.02] enabled:active:scale-[0.98] w-full sm:w-auto"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-2), var(--accent))',
                  boxShadow: canGenerate ? '0 8px 30px -10px rgba(91,140,255,0.6)' : 'none'
                }}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Generating
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate
                  </>
                )}
              </button>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2.5 rounded-xl border border-[rgba(255,128,128,0.3)] bg-[rgba(255,128,128,0.08)] px-4 py-3 text-[13px] text-[#ffb3b3]"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
