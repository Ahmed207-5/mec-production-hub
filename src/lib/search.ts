import * as production from "@/data/batches";
import * as power from "@/data/power";

export interface SearchItem {
  title: string;
  department: "production" | "power";
  batch: number;
  year: number;
  semester: 1 | 2;
  url: string;
}

const sources = [
  {
    department: "production" as const,
    batches: production.batches,
  },
  {
    department: "power" as const,
    batches: power.batches,
  },
];

export const searchIndex: SearchItem[] = [];

sources.forEach((source) => {
  source.batches.forEach((batch) => {
    batch.years.forEach((year) => {
      if (year.semesters.first) {
        searchIndex.push({
          title: `${source.department === "production" ? "إنتاج" : "قوى"} - دفعة ${batch.year} - الفرقة ${year.yearNumber} - الترم الأول`,
          department: source.department,
          batch: batch.year,
          year: year.yearNumber,
          semester: 1,
          url: year.semesters.first,
        });
      }

      if (year.semesters.second) {
        searchIndex.push({
          title: `${source.department === "production" ? "إنتاج" : "قوى"} - دفعة ${batch.year} - الفرقة ${year.yearNumber} - الترم الثاني`,
          department: source.department,
          batch: batch.year,
          year: year.yearNumber,
          semester: 2,
          url: year.semesters.second,
        });
      }
    });
  });
});