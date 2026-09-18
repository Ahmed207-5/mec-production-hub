"use client";

import { ExternalLink, Eye } from "lucide-react";

export default function DriveLink({
  label,
  url,
  nodeId,
  clicks = 0,
}: {
  label: string;
  url: string;
  nodeId?: string;
  clicks?: number;
}) {
  async function handleClick() {
    // Open immediately while the click still has browser user-activation.
    window.open(url, "_blank", "noopener,noreferrer");

    try {
      const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("event", "drive_open", {
        link_id: nodeId,
        link_label: label,
      });
    } catch {}

    if (nodeId) {
      try {
        await fetch("/api/click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nodeId }),
          keepalive: true,
        });
      } catch {
        // Analytics must never block the Drive link.
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-between gap-3 rounded-md bg-paper-2 px-4 py-3 text-right transition hover:bg-accent/10"
    >
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="inline-flex items-center gap-2">
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted">
          <Eye className="h-3.5 w-3.5" />
          {clicks}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-paper">
          فتح Google Drive
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </span>
      </span>
    </button>
  );
}
