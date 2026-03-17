import { useState } from 'react';
import { decodeFromMorse, toDisplayMorse } from '@/lib/morse';

export function MorseDecoder() {
  const [morseInput, setMorseInput] = useState('');
  const decoded = morseInput.trim() ? decodeFromMorse(morseInput) : '';

  return (
    <section className="px-6 py-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-xl tracking-[0.3em] text-primary text-glow-amber text-center mb-8">
          MORSE DECODER
        </h2>
        <div className="glass-card p-6 space-y-4">
          <div>
            <textarea
              value={morseInput}
              onChange={e => setMorseInput(e.target.value)}
              placeholder=".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
              className="w-full h-28 bg-muted/50 rounded-lg p-4 font-mono text-foreground resize-none border border-transparent focus:border-accent focus:outline-none transition-colors placeholder:text-muted-foreground/50"
            />
            <p className="text-xs text-muted-foreground mt-2 font-display">
              Use · or . for dot, − or - for dash, space between letters, / between words
            </p>
          </div>
          {decoded && (
            <div className="pt-2">
              <label className="font-display font-bold text-xs tracking-[0.2em] text-muted-foreground mb-2 block">
                DECODED
              </label>
              <p className="font-display font-bold text-2xl text-primary text-glow-amber">
                {decoded}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
