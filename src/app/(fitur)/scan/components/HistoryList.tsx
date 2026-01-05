import { HistoryEntry } from './types';
import { formatDate } from './utils';

type HistoryListProps = {
  history: HistoryEntry[];
  storageKey: string;
  maxItems: number;
  onSelect: (entry: HistoryEntry) => void;
  onDragStart: (id: string) => void;
  onDrop: (targetId: string) => void;
};

export default function HistoryList({ history, maxItems, onSelect, onDragStart, onDrop }: HistoryListProps) {
  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-[0_18px_50px_rgba(0,0,0,0.10)] p-5 lg:p-7"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Riwayat</h2>
          <p className="mt-1 text-sm text-muted-text">Riwayat tersimpan secara lokal.</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-card/70 text-muted-text text-xs font-semibold border border-border">
          Maks {maxItems}
        </span>
      </div>

      {history.length === 0 ? (
        <p className="mt-4 text-sm text-muted-text">Belum ada riwayat. Lakukan scan untuk menyimpan hasil.</p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {history.map((item) => (
            <button
              key={item.id}
              type="button"
              draggable
              onDragStart={() => onDragStart(item.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(item.id)}
              onClick={() => onSelect(item)}
              className="flex w-full flex-col gap-2 rounded-2xl border border-border bg-card p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
              title="Klik untuk lihat detail. Bisa drag untuk mengubah urutan."
            >
              {item.image ? (
                <div className="overflow-hidden rounded-xl border border-border bg-input">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt="Thumbnail" className="h-28 w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-28 items-center justify-center rounded-xl border border-border bg-input text-sm text-muted-text">
                  Tanpa gambar
                </div>
              )}

              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">{item.result.name}</div>
                <div className="mt-0.5 text-xs text-muted-text">
                  {item.result.type} • {formatDate(item.createdAt)}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
