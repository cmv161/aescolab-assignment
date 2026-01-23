export type SortKey = "name-asc" | "name-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export const DEFAULT_SORT: SortKey = "name-asc";

export function sortBiomarkers<T extends { biomarker: { name: string } }>(
  list: T[],
  sort: SortKey,
) {
  return [...list].sort((a, b) => {
    const an = a.biomarker.name.toLowerCase();
    const bn = b.biomarker.name.toLowerCase();
    return sort === "name-asc" ? an.localeCompare(bn) : bn.localeCompare(an);
  });
}
