import React, { useState } from 'react';
import { Wand2, Edit3 } from 'lucide-react';
import type { ThumbnailResponse } from '../types';
import { FaceSwapModal } from './FaceSwapModal';
import { InpaintingModal } from './InpaintingModal';

interface ThumbnailResultProps {
  result: ThumbnailResponse;
}

export function ThumbnailResult({ result }: ThumbnailResultProps) {
  const [showFaceSwap, setShowFaceSwap] = useState(false);
  const [showInpainting, setShowInpainting] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(result.imageUrl);

  if (result.status === 'error') {
    return (
      <div className="text-red-400 p-4">{result.message}</div>
    );
  }

  const handleFaceSwapSuccess = (newImageUrl: string) => {
    setCurrentImageUrl(newImageUrl);
  };

  const handleInpaintingSuccess = (newImageUrl: string) => {
    setCurrentImageUrl(newImageUrl);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <img
          src={currentImageUrl}
          alt="Generated thumbnail"
          className="w-[480px] h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowFaceSwap(true)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
        >
          <Wand2 className="w-4 h-4" />
          Swap Face
        </button>

        <button
          onClick={() => setShowInpainting(true)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          Add/Remove Object
        </button>
      </div>

      <FaceSwapModal
        isOpen={showFaceSwap}
        onClose={() => setShowFaceSwap(false)}
        thumbnailUrl={currentImageUrl}
        onSuccess={handleFaceSwapSuccess}
      />

      <InpaintingModal
        isOpen={showInpainting}
        onClose={() => setShowInpainting(false)}
        imageUrl={currentImageUrl}
        onSuccess={handleInpaintingSuccess}
      />
    </div>
  );
}