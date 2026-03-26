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

  createRoot(document.getElementById("root")!).render(<App />);
  