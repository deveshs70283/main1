import React from 'react';
import { Image, Youtube } from 'lucide-react';

interface GenerationOptionsProps {
  selectedOption: 'thumbnail' | 'youtube';
  onOptionChange: (option: 'thumbnail' | 'youtube') => void;
}

export function GenerationOptions({ selectedOption, onOptionChange }: GenerationOptionsProps) {
  return (
    <div className="flex gap-4 w-full">
      <button
        onClick={() => onOptionChange('thumbnail')}
        className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
          selectedOption === 'thumbnail'
            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
            : 'border-white/10 hover:border-white/20 text-gray-400 hover:bg-white/5'
        }`}
      >
        <Image className="w-5 h-5" />
        <span className="font-medium">Thumbnail</span>
      </button>
      
      <button
        onClick={() => onOptionChange('youtube')}
        className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
          selectedOption === 'youtube'
            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
            : 'border-white/10 hover:border-white/20 text-gray-400 hover:bg-white/5'
        }`}
      >
        <Youtube className="w-5 h-5" />
        <span className="font-medium">YouTube URL</span>
      </button>
    </div>
  );
}