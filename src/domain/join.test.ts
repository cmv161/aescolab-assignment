import { describe, expect, it } from "vitest";

import { joinResults } from "./join";
import type { Biomarker, Result } from "./types";

const biomarker: Biomarker = {
  id: "bio_001",
  name: "Total Cholesterol",
  standardUnit: "mg/dL",
  referenceRange: { low: 120, high: 200 },
  category: "Lipids",
  importance: 8,
};

const makeResult = (overrides: Partial<Result> = {}): Result => ({
  id: "res_001",
  biomarkerId: biomarker.id,
  value: 228,
  sampledAt: "2026-01-10T08:30:00.000Z",
  status: "high",
  ...overrides,
});

describe("joinResults", () => {
  it("joins results with biomarkers", () => {
    const biomarkers: Biomarker[] = [biomarker];
    const results: Result[] = [makeResult()];

    const out = joinResults(biomarkers, results);

    expect(out).toHaveLength(1);
    expect(out[0].biomarker.name).toBe("Total Cholesterol");
  });

  it("drops results with unknown biomarkerId", () => {
    const biomarkers: Biomarker[] = [biomarker];
    const results: Result[] = [makeResult({ id: "res_999", biomarkerId: "bio_missing" })];

    const out = joinResults(biomarkers, results);

    expect(out).toHaveLength(0);
  });
});
