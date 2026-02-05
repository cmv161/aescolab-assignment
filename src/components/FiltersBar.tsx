import {
  buildCategoryOptions,
  buildDateOptions,
  getSelectedOption,
  SORT_FILTER_OPTIONS,
  STATUS_OPTIONS,
} from "@/components/filters/filters.config";
import { FiltersBarDesktop } from "@/components/filters/FiltersBarDesktop";
import { FiltersBarMobile } from "@/components/filters/FiltersBarMobile";
import type { FilterGroup, FiltersBarUI, ViewMode } from "@/components/filters/types";
import { DEFAULT_SORT, type SortKey } from "@/domain/biomarkerSort";
import type { CategoryFilter, StatusFilter } from "@/domain/types";

type Props = {
  sampleDates: string[];
  activeDate: string;
  onActiveDateChange: (value: string) => void;

  categories: string[];
  category: CategoryFilter;
  onCategoryChange: (v: CategoryFilter) => void;

  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;

  sort: SortKey;
  onSortChange: (v: SortKey) => void;

  total: number;
  shown: number;

  showReset: boolean;
  onReset: () => void;

  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

export function FiltersBar({
  sampleDates,
  activeDate,
  onActiveDateChange,
  categories,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  total,
  shown,
  showReset,
  onReset,
  view,
  onViewChange,
}: Props) {
  const dateOptions = buildDateOptions(sampleDates);
  const categoryOptions = buildCategoryOptions(categories);
  const statusOptions = STATUS_OPTIONS;
  const selectedCategory = getSelectedOption(categoryOptions, category);
  const activeDateOption = getSelectedOption(dateOptions, activeDate);
  const selectedStatus = getSelectedOption(statusOptions, status);
  const selectedSort = getSelectedOption(SORT_FILTER_OPTIONS, sort);
  const filterGroups: FilterGroup[] = [
    {
      id: "category",
      label: "Category",
      value: category,
      options: categoryOptions,
      selectedLabel: selectedCategory.label,
      onChange: onCategoryChange,
    },
    {
      id: "status",
      label: "Status",
      value: status,
      options: statusOptions,
      selectedLabel: selectedStatus.label,
      onChange: onStatusChange,
    },
    {
      id: "sort",
      label: "Sort",
      value: sort,
      options: SORT_FILTER_OPTIONS,
      selectedLabel: selectedSort.label,
      onChange: onSortChange,
    },
  ];
  const activeFiltersCount =
    (category !== "all" ? 1 : 0) + (status !== "all" ? 1 : 0) + (sort !== DEFAULT_SORT ? 1 : 0);

  const ui: FiltersBarUI = {
    date: {
      options: dateOptions,
      value: activeDate,
      label: activeDateOption?.label ?? "No data",
      onChange: onActiveDateChange,
    },
    groups: filterGroups,
    reset: {
      show: showReset,
      onReset,
    },
    activeFiltersCount,
    view: {
      value: view,
      onChange: onViewChange,
    },
    resultCount: {
      shown,
      total,
    },
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-bg/90 p-3 shadow-sm">
      <FiltersBarMobile ui={ui} />
      <FiltersBarDesktop ui={ui} />
    </div>
  );
}
