// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLM3CsFOI7eXx-klueJUvWbisWZ1Mzf_E",
  authDomain: "artisan-marketplace-e4ac4.firebaseapp.com",
  projectId: "artisan-marketplace-e4ac4",
  storageBucket: "artisan-marketplace-e4ac4.firebasestorage.app",
  messagingSenderId: "364447717283",
  appId: "1:364447717283:web:db95ead23391dae05b6c16",
  measurementId: "G-EL5X61BWE0",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication
const auth = getAuth(app);

// ✅ Optional: Initialize Google Sign-In
const googleProvider = new GoogleAuthProvider();

// ✅ Optional: Initialize Analytics (only in browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// ✅ Export everything you’ll need elsewhere
export { app, auth, googleProvider, analytics };
