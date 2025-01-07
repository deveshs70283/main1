export interface Thumbnail {
  id: string;
  imageUrl: string;
  swappedImageUrl: string | null;
  hasSwappedVersion: boolean;
  prompt: string;
  createdAt: number;
  userId: string;
}