import React from 'react';
import { Image } from 'lucide-react';

export function Logo() {
  return (
    <div className="px-4 py-6 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
          <Image className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-lg font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            VenPix
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/10 text-purple-500 rounded-full ml-2 font-medium">
            BETA
          </span>
        </div>
      </div>
    </div>
  );
}