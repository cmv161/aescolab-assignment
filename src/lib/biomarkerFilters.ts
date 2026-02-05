import type { CategoryFilter, EnrichedResult, StatusFilter } from "@/domain/types";
import { getSampleDate } from "@/lib/getSampleDate";

export function getSampleDates(rows: EnrichedResult[]): string[] {
  const set = new Set<string>();
  for (const result of rows) {
    if (result.sampledAt) {
      set.add(getSampleDate(result.sampledAt));
    }
  }
  return Array.from(set).sort((a, b) => b.localeCompare(a));
}

export function filterBySampleDate(rows: EnrichedResult[], activeDate: string): EnrichedResult[] {
  if (!activeDate) return rows;
  return rows.filter((result) => getSampleDate(result.sampledAt) === activeDate);
}

export function getCategories(rows: EnrichedResult[]): string[] {
  const set = new Set(rows.map((r) => r.biomarker.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function filterByCategory(
  rows: EnrichedResult[],
  category: CategoryFilter,
): EnrichedResult[] {
  if (category === "empty") return [];
  if (category === "all") return rows;
  return rows.filter((r) => r.biomarker.category === category);
}

export function filterByStatus(
  rows: EnrichedResult[],
  statusFilter: StatusFilter,
): EnrichedResult[] {
  if (statusFilter === "outside") {
    return rows.filter((r) => r.status !== "normal");
  }
  if (statusFilter === "all") return rows;
  return rows.filter((r) => r.status === statusFilter);
}
