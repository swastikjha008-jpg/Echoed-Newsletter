import Logo from '../components/Logo';

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-[13px] text-[var(--text-tertiary)] text-center">
          One newsletter, echoed everywhere it needs to be read.
        </p>
        <span className="text-[12.5px] text-[var(--text-tertiary)]" style={{ fontFamily: 'var(--font-mono)' }}>
          v0.1 · frontend preview
        </span>
      </div>
    </footer>
  );
}
