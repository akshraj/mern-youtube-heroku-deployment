import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDHjT2TC9PJ-W2GlHIhQJSFXTheKRXYDzE",
  authDomain: "userlogin-cd249.firebaseapp.com",
  databaseURL: "https://userlogin-cd249.firebaseio.com",
  projectId: "userlogin-cd249",
  storageBucket: "userlogin-cd249.appspot.com",
  messagingSenderId: "198778285847",
  appId: "1:198778285847:web:d546de92a51dab0bd19152"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;