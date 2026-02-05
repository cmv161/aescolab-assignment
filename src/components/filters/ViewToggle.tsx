import { CardStackIcon, TableIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/cn";

import type { ViewMode } from "./types";

type Props = {
  value: ViewMode;
  onChange: (view: ViewMode) => void;
  className?: string;
};

export function ViewToggle({ value, onChange, className }: Props) {
  const viewOptions = [
    { value: "card" as const, label: "Card", Icon: CardStackIcon },
    { value: "table" as const, label: "Table", Icon: TableIcon },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border/70 bg-bg p-1 shadow-sm",
        className,
      )}
    >
      {viewOptions.map(({ value: optionValue, label, Icon }) => {
        const isActive = value === optionValue;
        return (
          <button
            key={optionValue}
            type="button"
            className={cn(
              "inline-flex h-8 items-center gap-2 rounded-full px-3 text-xs font-semibold transition",
              isActive ? "bg-border/60 text-fg shadow-sm" : "text-muted hover:text-fg",
            )}
            aria-pressed={isActive}
            aria-label={`${label} view`}
            onClick={() => onChange(optionValue)}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
