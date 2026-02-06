import { useCallback, useMemo, useState } from "react";

import { DEFAULT_SORT, sortBiomarkers, type SortKey } from "@/domain/biomarkerSort";
import type { CategoryFilter, EnrichedResult, StatusFilter } from "@/domain/types";
import {
  filterByCategory,
  filterBySampleDate,
  filterBySearch,
  filterByStatus,
  getCategories,
  getSampleDates,
} from "@/lib/biomarkerFilters";

export function useBiomarkersViewModel(enriched: EnrichedResult[]) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortKey>(DEFAULT_SORT);
  const [dateSelection, setDateSelection] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const sampleDates = useMemo(() => getSampleDates(enriched), [enriched]);

  const activeDate = useMemo(() => {
    if (sampleDates.length === 0) return "";
    if (sampleDates.includes(dateSelection)) return dateSelection;
    return sampleDates[0];
  }, [sampleDates, dateSelection]);

  const dateFiltered = useMemo(
    () => filterBySampleDate(enriched, activeDate),
    [enriched, activeDate],
  );

  const categories = useMemo(() => getCategories(dateFiltered), [dateFiltered]);

  const activeCategory = useMemo<CategoryFilter>(() => {
    if (category === "all" || category === "empty") return category;
    if (categories.includes(category)) return category;
    return "all";
  }, [category, categories]);

  const filtered = useMemo(() => {
    const list = filterBySearch(
      filterByStatus(filterByCategory(dateFiltered, activeCategory), statusFilter),
      searchQuery,
    );
    return sortBiomarkers(list, sort);
  }, [dateFiltered, activeCategory, sort, statusFilter, searchQuery]);

  const hasFilters =
    activeCategory !== "all" ||
    sort !== DEFAULT_SORT ||
    statusFilter !== "all" ||
    searchQuery.trim().length > 0;

  const resetFilters = useCallback(() => {
    setCategory("all");
    setSort(DEFAULT_SORT);
    setStatusFilter("all");
    setSearchQuery("");
  }, []);

  return {
    category: activeCategory,
    setCategory,
    sort,
    setSort,
    categories,
    dateFiltered,
    filtered,
    dateTotal: dateFiltered.length,
    sampleDates,
    activeDate,
    setActiveDate: setDateSelection,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    hasFilters,
    resetFilters,
  };
}
