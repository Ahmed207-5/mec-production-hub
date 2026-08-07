export default function DepartmentSelector() {
  return (
    <section className="mt-12 sm:mt-16">
      <p className="mt-2 text-center text-muted mb-8">
        Choose your Mechanical Engineering Department
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/production"
          className="rounded-3xl border border-line bg-paper p-8 transition hover:-translate-y-1 hover:shadow-xl text-center"
        >
          <div className="text-5xl mb-4">⚙️</div>

          <h3 className="text-2xl font-bold">
            ميكانيكا إنتاج
          </h3>

          <p className="mt-2 text-muted">
            Mechanical Production
          </p>
        </a>

        <a
          href="/power"
          className="rounded-3xl border border-line bg-paper p-8 transition hover:-translate-y-1 hover:shadow-xl text-center"
        >
          <div className="text-5xl mb-4">🚗</div>

          <h3 className="text-2xl font-bold">
            ميكانيكا قوى
          </h3>

          <p className="mt-2 text-muted">
            Mechanical Power
          </p>
        </a>
      </div>
    </section>
  );
}