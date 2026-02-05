import type { EnrichedResult } from "@/domain/types";

type CategoryStats = {
  category: string;
  total: number;
  outside: number;
  normal: number;
};

type NormalBiomarker = {
  id: string;
  name: string;
};

const getStatusConfig = (overallTotal: number, overallOutside: number) => {
  if (overallTotal === 0) {
    return {
      status: "No data",
      headline: "No data available to display.",
    };
  }

  if (overallOutside === 0) {
    return {
      status: "All Clear",
      headline: "Great news: All results are within the normal range.",
    };
  }

  if (overallOutside === 1) {
    return {
      status: "Review Suggested",
      headline: "1 result is outside the reference range.",
    };
  }

  if (overallOutside <= 5) {
    return {
      status: "Review Suggested",
      headline: `${overallOutside} results are outside the reference range.`,
    };
  }

  return {
    status: "Detailed Results",
    headline: "Results require review across several categories.",
  };
};

export type OverallStats = {
  total: number;
  outsideRange: number;
  normalCount: number;
  status: string;
  headline: string;
  needsAttention: CategoryStats[];
  normalBiomarkers: NormalBiomarker[];
};

export function getOverallStats(rows: EnrichedResult[]): OverallStats {
  const total = rows.length;
  let outsideRange = 0;
  const map = new Map<string, { total: number; outside: number; normal: number }>();
  const normalMap = new Map<string, NormalBiomarker>();

  rows.forEach((row) => {
    const category = row.biomarker.category;
    const existing = map.get(category) ?? { total: 0, outside: 0, normal: 0 };
    existing.total += 1;
    if (row.status !== "normal") {
      existing.outside += 1;
      outsideRange += 1;
    } else {
      existing.normal += 1;
      normalMap.set(row.biomarker.id, { id: row.biomarker.id, name: row.biomarker.name });
    }
    map.set(category, existing);
  });

  const entries: CategoryStats[] = Array.from(map.entries()).map(([category, stats]) => ({
    category,
    total: stats.total,
    outside: stats.outside,
    normal: stats.normal,
  }));

  const needsAttention = entries
    .filter((entry) => entry.outside > 0)
    .sort((a, b) => b.outside - a.outside || a.category.localeCompare(b.category));
  const normalBiomarkers = Array.from(normalMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const normalCount = total - outsideRange;
  const { status, headline } = getStatusConfig(total, outsideRange);

  return {
    total,
    outsideRange,
    normalCount,
    status,
    headline,
    needsAttention,
    normalBiomarkers,
  };
}
