import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/cn";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectMenuProps = {
  label: string;
  value: string;
  options: ReadonlyArray<SelectOption>;
  onChange: (value: string) => void;
};

export function SelectMenu({ label, value, options, onChange }: SelectMenuProps) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = options.find((option) => option.value === value) ?? options[0];

  const findNextEnabledIndex = (fromIndex: number, delta: number) => {
    if (options.length === 0) return -1;
    let index = fromIndex;
    while (true) {
      index += delta;
      if (index < 0 || index >= options.length) return -1;
      if (!options[index]?.disabled) return index;
    }
  };

  const resolveActiveIndex = (fromIndex: number) => {
    if (!options[fromIndex]?.disabled) return fromIndex;
    const next = findNextEnabledIndex(fromIndex, 1);
    if (next !== -1) return next;
    const prev = findNextEnabledIndex(fromIndex, -1);
    if (prev !== -1) return prev;
    return fromIndex;
  };

  const moveActive = (delta: number, fromIndex = activeIndex) => {
    if (options.length === 0) return;
    const nextIndex = findNextEnabledIndex(fromIndex, delta);
    if (nextIndex === -1) return;
    setActiveIndex(nextIndex);
    const nextValue = options[nextIndex]?.value;
    if (nextValue && nextValue !== value) {
      onChange(nextValue);
    }
  };

  const handleButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const baseIndex = open ? activeIndex : selectedIndex;
      setOpen(true);
      moveActive(1, baseIndex);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const baseIndex = open ? activeIndex : selectedIndex;
      setOpen(true);
      moveActive(-1, baseIndex);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) {
        setOpen(false);
      } else {
        setActiveIndex(resolveActiveIndex(selectedIndex));
        setOpen(true);
      }
    }
  };

  const handleOptionClick = (index: number) => {
    if (options[index]?.disabled) return;
    const nextValue = options[index]?.value;
    if (!nextValue) return;
    onChange(nextValue);
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-start gap-1 text-[11px] font-medium text-muted md:flex-row md:items-center md:gap-2 md:text-xs">
      <span id={`${id}-label`} className="whitespace-nowrap">
        {label}
      </span>
      <div className="relative" ref={containerRef}>
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label ${id}-value`}
          onClick={() => {
            if (open) {
              setOpen(false);
            } else {
              setActiveIndex(resolveActiveIndex(selectedIndex));
              setOpen(true);
            }
          }}
          onKeyDown={handleButtonKeyDown}
          className={cn(
            "group flex h-9 min-w-[135px] items-center justify-between gap-2 rounded-lg border border-border/70 bg-bg px-3 text-sm text-fg shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20 focus-visible:border-fg/30 hover:border-fg/40",
          )}
        >
          <span id={`${id}-value`} className="truncate">
            {selected?.label ?? "Select"}
          </span>
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 text-muted transition group-hover:text-fg",
              open && "rotate-180",
            )}
          />
        </button>
        {open && (
          <ul
            role="listbox"
            aria-labelledby={`${id}-label`}
            className="absolute left-0 z-20 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-border/70 bg-bg p-1 text-sm shadow-lg ring-1 ring-fg/5"
          >
            {options.map((option, index) => {
              const isActive = index === activeIndex;
              const isSelected = option.value === value;
              const isDisabled = option.disabled;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  className={cn(
                    "select-none rounded-md px-2 py-1.5 text-fg transition",
                    isActive ? "bg-border/50" : "hover:bg-border/30",
                    isSelected && "font-bold",
                    isDisabled && "cursor-not-allowed text-muted hover:bg-transparent",
                  )}
                  onMouseEnter={() => {
                    if (!isDisabled) setActiveIndex(index);
                  }}
                  onClick={() => handleOptionClick(index)}
                >
                  <span className="block truncate">{option.label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
