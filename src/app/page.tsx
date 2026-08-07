import { Heart } from "lucide-react";
import Header from "@/components/Header";
import DepartmentSelector from "@/components/DepartmentSelector";
import Footer from "@/components/Footer";
import BlueprintPanel from "@/components/BlueprintPanel";
import FeedbackLinks from "@/components/FeedbackLinks";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 sm:px-8 py-8 sm:py-12">
        <BlueprintPanel>
          <div className="px-6 py-12 sm:px-12 sm:py-16 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line-dark px-3 py-1 text-xs font-medium text-accent-2">
              <Heart className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.charityMessage}
            </span>

            <h1 className="font-display mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              MEC Archive
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-balance text-sm sm:text-base leading-relaxed text-paper/80">
              اختر القسم الدراسي
            </p>
          </div>
        </BlueprintPanel>

        <DepartmentSelector />

        <div className="mt-12 flex justify-center">
          <FeedbackLinks />
        </div>
      </main>

      <Footer />
    </>
  );
}