import { StatusBadge } from "@/components/StatusBadge";
import type { EnrichedResult } from "@/domain/types";

type Props = {
  rows: EnrichedResult[];
  onRowClick: (row: EnrichedResult) => void;
};

export function ResultCard({ rows, onRowClick }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 3xl:grid-cols-3">
      {rows.map((row) => (
        <button
          key={row.id}
          type="button"
          className="group w-full cursor-pointer rounded-2xl border border-border/60 bg-bg px-5 py-4 text-left shadow-sm transition hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
          onClick={() => onRowClick(row)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-fg">{row.biomarker.name}</div>
              <div className="mt-1 text-sm font-semibold text-fg">
                {row.value} <span className="text-muted">{row.biomarker.standardUnit}</span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1 text-right">
              <StatusBadge status={row.status} />
              <div className="text-xs text-muted">
                Ref: {row.biomarker.referenceRange.low}-{row.biomarker.referenceRange.high}{" "}
                {row.biomarker.standardUnit}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
