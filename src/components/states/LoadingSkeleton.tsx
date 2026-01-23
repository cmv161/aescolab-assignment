const SKELETON_ROWS = [
  "skeleton-row-1",
  "skeleton-row-2",
  "skeleton-row-3",
  "skeleton-row-4",
  "skeleton-row-5",
  "skeleton-row-6",
  "skeleton-row-7",
];

export function LoadingSkeleton() {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="h-4 w-48 rounded bg-border/30" />
      <div className="mt-4 space-y-3">
        {SKELETON_ROWS.map((rowId) => (
          <div key={rowId} className="h-10 rounded bg-border/20" />
        ))}
      </div>
    </div>
  );
}
