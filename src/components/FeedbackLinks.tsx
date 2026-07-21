import { AlertTriangle, PlusCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FeedbackLinks({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={siteConfig.GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
      >
        <AlertTriangle className="h-4 w-4" aria-hidden />
        إبلاغ عن رابط لا يعمل
      </a>
      <span className="text-line" aria-hidden>
        |
      </span>
      <a
        href={siteConfig.GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
      >
        <PlusCircle className="h-4 w-4" aria-hidden />
        إضافة رابط مفقود
      </a>
    </div>
  );
}
