import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import { auth } from '../lib/firebase';

const FACE_SWAP_WEBHOOK = 'https://hook.eu2.make.com/u8x8dlhdbakj53idx7h4o8y4itm11zyn';

export async function uploadFaceImage(file: File): Promise<string> {
  const fileName = `face-images/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

async function uploadSwappedImage(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  
  const fileName = `swapped-faces/${Date.now()}.jpg`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, blob);
  
  return getDownloadURL(storageRef);
}

export async function performFaceSwap(targetImageUrl: string, faceImageUrl: string): Promise<string> {
  try {
    const response = await fetch(FACE_SWAP_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        thumbnail_url: targetImageUrl,
        face_image_url: faceImageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`Face swap failed with status: ${response.status}`);
    }

    const text = await response.text();
    let resultUrl: string;

    try {
      const data = JSON.parse(text);
      resultUrl = Array.isArray(data) ? data[0]?.body : data;
    } catch {
      resultUrl = text.trim();
    }

    if (!resultUrl || !resultUrl.startsWith('http')) {
      throw new Error('Invalid response format');
    }

    const storedImageUrl = await uploadSwappedImage(resultUrl);

    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, 'faceswaps'), {
        userId: user.uid,
        faceImageUrl,
        targetImageUrl,
        resultUrl: storedImageUrl,
        createdAt: Date.now()
      });
    }

    return storedImageUrl;
  } catch (error) {
    console.error('Face swap error:', error);
    throw new Error(error instanceof Error ? error.message : 'Face swap failed');
  }
}