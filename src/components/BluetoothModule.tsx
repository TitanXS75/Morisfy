import { useState, useCallback, useRef, useEffect } from 'react';
import { encodeToMorse, decodeFromMorse } from '@/lib/morse';

type BleState = 'off' | 'scanning' | 'connected';

interface BluetoothModuleProps {
  morseOutput: string;
  bleState: BleState;
  setBleState: (state: BleState) => void;
}

interface LogEntry {
  time: string;
  message: string;
  type: 'sent' | 'received' | 'info' | 'error';
}

const UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const UART_TX = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const UART_RX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

const isBleSupported = typeof navigator !== 'undefined' && 'bluetooth' in navigator;

export function BluetoothModule({ morseOutput, bleState, setBleState }: BluetoothModuleProps) {
  const [deviceName, setDeviceName] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [receivedText, setReceivedText] = useState('');
  const txCharRef = useRef<BluetoothRemoteGATTCharacteristic | null>(null);
  const deviceRef = useRef<BluetoothDevice | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((message: string, type: LogEntry['type']) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev.slice(-50), { time, message, type }]);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleScan = useCallback(async () => {
    if (!isBleSupported) return;
    try {
      setBleState('scanning');
      addLog('Scanning for BLE devices...', 'info');
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [UART_SERVICE] }],
        optionalServices: [UART_SERVICE],
      });
      deviceRef.current = device;
      setDeviceName(device.name || 'Unknown Device');
      addLog(`Found: ${device.name || 'Unknown'}`, 'info');

      device.addEventListener('gattserverdisconnected', () => {
        setBleState('off');
        addLog('Device disconnected', 'info');
        txCharRef.current = null;
      });

      const server = await device.gatt!.connect();
      const service = await server.getPrimaryService(UART_SERVICE);
      const txChar = await service.getCharacteristic(UART_TX);
      txCharRef.current = txChar;

      try {
        const rxChar = await service.getCharacteristic(UART_RX);
        await rxChar.startNotifications();
        rxChar.addEventListener('characteristicvaluechanged', (event: Event) => {
          const target = event.target as BluetoothRemoteGATTCharacteristic;
          const value = new TextDecoder().decode(target.value);
          addLog(`RX: ${value}`, 'received');
          const decoded = decodeFromMorse(value);
          setReceivedText(prev => prev + decoded);
        });
      } catch {
        addLog('RX characteristic not available', 'info');
      }

      setBleState('connected');
      addLog('Connected!', 'info');
    } catch (err: any) {
      setBleState('off');
      addLog(err.message || 'Connection failed', 'error');
    }
  }, [setBleState, addLog]);

  const handleDisconnect = useCallback(() => {
    deviceRef.current?.gatt?.disconnect();
    setBleState('off');
    txCharRef.current = null;
  }, [setBleState]);

  const handleTransmit = useCallback(async () => {
    if (!txCharRef.current || !morseOutput) return;
    try {
      const encoder = new TextEncoder();
      await txCharRef.current.writeValue(encoder.encode(morseOutput));
      addLog(`TX: ${morseOutput}`, 'sent');
    } catch (err: any) {
      addLog(`TX Error: ${err.message}`, 'error');
    }
  }, [morseOutput, addLog]);

  return (
    <section className="px-6 py-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-xl tracking-[0.3em] text-primary text-glow-amber text-center mb-8">
          SIGNAL TRANSMITTER
        </h2>

        {!isBleSupported ? (
          <div className="glass-card p-6 text-center">
            <p className="font-display text-muted-foreground">
              ⚠ Web Bluetooth is not supported in this browser.<br />
              Use <span className="text-accent">Chrome on Android or desktop</span> for BLE support.
            </p>
          </div>
        ) : (
          <div className="glass-card p-6 space-y-5">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {bleState !== 'connected' ? (
                <button
                  onClick={handleScan}
                  disabled={bleState === 'scanning'}
                  className="px-6 py-2.5 bg-accent text-accent-foreground font-display font-bold text-sm tracking-wider rounded-lg glow-cyan hover:opacity-90 transition-all duration-200 disabled:opacity-50 active:scale-95"
                >
                  {bleState === 'scanning' ? 'SCANNING...' : 'SCAN FOR DEVICES'}
                </button>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-success font-display font-bold text-sm">
                    <span className="flex gap-0.5">
                      <span className="w-1 h-3 bg-success rounded-sm" />
                      <span className="w-1 h-4 bg-success rounded-sm" />
                      <span className="w-1 h-5 bg-success rounded-sm" />
                    </span>
                    {deviceName}
                  </div>
                  <button
                    onClick={handleTransmit}
                    disabled={!morseOutput}
                    className="px-6 py-2.5 bg-primary text-primary-foreground font-display font-bold text-sm tracking-wider rounded-lg glow-amber transition-all duration-200 disabled:opacity-30 active:scale-95"
                  >
                    TRANSMIT MORSE
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="px-6 py-2.5 border border-destructive text-destructive font-display font-bold text-sm tracking-wider rounded-lg hover:bg-destructive/10 transition-all duration-200 active:scale-95"
                  >
                    DISCONNECT
                  </button>
                </>
              )}
            </div>

            {/* Received text */}
            {receivedText && (
              <div>
                <label className="font-display font-bold text-xs tracking-[0.2em] text-muted-foreground mb-2 block">
                  RECEIVED
                </label>
                <p className="font-mono text-primary text-lg text-glow-amber">{receivedText}</p>
              </div>
            )}

            {/* Log */}
            <div>
              <label className="font-display font-bold text-xs tracking-[0.2em] text-muted-foreground mb-2 block">
                TRANSMISSION LOG
              </label>
              <div className="bg-muted/50 rounded-lg p-3 h-32 overflow-y-auto font-mono text-xs space-y-1">
                {logs.length === 0 && (
                  <p className="text-muted-foreground italic">No activity yet...</p>
                )}
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-muted-foreground shrink-0">[{log.time}]</span>
                    <span className={
                      log.type === 'sent' ? 'text-primary' :
                      log.type === 'received' ? 'text-accent' :
                      log.type === 'error' ? 'text-destructive' :
                      'text-muted-foreground'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
