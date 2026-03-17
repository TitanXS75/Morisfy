import { useState, useCallback } from 'react';
import { encodeToMorse, toDisplayMorse, playMorseAudio } from '@/lib/morse';

interface LiveTranslatorProps {
  inputText: string;
  setInputText: (text: string) => void;
}

export function LiveTranslator({ inputText, setInputText }: LiveTranslatorProps) {
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);

  const morseOutput = encodeToMorse(inputText);
  const displayMorse = toDisplayMorse(morseOutput);

  const handleCopy = useCallback(async () => {
    if (!morseOutput) return;
    await navigator.clipboard.writeText(morseOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [morseOutput]);

  const handlePlay = useCallback(async () => {
    if (!morseOutput || playing) return;
    setPlaying(true);
    await playMorseAudio(morseOutput);
    setPlaying(false);
  }, [morseOutput, playing]);

  const handleShare = useCallback(async () => {
    if (!morseOutput) return;
    if (navigator.share) {
      await navigator.share({ text: morseOutput, title: 'Morsify - Morse Code' });
    }
  }, [morseOutput]);

  const handleClear = useCallback(() => {
    setInputText('');
  }, [setInputText]);

  return (
    <section className="px-6 py-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* English Input */}
          <div className="glass-card p-5">
            <label className="flex items-center gap-2 font-display font-bold text-xs tracking-[0.2em] text-muted-foreground mb-3">
              <span>⌨</span> ENGLISH
            </label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="w-full h-40 bg-muted/50 rounded-lg p-4 font-display text-foreground text-lg resize-none border border-transparent focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/50"
              />
              <span className="absolute bottom-3 right-3 text-xs font-mono text-muted-foreground">
                {inputText.length}
              </span>
            </div>
          </div>

          {/* Morse Output */}
          <div className="glass-card p-5">
            <label className="flex items-center gap-2 font-display font-bold text-xs tracking-[0.2em] text-muted-foreground mb-3">
              <span>📡</span> MORSE CODE
            </label>
            <div className="w-full h-40 bg-muted/50 rounded-lg p-4 overflow-auto">
              <p className="font-mono text-primary text-lg text-glow-amber break-all leading-relaxed">
                {displayMorse}
                <span className="animate-blink text-primary">▊</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <button
            onClick={handleCopy}
            disabled={!morseOutput}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-display font-bold text-sm tracking-wider rounded-lg glow-amber hover:glow-amber-strong transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            {copied ? '✓ COPIED!' : 'COPY MORSE'}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2.5 border border-border text-foreground font-display font-bold text-sm tracking-wider rounded-lg hover:border-primary hover:text-primary transition-all duration-200 active:scale-95"
          >
            CLEAR
          </button>
          <button
            onClick={handlePlay}
            disabled={!morseOutput || playing}
            className="px-6 py-2.5 border border-accent text-accent font-display font-bold text-sm tracking-wider rounded-lg hover:glow-cyan transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            {playing ? '♪ PLAYING...' : '▶ PLAY AUDIO'}
          </button>
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleShare}
              disabled={!morseOutput}
              className="px-6 py-2.5 border border-border text-foreground font-display font-bold text-sm tracking-wider rounded-lg hover:border-primary hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            >
              ↗ SHARE
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-primary text-primary-foreground font-display font-bold text-sm tracking-wider rounded-lg glow-amber animate-toast-in">
          ✓ Copied to clipboard!
        </div>
      )}
    </section>
  );
}
