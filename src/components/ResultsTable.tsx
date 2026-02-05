import { type ReactNode } from "react";

import { StatusBadge } from "@/components/StatusBadge";
import type { EnrichedResult } from "@/domain/types";
import { cn } from "@/lib/cn";

type Props = {
  rows: EnrichedResult[];
  onRowClick: (row: EnrichedResult) => void;
};

type Column = {
  id: string;
  header: string;
  headerClassName?: string;
  cellClassName?: string;
  cell: (row: EnrichedResult) => ReactNode;
};

const columns: Column[] = [
  {
    id: "biomarker",
    header: "Biomarker",
    headerClassName: "pl-8",
    cellClassName: "pl-8",
    cell: (row) => (
      <div className="min-w-0">
        <div className="truncate font-medium text-fg">{row.biomarker.name}</div>
      </div>
    ),
  },
  {
    id: "result",
    header: "Result",
    cell: (row) => (
      <div className="font-medium text-fg">
        {row.value} <span className="text-muted">{row.biomarker.standardUnit}</span>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    id: "reference",
    header: "Reference",
    cellClassName: "text-muted",
    cell: (row) => (
      <>
        {row.biomarker.referenceRange.low}-{row.biomarker.referenceRange.high}{" "}
        {row.biomarker.standardUnit}
      </>
    ),
  },
  {
    id: "category",
    header: "Category",
    cell: (row) => (
      <span className="inline-flex min-w-[100px] items-center justify-center rounded-full border border-border bg-border/10 px-2 py-1 text-xs text-muted">
        {row.biomarker.category}
      </span>
    ),
  },
];

export function ResultsTable({ rows, onRowClick }: Props) {
  return (
    <div className="rounded-xl border border-border bg-bg shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <div className="text-sm font-semibold">Results</div>
          <div className="mt-0.5 text-xs text-muted">
            Click a row to view details and add a note.
          </div>
        </div>

        <div className="text-xs text-muted">
          {rows.length} item{rows.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full text-left text-sm">
          <thead className="bg-border/20">
            <tr className="text-xs font-medium uppercase tracking-wide text-muted">
              {columns.map((column) => (
                <th key={column.id} className={cn("px-4 py-3", column.headerClassName)} scope="col">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {rows.map((r) => {
              return (
                <tr
                  key={r.id}
                  className="group cursor-pointer transition-colors focus-within:bg-border/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
                  role="button"
                  tabIndex={0}
                  onClick={() => onRowClick(r)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onRowClick(r);
                    }
                  }}
                >
                  {columns.map((column) => (
                    <td key={column.id} className={cn("px-4 py-3", column.cellClassName)}>
                      {column.cell(r)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
