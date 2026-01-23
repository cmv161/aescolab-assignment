export function EmptyState({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-border/10 p-6">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted">{description}</div>
      <button
        type="button"
        className="mt-4 rounded-lg border border-border px-3 py-2 text-sm hover:bg-border/30"
        onClick={onReset}
      >
        Reset filters
      </button>
    </div>
  );
}
