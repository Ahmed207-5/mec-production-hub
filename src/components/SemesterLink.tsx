import { FolderX } from "lucide-react";
import DriveLink from "./DriveLink";

export default function SemesterLink({
  label,
  url,
  nodeId,
  clicks = 0,
}: {
  label: string;
  url: string | null;
  nodeId?: string;
  clicks?: number;
}) {
  return url ? (
    <DriveLink label={label} url={url} nodeId={nodeId} clicks={clicks} />
  ) : (
    <div className="flex items-center justify-between gap-3 rounded-md bg-paper-2 px-4 py-3">
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-muted">
        <FolderX className="h-3.5 w-3.5" aria-hidden />
        الرابط غير متوفر حاليًا
      </span>
    </div>
  );
}
