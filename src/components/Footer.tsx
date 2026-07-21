import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-8 flex flex-col items-center gap-2.5 text-center">
        <p className="font-display font-semibold text-sm text-ink">
          {siteConfig.footerTagline}
        </p>

        <p className="text-xs text-muted max-w-md leading-relaxed">
          {siteConfig.disclaimer}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-muted">
          <span>{siteConfig.copyrightLine}</span>
          <span className="text-line" aria-hidden>
            •
          </span>
          <span className="inline-flex items-center gap-1">
            Developed by{" "}
            <a
              href={siteConfig.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-ink hover:text-accent transition-colors"
            >
              {siteConfig.developerName}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
