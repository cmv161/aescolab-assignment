const DEFAULT_FORMATTER = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export function formatDate(iso: string | null | undefined): string {
  const placeholder = "\u2014";
  if (!iso) return placeholder;

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return placeholder;

  return DEFAULT_FORMATTER.format(d);
}
