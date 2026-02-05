import { CheckCircledIcon, ChevronDownIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";

import type { EnrichedResult } from "@/domain/types";
import { cn } from "@/lib/cn";
import { getOverallStats } from "@/lib/overallStats";

type Props = {
  rows: EnrichedResult[];
  showBreakdown?: boolean;
  onSelectCategory?: (category: string) => void;
};

export function Overall({ rows, showBreakdown = true, onSelectCategory }: Props) {
  const [isInRangeOpen, setIsInRangeOpen] = useState(false);
  const [isNeedsAttentionOpen, setIsNeedsAttentionOpen] = useState(true);
  const { outsideRange, normalCount, status, headline, needsAttention, normalBiomarkers } =
    useMemo(() => getOverallStats(rows), [rows]);

  return (
    <div className="rounded-xl border border-border bg-bg shadow-sm divide-y divide-border">
      <div className="px-4 py-3">
        <div className="hidden items-center gap-2 text-xl font-semibold text-fg md:flex">
          {outsideRange === 0 ? (
            <CheckCircledIcon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          ) : (
            <InfoCircledIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
          )}
          <span>{status}</span>
        </div>
        <p className="mt-2 text-sm text-muted">{headline}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-700/80 dark:text-emerald-300/80">
            In range
            <span className="inline-flex min-w-[20px] justify-center px-1.5 py-0.5 text-[10px] font-semibold">
              {normalCount}
            </span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-2.5 py-1 font-medium text-amber-800/80 dark:text-amber-300/80">
            Outside
            <span className="inline-flex min-w-[20px] justify-center px-1.5 py-0.5 text-[10px] font-semibold">
              {outsideRange}
            </span>
          </span>
        </div>
      </div>

      {showBreakdown && (
        <>
          <div className="px-4 py-3">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left"
              onClick={() => setIsNeedsAttentionOpen((current) => !current)}
              aria-expanded={isNeedsAttentionOpen}
            >
              <div>
                <div className="text-sm font-semibold text-fg">Needs attention</div>
                <div className="mt-1 text-xs text-muted">Outside the reference range</div>
              </div>
              <ChevronDownIcon
                className={cn(
                  "h-4 w-4 text-muted transition-transform",
                  isNeedsAttentionOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            {isNeedsAttentionOpen && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {needsAttention.length === 0 ? (
                  <div className="rounded-lg border border-border/60 bg-bg px-3 py-2 text-xs text-muted">
                    All categories are within the reference range.
                  </div>
                ) : (
                  needsAttention.map((entry) => (
                    <button
                      key={entry.category}
                      type="button"
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border/40 bg-border/10 px-2 py-0.5 text-left text-xs text-fg shadow-none transition hover:border-border/60 hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
                      onClick={() => onSelectCategory?.(entry.category)}
                    >
                      <span className="font-medium text-fg">{entry.category}</span>
                      <div className="group relative">
                        <span className="inline-flex min-w-[28px] items-center justify-center rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-800/80 dark:text-amber-300/80">
                          {entry.outside}
                        </span>
                        <span className="pointer-events-none absolute right-0 top-0 z-10 translate-y-[-120%] whitespace-nowrap rounded-md border border-border bg-bg px-2 py-1 text-[11px] text-muted opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                          {entry.outside} result{entry.outside === 1 ? "" : "s"} outside the
                          reference range
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="px-4 py-3">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left"
              onClick={() => setIsInRangeOpen((current) => !current)}
              aria-expanded={isInRangeOpen}
            >
              <div>
                <div className="text-sm font-semibold text-fg">Normal Biomarkers</div>
              </div>
              <ChevronDownIcon
                className={cn(
                  "h-4 w-4 text-muted transition-transform",
                  isInRangeOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            {isInRangeOpen && (
              <div className="mt-3">
                {normalBiomarkers.length === 0 ? (
                  <div className="rounded-lg border border-border/60 bg-bg px-3 py-2 text-xs text-muted">
                    No normal biomarkers.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {normalBiomarkers.map((biomarker) => (
                      <span
                        key={biomarker.id}
                        className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700/80 dark:text-emerald-300/80"
                      >
                        {biomarker.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
