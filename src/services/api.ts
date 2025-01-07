import { MAKE_WEBHOOK_URL } from '../config/constants';
import { transformMakeResponse } from '../utils/transformers';
import { validatePrompt, validateUrl } from '../utils/validation';
import type { ThumbnailResponse } from '../types';

export async function generateFromPrompt(prompt: string): Promise<ThumbnailResponse> {
  validatePrompt(prompt);
  
  const response = await fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: prompt.trim() }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate thumbnail');
  }

  const data = await response.json();
  return transformMakeResponse(data);
}

export async function generateFromYoutube(referenceUrl: string): Promise<ThumbnailResponse> {
  validateUrl(referenceUrl);
  
  const response = await fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reference_url: referenceUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate thumbnail');
  }

  const data = await response.json();
  return transformMakeResponse(data);
}