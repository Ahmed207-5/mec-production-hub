import type { Batch } from "./batches";

export const batches: Batch[] = [
  {
    year: 2027,
    label: "دفعة قوى 2027",
    years: [
      { yearNumber: 1, semesters: { first: "", second: "" } },
      { yearNumber: 2, semesters: { first: "", second: "" } },
      { yearNumber: 3, semesters: { first: "", second: "" } },
      { yearNumber: 4, semesters: { first: "", second: "" } },
    ],
  },

  {
    year: 2026,
    label: "دفعة قوى 2026",
    years: [
      { yearNumber: 1, semesters: { first: "", second: "" } },
      { yearNumber: 2, semesters: { first: "", second: "" } },
      { yearNumber: 3, semesters: { first: "", second: "" } },
      { yearNumber: 4, semesters: { first: "", second: "" } },
    ],
  },

  {
    year: 2025,
    label: "دفعة قوى 2025",
    years: [
      { yearNumber: 1, semesters: { first: "", second: "" } },
      { yearNumber: 2, semesters: { first: "", second: "" } },
      { yearNumber: 3, semesters: { first: "", second: "" } },
      { yearNumber: 4, semesters: { first: "", second: "" } },
    ],
  },

  {
    year: 2024,
    label: "دفعة قوى 2024",
    years: [
      { yearNumber: 1, semesters: { first: "", second: "" } },
      { yearNumber: 2, semesters: { first: "", second: "" } },
      { yearNumber: 3, semesters: { first: "", second: "" } },
      { yearNumber: 4, semesters: { first: "", second: "" } },
    ],
  },

  {
    year: 2023,
    label: "دفعة قوى 2023",
    years: [
      { yearNumber: 1, semesters: { first: "", second: "" } },
      { yearNumber: 2, semesters: { first: "", second: "" } },
      { yearNumber: 3, semesters: { first: "", second: "" } },
      { yearNumber: 4, semesters: { first: "", second: "" } },
    ],
  },
];

export function getBatchByYear(year: number) {
  return batches.find((b) => b.year === year);
}

export function getAllBatchYears() {
  return batches.map((b) => b.year);
}