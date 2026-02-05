export type ViewMode = "card" | "table";

export type FilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
  disabled?: boolean;
};

export type FilterGroup<TValue extends string = string> = {
  id: string;
  label: string;
  value: TValue;
  options: ReadonlyArray<FilterOption<TValue>>;
  selectedLabel: string;
  onChange(this: void, value: TValue): void;
};

export type FiltersBarUI = {
  date: {
    options: ReadonlyArray<FilterOption>;
    value: string;
    label: string;
    onChange: (value: string) => void;
  };
  groups: ReadonlyArray<FilterGroup>;
  reset: {
    show: boolean;
    onReset: () => void;
  };
  activeFiltersCount: number;
  view: {
    value: ViewMode;
    onChange: (view: ViewMode) => void;
  };
  resultCount: {
    shown: number;
    total: number;
  };
};
