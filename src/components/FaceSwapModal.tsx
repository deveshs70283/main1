import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadFaceImage, performFaceSwap } from '../services/faceSwapService';

interface FaceSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  thumbnailUrl: string;
  onSuccess: (newImageUrl: string) => void;
}

export function FaceSwapModal({ isOpen, onClose, thumbnailUrl, onSuccess }: FaceSwapModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    setError('');
    
    try {
      const faceImageUrl = await uploadFaceImage(selectedFile);
      const swappedImageUrl = await performFaceSwap(thumbnailUrl, faceImageUrl);
      onSuccess(swappedImageUrl);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to swap face');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Face Swap</h2>
        
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <label className="block">
            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer hover:border-emerald-500/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-zinc-500" />
                <p className="text-sm text-zinc-400">
                  {selectedFile ? selectedFile.name : 'Upload a face image'}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!selectedFile || loading}
            className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Swap Face</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}