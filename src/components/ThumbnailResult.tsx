import React from 'react';
import type { ThumbnailResponse } from '../types';

interface ThumbnailResultProps {
  result: ThumbnailResponse;
}

export function ThumbnailResult({ result }: ThumbnailResultProps) {
  if (result.status === 'error') {
    return (
      <div className="text-red-400 p-4">{result.message}</div>
    );
  }

  return (
    <div className="flex justify-center">
      <img
        src={result.imageUrl}
        alt="Generated thumbnail"
        className="w-[480px] h-auto rounded-lg shadow-lg"
      />
    </div>
  );
}