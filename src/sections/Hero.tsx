import PrismaticBurst from '../components/PrismaticBurst';
import TextType from '../components/TextType';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-28 md:pt-52 md:pb-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-70">
          <PrismaticBurst
            animationType="rotate3d"
            intensity={1.1}
            speed={0.3}
            distort={0.6}
            rayCount={14}
            hoverDampness={0.4}
            mixBlendMode="lighten"
            colors={['#5b8cff', '#8fb4ff', '#f2f3f5']}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 8%, transparent, var(--bg) 78%), linear-gradient(180deg, transparent 0%, var(--bg) 100%)'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          className="reveal inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/60 px-4 py-1.5 text-[12.5px] text-[var(--text-secondary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          one newsletter, three platforms
        </div>

        <div className="reveal mt-7" style={{ animationDelay: '0.08s' }}>
          <TextType
            as="h1"
            text="Turn one newsletter into every post it should have been."
            typingSpeed={36}
            initialDelay={350}
            pauseDuration={2000}
            loop={false}
            showCursor
            cursorCharacter="|"
            cursorClassName="text-[var(--accent-2)]"
            className="mx-auto max-w-3xl text-[42px] leading-[1.08] sm:text-[56px] md:text-[68px] font-semibold tracking-tight text-[var(--text)]"
            style={{ fontFamily: 'var(--font-display)' }}
          />
        </div>

        <p
          className="reveal mt-6 max-w-xl mx-auto text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-relaxed"
          style={{ animationDelay: '0.16s' }}
        >
          Paste your newsletter, pick a tone, and get platform-native posts for X, LinkedIn, and
          Instagram — written the way each audience actually reads.
        </p>

        <div
          className="reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: '0.24s' }}
        >
          <a
            href="#generator"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-medium text-[#08090c] transition-transform duration-300 hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(135deg, var(--accent-2), var(--accent))',
              boxShadow: '0 8px 30px -8px rgba(91,140,255,0.5)'
            }}
          >
            Start creating
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#results"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-medium text-[var(--text)] border border-[var(--border-strong)] hover:bg-[var(--surface)] transition-colors"
          >
            <PlayCircle size={16} className="text-[var(--text-secondary)]" />
            See demo output
          </a>
        </div>
      </div>
    </section>
  );
}
