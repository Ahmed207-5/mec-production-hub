import BatchCard from "@/components/BatchCard";
import FeedbackLinks from "@/components/FeedbackLinks";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { batches } from "@/data/power";

export default function PowerPage() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 sm:px-8 py-8 sm:py-12">
        <section className="mt-12 sm:mt-16">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              ميكانيكا قوى
            </h2>

            <span className="text-xs text-muted">
              {batches.length} دفعات متاحة
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {batches.map((batch) => (
              <BatchCard
  key={batch.year}
  batch={batch}
  department="power"
/>
            ))}
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <FeedbackLinks />
        </div>
      </main>

      <Footer />
    </>
  );
}