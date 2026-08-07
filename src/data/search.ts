export interface SearchItem {
  id: string;
  title: string;
  titleAr: string;
  department: "production" | "power";
  batch: number;
  year: 1 | 2 | 3 | 4;
  semester: 1 | 2;
  url: string;
}

export const searchItems: SearchItem[] = [
  // Production
  {
    id: "machine-design-2026-y4-s1",
    title: "Machine Design",
    titleAr: "تصميم الماكينات",
    department: "production",
    batch: 2026,
    year: 4,
    semester: 1,
    url: "https://drive.google.com/...",
  },

  // Power
  {
    id: "thermodynamics-2025-y3-s2",
    title: "Thermodynamics",
    titleAr: "الديناميكا الحرارية",
    department: "power",
    batch: 2025,
    year: 3,
    semester: 2,
    url: "https://drive.google.com/...",
  },
];