"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import type { SearchResult } from "@/lib/search";

export default function SearchBar({ items }: { items: SearchResult[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items.filter((item) =>
      [item.title, item.department === "production" ? "إنتاج ميكانيكا إنتاج" : item.department === "power" ? "قوى ميكانيكا قوى" : "", item.batch, item.year, item.semester]
        .filter(Boolean).join(" ").toLowerCase().includes(q)
    ).slice(0, 12);
  }, [items, query]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("mec-search")?.focus();
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative mx-auto mb-8 max-w-3xl">
      <Search className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        id="mec-search"
        type="search"
        dir="rtl"
        placeholder="ابحث عن دفعة أو فرقة أو قسم..."
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-ink outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-auto rounded-xl border border-line bg-white text-right shadow-2xl">
          {results.length ? results.map((item) => (
            item.url ? (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => {
                try {
                  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
                  gtag?.("event", "drive_open", { link_id: item.id, link_label: item.title });
                } catch {}
                void fetch("/api/click", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nodeId: item.id }), keepalive: true }).catch(() => {});
              }} className="block border-b border-line p-4 hover:bg-paper-2">
                <div className="flex items-center justify-between gap-3 font-semibold text-ink"><span>{item.title}</span><ExternalLink className="h-4 w-4 shrink-0 text-muted" /></div>
                <div className="mt-1 text-xs text-muted">{item.department === "production" ? "ميكانيكا إنتاج" : item.department === "power" ? "ميكانيكا قوى" : ""}{item.batch ? ` • دفعة ${item.batch}` : ""}{item.year ? ` • الفرقة ${item.year}` : ""}{item.semester ? ` • الترم ${item.semester}` : ""}</div>
              </a>
            ) : (
              <a key={item.id} href={`/browse/${item.id}`} className="block border-b border-line p-4 hover:bg-paper-2">
                <div className="font-semibold text-ink">{item.title}</div>
              </a>
            )
          )) : <div className="p-5 text-center text-muted">لا توجد نتائج</div>}
        </div>
      )}
      <div className="mt-2 text-center text-[11px] text-muted">Ctrl + K للبحث السريع</div>
    </div>
  );
}
