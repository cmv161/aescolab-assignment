import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import { StatusBadge } from "@/components/StatusBadge";
import { interpret } from "@/domain/interpret";
import type { EnrichedResult } from "@/domain/types";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { formatDate } from "@/lib/formatDate";

type Props = {
  selected: EnrichedResult | null;
  onClose: () => void;
};

type NoteEditorProps = {
  storageKey: string;
};

function NoteEditor({ storageKey }: NoteEditorProps) {
  const [note, setNote] = useState(() => {
    if (!storageKey) return "";
    return localStorage.getItem(storageKey) ?? "";
  });
  const [hasInteracted, setHasInteracted] = useState(false);
  const debounced = useDebouncedValue(note, 500);
  const savedDelay = useDebouncedValue(debounced, 200);

  function getSaveStatus() {
    if (!storageKey || !hasInteracted) return "";
    if (note !== debounced) return "";
    if (savedDelay !== debounced) return "Saving...";
    return "Saved";
  }

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, debounced);
  }, [debounced, storageKey]);

  const status = getSaveStatus();

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Note</h3>
        <span className="text-xs text-muted">{status}</span>
      </div>

      <textarea
        className="mt-2 min-h-[120px] w-full rounded-lg border border-border bg-bg p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-border/60"
        placeholder="Add a note for yourself... (autosaved)"
        value={note}
        onChange={(e) => {
          if (!hasInteracted) setHasInteracted(true);
          setNote(e.target.value);
        }}
      />
    </div>
  );
}

export function DetailsDrawer({ selected, onClose }: Props) {
  const open = !!selected;

  const storageKey = selected?.biomarkerId ? `note:${selected.biomarkerId}` : "";

  const date = formatDate(selected?.sampledAt);

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed right-0 top-0 h-full w-[min(92vw,460px)] border-l border-border bg-bg text-fg shadow-xl p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="text-lg font-semibold tracking-tight">
                {selected?.biomarker.name ?? "Details"}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {selected?.biomarker.category} &bull; Sampled: {date}
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg border border-border px-2 py-1 text-sm hover:bg-border/30"
                aria-label="Close"
              >
                &times;
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-border/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-semibold">
                  {selected?.value} {selected?.biomarker.standardUnit}
                </div>
                <div className="mt-1 text-sm text-muted">
                  Reference: {selected?.biomarker.referenceRange.low}&ndash;
                  {selected?.biomarker.referenceRange.high} {selected?.biomarker.standardUnit}
                </div>
              </div>
              {selected && <StatusBadge status={selected.status} />}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold">Interpretation</h3>
            <p className="mt-1 text-sm text-muted">{selected ? interpret(selected) : ""}</p>
          </div>

          <NoteEditor storageKey={storageKey} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
