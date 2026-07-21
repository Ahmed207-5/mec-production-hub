export default function BlueprintPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-ink text-paper">
      <div
        className="blueprint-grid absolute inset-0 opacity-70"
        aria-hidden
      />
      {/* soft orange glow, echoes a drafting-lamp highlight */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}
