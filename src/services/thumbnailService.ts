import { generateFromPrompt, generateFromYoutube } from './api';
import { extractYouTubeId, getYouTubeThumbnailUrl } from '../utils/youtube';
import { validatePrompt, validateUrl } from '../utils/validation';
import { db, storage } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
      // Upload to Firebase Storage
      const storedImageUrl = await uploadThumbnail(response.imageUrl, userEmail);
      
      // Save metadata to Firestore
      await addDoc(collection(db, 'thumbnails'), {
        imageUrl: storedImageUrl,
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