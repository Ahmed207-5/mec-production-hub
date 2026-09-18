import Link from "next/link";
import { ArrowLeft, Eye, FolderOpen, SquareArrowOutUpRight } from "lucide-react";
import type { HubNode } from "@/lib/hub";
import DriveLink from "./DriveLink";

export default function HubNodeCard({
  node,
  clicks = 0,
  linkCount,
  linkTotal,
}: {
  node: HubNode;
  clicks?: number;
  linkCount?: number;
  linkTotal?: number | null;
}) {
  const href = node.type === "batch" && node.department && node.batch_year
    ? `/${node.department}/${node.batch_year}`
    : `/browse/${node.id}`;

  if (node.url) {
    return (
      <DriveLink
        label={node.title_ar || node.title}
        url={node.url}
        nodeId={node.id}
        clicks={clicks}
      />
    );
  }

  const isBatch = node.type === "batch";

  return (
    <Link
      href={href}
      className="tick-corners group relative flex min-h-40 flex-col justify-between rounded-lg border border-line bg-paper p-6 text-ink transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_10px_30px_-15px_rgba(232,100,31,0.35)]"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-3xl font-extrabold tracking-tight text-ink group-hover:text-accent transition-colors">
          {node.batch_year || node.icon || "📁"}
        </span>
        {node.type === "link" || node.type === "button" ? (
          <SquareArrowOutUpRight className="h-5 w-5 text-muted group-hover:text-accent" />
        ) : (
          <FolderOpen className="h-5 w-5 text-muted group-hover:text-accent" />
        )}
      </div>

      <div className="mt-6">
        <p className="font-display font-bold text-lg">{node.title_ar || node.title}</p>
        {node.title_ar && node.title_ar !== node.title && (
          <p className="mt-1 text-xs text-muted">{node.title}</p>
        )}
        {isBatch && typeof linkCount === "number" && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
            <Eye className="h-3.5 w-3.5" aria-hidden />
            {linkTotal ? `${linkCount} من ${linkTotal} روابط متاحة` : `${linkCount} روابط متاحة`}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent">
        {node.type === "link" || node.type === "button" ? "فتح الرابط" : "اعرض الدفعة"}
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
      </div>
    </Link>
  );
}
