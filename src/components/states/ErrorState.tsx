export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-danger/25 bg-danger/5 p-6 shadow-sm">
      <div className="flex items-center gap-2 text-base font-semibold text-danger">
        <span
          className="h-2.5 w-2.5 rounded-full bg-danger ring-4 ring-danger/15"
          aria-hidden="true"
        />
        <span>Couldn't load results</span>
      </div>
      <div className="mt-1 text-sm text-muted">{message}</div>
      <div className="mt-3 rounded-md border border-danger/20 bg-danger/5 px-3 py-2 text-xs text-muted">
        Tip: remove ?error=1 from the URL to recover.
      </div>
      <button
        type="button"
        className="mt-4 rounded-lg border border-danger/30 px-3 py-2 text-sm text-danger transition hover:bg-danger/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/30"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}
