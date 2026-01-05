import Webcam from 'react-webcam';

type ScannerInputProps = {
  source: 'camera' | 'upload' | 'text';
  onSourceChange: (source: 'camera' | 'upload' | 'text') => void;
  imageSrc: string | null;
  textInput: string;
  onTextInputChange: (text: string) => void;
  loading: boolean;
  error: string | null;

  webcamRef: React.RefObject<Webcam | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  onCapture: () => void;
  onRetake: () => void;
  onFileSelect: (file: File | null) => void;
  onAnalyze: () => void;
  onReset: () => void;
};

export default function ScannerInput({
  source,
  onSourceChange,
  imageSrc,
  textInput,
  onTextInputChange,
  loading,
  error,
  webcamRef,
  fileInputRef,
  onCapture,
  onRetake,
  onFileSelect,
  onAnalyze,
  onReset,
}: ScannerInputProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-[0_18px_50px_rgba(0,0,0,0.10)] p-5 lg:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Input</h2>
          <p className="mt-1 text-sm text-muted-text">Pilih sumber dan tambahkan keterangan bila perlu.</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">Real-time</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSourceChange('camera')}
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
          onClick={() => onSourceChange('upload')}
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
          onClick={() => onSourceChange('text')}
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
              onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
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
          onChange={(e) => onTextInputChange(e.target.value)}
          disabled={loading}
          rows={3}
          placeholder="Contoh: botol plastik bekas minuman, ada label. Atau: sisa makanan di piring."
          className="mt-2 w-full rounded-xl border border-border bg-input p-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
        <p className="mt-2 text-xs text-muted-text">Tips: foto dekat, fokus, cahaya cukup, latar sederhana.</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {source === 'camera' ? (
          !imageSrc ? (
            <button
              type="button"
              onClick={onCapture}
              disabled={loading}
              className="rounded-xl bg-primary px-5 py-3 text-background text-sm font-semibold transition-all hover:bg-primary-hover disabled:opacity-60"
            >
              {loading ? 'Menganalisis…' : 'Scan Kamera'}
            </button>
          ) : (
            <button
              type="button"
              onClick={onRetake}
              disabled={loading}
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-60"
            >
              Ambil ulang
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={onAnalyze}
            disabled={loading}
            className="rounded-xl bg-primary px-5 py-3 text-white text-sm font-semibold transition-all hover:bg-primary-hover disabled:opacity-60"
          >
            {loading ? 'Menganalisis…' : 'Analisis'}
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
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
  );
}
