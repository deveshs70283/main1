import { generateFromPrompt, generateFromYoutube } from './api';
import { extractYouTubeId, getYouTubeThumbnailUrl } from '../utils/youtube';
import { validatePrompt, validateUrl } from '../utils/validation';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { GenerationType, ThumbnailResponse } from '../types';

async function uploadThumbnail(imageUrl: string, userEmail: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const fileName = `thumbnails/${userEmail}/${Date.now()}.jpg`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
}

export async function updateThumbnailImage(thumbnailId: string, newImageUrl: string, category: 'face-swapped' | 'inpainted'): Promise<void> {
  const thumbnailRef = doc(db, 'thumbnails', thumbnailId);
  
  const updates: Record<string, any> = {
    category,
  };

  if (category === 'face-swapped') {
    updates.swappedImageUrl = newImageUrl;
    updates.hasSwappedVersion = true;
  } else if (category === 'inpainted') {
    updates.inpaintedImageUrl = newImageUrl;
    updates.hasInpaintedVersion = true;
  }

  await updateDoc(thumbnailRef, updates);
}

export async function deleteThumbnail(thumbnailId: string): Promise<void> {
  await deleteDoc(doc(db, 'thumbnails', thumbnailId));
}

export async function generateThumbnail(
  type: GenerationType,
  input: string,
  userId: string,
  userEmail: string
): Promise<ThumbnailResponse> {
  try {
    let response: ThumbnailResponse;
    
    if (type === 'youtube') {
      validateUrl(input);
      const videoId = extractYouTubeId(input);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }
      const thumbnailUrl = getYouTubeThumbnailUrl(videoId);
      response = await generateFromYoutube(thumbnailUrl);
    } else if (type === 'thumbnail') {
      validatePrompt(input);
      response = await generateFromPrompt(input);
    } else {
      throw new Error('Feature not available yet');
    }

    if (response.status === 'success') {
      const storedImageUrl = await uploadThumbnail(response.imageUrl, userEmail);
      
      await addDoc(collection(db, 'thumbnails'), {
        imageUrl: storedImageUrl,
        swappedImageUrl: null,
        inpaintedImageUrl: null,
        hasSwappedVersion: false,
        hasInpaintedVersion: false,
        category: 'original',
        prompt: input,
        createdAt: Date.now(),
        userId,
        userEmail
      });

      response.imageUrl = storedImageUrl;
    }

    return response;
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to generate thumbnail',
      imageUrl: '',
    };
  }
}