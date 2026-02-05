import * as Dialog from "@radix-ui/react-dialog";
import { CalendarIcon, ChevronRightIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Fragment } from "react";

import { FilterListDialog } from "@/components/filters/FilterListDialog";
import type { FiltersBarUI } from "@/components/filters/types";
import { ViewToggle } from "@/components/filters/ViewToggle";

type Props = {
  ui: FiltersBarUI;
};

export function FiltersBarMobile({ ui }: Props) {
  const { date, groups, reset, activeFiltersCount, view } = ui;

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between gap-3">
        <FilterListDialog
          title="Test date"
          value={date.value}
          options={date.options}
          onChange={date.onChange}
          trigger={
            <button
              type="button"
              className="group inline-flex h-10 items-center gap-3 rounded-full border border-border/70 bg-bg px-4 text-sm font-semibold text-fg shadow-sm transition hover:border-fg/40 focus-visible:border-fg/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
            >
              <CalendarIcon className="h-4 w-4 text-muted transition group-hover:text-fg" />
              <span className="truncate">{date.label}</span>
              <ChevronRightIcon className="h-4 w-4 text-muted transition group-hover:text-fg" />
            </button>
          }
        />

        <ViewToggle value={view.value} onChange={view.onChange} />

        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] font-semibold text-muted">Filters</span>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-bg text-fg shadow-sm transition hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
                aria-label="Filters"
              >
                <MixerHorizontalIcon className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full border border-border/70 bg-border/40 text-[11px] font-semibold text-fg">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 md:hidden" />
              <Dialog.Content className="fixed left-0 right-0 top-0 z-50 h-[25vh] overflow-y-auto rounded-b-2xl border border-border bg-bg p-4 text-fg shadow-2xl dark:border-white/60 md:hidden">
                <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border/60" />
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-base font-semibold">Filters</Dialog.Title>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-fg transition hover:bg-border/30 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={reset.onReset}
                      disabled={!reset.show}
                    >
                      Reset
                    </button>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-fg transition hover:bg-border/30"
                      >
                        Done
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-border/70 bg-bg shadow-sm">
                  {groups.map((filter, index) => (
                    <Fragment key={filter.id}>
                      <FilterListDialog
                        title={filter.label}
                        value={filter.value}
                        options={filter.options}
                        onChange={filter.onChange}
                        showReset={reset.show}
                        onReset={reset.onReset}
                        trigger={
                          <button
                            type="button"
                            className="flex w-full items-center justify-between gap-3 px-3 py-3 text-sm text-fg transition hover:bg-border/20"
                          >
                            <span className="text-muted">{filter.label}</span>
                            <span className="inline-flex items-center gap-2">
                              <span className="font-medium">{filter.selectedLabel}</span>
                              <ChevronRightIcon className="h-4 w-4 text-muted" />
                            </span>
                          </button>
                        }
                      />
                      {index < groups.length - 1 && <div className="h-px w-full bg-border/60" />}
                    </Fragment>
                  ))}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
