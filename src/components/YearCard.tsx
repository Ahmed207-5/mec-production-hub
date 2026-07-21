import type { YearData } from "@/data/batches";
import { yearLabels } from "@/config/site";
import SemesterLink from "./SemesterLink";

export default function YearCard({ year }: { year: YearData }) {
  const meta = yearLabels[year.yearNumber];

  return (
    <div className="tick-corners rounded-lg border border-line bg-paper p-5">
      <div className="flex items-baseline gap-2.5 border-b border-line pb-3 mb-4">
        <span className="font-display text-2xl font-extrabold text-accent">
          {meta.number}
        </span>
        <h3 className="font-display font-bold text-ink">{meta.title}</h3>
      </div>

      <div className="flex flex-col gap-2.5">
        <SemesterLink label="الترم الأول" url={year.semesters.first} />
        <SemesterLink label="الترم الثاني" url={year.semesters.second} />
      </div>
    </div>
  );
}
