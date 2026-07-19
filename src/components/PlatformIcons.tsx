export function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.24 2H21.5l-7.1 8.12L22.75 22h-6.62l-5.18-6.78L4.98 22H1.72l7.6-8.69L1.25 2h6.78l4.68 6.2L18.24 2Zm-1.16 18.02h1.84L7.02 3.88H5.05l12.03 16.14Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 5.5a2.44 2.44 0 1 1-4.88 0 2.44 2.44 0 0 1 4.88 0ZM2.4 8.75h4.36V21.5H2.4V8.75Zm7.4 0h4.18v1.75h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.22 2.9 5.22 6.67v6.59h-4.36v-5.84c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1v5.94H9.8V8.75Z" />
    </svg>
  );
}

export function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
