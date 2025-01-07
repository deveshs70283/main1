import React from 'react';
import { LoadingStep } from './LoadingStep';
import { useLoadingSequence } from '../hooks/useLoadingSequence';

export function LoadingOverlay() {
  const { steps, currentStepIndex } = useLoadingSequence();

  const getVisibleSteps = () => {
    const prevStep = steps[currentStepIndex - 1];
    const currentStep = steps[currentStepIndex];
    const nextStep = steps[currentStepIndex + 1];
    return { prevStep, currentStep, nextStep };
  };

  const { prevStep, currentStep, nextStep } = getVisibleSteps();

  return (
    <div className="w-[640px] h-[360px] bg-zinc-900/90 rounded-xl border border-zinc-800 relative overflow-hidden mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/50 via-zinc-700/50 to-zinc-800/50 bg-shimmer animate-[shimmer_2s_linear_infinite]" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="relative h-[120px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              {/* Previous Step */}
              {prevStep && (
                <div 
                  className="absolute top-0 w-full opacity-25 transition-all duration-700 ease-in-out transform -translate-y-8"
                  style={{ transitionDelay: '150ms' }}
                >
                  <LoadingStep step={prevStep} />
                </div>
              )}

              {/* Current Step */}
              {currentStep && (
                <div className="w-full opacity-100 transition-all duration-700 ease-in-out transform scale-105">
                  <LoadingStep step={currentStep} />
                </div>
              )}

              {/* Next Step */}
              {nextStep && (
                <div 
                  className="absolute bottom-0 w-full opacity-25 transition-all duration-700 ease-in-out transform translate-y-8"
                  style={{ transitionDelay: '150ms' }}
                >
                  <LoadingStep step={nextStep} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}