"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchIndex } from "@/lib/search";

export default function SearchBar() {
  const [query, setQuery] = useState("");

const data = searchIndex;

  const results = data.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto mb-8 max-w-3xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="ابحث عن دفعة أو فرقة أو قسم..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pr-4 pl-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {query && (
        <div className="mt-4 overflow-hidden rounded-xl border bg-white shadow-lg">
          {results.length > 0 ? (
            results.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b p-4 transition hover:bg-gray-50"
              >
                <div className="font-semibold">{item.title}</div>

                <div className="mt-1 text-sm text-gray-500">
                  {item.department === "production"
                    ? "ميكانيكا إنتاج"
                    : "ميكانيكا قوى"}
                  {" • "}
                  دفعة {item.batch}
                  {" • "}
                  الفرقة {item.year}
                  {" • "}
                  {item.semester === 1 ? "الترم الأول" : "الترم الثاني"}
                </div>
              </a>
            ))
          ) : (
            <div className="p-5 text-center text-gray-500">
              لا توجد نتائج
            </div>
          )}
        </div>
      )}
    </div>
  );
}