// frontend/src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLM3CsFOI7eXx-klueJUvWbisWZ1Mzf_E",
  authDomain: "artisan-marketplace-e4ac4.firebaseapp.com",
  projectId: "artisan-marketplace-e4ac4",
  storageBucket: "artisan-marketplace-e4ac4.firebasestorage.app",
  messagingSenderId: "364447717283",
  appId: "1:364447717283:web:db95ead23391dae05b6c16"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

