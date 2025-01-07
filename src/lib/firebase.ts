import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDLa9Rie47TQNf-tkaANKdS1Rm7LErYSr8",
  authDomain: "beenu-3aaaf.firebaseapp.com",
  projectId: "beenu-3aaaf",
  storageBucket: "beenu-3aaaf.firebasestorage.app",
  messagingSenderId: "684793947496",
  appId: "1:684793947496:web:6de50fa78eb2421af6e2dd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();