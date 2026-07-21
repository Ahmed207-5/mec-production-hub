// src/data/batches.ts
//
// ⭐ THIS IS THE ONLY FILE YOU NEED TO EDIT TO:
//    - add a new graduating batch
//    - update / paste a real Google Drive link
//    - leave a semester link as null until you have it
//
// Nothing here touches UI components — just data.

export type Semester = "first" | "second";

export interface YearData {
  yearNumber: 1 | 2 | 3 | 4;
  semesters: {
    // Paste the real Google Drive share link here.
    // Leave as null if the link isn't available yet.
    // The UI will automatically show "الرابط غير متوفر حاليًا".
    first: string | null;
    second: string | null;
  };
}

export interface Batch {
  year: number;
  label: string;
  years: YearData[];
}

// ---------------------------------------------------------------------------
// Add / edit batches below.
// Copy a whole batch block to add a new graduating year.
// ---------------------------------------------------------------------------

export const batches: Batch[] = [
  // =========================
  // دفعة إنتاج 2026
  // =========================
  {
    year: 2026,
    label: "دفعة إنتاج 2026",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first:
            "https://drive.google.com/drive/folders/1bRjkqK8e9OaFzIsCPI85rRBSLoaspiXq",
          second:
            "https://drive.google.com/drive/folders/1Eo1w5n5KrQW6ROGfYKmnfJsL-9fTjeA",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first:
            "https://drive.google.com/drive/folders/1Kdmt8mTz6K7q0OYWCLkXMMhrkE7ihAZ1",
          second:
            "https://drive.google.com/drive/folders/11WhqOOvvlsZUB9Y7ohJ16OfI3AL82UHH",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first:
            "https://drive.google.com/drive/folders/1SF8HWgiMk-4SG5TQo8UAN2DQjdx5zw1s",
          second:
            "https://drive.google.com/drive/folders/15TOh6bn6d2nkf1yVCbUhIpF3XFPW0VZA",
        },
      },
    ],
  },

  // =========================
  // دفعة إنتاج 2025
  // =========================
  {
    year: 2025,
    label: "دفعة إنتاج 2025",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: null,
          second: null,
        },
      },
    ],
  },

  // =========================
  // دفعة إنتاج 2024
  // =========================
  {
    year: 2024,
    label: "دفعة إنتاج 2024",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: null,
          second: null,
        },
      },
    ],
  },

  // =========================
  // دفعة إنتاج 2023
  // =========================
  {
    year: 2023,
    label: "دفعة إنتاج 2023",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: null,
          second: null,
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: null,
          second: null,
        },
      },
    ],
  },
];

export function getBatchByYear(year: number): Batch | undefined {
  return batches.find((batch) => batch.year === year);
}

export function getAllBatchYears(): number[] {
  return batches.map((batch) => batch.year);
}