import { useState, useEffect } from 'react';
import type { LoadingStep } from '../types/loading';

const STEPS: LoadingStep[] = [
  { id: 'prepare', label: 'Getting things ready...', status: 'pending', progress: 0 },
  { id: 'fetch', label: 'Fetching assets and resources...', status: 'pending', progress: 0 },
  { id: 'scan', label: 'Scanning for design perfection...', status: 'pending', progress: 0 },
  { id: 'generate', label: 'Bringing your design to life...', status: 'pending', progress: 0 },
  { id: 'polish', label: 'Polishing the final touches...', status: 'pending', progress: 0 },
  { id: 'complete', label: 'Your masterpiece is nearly ready!', status: 'pending', progress: 0 },
];

// Total duration should be around 35 seconds (35000ms)
const STEP_DURATIONS = {
  prepare: 3000,
  fetch: 5000,
  scan: 6000,
  generate: 6000,
  polish: 6000,
  complete: 3000,
};

export function useLoadingSequence() {
  const [steps, setSteps] = useState<LoadingStep[]>(STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex >= steps.length) return;

    const currentStep = steps[currentStepIndex];
    const duration = STEP_DURATIONS[currentStep.id as keyof typeof STEP_DURATIONS];

    // Start the current step
    setSteps(prev => prev.map((step, index) => 
      index === currentStepIndex 
        ? { ...step, status: 'loading' }
        : step
    ));

    // Smooth progress updates (update every 100ms)
    const progressInterval = setInterval(() => {
      setSteps(prev => prev.map((step, index) => {
        if (index !== currentStepIndex) return step;
        
        const progressIncrement = (100 * 100) / (duration); // Progress per 100ms
        return {
          ...step,
          progress: Math.min((step.progress || 0) + progressIncrement, 100)
        };
      }));
    }, 100);

    // Complete the step and move to next
    const stepTimeout = setTimeout(() => {
      setSteps(prev => prev.map((step, index) => 
        index === currentStepIndex 
          ? { ...step, status: 'completed', progress: 100 }
          : step
      ));
      setCurrentStepIndex(prev => prev + 1);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStepIndex]);

  return { steps, currentStepIndex, isComplete: currentStepIndex >= steps.length };
}