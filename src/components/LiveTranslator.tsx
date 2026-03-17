import { useState, useCallback } from 'react';
import { encodeToMorse, toDisplayMorse, playMorseAudio, stopMorseAudio } from '@/lib/morse';

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
    if (playing) {
      stopMorseAudio();
      setPlaying(false);
      return;
    }
    if (!morseOutput) return;
    setPlaying(true);
    await playMorseAudio(morseOutput);
    setPlaying(false);
  }, [morseOutput, playing]);

  const handleClear = useCallback(() => {
    setInputText('');
  }, [setInputText]);

  return (
    <section className="px-6 py-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display font-bold text-lg tracking-[0.2em] text-foreground whitespace-nowrap">
            LIVE TRANSLATOR
          </h2>
          <div className="flex-1 h-px bg-primary/30" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* English Input */}
          <div className="glass-card p-5">
            <label className="flex items-center gap-2 font-display font-bold text-xs tracking-[0.2em] text-muted-foreground mb-3">
              <span>⌨</span> ENGLISH INPUT
            </label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                maxLength={500}
                placeholder="Type your message here..."
                className="w-full h-48 bg-muted/50 rounded-lg p-4 font-display text-foreground text-lg resize-none border border-border focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          {/* Morse Output */}
          <div className="glass-card p-5">
            <label className="flex items-center gap-2 font-display font-bold text-xs tracking-[0.2em] text-muted-foreground mb-3">
              <span>◉</span> MORSE OUTPUT
            </label>
            <div className="w-full h-48 bg-muted/50 rounded-lg p-4 overflow-auto border border-border">
              <p className="font-mono text-primary text-lg text-glow-amber break-all leading-relaxed">
                {displayMorse}
                <span className="animate-blink text-primary">▊</span>
              </p>
            </div>
          </div>
        </div>

        {/* Character counter */}
        <div className="text-right mt-2">
          <span className="text-xs font-mono text-muted-foreground">
            {inputText.length} / 500
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleCopy}
            disabled={!morseOutput}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-display font-bold text-sm tracking-wider rounded-lg glow-amber hover:glow-amber-strong transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
          >
            {copied ? (
              <>✓ COPIED</>
            ) : (
              <>📋 COPY MORSE</>
            )}
          </button>
          <button
            onClick={handlePlay}
            disabled={!morseOutput || playing}
            className="px-6 py-2.5 border border-border text-foreground font-display font-bold text-sm tracking-wider rounded-lg hover:border-primary hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
          >
            {playing ? '♪ PLAYING...' : '🔊 PLAY AUDIO'}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2.5 border border-border text-foreground font-display font-bold text-sm tracking-wider rounded-lg hover:border-primary hover:text-primary transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            ✕ CLEAR
          </button>
        </div>
      </div>
    </section>
  );
}
