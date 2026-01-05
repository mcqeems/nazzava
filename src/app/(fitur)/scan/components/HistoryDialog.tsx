import { useEffect, useRef, useState } from 'react';
import { HistoryEntry } from './types';
import { formatDate } from './utils';
import ResultCard from './ResultCard';

type HistoryDialogProps = {
  selected: HistoryEntry | null;
  onClose: () => void;
};

export default function HistoryDialog({ selected, onClose }: HistoryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [displayItem, setDisplayItem] = useState<HistoryEntry | null>(selected);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selected) {
      setDisplayItem(selected);
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [selected]);

  return (
    <>
      <style>{`
        dialog {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out, display 0.3s ease-out allow-discrete;
        }
        dialog[open] {
          opacity: 1;
          transform: scale(1);
        }
        @starting-style {
          dialog[open] {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        dialog::backdrop {
          background-color: rgb(0 0 0 / 0%);
          backdrop-filter: blur(0);
          transition: display 0.3s allow-discrete, overlay 0.3s allow-discrete, background-color 0.3s, backdrop-filter 0.3s;
        }
        dialog[open]::backdrop {
          background-color: rgb(0 0 0 / 50%);
          backdrop-filter: blur(4px);
        }
        @starting-style {
          dialog[open]::backdrop {
            background-color: rgb(0 0 0 / 0%);
            backdrop-filter: blur(0);
          }
        }
      `}</style>
      <dialog
        ref={dialogRef}
        className="m-auto w-[min(820px,95vw)] rounded-2xl p-0 bg-card text-foreground border border-border shadow-2xl"
        onClose={onClose}
      >
        <div className="p-5 lg:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Detail Riwayat</h3>
              {displayItem ? <p className="mt-1 text-xs text-muted-text">{formatDate(displayItem.createdAt)}</p> : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              Tutup
            </button>
          </div>

          {displayItem ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div>
                {displayItem.image ? (
                  <div className="overflow-hidden rounded-2xl border border-border bg-input">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={displayItem.image} alt="Gambar riwayat" className="h-auto w-full" />
                  </div>
                ) : (
                  <div className="flex h-56 items-center justify-center rounded-2xl border border-border bg-input text-sm text-muted-text">
                    Tidak ada gambar
                  </div>
                )}

                {displayItem.text ? (
                  <div className="mt-4">
                    <div className="text-sm font-semibold text-foreground">Teks</div>
                    <div className="mt-2 rounded-2xl border border-border bg-input p-3 text-sm">{displayItem.text}</div>
                  </div>
                ) : null}
              </div>

              <div>
                <div className="text-sm font-semibold text-foreground mb-4">Hasil Analisis</div>
                <div className="max-h-[520px] overflow-auto rounded-2xl border border-border bg-card p-4">
                  <ResultCard result={displayItem.result} />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <form method="dialog" className="hidden">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
}
