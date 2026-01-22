import biomarkers from "@/data/biomarkers.json";
import results from "@/data/results.json";
import type { Biomarker, Result } from "@/domain/types";

const DEFAULT_DELAY_MS = 1000;

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function shouldSimulateError() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("error") === "1";
}

function getDelayMs() {
  if (typeof window === "undefined") return DEFAULT_DELAY_MS;
  const params = new URLSearchParams(window.location.search);
  const delayParam = params.get("delay");
  if (!delayParam) return DEFAULT_DELAY_MS;
  const value = Number(delayParam);
  if (!Number.isFinite(value) || value < 0) return DEFAULT_DELAY_MS;
  return value;
}

export async function fetchBiomarkers(): Promise<Biomarker[]> {
  await delay(getDelayMs());
  if (shouldSimulateError()) throw new Error("Failed to load biomarkers");
  return structuredClone(biomarkers) as Biomarker[];
}

export async function fetchResults(): Promise<Result[]> {
  await delay(getDelayMs());
  if (shouldSimulateError()) throw new Error("Failed to load results");
  return structuredClone(results) as Result[];
}
