import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/cn";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function FilterSearchInput({
  value,
  onChange,
  placeholder = "Search biomarker",
  className,
}: Props) {
  return (
    <div className={cn("relative", className)}>
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="search"
        name="biomarkerSearch"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="filter-search-input h-10 w-full appearance-none rounded-lg border border-border/60 bg-bg pl-9 pr-9 text-sm text-fg shadow-sm transition focus-visible:outline-none focus-visible:border-fg/30"
      />
      {value.trim().length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:text-fg"
          aria-label="Clear search"
        >
          <Cross2Icon className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
