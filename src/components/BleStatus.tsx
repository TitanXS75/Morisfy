interface BleStatusProps {
  state: 'off' | 'scanning' | 'connected';
}

export function BleStatus({ state }: BleStatusProps) {
  const config = {
    off: {
      label: 'BLE OFF',
      classes: 'bg-destructive/20 text-destructive border-destructive/40',
    },
    scanning: {
      label: 'SCANNING...',
      classes: 'bg-primary/20 text-primary border-primary/40 animate-pulse-glow',
    },
    connected: {
      label: 'CONNECTED',
      classes: 'bg-success/20 text-success border-success/40',
    },
  }[state];

  return (
    <div className={`px-3 py-1.5 rounded-full border text-xs font-display font-bold tracking-wider ${config.classes}`}>
      {config.label}
    </div>
  );
}
