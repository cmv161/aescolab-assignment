const SKELETON_CARDS = Array.from({ length: 6 }, (_, idx) => `skeleton-card-${idx}`);
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-border/60 bg-bg/90 p-3 shadow-sm md:hidden">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-36 rounded-full bg-border/30" />
                <div className="h-10 w-16 rounded-full bg-border/30" />
                <div className="h-9 w-9 rounded-lg bg-border/30" />
              </div>
              <div className="h-4 w-20 rounded bg-border/20" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="h-10 flex-1 rounded-lg bg-border/20" />
              <div className="h-4 w-20 rounded bg-border/20" />
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-3">
          <div className="rounded-xl border border-border/60 bg-bg/90 px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-40 rounded-full bg-border/30" />
                <div className="h-10 w-28 rounded-full bg-border/30" />
                <div className="h-10 w-24 rounded-full bg-border/30" />
                <div className="h-9 w-16 rounded-full bg-border/30" />
              </div>
              <div className="h-4 w-24 rounded bg-border/20" />
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-bg/90 px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-3">
                <div className="h-10 flex-1 rounded-lg bg-border/20" />
                <div className="h-10 w-28 rounded-full bg-border/30" />
              </div>
              <div className="h-9 w-24 rounded-full bg-border/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="w-full lg:w-auto lg:basis-80 lg:shrink-0 lg:sticky lg:top-20 self-start">
          <div className="rounded-xl border border-border bg-bg shadow-sm">
            <div className="px-4 py-4">
              <div className="h-5 w-36 rounded bg-border/30" />
              <div className="mt-3 h-3 w-48 rounded bg-border/20" />
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="h-7 w-20 rounded-full bg-border/20" />
                <div className="h-7 w-20 rounded-full bg-border/20" />
              </div>
            </div>
            <div className="border-t border-border px-4 py-4">
              <div className="h-4 w-32 rounded bg-border/30" />
              <div className="mt-2 h-3 w-40 rounded bg-border/20" />
              <div className="mt-3 grid grid-cols-2 gap-2">
                {SKELETON_ROWS.map((rowId) => (
                  <div key={rowId} className="h-7 rounded-full bg-border/20" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 3xl:grid-cols-3">
            {SKELETON_CARDS.map((cardId) => (
              <div
                key={cardId}
                className="rounded-2xl border border-border/60 bg-bg px-5 py-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="h-4 w-40 rounded bg-border/30" />
                    <div className="mt-3 h-4 w-24 rounded bg-border/20" />
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <div className="h-6 w-16 rounded-full bg-border/20" />
                    <div className="h-3 w-24 rounded bg-border/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
