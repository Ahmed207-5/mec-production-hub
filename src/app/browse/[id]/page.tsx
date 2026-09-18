import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubNodeGrid from "@/components/HubNodeGrid";
import SemesterLink from "@/components/SemesterLink";
import { getNode, getChildren, getClickCounts } from "@/lib/hub";

export default async function BrowsePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const node = await getNode(id);
  if (!node) return notFound();

  const children = await getChildren(id);
  const linkNodes = children.filter((child) => child.url);
  const otherNodes = children.filter((child) => !child.url);
  const counts = await getClickCounts(linkNodes.map((n) => n.id));

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <Breadcrumbs current={node.title_ar || node.title} />
        <div className="mb-8 mt-4">
          <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{node.title_ar || node.title}</h1>
          {node.title_ar && node.title_ar !== node.title && <p className="mt-1 text-sm text-muted">{node.title}</p>}
        </div>

        {otherNodes.length > 0 && <HubNodeGrid nodes={otherNodes} />}
        {linkNodes.length > 0 && (
          <div className="mt-5 flex flex-col gap-2.5">
            {linkNodes.map((link) => (
              <SemesterLink key={link.id} label={link.title_ar || link.title} url={link.url} nodeId={link.id} clicks={counts.get(link.id) || 0} />
            ))}
          </div>
        )}
        {children.length === 0 && <div className="rounded-xl border border-line bg-paper-2 p-8 text-center text-muted">لا يوجد محتوى هنا حاليًا.</div>}
      </main>
      <Footer />
    </>
  );
}
