import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";
  import { setBaseUrl } from "@/lib/api-client";

  // Point all API calls at the backend URL from the environment variable.
  // In development: set VITE_API_URL in a .env file (e.g. http://localhost:3000)
  // In production (Vercel): set VITE_API_URL to your Render backend URL
  if (import.meta.env.VITE_API_URL) {
    setBaseUrl(import.meta.env.VITE_API_URL);
  }

  // Silently wake up the Render backend as soon as the app loads.
  // Render free tier sleeps after inactivity — this ping warms it up
  // in the background so signup/login feel instant when the user submits.
  if (import.meta.env.VITE_API_URL) {
    fetch(`${import.meta.env.VITE_API_URL}/api/healthz`, { method: "GET" }).catch(() => {
      // Ignore errors — this is just a background warm-up ping
    });
  }

  createRoot(document.getElementById("root")!).render(<App />);
  