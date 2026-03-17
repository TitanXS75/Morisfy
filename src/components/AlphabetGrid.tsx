import { MORSE, playLetterAudio, toDisplayMorse } from '@/lib/morse';

interface AlphabetGridProps {
  onInsertLetter: (letter: string) => void;
}

const ALL_CHARS = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  ...'0123456789'.split(''),
  '.', ',', '?', '!', '/', '(', ')', '&', ':', ';', '=', '+', '-', '_', '"', '@',
];

export function AlphabetGrid({ onInsertLetter }: AlphabetGridProps) {
  return (
    <section className="px-6 py-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-xl tracking-[0.3em] text-primary text-glow-amber text-center mb-8">
          THE SIGNAL ALPHABET
        </h2>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
          {ALL_CHARS.map(char => {
            const morse = MORSE[char] || '';
            const display = toDisplayMorse(morse);
            return (
              <button
                key={char}
                onClick={() => {
                  onInsertLetter(char);
                  playLetterAudio(char);
                }}
                onMouseEnter={() => playLetterAudio(char)}
                className="glass-card p-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary hover:glow-amber hover:-translate-y-0.5 transition-all duration-200 active:scale-95 group"
              >
                <span className="font-display font-bold text-xl text-primary group-hover:text-glow-amber">
                  {char}
                </span>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {display}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
