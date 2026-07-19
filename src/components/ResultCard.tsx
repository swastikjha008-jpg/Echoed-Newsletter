import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { XIcon, LinkedInIcon, InstagramIcon } from './PlatformIcons';
import type { GeneratedPost } from '../lib/shared';

const ICONS: Record<GeneratedPost['platform'], React.ComponentType<{ className?: string }>> = {
  x: XIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon
};

const ACCENTS: Record<GeneratedPost['platform'], string> = {
  x: 'bg-[var(--text)] text-[var(--bg)]',
  linkedin: 'bg-[#0a66c2] text-white',
  instagram: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white'
};

interface ResultCardProps {
  post: GeneratedPost;
  style?: React.CSSProperties;
}

export default function ResultCard({ post, style }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const Icon = ICONS[post.platform];
  const overLimit = post.content.length > post.charLimit;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — fail silently, button stays actionable
    }
  };

  return (
    <div
      className="reveal group glass rounded-2xl p-5 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
      style={style}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center p-1.5 ${ACCENTS[post.platform]}`}>
            <Icon className="w-full h-full" />
          </span>
          <span className="text-[14px] font-medium text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
            {post.label}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${post.label} post`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[12px] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[var(--accent-2)]" />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] whitespace-pre-line flex-1 max-h-64 overflow-y-auto pr-1">
        {post.content}
      </p>

      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between">
        <span
          className={`text-[11.5px] ${overLimit ? 'text-[#ff8080]' : 'text-[var(--text-tertiary)]'}`}
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {post.content.length.toLocaleString()} / {post.charLimit.toLocaleString()}
        </span>
        {overLimit && <span className="text-[11px] text-[#ff8080]">Over limit</span>}
      </div>
    </div>
  );
}
