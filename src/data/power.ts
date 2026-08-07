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
    {
      yearNumber: 1,
      semesters: {
        first:
          "https://drive.google.com/drive/folders/179EPTKGcrYeoyBnEXQq3vu8FYVBDbNij?usp=drive_link",
        second:
          "https://drive.google.com/drive/folders/179VWs5LwmyzYWc0xE6HRM4FC9Um9y_yH?usp=drive_link",
      },
    },
    {
      yearNumber: 2,
      semesters: {
        first:
          "https://drive.google.com/drive/folders/19PuK2iX6W3_V-p3v87Mi0JTENygklZrZ?usp=drive_link",
        second:
          "https://drive.google.com/drive/folders/17CxDcvchB0B9Lvjo6ZraTcrRpgDpx-Pe?usp=drive_link",
      },
    },
    {
      yearNumber: 3,
      semesters: {
        first:
          "https://drive.google.com/drive/folders/1yswnsNbSFBIbe89MKTnsSM1tJvwyIjIs?usp=drive_link",
        second:
          "https://drive.google.com/drive/folders/1TRQ9GtkO91KxUkdKUbACYBDdg6ItXpBH?usp=drive_link",
      },
    },
    {
      yearNumber: 4,
      semesters: {
        first:
          "https://drive.google.com/drive/folders/12mgUNJPnyJZGtm73v1V2aQD2B182buHQ?usp=drive_link",
        second:
          "https://drive.google.com/drive/folders/1t-wOoKDSnHU3N__2Znuj1bvor66yqewA?usp=drive_link",
      },
    },
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