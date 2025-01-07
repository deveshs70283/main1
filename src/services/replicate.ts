import { REPLICATE_API_URL, REPLICATE_API_TOKEN, MODEL_VERSION, DEFAULT_MODEL_PARAMS } from '../config/constants';
import type { ReplicateInput, ReplicatePrediction } from '../types/api';
import type { ThumbnailResponse } from '../types';

async function createPrediction(prompt: string): Promise<ReplicatePrediction> {
  const response = await fetch(REPLICATE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: MODEL_VERSION,
      input: {
        prompt,
        ...DEFAULT_MODEL_PARAMS,
      } satisfies ReplicateInput,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create prediction');
  }

  return response.json();
}

async function getPrediction(id: string): Promise<ReplicatePrediction> {
  const response = await fetch(`${REPLICATE_API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get prediction');
  }

  return response.json();
}

export async function generateThumbnail(prompt: string): Promise<ThumbnailResponse> {
  try {
    // Create prediction
    const prediction = await createPrediction(prompt);
    
    // Poll for results
    let result: ReplicatePrediction;
    do {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await getPrediction(prediction.id);
    } while (result.status === 'starting' || result.status === 'processing');

    if (result.status === 'succeeded' && result.output?.[0]) {
      return {
        status: 'success',
        imageUrl: result.output[0],
      };
    }

    return {
      status: 'error',
      imageUrl: '',
      message: result.error || 'Failed to generate thumbnail',
    };
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return {
      status: 'error',
      imageUrl: '',
      message: error instanceof Error ? error.message : 'Failed to generate thumbnail',
    };
  }
}