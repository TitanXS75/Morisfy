export const MORSE: Record<string, string> = {
  'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...', ':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.', '-':'-....-','_':'..--.-','"':'.-..-.','@':'.--.-.',
};

const REVERSE_MORSE: Record<string, string> = {};
for (const [char, code] of Object.entries(MORSE)) {
  REVERSE_MORSE[code] = char;
}

export function encodeToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char === ' ') return '/';
      return MORSE[char] || '';
    })
    .filter(Boolean)
    .join(' ');
}

export function decodeFromMorse(morse: string): string {
  // Normalize: accept · or . for dot, − or - for dash
  const normalized = morse.replace(/·/g, '.').replace(/−/g, '-');
  return normalized
    .split(' / ')
    .map(word =>
      word
        .split(' ')
        .map(code => REVERSE_MORSE[code] || '')
        .join('')
    )
    .join(' ');
}

// Unicode display versions
export function toDisplayMorse(morse: string): string {
  return morse.replace(/\./g, '·').replace(/-/g, '−');
}

let audioCtx: AudioContext | null = null;
let currentAbort: AbortController | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

export function stopMorseAudio(): void {
  if (currentAbort) {
    currentAbort.abort();
    currentAbort = null;
  }
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}

export async function playMorseAudio(morse: string): Promise<void> {
  stopMorseAudio();
  const ctx = getAudioContext();
  const abort = new AbortController();
  currentAbort = abort;

  const DOT = 0.08;
  const DASH = 0.24;
  const SYMBOL_GAP = 0.08;
  const LETTER_GAP = 0.24;
  const WORD_GAP = 0.56;

  let time = ctx.currentTime + 0.05;

  const symbols = morse.split('');
  for (let i = 0; i < symbols.length; i++) {
    const s = symbols[i];
    if (s === '.' || s === '·') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 700;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + DOT);
      osc.connect(gain).connect(ctx.destination);
      osc.start(time);
      osc.stop(time + DOT);
      time += DOT + SYMBOL_GAP;
    } else if (s === '-' || s === '−') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 700;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + DASH);
      osc.connect(gain).connect(ctx.destination);
      osc.start(time);
      osc.stop(time + DASH);
      time += DASH + SYMBOL_GAP;
    } else if (s === '/') {
      time += WORD_GAP;
    } else if (s === ' ') {
      time += LETTER_GAP;
    }
  }

  const duration = (time - ctx.currentTime) * 1000;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      currentAbort = null;
      resolve();
    }, duration);
    abort.signal.addEventListener('abort', () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

export function playLetterAudio(letter: string): void {
  const morse = MORSE[letter.toUpperCase()];
  if (morse) playMorseAudio(morse);
}
