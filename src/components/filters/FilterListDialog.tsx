import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import type { FilterOption } from "./types";

type Props = {
  title: string;
  value: string;
  options: ReadonlyArray<FilterOption>;
  onChange: (value: string) => void;
  trigger: ReactNode;
  onReset?: () => void;
  showReset?: boolean;
};

export function FilterListDialog({
  title,
  value,
  options,
  onChange,
  trigger,
  onReset,
  showReset = false,
}: Props) {
  const canReset = typeof onReset === "function";

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 dark:bg-black/60 md:hidden" />
        <Dialog.Content className="fixed inset-0 z-[70] flex h-full flex-col bg-bg text-fg md:hidden">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg p-2 text-fg transition hover:bg-border/30"
                aria-label="Back"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
            </Dialog.Close>
            <Dialog.Title className="text-base font-semibold">{title}</Dialog.Title>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2">
            <ul className="flex flex-col gap-1">
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isDisabled = option.disabled;
                const button = (
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                      isSelected
                        ? "bg-border/30 font-semibold text-fg"
                        : "text-fg hover:bg-border/20",
                      isDisabled && "cursor-not-allowed text-muted hover:bg-transparent",
                    )}
                    onClick={() => {
                      if (isDisabled) return;
                      onChange(option.value);
                    }}
                    disabled={isDisabled}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && !isDisabled && <CheckIcon className="h-4 w-4 text-fg" />}
                  </button>
                );

                return (
                  <li key={option.value || `option-${index}`}>
                    {isDisabled ? button : <Dialog.Close asChild>{button}</Dialog.Close>}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center gap-2">
              {canReset && (
                <button
                  type="button"
                  className="h-10 flex-1 rounded-lg border border-border/70 bg-bg px-3 text-xs font-semibold text-fg shadow-sm transition hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={onReset}
                  disabled={!showReset}
                >
                  Reset
                </button>
              )}
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="h-10 flex-1 rounded-lg border border-border/70 bg-bg px-3 text-xs font-semibold text-fg shadow-sm transition hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
                >
                  Done
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
