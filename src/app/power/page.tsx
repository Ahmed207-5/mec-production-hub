import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackLinks from "@/components/FeedbackLinks";
import HubNodeGrid from "@/components/HubNodeGrid";
import { getAllNodes, getDepartmentNodes, getDescendantLinkStats } from "@/lib/hub";

export default async function PowerPage() {
  const { children } = await getDepartmentNodes("power");
  const visible = children.filter((node) => ["batch", "archive", "folder", "link", "button"].includes(node.type));
  const allNodes = await getAllNodes();
  const stats = new Map(visible.map((node) => [node.id, getDescendantLinkStats(allNodes, node.id)]));

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <section className="mt-12 sm:mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">ميكانيكا قوى</h1>
            <span className="text-xs text-muted">{visible.length} عناصر متاحة</span>
          </div>
          <HubNodeGrid nodes={visible} stats={stats} />
        </section>
        <div className="mt-12 flex justify-center"><FeedbackLinks /></div>
      </main>
      <Footer />
    </>
  );
}
