import type { Biomarker, EnrichedResult, Result } from "./types";

export function joinResults(biomarkers: Biomarker[], results: Result[]): EnrichedResult[] {
  const dict: Record<string, Biomarker> = {};
  for (const b of biomarkers) dict[b.id] = b;

  const enriched: EnrichedResult[] = [];

  for (const r of results) {
    const biomarker = dict[r.biomarkerId];
    if (biomarker) enriched.push({ ...r, biomarker });
  }

  return enriched;
}
