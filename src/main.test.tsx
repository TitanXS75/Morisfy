import { createRoot } from "react-dom/client";

// Simple test to check if basic rendering works
console.log('Main.test.tsx loaded');

const rootElement = document.getElementById("root");
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error("Root element not found");
} else {
  rootElement.innerHTML = '<div style="color: white; background: black; padding: 20px;">TEST PAGE - If you see this, basic rendering works</div>';
  console.log('Test content set');
}
