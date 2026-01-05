import { HistoryEntry } from './types';

export const HISTORY_STORAGE_KEY = 'trashScanner.history.v1';
export const MAX_HISTORY_ITEMS = 20;

export function safeParseHistory(raw: string | null): HistoryEntry[] {
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

export function persistHistory(items: HistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore storage failures (quota/private mode)
  }
}

export function formatDate(ts: number) {
  try {
    return new Date(ts).toLocaleString('id-ID');
  } catch {
    return String(ts);
  }
}
