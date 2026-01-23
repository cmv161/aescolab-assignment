import { useState } from "react";

import { DetailsDrawer } from "@/components/DetailsDrawer";
import { FiltersBar } from "@/components/FiltersBar";
import { ResultsTable } from "@/components/ResultsTable";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingSkeleton } from "@/components/states/LoadingSkeleton";
import type { EnrichedResult } from "@/domain/types";
import { useBiomarkerData } from "@/hooks/useBiomarkerData";
import { useBiomarkersViewModel } from "@/hooks/useBiomarkersViewModel";

export function BiomarkersPage() {
  const { loading, error, enriched, reload } = useBiomarkerData();
  const [selected, setSelected] = useState<EnrichedResult | null>(null);
  const { category, setCategory, sort, setSort, categories, filtered, hasFilters, resetFilters } =
    useBiomarkersViewModel(enriched);

  const renderContent = () => {
    if (loading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <ErrorState message={error} onRetry={() => void reload()} />;
    }

    return (
      <>
        <FiltersBar
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          total={enriched.length}
          shown={filtered.length}
          showReset={hasFilters}
          onReset={resetFilters}
        />
        {filtered.length === 0 ? (
          <EmptyState
            title="No results match your filters"
            description="Try selecting a different category or reset filters."
            onReset={resetFilters}
          />
        ) : (
          <ResultsTable rows={filtered} onRowClick={setSelected} />
        )}
      </>
    );
  };

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-6">{renderContent()}</main>
      <DetailsDrawer selected={selected} onClose={() => setSelected(null)} />
    </>
  );
}
