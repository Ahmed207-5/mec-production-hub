import { batches as productionBatches } from "@/data/batches";
import { batches as powerBatches } from "@/data/power";

export interface SearchResult {
  department: "production" | "power";
  batch: number;
  year: number;
  semester: 1 | 2;
  title: string;
  url: string;
}

export function getAllDriveLinks(): SearchResult[] {
  const results: SearchResult[] = [];

  function collect(
    batches: typeof productionBatches,
    department: "production" | "power"
  ) {
    batches.forEach((batch) => {
      batch.years.forEach((year) => {
        if (year.semesters.first) {
          results.push({
            department,
            batch: batch.year,
            year: year.yearNumber,
            semester: 1,
            title: `${department === "production" ? "إنتاج" : "باور"} - دفعة ${batch.year} - الفرقة ${year.yearNumber} - الترم الأول`,
            url: year.semesters.first,
          });
        }

        if (year.semesters.second) {
          results.push({
            department,
            batch: batch.year,
            year: year.yearNumber,
            semester: 2,
            title: `${department === "production" ? "إنتاج" : "باور"} - دفعة ${batch.year} - الفرقة ${year.yearNumber} - الترم الثاني`,
            url: year.semesters.second,
          });
        }
      });
    });
  }

  collect(productionBatches, "production");
  collect(powerBatches, "power");

  return results;
}