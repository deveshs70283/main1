import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { initializeUserCredits } from './creditService';

export interface SignupData {
  email: string;
  password: string;
  displayName: string;
}

async function checkExistingIP(ip: string): Promise<boolean> {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('ipAddress', '==', ip));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export async function signupWithEmail({ email, password, displayName }: SignupData) {
  try {
    // Get IP address from IP detection service
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    // Check if IP already exists
    const ipExists = await checkExistingIP(ip);
    if (ipExists) {
      throw new Error('Multiple sign-ups are not allowed from the same IP address!');
    }

    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    await updateProfile(userCredential.user, {
      displayName
    });
    
    // Store user data with IP address
    await addDoc(collection(db, 'users'), {
      uid: userCredential.user.uid,
      email,
      displayName,
      ipAddress: ip,
      createdAt: new Date().toISOString()
    });
    
    // Initialize user credits
    await initializeUserCredits(userCredential.user.uid);
    
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create account');
  }
}