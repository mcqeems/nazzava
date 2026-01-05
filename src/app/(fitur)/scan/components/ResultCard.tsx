import { TrashScanResult } from '../actions/actions';

export default function ResultCard({ result }: { result: TrashScanResult }) {
  const typeColors: Record<string, string> = {
    organik: 'bg-green-100 text-green-800 border-green-200',
    anorganik: 'bg-blue-100 text-blue-800 border-blue-200',
    b3: 'bg-red-100 text-red-800 border-red-200',
    residu: 'bg-gray-100 text-gray-800 border-gray-200',
    tidak_diketahui: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  const typeLabels: Record<string, string> = {
    organik: 'Organik',
    anorganik: 'Anorganik',
    b3: 'B3 (Berbahaya)',
    residu: 'Residu',
    tidak_diketahui: 'Tidak Diketahui',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground capitalize">{result.name}</h3>
          <span
            className={`mt-2 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
              typeColors[result.type] || typeColors.tidak_diketahui
            }`}
          >
            {typeLabels[result.type] || result.type}
          </span>
        </div>
        {result.confidence > 0 && (
          <div className="text-right">
            <div className="text-xs text-muted-text">Akurasi</div>
            <div className="font-mono text-sm font-semibold text-foreground">
              {Math.round(result.confidence * 100)}%
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-input p-4 text-sm text-foreground leading-relaxed space-y-3">
        {result.description.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {result.recommendation && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            Rekomendasi
          </h4>
          <p className="text-sm text-foreground">{result.recommendation}</p>
        </div>
      )}

      {result.warnings && result.warnings.length > 0 && (
        <div className="rounded-xl border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Perhatian
          </h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-red-700 dark:text-red-100">
            {result.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
