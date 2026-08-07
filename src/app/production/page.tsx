import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BatchGrid from "@/components/BatchGrid";
import FeedbackLinks from "@/components/FeedbackLinks";
import { batches } from "@/data/batches";

export default function ProductionPage() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 sm:px-8 py-8 sm:py-12">
        <BatchGrid
          title="ميكانيكا إنتاج"
          batches={batches}
        />

        <div className="mt-12 flex justify-center">
          <FeedbackLinks />
        </div>
      </main>

      <Footer />
    </>
  );
}