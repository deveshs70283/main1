import React, { useState } from 'react';
import { X, Download, Wand2, ArrowLeft } from 'lucide-react';
import type { Thumbnail } from '../types/thumbnail';
import { FaceSwapModal } from './FaceSwapModal';

interface ThumbnailPreviewProps {
  thumbnail: Thumbnail;
  onClose: () => void;
  onUpdate?: (id: string, newImageUrl: string, category: 'face-swapped' | 'inpainted') => void;
}

export function ThumbnailPreview({ thumbnail, onClose, onUpdate }: ThumbnailPreviewProps) {
  const [showFaceSwap, setShowFaceSwap] = useState(false);
  const [showingSwapped, setShowingSwapped] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const currentImageUrl = showingSwapped && thumbnail.swappedImageUrl 
    ? thumbnail.swappedImageUrl 
    : thumbnail.imageUrl;

  const handleDownload = async () => {
    try {
      setDownloadError(null);
      const response = await fetch(currentImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `thumbnail-${thumbnail.id}${showingSwapped ? '-swapped' : ''}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading thumbnail:', error);
      setDownloadError('Failed to download image');
    }
  };

  const handleFaceSwapSuccess = (newImageUrl: string) => {
    onUpdate?.(thumbnail.id, newImageUrl, 'face-swapped');
    setShowingSwapped(true);
    setShowFaceSwap(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="bg-zinc-900/90 rounded-xl w-full max-w-3xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 p-1.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-lg z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="relative">
            {currentImageUrl && (
              <img
                src={currentImageUrl}
                alt="Thumbnail preview"
                className="w-full rounded-lg"
              />
            )}
            
            {thumbnail.hasSwappedVersion && thumbnail.swappedImageUrl && (
              <button
                onClick={() => setShowingSwapped(!showingSwapped)}
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-sm rounded-lg hover:bg-black/70 transition-colors"
              >
                {showingSwapped ? (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    Show Original
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Show Swapped
                  </>
                )}
              </button>
            )}
          </div>
          
          {thumbnail.prompt && (
            <p className="text-zinc-400 text-sm">
              Prompt: {thumbnail.prompt}
            </p>
          )}

          {downloadError && (
            <p className="text-red-400 text-sm bg-red-400/10 p-2 rounded">
              {downloadError}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download {showingSwapped ? 'Swapped' : 'Original'}
            </button>

            {!showingSwapped && (
              <button
                onClick={() => setShowFaceSwap(true)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <Wand2 className="w-4 h-4" />
                Swap Face
              </button>
            )}
          </div>
        </div>
      </div>

      <FaceSwapModal
        isOpen={showFaceSwap}
        onClose={() => setShowFaceSwap(false)}
        thumbnailUrl={thumbnail.imageUrl}
        onSuccess={handleFaceSwapSuccess}
      />
    </div>
  );
}