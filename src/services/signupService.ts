import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { initializeUserCredits } from './creditService';
import { getRandomAvatar } from '../utils/avatars';

export interface SignupData {
  email: string;
  password: string;
  displayName: string;
}

// IP that's allowed to create multiple accounts
const WHITELISTED_IP = '49.36.237.230';

async function checkExistingIP(ip: string): Promise<boolean> {
  // If IP is whitelisted, always allow signup
  if (ip === WHITELISTED_IP) {
    return false;
  }

  // For all other IPs, check if they already have an account
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

    // Check if IP is allowed to create an account
    const ipExists = await checkExistingIP(ip);
    if (ipExists) {
      throw new Error('Multiple sign-ups are not allowed from the same IP address!');
    }

    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Get random avatar
    const avatarUrl = getRandomAvatar();
    
    // Update profile with display name and avatar
    await updateProfile(userCredential.user, {
      displayName,
      photoURL: avatarUrl
    });
    
    // Store user data with IP address and avatar
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      displayName,
      avatarUrl,
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