import { useLayoutEffect, useState } from "react";

import { AppHeader } from "./components/AppHeader";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
};

function App() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <AppHeader
        theme={theme}
        onToggleTheme={() => setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))}
      />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 mt-10">
        <section className="rounded-lg border border-border bg-card p-6 shadow-md">
          <h1>Hello world</h1>
        </section>
      </main>
    </div>
  );
}

export default App;
