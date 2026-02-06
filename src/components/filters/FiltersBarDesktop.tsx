import { FilterSearchInput } from "@/components/filters/FilterSearchInput";
import type { FiltersBarUI } from "@/components/filters/types";
import { ViewToggle } from "@/components/filters/ViewToggle";
import { SelectMenu } from "@/components/SelectMenu";

type Props = {
  ui: FiltersBarUI;
};

export function FiltersBarDesktop({ ui }: Props) {
  const { date, groups, reset, view, resultCount, search } = ui;
  const categoryGroup = groups.find((group) => group.id === "category");
  const statusGroup = groups.find((group) => group.id === "status");
  const sortGroup = groups.find((group) => group.id === "sort");

  return (
    <div className="hidden md:flex w-full flex-col gap-3">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-bg/90 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <SelectMenu
            label="Test date:"
            value={date.value || ""}
            options={date.options}
            onChange={(value) => {
              if (!value) return;
              date.onChange(value);
            }}
          />

          {categoryGroup && (
            <SelectMenu
              key={categoryGroup.id}
              label={categoryGroup.label}
              value={categoryGroup.value}
              options={categoryGroup.options}
              onChange={categoryGroup.onChange}
            />
          )}

          {statusGroup && (
            <SelectMenu
              key={statusGroup.id}
              label={statusGroup.label}
              value={statusGroup.value}
              options={statusGroup.options}
              onChange={statusGroup.onChange}
            />
          )}

          {reset.show && (
            <button
              type="button"
              className="h-9 rounded-lg border border-border/70 bg-bg px-3 text-xs font-medium text-fg shadow-sm transition hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
              onClick={reset.onReset}
            >
              Reset
            </button>
          )}
        </div>

        <div className="inline-flex items-center gap-2 text-xs text-muted">
          <span>Showing</span>
          <span className="font-medium text-muted">{resultCount.shown}</span>
          <span>of</span>
          <span className="font-medium text-muted">{resultCount.total}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-bg/90 px-4 py-3 shadow-sm">
        <div className="flex flex-1 items-center gap-3">
          <FilterSearchInput
            value={search.value}
            onChange={search.onChange}
            className="flex-1 min-w-0"
          />

          {sortGroup && (
            <SelectMenu
              key={sortGroup.id}
              label={sortGroup.label}
              value={sortGroup.value}
              options={sortGroup.options}
              onChange={sortGroup.onChange}
            />
          )}
        </div>

        <div className="inline-flex items-center gap-2">
          <ViewToggle value={view.value} onChange={view.onChange} />
        </div>
      </div>
    </div>
  );
}
