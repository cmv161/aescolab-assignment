import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchBiomarkers, fetchResults } from "@/api/fakeApi";
import { joinResults } from "@/domain/join";
import type { Biomarker, EnrichedResult, Result } from "@/domain/types";

export function useBiomarkerData() {
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, r] = await Promise.all([fetchBiomarkers(), fetchResults()]);
      setBiomarkers(b);
      setResults(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const enriched: EnrichedResult[] = useMemo(
    () => joinResults(biomarkers, results),
    [biomarkers, results],
  );

  return { loading, error, enriched, reload: load };
}
