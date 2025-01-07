import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import type { LoadingStep as LoadingStepType } from '../types/loading';

interface LoadingStepProps {
  step: LoadingStepType;
}

export function LoadingStep({ step }: LoadingStepProps) {
  return (
    <div className="flex items-center gap-2 h-8">
      <div className="w-5 h-5 flex items-center justify-center shrink-0">
        {step.status === 'completed' ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : step.status === 'loading' ? (
          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
        ) : (
          <div className="w-4 h-4 rounded-full border-2 border-zinc-700" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="text-sm text-zinc-200">{step.label}</span>
        </div>
        {step.status === 'loading' && (
          <div className="mt-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-200 ease-out"
              style={{ width: `${step.progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}