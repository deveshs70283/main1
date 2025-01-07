export type GenerationType = 'thumbnail' | 'youtube' | 'faceswap';

export interface ThumbnailRequest {
  prompt: string;
  referenceUrl?: string;
}

export interface ThumbnailResponse {
  imageUrl: string;
  status: 'success' | 'error';
  message?: string;
}

export interface MakeResponseItem {
  body: string[];
  status: number;
  headers: any[];
}

export type MakeResponse = MakeResponseItem[];