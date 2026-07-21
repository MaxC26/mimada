import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaM2ZZJWvDFi4dtYG0Qdj24HXdukKe5II",
  authDomain: "mimadasv-9e11d.firebaseapp.com",
  projectId: "mimadasv-9e11d",
  storageBucket: "mimadasv-9e11d.firebasestorage.app",
  messagingSenderId: "48290315878",
  appId: "1:48290315878:web:2c2e6d876d794fcb54f7a7",
  measurementId: "G-6PS740MJ33"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  'display': 'popup'
});

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Facebook:", error);
    throw error;
  }
};

export const signOutFromGoogle = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out from Google:", error);
  }
};