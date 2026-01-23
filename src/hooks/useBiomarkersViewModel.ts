import { useCallback, useMemo, useState } from "react";

import { DEFAULT_SORT, sortBiomarkers, type SortKey } from "@/domain/biomarkerSort";
import type { EnrichedResult } from "@/domain/types";

export function useBiomarkersViewModel(enriched: EnrichedResult[]) {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>(DEFAULT_SORT);

  const categories = useMemo(() => {
    const set = new Set(enriched.map((r) => r.biomarker.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [enriched]);

  const filtered = useMemo(() => {
    if (category === "empty") return [];

    const list =
      category === "all" ? enriched : enriched.filter((r) => r.biomarker.category === category);

    return sortBiomarkers(list, sort);
  }, [enriched, category, sort]);

  const hasFilters = category !== "all" || sort !== DEFAULT_SORT;

  const resetFilters = useCallback(() => {
    setCategory("all");
    setSort(DEFAULT_SORT);
  }, []);

  return {
    category,
    setCategory,
    sort,
    setSort,
    categories,
    filtered,
    hasFilters,
    resetFilters,
  };
}
