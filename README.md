# Morsify — Morse Code Translator & BLE Transmitter

A modern, feature-rich Morse code learning and communication tool with Web Audio playback and Bluetooth Low Energy (BLE) transmission capabilities. Works offline and supports real-time translation, interactive learning, and wireless communication.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Translation** - Instant text to Morse code conversion and vice versa
- **Audio Playback** - High-quality Morse code audio synthesis using Web Audio API
- **Interactive Alphabet Grid** - Visual reference for learning Morse code patterns
- **Live Decoder** - Decode Morse code signals in real-time

### 📡 Bluetooth Transmission
- **Web Bluetooth Support** - Connect to BLE devices for wireless Morse transmission
- **UART Service Compatible** - Works with Nordic UART Service (6E400001-B5A3-F393-E0A9-E50E24DCCA9E)
- **Demo Mode** - Test functionality in browsers without Web Bluetooth support
- **Cross-browser Compatibility** - Enhanced support with fallbacks for all modern browsers

### 🎨 Modern UI/UX
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme** - Easy on the eyes with beautiful glass morphism effects
- **Smooth Animations** - Engaging micro-interactions and transitions
- **Progressive Web App** - Installable and works offline

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Modern web browser (Chrome/Edge/Opera recommended for full BLE support)

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

### Full Support
- ✅ **Chrome on Android** - Complete BLE functionality
- ✅ **Chrome/Edge/Opera on Desktop** - Complete BLE functionality

### Limited Support
- ⚠️ **Safari/Firefox** - No Web Bluetooth support
- ⚠️ **Other browsers** - Basic translation features only

### Requirements
- 🔒 **HTTPS** required for Web Bluetooth (localhost works for development)
- 👆 **User gesture** required for device pairing
- 📡 **BLE device** with UART service for transmission

## 🎮 Usage

### Basic Translation
1. Enter text in the translator
2. View real-time Morse code conversion
3. Play audio to hear the Morse code
4. Use the alphabet grid for reference

### Bluetooth Transmission
1. Navigate to the **TRANSMIT** tab
2. Click **SCAN FOR DEVICES** (or **TRY DEMO MODE** in unsupported browsers)
3. Select your BLE device
4. Type your message and click **TRANSMIT MORSE**
5. Monitor the transmission log for status

### Demo Mode
For browsers without Web Bluetooth support, enable **Demo Mode** to:
- Test the interface and user flow
- Simulate device connection
- Practice transmission workflow

## 🛠️ Tech Stack

- **React 18** - Modern component-based UI
- **TypeScript** - Type-safe development
- **Vite** - Fast development and building
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Web Bluetooth API** - BLE device communication
- **Web Audio API** - Morse code synthesis

## 📂 Project Structure

```
src/
├── components/
│   ├── BluetoothModule.tsx    # BLE transmission functionality
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

### BLE Service Configuration
The app uses standard Nordic UART Service:
- **UART Service**: `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`
- **TX Characteristic**: `6E400002-B5A3-F393-E0A9-E50E24DCCA9E`
- **RX Characteristic**: `6E400003-B5A3-F393-E0A9-E50E24DCCA9E`

## 🌟 Acknowledgments

- Built with modern web technologies for cross-platform compatibility
- Inspired by the need for accessible Morse code learning tools
- Enhanced with Web Bluetooth for real-world communication applications
