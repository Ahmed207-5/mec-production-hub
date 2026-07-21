// src/config/site.ts
// Central place for site copy + the external "report / add link" form.
// Change GOOGLE_FORM_URL once you create a real Google Form.

export const siteConfig = {
  name: "MEC Production Hub",
  shortName: "MEC Production Hub",
  subtitle: "كل درايفات إنتاج.. في مكان واحد",
  charityMessage: "صدقة جارية عن دفعة إنتاج 2026",
  heroText:
    "كل درايفات الدفعات السابقة في ميكانيكا إنتاج هندسة الزقازيق، مترتبة حسب دفعتك وسنتك الدراسية.. عشان توصل للي محتاجه من غير تدوير.",
  batchSectionTitle: "اختار دفعتك وابدأ",
  department: "ميكانيكا إنتاج – هندسة الزقازيق",
  batchDisclaimer:
    "تنويه: جميع ملفات وروابط Google Drive تعود ملكيتها لأصحابها الأصليين، ودور MEC Production Hub يقتصر فقط على تنظيم الروابط وتسهيل الوصول إليها للطلاب.",
  footerTagline: "من دفعة لدفعة.. العلم بيفضل مكمل",
  disclaimer:
    "الموقع لا يستضيف أو يمتلك الملفات، وإنما ينظم روابط Google Drive المتاحة بغرض تسهيل الوصول إليها.",
  copyrightLine: "جميع الحقوق محفوظة © MEC Production Hub",
  developerName: "Ahmed Elsaeed",
  developerUrl: "https://www.linkedin.com/in/ahmed-elsaeed207",

  // TODO: replace with your real Google Form link.
  // Both the "report broken link" and "add missing link" buttons use this.

  siteUrl: "", // TODO: replace with real deployed URL for SEO
};

export const yearLabels: Record<number, { title: string; number: string }> = {
  1: { title: "الفرقة الأولى", number: "01" },
  2: { title: "الفرقة الثانية", number: "02" },
  3: { title: "الفرقة الثالثة", number: "03" },
  4: { title: "الفرقة الرابعة", number: "04" },
};
