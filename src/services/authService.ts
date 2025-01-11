import { signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, getRedirectResult, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { initializeUserCredits } from './creditService';

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Check if this is a new user
    if (userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime) {
      await initializeUserCredits(userCredential.user.uid);
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