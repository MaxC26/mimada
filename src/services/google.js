import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCIfDjeZ3jn2iKDmPIzyOhB7v_xQmFPu9c',
  authDomain: 'mimadas.firebaseapp.com',
  projectId: 'mimadas',
  storageBucket: 'mimadas.firebasestorage.app',
  messagingSenderId: '877517834012',
  appId: '1:877517834012:web:6cb254fd20a5b00995dcd9',
  measurementId: 'G-TGN7X0RZXF',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}

const facebookProvider = new FacebookAuthProvider()
facebookProvider.setCustomParameters({
  display: 'popup',
})

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider)
    return result.user
  } catch (error) {
    console.error('Error signing in with Facebook:', error)
    throw error
  }
}

export const signOutFromGoogle = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out from Google:', error)
  }
}

