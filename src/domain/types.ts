export type ReferenceRange = {
  low: number;
  high: number;
};

export type ResultStatus = "low" | "normal" | "high";
export type StatusFilter = "all" | "outside" | ResultStatus;
export type CategoryFilter = "all" | "empty" | (string & {});

export type Biomarker = {
  id: string;
  name: string;
  standardUnit: string;
  referenceRange: ReferenceRange;
  category: string;
  importance: number;
};

export type Result = {
  id: string;
  biomarkerId: string;
  value: number;
  sampledAt: string;
  status: ResultStatus;
};

export type EnrichedResult = Result & {
  biomarker: Biomarker;
};
