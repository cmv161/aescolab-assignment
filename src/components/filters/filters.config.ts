import { SORT_OPTIONS, type SortKey } from "@/domain/biomarkerSort";
import { formatDate } from "@/lib/formatDate";

import type { FilterOption } from "./types";

export const STATUS_OPTIONS: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "outside", label: "Outside range" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "low", label: "Low" },
];

export const SORT_FILTER_OPTIONS: ReadonlyArray<FilterOption<SortKey>> = SORT_OPTIONS;

export function buildDateOptions(sampleDates: string[]): FilterOption[] {
  if (sampleDates.length === 0) {
    return [{ value: "", label: "No data", disabled: true }];
  }
  return sampleDates.map((value) => ({ value, label: formatDate(value) }));
}

export function buildCategoryOptions(categories: string[]): FilterOption[] {
  return [
    { value: "all", label: "All" },
    { value: "empty", label: "Empty" },
    ...categories.map((c) => ({ value: c, label: c })),
  ];
}

export function getSelectedOption<T extends { value: string }>(
  options: ReadonlyArray<T>,
  value: string,
): T {
  return options.find((option) => option.value === value) ?? options[0];
}
