import { SignalPulse } from './SignalPulse';

interface MorsifyHeaderProps {
  bleState?: 'off' | 'scanning' | 'connected';
}

export function MorsifyHeader({ bleState }: MorsifyHeaderProps) {
  return (
    <header className="flex items-center px-4 md:px-6 py-4 md:py-5 border-b border-border animate-fade-up gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <SignalPulse />
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-primary tracking-[0.15em] text-glow-amber leading-none">
            MORSIFY
          </h1>
          <p className="font-display text-sm text-muted-foreground tracking-wider">
            Signal the world. No internet needed.
          </p>
        </div>
      </div>
    </header>
  );
}
