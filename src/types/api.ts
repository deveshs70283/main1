export interface ReplicateInput {
  prompt: string;
  num_outputs: number;
  aspect_ratio: string;
  output_format: string;
  guidance_scale: number;
  output_quality: number;
  num_inference_steps: number;
}

export interface ReplicatePrediction {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  output?: string[];
  error?: string;
}