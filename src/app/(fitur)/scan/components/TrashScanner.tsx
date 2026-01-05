'use client';

import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { analyzeTrash, type TrashScanResult } from '../actions/actions';

export default function TrashScanner() {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [source, setSource] = useState<'camera' | 'upload' | 'text'>('camera');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState<TrashScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (payload: { image?: string; text?: string }) => {
    setError(null);
    setResult(null);

    try {
      setLoading(true);
      const data = await analyzeTrash(payload);
      setResult(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Terjadi kesalahan saat menganalisis input.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

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

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Scanner Sampah</h1>
        <p className="mt-1 text-sm opacity-80">
          Pilih sumber: kamera, upload gambar, atau teks. Hasil keluar dalam format JSON.
        </p>
      </div>

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
    </div>
  );
}
