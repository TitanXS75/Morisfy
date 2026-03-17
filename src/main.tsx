import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Add loading indicator
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Show loading state while app loads
rootElement.innerHTML = `
  <div style="
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #0a0a0f;
    color: #f5a623;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.2em;
  ">
    LOADING...
  </div>
`;

const root = createRoot(rootElement);
root.render(<App />);

// Add error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  rootElement.innerHTML = `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #0a0a0f;
      color: #ef4444;
      font-family: 'Rajdhani', sans-serif;
      text-align: center;
      padding: 2rem;
    ">
      <div>
        <h2 style="margin-bottom: 1rem;">APP ERROR</h2>
        <p style="font-size: 0.9rem; opacity: 0.8;">Please refresh the page</p>
        <button onclick="window.location.reload()" style="
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #f5a623;
          color: #0a0a0f;
          border: none;
          border-radius: 4px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: bold;
          cursor: pointer;
        ">RELOAD</button>
      </div>
    </div>
  `;
});
