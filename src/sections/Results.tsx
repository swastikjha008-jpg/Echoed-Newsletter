import type { GeneratedPost } from '../lib/shared';
import ResultCard from '../components/ResultCard';
import SkeletonCard from '../components/SkeletonCard';
import EmptyResultsGrid from '../components/EmptyResultsGrid';

interface ResultsProps {
  isGenerating: boolean;
  outputs: GeneratedPost[] | null;
}

export default function Results({ isGenerating, outputs }: ResultsProps) {
  return (
    <section id="results" className="relative py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="text-[12.5px] tracking-wide text-[var(--accent-2)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            02 · RECEIVE
          </span>
          <h2
            className="mt-3 text-[30px] md:text-[38px] font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            One input. Three native posts.
          </h2>
          <p className="mt-3 text-[var(--text-secondary)] text-[15px] max-w-md mx-auto">
            Each version is written for how that platform is actually read — not just resized to fit.
          </p>
        </div>

        {isGenerating ? (
          <div className="grid md:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard style={{ animationDelay: '0.1s' }} />
            <SkeletonCard style={{ animationDelay: '0.2s' }} />
          </div>
        ) : outputs ? (
          <div className="grid md:grid-cols-3 gap-4">
            {outputs.map((post, i) => (
              <ResultCard key={post.platform} post={post} style={{ animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
        ) : (
          <EmptyResultsGrid />
        )}
      </div>
    </section>
  );
}
