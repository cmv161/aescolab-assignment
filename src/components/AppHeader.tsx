import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

type AppHeaderProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function AppHeader({ theme, onToggleTheme }: AppHeaderProps) {
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 bg-bg/80 border-b border-border backdrop-blur shadow-sm">
      <div className="flex justify-between px-6 py-4 ">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Biomarker Results</h1>
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          onClick={onToggleTheme}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-fg/10 dark:hover:bg-fg/15 cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
