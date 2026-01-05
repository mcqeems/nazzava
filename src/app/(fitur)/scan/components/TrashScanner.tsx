'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { analyzeTrash, type TrashScanResult } from '../actions/actions';
import { ButtonBack } from '@/components/ui/button-back';

type HistoryEntry = {
  id: string;
  createdAt: number;
  source: 'camera' | 'upload' | 'text';
  image?: string;
  text?: string;
  result: TrashScanResult;
};

const HISTORY_STORAGE_KEY = 'trashScanner.history.v1';
const MAX_HISTORY_ITEMS = 20;

function safeParseHistory(raw: string | null): HistoryEntry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item === 'object')
      .map((item) => item as HistoryEntry)
      .filter((item) => typeof item.id === 'string' && typeof item.createdAt === 'number' && item.result);
  } catch {
    return [];
  }
}

function persistHistory(items: HistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore storage failures (quota/private mode)
  }
}

function formatDate(ts: number) {
  try {
    return new Date(ts).toLocaleString('id-ID');
  } catch {
    return String(ts);
  }
}

export default function TrashScanner() {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [source, setSource] = useState<'camera' | 'upload' | 'text'>('camera');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState<TrashScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selected, setSelected] = useState<HistoryEntry | null>(null);
  const draggedIdRef = useRef<string | null>(null);

  useEffect(() => {
    setHistory(safeParseHistory(localStorage.getItem(HISTORY_STORAGE_KEY)));
  }, []);

  useMemo(() => {
    // keep memo slot reserved if future enhancements need fast lookup
    const m = new Map<string, HistoryEntry>();
    for (const item of history) m.set(item.id, item);
    return m;
  }, [history]);

  const openHistoryDialog = (entry: HistoryEntry) => {
    setSelected(entry);
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
  };

  const closeHistoryDialog = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  };

  const addToHistory = useCallback(
    (entry: Omit<HistoryEntry, 'id' | 'createdAt'>) => {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const next: HistoryEntry = {
        id,
        createdAt: Date.now(),
        ...entry,
      };

      setHistory((prev) => {
        const updated = [next, ...prev].slice(0, MAX_HISTORY_ITEMS);
        persistHistory(updated);
        return updated;
      });
    },
    [setHistory]
  );

  const analyze = useCallback(
    async (payload: { image?: string; text?: string }) => {
      setError(null);
      setResult(null);

      try {
        setLoading(true);
        const data = await analyzeTrash(payload);
        setResult(data);

        addToHistory({
          source,
          image: payload.image,
          text: payload.text,
          result: data,
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Terjadi kesalahan saat menganalisis input.';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [addToHistory, source]
  );

  const captureAndAnalyze = useCallback(async () => {
    setError(null);
    setResult(null);

    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) {
      setError('Gagal mengambil gambar. Pastikan izin kamera diaktifkan.');
      return;
    }

    setImageSrc(screenshot);

    await analyze({ image: screenshot, text: textInput.trim() ? textInput.trim() : undefined });
  }, [analyze, textInput]);

  const onSelectFile = useCallback(async (file: File | null) => {
    setError(null);
    setResult(null);

    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (jpg/png/webp).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : null;
      if (!dataUrl) {
        setError('Gagal membaca file gambar.');
        return;
      }
      setImageSrc(dataUrl);
    };
    reader.onerror = () => setError('Gagal membaca file gambar.');
    reader.readAsDataURL(file);
  }, []);

  const analyzeCurrent = useCallback(async () => {
    const text = textInput.trim();
    const hasImage = Boolean(imageSrc);
    const hasText = Boolean(text);

    if (!hasImage && !hasText) {
      setError('Masukkan gambar atau teks terlebih dulu.');
      return;
    }

    await analyze({ image: hasImage ? imageSrc! : undefined, text: hasText ? text : undefined });
  }, [analyze, imageSrc, textInput]);

  const reset = () => {
    setSource('camera');
    setImageSrc(null);
    setTextInput('');
    setResult(null);
    setError(null);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onDragStartHistory = (id: string) => {
    draggedIdRef.current = id;
  };

  const onDropOnHistory = (targetId: string) => {
    const draggedId = draggedIdRef.current;
    draggedIdRef.current = null;
    if (!draggedId || draggedId === targetId) return;

    setHistory((prev) => {
      const fromIndex = prev.findIndex((h) => h.id === draggedId);
      const toIndex = prev.findIndex((h) => h.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      persistHistory(updated);
      return updated;
    });
  };

  return (
    <div className="font-poppins min-h-screen lg:pb-20 lg:pt-10 px-4" data-aos="fade-up" data-aos-duration="900">
      <ButtonBack />

      <div className="container mx-auto w-full max-w-6xl">
        <div className="w-full bg-gradient-to-br from-primary via-accent to-primary-light rounded-2xl p-px shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
          <div className="w-full h-full bg-card/70 backdrop-blur-xl lg:rounded-2xl overflow-hidden border border-border">
            <div className="relative w-full overflow-hidden">
              <div className="absolute inset-0 bg-primary/10" />
              <div className="relative px-6 py-6 lg:px-10 lg:py-8">
                <p className="uppercase tracking-[0.35em] text-xs lg:text-sm font-semibold text-muted-text">Scan</p>
                <h1 className="mt-1 text-[24px] lg:text-[34px] font-bold leading-tight text-foreground">
                  Scanner Sampah
                </h1>
                <p className="mt-2 text-sm lg:text-base text-muted-text max-w-2xl">
                  Gunakan kamera, upload gambar, atau teks untuk mengidentifikasi sampah dan dapatkan rekomendasi yang
                  jelas.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="px-4 py-2 bg-card/70 rounded-full border border-border">Hasil JSON</span>
                  <span className="px-4 py-2 bg-card/70 rounded-full border border-border">Tersimpan di perangkat</span>
                  <span className="px-4 py-2 bg-card/70 rounded-full border border-border">Mode gelap/terang</span>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-10">
              <div className="grid gap-6 lg:gap-8 lg:grid-cols-2" data-aos="fade-up" data-aos-delay="80">
                <div className="bg-card rounded-2xl border border-border shadow-[0_18px_50px_rgba(0,0,0,0.10)] p-5 lg:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Input</h2>
                      <p className="mt-1 text-sm text-muted-text">Pilih sumber dan tambahkan keterangan bila perlu.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      Real-time
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSource('camera');
                        setImageSrc(null);
                        setResult(null);
                        setError(null);
                      }}
                      disabled={loading}
                      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all disabled:opacity-60 ${
                        source === 'camera'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      Kamera
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSource('upload');
                        setResult(null);
                        setError(null);
                      }}
                      disabled={loading}
                      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all disabled:opacity-60 ${
                        source === 'upload'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSource('text');
                        setImageSrc(null);
                        setResult(null);
                        setError(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      disabled={loading}
                      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all disabled:opacity-60 ${
                        source === 'text'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      Teks saja
                    </button>
                  </div>

                  <div className="mt-4">
                    {source === 'camera' ? (
                      <div className="overflow-hidden rounded-2xl border border-border bg-input">
                        {!imageSrc ? (
                          <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={0.9}
                            videoConstraints={{ facingMode: { ideal: 'environment' } }}
                            className="h-auto w-full"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={imageSrc} alt="Hasil foto" className="h-auto w-full" />
                        )}
                      </div>
                    ) : null}

                    {source === 'upload' ? (
                      <div className="rounded-2xl border border-border bg-input p-4">
                        <label className="text-sm font-medium text-foreground">Pilih gambar</label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          disabled={loading}
                          onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
                          className="mt-2 block w-full text-sm"
                        />

                        {imageSrc ? (
                          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageSrc} alt="Preview" className="h-auto w-full" />
                          </div>
                        ) : (
                          <p className="mt-3 text-sm text-muted-text">Pilih satu gambar untuk dianalisis.</p>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-5">
                    <label className="text-sm font-medium text-foreground">Keterangan (opsional)</label>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      disabled={loading}
                      rows={3}
                      placeholder="Contoh: botol plastik bekas minuman, ada label. Atau: sisa makanan di piring."
                      className="mt-2 w-full rounded-xl border border-border bg-input p-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
                    />
                    <p className="mt-2 text-xs text-muted-text">
                      Tips: foto dekat, fokus, cahaya cukup, latar sederhana.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {source === 'camera' ? (
                      !imageSrc ? (
                        <button
                          type="button"
                          onClick={captureAndAnalyze}
                          disabled={loading}
                          className="rounded-xl bg-primary px-5 py-3 text-white text-sm font-semibold transition-all hover:bg-primary-hover disabled:opacity-60"
                        >
                          {loading ? 'Menganalisis…' : 'Scan Kamera'}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setImageSrc(null);
                            setResult(null);
                            setError(null);
                          }}
                          disabled={loading}
                          className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-60"
                        >
                          Ambil ulang
                        </button>
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={analyzeCurrent}
                        disabled={loading}
                        className="rounded-xl bg-primary px-5 py-3 text-white text-sm font-semibold transition-all hover:bg-primary-hover disabled:opacity-60"
                      >
                        {loading ? 'Menganalisis…' : 'Analisis'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={reset}
                      disabled={loading}
                      className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-60"
                    >
                      Reset
                    </button>
                  </div>

                  {error ? (
                    <div className="mt-4 rounded-xl border border-border bg-card p-3 text-sm text-red-600">{error}</div>
                  ) : null}
                </div>

                <div className="space-y-6" data-aos="fade-up" data-aos-delay="140">
                  <div className="bg-card rounded-2xl border border-border shadow-[0_18px_50px_rgba(0,0,0,0.10)] p-5 lg:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Hasil</h2>
                        <p className="mt-1 text-sm text-muted-text">Ditampilkan sebagai JSON.</p>
                      </div>
                      {result ? (
                        <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                          Selesai
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-card/70 text-muted-text text-xs font-semibold border border-border">
                          Siap
                        </span>
                      )}
                    </div>

                    {!result ? (
                      <div className="mt-4 rounded-2xl border border-border bg-input p-4 text-sm text-muted-text">
                        {loading ? 'Sedang menganalisis…' : 'Lakukan scan untuk mendapatkan hasil identifikasi.'}
                      </div>
                    ) : (
                      <pre className="mt-4 max-h-[420px] overflow-auto rounded-2xl border border-border bg-input p-4 text-xs">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    )}
                  </div>

                  <div
                    className="bg-card rounded-2xl border border-border shadow-[0_18px_50px_rgba(0,0,0,0.10)] p-5 lg:p-7"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Riwayat</h2>
                        <p className="mt-1 text-sm text-muted-text">
                          Disimpan di localStorage: <span className="font-mono">{HISTORY_STORAGE_KEY}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-card/70 text-muted-text text-xs font-semibold border border-border">
                        Maks {MAX_HISTORY_ITEMS}
                      </span>
                    </div>

                    {history.length === 0 ? (
                      <p className="mt-4 text-sm text-muted-text">
                        Belum ada riwayat. Lakukan scan untuk menyimpan hasil.
                      </p>
                    ) : (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {history.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            draggable
                            onDragStart={() => onDragStartHistory(item.id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => onDropOnHistory(item.id)}
                            onClick={() => openHistoryDialog(item)}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <dialog
          ref={dialogRef}
          className="w-[min(820px,95vw)] rounded-2xl p-0 bg-card text-foreground border border-border shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        >
          <div className="p-5 lg:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">Detail Riwayat</h3>
                {selected ? <p className="mt-1 text-xs text-muted-text">{formatDate(selected.createdAt)}</p> : null}
              </div>
              <button
                type="button"
                onClick={closeHistoryDialog}
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-primary/10 hover:text-primary"
              >
                Tutup
              </button>
            </div>

            {selected ? (
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div>
                  {selected.image ? (
                    <div className="overflow-hidden rounded-2xl border border-border bg-input">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selected.image} alt="Gambar riwayat" className="h-auto w-full" />
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-2xl border border-border bg-input text-sm text-muted-text">
                      Tidak ada gambar
                    </div>
                  )}

                  {selected.text ? (
                    <div className="mt-4">
                      <div className="text-sm font-semibold text-foreground">Teks</div>
                      <div className="mt-2 rounded-2xl border border-border bg-input p-3 text-sm">{selected.text}</div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <div className="text-sm font-semibold text-foreground">Hasil (JSON)</div>
                  <pre className="mt-2 max-h-[520px] overflow-auto rounded-2xl border border-border bg-input p-4 text-xs">
                    {JSON.stringify(selected.result, null, 2)}
                  </pre>
                </div>
              </div>
            ) : null}
          </div>

          <form method="dialog" className="hidden">
            <button type="submit">close</button>
          </form>
        </dialog>
      </div>

      {/* Legacy layout removed in favor of themed container */}
      <div className="hidden">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setSource('camera');
                  setImageSrc(null);
                  setResult(null);
                  setError(null);
                }}
                disabled={loading}
                className={`rounded-lg border px-3 py-1.5 text-sm disabled:opacity-60 ${
                  source === 'camera' ? 'border-black/40' : 'border-black/15'
                }`}
              >
                Kamera
              </button>
              <button
                type="button"
                onClick={() => {
                  setSource('upload');
                  setResult(null);
                  setError(null);
                }}
                disabled={loading}
                className={`rounded-lg border px-3 py-1.5 text-sm disabled:opacity-60 ${
                  source === 'upload' ? 'border-black/40' : 'border-black/15'
                }`}
              >
                Upload Gambar
              </button>
              <button
                type="button"
                onClick={() => {
                  setSource('text');
                  setImageSrc(null);
                  setResult(null);
                  setError(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                disabled={loading}
                className={`rounded-lg border px-3 py-1.5 text-sm disabled:opacity-60 ${
                  source === 'text' ? 'border-black/40' : 'border-black/15'
                }`}
              >
                Teks Saja
              </button>
            </div>

            {source === 'camera' ? (
              <div className="overflow-hidden rounded-lg">
                {!imageSrc ? (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={0.9}
                    videoConstraints={{ facingMode: { ideal: 'environment' } }}
                    className="h-auto w-full"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageSrc} alt="Hasil foto" className="h-auto w-full" />
                )}
              </div>
            ) : null}

            {source === 'upload' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm"
                />

                {imageSrc ? (
                  <div className="mt-3 overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageSrc} alt="Preview" className="h-auto w-full" />
                  </div>
                ) : (
                  <p className="mt-2 text-sm opacity-80">Pilih satu gambar untuk dianalisis.</p>
                )}
              </div>
            ) : null}

            <div className="mt-3">
              <label className="text-sm font-medium">Keterangan (opsional)</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                disabled={loading}
                rows={3}
                placeholder="Contoh: botol plastik bekas minuman, ada label. Atau: sisa makanan di piring."
                className="mt-1 w-full rounded-lg border border-black/15 p-2 text-sm"
              />
              <p className="mt-1 text-xs opacity-70">Teks membantu jika foto kurang jelas atau untuk mode teks saja.</p>
            </div>

            <div className="mt-3 flex gap-2">
              {source === 'camera' ? (
                !imageSrc ? (
                  <button
                    type="button"
                    onClick={captureAndAnalyze}
                    disabled={loading}
                    className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
                  >
                    {loading ? 'Menganalisis…' : 'Scan (Kamera)'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setImageSrc(null);
                      setResult(null);
                      setError(null);
                    }}
                    disabled={loading}
                    className="rounded-lg border border-black/20 px-4 py-2 disabled:opacity-60"
                  >
                    Ambil ulang
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={analyzeCurrent}
                  disabled={loading}
                  className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
                >
                  {loading ? 'Menganalisis…' : 'Analisis'}
                </button>
              )}

              <button
                type="button"
                onClick={reset}
                disabled={loading}
                className="rounded-lg border border-black/20 px-4 py-2 disabled:opacity-60"
              >
                Reset
              </button>
            </div>

            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          </div>

          <div className="rounded-xl border border-black/10 p-3">
            <h2 className="text-lg font-medium">Hasil (JSON)</h2>

            {!result ? (
              <p className="mt-2 text-sm opacity-80">
                {loading ? 'Sedang menganalisis gambar…' : 'Tekan Scan untuk mendapatkan hasil identifikasi.'}
              </p>
            ) : (
              <pre className="mt-3 overflow-auto rounded-lg bg-black/5 p-3 text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}

            <div className="mt-3 text-xs opacity-70">Tips: ambil foto dekat, fokus, cahaya cukup, latar sederhana.</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-black/10 p-3">
          <h2 className="text-lg font-medium">Riwayat</h2>
          <p className="mt-1 text-sm opacity-80">
            Disimpan di localStorage: <span className="font-mono">{HISTORY_STORAGE_KEY}</span>
          </p>

          {history.length === 0 ? (
            <p className="mt-3 text-sm opacity-80">Belum ada riwayat. Lakukan scan untuk menyimpan hasil.</p>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  draggable
                  onDragStart={() => onDragStartHistory(item.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDropOnHistory(item.id)}
                  onClick={() => openHistoryDialog(item)}
                  className="flex w-full flex-col gap-2 rounded-xl border border-black/10 p-3 text-left hover:border-black/20"
                  title="Klik untuk lihat detail. Bisa drag untuk mengubah urutan."
                >
                  {item.image ? (
                    <div className="overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt="Thumbnail" className="h-28 w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-28 items-center justify-center rounded-lg bg-black/5 text-sm opacity-80">
                      Tanpa gambar
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{item.result.name}</div>
                    <div className="mt-0.5 text-xs opacity-70">
                      {item.result.type} • {formatDate(item.createdAt)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <dialog className="w-[min(720px,95vw)] rounded-xl p-0">
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">Detail Riwayat</h3>
                {selected ? <p className="mt-1 text-xs opacity-70">{formatDate(selected.createdAt)}</p> : null}
              </div>
              <button
                type="button"
                onClick={closeHistoryDialog}
                className="rounded-lg border border-black/20 px-3 py-1.5 text-sm"
              >
                Tutup
              </button>
            </div>

            {selected ? (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  {selected.image ? (
                    <div className="overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selected.image} alt="Gambar riwayat" className="h-auto w-full" />
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-lg bg-black/5 text-sm opacity-80">
                      Tidak ada gambar
                    </div>
                  )}

                  {selected.text ? (
                    <div className="mt-3">
                      <div className="text-sm font-medium">Teks</div>
                      <div className="mt-1 rounded-lg bg-black/5 p-2 text-sm">{selected.text}</div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <div className="text-sm font-medium">Hasil (JSON)</div>
                  <pre className="mt-2 max-h-[420px] overflow-auto rounded-lg bg-black/5 p-3 text-xs">
                    {JSON.stringify(selected.result, null, 2)}
                  </pre>
                </div>
              </div>
            ) : null}
          </div>

          {/* Close on backdrop click */}
          <form method="dialog" className="hidden">
            <button type="submit">close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
