import { useEffect, useState } from "react";

import { DetailsDrawer } from "@/components/DetailsDrawer";
import type { ViewMode } from "@/components/filters/types";
import { FiltersBar } from "@/components/FiltersBar";
import { Overall } from "@/components/Overall";
import { ResultCard } from "@/components/ResultCard";
import { ResultsTable } from "@/components/ResultsTable";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingSkeleton } from "@/components/states/LoadingSkeleton";
import type { EnrichedResult } from "@/domain/types";
import { useBiomarkerData } from "@/hooks/useBiomarkerData";
import { useBiomarkersViewModel } from "@/hooks/useBiomarkersViewModel";

const VIEW_STORAGE_KEY = "biomarkers:view";

export function BiomarkersPage() {
  const { loading, error, enriched, reload } = useBiomarkerData();
  const [selected, setSelected] = useState<EnrichedResult | null>(null);
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "card";
    const stored = localStorage.getItem(VIEW_STORAGE_KEY);
    return stored === "table" ? "table" : "card";
  });
  const {
    category,
    setCategory,
    sort,
    setSort,
    categories,
    dateFiltered,
    filtered,
    dateTotal,
    sampleDates,
    activeDate,
    setActiveDate,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    hasFilters,
    resetFilters,
  } = useBiomarkersViewModel(enriched);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  const shown = filtered.length;

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-6">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={() => void reload()} />
        ) : (
          <>
            <FiltersBar
              sampleDates={sampleDates}
              activeDate={activeDate}
              onActiveDateChange={setActiveDate}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={categories}
              category={category}
              onCategoryChange={setCategory}
              status={statusFilter}
              onStatusChange={setStatusFilter}
              sort={sort}
              onSortChange={setSort}
              total={dateTotal}
              shown={shown}
              showReset={hasFilters}
              onReset={resetFilters}
              view={view}
              onViewChange={setView}
            />
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start ">
              <div className="w-full lg:w-auto lg:basis-80 lg:shrink-0 lg:sticky lg:top-20 self-start">
                <Overall
                  rows={dateFiltered}
                  onSelectCategory={(nextCategory) => {
                    setCategory(nextCategory);
                    setStatusFilter("outside");
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                {shown === 0 ? (
                  <EmptyState
                    title="No results match your filters"
                    description="Try selecting a different category or reset filters."
                    onReset={resetFilters}
                  />
                ) : view === "table" ? (
                  <ResultsTable rows={filtered} onRowClick={setSelected} />
                ) : (
                  <ResultCard rows={filtered} onRowClick={setSelected} />
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <DetailsDrawer selected={selected} onClose={() => setSelected(null)} />
    </>
  );
}
