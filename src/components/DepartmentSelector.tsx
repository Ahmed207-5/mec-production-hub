import Link from "next/link";
import { getAllNodes } from "@/lib/hub";

export default async function DepartmentSelector() {
  const nodes = await getAllNodes();
  const departments = nodes
    .filter((node) => node.type === "department" && node.active)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="mt-12 sm:mt-16">
      <p className="mt-2 mb-8 text-center text-muted">
        Choose your Mechanical Engineering Department
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => {
          const isLegacy = department.department === "production" || department.department === "power";
          const href = isLegacy ? `/${department.department}` : `/browse/${department.id}`;
          return (
            <Link
              key={department.id}
              href={href}
              className="rounded-3xl border border-line bg-paper p-8 text-center transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 text-5xl">{department.icon || "📚"}</div>
              <h3 className="text-2xl font-bold">{department.title_ar || department.title}</h3>
              {department.title_ar && department.title_ar !== department.title && (
                <p className="mt-2 text-muted">{department.title}</p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
