# Morsify — Morse Code Translator & BLE Transmitter

A modern, feature-rich Morse code learning and communication tool with Web Audio playback and Bluetooth Low Energy (BLE) transmission capabilities. Works offline and supports real-time translation, interactive learning, and wireless communication.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Translation** - Instant text to Morse code conversion and vice versa
- **Audio Playback** - High-quality Morse code audio synthesis using Web Audio API
- **Interactive Alphabet Grid** - Visual reference for learning Morse code patterns
- **Live Decoder** - Decode Morse code signals in real-time

### 🎨 Modern UI/UX
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme** - Easy on the eyes with beautiful glass morphism effects
- **Smooth Animations** - Engaging micro-interactions and transitions
- **Progressive Web App** - Installable and works offline

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Modern web browser (Chrome/Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/TitanXS75/Morisfy.git
cd Morisfy

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 Browser Compatibility

- ⌨️ **Browsers** - Basic translation features only

## 🎮 Usage

### Basic Translation
1. Enter text in the translator
2. View real-time Morse code conversion
3. Play audio to hear the Morse code
4. Use the alphabet grid for reference

## 🛠️ Tech Stack

- **React 18** - Modern component-based UI
- **TypeScript** - Type-safe development
- **Vite** - Fast development and building
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Web Audio API** - Morse code synthesis

## 📂 Project Structure

```
src/
├── components/
│   ├── LiveTranslator.tsx      # Real-time translation
│   ├── AlphabetGrid.tsx        # Interactive learning grid
│   ├── MorseDecoder.tsx        # Morse code decoder
│   └── ...
├── lib/
│   └── morse.ts               # Morse code conversion logic
├── pages/
│   └── Index.tsx              # Main application
└── ...
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🌟 Acknowledgments

- Built with modern web technologies for cross-platform compatibility
- Inspired by the need for accessible Morse code learning tools
