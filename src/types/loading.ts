export interface LoadingStep {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'completed';
  progress?: number;
}