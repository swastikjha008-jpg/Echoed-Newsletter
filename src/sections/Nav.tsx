import Logo from '../components/Logo';

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[rgba(8,9,12,0.6)] backdrop-blur-xl px-5 py-3">
          <a href="#top" aria-label="Echoed home">
            <Logo />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[13.5px] text-[var(--text-secondary)]">
            <a href="#generator" className="hover:text-[var(--text)] transition-colors">
              Generator
            </a>
            <a href="#features" className="hover:text-[var(--text)] transition-colors">
              Features
            </a>
            <a href="#results" className="hover:text-[var(--text)] transition-colors">
              Output
            </a>
          </nav>
          <a
            href="#generator"
            className="text-[13.5px] font-medium px-4 py-2 rounded-full border border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent-2)] transition-colors"
          >
            Start creating
          </a>
        </div>
      </div>
    </header>
  );
}
