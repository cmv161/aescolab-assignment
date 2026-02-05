const DEFAULT_FORMATTER = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
});
const UTC_FORMATTER = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});
const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

export function formatDate(iso: string | null | undefined): string {
  const placeholder = "\u2014";
  if (!iso) return placeholder;

  if (DATE_ONLY_RE.test(iso)) {
    const [year, month, day] = iso.split("-").map(Number);
    if (!year || !month || !day) return placeholder;
    return UTC_FORMATTER.format(new Date(Date.UTC(year, month - 1, day)));
  }

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return placeholder;

  return DEFAULT_FORMATTER.format(d);
}
