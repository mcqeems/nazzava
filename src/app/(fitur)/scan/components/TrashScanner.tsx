'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { analyzeTrash, type TrashScanResult } from '../actions/actions';
import { ButtonBack } from '@/components/ui/button-back';
import { HistoryEntry } from './types';
import { HISTORY_STORAGE_KEY, MAX_HISTORY_ITEMS, safeParseHistory, persistHistory } from './utils';
import ResultCard from './ResultCard';
import HistoryList from './HistoryList';
import HistoryDialog from './HistoryDialog';
import ScannerInput from './ScannerInput';

export default function TrashScanner() {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="font-poppins min-h-screen lg:pb-20 lg:pt-10 px-4 py-6" data-aos="fade-up" data-aos-duration="900">
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
                  <span className="px-4 py-2 bg-card/70 rounded-full border border-border">Trash Analyzer</span>
                  <span className="px-4 py-2 bg-card/70 rounded-full border border-border">Gemini Vision</span>
                  <span className="px-4 py-2 bg-card/70 rounded-full border border-border">Tersimpan di Lokal</span>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-10">
              <div className="grid gap-6 lg:gap-8 lg:grid-cols-2" data-aos="fade-up" data-aos-delay="80">
                <ScannerInput
                  source={source}
                  onSourceChange={(newSource) => {
                    setSource(newSource);
                    setImageSrc(null);
                    setResult(null);
                    setError(null);
                    if (newSource === 'text' && fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  imageSrc={imageSrc}
                  textInput={textInput}
                  onTextInputChange={setTextInput}
                  loading={loading}
                  error={error}
                  webcamRef={webcamRef}
                  fileInputRef={fileInputRef}
                  onCapture={captureAndAnalyze}
                  onRetake={() => {
                    setImageSrc(null);
                    setResult(null);
                    setError(null);
                  }}
                  onFileSelect={onSelectFile}
                  onAnalyze={analyzeCurrent}
                  onReset={reset}
                />

                <div className="space-y-6" data-aos="fade-up" data-aos-delay="140">
                  <div className="bg-card rounded-2xl border border-border shadow-[0_18px_50px_rgba(0,0,0,0.10)] p-5 lg:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Hasil</h2>
                        <p className="mt-1 text-sm text-muted-text">Identifikasi dan rekomendasi AI.</p>
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
                      <div className="mt-4">
                        <ResultCard result={result} />
                      </div>
                    )}
                  </div>

                  <HistoryList
                    history={history}
                    storageKey={HISTORY_STORAGE_KEY}
                    maxItems={MAX_HISTORY_ITEMS}
                    onSelect={setSelected}
                    onDragStart={onDragStartHistory}
                    onDrop={onDropOnHistory}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <HistoryDialog selected={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}
