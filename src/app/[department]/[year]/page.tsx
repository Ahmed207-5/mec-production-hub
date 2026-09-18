import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SemesterLink from "@/components/SemesterLink";
import HubNodeCard from "@/components/HubNodeCard";
import FeedbackLinks from "@/components/FeedbackLinks";
import { getAllNodes, getBatchNodes, getChildren, getClickCounts, type HubNode } from "@/lib/hub";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  const nodes = await getAllNodes();
  return nodes
    .filter((n) => n.type === "batch" && n.department && n.batch_year)
    .map((n) => ({ department: n.department!, year: String(n.batch_year) }));
}

export async function generateMetadata({ params }: { params: Promise<{ department: string; year: string }> }): Promise<Metadata> {
  const { department, year } = await params;
  const batch = await getBatchNodes(department as "production" | "power", Number(year));
  return { title: batch ? (batch.title_ar || batch.title) : "دفعة غير موجودة" };
}

export default async function BatchPage({ params }: { params: Promise<{ department: string; year: string }> }) {
  const { department, year } = await params;
  if (department !== "production" && department !== "power") return notFound();

  const batch = await getBatchNodes(department, Number(year));
  if (!batch) return notFound();

  const children = await getChildren(batch.id);
  const yearNodes = children.filter((n) => n.type === "year");
  const linkNodes = children.filter((n) => n.url);
  const clickCounts = await getClickCounts(linkNodes.map((n) => n.id));

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <Breadcrumbs current={batch.title_ar || batch.title} />
        <div className="mb-8 mt-4 sm:mb-10">
          <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{batch.title_ar || batch.title}</h1>
          <p className="mt-1.5 text-sm text-muted">المحتوى المتاح للدفعة</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {yearNodes.map((yearNode) => (
            <YearNode key={yearNode.id} node={yearNode} />
          ))}
          {children.filter((n) => n.type !== "year" && n.url).map((node) => (
            <SemesterLink key={node.id} label={node.title_ar || node.title} url={node.url} nodeId={node.id} clicks={clickCounts.get(node.id) || 0} />
          ))}
          {children.filter((n) => n.type !== "year" && !n.url).map((node) => (
            <HubNodeCard key={node.id} node={node} />
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2.5 rounded-md border border-line bg-paper-2 px-4 py-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="text-xs leading-relaxed text-muted">{siteConfig.batchDisclaimer}</p>
        </div>
        <div className="mt-12 flex justify-center"><FeedbackLinks /></div>
      </main>
      <Footer />
    </>
  );
}

async function YearNode({ node }: { node: HubNode }) {
  const children = await getChildren(node.id);
  const links = children.filter((n) => n.url);
  const counts = await getClickCounts(links.map((n) => n.id));
  const custom = children.filter((n) => !n.url);
  const termNumbers = children
    .filter((n) => n.type === "term" && n.semester_number)
    .map((n) => n.semester_number as number);
  const expectedTerms = termNumbers.length ? Math.max(...termNumbers) : null;
  const availableLinks = links.length;
  return (
    <div className="tick-corners rounded-lg border border-line bg-paper p-5">
      <div className="mb-4 flex items-baseline gap-2.5 border-b border-line pb-3">
        <span className="font-display text-2xl font-extrabold text-accent">{String(node.year_number || "").padStart(2, "0")}</span>
        <div className="min-w-0">
          <h2 className="font-display font-bold text-ink">{node.title_ar || node.title}</h2>
          {expectedTerms ? (
            <p className="mt-1 text-xs text-muted">{availableLinks} من {expectedTerms} روابط متاحة</p>
          ) : (
            <p className="mt-1 text-xs text-muted">{availableLinks} روابط متاحة</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {links.map((link) => (
          <SemesterLink key={link.id} label={link.title_ar || link.title} url={link.url} nodeId={link.id} clicks={counts.get(link.id) || 0} />
        ))}
        {custom.map((item) => (
          <HubNodeCard key={item.id} node={item} />
        ))}
      </div>
    </div>
  );
}
