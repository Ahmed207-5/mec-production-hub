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
    year: 2027,
    label: "دفعة إنتاج 2027",
    years: [
      {
        yearNumber: 1,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "",
          second: "",
        },
      },
    ],
  },
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
          first: "https://drive.google.com/drive/folders/1bRjkqK8e9OaFzIsCPI85rRBSLoaspiXq",
          second: "https://drive.google.com/drive/folders/1Eo1w5n5KrQW6ROGfYKmnfJsL-9fTjeAn",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "https://drive.google.com/drive/folders/1Kdmt8mTz6K7q0OYWCLkXMMhrkE7ihAZ1",
          second: "https://drive.google.com/drive/folders/11WhqOOvvlsZUB9Y7ohJ16OfI3AL82UHH",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "https://drive.google.com/drive/folders/1SF8HWgiMk-4SG5TQo8UAN2DQjdx5zw1s",
          second: "https://drive.google.com/drive/folders/15TOh6bn6d2nkf1yVCbUhIpF3XFPW0VZA",
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
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "",
          second: "",
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
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "",
          second: "",
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
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 2,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 3,
        semesters: {
          first: "",
          second: "",
        },
      },
      {
        yearNumber: 4,
        semesters: {
          first: "",
          second: "",
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