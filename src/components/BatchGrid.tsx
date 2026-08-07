import BatchCard from "@/components/BatchCard";
import { Batch } from "@/data/batches";

interface BatchGridProps {
  title: string;
  batches: Batch[];
}

export default function BatchGrid({
  title,
  batches,
}: BatchGridProps) {
  return (
    <section className="mt-12 sm:mt-16">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          {title}
        </h2>

        <span className="text-xs text-muted">
          {batches.length} دفعات متاحة
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {batches.map((batch) => (
          <BatchCard key={batch.year} batch={batch} />
        ))}
      </div>
    </section>
  );
}