import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import YearCard from "@/components/YearCard";
import FeedbackLinks from "@/components/FeedbackLinks";
import * as production from "@/data/batches";
import * as power from "@/data/power";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  const productionYears = production.getAllBatchYears().map((year) => ({
    department: "production",
    year: String(year),
  }));

  const powerYears = power.getAllBatchYears().map((year) => ({
    department: "power",
    year: String(year),
  }));

  return [...productionYears, ...powerYears];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ department: string; year: string }>;
}): Promise<Metadata> {
  const { department, year } = await params;

  const batch =
    department === "power"
      ? power.getBatchByYear(Number(year))
      : production.getBatchByYear(Number(year));

  return {
    title: batch ? batch.label : "دفعة غير موجودة",
  };
}

export default async function BatchPage({
  params,
}: {
  params: Promise<{ department: string; year: string }>;
}) {
  const { department, year } = await params;

  const batch =
    department === "power"
      ? power.getBatchByYear(Number(year))
      : production.getBatchByYear(Number(year));

  if (!batch) return notFound();

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 sm:px-8 py-8 sm:py-12">
        <Breadcrumbs current={batch.label} />

        <div className="mt-4 mb-8 sm:mb-10">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            {batch.label}
          </h1>

          <p className="mt-1.5 text-sm text-muted">
            كل درايفات الدفعة خلال الأربع سنين
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {batch.years.map((year) => (
            <YearCard key={year.yearNumber} year={year} />
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2.5 rounded-md border border-line bg-paper-2 px-4 py-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="text-xs leading-relaxed text-muted">
            {siteConfig.batchDisclaimer}
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <FeedbackLinks />
        </div>
      </main>

      <Footer />
    </>
  );
}