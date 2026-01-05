import { TrashScanResult } from '../actions/actions';

export type HistoryEntry = {
  id: string;
  createdAt: number;
  source: 'camera' | 'upload' | 'text';
  image?: string;
  text?: string;
  result: TrashScanResult;
};
