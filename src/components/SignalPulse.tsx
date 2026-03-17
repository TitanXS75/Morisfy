export function SignalPulse() {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute w-4 h-4 rounded-full bg-primary" />
      <div className="absolute w-full h-full rounded-full border border-primary/60 animate-signal-ring" />
      <div className="absolute w-full h-full rounded-full border border-primary/40 animate-signal-ring-delay-1" />
      <div className="absolute w-full h-full rounded-full border border-primary/20 animate-signal-ring-delay-2" />
    </div>
  );
}
