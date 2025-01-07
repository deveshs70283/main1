import { signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { initializeUserCredits } from './creditService';

export async function signInWithGoogle() {
  try {
    // First try popup
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        await initializeUserCredits(result.user.uid);
      }
      return result.user;
    } catch (error: any) {
      // If popup blocked, fallback to redirect
      if (error.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, googleProvider);
        return null; // Redirect will handle the rest
      }
      throw error;
    }
  } catch (error) {
    console.error('Error with Google auth:', error);
    throw error;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error with email auth:', error);
    throw error;
  }
}

export async function handleAuthRedirect() {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        await initializeUserCredits(result.user.uid);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error handling redirect:', error);
    throw error;
  }
}