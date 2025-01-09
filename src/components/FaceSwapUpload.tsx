import React, { useState } from 'react';
import { UserRound, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { uploadFaceImage, performFaceSwap } from '../services/faceSwapService';

interface FaceSwapUploadProps {
  onSuccess: (swappedImageUrl: string) => void;
}

export function FaceSwapUpload({ onSuccess }: FaceSwapUploadProps) {
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'face' | 'target') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (type === 'face') setFaceImage(file);
      else setTargetImage(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'face' | 'target') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'face') setFaceImage(file);
      else setTargetImage(file);
    }
  };

  const handleSwap = async () => {
    if (!faceImage || !targetImage) return;
    
    setLoading(true);
    setError('');
    
    try {
      const faceImageUrl = await uploadFaceImage(faceImage);
      const targetImageUrl = await uploadFaceImage(targetImage);
      const swappedImageUrl = await performFaceSwap(targetImageUrl, faceImageUrl);
      onSuccess(swappedImageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to swap face');
    } finally {
      setLoading(false);
    }
  };

  const UploadBox = ({ type, file, icon: Icon }: { type: 'face' | 'target', file: File | null, icon: React.ElementType }) => (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, type)}
      className="relative group cursor-pointer"
    >
      <input
        type="file"
        onChange={(e) => handleFileChange(e, type)}
        accept="image/*"
        className="hidden"
        id={`${type}-upload`}
      />
      <label
        htmlFor={`${type}-upload`}
        className="block w-full h-48 bg-zinc-800/50 rounded-lg border-2 border-dashed border-zinc-700 hover:border-emerald-500 transition-colors"
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt={`${type} preview`}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-zinc-400">
            <Icon className="w-8 h-8" />
            <p className="text-sm">Drag & Drop your file here</p>
            <p className="text-xs text-zinc-500">jpeg, png, webp images allowed</p>
          </div>
        )}
      </label>
    </div>
  );

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-white font-medium mb-2">Add Face Image</h3>
          <UploadBox type="face" file={faceImage} icon={UserRound} />
        </div>

        <div>
          <h3 className="text-white font-medium mb-2">Add Image for Swap</h3>
          <UploadBox type="target" file={targetImage} icon={ImageIcon} />
        </div>
      </div>

      <button
        onClick={handleSwap}
        disabled={!faceImage || !targetImage || loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            <span>Swap Face</span>
          </>
        )}
      </button>
    </div>
  );
}