import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCevbivhI0vr_r2uMpRJTvvYgy6VCYspKU",
  authDomain: "watchtv-16b9c.firebaseapp.com",
  projectId: "watchtv-16b9c",
  storageBucket: "watchtv-16b9c.firebasestorage.app",
  messagingSenderId: "642379654547",
  appId: "1:642379654547:web:e053ebf0af43a3bee0b466",
  measurementId: "G-MDF9NQL3TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();