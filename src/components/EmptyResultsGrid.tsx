import { XIcon, LinkedInIcon, InstagramIcon } from './PlatformIcons';

const CONFIG = [
  { icon: XIcon, label: 'X', desc: 'Short, punchy, built for the timeline.' },
  { icon: LinkedInIcon, label: 'LinkedIn', desc: 'Structured, professional, built to be skimmed.' },
  { icon: InstagramIcon, label: 'Instagram', desc: 'Caption-first, conversational, hashtag-ready.' }
];

export default function EmptyResultsGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {CONFIG.map((c, i) => (
        <div
          key={c.label}
          className="reveal rounded-2xl border border-dashed border-[var(--border-strong)] p-5 flex flex-col items-start"
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          <span className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface-2)] text-[var(--text-tertiary)] p-2 mb-4">
            <c.icon className="w-full h-full" />
          </span>
          <span className="text-[14px] font-medium text-[var(--text-secondary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            {c.label}
          </span>
          <p className="text-[13px] text-[var(--text-tertiary)] leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
