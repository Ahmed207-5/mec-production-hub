import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 h-16 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 font-display font-extrabold text-base sm:text-xl text-ink"
        >
          <Image
            src="/logo.png"
            alt="شعار كلية الهندسة جامعة الزقازيق"
            width={447}
            height={447}
            priority
            className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full object-contain"
          />
          <span className="truncate" dir="ltr">
            {siteConfig.name}
          </span>
        </Link>
        <span className="hidden sm:block shrink-0 text-sm text-muted">
          {siteConfig.department}
        </span>
      </div>
    </header>
  );
}
