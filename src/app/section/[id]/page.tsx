import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubNodeGrid from "@/components/HubNodeGrid";
import FeedbackLinks from "@/components/FeedbackLinks";
import { getAllNodes, getChildren, getDescendantLinkStats, type HubNode } from "@/lib/hub";

export default async function CustomDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allNodes = await getAllNodes();
  const department = allNodes.find((node) => node.id === id && node.type === "department" && node.active);
  if (!department) return notFound();

  const children = await getChildren(department.id);
  const visible = children.filter((node) => node.active);
  const stats = new Map(visible.map((node) => [node.id, getDescendantLinkStats(allNodes, node.id)]));

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <Breadcrumbs current={department.title_ar || department.title} />
        <section className="mt-12 sm:mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">{department.icon || "📚"} {department.title_ar || department.title}</h1>
              {department.title_ar && department.title_ar !== department.title && <p className="mt-1 text-sm text-muted">{department.title}</p>}
            </div>
            <span className="text-xs text-muted">{visible.length} عناصر متاحة</span>
          </div>
          <HubNodeGrid nodes={visible} stats={stats} />
          {visible.length === 0 && (
            <div className="rounded-xl border border-line bg-paper-2 p-8 text-center text-muted">لا يوجد محتوى هنا حاليًا.</div>
          )}
        </section>
        <div className="mt-12 flex justify-center"><FeedbackLinks /></div>
      </main>
      <Footer />
    </>
  );
}
