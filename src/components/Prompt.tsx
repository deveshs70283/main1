import React from 'react';
import { Sparkles } from 'lucide-react';
import type { GenerationType } from '../types';
import { FaceSwapUpload } from './FaceSwapUpload';

interface PromptProps {
  type: GenerationType;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFaceSwapSuccess?: (url: string) => void;
  disabled?: boolean;
  credits: number;
}

export function Prompt({ type, value, onChange, onSubmit, onFaceSwapSuccess, disabled, credits }: PromptProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const insufficientCredits = credits < 2;

  const getPlaceholder = () => {
    switch (type) {
      case 'thumbnail':
        return "Describe your thumbnail idea (e.g., 'A samurai walking along a blood-red path with bold text SELF MASTERY')";
      case 'youtube':
        return "Enter a YouTube video URL (e.g., https://youtube.com/watch?v=...)";
      default:
        return "";
    }
  };

  if (type === 'faceswap') {
    return (
      <FaceSwapUpload onSuccess={url => onFaceSwapSuccess?.(url)} />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {type === 'youtube' && (
          <p className="text-zinc-400 text-sm mb-2">Just enter any YouTube video URL and see the Magic Happens</p>
        )}
        {type === 'youtube' ? (
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || insufficientCredits}
            placeholder={getPlaceholder()}
            className="w-full px-4 py-3 bg-black/20 border border-purple-500/20 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || insufficientCredits}
            placeholder={getPlaceholder()}
            className="w-full h-32 px-4 py-3 bg-black/20 border border-purple-500/20 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-zinc-500 text-sm">
            (2 Credits per generation)
          </div>
          
          {insufficientCredits ? (
            <div className="text-red-400">
              Insufficient credits. Please upgrade to continue generating thumbnails.
            </div>
          ) : (
            <button
              type="submit"
              disabled={disabled || !value.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Generate
            </button>
          )}
        </div>
      </div>
    </form>
  );
}