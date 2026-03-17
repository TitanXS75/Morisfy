import { useState, useCallback } from 'react';
import { MorsifyHeader } from '@/components/MorsifyHeader';
import { LiveTranslator } from '@/components/LiveTranslator';
import { AlphabetGrid } from '@/components/AlphabetGrid';
import { BluetoothModule } from '@/components/BluetoothModule';
import { MorseDecoder } from '@/components/MorseDecoder';
import { MorsifyFooter } from '@/components/MorsifyFooter';
import { encodeToMorse } from '@/lib/morse';

type BleState = 'off' | 'scanning' | 'connected';
type Tab = 'translate' | 'alphabet' | 'decode' | 'transmit';

const TABS: { id: Tab; label: string }[] = [
  { id: 'translate', label: 'TRANSLATE' },
  { id: 'alphabet', label: 'ALPHABET' },
  { id: 'decode', label: 'DECODE' },
  { id: 'transmit', label: 'TRANSMIT' },
];

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [bleState, setBleState] = useState<BleState>('off');
  const [activeTab, setActiveTab] = useState<Tab>('translate');

  const morseOutput = encodeToMorse(inputText);

  const handleInsertLetter = useCallback((letter: string) => {
    setInputText(prev => prev + letter);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MorsifyHeader bleState={bleState} />

      {/* Tab Navigation */}
      <nav className="px-6 py-4 border-b border-border animate-fade-up" style={{ animationDelay: '0.05s' }}>
        <div className="max-w-5xl mx-auto flex gap-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-display font-bold text-sm tracking-[0.15em] transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground glow-amber'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === 'translate' && (
          <LiveTranslator inputText={inputText} setInputText={setInputText} />
        )}
        {activeTab === 'alphabet' && (
          <AlphabetGrid onInsertLetter={handleInsertLetter} />
        )}
        {activeTab === 'decode' && <MorseDecoder />}
        {activeTab === 'transmit' && (
          <BluetoothModule morseOutput={morseOutput} bleState={bleState} setBleState={setBleState} />
        )}
      </div>

      <MorsifyFooter />
    </div>
  );
};

export default Index;
