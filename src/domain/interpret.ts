import type { EnrichedResult } from "./types";

export function interpret(r: EnrichedResult): string {
  const { status } = r;
  if (status === "low")
    return "This result is below the usual range. It may be worth keeping an eye on.";
  if (status === "high") return "This result is above the usual range. It may be worth monitoring.";
  return "This result is within the usual range.";
}
