import React, { useState } from 'react';
import { Wand2, Download } from 'lucide-react';
import type { ThumbnailResponse } from '../types';
import { FaceSwapModal } from './FaceSwapModal';

interface ThumbnailResultProps {
  result: ThumbnailResponse;
}

export function ThumbnailResult({ result }: ThumbnailResultProps) {
  const [showFaceSwap, setShowFaceSwap] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(result.imageUrl);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  if (result.status === 'error') {
    return (
      <div className="text-red-400 p-4">{result.message}</div>
    );
  }

  const handleFaceSwapSuccess = (newImageUrl: string) => {
    setCurrentImageUrl(newImageUrl);
  };

  const handleDownload = async () => {
    try {
      setDownloadError(null);
      const response = await fetch(currentImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `thumbnail-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading thumbnail:', error);
      setDownloadError('Failed to download image');
    }
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

      {downloadError && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
          {downloadError}
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowFaceSwap(true)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
        >
          <Wand2 className="w-4 h-4" />
          Swap Face
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>

      <FaceSwapModal
        isOpen={showFaceSwap}
        onClose={() => setShowFaceSwap(false)}
        thumbnailUrl={currentImageUrl}
        onSuccess={handleFaceSwapSuccess}
      />
    </div>
  );
}