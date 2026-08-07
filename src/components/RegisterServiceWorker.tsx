"use client";

import { useEffect } from "react";

// Registers /public/sw.js. This must run in a Client Component because
// `navigator`/`window` don't exist during Server Component rendering.
// Rendering this component returns nothing visible — it's a
// side-effect-only mount.
export default function RegisterServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // A failed registration (unsupported browser, blocked by an
        // extension, dev environment quirks, etc.) must never break
        // the rest of the app — fail silently.
      });
    };

    // Registering after the page has fully loaded keeps the SW
    // install from competing with the page's own initial requests.
    if (document.readyState === "complete") {
      register();
      return;
    }

    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
