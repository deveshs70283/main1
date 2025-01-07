import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { initializeUserCredits } from './creditService';

export interface SignupData {
  email: string;
  password: string;
  displayName: string;
}

export async function signupWithEmail({ email, password, displayName }: SignupData) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Update profile with display name
  await updateProfile(userCredential.user, {
    displayName
  });
  
  // Initialize user credits
  await initializeUserCredits(userCredential.user.uid);
  
  return userCredential.user;
}