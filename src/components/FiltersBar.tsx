import { SelectMenu } from "@/components/SelectMenu";
import { SORT_OPTIONS, type SortKey } from "@/domain/biomarkerSort";

type Props = {
  categories: string[];
  category: string;
  onCategoryChange: (v: string) => void;

  sort: SortKey;
  onSortChange: (v: SortKey) => void;

  total: number;
  shown: number;

  showReset: boolean;
  onReset: () => void;
};

export function FiltersBar({
  categories,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  total,
  shown,
  showReset,
  onReset,
}: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-bg/90 p-3 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-row items-end gap-2 md:items-center md:gap-3">
        <SelectMenu
          label="Category"
          value={category}
          options={[
            { value: "all", label: "All" },
            { value: "empty", label: "Empty" },
            ...categories.map((c) => ({ value: c, label: c })),
          ]}
          onChange={onCategoryChange}
        />

        <SelectMenu
          label="Sort"
          value={sort}
          options={SORT_OPTIONS}
          onChange={(next) => onSortChange(next as SortKey)}
        />

        {showReset && (
          <button
            type="button"
            className="h-9 rounded-lg border border-border/70 bg-bg px-3 text-xs font-medium text-fg shadow-sm transition hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-border/10 px-3 py-1 text-xs text-muted">
        <span>Showing</span>
        <span className="font-medium text-fg">{shown}</span>
        <span>of</span>
        <span className="font-medium text-fg">{total}</span>
      </div>
    </div>
  );
}
