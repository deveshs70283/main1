import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

const FACE_SWAP_WEBHOOK = 'https://hook.eu2.make.com/u8x8dlhdbakj53idx7h4o8y4itm11zyn';

export async function uploadFaceImage(file: File): Promise<string> {
  const fileName = `face-images/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function performFaceSwap(thumbnailUrl: string, faceImageUrl: string): Promise<string> {
  try {
    const response = await fetch(FACE_SWAP_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        thumbnail_url: thumbnailUrl,
        face_image_url: faceImageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`Face swap failed with status: ${response.status}`);
    }

    const text = await response.text();
    
    // If response is a direct URL
    if (text.trim().startsWith('http')) {
      return text.trim();
    }

    // Try parsing as JSON
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data) && data[0]?.body) {
        if (typeof data[0].body === 'string' && data[0].body.startsWith('http')) {
          return data[0].body;
        }
      }
      throw new Error('Invalid response format');
    } catch (e) {
      throw new Error('Failed to parse face swap response');
    }
  } catch (error) {
    console.error('Face swap error:', error);
    throw new Error(error instanceof Error ? error.message : 'Face swap failed');
  }
}