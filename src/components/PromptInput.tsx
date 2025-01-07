import React from 'react';
import { Wand2 } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function PromptInput({ value, onChange, onSubmit }: PromptInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your thumbnail idea..."
          className="w-full p-4 pr-16 text-white border border-white/10 rounded-xl bg-white/5 min-h-[100px] focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-500"
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg text-sm px-4 py-2 flex items-center gap-2 transition-colors"
        >
          <Wand2 className="w-4 h-4" />
          Generate
        </button>
      </div>
    </form>
  );
}