import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import type { Batch } from "@/data/batches";

export default function BatchCard({ batch }: { batch: Batch }) {
  const linkCount = batch.years.reduce(
    (sum, y) =>
      sum + (y.semesters.first ? 1 : 0) + (y.semesters.second ? 1 : 0),
    0
  );

  return (
    <Link
      href={`/batch/${batch.year}`}
      className="tick-corners group relative flex flex-col justify-between rounded-lg border border-line bg-paper p-6 text-ink transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_10px_30px_-15px_rgba(232,100,31,0.35)]"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-3xl font-extrabold tracking-tight text-ink group-hover:text-accent transition-colors">
          {batch.year}
        </span>
        <FolderOpen
          className="h-5 w-5 text-muted group-hover:text-accent transition-colors"
          aria-hidden
        />
      </div>

      <div className="mt-6">
        <p className="font-display font-bold text-lg">{batch.label}</p>
        <p className="mt-1 text-xs text-muted">
          {linkCount} من 8 روابط متاحة
        </p>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent">
        اعرض الدفعة
        <ArrowLeft
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          aria-hidden
        />
      </div>
    </Link>
  );
}
