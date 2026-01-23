import type { ResultStatus } from "@/domain/types";

type Props = { status: ResultStatus };

export function StatusBadge({ status }: Props) {
  let label: string;
  let cls: string;

  switch (status) {
    case "normal":
      label = "Normal";
      cls = "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300";
      break;
    case "low":
      label = "Low";
      cls = "border-rose-500/30 bg-rose-500/15 text-rose-700 dark:text-rose-300";
      break;
    case "high":
      label = "High";
      cls = "border-amber-500/30 bg-amber-500/15 text-amber-800 dark:text-amber-300";
      break;
  }

  return (
    <span
      className={`inline-flex min-w-[60px] justify-center items-center rounded-full border px-2.5 py-1 text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}
