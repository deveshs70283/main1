export interface Thumbnail {
  id: string;
  imageUrl: string;
  swappedImageUrl: string | null;
  inpaintedImageUrl: string | null;
  hasSwappedVersion: boolean;
  hasInpaintedVersion: boolean;
  category: 'original' | 'face-swapped' | 'inpainted';
  prompt: string;
  createdAt: number;
  userId: string;
}