// src/data/batches.ts
//
// ⭐ THIS IS THE ONLY FILE YOU NEED TO EDIT TO:
//    - add a new graduating batch
//    - update / paste a real Google Drive link
//    - leave a semester link empty until you have it
//
// Nothing here touches UI components — just data.

export type Semester = "first" | "second";

export interface YearData {
  yearNumber: 1 | 2 | 3 | 4;
  semesters: {
    // Paste the real Google Drive share link here.
    // Leave as null (not "") if the link isn't available yet —
    // the UI will automatically show "الرابط غير متوفر حاليًا".
    first: string | null;
    second: string | null;
  };
}

export interface Batch {
  year: number; // e.g. 2026
  label: string; // e.g. "دفعة إنتاج 2026"
  years: YearData[];
}

// ---------------------------------------------------------------------------
// 👇 Add / edit batches below. Copy a whole block to add a new year.
// ---------------------------------------------------------------------------

export const batches: Batch[] = [
  {
    year: 2026,
    label: "دفعة إنتاج 2026",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2026_Y1_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2026_Y1_S2",
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2026_Y2_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2026_Y2_S2",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2026_Y3_S1",
          second: null, // example: not available yet
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2026_Y4_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2026_Y4_S2",
        },
      },
    ],
  },
  {
    year: 2025,
    label: "دفعة إنتاج 2025",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2025_Y1_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2025_Y1_S2",
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2025_Y2_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2025_Y2_S2",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2025_Y3_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2025_Y3_S2",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2025_Y4_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2025_Y4_S2",
        },
      },
    ],
  },
  {
    year: 2024,
    label: "دفعة إنتاج 2024",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2024_Y1_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2024_Y1_S2",
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2024_Y2_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2024_Y2_S2",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2024_Y3_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2024_Y3_S2",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2024_Y4_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2024_Y4_S2",
        },
      },
    ],
  },
  {
    year: 2023,
    label: "دفعة إنتاج 2023",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2023_Y1_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2023_Y1_S2",
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2023_Y2_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2023_Y2_S2",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2023_Y3_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2023_Y3_S2",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "https://drive.google.com/drive/folders/PLACEHOLDER_2023_Y4_S1",
          second: "https://drive.google.com/drive/folders/PLACEHOLDER_2023_Y4_S2",
        },
      },
    ],
  },
];

export function getBatchByYear(year: number): Batch | undefined {
  return batches.find((b) => b.year === year);
}

export function getAllBatchYears(): number[] {
  return batches.map((b) => b.year);
}
