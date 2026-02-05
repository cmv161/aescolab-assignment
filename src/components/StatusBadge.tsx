import type { ResultStatus } from "@/domain/types";

type Props = { status: ResultStatus };

export function StatusBadge({ status }: Props) {
  let label: string;
  let cls: string;

  switch (status) {
    case "normal":
      label = "Normal";
      cls = "bg-emerald-500/10 text-emerald-700/80 dark:text-emerald-300/80";
      break;
    case "low":
      label = "Low";
      cls = "bg-amber-500/10 text-amber-800/80 dark:text-amber-300/80";
      break;
    case "high":
      label = "High";
      cls = "bg-amber-500/10 text-amber-800/80 dark:text-amber-300/80";
      break;
  }

  return (
    <span
      className={`inline-flex min-w-[60px] justify-center items-center rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}
