import type { MakeResponse, ThumbnailResponse } from '../types';

export function transformMakeResponse(makeResponse: MakeResponse): ThumbnailResponse {
  if (!makeResponse?.[0]) {
    return {
      status: 'error',
      imageUrl: '',
      message: 'Invalid response from server',
    };
  }

  return {
    status: 'success',
    imageUrl: makeResponse[0],
  };
}