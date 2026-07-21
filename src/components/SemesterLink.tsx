import { ExternalLink, FolderX } from "lucide-react";

export default function SemesterLink({
  label,
  url,
}: {
  label: string;
  url: string | null;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-paper-2 px-4 py-3">
      <span className="text-sm font-medium text-ink">{label}</span>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-paper transition-colors hover:bg-accent"
        >
          فتح Google Drive
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-muted">
          <FolderX className="h-3.5 w-3.5" aria-hidden />
          الرابط غير متوفر حاليًا
        </span>
      )}
    </div>
  );
}
