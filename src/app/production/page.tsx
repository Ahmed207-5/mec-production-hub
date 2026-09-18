import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackLinks from "@/components/FeedbackLinks";
import HubNodeGrid from "@/components/HubNodeGrid";
import { getDepartmentNodes } from "@/lib/hub";

export default async function ProductionPage() {
  const { children } = await getDepartmentNodes("production");
  const visible = children.filter((node) => ["batch", "archive", "folder", "link", "button"].includes(node.type));

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <section className="mt-12 sm:mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">ميكانيكا إنتاج</h1>
            <span className="text-xs text-muted">{visible.length} عناصر متاحة</span>
          </div>
          <HubNodeGrid nodes={visible} />
        </section>
        <div className="mt-12 flex justify-center"><FeedbackLinks /></div>
      </main>
      <Footer />
    </>
  );
}
