import React from 'react';
import { X, Download } from 'lucide-react';
import type { Thumbnail } from '../types/thumbnail';

interface ThumbnailPreviewProps {
  thumbnail: Thumbnail;
  onClose: () => void;
}

export function ThumbnailPreview({ thumbnail, onClose }: ThumbnailPreviewProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(thumbnail.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `thumbnail-${thumbnail.id}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading thumbnail:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-xl w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-4">
          <img
            src={thumbnail.imageUrl}
            alt="Thumbnail preview"
            className="w-full rounded-lg"
          />
          
          {thumbnail.prompt && (
            <p className="text-zinc-400 text-sm">
              Prompt: {thumbnail.prompt}
            </p>
          )}

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}