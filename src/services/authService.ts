import { signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, getRedirectResult, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from '../lib/firebase';
import { initializeUserCredits } from './creditService';
import { getRandomAvatar } from '../utils/avatars';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

async function getOrCreateUserAvatar(uid: string): Promise<string> {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists() && userDoc.data().avatarUrl) {
    return userDoc.data().avatarUrl;
  }
  
  const avatarUrl = getRandomAvatar();
  await setDoc(doc(db, 'users', uid), { avatarUrl }, { merge: true });
  return avatarUrl;
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Check if this is a new user
    if (userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime) {
      await initializeUserCredits(userCredential.user.uid);
      const avatarUrl = await getOrCreateUserAvatar(userCredential.user.uid);
      await updateProfile(userCredential.user, { photoURL: avatarUrl });
    } else if (!userCredential.user.photoURL) {
      // Existing user but missing avatar
      const avatarUrl = await getOrCreateUserAvatar(userCredential.user.uid);
      await updateProfile(userCredential.user, { photoURL: avatarUrl });
    }
    
    return userCredential.user;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
      await initializeUserCredits(result.user.uid);
      // Only set avatar if user doesn't already have one from Google
      if (!result.user.photoURL?.includes('googleusercontent.com')) {
        const avatarUrl = await getOrCreateUserAvatar(result.user.uid);
        await updateProfile(result.user, { photoURL: avatarUrl });
      }
    }
    
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw error;
  }
}

export async function handleAuthRedirect() {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        await initializeUserCredits(result.user.uid);
        // Only set avatar if user doesn't already have one from Google
        if (!result.user.photoURL?.includes('googleusercontent.com')) {
          const avatarUrl = await getOrCreateUserAvatar(result.user.uid);
          await updateProfile(result.user, { photoURL: avatarUrl });
        }
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error handling redirect:', error);
    throw error;
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}