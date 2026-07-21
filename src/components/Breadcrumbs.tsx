import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
      <Link href="/" className="hover:text-accent transition-colors">
        الرئيسية
      </Link>
      <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
      <span className="text-ink font-medium">{current}</span>
    </nav>
  );
}
