"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    // Already installed and running as a standalone app (Android/desktop
    // Chrome, or added-to-home-screen on iOS) — nothing to prompt for.
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) return;

    const dismissed = localStorage.getItem("mec-install-dismissed");
    if (dismissed) return;

    // This handler is the ONLY place `show` is ever set to true, so the
    // prompt can only render once Chrome has actually decided the app
    // is installable and fired this event.
    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function install() {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShow(false);
  }

  function dismiss() {
    localStorage.setItem("mec-install-dismissed", "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-2xl border border-line bg-paper p-5 shadow-2xl">
      <h3 className="text-lg font-bold">
        📱 ثبت تطبيق MEC Archive
      </h3>

      <p className="mt-2 text-sm text-muted">
        ثبت التطبيق على جهازك للوصول السريع للدرايفات بدون فتح المتصفح.
      </p>

      <div className="mt-5 flex gap-3">
        <button
          onClick={install}
          className="flex-1 rounded-xl bg-accent px-4 py-3 font-semibold text-white"
        >
          تثبيت الآن
        </button>

        <button
          onClick={dismiss}
          className="rounded-xl border border-line px-4 py-3"
        >
          لاحقًا
        </button>
      </div>
    </div>
  );
}
