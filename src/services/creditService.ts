import { doc, setDoc, getDoc, updateDoc, increment, runTransaction } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function initializeUserCredits(userId: string) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    credits: 5,
    plan: 'free'
  });
}

export async function getUserCredits(userId: string): Promise<number> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.data()?.credits ?? 0;
}

export async function deductCredits(userId: string, amount: number = 2): Promise<boolean> {
  const userRef = doc(db, 'users', userId);
  
  try {
    const success = await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        return false;
      }
      
      const currentCredits = userDoc.data().credits;
      if (currentCredits < amount) {
        return false;
      }
      
      transaction.update(userRef, {
        credits: currentCredits - amount
      });
      
      return true;
    });
    
    return success;
  } catch (error) {
    console.error('Error deducting credits:', error);
    return false;
  }
}

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    credits: 5,
    features: ['5 credits per month', 'Basic thumbnails', 'Standard support']
  },
  pro: {
    name: 'Pro',
    price: 599,
    credits: 100,
    features: ['100 credits per month', 'Priority generation', '24/7 support']
  },
  premium: {
    name: 'Premium',
    price: 999,
    credits: 250,
    features: ['250 credits per month', 'Ultra-fast generation', 'Priority support', 'Custom templates']
  }
};