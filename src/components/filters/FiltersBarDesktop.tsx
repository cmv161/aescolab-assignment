import type { FiltersBarUI } from "@/components/filters/types";
import { ViewToggle } from "@/components/filters/ViewToggle";
import { SelectMenu } from "@/components/SelectMenu";

type Props = {
  ui: FiltersBarUI;
};

export function FiltersBarDesktop({ ui }: Props) {
  const { date, groups, reset, view, resultCount } = ui;

  return (
    <div className="hidden md:flex w-full items-center justify-between">
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

        {groups.map((filter) => (
          <SelectMenu
            key={filter.id}
            label={filter.label}
            value={filter.value}
            options={filter.options}
            onChange={filter.onChange}
          />
        ))}

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

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2">
          <ViewToggle value={view.value} onChange={view.onChange} />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-border/10 px-3 py-1 text-xs text-muted">
          <span>Showing</span>
          <span className="font-medium text-fg">{resultCount.shown}</span>
          <span>of</span>
          <span className="font-medium text-fg">{resultCount.total}</span>
        </div>
      </div>
    </div>
  );
}
