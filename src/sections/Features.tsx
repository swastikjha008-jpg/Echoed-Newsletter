import { useEffect, useRef, type ReactNode } from 'react';
import { Rows3, Globe2, Type, Gauge, Copy, PenLine, ScrollText } from 'lucide-react';

function BentoItem({ className = '', children }: { className?: string; children: ReactNode }) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      item.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };
    item.addEventListener('mousemove', handleMouseMove);
    return () => item.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--border-strong)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(91,140,255,0.12), transparent 70%)'
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="text-[12.5px] tracking-wide text-[var(--accent-2)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            HOW IT WORKS
          </span>
          <h2
            className="mt-3 text-[30px] md:text-[38px] font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Built for the way you actually repurpose content.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <BentoItem className="md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2 flex flex-col justify-between">
            <div>
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-2)] mb-4">
                <Rows3 size={18} />
              </span>
              <h3 className="text-[19px] font-medium text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Reads structure, not just words
              </h3>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-relaxed max-w-sm">
                Echoed parses your hook, your argument, and your close separately — so the post it writes
                keeps what made the newsletter work, instead of summarizing it into mush. It's the
                difference between a repost and a rewrite that actually lands.
              </p>
              <p className="mt-3 text-[14px] text-[var(--text-secondary)] leading-relaxed max-w-sm">
                Most repurposing tools flatten a newsletter into one generic paragraph and call it done.
                Echoed keeps the shape of your argument intact, then re-delivers it in the pacing each
                platform actually rewards — a fast hook for X, a build-up for LinkedIn, a payoff for
                Instagram.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: 'Hook', desc: 'What earns the first line' },
                  { label: 'Argument', desc: 'The reasoning that follows' },
                  { label: 'Close', desc: 'What you want them to take away' }
                ].map(part => (
                  <div key={part.label}>
                    <p className="text-[12.5px] font-medium text-[var(--text)]">{part.label}</p>
                    <p className="mt-0.5 text-[11.5px] text-[var(--text-tertiary)] leading-snug">{part.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded bg-[var(--accent-soft)]" />
                <div className="h-2 w-full rounded bg-[rgba(255,255,255,0.06)]" />
                <div className="h-2 w-5/6 rounded bg-[rgba(255,255,255,0.06)]" />
                <div className="h-2 w-2/3 rounded bg-[var(--accent-soft)]" />
              </div>
            </div>
          </BentoItem>

          <BentoItem className="md:col-start-3 md:row-start-1">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-2)] mb-4">
              <Globe2 size={18} />
            </span>
            <h3 className="text-[16px] font-medium text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Platform-native, not resized
            </h3>
            <p className="mt-2 text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
              X gets brevity. LinkedIn gets structure. Instagram gets a caption. Same idea, three voices.
            </p>
          </BentoItem>

          <BentoItem className="md:col-start-4 md:row-start-1">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-2)] mb-4">
              <Type size={18} />
            </span>
            <h3 className="text-[16px] font-medium text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Three tones, one voice
            </h3>
            <p className="mt-2 text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
              Casual, professional, or witty — Echoed adapts delivery without inventing opinions you didn't write.
            </p>
          </BentoItem>

          <BentoItem className="md:col-start-3 md:row-start-2 md:row-span-2">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-2)] mb-4">
              <Gauge size={18} />
            </span>
            <h3 className="text-[16px] font-medium text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Character-perfect, every time
            </h3>
            <p className="mt-2 text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
              Every output is checked against its platform's real limit before it reaches you — no
              surprise truncation after you've already hit post.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: 'X', pct: 62 },
                { label: 'LinkedIn', pct: 41 },
                { label: 'Instagram', pct: 78 }
              ].map(row => (
                <div key={row.label}>
                  <div className="flex justify-between text-[11.5px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span>{row.label}</span>
                    <span>{row.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </BentoItem>

          <BentoItem className="md:col-start-4 md:row-start-2 md:row-span-2">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-2)] mb-4">
              <ScrollText size={18} />
            </span>
            <h3 className="text-[16px] font-medium text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Reads the whole thing, every time
            </h3>
            <p className="mt-2 text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
              Short update or 4,000-word deep dive — Echoed processes every word before it writes a
              single post, so nothing important gets left out of the summary.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: 'Under 500 words', pct: 100 },
                { label: '500–2,000 words', pct: 100 },
                { label: '2,000+ words', pct: 100 }
              ].map(row => (
                <div key={row.label}>
                  <div className="flex justify-between text-[11.5px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span>{row.label}</span>
                    <span>full read</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </BentoItem>

          <BentoItem className="md:col-start-1 md:col-span-2 md:row-start-3">
            <div className="flex items-start gap-4">
              <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-2)]">
                <Copy size={18} />
              </span>
              <div>
                <h3 className="text-[16px] font-medium text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Copy and go
                </h3>
                <p className="mt-2 text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
                  No export flow, no formatting to undo. One click copies exactly what you'd paste into
                  the platform's own composer.
                </p>
              </div>
            </div>
          </BentoItem>
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 flex items-center gap-4">
          <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-2)]">
            <PenLine size={18} />
          </span>
          <p className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
            Echoed never invents facts, quotes, or claims that weren't in your original newsletter — it
            only changes how the idea is delivered, not what it says.
          </p>
        </div>
      </div>
    </section>
  );
}
