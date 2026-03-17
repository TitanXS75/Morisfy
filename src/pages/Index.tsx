import { useState, useCallback } from 'react';
import { MorsifyHeader } from '@/components/MorsifyHeader';
import { LiveTranslator } from '@/components/LiveTranslator';
import { AlphabetGrid } from '@/components/AlphabetGrid';
import { BluetoothModule } from '@/components/BluetoothModule';
import { MorseDecoder } from '@/components/MorseDecoder';
import { MorsifyFooter } from '@/components/MorsifyFooter';
import { encodeToMorse } from '@/lib/morse';

type BleState = 'off' | 'scanning' | 'connected';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [bleState, setBleState] = useState<BleState>('off');

  const morseOutput = encodeToMorse(inputText);

  const handleInsertLetter = useCallback((letter: string) => {
    setInputText(prev => prev + letter);
  }, []);

  return (
    <div className="min-h-screen">
      <MorsifyHeader bleState={bleState} />
      <LiveTranslator inputText={inputText} setInputText={setInputText} />
      <AlphabetGrid onInsertLetter={handleInsertLetter} />
      <BluetoothModule morseOutput={morseOutput} bleState={bleState} setBleState={setBleState} />
      <MorseDecoder />
      <MorsifyFooter />
    </div>
  );
};

export default Index;
