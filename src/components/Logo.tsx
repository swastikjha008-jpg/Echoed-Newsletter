interface LogoProps {
  className?: string;
  withWordmark?: boolean;
}

export default function Logo({ className = '', withWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="8" cy="14" r="3" fill="var(--accent)" />
        <path
          d="M14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M14 1.5C21.4558 1.5 27.5 7.54416 27.5 15"
          transform="translate(-2.5 0)"
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.4"
          pathLength={1}
          strokeDasharray="0.62 1"
        />
      </svg>
      {withWordmark && (
        <span
          className="text-[17px] font-semibold tracking-tight text-[var(--text)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Echoed
        </span>
      )}
    </div>
  );
}
