import { useState } from 'react';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Generator from './sections/Generator';
import Results from './sections/Results';
import Features from './sections/Features';
import Footer from './sections/Footer';
import { generatePosts, ApiError } from './lib/api';
import { PLATFORMS, PLATFORM_META, type Tone, type GeneratedPost } from './lib/shared';

export default function App() {
  const [text, setText] = useState('');
  const [tone, setTone] = useState<Tone>('casual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputs, setOutputs] = useState<GeneratedPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim() || isGenerating) return;

    setIsGenerating(true);
    setOutputs(null);
    setError(null);

    try {
      const posts = await generatePosts(text, tone);
      const nextOutputs: GeneratedPost[] = PLATFORMS.map(platform => ({
        platform,
        label: PLATFORM_META[platform].label,
        content: posts[platform],
        charLimit: PLATFORM_META[platform].charLimit
      }));
      setOutputs(nextOutputs);
      requestAnimationFrame(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Generator
          text={text}
          onTextChange={setText}
          tone={tone}
          onToneChange={setTone}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          error={error}
        />
        <Results isGenerating={isGenerating} outputs={outputs} />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
