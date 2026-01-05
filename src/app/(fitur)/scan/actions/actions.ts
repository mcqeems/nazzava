'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export type TrashScanType = 'organik' | 'anorganik' | 'b3' | 'residu' | 'tidak_diketahui';

export type TrashScanResult = {
  name: string;
  type: TrashScanType;
  description: string;
  confidence: number;
  recommendation: string;
  warnings: string[];
};

const SYSTEM_PROMPT = `Anda adalah TrashScan, pemindai/analisis sampah untuk aplikasi edukasi lingkungan.

Tugas:
- Analisis foto yang diberikan dan/atau deskripsi pengguna, lalu identifikasi benda sampah utama.
- Beri umpan balik yang membantu, rekomendasi penanganan (pilah, bersihkan, daur ulang/kompos/buang), dan catatan keamanan bila relevan.

Aturan bahasa & format:
- SELALU gunakan bahasa Indonesia.
- Output WAJIB berupa SATU objek JSON valid, TANPA Markdown, TANPA teks tambahan.
- Objek JSON WAJIB memiliki properti berikut:
	- "name": nama benda sampah yang paling mungkin (string)
	- "type": salah satu dari: "organik", "anorganik", "b3", "residu", "tidak_diketahui" (string)
	- "description": penjelasan yang informatif dan mudah dibaca. Gunakan paragraf terpisah (dengan \\n\\n) untuk memisahkan identifikasi, dampak/fakta, dan saran penanganan agar tidak menumpuk. (string)
	- "confidence": angka 0.0–1.0 yang menggambarkan keyakinan (number)
	- "recommendation": rekomendasi tindakan yang paling disarankan (string)
	- "warnings": daftar peringatan/kehati-hatian (array of string; boleh kosong)

Ketidakpastian:
- Jika foto tidak jelas atau Anda tidak yakin, set:
	- name = "tidak_diketahui"
	- type = "tidak_diketahui"
	- confidence <= 0.4
	- description berisi alasan singkat dan saran cara mengambil foto yang lebih baik (lebih terang, fokus, latar sederhana, dekatkan objek) atau saran info tambahan bila hanya teks.

Keamanan:
- Jika terindikasi benda berbahaya (mis. baterai, jarum, bahan kimia, obat), gunakan type = "b3" dan sertakan peringatan penanganan aman dalam description.`;

function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return JSON.parse(trimmed);
  }

  const unfenced = trimmed
    .replace(/^```(json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  if (unfenced.startsWith('{') && unfenced.endsWith('}')) {
    return JSON.parse(unfenced);
  }

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = trimmed.slice(firstBrace, lastBrace + 1);
    return JSON.parse(candidate);
  }

  throw new Error('Model tidak mengembalikan JSON.');
}

function isValidResult(value: unknown): value is TrashScanResult {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (typeof v.name !== 'string') return false;
  if (typeof v.type !== 'string') return false;
  if (typeof v.description !== 'string') return false;
  if (typeof v.confidence !== 'number') return false;
  if (typeof v.recommendation !== 'string') return false;
  if (!Array.isArray(v.warnings) || v.warnings.some((w) => typeof w !== 'string')) return false;
  return ['organik', 'anorganik', 'b3', 'residu', 'tidak_diketahui'].includes(v.type);
}

export async function analyzeTrash(input: { image?: string; text?: string }): Promise<TrashScanResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY on server.');
  }

  const image = typeof input.image === 'string' ? input.image : undefined;
  const textInput = typeof input.text === 'string' ? input.text.trim() : '';

  if (!image && !textInput) {
    throw new Error('Masukkan minimal salah satu: gambar atau teks.');
  }

  let mimeType: string | null = null;
  let data: string | null = null;
  if (image) {
    const match = image.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) {
      throw new Error('Format gambar tidak valid.');
    }
    mimeType = match[1];
    data = match[2];
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.3,
    },
  });

  const safeText = textInput ? textInput.slice(0, 800) : '';
  const promptParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

  const prompt = safeText
    ? `Analisis gambar dan/atau deskripsi pengguna berikut untuk mengidentifikasi sampah. Keluarkan satu objek JSON sesuai aturan.\n\nDeskripsi pengguna: "${safeText}"`
    : 'Analisis foto ini untuk mengidentifikasi sampah. Keluarkan satu objek JSON sesuai aturan.';

  promptParts.push({ text: prompt });
  if (mimeType && data) {
    promptParts.push({ inlineData: { mimeType, data } });
  }

  const result = await model.generateContent(promptParts);
  const raw = result.response.text();
  const parsed = extractJsonObject(raw);
  if (!isValidResult(parsed)) {
    throw new Error('Hasil JSON dari model tidak sesuai skema.');
  }

  // Clamp confidence to [0, 1] just in case.
  const normalized: TrashScanResult = {
    ...parsed,
    confidence: Math.max(0, Math.min(1, parsed.confidence)),
  };

  return normalized;
}
